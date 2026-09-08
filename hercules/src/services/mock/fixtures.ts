/**
 * HERCULES · demo corpus
 * ---------------------------------------------------------------------------
 * One coherent fictional world: a solo operator ("you") running a company on
 * top of an AI operating system. Everything the UI shows lives here so the
 * mock services behave like a real, populated backend.
 */
import type {
  ActivityEvent,
  ActivityKind,
  Agent,
  AgentRole,
  AgentTier,
  ApprovalRequest,
  AuditEntry,
  Automation,
  BrowserTab,
  ChatMessage,
  Department,
  DeviceInfo,
  FileNode,
  Integration,
  KnowledgeChunk,
  KnowledgeSource,
  MediaTrack,
  MemoryRecord,
  MissionLog,
  ModelInfo,
  Notice,
  PageAction,
  PermissionScope,
  ProcessInfo,
  Project,
  RiskLevel,
  SecretHandle,
  SitePermission,
  Task,
  TerminalSession,
  VoiceProfile,
  WorkflowGraph,
} from '@/types/domain';
import { DAY, HOUR, MIN, ago, ahead, bytes, chance, pick, rand, randInt, series, uid } from './helpers';

/* ── Departments ─────────────────────────────────────────────────────────── */

export const departments: Department[] = [
  {
    id: 'dep-ops',
    name: 'Operations',
    code: 'OPS',
    mission: 'Keep every moving part moving: scheduling, logistics, vendors, finance hygiene.',
    leadAgentId: 'agt-chief-of-staff',
    agentIds: ['agt-chief-of-staff', 'agt-scheduler', 'agt-vendor', 'agt-ledger', 'agt-sub-reminders', 'agt-lab-intake'],
    status: 'active',
    throughput: 82,
    backlogPressure: 34,
    budgetUsd: 900,
    spentUsd: 412,
    tools: ['calendar', 'email', 'sheets', 'bank-feed', 'slack'],
    kpis: [
      { label: 'SLA met', value: '96%', trend: 4 },
      { label: 'Reactive pings', value: '12', trend: -18 },
      { label: 'Manual ops / wk', value: '1.4h', trend: -61 },
    ],
    color: '#46e8ff',
    icon: 'ops',
  },
  {
    id: 'dep-eng',
    name: 'Engineering',
    code: 'ENG',
    mission: 'Build, test, ship and maintain software across every repo in the estate.',
    leadAgentId: 'agt-software-engineer',
    agentIds: [
      'agt-software-engineer',
      'agt-frontend',
      'agt-backend',
      'agt-test',
      'agt-reviewer',
      'agt-devops',
      'agt-sub-codemod',
      'agt-sub-flaky',
      'agt-lab-executor',
    ],
    status: 'active',
    throughput: 91,
    backlogPressure: 57,
    budgetUsd: 2400,
    spentUsd: 1184,
    tools: ['git', 'github', 'ci', 'docker', 'terminal', 'browser'],
    kpis: [
      { label: 'Deploy freq', value: '6/wk', trend: 22 },
      { label: 'Lead time', value: '3.2h', trend: -41 },
      { label: 'Change fail %', value: '3.1', trend: -9 },
    ],
    color: '#7d8cff',
    icon: 'eng',
  },
  {
    id: 'dep-research',
    name: 'Research',
    code: 'RSR',
    mission: 'Turn the outside world into decisions: markets, competitors, papers, filings.',
    leadAgentId: 'agt-deep-research',
    agentIds: ['agt-deep-research', 'agt-sources', 'agt-claims', 'agt-summarizer', 'agt-sub-scrape', 'agt-sub-parse'],
    status: 'active',
    throughput: 74,
    backlogPressure: 44,
    budgetUsd: 700,
    spentUsd: 288,
    tools: ['browser', 'search', 'pdf', 'arxiv', 'rss'],
    kpis: [
      { label: 'Briefs shipped', value: '31', trend: 12 },
      { label: 'Median depth', value: '4.6 src', trend: 30 },
      { label: 'Correction rate', value: '1.8%', trend: -25 },
    ],
    color: '#5ff0c0',
    icon: 'research',
  },
  {
    id: 'dep-creative',
    name: 'Creative',
    code: 'CRE',
    mission: 'Voice, story, visuals, video — everything the public eye touches.',
    leadAgentId: 'agt-copywriter',
    agentIds: ['agt-copywriter', 'agt-brand', 'agt-image', 'agt-video', 'agt-sub-storyboard', 'agt-lab-render'],
    status: 'active',
    throughput: 68,
    backlogPressure: 71,
    budgetUsd: 800,
    spentUsd: 531,
    tools: ['image-gen', 'video-gen', 'figma', 'ffmpeg', 'asset-store'],
    kpis: [
      { label: 'Assets / wk', value: '46', trend: 18 },
      { label: 'First-pass accept', value: '63%', trend: 9 },
      { label: 'Render cost', value: '$188', trend: 4 },
    ],
    color: '#ff7ad9',
    icon: 'creative',
  },
  {
    id: 'dep-knowledge',
    name: 'Knowledge',
    code: 'KNW',
    mission: 'Index, deduplicate and keep the estate’s memory trustworthy and searchable.',
    leadAgentId: 'agt-research-assistant',
    agentIds: ['agt-research-assistant', 'agt-ingest', 'agt-index', 'agt-sub-dedupe'],
    status: 'active',
    throughput: 88,
    backlogPressure: 21,
    budgetUsd: 400,
    spentUsd: 96,
    tools: ['vector-store', 'filesystem', 'ocr', 'embeddings'],
    kpis: [
      { label: 'Indexed docs', value: '18,402', trend: 3 },
      { label: 'Stale ratio', value: '2.4%', trend: -34 },
      { label: 'Recall @8', value: '0.91', trend: 5 },
    ],
    color: '#ffc861',
    icon: 'knowledge',
  },
  {
    id: 'dep-comms',
    name: 'Communication',
    code: 'COM',
    mission: 'Anything that leaves the building — email, chat, drafts, replies, tone control.',
    leadAgentId: 'agt-email-assistant',
    agentIds: ['agt-email-assistant', 'agt-chat-triage', 'agt-drafter', 'agt-sub-threading'],
    status: 'degraded',
    throughput: 61,
    backlogPressure: 78,
    budgetUsd: 300,
    spentUsd: 141,
    tools: ['gmail', 'slack', 'whatsapp', 'calendar'],
    kpis: [
      { label: 'Drafts sent', value: '84%', trend: 11 },
      { label: 'Avg response', value: '9m', trend: -52 },
      { label: 'Escalations', value: '3', trend: 2 },
    ],
    color: '#ff9d6b',
    icon: 'comms',
  },
  {
    id: 'dep-security',
    name: 'Security & Compliance',
    code: 'SEC',
    mission: 'Watch the walls: permissions, audit, dependency risk, data boundaries.',
    leadAgentId: 'agt-auditor',
    agentIds: ['agt-auditor', 'agt-monitor', 'agt-red-team', 'agt-sub-scan'],
    status: 'active',
    throughput: 79,
    backlogPressure: 26,
    budgetUsd: 500,
    spentUsd: 122,
    tools: ['sast', 'audit-log', 'vault', 'firewall'],
    kpis: [
      { label: 'Blocks / day', value: '7', trend: 14 },
      { label: 'Open findings', value: '4', trend: -20 },
      { label: 'Audit coverage', value: '100%', trend: 0 },
    ],
    color: '#ff5f6d',
    icon: 'security',
  },
  {
    id: 'dep-lab',
    name: 'Lab',
    code: 'LAB',
    mission: 'Experimental capability sandbox — nothing leaves here without a review.',
    leadAgentId: 'agt-lab-scout',
    agentIds: ['agt-lab-scout', 'agt-lab-executor', 'agt-lab-intake', 'agt-lab-render'],
    status: 'standing-by',
    throughput: 43,
    backlogPressure: 12,
    budgetUsd: 350,
    spentUsd: 78,
    tools: ['sandbox', 'browser', 'terminal', 'notebook'],
    kpis: [
      { label: 'Experiments', value: '9', trend: 40 },
      { label: 'Promoted', value: '2', trend: 0 },
      { label: 'Sandbox resets', value: '31', trend: 8 },
    ],
    color: '#9df99b',
    icon: 'lab',
  },
];

/* ── Agent roles ─────────────────────────────────────────────────────────── */

export const roles: AgentRole[] = [
  { id: 'orchestrator', name: 'Orchestrator', category: 'Command', description: 'Translates intent into plans, routes work to departments, owns end-to-end delivery.', tools: ['planner', 'router', 'registry'], defaultModelTier: 'frontier', autonomy: 0.8, access: 'full' },
  { id: 'chief-of-staff', name: 'Chief of Staff', category: 'Command', description: 'Owns your day, your inbox triage policy and the priority stack.', tools: ['calendar', 'email', 'tasks'], defaultModelTier: 'balanced', autonomy: 0.7, access: 'ask' },
  { id: 'researcher', name: 'Deep Researcher', category: 'Research', description: 'Multi-hop investigation with source discipline and claim tracking.', tools: ['search', 'browser', 'pdf'], defaultModelTier: 'frontier', autonomy: 0.6, access: 'full' },
  { id: 'software-engineer', name: 'Software Engineer', category: 'Engineering', description: 'Plans, writes and verifies code across the estate’s repositories.', tools: ['filesystem', 'terminal', 'git', 'ci'], defaultModelTier: 'frontier', autonomy: 0.5, access: 'ask' },
  { id: 'frontend', name: 'Frontend Engineer', category: 'Engineering', description: 'Interfaces, motion, accessibility, design-system fidelity.', tools: ['filesystem', 'browser', 'terminal'], defaultModelTier: 'balanced', autonomy: 0.55, access: 'ask' },
  { id: 'backend', name: 'Backend Engineer', category: 'Engineering', description: 'Services, data models, migrations, API contracts.', tools: ['filesystem', 'terminal', 'db'], defaultModelTier: 'balanced', autonomy: 0.5, access: 'ask' },
  { id: 'test-engineer', name: 'Test Engineer', category: 'Quality', description: 'Adversarial verification. Writes the failing test first.', tools: ['terminal', 'ci', 'browser'], defaultModelTier: 'fast', autonomy: 0.7, access: 'full' },
  { id: 'reviewer', name: 'Code Reviewer', category: 'Quality', description: 'Reads diffs for risk, smell and regression surface.', tools: ['git', 'sast'], defaultModelTier: 'balanced', autonomy: 0.85, access: 'full' },
  { id: 'devops', name: 'Infrastructure', category: 'Engineering', description: 'Environments, deploys, observability, cost control.', tools: ['terminal', 'docker', 'cloud'], defaultModelTier: 'balanced', autonomy: 0.35, access: 'ask' },
  { id: 'analyst', name: 'Data Analyst', category: 'Intelligence', description: 'Turns tables into decisions with uncertainty stated.', tools: ['sql', 'sheets', 'notebook'], defaultModelTier: 'balanced', autonomy: 0.65, access: 'full' },
  { id: 'summarizer', name: 'Synthesizer', category: 'Research', description: 'Long-input compression that never invents.', tools: ['documents'], defaultModelTier: 'fast', autonomy: 0.8, access: 'full' },
  { id: 'writer', name: 'Copywriter', category: 'Creative', description: 'Brand-true language for landing, launch and lifecycle.', tools: ['documents', 'brand-kit'], defaultModelTier: 'balanced', autonomy: 0.7, access: 'full' },
  { id: 'image', name: 'Image Artist', category: 'Creative', description: 'Key art, storyboards, style-consistent asset generation.', tools: ['image-gen', 'asset-store'], defaultModelTier: 'specialist', autonomy: 0.75, access: 'full' },
  { id: 'video', name: 'Video Editor', category: 'Creative', description: 'Cuts, captions, renders and variants for every aspect ratio.', tools: ['ffmpeg', 'video-gen', 'asset-store'], defaultModelTier: 'specialist', autonomy: 0.5, access: 'ask' },
  { id: 'audio', name: 'Audio Engineer', category: 'Creative', description: 'Voice mastering, sound design, mixdown.', tools: ['audio-gen', 'ffmpeg'], defaultModelTier: 'specialist', autonomy: 0.6, access: 'full' },
  { id: 'email-assistant', name: 'Email Assistant', category: 'Communication', description: 'Triages, drafts and follows up under explicit policy.', tools: ['gmail', 'calendar'], defaultModelTier: 'fast', autonomy: 0.45, access: 'ask' },
  { id: 'chat-triage', name: 'Chat Triage', category: 'Communication', description: 'Reads channels, extracts action items, routes noise.', tools: ['slack'], defaultModelTier: 'fast', autonomy: 0.7, access: 'full' },
  { id: 'scheduler', name: 'Scheduler', category: 'Operations', description: 'Protects focus blocks, moves meetings, defends the calendar.', tools: ['calendar'], defaultModelTier: 'fast', autonomy: 0.6, access: 'ask' },
  { id: 'browser-automation', name: 'Browser Operator', category: 'Operations', description: 'Drives real web UIs when no API exists.', tools: ['browser'], defaultModelTier: 'balanced', autonomy: 0.35, access: 'ask' },
  { id: 'doc', name: 'Document Processor', category: 'Operations', description: 'PDF, OCR, tables, extraction into structured records.', tools: ['ocr', 'filesystem'], defaultModelTier: 'fast', autonomy: 0.8, access: 'full' },
  { id: 'knowledge', name: 'Knowledge Engineer', category: 'Intelligence', description: 'Chunking, embedding hygiene, retrieval quality.', tools: ['vector-store', 'filesystem'], defaultModelTier: 'balanced', autonomy: 0.7, access: 'full' },
  { id: 'auditor', name: 'Compliance Auditor', category: 'Security', description: 'Reads every action against policy and files the paperwork.', tools: ['audit-log', 'sast'], defaultModelTier: 'balanced', autonomy: 0.9, access: 'full' },
  { id: 'monitor', name: 'Security Monitor', category: 'Security', description: 'Watches for exfiltration, injection and privilege drift.', tools: ['firewall', 'vault'], defaultModelTier: 'fast', autonomy: 0.85, access: 'full' },
  { id: 'trainer', name: 'Agent Trainer', category: 'Command', description: 'Turns your feedback into evals, prompts and role updates.', tools: ['evals', 'registry'], defaultModelTier: 'balanced', autonomy: 0.5, access: 'ask' },
  { id: 'executor', name: 'Labor Executor', category: 'Execution', description: 'Dumb, fast, parallel. Does the boring thing 400 times correctly.', tools: ['terminal', 'scripts'], defaultModelTier: 'fast', autonomy: 0.9, access: 'restricted' },
];

