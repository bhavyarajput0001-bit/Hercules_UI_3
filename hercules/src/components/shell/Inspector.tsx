/**
 * HERCULES · inspector
 * Context for whatever you last touched, with the actions that belong to it.
 * Open on any screen — it never blocks the primary surface.
 */
import { useState } from 'react';
import { Icon } from '@/components/Icon';
import { Button, Chip, IconButton, KV, Meter, Row, SectionLabel, StatusDot, Spinner, TextArea, cx } from '@/components/ui';
import { actions, store, toast, ui } from '@/state/hercules';
import { useAsync } from '@/hooks/useAsync';
import { formatBytes, relativeTime } from '@/services/mock/helpers';

export function Inspector() {
  const open = store.use((s) => s.inspectorOpen);
  const selected = store.use((s) => s.selected);
  const rev = store.use((s) => s.rev);
  if (!open || !selected) return null;
  return (
    <aside className="inspector" key={`${selected.kind}:${selected.id}`}>
      <header className="inspector__head">
        <div>
          <span className="inspector__kind">{selected.kind}</span>
          <h3>{selected.label ?? selected.id}</h3>
        </div>
        <div className="inspector__tools">
          <IconButton icon="close" size="sm" title="Close inspector (⌘I)" onClick={() => ui.setInspector(false)} />
        </div>
      </header>
      <div className="inspector__body" data-rev={Object.values(rev).join('-')}>
        <InspectorBody />
      </div>
    </aside>
  );
}

function InspectorBody() {
  const selected = store.use((s) => s.selected);
  if (!selected) return null;
  switch (selected.kind) {
    case 'agent':
      return <AgentInspector id={selected.id} />;
    case 'task':
      return <TaskInspector id={selected.id} />;
    case 'project':
      return <ProjectInspector id={selected.id} />;
    case 'department':
      return <DepartmentInspector id={selected.id} />;
    case 'memory':
      return <MemoryInspector id={selected.id} />;
    case 'automation':
      return <AutomationInspector id={selected.id} />;
    case 'file':
      return <FileInspector path={selected.id} />;
    case 'notice':
      return <NoticeInspector id={selected.id} />;
    default:
      return null;
  }
}

/* ── agent ───────────────────────────────────────────────────────────────── */

