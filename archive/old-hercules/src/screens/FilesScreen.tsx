/**
 * HERCULES · File system
 * A real workspace view: tree, preview, watchers, and the one control that
 * decides whether anything here may leave the machine at all. Path-addressed,
 * audit-logged, drag-imported — exactly the surface the desktop shell will
 * implement against this same contract.
 */
import { useMemo, useState } from 'react';
import { Icon } from '@/components/Icon';
import { Button, Chip, EmptyState, IconButton, Row, SectionLabel, Spinner, TextInput, cx } from '@/components/ui';
import { actions, store, toast, ui } from '@/state/hercules';
import { useAsync, useDebounced, useDropZone } from '@/hooks/useAsync';
import { formatBytes, relativeTime } from '@/services/mock/helpers';
import type { FileNode } from '@/types/domain';

const EXT_ICON: Record<string, string> = {
  md: 'file',
  txt: 'file',
  json: 'database',
  yaml: 'automation',
  toml: 'automation',
  csv: 'analytics',
  ts: 'terminal',
  tsx: 'terminal',
  sh: 'terminal',
  sql: 'database',
  png: 'media',
  jpg: 'media',
  svg: 'media',
  pdf: 'knowledge',
  flow: 'automation',
  diff: 'git',
};

const ext = (name: string) => name.split('.').pop()!.toLowerCase();
const iconFor = (n: FileNode) => (n.kind === 'folder' ? (n.children?.length ? 'folderOpen' : 'folder') : EXT_ICON[ext(n.name)] ?? 'file');