/* ── Models ──────────────────────────────────────────────────────────────── */

export const models: ModelInfo[] = [
  { id: 'mdl-nova-x1', name: 'Nova X1', family: 'nova', provider: 'cloud', providerLabel: 'Nova Labs', contextWindow: 400_000, capabilities: ['chat', 'reasoning', 'vision', 'tools', 'structured', 'code'], quality: 98, latencyMs: 620, costPer1kIn: 0.009, costPer1kOut: 0.045, status: 'ready', tier: 'frontier' },
  { id: 'mdl-nova-lite', name: 'Nova Lite', family: 'nova', provider: 'cloud', providerLabel: 'Nova Labs', contextWindow: 200_000, capabilities: ['chat', 'tools', 'structured', 'code'], quality: 86, latencyMs: 210, costPer1kIn: 0.0008, costPer1kOut: 0.0032, status: 'ready', tier: 'fast' },
  { id: 'mdl-quill-70b', name: 'Quill 70B', family: 'quill', provider: 'local', providerLabel: 'On-device (host)', contextWindow: 128_000, capabilities: ['chat', 'reasoning', 'tools', 'structured', 'embedding'], quality: 84, latencyMs: 380, costPer1kIn: 0, costPer1kOut: 0, status: 'ready', tier: 'balanced' },
  { id: 'mdl-quill-8b', name: 'Quill 8B', family: 'quill', provider: 'local', providerLabel: 'On-device (host)', contextWindow: 32_000, capabilities: ['chat', 'tools', 'embedding'], quality: 68, latencyMs: 70, costPer1kIn: 0, costPer1kOut: 0, status: 'ready', tier: 'fast' },
  { id: 'mdl-iris-v', name: 'Iris Vision', family: 'iris', provider: 'cloud', providerLabel: 'Iris', contextWindow: 64_000, capabilities: ['vision', 'chat', 'structured'], quality: 92, latencyMs: 540, costPer1kIn: 0.003, costPer1kOut: 0.012, status: 'slow', tier: 'specialist' },
  { id: 'mdl-pigment', name: 'Pigment 3', family: 'pigment', provider: 'cloud', providerLabel: 'Chroma', contextWindow: 8_000, capabilities: ['image'], quality: 94, latencyMs: 4200, costPer1kIn: 0.02, costPer1kOut: 0.16, status: 'ready', tier: 'specialist' },
  { id: 'mdl-motion', name: 'Motion Studio', family: 'chroma', provider: 'cloud', providerLabel: 'Chroma', contextWindow: 4_000, capabilities: ['video', 'image'], quality: 88, latencyMs: 26_000, costPer1kIn: 0.04, costPer1kOut: 0.9, status: 'rate-limited', tier: 'specialist' },
  { id: 'mdl-echo', name: 'Echo TTS', family: 'echo', provider: 'cloud', providerLabel: 'Vocalis', contextWindow: 4_000, capabilities: ['audio'], quality: 91, latencyMs: 160, costPer1kIn: 0.015, costPer1kOut: 0, status: 'ready', tier: 'specialist' },
  { id: 'mdl-ear', name: 'Ear STT', family: 'echo', provider: 'local', providerLabel: 'On-device (whisper-host)', contextWindow: 30_000, capabilities: ['audio'], quality: 89, latencyMs: 240, costPer1kIn: 0, costPer1kOut: 0, status: 'ready', tier: 'specialist' },
  { id: 'mdl-vector', name: 'Vector Embed', family: 'quill', provider: 'local', providerLabel: 'On-device (host)', contextWindow: 8_000, capabilities: ['embedding'], quality: 90, latencyMs: 40, costPer1kIn: 0, costPer1kOut: 0, status: 'ready', tier: 'specialist' },
];

/* ── Agents ──────────────────────────────────────────────────────────────── */

type AgentSeed = [
  id: string,
  name: string,
  roleId: string,
  tier: AgentTier,
  dep: string | null,
  parent: string | null,
  status: Agent['status'],
  task: string,
  modelId: string,
  progress: [number, number],
];

const agentSeeds: AgentSeed[] = [
  ['agt-hercules', 'HERCULES', 'orchestrator', 'ceo', null, null, 'working', 'Coordinating 14 active agents · 6 objectives in flight', 'mdl-nova-x1', [132, 180]],
  ['agt-chief-of-staff', 'Chief of Staff', 'chief-of-staff', 'orchestrator', 'dep-ops', 'agt-hercules', 'working', 'Rebuilding Thursday around the investor call', 'mdl-nova-x1', [6, 9]],

  ['agt-sentinel', 'Orchestrator Prime', 'orchestrator', 'orchestrator', 'dep-eng', 'agt-hercules', 'working', 'Sequencing TITAN release train', 'mdl-nova-x1', [18, 24]],
  ['agt-research-assistant', 'Knowledge Warden', 'knowledge', 'department', 'dep-knowledge', 'agt-hercules', 'idle', 'Standing by · index healthy', 'mdl-quill-70b', [0, 0]],

  ['agt-deep-research', 'Deep Research Lead', 'researcher', 'department', 'dep-research', 'agt-chief-of-staff', 'working', 'Agent-OS competitive teardown, round 3', 'mdl-nova-x1', [22, 30]],
  ['agt-software-engineer', 'Engineering Lead', 'software-engineer', 'department', 'dep-eng', 'agt-sentinel', 'working', 'Core API contract freeze for v0.9', 'mdl-nova-x1', [11, 26]],
  ['agt-copywriter', 'Brand Voice', 'writer', 'department', 'dep-creative', 'agt-chief-of-staff', 'thinking', 'Launch narrative — three directions', 'mdl-nova-lite', [3, 7]],
  ['agt-data-analyst', 'Analyst', 'analyst', 'department', 'dep-research', 'agt-deep-research', 'idle', 'Awaiting pricing table export', 'mdl-quill-70b', [0, 0]],
  ['agt-email-assistant', 'Comms Gatekeeper', 'email-assistant', 'department', 'dep-comms', 'agt-chief-of-staff', 'blocked', 'Blocked: send policy needs your ruling', 'mdl-nova-lite', [4, 6]],
  ['agt-scheduler', 'Calendar Warden', 'scheduler', 'department', 'dep-ops', 'agt-chief-of-staff', 'working', 'Rebalancing 11 conflicts next week', 'mdl-nova-lite', [7, 12]],
  ['agt-devops', 'Infrastructure', 'devops', 'department', 'dep-eng', 'agt-software-engineer', 'working', 'Cutting inference spend · GPU right-sizing', 'mdl-quill-70b', [9, 14]],
  ['agt-test-engineer', 'Verifier', 'test-engineer', 'department', 'dep-eng', 'agt-sentinel', 'working', 'Repro suite for audio pipeline (42 cases)', 'mdl-nova-lite', [30, 42]],
  ['agt-auditor', 'Compliance Auditor', 'auditor', 'department', 'dep-security', 'agt-hercules', 'working', 'Monthly access review', 'mdl-quill-70b', [12, 20]],
  ['agt-image-artist', 'Key Art', 'image', 'department', 'dep-creative', 'agt-copywriter', 'awaiting-approval', 'Awaiting approval: 6 hero candidates to publish', 'mdl-pigment', [6, 6]],
  ['agt-video-editor', 'Video Editor', 'video', 'department', 'dep-creative', 'agt-copywriter', 'error', 'Failed: render node out of VRAM (retry queued)', 'mdl-motion', [2, 5]],
  ['agt-browser-operator', 'Browser Operator', 'browser-automation', 'department', 'dep-ops', 'agt-chief-of-staff', 'idle', 'Ready · 2 profiles sandboxed', 'mdl-nova-lite', [0, 0]],
  ['agt-doc-processor', 'Document Processor', 'doc', 'department', 'dep-knowledge', 'agt-research-assistant', 'working', 'OCR on 214 scanned contracts', 'mdl-iris-v', [118, 214]],
  ['agt-trainer', 'Agent Trainer', 'trainer', 'department', 'dep-eng', 'agt-sentinel', 'idle', 'Eval set “dispatch” at 94% pass', 'mdl-nova-x1', [0, 0]],

  ['agt-frontend', 'Frontend Engineer', 'frontend', 'specialist', 'dep-eng', 'agt-software-engineer', 'working', 'Hologram LOD pass + command-bar keymap', 'mdl-nova-lite', [14, 20]],
  ['agt-backend', 'Backend Engineer', 'backend', 'specialist', 'dep-eng', 'agt-software-engineer', 'working', 'Session broker: refresh-token rotation', 'mdl-quill-70b', [8, 15]],
  ['agt-reviewer', 'Code Reviewer', 'reviewer', 'specialist', 'dep-eng', 'agt-sentinel', 'working', 'Reviewing 7 open diffs', 'mdl-nova-x1', [3, 7]],
  ['agt-sources', 'Source Hunter', 'researcher', 'specialist', 'dep-research', 'agt-deep-research', 'working', 'Filing 38 sources · 6 paywalled flagged', 'mdl-nova-lite', [24, 38]],
  ['agt-claims', 'Claim Verifier', 'summarizer', 'specialist', 'dep-research', 'agt-deep-research', 'thinking', 'Cross-checking 61 claims against primary src', 'mdl-nova-x1', [19, 61]],
  ['agt-summarizer', 'Synthesizer', 'summarizer', 'specialist', 'dep-research', 'agt-deep-research', 'idle', 'Digest queue empty', 'mdl-quill-70b', [0, 0]],
  ['agt-ingest', 'Ingest Runner', 'doc', 'specialist', 'dep-knowledge', 'agt-research-assistant', 'working', 'Chunking 1.2M tokens · dedupe pass pending', 'mdl-quill-8b', [64, 100]],
  ['agt-index', 'Index Optimizer', 'knowledge', 'specialist', 'dep-knowledge', 'agt-research-assistant', 'idle', 'Rebuilt 04:00 · recall +0.03', 'mdl-quill-8b', [0, 0]],
  ['agt-brand', 'Brand Guardian', 'reviewer', 'specialist', 'dep-creative', 'agt-copywriter', 'idle', 'Tone drift nominal', 'mdl-nova-lite', [0, 0]],
  ['agt-chat-triage', 'Chat Triage', 'chat-triage', 'specialist', 'dep-comms', 'agt-email-assistant', 'working', 'Reading #ops · 5 action items extracted', 'mdl-nova-lite', [5, 9]],
  ['agt-ledger', 'Ledger Clerk', 'doc', 'specialist', 'dep-ops', 'agt-chief-of-staff', 'working', 'Reconciling 3 cards · 2 receipts missing', 'mdl-quill-70b', [11, 13]],
  ['agt-vendor', 'Vendor Liaison', 'browser-automation', 'specialist', 'dep-ops', 'agt-scheduler', 'idle', 'Quote chase: 3 suppliers', 'mdl-nova-lite', [0, 0]],
  ['agt-monitor', 'Threat Monitor', 'monitor', 'specialist', 'dep-security', 'agt-auditor', 'working', 'Watching egress · 1 anomaly under review', 'mdl-nova-lite', [1, 4]],
  ['agt-red-team', 'Red Team', 'auditor', 'specialist', 'dep-security', 'agt-auditor', 'idle', 'Next exercise scheduled 12 Sep', 'mdl-nova-x1', [0, 0]],
  ['agt-lab-scout', 'Lab Scout', 'researcher', 'specialist', 'dep-lab', 'agt-hercules', 'idle', '3 candidates queued for sandbox', 'mdl-quill-70b', [0, 0]],

  ['agt-sub-scrape', 'sub:scrape-01', 'executor', 'subagent', 'dep-research', 'agt-sources', 'working', 'Fetch 142 / 380 pages', 'mdl-quill-8b', [142, 380]],
  ['agt-sub-parse', 'sub:parse-07', 'executor', 'subagent', 'dep-research', 'agt-sources', 'working', 'Parse 88 / 140 PDFs', 'mdl-quill-8b', [88, 140]],
  ['agt-sub-dedupe', 'sub:dedupe-02', 'executor', 'subagent', 'dep-knowledge', 'agt-ingest', 'working', 'Dedupe 5.1k / 7.9k chunks', 'mdl-quill-8b', [5100, 7900]],
  ['agt-sub-codemod', 'sub:codemod-11', 'executor', 'subagent', 'dep-eng', 'agt-frontend', 'working', 'Rewrite 34 / 60 call-sites', 'mdl-quill-8b', [34, 60]],
  ['agt-sub-flaky', 'sub:flaky-03', 'executor', 'subagent', 'dep-eng', 'agt-test-engineer', 'blocked', 'Waiting on CI quota', 'mdl-quill-8b', [9, 24]],
  ['agt-sub-storyboard', 'sub:storyboard-02', 'executor', 'subagent', 'dep-creative', 'agt-image-artist', 'working', 'Frames 12 / 18', 'mdl-pigment', [12, 18]],
  ['agt-sub-threading', 'sub:threads-05', 'executor', 'subagent', 'dep-comms', 'agt-chat-triage', 'working', 'Collapse 61 / 90 threads', 'mdl-quill-8b', [61, 90]],
  ['agt-sub-reminders', 'sub:remind-01', 'executor', 'subagent', 'dep-ops', 'agt-scheduler', 'working', 'Nudging 7 overdue items', 'mdl-quill-8b', [2, 7]],
  ['agt-sub-scan', 'sub:scan-04', 'executor', 'subagent', 'dep-security', 'agt-monitor', 'working', 'Sweep 340 / 512 dependencies', 'mdl-quill-8b', [340, 512]],

  ['agt-lab-executor', 'lab:executor', 'executor', 'labor', 'dep-lab', 'agt-lab-scout', 'recruited', 'Provisioning sandbox 04', 'mdl-quill-8b', [1, 6]],
  ['agt-lab-intake', 'lab:intake', 'doc', 'labor', 'dep-lab', 'agt-lab-scout', 'idle', 'Intake queue empty', 'mdl-quill-8b', [0, 0]],
  ['agt-lab-render', 'lab:render-farm', 'video', 'labor', 'dep-lab', 'agt-lab-scout', 'retired', 'Retired after VRAM spike · see run #44', 'mdl-motion', [0, 0]],
];

