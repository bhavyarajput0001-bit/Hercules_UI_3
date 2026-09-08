'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Activity, TrendingUp, Target, Brain, Network, Server, Database, Layers, Mic, Volume2, Settings, Play, Pause, Square, RotateCcw, AlertTriangle, CheckCircle, Clock, ArrowUpRight, FileText, Users, FolderOpen, Zap as ZapIcon } from 'lucide-react';
import { useAppStore, useAgents, useTasks, useMetrics, useSystemHealth, useCurrentWorkflow, useRecentActivity, useVoiceState, useHologramPresets, useDemoMode } from '@/store';
import { HologramCore } from '@/components/hologram/HologramCore';
import { modules } from '@/config/modules';
import clsx from 'clsx';

const metricCards = [
  { id: 'cpu', label: 'CPU', value: '12%', unit: '', icon: Zap, trend: '+2%', trendUp: false, color: 'text-hercules-primary' },
  { id: 'memory', label: 'Memory', value: '4.2', unit: 'GB / 16GB', icon: Database, trend: '26%', trendUp: false, color: 'text-hercules-info' },
  { id: 'agents', label: 'Active Agents', value: '7', unit: '/ 12', icon: Users, trend: '+2', trendUp: true, color: 'text-hercules-success' },
  { id: 'tasks', label: 'Tasks Running', value: '3', unit: '', icon: FileText, trend: '-1', trendUp: true, color: 'text-hercules-warning' },
  { id: 'workflows', label: 'Workflows', value: '5', unit: ' active', icon: RotateCcw, trend: '0', trendUp: false, color: 'text-hercules-accent' },
  { id: 'uptime', label: 'Uptime', value: '7d', unit: ' 14h', icon: Clock, trend: '99.9%', trendUp: true, color: 'text-hercules-text-muted' },
];

const quickActions = [
  { id: 'new-task', label: 'New Task', icon: FileText, action: () => useAppStore.getState().setCurrentModule('tasks') },
  { id: 'new-agent', label: 'Spawn Agent', icon: Users, action: () => useAppStore.getState().setCurrentModule('agents') },
  { id: 'new-workflow', label: 'Create Workflow', icon: RotateCcw, action: () => useAppStore.getState().setCurrentModule('automations') },
  { id: 'voice', label: 'Voice Command', icon: Mic, action: () => { const { voiceState, setVoiceState, setHerculesState } = useAppStore.getState(); if (voiceState.state === 'idle') { setVoiceState({ state: 'listening', transcript: '', audioLevel: 0.5 }); setHerculesState('listening'); } } },
  { id: 'settings', label: 'Settings', icon: Settings, action: () => useAppStore.getState().openModal('settings', { section: 'general' }) },
  { id: 'command', label: 'Command Center', icon: ZapIcon, action: () => useAppStore.getState().setCurrentModule('command') },
];

