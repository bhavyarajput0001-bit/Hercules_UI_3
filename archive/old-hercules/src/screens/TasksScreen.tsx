/**
 * HERCULES · Task engine
 * The board is where intent becomes scheduled work. Lanes are the real
 * lifecycle (including the approval gate and the failure state), cards are
 * draggable, and every drop calls the same service a screen-swapping would.
 */
import { useMemo, useState } from 'react';
import { Icon } from '@/components/Icon';
import { Button, Chip, IconButton, Meter, Row, Select, Spinner, StatusDot, TextInput, Toggle, cx } from '@/components/ui';
import { actions, store, toast, ui } from '@/state/hercules';
import { useAsync } from '@/hooks/useAsync';
import { formatNum, relativeTime } from '@/services/mock/helpers';
import type { Task, TaskPriority, TaskStatus } from '@/types/domain';

const LANES: { id: TaskStatus; label: string; tone: string }[] = [
  { id: 'backlog', label: 'Backlog', tone: 'dim' },
  { id: 'queued', label: 'Queued', tone: 'info' },
  { id: 'in-progress', label: 'In progress', tone: 'accent' },
  { id: 'awaiting-approval', label: 'At gate', tone: 'warn' },
  { id: 'blocked', label: 'Blocked', tone: 'danger' },
  { id: 'review', label: 'Review', tone: 'accent2' },
  { id: 'done', label: 'Closed', tone: 'success' },
];

