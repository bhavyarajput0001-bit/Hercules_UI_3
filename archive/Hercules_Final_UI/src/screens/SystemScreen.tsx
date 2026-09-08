/**
 * HERCULES · System control
 * The machine the estate lives on. Live samples arrive through the system
 * service (2s cadence) — CPU, thermals, VRAM, disks, network, power policy,
 * processes, devices and integrations, all actionable from here.
 */
import { useEffect, useMemo,  useState } from 'react';
import { Icon } from '@/components/Icon';
import { Button, Chip, IconButton, Meter, Row, SectionLabel, Sparkline, StatusDot, Toggle, cx } from '@/components/ui';
import { actions, store, toast, ui } from '@/state/hercules';
import { useAsync, useNow } from '@/hooks/useAsync';
import { formatBytes, relativeTime } from '@/services/mock/helpers';
import type { ProcessInfo } from '@/types/domain';


export default function SystemScreen() {
  const services = store.get().services;
  const config = store.use((s) => s.config);
  const vitals = store.use((s) => s.vitals);
  const busy = store.use((s) => s.busy);
  const rev = store.use((s) => s.rev);
  const { data: snap, refresh } = useAsync(() => services.system.snapshot(), [rev.system]);
  const procs = useAsync(() => services.system.processes(), [rev.system]);
  const devices = useAsync(() => services.system.devices(), [rev.system]);
  const integrations = useAsync(() => services.system.integrations(), [rev.integrations]);
  const [hist, setHist] = useState<{ cpu: number[]; mem: number[]; net: number[]; temp: number[]; up: number[] }>({ cpu: [], mem: [], net: [], temp: [], up: [] });
  const [showKill, setShowKill] = useState<ProcessInfo | null>(null);
  const now = useNow(1_000);

  useEffect(() => {
    // Live sampling: keep a rolling window so the charts are real history, not decoration.
    const off = services.system.onSample.subscribe(({ snapshot }) => {
      setHist((h) => ({
        cpu: [...h.cpu, Math.round(snapshot.cpu.load[1] ?? snapshot.cpu.load[0] ?? 0)].slice(-60),
        mem: [...h.mem, Math.round((snapshot.memory.usedBytes / snapshot.memory.totalBytes) * 100)].slice(-60),
        net: [...h.net, Math.round(snapshot.network.downMbps)].slice(-60),
        temp: [...h.temp, Math.round(snapshot.cpu.tempC)].slice(-60),
        up: [...h.up, Math.round(snapshot.network.upMbps)].slice(-60),
      }));
    });
    return off;
  }, [services]);

  const uptime = useMemo(() => vitals.uptimeMs + (now % 1_000), [vitals.uptimeMs, now]);

  if (!snap) {
    return (
      <div className="screen system-screen">
        <div className="sys-loading">
          <Icon name="cpu" size={18} className="spin" />
          <span>reading the machine…</span>
        </div>
      </div>
    );
  }

  const memPct = Math.round((snap.memory.usedBytes / snap.memory.totalBytes) * 100);
  const swapPct = snap.memory.swapBytes ? Math.round((snap.memory.swapUsedBytes / snap.memory.swapBytes) * 100) : 0;
  const hot = snap.cpu.tempC > 78;
  const agentProcs = (procs.data ?? []).filter((p) => p.kind === 'agent' || p.kind === 'hercules');
  const connected = (integrations.data ?? []).filter((i) => i.status === 'connected').length;

  return (
    <div className="screen system-screen">
      <div className="sys-hero">
        <div className="sys-hero__id">
          <span className="sys-hero__glyph"><Icon name="cpu" size={16} /></span>
          <div>
            <h2>{snap.os.name} <span className="dim">{snap.os.version}</span></h2>
            <p className="mono dim">{snap.os.hostname} · {snap.os.arch} · {snap.cpu.model} · {snap.cpu.cores}C/{snap.cpu.threads}T · up {formatDuration(uptime)}</p>
          </div>
        </div>
        <div className="sys-hero__actions">
          <Chip size="sm" tone={snap.battery.onAc ? 'success' : 'warn'} icon={snap.battery.onAc ? 'bolt' : 'alert'}>
            {snap.battery.onAc ? 'on power' : `${snap.battery.percent}% battery`}
          </Chip>
          <Chip size="sm" tone="dim" icon="activity">{snap.power.performanceMode}</Chip>
          <Button size="sm" icon="refresh" onClick={() => { refresh(); procs.refresh(); devices.refresh(); }}>Resample</Button>
          <Button size="sm" icon="analytics" onClick={() => ui.go('analytics')}>Cost & usage</Button>
        </div>
      </div>

      <div className="sys-grid">
        <GaugeCard title="CPU" icon="cpu" value={Math.round(snap.cpu.load[1] ?? 0)} unit="%" hist={hist.cpu} tone={snap.cpu.load[1] > 82 ? 'danger' : 'accent'} sub={`${snap.cpu.model.slice(0, 22)} · load ${snap.cpu.load.map((l) => l.toFixed(2)).join(' / ')}`} />
        <GaugeCard title="Memory" icon="database" value={memPct} unit="%" hist={hist.mem} tone={memPct > 88 ? 'danger' : 'accent'} sub={`${formatBytes(snap.memory.usedBytes)} of ${formatBytes(snap.memory.totalBytes)}${swapPct ? ` · swap ${swapPct}%` : ' · no swap'}`} />
        <GaugeCard title="Thermals" icon="bolt" value={Math.round(((snap.cpu.tempC - 30) / 70) * 100)} unit={`${snap.cpu.tempC}°C`} hist={hist.temp} tone={hot ? 'danger' : 'success'} sub={hot ? 'throttling window — heavy renders should wait' : 'nominal · fans inaudible'} />
        <GaugeCard title="Network" icon="wifi" value={Math.min(100, Math.round(snap.network.downMbps))} unit={`${snap.network.downMbps.toFixed(0)} Mbps`} hist={hist.net} tone={snap.network.latencyMs > 90 ? 'warn' : 'info'} sub={`${snap.network.interface} · ${snap.network.publicIpMasked} · ${snap.network.latencyMs}ms · ${snap.network.proxyActive ? 'proxy on' : 'direct'}`} />

        {snap.gpus.map((g) => (
          <GaugeCard
            key={g.name}
            title={g.name.split(' ').slice(0, 2).join(' ')}
            icon="system"
            value={Math.round(g.util)}
            unit="%"
            hist={[]}
            tone={g.util > 90 ? 'warn' : 'accent2'}
            sub={`${formatBytes(g.usedVramBytes)} / ${formatBytes(g.vramBytes)} VRAM · local models live here`}
          />
        ))}
      </div>

      <div className="split split--a">
        <div className="stack">
          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="system" size={14} className="hud__panel-icon" />
                <div>
                  <h3>Processes</h3>
                  <p className="hud__panel-sub">{(procs.data ?? []).length} tracked · {agentProcs.length} belong to the estate</p>
                </div>
              </div>
              <div className="cluster">
                <Button size="sm" icon="refresh" onClick={() => procs.refresh()}>Refresh</Button>
                <span className="mono dim">{Math.round((procs.data ?? []).reduce((n, p) => n + p.cpu, 0))}% total cpu</span>
              </div>
            </header>
            <div className="hud__panel-body proclist">
              {(procs.data ?? []).map((p) => (
                <Row key={p.pid} className={cx('procrow', p.kind === 'agent' && 'is-agent')}>
                  <span className={cx('procrow__kind', `procrow__kind--${p.kind}`)}>{p.kind}</span>
                  <span className="mono dim procrow__pid">{p.pid}</span>
                  <div className="procrow__name">
                    <b>{p.name}</b>
                    {p.agentId && <span className="mono dim">agent {p.agentId}</span>}
                  </div>
                  <span className="procrow__meter"><Meter value={p.cpu} tone={p.cpu > 60 ? 'danger' : p.cpu > 30 ? 'warn' : 'accent'} height={3} /></span>
                  <em className="mono">{p.cpu.toFixed(1)}%</em>
                  <em className="mono dim">{formatBytes(p.memMb * 1024 * 1024)}</em>
                  <span className="procrow__x">
                    {(p.kind === 'agent' || p.kind === 'hercules') ? (
                      <IconButton icon="close" size="sm" tone="danger" title={`Terminate ${p.name}`} onClick={() => setShowKill(p)} />
                    ) : (
                      <span className="dim mono">host</span>
                    )}
                  </span>
                </Row>
              ))}
            </div>
          </section>

          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="command" size={14} className="hud__panel-icon" />
                <div>
                  <h3>Disks</h3>
                  <p className="hud__panel-sub">Where the workspace, index and media renders physically live.</p>
                </div>
              </div>
            </header>
            <div className="hud__panel-body stack--tight">
              {snap.disks.map((d) => {
                const pct = Math.round((d.usedBytes / d.totalBytes) * 100);
                return (
                  <div key={d.mount} className="diskrow">
                    <span className="mono diskrow__m">{d.mount}</span>
                    <Meter value={pct} tone={pct > 88 ? 'danger' : pct > 72 ? 'warn' : 'success'} height={5} />
                    <span className="mono dim">{formatBytes(d.usedBytes)} / {formatBytes(d.totalBytes)}</span>
                    <span className="mono dim">r {d.readMbps.toFixed(0)} / w {d.writeMbps.toFixed(0)} MB/s</span>
                    <button type="button" className="linklike" onClick={() => void actions.sendPrompt(`Disk ${d.mount} is at ${pct}%. Tell me what to clean first and how much it frees.`)}>Ask me to clean it</button>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="plug" size={14} className="hud__panel-icon" />
                <div>
                  <h3>Integrations</h3>
                  <p className="hud__panel-sub">What the estate can reach beyond this machine — and what agents may use.</p>
                </div>
              </div>
              <Chip size="sm" tone="dim">{connected} / {(integrations.data ?? []).length} connected</Chip>
            </header>
            <div className="hud__panel-body intgrid">
              {(integrations.data ?? []).map((i) => (
                <div key={i.id} className={cx('intcell', `is-${i.status}`, i.agentUsable && 'is-agent')}>
                  <div className="intcell__head">
                    <StatusDot status={i.status === 'connected' ? 'online' : i.status === 'error' ? 'error' : 'idle'} pulse={i.status === 'connected'} />
                    <b>{i.name}</b>
                    <span className="spacer" />
                    <Chip size="sm" tone="dim">{i.category}</Chip>
                  </div>
                  <span className="mono dim intcell__acct">{i.account}</span>
                  <div className="intcell__scopes">
                    {i.scopes.length ? i.scopes.map((sc) => <em key={sc}>{sc}</em>) : <em className="dim">no scopes granted</em>}
                  </div>
                  <div className="intcell__foot">
                    <span className="mono dim">{i.lastSync ? `synced ${relativeTime(i.lastSync)}` : 'never synced'}</span>
                    <span className="spacer" />
                    {i.agentUsable && <Chip size="sm" tone="accent" icon="agent">agents</Chip>}
                    <Button
                      size="sm"
                      variant={i.status === 'connected' ? 'ghost' : 'solid'}
                      busy={!!busy[`integration:${i.id}`]}
                      onClick={() => void actions.toggleIntegration(i.id, i.status === 'connected')}
                    >
                      {i.status === 'connected' ? 'Disconnect' : 'Connect'}
                    </Button>
                  </div>
                  {i.status === 'error' && <div className="intcell__err"><Icon name="alert" size={10} /> {i.account}</div>}
                </div>
              ))}
            </div>
            <footer className="hud__panel-foot">
              <span className="dim">no keys live in this app — connecting hands off to the OS keychain / vault and only a handle stays here</span>
              <span className="spacer" />
              <button className="linklike" onClick={() => ui.go('permissions')}>secret handles</button>
            </footer>
          </section>
        </div>

        <div className="stack">
          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="shield" size={14} className="hud__panel-icon" />
                <div>
                  <h3>Power & presence</h3>
                  <p className="hud__panel-sub">Whether I stay awake, stay reachable, and stay quiet.</p>
                </div>
              </div>
            </header>
            <div className="hud__panel-body stack--tight">
              <SettingRow
                label="Block sleep while missions run"
                hint={snap.power.sleepBlockers.length ? `held by: ${snap.power.sleepBlockers.join(', ')}` : 'nothing is holding sleep open right now'}
                control={<Toggle size="sm" checked={snap.power.sleepBlockers.length > 0} onChange={(v) => void actions.keepAwake(v)} />}
              />
              <SettingRow
                label="Launch at login"
                hint="Starts cold before you log in — the core boots into standby"
                control={<Toggle size="sm" checked={config.core.alwaysAvailable} onChange={(v) => void actions.launchAtLogin(v)} />}
              />
              <SettingRow
                label="Auto-pause on battery"
                hint="Renders and long runs wait for power so the machine stays usable"
                control={<Toggle size="sm" checked={config.core.autoPauseOnBattery} onChange={(v) => void actions.patchSettings({ core: { autoPauseOnBattery: v } }, v ? 'Battery policy on' : 'Battery policy off')} />}
              />
              <SettingRow
                label="Performance mode"
                hint={`${snap.power.performanceMode} · ${snap.battery.onAc ? 'charger attached' : 'on battery'}`}
                control={
                  <div className="segmented segmented--sm">
                    {(['eco', 'balanced', 'max'] as const).map((m) => (
                      <button key={m} type="button" className={cx('segmented__item', snap.power.performanceMode === m && 'is-active')} onClick={() => toast({ title: `Performance → ${m}`, body: m === 'max' ? 'Fans audible; local models get the whole GPU.' : m === 'eco' ? 'Cloud models preferred; local inference capped to 2 threads.' : 'Balance between noise and speed.', severity: 'info', ttlMs: 4_000 })}>{m}</button>
                    ))}
                  </div>
                }
              />
              <SettingRow
                label="Summon hotkey"
                hint={config.core.hotkeySummon}
                control={<Button size="sm" icon="key" onClick={() => ui.go('settings')}>Change</Button>}
              />
            </div>
          </section>

          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="mic" size={14} className="hud__panel-icon" />
                <div>
                  <h3>Devices</h3>
                  <p className="hud__panel-sub">{snap.audio.inputDevice} in · {snap.audio.outputDevice} out</p>
                </div>
              </div>
            </header>
            <div className="hud__panel-body stack--tight">
              {(devices.data ?? []).map((d) => (
                <Row key={d.id} className={cx('devrow', d.default && 'is-default')}>
                  <Icon name={d.kind === 'microphone' ? 'mic' : d.kind === 'speaker' ? 'media' : d.kind === 'camera' ? 'media' : d.kind === 'display' ? 'system' : 'command'} size={12} className="dim" />
                  <span>{d.name}</span>
                  {d.kind === 'microphone' && typeof d.level === 'number' && (
                    <span className="devrow__level"><Meter value={d.level * 100} tone="accent" height={3} /></span>
                  )}
                  <em className="mono dim">{d.status}</em>
                  <span className="spacer" />
                  {d.default ? (
                    <Chip size="sm" tone="success" icon="check">default</Chip>
                  ) : (
                    <Button size="sm" onClick={() => void services.system.setDefaultDevice(d.id).then(() => { devices.refresh(); toast({ title: `Default ${d.kind} → ${d.name}`, severity: 'success', ttlMs: 3_000 }); })}>
                      Make default
                    </Button>
                  )}
                </Row>
              ))}
              <div className="cluster" style={{ marginTop: 6 }}>
                <span className="mono dim">output level {Math.round(snap.audio.inputLevel * 100)}% input</span>
                {snap.audio.muted && <Chip size="sm" tone="danger" icon="close">input muted</Chip>}
              </div>
            </div>
            <footer className="hud__panel-foot">
              <SectionLabel right={<button className="linklike" onClick={() => void services.system.openSettings('sound').then(() => toast({ title: 'OS sound panel', body: 'Deep link requested from the shell; in the browser demo this is a no-op that reports back.', severity: 'info', ttlMs: 3_400 }))}>OS settings</button>}>displays</SectionLabel>
            </footer>
            <div className="hud__panel-body stack--tight" style={{ paddingTop: 0 }}>
              {snap.displays.length === 0 && <span className="dim" style={{ fontSize: 11 }}>no displays</span>}
              {snap.displays.map((d) => (
                <Row key={d.id} className="minirow">
                  <Icon name="system" size={11} />
                  <span>{d.label}</span>
                  <em className="mono dim">{d.resolution} @ {d.scale}×</em>
                </Row>
              ))}
            </div>
          </section>

          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="activity" size={14} className="hud__panel-icon" />
                <div>
                  <h3>What the core thinks of it</h3>
                  <p className="hud__panel-sub">Auto-diagnosis from the same sample stream.</p>
                </div>
              </div>
            </header>
            <div className="hud__panel-body stack--tight">
              <Diag tone={hot ? 'warn' : 'ok'} text={hot ? `Thermals at ${snap.cpu.tempC}°C — I will hold renders until it drops below 74.` : 'Thermals fine. Local models can take the whole GPU if you want speed.'} />
              <Diag tone={memPct > 85 ? 'warn' : 'ok'} text={memPct > 85 ? `Memory at ${memPct}% — one more cloud-parallel agent would force swap. I am queueing instead of spawning.` : `Memory headroom ${(100 - memPct)}%. Two more agents fit comfortably.`} />
              <Diag tone={snap.network.latencyMs > 90 ? 'warn' : 'ok'} text={snap.network.latencyMs > 90 ? `Cloud latency ${snap.network.latencyMs}ms — I have shifted routing toward local models.` : `Cloud reachable in ${snap.network.latencyMs}ms — router keeping the usual split.`} />
              <Diag tone={swapPct > 40 ? 'warn' : 'ok'} text={swapPct > 40 ? `Swap ${swapPct}% used — closing the browser tab stack would help.` : 'No swap pressure.'} />
              <Diag tone="info" text={`Vitals say ${vitals.state} · load ${vitals.cognitiveLoad}% · ${vitals.activeAgents} agents on shift, ${vitals.queuedTasks} in queue.`} />
            </div>
            <footer className="hud__panel-foot">
              <Button size="sm" icon="spark" onClick={() => void actions.sendPrompt('Run a full diagnostic on this machine and tell me the three things that would make me faster today.')}>
                Ask for a full diagnostic
              </Button>
            </footer>
          </section>
        </div>
      </div>

      {showKill && (
        <div className="scrim" onMouseDown={(e) => e.target === e.currentTarget && setShowKill(null)}>
          <div className="modal modal--sm">
            <header className="modal__head">
              <div>
                <span className="mono modal__eyebrow">PROCESS CONTROL</span>
                <h2>Terminate {showKill.name}?</h2>
                <p>pid {showKill.pid} · {formatBytes(showKill.memMb * 1024 * 1024)} · using {showKill.cpu}% of a core</p>
              </div>
              <IconButton icon="close" title="Cancel" onClick={() => setShowKill(null)} />
            </header>
            <div className="modal__body">
              <div className="notice notice--danger">
                <Icon name="alert" size={13} />
                <div>
                  <b>This is an estate process</b>
                  <span>Anything it was holding mid-flight will be marked interrupted, not lost. The owning agent will report the restart in its next status.</span>
                </div>
              </div>
            </div>
            <footer className="modal__foot">
              <span className="spacer" />
              <Button onClick={() => setShowKill(null)}>Leave it</Button>
              <Button
                variant="danger"
                icon="close"
                busy={!!busy[`kill:${showKill.pid}`]}
                onClick={() => void actions.killProcess(showKill.pid, showKill.name).then(() => { setShowKill(null); procs.refresh(); })}
              >
                Terminate
              </Button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}

function GaugeCard({ title, icon, value, unit, hist, tone, sub }: { title: string; icon: string; value: number; unit: string; hist: number[]; tone: 'accent' | 'accent2' | 'danger' | 'warn' | 'info' | 'success'; sub: string }) {
  return (
    <section className={cx('gauge-card', `is-${tone}`)}>
      <header>
        <Icon name={icon} size={12} className="dim" />
        <b>{title}</b>
        <span className="spacer" />
        <span className="mono gauge-card__v"><b>{unit}</b></span>
      </header>
      <Sparkline values={hist.length ? hist : [value * 0.8, value * 0.95, value]} height={40} tone={`var(--${tone === 'danger' ? 'danger' : tone === 'warn' ? 'warn' : tone === 'info' ? 'info' : tone === 'success' ? 'success' : 'accent'})`} />
      <Meter value={Math.min(100, value)} tone={tone} height={3} />
      <p className="mono dim">{sub}</p>
    </section>
  );
}

function SettingRow({ label, hint, control }: { label: string; hint: string; control: React.ReactNode }) {
  return (
    <div className="settingrow">
      <div>
        <b>{label}</b>
        <span className="dim">{hint}</span>
      </div>
      {control}
    </div>
  );
}

function Diag({ tone, text }: { tone: 'ok' | 'warn' | 'info'; text: string }) {
  return (
    <div className={cx('diag', `is-${tone}`)}>
      <span className="diag__mark">{tone === 'ok' ? <Icon name="check" size={10} /> : tone === 'warn' ? <Icon name="alert" size={10} /> : <Icon name="activity" size={10} />}</span>
      <span>{text}</span>
    </div>
  );
}

function formatDuration(ms: number) {
  const s = Math.floor(ms / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (d) return `${d}d ${h}h ${m}m`;
  if (h) return `${h}h ${m}m`;
  return `${m}m ${s % 60}s`;
}
