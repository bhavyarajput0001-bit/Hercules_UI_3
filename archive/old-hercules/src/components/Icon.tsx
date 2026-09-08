/**
 * HERCULES · Icon set
 * Hand-drawn SVG geometry — no icon package, no webfont, nothing that can fail
 * to load. One stroke weight and one corner language so 240px of UI still reads
 * as a single system. Icons are geometric and technical, never emoji-adjacent.
 *
 * `fallback` renders a neutral signal glyph for any name we have not drawn yet,
 * so a missing icon degrades visibly instead of blanking out.
 */
import { memo, type ReactNode } from 'react';

export const ICON_NAMES = [
  'activity', 'agent', 'alert', 'analytics', 'archive', 'assistant', 'automation', 'bell', 'bolt',
  'briefcase', 'browser', 'cpu', 'calendar', 'check', 'chevDown', 'chevLeft', 'chevRight', 'chevUp',
  'clock', 'close', 'code', 'command', 'copy', 'core', 'database', 'department', 'dots', 'download',
  'eye', 'eyeOff', 'file', 'folder', 'folderOpen', 'git', 'grid', 'image', 'key', 'knowledge',
  'layers', 'link', 'list', 'lock', 'media', 'memory', 'mic', 'minus', 'next', 'notification', 'pause',
  'pin', 'play', 'plug', 'plus', 'power', 'prev', 'project', 'shield', 'refresh', 'reply', 'repeat', 'route', 'search',
  'send', 'settings', 'shuffle', 'steer', 'system', 'spark', 'target', 'task', 'terminal', 'trash',
  'upload', 'users', 'volume', 'volumeMute', 'wifi',
] as const;

export type IconName = (typeof ICON_NAMES)[number];

type Geo = {
  /** path `d` strings */
  p?: string[];
  /** circles: [cx, cy, r] */
  c?: [number, number, number][];
  /** rects: [x, y, w, h, rx?] */
  r?: [number, number, number, number, (number | undefined)?][];
  /** filled shapes for glyphs that need mass */
  f?: string[];
  /** no stroke, fill only */
  solid?: boolean;
};

