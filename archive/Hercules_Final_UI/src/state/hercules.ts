/**
 * HERCULES · application store
 * ---------------------------------------------------------------------------
 * Holds everything that must survive a screen change (core vitals, agent and
 * task universes, notifications, toasts, command bar, voice) and exposes
 * actions that are *optimistic where it matters* and always visibly answered:
 * every action either mutates state or produces a toast. Screens never call
 * services directly; they call actions.
 */
import { createStore } from './createStore';
import type { AutonomyPolicy, HerculesServices } from '@/services/contracts';
import type {
  AppConfig,
  Agent,
  ApprovalRequest,
  CoreVitals,
  MediaState,
  Notice,
  Task,
  Toast,
  BootPhase,
  EntityId,
} from '@/types/domain';
import { mockServices } from '@/services/registry';
import type { ScreenId } from './nav';

export interface SelectedEntity {
  kind: 'agent' | 'task' | 'project' | 'department' | 'memory' | 'automation' | 'file' | 'model' | 'notice';
  id: string;
  label?: string;
}

export interface VoiceState {
  active: boolean;
  transcript: string;
  interim: boolean;
  level: number;
  speaking: boolean;
  error: string | null;
  engine: 'native' | 'simulated';
}

export interface AppState {
  services: HerculesServices;
  booted: boolean;
  phase: BootPhase;
  vitals: CoreVitals;
  screen: ScreenId;
  previous: ScreenId | null;
  selected: SelectedEntity | null;
  inspectorOpen: boolean;
  commandBarOpen: boolean;
  helpOpen: boolean;
  voice: VoiceState;
  agents: Agent[];
  tasks: Task[];
  notices: Notice[];
  approvals: ApprovalRequest[];
  media: MediaState;
  toasts: Toast[];
  /** entity ids that should visibly pulse once (set by actions, cleared by UI) */
  flash: Record<string, number>;
  /** per-key async busy flags: 'files.load', 'automation:aut-x' … */
  busy: Record<string, boolean>;
  /** monotonic counter screens watch to refetch */
  rev: Record<string, number>;
  /** live application config (settings service keeps this authoritative) */
  config: AppConfig;
  /** true once the cinematic boot overlay has been dismissed (⌘R replays it) */
  bootDismissed: boolean;
  modelOverlay: { on: boolean; label: string };
}

const initialVitals: CoreVitals = {
  state: 'dormant',
  energy: 0.1,
  cognitiveLoad: 0,
  memoryPressure: 0,
  integrity: 100,
  activeAgents: 0,
  queuedTasks: 0,
  uptimeMs: 0,
  focus: 'Dormant · awaiting boot',
};

export const store = createStore<AppState>({
  services: mockServices,
  booted: false,
  phase: 'cold',
  vitals: initialVitals,
  screen: 'core',
  previous: null,
  selected: null,
  inspectorOpen: false,
  commandBarOpen: false,
  helpOpen: false,
  voice: { active: false, transcript: '', interim: false, level: 0, speaking: false, error: null, engine: 'simulated' },
  agents: [],
  tasks: [],
  notices: [],
  approvals: [],
  media: { track: null, playing: false, positionSec: 0, volume: 0.6, muted: false, shuffle: false, repeat: 'off', queue: [], device: '' },
  toasts: [],
  flash: {},
  busy: {},
  rev: {},
  bootDismissed: false,
  config: mockServices.settings.current(),
  modelOverlay: { on: false, label: '' },
});

const s = store;

/* ── primitives ──────────────────────────────────────────────────────────── */

export const ui = {
  go(screen: ScreenId) {
    const cur = s.get().screen;
    if (cur === screen) {
      s.set({ commandBarOpen: false });
      return;
    }
    s.set({ screen, previous: cur, commandBarOpen: false, helpOpen: false });
  },
  select(entity: SelectedEntity | null, opts: { inspector?: boolean } = {}) {
    s.set({ selected: entity, inspectorOpen: entity ? (opts.inspector ?? true) : false });
    if (entity) ui.flashFor(`${entity.kind}:${entity.id}`);
  },
  finishBoot() {
    s.set({ bootDismissed: true });
  },
  setInspector(open: boolean) {
    s.set({ inspectorOpen: open });
  },
  setCommandBar(open: boolean) {
    s.set({ commandBarOpen: open });
    if (open) s.set({ voice: { ...s.get().voice, active: false } });
  },
  setHelp(open: boolean) {
    s.set({ helpOpen: open });
  },
  flashFor(key: string) {
    const flash = { ...s.get().flash, [key]: Date.now() };
    s.set({ flash });
    window.setTimeout(() => {
      const next = { ...s.get().flash };
      delete next[key];
      s.set({ flash: next });
    }, 2_200);
  },
  bump(...keys: string[]) {
    const rev = { ...s.get().rev };
    for (const k of keys) rev[k] = (rev[k] ?? 0) + 1;
    s.set({ rev });
  },
  busy(key: string, on: boolean) {
    const busy = { ...s.get().busy };
    if (on) busy[key] = true;
    else delete busy[key];
    s.set({ busy });
  },
  overlay(on: boolean, label = '') {
    s.set({ modelOverlay: { on, label } });
  },
};

