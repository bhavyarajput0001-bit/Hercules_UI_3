/**
 * HERCULES · service contracts
 * ---------------------------------------------------------------------------
 * The UI depends on these interfaces and nothing else. Swapping the mock
 * layer for a real backend (REST / WS / Tauri IPC) means providing new
 * implementations here — no component edits.
 */
import type {
  ActivityEvent,
  ActivityKind,
  Agent,
  AgentRole,
  AnalyticsSummary,
  AppConfig,
  ApprovalRequest,
  Artifact,
  AuditEntry,
  Automation,
  BootPhase,
  BrowserTab,
  ChatMessage,
  CoreState,
  CoreVitals,
  Department,
  DeviceInfo,
  ExecResult,
  FileNode,
  FilePreview,
  FileSearchHit,
  Integration,
  KnowledgeChunk,
  KnowledgeSearchHit,
  KnowledgeSource,
  MediaState,
  MemoryRecord,
  MemorySearchHit,
  MissionLog,
  ModelInfo,
  Notice,
  PageAction,
  PermissionScope,
  Persona,
  ProcessInfo,
  Project,
  SecretHandle,
  SitePermission,
  SubmitPromptInput,
  SystemSnapshot,
  Task,
  TerminalLine,
  TerminalSession,
  VoiceConfig,
  VoiceEvent,
  VoiceProfile,
  WorkflowGraph,
  WriteMemoryInput,
  AgentTier,
  RiskLevel,
  TaskPriority,

  ProjectStatus,
} from '@/types/domain';

export type Unsubscribe = () => void;

/** Minimal event bus every stateful service exposes. */
export interface Emitter<E> {
  subscribe(listener: (event: E) => void): Unsubscribe;
}

export interface CoreService {
  readonly phase: BootPhase;
  readonly vitals: CoreVitals;
  onCoreEvent: Emitter<{ type: 'vitals'; vitals: CoreVitals } | { type: 'state'; state: CoreState } | { type: 'log'; log: MissionLog }>;
  boot(): Promise<void>;
  /** Transient overlay state, ref-counted by callers. */
  holdState(state: CoreState, owner: string): Unsubscribe;
  shutdown(): Promise<void>;
  reconfigure(patch: Partial<Pick<AppConfig, 'ai' | 'core' | 'privacy' | 'voice'>>): Promise<void>;
}

export interface AIService {
  models(): Promise<ModelInfo[]>;
  conversation(id: string): Promise<ChatMessage[]>;
  conversations(): Promise<{ id: string; title: string; at: string; preview: string }[]>;
  submit(input: SubmitPromptInput): AsyncIterable<import('@/types/domain').StreamChunk>;
  stop(conversationId: string): Promise<void>;
  actAsIntent(text: string): Promise<CommandIntent | null>;
  summarize(taskId: string): Promise<string>;
}

export interface CommandIntent {
  verb: string;
  targetKind: 'screen' | 'task' | 'agent' | 'automation' | 'file' | 'memory' | 'media' | 'system';
  targetLabel: string;
  confidence: number;
  args?: Record<string, string | number>;
}

export interface AgentService {
  list(): Promise<Agent[]>;
  roles(): Promise<AgentRole[]>;
  get(id: string): Promise<Agent | null>;
  spawn(input: { name: string; roleId: string; departmentId: string | null; autonomy: number; risk: RiskLevel; parentId?: string }): Promise<Agent>;
  retire(id: string): Promise<void>;
  pause(id: string): Promise<void>;
  resume(id: string): Promise<void>;
  boost(id: string): Promise<void>;
  steer(id: string, guidance: string): Promise<void>;
  grantCapability(id: string, scopeId: string): Promise<void>;
  revokeCapability(id: string, scopeId: string): Promise<void>;
  trace(id: string): Promise<import('@/types/domain').TaskEvent[]>;
  onAgentEvent: Emitter<{ type: 'updated'; agent: Agent } | { type: 'removed'; id: string }>;
}

