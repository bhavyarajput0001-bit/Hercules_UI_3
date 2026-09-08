'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Plus, Search, Filter, ChevronDown, MoreHorizontal, CheckCircle, AlertCircle, Clock, ArrowRight, X, Trash2, Edit, Copy, Download, Upload, Filter as FilterIcon, Play, Pause, Repeat, Timer, Calendar, BarChart3, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppStore, useAutomations } from '@/store';
import clsx from 'clsx';

const statusOptions = ['all', 'active', 'paused', 'draft', 'error'] as const;
const triggerOptions = ['all', 'schedule', 'event', 'webhook', 'manual', 'api'] as const;
const sortOptions = ['name', 'status', 'trigger', 'lastRun', 'nextRun', 'runs', 'created'] as const;
const viewModes = ['grid', 'list'] as const;

export function AutomationsScreen() {
  const automations = useAutomations();
  const { openModal, toggleAutomation } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'paused' | 'draft' | 'error'>('all');
  const [triggerFilter, setTriggerFilter] = useState<'all' | 'schedule' | 'event' | 'webhook' | 'manual' | 'api'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'status' | 'trigger' | 'lastRun' | 'nextRun' | 'runs' | 'created'>('created');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredAutomations = useMemo(() => {
    let result = automations.filter(auto => {
      if (searchQuery && !auto.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !auto.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (statusFilter !== 'all' && auto.status !== statusFilter) {
        return false;
      }
      if (triggerFilter !== 'all' && auto.trigger !== triggerFilter) {
        return false;
      }
      return true;
    });

    result.sort((a, b) => {
      let aVal: string | number | Date = '';
      let bVal: string | number | Date = '';
      switch (sortBy) {
        case 'name': aVal = a.name; bVal = b.name; break;
        case 'status': aVal = a.status; bVal = b.status; break;
        case 'trigger': aVal = a.trigger; bVal = b.trigger; break;
        case 'lastRun': aVal = a.lastRun ? new Date(a.lastRun) : new Date(0); bVal = b.lastRun ? new Date(b.lastRun) : new Date(0); break;
        case 'nextRun': aVal = a.nextRun ? new Date(a.nextRun) : new Date(0); bVal = b.nextRun ? new Date(b.nextRun) : new Date(0); break;
        case 'runs': aVal = a.runCount; bVal = b.runCount; break;
        case 'created': aVal = new Date(a.createdAt); bVal = new Date(b.createdAt); break;
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
  }, [automations, searchQuery, statusFilter, triggerFilter, sortBy, sortOrder]);

  const autoStats = useMemo(() => ({
    total: automations.length,
    active: automations.filter(a => a.status === 'active').length,
    paused: automations.filter(a => a.status === 'paused').length,
    draft: automations.filter(a => a.status === 'draft').length,
    error: automations.filter(a => a.status === 'error').length,
    totalRuns: automations.reduce((sum, a) => sum + a.runCount, 0),
  }), [automations]);

  const triggerIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    schedule: Calendar,
    event: Zap,
    webhook: Globe,
    manual: Play,
    api: BarChart3,
  };

  return (
    <div className="automations-screen h-full w-full flex flex-col overflow-hidden">
      <div className="p-4 md:p-6 border-b border-hercules-border/30 flex-shrink-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div><h1 className="font-display font-bold text-heading-lg text-hercules-text">Automations</h1><p className="text-body-sm text-hercules-text-muted">Workflow automation & scheduled tasks</p></div>
          <div className="flex items-center gap-2 flex-wrap"><motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => openModal('settings', { section: 'automations', action: 'create' })} className="btn-primary flex items-center gap-2"><Plus className="w-4 h-4" /> New Automation</motion.button></div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-hercules-text-dim" /><input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search automations..." className="w-full pl-10 pr-4 py-2.5 bg-hercules-surface-elevated/50 border border-hercules-border/50 rounded-xl text-hercules-text placeholder:text-hercules-text-dim focus:outline-none focus:border-hercules-primary focus:ring-2 focus:ring-hercules-primary/20" /></div>
          <div className="flex items-center gap-2 flex-wrap"><select value={statusFilter} onChange={e => setStatusFilter(e.target.value as typeof statusFilter)} className="px-3 py-2.5 bg-hercules-surface-elevated/50 border border-hercules-border/50 rounded-xl text-hercules-text focus:outline-none focus:border-hercules-primary">{statusOptions.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}</select><select value={triggerFilter} onChange={e => setTriggerFilter(e.target.value as typeof triggerFilter)} className="px-3 py-2.5 bg-hercules-surface-elevated/50 border border-hercules-border/50 rounded-xl text-hercules-text focus:outline-none focus:border-hercules-primary">{triggerOptions.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}</select><select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)} className="px-3 py-2.5 bg-hercules-surface-elevated/50 border border-hercules-border/50 rounded-xl text-hercules-text focus:outline-none focus:border-hercules-primary">{sortOptions.map(opt => <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1).replace(/([A-Z])/g, ' $1')}</option>)}</select><button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} className="p-2.5 rounded-xl glass hover:bg-hercules-surface-elevated/50">{sortOrder === 'asc' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}</button><div className="flex items-center gap-1 p-1 glass rounded-xl border border-hercules-border/50">{viewModes.map(mode => (<button key={mode} onClick={() => setViewMode(mode)} className={clsx('p-2 rounded-lg transition-colors', viewMode === mode && 'bg-hercules-primary/20 text-hercules-primary')}>{mode === 'grid' && <Grid className="w-5 h-5" />}{mode === 'list' && <List className="w-5 h-5" />}</button>))}</div></div>
        </div>
        <div className="flex flex-wrap gap-3 mt-4" role="status" aria-label="Automation statistics"><StatCard label="Total" value={autoStats.total} icon=Zap color="text-hercules-text" /><StatCard label="Active" value={autoStats.active} icon=CheckCircle color="text-hercules-success" /><StatCard label="Paused" value={autoStats.paused} icon=Pause color="text-hercules-warning" /><StatCard label="Draft" value={autoStats.draft} icon=FileText color="text-hercules-text-dim" /><StatCard label="Errors" value={autoStats.error} icon=AlertCircle color="text-hercules-error" /><StatCard label="Total Runs" value={autoStats.totalRuns} icon=Repeat color="text-hercules-primary" /></div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <AnimatePresence mode="wait"><motion.div key={viewMode} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
          {viewMode === 'grid' && (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{filteredAutomations.map((auto, index) => (<motion.div key={auto.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.03, duration: 0.3 }}><AutomationCard automation={auto} triggerIcon={triggerIcons[auto.trigger]} onToggle={() => toggleAutomation(auto.id)} onEdit={() => openModal('settings', { section: 'automations', action: 'edit', id: auto.id })} onDelete={() => openModal('settings', { section: 'automations', action: 'delete', id: auto.id })} onRun={() => openModal('settings', { section: 'automations', action: 'run', id: auto.id })} /></motion.div>))}</div>)}
          {viewMode === 'list' && (<div className="glass rounded-xl border border-hercules-border/50 overflow-hidden"><div className="grid grid-cols-[60px_1fr_100px_100px_120px_120px_100px_60px] px-4 py-3 text-caption font-medium uppercase tracking-wider text-hercules-text-dim border-b border-hercules-border/30"><div></div><div>Automation</div><div>Status</div><div>Trigger</div><div>Last Run</div><div>Next Run</div><div>Runs</div><div>Actions</div></div><div className="max-h-[calc(100vh-300px)] overflow-y-auto">{filteredAutomations.map((auto, index) => (<motion.div key={auto.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.02, duration: 0.2 }} className="grid grid-cols-[60px_1fr_100px_100px_120px_120px_100px_60px] px-4 py-3 items-center border-b border-hercules-border/20 hover:bg-hercules-surface-elevated/30"><div className="w-12 h-12 rounded-xl bg-hercules-primary/15 flex items-center justify-center"><Zap className="w-6 h-6 text-hercules-primary" /></div><div className="min-w-0"><p className="font-medium text-body-sm text-hercules-text truncate">{auto.name}</p><p className="text-caption text-hercules-text-dim truncate">{auto.description}</p></div><span className={clsx('badge badge-sm', auto.status === 'active' ? 'badge-success' : auto.status === 'paused' ? 'badge-warning' : auto.status === 'draft' ? 'badge-neutral' : 'badge-error')}>{auto.status}</span><span className="badge badge-sm badge-neutral flex items-center gap-1"><triggerIcons[auto.trigger] className="w-3 h-3" />{auto.trigger}</span><span className="text-caption text-hercules-text-dim">{auto.lastRun ? new Date(auto.lastRun).toLocaleString() : 'Never'}</span><span className="text-caption text-hercules-text-dim">{auto.nextRun ? new Date(auto.nextRun).toLocaleString() : '—'}</span><span className="text-body-sm font-mono text-hercules-text-dim">{auto.runCount}</span><div className="flex items-center justify-end gap-1"><button className="p-1.5 rounded-lg hover:bg-hercules-surface-elevated/50" onClick={() => toggleAutomation(auto.id)}>{auto.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}</button><button className="p-1.5 rounded-lg hover:bg-hercules-surface-elevated/50" onClick={() => openModal('settings', { section: 'automations', action: 'run', id: auto.id })}><Play className="w-4 h-4" /></button><button className="p-1.5 rounded-lg hover:bg-hercules-surface-elevated/50" onClick={() => openModal('settings', { section: 'automations', action: 'edit', id: auto.id })}><Edit className="w-4 h-4" /></button><button className="p-1.5 rounded-lg hover:bg-hercules-error/20 text-hercules-error" onClick={() => openModal('settings', { section: 'automations', action: 'delete', id: auto.id })}><Trash2 className="w-4 h-4" /></button></div></motion.div>))}</div></div>)}
        </motion.div></AnimatePresence>
        {filteredAutomations.length === 0 && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center h-64 text-center"><Zap className="w-16 h-16 text-hercules-text-dim mb-4" /><h3 className="font-medium text-body text-hercules-text mb-1">No automations found</h3><p className="text-body-sm text-hercules-text-muted">Try adjusting your search or filters</p></motion.div>)}
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }: { label: string; value: number; icon: React.ComponentType<{ className?: string }>; color: string }) { return <motion.div whileHover={{ y: -2 }} className="glass px-4 py-3 rounded-xl border border-hercules-border/50 flex items-center gap-3 min-w-[140px]"><div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center', `${color}/20`)}><Icon className={clsx('w-5 h-5', color)} /></div><div><p className="text-heading-md font-bold text-hercules-text">{value}</p><p className="text-caption text-hercules-text-dim">{label}</p></div></motion.div>; }

function AutomationCard({ automation, triggerIcon: TriggerIcon, onToggle, onEdit, onDelete, onRun }: { automation: any; triggerIcon: React.ComponentType<{ className?: string }>; onToggle: () => void; onEdit: () => void; onDelete: () => void; onRun: () => void }) {
  return (<motion.button whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }} onClick={onEdit} className="glass p-5 rounded-xl border border-hercules-border/50 hover:border-hercules-primary/30 transition-all h-full flex flex-col"><div className="flex items-start justify-between mb-3"><div className="w-12 h-12 rounded-xl bg-hercules-primary/15 flex items-center justify-center"><Zap className="w-6 h-6 text-hercules-primary" /></div><span className={clsx('badge badge-sm', automation.status === 'active' ? 'badge-success' : automation.status === 'paused' ? 'badge-warning' : automation.status === 'draft' ? 'badge-neutral' : 'badge-error')}>{automation.status}</span></div><div className="flex-1 mb-4"><p className="font-medium text-body text-hercules-text truncate">{automation.name}</p><p className="text-body-sm text-hercules-text-muted line-clamp-2 mt-1">{automation.description}</p></div><div className="mb-4"><div className="flex items-center justify-between mb-1"><span className="text-caption text-hercules-text-dim">Last Run</span><span className="text-caption text-hercules-text-dim">{automation.lastRun ? new Date(automation.lastRun).toLocaleString() : 'Never'}</span></div><div className="flex items-center justify-between mb-1"><span className="text-caption text-hercules-text-dim">Next Run</span><span className="text-caption text-hercules-text-dim">{automation.nextRun ? new Date(automation.nextRun).toLocaleString() : '—'}</span></div></div><div className="flex items-center gap-3 text-caption text-hercules-text-dim border-t border-hercules-border/30 pt-4"><span className="flex items-center gap-1"><TriggerIcon className="w-3 h-3" />{automation.trigger}</span><span className="flex items-center gap-1"><Repeat className="w-3 h-3" />{automation.runCount} runs</span></div><div className="flex gap-2 pt-2"><button onClick={e => { e.stopPropagation(); onToggle(); }} className="btn-secondary flex-1 justify-center flex items-center gap-1">{automation.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}{automation.status === 'active' ? 'Pause' : 'Resume'}</button><button onClick={e => { e.stopPropagation(); onRun(); }} className="btn-primary flex-1 justify-center flex items-center gap-1"><Play className="w-4 h-4" />Run</button></div></motion.button>);
}

import { Grid, List, ChevronUp, Globe, FileText, Play, Pause } from 'lucide-react';