'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore, useCurrentModule, useHerculesState, useSidebar, useToasts, useModal, useCommandPalette, useDemoMode } from '@/store';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { BottomBar } from './BottomBar';
import { HomeScreen } from '@/components/modules/HomeScreen';
import { CommandScreen } from '@/components/modules/CommandScreen';
import { ChatScreen } from '@/components/modules/ChatScreen';
import { AgentsScreen } from '@/components/modules/AgentsScreen';
import { DepartmentsScreen } from '@/components/modules/DepartmentsScreen';
import { TasksScreen } from '@/components/modules/TasksScreen';
import { ProjectsScreen } from '@/components/modules/ProjectsScreen';
import { MemoryScreen } from '@/components/modules/MemoryScreen';
import { FilesScreen } from '@/components/modules/FilesScreen';
import { KnowledgeScreen } from '@/components/modules/KnowledgeScreen';
import { AutomationsScreen } from '@/components/modules/AutomationsScreen';
import { CalendarScreen } from '@/components/modules/CalendarScreen';
import { BrowserScreen } from '@/components/modules/BrowserScreen';
import { TerminalScreen } from '@/components/modules/TerminalScreen';
import { SystemScreen } from '@/components/modules/SystemScreen';
import { AnalyticsScreen } from '@/components/modules/AnalyticsScreen';
import { ActivityScreen } from '@/components/modules/ActivityScreen';
import { NotificationsScreen } from '@/components/modules/NotificationsScreen';
import { SettingsScreen } from '@/components/modules/SettingsScreen';
import { CommandPalette } from '@/components/ui/CommandPalette';
import { Modal } from '@/components/ui/Modal';
import { Toast } from '@/components/ui/Toast';
import { modules } from '@/config/modules';
import { initializeTheme } from '@/services/themeEngine';

const moduleComponents: Record<string, React.ComponentType> = {
  home: HomeScreen,
  command: CommandScreen,
  chat: ChatScreen,
  agents: AgentsScreen,
  departments: DepartmentsScreen,
  tasks: TasksScreen,
  projects: ProjectsScreen,
  memory: MemoryScreen,
  files: FilesScreen,
  knowledge: KnowledgeScreen,
  automations: AutomationsScreen,
  calendar: CalendarScreen,
  browser: BrowserScreen,
  terminal: TerminalScreen,
  system: SystemScreen,
  analytics: AnalyticsScreen,
  activity: ActivityScreen,
  notifications: NotificationsScreen,
  settings: SettingsScreen,
};

export function HerculesShell() {
  const currentModule = useCurrentModule();
  const herculesState = useHerculesState();
  const { collapsed } = useSidebar();
  const toasts = useToasts();
  const modal = useModal();
  const commandPalette = useCommandPalette();
  const demoMode = useDemoMode();
  const { initialize } = useAppStore();

  useEffect(() => {
    initializeTheme();
    initialize();
  }, [initialize]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        useAppStore.getState().openCommandPalette();
      }
      if (e.key === 'Escape') {
        useAppStore.getState().closeCommandPalette();
        useAppStore.getState().closeModal();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === ' ') {
        e.preventDefault();
        const { voiceState, setVoiceState, setHerculesState } = useAppStore.getState();
        if (voiceState.state === 'idle') {
          setVoiceState({ state: 'listening', transcript: '', audioLevel: 0.5 });
          setHerculesState('listening');
        } else if (voiceState.state === 'listening') {
          setVoiceState({ state: 'processing' });
          setHerculesState('thinking');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const ModuleComponent = moduleComponents[currentModule] || HomeScreen;
  const moduleConfig = modules.find(m => m.id === currentModule);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-hercules-background">
      <style jsx global>{`
        @keyframes slide-up {
          from { transform: translateY(10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slide-down {
          from { transform: translateY(-10px); opacity: 1; }
          to { transform: translateY(0); opacity: 0; }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-out {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes scale-in {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes scale-out {
          from { transform: scale(1); opacity: 1; }
          to { transform: scale(0.95); opacity: 0; }
        }
        .animate-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-out { animation: fade-out 0.2s ease-in forwards; }
        .slide-in-from-bottom { animation: slide-up 0.3s ease-out forwards; }
        .slide-in-from-top { animation: slide-down 0.3s ease-out reverse forwards; }
      `}</style>

      <Sidebar />
      <TopBar />
      <BottomBar />

      <main
        className={`
          fixed top-16 bottom-20 left-0 right-0 z-base overflow-hidden
          transition-all duration-300 ease-out-expo
          ${collapsed ? 'left-16' : 'left-72'}
        `}
        role="main"
        aria-label={moduleConfig?.label || 'Main content'}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentModule}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="h-full w-full"
          >
            <ModuleComponent />
          </motion.div>
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {commandPalette.open && (
          <CommandPalette
            onClose={() => useAppStore.getState().closeCommandPalette()}
            query={commandPalette.query}
            onQueryChange={(q) => useAppStore.getState().setCommandPaletteQuery(q)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {modal.open && (
          <Modal
            type={modal.type}
            data={modal.data}
            onClose={() => useAppStore.getState().closeModal()}
          />
        )}
      </AnimatePresence>

      <div className="fixed bottom-24 right-4 z-toast flex flex-col-reverse gap-2 pointer-events-none" role="region" aria-label="Notifications">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            notification={toast.notification}
            onDismiss={() => useAppStore.getState().removeToast(toast.id)}
          />
        ))}
      </div>

      {demoMode.enabled && (
        <div className="fixed bottom-24 left-4 z-toast glass rounded-xl px-3 py-1.5 text-micro text-hercules-text-muted pointer-events-none animate-in">
          DEMO MODE
        </div>
      )}
    </div>
  );
}