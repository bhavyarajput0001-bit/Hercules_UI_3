import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type {
  ModuleId,
  HerculesState,
  VoiceState,
  SidebarState,
  CommandPaletteState,
  ModalState,
  ToastState,
  DemoModeState,
  SystemMetrics,
  MediaState,
  Notification,
  ActivityEvent,
  Permission,
  Agent,
  Department,
  Task,
  Project,
  MemoryItem,
  FileItem,
  KnowledgeItem,
  Automation,
  BrowserSession,
  TerminalSession,
  CommandExecution,
  CommandSuggestion,
  Theme,
  HologramPreset,
} from '@/types';

import { herculesAPI } from '@/services/api';
import { getCurrentTheme, applyTheme } from '@/services/themeEngine';
import { getCurrentHologramPreset } from '@/services/hologramPresets';

interface AppStore {
  currentModule: ModuleId;
  herculesState: HerculesState;
  selectedTheme: string;
  selectedHologram: string;
  voiceState: VoiceState;
  sidebar: SidebarState;
  commandPalette: CommandPaletteState;
  modal: ModalState;
  toasts: ToastState[];
  demoMode: DemoModeState;
  systemMetrics: SystemMetrics | null;
  mediaState: MediaState;
  notifications: Notification[];
  activities: ActivityEvent[];
  permissions: Permission[];
  agents: Agent[];
  departments: Department[];
  tasks: Task[];
  projects: Project[];
  memories: MemoryItem[];
  files: FileItem[];
  knowledge: KnowledgeItem[];
  automations: Automation[];
  browserSessions: BrowserSession[];
  terminalSessions: TerminalSession[];
  commandHistory: CommandExecution[];
  commandSuggestions: CommandSuggestion[];
  themes: Theme[];
  hologramPresets: HologramPreset[];

  setCurrentModule: (module: ModuleId) => void;
  setHerculesState: (state: HerculesState) => void;
  setSelectedTheme: (themeId: string) => void;
  setSelectedHologram: (hologramId: string) => void;
  setVoiceState: (state: Partial<VoiceState>) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;
  setCommandPaletteQuery: (query: string) => void;
  openModal: (type: string, data?: unknown) => void;
  closeModal: () => void;
  addToast: (notification: Notification) => void;
  removeToast: (id: string) => void;
  setDemoMode: (enabled: boolean) => void;
  initialize: () => Promise<void>;
  refreshData: () => Promise<void>;
}

const initialVoiceState: VoiceState = {
  state: 'idle',
  transcript: '',
  confidence: 0,
  audioLevel: 0,
  waveform: Array(32).fill(0),
  isWakeWordActive: false,
  wakeWord: 'Hercules',
  language: 'en-US',
  provider: 'whisper',
};

const initialSidebarState: SidebarState = {
  collapsed: false,
  width: 288,
};

const initialCommandPaletteState: CommandPaletteState = {
  open: false,
  query: '',
  selectedIndex: 0,
  results: [],
};

const initialModalState: ModalState = {
  open: false,
  type: null,
  data: null,
};

const initialDemoModeState: DemoModeState = {
  enabled: true,
  speed: 1,
  scenarios: ['default'],
};

