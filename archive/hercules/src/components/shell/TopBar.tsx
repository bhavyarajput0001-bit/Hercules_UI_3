'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Monitor, Command, Mic, Bell, Search, Wifi, WifiOff, Bluetooth, Battery, Zap, ChevronDown, User, LogOut, Palette, Layers, Volume2, VolumeX } from 'lucide-react';
import { useAppStore, useHerculesState, useSelectedTheme, useSelectedHologram, useThemes, useHologramPresets, useSidebar, useMediaState, useNotifications } from '@/store';
import { themes } from '@/services/themeEngine';
import { hologramPresets } from '@/services/hologramPresets';
import clsx from 'clsx';

export function TopBar() {
  const herculesState = useHerculesState();
  const selectedThemeId = useSelectedTheme();
  const selectedHologramId = useSelectedHologram();
  const availableThemes = useThemes();
  const availableHolograms = useHologramPresets();
  const { collapsed, toggleSidebar } = useSidebar();
  const mediaState = useMediaState();
  const notifications = useNotifications();
  const { setSelectedTheme, setSelectedHologram, setHerculesState, openCommandPalette, openModal } = useAppStore();

  const [time, setTime] = useState(new Date());
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [hologramMenuOpen, setHologramMenuOpen] = useState(false);
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const currentTheme = availableThemes.find(t => t.id === selectedThemeId) || themes[0];
  const currentHologram = availableHolograms.find(h => h.id === selectedHologramId) || hologramPresets[0];
  const unreadCount = notifications.filter(n => !n.read).length;

  const stateColors: Record<string, string> = {
    idle: 'text-hercules-success',
    listening: 'text-hercules-primary',
    thinking: 'text-hercules-warning',
    speaking: 'text-hercules-accent',
    executing: 'text-hercules-info',
    success: 'text-hercules-success',
    warning: 'text-hercules-warning',
    error: 'text-hercules-error',
    offline: 'text-hercules-text-dim',
  };

  const stateLabels: Record<string, string> = {
    idle: 'IDLE',
    listening: 'LISTENING',
    thinking: 'THINKING',
    speaking: 'SPEAKING',
    executing: 'EXECUTING',
    success: 'SUCCESS',
    warning: 'WARNING',
    error: 'ERROR',
    offline: 'OFFLINE',
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={clsx(
        'top-bar fixed top-0 left-0 right-0 z-fixed h-16',
        'bg-hercules-surface/60 backdrop-blur-2xl border-b border-hercules-border/50',
        'flex items-center justify-between px-4 md:px-6',
        collapsed ? 'left-16' : 'left-72'
      )}
      style={{ transition: 'left 0.3s ease-out-expo' }}
      role="banner"
    >
      <div className="flex items-center gap-4 md:gap-6 flex-1 min-w-0">
        <button
          onClick={toggleSidebar}
          className={clsx(
            'p-2 rounded-xl transition-colors',
            'hover:bg-hercules-surface-elevated/50',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hercules-primary',
            'md:hidden'
          )}
          aria-label="Toggle navigation"
        >
          <Command className="w-5 h-5 text-hercules-text" />
        </button>

        <div className="flex items-center gap-3 hidden sm:flex">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-hercules-primary to-hercules-secondary flex items-center justify-center shadow-glow-sm">
            <Zap className="w-5 h-5 text-hercules-background" />
          </div>
          <span className="font-display font-bold text-heading-md text-hercules-text tracking-tight">HERCULES</span>
          <span className="px-2 py-0.5 text-micro font-medium uppercase tracking-wider bg-hercules-primary/15 text-hercules-primary rounded-full border border-hercules-primary/30">
            AI OS
          </span>
        </div>

        <div className="flex-1 max-w-xl mx-4 md:mx-8">
          <button
            onClick={openCommandPalette}
            className={clsx(
              'command-input-wrapper w-full',
              'glass rounded-xl border border-hercules-border/50',
              'hover:border-hercules-primary/30 transition-colors'
            )}
            aria-label="Global command palette (⌘K)"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-hercules-text-dim" aria-hidden="true" />
            <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 px-2 py-0.5 text-micro font-mono bg-hercules-surface-elevated/50 rounded text-hercules-text-dim">
              <span>⌘</span><span>K</span>
            </kbd>
            <input
              type="text"
              placeholder="Ask Hercules anything..."
              className="command-input"
              readOnly
              onClick={openCommandPalette}
              aria-label="Command input"
            />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <div className="hidden md:flex items-center gap-1 p-1 glass rounded-xl border border-hercules-border/50">
          <button
            onClick={() => setThemeMenuOpen(!themeMenuOpen)}
            onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setThemeMenuOpen(false); }}
            className={clsx(
              'p-2 rounded-lg transition-colors',
              'hover:bg-hercules-surface-elevated/50',
              themeMenuOpen && 'bg-hercules-surface-elevated/50'
            )}
            aria-label="Select theme"
            aria-expanded={themeMenuOpen}
            aria-haspopup="menu"
          >
            <Palette className="w-4 h-4 text-hercules-text-muted" />
          </button>
          <AnimatePresence>
            {themeMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute right-0 top-full mt-2 dropdown min-w-[180px]"
                role="menu"
              >
                {availableThemes.map(theme => (
                  <button
                    key={theme.id}
                    onClick={() => { setSelectedTheme(theme.id); setThemeMenuOpen(false); }}
                    className={clsx(
                      'dropdown-item w-full justify-start',
                      selectedThemeId === theme.id && 'text-hercules-primary bg-hercules-primary/10'
                    )}
                    role="menuitem"
                    aria-selected={selectedThemeId === theme.id}
                  >
                    <div className="w-3 h-3 rounded-full border" style={{ background: theme.preview }} />
                    <span>{theme.name}</span>
                    {selectedThemeId === theme.id && <span className="ml-auto text-micro text-hercules-primary">Active</span>}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="hidden md:flex items-center gap-1 p-1 glass rounded-xl border border-hercules-border/50">
          <button
            onClick={() => setHologramMenuOpen(!hologramMenuOpen)}
            onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setHologramMenuOpen(false); }}
            className={clsx(
              'p-2 rounded-lg transition-colors',
              'hover:bg-hercules-surface-elevated/50',
              hologramMenuOpen && 'bg-hercules-surface-elevated/50'
            )}
            aria-label="Select hologram"
            aria-expanded={hologramMenuOpen}
            aria-haspopup="menu"
          >
            <Layers className="w-4 h-4 text-hercules-text-muted" />
          </button>
          <AnimatePresence>
            {hologramMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute right-0 top-full mt-2 dropdown min-w-[180px]"
                role="menu"
              >
                {availableHolograms.map(hologram => (
                  <button
                    key={hologram.id}
                    onClick={() => { setSelectedHologram(hologram.id); setHologramMenuOpen(false); }}
                    className={clsx(
                      'dropdown-item w-full justify-start',
                      selectedHologramId === hologram.id && 'text-hercules-primary bg-hercules-primary/10'
                    )}
                    role="menuitem"
                    aria-selected={selectedHologramId === hologram.id}
                  >
                    <span className="font-medium">{hologram.name}</span>
                    {selectedHologramId === hologram.id && <span className="ml-auto text-micro text-hercules-primary">Active</span>}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 glass rounded-xl border border-hercules-border/50">
            <span className={clsx('status-dot', herculesState === 'idle' ? 'status-idle' : herculesState === 'listening' ? 'status-active' : herculesState === 'thinking' ? 'status-processing' : herculesState === 'speaking' ? 'status-active' : herculesState === 'executing' ? 'status-processing' : herculesState === 'success' ? 'status-active' : herculesState === 'warning' ? 'status-warning' : herculesState === 'error' ? 'status-error' : 'status-idle')} />
            <span className={clsx('text-caption font-medium uppercase tracking-wider', stateColors[herculesState])}>
              {stateLabels[herculesState]}
            </span>
          </div>

          <button
            onClick={() => {
              const states: Array<keyof typeof stateLabels> = ['idle', 'listening', 'thinking', 'speaking', 'executing', 'success', 'warning', 'error'];
              const currentIndex = states.indexOf(herculesState);
              const nextState = states[(currentIndex + 1) % states.length];
              setHerculesState(nextState);
            }}
            className="hidden lg:p-2 rounded-xl glass hover:bg-hercules-surface-elevated/50 transition-colors"
            aria-label="Cycle HERCULES state (demo)"
            title="Cycle state (demo)"
          >
            <Zap className="w-4 h-4 text-hercules-text-muted" />
          </button>

          <button
            onClick={() => setNotifMenuOpen(!notifMenuOpen)}
            className={clsx(
              'relative p-2 rounded-xl glass hover:bg-hercules-surface-elevated/50 transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hercules-primary'
            )}
            aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
            aria-expanded={notifMenuOpen}
            aria-haspopup="menu"
          >
            <Bell className="w-5 h-5 text-hercules-text-muted" />
            {unreadCount > 0 && (
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-hercules-error text-micro font-medium flex items-center justify-center"
              >
                {unreadCount > 9 ? '9+' : unreadCount}
              </motion.span>
            )}
          </button>

          <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 glass rounded-xl border border-hercules-border/50">
            <Wifi className={clsx('w-4 h-4', mediaState.source?.connected ? 'text-hercules-success' : 'text-hercules-text-dim')} />
            <Bluetooth className="w-4 h-4 text-hercules-text-dim" />
            <Battery className="w-4 h-4 text-hercules-text-dim" />
            <span className="text-caption font-mono tabular-nums text-hercules-text-muted">
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className={clsx(
                'flex items-center gap-2 p-2 rounded-xl glass hover:bg-hercules-surface-elevated/50 transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hercules-primary'
              )}
              aria-label="User menu"
              aria-expanded={userMenuOpen}
              aria-haspopup="menu"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-hercules-primary to-hercules-secondary flex items-center justify-center">
                <User className="w-4 h-4 text-hercules-background" />
              </div>
              <span className="hidden sm:block text-body-sm font-medium text-hercules-text">Commander</span>
              <ChevronDown className="w-4 h-4 text-hercules-text-dim hidden sm:block" />
            </button>
            <AnimatePresence>
              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 dropdown min-w-[200px]"
                  role="menu"
                >
                  <div className="px-4 py-3 border-b border-hercules-border">
                    <p className="text-body-sm font-medium text-hercules-text">Commander</p>
                    <p className="text-micro text-hercules-text-dim">commander@hercules.local</p>
                  </div>
                  <button className="dropdown-item" role="menuitem">
                    <User className="w-4 h-4" />
                    Profile
                  </button>
                  <button className="dropdown-item" role="menuitem" onClick={() => openModal('settings', { section: 'appearance' })}>
                    <Palette className="w-4 h-4" />
                    Appearance
                  </button>
                  <button className="dropdown-item" role="menuitem" onClick={() => openModal('settings', { section: 'voice' })}>
                    <Mic className="w-4 h-4" />
                    Voice
                  </button>
                  <div className="dropdown-divider" />
                  <button className="dropdown-item text-hercules-error" role="menuitem" onClick={() => openModal('confirm-logout', null)}>
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.header>
  );
}