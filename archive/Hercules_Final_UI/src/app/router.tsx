/**
 * HERCULES · router
 * A 30-line state router (no URL dependency) with lazy screens. Kept behind an
 * interface so a real shell (Tauri windows / deep links) can map its own
 * navigation onto `ui.go`.
 */
import { Suspense, lazy, type ReactNode } from 'react';
import { store } from '@/state/hercules';
import { ScreenLoad } from '@/app/ScreenLoad';

const Core = lazy(() => import('@/screens/CoreScreen'));
const CommandCenter = lazy(() => import('@/screens/CommandCenterScreen'));
const Agents = lazy(() => import('@/screens/AgentsScreen'));
const Departments = lazy(() => import('@/screens/DepartmentsScreen'));
const Tasks = lazy(() => import('@/screens/TasksScreen'));
const Projects = lazy(() => import('@/screens/ProjectsScreen'));
const Memory = lazy(() => import('@/screens/MemoryScreen'));
const Files = lazy(() => import('@/screens/FilesScreen'));
const Knowledge = lazy(() => import('@/screens/KnowledgeScreen'));
const Automations = lazy(() => import('@/screens/AutomationsScreen'));
const Browser = lazy(() => import('@/screens/BrowserScreen'));
const Terminal = lazy(() => import('@/screens/TerminalScreen'));
const System = lazy(() => import('@/screens/SystemScreen'));
const Analytics = lazy(() => import('@/screens/AnalyticsScreen'));
const Activity = lazy(() => import('@/screens/ActivityScreen'));
const Notifications = lazy(() => import('@/screens/NotificationsScreen'));
const Settings = lazy(() => import('@/screens/SettingsScreen'));
const Permissions = lazy(() => import('@/screens/PermissionsScreen'));
const Media = lazy(() => import('@/screens/MediaScreen'));

const MAP: Record<string, ReactNode> = {
  core: <Core />,
  'command-center': <CommandCenter />,
  agents: <Agents />,
  departments: <Departments />,
  tasks: <Tasks />,
  projects: <Projects />,
  memory: <Memory />,
  files: <Files />,
  knowledge: <Knowledge />,
  automations: <Automations />,
  browser: <Browser />,
  terminal: <Terminal />,
  system: <System />,
  analytics: <Analytics />,
  activity: <Activity />,
  notifications: <Notifications />,
  settings: <Settings />,
  permissions: <Permissions />,
  media: <Media />,
};

export function ScreenOutlet() {
  const screen = store.use((s) => s.screen);
  return (
    <Suspense fallback={<ScreenLoad />}>
      <div key={screen} className="screen-enter">
        {MAP[screen] ?? MAP.core}
      </div>
    </Suspense>
  );
}
