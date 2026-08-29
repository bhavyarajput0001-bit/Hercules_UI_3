/**
 * HERCULES · command registry
 * The single source of truth for everything summonable from the command bar.
 * Built from live store state, so results are real entities, not decoration.
 */
import { actions, ui, type AppState } from '@/state/hercules';
import { SCREENS } from '@/state/nav';
import { fuzzyScore } from '@/services/mock/helpers';

export interface Command {
  id: string;
  group: 'Navigate' | 'Act' | 'Agents' | 'Tasks' | 'Projects' | 'Memory' | 'Files' | 'Automations' | 'Ask' | 'Recent';
  label: string;
  hint?: string;
  icon: string;
  tone?: 'accent' | 'warn' | 'danger' | 'success' | 'dim';
  keywords?: string;
  badge?: string;
  run: () => void | Promise<void>;
  shortcut?: string;
}

export function buildCommands(state: AppState): Command[] {
  const cmds: Command[] = [];

  for (const s of SCREENS) {
    cmds.push({
      id: `nav:${s.id}`,
      group: 'Navigate',
      label: s.title,
      hint: s.blurb,
      icon: s.icon,
      keywords: `${s.keywords.join(' ')} ${s.group}`,
      shortcut: s.hotkey !== undefined ? `⌘${s.hotkey === 0 ? 0 : s.hotkey}` : undefined,
      run: () => ui.go(s.id),
    });
  }

  cmds.push(
    { id: 'act:voice', group: 'Act', label: 'Start voice capture', hint: 'Armed listening — nothing is sent until you release', icon: 'mic', shortcut: '⌘⇧Space', run: () => void actions.toggleVoice(true) },
    { id: 'act:briefing', group: 'Act', label: 'Give me a status briefing', hint: 'Core answers with plan + blockers', icon: 'spark', run: () => void actions.sendPrompt('Give me a briefing on what is live and anything that needs my signature.') },
    { id: 'act:fresh-thread', group: 'Act', label: 'New thread', hint: 'Clear the conversation context', icon: 'plus', run: () => { ui.go('core'); ui.flashFor('chat'); } },
    { id: 'act:freeze', group: 'Act', label: 'Freeze the estate', hint: 'Park every agent at a safe boundary', icon: 'lock', tone: 'warn', run: () => void actions.freezeEstate() },
    { id: 'act:stand-down', group: 'Act', label: 'Stand the core down', hint: 'Agents parked, state preserved', icon: 'power', tone: 'danger', run: () => void actions.standDown() },
    { id: 'act:wake', group: 'Act', label: 'Wake the core', hint: 'Re-run boot calibration', icon: 'bolt', run: () => void actions.wakeCore() },
    { id: 'act:media-play', group: 'Act', label: state.media.playing ? 'Pause media' : 'Play media', icon: state.media.playing ? 'pause' : 'play', run: () => void actions.media('toggle') },
    { id: 'act:media-next', group: 'Act', label: 'Next track', icon: 'next', run: () => void actions.media('next') },
    { id: 'act:inspector', group: 'Act', label: 'Toggle inspector', hint: 'Show details for the selected entity', icon: 'layers', shortcut: '⌘I', run: () => ui.setInspector(!state.inspectorOpen) },
    { id: 'act:help', group: 'Act', label: 'Keyboard map & shortcuts', icon: 'command', shortcut: '?', run: () => ui.setHelp(true) },
    { id: 'act:run-morning-scan', group: 'Act', label: 'Run “Morning scan” now', icon: 'automation', run: () => void actions.runAutomation('aut-morning-scan') },
    { id: 'act:consolidate', group: 'Act', label: 'Consolidate memory', hint: 'Merge episodes, reclaim tokens', icon: 'memory', run: () => void actions.consolidateMemory() },
    { id: 'act:export-activity', group: 'Act', label: 'Export activity log', icon: 'download', run: () => void state.services.activity.export('csv').then(() => ui.flashFor('activity')) },
    { id: 'act:attack-injection', group: 'Act', label: 'Simulate prompt-injection attack', hint: 'Red-team exercise, audited', icon: 'shield', tone: 'danger', run: () => void actions.simulateAttack('prompt-injection') },
    { id: 'act:new-task', group: 'Act', label: 'File a task…', hint: 'Opens the task composer', icon: 'task', run: () => { ui.go('tasks'); ui.flashFor('tasks.new'); } },
    { id: 'act:new-automation', group: 'Act', label: 'Create an automation…', icon: 'automation', run: () => { ui.go('automations'); ui.flashFor('automations.new'); } },
    { id: 'act:new-agent', group: 'Act', label: 'Recruit an agent…', icon: 'agent', run: () => { ui.go('agents'); ui.flashFor('agents.new'); } },
  );

  for (const a of state.approvals) {
    cmds.push({
      id: `approve:${a.id}`,
      group: 'Act',
      label: `Approve · ${a.action}`,
      hint: `${a.requestedBy} · ${a.risk} risk`,
      icon: 'shield',
      tone: a.risk === 'critical' ? 'danger' : 'warn',
      keywords: 'approval signature gate',
      run: () => void actions.respondApproval(a.id, true),
    });
    cmds.push({
      id: `deny:${a.id}`,
      group: 'Act',
      label: `Deny · ${a.action}`,
      hint: `${a.requestedBy} will stand down`,
      icon: 'close',
      tone: 'dim',
      run: () => void actions.respondApproval(a.id, false),
    });
  }

  for (const a of state.agents) {
    cmds.push({
      id: `agent:${a.id}`,
      group: 'Agents',
      label: a.name,
      hint: `${a.status} · ${a.load}% load`,
      icon: a.tier === 'labor' || a.tier === 'subagent' ? 'bolt' : 'agent',
      tone: a.status === 'blocked' || a.status === 'error' ? 'danger' : a.status === 'awaiting-approval' ? 'warn' : 'accent',
      badge: a.status,
      keywords: `${a.roleId} ${a.tier} ${a.task}`,
      run: () => {
        ui.go('agents');
        ui.select({ kind: 'agent', id: a.id, label: a.name });
      },
    });
    if (a.status === 'working' || a.status === 'thinking') {
      cmds.push({ id: `agent-pause:${a.id}`, group: 'Agents', label: `Pause ${a.name}`, icon: 'pause', tone: 'warn', run: () => void actions.pauseAgent(a.id) });
    }
    if (a.status === 'idle' || a.status === 'blocked' || a.status === 'error') {
      cmds.push({ id: `agent-resume:${a.id}`, group: 'Agents', label: `Resume ${a.name}`, icon: 'play', run: () => void actions.resumeAgent(a.id) });
    }
  }

  for (const t of state.tasks.filter((x) => x.status !== 'done' && x.status !== 'cancelled').slice(0, 24)) {
    cmds.push({
      id: `task:${t.id}`,
      group: 'Tasks',
      label: t.title,
      hint: `${t.status} · ${t.priority.toUpperCase()} · ${t.progress}%`,
      icon: 'task',
      tone: t.status === 'blocked' ? 'danger' : t.status === 'awaiting-approval' ? 'warn' : 'accent',
      keywords: `${t.tags.join(' ')} ${t.status}`,
      run: () => {
        ui.go('tasks');
        ui.select({ kind: 'task', id: t.id, label: t.title });
      },
    });
  }

  return cmds;
}

