/**
 * HERCULES · files service
 * A virtual workspace that behaves like a real one: tree, search, preview,
 * create, upload, watch, index, reveal, trash. No OS access — the contract is
 * what the desktop shell will implement later.
 */
import type { FileAuditEntry, FileService } from '@/services/contracts';
import type { FileNode, FilePreview } from '@/types/domain';
import { fileContents, fileTree } from './fixtures';
import { holdState, logCore, pushActivity } from './runtime';
import { formatBytes, iso, jitter, pick, randInt, uid } from './helpers';

const roots: FileNode[] = JSON.parse(JSON.stringify(fileTree)) as FileNode[];

/** Everything an agent (or you) touched, with the reason it gave. */
const auditLog: FileAuditEntry[] = [
  { id: 'fa-1', at: new Date(Date.now() - 4 * 60_000).toISOString(), kind: 'read', path: '/workspace/notes/pricing-brief.md', agent: 'research-runner-02', reason: 'pulling numbers for the operator-tier brief', blocked: false },
  { id: 'fa-2', at: new Date(Date.now() - 11 * 60_000).toISOString(), kind: 'write', path: '/workspace/renders/final_cut_v3.md', agent: 'render-handler-01', reason: 'applying your approved note list', blocked: false },
  { id: 'fa-3', at: new Date(Date.now() - 26 * 60_000).toISOString(), kind: 'execute', path: '/workspace/scripts/encode.sh', agent: 'shell-runner-03', reason: 'kick the 2-pass encode', blocked: true },
  { id: 'fa-4', at: new Date(Date.now() - 42 * 60_000).toISOString(), kind: 'read', path: '~/.hercules/config.toml', agent: 'research-runner-01', reason: 'looking for an API key', blocked: true },
  { id: 'fa-5', at: new Date(Date.now() - 65 * 60_000).toISOString(), kind: 'upload', path: '/workspace/inbox/northwind-legal.pdf', agent: 'Operator', reason: 'dragged into the workspace', blocked: false },
  { id: 'fa-6', at: new Date(Date.now() - 88 * 60_000).toISOString(), kind: 'delete', path: '/workspace/tmp/scratch.png', agent: 'cleaner-bot', reason: 'retention sweep', blocked: false },
];
const trash: { path: string; at: string; node: FileNode }[] = [];
const extra: Record<string, { language: string; content: string }> = { ...fileContents };

const lorem = (n: number) =>
  Array.from({ length: n }, (_, i) => `${i + 1}. ${pick([
    'Retention window confirmed at 90 days hot, 2 years cold.',
    'Partner accepted clause 4.2 rewrite; signature recorded.',
    'Render queue capped at two nodes; throughput -14%.',
    'Ingest dedupe gate left open for this batch only.',
    'Two receipts outstanding; reminder drafted, not sent.',
    'Local model absorbed 61% of tokens this week.',
    'Injection attempt quarantined; content kept as data.',
    'Evidence chain references traceId tr-91f2ac.',
  ])}`).join('\n');

function walk(nodes: FileNode[], fn: (n: FileNode) => void) {
  for (const n of nodes) {
    fn(n);
    if (n.children) walk(n.children, fn);
  }
}

function findNode(path: string): FileNode | null {
  let found: FileNode | null = null;
  walk(roots, (n) => {
    if (n.path === path) found = n;
  });
  return found;
}

function findFolder(path: string): FileNode[] | null {
  if (!path || path === '/') return roots;
  let found: FileNode[] | null = null;
  walk(roots, (n) => {
    if (n.kind === 'folder' && n.path === path) found = n.children ?? [];
  });
  return found;
}

const fakeFileContent = (node: FileNode): FilePreview['kind'] => {
  if (node.name.endsWith('.md')) return 'text';
  if (/\.(png|jpg|jpeg|webp|gif)$/.test(node.name)) return 'image';
  if (node.name.endsWith('.pdf')) return 'pdf';
  if (/\.(ts|tsx|js|json|diff|csv|flow|py|sh)$/.test(node.name)) return 'code';
  return 'text';
};