export function HomeScreen() {
  const agents = useAgents();
  const tasks = useTasks();
  const metrics = useMetrics();
  const systemHealth = useSystemHealth();
  const currentWorkflow = useCurrentWorkflow();
  const recentActivity = useRecentActivity();
  const voiceState = useVoiceState();
  const hologramPresets = useHologramPresets();
  const demoMode = useDemoMode();
  const { setSelectedHologram } = useAppStore();
  const [selectedHologram, setSelectedHologramLocal] = useState(hologramPresets[0].id);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const current = hologramPresets.find(h => h.id === useAppStore.getState().selectedHologram) || hologramPresets[0];
    setSelectedHologramLocal(current.id);
  }, [hologramPresets]);

  const activeAgents = agents.filter(a => a.status === 'active' || a.status === 'busy').slice(0, 4);
  const runningTasks = tasks.filter(t => t.status === 'in-progress' || t.status === 'pending').slice(0, 5);
  const recentActivities = recentActivity.slice(0, 6);

  return (
    <div className="home-screen h-full w-full overflow-hidden">
      <div className="h-full w-full grid grid-cols-[1fr_380px] md:grid-cols-[1fr_420px] gap-0">
        <div className="relative h-full flex flex-col overflow-hidden">
          <div className="relative flex-1 min-h-0">
            <HologramCore
              presetId={selectedHologram}
              state={voiceState.state}
              audioLevel={voiceState.audioLevel}
              className="w-full h-full"
            />
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="glass px-4 py-2 rounded-xl border border-hercules-border/50"
                >
                  <div className="flex items-center gap-2">
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className={clsx('w-2 h-2 rounded-full', voiceState.state === 'listening' ? 'bg-hercules-primary' : voiceState.state === 'thinking' ? 'bg-hercules-warning' : voiceState.state === 'speaking' ? 'bg-hercules-accent' : 'bg-hercules-success')}
                    />
                    <span className="text-body-sm font-medium text-hercules-text capitalize">{voiceState.state}</span>
                    {voiceState.transcript && (
                      <span className="text-caption text-hercules-text-dim max-w-xs truncate">"{voiceState.transcript}"</span>
                    )}
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="glass px-4 py-2 rounded-xl border border-hercules-border/50"
                >
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-hercules-primary" />
                    <span className="text-body-sm font-medium text-hercules-text">{hologramPresets.find(h => h.id === selectedHologram)?.name || 'Neural'}</span>
                    <span className="text-caption text-hercules-text-dim">Identity</span>
                  </div>
                </motion.div>
              </div>
              <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-3 md:flex-row md:items-end">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="glass px-4 py-3 rounded-xl border border-hercules-border/50 flex-1"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-caption font-medium uppercase tracking-wider text-hercules-text-dim">Current Workflow</span>
                    {currentWorkflow && (
                      <span className={clsx('badge', currentWorkflow.status === 'running' ? 'badge-success' : currentWorkflow.status === 'pending' ? 'badge-warning' : 'badge-neutral')}>
                        {currentWorkflow.status.toUpperCase()}
                      </span>
                    )}
                  </div>
                  {currentWorkflow ? (
                    <div className="space-y-2">
                      <p className="text-body font-medium text-hercules-text truncate">{currentWorkflow.name}</p>
                      <p className="text-caption text-hercules-text-dim truncate">{currentWorkflow.description}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-hercules-surface-elevated rounded-full overflow-hidden">
                          <motion.div
                            className="progress-fill h-full bg-hercules-primary"
                            initial={{ width: 0 }}
                            animate={{ width: `${currentWorkflow.progress}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                          />
                        </div>
                        <span className="text-caption font-mono text-hercules-text-muted w-16 text-right">{currentWorkflow.progress}%</span>
                      </div>
                      <div className="flex items-center gap-2 text-micro text-hercules-text-dim">
                        <span>{currentWorkflow.currentStep || 'Initializing...'}</span>
                        <span>•</span>
                        <span>{currentWorkflow.agentsAssigned?.length || 0} agents</span>
                        <span>•</span>
                        <span>ETA: {currentWorkflow.estimatedCompletion || '—'}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-body-sm text-hercules-text-muted">No active workflow</p>
                  )}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="glass px-4 py-3 rounded-xl border border-hercules-border/50 flex-1 max-w-xs"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-caption font-medium uppercase tracking-wider text-hercules-text-dim">System Health</span>
                    <span className={clsx('badge', systemHealth.overall === 'healthy' ? 'badge-success' : systemHealth.overall === 'degraded' ? 'badge-warning' : 'badge-error')}>
                      {systemHealth.overall.toUpperCase()}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div>
                      <p className="text-heading-sm font-bold text-hercules-success">{systemHealth.cpu}%</p>
                      <p className="text-micro text-hercules-text-dim">CPU</p>
                    </div>
                    <div>
                      <p className="text-heading-sm font-bold text-hercules-info">{systemHealth.memory}%</p>
                      <p className="text-micro text-hercules-text-dim">Memory</p>
                    </div>
                    <div>
                      <p className="text-heading-sm font-bold text-hercules-primary">{systemHealth.gpu}%</p>
                      <p className="text-micro text-hercules-text-dim">GPU</p>
                    </div>
                    <div>
                      <p className="text-heading-sm font-bold text-hercules-accent">{systemHealth.network}%</p>
                      <p className="text-micro text-hercules-text-dim">Network</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-full flex flex-col overflow-y-auto p-4 md:p-6 gap-4 border-l border-hercules-border/30 bg-hercules-surface/30 backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="font-display font-bold text-heading-xl text-hercules-text tracking-tight">Command Center</h1>
              <p className="text-body-sm text-hercules-text-muted mt-1">Real-time system overview & active operations</p>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedHologramLocal(hologramPresets[(hologramPresets.findIndex(h => h.id === selectedHologram) + 1) % hologramPresets.length].id)}
                className="p-2 rounded-xl glass hover:bg-hercules-surface-elevated/50 transition-colors"
                aria-label="Cycle hologram identity"
              >
                <RotateCcw className="w-5 h-5 text-hercules-text-muted" />
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-3"
            role="list"
            aria-label="System metrics"
          >
            {metricCards.map((metric, index) => (
              <motion.div
                key={metric.id}
                whileHover={{ y: -4, scale: 1.02 }}
                className={clsx(
                  'metric-card glass rounded-xl p-4 border border-hercules-border/50',
                  'hover:border-hercules-primary/30 transition-all duration-300',
                  hoveredCard === metric.id && 'border-hercules-primary/50 shadow-glow-sm'
                )}
                onMouseEnter={() => setHoveredCard(metric.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ transitionDelay: `${index * 0.05}s` }}
                role="listitem"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-hercules-primary/15 flex items-center justify-center">
                      <metric.icon className={clsx('w-5 h-5', metric.color)} />
                    </div>
                    <div>
                      <p className="text-caption text-hercules-text-dim">{metric.label}</p>
                      <div className="flex items-baseline gap-1">
                        <span className="font-mono text-heading-md font-bold text-hercules-text">{metric.value}</span>
                        <span className="text-body-sm text-hercules-text-muted">{metric.unit}</span>
                      </div>
                    </div>
                  </div>
                  <span className={clsx('text-micro font-medium px-2 py-0.5 rounded-full', metric.trendUp ? 'bg-hercules-success/20 text-hercules-success' : 'bg-hercules-error/20 text-hercules-error')}>
                    {metric.trend}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="grid grid-cols-2 gap-3"
          >
            <motion.div
              whileHover={{ y: -2 }}
              className="glass rounded-xl p-4 border border-hercules-border/50 hover:border-hercules-primary/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-body-sm text-hercules-text">Active Agents</h3>
                <button className="text-caption text-hercules-primary hover:underline" onClick={() => useAppStore.getState().setCurrentModule('agents')}>View all</button>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {activeAgents.length > 0 ? (
                  activeAgents.map(agent => (
                    <div key={agent.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-hercules-surface-elevated/50 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-hercules-primary/20 flex items-center justify-center">
                        <Brain className="w-4 h-4 text-hercules-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-body-sm font-medium text-hercules-text truncate">{agent.name}</p>
                        <p className="text-caption text-hercules-text-dim truncate">{agent.role} • {agent.model}</p>
                      </div>
                      <span className={clsx('badge badge-sm', agent.status === 'active' ? 'badge-success' : agent.status === 'busy' ? 'badge-warning' : 'badge-neutral')}>
                        {agent.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-body-sm text-hercules-text-muted text-center py-4">No active agents</p>
                )}
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -2 }}
              className="glass rounded-xl p-4 border border-hercules-border/50 hover:border-hercules-primary/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-body-sm text-hercules-text">Running Tasks</h3>
                <button className="text-caption text-hercules-primary hover:underline" onClick={() => useAppStore.getState().setCurrentModule('tasks')}>View all</button>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {runningTasks.length > 0 ? (
                  runningTasks.map(task => (
                    <div key={task.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-hercules-surface-elevated/50 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-hercules-warning/20 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-hercules-warning" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-body-sm font-medium text-hercules-text truncate">{task.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-1 bg-hercules-surface-elevated rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-hercules-primary"
                              initial={{ width: 0 }}
                              animate={{ width: `${task.progress}%` }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                          <span className="text-micro font-mono text-hercules-text-muted w-12 text-right">{task.progress}%</span>
                        </div>
                      </div>
                      <span className={clsx('badge badge-sm', task.priority === 'critical' ? 'badge-error' : task.priority === 'high' ? 'badge-warning' : 'badge-neutral')}>
                        {task.priority}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-body-sm text-hercules-text-muted text-center py-4">No running tasks</p>
                )}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="glass rounded-xl p-4 border border-hercules-border/50"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-body-sm text-hercules-text">Recent Activity</h3>
              <button className="text-caption text-hercules-primary hover:underline" onClick={() => useAppStore.getState().setCurrentModule('activity')}>View all</button>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05, duration: 0.3 }}
                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-hercules-surface-elevated/50 transition-colors"
                  >
                    <div className={clsx('w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5',
                      activity.type === 'task' ? 'bg-hercules-primary/20 text-hercules-primary' :
                      activity.type === 'agent' ? 'bg-hercules-success/20 text-hercules-success' :
                      activity.type === 'system' ? 'bg-hercules-warning/20 text-hercules-warning' :
                      'bg-hercules-info/20 text-hercules-info'
                    )}>
                      {activity.type === 'task' && <FileText className="w-4 h-4" />}
                      {activity.type === 'agent' && <Brain className="w-4 h-4" />}
                      {activity.type === 'system' && <AlertTriangle className="w-4 h-4" />}
                      {activity.type === 'workflow' && <RotateCcw className="w-4 h-4" />}
                      {activity.type === 'memory' && <Database className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-body-sm text-hercules-text">{activity.description}</p>
                      <p className="text-caption text-hercules-text-dim">{activity.timestamp}</p>
                    </div>
                    {activity.metadata && (
                      <span className="badge badge-sm badge-neutral text-micro">{activity.metadata}</span>
                    )}
                  </motion.div>
                ))
              ) : (
                <p className="text-body-sm text-hercules-text-muted text-center py-4">No recent activity</p>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="glass rounded-xl p-4 border border-hercules-border/50"
          >
            <h3 className="font-medium text-body-sm text-hercules-text mb-3">Quick Actions</h3>
            <div className="grid grid-cols-3 gap-2">
              {quickActions.map((action, index) => (
                <motion.button
                  key={action.id}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={action.action}
                  className="quick-action p-3 rounded-xl glass hover:bg-hercules-surface-elevated/50 border border-hercules-border/50 hover:border-hercules-primary/30 transition-all flex flex-col items-center gap-2 text-center"
                  style={{ transitionDelay: `${index * 0.03}s` }}
                >
                  <div className="w-10 h-10 rounded-xl bg-hercules-primary/15 flex items-center justify-center">
                    <action.icon className="w-5 h-5 text-hercules-primary" />
                  </div>
                  <span className="text-caption font-medium text-hercules-text">{action.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="glass rounded-xl p-4 border border-hercules-border/50"
          >
            <h3 className="font-medium text-body-sm text-hercules-text mb-3">Module Access</h3>
            <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
              {modules.filter(m => m.id !== 'home').map((module, index) => (
                <motion.button
                  key={module.id}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => useAppStore.getState().setCurrentModule(module.id)}
                  className="module-link flex items-center gap-2 p-2 rounded-lg glass hover:bg-hercules-surface-elevated/50 border border-hercules-border/50 hover:border-hercules-primary/30 transition-all text-left"
                  style={{ transitionDelay: `${index * 0.02}s` }}
                >
                  <div className="w-8 h-8 rounded-lg bg-hercules-primary/15 flex items-center justify-center flex-shrink-0">
                    {(() => {
                      const icons: Record<string, React.ComponentType<{ className?: string }>> = {
                        command: ZapIcon,
                        chat: MessageSquare,
                        agents: Users,
                        departments: Box,
                        tasks: FileText,
                        projects: FolderOpen,
                        memory: Database,
                        files: FileText,
                        knowledge: Library,
                        automations: ZapIcon,
                        calendar: Calendar,
                        browser: Globe,
                        terminal: Terminal,
                        system: Server,
                        analytics: BarChart3,
                        activity: Activity,
                        notifications: Bell,
                        settings: Settings,
                      };
                      const Icon = icons[module.icon] || ZapIcon;
                      return <Icon className="w-4 h-4 text-hercules-primary" />;
                    })()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-body-sm font-medium text-hercules-text truncate">{module.label}</p>
                    <p className="text-micro text-hercules-text-dim truncate">{module.description}</p>
                  </div>
                  {module.badge && <span className="badge badge-sm badge-warning">{module.badge}</span>}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

import { MessageSquare, Box, Library, Calendar, Globe, Terminal, Server, BarChart3 } from 'lucide-react';