const G: Record<IconName, Geo> = {
  activity: { p: ['M2 13h3.4l2.6 6.6 3.7-14.6 2.7 8h5.6'] },
  agent: {
    p: ['M12 3.4 19.2 7.4v9.2L12 20.6 4.8 16.6V7.4Z'],
    c: [[12, 12, 2.1]],
  },
  alert: { p: ['M12 3.6 21.4 19.8H2.6Z', 'M12 9.4v4.4'], c: [[12, 16.8, 0.55]] },
  analytics: { p: ['M3.5 20.5h17'], r: [[5.5, 12.5, 3, 6.5, 1], [10.5, 8, 3, 11, 1], [15.5, 4.5, 3, 14.5, 1]] },
  archive: { p: ['M4.5 6h15v4h-15z', 'M5.5 10v8.5h13V10', 'M10 13h4'] },
  assistant: { p: ['M4.5 8.5h15v8.5h-15z', 'M12 4v4.5', 'M8.5 12.5v1.6', 'M15.5 12.5v1.6'], c: [[12, 3, 1]] },
  automation: { p: ['M12 3.2a8.8 8.8 0 1 1-6.3 2.6', 'M4.2 2.6v3.6h3.6'] },
  bell: { p: ['M6.4 17.4V11a5.6 5.6 0 0 1 11.2 0v6.4l1.7 2.2H4.7Z'], c: [[12, 21.1, 1.4]] },
  bolt: { f: ['M13.4 2 5 13.8h5.3L9.6 22 19 9.6h-5.6Z'] },
  briefcase: { p: ['M3.5 8h17v11.5h-17z', 'M9 8V5.8h6V8'] },
  cpu: {
    r: [[7, 7, 10, 10, 2], [10.2, 10.2, 3.6, 3.6, 0.8]],
    p: ['M9.8 7V4.4M12 7V4.4M14.2 7V4.4M9.8 19.6v-2.6M12 19.6v-2.6M14.2 19.6v-2.6M7 9.8H4.4M7 12H4.4M7 14.2H4.4M19.6 9.8H17M19.6 12H17M19.6 14.2H17'],
  },
  browser: { p: ['M3.5 5h17v14h-17z', 'M3.5 9.2h17'], c: [[6, 7.1, 0.5], [8, 7.1, 0.5]] },
  calendar: { p: ['M3.8 6h16.4v14H3.8z', 'M3.8 10.4h16.4', 'M8.2 3.6v3.4', 'M15.8 3.6v3.4'] },
  check: { p: ['M4.6 12.6 9.6 17.8 19.6 6.4'] },
  chevDown: { p: ['M5.5 9 12 15.6 18.5 9'] },
  chevLeft: { p: ['M14.6 4.8 7.2 12l7.4 7.2'] },
  chevRight: { p: ['M9.4 4.8 16.8 12l-7.4 7.2'] },
  chevUp: { p: ['M5.5 15 12 8.4 18.5 15'] },
  clock: { c: [[12, 12, 8.6]], p: ['M12 7v5.5l3.8 2.5'] },
  close: { p: ['M5.6 5.6 18.4 18.4', 'M18.4 5.6 5.6 18.4'] },
  code: { p: ['M9.2 6.4 3.6 12.4 9.2 18.4', 'M14.8 6.4 20.4 12.4 14.8 18.4'] },
  command: { p: ['M9.2 14.8h5.6V9.2H9.2z', 'M14.8 9.2V6.4a2.8 2.8 0 1 0-2.8 2.8', 'M9.2 14.8v2.8a2.8 2.8 0 1 1-2.8-2.8', 'M14.8 14.8h2.8a2.8 2.8 0 1 0-2.8-2.8', 'M9.2 9.2H6.4a2.8 2.8 0 1 0 2.8 2.8'] },
  copy: { r: [[8.6, 8.6, 11, 11, 2.6], [4.4, 4.4, 11, 11, 2.6]] },
  core: {
    p: ['M12 2.6 20.6 12 12 21.4 3.4 12Z', 'M12 6.9 17.1 12 12 17.1 6.9 12Z'],
    f: ['M12 10.2 13.8 12 12 13.8 10.2 12Z'],
  },
  database: { p: ['M12 3.4c4.7 0 8.5 1.1 8.5 2.5S16.7 8.4 12 8.4 3.5 7.3 3.5 5.9 7.3 3.4 12 3.4Z', 'M20.5 5.9v12.2c0 1.4-3.8 2.5-8.5 2.5s-8.5-1.1-8.5-2.5V5.9', 'M20.5 12c0 1.4-3.8 2.5-8.5 2.5S3.5 13.4 3.5 12'] },
  department: { p: ['M12 3.6v3.6', 'M6.6 16.8v-3.4h10.8v3.4', 'M6.6 7.2h10.8'], r: [[4, 16.8, 5.2, 4, 1.2], [9.4, 16.8, 5.2, 4, 1.2], [14.8, 16.8, 5.2, 4, 1.2], [9.4, 3.2, 5.2, 4, 1.2]] },
  dots: { c: [[5.5, 12, 1.15], [12, 12, 1.15], [18.5, 12, 1.15]], solid: true },
  download: { p: ['M12 3.4v11', 'M7.6 10.6 12 15l4.4-4.4', 'M4.4 19.6h15.2'] },
  eye: { p: ['M2.6 12S6.2 6.2 12 6.2 21.4 12 21.4 12 17.8 17.8 12 17.8 2.6 12 2.6 12Z'], c: [[12, 12, 2.5]] },
  eyeOff: { p: ['M3.4 3.4 20.6 20.6', 'M9.6 6.9A9.8 9.8 0 0 1 12 6.6c5.8 0 9.4 5.4 9.4 5.4a17 17 0 0 1-3 3.4', 'M6.2 8.7A17 17 0 0 0 2.6 12s3.6 5.4 9.4 5.4a9.4 9.4 0 0 0 3.4-.6'] },
  file: { p: ['M6.4 2.8h6.6L18 8v13.2H6.4Z', 'M12.8 2.9V8.2H18'] },
  folder: { p: ['M3.2 5.6h5.6l2 2.6h8V19.4H3.2Z'] },
  folderOpen: { p: ['M3.2 5.6h5.6l2 2.6h8v2.4H3.2Z', 'M3.2 10.6h19.4l-2.6 9H3.2Z'] },
  git: { p: ['M6.4 7v10', 'M14 7v3.6a3 3 0 0 1-3 3H6.8'], c: [[6.4, 5, 2], [17.6, 5, 2], [6.4, 19, 2]] },
  grid: { r: [[3.6, 3.6, 7, 7, 1.8], [13.4, 3.6, 7, 7, 1.8], [3.6, 13.4, 7, 7, 1.8], [13.4, 13.4, 7, 7, 1.8]] },
  image: { p: ['M3.4 4.6h17.2v14.8H3.4z', 'M3.6 16.4 9.4 10l4.4 5 2.6-3 4 4.4'], c: [[8.6, 8.6, 1.3]] },
  key: { c: [[8.4, 15.6, 3.6]], p: ['M11 13 20 4', 'M16.4 7.6 19 10.2', 'M14 5 16.6 7.6'] },
  knowledge: { p: ['M12 6.2C10.4 4.9 7.6 4.3 3.6 4.4v13.2c4-.1 6.8.5 8.4 1.8', 'M12 6.2c1.6-1.3 4.4-1.9 8.4-1.8v13.2c-4-.1-6.8.5-8.4 1.8', 'M12 6.2v13'] },
  layers: { f: ['M12 2.8 21 7.6 12 12.4 3 7.6Z'], p: ['M3 12.4l9 4.8 9-4.8', 'M3 16.9l9 4.7 9-4.7'] },
  link: { p: ['M10.2 13.8a3.6 3.6 0 0 0 5.2 0l2.9-2.9a3.7 3.7 0 0 0-5.2-5.2l-1.3 1.3', 'M13.8 10.2a3.6 3.6 0 0 0-5.2 0l-2.9 2.9a3.7 3.7 0 0 0 5.2 5.2l1.3-1.3'] },
  list: { p: ['M9 6.5h11', 'M9 12h11', 'M9 17.5h11'], c: [[4.8, 6.5, 0.9], [4.8, 12, 0.9], [4.8, 17.5, 0.9]], solid: true },
  lock: { p: ['M4.8 10.4h14.4V20H4.8z', 'M8 10.4V7.6a4 4 0 0 1 8 0v2.8'], c: [[12, 15, 1.2]] },
  media: { p: ['M9.4 17.4V6.2l10-2v11'], c: [[7, 17.6, 2.4], [17, 15.6, 2.4]] },
  memory: { p: ['M6.8 6.8h10.4v10.4H6.8z'], c: [[12, 12, 1.5]], r: [[4.4, 4.4, 15.2, 15.2, 3]] },
  mic: { p: ['M8.4 11.4a3.6 3.6 0 0 1 7.2 0v2.8a3.6 3.6 0 0 1-7.2 0Z', 'M5.2 12.6a6.8 6.8 0 0 0 13.6 0', 'M12 19.4V21.6', 'M8.8 21.6h6.4'] },
  minus: { p: ['M5 12h14'] },
  next: { f: ['M19 5.4 10 12l9 6.6Z'], p: ['M5.6 5.6v12.8'] },
  notification: { p: ['M6.4 17.4V11a5.6 5.6 0 0 1 11.2 0v6.4l1.7 2.2H4.7Z'], c: [[12, 21.1, 1.4]] },
  pause: { r: [[7.4, 5.4, 2.9, 13.2, 1], [13.7, 5.4, 2.9, 13.2, 1]], solid: true },
  pin: { p: ['M9.2 2.8h5.6l-1 5 3.4 3.4H6.8l3.4-3.4Z', 'M12 11.2v10'] },
  play: { f: ['M7.4 4.6 19 12 7.4 19.4Z'] },
  plus: { p: ['M12 5.2v13.6', 'M5.2 12h13.6'] },
  plug: { p: ['M8.6 2.8v5.4', 'M15.4 2.8v5.4', 'M5.6 8.2h12.8v3.4a6.4 6.4 0 0 1-12.8 0Z', 'M12 18v3.2'] },
  power: { p: ['M8.4 6.4a7 7 0 1 0 7.2 0', 'M12 2.6v7.6'] },
  prev: { f: ['M5 5.4 14 12l-9 6.6Z'], p: ['M18.4 5.6v12.8'] },
  project: { p: ['M3.4 6.6 9.4 3l6 3.6 5.2-2.6v13.4L14.6 21l-6-3.6-5.2 2.6Z', 'M9.4 3v14.4', 'M15.4 6.6v14'] },
  refresh: { p: ['M19.6 12a7.6 7.6 0 1 1-2.4-5.6', 'M20 3.4v4h-4'] },
  reply: { p: ['M9.4 6.6 3.8 12l5.6 5.4', 'M3.8 12h9.6a6.6 6.6 0 0 1 6.6 6.6v.6'] },
  repeat: { p: ['M17 4.4 20.4 8 17 11.6', 'M7 12.4 3.6 16 7 19.6', 'M20.4 8H8.6A4.6 4.6 0 0 0 4 12.6', 'M3.6 16h11.8a4.6 4.6 0 0 0 4.6-4.6'] },
  route: { c: [[5.6, 5.6, 2.3], [18.4, 18.4, 2.3]], p: ['M8 5.6h5.4a4 4 0 0 1 0 8H10a4 4 0 0 0 0 8h6.1'] },
  search: { c: [[10.6, 10.6, 5.9]], p: ['M14.9 14.9 20.2 20.2'] },
  send: { p: ['M2.6 11.4 21.4 3.6 13.6 21.4l-2.6-7.4Z'] },
  settings: { p: ['M12 8.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z', 'M12 2.6v2.6M12 18.8v2.6M4.4 12H1.8M22.2 12h-2.6M6.6 6.6 4.8 4.8M19.2 19.2l-1.8-1.8M17.4 6.6 19.2 4.8M4.8 19.2 6.6 17.4'] },
  shield: { p: ['M12 2.8 19.6 5.6v6.2c0 4.4-3.2 7.6-7.6 9.4-4.4-1.8-7.6-5-7.6-9.4V5.6Z'] },
  shuffle: { p: ['M17 3.4 20.6 7 17 10.6', 'M17 13.4 20.6 17 17 20.6', 'M3.4 7h3.4l10.4 13.4', 'M3.4 17h3.4l3.2-4', 'M13.8 7.2 17.2 7'] },
  spark: { p: ['M12 2.8 13.6 9.9 20.7 11.5 13.6 13.1 12 20.2 10.4 13.1 3.3 11.5 10.4 9.9Z'] },
  steer: { p: ['M12 3.4v4.4', 'M12 16.2v4.4', 'M3.4 12h4.4', 'M16.2 12h4.4'], c: [[12, 12, 3.8], [12, 12, 0.9]] },
  system: { r: [[8.4, 8.4, 7.2, 7.2, 1.6], [4.2, 4.2, 15.6, 15.6, 2.8]], p: ['M8 4.2v-1.6M12 4.2v-1.6M16 4.2v-1.6M8 21.4v-1.6M12 21.4v-1.6M16 21.4v-1.6M4.2 8h-1.6M4.2 12h-1.6M4.2 16h-1.6M21.4 8h-1.6M21.4 12h-1.6M21.4 16h-1.6'] },
  target: { c: [[12, 12, 8.4], [12, 12, 4.4], [12, 12, 1.1]], p: ['M12 1.6v2.8M12 19.6v2.8M1.6 12h2.8M19.6 12h2.8'] },
  task: { r: [[3.6, 3.6, 16.8, 16.8, 4.2]], p: ['M8 12.4l2.8 3L16.4 9.4'] },
  terminal: { r: [[2.6, 4, 18.8, 16, 2.8]], p: ['M6.4 9.6 9.8 12.8 6.4 16', 'M12.6 16.4h5.2'] },
  trash: { p: ['M4.4 7h15.2', 'M9.6 7V4.4h4.8V7', 'M6.4 7l1 13.6h9.2L17.6 7', 'M10.2 10.4v6.8M13.8 10.4v6.8'] },
  upload: { p: ['M12 17V3.6', 'M7.6 8 12 3.6 16.4 8', 'M4.4 19.6h15.2'] },
  users: { c: [[9.4, 8.2, 3.4]], p: ['M3.6 20.4a5.8 5.8 0 0 1 11.6 0', 'M15.6 5.2a3.4 3.4 0 0 1 0 6.4', 'M17.4 13.6a5.8 5.8 0 0 1 3 6.2'] },
  volume: { p: ['M11.6 5.4 6.4 10H3.4v4h3l5.2 4.6Z', 'M15.4 9.2a4.6 4.6 0 0 1 0 5.6', 'M18 6.4a9 9 0 0 1 0 11.2'] },
  volumeMute: { p: ['M11.6 5.4 6.4 10H3.4v4h3l5.2 4.6Z', 'M16 10 20.6 14.6', 'M20.6 10 16 14.6'] },
  wifi: { p: ['M2.6 9.2a14 14 0 0 1 18.8 0', 'M5.8 12.6a9.4 9.4 0 0 1 12.4 0', 'M9 16a4.8 4.8 0 0 1 6 0'], c: [[12, 19, 1.15]] },
};
// The record is typed as Record<IconName, Geo>, so a missing glyph is a compile error.

