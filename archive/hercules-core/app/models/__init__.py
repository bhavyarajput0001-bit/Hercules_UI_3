from typing import Literal
from pydantic import BaseModel, Field
from datetime import datetime
from enum import Enum
import uuid

# Core enums
class BootPhase(str, Enum):
    COLD = "cold"
    BOOTING = "booting"
    CALIBRATING = "calibrating"
    ONLINE = "online"
    DEGRADED = "degraded"

class CoreState(str, Enum):
    DORMANT = "dormant"
    IDLE = "idle"
    LISTENING = "listening"
    THINKING = "thinking"
    SPEAKING = "speaking"
    EXECUTING = "executing"
    ALERT = "alert"
    ERROR = "error"
    UPDATING = "updating"

class AgentTier(str, Enum):
    TIER_0 = "tier-0"
    TIER_1 = "tier-1"
    TIER_2 = "tier-2"
    TIER_3 = "tier-3"

class RiskLevel(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"

class TaskPriority(str, Enum):
    LOW = "low"
    NORMAL = "normal"
    HIGH = "high"
    CRITICAL = "critical"

class TaskStatus(str, Enum):
    PENDING = "pending"
    RUNNING = "running"
    REVIEW = "review"
    BLOCKED = "blocked"
    DONE = "done"
    CANCELLED = "cancelled"
    FAILED = "failed"

class ProjectStatus(str, Enum):
    PLANNING = "planning"
    ACTIVE = "active"
    ON_HOLD = "on-hold"
    DONE = "done"
    ARCHIVED = "archived"

class MemoryKind(str, Enum):
    FACT = "fact"
    DECISION = "decision"
    LEARNING = "learning"
    PREFERENCE = "preference"
    CONVERSATION = "conversation"
    ARTIFACT = "artifact"

class AutomationTriggerKind(str, Enum):
    SCHEDULE = "schedule"
    EVENT = "event"
    WEBHOOK = "webhook"
    MANUAL = "manual"

# Core models
class CoreVitals(BaseModel):
    state: CoreState
    energy: float
    cognitiveLoad: float
    memoryPressure: float
    integrity: int
    activeAgents: int
    queuedTasks: int
    uptimeMs: int
    focus: str

class MissionLog(BaseModel):
    id: str
    at: str
    level: Literal["info", "warn", "error", "debug"]
    message: str
    source: str
    traceId: str | None = None

class AgentRole(BaseModel):
    id: str
    name: str
    description: str
    color: str
    capabilities: list[str] = []
    defaultAutonomy: int = 50
    defaultRisk: RiskLevel = RiskLevel.LOW

class Agent(BaseModel):
    id: str
    name: str
    roleId: str
    departmentId: str | None = None
    parentId: str | None = None
    autonomy: int
    risk: RiskLevel
    status: Literal["active", "paused", "retired"] = "active"
    createdAt: str
    updatedAt: str
    tokensUsed: int = 0
    costUsd: float = 0.0
    lastActiveAt: str | None = None

class Department(BaseModel):
    id: str
    name: str
    code: str
    mission: str
    color: str
    budgetUsd: float = 0.0
    autonomy: int = 50
    createdAt: str
    updatedAt: str

class Task(BaseModel):
    id: str
    title: str
    objective: str
    priority: TaskPriority
    status: TaskStatus = TaskStatus.PENDING
    projectId: str | None = None
    departmentId: str | None = None
    assigneeAgentId: str | None = None
    estimateMin: int
    createdAt: str
    updatedAt: str
    startedAt: str | None = None
    completedAt: str | None = None
    traceId: str | None = None

class Project(BaseModel):
    id: str
    name: str
    codename: str
    goal: str
    due: str
    budgetUsd: float
    status: ProjectStatus = ProjectStatus.PLANNING
    createdAt: str
    updatedAt: str

class MemoryRecord(BaseModel):
    id: str
    kind: MemoryKind
    content: str
    tags: list[str] = []
    pinned: bool = False
    source: str | None = None
    weight: float = 1.0
    createdAt: str
    updatedAt: str

class MemorySearchHit(BaseModel):
    record: MemoryRecord
    score: float
    matchedSnippet: str

class WriteMemoryInput(BaseModel):
    kind: MemoryKind
    content: str
    tags: list[str] = []
    source: str | None = None
    weight: float = 1.0

class FileNode(BaseModel):
    path: str
    name: str
    kind: Literal["file", "folder"]
    sizeBytes: int | None = None
    mime: str | None = None
    modifiedAt: str
    createdAt: str
    children: list["FileNode"] = []

class FilePreview(BaseModel):
    path: str
    name: str
    kind: Literal["file", "folder"]
    sizeBytes: int
    mime: str
    content: str | None = None
    lines: int | None = None
    truncated: bool = False

class FileSearchHit(BaseModel):
    path: str
    name: str
    kind: Literal["file", "folder"]
    matchedLines: list[str]
    score: float

class FileAuditEntry(BaseModel):
    id: str
    at: str
    kind: Literal["read", "write", "delete", "execute", "upload"]
    path: str
    agent: str
    reason: str
    blocked: bool

class KnowledgeSource(BaseModel):
    id: str
    name: str
    origin: str
    kind: Literal["file", "url", "github", "notion", "confluence"]
    status: Literal["indexing", "ready", "failed"]
    chunks: int = 0
    sizeBytes: int = 0
    createdAt: str
    updatedAt: str
    lastIndexedAt: str | None = None

class KnowledgeStats(BaseModel):
    coverage: float
    hitRate: float
    avgLatencyMs: float
    lastBuild: str
    sizeSeries: list[int]
    terms: int

class KnowledgeChunk(BaseModel):
    id: str
    sourceId: str
    text: str
    embedding: list[float] | None = None
    metadata: dict = {}

class KnowledgeSearchHit(BaseModel):
    chunk: KnowledgeChunk
    score: float
    sourceName: str

class Automation(BaseModel):
    id: str
    name: str
    description: str
    trigger: dict
    agentId: str
    risk: RiskLevel
    enabled: bool = True
    requiresApproval: bool = False
    createdAt: str
    updatedAt: str
    lastRunAt: str | None = None
    lastRunStatus: Literal["ok", "failed", "partial"] | None = None

class AutomationRun(BaseModel):
    id: str
    automationId: str
    status: Literal["ok", "failed", "partial"]
    startedAt: str
    completedAt: str | None = None
    log: list[str] = []
    artifacts: list[str] = []

class WorkflowGraph(BaseModel):
    nodes: list[dict]
    edges: list[dict]

class BrowserTab(BaseModel):
    id: str
    url: str
    title: str
    agentControlled: bool = False
    createdAt: str

class SitePermission(BaseModel):
    origin: str
    mode: Literal["allow", "block", "ask"]

class PageAction(BaseModel):
    id: str
    type: Literal["click", "type", "scroll", "wait", "navigate"]
    selector: str | None = None
    value: str | None = None
    result: str

class TerminalSession(BaseModel):
    id: str
    name: str
    shell: Literal["bash", "zsh", "fish", "powershell"]
    cwd: str
    createdAt: str
    status: Literal["running", "exited"] = "running"

class ExecResult(BaseModel):
    exitCode: int
    stdout: str
    stderr: str
    durationMs: int

class TerminalLine(BaseModel):
    id: str
    sessionId: str
    text: str
    at: str
    kind: Literal["stdout", "stderr", "system"]

class SystemSnapshot(BaseModel):
    cpuPercent: float
    memoryPercent: float
    diskPercent: float
    networkRxBytes: int
    networkTxBytes: int
    processCount: int
    loadAverage: list[float]
    uptimeSec: int

class ProcessInfo(BaseModel):
    pid: int
    name: str
    cpuPercent: float
    memoryPercent: float
    status: str
    cwd: str | None = None

class Integration(BaseModel):
    id: str
    name: str
    kind: Literal["slack", "discord", "github", "gitlab", "linear", "notion", "jira", "webhook"]
    status: Literal["connected", "disconnected", "error"]
    config: dict = {}
    lastSyncAt: str | None = None

class DeviceInfo(BaseModel):
    id: str
    name: str
    kind: Literal["mac", "iphone", "ipad", "apple-watch", "android", "linux", "windows"]
    status: Literal["online", "offline"]
    lastSeenAt: str
    isDefault: bool = False

class ModelInfo(BaseModel):
    id: str
    name: str
    provider: str
    capabilities: list[str] = []
    contextWindow: int
    costPer1kInput: float = 0.0
    costPer1kOutput: float = 0.0
    isFree: bool = False

class ChatMessage(BaseModel):
    id: str
    conversationId: str
    role: Literal["user", "assistant", "system", "tool"]
    content: str
    at: str
    model: str | None = None
    tokens: int | None = None
    blocks: list[dict] = []

class SubmitPromptInput(BaseModel):
    text: str
    conversationId: str
    channel: Literal["ui", "voice", "notification-reply", "automation"] = "ui"
    routeTo: dict | None = None
    attachments: list[dict] = []

class StreamChunk(BaseModel):
    conversationId: str
    messageId: str
    delta: str | None = None
    block: dict | None = None
    done: bool = False
    coreState: dict | None = None

class ActivityEvent(BaseModel):
    id: str
    kind: str
    title: str
    description: str
    agentId: str | None = None
    taskId: str | None = None
    traceId: str | None = None
    at: str
    metadata: dict = {}

class ActivityKind(str, Enum):
    TASK_CREATED = "task.created"
    TASK_UPDATED = "task.updated"
    TASK_COMPLETED = "task.completed"
    AGENT_SPAWNED = "agent.spawned"
    AGENT_STEERED = "agent.steered"
    AUTOMATION_RUN = "automation.run"
    FILE_WRITE = "file.write"
    MEMORY_WRITE = "memory.write"
    APPROVAL_REQUESTED = "approval.requested"
    APPROVAL_GRANTED = "approval.granted"
    APPROVAL_DENIED = "approval.denied"

class Notice(BaseModel):
    id: str
    kind: Literal["info", "warn", "error", "success"]
    title: str
    body: str
    read: bool = False
    at: str
    action: dict | None = None
    relatedId: str | None = None

class ApprovalRequest(BaseModel):
    id: str
    kind: Literal["agent-action", "file-write", "permission-grant", "secret-rotate", "policy-change"]
    title: str
    description: str
    agentId: str | None = None
    risk: RiskLevel
    context: dict = {}
    createdAt: str
    expiresAt: str
    status: Literal["pending", "approved", "denied"] = "pending"

class AnalyticsSummary(BaseModel):
    totalTokens: int
    totalCostUsd: float
    activeAgents: int
    completedTasks: int
    failedTasks: int
    avgTaskDurationMin: float
    topModels: list[dict]
    costByProvider: list[dict]
    tokensByDay: list[dict]

class AppConfig(BaseModel):
    ai: dict = {}
    core: dict = {}
    privacy: dict = {}
    voice: dict = {}
    theme: str = "obsidian-night"
    density: str = "comfortable"
    fontScale: float = 1.0

class PermissionScope(BaseModel):
    id: str
    name: str
    description: str
    tierRequired: AgentTier
    risk: RiskLevel

class SecretHandle(BaseModel):
    id: str
    label: str
    masked: str
    lastUsed: str | None = None
    rotatedAt: str | None = None

class AuditEntry(BaseModel):
    id: str
    at: str
    actor: str
    action: str
    target: str
    detail: str
    blocked: bool = False

class AutonomyPolicy(BaseModel):
    level: int = 50
    stance: str = "balanced"
    autoApproveLowRisk: bool = True
    autoApproveWithinWorkspace: bool = True
    requireApprovalAbove: Literal["low", "medium", "high", "critical"] = "medium"
    estateFrozen: bool = False
    spendCapUsd: float = 100.0

class MediaState(BaseModel):
    playing: bool = False
    currentTrack: dict | None = None
    volume: float = 0.8
    muted: bool = False
    shuffle: bool = False
    repeat: Literal["off", "one", "all"] = "off"
    device: str | None = None
    queue: list[dict] = []

class MediaArtifact(BaseModel):
    id: str
    name: str
    kind: Literal["transcript", "frames", "model", "dataset", "render", "screenshot"]
    sizeMb: float
    status: Literal["ready", "processing", "queued", "failed"]
    at: str
    pages: int | None = None
    frames: int | None = None
    words: int | None = None

class Artifact(BaseModel):
    id: str
    taskId: str
    name: str
    kind: Literal["code", "document", "image", "data", "log"]
    sizeBytes: int
    mime: str
    createdAt: str
    url: str | None = None


class VoiceConfig(BaseModel):
    sttEnabled: bool = True
    ttsEnabled: bool = True
    wakeWordEnabled: bool = False
    voice: str = "alloy"
    speed: float = 1.0

class VoiceProfile(BaseModel):
    id: str
    name: str
    voice: str
    language: str = "en"
    speed: float = 1.0

class VoiceEvent(BaseModel):
    type: Literal["listening", "speaking", "stopped", "error"]
    text: str | None = None
    at: str

class Persona(BaseModel):
    name: str
    callsign: str
    pronouns: str
    preset: str
    initiative: float
    verbosity: float
    wit: float
    caution: float
    formality: Literal["terse", "conversational", "formal"]
    avatarHue: int

class CommandIntent(BaseModel):
    verb: str
    targetKind: Literal["screen", "task", "agent", "automation", "file", "memory", "media", "system"]
    targetLabel: str
    confidence: float
    args: dict[str, str | int] = {}

# Request/Response models for API
class AgentSpawnInput(BaseModel):
    name: str
    roleId: str
    departmentId: str | None = None
    autonomy: int = 50
    risk: RiskLevel = RiskLevel.LOW
    parentId: str | None = None

class TaskCreateInput(BaseModel):
    title: str
    objective: str
    priority: TaskPriority = TaskPriority.NORMAL
    projectId: str | None = None
    departmentId: str | None = None
    assigneeAgentId: str | None = None
    estimateMin: int = 30

class TaskUpdateInput(BaseModel):
    status: TaskStatus | None = None
    priority: TaskPriority | None = None
    assigneeAgentId: str | None = None
    projectId: str | None = None

class ProjectCreateInput(BaseModel):
    name: str
    codename: str
    goal: str
    due: str
    budgetUsd: float

class DepartmentCreateInput(BaseModel):
    name: str
    code: str
    mission: str
    color: str

class AutomationCreateInput(BaseModel):
    name: str
    description: str
    triggerKind: AutomationTriggerKind
    expr: str
    agentId: str
    risk: RiskLevel

class KnowledgeSourceInput(BaseModel):
    name: str
    origin: str
    kind: Literal["file", "url", "github", "notion", "confluence"]

class TerminalCreateInput(BaseModel):
    name: str
    shell: Literal["bash", "zsh", "fish", "powershell"] = "bash"
    cwd: str = "/"

class TerminalExecInput(BaseModel):
    command: str
    agentDriven: bool = False

class BrowserOpenInput(BaseModel):
    url: str
    agentControlled: bool = False

class BrowserNavigateInput(BaseModel):
    url: str

class BrowserActInput(BaseModel):
    instruction: str

class BrowserPermissionInput(BaseModel):
    mode: Literal["allow", "block", "ask"]

class SettingsPatchInput(BaseModel):
    ai: dict | None = None
    core: dict | None = None
    privacy: dict | None = None
    voice: dict | None = None

class VoiceConfigPatch(BaseModel):
    sttEnabled: bool | None = None
    ttsEnabled: bool | None = None
    wakeWordEnabled: bool | None = None
    voice: str | None = None
    speed: float | None = None

class PermissionGrantInput(BaseModel):
    scopeId: str
    tiers: list[AgentTier]

class AutonomyPatchInput(BaseModel):
    level: int | None = None
    stance: str | None = None
    autoApproveLowRisk: bool | None = None
    autoApproveWithinWorkspace: bool | None = None
    requireApprovalAbove: Literal["low", "medium", "high", "critical"] | None = None
    estateFrozen: bool | None = None
    spendCapUsd: float | None = None

FileNode.model_rebuild()