function AgentInspector({ id }: { id: string }) {
  const agent = store.use((s) => s.agents.find((a) => a.id === id) ?? null);
  const rev = store.use((s) => s.rev);
  const busy = store.use((s) => s.busy);
  const trace = useAsync(() => (agent ? store.get().services.agents.trace(id) : Promise.resolve([])), [id, agent?.status ?? 'gone', rev.agents]);
  const [guidance, setGuidance] = useState('');
  if (!agent) return <div className="inspector__missing">That agent is no longer in the registry.</div>;
  const model = MODEL_CACHE.find((m) => m.id === agent.modelId);
  const parent = store.get().agents.find((a) => a.id === agent.parentId);

  return (
    <>
      <div className="inspector__hero">
        <StatusDot status={agent.status} />
        <div>
          <b>{agent.name}</b>
          <span>
            {agent.tier} · {agent.status}
            {parent ? ` · under ${parent.name}` : ' · reports to you'}
          </span>
        </div>
      </div>

      <Meter value={agent.load} label="Compute load" tone={agent.load > 85 ? 'warn' : 'accent'} />
      <Meter value={agent.autonomy * 100} label="Autonomy" tone="accent2" suffix={`${Math.round(agent.autonomy * 100)}%`} />
      <Meter value={agent.successRate * 100} label="Success rate" tone={agent.successRate > 0.9 ? 'success' : 'warn'} />

      <div className="inspector__task">{agent.task}</div>
      {agent.stepsTotal > 0 && <Meter value={agent.stepsCompleted} max={agent.stepsTotal} label={`Steps · ${agent.stepsCompleted}/${agent.stepsTotal}`} tone="info" />}

      <SectionLabel>Live trace</SectionLabel>
      <div className="inspector__trace">
        {trace.loading && <Spinner size={11} />}
        {(trace.data ?? []).slice(0, 8).map((e, i) => (
          <div key={i} className="trace__line">
            <span className={cx('trace__kind', `trace__kind--${e.kind}`)}>{e.kind}</span>
            <span>{e.text}</span>
          </div>
        ))}
        {!trace.loading && !(trace.data ?? []).length && <span className="dim">No audited steps yet.</span>}
      </div>

      <SectionLabel>Capability grants</SectionLabel>
      <div className="inspector__chips">
        {agent.capabilities.length ? agent.capabilities.map((c) => <Chip key={c} size="sm" tone="dim">{c}</Chip>) : <span className="dim">Inherited from role only.</span>}
      </div>

      <KV
        dense
        items={[
          { k: 'Model', v: model?.name ?? agent.modelId },
          { k: 'Risk', v: <Chip size="sm" tone={agent.risk === 'critical' ? 'danger' : agent.risk === 'high' ? 'warn' : 'dim'}>{agent.risk}</Chip> },
          { k: 'Tokens', v: <span className="mono">{(agent.tokensIn + agent.tokensOut).toLocaleString()}</span> },
          { k: 'Cost', v: <span className="mono">${agent.costUsd.toFixed(2)}</span> },
          { k: 'Sub-agents', v: agent.childIds.length },
          { k: 'Heartbeat', v: relativeTime(agent.lastHeartbeat) },
        ]}
      />

      <SectionLabel>Steer</SectionLabel>
      <TextArea value={guidance} onChange={setGuidance} rows={2} placeholder="One sentence of guidance — e.g. “stop optimising the renderer, freeze it and cover the edge case in tests.”" />
      <div className="inspector__actions">
        <Button variant="solid" icon="send" onClick={() => { void actions.steerAgent(id, guidance); setGuidance(''); }}>
          Deliver guidance
        </Button>
        {agent.status === 'idle' || agent.status === 'blocked' ? (
          <Button icon="play" onClick={() => void actions.resumeAgent(id)}>Resume</Button>
        ) : (
          <Button icon="pause" onClick={() => void actions.pauseAgent(id)}>Park</Button>
        )}
        <Button icon="bolt" busy={busy[`boost:${id}`]} onClick={() => void actions.boostAgent(id)}>Boost</Button>
        <Button variant="danger" icon="trash" busy={busy[`retire:${id}`]} onClick={() => void actions.retireAgent(id)}>Retire</Button>
      </div>
    </>
  );
}

/* ── task ─────────────────────────────────────────────────────────────────── */