/* ── toasts ──────────────────────────────────────────────────────────────── */

let toastSeq = 0;

export function toast(input: Omit<Toast, 'id' | 'ttlMs'> & { id?: string; ttlMs?: number }) {
  const id = input.id ?? `toast-${++toastSeq}`;
  const t: Toast = { ttlMs: 5_200, ...input, id };
  s.set({ toasts: [t, ...s.get().toasts].slice(0, 4) });
  if (t.ttlMs > 0) window.setTimeout(() => dismissToast(id), t.ttlMs);
  return id;
}

export function dismissToast(id: string) {
  s.set({ toasts: s.get().toasts.filter((t) => t.id !== id) });
}

export const toastOk = (title: string, body?: string) => toast({ title, body, severity: 'success' });
export const toastWarn = (title: string, body?: string) => toast({ title, body, severity: 'warning', ttlMs: 7_000 });
export const toastBad = (title: string, body?: string, action?: Toast['action']) =>
  toast({ title, body, severity: 'critical', ttlMs: 9_000, action });

/* ── async wrapper: every action resolves visibly ────────────────────────── */

interface RunOpts {
  busyKey?: string;
  ok?: string | ((v: unknown) => string | null);
  fail?: string;
  bump?: string[];
  retry?: () => void;
  silent?: boolean;
}

export async function run<T>(fn: () => Promise<T> | T, opts: RunOpts = {}): Promise<T | null> {
  const key = opts.busyKey;
  if (key) ui.busy(key, true);
  try {
    const value = await fn();
    if (!opts.silent) {
      const msg = typeof opts.ok === 'function' ? opts.ok(value) : opts.ok;
      if (msg) toast({ title: msg, severity: 'success', ttlMs: 4_000 });
    }
    if (opts.bump?.length) ui.bump(...opts.bump);
    return value;
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    if (!opts.silent) {
      toastBad(opts.fail ?? 'The core refused that action', message, opts.retry ? { label: 'Retry', run: opts.retry } : undefined);
    }
    return null;
  } finally {
    if (key) ui.busy(key, false);
  }
}

/* ── boot ────────────────────────────────────────────────────────────────── */

let bootstrapped = false;

