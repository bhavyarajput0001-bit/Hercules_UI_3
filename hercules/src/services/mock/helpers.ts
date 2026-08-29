/**
 * Deterministic helpers for the mock service layer.
 * A seeded PRNG keeps the demo coherent across reloads.
 */

export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const rng = mulberry32(0x48455243);

export const rand = (min: number, max: number) => min + rng() * (max - min);
export const randInt = (min: number, max: number) => Math.floor(rand(min, max + 1));
export const pick = <T,>(xs: readonly T[]): T => xs[Math.floor(rng() * xs.length)]!;
export const chance = (p: number) => rng() < p;
export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

let counter = 0;
export const uid = (prefix = 'id') => `${prefix}-${(++counter).toString(36)}-${Math.floor(rng() * 1e6).toString(36)}`;

/** Simulated network/compute latency so async states are real. */
export const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
export const jitter = (base = 120, spread = 260) => delay(base + Math.random() * spread);

export const now = () => new Date();
export const iso = (d: Date = now()) => d.toISOString();
export const ago = (ms: number) => iso(new Date(Date.now() - ms));
export const ahead = (ms: number) => iso(new Date(Date.now() + ms));

export const MIN = 60_000;
export const HOUR = 60 * MIN;
export const DAY = 24 * HOUR;

export const series = (n: number, base: number, amp: number, drift = 0) =>
  Array.from({ length: n }, (_, i) => Math.max(0, Math.round(base + Math.sin(i / 2.4) * amp + i * drift + rand(-amp / 3, amp / 3))));

export const bytes = (n: number) => n;

export function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Very small fuzzy matcher used by the command bar / pickers. */
export function fuzzyScore(query: string, target: string): number {
  const q = query.toLowerCase().trim();
  const t = target.toLowerCase();
  if (!q) return 0.001;
  if (t === q) return 1;
  if (t.startsWith(q)) return 0.92;
  const idx = t.indexOf(q);
  if (idx >= 0) return 0.78 - idx * 0.01;
  let score = 0;
  let ti = 0;
  for (const ch of q) {
    const found = t.indexOf(ch, ti);
    if (found < 0) return 0;
    score += found === ti ? 0.06 : 0.03;
    ti = found + 1;
  }
  return Math.min(0.6, score);
}

export function relativeTime(at: string): string {
  const diff = Date.now() - new Date(at).getTime();
  const abs = Math.abs(diff);
  const suffix = diff >= 0 ? 'ago' : 'from now';
  if (abs < 45_000) return diff >= 0 ? 'just now' : 'in a moment';
  if (abs < HOUR) return `${Math.round(abs / MIN)}m ${suffix}`;
  if (abs < DAY) return `${Math.round(abs / HOUR)}h ${suffix}`;
  if (abs < 7 * DAY) return `${Math.round(abs / DAY)}d ${suffix}`;
  return new Date(at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export function clockTime(at: string): string {
  return new Date(at).toLocaleTimeString(undefined, { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export function formatBytes(n?: number): string {
  if (n == null) return '—';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let i = 0;
  let v = n;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v >= 100 || i === 0 ? Math.round(v) : v.toFixed(1)} ${units[i]}`;
}

export function formatNum(n: number): string {
  if (Math.abs(n) >= 1_000_000) return `${(n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1)}M`;
  if (Math.abs(n) >= 1_000) return `${(n / 1_000).toFixed(n >= 10_000 ? 0 : 1)}k`;
  return `${Math.round(n)}`;
}

export const money = (n: number) => `$${n < 10 ? n.toFixed(2) : Math.round(n).toLocaleString()}`;

export const pct = (n: number) => `${Math.round(n)}%`;

export const dur = (sec: number) => {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

/** Split text into word chunks for simulated token streaming. */
export function tokenize(text: string): string[] {
  return text.match(/\S+\s*/g) ?? [text];
}

export function sleepCancellable(ms: number, signal?: AbortSignal): Promise<boolean> {
  return new Promise((resolve) => {
    if (signal?.aborted) return resolve(false);
    const t = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort);
      resolve(true);
    }, ms);
    const onAbort = () => {
      clearTimeout(t);
      resolve(false);
    };
    signal?.addEventListener('abort', onAbort, { once: true });
  });
}
