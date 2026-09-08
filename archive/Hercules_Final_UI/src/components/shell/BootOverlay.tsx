/**
 * HERCULES · boot sequence overlay
 * A real cold-start: the core materialises while subsystems report in. It is
 * skippable (and skipped automatically once the user turns the cinematic
 * sequence off in Settings), because power users should never wait for polish.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from '@/components/Icon';
import { useHologram } from '@/hologram/useHologram';
import { store } from '@/state/hercules';

const VERSE = [
  'ONE INTELLIGENCE.',
  'EVERY MODEL, EVERY AGENT, EVERY DEPARTMENT.',
  'ONE WILL TO ACT.',
];

export function BootOverlay({ onDone }: { onDone: () => void }) {
  const phase = store.use((s) => s.phase);
  const booted = store.use((s) => s.booted);
  const [lines, setLines] = useState<{ text: string; at: number }[]>([]);
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const startedAt = useRef(performance.now());

  useEffect(() => {
    let i = 0;
    const iv = window.setInterval(() => {
      i += 1;
      setProgress((p) => Math.min(96, p + 4 + i * 0.4));
    }, 110);
    return () => window.clearInterval(iv);
  }, []);

  useEffect(() => {
    const onLog = (e: Event) => {
      const detail = (e as CustomEvent<{ text: string }>).detail;
      if (!detail) return;
      setLines((prev) => [...prev.slice(-7), { text: detail.text, at: Date.now() }]);
    };
    window.addEventListener('hercules:bootlog', onLog);
    return () => window.removeEventListener('hercules:bootlog', onLog);
  }, []);

  useEffect(() => {
    if (!booted) return;
    const elapsed = performance.now() - startedAt.current;
    const wait = skipped || elapsed > 4_200 ? 260 : 900 - elapsed;
    const t = window.setTimeout(() => {
      setProgress(100);
      setLeaving(true);
      window.setTimeout(onDone, 620);
    }, Math.max(160, wait));
    return () => window.clearTimeout(t);
  }, [booted, skipped, onDone]);

  const amp = useMemo(() => 0.35 + progress / 200, [progress]);

  const canvasRef = useHologram('hero', () => ({
    state: booted ? 'idle' : 'updating',
    energy: 0.3 + progress / 240,
    amplitude: booted ? 0.15 : amp,
    satellites: Math.round(progress / 12),
    label: booted ? 'core online' : 'calibrating',
  }));

  return (
    <div className={leaving ? 'boot boot--out' : 'boot'}>
      <div className="boot__stage">
        <canvas ref={canvasRef} className="boot__canvas" />
      </div>
      <div className="boot__frame">
        <div className="boot__mark">
          <span className="boot__word">HERCULES</span>
          <span className="boot__tag">AI OPERATING SYSTEM · v0.1.0 · {phase === 'booting' ? 'BOOT' : phase === 'calibrating' ? 'CALIBRATE' : 'ONLINE'}</span>
        </div>

        <p className="boot__verse">{VERSE[Math.min(VERSE.length - 1, Math.floor(progress / 34))]}</p>

        <div className="boot__log" aria-live="polite">
          {lines.slice(-6).map((l, i) => (
            <div key={l.at + '' + i} className="boot__logline">
              <span className="mono">›</span>
              <span>{l.text}</span>
            </div>
          ))}
        </div>

        <div className="boot__progress">
          <div className="boot__bar">
            <div className="boot__fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="mono">{Math.round(progress)}%</span>
        </div>

        <button
          type="button"
          className="boot__skip"
          onClick={() => {
            setSkipped(true);
            setProgress(99);
          }}
        >
          Skip sequence <Icon name="chevRight" size={12} />
        </button>
      </div>
    </div>
  );
}