export async function bootHercules(opts: { cinematic?: boolean } = {}) {
  if (bootstrapped) return;
  bootstrapped = true;
  const { services } = s.get();
  s.set({ phase: 'booting' });

  services.core.onCoreEvent.subscribe((e) => {
    if (e.type === 'vitals') s.set({ vitals: { ...e.vitals } });
  });

  await run(
    async () => {
      if (opts.cinematic === false) {
        services.core.phase;
      }
      await services.core.boot();
      s.set({ phase: services.core.phase });
    },
    { busyKey: 'boot', silent: true },
  );

  // Hydrate the universes the shell needs before first paint of content.
  const [agents, tasks, notices, approvals, media] = await Promise.all([
    services.agents.list().catch(() => [] as Agent[]),
    services.tasks.list().catch(() => [] as Task[]),
    services.notifications.list().catch(() => [] as Notice[]),
    services.notifications.approvals().catch(() => [] as ApprovalRequest[]),
    services.media.state().catch(() => null),
  ]);
  s.set({ agents, tasks, notices, approvals, media: media ?? s.get().media, vitals: services.core.vitals, booted: true, phase: services.core.phase });
  void services.settings.get().then((config) => s.set({ config })).catch(() => undefined);
  if (media?.playing) watchMediaClock();

  services.notifications.onNotice.subscribe(({ notice }) => {
    s.set({ notices: [notice, ...s.get().notices].slice(0, 80) });
    if (notice.severity === 'critical' || notice.severity === 'warning') {
      toast({
        title: notice.title,
        body: notice.body,
        severity: notice.severity,
        ttlMs: notice.severity === 'critical' ? 12_000 : 7_000,
        action: notice.actionable ? { label: 'Open inbox', run: () => ui.go('notifications') } : undefined,
      });
    }
  });

  services.agents.onAgentEvent.subscribe((e) => {
    if (e.type === 'removed') s.set({ agents: s.get().agents.filter((a) => a.id !== e.id) });
    else s.set({ agents: s.get().agents.map((a) => (a.id === e.agent.id ? e.agent : a)) });
  });

  services.tasks.onTaskEvent.subscribe((e) => {
    const tasks = s.get().tasks;
    const exists = tasks.some((t) => t.id === e.task.id);
    s.set({ tasks: exists ? tasks.map((t) => (t.id === e.task.id ? e.task : t)) : [e.task, ...tasks] });
    ui.bump('tasks');
  });

  services.media.onState.subscribe(({ state }) => {
    s.set({ media: state });
    if (state.playing) watchMediaClock();
  });

  services.voice.onVoiceEvent.subscribe((e) => {
    const v = s.get().voice;
    switch (e.type) {
      case 'wake':
        s.set({ voice: { ...v, active: true, transcript: '', interim: true, error: null } });
        break;
      case 'listening-start':
        s.set({ voice: { ...v, active: true, interim: true, error: null } });
        break;
      case 'partial':
        s.set({ voice: { ...v, active: true, transcript: e.text, interim: true } });
        break;
      case 'tts-level':
        s.set({ voice: { ...v, level: e.level } });
        break;
      case 'tts-start':
        s.set({ voice: { ...v, speaking: true, level: 0.5 } });
        break;
      case 'tts-end':
        s.set({ voice: { ...v, speaking: false, level: 0 } });
        break;
      case 'barge-in':
        s.set({ voice: { ...v, speaking: false } });
        toast({ title: 'Interrupted', body: 'Speech stopped. I am listening instead.', severity: 'info', ttlMs: 2_600 });
        break;
      case 'final':
        s.set({ voice: { ...v, transcript: e.text, interim: false } });
        void actions.sendPrompt(e.text, 'voice');
        break;
      case 'cancelled':
        s.set({ voice: { ...v, active: false, interim: false, level: 0 } });
        break;
      case 'error':
        s.set({ voice: { ...v, error: e.message, active: false, interim: false } });
        toastWarn('Voice input unavailable', e.message);
        break;
    }
  });

  window.addEventListener('hercules:navigate', ((e: CustomEvent<{ screen: string }>) => {
    const id = e.detail?.screen as ScreenId | undefined;
    if (id) ui.go(id);
  }) as EventListener);

  s.set({ phase: 'online' });
  ui.bump('boot');
  return true;
}

/** Media position is client-side smooth; the mock clock ticks once a second. */
let mediaClock: number | undefined;
function watchMediaClock() {
  if (mediaClock != null) return;
  mediaClock = window.setInterval(() => {
    const m = s.get().media;
    if (!m.playing || !m.track) {
      window.clearInterval(mediaClock);
      mediaClock = undefined;
      return;
    }
    s.set({ media: { ...m, positionSec: m.positionSec + 1 } });
  }, 1_000);
}

/* ── actions ─────────────────────────────────────────────────────────────── */

