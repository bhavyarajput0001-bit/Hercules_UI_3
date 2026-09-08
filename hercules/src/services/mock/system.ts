/**
 * HERCULES · mock system / analytics / activity / notifications / settings /
 * permissions / media / voice.
 *
 * These stand in for the desktop bridge (Tauri or Electron) plus the server
 * side of the estate. Every method is implemented for real against simulated
 * state, so the UI's async paths (loading, errors, retries) are exercised.
 */
import type {
  ActivityService,
  AnalyticsService,
  AutonomyPolicy,
  MediaArtifact,
  MediaService,
  NotificationService,
  PermissionService,
  SettingsService,
  SystemService,
  VoiceService,
} from '@/services/contracts';
import type {
  AppConfig,
  AuditEntry,
  DeviceInfo,
  MediaState,
  ProcessInfo,
  SecretHandle,
  SystemSnapshot,
  VoiceConfig,
} from '@/types/domain';
import {
  analyticsByDepartment,
  analyticsByModel,
  analyticsByTool,
  analyticsSeries,
  devices,
  integrations,
  mediaTracks,
  processes as seedProcesses,
  permissionScopes,
  secretHandles,
  simulatedUtterances,
  voiceProfiles,
} from './fixtures';
import { activityBus, holdState, logCore, mediaBus, noticeBus, pushActivity, pushNotice, voiceBus, world } from './runtime';
import { bytes, clamp, formatBytes, iso, jitter, pick, rand, randInt, uid } from './helpers';

/* ── System ──────────────────────────────────────────────────────────────── */

const wobble = (v: number, amp: number, min: number, max: number) => clamp(v + rand(-amp, amp), min, max);

const snapshot: SystemSnapshot = {
  os: { name: 'macOS', version: '15.6.1', arch: 'arm64 (Apple Silicon)', hostname: 'hercules-studio' },
  cpu: { model: 'M4 Max', cores: 14, threads: 14, load: [0.6, 0.82, 0.9], tempC: 58 },
  memory: { totalBytes: bytes(64e9), usedBytes: bytes(28.4e9), swapBytes: bytes(8e9), swapUsedBytes: bytes(0.4e9) },
  gpus: [{ name: 'Apple M4 Max · 32-core', vramBytes: bytes(22e9), usedVramBytes: bytes(20.7e9), util: 74 }],
  disks: [
    { mount: '/', totalBytes: bytes(1e12), usedBytes: bytes(642e9), readMbps: 320, writeMbps: 118 },
    { mount: '/Volumes/ATLAS', totalBytes: bytes(4e12), usedBytes: bytes(2.1e12), readMbps: 1_240, writeMbps: 640 },
  ],
  network: { interface: 'en0', ip: '192.168.1.24', publicIpMasked: '81.•••.•••.19', downMbps: 480, upMbps: 92, latencyMs: 11, proxyActive: false },
  battery: { onAc: true, percent: 87, timeRemainingMin: null },
  audio: { inputDevice: 'MacBook Built-in Microphone', outputDevice: 'Studio Display Speakers', inputLevel: 0.18, muted: false },
  displays: [
    { id: 'dsp-1', label: 'Studio Display 27"', resolution: '5120×2880', scale: 2 },
    { id: 'dsp-2', label: 'LG UltraFine', resolution: '4096×2304', scale: 2 },
  ],
  power: { sleepBlockers: ['hercules-core (mission TITAN)', 'sandbox-browser-x8'], performanceMode: 'balanced' },
};

export let currentSnapshot = snapshot;

const sampleTick = () => {
  const s: SystemSnapshot = {
    ...snapshot,
    cpu: { ...snapshot.cpu, load: snapshot.cpu.load.map((l) => wobble(l, 0.08, 0.1, 1.6)), tempC: Math.round(wobble(snapshot.cpu.tempC, 2, 44, 92)) },
    memory: { ...snapshot.memory, usedBytes: bytes(wobble(snapshot.memory.usedBytes / 1e9, 0.9, 18, 60) * 1e9) },
    gpus: [{ ...snapshot.gpus[0]!, util: Math.round(wobble(snapshot.gpus[0]!.util, 9, 12, 99)), usedVramBytes: bytes(wobble(snapshot.gpus[0]!.usedVramBytes / 1e9, 1.4, 8, 21.6) * 1e9) }],
    disks: snapshot.disks.map((d) => ({ ...d, readMbps: Math.round(wobble(d.readMbps, 60, 2, 2_400)), writeMbps: Math.round(wobble(d.writeMbps, 40, 1, 1_400)) })),
    network: { ...snapshot.network, downMbps: Math.round(wobble(snapshot.network.downMbps, 40, 10, 900)), upMbps: Math.round(wobble(snapshot.network.upMbps, 12, 2, 300)), latencyMs: Math.round(wobble(snapshot.network.latencyMs, 4, 4, 90)) },
    audio: { ...snapshot.audio, inputLevel: wobble(snapshot.audio.inputLevel, 0.06, 0, 0.6) },
  };
  currentSnapshot = s;
  return s;
};

