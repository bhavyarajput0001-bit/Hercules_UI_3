'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, LayoutDashboard, Terminal, Bot, Users, FolderKanban, ListChecks, FolderOpen, Database, FileText, Library, Zap, Calendar, Globe, HardDrive, Cpu, BarChart3, Bell, Activity, Settings, Mic, Home, MessageSquare, Box, Brain } from 'lucide-react';
import { useAppStore, useSidebar, useCurrentModule } from '@/store';
import { modules } from '@/config/modules';
import clsx from 'clsx';

const moduleIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  home: Home,
  command: Bot,
  chat: MessageSquare,
  agents: Users,
  departments: Box,
  tasks: ListChecks,
  projects: FolderOpen,
  memory: Database,
  files: FileText,
  knowledge: Library,
  automations: Zap,
  calendar: Calendar,
  browser: Globe,
  terminal: Terminal,
  system: Cpu,
  analytics: BarChart3,
  activity: Activity,
  notifications: Bell,
  settings: Settings,
};

export function Sidebar() {
  const { collapsed, width } = useSidebar();
  const currentModule = useCurrentModule();
  const { setSidebarCollapsed, setCurrentModule } = useAppStore();
  const [hovered, setHovered] = useState<string | null>(null);
  const [expandedOnHover, setExpandedOnHover] = useState(false);

  const effectiveCollapsed = collapsed && !expandedOnHover;
  const sidebarWidth = effectiveCollapsed ? 72 : width;

  const handleMouseEnter = () => {
    if (collapsed) setExpandedOnHover(true);
  };

  const handleMouseLeave = () => {
    if (collapsed) setExpandedOnHover(false);
  };

  const primaryModules = modules.filter(m => m.category === 'primary');
  const secondaryModules = modules.filter(m => m.category === 'secondary');
  const settingsModules = modules.filter(m => m.category === 'settings');

  const renderModuleList = (moduleList: typeof modules, showDivider = true) => (
    <motion.ul
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, staggerChildren: 0.03 }}
      className="space-y-1"
      role="list"
      aria-label={showDivider ? 'Primary modules' : 'Settings'}
    >
      {moduleList.map((module) => (
        <motion.li key={module.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
          <button
            onClick={() => setCurrentModule(module.id)}
            className={clsx(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hercules-primary focus-visible:ring-offset-2 focus-visible:ring-offset-hercules-background',
              currentModule === module.id
                ? 'bg-hercules-primary/15 text-hercules-text border border-hercules-primary/30 shadow-glow-sm'
                : 'text-hercules-text-muted hover:text-hercules-text hover:bg-hercules-surface-elevated/50',
              effectiveCollapsed && 'justify-center px-2'
            )}
            aria-current={currentModule === module.id ? 'page' : undefined}
            aria-label={module.label}
            title={effectiveCollapsed ? module.label : undefined}
          >
            <moduleIcons[module.icon] className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
            <AnimatePresence mode="wait">
              {!effectiveCollapsed && (
                <motion.span
                  key="label"
                  initial={{ opacity: 0, x: -10, width: 0 }}
                  animate={{ opacity: 1, x: 0, width: 'auto' }}
                  exit={{ opacity: 0, x: -10, width: 0 }}
                  transition={{ duration: 0.15 }}
                  className="font-medium text-body-sm whitespace-nowrap"
                >
                  {module.label}
                </motion.span>
              )}
            </AnimatePresence>
            {module.badge && !effectiveCollapsed && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="ml-auto px-2 py-0.5 text-micro font-medium bg-hercules-primary/20 text-hercules-primary rounded-full"
              >
                {module.badge}
              </motion.span>
            )}
          </button>
        </motion.li>
      ))}
    </motion.ul>
  );

  return (
    <motion.aside
      className={clsx(
        'sidebar fixed left-0 top-0 z-sticky h-full flex flex-col',
        'bg-hercules-surface/80 backdrop-blur-2xl border-r border-hercules-border/50',
        'transition-all duration-300 ease-out-expo'
      )}
      style={{ width: sidebarWidth }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex h-16 items-center justify-between px-4 border-b border-hercules-border/50">
        <AnimatePresence mode="wait">
          {!effectiveCollapsed && (
            <motion.div
              key="brand"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-hercules-primary to-hercules-secondary flex items-center justify-center shadow-glow-sm">
                <Bot className="w-5 h-5 text-hercules-background" />
              </div>
              <span className="font-display font-semibold text-heading-sm text-hercules-text tracking-tight">HERCULES</span>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setSidebarCollapsed(!collapsed)}
          className={clsx(
            'p-2 rounded-xl transition-all duration-200',
            'hover:bg-hercules-surface-elevated/50',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hercules-primary'
          )}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!collapsed}
        >
          {collapsed ? <ChevronRight className="w-5 h-5 text-hercules-text-muted" /> : <ChevronLeft className="w-5 h-5 text-hercules-text-muted" />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-6" role="navigation">
        <div>
          <AnimatePresence mode="wait">
            {!effectiveCollapsed && (
              <motion.h3
                key="primary-label"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="px-3 text-micro font-medium uppercase tracking-wider text-hercules-text-dim mb-3"
              >
                Modules
              </motion.h3>
            )}
          </AnimatePresence>
          {renderModuleList(primaryModules)}
        </div>

        <div>
          <AnimatePresence mode="wait">
            {!effectiveCollapsed && (
              <motion.h3
                key="secondary-label"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="px-3 text-micro font-medium uppercase tracking-wider text-hercules-text-dim mb-3"
              >
                Activity
              </motion.h3>
            )}
          </AnimatePresence>
          {renderModuleList(secondaryModules, false)}
        </div>
      </nav>

      <div className="border-t border-hercules-border/50 p-3">
        <AnimatePresence mode="wait">
          {!effectiveCollapsed && (
            <motion.div
              key="user-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-hercules-surface-elevated/50 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-hercules-primary/20 flex items-center justify-center">
                  <Mic className="w-4 h-4 text-hercules-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-body-sm font-medium text-hercules-text truncate">Voice Mode</p>
                  <p className="text-micro text-hercules-text-dim truncate">Hold ⌘Space to speak</p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl glass">
                <div className="w-8 h-8 rounded-xl bg-hercules-surface-elevated flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-hercules-success animate-pulse" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-body-sm font-medium text-hercules-text truncate">System Online</p>
                  <p className="text-micro text-hercules-text-dim truncate">All systems nominal</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-4 pt-4 border-t border-hercules-border/50">
          {renderModuleList(settingsModules, false)}
        </div>
      </div>
    </motion.aside>
  );
}