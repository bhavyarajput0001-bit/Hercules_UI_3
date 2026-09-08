/**
 * HERCULES · shared domain types
 * ---------------------------------------------------------------------------
 * These types are the contract between the UI and *any* backend implementation.
 * Nothing here references HTTP, sockets, vendors or SDKs — the UI only ever
 * sees this vocabulary. Changing the backend must not require touching a
 * component.
 */

export type ISODateTime = string;
export type EntityId = string;

/* ── Core / lifecycle ────────────────────────────────────────────────────── */

export type BootPhase = 'cold' | 'booting' | 'calibrating' | 'online' | 'degraded';

export type CoreState =
  | 'dormant'
  | 'idle'
  | 'listening'
  | 'thinking'
  | 'speaking'
  | 'executing'
  | 'alert'
  | 'error'
  | 'updating';

export interface CoreVitals {
  state: CoreState;
  /** 0..1 — drives hologram amplitude. */
  energy: number;
  /** 0..100 */
  cognitiveLoad: number;
  /** 0..100 */
  memoryPressure: number;
  /** 0..100 */
  integrity: number;
  activeAgents: number;
  queuedTasks: number;
  uptimeMs: number;
  /** Human label for what the core is doing right now. */
  focus: string;
}

/* ── Identity ────────────────────────────────────────────────────────────── */

export type PersonalityPresetId = 'sentinel' | 'chief-of-staff' | 'analyst' | 'engineer' | 'companion';

export interface Persona {
  name: string;
  callsign: string;
  pronouns: string;
  preset: PersonalityPresetId;
  /** 0..1 */
  initiative: number;
  /** 0..1 */
  verbosity: number;
  /** 0..1 */
  wit: number;
  /** 0..1 */
  caution: number;
  formality: 'terse' | 'balanced' | 'formal';
  avatarHue: number;
}

export interface Operator {
  id: EntityId;
  handle: string;
  displayName: string;
  clearance: 'owner' | 'admin' | 'operator' | 'observer';
  initials: string;
}

/* ── Departments / agents ────────────────────────────────────────────────── */

export type AgentTier = 'ceo' | 'orchestrator' | 'department' | 'specialist' | 'subagent' | 'labor';

export type AgentStatus =
  | 'recruited'
  | 'idle'
  | 'thinking'
  | 'working'
  | 'blocked'
  | 'awaiting-approval'
  | 'error'
  | 'retired';

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface Agent {
  id: EntityId;
  name: string;
  roleId: string;
  tier: AgentTier;
  departmentId: EntityId | null;
  parentId: EntityId | null;
  childIds: EntityId[];
  status: AgentStatus;
  /** 0..100 */
  load: number;
  /** 0..1 */
  autonomy: number;
  risk: RiskLevel;
  capabilities: string[];
  modelId: EntityId;
  /** Currently executed objective (one-liner). */
  task: string;
  stepsCompleted: number;
  stepsTotal: number;
  tokensIn: number;
  tokensOut: number;
  costUsd: number;
  successRate: number;
  lastHeartbeat: ISODateTime;
  color?: string;
}

export interface Department {
  id: EntityId;
  name: string;
  code: string;
  mission: string;
  leadAgentId: EntityId;
  agentIds: EntityId[];
  status: 'active' | 'standing-by' | 'degraded' | 'offline';
  /** 0..100 */
  throughput: number;
  /** 0..100 */
  backlogPressure: number;
  budgetUsd: number;
  spentUsd: number;
  tools: string[];
  kpis: { label: string; value: string; trend?: number }[];
  color: string;
  icon: string;
}

export type RoleAccess = 'full' | 'ask' | 'restricted';

export interface AgentRole {
  id: string;
  name: string;
  category: string;
  description: string;
  tools: string[];
  defaultModelTier: 'fast' | 'balanced' | 'frontier' | 'specialist';
  autonomy: number;
  access: RoleAccess;
}