let sampleHandle: number | undefined;
export const systemSample = () => sampleTick();

const liveProcesses: ProcessInfo[] = seedProcesses.map((p) => ({ ...p }));
const liveIntegrations = integrations.map((i) => ({ ...i }));
const liveDevices: DeviceInfo[] = devices.map((d) => ({ ...d }));
let keepAwake = true;
let launchAtLogin = true;

export const mockSystem: SystemService = {
  onSample: {
    subscribe(fn) {
      sampleHandle ??= window.setInterval(() => fn({ snapshot: sampleTick() }), 2_000);
      busSubs.set(fn, (busSubs.get(fn) ?? 0) + 1);
      return () => {
        const n = (busSubs.get(fn) ?? 1) - 1;
        busSubs.set(fn, n);
        if (n <= 0 && sampleHandle != null) {
          window.clearInterval(sampleHandle);
          sampleHandle = undefined;
        }
      };
    },
  },
  async snapshot() {
    await jitter(40, 110);
    return sampleTick();
  },
  async processes() {
    await jitter(40, 90);
    return liveProcesses.map((p) => ({
      ...p,
      cpu: Number(clamp(p.cpu + rand(-2.6, 2.6), 0.1, 96).toFixed(1)),
      memMb: Math.round(clamp(p.memMb + rand(-30, 40), 20, 24_000)),
    }));
  },
  async kill(pid) {
    const i = liveProcesses.findIndex((p) => p.pid === pid);
    if (i < 0) throw new Error('E_NO_PROCESS');
    const [p] = liveProcesses.splice(i, 1);
    pushActivity('system', 'Operator', `killed ${p!.name}`, `pid ${p!.pid} · SIGTERM then SIGKILL`, true);
    pushNotice({ severity: 'info', title: `Process ${p!.name} terminated`, body: 'Agent runtime will respawn it on the next dispatch unless you retire the agent.', source: 'System' });
  },
  async integrations() {
    await jitter(60, 160);
    return liveIntegrations.map((i) => ({ ...i }));
  },
  async connect(id) {
    const release = holdState('executing', `connect:${id}`);
    await jitter(600, 1_400);
    const it = liveIntegrations.find((i) => i.id === id);
    release();
    if (!it) throw new Error('E_UNKNOWN_INTEGRATION');
    if (it.id === 'int-shortcut') {
      it.status = 'error';
      it.account = 'bridge not installed · needs Accessibility permission';
      throw new Error('E_PERMISSION_REQUIRED');
    }
    it.status = 'connected';
    it.lastSync = iso();
    pushActivity('system', 'Operator', `connected ${it.name}`, `scopes: ${it.scopes.join(', ') || 'none'}`);
    return { ...it };
  },
  async disconnect(id) {
    const it = liveIntegrations.find((i) => i.id === id);
    if (!it) return;
    it.status = 'disconnected';
    it.account = '—';
    it.lastSync = null;
    pushActivity('security', 'Operator', `disconnected ${it.name}`, 'agents lose those tools immediately', true);
  },
  async devices() {
    return liveDevices.map((d) => (d.kind === 'microphone' ? { ...d, level: d.default ? wobble(d.level ?? 0.2, 0.08, 0, 0.7) : 0 } : { ...d }));
  },
  async setDefaultDevice(id) {
    for (const d of liveDevices) d.default = d.id === id ? true : d.kind === liveDevices.find((x) => x.id === id)?.kind ? d.default && false : d.default;
    const target = liveDevices.find((d) => d.id === id);
    if (target) {
      for (const d of liveDevices) if (d.kind === target.kind) d.default = d.id === id;
      if (target.kind === 'microphone') snapshot.audio.inputDevice = target.name;
      if (target.kind === 'speaker') snapshot.audio.outputDevice = target.name;
      pushActivity('system', 'Operator', `default ${target.kind} → ${target.name}`);
    }
  },
  async openSettings(pane) {
    pushActivity('system', 'Operator', `opened OS settings · ${pane}`, 'deep link into the host OS panel');
  },
  async launchAtLogin(on) {
    launchAtLogin = on;
    pushActivity('system', 'Operator', `${on ? 'enabled' : 'disabled'} launch at login`);
  },
  async setKeepAwake(on) {
    keepAwake = on;
    snapshot.power.sleepBlockers = on ? snapshot.power.sleepBlockers : [];
    pushActivity('system', 'Operator', `${on ? 'blocking' : 'releasing'} sleep`);
  },
};
export const systemFlags = () => ({ keepAwake, launchAtLogin });

