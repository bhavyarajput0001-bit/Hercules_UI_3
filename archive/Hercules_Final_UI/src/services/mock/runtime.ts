/**
 * HERCULES · mock runtime
 * ---------------------------------------------------------------------------
 * The mock layer is a single shared "world" that every mock service reads and
 * mutates, plus one heartbeat that advances it. This is what makes the demo
 * feel alive: a task completing here shows up in Activity, Analytics, the
 * core vitals and a notification at the same instant — exactly how a real
 * backend push channel would behave.
 *
 * Swap this file for a websocket/REST client and nothing above it changes.
 */
import type {
  ActivityEvent,
  ActivityKind,
  MemoryRecord,
  Agent,
  ApprovalRequest,
  Automation,
  AutomationRun,
  CoreState,
  CoreVitals,
  Department,
  MissionLog,
  Notice,
  Project,
  Task,
} from '@/types/domain';
import { createBus, createTicker } from './bus';
import {
  activityEvents,
  agents as seedAgents,
  memory as seedMemory,
  approvalRequests as seedApprovals,
  automations as seedAutomations,
  departments as seedDepartments,
  notices as seedNotices,
  projects as seedProjects,
  tasks as seedTasks,
} from './fixtures';
import { chance, clamp, iso, pick, rand, randInt, uid } from './helpers';

export interface World {
  phase: import('@/types/domain').BootPhase;
  agents: Agent[];
  departments: Department[];
  tasks: Task[];
  projects: Project[];
  automations: Automation[];
  activity: ActivityEvent[];
  notices: Notice[];
  approvals: ApprovalRequest[];
  logs: MissionLog[];
  vitals: CoreVitals;
  holds: Map<string, CoreState>;
  running: Set<string>;
}

const startedAt = Date.now();

/** Long-term memory lives with the world so every service can read/write it. */
export const memoryStore: { records: MemoryRecord[] } = { records: [...seedMemory] };

export const world: World = {
  phase: 'cold',
  agents: seedAgents,
  departments: seedDepartments,
  tasks: seedTasks,
  projects: seedProjects,
  automations: seedAutomations,
  activity: [...activityEvents],
  notices: [...seedNotices],
  approvals: [...seedApprovals],
  logs: [],
  holds: new Map(),
  running: new Set(),
  vitals: {
    state: 'idle',
    energy: 0.22,
    cognitiveLoad: 38,
    memoryPressure: 44,
    integrity: 99.2,
    activeAgents: 14,
    queuedTasks: 6,
    uptimeMs: 0,
    focus: 'Standing by · watching 41 sources',
  },
};

/* ── buses ───────────────────────────────────────────────────────────────── */

export const coreBus = createBus<
  | { type: 'vitals'; vitals: CoreVitals }
  | { type: 'state'; state: CoreState }
  | { type: 'log'; log: MissionLog }
>();
export const agentBus = createBus<{ type: 'updated'; agent: Agent } | { type: 'removed'; id: string }>();
export const taskBus = createBus<{ type: 'updated'; task: Task } | { type: 'created'; task: Task }>();
export const noticeBus = createBus<{ notice: Notice }>();
export const activityBus = createBus<{ event: ActivityEvent }>();
export const automationBus = createBus<{ type: 'run'; automationId: string; status: AutomationRun['status'] }>();
export const mediaBus = createBus<{ state: import('@/types/domain').MediaState }>();
export const voiceBus = createBus<import('@/types/domain').VoiceEvent>();
export const systemBus = createBus<{ snapshot: import('@/types/domain').SystemSnapshot }>();

/* ── write helpers (services use these so cross-talk stays consistent) ───── */

export function logCore(level: MissionLog['level'], source: string, text: string) {
  const log: MissionLog = { id: uid('log'), at: iso(), level, source, text };
  world.logs = [log, ...world.logs].slice(0, 220);
  coreBus.emit({ type: 'log', log });
  // Mirrored onto the window so the boot overlay can render without holding a
  // subscription of its own (it mounts before the store wires services).
  window.dispatchEvent(new CustomEvent('hercules:bootlog', { detail: log }));
  return log;
}

export function pushActivity(kind: ActivityKind, actor: string, action: string, detail?: string, sensitive = false) {
  const event: ActivityEvent = {
    id: uid('act'),
    at: iso(),
    kind,
    actor,
    action,
    target: detail,
    detail,
    sensitive,
    traceId: `tr-${Math.floor(rand(1, 0xfffff)).toString(16)}`,
  };
  world.activity = [event, ...world.activity].slice(0, 400);
  activityBus.emit({ event });
  return event;
}

export function pushNotice(
  input: Omit<Notice, 'id' | 'at' | 'read' | 'actionable'> & { read?: boolean; actionable?: boolean },
) {
  const notice: Notice = {
    id: uid('not'),
    at: iso(),
    read: false,
    actionable: input.actionable ?? (Array.isArray(input.actions) && input.actions.length > 0),
    ...input,
  };
  world.notices = [notice, ...world.notices].slice(0, 80);
  noticeBus.emit({ notice });
  return notice;
}