export interface DepartmentService {
  list(): Promise<Department[]>;
  get(id: string): Promise<Department | null>;
  create(input: { name: string; code: string; mission: string; color: string }): Promise<Department>;
  setBudget(id: string, budgetUsd: number): Promise<void>;
  toggleAgentAccess(id: string, agentId: string, enabled: boolean): Promise<void>;
  setDepartmentAutonomy(id: string, autonomy: number): Promise<void>;
  roster(departmentId: string): Promise<Agent[]>;
}

export interface TaskService {
  list(): Promise<Task[]>;
  get(id: string): Promise<Task | null>;
  create(input: {
    title: string;
    objective: string;
    priority: TaskPriority;
    projectId: string | null;
    departmentId: string | null;
    assigneeAgentId: string | null;
    estimateMin: number;
  }): Promise<Task>;
  update(id: string, patch: Partial<Pick<Task, 'status' | 'priority' | 'assigneeAgentId' | 'projectId'>>): Promise<Task>;
  approve(id: string, approved: boolean): Promise<void>;
  cancel(id: string): Promise<void>;
  retry(id: string): Promise<void>;
  assignTo(id: string, agentId: string): Promise<void>;
  log(id: string, text: string): Promise<void>;
  artifacts(taskId: string): Promise<Artifact[]>;
  onTaskEvent: Emitter<{ type: 'updated'; task: Task } | { type: 'created'; task: Task }>;
}

export interface ProjectService {
  list(): Promise<Project[]>;
  create(input: { name: string; codename: string; goal: string; due: string; budgetUsd: number }): Promise<Project>;
  setStatus(id: string, status: ProjectStatus): Promise<void>;
  toggleMilestone(projectId: string, milestoneId: string): Promise<Project>;
  brief(id: string): Promise<string>;
}

export interface MemoryService {
  search(query: string, opts?: { kind?: MemoryRecord['kind'] | 'all'; limit?: number }): Promise<MemorySearchHit[]>;
  list(): Promise<MemoryRecord[]>;
  write(input: WriteMemoryInput): Promise<MemoryRecord>;
  update(id: string, patch: Partial<MemoryRecord>): Promise<MemoryRecord>;
  pin(id: string, pinned: boolean): Promise<void>;
  delete(id: string): Promise<void>;
  consolidate(): Promise<{ merged: number; savedTokens: number }>;
  decayCurve(): Promise<{ day: number; strength: number }[]>;
  graph(): Promise<{ nodes: { id: string; label: string; weight: number; kind: MemoryRecord['kind'] }[]; links: { from: string; to: string }[] }>;
}

export interface FileService {
  tree(root?: string): Promise<FileNode[]>;
  list(dirPath: string): Promise<FileNode[]>;
  read(path: string): Promise<FilePreview | null>;
  search(query: string): Promise<FileSearchHit[]>;
  createFolder(parentPath: string, name: string): Promise<FileNode>;
  upload(parentPath: string, files: { name: string; sizeBytes: number }[]): Promise<FileNode[]>;
  watch(path: string, on: boolean): Promise<void>;
  index(path: string, on: boolean): Promise<void>;
  reveal(path: string): Promise<void>;
  trash(path: string): Promise<void>;
  restore(path: string): Promise<void>;
  /** Human write used by screens that generate notes; logged like any other op. */
  write(path: string, content: string): Promise<FileNode>;
  /** Soft-deleted items still inside the restore window. */
  trashList(): Promise<{ path: string; name: string; at: string }[]>;
  /** Who touched what. The desktop shell will read this from the FS watcher + policy engine. */
  audit(): Promise<FileAuditEntry[]>;
}

export interface FileAuditEntry {
  id: string;
  at: string;
  kind: 'read' | 'write' | 'delete' | 'execute' | 'upload';
  path: string;
  agent: string;
  reason: string;
  blocked: boolean;
}

export interface KnowledgeService {
  sources(): Promise<KnowledgeSource[]>;
  stats(): Promise<KnowledgeStats>;
  addSource(input: { name: string; origin: string; kind: KnowledgeSource['kind'] }): Promise<KnowledgeSource>;
  rebuild(sourceId: string): Promise<void>;
  remove(sourceId: string): Promise<void>;
  query(text: string): Promise<KnowledgeSearchHit[]>;
  chunks(sourceId: string): Promise<KnowledgeChunk[]>;
}