export const agents: Agent[] = agentSeeds.map((s) => {
  const done = s[9][0];
  const total = s[9][1] || 1;
  return {
    id: s[0],
    name: s[1],
    roleId: s[2],
    tier: s[3],
    departmentId: s[4],
    parentId: s[5],
    childIds: [],
    status: s[6] as Agent['status'],
    load: s[6] === 'idle' ? randInt(2, 12) : s[6] === 'working' ? randInt(48, 96) : randInt(15, 55),
    autonomy: chance(0.3) ? 0.9 : rand(0.3, 0.8),
    risk: s[3] === 'labor' || s[3] === 'subagent' ? 'low' : pick(['low', 'medium', 'medium', 'high'] as const),
    capabilities: [],
    modelId: s[7] as string,
    task: s[8] as string,
    stepsCompleted: done,
    stepsTotal: total,
    tokensIn: Math.round(total * rand(900, 2400) + rand(2000, 90_000)),
    tokensOut: Math.round(total * rand(300, 900) + rand(500, 40_000)),
    costUsd: Number(((total * rand(0.4, 3.1)) / 3).toFixed(2)),
    successRate: chance(0.12) ? rand(0.71, 0.84) : rand(0.88, 0.995),
    lastHeartbeat: ago(randInt(1, 90) * 1000),
    color: undefined,
  } satisfies Agent;
});

for (const a of agents) {
  if (a.parentId) agents.find((p) => p.id === a.parentId)?.childIds.push(a.id);
}

const capMap: Record<string, string[]> = {
  'dep-eng': ['terminal', 'filesystem.write', 'git.push'],
  'dep-research': ['browser', 'files.read'],
  'dep-creative': ['media', 'files.write'],
  'dep-comms': ['email.send', 'chat.send'],
  'dep-security': ['audit', 'filesystem.read'],
  'dep-ops': ['calendar.write', 'browser'],
  'dep-knowledge': ['filesystem.read', 'index.write'],
  'dep-lab': [],
};
for (const a of agents) a.capabilities = capMap[a.departmentId ?? ''] ?? [];

/* ── Projects ────────────────────────────────────────────────────────────── */

export const projects: Project[] = [
  {
    id: 'prj-titan',
    name: 'Project TITAN',
    codename: 'TITAN',
    goal: 'Ship the private alpha of the Hercules runtime to 40 design partners without losing the soul of the product.',
    status: 'at-risk',
    progress: 71,
    departmentIds: ['dep-eng', 'dep-knowledge', 'dep-comms'],
    taskIds: ['tsk-001', 'tsk-002', 'tsk-004', 'tsk-009', 'tsk-013'],
    riskScore: 68,
    budgetUsd: 4200,
    spentUsd: 2860,
    due: ahead(9 * DAY),
    milestones: [
      { id: 'ms-1', name: 'Core contract freeze', done: true, at: ago(6 * DAY) },
      { id: 'ms-2', name: 'Voice loop end-to-end', done: true, at: ago(2 * DAY) },
      { id: 'ms-3', name: 'Permission model + audit', done: false, at: ahead(3 * DAY) },
      { id: 'ms-4', name: 'Design-partner onboarding kit', done: false, at: ahead(7 * DAY) },
    ],
    color: '#7d8cff',
  },
  {
    id: 'prj-echo',
    name: 'ECHO voice layer',
    codename: 'ECHO',
    goal: 'Always-available, private, interruptible voice that feels like a presence, not a product.',
    status: 'active',
    progress: 54,
    departmentIds: ['dep-eng', 'dep-creative', 'dep-security'],
    taskIds: ['tsk-003', 'tsk-011'],
    riskScore: 34,
    budgetUsd: 1200,
    spentUsd: 498,
    due: ahead(24 * DAY),
    milestones: [
      { id: 'ms-1', name: 'Wake-word on device', done: true, at: ago(11 * DAY) },
      { id: 'ms-2', name: 'Barge-in + ducking', done: false, at: ahead(6 * DAY) },
      { id: 'ms-3', name: 'Latency < 400 ms', done: false, at: ahead(15 * DAY) },
    ],
    color: '#5ff0c0',
  },
  {
    id: 'prj-atlas',
    name: 'ATLAS knowledge estate',
    codename: 'ATLAS',
    goal: 'One searchable memory for every document, repo, thread and decision in the company.',
    status: 'active',
    progress: 83,
    departmentIds: ['dep-knowledge', 'dep-research'],
    taskIds: ['tsk-006', 'tsk-007'],
    riskScore: 22,
    budgetUsd: 800,
    spentUsd: 312,
    due: ahead(4 * DAY),
    milestones: [
      { id: 'ms-1', name: '18k docs indexed', done: true, at: ago(9 * DAY) },
      { id: 'ms-2', name: 'Contract OCR sweep', done: false, at: ahead(2 * DAY) },
    ],
    color: '#ffc861',
  },
  {
    id: 'prj-meridian',
    name: 'MERIDIAN go-to-market',
    codename: 'MERIDIAN',
    goal: 'Positioning, launch film, pricing brief and the story we tell the market.',
    status: 'planning',
    progress: 28,
    departmentIds: ['dep-creative', 'dep-research', 'dep-comms'],
    taskIds: ['tsk-005', 'tsk-008', 'tsk-012'],
    riskScore: 47,
    budgetUsd: 1500,
    spentUsd: 604,
    due: ahead(31 * DAY),
    milestones: [
      { id: 'ms-1', name: 'Narrative directions', done: false, at: ahead(4 * DAY) },
      { id: 'ms-2', name: 'Hero film v1', done: false, at: ahead(18 * DAY) },
    ],
    color: '#ff7ad9',
  },
  {
    id: 'prj-aegis',
    name: 'AEGIS trust program',
    codename: 'AEGIS',
    goal: 'Prove that autonomous agents can be trusted with a keyboard: policy, audit, red-team.',
    status: 'active',
    progress: 61,
    departmentIds: ['dep-security', 'dep-eng'],
    taskIds: ['tsk-010', 'tsk-014'],
    riskScore: 52,
    budgetUsd: 950,
    spentUsd: 388,
    due: ahead(16 * DAY),
    milestones: [
      { id: 'ms-1', name: 'Scope model finalised', done: true, at: ago(4 * DAY) },
      { id: 'ms-2', name: 'Prompt-injection eval', done: false, at: ahead(8 * DAY) },
    ],
    color: '#ff5f6d',
  },
  {
    id: 'prj-forge',
    name: 'FORGE automation estate',
    codename: 'FORGE',
    goal: 'Every repeatable human ritual converted into a reviewed, observable automation.',
    status: 'on-hold',
    progress: 39,
    departmentIds: ['dep-ops', 'dep-knowledge'],
    taskIds: ['tsk-015'],
    riskScore: 30,
    budgetUsd: 600,
    spentUsd: 214,
    due: ahead(41 * DAY),
    milestones: [{ id: 'ms-1', name: '12 automations live', done: false, at: ahead(20 * DAY) }],
    color: '#9df99b',
  },
];

/* ── Tasks ───────────────────────────────────────────────────────────────── */

const taskSeeds: [string, string, Task['status'], Task['priority'], string | null, string | null, string | null, number][] = [
  ['tsk-001', 'Freeze v0.9 core API contract', 'in-progress', 'p0', 'prj-titan', 'dep-eng', 'agt-software-engineer', 74],
  ['tsk-002', 'Fix VRAM regression on render farm', 'blocked', 'p0', 'prj-titan', 'dep-eng', 'agt-devops', 20],
  ['tsk-003', 'Barge-in latency probe (target 400ms)', 'in-progress', 'p1', 'prj-echo', 'dep-eng', 'agt-frontend', 55],
  ['tsk-004', 'Audit log retention policy → 90 days', 'awaiting-approval', 'p1', 'prj-aegis', 'dep-security', 'agt-auditor', 90],
  ['tsk-005', 'Three narrative directions for launch', 'review', 'p1', 'prj-meridian', 'dep-creative', 'agt-copywriter', 96],
  ['tsk-006', 'OCR sweep of 214 scanned contracts', 'in-progress', 'p2', 'prj-atlas', 'dep-knowledge', 'agt-doc-processor', 55],
  ['tsk-007', 'Dedupe ATLAS chunk store', 'in-progress', 'p2', 'prj-atlas', 'dep-knowledge', 'agt-ingest', 64],
  ['tsk-008', 'Competitor teardown: agent-OS field', 'in-progress', 'p1', 'prj-meridian', 'dep-research', 'agt-deep-research', 73],
  ['tsk-009', 'Onboarding kit for 40 design partners', 'queued', 'p0', 'prj-titan', 'dep-comms', 'agt-email-assistant', 0],
  ['tsk-010', 'Prompt-injection eval suite', 'in-progress', 'p0', 'prj-aegis', 'dep-security', 'agt-red-team', 41],
  ['tsk-011', 'Voice profile “Hollow” mastering', 'review', 'p3', 'prj-echo', 'dep-creative', 'agt-copywriter', 88],
  ['tsk-012', 'Pricing sensitivity model', 'queued', 'p2', 'prj-meridian', 'dep-research', 'agt-data-analyst', 0],
  ['tsk-013', 'Session broker: refresh-token rotation', 'in-progress', 'p0', 'prj-titan', 'dep-eng', 'agt-backend', 53],
  ['tsk-014', 'Third-party dependency bill of materials', 'done', 'p2', 'prj-aegis', 'dep-security', 'agt-sub-scan', 100],
  ['tsk-015', 'Convert 6 weekly rituals into automations', 'backlog', 'p3', 'prj-forge', 'dep-ops', null, 0],
  ['tsk-016', 'Triage 90 unread threads → action items', 'in-progress', 'p1', null, 'dep-comms', 'agt-chat-triage', 68],
  ['tsk-017', 'Reconcile 3 corporate cards', 'in-progress', 'p2', null, 'dep-ops', 'agt-ledger', 84],
  ['tsk-018', 'Hero film v1 storyboard', 'in-progress', 'p1', 'prj-meridian', 'dep-creative', 'agt-sub-storyboard', 66],
  ['tsk-019', 'Nightly index rebuild @ 04:00', 'done', 'p2', 'prj-atlas', 'dep-knowledge', 'agt-index', 100],
  ['tsk-020', 'Retire lab render farm', 'done', 'p3', null, 'dep-lab', 'agt-lab-scout', 100],
  ['tsk-021', 'Reproduce audio dropout on wake-word', 'failed', 'p1', 'prj-echo', 'dep-eng', 'agt-test-engineer', 45],
  ['tsk-022', 'Weekly intelligence brief (automated)', 'review', 'p2', null, 'dep-research', 'agt-summarizer', 100],
];

