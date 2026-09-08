/**
 * HERCULES · top bar
 * Presence read-out + the always-visible command field. This is the strip that
 * tells you, in one glance, what the core is doing and lets you act on it.
 */
import { useEffect, useState } from 'react';
import { Icon } from '@/components/Icon';
import { Chip, IconButton, Meter, Spinner, cx } from '@/components/ui';
import { screenDef } from '@/state/nav';
import { actions, store, ui } from '@/state/hercules';
import { useNow } from '@/hooks/useAsync';
import { activeTransport } from '@/services/registry';

const STATE_LABEL: Record<string, string> = {
  dormant: 'DORMANT',
  idle: 'STANDING BY',
  listening: 'LISTENING',
  thinking: 'REASONING',
  speaking: 'SPEAKING',
  executing: 'EXECUTING',
  alert: 'ATTENTION',
  error: 'FAULT',
  updating: 'CALIBRATING',
};

const STATE_TONE: Record<string, string> = {
  idle: 'dim',
  thinking: 'info',
  speaking: 'accent',
  executing: 'accent',
  listening: 'success',
  alert: 'warn',
  error: 'danger',
  dormant: 'dim',
  updating: 'info',
};

export function TopBar() {
  const screen = store.use((s) => s.screen);
  const vitals = store.use((s) => s.vitals);
  const notices = store.use((s) => s.notices);
  const voice = store.use((s) => s.voice);
  const media = store.use((s) => s.media);
  const def = screenDef(screen);
  const unread = notices.filter((n) => !n.read).length;
  const now = useNow(1_000);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpanded(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const uptime = formatUptime(vitals.uptimeMs || Math.max(0, now - (window as unknown as { __herculesStart?: number }).__herculesStart!));

  return (
    <header className="topbar">
      <div className="topbar__head">
        <div className="topbar__title">
          <span className="topbar__crumb">
            {def.group} <Icon name="chevRight" size={9} /> {def.label}
          </span>
          <h1>{def.title}</h1>
        </div>

        <button
          type="button"
          className={cx('cmdfield', expanded && 'is-expanded')}
          onClick={() => ui.setCommandBar(true)}
          title="Summon the command bar (⌘K)"
        >
          <Icon name="search" size={14} />
          <span>Command HERCULES — ask, dispatch, navigate…</span>
          <kbd>⌘K</kbd>
        </button>

        <div className="topbar__tools">
          <button
            type="button"
            className={cx('corechip', `is-${STATE_TONE[vitals.state] ?? 'dim'}`, voice.active && 'is-listening')}
            onClick={() => ui.go('command-center')}
            title={vitals.focus}
          >
            <span className={cx('corechip__dot', vitals.state !== 'idle' && vitals.state !== 'dormant' && 'is-pulse')} />
            <span className="mono">{STATE_LABEL[vitals.state] ?? vitals.state.toUpperCase()}</span>
            <span className="corechip__meter">
              <Meter value={vitals.cognitiveLoad} height={3} tone={vitals.state === 'error' ? 'danger' : 'accent'} suffix={undefined} />
            </span>
          </button>

          <Chip size="sm" tone="dim" icon="bolt" title="Active agents / open queue">
            {vitals.activeAgents} live · {vitals.queuedTasks} queued
          </Chip>
          <Chip
            size="sm"
            tone={vitals.integrity > 98 ? 'success' : 'warn'}
            icon="shield"
            title="Integrity of the running build + policy conformance"
            onClick={() => ui.go('system')}
          >
            {vitals.integrity.toFixed(1)}%
          </Chip>
          <Chip size="sm" tone="dim" icon="clock" title="Core uptime">
            {uptime}
          </Chip>
          <Chip
            size="sm"
            tone={activeTransport === 'mock' ? 'info' : 'success'}
            icon="route"
            title={activeTransport === 'mock' ? 'Mock transport — realistic demo data, no backend required' : 'Live transport connected'}
            onClick={() => ui.go('settings')}
          >
            {activeTransport}
          </Chip>

          <div className="topbar__divider" />

          <IconButton
            icon={voice.active ? 'mic' : 'mic'}
            title={voice.active ? 'Stop capture (⌘⇧Space)' : 'Voice capture (⌘⇧Space)'}
            active={voice.active}
            tone={voice.active ? 'accent' : undefined}
            onClick={() => void actions.toggleVoice()}
          />
          <IconButton
            icon={media.playing ? 'pause' : 'play'}
            title={media.track ? `${media.playing ? 'Pause' : 'Play'} · ${media.track.title}` : 'Open media control'}
            active={media.playing}
            onClick={() => (media.track ? void actions.media('toggle') : ui.go('media'))}
          />
          <IconButton icon="bell" title="Notification inbox" badge={unread} onClick={() => ui.go('notifications')} />
          <IconButton icon="layers" title="Inspector (⌘I)" active={store.get().inspectorOpen} onClick={() => ui.setInspector(!store.get().inspectorOpen)} />
          <IconButton icon="command" title="Keyboard map (?)" onClick={() => ui.setHelp(true)} />
        </div>
      </div>

      {(expanded || vitals.state === 'executing' || vitals.state === 'alert' || vitals.state === 'error') && (
        <div className="topbar__strip">
          <Icon name="target" size={12} />
          <span>{vitals.focus}</span>
          <button type="button" className="topbar__strip-hide" onClick={() => setExpanded(false)}>
            <Icon name="chevUp" size={12} />
          </button>
        </div>
      )}

      {voice.speaking && (
        <div className="topbar__speak">
          <Spinner size={10} />
          <span>HERCULES is speaking — press {store.get().voice.engine === 'native' ? 'Esc' : 'Esc'} to interrupt</span>
          <div className="topbar__level" style={{ ['--level' as string]: String(voice.level) }}>
            {Array.from({ length: 18 }, (_, i) => (
              <span key={i} style={{ transform: `scaleY(${1 + Math.max(0.08, voice.level) * (i % 3 === 0 ? 2.1 : 1.2)})` }} />
            ))}
          </div>
          <button type="button" className="topbar__barge" onClick={() => void actions.stopSpeaking()}>
            Barge in
          </button>
        </div>
      )}
    </header>
  );
}

function formatUptime(ms: number) {
  if (!ms || ms < 0) return '0s';
  const s = Math.floor(ms / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (d) return `${d}d ${h}h`;
  if (h) return `${h}h ${m}m`;
  if (m) return `${m}m ${s % 60}s`;
  return `${s}s`;
}
