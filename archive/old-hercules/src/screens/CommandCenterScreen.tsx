/**
 * HERCULES · Command Center
 * The operational brain: a dispatch console where you type intent, watch it
 * break into a plan, and see which part of the estate is holding each piece.
 */
import { useEffect, useState } from 'react';
import { Icon } from '@/components/Icon';
import { Bars, Button, Chip, IconButton, Meter, Row, SectionLabel, Spinner, StatusDot, cx } from '@/components/ui';
import { ChatComposer } from '@/components/chat/ChatComposer';
import { MessageBlocks } from '@/components/chat/MessageBlocks';
import { useHologram } from '@/hologram/useHologram';
import { actions, chatState, store, toast, ui } from '@/state/hercules';
import { relativeTime } from '@/services/mock/helpers';

const INTENTS: { id: string; label: string; icon: string; prompt: string; tone?: string }[] = [
  { id: 'brief', label: 'Status briefing', icon: 'spark', prompt: 'Brief me: what is live, what is stuck, what needs my signature.' },
  { id: 'dispatch', label: 'Dispatch objective', icon: 'bolt', prompt: 'New objective — ', tone: 'accent' },
  { id: 'replan', label: 'Re-plan the week', icon: 'task', prompt: 'Re-plan my week around the investor call and protect two deep-work blocks.' },
  { id: 'audit', label: 'Trust check', icon: 'shield', prompt: 'What did agents touch in my files and mail in the last hour? Show the audit trail.', tone: 'warn' },
  { id: 'cut', label: 'Cut spend', icon: 'analytics', prompt: 'Cut this month’s model spend by at least 15% without hurting delivery, and show me the trade-off.' },
  { id: 'freeze', label: 'Freeze estate', icon: 'lock', prompt: '__freeze', tone: 'danger' },
  { id: 'voice', label: 'Voice capture', icon: 'mic', prompt: '__voice' },
  { id: 'terminal', label: 'Open shell', icon: 'terminal', prompt: '__terminal' },
];

