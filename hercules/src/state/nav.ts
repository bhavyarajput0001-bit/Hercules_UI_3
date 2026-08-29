/**
 * HERCULES · navigation registry
 * One list drives the rail, the router, the command bar, the keyboard map and
 * the breadcrumb. Screens never hardcode their own titles.
 */
export type ScreenId =
  | 'core'
  | 'command-center'
  | 'agents'
  | 'departments'
  | 'tasks'
  | 'projects'
  | 'memory'
  | 'files'
  | 'knowledge'
  | 'automations'
  | 'browser'
  | 'terminal'
  | 'system'
  | 'analytics'
  | 'activity'
  | 'notifications'
  | 'settings'
  | 'permissions'
  | 'media';

export interface ScreenDef {
  id: ScreenId;
  label: string;
  title: string;
  group: 'Command' | 'Work' | 'Estate' | 'System';
  icon: string;
  blurb: string;
  keywords: string[];
  /** ⌘-number quick jump (1-based, 0 = none) */
  hotkey?: number;
}

export const SCREENS: ScreenDef[] = [
  { id: 'core', label: 'Core', title: 'HERCULES Core', group: 'Command', icon: 'core', blurb: 'The presence: hologram, live vitals, briefing and the command field.', keywords: ['home', 'overview', 'hologram', 'core', 'briefing'], hotkey: 1 },
  { id: 'command-center', label: 'Command', title: 'Command Center', group: 'Command', icon: 'command', blurb: 'One screen for intent, dispatch and live mission control.', keywords: ['console', 'dispatch', 'mission', 'control'], hotkey: 2 },
  { id: 'agents', label: 'Agents', title: 'Agent Estate', group: 'Command', icon: 'agent', blurb: 'Every agent, sub-agent and labour unit: status, load, steer, retire.', keywords: ['agents', 'subagents', 'workforce', 'labour'], hotkey: 3 },
  { id: 'departments', label: 'Departments', title: 'Departments', group: 'Command', icon: 'department', blurb: 'The org chart of intelligence: missions, budgets, throughput.', keywords: ['org', 'teams', 'departments', 'structure'], hotkey: 4 },
  { id: 'tasks', label: 'Tasks', title: 'Task Engine', group: 'Work', icon: 'task', blurb: 'Kanban of everything agents are doing, blocked or awaiting signature.', keywords: ['tasks', 'kanban', 'backlog', 'board'], hotkey: 5 },
  { id: 'projects', label: 'Projects', title: 'Projects', group: 'Work', icon: 'project', blurb: 'Missions, milestones, risk and spend per outcome.', keywords: ['projects', 'missions', 'milestones'], hotkey: 6 },
  { id: 'memory', label: 'Memory', title: 'Long-term Memory', group: 'Estate', icon: 'memory', blurb: 'Facts, preferences, decisions and episodes — editable and inspectable.', keywords: ['memory', 'facts', 'preferences', 'notes'], hotkey: 7 },
  { id: 'files', label: 'Files', title: 'File System', group: 'Estate', icon: 'file', blurb: 'The agent-visible workspace: tree, search, preview, watch, index.', keywords: ['files', 'workspace', 'folders', 'documents'], hotkey: 8 },
  { id: 'knowledge', label: 'Knowledge', title: 'Knowledge Estate', group: 'Estate', icon: 'knowledge', blurb: 'Sources, index health and a retrieval sandbox you can trust.', keywords: ['knowledge', 'rag', 'index', 'sources', 'retrieval'], hotkey: 9 },
  { id: 'automations', label: 'Automations', title: 'Automations & Workflows', group: 'Estate', icon: 'automation', blurb: 'Standing behaviours, triggers, run history and approval gates.', keywords: ['automation', 'workflow', 'cron', 'schedule', 'pipeline'], hotkey: 0 },
  { id: 'browser', label: 'Browser', title: 'Browser Control', group: 'Estate', icon: 'browser', blurb: 'Agent-driven pages, captured content, per-site scopes.', keywords: ['browser', 'web', 'scrape', 'tabs', 'safari'], hotkey: undefined },
  { id: 'terminal', label: 'Terminal', title: 'Terminal', group: 'Estate', icon: 'terminal', blurb: 'A real shell surface with HERCULES verbs; every command audited.', keywords: ['terminal', 'shell', 'zsh', 'cli', 'commands'], hotkey: undefined },
  { id: 'system', label: 'System', title: 'System Control', group: 'System', icon: 'system', blurb: 'Hardware, processes, devices, integrations, power policy.', keywords: ['system', 'cpu', 'gpu', 'memory', 'devices', 'integrations'], hotkey: undefined },
  { id: 'analytics', label: 'Analytics', title: 'Analytics', group: 'System', icon: 'analytics', blurb: 'Tokens, cost, latency, success — by department, model and tool.', keywords: ['analytics', 'metrics', 'cost', 'spend', 'tokens'], hotkey: undefined },
  { id: 'activity', label: 'Activity', title: 'Activity Stream', group: 'System', icon: 'activity', blurb: 'Everything the estate did, with traceIds you can follow.', keywords: ['activity', 'log', 'history', 'events'], hotkey: undefined },
  { id: 'notifications', label: 'Inbox', title: 'Notification Inbox', group: 'System', icon: 'bell', blurb: 'Approvals, alerts and digests — everything that asked for you.', keywords: ['notifications', 'inbox', 'approvals'], hotkey: undefined },
  { id: 'permissions', label: 'Trust', title: 'Permissions & Trust', group: 'System', icon: 'shield', blurb: 'Scopes, secret handles, audit log, threat simulation.', keywords: ['permissions', 'security', 'privacy', 'audit', 'scopes', 'secrets'], hotkey: undefined },
  { id: 'settings', label: 'Settings', title: 'Settings', group: 'System', icon: 'settings', blurb: 'Theme, voice, personality, router policy, boot, data & privacy.', keywords: ['settings', 'preferences', 'theme', 'config'], hotkey: undefined },
  { id: 'media', label: 'Media', title: 'Media Control', group: 'System', icon: 'media', blurb: 'Playback the core can command, queue and duck under speech.', keywords: ['media', 'music', 'player', 'spotify', 'volume'], hotkey: undefined },
];

export const screenDef = (id: ScreenId) => SCREENS.find((s) => s.id === id) ?? SCREENS[0]!;

export const isScreenId = (v: string): v is ScreenId => SCREENS.some((s) => s.id === v);

export const GROUPS: ScreenDef['group'][] = ['Command', 'Work', 'Estate', 'System'];

export function searchScreens(query: string): ScreenDef[] {
  const q = query.toLowerCase().trim();
  if (!q) return SCREENS;
  return SCREENS.filter((s) => `${s.label} ${s.title} ${s.blurb} ${s.keywords.join(' ')}`.toLowerCase().includes(q));
}
