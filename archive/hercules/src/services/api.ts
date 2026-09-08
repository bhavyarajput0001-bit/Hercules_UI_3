import type {
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
  SystemMetrics,
  MediaState,
  Notification,
  ActivityEvent,
  Permission,
  CommandExecution,
  CommandSuggestion,
  ServiceResponse,
  PaginatedResponse,
  FilterOptions,
  HerculesState,
  ModuleId,
  Theme,
  HologramPreset,
} from '@/types';

import {
  mockAgents,
  mockDepartments,
  mockTasks,
  mockProjects,
  mockMemories,
  mockFiles,
  mockKnowledge,
  mockAutomations,
  mockBrowserSessions,
  mockTerminalSessions,
  mockSystemMetrics,
  mockMediaState,
  mockNotifications,
  mockActivities,
  mockPermissions,
  mockCommandHistory,
  mockCommandSuggestions,
  generateDemoMetrics,
  generateDemoActivity,
} from './mockData';

const DEMO_MODE = true;
const DEMO_SPEED = 1000;

class HerculesAPI {
  private demoIntervals: Map<string, NodeJS.Timeout> = new Map();
  private subscribers: Map<string, Set<(data: unknown) => void>> = new Map();

  constructor() {
    if (DEMO_MODE) {
      this.startDemoSimulation();
    }
  }

  private startDemoSimulation() {
    this.demoIntervals.set('systemMetrics', setInterval(() => {
      this.notify('systemMetrics', generateDemoMetrics());
    }, 3000));

    this.demoIntervals.set('activities', setInterval(() => {
      this.notify('activities', generateDemoActivity());
    }, 8000));

    this.demoIntervals.set('taskProgress', setInterval(() => {
      mockTasks.forEach(task => {
        if (task.status === 'running') {
          task.progress = Math.min(100, task.progress + Math.random() * 2);
          if (task.progress >= 100) {
            task.status = 'completed';
            task.completedAt = new Date();
            task.subtasks.forEach(st => { if (st.status === 'running') st.status = 'completed'; });
          }
          this.notify('tasks', [...mockTasks]);
        }
      });
    }, 5000));

    this.demoIntervals.set('agentProgress', setInterval(() => {
      mockAgents.forEach(agent => {
        if (agent.status === 'working') {
          agent.progress = Math.min(100, agent.progress + Math.random() * 1.5);
          if (agent.progress >= 100) {
            agent.status = 'completed';
          }
          this.notify('agents', [...mockAgents]);
        }
      });
    }, 4000));

    this.demoIntervals.set('mediaProgress', setInterval(() => {
      if (mockMediaState.playing) {
        mockMediaState.currentTime = Math.min(mockMediaState.duration, mockMediaState.currentTime + 1);
        if (mockMediaState.currentTime >= mockMediaState.duration) {
          mockMediaState.currentTime = 0;
          if (mockMediaState.queue.length > 0) {
            const next = mockMediaState.queue.shift()!;
            mockMediaState.title = next.title;
            mockMediaState.artist = next.artist;
            mockMediaState.duration = next.duration;
            mockMediaState.artwork = next.artwork;
          }
        }
        this.notify('mediaState', { ...mockMediaState });
      }
    }, 1000));
  }

  stopDemoSimulation() {
    this.demoIntervals.forEach(interval => clearInterval(interval));
    this.demoIntervals.clear();
  }

  subscribe(event: string, callback: (data: unknown) => void) {
    if (!this.subscribers.has(event)) {
      this.subscribers.set(event, new Set());
    }
    this.subscribers.get(event)!.add(callback);
    return () => this.subscribers.get(event)?.delete(callback);
  }

  private notify(event: string, data: unknown) {
    this.subscribers.get(event)?.forEach(cb => cb(data));
  }

  async getAgents(filter?: FilterOptions): Promise<ServiceResponse<PaginatedResponse<Agent>>> {
    await this.delay(100);
    let filtered = [...mockAgents];
    if (filter?.search) {
      const s = filter.search.toLowerCase();
      filtered = filtered.filter(a => a.name.toLowerCase().includes(s) || a.role.toLowerCase().includes(s));
    }
    if (filter?.status?.length) {
      filtered = filtered.filter(a => filter.status!.includes(a.status));
    }
    if (filter?.department?.length) {
      filtered = filtered.filter(a => filter.department!.includes(a.department));
    }
    return { success: true, data: { items: filtered, total: filtered.length, page: 1, pageSize: filtered.length, hasMore: false }, error: null };
  }

  async getAgent(id: string): Promise<ServiceResponse<Agent | null>> {
    await this.delay(50);
    const agent = mockAgents.find(a => a.id === id) || null;
    return { success: true, data: agent, error: null };
  }