export const actions = {
  /** Ask the core anything (text or voice). Streams into the home surface. */
  async sendPrompt(text: string, channel: 'ui' | 'voice' = 'ui') {
    const trimmed = text.trim();
    if (!trimmed) return null;
    const { services } = s.get();
    ui.flashFor('chat');
    const conversationId = chatState.conversationId;
    chatState.push({ id: `local-${Date.now()}`, role: 'operator', at: new Date().toISOString(), blocks: [{ kind: 'text', text: trimmed }], conversationId });
    chatState.beginReply();
    let streamed = '';
    try {
      for await (const chunk of services.ai.submit({ text: trimmed, conversationId, channel })) {
        if (chunk.delta) {
          streamed += chunk.delta;
          chatState.appendDelta(chunk.delta);
        }
        if (chunk.block) chatState.appendBlock(chunk.block);
        if (chunk.done) chatState.endReply();
      }
    } catch (e) {
      chatState.endReply();
      toastBad('Core channel error', e instanceof Error ? e.message : String(e), {
        label: 'Retry',
        run: () => void actions.sendPrompt(trimmed, channel),
      });
      return null;
    }
    if (channel === 'voice' && streamed) {
      const cfg = await services.voice.config().catch(() => null);
      if (cfg) await services.voice.speak(streamed.slice(0, 340)).catch(() => undefined);
    }
    return streamed;
  },
  stopStream() {
    const { services } = s.get();
    chatState.endReply();
    void services.ai.stop(chatState.conversationId).catch(() => undefined);
    toast({ title: 'Stream halted', body: 'Agents parked at the last safe boundary.', severity: 'info', ttlMs: 3_000 });
  },

  /* ── approvals & notifications ── */
  async respondApproval(id: EntityId, approved: boolean) {
    const { services } = s.get();
    const req = s.get().approvals.find((a) => a.id === id);
    s.set({ approvals: s.get().approvals.filter((a) => a.id !== id) });
    await run(() => services.notifications.respond(id, approved), {
      busyKey: `approval:${id}`,
      ok: approved ? `Cleared · ${req?.requestedBy ?? 'agent'} is proceeding` : 'Denied · agent stood down',
      retry: () => void actions.respondApproval(id, approved),
    });
    const [approvals, notices] = await Promise.all([services.notifications.approvals(), services.notifications.list()]);
    s.set({ approvals, notices });
  },
  async approveNotice(id: EntityId, approved: boolean) {
    const { services } = s.get();
    await run(() => services.notifications.respond(id, approved), {
      busyKey: `notice:${id}`,
      ok: approved ? 'Approved' : 'Denied',
    });
    s.set({ notices: s.get().notices.map((n) => (n.id === id ? { ...n, read: true, body: `${approved ? 'Approved' : 'Denied'}. ${n.body}` } : n)) });
  },
  async markNoticesRead(ids: EntityId[]) {
    const { services } = s.get();
    await run(() => services.notifications.markRead(ids), { silent: true });
    s.set({ notices: s.get().notices.map((n) => (ids.includes(n.id) ? { ...n, read: true } : n)) });
  },
  async markAllRead() {
    const { services } = s.get();
    await run(() => services.notifications.markAllRead(), { ok: 'Inbox cleared' });
    s.set({ notices: s.get().notices.map((n) => ({ ...n, read: true })) });
  },
  async dismissNotice(id: EntityId) {
    const { services } = s.get();
    await run(() => services.notifications.dismiss(id), { silent: true });
    s.set({ notices: s.get().notices.filter((n) => n.id !== id) });
  },
  async snoozeNotice(id: EntityId, minutes: number) {
    const { services } = s.get();
    await run(() => services.notifications.snooze(id, minutes), { ok: `Snoozed ${minutes}m` });
  },

  /* ── agents ── */
  async pauseAgent(id: EntityId) {
    const { services } = s.get();
    await run(() => services.agents.pause(id), { busyKey: `agent:${id}`, ok: 'Parked · queue frozen for this agent', bump: ['agents'] });
    await actions.refreshAgents();
  },
  async resumeAgent(id: EntityId) {
    const { services } = s.get();
    await run(() => services.agents.resume(id), { busyKey: `agent:${id}`, ok: 'Resumed · context re-acquired', bump: ['agents'] });
    await actions.refreshAgents();
  },
  async boostAgent(id: EntityId) {
    const { services } = s.get();
    await run(() => services.agents.boost(id), { busyKey: `boost:${id}`, ok: 'Boosted to frontier tier · cost override logged', bump: ['agents'] });
    await actions.refreshAgents();
  },
  async retireAgent(id: EntityId) {
    const { services } = s.get();
    const name = s.get().agents.find((a) => a.id === id)?.name ?? 'agent';
    await run(() => services.agents.retire(id), { busyKey: `retire:${id}`, ok: `${name} retired · scopes revoked`, bump: ['agents'] });
    if (s.get().selected?.id === id) ui.select(null, { inspector: false });
  },
  async steerAgent(id: EntityId, guidance: string) {
    const { services } = s.get();
    if (!guidance.trim()) return;
    await run(() => services.agents.steer(id, guidance.trim()), { busyKey: `steer:${id}`, ok: 'Guidance delivered · plan updated', bump: ['agents'] });
    await actions.refreshAgents();
  },
  async spawnAgent(input: Parameters<HerculesServices['agents']['spawn']>[0]) {
    const { services } = s.get();
    const agent = await run(() => services.agents.spawn(input), { busyKey: 'agents.spawn', fail: 'Recruitment failed', bump: ['agents'] });
    if (agent) {
      s.set({ agents: [...s.get().agents, agent] });
      ui.select({ kind: 'agent', id: agent.id, label: agent.name });
      ui.go('agents');
    }
    await actions.refreshAgents();
    return agent;
  },
  async refreshAgents() {
    const { services } = s.get();
    const agents = await services.agents.list().catch(() => s.get().agents);
    s.set({ agents });
  },

  /* ── tasks ── */
  async createTask(input: Parameters<HerculesServices['tasks']['create']>[0]) {
    const { services } = s.get();
    const task = await run(() => services.tasks.create(input), { busyKey: 'tasks.create', ok: 'Task filed and dispatched', fail: 'Could not file task', bump: ['tasks'] });
    if (task) {
      s.set({ tasks: [task, ...s.get().tasks] });
      ui.select({ kind: 'task', id: task.id, label: task.title });
      ui.go('tasks');
    }
    return task;
  },
  async setTaskStatus(id: EntityId, status: Task['status']) {
    const { services } = s.get();
    const prev = s.get().tasks;
    s.set({ tasks: prev.map((t) => (t.id === id ? { ...t, status, progress: status === 'done' ? 100 : t.progress } : t)) });
    const next = await run(() => services.tasks.update(id, { status }), { silent: true, bump: ['tasks'] });
    if (!next) s.set({ tasks: prev });
    else s.set({ tasks: s.get().tasks.map((t) => (t.id === id ? next : t)) });
  },
  async assignTask(id: EntityId, agentId: EntityId | null) {
    const { services } = s.get();
    s.set({ tasks: s.get().tasks.map((t) => (t.id === id ? { ...t, assigneeAgentId: agentId } : t)) });
    if (agentId) await run(() => services.tasks.assignTo(id, agentId), { silent: true, bump: ['tasks'] });
    const agent = s.get().agents.find((a) => a.id === agentId);
    toastOk('Reassigned', agent ? `${s.get().tasks.find((t) => t.id === id)?.title} → ${agent.name}` : 'Task routed to the pool');
  },
  async approveTask(id: EntityId, approved: boolean) {
    const { services } = s.get();
    await run(() => services.tasks.approve(id, approved), { busyKey: `task:${id}`, ok: approved ? 'Approved · dispatched' : 'Sent back to backlog' });
    const tasks = await services.tasks.list();
    s.set({ tasks });
  },
  async retryTask(id: EntityId) {
    const { services } = s.get();
    await run(() => services.tasks.retry(id), { busyKey: `task:${id}`, ok: 'Retried with backoff' });
    s.set({ tasks: await services.tasks.list() });
  },
  async cancelTask(id: EntityId) {
    const { services } = s.get();
    await run(() => services.tasks.cancel(id), { ok: 'Cancelled · labour released' });
    s.set({ tasks: await services.tasks.list() });
  },
  async assignTo(id: EntityId, agentId: EntityId) {
    const { services } = s.get();
    if (!agentId) {
      toast({ title: 'No idle agent to hand this to', body: 'Everything is already loaded. Free someone first, or file it in the backlog.', severity: 'warning', ttlMs: 5_000 });
      return;
    }
    await run(() => services.tasks.assignTo(id, agentId), { busyKey: `task:${id}`, ok: 'Reassigned · the new owner re-reads the objective', fail: 'Reassignment refused', bump: ['tasks'] });
  },
  async logOnTask(id: EntityId, text: string) {
    const { services } = s.get();
    await run(() => services.tasks.log(id, text), { silent: true });
    s.set({ tasks: s.get().tasks.map((t) => (t.id === id ? { ...t, events: [{ at: new Date().toISOString(), actor: 'Operator', kind: 'note' as const, text }, ...t.events] } : t)) });
    ui.bump('tasks');
  },

  /* ── automations ── */
  async toggleAutomation(id: EntityId, enabled: boolean) {
    const { services } = s.get();
    await run(() => services.automation.update(id, { enabled }), { ok: enabled ? 'Automation armed' : 'Automation paused', bump: ['automations'] });
  },
  async runAutomation(id: EntityId) {
    const { services } = s.get();
    const run0 = await run(() => services.automation.run(id), { busyKey: `automation:${id}`, ok: 'Run finished · results filed', fail: 'Run failed · see history', bump: ['automations'] });
    if (run0) ui.flashFor(`automation:${id}`);
    return run0;
  },
  async createAutomation(input: Parameters<HerculesServices['automation']['create']>[0]) {
    const { services } = s.get();
    const a = await run(() => services.automation.create(input), { busyKey: 'automation.create', ok: 'Automation armed', bump: ['automations'] });
    if (a) ui.flashFor(`automation:${a.id}`);
    return a;
  },
  async duplicateAutomation(id: EntityId) {
    const { services } = s.get();
    await run(() => services.automation.duplicate(id), { ok: 'Duplicated (paused)' , bump: ['automations'] });
  },
  async removeAutomation(id: EntityId) {
    const { services } = s.get();
    await run(() => services.automation.remove(id), { ok: 'Deleted · history kept in audit', bump: ['automations'] });
    if (s.get().selected?.id === id) ui.select(null, { inspector: false });
  },

  /* ── permissions ── */
  async grantScope(scopeId: string, tiers: Agent['tier'][], label: string) {
    const { services } = s.get();
    await run(() => services.permissions.grant(scopeId, tiers), { busyKey: `scope:${scopeId}`, ok: `Granted · ${label}`, bump: ['permissions'] });
  },
  async revokeScope(scopeId: string, tiers: Agent['tier'][], label: string) {
    const { services } = s.get();
    await run(() => services.permissions.revoke(scopeId, tiers), { busyKey: `scope:${scopeId}`, ok: `Revoked · ${label}`, bump: ['permissions'] });
  },
  async rotateSecret(id: EntityId) {
    const { services } = s.get();
    await run(() => services.permissions.rotateSecret(id), { busyKey: `secret:${id}`, ok: 'Rotated · handles re-bound, values never exposed', bump: ['permissions'] });
  },
  async simulateAttack(kind: Parameters<HerculesServices['permissions']['simulateAttack']>[0]) {
    const { services } = s.get();
    ui.overlay(true, 'red-team exercise');
    const res = await run(() => services.permissions.simulateAttack(kind), { busyKey: `attack:${kind}`, ok: 'Blocked and logged', fail: 'Attack succeeded (should never happen)', bump: ['permissions'] });
    ui.overlay(false, '');
    ui.bump('audit');
    return res;
  },

  /* ── memory ── */
  async writeMemory(input: Parameters<HerculesServices['memory']['write']>[0]) {
    const { services } = s.get();
    const rec = await run(() => services.memory.write(input), { busyKey: 'memory.write', ok: 'Written to long-term memory', bump: ['memory'] });
    if (rec) ui.flashFor(`memory:${rec.id}`);
    return rec;
  },
  async pinMemory(id: EntityId, pinned: boolean) {
    const { services } = s.get();
    await run(() => services.memory.pin(id, pinned), { silent: true, bump: ['memory'] });
  },
  async deleteMemory(id: EntityId) {
    const { services } = s.get();
    await run(() => services.memory.delete(id), { ok: 'Deleted · index entries purged', bump: ['memory'] });
    if (s.get().selected?.id === id) ui.select(null, { inspector: false });
  },
  async consolidateMemory() {
    const { services } = s.get();
    const res = await run(() => services.memory.consolidate(), { busyKey: 'memory.consolidate', bump: ['memory'] });
    if (res) toastOk('Consolidation complete', `${res.merged} merge(s) · ${res.savedTokens.toLocaleString()} tokens reclaimed`);
  },

  /* ── media ── */
  async media(action: 'play' | 'pause' | 'next' | 'prev' | 'toggle') {
    const { services, media } = s.get();
    if (action === 'toggle') action = media.playing ? 'pause' : 'play';
    await run(() => services.media[action](), { silent: true });
    s.set({ media: { ...s.get().media, playing: action === 'play' ? true : action === 'pause' ? false : s.get().media.playing } });
  },
  async mediaSeek(positionSec: number) {
    const { services } = s.get();
    s.set({ media: { ...s.get().media, positionSec } });
    await run(() => services.media.seek(positionSec), { silent: true });
  },
  async mediaVolume(volume: number) {
    const { services } = s.get();
    s.set({ media: { ...s.get().media, volume } });
    await run(() => services.media.setVolume(volume), { silent: true });
  },
  async mediaMute() {
    const { services } = s.get();
    await run(() => services.media.toggleMute(), { silent: true });
    s.set({ media: { ...s.get().media, muted: !s.get().media.muted } });
  },
  async mediaShuffle() {
    const { services } = s.get();
    const on = !s.get().media.shuffle;
    await run(() => services.media.setShuffle(on), { silent: true });
    s.set({ media: { ...s.get().media, shuffle: on } });
  },
  async mediaRepeat() {
    const { services } = s.get();
    const next = await run(() => services.media.cycleRepeat(), { silent: true });
    if (next) s.set({ media: { ...s.get().media, repeat: next } });
  },
  async mediaDevice(device: string) {
    const { services } = s.get();
    await run(() => services.media.setDevice(device), { ok: `Output → ${device}` });
  },
  async mediaEnqueue(ids: EntityId[]) {
    const { services } = s.get();
    await run(() => services.media.enqueue(ids), { ok: `${ids.length} queued`, silent: false });
    s.set({ media: await services.media.state() });
  },

  /* ── voice ── */
  async toggleVoice(force?: boolean) {
    const { services } = s.get();
    const v = s.get().voice;
    if (v.active || force === false) {
      await run(() => services.voice.stop(), { silent: true });
      s.set({ voice: { ...v, active: false, interim: false, level: 0 } });
      return;
    }
    const caps = await services.voice.capabilities().catch(() => ({ stt: false, tts: !!window.speechSynthesis, wakeWord: false }));
    s.set({ voice: { ...v, active: true, transcript: '', interim: true, error: null, engine: caps.stt ? 'native' : 'simulated' } });
    ui.setCommandBar(false);
    await run(() => services.voice.listen(), { silent: true });
  },
  async submitVoice() {
    const { services } = s.get();
    const v = s.get().voice;
    const text = v.transcript.trim();
    await run(() => services.voice.stop(), { silent: true });
    s.set({ voice: { ...v, active: false, interim: false } });
    if (!text) {
      toast({ title: 'Nothing heard', body: 'I did not catch a complete utterance.', severity: 'info', ttlMs: 3_400 });
      return;
    }
    void actions.sendPrompt(text, 'voice');
  },
  async speak(text: string) {
    const { services } = s.get();
    await run(() => services.voice.speak(text), { silent: true });
  },
  async stopSpeaking() {
    const { services } = s.get();
    await run(() => services.voice.stopSpeaking(), { silent: true });
  },

  /* ── system / settings ── */
  async killProcess(pid: number, name: string) {
    const { services } = s.get();
    await run(() => services.system.kill(pid), { busyKey: `kill:${pid}`, ok: `${name} terminated` });
    ui.bump('system');
  },
  async toggleIntegration(id: EntityId, connected: boolean) {
    const { services } = s.get();
    await run(() => (connected ? services.system.disconnect(id) : services.system.connect(id).then(() => undefined)), {
      busyKey: `integration:${id}`,
      ok: connected ? 'Disconnected · agents lost those tools' : 'Connected · scopes granted',
      fail: 'Connection refused · check host permissions',
      bump: ['integrations'],
    });
  },
  async keepAwake(on: boolean) {
    const { services } = s.get();
    await run(() => services.system.setKeepAwake(on), { ok: on ? 'Sleep blocked while missions run' : 'Sleep released' });
  },
  async launchAtLogin(on: boolean) {
    const { services } = s.get();
    await run(() => services.system.launchAtLogin(on), { ok: on ? 'HERCULES will wake with the machine' : 'Launch item removed' });
  },
  async patchSettings(patch: Parameters<HerculesServices['settings']['patch']>[0], label?: string) {
    const { services } = s.get();
    const next = await run(() => services.settings.patch(patch), { silent: true });
    if (next) {
      const { applyThemeFromConfig } = await import('@/theme/bridge');
      applyThemeFromConfig(next);
      s.set({ config: next });
      if (label) toast({ title: label, severity: 'info', ttlMs: 2_600 });
      ui.bump('settings');
    }
    return next;
  },
  async resetSettings() {
    const { services } = s.get();
    const next = await run(() => services.settings.reset(), { ok: 'Defaults restored' });
    if (next) {
      const { applyThemeFromConfig } = await import('@/theme/bridge');
      applyThemeFromConfig(next);
      s.set({ config: next });
      ui.bump('settings');
    }
  },
  async setAutonomy(patch: Partial<AutonomyPolicy>) {
    const { services } = s.get();
    const next = await run(() => services.permissions.setAutonomy(patch), { ok: 'Autonomy policy applied · every agent re-bounded', fail: 'Policy engine refused the change' });
    if (next) {
      s.set({ agents: s.get().agents.map((a) => ({ ...a, autonomy: Math.round(next.level * (a.tier === 'labor' ? 0.8 : a.tier === 'specialist' ? 1.02 : 1)) })), approvals: next.level > 70 ? [] : s.get().approvals });
      ui.bump('permissions', 'agents');
    }
    return next;
  },
  async freezeEstateToggle(on: boolean) {
    if (on) return actions.freezeEstate();
    const { services } = s.get();
    const parked = s.get().agents.filter((a) => a.status === 'idle' || a.status === 'recruited');
    ui.overlay(true, 'resuming estate');
    await run(async () => { await Promise.all(parked.map((a) => services.agents.resume(a.id))); }, { silent: true });
    ui.overlay(false, '');
    await actions.refreshAgents();
    toastWarn('Estate resumed', `${parked.length} agent(s) picked their work back up at the same step.`);
  },
  async reconfigureCore() {
    const { services } = s.get();
    await run(() => services.core.reconfigure({}), { ok: 'Applied live · no restart needed' });
  },
  async exportConfig() {
    const { services } = s.get();
    const json = await run(() => services.settings.export(), { silent: true });
    if (!json) return;
    const blob = new Blob([json], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'hercules.config.json';
    a.click();
    URL.revokeObjectURL(a.href);
    toastOk('Config exported', 'No secrets included — handles only.');
  },
  async importConfig(file: File) {
    const { services } = s.get();
    const text = await file.text();
    const next = await run(() => services.settings.import(text), { fail: 'Import rejected' });
    if (next) {
      const { applyThemeFromConfig } = await import('@/theme/bridge');
      applyThemeFromConfig(next);
      s.set({ config: next });
      ui.bump('settings');
      toastOk('Config imported');
    }
  },

  /* ── global controls ── */
  async freezeEstate() {
    const { services } = s.get();
    const running = s.get().agents.filter((a) => a.status === 'working' || a.status === 'thinking');
    ui.overlay(true, 'estate frozen');
    await run(async () => {
      await Promise.all(running.map((a) => services.agents.pause(a.id)));
    }, { silent: true });
    ui.overlay(false, '');
    toastWarn('Estate frozen', `${running.length} agent(s) parked at safe boundaries. Nothing was lost — resume from Agents.`);
    s.set({ agents: s.get().agents.map((a) => (running.some((r) => r.id === a.id) ? { ...a, status: 'idle' } : a)) });
    ui.bump('agents');
  },
  async replayBoot() {
    const { services } = s.get();
    s.set({ booted: false, phase: 'booting', bootDismissed: false });
    await run(() => services.core.boot(), { busyKey: 'boot', silent: true });
    s.set({ phase: services.core.phase, booted: true, vitals: services.core.vitals });
  },
  async wakeCore() {
    const { services } = s.get();
    await run(() => services.core.boot(), { busyKey: 'boot', ok: 'Core awake', silent: true });
    s.set({ phase: 'online', vitals: services.core.vitals, booted: true });
  },
  async standDown() {
    const { services } = s.get();
    await run(() => services.core.shutdown(), { ok: 'Core stood down · state preserved', silent: true });
    s.set({ phase: 'cold', vitals: services.core.vitals });
  },
};

/* ── chat micro-state (kept out of the main store so streaming is cheap) ──── */

export interface ChatEntry {
  id: EntityId;
  conversationId: EntityId;
  role: 'operator' | 'hercules';
  at: string;
  blocks: import('@/types/domain').MessageBlock[];
  streaming?: boolean;
}

const chatSeed: ChatEntry[] = [];

export const chatState = {
  entries: [...chatSeed],
  listeners: new Set<() => void>(),
  conversationId: 'cnv-1',
  live: '',
  notify() {
    for (const l of [...chatState.listeners]) l();
  },
  subscribe(l: () => void) {
    chatState.listeners.add(l);
    return () => chatState.listeners.delete(l);
  },
  snapshot() {
    return chatState.entries;
  },
  async hydrate() {
    const msgs = await mockServices.ai.conversation(chatState.conversationId);
    chatState.entries = msgs.map((m) => ({ id: m.id, conversationId: m.conversationId, role: m.role === 'operator' ? 'operator' : 'hercules', at: m.at, blocks: m.blocks }));
    chatState.notify();
  },
  push(entry: ChatEntry) {
    chatState.entries = [...chatState.entries, entry];
    chatState.notify();
  },
  beginReply() {
    chatState.entries = [...chatState.entries, { id: `reply-${Date.now()}`, conversationId: chatState.conversationId, role: 'hercules', at: new Date().toISOString(), blocks: [], streaming: true }];
    chatState.notify();
  },
  appendDelta(text: string) {
    const list = [...chatState.entries];
    const last = list[list.length - 1];
    if (!last || last.role !== 'hercules') return;
    const blocks = [...last.blocks];
    const tail = blocks[blocks.length - 1];
    if (tail && tail.kind === 'text') blocks[blocks.length - 1] = { ...tail, text: (tail.text ?? '') + text };
    else blocks.push({ kind: 'text', text });
    list[list.length - 1] = { ...last, blocks };
    chatState.entries = list;
    chatState.notify();
  },
  appendBlock(block: import('@/types/domain').MessageBlock) {
    const list = [...chatState.entries];
    const last = list[list.length - 1];
    if (!last) return;
    list[list.length - 1] = { ...last, blocks: [...last.blocks, block] };
    chatState.entries = list;
    chatState.notify();
  },
  endReply() {
    const list = [...chatState.entries];
    const last = list[list.length - 1];
    if (last) list[list.length - 1] = { ...last, streaming: false, at: new Date().toISOString() };
    chatState.entries = list;
    chatState.notify();
  },
};

void s;
export { mockServices };
