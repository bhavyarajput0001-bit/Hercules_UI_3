/**
 * HERCULES · memory service
 * Long-term memory is the operator's continuity: searchable, editable,
 * pinnable, deletable, and visible as a decay curve so trust is inspectable.
 */
import type { MemoryService } from '@/services/contracts';
import type { MemoryRecord } from '@/types/domain';
import { holdState, logCore, memoryStore, pushActivity, recomputeVitals } from './runtime';
import { clamp, fuzzyScore, iso, jitter, rand, uid } from './helpers';

const tokens = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2);

function score(query: string, rec: MemoryRecord) {
  const q = tokens(query);
  if (!q.length) return rec.strength * 0.4;
  const hay = `${rec.title} ${rec.body} ${rec.tags.join(' ')} ${rec.entities.join(' ')}`.toLowerCase();
  let hits = 0;
  for (const t of q) if (hay.includes(t)) hits += 1;
  const fuzzy = fuzzyScore(query, rec.title) * 0.8;
  return clamp((hits / q.length) * 0.75 + rec.confidence * 0.15 + rec.strength * 0.2 + fuzzy, 0, 1);
}

function excerpt(rec: MemoryRecord, query: string) {
  const q = tokens(query)[0];
  const idx = q ? rec.body.toLowerCase().indexOf(q) : -1;
  if (idx < 0) return rec.body.slice(0, 150) + (rec.body.length > 150 ? '…' : '');
  return `…${rec.body.slice(Math.max(0, idx - 50), idx + 110)}…`;
}

export const mockMemory: MemoryService = {
  async search(query, opts) {
    await jitter(120, 320);
    const pool = memoryStore.records.filter((r) => (opts?.kind && opts.kind !== 'all' ? r.kind === opts.kind : true));
    const scored = pool
      .map((record) => ({ record, score: score(query, record) }))
      .filter((h) => h.score > 0.08 || !query.trim())
      .sort((a, b) => b.score - a.score)
      .slice(0, opts?.limit ?? 6);
    for (const h of scored) {
      h.record.lastRecalledAt = iso();
      h.record.strength = clamp(h.record.strength + 0.02, 0, 1);
    }
    return scored.map((h) => ({ ...h, excerpt: excerpt(h.record, query) }));
  },
  async list() {
    await jitter(40, 90);
    return memoryStore.records.map((m) => ({ ...m }));
  },
  async write(input) {
    await jitter(180, 340);
    const rec: MemoryRecord = {
      id: uid('mem'),
      kind: input.kind,
      scope: input.scope ?? 'private',
      title: input.title.slice(0, 90),
      body: input.body,
      tags: input.tags ?? ['manual'],
      entities: [],
      confidence: 1,
      strength: 0.9,
      source: 'operator',
      createdAt: iso(),
      lastRecalledAt: iso(),
      pinned: input.pinned ?? false,
      provenance: {},
    };
    memoryStore.records = [rec, ...memoryStore.records];
    pushActivity('memory', 'Operator', 'wrote memory', rec.title, true);
    logCore('success', 'memory', `Memory written: ${rec.title} (${rec.kind})`);
    recomputeVitals();
    return { ...rec };
  },
  async update(id, patch) {
    const rec = memoryStore.records.find((m) => m.id === id);
    if (!rec) throw new Error('E_NOT_FOUND');
    Object.assign(rec, patch);
    pushActivity('memory', 'Operator', 'edited memory', rec.title, true);
    return { ...rec };
  },
  async pin(id, pinned) {
    const rec = memoryStore.records.find((m) => m.id === id);
    if (!rec) return;
    rec.pinned = pinned;
    rec.strength = clamp(rec.strength + (pinned ? 0.12 : -0.05), 0.05, 1);
  },
  async delete(id) {
    const rec = memoryStore.records.find((m) => m.id === id);
    memoryStore.records = memoryStore.records.filter((m) => m.id !== id);
    if (rec) {
      pushActivity('security', 'Operator', 'deleted memory', `${rec.title} · index entries purged`, true);
      logCore('warn', 'memory', `Memory deleted: ${rec.title}`);
    }
  },
  async consolidate() {
    const release = holdState('thinking', 'memory.consolidate');
    await jitter(600, 1100);
    const episodes = memoryStore.records.filter((m) => m.kind === 'episode');
    let merged = 0;
    let savedTokens = 0;
    if (episodes.length >= 2) {
      const [a, b] = episodes as [MemoryRecord, MemoryRecord];
      memoryStore.records = memoryStore.records.filter((m) => m.id !== b.id);
      a.body = `${a.body}\n\nAlso consolidated: ${b.title}`;
      a.tags = [...new Set([...a.tags, ...b.tags, 'consolidated'])];
      a.strength = clamp(a.strength + 0.08, 0, 1);
      merged = 1;
      savedTokens = 4_100 + Math.round(rand(0, 900));
    }
    for (const m of memoryStore.records) if (m.kind === 'fact') m.strength = clamp(m.strength + 0.01, 0, 1);
    release();
    logCore('success', 'memory', `Consolidation pass · ${merged} merge(s) · ${savedTokens.toLocaleString()} tokens reclaimed`);
    pushActivity('memory', 'Knowledge Warden', 'consolidated memory', `${merged} merge(s) · ${savedTokens.toLocaleString()} tokens saved`);
    return { merged, savedTokens };
  },
  async decayCurve() {
    await jitter(60, 140);
    return Array.from({ length: 30 }, (_, day) => ({
      day,
      strength: Number(
        clamp(
          (memoryStore.records.length ? memoryStore.records.reduce((s, m) => s + m.strength, 0) / memoryStore.records.length : 0.7) *
            Math.exp(-day / 26) *
            (1 + 0.16 * Math.sin(day / 3.4)) +
          0.08,
          0,
          1,
        ) * 1,
      ).toFixed(3),
    })).map((d) => ({ day: d.day, strength: Number(d.strength) }));
  },
  async graph() {
    await jitter(120, 260);
    const nodes = memoryStore.records.slice(0, 26).map((m) => ({
      id: m.id,
      label: m.title.length > 26 ? `${m.title.slice(0, 26)}…` : m.title,
      weight: clamp(0.4 + m.strength, 0.4, 1.4),
      kind: m.kind as MemoryRecord['kind'],
    }));
    const links: { from: string; to: string }[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = memoryStore.records[i]!;
        const b = memoryStore.records[j]!;
        const shared = a.tags.filter((t) => b.tags.includes(t)).length;
        if (shared >= 1 && links.filter((l) => l.from === a.id).length < 3) links.push({ from: a.id, to: b.id });
      }
    }
    return { nodes, links: links.slice(0, 40) };
  },
};