export const useAppStore = create<AppStore>()(
  subscribeWithSelector((set, get) => ({
    currentModule: 'home',
    herculesState: 'idle',
    selectedTheme: 'void',
    selectedHologram: 'core',
    voiceState: initialVoiceState,
    sidebar: initialSidebarState,
    commandPalette: initialCommandPaletteState,
    modal: initialModalState,
    toasts: [],
    demoMode: initialDemoModeState,
    systemMetrics: null,
    mediaState: {
      playing: false,
      source: null,
      title: '',
      artist: '',
      album: '',
      artwork: null,
      duration: 0,
      currentTime: 0,
      volume: 0.7,
      muted: false,
      shuffle: false,
      repeat: 'off',
      queue: [],
    },
    notifications: [],
    activities: [],
    permissions: [],
    agents: [],
    departments: [],
    tasks: [],
    projects: [],
    memories: [],
    files: [],
    knowledge: [],
    automations: [],
    browserSessions: [],
    terminalSessions: [],
    commandHistory: [],
    commandSuggestions: [],
    themes: [],
    hologramPresets: [],

    setCurrentModule: (module) => {
      set({ currentModule: module });
      herculesAPI.setModule(module);
    },

    setHerculesState: (state) => {
      set({ herculesState: state });
      herculesAPI.setHerculesState(state);
    },

    setSelectedTheme: (themeId) => {
      const theme = get().themes.find(t => t.id === themeId);
      if (theme) {
        applyTheme(theme);
        set({ selectedTheme: themeId });
      }
    },

    setSelectedHologram: (hologramId) => {
      const preset = get().hologramPresets.find(h => h.id === hologramId);
      if (preset) {
        set({ selectedHologram: hologramId });
        localStorage.setItem('hercules-hologram', hologramId);
      }
    },

    setVoiceState: (state) => {
      set(prev => ({ voiceState: { ...prev.voiceState, ...state } }));
    },

    toggleSidebar: () => {
      set(prev => ({ sidebar: { ...prev.sidebar, collapsed: !prev.sidebar.collapsed } }));
    },

    setSidebarCollapsed: (collapsed) => {
      set(prev => ({ sidebar: { ...prev.sidebar, collapsed } }));
    },

    openCommandPalette: () => {
      set(prev => ({ commandPalette: { ...prev.commandPalette, open: true, query: '', selectedIndex: 0 } }));
    },

    closeCommandPalette: () => {
      set(prev => ({ commandPalette: { ...prev.commandPalette, open: false } }));
    },

    setCommandPaletteQuery: (query) => {
      set(prev => ({ commandPalette: { ...prev.commandPalette, query, selectedIndex: 0 } }));
    },

    openModal: (type, data) => {
      set({ modal: { open: true, type, data } });
    },

    closeModal: () => {
      set({ modal: { open: false, type: null, data: null } });
    },

    addToast: (notification) => {
      const toast: ToastState = {
        id: `toast-${Date.now()}`,
        notification,
        visible: true,
      };
      set(prev => ({ toasts: [...prev.toasts, toast] }));
      setTimeout(() => {
        get().removeToast(toast.id);
      }, 5000);
    },

    removeToast: (id) => {
      set(prev => ({ toasts: prev.toasts.filter(t => t.id !== id) }));
    },

    setDemoMode: (enabled) => {
      set(prev => ({ demoMode: { ...prev.demoMode, enabled } }));
    },

    initialize: async () => {
      const [themesRes, hologramsRes, metricsRes, mediaRes, notifsRes, activitiesRes, permsRes, agentsRes, deptsRes, tasksRes, projectsRes, memsRes, filesRes, knowRes, autosRes, browsersRes, termsRes, cmdsRes, sugRes] = await Promise.all([
        herculesAPI.getThemes(),
        herculesAPI.getHologramPresets(),
        herculesAPI.getSystemMetrics(),
        herculesAPI.getMediaState(),
        herculesAPI.getNotifications(),
        herculesAPI.getActivities(),
        herculesAPI.getPermissions(),
        herculesAPI.getAgents(),
        herculesAPI.getDepartments(),
        herculesAPI.getTasks(),
        herculesAPI.getProjects(),
        herculesAPI.getMemories(),
        herculesAPI.getFiles(),
        herculesAPI.getKnowledge(),
        herculesAPI.getAutomations(),
        herculesAPI.getBrowserSessions(),
        herculesAPI.getTerminalSessions(),
        herculesAPI.getCommandHistory(),
        herculesAPI.getCommandSuggestions(''),
      ]);

      const currentTheme = getCurrentTheme();
      applyTheme(currentTheme);
      const currentHologram = getCurrentHologramPreset();

      herculesAPI.subscribe('systemMetrics', (data) => set({ systemMetrics: data as SystemMetrics }));
      herculesAPI.subscribe('mediaState', (data) => set({ mediaState: data as MediaState }));
      herculesAPI.subscribe('activities', (data) => set(prev => ({ activities: [data as ActivityEvent, ...prev.activities].slice(0, 100) })));
      herculesAPI.subscribe('tasks', (data) => set({ tasks: data as Task[] }));
      herculesAPI.subscribe('agents', (data) => set({ agents: data as Agent[] }));
      herculesAPI.subscribe('permissions', (data) => set({ permissions: data as Permission[] }));
      herculesAPI.subscribe('commandHistory', (data) => set({ commandHistory: data as CommandExecution[] }));

      set({
        themes: themesRes.data || [],
        hologramPresets: hologramsRes.data || [],
        systemMetrics: metricsRes.data,
        mediaState: mediaRes.data || get().mediaState,
        notifications: notifsRes.data?.items || [],
        activities: activitiesRes.data?.items || [],
        permissions: permsRes.data || [],
        agents: agentsRes.data?.items || [],
        departments: deptsRes.data || [],
        tasks: tasksRes.data?.items || [],
        projects: projectsRes.data || [],
        memories: memsRes.data?.items || [],
        files: filesRes.data?.items || [],
        knowledge: knowRes.data?.items || [],
        automations: autosRes.data?.items || [],
        browserSessions: browsersRes.data || [],
        terminalSessions: termsRes.data || [],
        commandHistory: cmdsRes.data || [],
        commandSuggestions: sugRes.data || [],
        selectedTheme: currentTheme.id,
        selectedHologram: currentHologram.id,
      });

      notifsRes.data?.items.slice(0, 3).forEach(n => get().addToast(n));
    },

    refreshData: async () => {
      const [metricsRes, mediaRes, notifsRes, activitiesRes, tasksRes, agentsRes] = await Promise.all([
        herculesAPI.getSystemMetrics(),
        herculesAPI.getMediaState(),
        herculesAPI.getNotifications(),
        herculesAPI.getActivities(),
        herculesAPI.getTasks(),
        herculesAPI.getAgents(),
      ]);

      set({
        systemMetrics: metricsRes.data,
        mediaState: mediaRes.data || get().mediaState,
        notifications: notifsRes.data?.items || [],
        activities: activitiesRes.data?.items || [],
        tasks: tasksRes.data?.items || [],
        agents: agentsRes.data?.items || [],
      });
    },
  }))
);

