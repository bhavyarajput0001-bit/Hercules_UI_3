/**
 * HERCULES · floating core
 * The “it lives in the machine” affordance: a compact core you can keep on
 * screen over other apps, glance at, and speak to without opening the full
 * workspace. In the packaged desktop shell this is a borderless, always-on-top
 * window; here it is an in-app float so the interaction is testable today.
 */
import { useState } from 'react';
import { Icon } from '@/components/Icon';
import { Chip, IconButton, cx } from '@/components/ui';
import { actions, store, ui } from '@/state/hercules';
import { useHologram } from '@/hologram/useHologram';

export function FloatingCore() {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: 24, y: 24 });
  const [dragging, setDragging] = useState(false);
  const vitals = store.use((s) => s.vitals);
  const voice = store.use((s) => s.voice);
  const enabled = store.use((s) => s.config.core.alwaysAvailable);

  const canvasRef = useHologram('inline', () => {
    const s = store.get();
    return {
      state: s.vitals.state,
      energy: s.vitals.energy,
      amplitude: s.voice.active ? 0.5 : s.voice.level,
      satellites: s.agents.filter((a) => a.status === 'working' || a.status === 'thinking').length,
    };
  });

  if (!enabled) return null;

  return (
    <div
      className={cx('float', open && 'is-open', dragging && 'is-dragging')}
      style={{ right: pos.x, bottom: pos.y }}
      onPointerDown={(e) => {
        if ((e.target as HTMLElement).closest('button')) return;
        setDragging(true);
        const sx = e.clientX;
        const sy = e.clientY;
        const start = { ...pos };
        const move = (ev: PointerEvent) => setPos({ x: Math.max(8, start.x - (ev.clientX - sx)), y: Math.max(8, start.y - (ev.clientY - sy)) });
        const up = () => {
          setDragging(false);
          window.removeEventListener('pointermove', move);
          window.removeEventListener('pointerup', up);
        };
        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', up);
      }}
    >
      <button type="button" className="float__stage" onClick={() => setOpen((o) => !o)} aria-label="Toggle HERCULES mini core">
        <canvas ref={canvasRef} className="float__canvas" />
      </button>
      <div className="float__strip">
        <span className={cx('float__state', `is-${vitals.state === 'error' ? 'danger' : vitals.state === 'alert' ? 'warn' : 'accent'}`)}>{vitals.state}</span>
        <span className="float__focus">{vitals.focus}</span>
        {voice.active && <Chip size="sm" tone="success">listening</Chip>}
        <div className="float__tools">
          <IconButton icon="mic" size="sm" title="Voice (⌘⇧Space)" active={voice.active} onClick={() => void actions.toggleVoice()} />
          <IconButton icon="search" size="sm" title="Command bar" onClick={() => ui.setCommandBar(true)} />
          <IconButton icon="chevUp" size="sm" title={open ? 'Collapse' : 'Expand'} onClick={() => setOpen((o) => !o)} />
        </div>
      </div>
      {open && (
        <div className="float__panel">
          <div className="float__row">
            <b>{vitals.activeAgents}</b>
            <span>agents live</span>
          </div>
          <div className="float__row">
            <b>{vitals.queuedTasks}</b>
            <span>queued</span>
          </div>
          <div className="float__row">
            <b>{vitals.integrity.toFixed(1)}%</b>
            <span>integrity</span>
          </div>
          <div className="float__meter">
            <span className="mono">cognitive load</span>
            <div className="meter__track" style={{ height: 3 }}>
              <div className="meter__fill meter__fill--accent" style={{ width: `${vitals.cognitiveLoad}%` }} />
            </div>
          </div>
          <button
            type="button"
            className="btn btn--ghost btn--full btn--sm"
            onClick={() => {
              setOpen(false);
              ui.go('core');
            }}
          >
            <Icon name="core" size={12} /> Open workspace
          </button>
        </div>
      )}
    </div>
  );
}