/** Derived vitals — cheap, recomputed each tick. */
export function recomputeVitals() {
  const active = world.agents.filter((a) => a.status === 'working' || a.status === 'thinking' || a.status === 'awaiting-approval');
  const queued = world.tasks.filter((t) => t.status === 'queued' || t.status === 'backlog').length;
  const blocked = world.tasks.filter((t) => t.status === 'blocked').length;
  const load = clamp((active.length / 6) * 52 + blocked * 7 + rand(-3, 4), 8, 99);
  const v = world.vitals;
  v.activeAgents = active.length;
  v.queuedTasks = queued;
  v.cognitiveLoad = Math.round(load);
  v.memoryPressure = Math.round(clamp(38 + active.length * 3.1 + rand(-2, 3), 5, 96));
  v.integrity = Number(clamp(v.integrity + (chance(0.7) ? 0.02 : -0.05), 92, 100).toFixed(2));
  v.uptimeMs = Date.now() - startedAt;
  v.energy = clamp(0.14 + load / 140 + (v.state === 'speaking' ? 0.22 : 0) + (v.state === 'thinking' ? 0.16 : 0), 0.08, 1);
  if (world.holds.size === 0) {
    const next: CoreState = blocked > 3 ? 'alert' : active.length > 0 ? 'executing' : 'idle';
    if (next !== v.state) setState(next);
  }
  const focus = active.length
    ? `${active.length} agent${active.length === 1 ? '' : 's'} active · ${queued} queued`
    : 'Standing by · watching 41 sources';
  if (focus !== v.focus) v.focus = focus;
  coreBus.emit({ type: 'vitals', vitals: { ...v } });
}

export function setState(state: CoreState) {
  if (world.vitals.state === state) return;
  world.vitals.state = state;
  coreBus.emit({ type: 'state', state });
  coreBus.emit({ type: 'vitals', vitals: { ...world.vitals } });
}

export function holdState(state: CoreState, owner: string) {
  world.holds.set(owner, state);
  setState(state);
  return () => {
    world.holds.delete(owner);
    recomputeVitals();
  };
}

export function priorityState(): CoreState | null {
  const order: CoreState[] = ['error', 'alert', 'executing', 'thinking', 'speaking', 'listening'];
  for (const s of order) if ([...world.holds.values()].includes(s)) return s;
  return null;
}

/* ── heartbeat: the thing that makes HERCULES feel alive ─────────────────── */