const busSubs = new Map<(e: { snapshot: SystemSnapshot }) => void, number>();

/* ── Analytics ───────────────────────────────────────────────────────────── */

export const mockAnalytics: AnalyticsService = {
  async summary(days) {
    await jitter(80, 220);
    const slice = <T,>(xs: T[]): T[] => xs.slice(-Math.max(1, days));
    const cost = slice(analyticsSeries.cost);
    const tokens = slice(analyticsSeries.tokens);
    const tasks = slice(analyticsSeries.tasks);
    const latency = slice(analyticsSeries.latency);
    const costTotal = cost.reduce((a, b) => a + b, 0);
    const completed = tasks.reduce((a, b) => a + b, 0);
    return {
      windowDays: days,
      tokensTotal: tokens.reduce((a, b) => a + b, 0),
      costUsd: costTotal,
      tasksCompleted: completed,
      tasksFailed: Math.round(completed * 0.06),
      successRate: Number(clamp(0.88 + completed / 9_000, 0, 0.99).toFixed(3)),
      avgLatencyMs: Math.round(latency.reduce((a, b) => a + b, 0) / latency.length),
      autonomyInterventions: randInt(4, 9),
      series: {
        label: slice(analyticsSeries.label),
        cost,
        tokens,
        tasks,
        latency,
      },
      byDepartment: analyticsByDepartment,
      byModel: analyticsByModel,
      byTool: analyticsByTool,
    };
  },
  async export() {
    await jitter(200, 500);
    return { format: 'csv' as const, filename: `hercules-analytics-${new Date().toISOString().slice(0, 10)}.csv`, bytes: randInt(18, 96) * 1024 };
  },
};

/* ── Activity ────────────────────────────────────────────────────────────── */

export const mockActivity: ActivityService = {
  onEvent: activityBus,
  async list(filter) {
    await jitter(30, 90);
    let items = world.activity;
    if (filter?.kinds?.length) items = items.filter((e) => filter.kinds!.includes(e.kind));
    if (filter?.query) {
      const q = filter.query.toLowerCase();
      items = items.filter((e) => `${e.actor} ${e.action} ${e.detail ?? ''} ${e.traceId ?? ''}`.toLowerCase().includes(q));
    }
    return items.slice(0, filter?.limit ?? 80);
  },
  async export(format) {
    await jitter(200, 420);
    const rows = world.activity.length;
    return { filename: `hercules-activity.${format}`, bytes: rows * (format === 'csv' ? 148 : 320), rows };
  },
};

/* ── Notifications ───────────────────────────────────────────────────────── */

export const mockNotifications: NotificationService = {
  onNotice: noticeBus,
  async list() {
    await jitter(30, 80);
    return world.notices.map((n) => ({ ...n }));
  },
  async markRead(ids) {
    for (const n of world.notices) if (ids.includes(n.id)) n.read = true;
  },
  async markAllRead() {
    for (const n of world.notices) n.read = true;
  },
  async dismiss(id) {
    world.notices = world.notices.filter((n) => n.id !== id);
  },
  async snooze(id, minutes) {
    const n = world.notices.find((x) => x.id === id);
    if (!n) return;
    n.body = `Snoozed ${minutes}m · re-raised at ${new Date(Date.now() + minutes * 60_000).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}. ${n.body}`;
  },
  async approvals() {
    await jitter(40, 100);
    return world.approvals.map((a) => ({ ...a }));
  },
  async respond(requestId, approved) {
    const release = holdState('executing', `approval:${requestId}`);
    await jitter(260, 520);
    const i = world.approvals.findIndex((a) => a.id === requestId);
    const req = i >= 0 ? world.approvals[i] : undefined;
    if (i >= 0) world.approvals.splice(i, 1);
    const target = world.notices.find((n) => n.related?.id === req?.agentId || n.actions?.some((a) => a.kind === 'approve'));
    if (target) {
      target.read = true;
      target.body = `${approved ? 'Approved' : 'Denied'} by operator. ${target.body}`;
    }
    release();
    if (req) {
      pushActivity('security', 'Operator', approved ? 'approved' : 'denied', `${req.requestedBy}: ${req.action}`, true);
      const a = world.agents.find((x) => x.id === req.agentId);
      if (a) {
        a.status = approved ? 'working' : 'idle';
        a.task = approved ? `Cleared to proceed · ${req.action.slice(0, 60)}` : 'Held by operator · standing down';
      }
      pushNotice({
        severity: approved ? 'success' : 'info',
        title: approved ? 'Gate cleared' : 'Request denied',
        body: approved ? `${req.requestedBy} is proceeding. Audit entry written with a traceId.` : `${req.requestedBy} stood down. No side effects occurred.`,
        source: 'Permissions',
      });
    }
    pushActivity('system', 'HERCULES', 'approval queue updated', `${world.approvals.length} remaining`);
  },
};