/* ── Models ──────────────────────────────────────────────────────────────── */

export type ModelCapability =
  | 'chat'
  | 'reasoning'
  | 'vision'
  | 'audio'
  | 'image'
  | 'video'
  | 'embedding'
  | 'code'
  | 'tools'
  | 'structured';

export interface ModelInfo {
  id: EntityId;
  name: string;
  family: string;
  /** Deployment location — never a secret. */
  provider: 'cloud' | 'local' | 'edge';
  providerLabel: string;
  contextWindow: number;
  capabilities: ModelCapability[];
  /** 0..100 */
  quality: number;
  /** ms to first token */
  latencyMs: number;
  costPer1kIn: number;
  costPer1kOut: number;
  status: 'ready' | 'slow' | 'offline' | 'rate-limited';
  tier: 'fast' | 'balanced' | 'frontier' | 'specialist';
}

export interface RouterPolicy {
  mode: 'auto' | 'cost' | 'speed' | 'quality' | 'privacy' | 'fixed';
  fixedModelId: EntityId | null;
  fallbackChain: EntityId[];
  preferLocal: boolean;
  maxMonthlySpendUsd: number;
  redactBeforeSend: boolean;
}

/* ── Tasks / missions ────────────────────────────────────────────────────── */

export type TaskPriority = 'p0' | 'p1' | 'p2' | 'p3';
export type TaskStatus =
  | 'backlog'
  | 'queued'
  | 'in-progress'
  | 'blocked'
  | 'awaiting-approval'
  | 'review'
  | 'done'
  | 'failed'
  | 'cancelled';

export interface TaskEvent {
  at: ISODateTime;
  actor: string;
  kind: 'step' | 'tool' | 'note' | 'artifact' | 'error' | 'approval' | 'status' | 'plan';
  text: string;
}

