'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Users, Zap, Settings, Plus, Search, Filter, ChevronDown, MoreHorizontal, CheckCircle, AlertCircle, Clock, Activity, BarChart3, Target, ArrowRight, X } from 'lucide-react';
import { useAppStore, useDepartments, useAgents, useTasks } from '@/store';
import { DepartmentCard } from '@/components/ui/DepartmentCard';
import clsx from 'clsx';

const statusOptions = ['all', 'active', 'inactive', 'busy'] as const;
const sortOptions = ['name', 'status', 'agents', 'tasks', 'performance', 'created'] as const;

export function DepartmentsScreen() {
  const departments = useDepartments();
  const agents = useAgents();
  const tasks = useTasks();
  const { openModal, setCurrentDepartment } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'busy'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'status' | 'agents' | 'tasks' | 'performance' | 'created'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredDepartments = useMemo(() => {
    let result = departments.filter(dept => {
      if (searchQuery && !dept.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !dept.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (statusFilter !== 'all' && dept.status !== statusFilter) {
        return false;
      }
      return true;
    });

    result.sort((a, b) => {
      let aVal: string | number = '';
      let bVal: string | number = '';
      switch (sortBy) {
        case 'name': aVal = a.name; bVal = b.name; break;
        case 'status': aVal = a.status; bVal = b.status; break;
        case 'agents': aVal = a.agentIds.length; bVal = b.agentIds.length; break;
        case 'tasks': aVal = a.currentTasks.length; bVal = b.currentTasks.length; break;
        case 'performance': aVal = a.performance; bVal = b.performance; break;
        case 'created': aVal = new Date(a.createdAt).getTime(); bVal = new Date(b.createdAt).getTime(); break;
      }
      if (typeof aVal === 'string') {
        return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    });
    return result;
  }, [departments, searchQuery, statusFilter, sortBy, sortOrder]);

  const deptStats = useMemo(() => ({
    total: departments.length,
    active: departments.filter(d => d.status === 'active').length,
    inactive: departments.filter(d => d.status === 'inactive').length,
    busy: departments.filter(d => d.status === 'busy').length,
    totalAgents: departments.reduce((sum, d) => sum + d.agentIds.length, 0),
    totalTasks: departments.reduce((sum, d) => sum + d.currentTasks.length, 0),
  }), [departments]);

  return (
    <div className="departments-screen h-full w-full flex flex-col overflow-hidden">
      <div className="p-4 md:p-6 border-b border-hercules-border/30 flex-shrink-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <h1 className="font-display font-bold text-heading-lg text-hercules-text">Departments</h1>
            <p className="text-body-sm text-hercules-text-muted">Organize agents into functional teams</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openModal('settings', { section: 'departments', action: 'create' })}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Department
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
              placeholder="Search departments..."
              className="w-full pl-10 pr-4 py-2.5 bg-hercules-surface-elevated/50 border border-hercules-border/50 rounded-xl text-hercules-text placeholder:text-hercules-text-dim focus:outline-none focus:border-hercules-primary focus:ring-2 focus:ring-hercules-primary/20"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as typeof statusFilter)}
              className="px-3 py-2.5 bg-hercules-surface-elevated/50 border border-hercules-border/50 rounded-xl text-hercules-text focus:outline-none focus:border-hercules-primary"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-2.5 bg-hercules-surface-elevated/50 border border-hercules-border/50 rounded-xl text-hercules-text focus:outline-none focus:border-hercules-primary"
            >
              {sortOptions.map(opt => (
                <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
              ))}
            </select>

            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-2.5 rounded-xl glass hover:bg-hercules-surface-elevated/50 transition-colors"
            >
              {sortOrder === 'asc' ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-1 p-1 glass rounded-xl border border-hercules-border/50">
              <button onClick={() => setViewMode('grid')} className={clsx('p-2 rounded-lg transition-colors', viewMode === 'grid' && 'bg-hercules-primary/20 text-hercules-primary')}>
                <Grid className="w-5 h-5" />
              </button>
              <button onClick={() => setViewMode('list')} className={clsx('p-2 rounded-lg transition-colors', viewMode === 'list' && 'bg-hercules-primary/20 text-hercules-primary')}>
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-4" role="status" aria-label="Department statistics">
          <StatCard label="Total" value={deptStats.total} icon=Box color="text-hercules-text" />
          <StatCard label="Active" value={deptStats.active} icon=CheckCircle color="text-hercules-success" />
          <StatCard label="Busy" value={deptStats.busy} icon=Activity color="text-hercules-warning" />
          <StatCard label="Inactive" value={deptStats.inactive} icon=Clock color="text-hercules-text-dim" />
          <StatCard label="Agents" value={deptStats.totalAgents} icon=Users color="text-hercules-primary" />
          <StatCard label="Tasks" value={deptStats.totalTasks} icon=CheckCircle color="text-hercules-info" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDepartments.map((dept, index) => (
                  <motion.div
                    key={dept.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.03, duration: 0.3 }}
                  >
                    <DepartmentCard
                      department={dept}
                      agents={agents.filter(a => dept.agentIds.includes(a.id))}
                      tasks={tasks.filter(t => dept.currentTasks.includes(t.id))}
                      onClick={() => setCurrentDepartment(dept.id)}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="glass rounded-xl border border-hercules-border/50 overflow-hidden">
                <div className="grid grid-cols-[60px_1fr_100px_100px_100px_100px_120px_60px] px-4 py-3 text-caption font-medium uppercase tracking-wider text-hercules-text-dim border-b border-hercules-border/30">
                  <div>Icon</div>
                  <div>Department</div>
                  <div>Status</div>
                  <div>Agents</div>
                  <div>Tasks</div>
                  <div>Performance</div>
                  <div>Created</div>
                  <div>Actions</div>
                </div>
                <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
                  {filteredDepartments.map((dept, index) => (
                    <motion.div
                      key={dept.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.02, duration: 0.2 }}
                      className="grid grid-cols-[60px_1fr_100px_100px_100px_100px_120px_60px] px-4 py-3 items-center border-b border-hercules-border/20 hover:bg-hercules-surface-elevated/30 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-xl bg-hercules-primary/15 flex items-center justify-center">
                        <Box className="w-6 h-6 text-hercules-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-body-sm text-hercules-text truncate">{dept.name}</p>
                        <p className="text-caption text-hercules-text-dim truncate">{dept.description}</p>
                      </div>
                      <span className={clsx('badge badge-sm', dept.status === 'active' ? 'badge-success' : dept.status === 'busy' ? 'badge-warning' : 'badge-neutral')}>
                        {dept.status}
                      </span>
                      <span className="text-body-sm text-hercules-text-dim">{dept.agentIds.length}</span>
                      <span className="text-body-sm text-hercules-text-dim">{dept.currentTasks.length}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-hercules-surface-elevated rounded-full overflow-hidden">
                          <motion.div className="h-full bg-hercules-primary" initial={{ width: 0 }} animate={{ width: `${dept.performance}%` }} transition={{ duration: 0.5 }} />
                        </div>
                        <span className="text-caption font-mono text-hercules-text-muted w-12 text-right">{dept.performance}%</span>
                      </div>
                      <span className="text-caption text-hercules-text-dim">{new Date(dept.createdAt).toLocaleDateString()}</span>
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-hercules-surface-elevated/50" onClick={() => setCurrentDepartment(dept.id)}><ArrowRight className="w-4 h-4" /></button>
                        <button className="p-1.5 rounded-lg hover:bg-hercules-error/20 text-hercules-error" onClick={() => openModal('settings', { section: 'departments', action: 'delete', id: dept.id })}><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {filteredDepartments.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-64 text-center"
          >
            <Box className="w-16 h-16 text-hercules-text-dim mb-4" />
            <h3 className="font-medium text-body text-hercules-text mb-1">No departments found</h3>
            <p className="text-body-sm text-hercules-text-muted">Try adjusting your search or filters</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }: { label: string; value: number; icon: React.ComponentType<{ className?: string }>; color: string }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="glass px-4 py-3 rounded-xl border border-hercules-border/50 flex items-center gap-3 min-w-[140px]"
    >
      <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center', `${color}/20`)}>
        <Icon className={clsx('w-5 h-5', color)} />
      </div>
      <div>
        <p className="text-heading-md font-bold text-hercules-text">{value}</p>
        <p className="text-caption text-hercules-text-dim">{label}</p>
      </div>
    </motion.div>
  );
}

import { Grid, List, ChevronUp, Trash2 } from 'lucide-react';