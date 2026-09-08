'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Bot, Zap, Settings, Play, Pause, Square, Trash2, Edit, Plus, Search, Filter, ChevronDown, MoreHorizontal, CheckCircle, AlertCircle, Clock, Cpu, MemoryStick, Network, Activity, X } from 'lucide-react';
import { useAppStore, useAgents, useTasks } from '@/store';
import { AgentCard } from '@/components/ui/AgentCard';
import { Modal } from '@/components/ui/Modal';
import clsx from 'clsx';

const statusOptions = ['all', 'active', 'busy', 'idle', 'offline', 'error'] as const;
const sortOptions = ['name', 'status', 'model', 'tasks', 'created'] as const;

export function AgentsScreen() {
  const agents = useAgents();
  const tasks = useTasks();
  const { openModal, setCurrentAgent, spawnAgent, terminateAgent } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'busy' | 'idle' | 'offline' | 'error'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'status' | 'model' | 'tasks' | 'created'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showSpawnModal, setShowSpawnModal] = useState(false);

  const filteredAgents = useMemo(() => {
    let result = agents.filter(agent => {
      if (searchQuery && !agent.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !agent.role.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !agent.model.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (statusFilter !== 'all' && agent.status !== statusFilter) {
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
        case 'model': aVal = a.model; bVal = b.model; break;
        case 'tasks': aVal = a.currentTasks.length; bVal = b.currentTasks.length; break;
        case 'created': aVal = new Date(a.createdAt).getTime(); bVal = new Date(b.createdAt).getTime(); break;
      }
      if (typeof aVal === 'string') {
        return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    });
    return result;
  }, [agents, searchQuery, statusFilter, sortBy, sortOrder]);

  const agentStats = useMemo(() => ({
    total: agents.length,
    active: agents.filter(a => a.status === 'active').length,
    busy: agents.filter(a => a.status === 'busy').length,
    idle: agents.filter(a => a.status === 'idle').length,
    offline: agents.filter(a => a.status === 'offline').length,
    error: agents.filter(a => a.status === 'error').length,
  }), [agents]);

  return (
    <div className="agents-screen h-full w-full flex flex-col overflow-hidden">
      <div className="p-4 md:p-6 border-b border-hercules-border/30 flex-shrink-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <h1 className="font-display font-bold text-heading-lg text-hercules-text">Agents</h1>
            <p className="text-body-sm text-hercules-text-muted">Manage and monitor AI agents</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowSpawnModal(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Spawn Agent
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
              placeholder="Search agents..."
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
              aria-label={sortOrder === 'asc' ? 'Sort descending' : 'Sort ascending'}
            >
              {sortOrder === 'asc' ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-1 p-1 glass rounded-xl border border-hercules-border/50">
              <button
                onClick={() => setViewMode('grid')}
                className={clsx('p-2 rounded-lg transition-colors', viewMode === 'grid' && 'bg-hercules-primary/20 text-hercules-primary')}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={clsx('p-2 rounded-lg transition-colors', viewMode === 'list' && 'bg-hercules-primary/20 text-hercules-primary')}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-4" role="status" aria-label="Agent statistics">
          <StatCard label="Total" value={agentStats.total} icon=Users color="text-hercules-text" />
          <StatCard label="Active" value={agentStats.active} icon=CheckCircle color="text-hercules-success" />
          <StatCard label="Busy" value={agentStats.busy} icon=Activity color="text-hercules-warning" />
          <StatCard label="Idle" value={agentStats.idle} icon=Clock color="text-hercules-text-dim" />
          <StatCard label="Offline" value={agentStats.offline} icon=XCircle color="text-hercules-text-dim" />
          <StatCard label="Errors" value={agentStats.error} icon=AlertCircle color="text-hercules-error" />
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredAgents.map((agent, index) => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.03, duration: 0.3 }}
                  >
                    <AgentCard
                      agent={agent}
                      onClick={() => setCurrentAgent(agent.id)}
                      onTerminate={() => terminateAgent(agent.id)}
                      onEdit={() => openModal('agent-detail', { agentId: agent.id })}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="glass rounded-xl border border-hercules-border/50 overflow-hidden">
                <div className="grid grid-cols-[60px_1fr_120px_100px_100px_120px_60px] px-4 py-3 text-caption font-medium uppercase tracking-wider text-hercules-text-dim border-b border-hercules-border/30">
                  <div>Avatar</div>
                  <div>Agent</div>
                  <div>Status</div>
                  <div>Model</div>
                  <div>Tasks</div>
                  <div>Created</div>
                  <div>Actions</div>
                </div>
                <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
                  {filteredAgents.map((agent, index) => (
                    <motion.div
                      key={agent.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.02, duration: 0.2 }}
                      className="grid grid-cols-[60px_1fr_120px_100px_100px_120px_60px] px-4 py-3 items-center border-b border-hercules-border/20 hover:bg-hercules-surface-elevated/30 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-hercules-primary/20 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-hercules-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-body-sm text-hercules-text truncate">{agent.name}</p>
                        <p className="text-caption text-hercules-text-dim truncate">{agent.role}</p>
                      </div>
                      <span className={clsx('badge badge-sm', agent.status === 'active' ? 'badge-success' : agent.status === 'busy' ? 'badge-warning' : agent.status === 'idle' ? 'badge-neutral' : agent.status === 'offline' ? 'badge-neutral' : 'badge-error')}>
                        {agent.status}
                      </span>
                      <span className="text-body-sm text-hercules-text-muted font-mono">{agent.model}</span>
                      <span className="text-body-sm text-hercules-text-dim">{agent.currentTasks.length}</span>
                      <span className="text-caption text-hercules-text-dim">{new Date(agent.createdAt).toLocaleDateString()}</span>
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-hercules-surface-elevated/50" onClick={() => setCurrentAgent(agent.id)}><Edit className="w-4 h-4" /></button>
                        <button className="p-1.5 rounded-lg hover:bg-hercules-error/20 text-hercules-error" onClick={() => terminateAgent(agent.id)}><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {filteredAgents.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-64 text-center"
          >
            <Bot className="w-16 h-16 text-hercules-text-dim mb-4" />
            <h3 className="font-medium text-body text-hercules-text mb-1">No agents found</h3>
            <p className="text-body-sm text-hercules-text-muted">Try adjusting your search or filters</p>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {showSpawnModal && (
          <SpawnAgentModal onClose={() => setShowSpawnModal(false)} />
        )}
      </AnimatePresence>
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

function SpawnAgentModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    model: 'llama3.2:3b',
    systemPrompt: '',
    capabilities: [] as string[],
  });
  const [step, setStep] = useState(1);

  const templates = [
    { id: 'coder', name: 'Code Assistant', role: 'Software Engineer', model: 'llama3.2:3b', prompt: 'You are an expert software engineer...', capabilities: ['code-generation', 'debugging', 'refactoring', 'testing'] },
    { id: 'researcher', name: 'Research Analyst', role: 'Researcher', model: 'qwen3.5', prompt: 'You are a thorough research analyst...', capabilities: ['web-search', 'summarization', 'fact-checking', 'analysis'] },
    { id: 'creative', name: 'Creative Writer', role: 'Content Creator', model: 'gemma3:1b', prompt: 'You are a creative writer...', capabilities: ['writing', 'editing', 'brainstorming', 'storytelling'] },
    { id: 'analyst', name: 'Data Analyst', role: 'Data Scientist', model: 'llama3.2:3b', prompt: 'You are a data analyst...', capabilities: ['data-analysis', 'visualization', 'statistics', 'reporting'] },
  ];

  if (step === 1) {
    return (
      <Modal type="settings" data={{ section: 'spawn-agent' }} onClose={onClose}>
        <div className="p-6 max-w-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-heading-lg font-semibold text-hercules-text">Spawn New Agent</h2>
            <button onClick={onClose} className="p-2 rounded-xl glass hover:bg-hercules-surface-elevated/50"><X className="w-5 h-5" /></button>
          </div>
          <p className="text-body-sm text-hercules-text-muted mb-6">Choose a template or create a custom agent</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {templates.map(template => (
              <button
                key={template.id}
                onClick={() => { setFormData(template); setStep(2); }}
                className="p-4 rounded-xl glass border border-hercules-border/50 hover:border-hercules-primary/30 transition-colors text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-hercules-primary/15 flex items-center justify-center mb-3">
                  <Bot className="w-6 h-6 text-hercules-primary" />
                </div>
                <p className="font-medium text-body-sm text-hercules-text">{template.name}</p>
                <p className="text-caption text-hercules-text-dim">{template.role}</p>
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep(2)}
            className="btn-secondary w-full justify-center flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Custom Agent
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal type="settings" data={{ section: 'spawn-agent' }} onClose={onClose}>
      <div className="p-6 max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-heading-lg font-semibold text-hercules-text">Configure Agent</h2>
          <button onClick={() => { setStep(1); setFormData({ name: '', role: '', model: 'llama3.2:3b', systemPrompt: '', capabilities: [] }); }} className="p-2 rounded-xl glass hover:bg-hercules-surface-elevated/50"><X className="w-5 h-5" /></button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="label">Name</label>
            <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="input" placeholder="Agent name" />
          </div>
          <div>
            <label className="label">Role</label>
            <input type="text" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="input" placeholder="Role (e.g., Software Engineer)" />
          </div>
          <div>
            <label className="label">Model</label>
            <select value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} className="input">
              <option value="llama3.2:3b">Llama 3.2 3B (Fast)</option>
              <option value="qwen3.5">Qwen 3.5 (Reasoning)</option>
              <option value="gemma3:1b">Gemma 3 1B (Lightweight)</option>
              <option value="minimax-m2.1:cloud">Minimax M2.1 (Cloud)</option>
            </select>
          </div>
          <div>
            <label className="label">System Prompt</label>
            <textarea value={formData.systemPrompt} onChange={e => setFormData({...formData, systemPrompt: e.target.value})} className="input" rows={4} placeholder="Define agent behavior and expertise..." />
          </div>
          <div>
            <label className="label">Capabilities</label>
            <div className="flex flex-wrap gap-2">
              {['code-generation', 'debugging', 'web-search', 'summarization', 'data-analysis', 'writing', 'testing', 'refactoring'].map(cap => (
                <label key={cap} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.capabilities.includes(cap)} onChange={e => setFormData({...formData, capabilities: e.target.checked ? [...formData.capabilities, cap] : formData.capabilities.filter(c => c !== cap)})} className="rounded border-hercules-border" />
                  <span className="text-body-sm text-hercules-text">{cap}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button onClick={() => setStep(1)} className="btn-secondary flex-1 justify-center">Back</button>
            <button onClick={() => { useAppStore.getState().spawnAgent(formData); onClose(); }} className="btn-primary flex-1 justify-center" disabled={!formData.name || !formData.role}>
              <Plus className="w-4 h-4" />
              Spawn Agent
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

import { Users, Grid, List, ChevronUp, XCircle } from 'lucide-react';