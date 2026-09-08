'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen, Plus, Search, Filter, ChevronDown, MoreHorizontal, CheckCircle, AlertCircle, Clock, Target, ArrowRight, X, Trash2, Edit, Copy, Download, Upload, Filter as FilterIcon, Kanban, Users, FileText } from 'lucide-react';
import { useAppStore, useProjects, useTasks, useAgents, useDepartments } from '@/store';
import clsx from 'clsx';

const statusOptions = ['all', 'planning', 'active', 'on-hold', 'completed', 'archived'] as const;
const sortOptions = ['name', 'status', 'progress', 'tasks', 'startDate', 'endDate', 'created'] as const;
const viewModes = ['grid', 'list', 'timeline'] as const;

export function ProjectsScreen() {
  const projects = useProjects();
  const tasks = useTasks();
  const agents = useAgents();
  const departments = useDepartments();
  const { openModal, setCurrentProject } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'planning' | 'active' | 'on-hold' | 'completed' | 'archived'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'status' | 'progress' | 'tasks' | 'startDate' | 'endDate' | 'created'>('created');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'timeline'>('grid');

  const filteredProjects = useMemo(() => {
    let result = projects.filter(project => {
      if (searchQuery && !project.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !project.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (statusFilter !== 'all' && project.status !== statusFilter) {
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
        case 'progress': aVal = a.progress; bVal = b.progress; break;
        case 'tasks': aVal = a.taskIds.length; bVal = b.taskIds.length; break;
        case 'startDate': aVal = a.startDate ? new Date(a.startDate) : new Date(0); bVal = b.startDate ? new Date(b.startDate) : new Date(0); break;
        case 'endDate': aVal = a.endDate ? new Date(a.endDate) : new Date(0); bVal = b.endDate ? new Date(b.endDate) : new Date(0); break;
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
  }, [projects, searchQuery, statusFilter, sortBy, sortOrder]);

  const projectStats = useMemo(() => ({
    total: projects.length,
    planning: projects.filter(p => p.status === 'planning').length,
    active: projects.filter(p => p.status === 'active').length,
    onHold: projects.filter(p => p.status === 'on-hold').length,
    completed: projects.filter(p => p.status === 'completed').length,
  }), [projects]);

  return (
    <div className="projects-screen h-full w-full flex flex-col overflow-hidden">
      <div className="p-4 md:p-6 border-b border-hercules-border/30 flex-shrink-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <h1 className="font-display font-bold text-heading-lg text-hercules-text">Projects</h1>
            <p className="text-body-sm text-hercules-text-muted">Manage projects and track progress</p>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => openModal('settings', { section: 'projects', action: 'create' })} className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Project
          </motion.button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-hercules-text-dim" />
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search projects..." className="w-full pl-10 pr-4 py-2.5 bg-hercules-surface-elevated/50 border border-hercules-border/50 rounded-xl text-hercules-text placeholder:text-hercules-text-dim focus:outline-none focus:border-hercules-primary focus:ring-2 focus:ring-hercules-primary/20" />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as typeof statusFilter)} className="px-3 py-2.5 bg-hercules-surface-elevated/50 border border-hercules-border/50 rounded-xl text-hercules-text focus:outline-none focus:border-hercules-primary">
              {statusOptions.map(s => <option key={s} value={s}>{s.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}</option>)}
            </select>
            <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)} className="px-3 py-2.5 bg-hercules-surface-elevated/50 border border-hercules-border/50 rounded-xl text-hercules-text focus:outline-none focus:border-hercules-primary">
              {sortOptions.map(opt => <option key={opt} value={opt}>{opt.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase())}</option>)}
            </select>
            <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} className="p-2.5 rounded-xl glass hover:bg-hercules-surface-elevated/50">
              {sortOrder === 'asc' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-1 p-1 glass rounded-xl border border-hercules-border/50">
              {viewModes.map(mode => (
                <button key={mode} onClick={() => setViewMode(mode)} className={clsx('p-2 rounded-lg transition-colors', viewMode === mode && 'bg-hercules-primary/20 text-hercules-primary')}>
                  {mode === 'grid' && <Grid className="w-5 h-5" />}
                  {mode === 'list' && <List className="w-5 h-5" />}
                  {mode === 'timeline' && <Activity className="w-5 h-5" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-4" role="status" aria-label="Project statistics">
          <StatCard label="Total" value={projectStats.total} icon=FolderOpen color="text-hercules-text" />
          <StatCard label="Planning" value={projectStats.planning} icon=Target color="text-hercules-info" />
          <StatCard label="Active" value={projectStats.active} icon=CheckCircle color="text-hercules-success" />
          <StatCard label="On Hold" value={projectStats.onHold} icon=Clock color="text-hercules-warning" />
          <StatCard label="Completed" value={projectStats.completed} icon=CheckCircle color="text-hercules-success" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <AnimatePresence mode="wait">
          <motion.div key={viewMode} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProjects.map((project, index) => (
                  <motion.div key={project.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.03, duration: 0.3 }}>
                    <ProjectCard project={project} tasks={tasks.filter(t => project.taskIds.includes(t.id))} agents={agents.filter(a => project.agentIds.includes(a.id))} departments={departments.filter(d => project.departmentIds.includes(d.id))} onClick={() => setCurrentProject(project.id)} />
                  </motion.div>
                ))}
              </div>
            )}

            {viewMode === 'list' && (
              <div className="glass rounded-xl border border-hercules-border/50 overflow-hidden">
                <div className="grid grid-cols-[60px_1fr_100px_100px_100px_120px_120px_60px] px-4 py-3 text-caption font-medium uppercase tracking-wider text-hercules-text-dim border-b border-hercules-border/30">
                  <div></div><div>Project</div><div>Status</div><div>Progress</div><div>Tasks</div><div>Team</div><div>Timeline</div><div>Actions</div>
                </div>
                <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
                  {filteredProjects.map((project, index) => (
                    <motion.div key={project.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.02, duration: 0.2 }}
                      className="grid grid-cols-[60px_1fr_100px_100px_100px_120px_120px_60px] px-4 py-3 items-center border-b border-hercules-border/20 hover:bg-hercules-surface-elevated/30">
                      <div className="w-12 h-12 rounded-xl bg-hercules-primary/15 flex items-center justify-center"><FolderOpen className="w-6 h-6 text-hercules-primary" /></div>
                      <div className="min-w-0"><p className="font-medium text-body-sm text-hercules-text truncate">{project.name}</p><p className="text-caption text-hercules-text-dim truncate">{project.description}</p></div>
                      <span className={clsx('badge badge-sm', project.status === 'active' ? 'badge-success' : project.status === 'planning' ? 'badge-primary' : project.status === 'on-hold' ? 'badge-warning' : project.status === 'completed' ? 'badge-success' : 'badge-neutral')}>{project.status}</span>
                      <div className="flex items-center gap-2"><div className="w-24 h-1.5 bg-hercules-surface-elevated rounded-full overflow-hidden"><motion.div className="h-full bg-hercules-primary" initial={{ width: 0 }} animate={{ width: `${project.progress}%` }} transition={{ duration: 0.5 }} /></div><span className="text-caption font-mono text-hercules-text-muted w-12 text-right">{project.progress}%</span></div>
                      <span className="text-body-sm text-hercules-text-dim">{project.taskIds.length}</span>
                      <span className="text-body-sm text-hercules-text-dim">{project.agentIds.length} agents, {project.departmentIds.length} depts</span>
                      <span className="text-caption text-hercules-text-dim">{project.startDate ? new Date(project.startDate).toLocaleDateString() : '—'} – {project.endDate ? new Date(project.endDate).toLocaleDateString() : '—'}</span>
                      <div className="flex items-center justify-end gap-1"><button className="p-1.5 rounded-lg hover:bg-hercules-surface-elevated/50" onClick={() => setCurrentProject(project.id)}><ArrowRight className="w-4 h-4" /></button><button className="p-1.5 rounded-lg hover:bg-hercules-error/20 text-hercules-error" onClick={() => openModal('settings', { section: 'projects', action: 'delete', id: project.id })}><Trash2 className="w-4 h-4" /></button></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {viewMode === 'timeline' && (
              <div className="glass rounded-xl border border-hercules-border/50 p-6">
                <div className="space-y-6">
                  {filteredProjects.map((project, index) => (
                    <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05, duration: 0.3 }} className="relative pl-8 border-l-2 border-hercules-border/30">
                      <div className="absolute left-[-10px] top-2 w-4 h-4 rounded-full border-2 border-hercules-border bg-hercules-background" style={{ borderColor: project.status === 'active' ? 'var(--hercules-success)' : project.status === 'completed' ? 'var(--hercules-primary)' : project.status === 'planning' ? 'var(--hercules-info)' : 'var(--hercules-warning)' }} />
                      <div className="glass p-4 rounded-xl border border-hercules-border/50 hover:border-hercules-primary/30 transition-colors" onClick={() => setCurrentProject(project.id)}>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className={clsx('badge badge-sm', project.status === 'active' ? 'badge-success' : project.status === 'planning' ? 'badge-primary' : project.status === 'on-hold' ? 'badge-warning' : 'badge-neutral')}>{project.status}</span>
                              <span className="text-caption text-hercules-text-dim">{project.startDate ? new Date(project.startDate).toLocaleDateString() : '—'} – {project.endDate ? new Date(project.endDate).toLocaleDateString() : '—'}</span>
                            </div>
                            <p className="font-medium text-body text-hercules-text mb-1">{project.name}</p>
                            <p className="text-body-sm text-hercules-text-muted mb-3">{project.description}</p>
                            <div className="flex items-center gap-4 text-caption text-hercules-text-dim">
                              <span>{project.taskIds.length} tasks</span>
                              <span>{project.agentIds.length} agents</span>
                              <span>{project.departmentIds.length} departments</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-1.5 bg-hercules-surface-elevated rounded-full overflow-hidden"><motion.div className="h-full bg-hercules-primary" initial={{ width: 0 }} animate={{ width: `${project.progress}%` }} transition={{ duration: 0.5 }} /></div>
                            <span className="text-caption font-mono text-hercules-text-muted w-12 text-right">{project.progress}%</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center h-64 text-center">
            <FolderOpen className="w-16 h-16 text-hercules-text-dim mb-4" />
            <h3 className="font-medium text-body text-hercules-text mb-1">No projects found</h3>
            <p className="text-body-sm text-hercules-text-muted">Try adjusting your search or filters</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }: { label: string; value: number; icon: React.ComponentType<{ className?: string }>; color: string }) {
  return <motion.div whileHover={{ y: -2 }} className="glass px-4 py-3 rounded-xl border border-hercules-border/50 flex items-center gap-3 min-w-[140px]"><div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center', `${color}/20`)}><Icon className={clsx('w-5 h-5', color)} /></div><div><p className="text-heading-md font-bold text-hercules-text">{value}</p><p className="text-caption text-hercules-text-dim">{label}</p></div></motion.div>;
}

function ProjectCard({ project, tasks, agents, departments, onClick }: { project: any; tasks: any[]; agents: any[]; departments: any[]; onClick: () => void }) {
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  return (
    <motion.button whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }} onClick={onClick} className="glass p-5 rounded-xl border border-hercules-border/50 hover:border-hercules-primary/30 transition-all h-full flex flex-col">
      <div className="flex items-start justify-between mb-3"><div className="w-12 h-12 rounded-xl bg-hercules-primary/15 flex items-center justify-center"><FolderOpen className="w-6 h-6 text-hercules-primary" /></div><span className={clsx('badge badge-sm', project.status === 'active' ? 'badge-success' : project.status === 'planning' ? 'badge-primary' : project.status === 'on-hold' ? 'badge-warning' : 'badge-neutral')}>{project.status}</span></div>
      <div className="flex-1 mb-4"><p className="font-medium text-body text-hercules-text truncate">{project.name}</p><p className="text-body-sm text-hercules-text-muted line-clamp-2 mt-1">{project.description}</p></div>
      <div className="mb-4"><div className="flex items-center justify-between mb-1"><span className="text-caption text-hercules-text-dim">Progress</span><span className="text-caption font-mono text-hercules-text-muted">{project.progress}%</span></div><div className="h-1.5 bg-hercules-surface-elevated rounded-full overflow-hidden"><motion.div className="h-full bg-hercules-primary" initial={{ width: 0 }} animate={{ width: `${project.progress}%` }} transition={{ duration: 0.8 }} /></div></div>
      <div className="flex items-center gap-4 text-caption text-hercules-text-dim border-t border-hercules-border/30 pt-4">
        <span className="flex items-center gap-1"><FileText className="w-3 h-3" />{project.taskIds.length} tasks ({completedTasks} done)</span>
        <span className="flex items-center gap-1"><Users className="w-3 h-3" />{project.agentIds.length} agents</span>
        <span className="flex items-center gap-1"><Box className="w-3 h-3" />{project.departmentIds.length} depts</span>
      </div>
    </motion.button>
  );
}

import { Grid, List, ChevronUp, Activity, Box, Bot } from 'lucide-react';