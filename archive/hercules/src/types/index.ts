export type HerculesState =
  | 'idle'
  | 'listening'
  | 'thinking'
  | 'speaking'
  | 'executing'
  | 'success'
  | 'warning'
  | 'error'
  | 'offline';

export type ModuleId =
  | 'home'
  | 'command'
  | 'chat'
  | 'agents'
  | 'departments'
  | 'tasks'
  | 'projects'
  | 'memory'
  | 'files'
  | 'knowledge'
  | 'automations'
  | 'calendar'
  | 'browser'
  | 'terminal'
  | 'system'
  | 'analytics'
  | 'activity'
  | 'notifications'
  | 'settings';

export interface ModuleConfig {
  id: ModuleId;
  label: string;
  icon: string;
  description: string;
  category: 'primary' | 'secondary' | 'settings';
  badge?: string | number;
  href: string;
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  preview: string;
  variables: ThemeVariables;
}

export interface ThemeVariables {
  '--h-bg': string;
  '--h-surface': string;
  '--h-surface-elevated': string;
  '--h-surface-overlay': string;
  '--h-primary': string;
  '--h-primary-muted': string;
  '--h-secondary': string;
  '--h-accent': string;
  '--h-glow': string;
  '--h-glow-subtle': string;
  '--h-text': string;
  '--h-text-muted': string;
  '--h-text-dim': string;
  '--h-border': string;
  '--h-border-subtle': string;
  '--h-success': string;
  '--h-warning': string;
  '--h-error': string;
  '--h-info': string;
  '--h-holo-core': string;
  '--h-holo-ring-1': string;
  '--h-holo-ring-2': string;
  '--h-holo-ring-3': string;
  '--h-holo-particle': string;
  '--h-holo-glow': string;
  '--h-mesh-gradient': string;
}

export interface HologramPreset {
  id: string;
  name: string;
  description: string;
  preview: string;
  config: HologramConfig;
}

export interface HologramConfig {
  coreGeometry: 'sphere' | 'torus' | 'icosahedron' | 'custom';
  rings: RingConfig[];
  particles: ParticleConfig;
  shaders: ShaderConfig;
  animations: AnimationConfig;
}

export interface RingConfig {
  count: number;
  radiusRange: [number, number];
  speedRange: [number, number];
  thicknessRange: [number, number];
  opacityRange: [number, number];
  colorStops: string[];
}

export interface ParticleConfig {
  count: number;
  sizeRange: [number, number];
  speedRange: [number, number];
  lifeRange: [number, number];
  colorPalette: string[];
  behavior: 'orbit' | 'drift' | 'pulse' | 'reactive';
}

export interface ShaderConfig {
  vertex: string;
  fragment: string;
  uniforms: Record<string, unknown>;
}

export interface AnimationConfig {
  idle: StateAnimation;
  listening: StateAnimation;
  thinking: StateAnimation;
  speaking: StateAnimation;
  executing: StateAnimation;
  success: StateAnimation;
  warning: StateAnimation;
  error: StateAnimation;
  offline: StateAnimation;
}

export interface StateAnimation {
  coreScale: [number, number];
  coreSpeed: number;
  ringSpeed: number;
  particleSpeed: number;
  glowIntensity: number;
  colorShift: string;
  specialEffects?: string[];
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  department: string;
  status: AgentStatus;
  progress: number;
  currentTask: string | null;
  parentId: string | null;
  childrenIds: string[];
  tools: string[];
  capabilities: string[];
  createdAt: Date;
  updatedAt: Date;
  metadata: Record<string, unknown>;
}

export type AgentStatus =
  | 'idle'
  | 'queued'
  | 'working'
  | 'paused'
  | 'completed'
  | 'failed'
  | 'offline';

export interface Department {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  status: DepartmentStatus;
  activeAgents: number;
  queuedWork: number;
  completedTasks: number;
  workload: number;
  agents: Agent[];
  createdAt: Date;
}

