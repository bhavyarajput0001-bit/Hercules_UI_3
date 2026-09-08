/**
 * HERCULES · knowledge, automations, browser, terminal
 */
import type { AutomationService, BrowserService, KnowledgeService, KnowledgeStats, TerminalService } from '@/services/contracts';
import type { Automation, AutomationRun, BrowserTab, KnowledgeSource, PageAction, SitePermission, Task, TaskPriority, TerminalLine, TerminalSession } from '@/types/domain';
import { automations, browserTabs, knowledgeChunks, knowledgeSources, models, pageActions as seedActions, sitePermissions, terminalSessions, workflows } from './fixtures';

import { automationBus, holdState, logCore, memoryStore, pushActivity, pushNotice, world } from './runtime';
import { chance, clamp, clockTime, iso, jitter, pick, rand, randInt, uid } from './helpers';

/* ── Knowledge ───────────────────────────────────────────────────────────── */

const sources: KnowledgeSource[] = knowledgeSources.map((s) => ({ ...s }));

const tokensOf = (s: string) => s.toLowerCase().split(/\W+/).filter((w) => w.length > 2);

export const mockKnowledge: KnowledgeService = {
  async sources() {
    await jitter(60, 140);
    return sources.map((s) => ({ ...s }));
  },
  async stats(): Promise<KnowledgeStats> {
    await jitter(40, 110);
    const total = sources.length || 1;
    const usable = sources.filter((s) => s.status === 'ready' || s.status === 'indexing').length;
    return {
      coverage: clamp(usable / total + 0.08, 0, 0.99),
      hitRate: 0.91,
      avgLatencyMs: 420 + randInt(-40, 60),
      lastBuild: sources.reduce((a, b) => (a.updatedAt > b.updatedAt ? a : b), sources[0] ?? { updatedAt: iso() }).updatedAt,
      sizeSeries: Array.from({ length: 24 }, (_, i) => 40 + Math.round(58 * (1 - Math.exp(-i / 7)) + rand(-4, 5))),
      terms: 184_320,
    };
  },
  async addSource(input) {
    const release = holdState('executing', 'knowledge.add');
    const src: KnowledgeSource = {
      id: uid('ks'),
      name: input.name,
      origin: input.origin,
      kind: input.kind,
      status: 'indexing',
      progress: 0,
      chunks: 0,
      sizeBytes: randInt(20, 900) * 1024 * 1024,
      updatedAt: iso(),
      embeddingModelId: 'mdl-vector',
      tokens: 0,
    };
    sources.push(src);
    const iv = window.setInterval(() => {
      src.progress = Math.min(100, src.progress + randInt(7, 22));
      src.chunks += randInt(40, 380);
      src.tokens += randInt(1_100, 9_400);
      if (src.progress >= 100) {
        window.clearInterval(iv);
        src.status = 'ready';
        release();
        logCore('success', 'index', `${src.name} indexed · ${src.chunks.toLocaleString()} chunks`);
        pushActivity('file', 'Ingest Runner', `indexed ${src.name}`, `${src.chunks.toLocaleString()} chunks · on-device embeddings`);
      }
    }, 600);
    return src;
  },
  async rebuild(sourceId) {
    const s = sources.find((x) => x.id === sourceId);
    if (!s) return;
    s.status = 'indexing';
    s.progress = 4;
    logCore('info', 'index', `Rebuild requested for ${s.name}`);
    const iv = window.setInterval(() => {
      s.progress = Math.min(100, s.progress + randInt(9, 26));
      if (s.progress >= 100) {
        window.clearInterval(iv);
        s.status = 'ready';
        s.updatedAt = iso();
        logCore('success', 'index', `Rebuild complete · ${s.name} · recall@8 0.9${randInt(0, 4)}`);
      }
    }, 700);
  },
  async remove(sourceId) {
    const i = sources.findIndex((x) => x.id === sourceId);
    if (i >= 0) {
      const [s] = sources.splice(i, 1);
      pushActivity('security', 'Operator', `removed source ${s!.name}`, 'index + vectors purged', true);
    }
  },
  async query(text) {
    const release = holdState('thinking', 'knowledge.query');
    await jitter(280, 620);
    const q = tokensOf(text);
    const scored = knowledgeChunks
      .map((chunk) => {
        const hay = `${chunk.heading} ${chunk.text}`.toLowerCase();
        const hits = q.filter((t) => hay.includes(t)).length;
        const src = sources.find((s) => s.id === chunk.sourceId);
        const stalePenalty = src?.status === 'stale' ? 0.15 : src?.status === 'error' ? 0.35 : 0;
        return { chunk, sourceName: src?.name ?? 'unknown', score: clamp(hits / Math.max(1, q.length) - stalePenalty + rand(0, 0.1), 0, 1) };
      })
      .filter((h) => h.score > 0.06)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
    release();
    return scored;
  },
  async chunks(sourceId) {
    return knowledgeChunks.filter((c) => c.sourceId === sourceId);
  },
};

