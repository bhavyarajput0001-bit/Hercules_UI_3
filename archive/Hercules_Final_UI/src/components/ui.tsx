/**
 * HERCULES · HUD primitives
 * The shared vocabulary every screen builds on: panels, chips, meters,
 * sparklines, tables, toggles, sliders. Dark-instrument aesthetic, one line
 * weight, no SaaS card shadows.
 */
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { Icon, type IconName } from './Icon';

export const cx = (...parts: (string | number | false | null | undefined)[]) => parts.filter(Boolean).join(' ');

/* ── status colours ──────────────────────────────────────────────────────── */

const STATUS_TONE: Record<string, string> = {
  idle: 'dim',
  recruited: 'dim',
  retired: 'dim',
  'standing-by': 'dim',
  thinking: 'info',
  'in-progress': 'info',
  working: 'accent',
  active: 'accent',
  ready: 'accent',
  online: 'accent',
  connected: 'success',
  done: 'success',
  success: 'success',
  ok: 'success',
  secure: 'success',
  review: 'accent2',
  'awaiting-approval': 'warn',
  pending: 'warn',
  'at-risk': 'warn',
  degraded: 'warn',
  partial: 'warn',
  stale: 'warn',
  'rate-limited': 'warn',
  loading: 'info',
  indexing: 'info',
  blocked: 'danger',
  error: 'danger',
  failed: 'danger',
  offline: 'danger',
  cancelled: 'dim',
  'on-hold': 'dim',
  planning: 'dim',
  archived: 'dim',
  'not-allowed': 'danger',
  denied: 'danger',
  revoked: 'danger',
  allowed: 'success',
  granted: 'success',
  executed: 'accent',
  paused: 'dim',
  muted: 'dim',
};

export type Tone = 'default' | 'dim' | 'info' | 'accent' | 'accent2' | 'success' | 'warn' | 'danger';

export const toneOf = (status: string) => STATUS_TONE[status] ?? 'dim';

