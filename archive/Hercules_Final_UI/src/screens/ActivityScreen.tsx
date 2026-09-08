/**
 * HERCULES · Activity stream
 * The estate's memory of what it did. Filter by actor and kind, follow a
 * traceId, export. New events land live from the activity bus — this is the
 * screen you open when you want to know what actually happened.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from '@/components/Icon';
import { Button, Chip, IconButton, Row, SectionLabel, cx } from '@/components/ui';
import { store, toast, ui } from '@/state/hercules';
import { useAsync, useDebounced } from '@/hooks/useAsync';
import { clockTime, relativeTime } from '@/services/mock/helpers';
import type { ActivityKind } from '@/types/domain';

const KINDS: { id: ActivityKind | 'all'; label: string; icon: string }[] = [
  { id: 'all', label: 'Everything', icon: 'activity' },
  { id: 'task', label: 'Tasks', icon: 'task' },
  { id: 'agent', label: 'Agents', icon: 'agent' },
  { id: 'tool', label: 'Tools', icon: 'terminal' },
  { id: 'file', label: 'Files', icon: 'file' },
  { id: 'memory', label: 'Memory', icon: 'memory' },
  { id: 'automation', label: 'Automations', icon: 'automation' },
  { id: 'conversation', label: 'Conversations', icon: 'spark' },
  { id: 'security', label: 'Security', icon: 'shield' },
  { id: 'system', label: 'System', icon: 'system' },
];

export default function ActivityScreen() {
  const services = store.get().services;
  const rev = store.use((s) => s.rev);
  const flash = store.use((s) => s.flash);
  const [kind, setKind] = useState<ActivityKind | 'all'>('all');
  const [query, setQuery] = useState('');
  const q = useDebounced(query, 220);
  const [onlySensitive, setOnlySensitive] = useState(false);
  const [onlyAgents, setOnlyAgents] = useState(false);
  const [follow, setFollow] = useState<string | null>(null);
  const [live, setLive] = useState(true);
  const [limit, setLimit] = useState(60);

  const { data: events, loading, refresh } = useAsync(
    () => services.activity.list({ kinds: kind === 'all' ? undefined : [kind], query: q.trim() || undefined, limit }),
    [kind, q, limit, rev.activity],
  );

  const list = useMemo(() => {
    let xs = events ?? [];
    if (onlySensitive) xs = xs.filter((e) => e.sensitive);
    if (onlyAgents) xs = xs.filter((e) => e.actor.toLowerCase().includes('agent') || /-\d\d$/.test(e.actor) || e.actor.includes('HERCULES'));
    if (follow) xs = xs.filter((e) => e.traceId === follow);
    return xs;
  }, [events, onlySensitive, onlyAgents, follow]);

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (const e of events ?? []) m.set(e.kind, (m.get(e.kind) ?? 0) + 1);
    return m;
  }, [events]);

  // Live tail: the bus pushes into the same list, so a running estate keeps streaming here.
  useLiveTail(live, refresh);

  const groups = useMemo(() => {
    const out: { day: string; items: typeof list }[] = [];
    for (const e of list) {
      const day = new Date(e.at).toDateString();
      const last = out[out.length - 1];
      if (last && last.day === day) last.items.push(e);
      else out.push({ day, items: [e] });
    }
    return out.reverse();
  }, [list]);

  return (
    <div className="screen activity-screen">
      <div className="act-toolbar">
        <div className="act-chips">
          {KINDS.map((k) => (
            <button key={k.id} type="button" className={cx('act-chip', kind === k.id && 'is-on')} onClick={() => setKind(k.id)}>
              <Icon name={k.icon} size={11} />
              {k.label}
              {k.id !== 'all' && counts.get(k.id) ? <em className="mono">{counts.get(k.id)}</em> : null}
            </button>
          ))}
        </div>
        <span className="spacer" />
        <div className="searchfield">
          <Icon name="search" size={12} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search actors, actions, targets…" />
          {query && <IconButton icon="close" size="sm" title="Clear" onClick={() => setQuery('')} />}
        </div>
        <button type="button" className={cx('act-filter', onlySensitive && 'is-on')} onClick={() => setOnlySensitive((v) => !v)}>
          <Icon name="shield" size={11} /> sensitive only
        </button>
        <button type="button" className={cx('act-filter', onlyAgents && 'is-on')} onClick={() => setOnlyAgents((v) => !v)}>
          <Icon name="agent" size={11} /> by agents
        </button>
        <button type="button" className={cx('act-filter', live && 'is-on')} onClick={() => setLive((v) => !v)} title="Follow the live tail">
          <span className={cx('act-live__dot', live && 'is-pulse')} /> live tail
        </button>
      </div>

      {follow && (
        <div className="act-trace">
          <Icon name="route" size={12} />
          <span>following trace <b className="mono">{follow}</b> — every step tagged with it</span>
          <span className="spacer" />
          <Button size="sm" icon="copy" onClick={() => void navigator.clipboard?.writeText(follow).then(() => toast({ title: 'traceId copied', severity: 'info', ttlMs: 2_000 }))}>Copy</Button>
          <Button size="sm" icon="close" onClick={() => setFollow(null)}>Stop following</Button>
        </div>
      )}

      <div className="split split--a">
        <section className="hud__panel">
          <header className="hud__panel-head">
            <div className="hud__panel-title">
              <Icon name="activity" size={14} className="hud__panel-icon" />
              <div>
                <h3>Activity</h3>
                <p className="hud__panel-sub">{list.length} shown{loading ? ' · refreshing' : ''} · retention follows your privacy policy</p>
              </div>
            </div>
            <div className="cluster">
              <Button size="sm" icon="chevDown" onClick={() => setLimit((l) => Math.min(400, l + 60))}>Load 60 more</Button>
              <IconButton icon="refresh" size="sm" title="Refresh" onClick={() => refresh()} />
            </div>
          </header>
          <div className="hud__panel-body act-stream">
            {groups.map((g) => (
              <div key={g.day} className="act-day">
                <SectionLabel right={<span className="mono dim">{g.items.length}</span>}>{g.day === new Date().toDateString() ? 'Today' : g.day}</SectionLabel>
                {g.items.map((e) => (
                  <Row key={e.id} className={cx('act-event', e.sensitive && 'is-sensitive', !!flash[`activity:${e.id}`] && 'is-flash')} onClick={() => setFollow(e.traceId ?? null)}>
                    <span className={cx('act-event__glyph', `act-event__glyph--${e.kind}`)}><Icon name={KINDS.find((k) => k.id === e.kind)?.icon ?? 'activity'} size={11} /></span>
                    <span className="act-event__time mono">{clockTime(e.at)}</span>
                    <div className="act-event__body">
                      <span>
                        <b className="mono">{e.actor}</b> {e.action}{e.target ? <> · <em>{e.target}</em></> : null}
                      </span>
                      {e.detail && <small className="dim">{e.detail}</small>}
                    </div>
                    {e.sensitive && <Chip size="sm" tone="warn" icon="shield">sensitive</Chip>}
                    {e.traceId && <span className="mono act-event__trace">{e.traceId}</span>}
                    <span className="mono dim act-event__ago">{relativeTime(e.at)}</span>
                  </Row>
                ))}
              </div>
            ))}
            {!loading && !list.length && (
              <div className="act-empty">
                <Icon name="search" size={16} />
                <b>Nothing matches</b>
                <span>Loosen the filter, or clear “sensitive only”. The log keeps everything; it just is not interesting yet.</span>
              </div>
            )}
          </div>
          <footer className="hud__panel-foot">
            <span className="dim mono">agents cannot write to this log — only the runtime can, and it cannot be cleared from the client</span>
            <span className="spacer" />
            <button className="linklike" onClick={() => void services.activity.export('json').then((f) => toast({ title: 'Exported', body: `${f.rows} events → ${f.filename} · ${f.bytes} bytes`, severity: 'success', ttlMs: 4_500 }))}>export JSON</button>
            <button className="linklike" onClick={() => void services.activity.export('csv').then((f) => toast({ title: 'Exported', body: `${f.rows} events → ${f.filename}`, severity: 'success', ttlMs: 4_000 }))}>CSV</button>
          </footer>
        </section>

        <div className="stack">
          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="users" size={14} className="hud__panel-icon" />
                <div>
                  <h3>Busiest actors</h3>
                  <p className="hud__panel-sub">In this window. Names, not abstractions.</p>
                </div>
              </div>
            </header>
            <div className="hud__panel-body stack--tight">
              {topActors(events ?? []).map(([actor, n]) => (
                <Row key={actor} className="minirow" onClick={() => { setQuery(actor); setKind('all'); }}>
                  <span>{actor}</span>
                  <em className="mono">{n}</em>
                  <span className="act-actor__bar" style={{ ['--w' as string]: `${Math.round((n / Math.max(1, ...topActors(events ?? []).map(([, c]) => c))) * 100)}%` }} />
                </Row>
              ))}
            </div>
          </section>

          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="shield" size={14} className="hud__panel-icon" />
                <div>
                  <h3>Security-relevant</h3>
                  <p className="hud__panel-sub">Everything that touched a boundary.</p>
                </div>
              </div>
            </header>
            <div className="hud__panel-body stack--tight">
              {(events ?? []).filter((e) => e.kind === 'security' || e.sensitive).slice(0, 8).map((e) => (
                <Row key={`sec-${e.id}`} className="minirow">
                  <Icon name={e.sensitive ? 'alert' : 'shield'} size={11} className={e.sensitive ? 'warn-text' : 'dim'} />
                  <span>{e.action} · {e.actor}</span>
                  <em className="mono dim">{relativeTime(e.at)}</em>
                </Row>
              ))}
            </div>
            <footer className="hud__panel-foot">
              <span className="spacer" />
              <button className="linklike" onClick={() => ui.go('permissions')}>open the audit ledger</button>
            </footer>
          </section>
        </div>
      </div>
    </div>
  );
}

function topActors(events: { actor: string }[]): [string, number][] {
  const m = new Map<string, number>();
  for (const e of events) m.set(e.actor, (m.get(e.actor) ?? 0) + 1);
  return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 7);
}

/** Subscribe to the activity bus and re-run the loader while `on` is true. */
function useLiveTail(on: boolean, refresh: () => void) {
  const services = store.get().services;
  const ref = useRef(refresh);
  ref.current = refresh;
  useEffect(() => {
    if (!on) return;
    let timer = 0;
    const off = services.activity.onEvent.subscribe(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => ref.current(), 400);
    });
    return () => {
      window.clearTimeout(timer);
      off();
    };
  }, [on, services]);
}
