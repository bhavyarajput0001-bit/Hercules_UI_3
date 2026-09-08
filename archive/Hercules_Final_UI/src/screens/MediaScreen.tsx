/**
 * HERCULES · Media control
 * Playback the core can command: it ducks under speech, follows transport
 * keys, takes device changes from voice, and its "media agent" produces the
 * transcripts, frames and renders in the library below.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from '@/components/Icon';
import { Button, Chip, IconButton, Meter, Row, SectionLabel, Select, Toggle, cx } from '@/components/ui';
import { actions, store, toast, ui } from '@/state/hercules';
import { useAsync } from '@/hooks/useAsync';
import { dur, relativeTime } from '@/services/mock/helpers';
import type { MediaArtifact } from '@/services/contracts';

export default function MediaScreen() {
  const services = store.get().services;
  const media = store.use((s) => s.media);
  const voice = store.use((s) => s.voice);
  const config = store.use((s) => s.config);
  const rev = store.use((s) => s.rev);
  const agents = store.use((s) => s.agents);
  const library = useAsync(() => services.media.library(), [rev.files]);
  const devices = useAsync(() => services.system.devices(), [rev.system]);
  const integrations = useAsync(() => services.system.integrations(), [rev.integrations]);
  const [seeking, setSeeking] = useState<number | null>(null);
  const [filter, setFilter] = useState<MediaArtifact['kind'] | 'all'>('all');
  const barsRef = useRef<HTMLDivElement | null>(null);

  const track = media.track;
  const position = seeking ?? media.positionSec;
  const duration = track?.durationSec ?? 0;
  const ducked = voice.speaking && config.voice.duckMedia;
  const mediaAgent = agents.find((a) => a.roleId.toLowerCase().includes('media') || a.name.toLowerCase().includes('media'));

  // Level meter: real playback + voice state drives the bars, nothing is random.
  useEffect(() => {
    const el = barsRef.current;
    if (!el) return;
    let raf = 0;
    let t = 0;
    const loop = () => {
      t += 0.06;
      const kids = el.children;
      for (let i = 0; i < kids.length; i += 1) {
        const b = kids[i] as HTMLElement;
        const base = media.playing ? 0.35 + 0.4 * Math.abs(Math.sin(t + i * 0.55)) : 0.06;
        const voiceBoost = voice.active ? 0.3 * (0.4 + voice.level) : 0;
        b.style.transform = `scaleY(${Math.min(1, base + voiceBoost).toFixed(3)})`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [media.playing, voice.active, voice.level]);

  const shown = useMemo(() => (filter === 'all' ? library.data ?? [] : (library.data ?? []).filter((a) => a.kind === filter)), [library.data, filter]);

  return (
    <div className="screen media-screen">
      <div className="split split--a">
        <div className="stack">
          <section className={cx('hud__panel media-now', media.playing && 'is-playing', ducked && 'is-ducked')}>
            <div className="media-now__stage">
              <div className="media-now__art" style={{ ['--hue' as string]: track?.artworkHue ?? 190 }}>
                <span className="media-now__ring" />
                <span className="media-now__ring media-now__ring--2" />
                <Icon name="media" size={22} />
                {media.playing && <span className="media-now__pulse" />}
              </div>
              <div className="media-now__meta">
                <span className="mono media-now__src">{track?.source ?? 'no source'}</span>
                <h2>{track?.title ?? 'Nothing playing'}</h2>
                <p>{track ? `${track.artist} · ${track.album}` : 'Queue something, or say “play something with no words in it”.'}</p>
                <div className="media-level" ref={barsRef}>
                  {Array.from({ length: 24 }, (_, i) => (
                    <i key={i} />
                  ))}
                </div>
                {ducked && (
                  <div className="media-duck">
                    <Icon name="mic" size={11} /> ducked to 18% while the core speaks · {config.voice.duckMedia ? 'as configured' : 'override in Settings → Voice'}
                  </div>
                )}
              </div>
            </div>

            <div className="media-seek">
              <span className="mono dim">{dur(position)}</span>
              <input
                className="range range--seek"
                type="range"
                min={0}
                max={Math.max(1, duration)}
                step={1}
                value={Math.min(position, duration || 1)}
                onChange={(e) => setSeeking(Number(e.target.value))}
                onMouseUp={() => {
                  if (seeking !== null) void services.media.seek(seeking);
                  setSeeking(null);
                }}
                onTouchEnd={() => {
                  if (seeking !== null) void services.media.seek(seeking);
                  setSeeking(null);
                }}
                style={{ ['--fill' as string]: `${duration ? (position / duration) * 100 : 0}%` }}
              />
              <span className="mono dim">{dur(duration)}</span>
            </div>

            <div className="media-transport">
              <IconButton icon="shuffle" size="sm" active={media.shuffle} title="Shuffle" onClick={() => void services.media.setShuffle(!media.shuffle)} />
              <IconButton icon="prev" size="sm" title="Previous" onClick={() => void actions.media('prev')} />
              <button type="button" className="media-play" onClick={() => void actions.media('toggle')} title={media.playing ? 'Pause (⌘⇧Space)' : 'Play (⌘⇧Space)'}>
                <Icon name={media.playing ? 'pause' : 'play'} size={16} />
              </button>
              <IconButton icon="next" size="sm" title="Next" onClick={() => void actions.media('next')} />
              <IconButton icon="repeat" size="sm" active={media.repeat !== 'off'} title={`Repeat: ${media.repeat}`} onClick={() => void services.media.cycleRepeat().then((r) => toast({ title: `Repeat ${r}`, severity: 'info', ttlMs: 2_000 }))} />
              <span className="spacer" />
              <span className="media-vol">
                <IconButton icon={media.muted || media.volume === 0 ? 'volumeMute' : 'volume'} size="sm" title="Mute" onClick={() => void services.media.toggleMute()} />
                <input
                  className="range range--vol"
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={media.muted ? 0 : media.volume}
                  onChange={(e) => void services.media.setVolume(Number(e.target.value))}
                />
                <span className="mono dim">{Math.round((media.muted ? 0 : media.volume) * 100)}</span>
              </span>
            </div>
            <footer className="hud__panel-foot">
              <span className="mono dim">output · {media.device}</span>
              <span className="spacer" />
              <button className="linklike" onClick={() => { ui.go('core'); void actions.sendPrompt('Pause the music, then tell me what the media agent finished while I was out.'); }}>
                pause and brief me
              </button>
            </footer>
          </section>

          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="list" size={14} className="hud__panel-icon" />
                <div>
                  <h3>Queue</h3>
                  <p className="hud__panel-sub">{media.queue.length} items · agents can reorder it; they cannot clear it.</p>
                </div>
              </div>
              <Button size="sm" icon="plus" onClick={() => void services.media.enqueue(['mt-7', 'mt-8']).then(() => toast({ title: 'Queued 2 tracks', body: 'Added behind the current item so nothing skips.', severity: 'success', ttlMs: 3_000 }))}>
                Queue more
              </Button>
            </header>
            <div className="hud__panel-body queue">
              {media.queue.map((t, i) => {
                const isNow = t.id === track?.id;
                return (
                  <Row key={`${t.id}-${i}`} className={cx('queuerow', isNow && 'is-now')}>
                    <span className="mono dim queue__n">{isNow ? <Icon name="play" size={9} /> : i + 1}</span>
                    <span className="queue__art" style={{ ['--hue' as string]: t.artworkHue }} />
                    <div className="queue__main">
                      <b>{t.title}</b>
                      <span className="dim">{t.artist} · {t.album}</span>
                    </div>
                    <em className="mono dim">{dur(t.durationSec)}</em>
                    <span className="mono dim">{t.source}</span>
                    <span className="queue__tools">
                      <IconButton icon="chevUp" size="sm" title="Play now" onClick={() => void services.media.seek(0).then(() => services.media.enqueue([t.id])).then(() => { toast({ title: 'Up next', body: t.title, severity: 'info', ttlMs: 2_400 }); })} />
                      <IconButton icon="close" size="sm" title="Remove" onClick={() => void services.media.removeFromQueue(i).then(() => { toast({ title: 'Removed from queue', body: `${t.title} — the file itself is untouched.`, severity: 'info', ttlMs: 2_600 }); })} />
                    </span>
                  </Row>
                );
              })}
              {!media.queue.length && <div className="dim" style={{ padding: 16, fontSize: 11.5 }}>Empty queue.</div>}
            </div>
          </section>
        </div>

        <div className="stack">
          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="wifi" size={14} className="hud__panel-icon" />
                <div>
                  <h3>Output & sources</h3>
                  <p className="hud__panel-sub">Devices come from the system service; sources are integrations with a media category.</p>
                </div>
              </div>
            </header>
            <div className="hud__panel-body stack--tight">
              <Select
                value={media.device}
                onChange={(name) => { if (name) void services.media.setDevice(name).then(() => toast({ title: `Output → ${name}`, body: 'Switched live; the core hears you through the same change.', severity: 'success', ttlMs: 3_000 })); }}
                options={[{ value: '', label: '— pick a device —' }, ...(devices.data ?? []).filter((d) => d.kind === 'speaker' || d.kind === 'display').map((d) => ({ value: d.name, label: `${d.name}${d.default ? ' · default' : ''}` }))]}
              />
              <SectionLabel>Sources</SectionLabel>
              {(integrations.data ?? []).filter((i) => i.category === 'media' || i.name.toLowerCase().includes('music')).map((i) => (
                <Row key={i.id} className="miniline">
                  <span className={cx('srcdot', `is-${i.status}`)} />
                  <span>{i.name}</span>
                  <em className="mono dim">{i.account}</em>
                  <span className="spacer" />
                  <Button size="sm" onClick={() => void actions.toggleIntegration(i.id, i.status === 'connected')}>
                    {i.status === 'connected' ? 'Disconnect' : 'Connect'}
                  </Button>
                </Row>
              ))}
              <div className="cluster" style={{ marginTop: 4 }}>
                <Chip size="sm" tone={mediaAgent ? 'accent' : 'dim'} icon="agent">{mediaAgent ? `${mediaAgent.name} · ${mediaAgent.status}` : 'no media agent on shift'}</Chip>
                {mediaAgent && <Button size="sm" icon="steer" onClick={() => ui.select({ kind: 'agent', id: mediaAgent.id, label: mediaAgent.name })}>Inspect</Button>}
              </div>
            </div>
            <footer className="hud__panel-foot">
              <Toggle size="sm" checked={config.voice.duckMedia} onChange={(v) => void actions.patchSettings({ voice: { ...config.voice, duckMedia: v } }, v ? 'Media will duck under speech' : 'Media will no longer duck')} label="Duck under speech" />
            </footer>
          </section>

          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="database" size={14} className="hud__panel-icon" />
                <div>
                  <h3>Media library</h3>
                  <p className="hud__panel-sub">Artifacts the estate produced: transcripts, frame sets, model weights, renders.</p>
                </div>
              </div>
              <div className="segmented segmented--sm">
                {(['all', 'transcript', 'frames', 'model', 'dataset', 'render', 'screenshot'] as const).map((k) => (
                  <button key={k} type="button" className={cx('segmented__item', filter === k && 'is-active')} onClick={() => setFilter(k)}>{k}</button>
                ))}
              </div>
            </header>
            <div className="hud__panel-body lib">
              {shown.map((a) => (
                <Row key={a.id} className={cx('librow', `is-${a.status}`)}>
                  <span className={cx('librow__kind', `librow__kind--${a.kind}`)}>
                    <Icon name={a.kind === 'transcript' ? 'memory' : a.kind === 'model' ? 'cpu' : a.kind === 'dataset' ? 'database' : a.kind === 'frames' ? 'layers' : 'media'} size={11} />
                  </span>
                  <div className="librow__main">
                    <b>{a.name}</b>
                    <span className="mono dim">
                      {a.sizeMb.toFixed(1)} MB{a.words ? ` · ${a.words.toLocaleString()} words` : ''}{a.frames ? ` · ${a.frames.toLocaleString()} frames` : ''}{a.pages ? ` · ${a.pages} pages` : ''} · {relativeTime(a.at)}
                    </span>
                  </div>
                  {a.status === 'processing' && <span className="librow__prog"><Meter value={62} tone="info" height={3} /></span>}
                  <Chip size="sm" tone={a.status === 'ready' ? 'success' : a.status === 'failed' ? 'danger' : 'info'}>{a.status}</Chip>
                  <span className="librow__tools">
                    {a.kind === 'transcript' && (
                      <IconButton icon="search" size="sm" title="Open in ATLAS" onClick={() => ui.go('knowledge')} />
                    )}
                    <IconButton icon="bolt" size="sm" title={a.status === 'ready' ? 'Re-run the media agent on this' : 'Nudge the worker'} onClick={() => void services.media.toggleLibraryItem(a.id).then(() => { library.refresh(); toast({ title: a.status === 'ready' ? 'Re-queued for processing' : 'Worker nudged', body: `${a.name} · the media agent will report when it lands.`, severity: 'info', ttlMs: 4_000 }); })} />
                    <IconButton icon="folder" size="sm" title="Reveal in Files" onClick={() => { ui.go('files'); toast({ title: 'Open the Files bay', body: 'Media artifacts live under /workspace/renders and /workspace/inbox.', severity: 'info', ttlMs: 3_400 }); }} />
                  </span>
                </Row>
              ))}
              {!shown.length && <div className="dim" style={{ padding: 14, fontSize: 11 }}>Nothing of that kind yet.</div>}
            </div>
          </section>

          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="command" size={14} className="hud__panel-icon" />
                <div>
                  <h3>What you can say to me</h3>
                  <p className="hud__panel-sub">These route here through the same intent system as everything else.</p>
                </div>
              </div>
            </header>
            <div className="hud__panel-body utter">
              {[
                'pause the music, I am on a call',
                'duck it and keep it running',
                'play something with no words in it',
                'queue the board room speakers',
                'what did the media agent finish today',
              ].map((u) => (
                <button key={u} type="button" className="utter__row" onClick={() => void actions.sendPrompt(u)}>
                  <Icon name="mic" size={11} />
                  <span>“{u}”</span>
                  <Icon name="chevRight" size={11} className="dim" />
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