/* ── Settings ────────────────────────────────────────────────────────────── */

export const defaultConfig: AppConfig = {
  schemaVersion: 1,
  boot: { autoRunDiagnostics: true, cinematicSequence: true, showTrayIcon: true },
  core: { alwaysAvailable: false, hotkeySummon: '⌥⌘H', autoPauseOnBattery: false },
  ai: {
    router: { mode: 'auto', fixedModelId: null, fallbackChain: ['mdl-nova-x1', 'mdl-quill-70b', 'mdl-nova-lite'], preferLocal: true, maxMonthlySpendUsd: 4200, redactBeforeSend: true },
    persona: {
      name: 'HERCULES',
      callsign: 'HERC-01',
      pronouns: 'it/its',
      preset: 'chief-of-staff',
      initiative: 0.78,
      verbosity: 0.34,
      wit: 0.42,
      caution: 0.66,
      formality: 'terse',
      avatarHue: 190,
    },
    contextWindowBudget: 180_000,
    reasoningDepth: 'balanced',
  },
  voice: {
    wakeWord: 'hey hercules',
    pushToTalkKey: 'Right ⌥ (hold 250ms)',
    alwaysAvailable: false,
    bargeIn: true,
    sttEngine: 'local',
    ttsProfileId: 'voi-hollow',
    duckMedia: true,
    languages: ['en-US', 'pa-IN', 'hi-IN'],
  },
  theme: { themeId: 'obsidian-night', density: 'standard', intensity: 0.82, reduceMotion: false, allowGlowThroughCpu: true },
  appearance: { hologram: 'orb', hologramDesign: 'ultron', glass: 'soft', cinemascope: false, gesturesEnabled: true, gesturesAutostart: false },
  privacy: {
    localFirst: true,
    telemetry: 'off',
    redactPII: true,
    onDeviceTranscription: true,
    retentionDays: 90,
    requireApprovalFor: ['high', 'critical'],
    screenAwareness: false,
    clipboardAccess: 'ask',
  },
  notifications: { channel: 'both', sound: true, quietHours: { enabled: true, from: '23:30', to: '06:45' }, digest: 'daily' },
  files: { defaultRoot: '/hercules/workspace', watchProjects: true, autoIndex: true },
  developer: { transport: 'mock', apiBase: '', verboseLogs: false, demoSeed: 0x48455243 },
};

const LS_KEY = 'hercules.config.v1';

function loadPersisted(): AppConfig {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return structuredClone(defaultConfig);
    return merge(structuredClone(defaultConfig), JSON.parse(raw) as Deep<AppConfig>);
  } catch {
    return structuredClone(defaultConfig);
  }
}

type Deep<T> = { [K in keyof T]?: T[K] extends object ? Deep<T[K]> : T[K] };

function merge(base: AppConfig, patch: Deep<AppConfig>): AppConfig {
  for (const k of Object.keys(patch) as (keyof AppConfig)[]) {
    const v = patch[k];
    if (v && typeof v === 'object' && !Array.isArray(v)) Object.assign(base[k] as object, v);
    else if (v !== undefined) (base as unknown as Record<string, unknown>)[k as string] = v;
  }
  return base;
}

let config: AppConfig = loadPersisted();

export const mockSettings: SettingsService = {
  current: () => config,
  async get() {
    await jitter(20, 60);
    return structuredClone(config);
  },
  async patch(patch) {
    config = merge(config, patch as Deep<AppConfig>);
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(config));
    } catch {
      /* private mode — keep in-memory only */
    }
    this.onApplyTheme?.(structuredClone(config));
    return structuredClone(config);
  },
  async reset() {
    config = structuredClone(defaultConfig);
    localStorage.removeItem(LS_KEY);
    this.onApplyTheme?.(structuredClone(config));
    return structuredClone(config);
  },
  async export() {
    return JSON.stringify(config, null, 2);
  },
  async import(json) {
    const parsed = JSON.parse(json) as Deep<AppConfig>;
    if ('api_key' in parsed || 'token' in parsed || 'secret' in parsed) {
      throw new Error('E_SECRET_IN_CONFIG: never store credentials in app config. Use Permissions → Secret handles.');
    }
    config = merge(structuredClone(defaultConfig), parsed);
    localStorage.setItem(LS_KEY, JSON.stringify(config));
    this.onApplyTheme?.(structuredClone(config));
    return structuredClone(config);
  },
};

