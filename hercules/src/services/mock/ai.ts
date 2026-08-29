/**
 * HERCULES · mock AI service
 * ---------------------------------------------------------------------------
 * Stands in for the real core's inference + orchestration channel. It has no
 * model inside it: it *simulates the shape of a real answer* (plans, tool
 * calls, approvals, citations, streaming, cost) so the UI can be built and
 * verified against a realistic contract.
 */
import type { AIService, CommandIntent, Unsubscribe } from '@/services/contracts';
import type { ChatMessage, MessageBlock, StreamChunk } from '@/types/domain';
import { conversations as seedConversations, messages as seedMessages } from './fixtures';
import { holdState, logCore, pushActivity, pushNotice, setState, world } from './runtime';
import { chance, clamp, iso, pick, rand, randInt, sleepCancellable, tokenize, uid } from './helpers';

interface Thread {
  id: string;
  title: string;
  at: string;
  preview: string;
  messages: ChatMessage[];
}

const threads = new Map<string, Thread>();
for (const c of seedConversations) {
  threads.set(c.id, { ...c, messages: seedMessages.filter((m) => m.conversationId === c.id) });
}
let active = [...threads.values()].sort((a, b) => (a.at < b.at ? 1 : -1))[0]!;

const aborts = new Map<string, AbortController>();

/* ── intent detection (shared with the command bar) ───────────────────────── */

export function detectIntent(text: string): CommandIntent {
  const t = text.toLowerCase();
  const num = t.match(/\d+/)?.[0];
  const hit = (re: RegExp) => re.test(t);
  if (hit(/\b(switch|change|go|open|show)\b.*\b(memory|files|knowledge|terminal|browser|settings|agents|departments|tasks|projects|automations|analytics|activity|notifications|permissions|media|system)\b/)) {
    const screen = ['memory', 'files', 'knowledge', 'terminal', 'browser', 'settings', 'agents', 'departments', 'tasks', 'projects', 'automations', 'analytics', 'activity', 'notifications', 'permissions', 'media', 'system'].find((s) => t.includes(s))!;
    return { verb: 'navigate', targetKind: 'screen', targetLabel: screen, confidence: 0.9 };
  }
  if (hit(/\b(pause|stop|freeze)\b.*\b(all|everything|agents?)\b/)) return { verb: 'core.freeze', targetKind: 'system', targetLabel: 'agent estate', confidence: 0.86 };
  if (hit(/\b(spawn|recruit|create|add)\b.*\bagent\b/)) return { verb: 'agent.spawn', targetKind: 'agent', targetLabel: 'new agent', confidence: 0.8, args: { role: t.includes('test') ? 'test-engineer' : 'executor' } };
  if (hit(/\b(draft|write|compose)\b.*\b(mail|email|reply)\b/)) return { verb: 'comms.draft', targetKind: 'task', targetLabel: 'outbound draft', confidence: 0.72 };
  if (hit(/\b(cost|spend|budget|burn)\b/)) return { verb: 'analytics.spend', targetKind: 'screen', targetLabel: 'analytics', confidence: 0.78 };
  if (hit(/\b(approve|allow|yes|do it|go ahead)\b/)) return { verb: 'approval.approve', targetKind: 'system', targetLabel: world.approvals[0]?.action ?? 'oldest approval', confidence: 0.7 };
  if (hit(/\b(deny|reject|no)\b/)) return { verb: 'approval.deny', targetKind: 'system', targetLabel: world.approvals[0]?.action ?? 'oldest approval', confidence: 0.7 };
  if (hit(/\b(read|play|pause|next|volume)\b/)) return { verb: 'media.control', targetKind: 'media', targetLabel: 'media playback', confidence: 0.66 };
  if (hit(/\b(remember|note that|make a note)\b/)) return { verb: 'memory.write', targetKind: 'memory', targetLabel: text.slice(0, 48), confidence: 0.88, args: { length: num ? Number(num) : 1 } };
  if (hit(/\bwhat.*(state|status|progress|happening)|where.*we at|brief me\b/)) return { verb: 'core.status', targetKind: 'screen', targetLabel: 'core', confidence: 0.84 };
  if (hit(/\b(schedule|task|todo|remind)\b/)) return { verb: 'task.create', targetKind: 'task', targetLabel: text.slice(0, 48), confidence: 0.7 };
  return { verb: 'core.ask', targetKind: 'screen', targetLabel: 'core', confidence: 0.5 };
}

/* ── answer composition ──────────────────────────────────────────────────── */

function working() {
  return world.agents.filter((a) => a.status === 'working' || a.status === 'thinking');
}