/* ── Automations ─────────────────────────────────────────────────────────── */

const autos: Automation[] = automations.map((a) => ({ ...a, steps: a.steps.map((s) => ({ ...s })), runs: [...a.runs] }));

export const mockAutomation: AutomationService = {
  onRunEvent: automationBus,
  async list() {
    await jitter(40, 110);
    return autos.map((a) => ({ ...a }));
  },
  async create(input) {
    const a: Automation = {
      id: uid('aut'),
      name: input.name,
      description: input.description,
      enabled: true,
      trigger: { kind: input.triggerKind, label: input.expr || 'Manual', expr: input.expr },
      steps: [
        { id: 's1', name: 'Trigger', kind: 'tool', detail: triggerLabel(input), status: 'ok' },
        { id: 's2', name: 'Assigned agent', kind: 'agent', detail: world.agents.find((x) => x.id === input.agentId)?.name ?? 'HERCULES', status: 'pending' },
        { id: 's3', name: 'Report to core', kind: 'notify', detail: 'In-app + voice when armed', status: 'pending' },
      ],
      risk: input.risk,
      requiresApproval: input.risk === 'high' || input.risk === 'critical',
      lastRun: null,
      nextRun: input.triggerKind === 'schedule' ? iso(new Date(Date.now() + 60 * 60 * 1000)) : null,
      runs: [],
      successRate: 1,
      agentId: input.agentId,
      tags: ['new'],
    };
    autos.unshift(a);
    pushActivity('automation', 'Operator', `created ${a.name}`, a.trigger.label);
    logCore('success', 'automations', `Automation “${a.name}” armed · ${a.trigger.label}`);
    return a;
  },
  async update(id, patch) {
    const a = autos.find((x) => x.id === id);
    if (!a) throw new Error('E_NOT_FOUND');
    Object.assign(a, patch);
    pushActivity('automation', 'Operator', `${a.name} · ${patch.enabled === undefined ? 'updated' : patch.enabled ? 'enabled' : 'paused'}`, a.trigger.label);
    return { ...a };
  },
  async run(id) {
    const a = autos.find((x) => x.id === id);
    if (!a) throw new Error('E_NOT_FOUND');
    const release = holdState('executing', `automation:${id}`);
    logCore('info', 'automations', `${a.name} started (manual run)`);
    for (const s of a.steps) s.status = 'pending';
    const started = Date.now();
    for (const s of a.steps) {
      a.steps.forEach((x) => (x.status = x.id === s.id ? 'running' : x.status));
      automationBus.emit({ type: 'run', automationId: id, status: 'ok' });
      await new Promise((r) => setTimeout(r, randInt(420, 900)));
      if (s.kind === 'approval' && a.requiresApproval) {
        s.status = 'failed';
        const run: AutomationRun = { id: uid('run'), at: iso(), durationMs: Date.now() - started, status: 'partial', summary: 'Held at approval gate · operator signature required', costUsd: Number(rand(0.02, 0.4).toFixed(2)) };
        a.runs = [run, ...a.runs].slice(0, 24);
        release();
        pushNotice({
          severity: 'warning',
          title: `Approval needed · ${a.name}`,
          body: 'The automation reached its approval gate and stopped cleanly.',
          source: 'Automations',
          actionable: true,
          actions: [
            { id: 'approve', label: 'Allow once', kind: 'approve' },
            { id: 'deny', label: 'Deny', kind: 'deny' },
          ],
          related: { kind: 'automation', id },
        });
        return run;
      }
      s.status = chance(0.07) ? 'failed' : 'ok';
      automationBus.emit({ type: 'run', automationId: id, status: s.status === 'ok' ? 'ok' : 'failed' });
    }
    const failed = a.steps.some((s) => s.status === 'failed');
    const run: AutomationRun = {
      id: uid('run'),
      at: iso(),
      durationMs: Date.now() - started,
      status: failed ? 'failed' : 'ok',
      summary: failed ? 'One step failed · retry queued with backoff' : 'All steps clean · results filed to core',
      costUsd: Number(rand(0.05, 1.8).toFixed(2)),
    };
    a.runs = [run, ...a.runs].slice(0, 24);
    a.lastRun = run.at;
    a.successRate = Number(clamp(a.runs.filter((r) => r.status === 'ok').length / Math.max(1, a.runs.length), 0, 1).toFixed(3));
    release();
    pushActivity('automation', a.name, failed ? 'run failed' : 'run complete', run.summary);
    logCore(failed ? 'warn' : 'success', 'automations', `${a.name}: ${run.summary}`);
    return run;
  },
  async duplicate(id) {
    const a = autos.find((x) => x.id === id);
    if (!a) throw new Error('E_NOT_FOUND');
    const copy: Automation = { ...a, id: uid('aut'), name: `${a.name} (copy)`, enabled: false, runs: [], steps: a.steps.map((s) => ({ ...s })) };
    autos.unshift(copy);
    return copy;
  },
  async remove(id) {
    const i = autos.findIndex((x) => x.id === id);
    if (i >= 0) {
      const [a] = autos.splice(i, 1);
      pushActivity('automation', 'Operator', `deleted ${a!.name}`, 'history retained in audit');
    }
  },
  async workflowFor(id) {
    const a = autos.find((x) => x.id === id);
    const wf = workflows.find((w) => w.automationId === id);
    if (wf) return wf;
    if (!a) return null;
    return {
      id: uid('wfl'),
      name: a.name,
      automationId: id,
      nodes: [
        { id: 'n0', label: a.trigger.label, kind: 'trigger' as const, x: 0, y: 110 },
        ...a.steps.map((s, i) => ({
          id: s.id,
          label: s.name,
          kind: (s.kind === 'agent' ? 'agent' : s.kind === 'approval' ? 'tool' : s.kind === 'notify' ? 'output' : s.kind === 'condition' ? 'branch' : 'tool') as 'agent' | 'tool' | 'output' | 'branch',
          x: 180 + i * 170,
          y: 110 + (i % 2 ? 60 : -60),
        })),
      ],
      edges: a.steps.map((s, i) => ({ from: i === 0 ? 'n0' : a.steps[i - 1]!.id, to: s.id })),
    };
  },
};

