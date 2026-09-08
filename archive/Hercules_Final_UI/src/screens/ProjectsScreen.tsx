/**
 * HERCULES · Projects (missions)
 * Outcomes, not folders. Progress is computed from real task states, risk is
 * computed from real blockers, and the core can be asked for a brief.
 */
import { useState } from 'react';
import { Icon } from '@/components/Icon';
import { Button, Chip, IconButton, Meter, RadialGauge, Row, SectionLabel, Select, Spinner, StatusDot, TextInput, cx, type Tone } from '@/components/ui';
import { store, toast, ui } from '@/state/hercules';
import { useAsync } from '@/hooks/useAsync';
import { money, relativeTime } from '@/services/mock/helpers';
import type { ProjectStatus } from '@/types/domain';

const STATUS_TONE: Record<ProjectStatus, Tone> = {
  planning: 'dim',
  active: 'accent',
  'on-hold': 'warn',
  'at-risk': 'danger',
  shipped: 'success',
  archived: 'dim',
};

export default function ProjectsScreen() {
  const services = store.get().services;
  const rev = store.use((s) => s.rev);
  const tasks = store.use((s) => s.tasks);
  const selected = store.use((s) => s.selected);
  const { data: projects, loading } = useAsync(() => services.projects.list(), [rev.projects]);
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState({ name: '', codename: '', goal: '', budget: 800 });
  const [briefFor, setBriefFor] = useState<string | null>(null);
  const [brief, setBrief] = useState<string>('');
  const [briefLoading, setBriefLoading] = useState(false);

  if (loading) return <Spinner />;

  const list = projects ?? [];
  const totalBudget = list.reduce((n, p) => n + p.budgetUsd, 0);
  const totalSpent = list.reduce((n, p) => n + p.spentUsd, 0);
  const atRisk = list.filter((p) => p.status === 'at-risk' || p.riskScore > 60);

  const openBrief = (id: string) => {
    setBriefFor(id);
    setBriefLoading(true);
    setBrief('');
    void services.projects.brief(id).then((b) => {
      setBrief(b);
      setBriefLoading(false);
    });
  };

  return (
    <div className="screen projects-screen">
      <section className="proj-strip">
        <div className="proj-strip__stat">
          <b className="mono">{list.length}</b>
          <span>missions</span>
        </div>
        <div className="proj-strip__stat">
          <b className="mono">{money(totalSpent)}</b>
          <span>of {money(totalBudget)} committed</span>
        </div>
        <div className="proj-strip__stat">
          <b className="mono" style={{ color: atRisk.length ? 'var(--danger)' : 'var(--success)' }}>{atRisk.length}</b>
          <span>at risk</span>
        </div>
        <div className="proj-strip__stat">
          <b className="mono">{tasks.filter((t) => list.some((p) => p.id === t.projectId) && t.status === 'done').length}</b>
          <span>tasks closed</span>
        </div>
        <span className="spacer" />
        <Button size="sm" icon="spark" onClick={() => void services.projects.brief(list[0]!.id).then((b) => toast({ title: `${list[0]!.codename} · core read`, body: b.slice(0, 220) + '…', severity: 'info', ttlMs: 12_000 }))}>
          Ask for a portfolio read
        </Button>
        <Button size="sm" variant="solid" icon="plus" onClick={() => setCreating(true)}>
          Open a mission
        </Button>
      </section>

      <div className="proj-grid">
        {list.map((p) => {
          const own = tasks.filter((t) => t.projectId === p.id);
          const blockers = own.filter((t) => t.status === 'blocked' || t.status === 'failed');
          const due = Math.ceil((new Date(p.due).getTime() - Date.now()) / 86_400_000);
          const deps = p.departmentIds.length;
          return (
            <section
              key={p.id}
              className={cx('proj-card', selected?.kind === 'project' && selected.id === p.id && 'is-open')}
              style={{ ['--c' as string]: p.color }}
            >
              <header className="proj-card__head">
                <div>
                  <span className="mono proj-card__code">{p.codename}</span>
                  <h3>{p.name}</h3>
                </div>
                <Chip size="sm" tone={STATUS_TONE[p.status]}>{p.status}</Chip>
              </header>
              <p className="proj-card__goal">{p.goal}</p>

              <div className="proj-card__ring">
                <RadialGauge value={p.progress} size={72} label={`${p.progress}%`} sub="progress" tone={`var(--${STATUS_TONE[p.status] === 'dim' ? 'accent-2' : STATUS_TONE[p.status] === 'danger' ? 'danger' : STATUS_TONE[p.status] === 'warn' ? 'warn' : STATUS_TONE[p.status]})`} />
                <div className="proj-card__facts">
                  <KV k="Due" v={<span className={due < 12 ? 'warn-text' : undefined}>{due > 0 ? `in ${due}d` : `${Math.abs(due)}d overdue`}</span>} />
                  <KV k="Risk" v={<Meter value={p.riskScore} tone={p.riskScore > 60 ? 'danger' : p.riskScore > 40 ? 'warn' : 'success'} height={3} />} />
                  <KV k="Budget" v={<span className="mono">{money(p.spentUsd)} / {money(p.budgetUsd)}</span>} />
                  <KV k="Departments" v={deps} />
                  <KV k="Blockers" v={blockers.length ? <span className="danger-text">{blockers.length}</span> : <span className="ok-text">none</span>} />
                </div>
              </div>

              <SectionLabel>Milestones</SectionLabel>
              <div className="proj-card__miles">
                {p.milestones.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    className={cx('mile', m.done && 'is-done')}
                    onClick={() => void services.projects.toggleMilestone(p.id, m.id).then(() => { ui.bump('projects'); toast({ title: `Milestone ${m.done ? 'reopened' : 'cleared'}`, body: m.name, severity: m.done ? 'info' : 'success', ttlMs: 3_400 }); })}
                  >
                    <span className="mile__box">{m.done && <Icon name="check" size={10} />}</span>
                    <span className="mile__name">{m.name}</span>
                    <span className="mono dim">{relativeTime(m.at)}</span>
                  </button>
                ))}
              </div>

              <SectionLabel right={<button className="linklike" onClick={() => ui.go('tasks')}>board</button>}>Tasks</SectionLabel>
              <div className="proj-card__tasks">
                {own.slice(0, 4).map((t) => (
                  <Row key={t.id} className="minirow" onClick={() => ui.select({ kind: 'task', id: t.id, label: t.title })}>
                    <StatusDot status={t.status} pulse={false} />
                    <span>{t.title}</span>
                    <em className="mono">{t.progress}%</em>
                  </Row>
                ))}
                {!own.length && <span className="dim" style={{ fontSize: 11 }}>No tasks yet — file one from the board.</span>}
              </div>

              <footer className="proj-card__foot">
                <Button size="sm" icon="spark" onClick={() => openBrief(p.id)}>Core read</Button>
                <Button size="sm" icon="agent" onClick={() => { ui.go('agents'); toast({ title: 'Staffing ' + p.codename, body: 'Filter by tier and recruit into the departments this mission needs.', severity: 'info', ttlMs: 5_000 }); }}>
                  Staff it
                </Button>
                <Select
                  value={p.status}
                  onChange={(v) => void services.projects.setStatus(p.id, v as ProjectStatus).then(() => { ui.bump('projects'); toastOk(`${p.codename} → ${v}`); })}
                  options={(['planning', 'active', 'on-hold', 'at-risk', 'shipped', 'archived'] as ProjectStatus[]).map((v) => ({ value: v, label: v }))}
                />
              </footer>
            </section>
          );
        })}
      </div>

      {creating && (
        <div className="scrim" onMouseDown={(e) => e.target === e.currentTarget && setCreating(false)}>
          <div className="modal">
            <header className="modal__head">
              <div>
                <span className="mono modal__eyebrow">MISSIONS</span>
                <h2>Open a mission</h2>
                <p>A codename, an outcome, a number you are willing to spend.</p>
              </div>
              <IconButton icon="close" title="Close" onClick={() => setCreating(false)} />
            </header>
            <div className="modal__body">
              <div className="g2">
                <div className="field">
                  <div className="field__head"><label>Name</label></div>
                  <TextInput value={draft.name} onChange={(v) => setDraft({ ...draft, name: v })} placeholder="Project HALCYON" />
                </div>
                <div className="field">
                  <div className="field__head"><label>Codename</label></div>
                  <TextInput value={draft.codename} onChange={(v) => setDraft({ ...draft, codename: v })} placeholder="HALCYON" mono />
                </div>
              </div>
              <div className="field">
                <div className="field__head"><label>Goal</label></div>
                <TextInput value={draft.goal} onChange={(v) => setDraft({ ...draft, goal: v })} placeholder="What the world looks like when this is finished" />
              </div>
              <div className="field">
                <div className="field__head"><label>Budget</label><span className="mono dim">{money(draft.budget)}</span></div>
                <input className="range" type="range" min={100} max={5000} step={100} value={draft.budget} onChange={(e) => setDraft({ ...draft, budget: Number(e.target.value) })} />
              </div>
            </div>
            <footer className="modal__foot">
              <span className="spacer" />
              <Button onClick={() => setCreating(false)}>Cancel</Button>
              <Button
                variant="solid"
                icon="plus"
                disabled={!draft.name.trim()}
                onClick={() =>
                  void services.projects
                    .create({ name: draft.name.trim(), codename: draft.codename.trim() || draft.name.slice(0, 6), goal: draft.goal.trim() || draft.name.trim(), due: new Date(Date.now() + 30 * 86_400_000).toISOString(), budgetUsd: draft.budget })
                    .then(() => {
                      ui.bump('projects');
                      setCreating(false);
                      toastOk('Mission opened', 'Nothing is staffed yet — say “staff HALCYON” in the core and I will.');
                    })
                }
              >
                Open mission
              </Button>
            </footer>
          </div>
        </div>
      )}

      {briefFor && (
        <div className="scrim" onMouseDown={(e) => e.target === e.currentTarget && setBriefFor(null)}>
          <div className="modal modal--brief">
            <header className="modal__head">
              <div>
                <span className="mono modal__eyebrow">CORE READ</span>
                <h2>{list.find((p) => p.id === briefFor)?.name}</h2>
              </div>
              <IconButton icon="close" title="Close" onClick={() => setBriefFor(null)} />
            </header>
            <div className="modal__body">{briefLoading ? <><Spinner size={13} /> composing…</> : <pre className="brief-text">{brief}</pre>}</div>
            <footer className="modal__foot">
              <span className="dim mono">assembled from task states, spend and blockers · not from a template</span>
              <span className="spacer" />
              <Button onClick={() => setBriefFor(null)}>Close</Button>
              <Button variant="solid" icon="send" onClick={() => { setBriefFor(null); ui.go('core'); toast({ title: 'Sent to the core', body: 'Ask me to act on any line of it.', severity: 'info', ttlMs: 4_000 }); }}>
                Act on this
              </Button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}

function KV({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="kvline">
      <span>{k}</span>
      <b>{v}</b>
    </div>
  );
}

function toastOk(title: string, body?: string) {
  toast({ title, body, severity: 'success', ttlMs: 4_000 });
}