function TaskInspector({ id }: { id: string }) {
  const task = store.use((s) => s.tasks.find((t) => t.id === id) ?? null);
  const rev = store.use((s) => s.rev);
  const services = store.get().services;
  const summary = useAsync(() => services.projects && services.tasks.get(id).then((t) => (t ? services.tasks.get(id).then(() => services.ai.summarize(id)) : '')), [id, rev.tasks]);
  const [note, setNote] = useState('');
  if (!task) return <div className="inspector__missing">Task no longer present.</div>;
  const agent = store.get().agents.find((a) => a.id === task.assigneeAgentId);
  return (
    <>
      <div className="inspector__hero">
        <StatusDot status={task.status} />
        <div>
          <b>{task.title}</b>
          <span>
            {task.status} · {task.priority.toUpperCase()} {task.estimateMin >= 0 ? `· est ${task.estimateMin}m` : ''}
          </span>
        </div>
      </div>
      <Meter value={task.progress} label="Progress" tone={task.status === 'blocked' ? 'danger' : 'accent'} />
      <p className="inspector__objective">{task.objective}</p>

      {task.requiresApproval && (
        <div className="inspector__gate">
          <Icon name="shield" size={13} />
          <div>
            <b>Approval gate</b>
            <span>{task.approvalReason}</span>
          </div>
          <Button size="sm" variant="solid" onClick={() => void actions.approveTask(id, true)}>Approve</Button>
          <Button size="sm" onClick={() => void actions.approveTask(id, false)}>Deny</Button>
        </div>
      )}

      <SectionLabel right={<span className="dim mono">{task.events.length}</span>}>Event log</SectionLabel>
      <div className="inspector__events">
        {task.events.map((e, i) => (
          <Row key={i} className="event">
            <StatusDot status={e.kind === 'error' ? 'error' : 'idle'} pulse={false} />
            <div>
              <b>{e.actor}</b> <span className="dim">{relativeTime(e.at)}</span>
              <p>{e.text}</p>
            </div>
          </Row>
        ))}
      </div>

      {!!task.artifacts.length && (
        <>
          <SectionLabel>Artifacts</SectionLabel>
          {task.artifacts.map((a) => (
            <Row key={a.id} className="artifact" onClick={() => ui.select({ kind: 'file', id: `${a.uri}${a.name}`, label: a.name })}>
              <Icon name={a.kind === 'image' ? 'image' : a.kind === 'patch' ? 'code' : 'file'} size={13} />
              <div>
                <b>{a.name}</b>
                <span className="dim mono">{a.kind} · {formatBytes(a.sizeBytes)} · {a.createdBy}</span>
              </div>
              <Icon name="chevRight" size={12} />
            </Row>
          ))}
        </>
      )}

      <SectionLabel>Core read</SectionLabel>
      <p className="inspector__summary">{summary.loading ? 'Summarising…' : summary.data || '—'}</p>

      <SectionLabel>Add to log</SectionLabel>
      <TextArea value={note} onChange={setNote} rows={2} placeholder="Context the agents should not lose…" />
      <div className="inspector__actions">
        <Button variant="solid" icon="check" onClick={() => { if (!note.trim()) return toast({ title: 'Nothing to add', severity: 'info', ttlMs: 2_400 }); void actions.logOnTask(id, note.trim()); setNote(''); toastOk(); }}>
          Post note
        </Button>
        {task.status === 'failed' || task.status === 'blocked' ? <Button icon="refresh" onClick={() => void actions.retryTask(id)}>Retry</Button> : null}
        <Button icon="close" onClick={() => void actions.cancelTask(id)}>Cancel</Button>
        {agent && <Button icon="agent" onClick={() => ui.select({ kind: 'agent', id: agent.id, label: agent.name })}>Open {agent.name}</Button>}
      </div>
    </>
  );
}

function toastOk() {
  toast({ title: 'Logged to the task', body: 'Visible to every agent working this objective.', severity: 'success', ttlMs: 3_000 });
}

/* ── project ──────────────────────────────────────────────────────────────── */

function ProjectInspector({ id }: { id: string }) {
  const rev = store.use((s) => s.rev);
  const services = store.get().services;
  const { data: projects, loading } = useAsync(() => services.projects.list(), [id, rev.projects]);
  const p = projects?.find((x) => x.id === id);
  if (loading) return <Spinner />;
  if (!p) return <div className="inspector__missing">Project not found.</div>;
  const tasks = store.get().tasks.filter((t) => t.projectId === id);
  return (
    <>
      <div className="inspector__hero">
        <StatusDot status={p.status} />
        <div>
          <b>{p.name}</b>
          <span>{p.codename} · {p.status}</span>
        </div>
      </div>
      <Meter value={p.progress} label="Progress" tone={p.status === 'at-risk' ? 'warn' : 'accent'} />
      <Meter value={p.riskScore} label="Risk score" tone={p.riskScore > 60 ? 'danger' : p.riskScore > 40 ? 'warn' : 'success'} />
      <p className="inspector__objective">{p.goal}</p>
      <SectionLabel>Milestones</SectionLabel>
      {p.milestones.map((m) => (
        <Row key={m.id} className={cx('milestone', m.done && 'is-done')}>
          <button
            type="button"
            className="milestone__box"
            onClick={() =>
              void (async () => {
                const next = await store.get().services.projects.toggleMilestone(id, m.id);
                ui.flashFor(`project:${id}`);
                toast({ title: `“${next.milestones.find((x) => x.id === m.id)?.name}” ${next.milestones.find((x) => x.id === m.id)?.done ? 'cleared' : 'reopened'}`, severity: 'info', ttlMs: 2_600 });
              })()
            }
            aria-label={m.done ? 'Reopen milestone' : 'Complete milestone'}
          >
            {m.done && <Icon name="check" size={10} />}
          </button>
          <div>
            <b>{m.name}</b>
            <span className="dim">{relativeTime(m.at)}</span>
          </div>
        </Row>
      ))}
      <SectionLabel right={<button type="button" className="linklike" onClick={() => ui.go('tasks')}>open board</button>}>Tasks</SectionLabel>
      {tasks.map((t) => (
        <Row key={t.id} className="minirow" onClick={() => ui.select({ kind: 'task', id: t.id, label: t.title })}>
          <StatusDot status={t.status} pulse={false} />
          <span>{t.title}</span>
          <em className="mono">{t.progress}%</em>
        </Row>
      ))}
      <KV dense items={[
        { k: 'Budget', v: <span className="mono">${p.spentUsd} / ${p.budgetUsd}</span> },
        { k: 'Due', v: new Date(p.due).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) },
        { k: 'Departments', v: p.departmentIds.length },
      ]} />
    </>
  );
}