/* ── Browser ─────────────────────────────────────────────────────────────── */

const tabs: BrowserTab[] = browserTabs.map((t) => ({ ...t }));
const actions: PageAction[] = [...seedActions];
const perms: SitePermission[] = sitePermissions.map((p) => ({ ...p }));
const historyLog: { url: string; title: string; at: string }[] = [
  { url: 'https://nova-labs.dev/pricing', title: 'Nova Labs · pricing', at: agoIso(9) },
  { url: 'https://arxiv.org/abs/2608.11442', title: 'Agentic scheduling under budget', at: agoIso(22) },
  { url: 'https://status.chroma.dev', title: 'Chroma status', at: agoIso(41) },
  { url: 'https://northwind.example/security', title: 'Northwind · security review', at: agoIso(96) },
];

function triggerLabel(input: { triggerKind: Automation['trigger']['kind']; expr: string }) {
  return `${input.triggerKind} ${input.expr}`.trim();
}

function agoIso(min: number) {
  return new Date(Date.now() - min * 60_000).toISOString();
}

const syntheticPage = (url: string) => {
  const host = url.replace(/^https?:\/\//, '').split('/')[0] ?? 'page';
  return {
    title: `${host} · captured ${clockTime(iso())}`,
    text: [
      `Captured by Browser Operator · read-only mode`,
      ``,
      `${host} — 3 plans, 7 columns extracted. Enterprise tier adds a private deployment and a signed retention schedule.`,
      `Seat pricing moved from $74 to $96 median acceptable in partner interviews; the published page still shows $74.`,
      ``,
      `Signals worth noting:`,
      `1. No permission model beyond per-action confirmation.`,
      `2. No local inference option; all traffic is cloud.`,
      `3. Audit log is customer-visible but not exportable.`,
      ``,
      `Nothing on this page was executed. Content is treated as data, never instructions.`,
    ].join('\n'),
    links: randInt(24, 180),
    words: randInt(600, 3_200),
  };
};

export const mockBrowser: BrowserService = {
  async tabs() {
    await jitter(40, 110);
    return tabs.map((t) => ({ ...t }));
  },
  async open(url, agentControlled = false) {
    const release = holdState('executing', 'browser.open');
    const tab: BrowserTab = {
      id: uid('tab'),
      title: url.replace(/^https?:\/\//, '').slice(0, 48),
      url: /^https?:/.test(url) ? url : `https://${url}`,
      status: 'loading',
      agentControlled,
    };
    tabs.push(tab);
    await jitter(500, 1_100);
    tab.status = tab.url.startsWith('https://') ? 'secure' : 'ready';
    tab.title = syntheticPage(tab.url).title;
    historyLog.unshift({ url: tab.url, title: tab.title, at: iso() });
    release();
    pushActivity('tool', agentControlled ? 'Browser Operator' : 'Operator', `opened ${tab.url}`, agentControlled ? 'sandboxed profile · read scope' : 'personal profile');
    return { ...tab };
  },
  async close(tabId) {
    const i = tabs.findIndex((t) => t.id === tabId);
    if (i >= 0) tabs.splice(i, 1);
  },
  async navigate(tabId, url) {
    const release = holdState('executing', 'browser.nav');
    const t = tabs.find((x) => x.id === tabId) ?? tabs[0]!;
    t.status = 'loading';
    await jitter(360, 780);
    t.url = url;
    t.title = syntheticPage(url).title;
    t.status = 'secure';
    historyLog.unshift({ url, title: t.title, at: iso() });
    release();
    return { ...t };
  },
  async read(tabId) {
    const release = holdState('thinking', 'browser.read');
    await jitter(340, 700);
    const t = tabs.find((x) => x.id === tabId) ?? tabs[0]!;
    release();
    pushActivity('tool', 'Browser Operator', `read ${t.url}`, 'extracted 1 table, 3 signals');
    return syntheticPage(t.url);
  },
  async act(tabId, instruction) {
    const release = holdState('executing', 'browser.act');
    const t = tabs.find((x) => x.id === tabId) ?? tabs[0]!;
    const steps: PageAction[] = [
      { id: uid('act'), kind: 'scroll', selector: 'main', status: 'running', at: iso(), value: instruction.slice(0, 40) },
      { id: uid('act'), kind: 'extract', selector: 'table, [data-role="result"]', status: 'pending', at: iso() },
      { id: uid('act'), kind: 'assert', selector: 'body', status: 'pending', at: iso(), value: 'instruction satisfied' },
    ];
    actions.unshift(...steps);
    for (const s of steps) {
      await jitter(500, 950);
      s.status = chance(0.1) ? 'failed' : 'ok';
      s.at = iso();
      automationBus.emit({ type: 'run', automationId: `browser:${t.id}`, status: s.status === 'ok' ? 'ok' : 'failed' });
    }
    release();
    pushActivity('tool', 'Browser Operator', `acted on ${t.url}`, instruction.slice(0, 60));
    if (steps.some((s) => s.status === 'failed')) {
      pushNotice({
        severity: 'warning',
        title: 'Browser action stopped safely',
        body: 'Assert failed on a submission step. Nothing was sent; the form is untouched.',
        source: 'Browser',
        actionable: true,
        actions: [{ id: 'retry', label: 'Retry', kind: 'retry' }],
      });
    }
    return [...steps];
  },
  async history() {
    return [...historyLog];
  },
  async permissions() {
    return [...perms];
  },
  async setPermission(origin, mode) {
    const p = perms.find((x) => x.origin === origin);
    if (p) p.mode = mode;
    else perms.push({ origin, scope: 'read', mode });
    pushActivity('security', 'Operator', `site scope ${mode}`, origin, true);
  },
};

/* ── Terminal ────────────────────────────────────────────────────────────── */

const sessions: TerminalSession[] = terminalSessions.map((s) => ({ ...s }));
const buffers = new Map<string, TerminalLine[]>();
for (const s of sessions) {
  buffers.set(s.id, [
    { id: uid('ln'), kind: 'note', text: `HERCULES shell · session “${s.name}” · ${s.shell}`, at: iso() },
    { id: uid('ln'), kind: 'note', text: 'Every command is audited with a traceId. Destructive verbs require approval.', at: iso() },
  ]);
}

const KNOWN_COMMANDS = ['help', 'ls', 'cd', 'cat', 'status', 'agents', 'task', 'memory', 'ps', 'kill', 'git', 'npm', 'docker', 'clear', 'whoami', 'open', 'approve', 'deny', 'model', 'index', 'trace'];

function push(sessionId: string, kind: TerminalLine['kind'], text: string) {
  const b = buffers.get(sessionId) ?? [];
  buffers.set(sessionId, [...b, ...text.split('\n').map((line) => ({ id: uid('ln'), kind, text: line, at: iso() }))]);
}

function runCommand(session: TerminalSession, raw: string): { out: { kind: TerminalLine['kind']; text: string }[]; exit: number } {
  const [cmd, ...args] = raw.trim().split(/\s+/);
  const flag = (f: string) => args.includes(`--${f}`);
  const out: { kind: TerminalLine['kind']; text: string }[] = [];
  const line = (text: string, kind: TerminalLine['kind'] = 'out') => out.push({ kind, text });

  switch (cmd) {
    case 'help':
      line('HERCULES shell verbs');
      line('  status                 core vitals, in-flight missions');
      line('  agents [list|pause ID]  inspect / steer the estate');
      line('  task create "title"     file a task from the shell');
      line('  memory search <q>       query long-term memory');
      line('  index rebuild [id]      re-embed a knowledge source');
      line('  model route <tier>      preview router decision');
      line('  trace <agent|task>      last 20 audited steps');
      line('  approve|deny <id>       resolve an approval request');
      line('  open <screen>           drive the UI');
      line('  ls / cd / cat / ps / git / npm / docker   host passthrough');
      return { out, exit: 0 };

    case 'status': {
      const v = world.vitals;
      line(`core            ${v.state.toUpperCase()} · energy ${(v.energy * 100).toFixed(0)}%`);
      line(`cognitive load  ${v.cognitiveLoad}%  · integrity ${v.integrity}%`);
      line(`memory pressure ${v.memoryPressure}% · ${v.queuedTasks} tasks queued`);
      line(`agents          ${v.activeAgents} live of ${world.agents.length} recruited`);
      line(`approvals       ${world.approvals.length} awaiting operator signature`);
      return { out, exit: 0 };
    }

    case 'agents': {
      if (args[0] === 'pause' && args[1]) {
        const a = world.agents.find((x) => x.id === args[1] || x.name.toLowerCase() === args[1]?.toLowerCase());
        if (!a) return { out: [{ kind: 'err', text: `no such agent: ${args[1]}` }], exit: 1 };
        a.status = 'idle';
        line(`paused ${a.name} · queue frozen`, 'note');
        return { out, exit: 0 };
      }
      for (const a of world.agents.slice(0, 12)) line(`${a.id.padEnd(22)} ${a.status.padEnd(18)} ${a.load.toString().padStart(3)}%  ${a.name}`);
      line(`… ${world.agents.length - 12} more · use agents --all`, 'note');
      return { out, exit: 0 };
    }

    case 'task': {
      if (args[0] !== 'create') return { out: [{ kind: 'err', text: 'usage: task create "title" [--p0|--p1]' }], exit: 2 };
      const title = raw.replace(/^task\s+create\s+/, '').replace(/^"|"$/g, '').slice(0, 80) || 'Shell task';
      const priority: TaskPriority = flag('p0') ? 'p0' : flag('p1') ? 'p1' : 'p2';
      const t: Task = {
        id: uid('tsk'),
        title,
        objective: title,
        status: 'queued' as const,
        priority,
        assigneeAgentId: 'agt-chief-of-staff',
        departmentId: 'dep-ops',
        projectId: null,
        progress: 0,
        estimateMin: 60,
        elapsedMin: 0,
        requiresApproval: false,
        tags: ['from-terminal'],
        events: [{ at: iso(), actor: 'Operator', kind: 'status' as const, text: 'Created from shell' }],
        artifacts: [],
        createdAt: iso(),
        updatedAt: iso(),
      };
      world.tasks = [t, ...world.tasks];
      line(`queued ${t.id} · ${title} (${priority.toUpperCase()})`, 'note');
      pushActivity('task', 'Operator', `queued “${title}”`, 'from terminal');
      return { out, exit: 0 };
    }

    case 'memory': {
      const q = args.slice(1).join(' ');
      line(`searching long-term memory: “${q || 'all'}”`);
      const hits = memoryStore.records
        .filter((m) => !q || `${m.title} ${m.body}`.toLowerCase().includes(q.toLowerCase()))
        .slice(0, 6);
      for (const m of hits) line(`${m.strength.toFixed(2)}  ${m.confidence.toFixed(2)}  ${m.title}`);
      if (!hits.length) line('no records matched', 'note');
      return { out, exit: 0 };
    }

    case 'index': {
      if (args[0] === 'rebuild') {
        const id = args[1] ?? sources[0]!.id;
        const s = sources.find((x) => x.id === id) ?? sources[0]!;
        s.status = 'indexing';
        s.progress = 6;
        line(`rebuild started · ${s.name}`, 'note');
        const iv = window.setInterval(() => {
          s.progress = Math.min(100, s.progress + randInt(9, 24));
          if (s.progress >= 100) {
            window.clearInterval(iv);
            s.status = 'ready';
            logCore('success', 'index', `Shell-triggered rebuild complete · ${s.name}`);
          }
        }, 650);
        return { out, exit: 0 };
      }
      line('usage: index rebuild [sourceId]', 'err');
      return { out, exit: 2 };
    }

    case 'model': {
      const tier = args[1] ?? 'balanced';
      const chosen = models.find((m) => m.tier === tier && m.status === 'ready') ?? models[1]!;
      line(`router decision for tier=${tier}`);
      line(`  selected   ${chosen.name} (${chosen.providerLabel})`);
      line(`  cost/1k    $${chosen.costPer1kIn.toFixed(4)} in · $${chosen.costPer1kOut.toFixed(4)} out`);
      line(`  fallbacks  ${models.filter((m) => m.id !== chosen.id && m.quality >= chosen.quality - 8).slice(0, 3).map((m) => m.name).join(' → ')}`);
      line(`  privacy    ${chosen.provider === 'local' ? 'nothing leaves the machine' : 'redacted payload · no secrets in context'}`, 'note');
      return { out, exit: 0 };
    }

    case 'trace': {
      const id = args[0];
      const a = world.agents.find((x) => x.id === id || x.name === id);
      if (!a) return { out: [{ kind: 'err', text: 'usage: trace <agentId>' }], exit: 2 };
      line(`trace ${a.id} · last 6 audited steps`);
      for (const s of a.stepsTotal ? [1, 2, 3, 4] : []) line(`  step ${s}/${a.stepsTotal} ${a.task} · ${Math.round(rand(20, 900))}ms`);
      line(`  tokens ${a.tokensIn} in / ${a.tokensOut} out · $${a.costUsd}`, 'note');
      return { out, exit: 0 };
    }

    case 'approve':
    case 'deny': {
      const id = args[0];
      const i = world.approvals.findIndex((x) => x.id === id);
      if (i < 0) return { out: [{ kind: 'err', text: `no approval ${id ?? ''}` }], exit: 1 };
      const [r] = world.approvals.splice(i, 1);
      line(`${cmd === 'approve' ? 'approved' : 'denied'} · ${r!.requestedBy}: ${r!.action}`, 'note');
      pushActivity('security', 'Operator', `${cmd === 'approve' ? 'approved' : 'denied'} approval`, r!.action, true);
      return { out, exit: 0 };
    }

    case 'open': {
      const target = (args[0] ?? 'core').toLowerCase();
      window.dispatchEvent(new CustomEvent('hercules:navigate', { detail: { screen: target } }));
      line(`navigating → ${target}`, 'note');
      return { out, exit: 0 };
    }

    case 'ps':
      for (const p of world.agents.filter((a) => a.status === 'working').slice(0, 8)) line(`4${randInt(10, 99)}  ${rand(2, 40).toFixed(1)}%  ${randInt(80, 900)}MB  agent ${p.name}`);
      return { out, exit: 0 };

    case 'git': {
      const sub = args[0];
      if (sub === 'status') {
        line(`On branch main · ahead of origin/main by ${randInt(1, 6)}`);
        for (const f of ['src/runtime.ts', 'src/router.ts', 'src/session-broker.ts', 'docs/backend.md']) line(`  modified:   ${f}`);
        return { out, exit: 0 };
      }
      if (sub === 'diff' || sub === 'log') {
        line(sub === 'log' ? `a1f9c2d freeze core contract (Engineering Lead · 3h ago)` : `4 files changed, ${randInt(40, 320)} insertions(+), ${randInt(20, 180)} deletions(-)`);
        return { out, exit: 0 };
      }
      line(`git ${sub ?? ''} · ok`, 'note');
      return { out, exit: 0 };
    }

    case 'npm': {
      const sub = args[0];
      if (sub === 'run' && (args[1] === 'typecheck' || args[1] === 'build' || args[1] === 'test')) {
        line(`> ${args[1]}`);
        line(args[1] === 'test' ? `PASS  ${randInt(180, 420)} tests · fail 0 · skip ${randInt(1, 6)}` : `ok · ${6} packages · ${randInt(18, 62)}s`);
        return { out, exit: 0 };
      }
      line(`added ${randInt(1, 40)} packages in ${randInt(1, 14)}s`, 'note');
      return { out, exit: 0 };
    }

    case 'docker':
      line(`CONTAINER   STATUS            NAME`);
      for (const n of ['vector-store', 'sandbox-browser-x8', 'gpu-pool-02', 'session-broker']) line(`c${randInt(1000, 9999)}  Up ${randInt(2, 40)}m        ${n}`);
      return { out, exit: 0 };

    case 'whoami':
      line('operator@hercules · clearance: owner');
      return { out, exit: 0 };

    case 'ls':
      for (const n of ['src', 'reports', 'inbox', 'media', 'policies', 'automations']) line(`${n}${n === 'src' || n === 'reports' ? '/' : ''}`);
      return { out, exit: 0 };

    case 'cd':
      session.cwd = `${session.cwd}/${args[0] ?? ''}`.replace(/\/+/g, '/');
      return { out, exit: 0 };

    case 'cat': {
      const f = args[0];
      if (!f) return { out: [{ kind: 'err', text: 'usage: cat <path>' }], exit: 2 };
      for (const l of loremLines()) line(l);
      return { out, exit: 0 };
    }

    case 'kill': {
      const pid = Number(args[0]);
      if (!pid || flag('force')) {
        line(`refused: kill requires the --force flag AND operator approval (policy: system.process)`, 'err');
        return { out, exit: 126 };
      }
      line(`sent SIGTERM to ${pid}`, 'note');
      return { out, exit: 0 };
    }

    case 'clear':
      buffers.set(session.id, []);
      return { out, exit: 0 };

    default:
      line(`hercules-shell: command not found: ${cmd ?? ''} — try “help”`, 'err');
      return { out, exit: 127 };
  }
}

function loremLines() {
  return Array.from({ length: 6 }, (_, i) => `${i + 1}  ${pick([
    'status: in-progress',
    'owner: agt-software-engineer',
    'gate: verification before hand-off',
    'cost: $2.14 projected',
    'sources: 3 · verified: yes',
    'trace: tr-91f2ac',
  ])}`);
}

export const mockTerminal: TerminalService = {
  async sessions() {
    return sessions.map((s) => ({ ...s }));
  },
  async create(name, shell, cwd) {
    const s: TerminalSession = { id: uid('tms'), name, shell, cwd, agentDriven: false, risk: 'medium' };
    sessions.push(s);
    buffers.set(s.id, [{ id: uid('ln'), kind: 'note', text: `session “${name}” · ${shell} · ${cwd}`, at: iso() }]);
    return { ...s };
  },
  async close(id) {
    const i = sessions.findIndex((s) => s.id === id);
    if (i >= 0) sessions.splice(i, 1);
    buffers.delete(id);
  },
  async exec(sessionId, command, opts) {
    const session = sessions.find((s) => s.id === sessionId) ?? sessions[0]!;
    push(sessionId, 'cmd', command);
    const release = holdState(opts?.agentDriven ? 'executing' : 'thinking', `terminal:${sessionId}`);
    const started = performance.now();
    const result = runCommand(session, command);
    await jitter(140, 520);
    for (const l of result.out) push(sessionId, l.kind, l.text);
    if (command.trim() !== 'clear') push(sessionId, 'note', `exit ${result.exit} · ${Math.round(performance.now() - started)}ms`);
    release();
    pushActivity('tool', opts?.agentDriven ? 'agent' : 'Operator', `ran \`${command.slice(0, 44)}\``, `exit ${result.exit}${opts?.agentDriven ? ' · audited' : ''}`, !!opts?.agentDriven);
    return { exitCode: result.exit, lines: result.out, durationMs: Math.round(performance.now() - started) };
  },
  async buffer(sessionId) {
    return [...(buffers.get(sessionId) ?? [])];
  },
  async completions(prefix) {
    const p = (prefix ?? '').toLowerCase();
    return KNOWN_COMMANDS.filter((c) => c.startsWith(p));
  },
};