/** Extra groups that need async services (memory + files + automations). */
export async function buildDeferredCommands(state: AppState): Promise<Command[]> {
  const out: Command[] = [];
  const [mem, files, autos, projects] = await Promise.all([
    state.services.memory.list().catch(() => []),
    state.services.files.search('').catch(() => []),
    state.services.automation.list().catch(() => []),
    state.services.projects.list().catch(() => []),
  ]);
  for (const m of mem.slice(0, 40)) {
    out.push({
      id: `memory:${m.id}`,
      group: 'Memory',
      label: m.title,
      hint: `${m.kind} · confidence ${Math.round(m.confidence * 100)}%`,
      icon: 'memory',
      tone: 'dim',
      keywords: `${m.tags.join(' ')} ${m.body.slice(0, 60)}`,
      run: () => {
        ui.go('memory');
        ui.select({ kind: 'memory', id: m.id, label: m.title });
      },
    });
  }
  for (const f of files.slice(0, 24)) {
    out.push({
      id: `file:${f.id}`,
      group: 'Files',
      label: f.name,
      hint: f.path,
      icon: f.name.match(/\.(png|jpg|jpeg|webp)$/) ? 'image' : 'file',
      tone: 'dim',
      keywords: f.path,
      run: () => {
        ui.go('files');
        ui.select({ kind: 'file', id: f.id, label: f.path });
      },
    });
  }
  for (const a of autos) {
    out.push({
      id: `automation:${a.id}`,
      group: 'Automations',
      label: a.name,
      hint: `${a.enabled ? 'armed' : 'paused'} · ${a.trigger.label}`,
      icon: 'automation',
      tone: a.enabled ? 'accent' : 'dim',
      keywords: `${a.tags.join(' ')} ${a.description}`,
      run: () => {
        ui.go('automations');
        ui.select({ kind: 'automation', id: a.id, label: a.name });
      },
    });
    out.push({ id: `automation-run:${a.id}`, group: 'Automations', label: `Run “${a.name}” now`, icon: 'play', tone: 'warn', run: () => void actions.runAutomation(a.id) });
  }
  for (const p of projects) {
    out.push({
      id: `project:${p.id}`,
      group: 'Projects',
      label: p.name,
      hint: `${p.status} · ${p.progress}%`,
      icon: 'project',
      keywords: `${p.codename} ${p.goal}`,
      run: () => {
        ui.go('projects');
        ui.select({ kind: 'project', id: p.id, label: p.name });
      },
    });
  }
  return out;
}

export function rankCommands(query: string, cmds: Command[]): Command[] {
  const q = query.trim();
  if (!q) {
    const order: Command['group'][] = ['Act', 'Navigate', 'Memory', 'Tasks', 'Agents', 'Automations', 'Projects', 'Files'];
    return [...cmds].sort((a, b) => order.indexOf(a.group) - order.indexOf(b.group)).slice(0, 14);
  }
  return cmds
    .map((c) => ({ c, s: Math.max(fuzzyScore(q, c.label), fuzzyScore(q, `${c.hint ?? ''} ${c.keywords ?? ''}`) * 0.8, fuzzyScore(q, c.group) * 0.5) }))
    .filter((x) => x.s > 0.04)
    .sort((a, b) => b.s - a.s)
    .slice(0, 24)
    .map((x) => x.c);
}
