'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ListChecks, Plus, Search, Filter, ChevronDown, MoreHorizontal, CheckCircle, AlertCircle, Clock, Flag, Calendar, ArrowRight, X, Trash2, Edit, Copy, Download, Upload, Filter as FilterIcon, Kanban } from 'lucide-react';
import { useAppStore, useTasks, useAgents, useDepartments } from '@/store';
import { TaskCard } from '@/components/ui/TaskCard';
import clsx from 'clsx';

const statusOptions = ['all', 'pending', 'in-progress', 'review', 'completed', 'failed', 'cancelled'] as const;
const priorityOptions = ['all', 'critical', 'high', 'medium', 'low'] as const;
const sortOptions = ['created', 'updated', 'priority', 'progress', 'dueDate', 'title'] as const;
const viewModes = ['list', 'kanban', 'calendar'] as const;

export function TasksScreen() {
  const tasks = useTasks();
  const agents = useAgents();
  const departments = useDepartments();
  const { openModal, setCurrentTask } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'in-progress' | 'review' | 'completed' | 'failed' | 'cancelled'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all');
  const [sortBy, setSortBy] = useState<'created' | 'updated' | 'priority' | 'progress' | 'dueDate' | 'title'>('created');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'list' | 'kanban' | 'calendar'>('list');
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  const filteredTasks = useMemo(() => {
    let result = tasks.filter(task => {
      if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !task.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (statusFilter !== 'all' && task.status !== statusFilter) {
        return false;
      }
      if (priorityFilter !== 'all' && task.priority !== priorityFilter) {
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
        case 'priority': aVal = { critical: 4, high: 3, medium: 2, low: 1 }[a.priority]; bVal = { critical: 4, high: 3, medium: 2, low: 1 }[b.priority]; break;
        case 'progress': aVal = a.progress; bVal = b.progress; break;
        case 'dueDate': aVal = a.dueDate ? new Date(a.dueDate) : new Date(0); bVal = b.dueDate ? new Date(b.dueDate) : new Date(0); break;
        case 'title': aVal = a.title; bVal = b.title; break;
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
  }, [tasks, searchQuery, statusFilter, priorityFilter, sortBy, sortOrder]);

  const taskStats = useMemo(() => ({
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    review: tasks.filter(t => t.status === 'review').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    failed: tasks.filter(t => t.status === 'failed').length,
  }), [tasks]);

  const kanbanColumns = useMemo(() => [
    { id: 'pending', label: 'Pending', color: 'text-hercules-text-dim' },
    { id: 'in-progress', label: 'In Progress', color: 'text-hercules-primary' },
    { id: 'review', label: 'Review', color: 'text-hercules-warning' },
    { id: 'completed', label: 'Completed', color: 'text-hercules-success' },
  ] as const, []);

  return (
    <div className="tasks-screen h-full w-full flex flex-col overflow-hidden">
      <div className="p-4 md:p-6 border-b border-hercules-border/30 flex-shrink-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <h1 className="font-display font-bold text-heading-lg text-hercules-text">Tasks</h1>
            <p className="text-body-sm text-hercules-text-muted">Track and manage work items</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openModal('settings', { section: 'tasks', action: 'create' })}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Task
            </motion.button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-hercules-text-dim" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search tasks..."
              className="w-full pl-10 pr-4 py-2.5 bg-hercules-surface-elevated/50 border border-hercules-border/50 rounded-xl text-hercules-text placeholder:text-hercules-text-dim focus:outline-none focus:border-hercules-primary focus:ring-2 focus:ring-hercules-primary/20"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as typeof statusFilter)} className="px-3 py-2.5 bg-hercules-surface-elevated/50 border border-hercules-border/50 rounded-xl text-hercules-text focus:outline-none focus:border-hercules-primary">
              {statusOptions.map(s => <option key={s} value={s}>{s.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}</option>)}
            </select>
            <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value as typeof priorityFilter)} className="px-3 py-2.5 bg-hercules-surface-elevated/50 border border-hercules-border/50 rounded-xl text-hercules-text focus:outline-none focus:border-hercules-primary">
              {priorityOptions.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
            </select>
            <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)} className="px-3 py-2.5 bg-hercules-surface-elevated/50 border border-hercules-border/50 rounded-xl text-hercules-text focus:outline-none focus:border-hercules-primary">
              {sortOptions.map(opt => <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1).replace(/([A-Z])/g, ' $1')}</option>)}
            </select>
            <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} className="p-2.5 rounded-xl glass hover:bg-hercules-surface-elevated/50">
              {sortOrder === 'asc' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-1 p-1 glass rounded-xl border border-hercules-border/50">
              {viewModes.map(mode => (
                <button key={mode} onClick={() => setViewMode(mode)} className={clsx('p-2 rounded-lg transition-colors', viewMode === mode && 'bg-hercules-primary/20 text-hercules-primary')}>
                  {mode === 'list' && <List className="w-5 h-5" />}
                  {mode === 'kanban' && <Kanban className="w-5 h-5" />}
                  {mode === 'calendar' && <Calendar className="w-5 h-5" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-4" role="status" aria-label="Task statistics">
          <StatCard label="Total" value={taskStats.total} icon=ListChecks color="text-hercules-text" />
          <StatCard label="Pending" value={taskStats.pending} icon=Clock color="text-hercules-text-dim" />
          <StatCard label="In Progress" value={taskStats.inProgress} icon=AlertCircle color="text-hercules-primary" />
          <StatCard label="Review" value={taskStats.review} icon=Flag color="text-hercules-warning" />
          <StatCard label="Done" value={taskStats.completed} icon=CheckCircle color="text-hercules-success" />
          <StatCard label="Failed" value={taskStats.failed} icon=AlertCircle color="text-hercules-error" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <AnimatePresence mode="wait">
          <motion.div key={viewMode} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            {viewMode === 'list' && (
              <div className="glass rounded-xl border border-hercules-border/50 overflow-hidden">
                <div className="grid grid-cols-[50px_1fr_100px_100px_100px_120px_120px_60px] px-4 py-3 text-caption font-medium uppercase tracking-wider text-hercules-text-dim border-b border-hercules-border/30">
                  <div></div>
                  <div>Task</div>
                  <div>Status</div>
                  <div>Priority</div>
                  <div>Progress</div>
                  <div>Assignee</div>
                  <div>Due</div>
                  <div>Actions</div>
                </div>
                <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
                  {filteredTasks.map((task, index) => (
                    <motion.div key={task.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.02, duration: 0.2 }}
                      className="grid grid-cols-[50px_1fr_100px_100px_100px_120px_120px_60px] px-4 py-3 items-center border-b border-hercules-border/20 hover:bg-hercules-surface-elevated/30 transition-colors">
                      <input type="checkbox" checked={selectedTasks.includes(task.id)} onChange={e => setSelectedTasks(e.target.checked ? [...selectedTasks, task.id] : selectedTasks.filter(id => id !== task.id))} className="rounded border-hercules-border" />
                      <div className="min-w-0">
                        <p className="font-medium text-body-sm text-hercules-text truncate">{task.title}</p>
                        <p className="text-caption text-hercules-text-dim truncate">{task.description}</p>
                      </div>
                      <span className={clsx('badge badge-sm', task.status === 'pending' ? 'badge-neutral' : task.status === 'in-progress' ? 'badge-primary' : task.status === 'review' ? 'badge-warning' : task.status === 'completed' ? 'badge-success' : 'badge-error')}>
                        {task.status.replace('-', ' ')}
                      </span>
                      <span className={clsx('badge badge-sm', task.priority === 'critical' ? 'badge-error' : task.priority === 'high' ? 'badge-warning' : task.priority === 'medium' ? 'badge-primary' : 'badge-neutral')}>
                        {task.priority}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-hercules-surface-elevated rounded-full overflow-hidden">
                          <motion.div className="h-full bg-hercules-primary" initial={{ width: 0 }} animate={{ width: `${task.progress}%` }} transition={{ duration: 0.5 }} />
                        </div>
                        <span className="text-caption font-mono text-hercules-text-muted w-12 text-right">{task.progress}%</span>
                      </div>
                      <span className="text-body-sm text-hercules-text-dim">{task.assigneeId ? agents.find(a => a.id === task.assigneeId)?.name || 'Unassigned' : 'Unassigned'}</span>
                      <span className="text-caption text-hercules-text-dim">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '—'}</span>
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-hercules-surface-elevated/50" onClick={() => setCurrentTask(task.id)}><ArrowRight className="w-4 h-4" /></button>
                        <button className="p-1.5 rounded-lg hover:bg-hercules-error/20 text-hercules-error" onClick={() => openModal('settings', { section: 'tasks', action: 'delete', id: task.id })}><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {viewMode === 'kanban' && (
              <div className="flex gap-4 h-full items-start">
                {kanbanColumns.map(column => (
                  <div key={column.id} className="flex-1 min-w-0 glass rounded-xl border border-hercules-border/50 flex flex-col min-h-[500px]">
                    <div className="px-4 py-3 border-b border-hercules-border/30 flex items-center justify-between">
                      <h3 className={clsx('font-medium text-body-sm', column.color)}>{column.label}</h3>
                      <span className="badge badge-sm badge-neutral">{filteredTasks.filter(t => t.status === column.id).length}</span>
                    </div>
                    <div className="flex-1 overflow-y-auto p-3 space-y-3">
                      {filteredTasks.filter(t => t.status === column.id).map((task, index) => (
                        <motion.div key={task.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03, duration: 0.2 }}
                          className="glass p-3 rounded-xl border border-hercules-border/50 hover:border-hercules-primary/30 transition-colors cursor-pointer"
                          onClick={() => setCurrentTask(task.id)}
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <span className={clsx('badge badge-sm', task.priority === 'critical' ? 'badge-error' : task.priority === 'high' ? 'badge-warning' : 'badge-neutral')}>
                              {task.priority}
                            </span>
                            <div className="flex items-center gap-1">
                              {task.assigneeId && agents.find(a => a.id === task.assigneeId) && (
                                <div className="w-6 h-6 rounded-full bg-hercules-primary/20 flex items-center justify-center">
                                  <Bot className="w-3 h-3 text-hercules-primary" />
                                </div>
                              )}
                            </div>
                          </div>
                          <p className="font-medium text-body-sm text-hercules-text truncate">{task.title}</p>
                          <p className="text-caption text-hercules-text-dim truncate mt-1">{task.description}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <div className="flex-1 h-1 bg-hercules-surface-elevated rounded-full overflow-hidden">
                              <motion.div className="h-full bg-hercules-primary" initial={{ width: 0 }} animate={{ width: `${task.progress}%` }} transition={{ duration: 0.5 }} />
                            </div>
                            <span className="text-micro font-mono text-hercules-text-muted">{task.progress}%</span>
                          </div>
                          {task.dueDate && (
                            <p className="mt-2 text-micro text-hercules-text-dim flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Due: {new Date(task.dueDate).toLocaleDateString()}
                            </p>
                          )}
                        </motion.div>
                      ))}
                      {filteredTasks.filter(t => t.status === column.id).length === 0 && (
                        <div className="text-center py-8 text-hercules-text-dim">
                          <p className="text-body-sm">No tasks</p>
                          <p className="text-caption">Drag tasks here or create new</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {viewMode === 'calendar' && (
              <div className="glass rounded-xl border border-hercules-border/50 p-6">
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 mx-auto text-hercules-text-dim mb-4" />
                  <h3 className="font-medium text-body text-hercules-text mb-1">Calendar View</h3>
                  <p className="text-body-sm text-hercules-text-muted">Calendar visualization coming soon</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {filteredTasks.length === 0 && viewMode !== 'kanban' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center h-64 text-center">
            <ListChecks className="w-16 h-16 text-hercules-text-dim mb-4" />
            <h3 className="font-medium text-body text-hercules-text mb-1">No tasks found</h3>
            <p className="text-body-sm text-hercules-text-muted">Try adjusting your search or filters</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }: { label: string; value: number; icon: React.ComponentType<{ className?: string }>; color: string }) {
  return (
    <motion.div whileHover={{ y: -2 }} className="glass px-4 py-3 rounded-xl border border-hercules-border/50 flex items-center gap-3 min-w-[140px]">
      <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center', `${color}/20`)}><Icon className={clsx('w-5 h-5', color)} /></div>
      <div><p className="text-heading-md font-bold text-hercules-text">{value}</p><p className="text-caption text-hercules-text-dim">{label}</p></div>
    </motion.div>
  );
}

import { Bot, List, ChevronUp, Grid } from 'lucide-react';