function statusAnswer(): MessageBlock[] {
  const w = working();
  const blocked = world.tasks.filter((t) => t.status === 'blocked');
  const approvals = world.approvals.length;
  return [
    {
      kind: 'text',
      text: `${w.length} agents are live and ${blocked.length ? `${blocked.length} task${blocked.length === 1 ? ' is' : 's are'} stuck` : 'nothing is stuck'}. Your signature is the only thing in the critical path.`,
    },
    {
      kind: 'plan',
      steps: [
        { id: 's1', label: 'Freeze v0.9 core API contract', status: 'active', agent: 'Engineering Lead' },
        { id: 's2', label: 'Clear render-farm VRAM regression', status: blocked.length ? 'failed' : 'done', agent: 'Infrastructure' },
        { id: 's3', label: 'Re-sequence partner onboarding behind audit', status: 'pending', agent: 'Comms Gatekeeper' },
        { id: 's4', label: 'Deliver go/no-go read 48h before freeze', status: 'pending', agent: 'Orchestrator Prime' },
      ],
    },
    {
      kind: 'tool-call',
      tool: 'registry.snapshot',
      args: '{"agents":"active","depth":2}',
      result: `${w.length} working · ${world.agents.filter((a) => a.tier === 'subagent' || a.tier === 'labor').length} labour · ${approvals} approval${approvals === 1 ? '' : 's'} pending`,
      status: 'ok',
    },
    ...(approvals
      ? [
          {
            kind: 'approval' as const,
            text: `${world.approvals[0]!.requestedBy} asked to ${world.approvals[0]!.action.toLowerCase()}. ${world.approvals[0]!.reason}`,
            status: 'pending' as const,
          },
        ]
      : []),
  ];
}

function spendAnswer(): MessageBlock[] {
  const month = 2_860 + 498 + 312 + 604 + 388 + 214;
  return [
    { kind: 'text', text: `Month-to-date you are at $${month.toLocaleString()} of the $4,200 cap. Local inference absorbed 61% of all tokens for free, which is the only reason this is on track.` },
    { kind: 'chart', text: 'Daily spend, last 14 days', series: [{ label: 'spend $', values: Array.from({ length: 14 }, (_, i) => Math.round(96 + Math.sin(i / 1.9) * 34 + i * 3.2)) }] },
    { kind: 'tool-call', tool: 'analytics.spend', args: '{"window":"mtd","by":"model"}', result: 'Nova X1 41% · Lite 22% · local 19% · Pigment 11% · other 7%', status: 'ok' },
    { kind: 'text', text: 'If I move Research Lead and Code Reviewer to Quill 70B, projected spend drops to $3,740 with a 4-point quality loss on multi-hop reasoning. Say “make it so” and I will apply it for 14 days, then report.' },
  ];
}

function researchAnswer(): MessageBlock[] {
  return [
    { kind: 'text', text: 'Two funded teams shipped CLI-first agent layers this week. Neither has a permission model beyond per-action prompts — that is the gap we own. Six sources, three primary.' },
    {
      kind: 'plan',
      steps: [
        { id: 'r1', label: '38 sources read, 6 paywalled flagged', status: 'done', agent: 'Source Hunter' },
        { id: 'r2', label: '61 claims cross-checked against primary', status: 'active', agent: 'Claim Verifier' },
        { id: 'r3', label: 'Comparison table + risk read', status: 'pending' },
      ],
    },
    { kind: 'citations', citations: [
      { id: 'c1', title: 'arxiv 2608.11442 · Agentic scheduling under budget', source: 'Watched web' },
      { id: 'c2', title: 'Nova Labs pricing changelog', source: 'Browser capture' },
      { id: 'c3', title: 'Partner #7 transcript — “show me what it is doing”', source: 'Mail archive' },
    ] },
  ];
}

function memoryAnswer(text: string): MessageBlock[] {
  const stripped = text.replace(/^\s*(remember|note that|make a note|note:)\s*/i, '').trim();
  const title = (stripped || 'Operator preference').slice(0, 64);
  return [
    { kind: 'text', text: `Written. I bound it to scope “private”, tagged it, and made it a hard constraint on how I brief you.` },
    { kind: 'file', text: `memory · ${title}`, status: 'ok' },
  ];
}