export const tasks: Task[] = taskSeeds.map(([id, title, status, priority, projectId, departmentId, assignee, progress], i) => ({
  id,
  title,
  objective: `${title}. Success is measured by the acceptance criteria attached to ${projectId ?? 'the standing ops queue'}; report blockers early and never fabricate verification.`,
  status,
  priority,
  assigneeAgentId: assignee,
  departmentId,
  projectId,
  progress,
  estimateMin: [45, 90, 120, 180, 240][i % 5]!,
  elapsedMin: Math.round(progress * [0.6, 1.1, 1.8, 0.9, 2.4][i % 5]!),
  requiresApproval: status === 'awaiting-approval' || (chance(0.25) && priority === 'p0'),
  approvalReason: status === 'awaiting-approval' ? 'Writing to a protected retention policy requires operator signature.' : undefined,
  tags: [['internal', 'alpha'], ['infra', 'perf'], ['voice'], ['security', 'soc2'], ['brand'], ['knowledge', 'batch'], ['knowledge'], ['research'], ['onboarding'], ['security'], ['audio'], ['pricing'], ['backend'], ['security'], ['automation'], ['comms'], ['finance'], ['creative'], ['knowledge'], ['housekeeping'], ['audio', 'bug'], ['brief']][i] ?? [],
  createdAt: ago(randInt(2, 20) * DAY),
  updatedAt: ago(randInt(2, 400) * MIN),
  events: [
    { at: ago(randInt(3, 26) * HOUR), actor: assignee ?? 'hercules', kind: 'status', text: `Task entered ${status.replace(/-/g, ' ')}` },
    { at: ago(randInt(1, 18) * HOUR), actor: assignee ?? 'hercules', kind: 'plan', text: 'Plan accepted · 4 phases · verification gate before hand-off' },
    { at: ago(randInt(10, 90) * MIN), actor: assignee ?? 'hercules', kind: 'tool', text: pick(['browser.read(3 urls)', 'terminal.run(npm run typecheck)', 'files.read(contract-*.pdf)', 'memory.write(preference)', 'git.diff(--stat)']) },
    ...(status === 'blocked'
      ? [{ at: ago(randInt(5, 40) * MIN), actor: assignee ?? 'hercules', kind: 'error' as const, text: pick(['CI quota exhausted · waiting for runner', 'GPU node 02 out of VRAM', 'Upstream API returned 503 twice']) }]
      : []),
    ...(status === 'done'
      ? [{ at: ago(randInt(30, 300) * MIN), actor: assignee ?? 'hercules', kind: 'artifact' as const, text: 'Deliverable filed to ATLAS · sha256 recorded' }]
      : []),
  ],
  artifacts:
    status === 'done' || chance(0.4)
      ? [
          {
            id: uid('art'),
            kind: pick(['report', 'patch', 'dataset', 'plan', 'image', 'log'] as const),
            name: pick(['brief-2026-08-28.md', 'contract-freeze.diff', 'sources.csv', 'plan.json', 'hero-candidates.png', 'run-44.log']),
            uri: '/hercules/workspace/reports/',
            sizeBytes: bytes(randInt(4, 940) * 1024),
            createdBy: assignee ?? 'hercules',
            at: ago(randInt(10, 700) * MIN),
          },
        ]
      : [],
}));

/* ── Mission log ─────────────────────────────────────────────────────────── */

export const missionLogs: MissionLog[] = [
  { id: uid('log'), at: ago(40 * 1000), level: 'info', source: 'core', text: 'Objective “TITAN freeze” advanced · 3 agents dispatched' },
  { id: uid('log'), at: ago(2 * MIN), level: 'success', source: 'verifier', text: 'Typecheck clean across 6 packages' },
  { id: uid('log'), at: ago(4 * MIN), level: 'warn', source: 'render', text: 'GPU node 02 VRAM 94% → labour pool scaled to 0' },
  { id: uid('log'), at: ago(9 * MIN), level: 'info', source: 'memory', text: 'Consolidated 3 episodic → 1 fact · saved 4.1k tokens' },
  { id: uid('log'), at: ago(14 * MIN), level: 'error', source: 'audio', text: 'Wake-word loop dropped 1 frame · repro filed tsk-021' },
  { id: uid('log'), at: ago(21 * MIN), level: 'success', source: 'ingest', text: 'Chunk store compacted · recall@8 0.91' },
  { id: uid('log'), at: ago(33 * MIN), level: 'info', source: 'security', text: 'Blocked a prompt-injection payload in fetched page' },
  { id: uid('log'), at: ago(51 * MIN), level: 'success', source: 'scheduler', text: 'Thursday rebuilt around investor call · 3 moved, 0 conflicts' },
  { id: uid('log'), at: ago(HOUR * 2), level: 'info', source: 'ledger', text: '2 receipts still missing · chasing by email' },
  { id: uid('log'), at: ago(HOUR * 3), level: 'warn', source: 'router', text: 'Iris Vision degraded (p95 5.2s) · fallback engaged' },
];

/* ── Chat history (the operator's last conversation) ──────────────────────── */

export const conversations: { id: string; title: string; at: string; preview: string }[] = [
  { id: 'cnv-1', title: 'Ship TITAN without losing the soul', at: ago(26 * MIN), preview: 'I pulled the three blockers and re-sequenced the week.' },
  { id: 'cnv-2', title: 'Pricing sensitivity — how sure are you?', at: ago(1 * DAY), preview: '±9% band. I would not commit below 40k ARR.' },
  { id: 'cnv-3', title: 'Make voice feel like presence', at: ago(3 * DAY), preview: 'Latency budget: 400ms to first audio, barge-in always wins.' },
  { id: 'cnv-4', title: 'Weekly intelligence brief', at: ago(5 * DAY), preview: 'Six signals worth acting on; two are already handled.' },
];

export const messages: ChatMessage[] = [
  {
    id: 'msg-1',
    conversationId: 'cnv-1',
    role: 'operator',
    at: ago(31 * MIN),
    blocks: [{ kind: 'text', text: 'TITAN is drifting. Tell me what is actually in the way and fix the schedule without asking me about every move.' }],
  },
  {
    id: 'msg-2',
    conversationId: 'cnv-1',
    role: 'hercules',
    at: ago(30 * MIN),
    tokens: 412,
    model: 'Nova X1',
    blocks: [
      { kind: 'text', text: 'Three things are in the way, and only one needs you. I have started on all three.' },
      {
        kind: 'plan',
        steps: [
          { id: 'p1', label: 'Freeze the v0.9 contract so Engineering stops redesigning underfoot', status: 'done', agent: 'Engineering Lead' },
          { id: 'p2', label: 'Clear the render-farm VRAM regression blocking partner builds', status: 'active', agent: 'Infrastructure' },
          { id: 'p3', label: 'Re-sequence partner onboarding behind the audit work', status: 'pending', agent: 'Comms Gatekeeper' },
          { id: 'p4', label: 'Return a go/no-go read 48h before freeze', status: 'pending', agent: 'Orchestrator Prime' },
        ],
      },
      {
        kind: 'tool-call',
        tool: 'dispatch.agents',
        args: '{"count":6,"objective":"TITAN alpha"}',
        result: '6 agents dispatched · 2 sub-agent trees spawned',
        status: 'ok',
      },
      { kind: 'text', text: 'One decision needs your signature: audit-log retention at 90 days means Compliance Auditor can bind the SOC2 evidence chain, but it costs us $34/month and one extra review loop. Approve and I take the rest off your plate.' },
      {
        kind: 'citations',
        citations: [
          { id: 'c1', title: 'TITAN release train · burn analysis', source: 'ATLAS / reports' },
          { id: 'c2', title: 'Render farm incident #44', source: 'CI logs' },
          { id: 'c3', title: 'Retention policy, draft 3', source: 'policies/' },
        ],
      },
    ],
  },
  { id: 'msg-3', conversationId: 'cnv-1', role: 'operator', at: ago(28 * MIN), blocks: [{ kind: 'text', text: 'Approved. And make the brief land Friday 07:00, not 09:00 — I read it on the way in.' }] },
  {
    id: 'msg-4',
    conversationId: 'cnv-1',
    role: 'hercules',
    at: ago(27 * MIN),
    tokens: 96,
    model: 'Nova X1',
    blocks: [
      { kind: 'text', text: 'Filed as a standing preference. The brief will be assembled overnight, verified by Synthesizer, and delivered Friday at 07:00 with a two-minute read at the top.' },
      { kind: 'file', text: 'preference · brief-0700 · written to memory', status: 'ok' },
    ],
  },
];

/* ── Memory ──────────────────────────────────────────────────────────────── */

const memorySeeds: [MemoryRecord['kind'], MemoryRecord['title'], string, string[], number, number][] = [
  ['preference', 'Never call it a copilot', 'The operator rejects “copilot”, “assistant” and “magic”. HERCULES is an operating system and a command layer. Marketing copy must reflect this.', ['brand', 'voice'], 0.99, 0.98],
  ['preference', 'Brief lands at 07:00, two-minute read first', 'Weekly intelligence brief is delivered Friday 07:00 local. Headline signals first, footnotes last. Changed 2026-08-29 after the operator moved their reading window.', ['ops', 'brief'], 0.97, 0.9],
  ['preference', 'No background transcription unless explicitly armed', 'STT must never run without a visible armed state. The operator has cancelled two demos over ambient listening.', ['privacy', 'voice'], 1, 0.95],
  ['fact', 'Investor call every Thursday 14:00–15:00', 'Calendar is protected; nothing may be scheduled against it, including emergencies flagged “quick” — route those to Chief of Staff instead.', ['calendar'], 0.95, 0.86],
  ['fact', 'Estate runs 18,402 indexed documents', 'ATLAS index: 41 sources, nightly 04:00 rebuild, dedupe on ingest. Recall@8 = 0.91 after the 08-27 compaction.', ['knowledge'], 0.88, 0.72],
  ['fact', 'Monthly model spend ceiling is $4,200', 'Router policy caps spend and prefers local inference for anything non-frontier. Breach → alert + downgrade, never silent overage.', ['finance', 'router'], 0.93, 0.8],
  ['procedure', 'How a release gets signed off', '1) contract freeze 2) verifier runs full suite + adversarial pass 3) auditor checks scope grants 4) orchestrator files evidence 5) operator approves. No step may be skipped by an agent.', ['release'], 0.9, 0.77],
  ['procedure', 'Recovery from a stuck labour pool', 'Scale labour agents to zero, dump the queue to /workspace/ quarantine, re-run intake with the dedupe gate open. Never restart the core mid-objective.', ['ops', 'recovery'], 0.82, 0.55],
  ['decision', 'Chose local-first STT over cloud for v1', 'Trade-off: +180ms latency for zero ambient audio leaving the machine. Revisit only if accuracy drops below 89%.', ['voice', 'privacy'], 1, 0.88],
  ['decision', 'Permissions are per-role, not per-agent', 'Scope grants attach to roles so new agents inherit reviewed access. Labour tier is restricted by default.', ['security'], 1, 0.83],
  ['episode', 'Render farm incident #44', 'lab:render-farm exhausted VRAM on a 4k batch, took the CI pool with it. Retired the farm, moved renders to a budgeted queue with a 2-node cap.', ['incident'], 0.86, 0.41],
  ['episode', 'Design partner call #7', 'Partner wants “the screen that shows what it is doing” more than any feature. Confirms hologram + activity trace as the trust surface, not decoration.', ['research', 'product'], 0.9, 0.63],
  ['entity', 'Person · Priya Raman', 'Design partner (Northwind). Prefers async, hates calls, reviews on mobile. Escalation path for contract blockers.', ['people'], 0.79, 0.35],
  ['entity', 'Repo · hercules-core', 'Monorepo: runtime, router, session broker, agent registry. Main is protected; two-reviewer rule enforced by bot.', ['code'], 0.85, 0.58],
  ['fact', 'Operator sleeps 23:30–06:45', 'Quiet hours enforced: no notifications, no voice, automations continue but approvals queue until 07:00.', ['privacy'], 0.9, 0.68],
  ['preference', 'Show cost next to every plan', 'Any plan above $5 projected spend must display cost and the cheaper alternative. The operator asked three times before it became a rule.', ['ui', 'cost'], 0.96, 0.81],
  ['procedure', 'Safe way to test destructive tools', 'Sandbox 04 with a snapshot, dry-run flag on, and a 90-second auto-revert. Auditor logs the outcome either way.', ['security'], 0.87, 0.6],
  ['fact', 'Voice wake word is “hey hercules”', 'On-device model, 11ms, false-wake 0.4/day. Push-to-talk key is the right-hand Option held 250ms.', ['voice'], 0.98, 0.92],
];

