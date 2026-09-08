/**
 * HERCULES · Automations
 * Where the estate works while you are not watching — so the controls here are
 * throttle, gate and abort, not just "enable". Runs stream their step status
 * live through the automation bus.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from '@/components/Icon';
import { Button, Chip, EmptyState, IconButton, Meter, Row, SectionLabel, Sparkline, Toggle, cx } from '@/components/ui';
import { TextInput } from '@/components/ui';
import { actions, store, toast, ui } from '@/state/hercules';
import { useAsync } from '@/hooks/useAsync';
import { money, relativeTime } from '@/services/mock/helpers';
import type { Automation, RiskLevel, TriggerKind, WorkflowGraph } from '@/types/domain';

const TRIGGERS: { id: TriggerKind; label: string; hint: string }[] = [
  { id: 'schedule', label: 'On a clock', hint: 'cron-like; drift-tolerant' },
  { id: 'event', label: 'On an event', hint: 'task closed, agent blocked, notice fired' },
  { id: 'file', label: 'On a file change', hint: 'watched paths only' },
  { id: 'webhook', label: 'On a webhook', hint: 'localhost:47801/hooks/…' },
  { id: 'intent', label: 'When I say so', hint: 'routed from the core by intent match' },
  { id: 'manual', label: 'Only when run', hint: 'no automatic trigger' },
];

const RISK_TONE: Record<RiskLevel, 'success' | 'info' | 'warn' | 'danger'> = {
  low: 'success',
  medium: 'info',
  high: 'warn',
  critical: 'danger',
};

export default function AutomationsScreen() {
  const services = store.get().services;
  const rev = store.use((s) => s.rev);
  const agents = store.use((s) => s.agents);
  const flash = store.use((s) => s.flash);
  const busy = store.use((s) => s.busy);
  const autos = useAsync(() => services.automation.list(), [rev.automations]);
  const [openId, setOpenId] = useState<string | null>('aut-morning-brief');
  const [editing, setEditing] = useState(false);
  const [liveSteps, setLiveSteps] = useState<{ id: string; automationId: string; status: string } | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // The run bus is the only live channel here: it re-fetches the list so step
    // status on screen follows the actual run, not a scripted animation.
    const off = services.automation.onRunEvent.subscribe(() => autos.refresh());
    return off;
  }, [autos]);

  const list = autos.data ?? [];
  const armed = list.filter((a) => a.enabled).length;
  const gated = list.filter((a) => a.requiresApproval).length;
  const runs24 = list.reduce((n, a) => n + a.runs.filter((r) => Date.now() - new Date(r.at).getTime() < 86_400_000).length, 0);
  const failing = list.filter((a) => a.successRate < 0.85);
  const open = list.find((a) => a.id === openId) ?? list[0] ?? null;

  const spend = useMemo(() => list.reduce((n, a) => n + a.runs.reduce((m, r) => m + r.costUsd, 0), 0), [list]);

  return (
    <div className="screen autos-screen">
      <div className="autos-toolbar">
        <div className="autos-strip">
          <div className={cx('autos-strip__stat', 'is-on')}><b className="mono">{armed}</b><span>armed</span></div>
          <div className="autos-strip__stat"><b className="mono">{list.length - armed}</b><span>paused</span></div>
          <div className={cx('autos-strip__stat', gated && 'is-gated')}><b className="mono">{gated}</b><span>approval-gated</span></div>
          <div className="autos-strip__stat"><b className="mono">{runs24}</b><span>runs · 24h</span></div>
          <div className={cx('autos-strip__stat', failing.length && 'is-bad')}><b className="mono">{failing.length}</b><span>below 85% success</span></div>
          <div className="autos-strip__stat"><b className="mono">{money(spend)}</b><span>spent on runs</span></div>
        </div>
        <span className="spacer" />
        <Button size="sm" icon="bolt" onClick={() => void runAll()}>
          Run all armed
        </Button>
        <Button size="sm" variant="solid" icon="plus" onClick={() => setEditing(true)}>
          New automation
        </Button>
      </div>

      <div className="split split--a" ref={listRef}>
        <div className="stack">
          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="automation" size={14} className="hud__panel-icon" />
                <div>
                  <h3>Standing orders</h3>
                  <p className="hud__panel-sub">Triggers, gates and what they have actually done. Click one to see the workflow.</p>
                </div>
              </div>
              <Chip size="sm" tone="dim">{list.length}</Chip>
            </header>
            <div className="hud__panel-body autos-list">
              {autos.loading && <Row className="autos-loading"><Icon name="refresh" size={12} className="spin" /> reading automations…</Row>}
              {list.map((a) => {
                const last = a.runs[0];
                const recent = a.runs.slice(0, 14).reverse().map((r) => (r.status === 'ok' ? 1 : r.status === 'partial' ? 0.55 : 0.15) * 100);
                const isOpen = open?.id === a.id;
                return (
                  <div key={a.id} className={cx('auto-row', isOpen && 'is-open', liveSteps?.automationId === a.id && 'is-running')} onClick={() => setOpenId(a.id)}>
                    <div className="auto-row__head">
                      <span className={cx('auto-row__pip', `auto-row__pip--${last?.status ?? 'idle'}`)} />
                      <b>{a.name}</b>
                      <Chip size="sm" tone={RISK_TONE[a.risk]} icon="shield">{a.risk}</Chip>
                      {a.requiresApproval && <Chip size="sm" tone="warn" icon="lock">gate</Chip>}
                      <span className="spacer" />
                      <span className="mono dim">{a.trigger.label}</span>
                      <Toggle
                        checked={a.enabled}
                        onChange={(v) => void services.automation.update(a.id, { enabled: v }).then(() => {
                          ui.bump('automations');
                          toast({ title: v ? `${a.name} armed` : `${a.name} paused`, body: v ? `Next: ${a.nextRun ? relativeTime(a.nextRun) : 'on trigger'}` : 'Nothing will fire until you re-arm it.', severity: v ? 'success' : 'info', ttlMs: 4_000 });
                        })}
                        onClick={(e) => e.stopPropagation()}
                        title={a.enabled ? 'Pause' : 'Arm'}
                      />
                    </div>
                    <div className="auto-row__meta">
                      <span>{a.description}</span>
                    </div>
                    <div className="auto-row__foot">
                      <span className="mono dim">
                        agent {agents.find((x) => x.id === a.agentId)?.name ?? 'core'} · {a.steps.length} steps · {a.tags.join(', ')}
                      </span>
                      <span className="spacer" />
                      <Sparkline values={recent.length ? recent : [0]} height={16} tone={a.successRate > 0.9 ? 'var(--success)' : 'var(--warn)'} />
                      <span className="mono dim">{Math.round(a.successRate * 100)}%</span>
                      <span className="mono dim">·</span>
                      <span className="mono dim">last {last ? `${relativeTime(last.at)} · ${last.durationMs}ms · ${money(last.costUsd)}` : 'never'}</span>
                      <span className="auto-row__tools" onClick={(e) => e.stopPropagation()}>
                        <IconButton icon="play" size="sm" title="Run now" busy={!!busy[`auto:${a.id}`]} onClick={() => void runOne(a)} />
                        <IconButton icon="copy" size="sm" title="Duplicate" onClick={() => void services.automation.duplicate(a.id).then(() => { ui.bump('automations'); toast({ title: 'Duplicated', body: `${a.name} (copy) — paused until you arm it.`, severity: 'success', ttlMs: 3_400 }); })} />
                        <IconButton icon="trash" size="sm" tone="danger" title="Delete" onClick={() => void services.automation.remove(a.id).then(() => { ui.bump('automations'); if (openId === a.id) setOpenId(null); toast({ title: 'Automation removed', body: 'History kept in the audit log.', severity: 'info', ttlMs: 3_400 }); })} />
                      </span>
                    </div>
                    {liveSteps?.automationId === a.id && (
                      <div className="auto-row__live">
                        <Meter value={Math.min(96, (liveStepIndex(a) / a.steps.length) * 100)} tone="accent" height={2} />
                        <span className="mono">running · {a.steps.find((s) => s.status === 'running')?.name ?? 'finishing'}</span>
                      </div>
                    )}
                  </div>
                );
              })}
              {!autos.loading && !list.length && <EmptyState icon="automation" title="No standing orders" body="Give me one recurring outcome — a Monday brief, a nightly index, a weekly spend report — and I will keep it running." action={<Button size="sm" variant="solid" icon="plus" onClick={() => setEditing(true)}>Create one</Button>} />}
            </div>
          </section>
        </div>

        <div className="stack">
          {open ? (
            <>
              <section className="hud__panel">
                <header className="hud__panel-head">
                  <div className="hud__panel-title">
                    <Icon name="route" size={14} className="hud__panel-icon" />
                    <div>
                      <h3>{open.name}</h3>
                      <p className="hud__panel-sub">{open.trigger.expr ? `${open.trigger.kind} · ${open.trigger.expr}` : open.trigger.kind}</p>
                    </div>
                  </div>
                  <Chip size="sm" tone={RISK_TONE[open.risk]}>{open.risk}</Chip>
                </header>
                <div className="hud__panel-body">
                  <WorkflowCanvas graph={open} />
                  <SectionLabel right={<button className="linklike" onClick={() => setEditing(true)}>edit</button>}>Steps</SectionLabel>
                  <div className="steplist">
                    {open.steps.map((s, i) => (
                      <div key={s.id} className={cx('step', `is-${s.status}`, liveSteps?.automationId === open.id && `is-live`)}>
                        <span className="step__n mono">{i + 1}</span>
                        <span className={cx('step__kind', `step__kind--${s.kind}`)}>{s.kind}</span>
                        <div>
                          <b>{s.name}</b>
                          <span>{s.detail}</span>
                        </div>
                        <em className={cx('mono', `step__st step__st--${s.status}`)}>{s.status}</em>
                        {s.kind === 'approval' && (
                          <button
                            type="button"
                            className="step__gate"
                            title="Toggle the gate"
                            onClick={() => void services.automation.update(open.id, { requiresApproval: !open.requiresApproval }).then(() => { ui.bump('automations'); toast({ title: open.requiresApproval ? 'Gate removed' : 'Gate added', body: open.requiresApproval ? 'This can now run unattended — that is your call, recorded.' : 'It will stop and wait for your signature.', severity: open.requiresApproval ? 'warning' : 'success', ttlMs: 5_000 }); })}
                          >
                            <Icon name={open.requiresApproval ? 'lock' : 'key'} size={10} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <footer className="hud__panel-foot">
                  <Button size="sm" variant="solid" icon="play" busy={!!busy[`auto:${open.id}`]} onClick={() => void runOne(open)}>Run now</Button>
                  <Button size="sm" icon="task" onClick={() => void actions.createTask({ title: `Review automation: ${open.name}`, objective: 'Check outputs of recent runs and tighten the prompt.', priority: 'p2', projectId: null, departmentId: null, assigneeAgentId: open.agentId ?? null, estimateMin: 25 }).then(() => toast({ title: 'Task filed', body: 'I will look at the recent runs and tell you what to tighten.', severity: 'success', ttlMs: 4_000 }))}>
                    Task a review
                  </Button>
                  <span className="spacer" />
                  <span className="mono dim">{open.runs.length} runs kept</span>
                </footer>
              </section>

              <section className="hud__panel">
                <header className="hud__panel-head">
                  <div className="hud__panel-title">
                    <Icon name="activity" size={14} className="hud__panel-icon" />
                    <div>
                      <h3>Run history</h3>
                      <p className="hud__panel-sub">Cost, duration and the honest status of each.</p>
                    </div>
                  </div>
                </header>
                <div className="hud__panel-body runlog">
                  {open.runs.map((r) => (
                    <Row key={r.id} className={cx('runrow', flash[`run:${r.id}`] && 'is-flash')}>
                      <Chip size="sm" tone={r.status === 'ok' ? 'success' : r.status === 'partial' ? 'warn' : 'danger'}>{r.status}</Chip>
                      <span className="runrow__sum">{r.summary}</span>
                      <em className="mono dim">{r.durationMs}ms</em>
                      <em className="mono">{money(r.costUsd)}</em>
                      <em className="mono dim">{relativeTime(r.at)}</em>
                    </Row>
                  ))}
                  {!open.runs.length && <span className="dim" style={{ fontSize: 11 }}>No runs yet. The trigger is real; it has simply not fired.</span>}
                </div>
              </section>
            </>
          ) : (
            <EmptyState icon="automation" title="Pick an automation" body="Its workflow, steps and run history will appear here." />
          )}
        </div>
      </div>

      {editing && <AutomationEditor onClose={() => setEditing(false)} />}
    </div>
  );

  function liveStepIndex(a: Automation) {
    return a.steps.findIndex((s) => s.status === 'pending');
  }

  async function runOne(a: Automation) {
    setLiveSteps({ id: 'x', automationId: a.id, status: 'running' });
    const run = await actions.runAutomation(a.id);
    setLiveSteps(null);
    if (run) {
      toast({
        title: run.status === 'ok' ? `${a.name} · clean run` : run.status === 'partial' ? `${a.name} · held at gate` : `${a.name} · failed`,
        body: run.summary,
        severity: run.status === 'ok' ? 'success' : run.status === 'partial' ? 'warning' : 'critical',
        ttlMs: 9_000,
        action: run.status === 'partial' ? { label: 'Open notices', run: () => ui.go('notifications') } : undefined,
      });
    }
  }

  async function runAll() {
    const armed = (autos.data ?? []).filter((a) => a.enabled && !a.requiresApproval);
    if (!armed.length) {
      toast({ title: 'Nothing safe to run', body: 'Every armed automation has an approval gate. That is not me refusing — it is the policy you set.', severity: 'info', ttlMs: 5_000 });
      return;
    }
    for (const a of armed) {
      setLiveSteps({ id: 'x', automationId: a.id, status: 'running' });
      await actions.runAutomation(a.id);
    }
    setLiveSteps(null);
    toast({ title: `${armed.length} automations ran`, body: 'Ungated ones only. Gated ones still stop and wait for you.', severity: 'success', ttlMs: 6_000 });
  }
}

/* ── workflow canvas ─────────────────────────────────────────────────────── */