export interface Task {
  id: EntityId;
  title: string;
  objective: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeAgentId: EntityId | null;
  departmentId: EntityId | null;
  projectId: EntityId | null;
  progress: number;
  estimateMin: number;
  elapsedMin: number;
  requiresApproval: boolean;
  approvalReason?: string;
  tags: string[];
  events: TaskEvent[];
  artifacts: Artifact[];
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

export interface Artifact {
  id: EntityId;
  kind: 'file' | 'report' | 'dataset' | 'image' | 'patch' | 'log' | 'plan' | 'link';
  name: string;
  uri: string;
  sizeBytes?: number;
  createdBy: string;
  at: ISODateTime;
}

export type ProjectStatus = 'planning' | 'active' | 'on-hold' | 'at-risk' | 'shipped' | 'archived';

export interface Project {
  id: EntityId;
  name: string;
  codename: string;
  goal: string;
  status: ProjectStatus;
  progress: number;
  departmentIds: EntityId[];
  taskIds: EntityId[];
  riskScore: number;
  budgetUsd: number;
  spentUsd: number;
  due: ISODateTime;
  milestones: { id: EntityId; name: string; done: boolean; at: ISODateTime }[];
  color: string;
}

export interface MissionLog {
  id: EntityId;
  at: ISODateTime;
  level: 'info' | 'success' | 'warn' | 'error';
  source: string;
  text: string;
}

/* ── Conversations / AI ──────────────────────────────────────────────────── */

export type ChatRole = 'operator' | 'hercules' | 'agent' | 'system';

export interface MessageBlock {
  kind: 'text' | 'code' | 'plan' | 'tool-call' | 'file' | 'chart' | 'approval' | 'citations';
  text?: string;
  lang?: string;
  language?: string;
  tool?: string;
  args?: string;
  result?: string;
  status?: 'running' | 'ok' | 'error' | 'pending';
  steps?: { id: string; label: string; status: 'pending' | 'active' | 'done' | 'failed'; agent?: string }[];
  artifactIds?: EntityId[];
  citations?: { id: string; title: string; source: string }[];
  series?: { label: string; values: number[] }[];
}

export interface ChatMessage {
  id: EntityId;
  conversationId: EntityId;
  role: ChatRole;
  agentName?: string;
  at: ISODateTime;
  blocks: MessageBlock[];
  streaming?: boolean;
  tokens?: number;
  model?: string;
}

export interface Conversation {
  id: EntityId;
  title: string;
  startedAt: ISODateTime;
  updatedAt: ISODateTime;
  channel: 'ui' | 'voice' | 'notification-reply' | 'automation';
  messageIds: EntityId[];
  pinned: boolean;
  tags: string[];
}

export interface StreamChunk {
  conversationId: EntityId;
  messageId: EntityId;
  /** Incremental text delta, or a structured block patch. */
  delta?: string;
  block?: MessageBlock;
  done?: boolean;
  coreState?: CoreState;
}

export interface SubmitPromptInput {
  text: string;
  conversationId?: EntityId;
  channel?: Conversation['channel'];
  /** Optional routing override: ask a specific agent/department to answer. */
  routeTo?: { kind: 'agent' | 'department'; id: EntityId };
  attachments?: { name: string; sizeBytes: number; mime: string }[];
}

/* ── Memory ───────────────────────────────────────────────────────────────── */

export type MemoryKind = 'fact' | 'preference' | 'episode' | 'procedure' | 'decision' | 'entity';
export type MemoryScope = 'private' | 'team' | 'org';

export interface MemoryRecord {
  id: EntityId;
  kind: MemoryKind;
  scope: MemoryScope;
  title: string;
  body: string;
  tags: string[];
  entities: string[];
  /** 0..1 */
  confidence: number;
  /** 0..1 — decayed salience; drives recall order. */
  strength: number;
  source: string;
  createdAt: ISODateTime;
  lastRecalledAt: ISODateTime | null;
  pinned: boolean;
  provenance: { conversationId?: EntityId; taskId?: EntityId; documentId?: EntityId };
}

export interface MemorySearchHit {
  record: MemoryRecord;
  score: number;
  excerpt: string;
}

export interface WriteMemoryInput {
  kind: MemoryKind;
  title: string;
  body: string;
  tags?: string[];
  scope?: MemoryScope;
  pinned?: boolean;
}

/* ── Files ───────────────────────────────────────────────────────────────── */

export interface FileNode {
  id: EntityId;
  name: string;
  path: string;
  kind: 'folder' | 'file';
  mime?: string;
  sizeBytes?: number;
  children?: FileNode[];
  agentEditable: boolean;
  watched: boolean;
  indexed: boolean;
  updatedAt: ISODateTime;
  checksum?: string;
  /** Version-control style marker, driven by the watcher. */
  op?: 'new' | 'dirty' | 'deleted';
}

export interface FileSearchHit {
  id: EntityId;
  path: string;
  name: string;
  excerpt: string;
  line: number;
}

export interface FilePreview {
  id: EntityId;
  path: string;
  kind: 'text' | 'image' | 'pdf' | 'code' | 'binary';
  language?: string;
  content: string;
  sizeBytes: number;
  lines: number;
}

/* ── Knowledge ───────────────────────────────────────────────────────────── */

export interface KnowledgeSource {
  id: EntityId;
  name: string;
  origin: string;
  kind: 'documents' | 'code' | 'web' | 'email' | 'database' | 'notes';
  status: 'indexing' | 'ready' | 'stale' | 'error';
  progress: number;
  chunks: number;
  sizeBytes: number;
  updatedAt: ISODateTime;
  embeddingModelId: EntityId;
  tokens: number;
  error?: string;
}

export interface KnowledgeChunk {
  id: EntityId;
  sourceId: EntityId;
  heading: string;
  text: string;
  tokens: number;
}

export interface KnowledgeSearchHit {
  chunk: KnowledgeChunk;
  score: number;
  sourceName: string;
}

/* ── Automations / workflows ──────────────────────────────────────────────── */

export type TriggerKind = 'schedule' | 'event' | 'webhook' | 'file' | 'manual' | 'intent';

export interface AutomationTrigger {
  kind: TriggerKind;
  label: string;
  /** cron-ish / human schedule text */
  expr?: string;
}

export interface AutomationStep {
  id: string;
  name: string;
  kind: 'agent' | 'tool' | 'condition' | 'approval' | 'notify' | 'transform' | 'delay';
  detail: string;
  status: 'ok' | 'running' | 'failed' | 'pending';
}

export interface AutomationRun {
  id: EntityId;
  at: ISODateTime;
  durationMs: number;
  status: 'ok' | 'failed' | 'partial';
  summary: string;
  costUsd: number;
}

export interface Automation {
  id: EntityId;
  name: string;
  description: string;
  enabled: boolean;
  trigger: AutomationTrigger;
  steps: AutomationStep[];
  risk: RiskLevel;
  requiresApproval: boolean;
  lastRun: ISODateTime | null;
  nextRun: ISODateTime | null;
  runs: AutomationRun[];
  successRate: number;
  agentId?: EntityId;
  tags: string[];
}

export interface WorkflowGraph {
  id: EntityId;
  name: string;
  nodes: { id: string; label: string; kind: 'trigger' | 'agent' | 'tool' | 'branch' | 'output'; x: number; y: number }[];
  edges: { from: string; to: string; label?: string }[];
  automationId: EntityId;
}

/* ── Browser ─────────────────────────────────────────────────────────────── */

export interface BrowserTab {
  id: EntityId;
  title: string;
  url: string;
  status: 'loading' | 'ready' | 'secure' | 'blocked' | 'error';
  agentControlled: boolean;
  faviconHint?: string;
}

export interface PageAction {
  id: EntityId;
  kind: 'click' | 'type' | 'extract' | 'scroll' | 'download' | 'assert' | 'screenshot';
  selector: string;
  value?: string;
  status: 'pending' | 'running' | 'ok' | 'failed';
  at: ISODateTime;
}

export interface SitePermission {
  origin: string;
  scope: 'read' | 'act' | 'submit';
  mode: RoleAccess;
}

/* ── Terminal ────────────────────────────────────────────────────────────── */

export interface TerminalSession {
  id: EntityId;
  name: string;
  shell: 'zsh' | 'pwsh' | 'bash';
  cwd: string;
  agentDriven: boolean;
  risk: RiskLevel;
}

export type TerminalLineKind = 'prompt' | 'cmd' | 'out' | 'err' | 'note' | 'agent';

export interface TerminalLine {
  id: string;
  kind: TerminalLineKind;
  text: string;
  at: ISODateTime;
}

export interface ExecResult {
  exitCode: number;
  lines: { kind: TerminalLineKind; text: string }[];
  durationMs: number;
}

/* ── System ───────────────────────────────────────────────────────────────── */

export interface SystemSnapshot {
  os: { name: string; version: string; arch: string; hostname: string };
  cpu: { model: string; cores: number; threads: number; load: number[]; tempC: number };
  memory: { totalBytes: number; usedBytes: number; swapBytes: number; swapUsedBytes: number };
  gpus: { name: string; vramBytes: number; usedVramBytes: number; util: number }[];
  disks: { mount: string; totalBytes: number; usedBytes: number; readMbps: number; writeMbps: number }[];
  network: {
    interface: string;
    ip: string;
    publicIpMasked: string;
    downMbps: number;
    upMbps: number;
    latencyMs: number;
    proxyActive: boolean;
  };
  battery: { onAc: boolean; percent: number; timeRemainingMin: number | null };
  audio: { inputDevice: string; outputDevice: string; inputLevel: number; muted: boolean };
  displays: { id: string; label: string; resolution: string; scale: number }[];
  power: { sleepBlockers: string[]; performanceMode: 'eco' | 'balanced' | 'max' };
}

export interface ProcessInfo {
  pid: number;
  name: string;
  cpu: number;
  memMb: number;
  kind: 'hercules' | 'agent' | 'system' | 'user' | 'browser';
  agentId?: EntityId;
}

export interface Integration {
  id: string;
  name: string;
  category: 'model' | 'communication' | 'storage' | 'code' | 'data' | 'media' | 'device';
  status: 'connected' | 'disconnected' | 'error' | 'partial';
  account: string;
  scopes: string[];
  lastSync: ISODateTime | null;
  agentUsable: boolean;
}

export interface DeviceInfo {
  id: string;
  name: string;
  kind: 'microphone' | 'speaker' | 'camera' | 'display' | 'keyboard' | 'gamepad';
  status: 'ready' | 'busy' | 'unavailable';
  default: boolean;
  level?: number;
}

/* ── Media ───────────────────────────────────────────────────────────────── */

export interface MediaTrack {
  id: EntityId;
  title: string;
  artist: string;
  album: string;
  durationSec: number;
  artworkHue: number;
  source: 'spotify' | 'local' | 'radio' | 'youtube';
}

export interface MediaState {
  track: MediaTrack | null;
  playing: boolean;
  positionSec: number;
  volume: number;
  muted: boolean;
  shuffle: boolean;
  repeat: 'off' | 'one' | 'all';
  queue: MediaTrack[];
  device: string;
}

/* ── Voice ───────────────────────────────────────────────────────────────── */

export interface VoiceProfile {
  id: string;
  name: string;
  engine: 'local' | 'cloud';
  gender: 'feminine' | 'masculine' | 'neutral';
  speakingRate: number;
  pitch: number;
  privacyNote: string;
  latencyMs: number;
}

export interface VoiceConfig {
  wakeWord: string;
  pushToTalkKey: string;
  alwaysAvailable: boolean;
  bargeIn: boolean;
  sttEngine: 'local' | 'cloud';
  ttsProfileId: string;
  duckMedia: boolean;
  languages: string[];
}

export type VoiceEvent =
  | { type: 'wake' }
  | { type: 'listening-start' }
  | { type: 'partial'; text: string }
  | { type: 'final'; text: string }
  | { type: 'tts-start'; text: string }
  | { type: 'tts-level'; level: number }
  | { type: 'tts-end' }
  | { type: 'barge-in' }
  | { type: 'cancelled' }
  | { type: 'error'; message: string };

/* ── Activity / notifications ─────────────────────────────────────────────── */

export type ActivityKind =
  | 'task'
  | 'agent'
  | 'file'
  | 'memory'
  | 'tool'
  | 'security'
  | 'automation'
  | 'conversation'
  | 'system';

export interface ActivityEvent {
  id: string;
  at: ISODateTime;
  kind: ActivityKind;
  actor: string;
  action: string;
  target?: string;
  detail?: string;
  sensitive: boolean;
  traceId?: string;
}

export type NoticeSeverity = 'info' | 'success' | 'warning' | 'critical';

export interface Notice {
  id: EntityId;
  at: ISODateTime;
  severity: NoticeSeverity;
  title: string;
  body: string;
  source: string;
  read: boolean;
  actionable: boolean;
  actions?: { id: string; label: string; kind: 'approve' | 'deny' | 'open' | 'retry' | 'snooze' }[];
  related?: { kind: 'task' | 'agent' | 'automation' | 'project' | 'memory'; id: EntityId };
}

export interface Toast {
  id: EntityId;
  title: string;
  body?: string;
  severity: NoticeSeverity;
  /** ms; 0 = sticky until dismissed */
  ttlMs: number;
  action?: { label: string; run: () => void };
}

/* ── Permissions / security ──────────────────────────────────────────────── */

export interface PermissionScope {
  id: string;
  label: string;
  group: 'files' | 'system' | 'network' | 'media' | 'data' | 'ai' | 'communication';
  description: string;
  risk: RiskLevel;
  granted: boolean;
  /** Which agent tiers currently hold it. */
  holders: AgentTier[];
  audited: boolean;
}

export interface ApprovalRequest {
  id: EntityId;
  requestedBy: string;
  agentId: EntityId;
  action: string;
  reason: string;
  risk: RiskLevel;
  command?: string;
  target?: string;
  createdAt: ISODateTime;
}

export interface SecretHandle {
  id: string;
  label: string;
  service: string;
  /** Masked, never the value. */
  masked: string;
  vault: 'os-keychain' | 'env' | 'encrypted-store';
  lastUsed: ISODateTime;
  scope: string;
}

export interface AuditEntry {
  id: string;
  at: ISODateTime;
  actor: string;
  action: string;
  outcome: 'allowed' | 'denied' | 'granted' | 'revoked' | 'executed';
  target: string;
  note: string;
  traceId: string;
}

/* ── Analytics ───────────────────────────────────────────────────────────── */

export interface AnalyticsSummary {
  windowDays: number;
  tokensTotal: number;
  costUsd: number;
  tasksCompleted: number;
  tasksFailed: number;
  successRate: number;
  avgLatencyMs: number;
  autonomyInterventions: number;
  series: {
    /** x-axis labels, one per point in the window */
    label: string[];
    cost: number[];
    tokens: number[];
    tasks: number[];
    latency: number[];
  };
  byDepartment: { id: EntityId; name: string; costUsd: number; tasks: number; successRate: number }[];
  byModel: { id: EntityId; name: string; share: number; costUsd: number }[];
  byTool: { name: string; calls: number; failureRate: number }[];
}

/* ── Settings ────────────────────────────────────────────────────────────── */

export type ThemeId =
  | 'obsidian-night'
  | 'cyan-eclipse'
  | 'amber-forge'
  | 'solar-flare'
  | 'graphite-steel'
  | 'paper-daylight';

export type DensityId = 'comfortable' | 'standard' | 'compact';

export interface ThemeConfig {
  themeId: ThemeId;
  density: DensityId;
  /** 0..1 */
  intensity: number;
  reduceMotion: boolean;
  allowGlowThroughCpu: boolean;
}

export interface AppConfig {
  schemaVersion: number;
  boot: { autoRunDiagnostics: boolean; cinematicSequence: boolean; showTrayIcon: boolean };
  core: { alwaysAvailable: boolean; hotkeySummon: string; autoPauseOnBattery: boolean };
  ai: { router: RouterPolicy; persona: Persona; contextWindowBudget: number; reasoningDepth: 'fast' | 'balanced' | 'deep' };
  voice: VoiceConfig;
  theme: ThemeConfig;
  privacy: {
    localFirst: boolean;
    telemetry: 'off' | 'anonymous' | 'full';
    redactPII: boolean;
    onDeviceTranscription: boolean;
    retentionDays: number;
    requireApprovalFor: RiskLevel[];
    screenAwareness: boolean;
    clipboardAccess: RoleAccess;
  };
  notifications: {
    channel: 'os' | 'in-app' | 'both';
    sound: boolean;
    quietHours: { enabled: boolean; from: string; to: string };
    digest: 'off' | 'hourly' | 'daily';
  };
  files: { defaultRoot: string; watchProjects: boolean; autoIndex: boolean };
  developer: { transport: string; apiBase: string; verboseLogs: boolean; demoSeed: number };
}

/* ── Cross-cutting service result wrapper ────────────────────────────────── */

export type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: string; code?: string; remediation?: string };

export const ok = <T,>(value: T): Result<T> => ({ ok: true, value });
export const err = <T = never>(error: string, code?: string, remediation?: string): Result<T> => ({
  ok: false,
  error,
  code,
  remediation,
});