/** Tabs: the shell's own view switcher (segmented labels with an underline). */
export function Tabs({
  items,
  active,
  onChange,
}: {
  items: { id: string; label: ReactNode; badge?: number | string }[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="tabs" role="tablist">
      {items.map((t) => (
        <button
          key={t.id}
          type="button"
          role="tab"
          aria-selected={t.id === active}
          className={cx('tabs__item', t.id === active && 'is-active')}
          onClick={() => onChange(t.id)}
        >
          {t.label}
          {t.badge !== undefined && <em className="mono tabs__badge">{t.badge}</em>}
        </button>
      ))}
    </div>
  );
}

/* ── Panel ───────────────────────────────────────────────────────────────── */

export function Panel({
  title,
  subtitle,
  icon,
  actions,
  children,
  className,
  busy,
  style,
  footer,
  size = 'default',
  scroll,
  onTitleClick,
}: {
  title?: ReactNode;
  subtitle?: ReactNode;
  icon?: IconName;
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
  busy?: boolean;
  style?: CSSProperties;
  footer?: ReactNode;
  size?: 'default' | 'tight' | 'flush';
  scroll?: boolean | number;
  onTitleClick?: () => void;
}) {
  const pad = size === 'tight' ? 'hud__panel--tight' : size === 'flush' ? 'hud__panel--flush' : '';
  return (
    <section className={cx('hud__panel', pad, className, busy && 'is-busy')} style={style}>
      {(title || actions) && (
        <header className="hud__panel-head">
          <div className="hud__panel-title">
            {icon && <Icon name={icon} size={14} className="hud__panel-icon" />}
            <div>
              <h3>
                {onTitleClick ? (
                  <button className="linklike" onClick={onTitleClick}>
                    {title}
                  </button>
                ) : (
                  title
                )}
              </h3>
              {subtitle && <p className="hud__panel-sub">{subtitle}</p>}
            </div>
          </div>
          <div className="hud__panel-actions">
            {busy && <Spinner />}
            {actions}
          </div>
        </header>
      )}
      <div className={cx('hud__panel-body', scroll && 'is-scroll')} style={typeof scroll === 'number' ? { maxHeight: scroll } : undefined}>
        {children}
      </div>
      {footer && <footer className="hud__panel-foot">{footer}</footer>}
    </section>
  );
}

export function SectionLabel({ children, right }: { children: ReactNode; right?: ReactNode }) {
  return (
    <div className="hud__section-label">
      <span>{children}</span>
      {right}
    </div>
  );
}

/* ── Chips / badges ──────────────────────────────────────────────────────── */

export function Chip({
  children,
  tone = 'default',
  icon,
  onClick,
  active,
  title,
  className,
  size = 'md',
}: {
  children: ReactNode;
  tone?: Tone;
  icon?: IconName;
  onClick?: () => void;
  active?: boolean;
  title?: string;
  className?: string;
  size?: 'sm' | 'md';
}) {
  const Comp = onClick ? 'button' : 'span';
  return (
    <Comp
      className={cx('chip', `chip--${tone}`, size === 'sm' && 'chip--sm', active && 'is-active', className)}
      onClick={onClick}
      title={title}
      type={onClick ? 'button' : undefined}
    >
      {icon && <Icon name={icon} size={size === 'sm' ? 11 : 13} />}
      {children}
    </Comp>
  );
}

export function StatusDot({ status, pulse = true }: { status: string; pulse?: boolean }) {
  return <span className={cx('dot', `dot--${toneOf(status)}`, pulse && ['working', 'thinking', 'in-progress', 'executing', 'indexing'].includes(status) && 'is-pulse')} title={status} />;
}

export function Badge({ children, tone = 'dim' }: { children: ReactNode; tone?: string }) {
  return <span className={cx('badge', `badge--${tone}`)}>{children}</span>;
}

/* ── Meters ──────────────────────────────────────────────────────────────── */

export function Meter({
  value,
  max = 100,
  tone = 'accent',
  label,
  suffix,
  height = 4,
  markers,
}: {
  value: number;
  max?: number;
  tone?: string;
  label?: ReactNode;
  suffix?: ReactNode;
  height?: number;
  markers?: number[];
}) {
  const pctv = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className="meter">
      {(label || suffix) && (
        <div className="meter__row">
          <span>{label}</span>
          <span className="mono">{suffix ?? `${Math.round(pctv)}%`}</span>
        </div>
      )}
      <div className="meter__track" style={{ height }}>
        <div className={`meter__fill meter__fill--${tone}`} style={{ width: `${pctv}%` }} />
        {markers?.map((m) => (
          <span key={m} className="meter__mark" style={{ left: `${Math.min(100, (m / max) * 100)}%` }} />
        ))}
      </div>
    </div>
  );
}