function genericAnswer(text: string): MessageBlock[] {
  const agent = pick(working());
  return [
    {
      kind: 'text',
      text:
        `Here is how I read it: ${text.replace(/[?.!]+\s*$/, '').slice(0, 140)} — I can do that, and I would split it like so. ` +
        `Nothing in this answer needed your credentials, and every claim below carries a source handle.`,
    },
    {
      kind: 'plan',
      steps: [
        { id: 'g1', label: 'Confirm constraints against policy', status: 'done', agent: 'Compliance Auditor' },
        { id: 'g2', label: 'Draft approach and cost it', status: 'active', agent: agent?.name ?? 'HERCULES' },
        { id: 'g3', label: 'Execute with a verification gate', status: 'pending' },
        { id: 'g4', label: 'Report with evidence, not prose', status: 'pending' },
      ],
    },
    { kind: 'tool-call', tool: 'knowledge.query', args: `{"text":"${text.slice(0, 40)}…"}`, result: `5 chunks above 0.72 · 1 stale source excluded`, status: 'ok' },
    { kind: 'text', text: 'Want me to start it, or is there a constraint I should know before I commit agents to this?' },
  ];
}

function composeAnswer(text: string): { blocks: MessageBlock[]; intent: CommandIntent } {
  const intent = detectIntent(text);
  switch (intent.verb) {
    case 'core.status':
      return { blocks: statusAnswer(), intent };
    case 'analytics.spend':
      return { blocks: spendAnswer(), intent };
    case 'core.ask':
      if (/\b(research|competitor|market|teardown|who else)\b/i.test(text)) return { blocks: researchAnswer(), intent };
      return { blocks: genericAnswer(text), intent };
    case 'memory.write':
      return { blocks: memoryAnswer(text), intent };
    default:
      return { blocks: genericAnswer(text), intent };
  }
}

/** Side effects an answer implies for the rest of the estate. */
function applySideEffects(text: string, intent: CommandIntent) {
  const lower = text.toLowerCase();
  if (intent.verb === 'memory.write') {
    const title = (text.replace(/^\s*(remember|note that|make a note|note:)\s*/i, '').trim() || 'Operator preference').slice(0, 72);
    logCore('success', 'memory', `Wrote preference: ${title}`);
    pushActivity('memory', 'HERCULES', 'wrote memory', title, true);
  }
  if (intent.verb === 'task.create' || /\b(create|open|file)\b.*\btask\b/i.test(lower)) {
    const title = text.replace(/^\W+/g, '').slice(0, 72) || 'New operator task';
    world.tasks = [
      {
        id: uid('tsk'),
        title,
        objective: title,
        status: 'queued',
        priority: 'p1',
        assigneeAgentId: 'agt-chief-of-staff',
        departmentId: 'dep-ops',
        projectId: null,
        progress: 0,
        estimateMin: 60,
        elapsedMin: 0,
        requiresApproval: false,
        tags: ['from-command-bar'],
        events: [{ at: iso(), actor: 'HERCULES', kind: 'status', text: 'Created from operator prompt · routed to Operations' }],
        artifacts: [],
        createdAt: iso(),
        updatedAt: iso(),
      },
      ...world.tasks,
    ];
    pushActivity('task', 'HERCULES', `queued “${title}”`, 'routed to Operations');
  }
  if (/\b(thursday|monday|move|reschedule|calendar)\b/i.test(lower)) {
    logCore('info', 'scheduler', 'Calendar Warden engaged on reschedule request · 11 events in scope');
    pushActivity('agent', 'Calendar Warden', 'started a calendar re-sequence', 'protected blocks respected');
  }
  if (/\b(render|vram|gpu)\b/i.test(lower)) {
    pushNotice({
      severity: 'warning',
      title: 'Render capacity decision surfaced',
      body: 'Node 02 is at 94% VRAM. I can cap the render queue at 2 nodes and lose ~14% throughput.',
      source: 'Infrastructure',
      actionable: true,
      actions: [{ id: 'approve', label: 'Cap it', kind: 'approve' }],
    });
  }
}

