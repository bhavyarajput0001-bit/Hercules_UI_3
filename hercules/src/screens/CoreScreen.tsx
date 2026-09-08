/**
 * HERCULES · Core screen (home)
 * The activation moment: the presence, its read-out, what it is doing, the one
 * box where you command it, and the interruptions it judged worth bringing to
 * you. Everything else in the product is reachable from here.
 */
import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/Icon';
import { Bars, Button, Chip, IconButton, Meter, Row, SectionLabel, Spinner, StatusDot, cx } from '@/components/ui';
import { MessageBlocks } from '@/components/chat/MessageBlocks';
import { ChatComposer } from '@/components/chat/ChatComposer';
import { useHologram } from '@/hologram/useHologram';
import { OrbHologram } from '@/hologram/OrbHologram';
import { HologramDesignSwitcher } from '@/components/hologram/HologramDesignSwitcher';
import { type HologramDesignId } from '@/hologram/designs';
import { actions, chatState, store, ui } from '@/state/hercules';
import { useAsync } from '@/hooks/useAsync';
import { formatBytes, relativeTime } from '@/services/mock/helpers';
import type { MissionLog as MissionLogEntry } from '@/types/domain';

export default function CoreScreen() {
  const vitals = store.use((s) => s.vitals);
  const agents = store.use((s) => s.agents);
  const approvals = store.use((s) => s.approvals);
  const rev = store.use((s) => s.rev);
  const config = store.use((s) => s.config);
  const services = store.get().services;

  const appearance = config.appearance;
  const orbMode = appearance.hologram === 'orb';

  const canvasRef = useHologram('hero', () => {
    const s = store.get();
    const v = s.vitals;
    const streaming = !!s.busy['core.stream'];
    const noise = streaming || s.voice.active || s.voice.speaking ? Math.abs(Math.sin(performance.now() / 170)) : 0;
    return {
      state: s.voice.active ? 'listening' : v.state,
      energy: v.energy,
      amplitude: s.voice.active ? 0.45 + noise * 0.4 : s.voice.speaking ? s.voice.level : streaming ? 0.25 + noise * 0.4 : noise,
      satellites: s.agents.filter((a) => a.status === 'working' || a.status === 'thinking').length,
      label: `${v.state} · ${v.focus}`,
    };
  }, [orbMode]);

  const swapHologram = () => {
    void actions.patchSettings({ appearance: { ...appearance, hologram: orbMode ? 'core' : 'orb' } }, `hologram → ${orbMode ? 'core' : 'orb'}`);
  };

  const dragOrigin = useRef<{ x: number; y: number } | null>(null);
  const dragged = useRef(false);

  const setHologramDesign = (id: HologramDesignId) => {
    void actions.patchSettings({ appearance: { ...appearance, hologram: 'orb', hologramDesign: id } }, `design → ${id}`);
  };

  const { data: snapshot } = useAsync(() => services.system.snapshot(), [rev.system]);
  const live = agents.filter((a) => a.status === 'working' || a.status === 'thinking');
  const stuck = agents.filter((a) => a.status === 'blocked' || a.status === 'error');

  return (
    <div className="screen core-screen">
      <section className="core-hero">
        <div
          className="core-hero__stage"
          onClick={() => {
            if (dragged.current) {
              dragged.current = false;
              return;
            }
            ui.go('command-center');
          }}
          role="button"
          tabIndex={0}
          onPointerDown={(e) => {
            dragOrigin.current = { x: e.clientX, y: e.clientY };
          }}
          onPointerUp={(e) => {
            const o = dragOrigin.current;
            if (o && Math.hypot(e.clientX - o.x, e.clientY - o.y) > 6) dragged.current = true;
            dragOrigin.current = null;
          }}
          onKeyDown={(e) => e.key === 'Enter' && ui.go('command-center')}
          title="Open Command Center"
        >
          {orbMode ? (
            <OrbHologram
              variant="hero"
              feed={() => {
                const s = store.get();
                const v = s.vitals;
                const streaming = !!s.busy['core.stream'];
                const noise = streaming || s.voice.active || s.voice.speaking ? Math.abs(Math.sin(performance.now() / 170)) : 0;
                return {
                  state: s.voice.active ? 'listening' : v.state,
                  energy: v.energy,
                  amplitude: s.voice.active ? 0.45 + noise * 0.4 : s.voice.speaking ? s.voice.level : streaming ? 0.25 + noise * 0.4 : noise,
                  satellites: s.agents.filter((a) => a.status === 'working' || a.status === 'thinking').length,
                  label: `${v.state} · ${v.focus}`,
                };
              }}
              interactive
              design={appearance.hologramDesign}
              gesturesEnabled={appearance.gesturesEnabled}
            />
          ) : (
            <canvas ref={canvasRef} className="core-hero__canvas" />
          )}
          <div className="core-hero__state">
            <StatusDot
              status={
                vitals.state === 'error'
                  ? 'error'
                  : vitals.state === 'alert'
                    ? 'degraded'
                    : vitals.state === 'idle' || vitals.state === 'dormant'
                      ? 'idle'
                      : 'working'
              }
            />
            <span className="mono">{vitals.state}</span>
          </div>
          <div className="core-hero__hint">
            {orbMode ? (
              <>
                <Icon name="target" size={11} /> drag to spin · scroll to zoom
                {appearance.gesturesEnabled && <span className="dim"> · pinch your hands to gesture</span>}
              </>
            ) : (
              <>
                <Icon name="target" size={11} /> the core is also clickable → command center
              </>
            )}
          </div>
        </div>

        <div className="core-hero__side">
          <header className="core-greet">
            <span className="mono">
              {new Date().toLocaleString(undefined, { weekday: 'long', hour: '2-digit', minute: '2-digit', hour12: false })}
            </span>
            <h2>
              {greeting()}, Operator.
              <em>{vitals.state === 'idle' ? 'The estate is quiet. I kept it that way.' : 'I am holding the line for you.'}</em>
            </h2>
          </header>

          <div className="core-vitals">
            <VitalCell label="Cognitive load" value={`${vitals.cognitiveLoad}%`} bars={sparkline(vitals.cognitiveLoad)} tone={vitals.cognitiveLoad > 80 ? 'warn' : 'accent'} />
            <VitalCell label="Memory pressure" value={`${vitals.memoryPressure}%`} tone={vitals.memoryPressure > 80 ? 'warn' : 'accent2'} bars={sparkline(vitals.memoryPressure)} />
            <VitalCell label="Integrity" value={`${vitals.integrity.toFixed(1)}%`} tone="success" bars={sparkline(vitals.integrity, 4)} />
            <VitalCell label="Uptime" value={formatUptime(vitals.uptimeMs)} tone="dim" />
          </div>

          <div className="core-focus">
            <SectionLabel>Focus</SectionLabel>
            <p>{vitals.focus}</p>
            <div className="cluster">
              <Chip size="sm" tone="accent" icon="agent" onClick={() => ui.go('agents')}>
                {live.length} live
              </Chip>
              <Chip size="sm" tone={stuck.length ? 'danger' : 'dim'} icon="alert" onClick={() => stuck.length > 0 && ui.go('agents')}>
                {stuck.length} stuck
              </Chip>
              <Chip size="sm" tone="dim" icon="task" onClick={() => ui.go('tasks')}>
                {vitals.queuedTasks} queued
              </Chip>
              {snapshot && (
                <Chip size="sm" tone="dim" icon="cpu" title="Host GPU utilisation">
                  {snapshot.gpus[0]?.util ?? 0}% GPU
                </Chip>
              )}
              {snapshot && <Chip size="sm" tone="dim" icon="system" title="Host memory in use">{formatBytes(snapshot.memory.usedBytes)}</Chip>}
            </div>
          </div>

          <ChatComposer variant="core" />

          <div className="appearance-switch">
            <button type="button" onClick={swapHologram} title="Switch hologram renderer">
              <Icon name="core" size={13} />
              <b>{orbMode ? 'Orb' : 'Core'}</b>
              <span>{orbMode ? '3D volumetric · drag to explore' : '2D canvas · classic'}</span>
            </button>
            <button
              type="button"
              onClick={() => void actions.patchSettings({ appearance: { ...appearance, gesturesEnabled: !appearance.gesturesEnabled } }, `gestures ${appearance.gesturesEnabled ? 'off' : 'on'}`)}
              title="Toggle pinch gestures (uses camera)"
            >
              <Icon name="layers" size={13} />
              <b>Gestures</b>
              <span>{appearance.gesturesEnabled ? 'on · camera pinch' : 'off'}</span>
            </button>
            <button type="button" onClick={() => ui.go('settings')} title="More appearance options">
              <Icon name="spark" size={13} />
              <b>Style</b>
              <span>theme · glass · density</span>
            </button>
          </div>
          {orbMode && (
            <HologramDesignSwitcher
              compact
              value={appearance.hologramDesign ?? 'ultron'}
              onChange={setHologramDesign}
            />
          )}

          <div className="core-lanes">
            <button type="button" onClick={() => void actions.toggleVoice(true)}>
              <Icon name="mic" size={14} />
              <b>Voice</b>
              <span>armed capture · barge-in</span>
            </button>
            <button type="button" onClick={() => ui.go('terminal')}>
              <Icon name="terminal" size={14} />
              <b>Shell</b>
              <span>audited commands</span>
            </button>
            <button type="button" onClick={() => ui.setCommandBar(true)}>
              <Icon name="command" size={14} />
              <b>⌘K</b>
              <span>anything, anywhere</span>
            </button>
            <button type="button" onClick={() => ui.go('automations')}>
              <Icon name="automation" size={14} />
              <b>Automations</b>
              <span>runs without me</span>
            </button>
          </div>
        </div>
      </section>

      <section className="core-grid">
        <div className="hud__panel core-stream">
          <header className="hud__panel-head">
            <div className="hud__panel-title">
              <Icon name="spark" size={14} className="hud__panel-icon" />
              <div>
                <h3>Conversation</h3>
                <p className="hud__panel-sub">The core answers with plans, tool calls and cost — not prose.</p>
              </div>
            </div>
            <div className="hud__panel-actions">
              <Chip size="sm" tone="dim" icon="lock">
                no secrets in context
              </Chip>
              <IconButton icon="plus" size="sm" title="New thread" onClick={() => ui.flashFor('chat')} />
            </div>
          </header>
          <div className="core-stream__body">
            <MessageList />
          </div>
        </div>

        <div className="stack core-right">
          {approvals.length > 0 && (
            <section className="hud__panel core-asks">
              <header className="hud__panel-head">
                <div className="hud__panel-title">
                  <Icon name="shield" size={14} className="hud__panel-icon" style={{ color: 'var(--warn)' }} />
                  <div>
                    <h3>Needs your signature</h3>
                    <p className="hud__panel-sub">The only things I would not decide for you.</p>
                  </div>
                </div>
                <span className="badge badge--warn">{approvals.length}</span>
              </header>
              <div className="hud__panel-body stack--tight">
                {approvals.slice(0, 3).map((a) => (
                  <div key={a.id} className="ask">
                    <div className="ask__head">
                      <Chip size="sm" tone={a.risk === 'critical' ? 'danger' : 'warn'} icon="alert">
                        {a.risk}
                      </Chip>
                      <b>{a.requestedBy}</b>
                      <span className="dim mono">{relativeTime(a.createdAt)}</span>
                    </div>
                    <p className="ask__action">{a.action}</p>
                    <p className="ask__reason">{a.reason}</p>
                    {a.command && <pre className="ask__cmd mono">{a.command}</pre>}
                    <div className="ask__actions">
                      <Button variant="solid" size="sm" icon="check" busy={!!store.get().busy[`approval:${a.id}`]} onClick={() => void actions.respondApproval(a.id, true)}>
                        Approve
                      </Button>
                      <Button size="sm" onClick={() => void actions.respondApproval(a.id, false)}>
                        Deny
                      </Button>
                      <Button size="sm" variant="bare" onClick={() => ui.go('permissions')}>
                        Review policy
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="hud__panel core-live">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="agent" size={14} className="hud__panel-icon" />
                <div>
                  <h3>Live on the estate</h3>
                  <p className="hud__panel-sub">What the workforce is doing, updated as it happens.</p>
                </div>
              </div>
              <div className="hud__panel-actions">
                <button className="linklike" onClick={() => ui.go('agents')}>
                  all {agents.length}
                </button>
              </div>
            </header>
            <div className="hud__panel-body">
              {!live.length && <div className="dim" style={{ fontSize: 11.5 }}>Nothing running. Say something above and I will put people on it.</div>}
              {live.slice(0, 7).map((a) => (
                <Row key={a.id} className="live-row" onClick={() => ui.select({ kind: 'agent', id: a.id, label: a.name })}>
                  <StatusDot status={a.status} />
                  <div>
                    <b>{a.name}</b>
                    <span>{a.task}</span>
                  </div>
                  <em className="mono">{a.load}%</em>
                  {a.stepsTotal > 0 && (
                    <span className="live-row__prog">
                      <Meter value={a.stepsCompleted} max={a.stepsTotal} tone="accent" height={2} />
                    </span>
                  )}
                </Row>
              ))}
            </div>
            {!!live.length && (
              <footer className="hud__panel-foot">
                <Bars data={live.slice(0, 8).map((a) => ({ label: (a.name.split(' ')[0] ?? a.name).slice(0, 6), value: a.load }))} height={38} onPick={() => ui.go('agents')} />
              </footer>
            )}
          </section>

          <MissionLogPanel />
        </div>
      </section>
    </div>
  );
}

/* ── pieces ──────────────────────────────────────────────────────────────── */

function VitalCell({ label, value, tone, bars }: { label: string; value: string; tone?: string; bars?: number[] }) {
  return (
    <div className={cx('vital', `vital--${tone ?? 'accent'}`)}>
      <span className="vital__label">{label}</span>
      <b className="vital__value">{value}</b>
      {bars && (
        <div className="vital__bars">
          {bars.map((v, i) => (
            <span key={i} style={{ height: `${Math.max(6, v)}%` }} />
          ))}
        </div>
      )}
    </div>
  );
}

function MessageList() {
  const [, force] = useState(0);
  const rev = store.use((s) => s.rev);
  const scroller = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const off = chatState.subscribe(() => force((n) => n + 1));
    return () => {
      off();
    };
  }, []);
  useEffect(() => {
    void chatState.hydrate();
  }, [rev.boot]);
  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: 'smooth' });
  }, [chatState.entries.length]);

  if (!chatState.entries.length)
    return (
      <div className="core-stream__empty">
        <Icon name="core" size={26} />
        <p>Ask for an outcome, not a chat message. I will plan it, staff it, and report with evidence.</p>
        <div className="cluster" style={{ justifyContent: 'center' }}>
          {['Brief me on TITAN and anything needing my signature', 'What did research find about agent operating systems?', 'Show me this month’s spend and how to cut it'].map((s) => (
            <Chip key={s} size="sm" tone="dim" onClick={() => void actions.sendPrompt(s)}>
              {s}
            </Chip>
          ))}
        </div>
      </div>
    );

  return (
    <div className="core-stream__list" ref={scroller}>
      {chatState.entries.map((m) => (
        <article key={m.id} className={cx('msg', `msg--${m.role}`)}>
          <header className="msg__head">
            <span className="msg__who">{m.role === 'operator' ? 'You' : 'HERCULES'}</span>
            <span className="mono dim">{relativeTime(m.at)}</span>
            {m.streaming && <Spinner size={10} />}
          </header>
          <MessageBlocks blocks={m.blocks} streaming={m.streaming} />
        </article>
      ))}
    </div>
  );
}