export function Sparkline({
  values,
  height = 34,
  width,
  tone = 'var(--accent)',
  fill = true,
  strokeWidth = 1.5,
  showLast = false,
  className,
}: {
  values: number[];
  height?: number;
  width?: number | string;
  tone?: string;
  fill?: boolean;
  strokeWidth?: number;
  showLast?: boolean;
  className?: string;
}) {
  const { d, area, last } = useMemo(() => {
    const w = 100;
    const h = 100;
    if (!values.length) return { d: '', area: '', last: [0, 0] as [number, number] };
    const min = Math.min(...values);
    const max = Math.max(...values);
    const span = max - min || 1;
    const pts = values.map((v, i) => [(i / Math.max(1, values.length - 1)) * w, h - ((v - min) / span) * (h - 8) - 4] as [number, number]);
    const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)}`).join(' ');
    return { d: line, area: `${line} L100 100 L0 100 Z`, last: pts[pts.length - 1]! };
  }, [values]);
  return (
    <svg className={cx('spark', className)} viewBox="0 0 100 100" preserveAspectRatio="none" style={{ height, width: width ?? '100%' }} aria-hidden>
      {fill && <path d={area} className="spark__area" style={{ fill: tone }} />}
      <path d={d} className="spark__line" style={{ stroke: tone, strokeWidth }} vectorEffect="non-scaling-stroke" />
      {showLast && <circle cx={last[0]} cy={last[1]} r="2.4" style={{ fill: tone }} vectorEffect="non-scaling-stroke" />}
    </svg>
  );
}

export function Bars({
  data,
  height = 90,
  tone = 'var(--accent)',
  onPick,
}: {
  data: { label: string; value: number; tone?: string }[];
  height?: number;
  tone?: string;
  onPick?: (label: string) => void;
}) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <div className="bars" style={{ height }}>
      {data.map((d) => (
        <button
          key={d.label}
          type="button"
          className="bars__item"
          onClick={() => onPick?.(d.label)}
          title={`${d.label}: ${Math.round(d.value)}`}
          style={{ ['--bar-tone' as string]: d.tone ?? tone }}
        >
          <span className="bars__value">{Math.round(d.value)}</span>
          <span className="bars__bar" style={{ height: `${(d.value / max) * 100}%` }} />
          <span className="bars__label">{d.label}</span>
        </button>
      ))}
    </div>
  );
}

export function RadialGauge({
  value,
  size = 92,
  label,
  tone = 'var(--accent)',
  sub,
}: {
  value: number;
  size?: number;
  label?: ReactNode;
  tone?: string;
  sub?: ReactNode;
}) {
  const r = 40;
  const c = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className="gauge" style={{ width: size }}>
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle cx="50" cy="50" r={r} className="gauge__track" strokeWidth="7" fill="none" />
        <circle
          cx="50"
          cy="50"
          r={r}
          className="gauge__fill"
          stroke={tone}
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${(v / 100) * c} ${c}`}
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="gauge__center">
        <strong>{label ?? `${Math.round(v)}%`}</strong>
        {sub && <span>{sub}</span>}
      </div>
    </div>
  );
}

/* ── Controls ────────────────────────────────────────────────────────────── */

export function Button({
  children,
  icon,
  onClick,
  variant = 'ghost',
  size = 'md',
  busy,
  disabled,
  title,
  tone,
  full,
  type = 'button',
}: {
  children?: ReactNode;
  icon?: IconName;
  onClick?: () => void;
  variant?: 'solid' | 'ghost' | 'outline' | 'bare' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  busy?: boolean;
  disabled?: boolean;
  title?: string;
  tone?: string;
  full?: boolean;
  type?: 'button' | 'submit';
}) {
  return (
    <button
      type={type}
      className={cx('btn', `btn--${variant}`, `btn--${size}`, full && 'btn--full', busy && 'is-busy')}
      onClick={onClick}
      disabled={disabled || busy}
      title={title}
      style={tone ? ({ ['--btn-tone' as string]: tone } as CSSProperties) : undefined}
    >
      {busy ? <Spinner /> : icon ? <Icon name={icon} size={size === 'sm' ? 12 : 14} /> : null}
      {children && <span>{children}</span>}
    </button>
  );
}