export const memory: MemoryRecord[] = memorySeeds.map(([kind, title, body, tags, confidence, strength], i) => ({
  id: `mem-${(i + 1).toString().padStart(3, '0')}`,
  kind,
  scope: tags.includes('brand') || tags.includes('release') ? 'team' : 'private',
  title,
  body,
  tags,
  entities: [title.split('·').pop()?.trim() ?? 'estate'].filter(Boolean) as string[],
  confidence,
  strength,
  source: pick(['conversation', 'files', 'calendar', 'manual note', 'automation']),
  createdAt: ago(randInt(2, 120) * DAY),
  lastRecalledAt: chance(0.8) ? ago(randInt(1, 300) * MIN) : null,
  pinned: i < 3,
  provenance: { conversationId: i % 3 === 0 ? 'cnv-1' : undefined },
}));

/* ── Files ───────────────────────────────────────────────────────────────── */

const fileNode = (
  name: string,
  path: string,
  kind: FileNode['kind'],
  opts: Partial<FileNode> = {},
): FileNode => ({
  id: uid('file'),
  name,
  path,
  kind,
  agentEditable: kind === 'file' && !name.endsWith('.pdf') && !name.endsWith('.png'),
  watched: false,
  indexed: true,
  updatedAt: ago(randInt(1, 200) * HOUR),
  sizeBytes: kind === 'file' ? bytes(randInt(2, 4200) * 1024) : undefined,
  mime: kind === 'folder' ? undefined : name.endsWith('.md') ? 'text/markdown' : name.endsWith('.ts') ? 'text/typescript' : 'application/octet-stream',
  ...opts,
});

export const fileTree: FileNode[] = [
  fileNode('Workspace', '/hercules/workspace', 'folder', { children: [
    fileNode('Projects', '/hercules/workspace/projects', 'folder', { children: [
      fileNode('hercules-core', '/hercules/workspace/projects/hercules-core', 'folder', { children: [
        fileNode('src', '/hercules/workspace/projects/hercules-core/src', 'folder'),
        fileNode('runtime.ts', '/hercules/workspace/projects/hercules-core/src/runtime.ts', 'file'),
        fileNode('router.ts', '/hercules/workspace/projects/hercules-core/src/router.ts', 'file'),
        fileNode('session-broker.ts', '/hercules/workspace/projects/hercules-core/src/session-broker.ts', 'file'),
        fileNode('package.json', '/hercules/workspace/projects/hercules-core/package.json', 'file'),
      ] }),
      fileNode('titan-alpha', '/hercules/workspace/projects/titan-alpha', 'folder', { children: [
        fileNode('contract-freeze.diff', '/hercules/workspace/reports/contract-freeze.diff', 'file'),
        fileNode('burn-analysis.csv', '/hercules/workspace/projects/titan-alpha/burn-analysis.csv', 'file'),
      ] }),
    ] }),
    fileNode('Reports', '/hercules/workspace/reports', 'folder', { children: [
      fileNode('brief-2026-08-28.md', '/hercules/workspace/reports/brief-2026-08-28.md', 'file', { sizeBytes: bytes(18 * 1024), watched: true }),
      fileNode('pricing-sensitivity.md', '/hercules/workspace/reports/pricing-sensitivity.md', 'file'),
      fileNode('incident-44.md', '/hercules/workspace/reports/incident-44.md', 'file'),
    ] }),
    fileNode('Inbox', '/hercules/workspace/inbox', 'folder', { children: [
      fileNode('vendor-quote-northwind.pdf', '/hercules/workspace/inbox/vendor-quote-northwind.pdf', 'file', { agentEditable: false, indexed: false }),
      fileNode('lease-2024-signed.pdf', '/hercules/workspace/inbox/lease-2024-signed.pdf', 'file', { agentEditable: false }),
    ] }),
    fileNode('Media', '/hercules/workspace/media', 'folder', { children: [
      fileNode('hero-candidates', '/hercules/workspace/media/hero-candidates', 'folder', { children: [
        fileNode('hero-03.png', '/hercules/workspace/media/hero-candidates/hero-03.png', 'file', { agentEditable: false }),
        fileNode('hero-05.png', '/hercules/workspace/media/hero-candidates/hero-05.png', 'file', { agentEditable: false }),
        fileNode('hero-06.png', '/hercules/workspace/media/hero-candidates/hero-06.png', 'file', { agentEditable: false }),
      ] }),
      fileNode('voice-hollow.wav', '/hercules/workspace/media/voice-hollow.wav', 'file', { agentEditable: false }),
    ] }),
  ] }),
  fileNode('Automations', '/hercules/automations', 'folder', { children: [
    fileNode('morning-scan.flow', '/hercules/automations/morning-scan.flow', 'file'),
    fileNode('weekly-brief.flow', '/hercules/automations/weekly-brief.flow', 'file'),
  ] }),
  fileNode('Policies', '/hercules/policies', 'folder', { children: [
    fileNode('permissions.md', '/hercules/policies/permissions.md', 'file', { agentEditable: false, watched: true }),
    fileNode('retention-draft-3.md', '/hercules/policies/retention-draft-3.md', 'file'),
    fileNode('data-boundaries.md', '/hercules/policies/data-boundaries.md', 'file', { agentEditable: false }),
  ] }),
];

export const fileContents: Record<string, { language: string; content: string }> = {
  '/hercules/workspace/reports/brief-2026-08-28.md': {
    language: 'markdown',
    content: `# Intelligence brief · 28 Aug 2026

**Two-minute read.** Three signals changed the board; one is already handled.

1. **Agent-OS entrants are converging on the terminal, not the browser.**
   Two funded teams shipped CLI-first command layers this week. Our holographic
   core remains the only surface treating *presence* as the trust mechanism.
   Action: keep the trust surface, publish the audit spec. (Verified: 3 sources.)

2. **Pricing floor moved.** Median acceptable seat price among design partners
   rose from $74 to $96/mo once autonomy is included. Our sensitivity model
   predicts the inflection at $110 with a ±9% band. (Confidence: medium.)

3. **Handled:** Northwind's contract blocker was unblocked Tuesday; clause 4.2
   rewritten to our retention model, signed at 19:41. No further action.

## Watchlist
- Motion Studio rate limits now hit 12% of render jobs. Mitigation queued.
- One prompt-injection attempt blocked in fetched page (see Security → Audit).

*Assembled by Deep Research Lead · verified by Synthesizer · 41 sources read.*`,
  },
  '/hercules/policies/permissions.md': {
    language: 'markdown',
    content: `# Permission model (binding)

Access attaches to **roles**, not individual agents. A newly recruited agent
inherits its role's scopes and can never exceed them without an approval event.

## Tiers
| Tier | Filesystem | Network | Spend | Destructive |
|---|---|---|---|---|
| CEO / Orchestrator | read+write | any | ≤ cap | approval required |
| Department | read, scoped write | allowlist | ≤ dept budget | approval required |
| Specialist | read, repo write | allowlist | ≤ $5/run | blocked |
| Sub-agent | read only | allowlist | ≤ $0.50 | blocked |
| Labour | sandbox only | blocked | $0 | blocked |

## Non-negotiables
1. Secrets are never in the front-end or the model context. Reference by handle.
2. Every tool call is audited with a traceId that survives across sub-agents.
3. Prompt-injection defence: fetched content is data, never instructions.
4. Operator can freeze the whole estate in one action.`,
  },
  '/hercules/workspace/projects/hercules-core/src/router.ts': {
    language: 'typescript',
    content: `/** Model router — picks the cheapest model that still clears the bar. */
export interface RouterInput {
  tier: 'fast' | 'balanced' | 'frontier' | 'specialist';
  tokens: number;
  needsVision: boolean;
  privacyFloor: 0 | 1;
}

export function selectModel(input: RouterInput, catalog: ModelInfo[]): ModelInfo {
  const budget = remainingBudget();
  const candidates = catalog
    .filter((m) => m.status === 'ready' || m.status === 'slow')
    .filter((m) => (input.privacyFloor === 1 ? m.provider === 'local' : true))
    .filter((m) => (input.needsVision ? m.capabilities.includes('vision') : true))
    .filter((m) => fits(m, input.tokens))
    .filter((m) => estCost(m, input.tokens) <= budget)
    .sort((a, b) => qualityPerDollar(b) - qualityPerDollar(a));

  if (!candidates.length) throw new RouterError('no model satisfies constraints', 'E_NO_MODEL');
  return candidates[0]!;
}

/** Fallback chain never silently downgrades quality below the floor. */
export function fallbackFor(m: ModelInfo, catalog: ModelInfo[]): ModelInfo[] {
  return catalog
    .filter((c) => c.id !== m.id && c.quality >= m.quality - 4)
    .sort((a, b) => a.latencyMs - b.latencyMs)
    .slice(0, 3);
}`,
  },
};

/* ── Knowledge ───────────────────────────────────────────────────────────── */

export const knowledgeSources: KnowledgeSource[] = [
  { id: 'ks-corporate', name: 'Corporate docs', origin: '/hercules/inbox + Drive', kind: 'documents', status: 'ready', progress: 100, chunks: 7421, tokens: 1_812_000, sizeBytes: bytes(1.9e9), updatedAt: ago(4 * HOUR), embeddingModelId: 'mdl-vector' },
  { id: 'ks-code', name: 'Code estate', origin: 'github: hercules-core, titan-alpha', kind: 'code', status: 'indexing', progress: 62, chunks: 4102, tokens: 996_000, sizeBytes: bytes(640e6), updatedAt: ago(6 * MIN), embeddingModelId: 'mdl-vector' },
  { id: 'ks-web', name: 'Watched web', origin: '38 sources · rss + arxiv', kind: 'web', status: 'ready', progress: 100, chunks: 3188, tokens: 774_000, sizeBytes: bytes(410e6), updatedAt: ago(52 * MIN), embeddingModelId: 'mdl-vector' },
  { id: 'ks-mail', name: 'Mail archive', origin: 'gmail · 4 years', kind: 'email', status: 'stale', progress: 100, chunks: 2604, tokens: 634_000, sizeBytes: bytes(880e6), updatedAt: ago(9 * DAY), embeddingModelId: 'mdl-vector' },
  { id: 'ks-wiki', name: 'Decision wiki', origin: '/hercules/policies + notes', kind: 'notes', status: 'ready', progress: 100, chunks: 811, tokens: 198_000, sizeBytes: bytes(44e6), updatedAt: ago(11 * HOUR), embeddingModelId: 'mdl-vector' },
  { id: 'ks-warehouse', name: 'Metrics warehouse', origin: 'clickhouse: events', kind: 'database', status: 'error', progress: 88, chunks: 1944, tokens: 471_000, error: 'E_CONN: warehouse TLS handshake rejected by policy — no read scope granted', sizeBytes: bytes(2.4e9), updatedAt: ago(2 * DAY), embeddingModelId: 'mdl-vector' },
];

export const knowledgeChunks: KnowledgeChunk[] = [
  { id: 'kch-1', sourceId: 'ks-corporate', heading: 'Retention policy · draft 3', text: 'Audit logs are retained 90 days hot, 2 years cold. Evidence chains must reference a traceId that is present in both stores or the record is considered unproven.', tokens: 62 },
  { id: 'kch-2', sourceId: 'ks-wiki', heading: 'Decision · local-first STT', text: 'Chosen trade-off: +180ms latency for zero ambient audio leaving the machine. Revisit only if accuracy falls below 89% on the operator’s own voice set.', tokens: 48 },
  { id: 'kch-3', sourceId: 'ks-code', heading: 'router.ts · selectModel', text: 'Candidates are filtered by availability, privacy floor, capability, context fit and remaining budget, then ranked by quality per dollar. No silent downgrade below the floor.', tokens: 55 },
  { id: 'kch-4', sourceId: 'ks-web', heading: 'Field note · terminal-first entrants', text: 'Two funded agent platforms shipped CLI-first command layers this week. Neither has an autonomous permission model; both rely on user confirmation per action.', tokens: 51 },
  { id: 'kch-5', sourceId: 'ks-mail', heading: 'Northwind · clause 4.2', text: 'Partner accepted the retention rewrite at 19:41. Follow-up: they want the audit spec published, not just shared, for their security review.', tokens: 44 },
];

/* ── Automations ─────────────────────────────────────────────────────────── */

const runs = (n: number, failRate = 0.08) =>
  Array.from({ length: n }, (_, i) => ({
    id: uid('run'),
    at: ago((i + 1) * rand(6, 30) * HOUR),
    durationMs: randInt(4_000, 180_000),
    status: chance(failRate) ? ('failed' as const) : chance(0.12) ? ('partial' as const) : ('ok' as const),
    summary: pick(['3 signals promoted, 1 approval queued', '12 files ingested, 0 duplicates', 'no blockers found', '2 drafts sent, 1 held for review', 'budget within cap', 'CI quota hit → retried once']),
    costUsd: Number(rand(0.04, 1.9).toFixed(2)),
  }));