function MissionLogPanel() {
  const services = store.get().services;
  const [items, setItems] = useState<MissionLogEntry[]>([]);
  useEffect(() => services.core.onCoreEvent.subscribe((e) => {
    if (e.type === 'log') setItems((prev) => [e.log, ...prev].slice(0, 9));
  }), [services]);

  return (
    <section className="hud__panel">
      <header className="hud__panel-head">
        <div className="hud__panel-title">
          <Icon name="activity" size={14} className="hud__panel-icon" />
          <div>
            <h3>Mission log</h3>
            <p className="hud__panel-sub">Decisions and repairs, pushed live.</p>
          </div>
        </div>
        <button className="linklike" onClick={() => ui.go('activity')}>
          full stream
        </button>
      </header>
      <div className="hud__panel-body">
        {!items.length && <div className="dim" style={{ fontSize: 11.5 }}>Quiet. Nothing has needed reporting in this window.</div>}
        {items.map((l) => (
          <div key={l.id} className={cx('logline', `logline--${l.level}`)}>
            <span className="mono dim">{relativeTime(l.at)}</span>
            <span className="logline__src">{l.source}</span>
            <span className="logline__text">{l.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── utils ───────────────────────────────────────────────────────────────── */

function greeting() {
  const h = new Date().getHours();
  if (h < 5) return 'Still awake';
  if (h < 11) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  if (h < 22) return 'Good evening';
  return 'Working late';
}

function formatUptime(ms: number) {
  const s = Math.floor(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  return h > 24 ? `${Math.floor(h / 24)}d ${h % 24}h` : `${h}h ${m % 60}m`;
}

function sparkline(base: number, amp = 10) {
  const t = Date.now() / 1400;
  return Array.from({ length: 18 }, (_, i) => Math.max(4, Math.min(100, base + Math.sin(t + i * 0.62) * amp + Math.cos(i * 1.7) * (amp / 2))));
}