/* ── Permissions ─────────────────────────────────────────────────────────── */

const scopes = permissionScopes.map((s) => ({ ...s }));
const secrets: SecretHandle[] = secretHandles.map((s) => ({ ...s }));
const audit: AuditEntry[] = [
  { id: uid('aud'), at: iso(), actor: 'core', action: 'boot.complete', outcome: 'executed', target: 'all subsystems', note: 'Integrity 99.2% · signatures verified', traceId: 'tr-boot1' },
];

let autonomyPolicy: AutonomyPolicy = {
  level: 62,
  stance: 'Acts inside the workspace and inside budget; asks before anything irreversible, outbound or public.',
  autoApproveLowRisk: true,
  autoApproveWithinWorkspace: true,
  requireApprovalAbove: 'medium',
  estateFrozen: false,
  spendCapUsd: 240,
};

function stanceFor(level: number): string {
  if (level <= 15) return 'Paranoid - every tool call, read and write needs your signature.';
  if (level <= 40) return 'Careful - reads and drafts freely; anything with a side effect asks first.';
  if (level <= 65) return 'Working - acts inside the workspace and budget; asks before anything irreversible, outbound or public.';
  if (level <= 85) return 'Bold - runs most of the estate unattended; only critical-risk work and spending above the cap stop for you.';
  return 'Autonomous - everything runs and reports afterwards. Deny-list and secrets are still enforced; that part is not negotiable.';
}

export const mockPermissions: PermissionService & { auditLog(): AuditEntry[] } = {
  auditLog: () => [...audit],
  async scopes() {
    await jitter(40, 120);
    return scopes.map((s) => ({ ...s }));
  },
  async grant(scopeId, tiers) {
    await jitter(120, 240);
    const s = scopes.find((x) => x.id === scopeId);
    if (!s) return;
    s.granted = true;
    s.holders = [...new Set([...s.holders, ...tiers])];
    audit.unshift({ id: uid('aud'), at: iso(), actor: 'Operator', action: 'grant.scope', outcome: 'granted', target: `${scopeId} → ${tiers.join(', ')}`, note: s.description, traceId: `tr-${uid('')}` });
    pushActivity('security', 'Operator', `granted ${scopeId}`, tiers.join(', '), true);
  },
  async revoke(scopeId, tiers) {
    await jitter(100, 200);
    const s = scopes.find((x) => x.id === scopeId);
    if (!s) return;
    s.holders = s.holders.filter((h) => !tiers.includes(h));
    if (!s.holders.length) s.granted = false;
    audit.unshift({ id: uid('aud'), at: iso(), actor: 'Operator', action: 'revoke.scope', outcome: 'revoked', target: `${scopeId} ✕ ${tiers.join(', ')}`, note: 'Immediate · in-flight tool calls aborted', traceId: `tr-${uid('')}` });
    pushActivity('security', 'Operator', `revoked ${scopeId}`, tiers.join(', '), true);
  },
  async roleAccess(agentId, access) {
    const a = world.agents.find((x) => x.id === agentId);
    if (!a) return;
    a.autonomy = access === 'full' ? 0.85 : access === 'ask' ? 0.45 : 0.1;
    a.risk = access === 'restricted' ? 'critical' : a.risk;
    pushActivity('security', 'Operator', `role access → ${access}`, a.name, true);
  },
  async secrets() {
    await jitter(40, 90);
    return secrets.map((s) => ({ ...s }));
  },
  async rotateSecret(id) {
    const release = holdState('executing', `rotate:${id}`);
    await jitter(500, 900);
    const s = secrets.find((x) => x.id === id);
    release();
    if (!s) throw new Error('E_NO_SECRET');
    const tail = Math.random().toString(16).slice(2, 6);
    s.masked = s.masked.replace(/[0-9a-f]{4}$/, tail);
    s.lastUsed = iso();
    audit.unshift({ id: uid('aud'), at: iso(), actor: 'Operator', action: 'secret.rotate', outcome: 'executed', target: s.service, note: 'Old handle revoked · agents re-bound automatically', traceId: `tr-${uid('')}` });
    pushNotice({ severity: 'success', title: 'Secret rotated', body: `${s.label} re-bound. No value passed through the interface at any point.`, source: 'Vault' });
    return { ...s };
  },
  async audit(filter) {
    await jitter(60, 140);
    let items = audit;
    const all = [...items, ...world.activity.filter((e) => e.kind === 'security' || e.sensitive).map((e) => ({
      id: e.id,
      at: e.at,
      actor: e.actor,
      action: e.action,
      outcome: 'executed' as const,
      target: e.detail ?? '—',
      note: `mirrored from activity stream · ${e.kind}`,
      traceId: e.traceId ?? '—',
    }))];
    if (filter?.query) {
      const q = filter.query.toLowerCase();
      all.splice(0, all.length, ...all.filter((a) => `${a.actor} ${a.action} ${a.target} ${a.traceId}`.toLowerCase().includes(q)));
    }
    items = all;
    return items.slice(0, filter?.limit ?? 120);
  },
  async autonomy() {
    await jitter(30, 80);
    return { ...autonomyPolicy };
  },
  async setAutonomy(patch) {
    await jitter(120, 260);
    const before = autonomyPolicy.level;
    autonomyPolicy = { ...autonomyPolicy, ...patch };
    autonomyPolicy.stance = stanceFor(autonomyPolicy.level);
    if (patch.level !== undefined) {
      for (const a of world.agents) {
        a.autonomy = clamp(autonomyPolicy.level / 100 + (a.tier === 'labor' ? -0.2 : a.tier === 'specialist' ? 0.05 : 0), 0.05, 0.98);
      }
    }
    audit.unshift({ id: uid('aud'), at: iso(), actor: 'Operator', action: 'policy.autonomy', outcome: 'granted', target: `${before} -> ${autonomyPolicy.level}`, note: autonomyPolicy.stance, traceId: `tr-${uid('')}` });
    pushActivity('security', 'Operator', `autonomy ${before} -> ${autonomyPolicy.level}`, autonomyPolicy.stance, true);
    logCore(patch.level !== undefined && patch.level > before ? 'warn' : 'info', 'trust', `Autonomy ${autonomyPolicy.level} - ${autonomyPolicy.stance}`);
    return { ...autonomyPolicy };
  },
  async simulateAttack(kind) {
    const release = holdState('alert', `attack:${kind}`);
    await jitter(700, 1_300);
    release();
    const detail = {
      'prompt-injection': 'Injected instruction found in fetched page body, quarantined as data, agent refused to act on it, operator notified.',
      'data-exfil': 'Agent attempted a POST to an origin outside the allowlist. Egress firewall dropped it; trace captured.',
      'privilege-escalation': 'Sub-agent requested filesystem.trash. Policy refused: labour tier cannot exceed its role scopes.',
    }[kind];
    audit.unshift({ id: uid('aud'), at: iso(), actor: 'Threat Monitor', action: `attack.${kind}`, outcome: 'denied', target: 'simulated', note: detail, traceId: `tr-${uid('')}` });
    pushNotice({
      severity: 'critical',
      title: `Threat blocked · ${kind}`,
      body: detail,
      source: 'Security',
      actionable: true,
      actions: [{ id: 'open', label: 'Open audit', kind: 'open' }],
    });
    pushActivity('security', 'Threat Monitor', `blocked ${kind}`, detail, true);
    return { blocked: true, detail };
  },
};

