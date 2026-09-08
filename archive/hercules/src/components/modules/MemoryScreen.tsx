'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Plus, Search, Filter, ChevronDown, MoreHorizontal, CheckCircle, AlertCircle, Clock, ArrowRight, X, Trash2, Edit, Copy, Download, Upload, Filter as FilterIcon, Brain, FileText, Image, Link, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppStore, useMemories } from '@/store';
import clsx from 'clsx';

const typeOptions = ['all', 'fact', 'procedure', 'experience', 'preference', 'conversation', 'code', 'document'] as const;
const sortOptions = ['created', 'updated', 'relevance', 'accessCount', 'type'] as const;
const viewModes = ['list', 'graph', 'timeline'] as const;

export function MemoryScreen() {
  const memories = useMemories();
  const { openModal, deleteMemory } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'fact' | 'procedure' | 'experience' | 'preference' | 'conversation' | 'code' | 'document'>('all');
  const [sortBy, setSortBy] = useState<'created' | 'updated' | 'relevance' | 'accessCount' | 'type'>('updated');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'list' | 'graph' | 'timeline'>('list');
  const [selectedMemory, setSelectedMemory] = useState<string | null>(null);

  const filteredMemories = useMemo(() => {
    let result = memories.filter(memory => {
      if (searchQuery && !memory.content.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !memory.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))) {
        return false;
      }
      if (typeFilter !== 'all' && memory.type !== typeFilter) {
        return false;
      }
      return true;
    });

    result.sort((a, b) => {
      let aVal: string | number | Date = '';
      let bVal: string | number | Date = '';
      switch (sortBy) {
        case 'created': aVal = new Date(a.createdAt); bVal = new Date(b.createdAt); break;
        case 'updated': aVal = new Date(a.updatedAt); bVal = new Date(b.updatedAt); break;
        case 'relevance': aVal = a.relevance; bVal = b.relevance; break;
        case 'accessCount': aVal = a.accessCount; bVal = b.accessCount; break;
        case 'type': aVal = a.type; bVal = b.type; break;
      }
      if (aVal instanceof Date && bVal instanceof Date) {
        return sortOrder === 'asc' ? aVal.getTime() - bVal.getTime() : bVal.getTime() - aVal.getTime();
      }
      if (typeof aVal === 'string') {
        return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortOrder === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });
    return result;
  }, [memories, searchQuery, typeFilter, sortBy, sortOrder]);

  const memoryStats = useMemo(() => ({
    total: memories.length,
    facts: memories.filter(m => m.type === 'fact').length,
    procedures: memories.filter(m => m.type === 'procedure').length,
    experiences: memories.filter(m => m.type === 'experience').length,
    conversations: memories.filter(m => m.type === 'conversation').length,
    code: memories.filter(m => m.type === 'code').length,
  }), [memories]);

  const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    fact: Brain,
    procedure: ListChecks,
    experience: Target,
    preference: Settings,
    conversation: MessageSquare,
    code: Code,
    document: FileText,
  };

  return (
    <div className="memory-screen h-full w-full flex flex-col overflow-hidden">
      <div className="p-4 md:p-6 border-b border-hercules-border/30 flex-shrink-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <h1 className="font-display font-bold text-heading-lg text-hercules-text">Memory</h1>
            <p className="text-body-sm text-hercules-text-muted">Long-term knowledge & context storage</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => openModal('settings', { section: 'memory', action: 'create' })} className="btn-primary flex items-center gap-2"><Plus className="w-4 h-4" /> Add Memory</motion.button>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-secondary flex items-center gap-2"><Download className="w-4 h-4" /> Export</motion.button>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-secondary flex items-center gap-2"><Upload className="w-4 h-4" /> Import</motion.button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-hercules-text-dim" /><input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search memories..." className="w-full pl-10 pr-4 py-2.5 bg-hercules-surface-elevated/50 border border-hercules-border/50 rounded-xl text-hercules-text placeholder:text-hercules-text-dim focus:outline-none focus:border-hercules-primary focus:ring-2 focus:ring-hercules-primary/20" /></div>
          <div className="flex items-center gap-2 flex-wrap">
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value as typeof typeFilter)} className="px-3 py-2.5 bg-hercules-surface-elevated/50 border border-hercules-border/50 rounded-xl text-hercules-text focus:outline-none focus:border-hercules-primary">
              {typeOptions.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
            </select>
            <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)} className="px-3 py-2.5 bg-hercules-surface-elevated/50 border border-hercules-border/50 rounded-xl text-hercules-text focus:outline-none focus:border-hercules-primary">
              {sortOptions.map(opt => <option key={opt} value={opt}>{opt.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase())}</option>)}
            </select>
            <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} className="p-2.5 rounded-xl glass hover:bg-hercules-surface-elevated/50">{sortOrder === 'asc' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}</button>
            <div className="flex items-center gap-1 p-1 glass rounded-xl border border-hercules-border/50">
              {viewModes.map(mode => (<button key={mode} onClick={() => setViewMode(mode)} className={clsx('p-2 rounded-lg transition-colors', viewMode === mode && 'bg-hercules-primary/20 text-hercules-primary')}>{mode === 'list' && <List className="w-5 h-5" />}{mode === 'graph' && <GitBranch className="w-5 h-5" />}{mode === 'timeline' && <Activity className="w-5 h-5" />}</button>))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-4" role="status" aria-label="Memory statistics">
          <StatCard label="Total" value={memoryStats.total} icon=Database color="text-hercules-text" />
          <StatCard label="Facts" value={memoryStats.facts} icon=Brain color="text-hercules-primary" />
          <StatCard label="Procedures" value={memoryStats.procedures} icon=ListChecks color="text-hercules-info" />
          <StatCard label="Experiences" value={memoryStats.experiences} icon=Target color="text-hercules-success" />
          <StatCard label="Conversations" value={memoryStats.conversations} icon=MessageSquare color="text-hercules-warning" />
          <StatCard label="Code" value={memoryStats.code} icon=Code color="text-hercules-accent" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <AnimatePresence mode="wait">
          <motion.div key={viewMode} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            {viewMode === 'list' && (
              <div className="space-y-3">
                {filteredMemories.map((memory, index) => (
                  <motion.div key={memory.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.02, duration: 0.2 }}
                    className="memory-card glass p-4 rounded-xl border border-hercules-border/50 hover:border-hercules-primary/30 transition-colors flex items-start gap-4 cursor-pointer"
                    onClick={() => setSelectedMemory(memory.id)}
                  >
                    <div className={clsx('w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0', `bg-hercules-${getTypeColor(memory.type)}/20 text-hercules-${getTypeColor(memory.type)}`)}>
                      <typeIcons[memory.type] className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-medium text-body-sm text-hercules-text line-clamp-2">{memory.content}</p>
                        <div className="flex items-center gap-1">
                          <span className="badge badge-sm badge-neutral">{memory.type}</span>
                          <span className="text-micro font-mono text-hercules-text-dim">{memory.relevance}%</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 mt-2 text-caption text-hercules-text-dim">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(memory.updatedAt).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{memory.accessCount} views</span>
                        <span className="flex items-center gap-1"><Tag className="w-3 h-3" />{memory.tags.slice(0, 3).join(', ')}{memory.tags.length > 3 && '...'}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-hercules-surface-elevated/50" onClick={e => { e.stopPropagation(); openModal('settings', { section: 'memory', action: 'edit', id: memory.id }); }}><Edit className="w-4 h-4" /></button>
                      <button className="p-1.5 rounded-lg hover:bg-hercules-error/20 text-hercules-error" onClick={e => { e.stopPropagation(); deleteMemory(memory.id); }}><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {viewMode === 'graph' && (
              <div className="glass rounded-xl border border-hercules-border/50 p-6 h-[calc(100vh-280px)]">
                <div className="text-center py-12"><GitBranch className="w-16 h-16 mx-auto text-hercules-text-dim mb-4" /><h3 className="font-medium text-body text-hercules-text mb-1">Memory Graph</h3><p className="text-body-sm text-hercules-text-muted">Visualize connections between memories</p></div>
              </div>
            )}

            {viewMode === 'timeline' && (
              <div className="space-y-4">
                {filteredMemories.slice(0, 50).map((memory, index) => (
                  <motion.div key={memory.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.02, duration: 0.2 }} className="relative pl-8 border-l-2 border-hercules-border/30">
                    <div className="absolute left-[-10px] top-2 w-4 h-4 rounded-full border-2 border-hercules-border bg-hercules-background" style={{ borderColor: `var(--hercules-${getTypeColor(memory.type)})` }} />
                    <div className="glass p-4 rounded-xl border border-hercules-border/50 hover:border-hercules-primary/30"><div className="flex items-start justify-between gap-4"><div className="flex-1"><div className="flex items-center gap-2 mb-1"><span className="badge badge-sm" style={{ backgroundColor: `var(--hercules-${getTypeColor(memory.type)})20`, color: `var(--hercules-${getTypeColor(memory.type)})` }}>{memory.type}</span><span className="text-caption text-hercules-text-dim">{new Date(memory.createdAt).toLocaleString()}</span></div><p className="text-body-sm text-hercules-text">{memory.content}</p><div className="mt-2 flex flex-wrap gap-1">{memory.tags.map(tag => <span key={tag} className="badge badge-sm badge-neutral text-micro">{tag}</span>)}</div></div></div></div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {filteredMemories.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center h-64 text-center">
            <Database className="w-16 h-16 text-hercules-text-dim mb-4" /><h3 className="font-medium text-body text-hercules-text mb-1">No memories found</h3><p className="text-body-sm text-hercules-text-muted">Try adjusting your search or filters</p>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedMemory && (
          <MemoryDetailModal memory={memories.find(m => m.id === selectedMemory)} onClose={() => setSelectedMemory(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }: { label: string; value: number; icon: React.ComponentType<{ className?: string }>; color: string }) {
  return <motion.div whileHover={{ y: -2 }} className="glass px-4 py-3 rounded-xl border border-hercules-border/50 flex items-center gap-3 min-w-[140px]"><div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center', `${color}/20`)}><Icon className={clsx('w-5 h-5', color)} /></div><div><p className="text-heading-md font-bold text-hercules-text">{value}</p><p className="text-caption text-hercules-text-dim">{label}</p></div></motion.div>;
}

function getTypeColor(type: string): string {
  const colors: Record<string, string> = { fact: 'primary', procedure: 'info', experience: 'success', preference: 'accent', conversation: 'warning', code: 'purple', document: 'text' };
  return colors[type] || 'primary';
}

function MemoryDetailModal({ memory, onClose }: { memory: any; onClose: () => void }) {
  if (!memory) return null;
  const Icon = { fact: Brain, procedure: ListChecks, experience: Target, preference: Settings, conversation: MessageSquare, code: Code, document: FileText }[memory.type] || Brain;
  return (
    <Modal type="settings" data={{ section: 'memory' }} onClose={onClose}>
      <div className="p-6 max-w-3xl">
        <div className="flex items-start justify-between mb-6"><div className="flex items-center gap-3"><div className={clsx('w-12 h-12 rounded-xl flex items-center justify-center', `bg-hercules-${getTypeColor(memory.type)}/20 text-hercules-${getTypeColor(memory.type)}`)}><Icon className="w-6 h-6" /></div><div><h2 className="text-heading-lg font-semibold text-hercules-text">Memory Detail</h2><span className="badge badge-sm">{memory.type}</span></div></div><button onClick={onClose} className="p-2 rounded-xl glass hover:bg-hercules-surface-elevated/50"><X className="w-5 h-5" /></button></div>
        <div className="space-y-4">
          <div><label className="label">Content</label><div className="glass p-4 rounded-xl border border-hercules-border/50 whitespace-pre-wrap text-body-sm text-hercules-text">{memory.content}</div></div>
          <div className="grid grid-cols-2 gap-4"><div><label className="label">Relevance</label><div className="flex items-center gap-2"><div className="flex-1 h-2 bg-hercules-surface-elevated rounded-full overflow-hidden"><motion.div className="h-full bg-hercules-primary" initial={{ width: 0 }} animate={{ width: `${memory.relevance}%` }} /></div><span className="text-caption font-mono text-hercules-text-muted w-12">{memory.relevance}%</span></div></div><div><label className="label">Access Count</label><p className="text-heading-md font-bold text-hercules-text">{memory.accessCount}</p></div></div>
          <div><label className="label">Tags</label><div className="flex flex-wrap gap-2">{memory.tags.map((tag: string) => <span key={tag} className="badge badge-neutral">{tag}</span>)}</div></div>
          <div className="grid grid-cols-3 gap-4 text-caption text-hercules-text-dim"><div><span className="block text-hercules-text-dim">Created</span><span>{new Date(memory.createdAt).toLocaleString()}</span></div><div><span className="block text-hercules-text-dim">Updated</span><span>{new Date(memory.updatedAt).toLocaleString()}</span></div><div><span className="block text-hercules-text-dim">Source</span><span>{memory.source}</span></div></div>
          <div className="flex gap-3 pt-4"><button className="btn-secondary flex-1 justify-center" onClick={() => { /* copy */ }}><Copy className="w-4 h-4" /> Copy Content</button><button className="btn-danger flex-1 justify-center" onClick={() => { /* delete */ onClose(); }}><Trash2 className="w-4 h-4" /> Delete</button></div>
        </div>
      </div>
    </Modal>
  );
}

import { ListChecks, Settings, MessageSquare, Code, GitBranch, Activity, List, ChevronUp, Eye, Tag, Box } from 'lucide-react';