export default function TasksScreen() {
  const tasks = store.use((s) => s.tasks);
  const agents = store.use((s) => s.agents);
  const flash = store.use((s) => s.flash);
  const rev = store.use((s) => s.rev);
  const selected = store.use((s) => s.selected);
  const services = store.get().services;
  const { data: projects } = useAsync(() => services.projects.list(), [rev.projects]);

  const [mode, setMode] = useState<'board' | 'list'>('board');
  const [query, setQuery] = useState('');
  const [dept, setDept] = useState<string>('');
  const [priority, setPriority] = useState<'' | TaskPriority>('');
  const [mine, setMine] = useState(false);
  const [composing, setComposing] = useState(false);
  const [dragging, setDragging] = useState<string | null>(null);
  const [overLane, setOverLane] = useState<TaskStatus | null>(null);

  const departments = useAsync(() => services.departments.list(), [rev.departments]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return tasks.filter((t) => {
      if (q && !`${t.title} ${t.objective} ${t.tags.join(' ')}`.toLowerCase().includes(q)) return false;
      if (dept && t.departmentId !== dept) return false;
      if (priority && t.priority !== priority) return false;
      if (mine && !(t.requiresApproval || t.status === 'awaiting-approval' || t.status === 'blocked' || t.status === 'review')) return false;
      return true;
    });
  }, [tasks, query, dept, priority, mine]);

  const byLane = useMemo(() => {
    const map = new Map<TaskStatus, Task[]>();
    for (const l of LANES) map.set(l.id, []);
    for (const t of filtered) {
      const key: TaskStatus = t.status === 'cancelled' ? 'done' : t.status;
      map.get(key)?.push(t);
    }
    return map;
  }, [filtered]);

  const overdue = tasks.filter((t) => t.status !== 'done' && t.elapsedMin > t.estimateMin * 1.5).length;
  const tokens = tasks.reduce((n, t) => n + t.events.length, 0);

  return (
    <div className="screen tasks-screen">
      <div className="tasks-toolbar">
        <div className="tasks-toolbar__left">
          <TextInput value={query} onChange={setQuery} placeholder="Search tasks…" icon="search" />
          <Select
            value={dept}
            onChange={setDept}
            options={[{ value: '', label: 'All departments' }, ...(departments.data ?? []).map((d) => ({ value: d.id, label: d.name }))]}
          />
          <Select
            value={priority}
            onChange={(v) => setPriority(v as TaskPriority | '')}
            options={[{ value: '', label: 'Any priority' }, { value: 'p0', label: 'P0 · now' }, { value: 'p1', label: 'P1 · this week' }, { value: 'p2', label: 'P2 · soon' }, { value: 'p3', label: 'P3 · parked' }]}
          />
          <Toggle checked={mine} onChange={setMine} label="Needs me" />
        </div>
        <div className="tasks-toolbar__right">
          <Chip size="sm" tone="dim" icon="task">{filtered.length} shown</Chip>
          {overdue > 0 && <Chip size="sm" tone="warn" icon="clock">{overdue} over estimate</Chip>}
          <Chip size="sm" tone="dim" icon="activity">{formatNum(tokens)} log entries</Chip>
          <div className="segmented segmented--sm">
            <button type="button" className={cx('segmented__item', mode === 'board' && 'is-active')} onClick={() => setMode('board')}>
              <Icon name="grid" size={11} /> Board
            </button>
            <button type="button" className={cx('segmented__item', mode === 'list' && 'is-active')} onClick={() => setMode('list')}>
              <Icon name="list" size={11} /> List
            </button>
          </div>
          <Button variant="solid" size="sm" icon="plus" onClick={() => setComposing(true)}>
            New task
          </Button>
        </div>
      </div>

      {mode === 'board' ? (
        <div className="board">
          {LANES.map((lane) => {
            const items = byLane.get(lane.id) ?? [];
            return (
              <section
                key={lane.id}
                className={cx('lane-col', overLane === lane.id && 'is-over', `lane-col--${lane.tone}`)}
                onDragOver={(e) => {
                  e.preventDefault();
                  setOverLane(lane.id);
                }}
                onDragLeave={() => setOverLane((l) => (l === lane.id ? null : l))}
                onDrop={(e) => {
                  e.preventDefault();
                  const id = e.dataTransfer.getData('text/task') || dragging;
                  setOverLane(null);
                  setDragging(null);
                  if (!id) return;
                  void actions.setTaskStatus(id, lane.id);
                  toast({
                    title: `Moved to ${lane.label}`,
                    body: lane.id === 'done' ? 'Accepted. Artifacts filed to ATLAS.' : lane.id === 'awaiting-approval' ? 'Agents will hold until you sign.' : 'Agents re-notified of the new state.',
                    severity: 'info',
                    ttlMs: 3_200,
                  });
                }}
              >
                <header className="lane-col__head">
                  <span className={`lane-col__dot dot--${lane.tone}`} />
                  <b>{lane.label}</b>
                  <span className="mono dim">{items.length}</span>
                  {lane.id === 'in-progress' && <span className="lane-col__flow" />}
                </header>
                <div className="lane-col__body">
                  {items.map((t) => (
                    <TaskCard
                      key={t.id}
                      task={t}
                      flash={!!flash[`task:${t.id}`]}
                      selected={selected?.kind === 'task' && selected.id === t.id}
                      agentName={agents.find((a) => a.id === t.assigneeAgentId)?.name}
                      projectName={projects?.find((p) => p.id === t.projectId)?.codename}
                      onDragStart={() => setDragging(t.id)}
                    />
                  ))}
                  {!items.length && <div className="lane-col__empty">drop here</div>}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <section className="hud__panel">
          <div className="hud__panel-body tasks-list">
            {filtered.map((t) => (
              <Row
                key={t.id}
                className={cx('trow', selected?.kind === 'task' && selected.id === t.id && 'is-active')}
                onClick={() => ui.select({ kind: 'task', id: t.id, label: t.title })}
                flash={!!flash[`task:${t.id}`]}
              >
                <StatusDot status={t.status} />
                <span className={cx('trow__prio', `is-${t.priority}`)}>{t.priority.toUpperCase()}</span>
                <div>
                  <b>{t.title}</b>
                  <span>
                    {agents.find((a) => a.id === t.assigneeAgentId)?.name ?? 'unassigned'} · {relativeTime(t.updatedAt)} · {t.tags.slice(0, 2).join(' / ')}
                  </span>
                </div>
                <span className="trow__prog">
                  <Meter value={t.progress} tone={t.status === 'blocked' ? 'danger' : 'accent'} height={3} />
                </span>
                <em className="mono">{t.progress}%</em>
                <span className="trow__tools">
                  {t.requiresApproval ? (
                    <IconButton icon="check" size="sm" title="Approve" tone="warn" onClick={() => void actions.approveTask(t.id, true)} />
                  ) : t.status === 'review' ? (
                    <IconButton icon="check" size="sm" title="Accept deliverable" onClick={() => void actions.setTaskStatus(t.id, 'done')} />
                  ) : null}
                  {t.status === 'in-progress' && <IconButton icon="pause" size="sm" title="Hold" onClick={() => void actions.setTaskStatus(t.id, 'blocked')} />}
                  {(t.status === 'failed' || t.status === 'blocked') && <IconButton icon="refresh" size="sm" title="Retry" onClick={() => void actions.retryTask(t.id)} />}
                </span>
              </Row>
            ))}
            {!filtered.length && <div className="dim" style={{ padding: 20, fontSize: 11.5 }}>No task matches that filter.</div>}
          </div>
          <footer className="hud__panel-foot">
            <span className="dim">Board lanes write through the same task service; drag a card to change state.</span>
            <span className="spacer" />
            <span className="mono dim">{tasks.length} tasks · {tasks.filter((t) => t.status === 'done').length} closed · {tasks.filter((t) => t.status === 'blocked').length} blocked</span>
          </footer>
        </section>
      )}

      {composing && <TaskComposer onClose={() => setComposing(false)} projects={projects ?? []} departments={departments.data ?? []} />}
      {!tasks.length && <Spinner />}
    </div>
  );
}

/* ── card ────────────────────────────────────────────────────────────────── */

function TaskCard({
  task,
  selected,
  flash,
  agentName,
  projectName,
  onDragStart,
}: {
  task: Task;
  selected: boolean;
  flash: boolean;
  agentName?: string;
  projectName?: string;
  onDragStart: () => void;
}) {
  const agents = store.use((s) => s.agents);
  const [menu, setMenu] = useState(false);
  return (
    <article
      className={cx('tcard', selected && 'is-selected', flash && 'is-flash', task.priority === 'p0' && 'is-p0')}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/task', task.id);
        onDragStart();
      }}
      onClick={() => ui.select({ kind: 'task', id: task.id, label: task.title })}
    >
      <header className="tcard__head">
        <span className={cx('tcard__prio', `is-${task.priority}`)}>{task.priority.toUpperCase()}</span>
        <span className="tcard__tags">
          {projectName && <span className="mono">{projectName}</span>}
          {task.tags.slice(0, 2).map((t) => (
            <em key={t}>{t}</em>
          ))}
        </span>
        <button type="button" className="tcard__menu" onClick={(e) => { e.stopPropagation(); setMenu((m) => !m); }}>
          <Icon name="dots" size={13} />
        </button>
      </header>
      <h4>{task.title}</h4>
      {task.status === 'in-progress' && <Meter value={task.progress} tone="accent" height={3} />}
      <footer className="tcard__foot">
        <span className="tcard__who">
          {agentName ? (
            <>
              <span className="avatar">{agentName.slice(0, 1)}</span>
              {agentName}
            </>
          ) : (
            <span className="dim">unassigned</span>
          )}
        </span>
        <span className="mono dim">{relativeTime(task.updatedAt)}</span>
      </footer>
      {task.requiresApproval && (
        <div className="tcard__gate">
          <Icon name="shield" size={11} /> {task.approvalReason ?? 'Needs your signature'}
          <span className="spacer" />
          <button type="button" onClick={(e) => { e.stopPropagation(); void actions.approveTask(task.id, true); }}>Approve</button>
          <button type="button" onClick={(e) => { e.stopPropagation(); void actions.approveTask(task.id, false); }}>Deny</button>
        </div>
      )}
      {menu && (
        <div className="tcard__dropdown" onClick={(e) => e.stopPropagation()}>
          <button type="button" onClick={() => { setMenu(false); void actions.retryTask(task.id); }}>
            <Icon name="refresh" size={12} /> Retry with backoff
          </button>
          <button type="button" onClick={() => { setMenu(false); void actions.assignTo(task.id, agents.find((a) => a.status === 'idle')?.id ?? task.assigneeAgentId ?? ''); }}>
            <Icon name="agent" size={12} /> Reassign to first idle agent
          </button>
          <button type="button" onClick={() => { setMenu(false); void actions.logOnTask(task.id, 'Operator flagged this for a fresh look.'); toast({ title: 'Note added', body: 'Agents will see it on their next read.', severity: 'success', ttlMs: 2_800 }); }}>
            <Icon name="spark" size={12} /> Add note
          </button>
          <button type="button" onClick={() => { setMenu(false); void actions.cancelTask(task.id); }}>
            <Icon name="close" size={12} /> Cancel task
          </button>
        </div>
      )}
    </article>
  );
}

/* ── composer ────────────────────────────────────────────────────────────── */

function TaskComposer({ onClose, projects, departments }: { onClose: () => void; projects: { id: string; name: string }[]; departments: { id: string; name: string }[] }) {
  const agents = store.use((s) => s.agents);
  const busy = store.use((s) => !!s.busy['tasks.create']);
  const [title, setTitle] = useState('');
  const [objective, setObjective] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('p1');
  const [projectId, setProjectId] = useState('');
  const [departmentId, setDepartmentId] = useState(departments[1]?.id ?? '');
  const [assignee, setAssignee] = useState(agents.find((a) => a.status === 'idle')?.id ?? '');
  const [estimate, setEstimate] = useState(90);

  return (
    <div className="scrim" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <header className="modal__head">
          <div>
            <span className="mono modal__eyebrow">TASK ENGINE</span>
            <h2>File a task</h2>
            <p>I route it, staff it and gate it. You only sign what needs signing.</p>
          </div>
          <IconButton icon="close" title="Close" onClick={onClose} />
        </header>
        <div className="modal__body">
          <div className="field">
            <div className="field__head"><label>Title</label></div>
            <TextInput value={title} onChange={setTitle} placeholder="Verify the voice latency claim before ship" />
          </div>
          <div className="field">
            <div className="field__head"><label>Objective / acceptance criteria</label></div>
            <TextInput value={objective} onChange={setObjective} placeholder="What is true when this is done" />
          </div>
          <div className="g2">
            <div className="field">
              <div className="field__head"><label>Priority</label></div>
              <Select value={priority} onChange={setPriority} options={[{ value: 'p0', label: 'P0 · now' }, { value: 'p1', label: 'P1 · this week' }, { value: 'p2', label: 'P2 · soon' }, { value: 'p3', label: 'P3 · parked' }]} />
            </div>
            <div className="field">
              <div className="field__head"><label>Estimate</label><span className="mono dim">{estimate}m</span></div>
              <input className="range" type="range" min={15} max={480} step={15} value={estimate} onChange={(e) => setEstimate(Number(e.target.value))} />
            </div>
            <div className="field">
              <div className="field__head"><label>Project</label></div>
              <Select value={projectId} onChange={setProjectId} options={[{ value: '', label: 'None' }, ...projects.map((p) => ({ value: p.id, label: p.name }))]} />
            </div>
            <div className="field">
              <div className="field__head"><label>Department</label></div>
              <Select value={departmentId} onChange={setDepartmentId} options={[{ value: '', label: 'Unassigned' }, ...departments.map((d) => ({ value: d.id, label: d.name }))]} />
            </div>
          </div>
          <div className="field">
            <div className="field__head"><label>Assign to</label></div>
            <div className="assignee-pick">
              {agents.slice(0, 8).map((a) => (
                <button key={a.id} type="button" className={cx('assignee', assignee === a.id && 'is-on')} onClick={() => setAssignee(assignee === a.id ? '' : a.id)}>
                  <StatusDot status={a.status} pulse={false} />
                  <span>{a.name}</span>
                  <em className="mono">{a.load}%</em>
                </button>
              ))}
            </div>
          </div>
        </div>
        <footer className="modal__foot">
          <span className="dim mono">{priority === 'p0' ? 'P0 auto-requires a signature' : 'auto-gating on outbound or destructive effects'}</span>
          <span className="spacer" />
          <Button onClick={onClose}>Cancel</Button>
          <Button
            variant="solid"
            icon="bolt"
            busy={busy}
            disabled={!title.trim()}
            onClick={() =>
              void actions
                .createTask({ title: title.trim(), objective: objective.trim() || title.trim(), priority, projectId: projectId || null, departmentId: departmentId || null, assigneeAgentId: assignee || null, estimateMin: estimate })
                .then(() => onClose())
            }
          >
            File & dispatch
          </Button>
        </footer>
      </div>
    </div>
  );
}