/* ── Media ───────────────────────────────────────────────────────────────── */

let media: MediaState = {
  track: mediaTracks[3] ?? null,
  playing: false,
  positionSec: 41,
  volume: 0.62,
  muted: false,
  shuffle: false,
  repeat: 'all',
  queue: mediaTracks.slice(0, 6),
  device: 'Studio Display Speakers',
};
let mediaHandle: number | undefined;

function emitMedia() {
  media = { ...media };
  mediaBus.emit({ state: media });
}

const startMediaClock = () => {
  if (mediaHandle != null) return;
  mediaHandle = window.setInterval(() => {
    const playing = media.track;
    if (!media.playing || !playing) return;
    media = { ...media, positionSec: media.positionSec + 1 };
    if (media.positionSec >= playing.durationSec) {
      const idx = media.queue.findIndex((t) => t.id === media.track?.id);
      const next = media.shuffle ? pick(media.queue) : media.queue[(idx + 1) % media.queue.length]!;
      media = { ...media, track: next, positionSec: 0 };
      if (media.repeat === 'one') media.positionSec = 0;
    }
    mediaBus.emit({ state: media });
  }, 1_000);
};

let mediaLibrary: MediaArtifact[] = [
  { id: 'med-1', name: 'keynote-2026-03-14.mp4', kind: 'render', sizeMb: 812, status: 'ready', at: '2026-03-14T18:20:00Z', frames: 129_600 },
  { id: 'med-2', name: 'keynote-transcript.json', kind: 'transcript', sizeMb: 1.2, status: 'ready', at: '2026-03-14T18:44:00Z', words: 14_802 },
  { id: 'med-3', name: 'board-sync-08-28.mp3', kind: 'transcript', sizeMb: 46, status: 'processing', at: iso(), words: 6_210 },
  { id: 'med-4', name: 'whisper-large-v3-turbo.gguf', kind: 'model', sizeMb: 1_540, status: 'ready', at: '2026-07-02T09:00:00Z' },
  { id: 'med-5', name: 'hero-hologram-frames.seq', kind: 'frames', sizeMb: 3_880, status: 'queued', at: iso(), frames: 2_400 },
  { id: 'med-6', name: 'operator-preference-set.csv', kind: 'dataset', sizeMb: 84, status: 'ready', at: '2026-08-01T11:30:00Z' },
  { id: 'med-7', name: 'pricing-page-ab-variants.png', kind: 'screenshot', sizeMb: 4.8, status: 'ready', at: '2026-08-27T16:05:00Z' },
  { id: 'med-8', name: 'onboarding-walkthrough.webm', kind: 'render', sizeMb: 268, status: 'failed', at: '2026-08-26T07:12:00Z', frames: 8_640 },
];