  async getDepartments(): Promise<ServiceResponse<Department[]>> {
    await this.delay(100);
    return { success: true, data: mockDepartments, error: null };
  }

  async getDepartment(id: string): Promise<ServiceResponse<Department | null>> {
    await this.delay(50);
    const dept = mockDepartments.find(d => d.id === id) || null;
    return { success: true, data: dept, error: null };
  }

  async getTasks(filter?: FilterOptions): Promise<ServiceResponse<PaginatedResponse<Task>>> {
    await this.delay(100);
    let filtered = [...mockTasks];
    if (filter?.search) {
      const s = filter.search.toLowerCase();
      filtered = filtered.filter(t => t.title.toLowerCase().includes(s) || t.description.toLowerCase().includes(s));
    }
    if (filter?.status?.length) {
      filtered = filtered.filter(t => filter.status!.includes(t.status));
    }
    if (filter?.department?.length) {
      filtered = filtered.filter(t => filter.department!.includes(t.departmentId));
    }
    return { success: true, data: { items: filtered, total: filtered.length, page: 1, pageSize: filtered.length, hasMore: false }, error: null };
  }

  async getTask(id: string): Promise<ServiceResponse<Task | null>> {
    await this.delay(50);
    const task = mockTasks.find(t => t.id === id) || null;
    return { success: true, data: task, error: null };
  }

  async getProjects(): Promise<ServiceResponse<Project[]>> {
    await this.delay(100);
    return { success: true, data: mockProjects, error: null };
  }

  async getProject(id: string): Promise<ServiceResponse<Project | null>> {
    await this.delay(50);
    const project = mockProjects.find(p => p.id === id) || null;
    return { success: true, data: project, error: null };
  }

  async getMemories(filter?: FilterOptions): Promise<ServiceResponse<PaginatedResponse<MemoryItem>>> {
    await this.delay(100);
    let filtered = [...mockMemories];
    if (filter?.search) {
      const s = filter.search.toLowerCase();
      filtered = filtered.filter(m => m.title.toLowerCase().includes(s) || m.content.toLowerCase().includes(s));
    }
    if (filter?.category?.length) {
      filtered = filtered.filter(m => filter.category!.includes(m.category));
    }
    return { success: true, data: { items: filtered, total: filtered.length, page: 1, pageSize: filtered.length, hasMore: false }, error: null };
  }

  async getFiles(filter?: FilterOptions): Promise<ServiceResponse<PaginatedResponse<FileItem>>> {
    await this.delay(100);
    let filtered = [...mockFiles];
    if (filter?.search) {
      const s = filter.search.toLowerCase();
      filtered = filtered.filter(f => f.name.toLowerCase().includes(s));
    }
    if (filter?.category?.length) {
      filtered = filtered.filter(f => filter.category!.includes(f.type));
    }
    return { success: true, data: { items: filtered, total: filtered.length, page: 1, pageSize: filtered.length, hasMore: false }, error: null };
  }

  async getKnowledge(filter?: FilterOptions): Promise<ServiceResponse<PaginatedResponse<KnowledgeItem>>> {
    await this.delay(100);
    let filtered = [...mockKnowledge];
    if (filter?.search) {
      const s = filter.search.toLowerCase();
      filtered = filtered.filter(k => k.title.toLowerCase().includes(s) || k.content.toLowerCase().includes(s));
    }
    return { success: true, data: { items: filtered, total: filtered.length, page: 1, pageSize: filtered.length, hasMore: false }, error: null };
  }

  async getAutomations(filter?: FilterOptions): Promise<ServiceResponse<PaginatedResponse<Automation>>> {
    await this.delay(100);
    let filtered = [...mockAutomations];
    if (filter?.status?.length) {
      filtered = filtered.filter(a => filter.status!.includes(a.status));
    }
    return { success: true, data: { items: filtered, total: filtered.length, page: 1, pageSize: filtered.length, hasMore: false }, error: null };
  }

  async getBrowserSessions(): Promise<ServiceResponse<BrowserSession[]>> {
    await this.delay(100);
    return { success: true, data: mockBrowserSessions, error: null };
  }

  async getTerminalSessions(): Promise<ServiceResponse<TerminalSession[]>> {
    await this.delay(100);
    return { success: true, data: mockTerminalSessions, error: null };
  }

  async getSystemMetrics(): Promise<ServiceResponse<SystemMetrics>> {
    await this.delay(50);
    return { success: true, data: mockSystemMetrics, error: null };
  }

  async getMediaState(): Promise<ServiceResponse<MediaState>> {
    await this.delay(50);
    return { success: true, data: mockMediaState, error: null };
  }