export function IconButton({
  icon,
  onClick,
  title,
  active,
  tone,
  size = 'md',
  badge,
  busy,
}: {
  icon: IconName;
  onClick?: (e: React.MouseEvent) => void;
  title: string;
  active?: boolean;
  tone?: 'danger' | 'warn' | 'accent' | 'info' | 'success';
  size?: 'sm' | 'md' | 'lg';
  badge?: number;
  busy?: boolean;
}) {
  return (
    <button
      type="button"
      className={cx('iconbtn', `iconbtn--${size}`, active && 'is-active', tone && `is-${tone}`, busy && 'is-busy')}
      onClick={onClick}
      title={title}
      aria-label={title}
    >
      {busy ? <Spinner /> : <Icon name={icon} size={size === 'sm' ? 13 : size === 'lg' ? 20 : 16} />}
      {!!badge && badge > 0 && <span className="iconbtn__badge">{badge > 99 ? '99+' : badge}</span>}
    </button>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
  hint,
  disabled,
  title,
  onClick,
  size,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: ReactNode;
  hint?: ReactNode;
  disabled?: boolean;
  title?: string;
  onClick?: (e: React.MouseEvent) => void;
  size?: 'sm' | 'md';
}) {
  return (
    <label className={cx('switch', disabled && 'is-disabled', size === 'sm' && 'switch--sm')} title={title} onClick={onClick}>
      <input type="checkbox" checked={checked} disabled={disabled} onChange={(e) => onChange(e.target.checked)} />
      <span className="switch__track">
        <span className="switch__thumb" />
      </span>
      {(label || hint) && (
        <span className="switch__text">
          {label && <b>{label}</b>}
          {hint && <small>{hint}</small>}
        </span>
      )}
    </label>
  );
}

export function Slider({
  value,
  min = 0,
  max = 1,
  step = 0.01,
  onChange,
  onCommit,
  label,
  hint,
  format,
  tone,
}: {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (v: number) => void;
  onCommit?: (v: number) => void;
  label?: ReactNode;
  hint?: ReactNode;
  format?: (v: number) => string;
  tone?: string;
}) {
  const [local, setLocal] = useState(value);
  useEffect(() => setLocal(value), [value]);
  const p = ((local - min) / (max - min)) * 100;
  return (
    <label className="slider">
      {label && <span className="slider__label">{label}</span>}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={local}
        onChange={(e) => {
          const v = Number(e.target.value);
          setLocal(v);
          onChange?.(v);
        }}
        onPointerUp={() => onCommit?.(local)}
        onKeyUp={() => onCommit?.(local)}
        style={{ ['--p' as string]: `${p}%`, ...(tone ? ({ ['--slider-tone' as string]: tone } as CSSProperties) : {}) }}
      />
      <span className="slider__value mono">{format ? format(local) : local.toFixed(2)}</span>
      {hint && <small className="slider__hint dim">{hint}</small>}
    </label>
  );
}

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  size = 'md',
}: {
  options: { value: T; label: ReactNode; icon?: IconName; tone?: string }[];
  value: T;
  onChange: (v: T) => void;
  size?: 'sm' | 'md';
}) {
  return (
    <div className={cx('segmented', size === 'sm' && 'segmented--sm')} role="tablist">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="tab"
          aria-selected={o.value === value}
          className={cx('segmented__item', o.value === value && 'is-active')}
          onClick={() => onChange(o.value)}
          style={o.tone ? ({ ['--seg-tone' as string]: o.tone } as CSSProperties) : undefined}
        >
          {o.icon && <Icon name={o.icon} size={12} />}
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Field({
  label,
  hint,
  children,
  right,
}: {
  label: ReactNode;
  hint?: ReactNode;
  children: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="field">
      <div className="field__head">
        <label>{label}</label>
        {right}
      </div>
      {children}
      {hint && <small className="field__hint">{hint}</small>}
    </div>
  );
}

export function TextInput({
  value,
  onChange,
  onSubmit,
  placeholder,
  icon,
  autoFocus,
  mono,
  type = 'text',
  onKeyDown,
  right,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  icon?: IconName;
  autoFocus?: boolean;
  mono?: boolean;
  type?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  right?: ReactNode;
  disabled?: boolean;
}) {
  const ref = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (autoFocus) ref.current?.focus();
  }, [autoFocus]);
  return (
    <div className={cx('input', mono && 'input--mono', disabled && 'is-disabled')}>
      {icon && <Icon name={icon} size={14} className="input__icon" />}
      <input
        ref={ref}
        value={value}
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          onKeyDown?.(e);
          if (e.key === 'Enter') onSubmit?.();
        }}
      />
      {right}
    </div>
  );
}