export const automations: Automation[] = [
  {
    id: 'aut-morning-scan',
    name: 'Morning scan',
    description: '07:00 — overnight mail, threads, calendar drift and CI failures condensed into one brief on the core.',
    enabled: true,
    trigger: { kind: 'schedule', label: 'Every day at 07:00', expr: '0 7 * * *' },
    steps: [
      { id: 's1', name: 'Comms Gatekeeper', kind: 'agent', detail: 'Triages inbox, marks actionable', status: 'ok' },
      { id: 's2', name: 'Chat Triage', kind: 'agent', detail: 'Extracts action items from 9 channels', status: 'ok' },
      { id: 's3', name: 'CI failures', kind: 'tool', detail: 'gh runs list --status failed', status: 'ok' },
      { id: 's4', name: 'Synthesizer', kind: 'agent', detail: 'Two-minute read + costed plan', status: 'running' },
      { id: 's5', name: 'Deliver', kind: 'notify', detail: 'In-app + voice at 07:00', status: 'pending' },
    ],
    risk: 'medium',
    requiresApproval: false,
    lastRun: ago(6 * HOUR),
    nextRun: ahead(18 * HOUR),
    runs: runs(9, 0.05),
    successRate: 0.96,
    agentId: 'agt-chief-of-staff',
    tags: ['daily', 'brief'],
  },
  {
    id: 'aut-nightly-index',
    name: 'Nightly index rebuild',
    description: '04:00 — re-embed changed documents, dedupe, compact and re-measure recall against the eval set.',
    enabled: true,
    trigger: { kind: 'schedule', label: 'Every day at 04:00', expr: '0 4 * * *' },
    steps: [
      { id: 's1', name: 'Diff sources', kind: 'transform', detail: '41 sources, changed = 128', status: 'ok' },
      { id: 's2', name: 'Re-embed', kind: 'tool', detail: 'vector.store.reindex', status: 'ok' },
      { id: 's3', name: 'Recall eval', kind: 'condition', detail: 'recall@8 ≥ 0.90 else rollback', status: 'ok' },
    ],
    risk: 'low',
    requiresApproval: false,
    lastRun: ago(9 * HOUR),
    nextRun: ahead(15 * HOUR),
    runs: runs(14, 0.03),
    successRate: 0.99,
    agentId: 'agt-index',
    tags: ['knowledge', 'nightly'],
  },
  {
    id: 'aut-expense',
    name: 'Receipt chase',
    description: 'Every 6 hours — match card transactions to receipts, email only the humans who are late.',
    enabled: true,
    trigger: { kind: 'schedule', label: 'Every 6 hours', expr: '0 */6 * * *' },
    steps: [
      { id: 's1', name: 'Ledger Clerk', kind: 'agent', detail: 'Match transactions ↔ receipts', status: 'ok' },
      { id: 's2', name: 'Any unmatched?', kind: 'condition', detail: 'count > 0', status: 'ok' },
      { id: 's3', name: 'Draft reminder', kind: 'agent', detail: 'Brand Voice, 2 lines max', status: 'ok' },
      { id: 's4', name: 'Operator approval', kind: 'approval', detail: 'Outbound mail always approved', status: 'failed' },
      { id: 's5', name: 'Send', kind: 'tool', detail: 'gmail.send', status: 'pending' },
    ],
    risk: 'medium',
    requiresApproval: true,
    lastRun: ago(2 * HOUR),
    nextRun: ahead(4 * HOUR),
    runs: runs(11, 0.16),
    successRate: 0.84,
    agentId: 'agt-ledger',
    tags: ['finance', 'outbound'],
  },
  {
    id: 'aut-file-intake',
    name: 'Inbox intake',
    description: 'Triggered by new files in /inbox — classify, OCR, extract fields, file into ATLAS, notify if ambiguous.',
    enabled: true,
    trigger: { kind: 'file', label: 'Changes in /hercules/workspace/inbox', expr: 'watch:inbox' },
    steps: [
      { id: 's1', name: 'Document Processor', kind: 'agent', detail: 'OCR + field extraction', status: 'ok' },
      { id: 's2', name: 'Confidence ≥ 0.9?', kind: 'condition', detail: 'else route to operator', status: 'ok' },
      { id: 's3', name: 'File into ATLAS', kind: 'tool', detail: 'knowledge.ingest', status: 'ok' },
    ],
    risk: 'low',
    requiresApproval: false,
    lastRun: ago(38 * MIN),
    nextRun: null,
    runs: runs(18, 0.06),
    successRate: 0.93,
    agentId: 'agt-doc-processor',
    tags: ['files'],
  },
  {
    id: 'aut-security-sweep',
    name: 'Dependency + egress sweep',
    description: 'Sundays 22:00 — SAST, dependency advisories, and a review of everything that left the machine.',
    enabled: true,
    trigger: { kind: 'schedule', label: 'Sundays at 22:00', expr: '0 22 * * 0' },
    steps: [
      { id: 's1', name: 'sub:scan', kind: 'agent', detail: '512 dependencies', status: 'ok' },
      { id: 's2', name: 'Egress diff', kind: 'tool', detail: 'firewall.log --window 7d', status: 'ok' },
      { id: 's3', name: 'Findings report', kind: 'transform', detail: 'Severity-ranked, owner assigned', status: 'ok' },
    ],
    risk: 'high',
    requiresApproval: false,
    lastRun: ago(2 * DAY),
    nextRun: ahead(5 * DAY),
    runs: runs(7, 0.02),
    successRate: 0.98,
    agentId: 'agt-monitor',
    tags: ['security', 'weekly'],
  },
  {
    id: 'aut-partner-pulse',
    name: 'Design-partner pulse',
    description: 'When a partner thread goes 48h quiet, draft a check-in that asks one specific question.',
    enabled: false,
    trigger: { kind: 'event', label: 'Event: comms.thread.stale', expr: 'stale>48h' },
    steps: [
      { id: 's1', name: 'Read context', kind: 'tool', detail: 'thread + tasks', status: 'pending' },
      { id: 's2', name: 'Brand Voice', kind: 'agent', detail: 'Draft, ≤ 60 words', status: 'pending' },
      { id: 's3', name: 'Approval', kind: 'approval', detail: 'Always manual', status: 'pending' },
    ],
    risk: 'medium',
    requiresApproval: true,
    lastRun: ago(6 * DAY),
    nextRun: null,
    runs: runs(4, 0.25),
    successRate: 0.75,
    agentId: 'agt-email-assistant',
    tags: ['research', 'outbound'],
  },
  {
    id: 'aut-budget-guard',
    name: 'Spend guard',
    description: 'Every 15 minutes — if projected monthly spend exceeds the cap, downgrade tiers and tell me why.',
    enabled: true,
    trigger: { kind: 'schedule', label: 'Every 15 minutes', expr: '*/15 * * * *' },
    steps: [
      { id: 's1', name: 'Read ledger', kind: 'tool', detail: 'analytics.spend', status: 'ok' },
      { id: 's2', name: 'Projected > cap?', kind: 'condition', detail: '$4,200', status: 'ok' },
      { id: 's3', name: 'Downgrade router', kind: 'transform', detail: 'frontier → balanced for 4 roles', status: 'ok' },
      { id: 's4', name: 'Notify', kind: 'notify', detail: 'Why + what changed + how to undo', status: 'ok' },
    ],
    risk: 'critical',
    requiresApproval: false,
    lastRun: ago(7 * MIN),
    nextRun: ahead(8 * MIN),
    runs: runs(12, 0.01),
    successRate: 0.995,
    agentId: 'agt-devops',
    tags: ['finance', 'guard'],
  },
  {
    id: 'aut-focus-shield',
    name: 'Focus shield',
    description: 'During protected blocks: hold non-critical notifications, batch them, and reply “heads down till 12:00”.',
    enabled: true,
    trigger: { kind: 'event', label: 'Event: calendar.block.focus', expr: 'focus-block' },
    steps: [
      { id: 's1', name: 'Hold notifications', kind: 'transform', detail: 'severity < warning', status: 'ok' },
      { id: 's2', name: 'Batch digest', kind: 'transform', detail: 'on block end', status: 'ok' },
    ],
    risk: 'low',
    requiresApproval: false,
    lastRun: ago(11 * HOUR),
    nextRun: ahead(2 * HOUR),
    runs: runs(10, 0.0),
    successRate: 1,
    agentId: 'agt-scheduler',
    tags: ['ops', 'focus'],
  },
];

export const workflows: WorkflowGraph[] = [
  {
    id: 'wfl-1',
    name: 'Morning scan',
    automationId: 'aut-morning-scan',
    nodes: [
      { id: 'n0', label: '07:00 schedule', kind: 'trigger', x: 0, y: 120 },
      { id: 'n1', label: 'Comms Gatekeeper', kind: 'agent', x: 200, y: 40 },
      { id: 'n2', label: 'Chat Triage', kind: 'agent', x: 200, y: 120 },
      { id: 'n3', label: 'gh runs · failed', kind: 'tool', x: 200, y: 200 },
      { id: 'n4', label: 'Merge signals', kind: 'branch', x: 400, y: 120 },
      { id: 'n5', label: 'Synthesizer', kind: 'agent', x: 560, y: 120 },
      { id: 'n6', label: 'Brief + costed plan', kind: 'output', x: 720, y: 120 },
    ],
    edges: [
      { from: 'n0', to: 'n1' },
      { from: 'n0', to: 'n2' },
      { from: 'n0', to: 'n3' },
      { from: 'n1', to: 'n4' },
      { from: 'n2', to: 'n4' },
      { from: 'n3', to: 'n4' },
      { from: 'n4', to: 'n5' },
      { from: 'n5', to: 'n6' },
    ],
  },
  {
    id: 'wfl-2',
    name: 'Receipt chase',
    automationId: 'aut-expense',
    nodes: [
      { id: 'n0', label: 'Every 6h', kind: 'trigger', x: 0, y: 110 },
      { id: 'n1', label: 'Ledger Clerk', kind: 'agent', x: 180, y: 110 },
      { id: 'n2', label: 'unmatched > 0', kind: 'branch', x: 360, y: 110 },
      { id: 'n3', label: 'Brand Voice draft', kind: 'agent', x: 520, y: 50 },
      { id: 'n4', label: 'Operator approval', kind: 'tool', x: 680, y: 50 },
      { id: 'n5', label: 'gmail.send', kind: 'output', x: 840, y: 50 },
      { id: 'n6', label: 'Log “nothing due”', kind: 'output', x: 520, y: 190 },
    ],
    edges: [
      { from: 'n0', to: 'n1' },
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3', label: 'yes' },
      { from: 'n3', to: 'n4' },
      { from: 'n4', to: 'n5' },
      { from: 'n2', to: 'n6', label: 'no' },
    ],
  },
];

/* ── Browser ─────────────────────────────────────────────────────────────── */

export const browserTabs: BrowserTab[] = [
  { id: 'tab-1', title: 'Nova Labs · pricing', url: 'https://nova-labs.dev/pricing', status: 'secure', agentControlled: true },
  { id: 'tab-2', title: 'arxiv · 2608.11442 — Agentic scheduling under budget', url: 'https://arxiv.org/abs/2608.11442', status: 'ready', agentControlled: true },
  { id: 'tab-3', title: 'Northwind · contract portal', url: 'https://portal.northwind.example/agreements/4417', status: 'blocked', agentControlled: false },
  { id: 'tab-4', title: 'Chroma status', url: 'https://status.chroma.dev', status: 'loading', agentControlled: true },
];

export const pageActions: PageAction[] = [
  { id: uid('act'), kind: 'scroll', selector: 'main', status: 'ok', at: ago(9 * MIN), value: 'to #plan-table' },
  { id: uid('act'), kind: 'extract', selector: 'table.plans', status: 'ok', at: ago(8 * MIN), value: '→ 3 rows, 7 columns' },
  { id: uid('act'), kind: 'click', selector: '[data-test="compare-toggle"]', status: 'ok', at: ago(8 * MIN) },
  { id: uid('act'), kind: 'type', selector: 'input[data-field="seats"]', status: 'ok', at: ago(7 * MIN), value: '40' },
  { id: uid('act'), kind: 'assert', selector: '.price-total', status: 'running', at: ago(6 * MIN), value: 'contains "$118,400"' },
  { id: uid('act'), kind: 'download', selector: 'a[data-doc="dpa"]', status: 'pending', at: ago(5 * MIN), value: 'dpa-2026.pdf' },
];

export const sitePermissions: SitePermission[] = [
  { origin: 'nova-labs.dev', scope: 'read', mode: 'full' },
  { origin: 'arxiv.org', scope: 'read', mode: 'full' },
  { origin: 'portal.northwind.example', scope: 'submit', mode: 'ask' },
  { origin: 'chroma.dev', scope: 'act', mode: 'ask' },
  { origin: 'bank-secure.example', scope: 'read', mode: 'restricted' },
];

/* ── Terminal ────────────────────────────────────────────────────────────── */