  async controlMedia(action: 'play' | 'pause' | 'next' | 'previous' | 'volume', value?: number): Promise<ServiceResponse<MediaState>> {
    await this.delay(50);
    switch (action) {
      case 'play': mockMediaState.playing = true; break;
      case 'pause': mockMediaState.playing = false; break;
      case 'next':
        if (mockMediaState.queue.length > 0) {
          const next = mockMediaState.queue.shift()!;
          mockMediaState.title = next.title;
          mockMediaState.artist = next.artist;
          mockMediaState.duration = next.duration;
          mockMediaState.currentTime = 0;
          mockMediaState.artwork = next.artwork;
        }
        break;
      case 'previous': break;
      case 'volume': if (value !== undefined) mockMediaState.volume = value; break;
    }
    this.notify('mediaState', { ...mockMediaState });
    return { success: true, data: { ...mockMediaState }, error: null };
  }

  async getNotifications(filter?: FilterOptions): Promise<ServiceResponse<PaginatedResponse<Notification>>> {
    await this.delay(100);
    let filtered = [...mockNotifications].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    if (filter?.search) {
      const s = filter.search.toLowerCase();
      filtered = filtered.filter(n => n.title.toLowerCase().includes(s) || n.message.toLowerCase().includes(s));
    }
    return { success: true, data: { items: filtered, total: filtered.length, page: 1, pageSize: filtered.length, hasMore: false }, error: null };
  }

  async getActivities(filter?: FilterOptions): Promise<ServiceResponse<PaginatedResponse<ActivityEvent>>> {
    await this.delay(100);
    let filtered = [...mockActivities].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    if (filter?.search) {
      const s = filter.search.toLowerCase();
      filtered = filtered.filter(a => a.title.toLowerCase().includes(s) || a.description.toLowerCase().includes(s));
    }
    if (filter?.category?.length) {
      filtered = filtered.filter(a => filter.category!.includes(a.sourceType));
    }
    return { success: true, data: { items: filtered, total: filtered.length, page: 1, pageSize: filtered.length, hasMore: false }, error: null };
  }

  async getPermissions(): Promise<ServiceResponse<Permission[]>> {
    await this.delay(100);
    return { success: true, data: mockPermissions, error: null };
  }

  async requestPermission(id: string): Promise<ServiceResponse<Permission>> {
    await this.delay(500);
    const perm = mockPermissions.find(p => p.id === id);
    if (perm) {
      perm.status = 'granted';
      perm.grantedAt = new Date();
      this.notify('permissions', [...mockPermissions]);
    }
    return { success: true, data: perm!, error: null };
  }

  async getCommandHistory(): Promise<ServiceResponse<CommandExecution[]>> {
    await this.delay(100);
    return { success: true, data: mockCommandHistory, error: null };
  }

  async getCommandSuggestions(query: string): Promise<ServiceResponse<CommandSuggestion[]>> {
    await this.delay(50);
    const filtered = mockCommandSuggestions.filter(s =>
      s.command.toLowerCase().includes(query.toLowerCase()) ||
      s.description.toLowerCase().includes(query.toLowerCase()) ||
      s.category.toLowerCase().includes(query.toLowerCase())
    );
    return { success: true, data: filtered, error: null };
  }

  async executeCommand(command: string): Promise<ServiceResponse<CommandExecution>> {
    await this.delay(200);
    const execution: CommandExecution = {
      id: `cmd-${Date.now()}`,
      command,
      type: 'workflow',
      status: 'executing',
      progress: 0,
      currentStep: 'Initializing...',
      workflow: null,
      result: null,
      error: null,
      startedAt: new Date(),
      completedAt: null,
    };
    mockCommandHistory.unshift(execution);
    this.notify('commandHistory', [...mockCommandHistory]);
    return { success: true, data: execution, error: null };
  }

  async getThemes(): Promise<ServiceResponse<Theme[]>> {
    const { themes } = await import('./themeEngine');
    await this.delay(50);
    return { success: true, data: themes, error: null };
  }

  async getHologramPresets(): Promise<ServiceResponse<HologramPreset[]>> {
    const { hologramPresets } = await import('./hologramPresets');
    await this.delay(50);
    return { success: true, data: hologramPresets, error: null };
  }

  async setHerculesState(state: HerculesState): Promise<ServiceResponse<HerculesState>> {
    await this.delay(50);
    this.notify('herculesState', state);
    return { success: true, data: state, error: null };
  }

  async setModule(module: ModuleId): Promise<ServiceResponse<ModuleId>> {
    await this.delay(50);
    this.notify('moduleChange', module);
    return { success: true, data: module, error: null };
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const herculesAPI = new HerculesAPI();