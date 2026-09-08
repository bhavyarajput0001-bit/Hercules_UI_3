/**
 * HERCULES · hologram renderer
 * ---------------------------------------------------------------------------
 * The visual soul of the product. Hand-written Canvas2D + trig projection —
 * no WebGL dependency, no image assets, no generic avatar. It is a *core*:
 *
 *   · a Fibonacci-distributed particle shell that breathes with core energy
 *   · three gyroscopic orbital rings that tilt with pointer parallax
 *   · an execution lattice (spokes to orbiting nodes = live agents)
 *   · state semantics: dormant / idle / listening / thinking / speaking /
 *     executing / alert / error / updating each have their own motion law
 *   · amplitude input (voice level) drives real geometry, not fake CSS
 *
 * Reduced motion and low intensity are respected: the renderer degrades to a
 * calm, still figure instead of stopping dead.
 */
import type { CoreState } from '@/types/domain';

export interface HologramOptions {
  state: CoreState;
  /** 0..1 core energy (cognitive load) */
  energy: number;
  /** 0..1 instantaneous amplitude (voice / stream) */
  amplitude: number;
  /** number of orbiting execution nodes (live agents) */
  satellites: number;
  intensity: number;
  reduceMotion: boolean;
  /** 'hero' | 'dock' | 'inline' */
  variant: 'hero' | 'dock' | 'inline';
  palette: { primary: string; secondary: string; glow: string; danger: string; warn: string; success: string };
  label?: string;
  onPointer?: (point: { x: number; y: number; inside: boolean }) => void;
}

interface Particle {
  x: number;
  y: number;
  z: number;
  r: number;
  phase: number;
}

const GOLDEN = Math.PI * (3 - Math.sqrt(5));

function shell(n: number, radius: number): Particle[] {
  const out: Particle[] = [];
  for (let i = 0; i < n; i++) {
    const t = (i + 0.5) / n;
    const r = radius * Math.sqrt(1 - t * t * 0.92);
    const theta = GOLDEN * i * 3.6;
    out.push({
      x: Math.cos(theta) * r,
      y: (t - 0.5) * radius * 1.9,
      z: Math.sin(theta) * r,
      r: 0.6 + Math.random() * 1.5,
      phase: Math.random() * Math.PI * 2,
    });
  }
  return out;
}

const withAlpha = (hex: string, a: number) => {
  if (!hex) return `rgba(63,224,255,${a})`;
  if (hex.startsWith('rgba') || hex.startsWith('rgb')) {
    // Replace alpha channel if present
    return hex.replace(/[\d.]+\)$/, `${a})`);
  }
  const h = hex.replace('#', '');
  const v = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(v, 16);
  if (isNaN(n)) return `rgba(63,224,255,${a})`;
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};

export class Hologram {
  private ctx: CanvasRenderingContext2D;
  private dpr = 1;
  private w = 0;
  private h = 0;
  private raf = 0;
  private t = 0;
  private last = 0;
  private particles: Particle[] = [];
  private opts: HologramOptions;
  private pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  private pulse = 0;
  private glitch = 0;
  private stateMix: Record<CoreState, number> = {
    dormant: 1,
    idle: 1,
    listening: 0,
    thinking: 0,
    speaking: 0,
    executing: 0,
    alert: 0,
    error: 0,
    updating: 0,
  };
  private destroyed = false;

