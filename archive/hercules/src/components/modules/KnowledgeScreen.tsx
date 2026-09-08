'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Library, Plus, Search, Filter, ChevronDown, MoreHorizontal, CheckCircle, AlertCircle, Clock, ArrowRight, X, Trash2, Edit, Copy, Download, Upload, Filter as FilterIcon, BookOpen, Globe, Link, Tag, ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import { useAppStore, useKnowledge } from '@/store';
import clsx from 'clsx';

const typeOptions = ['all', 'article', 'paper', 'book', 'video', 'course', 'documentation', 'tutorial', 'reference'] as const;
const sortOptions = ['title', 'source', 'type', 'added', 'rating', 'progress'] as const;
const viewModes = ['grid', 'list', 'categories'] as const;

export function KnowledgeScreen() {
  const knowledge = useKnowledge();
  const { openModal } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'article' | 'paper' | 'book' | 'video' | 'course' | 'documentation' | 'tutorial' | 'reference'>('all');
  const [sortBy, setSortBy] = useState<'title' | 'source' | 'type' | 'added' | 'rating' | 'progress'>('added');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'categories'>('grid');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const filteredKnowledge = useMemo(() => {
    let result = knowledge.filter(item => {
      if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !item.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))) {
        return false;
      }
      if (typeFilter !== 'all' && item.type !== typeFilter) {
        return false;
      }
      return true;
    });

    result.sort((a, b) => {
      let aVal: string | number | Date = '';
      let bVal: string | number | Date = '';
      switch (sortBy) {
        case 'title': aVal = a.title; bVal = b.title; break;
        case 'source': aVal = a.source; bVal = b.source; break;
        case 'type': aVal = a.type; bVal = b.type; break;
        case 'added': aVal = new Date(a.addedAt); bVal = new Date(b.addedAt); break;
        case 'rating': aVal = a.rating; bVal = b.rating; break;
        case 'progress': aVal = a.progress; bVal = b.progress; break;
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
  }, [knowledge, searchQuery, typeFilter, sortBy, sortOrder]);

  const knowledgeStats = useMemo(() => ({
    total: knowledge.length,
    articles: knowledge.filter(k => k.type === 'article').length,
    papers: knowledge.filter(k => k.type === 'paper').length,
    videos: knowledge.filter(k => k.type === 'video').length,
    courses: knowledge.filter(k => k.type === 'course').length,
    completed: knowledge.filter(k => k.progress === 100).length,
  }), [knowledge]);

  const categories = useMemo(() => {
    const cats: Record<string, typeof knowledge> = {};
    knowledge.forEach(item => {
      if (!cats[item.category]) cats[item.category] = [];
      cats[item.category].push(item);
    });
    return Object.entries(cats).map(([name, items]) => ({ name, count: items.length, items }));
  }, [knowledge]);

  const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    article: FileText,
    paper: FileText,
    book: BookOpen,
    video: Video,
    course: BookOpen,
    documentation: FileText,
    tutorial: BookOpen,
    reference: FileText,
  };

  return (
    <div className="knowledge-screen h-full w-full flex flex-col overflow-hidden">
      <div className="p-4 md:p-6 border-b border-hercules-border/30 flex-shrink-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div><h1 className="font-display font-bold text-heading-lg text-hercules-text">Knowledge Base</h1><p className="text-body-sm text-hercules-text-muted">Curated resources & learning materials</p></div>
          <div className="flex items-center gap-2 flex-wrap"><motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => openModal('settings', { section: 'knowledge', action: 'add' })} className="btn-primary flex items-center gap-2"><Plus className="w-4 h-4" /> Add Resource</motion.button><motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-secondary flex items-center gap-2"><Download className="w-4 h-4" /> Export</motion.button></div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-hercules-text-dim" /><input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search knowledge base..." className="w-full pl-10 pr-4 py-2.5 bg-hercules-surface-elevated/50 border border-hercules-border/50 rounded-xl text-hercules-text placeholder:text-hercules-text-dim focus:outline-none focus:border-hercules-primary focus:ring-2 focus:ring-hercules-primary/20" /></div>
          <div className="flex items-center gap-2 flex-wrap"><select value={typeFilter} onChange={e => setTypeFilter(e.target.value as typeof typeFilter)} className="px-3 py-2.5 bg-hercules-surface-elevated/50 border border-hercules-border/50 rounded-xl text-hercules-text focus:outline-none focus:border-hercules-primary">{typeOptions.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}</select><select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)} className="px-3 py-2.5 bg-hercules-surface-elevated/50 border border-hercules-border/50 rounded-xl text-hercules-text focus:outline-none focus:border-hercules-primary">{sortOptions.map(opt => <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1).replace(/([A-Z])/g, ' $1')}</option>)}</select><button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} className="p-2.5 rounded-xl glass hover:bg-hercules-surface-elevated/50">{sortOrder === 'asc' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}</button><div className="flex items-center gap-1 p-1 glass rounded-xl border border-hercules-border/50">{viewModes.map(mode => (<button key={mode} onClick={() => setViewMode(mode)} className={clsx('p-2 rounded-lg transition-colors', viewMode === mode && 'bg-hercules-primary/20 text-hercules-primary')}>{mode === 'grid' && <Grid className="w-5 h-5" />}{mode === 'list' && <List className="w-5 h-5" />}{mode === 'categories' && <Layers className="w-5 h-5" />}</button>))}</div></div>
        </div>
        <div className="flex flex-wrap gap-3 mt-4" role="status" aria-label="Knowledge statistics"><StatCard label="Total" value={knowledgeStats.total} icon=Library color="text-hercules-text" /><StatCard label="Articles" value={knowledgeStats.articles} icon=FileText color="text-hercules-primary" /><StatCard label="Papers" value={knowledgeStats.papers} icon=FileText color="text-hercules-info" /><StatCard label="Videos" value={knowledgeStats.videos} icon=Video color="text-hercules-warning" /><StatCard label="Courses" value={knowledgeStats.courses} icon=BookOpen color="text-hercules-success" /><StatCard label="Completed" value={knowledgeStats.completed} icon=CheckCircle color="text-hercules-success" /></div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <AnimatePresence mode="wait"><motion.div key={viewMode} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
          {viewMode === 'grid' && (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{filteredKnowledge.map((item, index) => (<motion.div key={item.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.03, duration: 0.3 }}><KnowledgeCard item={item} icon={typeIcons[item.type]} onClick={() => setSelectedItem(item.id)} /></motion.div>))}</div>)}
          {viewMode === 'list' && (<div className="glass rounded-xl border border-hercules-border/50 overflow-hidden"><div className="grid grid-cols-[60px_1fr_100px_100px_100px_120px_60px] px-4 py-3 text-caption font-medium uppercase tracking-wider text-hercules-text-dim border-b border-hercules-border/30"><div></div><div>Resource</div><div>Type</div><div>Progress</div><div>Rating</div><div>Added</div><div>Actions</div></div><div className="max-h-[calc(100vh-300px)] overflow-y-auto">{filteredKnowledge.map((item, index) => (<motion.div key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.02, duration: 0.2 }} className="grid grid-cols-[60px_1fr_100px_100px_100px_120px_60px] px-4 py-3 items-center border-b border-hercules-border/20 hover:bg-hercules-surface-elevated/30"><div className="w-12 h-12 rounded-xl bg-hercules-primary/15 flex items-center justify-center"><typeIcons[item.type] className="w-6 h-6 text-hercules-primary" /></div><div className="min-w-0"><p className="font-medium text-body-sm text-hercules-text truncate">{item.title}</p><p className="text-caption text-hercules-text-dim truncate">{item.source}</p></div><span className="badge badge-sm badge-neutral">{item.type}</span><div className="flex items-center gap-2"><div className="w-20 h-1.5 bg-hercules-surface-elevated rounded-full overflow-hidden"><motion.div className="h-full bg-hercules-primary" initial={{ width: 0 }} animate={{ width: `${item.progress}%` }} /></div><span className="text-caption font-mono text-hercules-text-muted w-10 text-right">{item.progress}%</span></div><div className="flex items-center gap-1"><Star className="w-4 h-4 fill-current text-hercules-warning" /><span className="text-body-sm font-mono">{item.rating}/5</span></div><span className="text-caption text-hercules-text-dim">{new Date(item.addedAt).toLocaleDateString()}</span><div className="flex items-center justify-end gap-1"><button className="p-1.5 rounded-lg hover:bg-hercules-surface-elevated/50" onClick={() => setSelectedItem(item.id)}><ArrowRight className="w-4 h-4" /></button><button className="p-1.5 rounded-lg hover:bg-hercules-error/20 text-hercules-error"><Trash2 className="w-4 h-4" /></button></div></motion.div>))}</div></div>)}
          {viewMode === 'categories' && (<div className="space-y-6">{categories.map((cat, catIndex) => (<motion.div key={cat.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: catIndex * 0.1, duration: 0.3 }}><h3 className="font-medium text-body text-hercules-text mb-3 flex items-center gap-2"><Layers className="w-5 h-5 text-hercules-primary" />{cat.name} <span className="badge badge-sm badge-neutral">{cat.count}</span></h3><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">{cat.items.slice(0, 9).map((item, index) => (<motion.div key={item.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.03, duration: 0.2 }}><KnowledgeCard item={item} icon={typeIcons[item.type]} compact onClick={() => setSelectedItem(item.id)} /></motion.div>))}{cat.items.length > 9 && (<motion.button whileHover={{ scale: 1.02 }} className="glass p-4 rounded-xl border border-hercules-border/50 hover:border-hercules-primary/30 flex items-center justify-center gap-2 text-hercules-text-dim"><ChevronRight className="w-5 h-5" /> View all {cat.items.length - 9} more</motion.button>)}</div></motion.div>))}</div>)}
        </motion.div></AnimatePresence>
        {filteredKnowledge.length === 0 && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center h-64 text-center"><Library className="w-16 h-16 text-hercules-text-dim mb-4" /><h3 className="font-medium text-body text-hercules-text mb-1">No resources found</h3><p className="text-body-sm text-hercules-text-muted">Try adjusting your search or filters</p></motion.div>)}
      </div>
      <AnimatePresence>{selectedItem && <KnowledgeDetailModal item={knowledge.find(k => k.id === selectedItem)} onClose={() => setSelectedItem(null)} />}</AnimatePresence>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }: { label: string; value: number; icon: React.ComponentType<{ className?: string }>; color: string }) { return <motion.div whileHover={{ y: -2 }} className="glass px-4 py-3 rounded-xl border border-hercules-border/50 flex items-center gap-3 min-w-[140px]"><div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center', `${color}/20`)}><Icon className={clsx('w-5 h-5', color)} /></div><div><p className="text-heading-md font-bold text-hercules-text">{value}</p><p className="text-caption text-hercules-text-dim">{label}</p></div></motion.div>; }

function KnowledgeCard({ item, icon: Icon, compact, onClick }: { item: any; icon: React.ComponentType<{ className?: string }>; compact?: boolean; onClick: () => void }) {
  return (<motion.button whileHover={{ y: compact ? -2 : -4 }} whileTap={{ scale: 0.98 }} onClick={onClick} className="glass p-4 rounded-xl border border-hercules-border/50 hover:border-hercules-primary/30 transition-all h-full flex flex-col">{!compact && <div className="w-12 h-12 rounded-xl bg-hercules-primary/15 flex items-center justify-center mb-3"><Icon className="w-6 h-6 text-hercules-primary" /></div>}<div className="flex-1"><p className="font-medium text-body-sm text-hercules-text line-clamp-2">{item.title}</p><p className="text-caption text-hercules-text-dim line-clamp-2 mt-1">{item.description}</p></div><div className="mt-3 flex items-center justify-between"><span className="badge badge-sm badge-neutral">{item.type}</span><span className="text-caption text-hercules-text-dim">{item.source}</span></div><div className="mt-2 flex items-center gap-2"><div className="flex-1 h-1.5 bg-hercules-surface-elevated rounded-full overflow-hidden"><motion.div className="h-full bg-hercules-primary" initial={{ width: 0 }} animate={{ width: `${item.progress}%` }} /></div><span className="text-caption font-mono text-hercules-text-muted w-12 text-right">{item.progress}%</span></div><div className="mt-2 flex flex-wrap gap-1">{item.tags.slice(0, 3).map(tag => <span key={tag} className="badge badge-sm badge-neutral text-micro">{tag}</span>)}</div></motion.button>);
}

function KnowledgeDetailModal({ item, onClose }: { item: any; onClose: () => void }) {
  if (!item) return null;
  return <Modal type="settings" data={{ section: 'knowledge' }} onClose={onClose}><div className="p-6 max-w-3xl"><div className="flex items-start justify-between mb-6"><div className="flex items-center gap-3"><div className="w-12 h-12 rounded-xl bg-hercules-primary/15 flex items-center justify-center"><typeIcons[item.type] className="w-6 h-6 text-hercules-primary" /></div><div><h2 className="text-heading-lg font-semibold text-hercules-text">{item.title}</h2><span className="badge badge-sm">{item.type}</span></div></div><button onClick={onClose} className="p-2 rounded-xl glass hover:bg-hercules-surface-elevated/50"><X className="w-5 h-5" /></button></div><div className="space-y-4"><div><label className="label">Description</label><div className="glass p-4 rounded-xl border border-hercules-border/50 text-body-sm text-hercules-text">{item.description}</div></div><div className="grid grid-cols-3 gap-4 text-caption text-hercules-text-dim"><div><span className="block text-hercules-text-dim">Source</span><span>{item.source}</span></div><div><span className="block text-hercules-text-dim">Rating</span><span>{item.rating}/5</span></div><div><span className="block text-hercules-text-dim">Progress</span><span>{item.progress}%</span></div></div><div><label className="label">Tags</label><div className="flex flex-wrap gap-2">{item.tags.map((tag: string) => <span key={tag} className="badge badge-neutral">{tag}</span>)}</div></div>{item.url && <a href={item.url} target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center justify-center gap-2"><Globe className="w-4 h-4" /> Open Source</a>}</div></div></Modal>;
}

import { Grid, List, Layers, ChevronUp, Video, Star } from 'lucide-react';