export interface KnowledgeStats {
  coverage: number;
  hitRate: number;
  avgLatencyMs: number;
  lastBuild: string;
  sizeSeries: number[];
  terms: number;
}

export interface AutomationService {
  list(): Promise<Automation[]>;
  create(input: { name: string; description: string; triggerKind: Automation['trigger']['kind']; expr: string; agentId: string; risk: RiskLevel }): Promise<Automation>;
  update(id: string, patch: Partial<Pick<Automation, 'enabled' | 'requiresApproval' | 'trigger'>>): Promise<Automation>;
  run(id: string): Promise<import('@/types/domain').AutomationRun>;
  duplicate(id: string): Promise<Automation>;
  remove(id: string): Promise<void>;
  workflowFor(id: string): Promise<WorkflowGraph | null>;
  onRunEvent: Emitter<{ type: 'run'; automationId: string; status: 'ok' | 'failed' | 'partial' }>;
}

export interface BrowserService {
  tabs(): Promise<BrowserTab[]>;
  open(url: string, agentControlled?: boolean): Promise<BrowserTab>;
  close(tabId: string): Promise<void>;
  navigate(tabId: string, url: string): Promise<BrowserTab>;
  read(tabId: string): Promise<{ title: string; text: string; links: number; words: number }>;
  act(tabId: string, instruction: string): Promise<PageAction[]>;
  history(): Promise<{ url: string; title: string; at: string }[]>;
  permissions(): Promise<SitePermission[]>;
  setPermission(origin: string, mode: SitePermission['mode']): Promise<void>;
}

export interface TerminalService {
  sessions(): Promise<TerminalSession[]>;
  create(name: string, shell: TerminalSession['shell'], cwd: string): Promise<TerminalSession>;
  close(id: string): Promise<void>;
  exec(sessionId: string, command: string, opts?: { agentDriven?: boolean }): Promise<ExecResult>;
  buffer(sessionId: string): Promise<TerminalLine[]>;
  completions(prefix: string): Promise<string[]>;
}

export interface SystemService {
  snapshot(): Promise<SystemSnapshot>;
  processes(): Promise<ProcessInfo[]>;
  kill(pid: number): Promise<void>;
  integrations(): Promise<Integration[]>;
  connect(id: string): Promise<Integration>;
  disconnect(id: string): Promise<void>;
  devices(): Promise<DeviceInfo[]>;
  setDefaultDevice(id: string): Promise<void>;
  openSettings(pane: 'general' | 'privacy' | 'network' | 'sound' | 'accessibility'): Promise<void>;
  launchAtLogin(on: boolean): Promise<void>;
  setKeepAwake(on: boolean): Promise<void>;
  onSample: Emitter<{ snapshot: SystemSnapshot }>;
}

export interface AnalyticsService {
  summary(days: number): Promise<AnalyticsSummary>;
  export(): Promise<{ format: 'csv' | 'json'; filename: string; bytes: number }>;
}

export interface ActivityService {
  list(filter?: { kinds?: ActivityKind[]; query?: string; limit?: number }): Promise<ActivityEvent[]>;
  export(format: 'csv' | 'json'): Promise<{ filename: string; bytes: number; rows: number }>;
  onEvent: Emitter<{ event: ActivityEvent }>;
}

export interface NotificationService {
  list(): Promise<Notice[]>;
  markRead(ids: string[]): Promise<void>;
  markAllRead(): Promise<void>;
  dismiss(id: string): Promise<void>;
  snooze(id: string, minutes: number): Promise<void>;
  approvals(): Promise<ApprovalRequest[]>;
  respond(requestId: string, approved: boolean): Promise<void>;
  onNotice: Emitter<{ notice: Notice }>;
}

export interface SettingsService {
  get(): Promise<AppConfig>;
  /** Synchronous read of the last-known config, for pre-paint theme bootstrapping. */
  current(): AppConfig;
  patch(patch: DeepPartial<AppConfig>): Promise<AppConfig>;
  reset(): Promise<AppConfig>;
  export(): Promise<string>;
  import(json: string): Promise<AppConfig>;
  onApplyTheme?: (config: AppConfig) => void;
}