export function TextArea({
  value,
  onChange,
  placeholder,
  rows = 3,
  onSubmit,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  onSubmit?: () => void;
}) {
  return (
    <textarea
      className="textarea"
      value={value}
      rows={rows}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) onSubmit?.();
      }}
    />
  );
}

export function Select<T extends string>({
  value,
  options,
  onChange,
  label,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
  label?: ReactNode;
}) {
  return (
    <label className="select">
      {label && <span>{label}</span>}
      <select value={value} onChange={(e) => onChange(e.target.value as T)}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <Icon name="chevDown" size={12} />
    </label>
  );
}

/* ── Data display ────────────────────────────────────────────────────────── */

export function KV({ items, dense }: { items: { k: ReactNode; v: ReactNode }[]; dense?: boolean }) {
  return (
    <dl className={cx('kv', dense && 'kv--dense')}>
      {items.map((it, i) => (
        <div key={i} className="kv__row">
          <dt>{it.k}</dt>
          <dd>{it.v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Row({
  children,
  onClick,
  active,
  flash,
  className,
  as = 'div',
  onDoubleClick,
}: {
  children: ReactNode;
  onClick?: () => void;
  active?: boolean;
  flash?: boolean;
  className?: string;
  as?: 'div' | 'button' | 'tr';
  onDoubleClick?: () => void;
}) {
  const cls = cx('row', onClick && 'row--click', active && 'is-active', flash && 'is-flash', className);
  if (as === 'button')
    return (
      <button type="button" className={cls} onClick={onClick} onDoubleClick={onDoubleClick}>
        {children}
      </button>
    );
  return (
    <div className={cls} onClick={onClick} onDoubleClick={onDoubleClick}>
      {children}
    </div>
  );
}

export function EmptyState({ icon = 'spark', title, body, action }: { icon?: IconName; title: string; body?: ReactNode; action?: ReactNode }) {
  return (
    <div className="empty">
      <Icon name={icon} size={22} />
      <h4>{title}</h4>
      {body && <p>{body}</p>}
      {action}
    </div>
  );
}

export function Spinner({ size = 12 }: { size?: number }) {
  return (
    <span className="spinner" style={{ width: size, height: size }} aria-label="working">
      <svg viewBox="0 0 24 24" width={size} height={size}>
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="18 44" />
      </svg>
    </span>
  );
}

export function Skeleton({ w = '100%', h = 10, radius = 4 }: { w?: number | string; h?: number; radius?: number }) {
  return <span className="skeleton" style={{ width: w, height: h, borderRadius: radius }} />;
}

export function LoadMore({ loading, total, shown, onMore }: { loading?: boolean; total: number; shown: number; onMore?: () => void }) {
  if (loading)
    return (
      <div className="loadmore">
        <Spinner /> loading…
      </div>
    );
  if (shown >= total) return <div className="loadmore loadmore--end">{total} shown</div>;
  return (
    <button type="button" className="loadmore" onClick={onMore}>
      show {Math.min(50, total - shown)} more of {total}
    </button>
  );
}

/* ── Tooltip (title-quality, no library) ─────────────────────────────────── */

export function Info({ text }: { text: ReactNode }) {
  return (
    <span className="info" tabIndex={0}>
      <Icon name="alert" size={11} />
      <span className="info__bubble">{text}</span>
    </span>
  );
}

/* ── useFlash helper ─────────────────────────────────────────────────────── */

export function useFlash(key: string, flash: Record<string, number>) {
  const on = !!flash[key];
  const [state, setState] = useState(on);
  useEffect(() => {
    setState(on);
    if (!on) return;
    const t = window.setTimeout(() => setState(false), 2_200);
    return () => window.clearTimeout(t);
  }, [on]);
  return state;
}