const tick = createTicker(2_500, () => {
  const t = Date.now();
  let changed = false;

  for (const a of world.agents) {
    if (a.status !== 'working' && a.status !== 'thinking') continue;
    if (a.stepsTotal > 0 && a.stepsCompleted >= a.stepsTotal) continue;
    const step = a.tier === 'labor' || a.tier === 'subagent' ? randInt(2, 26) : randInt(0, 2);
    if (step && a.stepsTotal > 0) {
      a.stepsCompleted = Math.min(a.stepsTotal, a.stepsCompleted + step);
      changed = true;
    }
    a.load = Math.round(clamp(a.load + rand(-6, 6), 12, 99));
    a.tokensIn += randInt(200, 3_800);
    a.tokensOut += randInt(90, 1_400);
    a.costUsd = Number((a.costUsd + rand(0, 0.09)).toFixed(3));
    a.lastHeartbeat = new Date(t).toISOString();
    agentBus.emit({ type: 'updated', agent: { ...a } });
  }

  for (const tk of world.tasks) {
    if (tk.status !== 'in-progress') continue;
    const agent = world.agents.find((a) => a.id === tk.assigneeAgentId);
    const bump = agent ? rand(0.2, 1.9) : rand(0, 0.4);
    tk.progress = Math.min(100, Math.round(tk.progress + bump));
    tk.elapsedMin = Math.round(tk.elapsedMin + 0.04);
    if (tk.progress >= 100) {
      tk.status = chance(0.14) ? 'blocked' : 'review';
      tk.events = [
        { at: iso(), actor: agent?.name ?? 'hercules', kind: 'status', text: `Progress 100% → moved to ${tk.status}` },
        ...tk.events,
      ];
      pushActivity('task', agent?.name ?? 'HERCULES', `moved “${tk.title}” to ${tk.status}`, `progress ${tk.progress}%`);
      pushNotice({
        severity: tk.status === 'review' ? 'info' : 'warning',
        title: tk.status === 'review' ? `Review ready · ${tk.title}` : `Blocked · ${tk.title}`,
        body: tk.status === 'review' ? 'Agent finished and self-verified. Deliverable filed to ATLAS.' : 'Agent hit a wall and stopped. Trace attached.',
        source: 'Task engine',
        actionable: true,
        actions:
          tk.status === 'review'
            ? [
                { id: 'approve', label: 'Accept', kind: 'approve' },
                { id: 'open', label: 'Open task', kind: 'open' },
              ]
            : [{ id: 'retry', label: 'Retry', kind: 'retry' }],
        related: { kind: 'task', id: tk.id },
      });
      if (agent) {
        agent.status = 'idle';
        agent.task = 'Awaiting review of hand-off';
        agentBus.emit({ type: 'updated', agent: { ...agent } });
      }
    }
    taskBus.emit({ type: 'updated', task: { ...tk } });
    changed = true;
  }

  for (const au of world.automations) {
    if (!au.enabled) continue;
    for (const st of au.steps) {
      if (st.status === 'running' && chance(0.4)) {
        st.status = chance(0.06) ? 'failed' : 'ok';
        const nextIdx = au.steps.findIndex((x) => x.id === st.id) + 1;
        if (au.steps[nextIdx] && au.steps[nextIdx]!.status === 'pending' && st.status === 'ok') au.steps[nextIdx]!.status = 'running';
        automationBus.emit({ type: 'run', automationId: au.id, status: st.status === 'ok' ? 'ok' : 'failed' });
        changed = true;
      }
    }
    const last = new Date(au.lastRun ?? 0).getTime();
    const expr = au.trigger.expr ?? '';
    const periodMs = expr.includes('15') ? 15 * 60_000 : expr.includes('6') ? 6 * 3_600_000 : 90_000;
    if (Date.now() - last > periodMs && !world.running.has(au.id)) {
      world.running.add(au.id);
      const firstPending = au.steps.find((s) => s.status === 'pending') ?? au.steps[0];
      if (firstPending) firstPending.status = 'running';
      au.lastRun = iso();
      window.setTimeout(() => {
        world.running.delete(au.id);
        const ok = !chance(0.12);
        for (const s of au.steps) if (s.kind !== 'approval') s.status = ok ? 'ok' : 'failed';
        const run: AutomationRun = {
          id: uid('run'),
          at: iso(),
          durationMs: randInt(4_000, 90_000),
          status: ok ? 'ok' : 'failed',
          summary: ok ? 'Completed · signals filed to core' : 'Step failed · retry queued with backoff',
          costUsd: Number(rand(0.02, 1.4).toFixed(2)),
        };
        au.runs = [run, ...au.runs].slice(0, 24);
        automationBus.emit({ type: 'run', automationId: au.id, status: run.status });
        pushActivity('automation', au.name, ok ? 'completed' : 'failed', run.summary);
        if (!ok) {
          pushNotice({
            severity: 'warning',
            title: `Automation failed · ${au.name}`,
            body: run.summary,
            source: 'Automations',
            actionable: true,
            actions: [
              { id: 'retry', label: 'Re-run', kind: 'retry' },
              { id: 'open', label: 'Open', kind: 'open' },
            ],
            related: { kind: 'automation', id: au.id },
          });
        }
        logCore(ok ? 'success' : 'warn', 'automation', `${au.name}: ${run.summary}`);
        recomputeVitals();
      }, randInt(3_500, 9_000));
    }
  }

  for (const p of world.projects) {
    const done = p.taskIds.filter((id) => world.tasks.find((t) => t.id === id)?.status === 'done').length;
    const total = Math.max(1, p.taskIds.length);
    p.progress = Math.round(clamp((done / total) * 100 + p.progress * 0.02, 0, 100));
  }

  world.departments.forEach((d) => {
    const live = world.agents.filter((a) => a.departmentId === d.id && (a.status === 'working' || a.status === 'thinking'));
    d.throughput = Math.round(clamp(52 + live.length * 6 + rand(-4, 4), 8, 99));
    d.backlogPressure = Math.round(clamp(world.tasks.filter((t) => t.departmentId === d.id && (t.status === 'queued' || t.status === 'backlog' || t.status === 'blocked')).length * 13 + rand(-3, 6), 4, 99));
  });

  if (chance(0.1)) {
    logCore(pick(['info', 'info', 'success', 'warn']), pick(['core', 'memory', 'router', 'ingest', 'scheduler', 'monitor']), pick([
      'Prefetch warmed for 2 likely intents',
      'Consolidated 2 episodic → 1 fact · saved 1.9k tokens',
      'Local model promoted to primary for non-frontier traffic',
      'Context budget trimmed 6% without losing recall',
      'Egress check clean',
      'Sub-agent tree reclaimed · 0 orphan processes',
    ]));
  }

  void changed;
  recomputeVitals();
});

export function startWorld() {
  tick.start();
}

export function stopWorld() {
  tick.stop();
}

/** Simulated cold boot, exposed for the boot sequence screen. */
export async function* bootSequence() {
  const steps: [string, number][] = [
    ['mounting /hercules · verifying signatures', 260],
    ['keychain handles: 4 resolved (values never loaded)', 180],
    ['session broker · ephemeral handshake', 240],
    ['on-device runtime · Quill 70B · Metal', 420],
    ['waking agent registry · 45 entries', 300],
    ['mounting ATLAS index · 18,402 documents', 380],
    ['restoring 6 missions · 3 in flight', 220],
    ['calibrating hologram · LOD 3', 260],
    ['voice: on-device wake-word ready', 200],
    ['HEARTBEAT · core online', 120],
  ];
  for (const [line, ms] of steps) {
    await new Promise((r) => setTimeout(r, ms));
    yield line;
  }
}