export type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] };

export interface PermissionService {
  scopes(): Promise<PermissionScope[]>;
  grant(scopeId: string, tiers: AgentTier[]): Promise<void>;
  revoke(scopeId: string, tiers: AgentTier[]): Promise<void>;
  roleAccess(agentId: string, access: 'full' | 'ask' | 'restricted'): Promise<void>;
  secrets(): Promise<SecretHandle[]>;
  rotateSecret(id: string): Promise<SecretHandle>;
  audit(filter?: { query?: string; limit?: number }): Promise<AuditEntry[]>;
  simulateAttack(kind: 'prompt-injection' | 'data-exfil' | 'privilege-escalation'): Promise<{ blocked: boolean; detail: string }>;
  /** The three dials the whole product hangs on. */
  autonomy(): Promise<AutonomyPolicy>;
  setAutonomy(patch: Partial<AutonomyPolicy>): Promise<AutonomyPolicy>;
}

export interface AutonomyPolicy {
  /** 0 = asks for everything, 100 = acts and reports afterwards. */
  level: number;
  /** Human sentence describing the current stance. */
  stance: string;
  autoApproveLowRisk: boolean;
  autoApproveWithinWorkspace: boolean;
  requireApprovalAbove: 'low' | 'medium' | 'high' | 'critical';
  estateFrozen: boolean;
  spendCapUsd: number;
}

export interface MediaService {
  state(): Promise<MediaState>;
  play(): Promise<void>;
  pause(): Promise<void>;
  next(): Promise<void>;
  prev(): Promise<void>;
  seek(positionSec: number): Promise<void>;
  setVolume(v: number): Promise<void>;
  toggleMute(): Promise<void>;
  setShuffle(on: boolean): Promise<void>;
  cycleRepeat(): Promise<'off' | 'one' | 'all'>;
  setDevice(name: string): Promise<void>;
  enqueue(trackIds: string[]): Promise<void>;
  /** Indexed artifacts that are not tracks: transcripts, frames, model weights, datasets. */
  library(): Promise<MediaArtifact[]>;
  removeFromQueue(index: number): Promise<void>;
  toggleLibraryItem(id: string): Promise<void>;
  onState: Emitter<{ state: MediaState }>;
}

export interface MediaArtifact {
  id: string;
  name: string;
  kind: 'transcript' | 'frames' | 'model' | 'dataset' | 'render' | 'screenshot';
  sizeMb: number;
  status: 'ready' | 'processing' | 'queued' | 'failed';
  at: string;
  pages?: number;
  frames?: number;
  words?: number;
}

export interface VoiceService {
  profiles(): Promise<VoiceProfile[]>;
  config(): Promise<VoiceConfig>;
  configure(patch: Partial<VoiceConfig>): Promise<void>;
  listen(): Promise<void>;
  stop(): Promise<void>;
  speak(text: string): Promise<void>;
  stopSpeaking(): Promise<void>;
  onVoiceEvent: Emitter<VoiceEvent>;
  /** Availability of real OS speech; UI degrades to simulation when false. */
  capabilities(): Promise<{ stt: boolean; tts: boolean; wakeWord: boolean }>;
}

/** Everything the shell needs. Assembled by the runtime. */
export interface HerculesServices {
  core: CoreService;
  ai: AIService;
  agents: AgentService;
  departments: DepartmentService;
  tasks: TaskService;
  projects: ProjectService;
  memory: MemoryService;
  files: FileService;
  knowledge: KnowledgeService;
  automation: AutomationService;
  browser: BrowserService;
  terminal: TerminalService;
  system: SystemService;
  analytics: AnalyticsService;
  activity: ActivityService;
  notifications: NotificationService;
  settings: SettingsService;
  permissions: PermissionService;
  media: MediaService;
  voice: VoiceService;
  persona: Persona;
  transport: 'mock' | 'http' | 'ws' | 'ipc';
  dispose(): void;
}