export type DepartmentStatus = 'active' | 'idle' | 'busy' | 'overloaded' | 'offline';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  progress: number;
  departmentId: string;
  agentId: string | null;
  parentId: string | null;
  subtasks: Subtask[];
  createdAt: Date;
  updatedAt: Date;
  startedAt: Date | null;
  completedAt: Date | null;
  metadata: Record<string, unknown>;
}

export type TaskStatus = 'queued' | 'running' | 'paused' | 'completed' | 'failed' | 'cancelled';

export interface Subtask {
  id: string;
  title: string;
  status: TaskStatus;
  progress: number;
  agentId: string | null;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  tasks: Task[];
  agents: Agent[];
  files: FileItem[];
  knowledge: KnowledgeItem[];
  workflows: Workflow[];
  milestones: Milestone[];
  activity: ActivityEvent[];
  createdAt: Date;
  updatedAt: Date;
  owner: string;
}

export type ProjectStatus = 'planning' | 'active' | 'on-hold' | 'completed' | 'archived';

export interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: Date | null;
  completed: boolean;
  completedAt: Date | null;
  tasks: string[];
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  status: WorkflowStatus;
  currentStep: number;
  createdAt: Date;
  updatedAt: Date;
}

export type WorkflowStatus = 'pending' | 'running' | 'paused' | 'completed' | 'failed';

export interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  agentId: string | null;
  departmentId: string | null;
  status: WorkflowStepStatus;
  progress: number;
  dependencies: string[];
  outputs: unknown[];
}

export type WorkflowStepStatus = 'pending' | 'running' | 'completed' | 'failed' | 'skipped';

export interface MemoryItem {
  id: string;
  type: MemoryType;
  category: string;
  title: string;
  content: string;
  source: string;
  tags: string[];
  timestamp: Date;
  metadata: Record<string, unknown>;
}

export type MemoryType = 'personal' | 'knowledge' | 'conversation';

export interface PersonalMemory extends MemoryItem {
  type: 'personal';
  subcategory: 'preferences' | 'profile' | 'goals' | 'habits';
}

export interface KnowledgeMemory extends MemoryItem {
  type: 'knowledge';
  subcategory: 'documents' | 'notes' | 'research' | 'projects';
  references: string[];
}

export interface ConversationMemory extends MemoryItem {
  type: 'conversation';
  subcategory: 'recent' | 'archived';
  participants: string[];
  summary: string;
}

export interface FileItem {
  id: string;
  name: string;
  path: string;
  type: FileType;
  size: number;
  mimeType: string;
  thumbnail: string | null;
  projectId: string | null;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  metadata: Record<string, unknown>;
}

export type FileType = 'document' | 'pdf' | 'image' | 'video' | 'code' | 'folder' | 'audio' | 'archive' | 'other';

export interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  source: string;
  type: KnowledgeType;
  collectionId: string | null;
  projectId: string | null;
  tags: string[];
  embedding: number[] | null;
  createdAt: Date;
  updatedAt: Date;
  metadata: Record<string, unknown>;
}

export type KnowledgeType = 'document' | 'note' | 'research' | 'source' | 'collection';