/* ── department ──────────────────────────────────────────────────────────── */

function DepartmentInspector({ id }: { id: string }) {
  const rev = store.use((s) => s.rev);
  const services = store.get().services;
  const { data: deps } = useAsync(() => services.departments.list(), [id, rev.departments]);
  const { data: roster } = useAsync(() => services.departments.roster(id), [id, rev.agents]);
  const d = deps?.find((x) => x.id === id);
  if (!d) return <Spinner />;
  return (
    <>
      <div className="inspector__hero">
        <span className="inspector__glyph" style={{ ['--g' as string]: d.color }}>
          <Icon name={d.icon} size={15} />
        </span>
        <div>
          <b>{d.name}</b>
          <span>{d.code} · {d.status}</span>
        </div>
      </div>
      <p className="inspector__objective">{d.mission}</p>
      <Meter value={d.throughput} label="Throughput" tone="success" />
      <Meter value={d.backlogPressure} label="Backlog pressure" tone={d.backlogPressure > 70 ? 'danger' : 'warn'} />
      <Meter value={(d.spentUsd / Math.max(1, d.budgetUsd)) * 100} label="Budget used" tone="accent2" suffix={`$${d.spentUsd} / $${d.budgetUsd}`} />
      <SectionLabel>Agents ({roster?.length ?? 0})</SectionLabel>
      {roster?.map((a) => (
        <Row key={a.id} className="minirow" onClick={() => ui.select({ kind: 'agent', id: a.id, label: a.name })}>
          <StatusDot status={a.status} pulse={false} />
          <span>{a.name}</span>
          <em className="mono">{a.load}%</em>
        </Row>
      ))}
      <SectionLabel>KPIs</SectionLabel>
      <div className="inspector__kpis">
        {d.kpis.map((k) => (
          <div key={k.label}>
            <b>{k.value}</b>
            <span>{k.label}</span>
            {k.trend !== undefined && <em className={k.trend >= 0 ? 'up' : 'down'}>{k.trend >= 0 ? '+' : ''}{k.trend}%</em>}
          </div>
        ))}
      </div>
    </>
  );
}

/* ── memory ──────────────────────────────────────────────────────────────── */

