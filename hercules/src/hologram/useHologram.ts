/**
 * HERCULES · React binding for the hologram renderer.
 * Keeps the canvas sized, feeds it live core state, and wires pointer parallax.
 */
import { useEffect, useRef } from 'react';
import { Hologram } from './hologram';
import { currentPalette } from '@/theme/bridge';
import type { CoreState } from '@/types/domain';

export interface HologramFeed {
  state: CoreState;
  energy: number;
  amplitude: number;
  satellites: number;
  label?: string;
}

export function useHologram(variant: 'hero' | 'dock' | 'inline', feed: () => HologramFeed, deps: unknown[] = []) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const holo = useRef<Hologram | null>(null);
  const feedRef = useRef(feed);
  feedRef.current = feed;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const pal = currentPalette();
    let h: Hologram;
    try {
      h = new Hologram(canvas, {
        ...feedRef.current(),
        variant,
        intensity: parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--glow-scale') || '0.8') || 0.8,
        reduceMotion: document.documentElement.dataset.reduceMotion === 'true',
        palette: {
          primary: pal.corePrimary,
          secondary: pal.coreSecondary,
          glow: pal.coreGlow,
          danger: pal.danger,
          warn: pal.warn,
          success: pal.success,
        },
      });
    } catch {
      return;
    }
    holo.current = h;

    const ro = new ResizeObserver(() => h.resize());
    ro.observe(canvas);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      h.pointerTo(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1);
    };
    const onLeave = () => h.pointerOut();
    const host = (canvas.parentElement ?? canvas) as HTMLElement;
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);

    const onTheme = () => {
      const p = currentPalette();
      h.set({
        palette: { primary: p.corePrimary, secondary: p.coreSecondary, glow: p.coreGlow, danger: p.danger, warn: p.warn, success: p.success },
        intensity: parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--glow-scale') || '0.8') || 0.8,
        reduceMotion: document.documentElement.dataset.reduceMotion === 'true',
      });
    };
    window.addEventListener('hercules:theme', onTheme);

    let raf = 0;
    const pump = () => {
      h.set(feedRef.current());
      raf = requestAnimationFrame(pump);
    };
    pump();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('hercules:theme', onTheme);
      h.destroy();
      holo.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant, ...deps]);

  return ref;
}