export const mockAi: AIService = {
  async models() {
    const { models } = await import('./fixtures');
    return models.map((m) => ({
      ...m,
      latencyMs: Math.max(40, Math.round(m.latencyMs * clamp(0.85 + rand(-0.15, 0.3), 0.7, 1.4))),
      status: m.status === 'slow' && chance(0.4) ? 'ready' : m.status,
    }));
  },
  async conversation(id: string) {
    const t = threads.get(id) ?? active;
    return [...t.messages];
  },
  async conversations() {
    return [...threads.values()]
      .sort((a, b) => (a.at < b.at ? 1 : -1))
      .map(({ id, title, at, preview }) => ({ id, title, at, preview }));
  },
  async stop(conversationId: string) {
    aborts.get(conversationId)?.abort();
    aborts.delete(conversationId);
  },
  async actAsIntent(text: string) {
    await new Promise((r) => setTimeout(r, randInt(140, 320)));
    return detectIntent(text);
  },
  async summarize(taskId: string) {
    const t = world.tasks.find((x) => x.id === taskId);
    if (!t) return 'That task is not in my index.';
    return `${t.title}: ${t.progress}% done, status ${t.status}. Last real event — ${t.events[0]?.text ?? 'no events'}. ${t.artifacts.length ? `${t.artifacts.length} deliverable(s) filed.` : 'No deliverables yet.'}`;
  },
  submit(input) {
    const text = input.text.trim();
    const thread = input.conversationId ? (threads.get(input.conversationId) ?? active) : active;
    const operatorMsg: ChatMessage = {
      id: uid('msg'),
      conversationId: thread.id,
      role: 'operator',
      at: iso(),
      blocks: [{ kind: 'text', text }],
    };
    thread.messages = [...thread.messages, operatorMsg];
    thread.title = thread.messages.length <= 2 ? titleFrom(text) : thread.title;
    thread.preview = text.slice(0, 90);
    thread.at = iso();

    const controller = new AbortController();
    aborts.set(thread.id, controller);

    const gen = (async function* () {
      const { blocks, intent } = composeAnswer(text);
      const replyId = uid('msg');
      const reply: ChatMessage = {
        id: replyId,
        conversationId: thread.id,
        role: 'hercules',
        at: iso(),
        blocks: [],
        streaming: true,
        model: 'Nova X1',
      };
      thread.messages = [...thread.messages, reply];
      const release = holdState('thinking', 'ai.submit');
      yield { conversationId: thread.id, messageId: replyId, coreState: 'thinking' } satisfies StreamChunk;
      await sleepCancellable(randInt(320, 780), controller.signal);

      let tokens = 0;
      try {
        for (const block of blocks) {
          if (block.kind === 'text' && block.text) {
            for (const chunk of tokenize(block.text)) {
              if (controller.signal.aborted) break;
              reply.blocks = upsertText(reply.blocks, chunk);
              tokens += Math.ceil(chunk.length / 4);
              yield { conversationId: thread.id, messageId: replyId, delta: chunk, coreState: 'speaking' } satisfies StreamChunk;
              await sleepCancellable(chunk.endsWith('\n') ? 60 : clamp(18 + chunk.length * 2.4, 14, 90), controller.signal);
            }
            reply.blocks = sealText(reply.blocks);
          } else {
            reply.blocks = [...reply.blocks, block];
            yield { conversationId: thread.id, messageId: replyId, block, coreState: 'executing' } satisfies StreamChunk;
            await sleepCancellable(randInt(220, 620), controller.signal);
          }
        }
      } finally {
        reply.streaming = false;
        release();
        aborts.delete(thread.id);
        setState(controller.signal.aborted ? 'idle' : world.vitals.state);
      }
      if (controller.signal.aborted) {
        yield { conversationId: thread.id, messageId: replyId, done: true, coreState: 'idle' } satisfies StreamChunk;
        return;
      }
      reply.tokens = Math.max(40, tokens);
      applySideEffects(text, intent);
      thread.preview = blocks[0]?.text?.slice(0, 90) ?? thread.preview;
      thread.at = iso();
      yield { conversationId: thread.id, messageId: replyId, done: true, coreState: 'idle' } satisfies StreamChunk;
    })();

    return gen;
  },
};

function titleFrom(text: string) {
  const cleaned = text.replace(/^(hey |ok |please )*hercules[,!]?\s*/i, '').trim();
  const first = cleaned.split(/[?.!]/)[0] ?? cleaned;
  return first.length > 46 ? `${first.slice(0, 46)}…` : first || 'New thread';
}

function upsertText(blocks: MessageBlock[], delta: string): MessageBlock[] {
  const last = blocks[blocks.length - 1];
  if (last && last.kind === 'text' && !last.status) {
    const next = { ...last, text: (last.text ?? '') + delta };
    return [...blocks.slice(0, -1), next];
  }
  return [...blocks, { kind: 'text', text: delta }];
}

function sealText(blocks: MessageBlock[]): MessageBlock[] {
  const last = blocks[blocks.length - 1];
  if (last?.kind === 'text') return [...blocks.slice(0, -1), { ...last, text: (last.text ?? '').replace(/\s+$/, '') }];
  return blocks;
}

export const mockThreads = {
  get activeId() {
    return active.id;
  },
  touchActive(id: string) {
    const t = threads.get(id);
    if (t) active = t;
  },
  ensureConversation(): string {
    const id = uid('cnv');
    const t: Thread = { id, title: 'New thread', at: iso(), preview: 'Awaiting your first line.', messages: [] };
    threads.set(id, t);
    active = t;
    return id;
  },
  subscribe(fn: (id: string) => void): Unsubscribe {
    const iv = window.setInterval(() => fn(active.id), 15_000);
    return () => window.clearInterval(iv);
  },
};