export default function CommandCenterScreen() {
  const vitals = store.use((s) => s.vitals);
  const agents = store.use((s) => s.agents);
  const tasks = store.use((s) => s.tasks);
  const notices = store.use((s) => s.notices);
  const approvals = store.use((s) => s.approvals);
  const rev = store.use((s) => s.rev);
  const busy = store.use((s) => s.busy);
  const [activeLane, setActiveLane] = useState<string | null>(null);

  const canvasRef = useHologram('inline', () => {
    const s = store.get();
    return {
      state: s.vitals.state,
      energy: s.vitals.energy,
      amplitude: s.busy['core.stream'] ? 0.3 + Math.abs(Math.sin(performance.now() / 160)) * 0.35 : s.voice.level,
      satellites: s.agents.filter((a) => a.status === 'working' || a.status === 'thinking').length,
    };
  });

  useEffect(() => setActiveLane(null), [rev.tasks]);

  const lanes = [
    { id: 'dispatch', label: 'Dispatch', items: tasks.filter((t) => t.status === 'queued' || t.status === 'in-progress') },
    { id: 'gate', label: 'Gates', items: tasks.filter((t) => t.status === 'awaiting-approval' || t.status === 'blocked') },
    { id: 'verify', label: 'Verification', items: tasks.filter((t) => t.status === 'review') },
    { id: 'closed', label: 'Closed', items: tasks.filter((t) => t.status === 'done' || t.status === 'failed').slice(0, 8) },
  ];

  const runIntent = (it: (typeof INTENTS)[number]) => {
    if (it.prompt === '__freeze') return void actions.freezeEstate();
    if (it.prompt === '__voice') return void actions.toggleVoice(true);
    if (it.prompt === '__terminal') return ui.go('terminal');
    ui.busy('core.stream', true);
    void actions.sendPrompt(it.prompt).finally(() => ui.busy('core.stream', false));
  };

  const working = agents.filter((a) => a.status === 'working' || a.status === 'thinking');
  const load = Math.max(1, working.length);

  return (
    <div className="screen cmd-screen">
      <section className="cmd-head">
        <div className="cmd-core">
          <canvas ref={canvasRef} className="cmd-core__canvas" />
          <div className="cmd-core__text">
            <span className="mono">CORE · {vitals.state.toUpperCase()}</span>
            <b>{vitals.focus}</b>
            <div className="cluster">
              <Chip size="sm" tone="accent" icon="agent">{vitals.activeAgents} live</Chip>
              <Chip size="sm" tone="dim" icon="task">{vitals.queuedTasks} queued</Chip>
              <Chip size="sm" tone={approvals.length ? 'warn' : 'dim'} icon="shield">{approvals.length} at gates</Chip>
            </div>
          </div>
        </div>
        <div className="cmd-actions">
          {INTENTS.map((it) => (
            <button key={it.id} type="button" className={cx('cmd-intent', it.tone && `is-${it.tone}`)} onClick={() => runIntent(it)} disabled={!!busy['core.stream'] && it.prompt.startsWith('New')}>
              <Icon name={it.icon} size={14} />
              <span>{it.label}</span>
              {it.prompt === '__freeze' && <em>{working.length}</em>}
            </button>
          ))}
        </div>
      </section>

      <div className="split split--a">
        <div className="stack">
          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="command" size={14} className="hud__panel-icon" />
                <div>
                  <h3>Give an order</h3>
                  <p className="hud__panel-sub">Plain language in, an executed plan out. I decide who does the work.</p>
                </div>
              </div>
              {busy['core.stream'] && <Spinner />}
            </header>
            <div className="hud__panel-body">
              <ChatComposer variant="wide" autoFocus />
            </div>
          </section>

          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="layers" size={14} className="hud__panel-icon" />
                <div>
                  <h3>Execution lanes</h3>
                  <p className="hud__panel-sub">Everything the estate is holding, by gate. Click a lane to inspect it.</p>
                </div>
              </div>
              <div className="hud__panel-actions">
                <Button size="sm" icon="task" onClick={() => ui.go('tasks')}>
                  Board
                </Button>
              </div>
            </header>
            <div className="hud__panel-body lanes">
              {lanes.map((l) => (
                <button
                  type="button"
                  key={l.id}
                  className={cx('lane', activeLane === l.id && 'is-open', l.items.length > 4 && l.id === 'gate' && 'is-hot')}
                  onClick={() => setActiveLane(activeLane === l.id ? null : l.id)}
                >
                  <header>
                    <b>{l.label}</b>
                    <span className="mono">{l.items.length}</span>
                  </header>
                  <div className="lane__list">
                    {l.items.slice(0, activeLane === l.id ? 10 : 3).map((t) => (
                      <div key={t.id} className="lane__item" onClick={(e) => { e.stopPropagation(); ui.select({ kind: 'task', id: t.id, label: t.title }); }}>
                        <StatusDot status={t.status} pulse={false} />
                        <span>{t.title}</span>
                        <em className="mono">{t.progress}%</em>
                      </div>
                    ))}
                    {!l.items.length && <span className="dim">—</span>}
                  </div>
                  {l.items.length > 3 && <small className="dim mono">{activeLane === l.id ? 'collapse' : `${l.items.length - 3} more`}</small>}
                </button>
              ))}
            </div>
          </section>

          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="agent" size={14} className="hud__panel-icon" />
                <div>
                  <h3>Who is holding what</h3>
                  <p className="hud__panel-sub">Live assignments. Steer from the inspector or park an agent here.</p>
                </div>
              </div>
              <div className="hud__panel-actions">
                <Button size="sm" icon="agent" onClick={() => ui.go('agents')}>
                  Estate
                </Button>
              </div>
            </header>
            <div className="hud__panel-body">
              {working.map((a) => (
                <Row key={a.id} className="who-row" onClick={() => ui.select({ kind: 'agent', id: a.id, label: a.name })}>
                  <StatusDot status={a.status} />
                  <div>
                    <b>{a.name}</b>
                    <span>{a.task}</span>
                    {a.stepsTotal > 0 && <Meter value={a.stepsCompleted} max={a.stepsTotal} tone="accent" height={2} />}
                  </div>
                  <em className="mono">{a.load}%</em>
                  <IconButton icon="pause" size="sm" title={`Park ${a.name}`} onClick={() => void actions.pauseAgent(a.id)} />
                  <IconButton icon="bolt" size="sm" title={`Boost ${a.name}`} onClick={() => void actions.boostAgent(a.id)} />
                </Row>
              ))}
              {!working.length && <div className="dim" style={{ fontSize: 11.5 }}>Idle. Dispatch something above.</div>}
            </div>
          </section>
        </div>

        <div className="stack">
          <section className="hud__panel cmd-stream">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="spark" size={14} className="hud__panel-icon" />
                <div>
                  <h3>Answer</h3>
                  <p className="hud__panel-sub">Streaming from the core.</p>
                </div>
              </div>
              <div className="hud__panel-actions">
                {busy['core.stream'] && (
                  <Button size="sm" variant="danger" icon="close" onClick={() => actions.stopStream()}>
                    Stop
                  </Button>
                )}
              </div>
            </header>
            <div className="hud__panel-body cmd-stream__body">
              {chatState.entries.slice(-2).map((m) => (
                <article key={m.id} className={cx('msg', `msg--${m.role}`)}>
                  <header className="msg__head">
                    <span className="msg__who">{m.role === 'operator' ? 'You' : 'HERCULES'}</span>
                    <span className="mono dim">{relativeTime(m.at)}</span>
                  </header>
                  {m.role === 'operator' ? <p className="block block--text">{m.blocks[0]?.text}</p> : <MessageBlocks blocks={m.blocks} streaming={m.streaming} />}
                </article>
              ))}
            </div>
          </section>

          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="cpu" size={14} className="hud__panel-icon" />
                <div>
                  <h3>Estate pressure</h3>
                  <p className="hud__panel-sub">Where capacity is going right now.</p>
                </div>
              </div>
            </header>
            <div className="hud__panel-body">
              <Meter value={vitals.cognitiveLoad} label="Cognitive load" tone={vitals.cognitiveLoad > 78 ? 'warn' : 'accent'} />
              <Meter value={vitals.memoryPressure} label="Memory pressure" tone="accent2" />
              <Meter value={(load / 10) * 100} label={`Concurrency · ${load} agents`} tone="info" />
              <SectionLabel>By tier</SectionLabel>
              <Bars
                data={(['ceo', 'orchestrator', 'department', 'specialist', 'subagent', 'labor'] as const).map((tier) => ({
                  label: tier.slice(0, 5),
                  value: agents.filter((a) => a.tier === tier && (a.status === 'working' || a.status === 'thinking')).length * 12 + 1,
                  tone: tier === 'labor' ? 'var(--accent-2)' : tier === 'subagent' ? 'var(--info)' : 'var(--accent)',
                }))}
                height={64}
              />
            </div>
          </section>

          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="bell" size={14} className="hud__panel-icon" />
                <div>
                  <h3>Interrupts</h3>
                  <p className="hud__panel-sub">What I judged worth your attention.</p>
                </div>
              </div>
              <span className="badge">{notices.filter((n) => !n.read).length} new</span>
            </header>
            <div className="hud__panel-body stack--tight">
              {notices.slice(0, 4).map((n) => (
                <div key={n.id} className={cx('interrupt', `is-${n.severity}`, !n.read && 'is-unread')}>
                  <b>{n.title}</b>
                  <p>{n.body}</p>
                  <div className="interrupt__foot">
                    <span className="dim mono">{n.source} · {relativeTime(n.at)}</span>
                    <span className="spacer" />
                    {n.actionable && (
                      <button type="button" className="linklike" onClick={() => ui.go('notifications')}>
                        handle
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {!notices.length && (
                <div className="dim" style={{ fontSize: 11.5 }}>
                  Nothing interrupted you today. That is the intended state.
                </div>
              )}
            </div>
            <footer className="hud__panel-foot">
              <button className="linklike" onClick={() => void actions.markAllRead()}>mark all read</button>
              <span className="spacer" />
              <button
                className="linklike"
                onClick={() =>
                  toast({
                    title: 'Interrupt policy',
                    body: 'Only critical + warning severities surface here; everything else is batched into the 07:00 brief.',
                    severity: 'info',
                    ttlMs: 6_000,
                  })
                }
              >
                why these?
              </button>
            </footer>
          </section>
        </div>
      </div>
    </div>
  );
}
