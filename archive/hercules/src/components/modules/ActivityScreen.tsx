'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Filter, Search, Download, RefreshCw, ChevronLeft, ChevronRight, Clock, Zap, Bot, Users, Box, CheckCircle, AlertCircle, XCircle, Info, FileText, Terminal, Globe, Database, FolderOpen, Layers, Settings, Zap as ZapIcon } from 'lucide-react';
import { useAppStore, useActivity } from '@/store';
import clsx from 'clsx';

const typeOptions = ['all', 'system', 'agent', 'task', 'automation', 'user', 'security', 'error', 'warning', 'info'] as const;
const sortOptions = ['time', 'type', 'source', 'severity'] as const;

export function ActivityScreen() {
  const activities = useActivity();
  const { openModal } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'system' | 'agent' | 'task' | 'automation' | 'user' | 'security' | 'error' | 'warning' | 'info'>('all');
  const [sortBy, setSortBy] = useState<'time' | 'type' | 'source' | 'severity'>('time');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const filteredActivities = useMemo(() => {
    let result = activities.filter(activity => {
      if (searchQuery && !activity.message.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !activity.source.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !activity.details?.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (typeFilter !== 'all' && activity.type !== typeFilter) {
        return false;
      }
      return true;
    });

    result.sort((a, b) => {
      let aVal: string | number | Date = '';
      let bVal: string | number | Date = '';
      switch (sortBy) {
        case 'time': aVal = new Date(a.timestamp); bVal = new Date(b.timestamp); break;
        case 'type': aVal = a.type; bVal = b.type; break;
        case 'source': aVal = a.source; bVal = b.source; break;
        case 'severity': aVal = { error: 4, warning: 3, info: 2, success: 1 }[a.severity]; bVal = { error: 4, warning: 3, info: 2, success: 1 }[b.severity]; break;
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
  }, [activities, searchQuery, typeFilter, sortBy, sortOrder]);

  const activityStats = useMemo(() => ({
    total: activities.length,
    errors: activities.filter(a => a.severity === 'error').length,
    warnings: activities.filter(a => a.severity === 'warning').length,
    info: activities.filter(a => a.severity === 'info').length,
    success: activities.filter(a => a.severity === 'success').length,
    lastHour: activities.filter(a => new Date(a.timestamp) > new Date(Date.now() - 3600000)).length,
  }), [activities]);

  const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    system: Cpu,
    agent: Bot,
    task: CheckCircle2,
    automation: ZapIcon,
    user: User,
    security: Shield,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  };

  return (
    <div className="activity-screen h-full w-full flex flex-col overflow-hidden">
      <div className="p-4 md:p-6 border-b border-hercules-border/30 flex-shrink-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div><h1 className="font-display font-bold text-heading-lg text-hercules-text">Activity</h1><p className="text-body-sm text-hercules-text-muted">System events & audit trail</p></div>
          <div className="flex items-center gap-2 flex-wrap">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setAutoRefresh(!autoRefresh)} className={clsx('btn-secondary flex items-center gap-2', autoRefresh && 'bg-hercules-primary/20 text-hercules-primary')}>
              <RefreshCw className="w-4 h-4" animate={{ rotate: autoRefresh ? 360 : 0 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} />
              {autoRefresh ? 'Live' : 'Paused'}
            </motion.button>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-secondary flex items-center gap-2"><Download className="w-4 h-4" /> Export</motion.button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-hercules-text-dim" /><input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search activity..." className="w-full pl-10 pr-4 py-2.5 bg-hercules-surface-elevated/50 border border-hercules-border/50 rounded-xl text-hercules-text placeholder:text-hercules-text-dim focus:outline-none focus:border-hercules-primary focus:ring-2 focus:ring-hercules-primary/20" /></div>
          <div className="flex items-center gap-2 flex-wrap">
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value as typeof typeFilter)} className="px-3 py-2.5 bg-hercules-surface-elevated/50 border border-hercules-border/50 rounded-xl text-hercules-text focus:outline-none focus:border-hercules-primary">{typeOptions.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}</select>
            <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)} className="px-3 py-2.5 bg-hercules-surface-elevated/50 border border-hercules-border/50 rounded-xl text-hercules-text focus:outline-none focus:border-hercules-primary">{sortOptions.map(opt => <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>)}</select>
            <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} className="p-2.5 rounded-xl glass hover:bg-hercules-surface-elevated/50">{sortOrder === 'asc' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}</button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-4" role="status" aria-label="Activity statistics">
          <StatCard label="Total Events" value={activityStats.total} icon=Activity color="text-hercules-text" />
          <StatCard label="Errors" value={activityStats.errors} icon=XCircle color="text-hercules-error" />
          <StatCard label="Warnings" value={activityStats.warnings} icon=AlertCircle color="text-hercules-warning" />
          <StatCard label="Info" value={activityStats.info} icon=Info color="text-hercules-info" />
          <StatCard label="Success" value={activityStats.success} icon=CheckCircle color="text-hercules-success" />
          <StatCard label="Last Hour" value={activityStats.lastHour} icon=Clock color="text-hercules-primary" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="space-y-3">
          {filteredActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: Math.min(index * 0.01, 0.3), duration: 0.2 }}
              className="activity-item glass p-4 rounded-xl border border-hercules-border/50 hover:border-hercules-primary/30 transition-colors cursor-pointer"
              onClick={() => setSelectedActivity(activity.id)}
            >
              <div className="flex items-start gap-4">
                <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', `bg-hercules-${getSeverityColor(activity.severity)}/20 text-hercules-${getSeverityColor(activity.severity)}`)}>
                  <typeIcons[activity.type] className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-body-sm text-hercules-text">{activity.message}</p>
                    <span className={clsx('badge badge-sm', getSeverityBadge(activity.severity))}>{activity.severity}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-caption text-hercules-text-dim">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(activity.timestamp).toLocaleString()}</span>
                    <span className="flex items-center gap-1"><Tag className="w-3 h-3" />{activity.source}</span>
                    <span className="flex items-center gap-1"><typeIcons[activity.type] className="w-3 h-3" />{activity.type}</span>
                  </div>
                  {activity.details && (
                    <p className="text-caption text-hercules-text-dim mt-2 truncate">{activity.details}</p>
                  )}
                </div>
                <ChevronRight className="w-4 h-4 text-hercules-text-dim flex-shrink-0" />
              </div>
            </motion.div>
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center h-64 text-center">
            <Activity className="w-16 h-16 text-hercules-text-dim mb-4" />
            <h3 className="font-medium text-body text-hercules-text mb-1">No activity found</h3>
            <p className="text-body-sm text-hercules-text-muted">Try adjusting your search or filters</p>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedActivity && (
          <ActivityDetailModal activity={activities.find(a => a.id === selectedActivity)} onClose={() => setSelectedActivity(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }: { label: string; value: number; icon: React.ComponentType<{ className?: string }>; color: string }) {
  return <motion.div whileHover={{ y: -2 }} className="glass px-4 py-3 rounded-xl border border-hercules-border/50 flex items-center gap-3 min-w-[140px]"><div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center', `${color}/20`)}><Icon className={clsx('w-5 h-5', color)} /></div><div><p className="text-heading-md font-bold text-hercules-text">{value}</p><p className="text-caption text-hercules-text-dim">{label}</p></div></motion.div>;
}

function getSeverityColor(severity: string): string {
  switch (severity) {
    case 'error': return 'error';
    case 'warning': return 'warning';
    case 'success': return 'success';
    case 'info': return 'info';
    default: return 'primary';
  }
}

function getSeverityBadge(severity: string): string {
  switch (severity) {
    case 'error': return 'badge-error';
    case 'warning': return 'badge-warning';
    case 'success': return 'badge-success';
    case 'info': return 'badge-info';
    default: return 'badge-neutral';
  }
}

function ActivityDetailModal({ activity, onClose }: { activity: any; onClose: () => void }) {
  if (!activity) return null;
  const Icon = typeIcons[activity.type] || Info;
  return <Modal type="settings" data={{ section: 'activity' }} onClose={onClose}><div className="p-6 max-w-2xl"><div className="flex items-start justify-between mb-6"><div className="flex items-center gap-3"><div className={clsx('w-12 h-12 rounded-xl flex items-center justify-center', `bg-hercules-${getSeverityColor(activity.severity)}/20 text-hercules-${getSeverityColor(activity.severity)}`)}><Icon className="w-6 h-6" /></div><div><h2 className="text-heading-lg font-semibold text-hercules-text">Activity Detail</h2><span className={clsx('badge badge-sm', getSeverityBadge(activity.severity))}>{activity.severity}</span></div></div><button onClick={onClose} className="p-2 rounded-xl glass hover:bg-hercules-surface-elevated/50"><X className="w-5 h-5" /></button></div><div className="space-y-4"><div><label className="label">Message</label><div className="glass p-4 rounded-xl border border-hercules-border/50 text-body-sm text-hercules-text">{activity.message}</div></div>{activity.details && <div><label className="label">Details</label><div className="glass p-4 rounded-xl border border-hercules-border/50 text-body-sm text-hercules-text">{activity.details}</div></div>}<div className="grid grid-cols-2 gap-4 text-caption text-hercules-text-dim"><div><span className="block text-hercules-text-dim">Timestamp</span><span>{new Date(activity.timestamp).toLocaleString()}</span></div><div><span className="block text-hercules-text-dim">Source</span><span>{activity.source}</span></div><div><span className="block text-hercules-text-dim">Type</span><span>{activity.type}</span></div><div><span className="block text-hercules-text-dim">Severity</span><span className={clsx('badge badge-sm', getSeverityBadge(activity.severity))}>{activity.severity}</span></div></div>{activity.metadata && <div><label className="label">Metadata</label><pre className="glass p-4 rounded-xl border border-hercules-border/50 text-micro text-hercules-text overflow-auto">{JSON.stringify(activity.metadata, null, 2)}</pre></div>}</div></Modal>;
}

import { Cpu, User, Shield, Tag, CheckCircle2, ChevronUp, ChevronDown, X } from 'lucide-react';