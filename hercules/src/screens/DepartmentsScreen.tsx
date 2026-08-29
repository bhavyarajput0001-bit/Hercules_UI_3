/**
 * HERCULES · Departments
 * Not "teams" — departments with a mission, a budget, a lead and a workforce.
 * The org chart is the product's spine, so it is editable here.
 */
import { useState } from 'react';
import { Icon } from '@/components/Icon';
import { Bars, Button, Chip, IconButton, Meter, RadialGauge, Row, SectionLabel, Spinner, StatusDot, TextInput, cx } from '@/components/ui';
import { store, toast, ui } from '@/state/hercules';
import { useAsync } from '@/hooks/useAsync';
import { money, relativeTime } from '@/services/mock/helpers';
import type { Department } from '@/types/domain';

export default function DepartmentsScreen() {
  const services = store.get().services;
  const rev = store.use((s) => s.rev);
  const agents = store.use((s) => s.agents);
  const tasks = store.use((s) => s.tasks);
  const { data: departments, loading } = useAsync(() => services.departments.list(), [rev.departments]);
  const [openId, setOpenId] = useState<string | null>('dep-eng');
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState({ name: '', code: '', mission: '' });

  const open = departments?.find((d) => d.id === openId) ?? departments?.[0] ?? null;
  const roster = useAsync(() => (open ? services.departments.roster(open.id) : Promise.resolve([])), [open?.id ?? '', rev.agents]);
  const unassigned = agents.filter((a) => !a.departmentId);

  if (loading) return <Spinner />;


  return (
    <div className="screen dep-screen">
      <section className="dep-summary">
        {departments?.map((d) => {
          const live = agents.filter((a) => a.departmentId === d.id && (a.status === 'working' || a.status === 'thinking')).length;
          return (
            <button key={d.id} type="button" className={cx('depcard', open?.id === d.id && 'is-open')} onClick={() => setOpenId(d.id)} style={{ ['--c' as string]: d.color }}>
              <span className="depcard__glyph">
                <Icon name={d.icon} size={16} />
              </span>
              <div className="depcard__body">
                <div className="depcard__head">
                  <b>{d.name}</b>
                  <StatusDot status={d.status} />
                </div>
                <p>{d.mission}</p>
                <div className="depcard__meters">
                  <Meter value={d.throughput} label="throughput" tone="success" height={3} />
                  <Meter value={d.backlogPressure} label="backlog" tone={d.backlogPressure > 70 ? 'danger' : 'warn'} height={3} />
                </div>
                <div className="depcard__foot">
                  <Chip size="sm" tone="dim" icon="agent">
                    {d.agentIds.length} agents · {live} live
                  </Chip>
                  <Chip size="sm" tone={d.spentUsd / d.budgetUsd > 0.8 ? 'warn' : 'dim'} icon="analytics">
                    {money(d.spentUsd)} / {money(d.budgetUsd)}
                  </Chip>
                  <Chip size="sm" tone="dim" icon="task">
                    {tasks.filter((t) => t.departmentId === d.id && t.status !== 'done').length} open
                  </Chip>
                </div>
              </div>
              <span className="depcard__code mono">{d.code}</span>
            </button>
          );
        })}
        <button type="button" className="depcard depcard--new" onClick={() => setCreating(true)}>
          <Icon name="plus" size={18} />
          <b>Open a department</b>
          <span>A mission, a budget, and agents attached to it.</span>
        </button>
      </section>

      {open && (
        <div className="split split--a">
          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title" style={{ ['--c' as string]: open.color }}>
                <Icon name={open.icon} size={14} className="hud__panel-icon" />
                <div>
                  <h3>
                    {open.name} · roster
                    <span className="dep-lead">lead: {agents.find((a) => a.id === open.leadAgentId)?.name ?? 'unassigned'}</span>
                  </h3>
                  <p className="hud__panel-sub">{open.mission}</p>
                </div>
              </div>
              <div className="hud__panel-actions">
                <Button size="sm" icon="plus" onClick={() => { ui.go('agents'); toast({ title: 'Recruit into ' + open.name, body: 'Pick a role, then attach it here.', severity: 'info', ttlMs: 5_000 }); }}>
                  Recruit
                </Button>
              </div>
            </header>
            <div className="hud__panel-body">
              {roster.loading && <Spinner size={12} />}
              {roster.data?.map((a) => (
                <Row key={a.id} className="dep-agent" onClick={() => ui.select({ kind: 'agent', id: a.id, label: a.name })}>
                  <StatusDot status={a.status} />
                  <div>
                    <b>{a.name}</b>
                    <span>{a.task}</span>
                  </div>
                  <Chip size="sm" tone="dim">{a.tier}</Chip>
                  <em className="mono">{a.load}%</em>
                  <span className="dep-agent__tools">
                    <IconButton icon="spark" size="sm" title="Steer" onClick={() => ui.select({ kind: 'agent', id: a.id, label: a.name })} />
                    <IconButton icon="close" size="sm" title="Detach from department" onClick={() => void services.departments.toggleAgentAccess(open.id, a.id, false).then(() => { roster.refresh(); toast({ title: `${a.name} detached`, body: 'Scopes reverted to role defaults.', severity: 'info', ttlMs: 3_600 }); ui.bump('agents', 'departments'); })} />
                  </span>
                </Row>
              ))}
              {!roster.loading && !roster.data?.length && <div className="dim" style={{ fontSize: 11.5 }}>No agents attached. The department exists; the workforce does not yet.</div>}

              {unassigned.length > 0 && (
                <>
                  <SectionLabel>Attach an unassigned agent</SectionLabel>
                  <div className="dep-attach">
                    {unassigned.slice(0, 6).map((a) => (
                      <Chip key={a.id} size="sm" tone="dim" icon="plus" onClick={() => void services.departments.toggleAgentAccess(open.id, a.id, true).then(() => { roster.refresh(); toastOk(`${a.name} attached to ${open.name}`, 'Inherited role scopes.'); ui.bump('agents', 'departments'); })}>
                        {a.name}
                      </Chip>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>

          <div className="stack">
            <section className="hud__panel">
              <header className="hud__panel-head">
                <div className="hud__panel-title">
                  <Icon name="analytics" size={14} className="hud__panel-icon" />
                  <div>
                    <h3>Health</h3>
                  </div>
                </div>
              </header>
              <div className="hud__panel-body dep-health">
                <RadialGauge value={(open.spentUsd / Math.max(1, open.budgetUsd)) * 100} label={`${Math.round((open.spentUsd / Math.max(1, open.budgetUsd)) * 100)}%`} sub="budget used" size={104} tone={open.spentUsd / open.budgetUsd > 0.85 ? 'var(--warn)' : 'var(--accent)'} />
                <div className="dep-kpis">
                  {open.kpis.map((k) => (
                    <div key={k.label} className="dep-kpi">
                      <b>{k.value}</b>
                      <span>{k.label}</span>
                      {k.trend !== undefined && <em className={k.trend >= 0 ? 'up' : 'down'}>{k.trend >= 0 ? '▲' : '▼'} {Math.abs(k.trend)}%</em>}
                    </div>
                  ))}
                </div>
              </div>
              <footer className="hud__panel-foot">
                <span className="dim">Throughput {open.throughput}% · backlog pressure {open.backlogPressure}%</span>
              </footer>
            </section>

            <DepartmentControls department={open} onAutonomy={(v) => void services.departments.setDepartmentAutonomy(open.id, v).then(() => toastOk(`${open.name} autonomy → ${Math.round(v * 100)}%`))} />

            <section className="hud__panel">
              <header className="hud__panel-head">
                <div className="hud__panel-title">
                  <Icon name="bolt" size={14} className="hud__panel-icon" />
                  <div>
                    <h3>Tool surface</h3>
                    <p className="hud__panel-sub">What this department may reach for.</p>
                  </div>
                </div>
              </header>
              <div className="hud__panel-body">
                <div className="cluster">
                  {open.tools.map((t) => (
                    <Chip key={t} size="sm" tone="accent2" icon="link" onClick={() => ui.go(t === 'terminal' ? 'terminal' : t === 'browser' ? 'browser' : 'permissions')}>
                      {t}
                    </Chip>
                  ))}
                  {!open.tools.length && <span className="dim">No tools granted.</span>}
                </div>
                <SectionLabel>Tasks by status</SectionLabel>
                <Bars
                  data={['queued', 'in-progress', 'review', 'blocked', 'done'].map((s) => ({
                    label: s.slice(0, 5),
                    value: tasks.filter((t) => t.departmentId === open.id && t.status === s).length,
                    tone: s === 'blocked' ? 'var(--danger)' : s === 'done' ? 'var(--success)' : 'var(--accent)',
                  }))}
                  height={62}
                />
              </div>
            </section>

            <section className="hud__panel">
              <header className="hud__panel-head">
                <div className="hud__panel-title">
                  <Icon name="activity" size={14} className="hud__panel-icon" />
                  <div>
                    <h3>Recent from {open.code}</h3>
                  </div>
                </div>
                <button className="linklike" onClick={() => ui.go('activity')}>all</button>
              </header>
              <div className="hud__panel-body stack--tight">
                {tasks
                  .filter((t) => t.departmentId === open.id)
                  .slice(0, 5)
                  .map((t) => (
                    <Row key={t.id} className="minirow" onClick={() => ui.select({ kind: 'task', id: t.id, label: t.title })}>
                      <StatusDot status={t.status} pulse={false} />
                      <span>{t.title}</span>
                      <em className="mono">{relativeTime(t.updatedAt)}</em>
                    </Row>
                  ))}
              </div>
            </section>
          </div>
        </div>
      )}

      {creating && (
        <div className="scrim" onMouseDown={(e) => e.target === e.currentTarget && setCreating(false)}>
          <div className="modal">
            <header className="modal__head">
              <div>
                <span className="mono modal__eyebrow">ORG</span>
                <h2>Open a department</h2>
                <p>A department owns a mission and a budget. Agents inherit its access.</p>
              </div>
              <IconButton icon="close" title="Close" onClick={() => setCreating(false)} />
            </header>
            <div className="modal__body">
              <div className="g2">
                <div className="field">
                  <div className="field__head"><label>Name</label></div>
                  <TextInput value={draft.name} onChange={(v) => setDraft({ ...draft, name: v })} placeholder="Legal & Contracts" />
                </div>
                <div className="field">
                  <div className="field__head"><label>Code</label></div>
                  <TextInput value={draft.code} onChange={(v) => setDraft({ ...draft, code: v })} placeholder="LGL" mono />
                </div>
              </div>
              <div className="field">
                <div className="field__head"><label>Mission</label></div>
                <TextInput value={draft.mission} onChange={(v) => setDraft({ ...draft, mission: v })} placeholder="What must be true when this department succeeds" />
              </div>
            </div>
            <footer className="modal__foot">
              <span className="dim mono">starting budget $250/mo · editable after</span>
              <span className="spacer" />
              <Button onClick={() => setCreating(false)}>Cancel</Button>
              <Button
                variant="solid"
                icon="plus"
                disabled={!draft.name.trim()}
                onClick={() =>
                  void services.departments
                    .create({ name: draft.name.trim(), code: draft.code.trim() || draft.name.slice(0, 3), mission: draft.mission.trim() || 'Defined by you.', color: '#46e8ff' })
                    .then((d) => {
                      ui.bump('departments');
                      setOpenId(d.id);
                      setCreating(false);
                      setDraft({ name: '', code: '', mission: '' });
                      toastOk(`${d.name} established`, 'No agents yet — attach them from the roster.');
                    })
                }
              >
                Open department
              </Button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}

function DepartmentControls({ department, onAutonomy }: { department: Department; onAutonomy: (v: number) => void }) {
  const services = store.get().services;
  const [budget, setBudget] = useState(department.budgetUsd);
  const avgAutonomy = useAsync(
    async () => {
      const roster = await services.departments.roster(department.id);
      return roster.length ? roster.reduce((s, a) => s + a.autonomy, 0) / roster.length : 0.5;
    },
    [department.id, department.agentIds.length],
  );
  const [autonomy, setAutonomy] = useState(0.5);
  const [seen, setSeen] = useState<string | null>(null);
  if (seen !== department.id && avgAutonomy.data != null) {
    setSeen(department.id);
    setAutonomy(avgAutonomy.data);
  }

  return (
    <section className="hud__panel">
      <header className="hud__panel-head">
        <div className="hud__panel-title">
          <Icon name="shield" size={14} className="hud__panel-icon" />
          <div>
            <h3>Controls</h3>
            <p className="hud__panel-sub">Money and freedom — the two dials that matter.</p>
          </div>
        </div>
      </header>
      <div className="hud__panel-body">
        <div className="field">
          <div className="field__head">
            <label>Monthly budget</label>
            <span className="mono dim">{money(budget)}</span>
          </div>
          <input className="range" type="range" min={0} max={4000} step={50} value={budget} onChange={(e) => setBudget(Number(e.target.value))} onMouseUp={() => void services.departments.setBudget(department.id, budget).then(() => { toastOk(`${department.name} budget set`, `Router will enforce $${budget}/mo and downgrade tiers before overrunning.`); ui.bump('departments'); })} />
          <small className="field__hint">Enforced by the model router: at 90% the department drops to cheaper tiers, at 100% it stops and tells you.</small>
        </div>
        <div className="field">
          <div className="field__head">
            <label>Autonomy ceiling</label>
            <span className="mono dim">{Math.round(autonomy * 100)}%</span>
          </div>
          <input className="range" type="range" min={0} max={1} step={0.05} value={autonomy} onChange={(e) => setAutonomy(Number(e.target.value))} onMouseUp={() => onAutonomy(autonomy)} />
          <small className="field__hint">Above this, agents must raise an approval request instead of acting.</small>
        </div>
      </div>
    </section>
  );
}

function toastOk(title: string, body?: string) {
  toast({ title, body, severity: 'success', ttlMs: 4_200 });
}