export default function FilesScreen() {
  const services = store.get().services;
  const config = store.use((s) => s.config);
  const rev = store.use((s) => s.rev);
  const flash = store.use((s) => s.flash);
  const [query, setQuery] = useState('');
  const q = useDebounced(query, 220);
  const [open, setOpen] = useState<Set<string>>(() => new Set(['/workspace', '/hercules']));
  const [selectedPath, setSelectedPath] = useState<string | null>('/workspace/notes/pricing-brief.md');
  const [tab, setTab] = useState<'workspace' | 'audit' | 'trash'>('workspace');
  const [pendingUploads, setPendingUploads] = useState<{ name: string; sizeBytes: number }[]>([]);
  const [mkdirIn, setMkdirIn] = useState<string | null>(null);
  const [mkdirName, setMkdirName] = useState('');

  const tree = useAsync(() => services.files.tree(), [rev.files]);
  const audit = useAsync(() => services.files.audit(), [rev.files]);
  const trashed = useAsync(() => services.files.trashList(), [rev.files]);
  const preview = useAsync(
    () => (selectedPath && !selectedPath.endsWith('/') ? services.files.read(selectedPath) : Promise.resolve(null)),
    [selectedPath ?? '', rev.files],
  );
  const search = useAsync(() => (q.trim().length > 1 ? services.files.search(q.trim()) : Promise.resolve([])), [q]);

  const drop = useDropZone<HTMLDivElement>((files) => {
    const staged = files.map((f) => ({ name: f.name, sizeBytes: f.size }));
    setPendingUploads((p) => [...p, ...staged]);
    toast({
      title: `${staged.length} file${staged.length === 1 ? '' : 's'} staged`,
      body: 'Nothing is written or indexed until you confirm — that is your call, not the drop handler’s.',
      severity: 'info',
      ttlMs: 6_000,
    });
  });

  const rows = useMemo(() => {
    const out: { node: FileNode; depth: number }[] = [];
    const walk = (nodes: FileNode[], depth: number) => {
      for (const n of [...nodes].sort((a, b) => (a.kind === b.kind ? a.name.localeCompare(b.name) : a.kind === 'folder' ? -1 : 1))) {
        out.push({ node: n, depth });
        if (n.children && open.has(n.path)) walk(n.children, depth + 1);
      }
    };
    walk(tree.data ?? [], 0);
    return out;
  }, [tree.data, open]);

  const selected = useMemo<FileNode | null>(() => {
    let found: FileNode | null = null;
    const walk = (nodes: FileNode[]) => {
      for (const n of nodes) {
        if (n.path === selectedPath) found = n;
        if (n.children) walk(n.children);
      }
    };
    walk(tree.data ?? []);
    return found;
  }, [tree.data, selectedPath]);

  const watchedCount = useMemo(() => {
    let n = 0;
    const walk = (nodes: FileNode[]) => {
      for (const x of nodes) {
        if (x.watched) n += 1;
        if (x.children) walk(x.children);
      }
    };
    walk(tree.data ?? []);
    return n;
  }, [tree.data]);

  const act = async (label: string, body: string, fn: () => Promise<unknown>) => {
    await fn();
    ui.bump('files');
    toast({ title: label, body, severity: 'success', ttlMs: 3_400 });
  };

  return (
    <div className="screen files-screen" {...drop.bind}>
      <div className="files-toolbar">
        <div className="segmented segmented--sm">
          {([
            { id: 'workspace', label: 'Workspace', icon: 'folder' },
            { id: 'audit', label: 'Access log', icon: 'key' },
            { id: 'trash', label: 'Quarantine', icon: 'trash' },
          ] as const).map((t) => (
            <button key={t.id} type="button" className={cx('segmented__item', tab === t.id && 'is-active')} onClick={() => setTab(t.id)}>
              <Icon name={t.icon} size={11} /> {t.label}
            </button>
          ))}
        </div>
        <span className="spacer" />
        <div className="searchfield">
          <Icon name="search" size={12} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search names and contents…" />
          {query && <IconButton icon="close" size="sm" title="Clear" onClick={() => setQuery('')} />}
        </div>
        <Chip size="sm" tone="info" icon="eye">{watchedCount} watched</Chip>
        <Chip size="sm" tone={config.privacy.localFirst ? 'success' : 'warn'} icon={config.privacy.localFirst ? 'lock' : 'bolt'}>
          {config.privacy.localFirst ? 'local-first · nothing leaves unless cited' : 'cloud-first · excerpts may leave'}
        </Chip>
        <Chip size="sm" tone="dim" icon="clock">retention {config.privacy.retentionDays}d</Chip>
        <Button size="sm" icon="plus" onClick={() => setMkdirIn(selected?.kind === 'folder' ? selected.path : '/workspace')}>
          New folder
        </Button>
      </div>

      {pendingUploads.length > 0 && (
        <div className="importbar">
          <Icon name="download" size={12} />
          <b>{pendingUploads.length} file{pendingUploads.length === 1 ? '' : 's'} staged for import</b>
          <span className="mono dim">{pendingUploads.slice(0, 3).map((f) => `${f.name} ${formatBytes(f.sizeBytes)}`).join(' · ')}{pendingUploads.length > 3 ? ` +${pendingUploads.length - 3}` : ''}</span>
          <span className="spacer" />
          <Button size="sm" icon="close" onClick={() => setPendingUploads([])}>Discard</Button>
          <Button
            size="sm"
            variant="solid"
            icon="check"
            onClick={() =>
              void act('Imported', 'Written to /workspace/inbox. Indexing is yours to start — nothing gets embedded on its own.', () =>
                services.files.upload('/workspace/inbox', pendingUploads).then(() => setPendingUploads([])),
              )
            }
          >
            Import to /workspace/inbox
          </Button>
        </div>
      )}

      <div className="split split--a files-split">
        <section className={cx('hud__panel', 'files-tree-panel', drop.active && 'is-drop')}>
          <header className="hud__panel-head">
            <div className="hud__panel-title">
              <Icon name="folder" size={14} className="hud__panel-icon" />
              <div>
                <h3>{tab === 'workspace' ? 'workspace' : tab === 'audit' ? 'agent file access' : 'quarantine'}</h3>
                <p className="hud__panel-sub">
                  {tab === 'workspace' && `${rows.length} visible · ${q.trim().length > 1 ? `${search.data?.length ?? 0} content matches` : 'search reads file bodies'}`}
                  {tab === 'audit' && `${(audit.data ?? []).length} operations · every agent read/write, with its stated reason`}
                  {tab === 'trash' && `${(trashed.data ?? []).length} items · 30-day restore window`}
                </p>
              </div>
            </div>
            <div className="cluster">
              <IconButton icon="refresh" size="sm" title="Re-read tree" onClick={() => { ui.bump('files'); tree.refresh(); }} />
              <IconButton icon="chevDown" size="sm" title="Expand watchers" onClick={() => setOpen((s) => new Set([...s, '/workspace', '/hercules', '/workspace/notes', '/hercules/policies']))} />
              <IconButton icon="chevUp" size="sm" title="Collapse all" onClick={() => setOpen(new Set())} />
            </div>
          </header>

          <div className="hud__panel-body filetree" ref={drop.ref}>
            {tab === 'workspace' && (
              <>
                {tree.loading && <Spinner />}
                {q.trim().length > 1 ? (
                  (search.data ?? []).map((h) => (
                    <div key={`${h.path}:${h.line}`} className="filetree__row is-hit" onClick={() => setSelectedPath(h.path)}>
                      <span className="filetree__twisty" />
                      <Icon name={EXT_ICON[ext(h.name)] ?? 'file'} size={12} className="filetree__icon" />
                      <span className="filetree__name">{h.name}</span>
                      <span className="filetree__hit mono dim">{h.path}:{h.line}</span>
                      <span className="filetree__excerpt">{h.excerpt}</span>
                    </div>
                  ))
                ) : (
                  rows.map(({ node, depth }) => (
                    <div
                      key={node.id}
                      className={cx(
                        'filetree__row',
                        selectedPath === node.path && 'is-sel',
                        node.op === 'new' && 'is-new',
                        node.op === 'dirty' && 'is-dirty',
                        node.op === 'deleted' && 'is-deleted',
                        node.watched && 'is-watched',
                      )}
                      style={{ paddingLeft: 6 + depth * 13 }}
                      onClick={() => setSelectedPath(node.path)}
                      onDoubleClick={() => node.kind === 'folder' && setOpen((s) => new Set(s).add(node.path))}
                    >
                      <button
                        type="button"
                        className="filetree__twisty"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (node.kind !== 'folder') return;
                          setOpen((s) => {
                            const n = new Set(s);
                            if (n.has(node.path)) n.delete(node.path);
                            else n.add(node.path);
                            return n;
                          });
                        }}
                      >
                        {node.kind === 'folder' ? <Icon name={open.has(node.path) ? 'chevDown' : 'chevRight'} size={10} /> : null}
                      </button>
                      <Icon name={iconFor(node)} size={12} className={cx('filetree__icon', node.kind === 'folder' && 'is-dir')} />
                      <span className="filetree__name">{node.name}</span>
                      {node.op && <Chip size="sm" tone={node.op === 'new' ? 'success' : node.op === 'dirty' ? 'warn' : 'danger'}>{node.op}</Chip>}
                      {!node.agentEditable && node.kind === 'file' && <Icon name="lock" size={9} className="filetree__lock" title="not agent-editable" />}
                      <span className="filetree__meta mono dim">{node.kind === 'folder' ? `${node.children?.length ?? 0}` : formatBytes(node.sizeBytes ?? 0)}</span>
                      <span className="filetree__tools">
                        {node.kind === 'file' && (
                          <IconButton icon="spark" size="sm" title="Send to core" onClick={() => void sendToCore(node)} />
                        )}
                        <IconButton icon="eye" size="sm" active={node.watched} title={node.watched ? 'Stop watching' : 'Watch (triggers intake automation)'} onClick={() => void act(node.watched ? 'Unwatched' : 'Watching', `${node.path} · ${node.watched ? 'intake automation will not fire on it' : 'any change now wakes the intake automation'}`, () => services.files.watch(node.path, !node.watched))} />
                        <IconButton icon="knowledge" size="sm" active={node.indexed} title={node.indexed ? 'Remove from ATLAS' : 'Index into ATLAS'} onClick={() => void act(node.indexed ? 'De-indexed' : 'Indexing', node.indexed ? 'Chunks pulled from ATLAS; agents lose the citations.' : 'Embeddings computed on-device, vectors only.', () => services.files.index(node.path, !node.indexed))} />
                        <IconButton icon="copy" size="sm" title="Copy path" onClick={() => void navigator.clipboard?.writeText(node.path).then(() => toast({ title: 'Path copied', body: node.path, severity: 'info', ttlMs: 2_200 }))} />
                        <IconButton icon="trash" size="sm" tone="danger" title="Trash" onClick={() => void act('Trashed', `${node.name} → 30-day restore window. Agents lose access immediately.`, () => services.files.trash(node.path))} />
                      </span>
                    </div>
                  ))
                )}
                {!tree.loading && q.trim().length > 1 && !search.data?.length && (
                  <EmptyState icon="search" title="No matches" body={`Nothing under /workspace or /hercules contains “${q}”.`} />
                )}
                {drop.active && <div className="dropzone">release to stage the import — nothing is written yet</div>}
              </>
            )}

            {tab === 'audit' && (
              <div className="stack--tight">
                {(audit.data ?? []).map((e) => (
                  <Row key={e.id} className={cx('auditrow', e.blocked && 'is-blocked', !!flash[`fileop:${e.id}`] && 'is-flash')} onClick={() => setSelectedPath(e.path)}>
                    <Chip size="sm" tone={e.blocked ? 'danger' : e.kind === 'write' ? 'accent' : e.kind === 'delete' ? 'warn' : 'dim'}>
                      {e.blocked ? 'blocked' : e.kind}
                    </Chip>
                    <span className="mono auditrow__path">{e.path}</span>
                    <span className="auditrow__by">{e.agent}</span>
                    <span className="auditrow__reason">{e.reason}</span>
                    <em className="mono dim">{relativeTime(e.at)}</em>
                  </Row>
                ))}
                {!audit.data?.length && <EmptyState icon="shield" title="Nothing accessed" body="No agent has touched the workspace since the log was cleared." />}
              </div>
            )}

            {tab === 'trash' && (
              <div className="stack--tight">
                {(trashed.data ?? []).map((t) => (
                  <Row key={t.path} className="auditrow">
                    <Icon name="trash" size={12} className="dim" />
                    <span className="mono auditrow__path">{t.path}</span>
                    <span className="dim">{t.name}</span>
                    <em className="mono dim">{relativeTime(t.at)}</em>
                    <span className="spacer" />
                    <Button size="sm" icon="refresh" onClick={() => void act('Restored', `${t.name} is back in place and agents can read it again.`, () => services.files.restore(t.path))}>
                      Restore
                    </Button>
                  </Row>
                ))}
                {!trashed.data?.length && <EmptyState icon="check" title="Quarantine is empty" body="Deleted files sit here for 30 days. Agents cannot reach them in the meantime." />}
              </div>
            )}
          </div>

          <footer className="hud__panel-foot">
            <span className="mono dim">reads and writes are attributed · deletes are soft · agent writes require `fs.write` scope</span>
            <span className="spacer" />
            <button className="linklike" onClick={() => ui.go('permissions')}>scope controls</button>
          </footer>
        </section>

        <div className="stack">
          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name={selected ? iconFor(selected) : 'file'} size={14} className="hud__panel-icon" />
                <div>
                  <h3>{selected ? selected.name : 'Preview'}</h3>
                  <p className="hud__panel-sub mono">{selected ? `${selected.path} · ${formatBytes(selected.sizeBytes ?? 0)} · ${relativeTime(selected.updatedAt)}` : 'pick a file'}</p>
                </div>
              </div>
              {selected && (
                <div className="cluster">
                  <IconButton icon="link" size="sm" title="Inspect" onClick={() => ui.select({ kind: 'file', id: selected.id, label: selected.name })} />
                  <IconButton icon="folder" size="sm" title="Reveal in OS" onClick={() => void services.files.reveal(selected.path).then(() => toast({ title: 'Revealed', body: selected.path, severity: 'info', ttlMs: 2_400 }))} />
                </div>
              )}
            </header>
            <div className="hud__panel-body">
              {!selected && <EmptyState icon="file" title="Nothing selected" body="Pick a file to read it here. The core can be handed the same excerpt with one click." />}
              {selected?.kind === 'folder' && (
                <div className="stack--tight">
                  <SectionLabel>Folder</SectionLabel>
                  <div className="cluster">
                    <Chip size="sm" tone={selected.watched ? 'info' : 'dim'} icon="eye">{selected.watched ? 'watched' : 'not watched'}</Chip>
                    <Chip size="sm" tone={selected.indexed ? 'accent' : 'dim'} icon="knowledge">{selected.indexed ? 'indexed' : 'not indexed'}</Chip>
                    <span className="mono dim">{selected.children?.length ?? 0} children</span>
                  </div>
                  <div className="cluster">
                    <Button size="sm" icon="knowledge" onClick={() => void act(selected.indexed ? 'De-indexed' : 'Indexing', selected.path, () => services.files.index(selected.path, !selected.indexed))}>
                      {selected.indexed ? 'Remove from ATLAS' : 'Index into ATLAS'}
                    </Button>
                    <Button size="sm" icon="eye" onClick={() => void act(selected.watched ? 'Unwatched' : 'Watching', selected.path, () => services.files.watch(selected.path, !selected.watched))}>
                      {selected.watched ? 'Stop watching' : 'Watch'}
                    </Button>
                    <Button size="sm" icon="plus" onClick={() => setMkdirIn(selected.path)}>New folder here</Button>
                  </div>
                  {(selected.children ?? []).map((c) => (
                    <Row key={c.id} className="minirow" onClick={() => setSelectedPath(c.path)}>
                      <Icon name={iconFor(c)} size={12} />
                      <span>{c.name}</span>
                      <em className="mono">{c.kind === 'folder' ? `${c.children?.length ?? 0}` : formatBytes(c.sizeBytes ?? 0)}</em>
                    </Row>
                  ))}
                </div>
              )}
              {selected?.kind === 'file' && (
                <div className="filepreview">
                  {preview.loading && <Spinner size={14} />}
                  {preview.data && (
                    <>
                      <div className="filepreview__meta mono">
                        <span>{preview.data.kind === 'code' ? 'syntax' : 'plain'}</span>
                        <span>{preview.data.lines} lines</span>
                        <span>{preview.data.language ?? 'text'}</span>
                        <span className={preview.data.content.length > 4000 ? 'warn-text' : 'ok-text'}>
                          {preview.data.content.length > 4000 ? 'too large for one context — will be chunked' : 'fits a single context window'}
                        </span>
                      </div>
                      <pre className="filepreview__code">{preview.data.content}</pre>
                    </>
                  )}
                </div>
              )}
            </div>
            {selected?.kind === 'file' && (
              <footer className="hud__panel-foot">
                <Icon name="lock" size={10} />
                <span className="dim">{selected.agentEditable ? 'agents may write this file (scoped)' : 'read-only for agents — writes are blocked at the boundary'}</span>
                <span className="spacer" />
                <button className="linklike" onClick={() => void sendToCore(selected)}>send excerpt to core</button>
              </footer>
            )}
          </section>

          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="shield" size={14} className="hud__panel-icon" />
                <div>
                  <h3>Roots & reach</h3>
                  <p className="hud__panel-sub">What the estate is allowed to see at all.</p>
                </div>
              </div>
            </header>
            <div className="hud__panel-body stack--tight">
              <RootLine path="/workspace" label="working files" access="read + scoped write" on />
              <RootLine path="/hercules/policies" label="rules the core enforces" access="read-only" on />
              <RootLine path="~/Downloads" label="staging only" access="ask each time" on />
              <RootLine path="~/.ssh, ~/.aws, keychains" label="hard deny list" access="never — not even you can grant it" on={false} deny />
            </div>
            <footer className="hud__panel-foot">
              <span className="dim">deny-listed paths do not exist as far as agents are concerned; reads there are logged as security events</span>
            </footer>
          </section>

          {!config.privacy.localFirst && (
            <div className="notice notice--warn">
              <Icon name="alert" size={13} />
              <div>
                <b>Local-first is off</b>
                <span>{config.privacy.redactPII ? 'PII is masked before anything leaves the machine, but file excerpts still leave it.' : 'File excerpts leave this machine unredacted when a cloud model is selected.'}</span>
              </div>
              <Button size="sm" onClick={() => void actions.patchSettings({ privacy: { localFirst: true } }, 'Local-first restored')}>Restore</Button>
            </div>
          )}
        </div>
      </div>

      {mkdirIn && (
        <div className="scrim" onMouseDown={(e) => e.target === e.currentTarget && setMkdirIn(null)}>
          <div className="modal modal--sm">
            <header className="modal__head">
              <div>
                <span className="mono modal__eyebrow">FILES</span>
                <h2>New folder</h2>
                <p className="mono">{mkdirIn}/</p>
              </div>
              <IconButton icon="close" title="Close" onClick={() => setMkdirIn(null)} />
            </header>
            <div className="modal__body">
              <div className="field">
                <div className="field__head"><label>Name</label></div>
                <TextInput value={mkdirName} onChange={setMkdirName} placeholder="q4-reviews" />
              </div>
            </div>
            <footer className="modal__foot">
              <span className="spacer" />
              <Button onClick={() => setMkdirIn(null)}>Cancel</Button>
              <Button
                variant="solid"
                icon="plus"
                disabled={!mkdirName.trim()}
                onClick={() =>
                  void services.files.createFolder(mkdirIn, mkdirName.trim()).then((n) => {
                    ui.bump('files');
                    setMkdirIn(null);
                    setMkdirName('');
                    setOpen((s) => new Set(s).add(mkdirIn));
                    toast({ title: 'Folder created', body: n.path, severity: 'success', ttlMs: 3_000 });
                  })
                }
              >
                Create
              </Button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}

async function sendToCore(node: FileNode) {
  const services = store.get().services;
  const preview = await services.files.read(node.path);
  ui.go('core');
  void actions.sendPrompt(`Read ${node.path} and tell me what is stale, risky or missing:\n\n${(preview?.content ?? '').slice(0, 1200)}`);
  toast({ title: 'Sent to the core', body: `${node.name} · first ${Math.min(1200, preview?.content.length ?? 0)} characters attached`, severity: 'info', ttlMs: 4_000 });
}

function RootLine({ path, label, access, on, deny = false }: { path: string; label: string; access: string; on: boolean; deny?: boolean }) {
  return (
    <div className={cx('rootline', on && 'is-on', deny && 'is-deny')}>
      <span className="rootline__mark">{deny ? <Icon name="close" size={10} /> : on ? <Icon name="check" size={10} /> : <Icon name="minus" size={10} />}</span>
      <span className="mono rootline__path">{path}</span>
      <span className="rootline__label">{label}</span>
      <em className="dim">{access}</em>
    </div>
  );
}