function MemoryInspector({ id }: { id: string }) {
  const rev = store.use((s) => s.rev);
  const services = store.get().services;
  const { data: records, loading } = useAsync(() => services.memory.list(), [id, rev.memory]);
  const rec = records?.find((m) => m.id === id);
  const [body, setBody] = useState<string | null>(null);
  if (loading) return <Spinner />;
  if (!rec) return <div className="inspector__missing">Memory record deleted.</div>;
  return (
    <>
      <div className="inspector__hero">
        <Icon name="memory" size={15} />
        <div>
          <b>{rec.title}</b>
          <span>{rec.kind} · {rec.scope} · confidence {Math.round(rec.confidence * 100)}%</span>
        </div>
      </div>
      <Meter value={rec.strength * 100} label="Recall strength" tone="accent2" />
      <p className="inspector__objective">{body ?? rec.body}</p>
      <div className="inspector__actions">
        {body === null ? (
          <Button icon="code" onClick={() => setBody(rec.body)}>Edit</Button>
        ) : (
          <>
            <Button variant="solid" icon="check" onClick={() => { void (async () => { await services.memory.update(id, { body: body.trim() || rec.body }); setBody(null); toast({ title: 'Memory updated', body: 'Agents re-read this on their next recall.', severity: 'success', ttlMs: 3_200 }); ui.bump('memory'); })(); }}>
              Save
            </Button>
            <Button onClick={() => setBody(null)}>Cancel</Button>
          </>
        )}
        <Button icon="pin" onClick={() => void actions.pinMemory(id, !rec.pinned)}>{rec.pinned ? 'Unpin' : 'Pin'}</Button>
        <Button variant="danger" icon="trash" onClick={() => void actions.deleteMemory(id)}>Delete</Button>
      </div>
      <SectionLabel>Provenance</SectionLabel>
      <KV dense items={[
        { k: 'Source', v: rec.source },
        { k: 'Created', v: relativeTime(rec.createdAt) },
        { k: 'Last recalled', v: rec.lastRecalledAt ? relativeTime(rec.lastRecalledAt) : 'never' },
        { k: 'Tags', v: rec.tags.map((t) => <Chip key={t} size="sm" tone="dim">{t}</Chip>) },
      ]} />
    </>
  );
}

/* ── automation ──────────────────────────────────────────────────────────── */

function AutomationInspector({ id }: { id: string }) {
  const rev = store.use((s) => s.rev);
  const services = store.get().services;
  const { data: autos } = useAsync(() => services.automation.list(), [id, rev.automations]);
  const a = autos?.find((x) => x.id === id);
  if (!a) return <Spinner />;
  return (
    <>
      <div className="inspector__hero">
        <StatusDot status={a.enabled ? 'active' : 'paused'} />
        <div>
          <b>{a.name}</b>
          <span>{a.trigger.label}</span>
        </div>
      </div>
      <SectionLabel>Steps</SectionLabel>
      {a.steps.map((s, i) => (
        <Row key={s.id} className="step">
          <span className={cx('step__state', `is-${s.status}`)}>
            {s.status === 'running' ? <Spinner size={10} /> : <Icon name={s.status === 'ok' ? 'check' : s.status === 'failed' ? 'close' : 'minus'} size={10} />}
          </span>
          <div>
            <b>{s.name}</b>
            <span className="dim">{s.detail}</span>
          </div>
          <em>{i + 1}</em>
        </Row>
      ))}
      <SectionLabel>Recent runs</SectionLabel>
      {a.runs.slice(0, 6).map((r) => (
        <Row key={r.id} className="runline">
          <StatusDot status={r.status} pulse={false} />
          <span>{r.summary}</span>
          <em className="mono">{Math.round(r.durationMs / 1000)}s</em>
          <span className="dim mono">{relativeTime(r.at)}</span>
        </Row>
      ))}
      <div className="inspector__actions">
        <Button variant="solid" icon="play" busy={!!store.get().busy[`automation:${id}`]} onClick={() => void actions.runAutomation(id)}>Run now</Button>
        <Button icon={a.enabled ? 'pause' : 'play'} onClick={() => void actions.toggleAutomation(id, !a.enabled)}>{a.enabled ? 'Pause' : 'Arm'}</Button>
      </div>
    </>
  );
}

/* ── file ────────────────────────────────────────────────────────────────── */