export const mockMedia: MediaService = {
  onState: mediaBus,
  async state() {
    startMediaClock();
    return { ...media };
  },
  async play() {
    media = { ...media, playing: true, track: media.track ?? mediaTracks[0]! };
    if (!media.queue.length) media.queue = [...mediaTracks];
    startMediaClock();
    emitMedia();
    pushActivity('system', 'Operator', 'resumed playback', media.track?.title ?? '');
  },
  async pause() {
    media = { ...media, playing: false };
    emitMedia();
  },
  async next() {
    const i = media.queue.findIndex((t) => t.id === media.track?.id);
    media = { ...media, track: media.queue[(i + 1) % media.queue.length] ?? mediaTracks[0]!, positionSec: 0 };
    emitMedia();
  },
  async prev() {
    const i = media.queue.findIndex((t) => t.id === media.track?.id);
    media = { ...media, track: media.queue[(i - 1 + media.queue.length) % media.queue.length] ?? mediaTracks[0]!, positionSec: 0 };
    emitMedia();
  },
  async seek(positionSec) {
    media = { ...media, positionSec: clamp(positionSec, 0, media.track?.durationSec ?? 0) };
    emitMedia();
  },
  async setVolume(v) {
    media = { ...media, volume: clamp(v, 0, 1), muted: v === 0 ? media.muted : false };
    emitMedia();
  },
  async toggleMute() {
    media = { ...media, muted: !media.muted };
    emitMedia();
  },
  async setShuffle(on) {
    media = { ...media, shuffle: on };
    emitMedia();
  },
  async cycleRepeat() {
    const order = ['off', 'one', 'all'] as const;
    media = { ...media, repeat: order[(order.indexOf(media.repeat) + 1) % 3] };
    emitMedia();
    return media.repeat;
  },
  async setDevice(name) {
    media = { ...media, device: name };
    emitMedia();
    pushActivity('system', 'Operator', `media output → ${name}`);
  },
  async enqueue(trackIds) {
    const added = mediaTracks.filter((t) => trackIds.includes(t.id));
    media = { ...media, queue: [...media.queue, ...added] };
    emitMedia();
    pushActivity('system', 'Operator', `queued ${added.length} track(s)`, added.map((t) => t.title).join(', '));
  },
  async library() {
    await jitter(90, 200);
    return mediaLibrary;
  },
  async removeFromQueue(index) {
    if (!media.queue[index]) return;
    const [t] = media.queue.splice(index, 1);
    emitMedia();
    pushActivity('system', 'Operator', `removed from queue`, t!.title);
  },
  async toggleLibraryItem(id) {
    const item = mediaLibrary.find((x) => x.id === id);
    if (!item) return;
    item.status = item.status === 'processing' ? 'queued' : item.status === 'ready' ? 'queued' : 'processing';
    pushActivity('system', 'Operator', `re-queued ${item.name}`, 'media worker picked it up');
    await jitter(300, 700);
    if (item.status === 'processing') {
      item.status = 'ready';
      item.at = iso();
    }
  },
};

/* ── Voice ───────────────────────────────────────────────────────────────── */

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((e: { resultIndex: number; results: ArrayLike<{ 0: { transcript: string }; isFinal: boolean }> }) => void) | null;
  onerror: ((e: { error?: string }) => void) | null;
  onend: (() => void) | null;
};

const RecognitionCtor =
  typeof window !== 'undefined'
    ? ((window as unknown as { SpeechRecognition?: new () => SpeechRecognitionLike }).SpeechRecognition ??
        (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognitionLike }).webkitSpeechRecognition)
    : undefined;

const synth = typeof window !== 'undefined' ? window.speechSynthesis : undefined;

let voiceConfig: VoiceConfig = structuredClone(config.voice);
let recognition: SpeechRecognitionLike | null = null;
let simHandle: number | undefined;
let ttsHandle: number | undefined;