export interface Automation {
  id: string;
  name: string;
  description: string;
  trigger: AutomationTrigger;
  actions: AutomationAction[];
  schedule: AutomationSchedule | null;
  status: AutomationStatus;
  lastRun: Date | null;
  nextRun: Date | null;
  runCount: number;
  successCount: number;
  failureCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AutomationTrigger {
  type: 'schedule' | 'event' | 'webhook' | 'manual' | 'condition';
  config: Record<string, unknown>;
}

export interface AutomationAction {
  id: string;
  type: string;
  config: Record<string, unknown>;
  order: number;
}

export interface AutomationSchedule {
  cron: string;
  timezone: string;
  enabled: boolean;
}

export type AutomationStatus = 'active' | 'paused' | 'completed' | 'failed' | 'draft';

export interface BrowserSession {
  id: string;
  url: string;
  title: string;
  status: BrowserSessionStatus;
  agentId: string | null;
  preview: string | null;
  extractedData: Record<string, unknown>;
  history: BrowserHistoryEntry[];
  createdAt: Date;
  updatedAt: Date;
}

export type BrowserSessionStatus = 'active' | 'loading' | 'idle' | 'completed' | 'error';

export interface BrowserHistoryEntry {
  url: string;
  title: string;
  timestamp: Date;
  action: string;
}

export interface TerminalSession {
  id: string;
  name: string;
  shell: string;
  cwd: string;
  status: TerminalStatus;
  history: TerminalCommand[];
  processes: TerminalProcess[];
  createdAt: Date;
}

export type TerminalStatus = 'active' | 'idle' | 'busy' | 'exited';

export interface TerminalCommand {
  command: string;
  output: string;
  timestamp: Date;
  exitCode: number | null;
}

export interface TerminalProcess {
  pid: number;
  command: string;
  status: 'running' | 'stopped' | 'zombie';
  cpu: number;
  memory: number;
}

export interface SystemMetrics {
  cpu: CpuMetrics;
  memory: MemoryMetrics;
  storage: StorageMetrics;
  network: NetworkMetrics;
  battery: BatteryMetrics | null;
  gpu: GpuMetrics | null;
  processes: ProcessMetrics[];
  uptime: number;
  timestamp: Date;
}

export interface CpuMetrics {
  usage: number;
  cores: number;
  model: string;
  frequency: number;
  temperature: number | null;
  loadAverage: [number, number, number];
}

export interface MemoryMetrics {
  total: number;
  used: number;
  free: number;
  available: number;
  swapTotal: number;
  swapUsed: number;
}

export interface StorageMetrics {
  total: number;
  used: number;
  free: number;
  partitions: StoragePartition[];
}

export interface StoragePartition {
  device: string;
  mountPoint: string;
  total: number;
  used: number;
  free: number;
  filesystem: string;
}

export interface NetworkMetrics {
  downloadSpeed: number;
  uploadSpeed: number;
  totalReceived: number;
  totalSent: number;
  interfaces: NetworkInterface[];
}

export interface NetworkInterface {
  name: string;
  ip: string;
  mac: string;
  speed: number;
  status: 'up' | 'down';
  received: number;
  sent: number;
}

export interface BatteryMetrics {
  level: number;
  charging: boolean;
  timeRemaining: number | null;
  health: number;
  cycleCount: number;
}

export interface GpuMetrics {
  name: string;
  vendor: string;
  memoryTotal: number;
  memoryUsed: number;
  utilization: number;
  temperature: number;
  powerDraw: number;
}

export interface ProcessMetrics {
  pid: number;
  name: string;
  cpu: number;
  memory: number;
  status: string;
  user: string;
}

export interface MediaState {
  playing: boolean;
  source: MediaSource | null;
  title: string;
  artist: string;
  album: string;
  artwork: string | null;
  duration: number;
  currentTime: number;
  volume: number;
  muted: boolean;
  shuffle: boolean;
  repeat: 'off' | 'all' | 'one';
  queue: MediaQueueItem[];
}

export interface MediaSource {
  id: string;
  name: string;
  icon: string;
  type: 'spotify' | 'apple-music' | 'youtube' | 'system' | 'local' | 'other';
  connected: boolean;
}

export interface MediaQueueItem {
  id: string;
  title: string;
  artist: string;
  artwork: string | null;
  duration: number;
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  archived: boolean;
  action: NotificationAction | null;
  metadata: Record<string, unknown>;
}

export type NotificationType =
  | 'task-completion'
  | 'agent-update'
  | 'permission-request'
  | 'system-warning'
  | 'automation-event'
  | 'error'
  | 'info'
  | 'success';

export interface NotificationAction {
  label: string;
  action: string;
  payload: Record<string, unknown>;
}

export interface ActivityEvent {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  source: string;
  sourceType: 'system' | 'agent' | 'department' | 'task' | 'automation' | 'user';
  level: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  metadata: Record<string, unknown>;
}

export type ActivityType =
  | 'task-started'
  | 'task-completed'
  | 'task-failed'
  | 'agent-started'
  | 'agent-completed'
  | 'department-update'
  | 'automation-triggered'
  | 'automation-completed'
  | 'system-alert'
  | 'memory-update'
  | 'file-change'
  | 'workflow-step'
  | 'permission-change';

export interface Permission {
  id: string;
  name: string;
  description: string;
  category: PermissionCategory;
  status: PermissionStatus;
  required: boolean;
  lastRequested: Date | null;
  grantedAt: Date | null;
}

export type PermissionCategory =
  | 'microphone'
  | 'camera'
  | 'files'
  | 'notifications'
  | 'bluetooth'
  | 'wifi'
  | 'terminal'
  | 'accessibility'
  | 'applications'
  | 'system-info'
  | 'location'
  | 'contacts'
  | 'calendar';

export type PermissionStatus = 'granted' | 'denied' | 'not-configured' | 'requesting';

export interface VoiceState {
  state: 'idle' | 'listening' | 'processing' | 'speaking' | 'error';
  transcript: string;
  confidence: number;
  audioLevel: number;
  waveform: number[];
  isWakeWordActive: boolean;
  wakeWord: string;
  language: string;
  provider: string;
}

export interface CommandExecution {
  id: string;
  command: string;
  type: CommandType;
  status: CommandStatus;
  progress: number;
  currentStep: string | null;
  workflow: Workflow | null |
  result: unknown | null;
  error: string | null;
  startedAt: Date;
  completedAt: Date | null;
}

export type CommandType = 'query' | 'action' | 'workflow' | 'system' | 'navigation' | 'settings';

export type CommandStatus = 'pending' | 'parsing' | 'planning' | 'executing' | 'completed' | 'failed' | 'cancelled';

export interface CommandSuggestion {
  id: string;
  command: string;
  description: string;
  category: string;
  icon: string;
  shortcut?: string;
}

export interface SidebarState {
  collapsed: boolean;
  width: number;
}

export interface CommandPaletteState {
  open: boolean;
  query: string;
  selectedIndex: number;
  results: CommandSuggestion[];
}

export interface ModalState {
  open: boolean;
  type: string | null;
  data: unknown | null;
}

export interface ToastState {
  id: string;
  notification: Notification;
  visible: boolean;
}

export interface DemoModeState {
  enabled: boolean;
  speed: number;
  scenarios: string[];
}

export interface AppState {
  currentModule: ModuleId;
  herculesState: HerculesState;
  selectedHologram: string;
  selectedTheme: string;
  voiceState: VoiceState;
  sidebar: SidebarState;
  commandPalette: CommandPaletteState;
  modal: ModalState;
  toasts: ToastState[];
  demoMode: DemoModeState;
  systemMetrics: SystemMetrics | null;
  mediaState: MediaState;
  notifications: Notification[];
  activities: ActivityEvent[];
  permissions: Permission[];
  agents: Agent[];
  departments: Department[];
  tasks: Task[];
  projects: Project[];
  memories: MemoryItem[];
  files: FileItem[];
  knowledge: KnowledgeItem[];
  automations: Automation[];
  browserSessions: BrowserSession[];
  terminalSessions: TerminalSession[];
  commandHistory: CommandExecution[];
}

export interface ServiceResponse<T> {
  success: boolean;
  data: T | null;
  error: string | null;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface FilterOptions {
  search?: string;
  status?: string[];
  category?: string[];
  department?: string[];
  agent?: string[];
  dateFrom?: Date;
  dateTo?: Date;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}