function WorkflowCanvas({ graph: auto }: { graph: Automation }) {
  const services = store.get().services;
  const [graph, setGraph] = useState<WorkflowGraph | null>(null);
  useEffect(() => {
    let alive = true;
    void services.automation.workflowFor(auto.id).then((g) => {
      if (alive) setGraph(g);
    });
    return () => {
      alive = false;
    };
  }, [auto.id, auto.steps]);

  const stepStatus = useMemo(() => new Map(auto.steps.map((s) => [s.name.toLowerCase(), s.status])), [auto.steps]);
  if (!graph) return <div className="wfcanvas wfcanvas--empty">laying out the workflow…</div>;

  const W = 360;
  const H = 150;
  const nodes = graph.nodes.map((n, i) => ({
    ...n,
    x: (n.x || ((i / Math.max(1, graph.nodes.length - 1)) * 0.86 + 0.07) * W) as number,
    y: (n.y || 40 + (i % 2) * 62) as number,
  }));
  const byId = new Map(nodes.map((n) => [n.id, n]));

  return (
    <div className="wfcanvas">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} className="wfcanvas__svg">
        <defs>
          <marker id="wf-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" className="wfcanvas__arrow" />
          </marker>
        </defs>
        {graph.edges.map((e, i) => {
          const a = byId.get(e.from);
          const b = byId.get(e.to);
          if (!a || !b) return null;
          const mx = (a.x + b.x) / 2;
          return (
            <path
              key={i}
              d={`M ${a.x + 34} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x - 34} ${b.y}`}
              className={cx('wfcanvas__edge', (stepStatus.get(b.label.toLowerCase()) ?? 'pending') !== 'pending' && 'is-hot')}
              markerEnd="url(#wf-arrow)"
            />
          );
        })}
        {nodes.map((n) => {
          const status = stepStatus.get(n.label.toLowerCase()) ?? 'pending';
          return (
            <g key={n.id} transform={`translate(${n.x} ${n.y})`} className={cx('wfcanvas__node', `is-${n.kind}`, `is-${status}`)}>
              <rect x={-34} y={-15} width={68} height={30} rx={7} />
              <text y={-1}>{n.label.length > 13 ? `${n.label.slice(0, 12)}…` : n.label}</text>
              <text y={10} className="wfcanvas__kind">{n.kind}</text>
            </g>
          );
        })}
      </svg>
      <div className="wfcanvas__legend">
        <span><i className="dot dot--trigger" /> trigger</span>
        <span><i className="dot dot--agent" /> agent</span>
        <span><i className="dot dot--approval" /> gate</span>
        <span><i className="dot dot--output" /> output</span>
      </div>
    </div>
  );
}