export const mockVoice: VoiceService = {
  onVoiceEvent: voiceBus,
  async profiles() {
    await jitter(30, 90);
    return voiceProfiles;
  },
  async config() {
    return { ...voiceConfig };
  },
  async configure(patch) {
    voiceConfig = { ...voiceConfig, ...patch };
    config.voice = voiceConfig;
    await mockSettings.patch({ voice: voiceConfig });
    pushActivity('system', 'Operator', 'voice settings updated', `${voiceConfig.sttEngine} STT · wake “${voiceConfig.wakeWord}”`);
  },
  async capabilities() {
    return { stt: !!RecognitionCtor, tts: !!synth, wakeWord: false };
  },
  async listen() {
    voiceBus.emit({ type: 'listening-start' });
    if (RecognitionCtor) {
      try {
        recognition = new RecognitionCtor();
        recognition.lang = 'en-US';
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.onresult = (e) => {
          let text = '';
          for (let i = e.resultIndex; i < e.results.length; i++) text += e.results[i]?.[0]?.transcript ?? '';
          const final = !!e.results[e.results.length - 1]?.isFinal;
          voiceBus.emit({ type: final ? 'final' : 'partial', text });
        };
        recognition.onerror = (e) => {
          voiceBus.emit({ type: 'error', message: e.error === 'not-allowed' ? 'Microphone permission denied. Grant it in System Settings → Privacy → Microphone.' : `Speech recognition error: ${e.error ?? 'unknown'}` });
          recognition = null;
        };
        recognition.onend = () => {
          recognition = null;
        };
        recognition.start();
        return;
      } catch {
        voiceBus.emit({ type: 'error', message: 'Speech recognition unavailable in this session. Falling back to simulated capture.' });
      }
    }
    // Simulated capture: streams a plausible utterance word by word.
    const utterance = pick(simulatedUtterances);
    const words = utterance.split(' ');
    let i = 0;
    let acc = '';
    if (simHandle) window.clearInterval(simHandle);
    simHandle = window.setInterval(() => {
      const w = words[i++];
      if (!w) {
        window.clearInterval(simHandle);
        simHandle = undefined;
        voiceBus.emit({ type: 'final', text: acc.trim() });
        return;
      }
      acc += `${w} `;
      voiceBus.emit({ type: 'partial', text: acc.trim() });
      voiceBus.emit({ type: 'tts-level', level: rand(0.2, 0.95) });
    }, 210);
  },
  async stop() {
    if (simHandle) {
      window.clearInterval(simHandle);
      simHandle = undefined;
    }
    recognition?.stop();
    recognition = null;
    voiceBus.emit({ type: 'cancelled' });
  },
  async speak(text) {
    const profile = voiceProfiles.find((p) => p.id === voiceConfig.ttsProfileId) ?? voiceProfiles[0]!;
    voiceBus.emit({ type: 'tts-start', text });
    if (voiceConfig.duckMedia && media.playing) {
      media = { ...media, volume: media.volume * 0.35 };
      emitMedia();
    }
    if (synth && profile.engine === 'cloud') {
      const u = new SpeechSynthesisUtterance(text.replace(/[*_`#>]/g, ''));
      u.rate = profile.speakingRate;
      u.pitch = 1 + profile.pitch / 12;
      u.onend = () => voiceBus.emit({ type: 'tts-end' });
      u.onerror = () => voiceBus.emit({ type: 'tts-end' });
      synth.cancel();
      synth.speak(u);
    }
    const ms = Math.min(14_000, Math.max(1_400, text.length * 42));
    if (ttsHandle) window.clearInterval(ttsHandle);
    const startedAt = performance.now();
    ttsHandle = window.setInterval(() => {
      const t = (performance.now() - startedAt) / ms;
      if (t >= 1) {
        window.clearInterval(ttsHandle);
        ttsHandle = undefined;
        voiceBus.emit({ type: 'tts-level', level: 0 });
        voiceBus.emit({ type: 'tts-end' });
        if (voiceConfig.duckMedia) {
          media = { ...media, volume: 0.62 };
          emitMedia();
        }
        return;
      }
      const env = 0.35 + Math.abs(Math.sin(t * 26)) * 0.4 * (1 - t * 0.3) + rand(-0.08, 0.08);
      voiceBus.emit({ type: 'tts-level', level: clamp(env, 0, 1) });
    }, 60);
  },
  async stopSpeaking() {
    if (ttsHandle) {
      window.clearInterval(ttsHandle);
      ttsHandle = undefined;
    }
    synth?.cancel();
    voiceBus.emit({ type: 'barge-in' });
    voiceBus.emit({ type: 'tts-end' });
  },
};

/* ── convenience ─────────────────────────────────────────────────────────── */

export const fmt = { formatBytes };
