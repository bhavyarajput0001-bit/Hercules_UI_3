'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight, Zap, Bot, Terminal, Globe, Database, FolderOpen, Users, Layers, Settings, Keyboard, Command as CmdIcon } from 'lucide-react';
import { useAppStore, useCommandSuggestions } from '@/store';
import { modules } from '@/config/modules';
import clsx from 'clsx';

interface CommandPaletteProps {
  onClose: () => void;
  query: string;
  onQueryChange: (query: string) => void;
}

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Navigation: Bot,
  Research: Zap,
  Engineering: Terminal,
  System: Globe,
  Automation: Database,
  Memory: FolderOpen,
  Agents: Users,
  Appearance: Layers,
  Settings: Settings,
  Other: CmdIcon,
};

export function CommandPalette({ onClose, query, onQueryChange }: CommandPaletteProps) {
  const suggestions = useCommandSuggestions();
  const { commandHistory } = useAppStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState(suggestions);

  useEffect(() => {
    inputRef.current?.focus();
    const filtered = suggestions.filter(s =>
      s.command.toLowerCase().includes(query.toLowerCase()) ||
      s.description.toLowerCase().includes(query.toLowerCase()) ||
      s.category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSuggestions(filtered);
    setSelectedIndex(0);
  }, [query, suggestions]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, filteredSuggestions.length + modules.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (selectedIndex < filteredSuggestions.length) {
          const selected = filteredSuggestions[selectedIndex];
          onQueryChange(selected.command);
          onClose();
        } else {
          const moduleIndex = selectedIndex - filteredSuggestions.length;
          const module = modules[moduleIndex];
          if (module) {
            useAppStore.getState().setCurrentModule(module.id);
            onClose();
          }
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredSuggestions.length, onClose, onQueryChange]);

  const allItems = [
    ...filteredSuggestions.map((s, i) => ({ type: 'suggestion' as const, item: s, index: i })),
    ...modules.map((m, i) => ({ type: 'module' as const, item: m, index: i + filteredSuggestions.length })),
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="command-palette fixed top-[15vh] left-1/2 -translate-x-1/2 z-command-palette w-full max-w-2xl"
      role="dialog"
      aria-label="Command palette"
    >
      <div className="glass-overlay rounded-2xl border border-hercules-border/50 overflow-hidden">
        <div className="relative p-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-hercules-text-dim" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => onQueryChange(e.target.value)}
            placeholder="Type a command or search..."
            className="w-full pl-12 pr-10 py-3 bg-hercules-surface-elevated/50 border border-hercules-border/50 rounded-xl text-hercules-text placeholder:text-hercules-text-dim text-body-lg font-mono focus:outline-none focus:border-hercules-primary focus:ring-2 focus:ring-hercules-primary/20"
            autoFocus
            aria-label="Command palette input"
            spellCheck={false}
          />
          <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 px-2 py-0.5 text-micro font-mono bg-hercules-surface-elevated/50 rounded text-hercules-text-dim">
            <span>⌘</span><span>K</span>
          </kbd>
        </div>

        <div className="px-4 pb-4 max-h-[60vh] overflow-y-auto">
          <AnimatePresence mode="wait">
            {filteredSuggestions.length > 0 && (
              <motion.div
                key="suggestions"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-1"
              >
                <div className="px-3 py-1 text-micro font-medium uppercase tracking-wider text-hercules-text-dim">Commands</div>
                {filteredSuggestions.map((suggestion, index) => (
                  <motion.button
                    key={suggestion.id}
                    onClick={() => { onQueryChange(suggestion.command); onClose(); }}
                    className={clsx(
                      'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors',
                      'hover:bg-hercules-surface-elevated/50',
                      selectedIndex === index && 'bg-hercules-primary/15 text-hercules-primary border border-hercules-primary/30'
                    )}
                    role="option"
                    aria-selected={selectedIndex === index}
                    style={{ transitionDelay: `${index * 0.02}s` }}
                  >
                    <categoryIcons[suggestion.category] className={clsx('w-5 h-5 flex-shrink-0', selectedIndex === index ? 'text-hercules-primary' : 'text-hercules-text-muted')} />
                    <div className="flex-1 text-left min-w-0">
                      <p className={clsx('text-body-sm font-medium truncate', selectedIndex === index ? 'text-hercules-text' : 'text-hercules-text')}>
                        {suggestion.command}
                      </p>
                      <p className={clsx('text-caption truncate', selectedIndex === index ? 'text-hercules-primary/70' : 'text-hercules-text-dim')}>
                        {suggestion.description}
                      </p>
                    </div>
                    <span className={clsx('text-micro font-mono px-2 py-0.5 rounded', selectedIndex === index ? 'bg-hercules-primary/20 text-hercules-primary' : 'bg-hercules-surface-elevated/50 text-hercules-text-dim')}>
                      {suggestion.shortcut}
                    </span>
                    <ChevronRight className={clsx('w-4 h-4 flex-shrink-0', selectedIndex === index ? 'text-hercules-primary' : 'text-hercules-text-dim')} />
                  </motion.button>
                ))}
              </motion.div>
            )}

            {filteredSuggestions.length === 0 && query && (
              <motion.div
                key="no-results"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-8 text-center"
              >
                <Zap className="w-12 h-12 mx-auto text-hercules-text-dim mb-3" />
                <p className="text-body-sm text-hercules-text-muted">No commands found for &ldquo;{query}&rdquo;</p>
                <p className="text-caption text-hercules-text-dim mt-1">Press Enter to execute as a custom command</p>
              </motion.div>
            )}

            <motion.div
              key="modules"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-1 mt-4"
            >
              <div className="px-3 py-1 text-micro font-medium uppercase tracking-wider text-hercules-text-dim">Modules</div>
              {modules.map((module, index) => {
                const globalIndex = index + filteredSuggestions.length;
                const Icon = moduleIcons[module.icon] || Bot;
                return (
                  <motion.button
                    key={module.id}
                    onClick={() => { useAppStore.getState().setCurrentModule(module.id); onClose(); }}
                    className={clsx(
                      'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors',
                      'hover:bg-hercules-surface-elevated/50',
                      selectedIndex === globalIndex && 'bg-hercules-primary/15 text-hercules-primary border border-hercules-primary/30'
                    )}
                    role="option"
                    aria-selected={selectedIndex === globalIndex}
                    style={{ transitionDelay: `${(filteredSuggestions.length + index) * 0.02}s` }}
                  >
                    <Icon className={clsx('w-5 h-5 flex-shrink-0', selectedIndex === globalIndex ? 'text-hercules-primary' : 'text-hercules-text-muted')} />
                    <div className="flex-1 text-left min-w-0">
                      <p className={clsx('text-body-sm font-medium truncate', selectedIndex === globalIndex ? 'text-hercules-text' : 'text-hercules-text')}>
                        {module.label}
                      </p>
                      <p className={clsx('text-caption truncate', selectedIndex === globalIndex ? 'text-hercules-primary/70' : 'text-hercules-text-dim')}>
                        {module.description}
                      </p>
                    </div>
                    {module.badge && (
                      <span className={clsx('text-micro font-medium px-2 py-0.5 rounded-full', selectedIndex === globalIndex ? 'bg-hercules-primary/20 text-hercules-primary' : 'bg-hercules-surface-elevated/50 text-hercules-text-dim')}>
                        {module.badge}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          </AnimatePresence>

          <div className="mt-4 pt-4 border-t border-hercules-border/30">
            <div className="flex items-center gap-4 text-caption text-hercules-text-dim">
              <kbd className="px-2 py-0.5 bg-hercules-surface-elevated/50 rounded font-mono">⌘K</kbd>
              <span>Open palette</span>
              <kbd className="px-2 py-0.5 bg-hercules-surface-elevated/50 rounded font-mono">↑↓</kbd>
              <span>Navigate</span>
              <kbd className="px-2 py-0.5 bg-hercules-surface-elevated/50 rounded font-mono">Enter</kbd>
              <span>Execute</span>
              <kbd className="px-2 py-0.5 bg-hercules-surface-elevated/50 rounded font-mono">Esc</kbd>
              <span>Close</span>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        className="fixed inset-0 z-[899] bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
    </motion.div>
  );
}

const moduleIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  home: 'home',
  command: 'bot',
  chat: 'message-square',
  agents: 'users',
  departments: 'box',
  tasks: 'list-checks',
  projects: 'folder-open',
  memory: 'database',
  files: 'file-text',
  knowledge: 'library',
  automations: 'zap',
  calendar: 'calendar',
  browser: 'globe',
  terminal: 'terminal',
  system: 'cpu',
  analytics: 'bar-chart-3',
  activity: 'activity',
  notifications: 'bell',
  settings: 'settings',
};