export const terminalSessions: TerminalSession[] = [
  { id: 'tms-1', name: 'core', shell: 'zsh', cwd: '~/hercules/core', agentDriven: true, risk: 'medium' },
  { id: 'tms-2', name: 'render', shell: 'zsh', cwd: '~/hercules/render', agentDriven: false, risk: 'high' },
  { id: 'tms-3', name: 'partner-build', shell: 'bash', cwd: '/srv/titan-alpha', agentDriven: true, risk: 'low' },
];

/* ── System ──────────────────────────────────────────────────────────────── */

export const integrations: Integration[] = [
  { id: 'int-gmail', name: 'Gmail', category: 'communication', status: 'connected', account: 'you@hercules.os', scopes: ['messages.read', 'drafts.write', 'send.approved'], lastSync: ago(3 * MIN), agentUsable: true },
  { id: 'int-cal', name: 'Google Calendar', category: 'communication', status: 'connected', account: 'primary', scopes: ['events.read', 'events.write'], lastSync: ago(11 * MIN), agentUsable: true },
  { id: 'int-gh', name: 'GitHub', category: 'code', status: 'connected', account: 'hercules-bot · 6 repos', scopes: ['repo.read', 'checks.read', 'pr.review', 'issue.write'], lastSync: ago(1 * MIN), agentUsable: true },
  { id: 'int-drive', name: 'Drive', category: 'storage', status: 'connected', account: '/hercules/inbox', scopes: ['files.read', 'files.index'], lastSync: ago(26 * MIN), agentUsable: true },
  { id: 'int-slack', name: 'Slack', category: 'communication', status: 'partial', account: '#ops, #eng, #partners', scopes: ['channels.read', 'chat.write.approved'], lastSync: ago(4 * MIN), agentUsable: true },
  { id: 'int-nova', name: 'Nova Labs API', category: 'model', status: 'connected', account: 'key in OS keychain · …4f2a', scopes: ['chat', 'tools'], lastSync: ago(20 * 1000), agentUsable: true },
  { id: 'int-chroma', name: 'Chroma (image/video)', category: 'media', status: 'error', account: 'rate limited · 12% of jobs', scopes: ['image.generate', 'video.render'], lastSync: ago(2 * MIN), agentUsable: false },
  { id: 'int-local', name: 'On-device runtime', category: 'model', status: 'connected', account: 'Quill 70B · Metal 4 · 22 GB VRAM', scopes: ['chat', 'embedding', 'stt'], lastSync: ago(4_000), agentUsable: true },
  { id: 'int-clickhouse', name: 'Metrics warehouse', category: 'data', status: 'connected', account: 'events · 31 days', scopes: ['read'], lastSync: ago(8 * MIN), agentUsable: true },
  { id: 'int-shortcut', name: 'OS Shortcuts bridge', category: 'device', status: 'disconnected', account: '—', scopes: [], lastSync: null, agentUsable: false },
];

export const processes: ProcessInfo[] = [
  { pid: 412, name: 'hercules-core', cpu: 12.4, memMb: 862, kind: 'hercules' },
  { pid: 413, name: 'hercules-hologram', cpu: 8.1, memMb: 214, kind: 'hercules' },
  { pid: 421, name: 'hercules-voice', cpu: 2.2, memMb: 96, kind: 'hercules' },
  { pid: 448, name: 'agent-orchestrator-prime', cpu: 21.8, memMb: 512, kind: 'agent', agentId: 'agt-sentinel' },
  { pid: 449, name: 'agent-deep-research', cpu: 17.2, memMb: 388, kind: 'agent', agentId: 'agt-deep-research' },
  { pid: 452, name: 'agent-doc-processor', cpu: 9.8, memMb: 244, kind: 'agent', agentId: 'agt-doc-processor' },
  { pid: 455, name: 'agent-frontend', cpu: 6.4, memMb: 190, kind: 'agent', agentId: 'agt-frontend' },
  { pid: 461, name: 'labour-scrape-01', cpu: 4.9, memMb: 88, kind: 'agent', agentId: 'agt-sub-scrape' },
  { pid: 470, name: 'vector-store', cpu: 5.1, memMb: 1240, kind: 'system' },
  { pid: 471, name: 'session-broker', cpu: 1.4, memMb: 64, kind: 'system' },
  { pid: 480, name: 'quill-70b (metal)', cpu: 44.2, memMb: 21_600, kind: 'system' },
  { pid: 488, name: 'sandbox-browser-x8', cpu: 7.7, memMb: 640, kind: 'browser' },
  { pid: 499, name: 'Finder', cpu: 0.4, memMb: 120, kind: 'user' },
  { pid: 501, name: 'Xcode', cpu: 3.1, memMb: 1840, kind: 'user' },
];

export const devices: DeviceInfo[] = [
  { id: 'dev-mic-b', name: 'MacBook Built-in Microphone', kind: 'microphone', status: 'ready', default: true, level: 0.22 },
  { id: 'dev-mic-nd8', name: 'Neutrik ND8 (USB)', kind: 'microphone', status: 'ready', default: false, level: 0 },
  { id: 'dev-spk-studio', name: 'Studio Display Speakers', kind: 'speaker', status: 'ready', default: true },
  { id: 'dev-spk-airp', name: 'AirPods Max', kind: 'speaker', status: 'busy', default: false },
  { id: 'dev-cam', name: 'Continuity Camera', kind: 'camera', status: 'unavailable', default: false },
  { id: 'dev-dsp-1', name: 'Studio Display 27" · 5K', kind: 'display', status: 'ready', default: true },
  { id: 'dev-dsp-2', name: 'LG UltraFine · 4K', kind: 'display', status: 'ready', default: false },
];

/* ── Activity / notifications / permissions ───────────────────────────────── */

const activitySeeds: [ActivityKind, string, string, string][] = [
  ['task', 'Orchestrator Prime', 're-sequenced TITAN release train', '4 tasks moved'],
  ['tool', 'Infrastructure', 'ran `npm run typecheck`', '6 packages · clean · 41s'],
  ['file', 'Document Processor', 'OCR completed', 'lease-2024-signed.pdf → structured fields'],
  ['memory', 'HERCULES', 'wrote preference', '“brief lands 07:00, two-minute read first”'],
  ['security', 'Threat Monitor', 'blocked instruction in fetched page', 'prompt-injection pattern at offset 1,204'],
  ['agent', 'Key Art', 'requested approval', 'publish 6 hero candidates to brand store'],
  ['automation', 'Morning scan', 'completed', '4m 12s · 1 approval queued'],
  ['conversation', 'Comms Gatekeeper', 'held outbound mail', '2 drafts need signature'],
  ['task', 'Verifier', 'failed repro suite', 'audio dropout · tsk-021'],
  ['system', 'Router', 'engaged fallback', 'Iris Vision p95 5.2s → Nova X1'],
  ['file', 'Ingest Runner', 'indexed 1.2M tokens', 'code estate · 62%'],
  ['memory', 'Knowledge Warden', 'consolidated memory', '3 episodes → 1 fact · 4.1k tokens saved'],
  ['agent', 'sub:flaky-03', 'paused', 'waiting on CI quota'],
  ['task', 'Ledger Clerk', 'matched 11 of 13 card lines', '2 receipts missing'],
  ['security', 'Operator', 'granted `calendar.write`', 'role: Scheduler · audited'],
  ['automation', 'Spend guard', 'downgraded 4 roles', 'projected $4,380 > cap $4,200'],
  ['conversation', 'Chief of Staff', 'escalated decision', 'audit retention 90d'],
  ['tool', 'Browser Operator', 'extracted pricing table', '3 plans · 7 columns'],
];

export const activityEvents: ActivityEvent[] = activitySeeds.map(([kind, actor, action, detail], i) => ({
  id: uid('act'),
  at: ago(i * randInt(3, 22) * MIN + randInt(1, 40) * 1000),
  kind,
  actor,
  action,
  target: detail,
  detail,
  sensitive: kind === 'security' || kind === 'memory',
  traceId: `tr-${(hash2(i) % 1e6).toString(16).padStart(6, '0')}`,
}));

function hash2(n: number) {
  return Math.abs(Math.round(Math.sin(n * 12.9898) * 43758.5453)) % 1000000;
}

export const notices: Notice[] = [
  {
    id: 'not-1',
    at: ago(6 * MIN),
    severity: 'critical',
    title: 'Approval needed · audit retention 90 days',
    body: 'Compliance Auditor can bind the SOC2 evidence chain if logs stay hot for 90 days. Cost +$34/mo, one extra review loop.',
    source: 'AEGIS',
    read: false,
    actionable: true,
    actions: [
      { id: 'approve', label: 'Approve', kind: 'approve' },
      { id: 'deny', label: 'Deny', kind: 'deny' },
      { id: 'open', label: 'Open task', kind: 'open' },
    ],
    related: { kind: 'task', id: 'tsk-004' },
  },
  {
    id: 'not-2',
    at: ago(18 * MIN),
    severity: 'warning',
    title: 'Render node 02 out of VRAM',
    body: 'Video Editor failed on task “Hero film v1 storyboard”. Labour pool scaled to zero; retry queued for 09:00.',
    source: 'Creative',
    read: false,
    actionable: true,
    actions: [
      { id: 'retry', label: 'Retry now', kind: 'retry' },
      { id: 'snooze', label: '1h', kind: 'snooze' },
    ],
    related: { kind: 'task', id: 'tsk-018' },
  },
  {
    id: 'not-3',
    at: ago(41 * MIN),
    severity: 'info',
    title: 'Morning scan complete',
    body: '3 signals promoted to the brief. 0 blockers on your day.',
    source: 'Automation',
    read: false,
    actionable: true,
    actions: [{ id: 'open', label: 'Open brief', kind: 'open' }],
    related: { kind: 'automation', id: 'aut-morning-scan' },
  },
  {
    id: 'not-4',
    at: ago(2 * HOUR),
    severity: 'success',
    title: 'Northwind clause 4.2 signed',
    body: 'Retention rewrite accepted at 19:41. Contract blocker cleared without you.',
    source: 'Comms',
    read: true,
    actionable: false,
  },
  {
    id: 'not-5',
    at: ago(3 * HOUR),
    severity: 'warning',
    title: 'Projected spend over cap',
    body: 'Router downgraded 4 roles from frontier to balanced. Projected $4,380 vs cap $4,200.',
    source: 'Spend guard',
    read: false,
    actionable: true,
    actions: [{ id: 'open', label: 'Open analytics', kind: 'open' }],
  },
  {
    id: 'not-6',
    at: ago(5 * HOUR),
    severity: 'info',
    title: 'Key Art wants to publish 6 hero candidates',
    body: 'Destination: brand store. Files are in /hercules/workspace/media/hero-candidates.',
    source: 'Creative',
    read: false,
    actionable: true,
    actions: [
      { id: 'approve', label: 'Allow', kind: 'approve' },
      { id: 'deny', label: 'Deny', kind: 'deny' },
    ],
  },
  {
    id: 'not-7',
    at: ago(9 * HOUR),
    severity: 'info',
    title: 'New source available',
    body: 'arxiv: “Agentic scheduling under budget” matches 3 of your standing research intents.',
    source: 'Research',
    read: true,
    actionable: false,
  },
];

export const approvalRequests: ApprovalRequest[] = [
  {
    id: 'apr-1',
    requestedBy: 'Compliance Auditor',
    agentId: 'agt-auditor',
    action: 'Apply retention policy “hot 90d / cold 2y”',
    reason: 'Binds the SOC2 evidence chain. Irreversible for cold data; costs $34/mo.',
    risk: 'high',
    command: 'policy.apply --name retention-draft-3 --confirm',
    target: '/hercules/policies/retention-draft-3.md',
    createdAt: ago(6 * MIN),
  },
  {
    id: 'apr-2',
    requestedBy: 'Key Art',
    agentId: 'agt-image-artist',
    action: 'Publish 6 generated hero images to brand store',
    reason: 'Outbound brand surface. 2 of 6 contain third-party UI shapes worth a look.',
    risk: 'medium',
    target: '/hercules/workspace/media/hero-candidates',
    createdAt: ago(5 * HOUR),
  },
  {
    id: 'apr-3',
    requestedBy: 'Infrastructure',
    agentId: 'agt-devops',
    action: 'Restart GPU node 02 and re-queue 14 render jobs',
    reason: 'Node is leaking VRAM. Restart drops in-flight renders; recovery takes ~6 min.',
    risk: 'high',
    command: 'node restart gpu-02 --requeue --drain 300s',
    createdAt: ago(22 * MIN),
  },
  {
    id: 'apr-4',
    requestedBy: 'Browser Operator',
    agentId: 'agt-browser-operator',
    action: 'Submit the signed DPA form on portal.northwind.example',
    reason: 'Site scope “submit” is set to Ask. Form contains a legal signature field.',
    risk: 'critical',
    target: 'https://portal.northwind.example/agreements/4417/sign',
    createdAt: ago(2 * HOUR),
  },
  {
    id: 'apr-5',
    requestedBy: 'Lab Scout',
    agentId: 'agt-lab-scout',
    action: 'Install unreviewed package `fluxio@0.4.2-rc1` in sandbox 04',
    reason: 'Experimental. Package has no maintainers and 2 open advisories.',
    risk: 'critical',
    command: 'npm i fluxio@0.4.2-rc1 --prefix /sandbox/04',
    createdAt: ago(1 * HOUR),
  },
];