function FileInspector({ path }: { path: string }) {
  const services = store.get().services;
  const { data: preview, loading } = useAsync(() => services.files.read(path), [path]);
  if (loading) return <Spinner />;
  if (!preview) return <div className="inspector__missing">Nothing readable at that path.</div>;
  return (
    <>
      <div className="inspector__hero">
        <Icon name={preview.kind === 'image' ? 'image' : preview.kind === 'pdf' ? 'file' : 'code'} size={15} />
        <div>
          <b>{path.split('/').pop()}</b>
          <span className="mono">{path}</span>
        </div>
      </div>
      <KV dense items={[
        { k: 'Kind', v: `${preview.kind}${preview.language ? ` · ${preview.language}` : ''}` },
        { k: 'Size', v: formatBytes(preview.sizeBytes) },
        { k: 'Lines', v: preview.lines },
        { k: 'Agent-editable', v: preview.kind === 'code' || preview.kind === 'text' ? 'yes' : 'no' },
      ]} />
      <SectionLabel>Preview</SectionLabel>
      <pre className="inspector__pre">{preview.kind === 'image' || preview.kind === 'pdf' ? `${preview.content}\n\n(binary body not rendered in demo mode)` : preview.content}</pre>
      <div className="inspector__actions">
        <Button icon="eye" onClick={() => { ui.go('files'); toast({ title: 'Opened in Files', severity: 'info', ttlMs: 2_200 }); }}>Open in Files</Button>
        <Button icon="knowledge" onClick={() => { void services.knowledge.query(preview.content.slice(0, 80)).then(() => toast({ title: 'Sent to retrieval', body: 'Three sources matched; the strongest is already indexed.', severity: 'success', ttlMs: 3_600 })); }}>
          Query knowledge
        </Button>
      </div>
    </>
  );
}

/* ── notice ──────────────────────────────────────────────────────────────── */

function NoticeInspector({ id }: { id: string }) {
  const n = store.use((s) => s.notices.find((x) => x.id === id) ?? null);
  const [minutes] = useState(30);
  if (!n) return <div className="inspector__missing">Dismissed.</div>;
  return (
    <>
      <div className={cx('inspector__hero', `is-${n.severity}`)}>
        <StatusDot status={n.severity === 'critical' ? 'error' : n.severity === 'warning' ? 'degraded' : 'ready'} pulse={false} />
        <div>
          <b>{n.title}</b>
          <span>{n.source} · {relativeTime(n.at)}</span>
        </div>
      </div>
      <p className="inspector__objective">{n.body}</p>
      <div className="inspector__actions">
        {n.related && (
          <Button
            variant="solid"
            icon="chevRight"
            onClick={() => {
              if (n.related?.kind === 'task') ui.go('tasks');
              if (n.related?.kind === 'automation') ui.go('automations');
              if (n.related?.kind === 'agent') ui.go('agents');
              ui.select({ kind: n.related!.kind, id: n.related!.id });
            }}
          >
            Open {n.related.kind}
          </Button>
        )}
        {n.actions?.map((a) => (
          <Button
            key={a.id}
            variant={a.kind === 'approve' ? 'solid' : a.kind === 'deny' ? 'danger' : 'ghost'}
            onClick={() => {
              if (a.kind === 'approve' || a.kind === 'deny') void actions.approveNotice(n.id, a.kind === 'approve');
              else if (a.kind === 'snooze') void actions.snoozeNotice(n.id, minutes);
              else if (a.kind === 'retry') void actions.runAutomation(n.related?.id ?? 'aut-morning-scan');
              else ui.go(n.source === 'Automations' ? 'automations' : 'notifications');
            }}
          >
            {a.label}
          </Button>
        ))}
        <Button icon="close" onClick={() => void actions.dismissNotice(n.id)}>Dismiss</Button>
      </div>
    </>
  );
}

/** Model cache populated once at module load for cheap lookups. */
const MODEL_CACHE: { id: string; name: string }[] = [];
void store.get().services.ai.models().then((ms) => {
  MODEL_CACHE.length = 0;
  MODEL_CACHE.push(...ms.map((m) => ({ id: m.id, name: m.name })));
});
