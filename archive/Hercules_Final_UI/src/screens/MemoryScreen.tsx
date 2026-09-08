/**
 * HERCULES · Long-term memory
 * Continuity is a feature you should be able to inspect and correct. Search,
 * write, edit, pin, delete, watch decay, and see the graph of what connects.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from '@/components/Icon';
import { Button, Chip, EmptyState, IconButton, Meter, Row, Select, Spinner, TextInput, cx } from '@/components/ui';
import { Sparkline } from '@/components/ui';
import { actions, store, toast, ui } from '@/state/hercules';
import { useAsync, useDebounced } from '@/hooks/useAsync';
import { relativeTime } from '@/services/mock/helpers';
import type { MemoryKind } from '@/types/domain';

const KINDS: { id: MemoryKind | 'all'; label: string; hint: string }[] = [
  { id: 'all', label: 'Everything', hint: 'all records' },
  { id: 'fact', label: 'Facts', hint: 'what is true' },
  { id: 'preference', label: 'Preferences', hint: 'how you want it done' },
  { id: 'decision', label: 'Decisions', hint: 'what was chosen, and why' },
  { id: 'procedure', label: 'Procedures', hint: 'repeatable sequences' },
  { id: 'episode', label: 'Episodes', hint: 'what happened' },
  { id: 'entity', label: 'Entities', hint: 'people, repos, things' },
];

export default function MemoryScreen() {
  const services = store.get().services;
  const rev = store.use((s) => s.rev);
  const selected = store.use((s) => s.selected);
  const flash = store.use((s) => s.flash);
  const busy = store.use((s) => s.busy);
  const [query, setQuery] = useState('');
  const q = useDebounced(query, 260);
  const [kind, setKind] = useState<MemoryKind | 'all'>('all');
  const searching = q.trim().length > 1;

  const all = useAsync(() => services.memory.list(), [rev.memory]);
  const hits = useAsync(() => (searching ? services.memory.search(q, { kind, limit: 12 }) : Promise.resolve(null)), [q, kind]);
  const decay = useAsync(() => services.memory.decayCurve(), []);
  const graph = useAsync(() => services.memory.graph(), [rev.memory]);

  const records = all.data ?? [];
  const list = useMemo(() => {
    if (hits.data) return hits.data.map((h) => h.record);
    return records.filter((r) => (kind === 'all' ? true : r.kind === kind)).sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.strength - a.strength);
  }, [hits.data, records, kind]);

  const open = records.find((r) => r.id === (selected?.kind === 'memory' ? selected.id : '')) ?? null;
  const stats = useMemo(
    () => ({
      pinned: records.filter((r) => r.pinned).length,
      team: records.filter((r) => r.scope === 'team').length,
      stale: records.filter((r) => r.strength < 0.45).length,
      avgConf: records.length ? records.reduce((n, r) => n + r.confidence, 0) / records.length : 0,
    }),
    [records],
  );

  return (
    <div className="screen memory-screen">
      <div className="mem-toolbar">
        <div className="mem-toolbar__search">
          <TextInput value={query} onChange={setQuery} icon="search" placeholder="Search memory — “how do I want briefs delivered”, “pricing”, “Northwind”…" />
          <Select value={kind} onChange={(v) => setKind(v as MemoryKind | 'all')} options={KINDS.map((k) => ({ value: k.id, label: k.label }))} />
          {searching && hits.data && <Chip size="sm" tone="accent" icon="target">{hits.data.length} recalled</Chip>}
        </div>
        <div className="mem-toolbar__actions">
          <Button size="sm" icon="spark" busy={!!busy['memory.consolidate']} onClick={() => void actions.consolidateMemory()}>
            Consolidate
          </Button>
          <Button size="sm" variant="solid" icon="plus" onClick={() => ui.flashFor('memory.new')}>
            Teach it something
          </Button>
        </div>
      </div>

      <div className="split split--a">
        <div className="stack">
          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="memory" size={14} className="hud__panel-icon" />
                <div>
                  <h3>{searching ? 'Recalled' : 'All records'}</h3>
                  <p className="hud__panel-sub">Ordered by recall strength. Pinned records are always loaded into context.</p>
                </div>
              </div>
              <span className="badge">{list.length}</span>
            </header>
            <div className="hud__panel-body mem-list">
              {all.loading && <Spinner />}
              {list.map((r) => {
                const hit = hits.data?.find((h) => h.record.id === r.id);
                return (
                  <Row
                    key={r.id}
                    className={cx('memrow', open?.id === r.id && 'is-active')}
                    flash={!!flash[`memory:${r.id}`]}
                    onClick={() => ui.select({ kind: 'memory', id: r.id, label: r.title })}
                  >
                    <span className={cx('memrow__kind', `memrow__kind--${r.kind}`)}>{r.kind}</span>
                    <div>
                      <b>{r.pinned && <Icon name="pin" size={10} />} {r.title}</b>
                      <span>{hit ? hit.excerpt : r.body}</span>
                      <div className="memrow__tags">
                        {r.tags.map((t) => (
                          <em key={t}>#{t}</em>
                        ))}
                      </div>
                    </div>
                    <div className="memrow__meters">
                      <Meter value={r.strength * 100} tone="accent" height={2} label="" suffix={undefined} />
                      <span className="mono dim">{hit ? `${Math.round(hit.score * 100)}%` : `${Math.round(r.confidence * 100)}%`}</span>
                    </div>
                    <span className="memrow__tools">
                      <IconButton icon="pin" size="sm" active={r.pinned} title={r.pinned ? 'Unpin' : 'Pin to context'} onClick={() => void actions.pinMemory(r.id, !r.pinned)} />
                      <IconButton icon="trash" size="sm" title="Delete" tone="danger" onClick={() => void actions.deleteMemory(r.id)} />
                    </span>
                  </Row>
                );
              })}
              {!all.loading && !list.length && <EmptyState icon="memory" title="Nothing recalled" body="No record matches that query. Teach me the preference instead — I will remember it." action={<Button size="sm" icon="plus" onClick={() => ui.flashFor('memory.new')}>Add memory</Button>} />}
            </div>
            {searching && hits.data && (
              <footer className="hud__panel-foot">
                <Icon name="route" size={11} /> recall = 0.75·term overlap + 0.15·confidence + 0.2·strength — shown so you can audit why I remembered it
              </footer>
            )}
          </section>

          <TeachForm />

          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="analytics" size={14} className="hud__panel-icon" />
                <div>
                  <h3>Decay & reinforcement</h3>
                  <p className="hud__panel-sub">Unrecalled memory fades; recall strengthens it. This is the average curve across the store.</p>
                </div>
              </div>
            </header>
            <div className="hud__panel-body">
              <Sparkline values={(decay.data ?? []).map((d) => d.strength * 100)} height={80} tone="var(--accent-2)" />
              <div className="mem-stats">
                <div><b className="mono">{stats.pinned}</b><span>pinned</span></div>
                <div><b className="mono">{stats.team}</b><span>shared to team</span></div>
                <div><b className="mono">{stats.stale}</b><span>fading</span></div>
                <div><b className="mono">{Math.round(stats.avgConf * 100)}%</b><span>avg confidence</span></div>
              </div>
            </div>
          </section>
        </div>

        <div className="stack">
          {open ? <MemoryEditor record={open} /> : <MemoryGraph graph={graph.data} />}

          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="shield" size={14} className="hud__panel-icon" />
                <div>
                  <h3>Memory privacy</h3>
                  <p className="hud__panel-sub">The rules that govern what I keep.</p>
                </div>
              </div>
            </header>
            <div className="hud__panel-body stack--tight">
              <PolicyLine on label="On-device embeddings" text="Vectors computed locally; only chunks enter cloud model context." />
              <PolicyLine on label="PII redaction before send" text="Names, addresses, account numbers are masked at the boundary." />
              <PolicyLine on label="Retention 90 days" text="Episodes expire unless promoted to a fact or decision." />
              <PolicyLine label="Hard delete is real" text="Record + index entries + derived summaries are purged." />
            </div>
            <footer className="hud__panel-foot">
              <button className="linklike" onClick={() => ui.go('permissions')}>open trust controls</button>
            </footer>
          </section>
        </div>
      </div>
    </div>
  );
}

/* ── editor ──────────────────────────────────────────────────────────────── */