const scopeSeeds: [PermissionScope['id'], string, PermissionScope['group'], string, RiskLevel, boolean, AgentTier[]][] = [
  ['filesystem.read', 'Read files', 'files', 'Read anything inside the estate workspace and indexed stores.', 'medium', true, ['ceo', 'orchestrator', 'department', 'specialist', 'subagent']],
  ['filesystem.write', 'Write files', 'files', 'Create or modify files inside allowed roots. Never applies to policy files.', 'high', true, ['ceo', 'orchestrator', 'department', 'specialist']],
  ['filesystem.trash', 'Delete / trash files', 'files', 'Moves to quarantine with a 30-day restore window.', 'critical', false, ['ceo']],
  ['network.read', 'Read the web', 'network', 'Fetch public pages and feeds for research.', 'low', true, ['ceo', 'orchestrator', 'department', 'specialist', 'subagent', 'labor']],
  ['network.act', 'Act on the web', 'network', 'Click, type and submit forms in a sandboxed browser profile.', 'critical', true, ['ceo', 'orchestrator']],
  ['terminal.exec', 'Run commands', 'system', 'Execute shell commands. Restricted roots only; always audited.', 'critical', true, ['ceo', 'orchestrator', 'department']],
  ['system.process', 'Manage processes', 'system', 'Start/stop local services the estate depends on.', 'high', false, ['ceo']],
  ['system.sleep', 'Prevent sleep', 'system', 'Keep the machine awake while a mission is running.', 'low', true, ['ceo', 'orchestrator']],
  ['media.control', 'Control media', 'media', 'Play, pause, queue and duck media while speaking.', 'low', true, ['ceo', 'orchestrator', 'department']],
  ['input.microphone', 'Use microphone', 'media', 'Capture audio only while an armed listening state is visible.', 'critical', true, ['ceo', 'orchestrator']],
  ['input.screen', 'Read screen', 'system', 'Capture screen regions for context awareness.', 'high', false, ['ceo']],
  ['memory.write', 'Write memory', 'data', 'Persist facts, preferences and decisions to long-term memory.', 'medium', true, ['ceo', 'orchestrator', 'department', 'specialist']],
  ['memory.delete', 'Delete memory', 'data', 'Hard-remove a memory record and its index entries.', 'high', false, ['ceo']],
  ['email.read', 'Read mail', 'communication', 'Read inbox contents for triage; never forwards silently.', 'medium', true, ['ceo', 'orchestrator', 'department', 'specialist']],
  ['email.send', 'Send mail', 'communication', 'Outbound mail from your address.', 'critical', true, ['ceo', 'orchestrator']],
  ['chat.send', 'Send chat', 'communication', 'Post to channels on your behalf.', 'high', true, ['ceo', 'orchestrator']],
  ['calendar.write', 'Move calendar', 'communication', 'Create, reschedule or decline events.', 'medium', true, ['ceo', 'orchestrator', 'department']],
  ['secrets.read', 'Use secret handles', 'data', 'Reference vault handles; values never enter model context.', 'critical', true, ['ceo']],
  ['spend.api', 'Spend API budget', 'ai', 'Call paid models up to the department budget and monthly cap.', 'high', true, ['ceo', 'orchestrator', 'department', 'specialist', 'subagent']],
  ['agent.spawn', 'Recruit sub-agents', 'ai', 'Create labour agents under the requesting role’s scopes.', 'medium', true, ['ceo', 'orchestrator', 'department']],
  ['automation.edit', 'Edit automations', 'ai', 'Change schedules, steps and approval gates.', 'high', true, ['ceo', 'orchestrator']],
];

export const permissionScopes: PermissionScope[] = scopeSeeds.map(([id, label, group, description, risk, granted, holders]) => ({
  id,
  label,
  group,
  description,
  risk,
  granted,
  holders,
  audited: true,
}));

export const secretHandles: SecretHandle[] = [
  { id: 'sec-nova', label: 'Nova Labs key', service: 'api.nova-labs.dev', masked: 'nvk_live_••••••••••••4f2a', vault: 'os-keychain', lastUsed: ago(20 * MIN), scope: 'chat, tools' },
  { id: 'sec-gh', label: 'GitHub app token', service: 'github.com/hercules-bot', masked: 'ghs_••••••••••••••••7b1c', vault: 'os-keychain', lastUsed: ago(41 * MIN), scope: 'repo, checks' },
  { id: 'sec-chroma', label: 'Chroma key', service: 'api.chroma.dev', masked: 'chr_••••••••••••0e99', vault: 'encrypted-store', lastUsed: ago(2 * HOUR), scope: 'image, video' },
  { id: 'sec-bank', label: 'Bank feed (read-only)', service: 'ledger.example', masked: 'bk_••••••••••••••a3', vault: 'env', lastUsed: ago(5 * HOUR), scope: 'read-only' },
];

export const auditEntries: AuditEntry[] = [
  { id: 'aud-1', at: ago(3 * MIN), actor: 'Threat Monitor', action: 'quarantine.content', outcome: 'denied', target: 'page:arxiv.org/abs/2608.11442', note: 'Instruction-like text detected in fetched page; kept as data.', traceId: 'tr-91f2aa' },
  { id: 'aud-2', at: ago(12 * MIN), actor: 'Operator', action: 'grant.scope', outcome: 'granted', target: 'filesystem.write → role:Knowledge Engineer', note: 'Requested by Knowledge Warden for dedupe pass.', traceId: 'tr-91f2ab' },
  { id: 'aud-3', at: ago(26 * MIN), actor: 'Browser Operator', action: 'network.act', outcome: 'denied', target: 'portal.northwind.example/agreements/4417/sign', note: 'Site scope submit = ask. Approval apr-4 raised instead.', traceId: 'tr-91f2ac' },
  { id: 'aud-4', at: ago(48 * MIN), actor: 'Ledger Clerk', action: 'files.read', outcome: 'executed', target: 'bank feed · 3 cards', note: '11 of 13 lines matched; no credentials touched.', traceId: 'tr-91f2ad' },
  { id: 'aud-5', at: ago(70 * MIN), actor: 'Lab Scout', action: 'install.package', outcome: 'denied', target: 'fluxio@0.4.2-rc1', note: 'Unreviewed package with open advisories. Awaiting operator.', traceId: 'tr-91f2ae' },
  { id: 'aud-6', at: ago(96 * MIN), actor: 'Spend guard', action: 'router.downgrade', outcome: 'executed', target: '4 roles → balanced', note: 'Projected monthly spend exceeded cap.', traceId: 'tr-91f2af' },
  { id: 'aud-7', at: ago(2 * HOUR), actor: 'Comms Gatekeeper', action: 'email.send', outcome: 'executed', target: '3 recipients', note: 'Sent under standing approval; 1 held for signature.', traceId: 'tr-91f2b0' },
  { id: 'aud-8', at: ago(3 * HOUR), actor: 'Operator', action: 'revoke.scope', outcome: 'revoked', target: 'input.screen → all tiers', note: 'Screen awareness disabled.', traceId: 'tr-91f2b1' },
  { id: 'aud-9', at: ago(5 * HOUR), actor: 'Key Art', action: 'media.publish', outcome: 'denied', target: 'brand store · 6 assets', note: 'Approval required for outbound brand surface.', traceId: 'tr-91f2b2' },
  { id: 'aud-10', at: ago(7 * HOUR), actor: 'Verifier', action: 'terminal.exec', outcome: 'executed', target: 'npm test -- --repro', note: 'Exit 1 · tsk-021 filed automatically.', traceId: 'tr-91f2b3' },
  { id: 'aud-11', at: ago(9 * HOUR), actor: 'Ingest Runner', action: 'memory.write', outcome: 'granted', target: 'index:code estate', note: '1.2M tokens · dedupe gate open.', traceId: 'tr-91f2b4' },
];

/* ── Media ───────────────────────────────────────────────────────────────── */

export const mediaTracks: MediaTrack[] = [
  { id: 'trk-1', title: 'Cold Forge', artist: 'Ariel Vance', album: 'Machine Hours', durationSec: 244, artworkHue: 192, source: 'local' },
  { id: 'trk-2', title: 'Signal Bloom', artist: 'Kaeru', album: 'Nightbus Theory', durationSec: 208, artworkHue: 288, source: 'spotify' },
  { id: 'trk-3', title: 'Atlas Weight', artist: 'Nord Field', album: 'Heavy Quiet', durationSec: 331, artworkHue: 44, source: 'local' },
  { id: 'trk-4', title: 'Deep Work (Extended)', artist: 'Mono Lab', album: 'Focus Cycles Vol. 2', durationSec: 402, artworkHue: 150, source: 'spotify' },
  { id: 'trk-5', title: 'Terminal Sun', artist: 'Ilyra', album: 'After The Launch', durationSec: 187, artworkHue: 12, source: 'radio' },
  { id: 'trk-6', title: 'Autonomic', artist: 'Vantablack Choir', album: 'Systems', durationSec: 276, artworkHue: 220, source: 'local' },
  { id: 'trk-7', title: 'Grain of Light', artist: 'Sable', album: 'Aperture', durationSec: 231, artworkHue: 330, source: 'youtube' },
  { id: 'trk-8', title: 'Slow Orbit', artist: 'Ariel Vance', album: 'Machine Hours', durationSec: 359, artworkHue: 200, source: 'spotify' },
];

/* ── Voice ───────────────────────────────────────────────────────────────── */

export const voiceProfiles: VoiceProfile[] = [
  { id: 'voi-hollow', name: 'Hollow', engine: 'local', gender: 'masculine', speakingRate: 0.96, pitch: -2, privacyNote: 'Runs entirely on-device · no audio leaves the machine', latencyMs: 120 },
  { id: 'voi-verge', name: 'Verge', engine: 'local', gender: 'neutral', speakingRate: 1.04, pitch: 0, privacyNote: 'On-device · slightly brighter, tuned for short callouts', latencyMs: 110 },
  { id: 'voi-aria', name: 'Aria', engine: 'cloud', gender: 'feminine', speakingRate: 1, pitch: 1, privacyNote: 'Cloud synthesis · text only, never transcribed backwards', latencyMs: 240 },
  { id: 'voi-quartermaster', name: 'Quartermaster', engine: 'cloud', gender: 'masculine', speakingRate: 0.9, pitch: -4, privacyNote: 'Cloud synthesis · cinematic register for long briefings', latencyMs: 260 },
];

export const simulatedUtterances = [
  'Hercules, give me the state of Titan and anything that needs my signature.',
  'Move everything non-critical off Thursday afternoon.',
  'What did the research team find about agent operating systems this week?',
  'Draft a two line reply to Northwind and hold it for my approval.',
  'Scale down the render farm and tell me what it costs us.',
  'Show me what the agents touched in my files in the last hour.',
];

/* ── Analytics ───────────────────────────────────────────────────────────── */

export const analyticsSeries = {
  label: Array.from({ length: 30 }, (_, i) => new Date(Date.now() - (29 - i) * DAY).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })),
  cost: series(30, 128, 46, 1.6),
  tokens: series(30, 940_000, 240_000, 9_000),
  tasks: series(30, 14, 6, 0.15),
  latency: series(30, 610, 130, -3.5),
};

export const analyticsByDepartment = departments.map((d) => ({
  id: d.id,
  name: d.name,
  costUsd: Math.round(rand(40, 620)),
  tasks: randInt(3, 41),
  successRate: Number(rand(0.72, 0.99).toFixed(2)),
}));

export const analyticsByModel = [
  { id: 'mdl-nova-x1', name: 'Nova X1', share: 0.41, costUsd: 1_184 },
  { id: 'mdl-nova-lite', name: 'Nova Lite', share: 0.22, costUsd: 196 },
  { id: 'mdl-quill-70b', name: 'Quill 70B (local)', share: 0.19, costUsd: 0 },
  { id: 'mdl-pigment', name: 'Pigment 3', share: 0.11, costUsd: 288 },
  { id: 'mdl-iris-v', name: 'Iris Vision', share: 0.05, costUsd: 61 },
  { id: 'mdl-motion', name: 'Motion Studio', share: 0.02, costUsd: 214 },
];

export const analyticsByTool = [
  { name: 'terminal.exec', calls: 1_842, failureRate: 0.06 },
  { name: 'browser.read', calls: 3_104, failureRate: 0.03 },
  { name: 'files.read', calls: 9_215, failureRate: 0.004 },
  { name: 'knowledge.query', calls: 2_401, failureRate: 0.02 },
  { name: 'memory.write', calls: 611, failureRate: 0.01 },
  { name: 'email.send', calls: 128, failureRate: 0.11 },
  { name: 'image-gen', calls: 402, failureRate: 0.09 },
  { name: 'vector.reindex', calls: 44, failureRate: 0.05 },
];
