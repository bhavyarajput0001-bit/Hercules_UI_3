/**
 * HERCULES · ATLAS knowledge base
 * Sources go in, chunks get cited. Everything here is inspectable: the index
 * state, the exact chunks a query used, and whether an answer was grounded in
 * your material or produced from a model's imagination.
 */
import { useMemo, useState } from 'react';
import { Icon } from '@/components/Icon';
import { Button, Chip, EmptyState, IconButton, Meter, Row, SectionLabel, Sparkline, Spinner, cx } from '@/components/ui';
import { actions, store, toast, ui } from '@/state/hercules';
import { useAsync } from '@/hooks/useAsync';
import { formatBytes, formatNum, relativeTime } from '@/services/mock/helpers';
import type { KnowledgeSource } from '@/types/domain';

const STATUS_TONE: Record<KnowledgeSource['status'], 'success' | 'warn' | 'info' | 'danger'> = {
  ready: 'success',
  stale: 'warn',
  indexing: 'info',
  error: 'danger',
};

const KIND_TAG: Record<KnowledgeSource['kind'], string> = {
  documents: 'DOC',
  code: '</>',
  web: 'WWW',
  email: 'MAIL',
  notes: 'MEMO',
  database: 'SQL',
};

export default function KnowledgeScreen() {
  const services = store.get().services;
  const rev = store.use((s) => s.rev);
  const flash = store.use((s) => s.flash);
  const [query, setQuery] = useState('how do we price the operator tier, and what did we decide about retention?');
  const [asked, setAsked] = useState(false);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState({ name: '', origin: '', kind: 'documents' as KnowledgeSource['kind'] });
  const [busyId, setBusyId] = useState<string | null>(null);

  const sources = useAsync(() => services.knowledge.sources(), [rev.knowledge]);
  const stats = useAsync(() => services.knowledge.stats(), [rev.knowledge]);
  const hits = useAsync(() => (asked ? services.knowledge.query(query) : Promise.resolve([])), [asked ? 1 : 0, query]);

  const list = sources.data ?? [];
  const chunks = list.reduce((n, s) => n + s.chunks, 0);
  const tokens = list.reduce((n, s) => n + s.tokens, 0);
  const bytesTotal = list.reduce((n, s) => n + s.sizeBytes, 0);
  const grounded = useMemo(() => (hits.data ?? []).filter((h) => h.score > 0.32), [hits.data]);
  const coverage = stats.data ? Math.round(stats.data.coverage * 100) : 0;

  const rebuild = async (id?: string) => {
    if (id) {
      setBusyId(id);
      await services.knowledge.rebuild(id);
      setBusyId(null);
    } else {
      for (const s of list) await services.knowledge.rebuild(s.id);
    }
    ui.bump('knowledge');
    toast({ title: id ? 'Rebuild running' : 'ATLAS rebuilding', body: 'Overlap windows recalculated and cached answers invalidated.', severity: 'info', ttlMs: 4_000 });
  };

  return (
    <div className="screen kb-screen">
      <section className="kb-head">
        <div className="kb-head__id">
          <span className="kb-head__mark"><Icon name="layers" size={18} /></span>
          <div>
            <span className="mono kb-head__eyebrow">ATLAS · retrieval substrate</span>
            <h2>{formatNum(chunks)} chunks · {formatNum(tokens)} tokens · {formatBytes(bytesTotal)} across {list.length} sources</h2>
            <p>Anything I answer from your material carries a citation. Anything without one is inference, and I say so out loud.</p>
          </div>
        </div>
        <div className="kb-head__stats">
          <div><b className="mono">{coverage}%</b><span>usable coverage</span></div>
          <div><b className="mono">{stats.data ? Math.round(stats.data.hitRate * 100) : 0}%</b><span>cited-answer rate</span></div>
          <div><b className="mono">{stats.data?.avgLatencyMs ?? 0}ms</b><span>median retrieval</span></div>
          <Sparkline values={stats.data?.sizeSeries ?? []} height={34} tone="var(--accent-2)" />
        </div>
      </section>

      <div className="split split--a">
        <section className="hud__panel">
          <header className="hud__panel-head">
            <div className="hud__panel-title">
              <Icon name="knowledge" size={14} className="hud__panel-icon" />
              <div>
                <h3>Sources</h3>
                <p className="hud__panel-sub">
                  {list.filter((s) => s.status === 'stale').length} stale · {list.filter((s) => s.status === 'indexing').length} indexing · {list.filter((s) => s.status === 'error').length} errored
                  {stats.data ? ` · last rebuild ${relativeTime(stats.data.lastBuild)}` : ''}
                </p>
              </div>
            </div>
            <div className="cluster">
              <Button size="sm" icon="plus" onClick={() => setAdding(true)}>Add source</Button>
              <Button size="sm" icon="bolt" onClick={() => void rebuild()}>Rebuild all</Button>
              <IconButton icon="refresh" size="sm" title="Refresh" onClick={() => { sources.refresh(); stats.refresh(); }} />
            </div>
          </header>
          <div className="hud__panel-body kb-sources">
            {sources.loading && <Spinner />}
            {list.map((s) => (
              <Row
                key={s.id}
                className={cx('kbrow', busyId === s.id && 'is-busy')}
                flash={!!flash[`source:${s.id}`]}
                onClick={() => void openChunks(s)}
              >
                <span className={`kbrow__glyph kbrow__glyph--${s.kind}`}>{KIND_TAG[s.kind]}</span>
                <div className="kbrow__main">
                  <b>{s.name}</b>
                  <span className="mono dim">{s.origin}</span>
                  {s.error && <span className="danger-text">{s.error}</span>}
                </div>
                <div className="kbrow__prog">
                  {s.status === 'indexing' ? (
                    <>
                      <Meter value={s.progress} tone="info" height={3} />
                      <span className="mono dim">{s.progress}% · {formatNum(s.chunks)} chunks</span>
                    </>
                  ) : (
                    <span className="mono dim">{formatNum(s.chunks)} chunks · {formatNum(s.tokens)} tokens · {formatBytes(s.sizeBytes)}</span>
                  )}
                  <Chip size="sm" tone={STATUS_TONE[s.status]}>
                    {s.status === 'stale' && <Icon name="alert" size={9} />} {s.status}
                  </Chip>
                  <span className="mono dim">{relativeTime(s.updatedAt)}</span>
                </div>
                <span className="kbrow__tools">
                  <IconButton icon="bolt" size="sm" title="Rebuild" onClick={() => void rebuild(s.id)} />
                  <IconButton icon="search" size="sm" title="Search inside" onClick={() => { setQuery(`${s.name} `); setAsked(false); ui.flashFor(`source:${s.id}`); toast({ title: 'Scoped to source', body: 'Finish the query — I will only read this material.', severity: 'info', ttlMs: 3_600 }); }} />
                  <IconButton icon="trash" size="sm" tone="danger" title="Drop source" onClick={() => void services.knowledge.remove(s.id).then(() => { ui.bump('knowledge'); toast({ title: 'Source dropped', body: 'Chunks and vectors purged. The underlying files were not touched.', severity: 'success', ttlMs: 4_000 }); })} />
                </span>
              </Row>
            ))}
            {!sources.loading && !list.length && (
              <EmptyState icon="knowledge" title="ATLAS is empty" body="Add a folder, a repo or a set of PDFs. Indexing happens locally; only retrieved chunks go to a cloud model, and only where a policy allows it." action={<Button size="sm" variant="solid" icon="plus" onClick={() => setAdding(true)}>Add a source</Button>} />
            )}
          </div>
        </section>

        <div className="stack">
          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="search" size={14} className="hud__panel-icon" />
                <div>
                  <h3>Probe the index</h3>
                  <p className="hud__panel-sub">Inspect the retrieval, not just the answer.</p>
                </div>
              </div>
              {stats.data && <Chip size="sm" tone="dim" icon="database">{formatNum(stats.data.terms)} terms</Chip>}
            </header>
            <div className="hud__panel-body">
              <div className="kb-probe">
                <textarea className="textarea" rows={2} value={query} onChange={(e) => { setQuery(e.target.value); setAsked(false); }} />
                <Button variant="solid" icon="target" busy={!!hits.loading} onClick={() => { setAsked(true); void hits.refresh(); }}>
                  Retrieve
                </Button>
              </div>

              {asked && (
                <>
                  <div className={cx('kb-answer', !grounded.length && 'is-uncited')}>
                    <div className="kb-answer__head">
                      <span className={cx('pill', grounded.length ? 'pill--ok' : 'pill--warn')}>
                        <Icon name={grounded.length ? 'shield' : 'alert'} size={10} />
                        {grounded.length ? `${grounded.length} chunks above 0.32 — grounded` : 'no reliable coverage — anything I say here is inference'}
                      </span>
                      <span className="mono dim">{stats.data?.avgLatencyMs ?? 0}ms median</span>
                    </div>
                    <p>
                      {grounded.length
                        ? `Closest material in ATLAS: ${grounded.map((g) => `“${g.chunk.heading}”`).slice(0, 3).join(', ')}. The numbers below are quoted from those chunks — nothing else was used.`
                        : 'I would tell you I do not know rather than dress this up. Add a source, rebuild, then ask again.'}
                    </p>
                  </div>

                  <SectionLabel right={<span className="mono dim">{hits.data?.length ?? 0} hits</span>}>Chunks ranked for this query</SectionLabel>
                  <div className="kb-chunks">
                    {(hits.data ?? []).map((h, i) => (
                      <div key={h.chunk.id} className={cx('kb-chunk', i === 0 && 'is-top')}>
                        <span className="kb-chunk__n mono">{i + 1}</span>
                        <div>
                          <span className="mono dim">{h.sourceName} · {h.chunk.heading} · {h.chunk.tokens} tokens</span>
                          <p>{h.chunk.text}</p>
                          <Meter value={h.score * 100} tone={h.score > 0.7 ? 'success' : h.score > 0.45 ? 'accent' : 'warn'} height={2} />
                        </div>
                        <span className="kb-chunk__tools">
                          <button type="button" title="Copy chunk" onClick={() => void navigator.clipboard?.writeText(h.chunk.text).then(() => toast({ title: 'Chunk copied', severity: 'info', ttlMs: 2_000 }))}>
                            <Icon name="copy" size={11} />
                          </button>
                          <button type="button" title="Ask the core about this chunk" onClick={() => void actions.sendPrompt(`Explain this from our docs and say what it changes:\n\n${h.chunk.text}`)}>
                            <Icon name="send" size={11} />
                          </button>
                        </span>
                      </div>
                    ))}
                    {!hits.data?.length && <span className="dim" style={{ fontSize: 11 }}>Nothing retrieved. That is a real answer, not a spinner.</span>}
                  </div>

                  <div className="cluster" style={{ marginTop: 10 }}>
                    <Button size="sm" icon="send" onClick={() => void actions.sendPrompt(query)}>Send query to core</Button>
                    <Button
                      size="sm"
                      icon="file"
                      onClick={() =>
                        void services.files
                          .write(
                            '/workspace/notes/atlas-probe.md',
                            `# ${query}\n\nRetrieved ${hits.data?.length ?? 0} chunks · ${new Date().toISOString()}\n\n${(hits.data ?? []).map((h, i) => `## ${i + 1}. ${h.sourceName} — ${h.chunk.heading} (${Math.round(h.score * 100)}%)\n\n${h.chunk.text}`).join('\n\n')}`,
                          )
                          .then(() => {
                            ui.bump('files');
                            toast({ title: 'Filed to notes', body: '/workspace/notes/atlas-probe.md', severity: 'success', ttlMs: 3_600 });
                          })
                      }
                    >
                      File as note
                    </Button>
                    <Button size="sm" icon="folder" onClick={() => ui.go('files')}>Open files</Button>
                  </div>
                </>
              )}
              {!asked && <p className="dim kb-hint">Retrieve first: a real agent answers with citations or admits it cannot. Hit “Retrieve” and watch which happens.</p>}
            </div>
          </section>

          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="database" size={14} className="hud__panel-icon" />
                <div>
                  <h3>Index internals</h3>
                  <p className="hud__panel-sub">Local vectors, remote embedding calls, and what happens when the network does not.</p>
                </div>
              </div>
            </header>
            <div className="hud__panel-body stack--tight">
              <Row className="kb-kv"><span>vector store</span><b className="mono">sqlite-vec · local</b></Row>
              <Row className="kb-kv"><span>embeddings</span><b className="mono">nomic-embed-text · on-device</b></Row>
              <Row className="kb-kv"><span>chunking</span><b className="mono">512 tokens · 64 overlap</b></Row>
              <Row className="kb-kv"><span>reranker</span><b className="mono">cross-encoder/base</b></Row>
              <Row className="kb-kv"><span>offline fallback</span><b className="ok-text">BM25 over local index</b></Row>
              <Row className="kb-kv"><span>freshness job</span><b className="mono">nightly 03:15 · watchers in between</b></Row>
            </div>
            <footer className="hud__panel-foot">
              <span className="dim">ATLAS is a service, not a feature: agents ask it for context, they never read its files.</span>
              <span className="spacer" />
              <button className="linklike" onClick={() => ui.go('automations')}>ingest automations</button>
            </footer>
          </section>
        </div>
      </div>

      {adding && (
        <div className="scrim" onMouseDown={(e) => e.target === e.currentTarget && setAdding(false)}>
          <div className="modal">
            <header className="modal__head">
              <div>
                <span className="mono modal__eyebrow">ATLAS</span>
                <h2>Add a source</h2>
                <p>Indexing runs in the background with progress you can watch. Embeddings stay on-device; only retrieved chunks go to a model.</p>
              </div>
              <IconButton icon="close" title="Close" onClick={() => setAdding(false)} />
            </header>
            <div className="modal__body">
              <div className="field">
                <div className="field__head"><label>Name</label></div>
                <input className="input" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="Q4 board pack" />
              </div>
              <div className="field">
                <div className="field__head"><label>Origin</label></div>
                <input className="input" value={draft.origin} onChange={(e) => setDraft({ ...draft, origin: e.target.value })} placeholder="/workspace/inbox/board · Drive folder · github:org/repo" />
              </div>
              <div className="field">
                <div className="field__head"><label>Kind</label></div>
                <div className="segmented">
                  {(Object.keys(KIND_TAG) as KnowledgeSource['kind'][]).map((k) => (
                    <button key={k} type="button" className={cx('segmented__item', draft.kind === k && 'is-active')} onClick={() => setDraft({ ...draft, kind: k })}>
                      {k}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <footer className="modal__foot">
              <span className="dim mono">deny-listed paths are rejected at this boundary, before any read</span>
              <span className="spacer" />
              <Button onClick={() => setAdding(false)}>Cancel</Button>
              <Button
                variant="solid"
                icon="bolt"
                disabled={!draft.name.trim() || !draft.origin.trim()}
                onClick={() =>
                  void services.knowledge.addSource({ name: draft.name.trim(), origin: draft.origin.trim(), kind: draft.kind }).then((s) => {
                    setAdding(false);
                    setDraft({ name: '', origin: '', kind: 'documents' });
                    ui.bump('knowledge');
                    toast({ title: 'Indexing started', body: `${s.name} — watch the progress bar; I will tell you when recall@8 moves.`, severity: 'success', ttlMs: 5_000 });
                  })
                }
              >
                Start indexing
              </Button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}

async function openChunks(source: KnowledgeSource) {
  const services = store.get().services;
  const chunks = await services.knowledge.chunks(source.id);
  toast({
    title: chunks.length ? `${source.name} · ${chunks.length} chunks in cache` : `${source.name} · no cached chunks`,
    body: chunks.length ? chunks.map((c) => `${c.heading}: ${c.text.slice(0, 60)}…`).join('\n') : `Origin ${source.origin} — rebuild it to pull fresh chunks.`,
    severity: 'info',
    ttlMs: 10_000,
  });
  ui.flashFor(`source:${source.id}`);
}