/* ── editor ──────────────────────────────────────────────────────────────── */

function AutomationEditor({ onClose }: { onClose: () => void }) {
  const agents = store.use((s) => s.agents);
  const busy = store.use((s) => !!s.busy['automations.create']);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [triggerKind, setTriggerKind] = useState<TriggerKind>('schedule');
  const [expr, setExpr] = useState('every weekday 06:45');
  const [agentId, setAgentId] = useState('');
  const [risk, setRisk] = useState<RiskLevel>('medium');

  return (
    <div className="scrim" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <header className="modal__head">
          <div>
            <span className="mono modal__eyebrow">AUTOMATIONS</span>
            <h2>New standing order</h2>
            <p>Recurring work gets its own trigger, its own agent and its own gate.</p>
          </div>
          <IconButton icon="close" title="Close" onClick={onClose} />
        </header>
        <div className="modal__body">
          <div className="field">
            <div className="field__head"><label>Name</label></div>
            <TextInput value={name} onChange={setName} placeholder="Weekly spend teardown" />
          </div>
          <div className="field">
            <div className="field__head"><label>What should become true</label></div>
            <textarea className="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="A one-screen read of token spend by department, with the two biggest wastes called out." />
          </div>
          <div className="field">
            <div className="field__head"><label>Trigger</label></div>
            <div className="trigger-grid">
              {TRIGGERS.map((t) => (
                <button key={t.id} type="button" className={cx('trigger-cell', triggerKind === t.id && 'is-on')} onClick={() => setTriggerKind(t.id)}>
                  <Icon name={t.id === 'schedule' ? 'clock' : t.id === 'file' ? 'file' : t.id === 'webhook' ? 'link' : t.id === 'intent' ? 'spark' : t.id === 'event' ? 'bolt' : 'play'} size={12} />
                  <b>{t.label}</b>
                  <span className="dim">{t.hint}</span>
                </button>
              ))}
            </div>
            <TextInput value={expr} onChange={setExpr} placeholder="cron: 45 6 * * 1-5" />
          </div>
          <div className="g2">
            <div className="field">
              <div className="field__head"><label>Agent</label></div>
              <select className="input" value={agentId} onChange={(e) => setAgentId(e.target.value)}>
                <option value="">HERCULES core (routes itself)</option>
                {agents.map((a) => (
                  <option key={a.id} value={a.id}>{a.name} · {a.roleId}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <div className="field__head"><label>Risk</label><span className="mono dim">{risk}</span></div>
              <SegmentedRisk value={risk} onChange={setRisk} />
              <p className="dim field__hint">
                {risk === 'critical' ? 'Always gated, always logged, and it will never run while you are away.' : risk === 'high' ? 'Gated by default: stops at the approval step.' : risk === 'medium' ? 'Runs unattended; outbound effects still ask.' : 'Runs unattended and reports afterwards.'}
              </p>
            </div>
          </div>
        </div>
        <footer className="modal__foot">
          <span className="dim mono">created paused? no — armed, so you can test it immediately</span>
          <span className="spacer" />
          <Button onClick={onClose}>Cancel</Button>
          <Button
            variant="solid"
            icon="bolt"
            busy={busy}
            disabled={!name.trim() || !description.trim()}
            onClick={() =>
              void actions.createAutomation({ name: name.trim(), description: description.trim(), triggerKind, expr: expr.trim(), agentId, risk }).then(() => {
                onClose();
                ui.go('automations');
              })
            }
          >
            Create & arm
          </Button>
        </footer>
      </div>
    </div>
  );
}

function SegmentedRisk({ value, onChange }: { value: RiskLevel; onChange: (v: RiskLevel) => void }) {
  return (
    <div className="segmented segmented--risk">
      {(['low', 'medium', 'high', 'critical'] as RiskLevel[]).map((r) => (
        <button key={r} type="button" className={cx('segmented__item', `is-${r}`, value === r && 'is-active')} onClick={() => onChange(r)}>
          {r}
        </button>
      ))}
    </div>
  );
}