export const mockFiles: FileService = {
  async tree(root) {
    await jitter(80, 200);
    if (!root || root === '/') return JSON.parse(JSON.stringify(roots)) as FileNode[];
    const n = findNode(root);
    return n?.children ? (JSON.parse(JSON.stringify(n.children)) as FileNode[]) : [];
  },
  async list(dirPath) {
    await jitter(50, 130);
    const kids = findFolder(dirPath) ?? [];
    return [...kids].sort((a, b) => (a.kind === b.kind ? a.name.localeCompare(b.name) : a.kind === 'folder' ? -1 : 1));
  },
  async read(path) {
    await jitter(120, 260);
    const node = findNode(path);
    if (!node || node.kind === 'folder') return null;
    const known = extra[path];
    if (known) {
      return {
        id: node.id,
        path,
        kind: known.language === 'markdown' ? 'text' : 'code',
        language: known.language,
        content: known.content,
        sizeBytes: node.sizeBytes ?? known.content.length,
        lines: known.content.split('\n').length,
      } satisfies FilePreview;
    }
    const kind = fakeFileContent(node);
    const body =
      kind === 'image'
        ? `[binary image · ${formatBytes(node.sizeBytes)}]`
        : kind === 'pdf'
          ? `PDF · 6 pages · text layer extracted\n\n${lorem(9)}`
          : node.name.endsWith('.md')
            ? `# ${node.name.replace(/\.md$/, '')}\n\n${lorem(7)}`
            : `// ${node.path}\n// simulated workspace file · ${formatBytes(node.sizeBytes)}\n\n${lorem(12)}`;
    return { id: node.id, path, kind, language: kind === 'code' ? node.name.split('.').pop() : 'markdown', content: body, sizeBytes: node.sizeBytes ?? body.length, lines: body.split('\n').length } satisfies FilePreview;
  },
  async search(query) {
    await jitter(140, 320);
    const q = query.toLowerCase().trim();
    const hits: { id: string; path: string; name: string; excerpt: string; line: number }[] = [];
    const all: FileNode[] = [];
    walk(roots, (n) => all.push(n));
    for (const n of all) {
      if (n.kind !== 'file') continue;
      const byName = q && n.name.toLowerCase().includes(q);
      const body = extra[n.path]?.content;
      const byContent = q && body ? body.toLowerCase().includes(q) : false;
      if (!q || byName || byContent) {
        const lines = (body ?? '').split('\n');
        const line = byContent ? Math.max(1, lines.findIndex((l) => l.toLowerCase().includes(q)) + 1) : 1;
        hits.push({
          id: n.id,
          path: n.path,
          name: n.name,
          excerpt: byContent ? (lines[line - 1] ?? n.name).trim().slice(0, 160) : `filename match · ${formatBytes(n.sizeBytes)} · ${n.indexed ? 'indexed' : 'not indexed'}`,
          line,
        });
      }
      if (hits.length > 40) break;
    }
    return hits.slice(0, 24);
  },
  async createFolder(parentPath, name) {
    await jitter(120, 240);
    const parent = findFolder(parentPath);
    if (!parent) throw new Error('E_NO_PARENT');
    const node: FileNode = {
      id: `file-${randInt(10000, 99999)}`,
      name,
      path: `${parentPath === '/' ? '' : parentPath}/${name}`,
      kind: 'folder',
      agentEditable: false,
      watched: false,
      indexed: false,
      updatedAt: iso(),
      children: [],
    };
    parent.push(node);
    pushActivity('file', 'Operator', `created folder ${name}`, node.path);
    auditLog.unshift({ id: uid('fa'), at: iso(), kind: 'write', path: node.path, agent: 'Operator', reason: 'folder created in the Files bay', blocked: false });
    return node;
  },
  async upload(parentPath, files) {
    const release = holdState('executing', 'files.upload');
    await jitter(400, 900);
    const parent = findFolder(parentPath) ?? roots;
    const created = files.map((f) => ({
      id: `file-${randInt(10000, 99999)}`,
      name: f.name,
      path: `${parentPath === '/' ? '' : parentPath}/${f.name}`,
      kind: 'file' as const,
      sizeBytes: f.sizeBytes,
      agentEditable: /\.(md|txt|json|csv|ts)$/.test(f.name),
      watched: false,
      indexed: false,
      updatedAt: iso(),
      mime: 'application/octet-stream',
    }));
    parent.push(...created);
    for (const c of created) auditLog.unshift({ id: uid('fa'), at: iso(), kind: 'upload', path: c.path, agent: 'Operator', reason: 'dropped into the workspace', blocked: false });
    release();
    logCore('success', 'files', `Uploaded ${created.length} file(s) → ${parentPath}`);
    pushActivity('file', 'Operator', `uploaded ${created.length} file(s)`, parentPath);
    return created;
  },
  async watch(path, on) {
    await jitter(60, 120);
    const n = findNode(path);
    if (n) n.watched = on;
    auditLog.unshift({ id: uid('fa'), at: iso(), kind: 'read', path, agent: 'Operator', reason: on ? 'watch enabled — intake may trigger' : 'watch disabled', blocked: false });
    pushActivity('file', 'Operator', `${on ? 'watching' : 'unwatching'}`, path);
    logCore('info', 'files', `Watch ${on ? 'enabled' : 'removed'} on ${path} · intake automation can now trigger`);
  },
  async index(path, on) {
    await jitter(90, 180);
    const n = findNode(path);
    if (n) {
      n.indexed = on;
      if (n.children) walk(n.children, (c) => (c.indexed = on));
    }
    logCore('info', 'index', `${on ? 'Queued for indexing' : 'Removed from index'}: ${path}`);
    pushActivity('file', 'Knowledge Warden', on ? 'queued for indexing' : 'removed from index', path);
  },
  async reveal(path) {
    await jitter(80, 160);
    logCore('info', 'files', `Revealed ${path} in the OS file manager`);
  },
  async trash(path) {
    await jitter(120, 240);
    const n = findNode(path);
    if (!n) return;
    const parentPath = path.slice(0, path.lastIndexOf('/')) || '/';
    const parent = findFolder(parentPath);
    if (parent) {
      const i = parent.findIndex((x) => x.path === path);
      if (i >= 0) parent.splice(i, 1);
    }
    trash.push({ path, at: iso(), node: n });
    n.op = 'deleted';
    auditLog.unshift({ id: uid('fa'), at: iso(), kind: 'delete', path, agent: 'Operator', reason: 'trashed from the Files bay', blocked: false });
    pushActivity('file', 'Operator', `trashed ${n.name}`, 'quarantine · 30-day restore window', true);
    logCore('warn', 'files', `Trashed ${path} · agents lose access immediately, restore window 30d`);
  },
  async write(path, content) {
    await jitter(90, 190);
    let node = findNode(path);
    if (!node) {
      const name = path.slice(path.lastIndexOf('/') + 1);
      const parentPath = path.slice(0, path.lastIndexOf('/')) || '/';
      node = {
        id: `file-${randInt(10000, 99999)}`,
        name,
        path,
        kind: 'file',
        sizeBytes: content.length,
        agentEditable: true,
        watched: false,
        indexed: false,
        updatedAt: iso(),
        mime: 'text/markdown',
        op: 'new',
      };
      (findFolder(parentPath) ?? roots).push(node);
    } else {
      node.op = 'dirty';
      node.sizeBytes = content.length;
      node.updatedAt = iso();
    }
    extra[path] = { language: path.endsWith('.md') ? 'markdown' : (path.split('.').pop() ?? 'text'), content };
    auditLog.unshift({ id: uid('fa'), at: iso(), kind: 'write', path, agent: 'Operator', reason: 'written from the Files bay', blocked: false });
    logCore('success', 'files', `Wrote ${formatBytes(content.length)} → ${path}`);
    pushActivity('file', 'Operator', 'wrote file', path);
    return node;
  },
  async audit() {
    await jitter(60, 140);
    return [...auditLog];
  },
  async trashList() {
    await jitter(20, 60);
    return trash.map((x) => ({ path: x.path, name: x.node.name, at: x.at }));
  },
  async restore(path) {
    const i = trash.findIndex((t) => t.path === path);
    if (i < 0) return;
    const [item] = trash.splice(i, 1);
    if (!item) return;
    const parentPath = path.slice(0, path.lastIndexOf('/')) || '/';
    (findFolder(parentPath) ?? roots).push(item.node);
    pushActivity('file', 'Operator', `restored ${item.node.name}`, path);
  },
};

export const fileTrashIndex = () => trash.map((t) => ({ path: t.path, at: t.at, name: t.node.name }));