export interface IconProps {
  name: string;
  size?: number;
  className?: string;
  strokeWidth?: number;
  title?: string;
  style?: React.CSSProperties;
}

function Geometry({ geo, sw }: { geo: Geo; sw: number }) {
  const nodes: ReactNode[] = [];
  if (geo.p) for (const [i, d] of geo.p.entries()) nodes.push(<path key={`p${i}`} d={d} />);
  if (geo.f) for (const [i, d] of geo.f.entries()) nodes.push(<path key={`f${i}`} d={d} className="ic__fill" />);
  if (geo.c) for (const [i, [cx, cy, r]] of geo.c.entries()) nodes.push(<circle key={`c${i}`} cx={cx} cy={cy} r={r} className={r <= 1.3 ? 'ic__fill' : undefined} />);
  if (geo.r) for (const [i, [x, y, w, h, rx]] of geo.r.entries()) nodes.push(<rect key={`r${i}`} x={x} y={y} width={w} height={h} rx={rx ?? 2} />);
  return (
    <g
      fill={geo.solid ? 'currentColor' : 'none'}
      stroke={geo.solid ? 'none' : 'currentColor'}
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {nodes}
    </g>
  );
}

export const Icon = memo(function Icon({ name, size = 16, className, strokeWidth, title, style }: IconProps) {
  const geo = (G as Record<string, Geo | undefined>)[name];
  return (
    <svg
      className={`ic${className ? ` ${className}` : ''}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      style={style}
      shapeRendering="geometricPrecision"
    >
      {title ? <title>{title}</title> : null}
      {geo ? (
        <Geometry geo={geo} sw={strokeWidth ?? Math.min(2.1, Math.max(1.15, 20 / size))} />
      ) : (
        <g fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
          <circle cx="12" cy="12" r="7.2" opacity="0.5" />
          <path d="M12 8.4v4.2" opacity="0.7" />
        </g>
      )}
    </svg>
  );
});

export type { Geo as IconGeometry };