export const useCurrentModule = () => useAppStore(state => state.currentModule);
export const useHerculesState = () => useAppStore(state => state.herculesState);
export const useSelectedTheme = () => useAppStore(state => state.selectedTheme);
export const useSelectedHologram = () => useAppStore(state => state.selectedHologram);
export const useVoiceState = () => useAppStore(state => state.voiceState);
export const useSidebar = () => useAppStore(state => state.sidebar);
export const useCommandPalette = () => useAppStore(state => state.commandPalette);
export const useModal = () => useAppStore(state => state.modal);
export const useToasts = () => useAppStore(state => state.toasts);
export const useDemoMode = () => useAppStore(state => state.demoMode);
export const useSystemMetrics = () => useAppStore(state => state.systemMetrics);
export const useMediaState = () => useAppStore(state => state.mediaState);
export const useNotifications = () => useAppStore(state => state.notifications);
export const useActivities = () => useAppStore(state => state.activities);
export const usePermissions = () => useAppStore(state => state.permissions);
export const useAgents = () => useAppStore(state => state.agents);
export const useDepartments = () => useAppStore(state => state.departments);
export const useTasks = () => useAppStore(state => state.tasks);
export const useProjects = () => useAppStore(state => state.projects);
export const useMemories = () => useAppStore(state => state.memories);
export const useFiles = () => useAppStore(state => state.files);
export const useKnowledge = () => useAppStore(state => state.knowledge);
export const useAutomations = () => useAppStore(state => state.automations);
export const useBrowserSessions = () => useAppStore(state => state.browserSessions);
export const useTerminalSessions = () => useAppStore(state => state.terminalSessions);
export const useCommandHistory = () => useAppStore(state => state.commandHistory);
export const useCommandSuggestions = () => useAppStore(state => state.commandSuggestions);
export const useThemes = () => useAppStore(state => state.themes);
export const useHologramPresets = () => useAppStore(state => state.hologramPresets);