function MemoryEditor({ record }: { record: import('@/types/domain').MemoryRecord }) {
  const services = store.get().services;
  const [title, setTitle] = useState(record.title);
  const [body, setBody] = useState(record.body);
  const [dirty, setDirty] = useState(false);
  useEffect(() => {
    setTitle(record.title);
    setBody(record.body);
    setDirty(false);
  }, [record.id, record.title, record.body]);

  return (
    <section className="hud__panel">
      <header className="hud__panel-head">
        <div className="hud__panel-title">
          <Icon name="memory" size={14} className="hud__panel-icon" />
          <div>
            <h3>Editing record</h3>
            <p className="hud__panel-sub">Every agent working your estate re-reads this on their next recall.</p>
          </div>
        </div>
        <IconButton icon="close" size="sm" title="Close" onClick={() => ui.select(null, { inspector: false })} />
      </header>
      <div className="hud__panel-body">
        <TextInput value={title} onChange={(v) => { setTitle(v); setDirty(true); }} />
        <textarea className="textarea" rows={7} value={body} onChange={(e) => { setBody(e.target.value); setDirty(true); }} />
        <div className="cluster" style={{ marginTop: 8 }}>
          <Chip size="sm" tone="dim">{record.kind}</Chip>
          <Chip size="sm" tone={record.scope === 'private' ? 'dim' : 'accent'}>{record.scope}</Chip>
          <span className="mono dim">created {relativeTime(record.createdAt)}</span>
          <span className="mono dim">· recalled {record.lastRecalledAt ? relativeTime(record.lastRecalledAt) : 'never'}</span>
        </div>
        <Meter value={record.confidence * 100} label="Confidence" tone="success" />
        <Meter value={record.strength * 100} label="Recall strength" tone="accent" />
        <div className="inspector__actions">
          <Button
            variant="solid"
            icon="check"
            disabled={!dirty}
            onClick={() =>
              void services.memory.update(record.id, { title, body }).then(() => {
                ui.bump('memory');
                setDirty(false);
                toast({ title: 'Memory corrected', body: 'Older derived summaries are marked stale and will be rebuilt tonight.', severity: 'success', ttlMs: 4_200 });
              })
            }
          >
            Save
          </Button>
          <Button icon="pin" onClick={() => void actions.pinMemory(record.id, !record.pinned)}>{record.pinned ? 'Unpin' : 'Pin'}</Button>
          <Button variant="danger" icon="trash" onClick={() => void actions.deleteMemory(record.id)}>Delete</Button>
          <Button variant="bare" disabled={!dirty} onClick={() => { setTitle(record.title); setBody(record.body); setDirty(false); }}>
            revert
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ── teach ───────────────────────────────────────────────────────────────── */

function TeachForm() {
  const flash = store.use((s) => s.flash);
  const busy = store.use((s) => !!s.busy['memory.write']);
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState<MemoryKind>('preference');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [scope, setScope] = useState<'private' | 'team'>('private');
  const show = open || !!flash['memory.new'];

  return (
    <section className={cx('hud__panel', show && 'is-expanded')}>
      <header className="hud__panel-head">
        <div className="hud__panel-title">
          <Icon name="plus" size={14} className="hud__panel-icon" />
          <div>
            <h3>Teach HERCULES</h3>
            <p className="hud__panel-sub">Tell it once. It becomes a constraint on everything the estate does.</p>
          </div>
        </div>
        <Button size="sm" onClick={() => setOpen((o) => !o)}>{show && open ? 'collapse' : 'expand'}</Button>
      </header>
      {show && (
        <div className="hud__panel-body">
          <div className="g2">
            <Select value={kind} onChange={(v) => setKind(v as MemoryKind)} options={KINDS.filter((k) => k.id !== 'all').map((k) => ({ value: k.id, label: `${k.label} — ${k.hint}` }))} />
            <Select value={scope} onChange={(v) => setScope(v as 'private' | 'team')} options={[{ value: 'private', label: 'Private to you' }, { value: 'team', label: 'Shared with the estate' }]} />
          </div>
          <TextInput value={title} onChange={setTitle} placeholder="Short handle, e.g. “Never call it a copilot”" />
          <textarea className="textarea" rows={4} value={body} onChange={(e) => setBody(e.target.value)} placeholder="The rule, and why it exists. Context on why is what stops me from 'helpfully' drifting back." />
          <div className="cluster">
            <Button
              variant="solid"
              icon="memory"
              busy={busy}
              disabled={!title.trim() || !body.trim()}
              onClick={() =>
                void actions.writeMemory({ kind, title: title.trim(), body: body.trim(), tags: ['manual'], scope }).then(() => {
                  setTitle('');
                  setBody('');
                  setOpen(false);
                })
              }
            >
              Write to memory
            </Button>
            <Button onClick={() => void actions.sendPrompt(`Remember: ${title.trim() || '…'}`)} disabled={!title.trim()}>
              <Icon name="send" size={12} /> Let the core phrase it
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}

/* ── graph ───────────────────────────────────────────────────────────────── */

function MemoryGraph({ graph }: { graph: { nodes: { id: string; label: string; weight: number; kind: MemoryKind }[]; links: { from: string; to: string }[] } | null }) {
  const ref = useRef<SVGSVGElement | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const W = 380;
  const H = 250;
  const nodes = useMemo(() => {
    if (!graph) return [];
    const cx = W / 2;
    const cy = H / 2;
    return graph.nodes.map((n, i) => {
      const ring = i % 3;
      const angle = (i / graph.nodes.length) * Math.PI * 2 + ring * 0.4;
      const radius = 60 + ring * 48;
      return { ...n, x: cx + Math.cos(angle) * radius, y: cy + Math.sin(angle) * radius * 0.7 };
    });
  }, [graph]);
  const pos = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);

  return (
    <section className="hud__panel">
      <header className="hud__panel-head">
        <div className="hud__panel-title">
          <Icon name="link" size={14} className="hud__panel-icon" />
          <div>
            <h3>Association graph</h3>
            <p className="hud__panel-sub">Links are shared tags and entities. Hover to isolate.</p>
          </div>
        </div>
      </header>
      <div className="hud__panel-body">
        <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="memgraph" width="100%" height={H}>
          {graph?.links.map((l, i) => {
            const a = pos.get(l.from);
            const b = pos.get(l.to);
            if (!a || !b) return null;
            const hot = hover === a.id || hover === b.id;
            return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} className={cx('memgraph__link', hot && 'is-hot')} />;
          })}
          {nodes.map((n) => (
            <g
              key={n.id}
              transform={`translate(${n.x} ${n.y})`}
              className={cx('memgraph__node', hover && hover !== n.id && 'is-dim')}
              onMouseEnter={() => setHover(n.id)}
              onMouseLeave={() => setHover(null)}
              onClick={() => ui.select({ kind: 'memory', id: n.id, label: n.label })}
            >
              <circle r={2 + n.weight * 5} className={`memgraph__dot memgraph__dot--${n.kind}`} />
              {hover === n.id && <text y={-11}>{n.label}</text>}
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}

function PolicyLine({ label, text, on = false }: { label: string; text: string; on?: boolean }) {
  return (
    <div className={cx('policyline', on && 'is-on')}>
      <span className="policyline__mark">{on ? <Icon name="check" size={10} /> : <Icon name="minus" size={10} />}</span>
      <div>
        <b>{label}</b>
        <span>{text}</span>
      </div>
    </div>
  );
}
