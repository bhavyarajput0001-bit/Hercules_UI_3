'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Palette, Layers, Mic, Volume2, Database, Shield, Link, Key, Bell, User, Moon, Monitor, Save, Trash2, Edit, Copy, Download, Upload, Plus, Minus, Check, AlertCircle, Info, AlertTriangle, XCircle } from 'lucide-react';
import { useAppStore, useThemes, useHologramPresets, usePermissions } from '@/store';
import { themes } from '@/services/themeEngine';
import { hologramPresets } from '@/services/hologramPresets';
import clsx from 'clsx';

interface ModalProps {
  type: string;
  data?: unknown;
  onClose: () => void;
}

export function Modal({ type, data, onClose }: ModalProps) {
  const availableThemes = useThemes();
  const availableHolograms = useHologramPresets();
  const permissions = usePermissions();
  const { setSelectedTheme, setSelectedHologram } = useAppStore();

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderContent = () => {
    switch (type) {
      case 'settings':
        return renderSettingsModal(data as { section?: string } | undefined);
      case 'confirm-logout':
        return renderConfirmLogout();
      case 'agent-detail':
        return renderAgentDetail(data as { agentId: string } | undefined);
      case 'task-detail':
        return renderTaskDetail(data as { taskId: string } | undefined);
      case 'permission-request':
        return renderPermissionRequest(data as { permissionId: string } | undefined);
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal-backdrop fixed inset-0 z-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="modal-content fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-modal glass-overlay rounded-2xl shadow-depth-4 max-h-[90vh] max-w-[90vw] w-full"
        onClick={e => e.stopPropagation()}
      >
        {renderContent()}
      </motion.div>
    </motion.div>
  );
}

function renderSettingsModal(data?: { section?: string }) {
  const activeSection = data?.section || 'general';
  const sections = [
    { id: 'general', label: 'General', icon: Monitor },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'hologram', label: 'Hologram', icon: Layers },
    { id: 'voice', label: 'Voice', icon: Mic },
    { id: 'memory', label: 'Memory', icon: Database },
    { id: 'system', label: 'System', icon: Monitor },
    { id: 'permissions', label: 'Permissions', icon: Shield },
    { id: 'integrations', label: 'Integrations', icon: Link },
    { id: 'backend', label: 'Backend', icon: Key },
    { id: 'security', label: 'Security', icon: AlertCircle },
  ];

  return (
    <div className="flex flex-col h-[70vh] w-[800px]">
      <div className="flex items-center justify-between p-4 border-b border-hercules-border/50">
        <h2 id="modal-title" className="text-heading-md font-semibold text-hercules-text">Settings</h2>
        <button
          onClick={onClose}
          className="p-2 rounded-xl glass hover:bg-hercules-surface-elevated/50 transition-colors"
          aria-label="Close settings"
        >
          <X className="w-5 h-5 text-hercules-text-muted" />
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <nav className="w-56 border-r border-hercules-border/50 p-4 overflow-y-auto" aria-label="Settings sections">
          <ul className="space-y-1" role="list">
            {sections.map(section => {
              const Icon = section.icon;
              return (
                <li key={section.id}>
                  <button
                    onClick={() => useAppStore.getState().openModal('settings', { section: section.id })}
                    className={clsx(
                      'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors',
                      'hover:bg-hercules-surface-elevated/50',
                      activeSection === section.id && 'bg-hercules-primary/15 text-hercules-primary border border-hercules-primary/30'
                    )}
                    role="tab"
                    aria-selected={activeSection === section.id}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium text-body-sm">{section.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex-1 p-6 overflow-y-auto">
          {activeSection === 'general' && <GeneralSettings />}
          {activeSection === 'appearance' && <AppearanceSettings />}
          {activeSection === 'hologram' && <HologramSettings />}
          {activeSection === 'voice' && <VoiceSettings />}
          {activeSection === 'memory' && <MemorySettings />}
          {activeSection === 'system' && <SystemSettings />}
          {activeSection === 'permissions' && <PermissionsSettings />}
          {activeSection === 'integrations' && <IntegrationsSettings />}
          {activeSection === 'backend' && <BackendSettings />}
          {activeSection === 'security' && <SecuritySettings />}
        </div>
      </div>
    </div>
  );
}

function GeneralSettings() {
  return (
    <div className="space-y-6 max-w-2xl">
      <h3 className="text-heading-sm font-semibold text-hercules-text">General</h3>
      <div className="space-y-4">
        <div>
          <label className="label">Startup Module</label>
          <select className="input" defaultValue="home">
            <option value="home">Home / Core</option>
            <option value="command">Command Center</option>
            <option value="chat">Chat</option>
          </select>
        </div>
        <div>
          <label className="label">Language</label>
          <select className="input" defaultValue="en-US">
            <option value="en-US">English (US)</option>
            <option value="en-GB">English (UK)</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-body-sm font-medium text-hercules-text">Auto-start on login</p>
            <p className="text-caption text-hercules-text-dim">Launch HERCULES when system starts</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-hercules-border peer-focus:ring-2 peer-focus:ring-hercules-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-hercules-primary"></div>
          </label>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-body-sm font-medium text-hercules-text">Anonymous usage analytics</p>
            <p className="text-caption text-hercules-text-dim">Help improve HERCULES with usage data</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-hercules-border peer-focus:ring-2 peer-focus:ring-hercules-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-hercules-primary"></div>
          </label>
        </div>
      </div>
    </div>
  );
}

function AppearanceSettings() {
  const availableThemes = useThemes();
  const selectedThemeId = useAppStore.getState().selectedTheme;

  return (
    <div className="space-y-6 max-w-2xl">
      <h3 className="text-heading-sm font-semibold text-hercules-text">Appearance</h3>
      <div>
        <label className="label">Color Theme</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {availableThemes.map(theme => (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme.id)}
              className={clsx(
                'p-4 rounded-xl border-2 transition-all',
                'hover:border-hercules-primary/50',
                selectedThemeId === theme.id ? 'border-hercules-primary bg-hercules-primary/10' : 'border-hercules-border hover:border-hercules-border/80'
              )}
              role="radio"
              aria-checked={selectedThemeId === theme.id}
            >
              <div className="h-16 rounded-lg mb-3" style={{ background: theme.preview }} />
              <p className="font-medium text-body-sm text-hercules-text">{theme.name}</p>
              <p className="text-caption text-hercules-text-dim">{theme.description}</p>
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="label">Density</label>
        <div className="flex gap-3">
          {['Compact', 'Comfortable', 'Spacious'].map((density, i) => (
            <button
              key={density}
              className={clsx(
                'flex-1 p-3 rounded-xl border-2 transition-all text-left',
                i === 1 ? 'border-hercules-primary bg-hercules-primary/10' : 'border-hercules-border hover:border-hercules-border/80'
              )}
            >
              <p className="font-medium text-body-sm text-hercules-text">{density}</p>
              <p className="text-caption text-hercules-text-dim">UI spacing {density.toLowerCase()}</p>
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-body-sm font-medium text-hercules-text">Reduced motion</p>
          <p className="text-caption text-hercules-text-dim">Minimize animations for accessibility</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" />
          <div className="w-11 h-6 bg-hercules-border peer-focus:ring-2 peer-focus:ring-hercules-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-hercules-primary"></div>
        </label>
      </div>
    </div>
  );
}

function HologramSettings() {
  const availableHolograms = useHologramPresets();
  const selectedHologramId = useAppStore.getState().selectedHologram;

  return (
    <div className="space-y-6 max-w-2xl">
      <h3 className="text-heading-sm font-semibold text-hercules-text">Hologram Identity</h3>
      <p className="text-body-sm text-hercules-text-muted">Choose your HERCULES visual identity</p>
      <div className="grid grid-cols-2 gap-4">
        {availableHolograms.map(hologram => (
          <button
            key={hologram.id}
            onClick={() => setSelectedHologram(hologram.id)}
            className={clsx(
              'p-4 rounded-xl border-2 transition-all text-left',
              'hover:border-hercules-primary/50',
              selectedHologramId === hologram.id ? 'border-hercules-primary bg-hercules-primary/10' : 'border-hercules-border'
            )}
            role="radio"
            aria-checked={selectedHologramId === hologram.id}
          >
            <div className="h-16 rounded-lg mb-3" style={{ background: hologram.preview }} />
            <p className="font-medium text-body-sm text-hercules-text">{hologram.name}</p>
            <p className="text-caption text-hercules-text-dim">{hologram.description}</p>
          </button>
        ))}
      </div>
      <div className="space-y-4">
        <h4 className="text-body-sm font-medium text-hercules-text">Behavior</h4>
        <div className="space-y-2">
          {['Idle breathing', 'Audio reactivity', 'Particle density', 'Glow intensity'].map((setting, i) => (
            <div key={setting} className="flex items-center gap-3">
              <span className="w-40 text-body-sm text-hercules-text-muted">{setting}</span>
              <input type="range" min="0" max="100" defaultValue={50 + i * 10} className="flex-1 accent-hercules-primary" />
              <span className="w-12 text-caption font-mono text-hercules-text-dim">50%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VoiceSettings() {
  return (
    <div className="space-y-6 max-w-2xl">
      <h3 className="text-heading-sm font-semibold text-hercules-text">Voice</h3>
      <div className="space-y-4">
        <div>
          <label className="label">Provider</label>
          <select className="input" defaultValue="whisper">
            <option value="whisper">Whisper (Local)</option>
            <option value="omniroute">Omniroute (Cloud)</option>
            <option value="system">System Default</option>
          </select>
        </div>
        <div>
          <label className="label">Voice</label>
          <select className="input" defaultValue="nova">
            <option value="nova">Nova (Default)</option>
            <option value="onyx">Onyx</option>
            <option value="echo">Echo</option>
            <option value="fable">Fable</option>
            <option value="alloy">Alloy</option>
            <option value="shimmer">Shimmer</option>
          </select>
        </div>
        <div>
          <label className="label">Wake Word</label>
          <input type="text" className="input" defaultValue="Hercules" placeholder="Wake word" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-body-sm text-hercules-text">Speech Rate</span>
            <span className="text-caption font-mono text-hercules-text-dim">1.0x</span>
          </div>
          <input type="range" min="0.5" max="2" step="0.1" defaultValue={1} className="w-full accent-hercules-primary" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-body-sm text-hercules-text">Volume</span>
            <span className="text-caption font-mono text-hercules-text-dim">80%</span>
          </div>
          <input type="range" min="0" max="100" defaultValue={80} className="w-full accent-hercules-primary" />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-body-sm font-medium text-hercules-text">Always listening</p>
            <p className="text-caption text-hercules-text-dim">Keep microphone active for wake word</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-hercules-border peer-focus:ring-2 peer-focus:ring-hercules-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-hercules-primary"></div>
          </label>
        </div>
      </div>
    </div>
  );
}

function MemorySettings() {
  return (
    <div className="space-y-6 max-w-2xl">
      <h3 className="text-heading-sm font-semibold text-hercules-text">Memory & Privacy</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-body-sm font-medium text-hercules-text">Local memory only</p>
            <p className="text-caption text-hercules-text-dim">Store all memories locally, no cloud sync</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-hercules-border peer-focus:ring-2 peer-focus:ring-hercules-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-hercules-primary"></div>
          </label>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-body-sm font-medium text-hercules-text">Obsidian vault sync</p>
            <p className="text-caption text-hercules-text-dim">Sync memories to ~/Documents/Obsidian/Claude-Memory</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-hercules-border peer-focus:ring-2 peer-focus:ring-hercules-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-hercules-primary"></div>
          </label>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-body-sm font-medium text-hercules-text">GitHub memory repository</p>
            <p className="text-caption text-hercules-text-dim">Backup memories to private GitHub repo</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-hercules-border peer-focus:ring-2 peer-focus:ring-hercules-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-hercules-primary"></div>
          </label>
        </div>
        <div>
          <label className="label">Memory retention</label>
          <select className="input" defaultValue="forever">
            <option value="forever">Forever (default)</option>
            <option value="1year">1 year</option>
            <option value="6months">6 months</option>
            <option value="30days">30 days</option>
          </select>
        </div>
        <button className="btn-danger w-full justify-center">
          <Trash2 className="w-4 h-4" />
          Clear All Memories
        </button>
      </div>
    </div>
  );
}

function SystemSettings() {
  return (
    <div className="space-y-6 max-w-2xl">
      <h3 className="text-heading-sm font-semibold text-hercules-text">System</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-body-sm font-medium text-hercules-text">Hardware acceleration</p>
            <p className="text-caption text-hercules-text-dim">Use GPU for hologram rendering</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-hercules-border peer-focus:ring-2 peer-focus:ring-hercules-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-hercules-primary"></div>
          </label>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-body-sm font-medium text-hercules-text">Background processing</p>
            <p className="text-caption text-hercules-text-dim">Allow agents to run when window minimized</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-hercules-border peer-focus:ring-2 peer-focus:ring-hercules-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-hercules-primary"></div>
          </label>
        </div>
        <div>
          <label className="label">Update channel</label>
          <select className="input" defaultValue="stable">
            <option value="stable">Stable</option>
            <option value="beta">Beta</option>
            <option value="nightly">Nightly</option>
          </select>
        </div>
        <button className="btn-secondary w-full justify-center">Check for Updates</button>
      </div>
    </div>
  );
}

function PermissionsSettings() {
  const permissions = usePermissions();

  return (
    <div className="space-y-6 max-w-2xl">
      <h3 className="text-heading-sm font-semibold text-hercules-text">Permissions</h3>
      <p className="text-body-sm text-hercules-text-muted">Control what HERCULES can access on your system</p>
      <div className="space-y-3">
        {permissions.map(permission => (
          <div
            key={permission.id}
            className="flex items-center justify-between p-4 glass rounded-xl border border-hercules-border/50"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-hercules-primary/20 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-hercules-primary" />
              </div>
              <div>
                <p className="font-medium text-body-sm text-hercules-text">{permission.name}</p>
                <p className="text-caption text-hercules-text-dim">{permission.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={clsx(
                'badge',
                permission.status === 'granted' && 'badge-success',
                permission.status === 'denied' && 'badge-error',
                permission.status === 'not-configured' && 'badge-neutral',
                permission.status === 'requesting' && 'badge-warning'
              )}>
                {permission.status.charAt(0).toUpperCase() + permission.status.slice(1).replace('-', ' ')}
              </span>
              {permission.status !== 'granted' && (
                <button
                  className="btn-primary text-body-sm"
                  onClick={() => useAppStore.getState().openModal('permission-request', { permissionId: permission.id })}
                >
                  {permission.status === 'requesting' ? 'Requesting...' : 'Request Access'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IntegrationsSettings() {
  return (
    <div className="space-y-6 max-w-2xl">
      <h3 className="text-heading-sm font-semibold text-hercules-text">Integrations</h3>
      <div className="space-y-4">
        {['Ollama', 'Omniroute', 'Supabase', 'GitHub', 'Spotify', 'Discord', 'Slack', 'Notion', 'Obsidian'].map(name => (
          <div key={name} className="flex items-center justify-between p-4 glass rounded-xl border border-hercules-border/50">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-hercules-surface-elevated flex items-center justify-center">
                <Link className="w-5 h-5 text-hercules-text-muted" />
              </div>
              <div>
                <p className="font-medium text-body-sm text-hercules-text">{name}</p>
                <p className="text-caption text-hercules-text-dim">{name === 'Ollama' ? 'Local LLM inference' : name === 'Omniroute' ? 'Cloud model routing' : 'External service integration'}</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked={['Ollama', 'Omniroute', 'Supabase'].includes(name)} />
              <div className="w-11 h-6 bg-hercules-border peer-focus:ring-2 peer-focus:ring-hercules-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-hercules-primary"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

function BackendSettings() {
  return (
    <div className="space-y-6 max-w-2xl">
      <h3 className="text-heading-sm font-semibold text-hercules-text">Backend Mode</h3>
      <p className="text-body-sm text-hercules-text-muted">Choose how HERCULES connects to backend services</p>
      <div className="grid grid-cols-3 gap-4">
        {[
          { id: 'demo', label: 'Demo Mode', description: 'Full mock data, no backend needed', icon: Zap },
          { id: 'local', label: 'Local Mode', description: 'Connect to local Ollama + Supabase', icon: Monitor },
          { id: 'cloud', label: 'Cloud Mode', description: 'Full cloud orchestration', icon: Globe },
        ].map(mode => (
          <button
            key={mode.id}
            className={clsx(
              'p-4 rounded-xl border-2 transition-all text-left h-full',
              'hover:border-hercules-primary/50',
              mode.id === 'demo' ? 'border-hercules-primary bg-hercules-primary/10' : 'border-hercules-border'
            )}
            role="radio"
            aria-checked={mode.id === 'demo'}
          >
            <mode.icon className="w-6 h-6 text-hercules-primary mb-2" />
            <p className="font-medium text-body-sm text-hercules-text">{mode.label}</p>
            <p className="text-caption text-hercules-text-dim">{mode.description}</p>
          </button>
        ))}
      </div>
      <div className="pt-4 border-t border-hercules-border/30">
        <h4 className="text-body-sm font-medium text-hercules-text mb-3">Local Backend Configuration</h4>
        <div className="space-y-3">
          <div>
            <label className="label">Ollama Endpoint</label>
            <input type="text" className="input" defaultValue="http://localhost:11434" placeholder="http://localhost:11434" />
          </div>
          <div>
            <label className="label">Supabase URL</label>
            <input type="text" className="input" defaultValue="https://qyfgrtbprklunmzfalid.supabase.co" placeholder="Supabase project URL" />
          </div>
          <div>
            <label className="label">Supabase Anon Key</label>
            <input type="password" className="input" placeholder="eyJhbGciOi..." />
          </div>
        </div>
      </div>
    </div>
  );
}

function SecuritySettings() {
  return (
    <div className="space-y-6 max-w-2xl">
      <h3 className="text-heading-sm font-semibold text-hercules-text">Security</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-body-sm font-medium text-hercules-text">Require authentication</p>
            <p className="text-caption text-hercules-text-dim">Lock HERCULES after inactivity</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-hercules-border peer-focus:ring-2 peer-focus:ring-hercules-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-hercules-primary"></div>
          </label>
        </div>
        <div>
          <label className="label">Auto-lock timeout</label>
          <select className="input" defaultValue="15">
            <option value="5">5 minutes</option>
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="never">Never</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-body-sm font-medium text-hercules-text">Biometric unlock</p>
            <p className="text-caption text-hercules-text-dim">Use Touch ID / Face ID / Windows Hello</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-hercules-border peer-focus:ring-2 peer-focus:ring-hercules-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-hercules-primary"></div>
          </label>
        </div>
        <button className="btn-danger w-full justify-center">
          <Trash2 className="w-4 h-4" />
          Revoke All Sessions
        </button>
        <button className="btn-secondary w-full justify-center">
          <Key className="w-4 h-4" />
          Export Security Keys
        </button>
      </div>
    </div>
  );
}

function renderConfirmLogout() {
  return (
    <div className="p-6 max-w-md text-center">
      <AlertTriangle className="w-16 h-16 mx-auto text-hercules-warning mb-4" />
      <h2 id="modal-title" className="text-heading-lg font-semibold text-hercules-text mb-2">Sign Out?</h2>
      <p className="text-body text-hercules-text-muted mb-6">Are you sure you want to sign out? Your current session will end.</p>
      <div className="flex gap-3 justify-center">
        <button onClick={onClose} className="btn-secondary">Cancel</button>
        <button onClick={onClose} className="btn-danger">Sign Out</button>
      </div>
    </div>
  );
}

function renderAgentDetail(data?: { agentId: string }) {
  return (
    <div className="p-6 max-w-2xl">
      <div className="flex items-center justify-between mb-4">
        <h2 id="modal-title" className="text-heading-lg font-semibold text-hercules-text">Agent Details</h2>
        <button onClick={onClose} className="p-2 rounded-xl glass hover:bg-hercules-surface-elevated/50"><X className="w-5 h-5" /></button>
      </div>
      <div className="space-y-4 text-body-sm text-hercules-text-muted">
        <p>Agent detail view for {data?.agentId || 'unknown'}</p>
        <p className="text-caption">Full implementation coming in Agents module</p>
      </div>
    </div>
  );
}

function renderTaskDetail(data?: { taskId: string }) {
  return (
    <div className="p-6 max-w-2xl">
      <div className="flex items-center justify-between mb-4">
        <h2 id="modal-title" className="text-heading-lg font-semibold text-hercules-text">Task Details</h2>
        <button onClick={onClose} className="p-2 rounded-xl glass hover:bg-hercules-surface-elevated/50"><X className="w-5 h-5" /></button>
      </div>
      <div className="space-y-4 text-body-sm text-hercules-text-muted">
        <p>Task detail view for {data?.taskId || 'unknown'}</p>
        <p className="text-caption">Full implementation coming in Tasks module</p>
      </div>
    </div>
  );
}

function renderPermissionRequest(data?: { permissionId: string }) {
  const permission = permissions.find(p => p.id === data?.permissionId);
  return (
    <div className="p-6 max-w-md">
      <div className="flex items-center justify-between mb-4">
        <h2 id="modal-title" className="text-heading-lg font-semibold text-hercules-text">Permission Request</h2>
        <button onClick={onClose} className="p-2 rounded-xl glass hover:bg-hercules-surface-elevated/50"><X className="w-5 h-5" /></button>
      </div>
      {permission && (
        <div className="space-y-4">
          <div className="p-4 glass rounded-xl border border-hercules-border/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-hercules-primary/20 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-hercules-primary" />
              </div>
              <div>
                <p className="font-medium text-body-sm text-hercules-text">{permission.name}</p>
                <p className="text-caption text-hercules-text-dim">{permission.description}</p>
              </div>
            </div>
            <p className="text-body-sm text-hercules-text-muted">
              HERCULES is requesting access to {permission.name.toLowerCase()} for {permission.category} functionality.
            </p>
          </div>
          <div className="flex gap-3">
            <button onClick={onClose} className="btn-danger flex-1 justify-center">Deny</button>
            <button className="btn-primary flex-1 justify-center">Allow</button>
          </div>
        </div>
      )}
    </div>
  );
}