  constructor(private canvas: HTMLCanvasElement, opts: HologramOptions) {
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: false, willReadFrequently: false });
    if (!ctx) throw new Error('HERCULES: canvas 2d context unavailable');
    this.ctx = ctx;
    this.opts = opts;
    const count = opts.variant === 'hero' ? 620 : opts.variant === 'dock' ? 190 : 130;
    this.particles = shell(count, 1);
    this.resize();
    this.last = performance.now();
    this.loop();
  }

  set(opts: Partial<HologramOptions>) {
    const prev = this.opts.state;
    this.opts = { ...this.opts, ...opts };
    if (opts.state && opts.state !== prev) {
      this.pulse = 1;
      if (opts.state === 'alert' || opts.state === 'error') this.glitch = 1;
    }
    if (opts.state) this.stateMix[opts.state] = 1;
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = Math.max(1, Math.floor(rect.width));
    this.h = Math.max(1, Math.floor(rect.height));
    this.canvas.width = Math.floor(this.w * this.dpr);
    this.canvas.height = Math.floor(this.h * this.dpr);
    try {
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    } catch {
      // Context may be lost
    }
  }

  pointerTo(nx: number, ny: number) {
    this.pointer.tx = Math.max(-1, Math.min(1, nx));
    this.pointer.ty = Math.max(-1, Math.min(1, ny));
    this.opts.onPointer?.({ x: nx, y: ny, inside: true });
  }

  pointerOut() {
    this.pointer.tx = 0;
    this.pointer.ty = 0;
    this.opts.onPointer?.({ x: 0, y: 0, inside: false });
  }

  destroy() {
    this.destroyed = true;
    cancelAnimationFrame(this.raf);
    this.particles = [];
  }

  /* ── loop ─────────────────────────────────────────────────────────────── */

  private loop = () => {
    if (this.destroyed) return;
    const now = performance.now();
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;
    const motion = this.opts.reduceMotion ? 0.28 : 1;
    this.t += dt * motion;
    this.pointer.x += (this.pointer.tx - this.pointer.x) * Math.min(1, dt * 4);
    this.pointer.y += (this.pointer.ty - this.pointer.y) * Math.min(1, dt * 4);
    this.pulse = Math.max(0, this.pulse - dt * 1.8);
    this.glitch = Math.max(0, this.glitch - dt * 0.9);
    for (const k of Object.keys(this.stateMix) as CoreState[]) {
      const target = this.opts.state === k ? 1 : 0;
      const cur = this.stateMix[k];
      this.stateMix[k] = cur + (target - cur) * Math.min(1, dt * (target ? 3.4 : 1.4));
    }
    this.draw();
    this.raf = requestAnimationFrame(this.loop);
  };

  private draw() {
    const { ctx, w, h } = this;
    // Guard against zero-size canvas
    if (w === 0 || h === 0) return;
    const o = this.opts;
    const I = Math.max(0.08, o.intensity);
    const cx = w / 2;
    const cy = h / 2;
    const R = Math.min(w, h) * (o.variant === 'hero' ? 0.3 : 0.34);

    const amp = Math.max(0, Math.min(1, o.amplitude));
    const energy = Math.max(0, Math.min(1, o.energy));
    const breath = 1 + Math.sin(this.t * (0.9 + energy * 1.4)) * (0.02 + energy * 0.05);
    const speak = this.stateMix.speaking;
    const think = this.stateMix.thinking;
    const listen = this.stateMix.listening;
    const exec = this.stateMix.executing;
    const alert = Math.max(this.stateMix.alert, this.stateMix.error);
    const upd = this.stateMix.updating;
    const dormant = this.stateMix.dormant;

    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';

    /* 1 ── volumetric glow */
    const glowR = R * (2.5 + speak * 0.6 + amp * 1.2) * breath;
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(1, glowR));
    g.addColorStop(0, withAlpha(o.palette.primary, (0.3 + energy * 0.34 + amp * 0.3) * I * (1 - dormant * 0.7)));
    g.addColorStop(0.35, withAlpha(o.palette.secondary, 0.11 * I));
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    /* 2 ── base plate (hologram floor) */
    const plateY = cy + R * 1.35;
    ctx.save();
    ctx.translate(0, plateY);
    ctx.scale(1, 0.22);
    const pg = ctx.createRadialGradient(0, 0, 0, 0, 0, R * 2.1);
    pg.addColorStop(0, withAlpha(o.palette.primary, 0.16 * I));
    pg.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = pg;
    ctx.beginPath();
    ctx.arc(0, 0, R * 2.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = withAlpha(o.palette.primary, 0.22 * I);
    ctx.lineWidth = 1;
    for (let i = 1; i <= 3; i++) {
      ctx.beginPath();
      ctx.arc(0, 0, R * (0.6 + i * 0.42), 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();

    /* 3 ── particle shell */
    const spin = this.t * (0.16 + energy * 0.5 + exec * 0.5 + upd * 1.4);
    const tiltX = this.pointer.y * 0.42 - 0.16 + Math.sin(this.t * 0.21) * 0.06;
    const tiltZ = this.pointer.x * 0.3;
    const cosY = Math.cos(spin);
    const sinY = Math.sin(spin);
    const cosX = Math.cos(tiltX);
    const sinX = Math.sin(tiltX);
    const cosZ = Math.cos(tiltZ);
    const sinZ = Math.sin(tiltZ);

    const jitter = speak * amp * 0.16 + think * 0.04 + glitchJitter(this.glitch);

    for (const p of this.particles) {
      const ripple = 1 + Math.sin(this.t * 2.4 + p.phase + p.y * 2.2) * (0.02 + speak * amp * 0.12 + think * 0.03);
      let x = p.x * R * breath * ripple * (1 + jitter * Math.sin(p.phase * 7));
      let y = p.y * R * breath * ripple;
      let z = p.z * R * breath * ripple;

      // rotate Y, X, Z
      let x1 = x * cosY + z * sinY;
      let z1 = -x * sinY + z * cosY;
      let y1 = y * cosX - z1 * sinX;
      let z2 = y * sinX + z1 * cosX;
      const x2 = x1 * cosZ - y1 * sinZ;
      const y2 = x1 * sinZ + y1 * cosZ;

      const depth = (z2 / R + 1) / 2; // 0 back .. 1 front
      const sx = cx + x2;
      const sy = cy + y2;
      const size = p.r * (0.55 + depth * 0.95) * (o.variant === 'hero' ? 1.15 : 0.85);
      const a = (0.1 + depth * 0.55) * (0.55 + energy * 0.5 + amp * 0.35) * I * (1 - dormant * 0.72);

      const mix = depth * 0.7 + speak * 0.25;
      ctx.fillStyle = mix > 0.75 ? withAlpha(o.palette.primary, a) : withAlpha(o.palette.secondary, a * 0.85);
      ctx.beginPath();
      ctx.arc(sx, sy, Math.max(0.25, size), 0, Math.PI * 2);
      ctx.fill();
    }

    /* 4 ── gyroscopic rings */
    const rings: [number, number, number][] = [
      [1.28, this.t * 0.35 + 0.5, 0.62],
      [1.62, -this.t * 0.24, 1.15],
      [1.94, this.t * 0.16 + 2.1, 0.35],
    ];
    for (let i = 0; i < rings.length; i++) {
      const [scale, rot, squash] = rings[i]!;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot * 0.5 + tiltZ * 0.6);
      ctx.scale(1, squash * (0.4 + Math.abs(Math.cos(tiltX)) * 0.5));
      const rr = R * scale * breath;
      ctx.beginPath();
      ctx.ellipse(0, 0, rr, rr, 0, 0, Math.PI * 2);
      ctx.strokeStyle = withAlpha(i === 1 ? o.palette.secondary : o.palette.primary, (0.16 + energy * 0.14 + i * 0.02) * I);
      ctx.lineWidth = i === 0 ? 1.6 : 1;
      ctx.stroke();

      // travelling arc on each ring = attention
      const arcLen = 0.5 + think * 1.5 + exec * 0.9;
      const arcPos = this.t * (1.1 + i * 0.5) * (i % 2 ? -1 : 1);
      ctx.beginPath();
      ctx.ellipse(0, 0, rr, rr, 0, arcPos, arcPos + arcLen);
      ctx.strokeStyle = withAlpha(o.palette.primary, (0.5 + speak * 0.35) * I);
      ctx.lineWidth = 2.2;
      ctx.lineCap = 'round';
      ctx.stroke();
      ctx.restore();
    }

    /* 5 ── execution lattice: satellites = live agents */
    const sat = Math.max(0, Math.min(14, o.satellites));
    for (let i = 0; i < sat; i++) {
      const a0 = (i / sat) * Math.PI * 2 + this.t * (0.35 + exec * 0.55);
      const rad = R * (1.28 + (i % 3) * 0.34);
      const x = Math.cos(a0) * rad;
      const y = Math.sin(a0) * rad * 0.42 + Math.sin(this.t * 1.6 + i) * R * 0.06;
      const px = cx + x;
      const py = cy + y;
      const hot = (i + Math.floor(this.t * 2)) % Math.max(1, sat) === 0;

      ctx.strokeStyle = withAlpha(hot ? o.palette.primary : o.palette.secondary, (hot ? 0.4 : 0.14) * I);
      ctx.lineWidth = hot ? 1.4 : 0.7;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(px, py);
      ctx.stroke();

      ctx.fillStyle = withAlpha(hot ? o.palette.primary : o.palette.secondary, (0.5 + (hot ? 0.4 : 0)) * I);
      ctx.beginPath();
      ctx.arc(px, py, hot ? 3.2 : 2, 0, Math.PI * 2);
      ctx.fill();

      if (hot) {
        ctx.strokeStyle = withAlpha(o.palette.primary, 0.3 * I);
        ctx.beginPath();
        ctx.arc(px, py, 7 + Math.sin(this.t * 6) * 2, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    /* 6 ── listening waveform arc (bottom of the figure) */
    if (listen > 0.02 || speak > 0.02) {
      const bars = 44;
      const baseR = R * 2.16;
      for (let i = 0; i < bars; i++) {
        const f = i / (bars - 1);
        const angle = Math.PI * (0.18 + f * 0.64);
        const wave =
          (Math.sin(this.t * 8.5 + i * 0.72) * 0.5 + Math.sin(this.t * 14 + i * 0.31) * 0.5) *
          (listen > speak ? 0.35 + Math.sin(this.t * 3 + i) * 0.12 : 0.15 + amp);
        const len = baseR * (0.05 + Math.abs(wave) * 0.2);
        const x0 = cx + Math.cos(angle) * baseR;
        const y0 = cy + Math.sin(angle) * baseR * 0.34;
        const x1 = cx + Math.cos(angle) * (baseR + len);
        const y1 = cy + Math.sin(angle) * (baseR + len) * 0.34;
        ctx.strokeStyle = withAlpha(listen > speak ? o.palette.success : o.palette.primary, (0.25 + amp * 0.5) * I);
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();
      }
    }

    /* 7 ── alert / error containment ring */
    if (alert > 0.02) {
      const ar = R * (2.3 - Math.sin(this.t * 5) * 0.06);
      ctx.strokeStyle = withAlpha(this.stateMix.error > this.stateMix.alert ? o.palette.danger : o.palette.warn, 0.5 * alert * I);
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 10]);
      ctx.beginPath();
      ctx.arc(cx, cy, ar, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    /* 8 ── scan sweep during boot / updating */
    if (upd > 0.02) {
      const p = (this.t * 0.6) % 1;
      const y = cy - R * 2 + p * R * 4;
      const lg = ctx.createLinearGradient(0, y - 30, 0, y + 30);
      lg.addColorStop(0, 'rgba(0,0,0,0)');
      lg.addColorStop(0.5, withAlpha(o.palette.primary, 0.3 * upd * I));
      lg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = lg;
      ctx.fillRect(0, y - 30, w, 60);
    }

    /* 9 ── HUD reticle + label */
    if (o.variant !== 'inline') {
      const box = R * 2.05;
      ctx.strokeStyle = withAlpha(o.palette.primary, 0.22 * I);
      ctx.lineWidth = 1;
      const corners: [number, number, number, number][] = [
        [cx - box, cy - box, 1, 1],
        [cx + box, cy - box, -1, 1],
        [cx - box, cy + box, 1, -1],
        [cx + box, cy + box, -1, -1],
      ];
      for (const [x, y, dx, dy] of corners) {
        ctx.beginPath();
        ctx.moveTo(x + dx * 16, y);
        ctx.lineTo(x, y);
        ctx.lineTo(x, y + dy * 16);
        ctx.stroke();
      }
      // tick ring
      const ticks = 60;
      for (let i = 0; i < ticks; i++) {
        const a = (i / ticks) * Math.PI * 2 + this.t * 0.05;
        const r0 = R * 2.28;
        const long = i % 5 === 0;
        ctx.strokeStyle = withAlpha(o.palette.primary, (long ? 0.3 : 0.12) * I);
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0 * (o.variant === 'hero' ? 1 : 1));
        ctx.lineTo(cx + Math.cos(a) * (r0 + (long ? 7 : 3)), cy + Math.sin(a) * (r0 + (long ? 7 : 3)));
        ctx.stroke();
      }
    }

    ctx.restore();

    if (o.label && o.variant === 'hero') {
      ctx.save();
      ctx.font = '500 10px "JetBrains Mono", ui-monospace, monospace';
      ctx.fillStyle = withAlpha(o.palette.primary, 0.55);
      ctx.textAlign = 'center';
      ctx.fillText(o.label.toUpperCase(), cx, cy + R * 2.02);
      ctx.restore();
    }
  }
}

function glitchJitter(v: number) {
  if (v <= 0) return 0;
  return (Math.random() - 0.5) * 0.06 * v;
}
