/**
 * HERCULES · HTTP / WebSocket transport (integration skeleton)
 * ---------------------------------------------------------------------------
 * A working, backend-agnostic client for the contract surface. Point
 * `VITE_HERCULES_API_BASE` at a real Hercules core, set
 * `VITE_HERCULES_TRANSPORT=http` and the entire UI runs against it with no
 * other change.
 *
 * Contract assumed (documented in docs/BACKEND_INTEGRATION.md):
 *   GET    /v1/<resource>              list
 *   POST   /v1/<resource>              create
 *   PATCH  /v1/<resource>/:id          update
 *   DELETE /v1/<resource>/:id          remove
 *   POST   /v1/ai/submit               returns SSE stream of StreamChunk
 *   GET    /v1/stream                  Server-Sent Events for pushes
 *
 * Auth: a short-lived session token minted by the desktop shell / backend.
 * No provider API keys ever reach this layer.
 */
import type { HerculesServices, MediaArtifact, Unsubscribe, AutonomyPolicy, FileAuditEntry } from '@/services/contracts';
import type { AppConfig, Department, Persona, StreamChunk } from '@/types/domain';

export interface TransportConfig {
  base: string;
  ws?: string;
  token?: string;
}

let settingsSnapshot: AppConfig = null as unknown as AppConfig;

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code?: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function readTransportConfig(): TransportConfig {
  const env = (import.meta as unknown as { env?: Record<string, string | undefined> }).env ?? {};
  return {
    base: env.VITE_HERCULES_API_BASE ?? '',
    ws: env.VITE_HERCULES_WS_URL,
    // Session token only — injected by the shell at runtime, never committed.
    token: env.VITE_HERCULES_SESSION ?? undefined,
  };
}

/** Thin, typed request helper. Keeps retries and auth in one place. */
async function req<T>(cfg: TransportConfig, method: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${cfg.base}${path}`, {
    method,
    headers: {
      'content-type': 'application/json',
      ...(cfg.token ? { authorization: `Bearer ${cfg.token}` } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new ApiError(text || `${method} ${path} → ${res.status}`, res.status, res.headers.get('x-hercules-code') ?? undefined);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

const crud = <T,>(cfg: TransportConfig, resource: string) => ({
  list: () => req<T[]>(cfg, 'GET', `/v1/${resource}`),
  get: (id: string) => req<T>(cfg, 'GET', `/v1/${resource}/${id}`),
  create: (input: unknown) => req<T>(cfg, 'POST', `/v1/${resource}`, input),
  update: (id: string, patch: unknown) => req<T>(cfg, 'PATCH', `/v1/${resource}/${id}`, patch),
  remove: (id: string) => req<void>(cfg, 'DELETE', `/v1/${resource}/${id}`),
});

/** Server-sent push channel: same event shapes as the mock buses. */
export function connectStream(cfg: TransportConfig, onEvent: (e: MessageEvent) => void): Unsubscribe {
  if (!cfg.base && !cfg.ws) return () => undefined;
  const source = new EventSource(`${cfg.base}/v1/stream`);
  source.onmessage = onEvent;
  source.onerror = () => {
    /* EventSource reconnects on its own; the shell surfaces connection state. */
  };
  return () => source.close();
}

/**
 * Streams the AI answer as it is produced. The backend emits one SSE `data:`
 * frame per StreamChunk; we re-shape them as an async iterable so the UI is
 * identical whether the transport is mock, http or ws.
 */
export async function* submitPrompt(cfg: TransportConfig, input: unknown, signal?: AbortSignal): AsyncIterable<StreamChunk> {
  const res = await fetch(`${cfg.base}/v1/ai/submit`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...(cfg.token ? { authorization: `Bearer ${cfg.token}` } : {}) },
    body: JSON.stringify(input),
    signal,
  });
  if (!res.ok || !res.body) throw new ApiError(`submit failed → ${res.status}`, res.status);
  const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
  let buffer = '';
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += value;
    const frames = buffer.split('\n\n');
    buffer = frames.pop() ?? '';
    for (const frame of frames) {
      const data = frame
        .split('\n')
        .filter((l) => l.startsWith('data:'))
        .map((l) => l.slice(5).trim())
        .join('');
      if (!data || data === '[DONE]') continue;
      yield JSON.parse(data) as StreamChunk;
    }
  }
}

/**
 * Builds a service object backed by HTTP. Partial by design: it wires the
 * resources your backend actually implements and fails loudly (never silently)
 * when one is missing, so integration bugs surface immediately.
 */
export function createHttpServices(cfg: TransportConfig, persona?: Persona): HerculesServices {
  const notWired = (name: string) => () => {
    throw new Error(`HERCULES transport: ${name} is not implemented by this backend yet`);
  };
  const tasks = crud<import('@/types/domain').Task>(cfg, 'tasks');
  const agents = crud<import('@/types/domain').Agent>(cfg, 'agents');

  return {
    transport: 'http',
    persona: persona ?? { name: 'HERCULES', callsign: 'HERC-01', pronouns: 'it/its', preset: 'sentinel', initiative: 0.5, verbosity: 0.5, wit: 0.2, caution: 0.5, formality: 'terse', avatarHue: 190 },
    core: {
      phase: 'online',
      vitals: { state: 'idle', energy: 0.2, cognitiveLoad: 0, memoryPressure: 0, integrity: 100, activeAgents: 0, queuedTasks: 0, uptimeMs: 0, focus: 'connected' },
      onCoreEvent: { subscribe: (fn) => connectStream(cfg, (e) => fn(JSON.parse(e.data))) },
      boot: async () => req(cfg, 'POST', '/v1/core/boot'),
      holdState: () => () => undefined,
      shutdown: async () => req(cfg, 'POST', '/v1/core/shutdown'),
      reconfigure: async (patch: Partial<AppConfig>) => req(cfg, 'PATCH', '/v1/core/config', patch),
    },
    ai: {
      models: () => req(cfg, 'GET', '/v1/models'),
      conversation: (id) => req(cfg, 'GET', `/v1/conversations/${id}`),
      conversations: () => req(cfg, 'GET', '/v1/conversations'),
      submit: (input) => submitPrompt(cfg, input),
      stop: (conversationId) => req(cfg, 'POST', `/v1/conversations/${conversationId}/stop`),
      actAsIntent: (text) => req(cfg, 'POST', '/v1/intents', { text }),
      summarize: (taskId) => req(cfg, 'GET', `/v1/tasks/${taskId}/summary`),
    },
    agents: {
      list: agents.list,
      get: agents.get,
      spawn: agents.create,
      retire: agents.remove,
      roles: () => req(cfg, 'GET', '/v1/roles'),
      pause: (id) => req(cfg, 'POST', `/v1/agents/${id}/pause`),
      resume: (id) => req(cfg, 'POST', `/v1/agents/${id}/resume`),
      boost: (id) => req(cfg, 'POST', `/v1/agents/${id}/boost`),
      steer: (id, guidance) => req(cfg, 'POST', `/v1/agents/${id}/steer`, { guidance }),
      grantCapability: (id, scopeId) => req(cfg, 'POST', `/v1/agents/${id}/scopes`, { add: scopeId }),
      revokeCapability: (id, scopeId) => req(cfg, 'POST', `/v1/agents/${id}/scopes`, { remove: scopeId }),
      trace: (id) => req(cfg, 'GET', `/v1/agents/${id}/trace`),
      onAgentEvent: { subscribe: (fn) => connectStream(cfg, (e) => { const p = JSON.parse(e.data); if (p.channel === 'agent') fn(p); }) },
    },
    departments: {
      list: () => req<Department[]>(cfg, 'GET', '/v1/departments'),
      get: (id: string) => req(cfg, 'GET', `/v1/departments/${id}`),
      create: (input) => req(cfg, 'POST', '/v1/departments', input),
      setBudget: (id, budgetUsd) => req(cfg, 'PATCH', `/v1/departments/${id}`, { budgetUsd }),
      toggleAgentAccess: notWired('departments.toggleAgentAccess'),
      setDepartmentAutonomy: notWired('departments.setDepartmentAutonomy'),
      roster: (id) => req(cfg, 'GET', `/v1/departments/${id}/roster`),
    },
    tasks: {
      list: tasks.list,
      get: tasks.get,
      create: tasks.create,
      update: tasks.update,
      approve: (id, approved) => req(cfg, 'POST', `/v1/tasks/${id}/approval`, { approved }),
      cancel: (id) => req(cfg, 'PATCH', `/v1/tasks/${id}`, { status: 'cancelled' }),
      retry: (id) => req(cfg, 'POST', `/v1/tasks/${id}/retry`),
      assignTo: (id, agentId) => req(cfg, 'PATCH', `/v1/tasks/${id}`, { assigneeAgentId: agentId }),
      log: (id, text) => req(cfg, 'POST', `/v1/tasks/${id}/log`, { text }),
      artifacts: (taskId) => req(cfg, 'GET', `/v1/tasks/${taskId}/artifacts`),
      onTaskEvent: { subscribe: (fn) => connectStream(cfg, (e) => { const p = JSON.parse(e.data); if (p.channel === 'task') fn(p); }) },
    },
    projects: {
      list: () => req(cfg, 'GET', '/v1/projects'),
      create: (input) => req(cfg, 'POST', '/v1/projects', input),
      setStatus: (id, status) => req(cfg, 'PATCH', `/v1/projects/${id}`, { status }),
      toggleMilestone: (projectId, milestoneId) => req(cfg, 'POST', `/v1/projects/${projectId}/milestones/${milestoneId}/toggle`),
      brief: (id) => req(cfg, 'GET', `/v1/projects/${id}/brief`),
    },
    memory: {
      search: (q, opts) => req(cfg, 'POST', '/v1/memory/search', { q, ...opts }),
      list: () => req(cfg, 'GET', '/v1/memory'),
      write: (input) => req(cfg, 'POST', '/v1/memory', input),
      update: (id, patch) => req(cfg, 'PATCH', `/v1/memory/${id}`, patch),
      pin: (id, pinned) => req(cfg, 'PATCH', `/v1/memory/${id}`, { pinned }),
      delete: (id) => req(cfg, 'DELETE', `/v1/memory/${id}`),
      consolidate: () => req(cfg, 'POST', '/v1/memory/consolidate'),
      decayCurve: () => req(cfg, 'GET', '/v1/memory/decay'),
      graph: () => req(cfg, 'GET', '/v1/memory/graph'),
    },
    files: {
      tree: (root) => req(cfg, 'GET', `/v1/files/tree?root=${encodeURIComponent(root ?? '/')}`),
      list: (dirPath) => req(cfg, 'GET', `/v1/files?dir=${encodeURIComponent(dirPath)}`),
      read: (path) => req(cfg, 'GET', `/v1/files/content?path=${encodeURIComponent(path)}`),
      search: (q) => req(cfg, 'POST', '/v1/files/search', { q }),
      createFolder: (parentPath, name) => req(cfg, 'POST', '/v1/files/folder', { parentPath, name }),
      upload: (parentPath, fs) => req(cfg, 'POST', '/v1/files/upload', { parentPath, files: fs }),
      watch: (path, on) => req(cfg, 'POST', '/v1/files/watch', { path, on }),
      index: (path, on) => req(cfg, 'POST', '/v1/files/index', { path, on }),
      reveal: (path) => req(cfg, 'POST', '/v1/files/reveal', { path }),
      trash: (path) => req(cfg, 'POST', '/v1/files/trash', { path }),
      restore: (path) => req(cfg, 'POST', '/v1/files/restore', { path }),
      write: (path, content) => req(cfg, 'PUT', '/v1/files/content', { path, content }),
      trashList: () => req<{ path: string; name: string; at: string }[]>(cfg, 'GET', '/v1/files/trash'),
      audit: () => req<FileAuditEntry[]>(cfg, 'GET', '/v1/files/audit'),
    },
    knowledge: {
      sources: () => req(cfg, 'GET', '/v1/knowledge/sources'),
      addSource: (input) => req(cfg, 'POST', '/v1/knowledge/sources', input),
      rebuild: (id) => req(cfg, 'POST', `/v1/knowledge/sources/${id}/rebuild`),
      remove: (id) => req(cfg, 'DELETE', `/v1/knowledge/sources/${id}`),
      query: (text) => req(cfg, 'POST', '/v1/knowledge/query', { text }),
      chunks: (id) => req(cfg, 'GET', `/v1/knowledge/sources/${id}/chunks`),
      stats: () => req(cfg, 'GET', '/v1/knowledge/stats'),
    },
    automation: {
      list: () => req(cfg, 'GET', '/v1/automations'),
      create: (input) => req(cfg, 'POST', '/v1/automations', input),
      update: (id, patch) => req(cfg, 'PATCH', `/v1/automations/${id}`, patch),
      run: (id) => req(cfg, 'POST', `/v1/automations/${id}/run`),
      duplicate: (id) => req(cfg, 'POST', `/v1/automations/${id}/duplicate`),
      remove: (id) => req(cfg, 'DELETE', `/v1/automations/${id}`),
      workflowFor: (id) => req(cfg, 'GET', `/v1/automations/${id}/workflow`),
      onRunEvent: { subscribe: (fn) => connectStream(cfg, (e) => { const p = JSON.parse(e.data); if (p.channel === 'automation') fn(p); }) },
    },
    browser: {
      tabs: () => req(cfg, 'GET', '/v1/browser/tabs'),
      open: (url, ac) => req(cfg, 'POST', '/v1/browser/tabs', { url, agentControlled: ac }),
      close: (id) => req(cfg, 'DELETE', `/v1/browser/tabs/${id}`),
      navigate: (id, url) => req(cfg, 'POST', `/v1/browser/tabs/${id}/navigate`, { url }),
      read: (id) => req(cfg, 'POST', `/v1/browser/tabs/${id}/read`),
      act: (id, instruction) => req(cfg, 'POST', `/v1/browser/tabs/${id}/act`, { instruction }),
      history: () => req(cfg, 'GET', '/v1/browser/history'),
      permissions: () => req(cfg, 'GET', '/v1/browser/permissions'),
      setPermission: (origin, mode) => req(cfg, 'PATCH', `/v1/browser/permissions/${encodeURIComponent(origin)}`, { mode }),
    },
    terminal: {
      sessions: () => req(cfg, 'GET', '/v1/terminal/sessions'),
      create: (name, shell, cwd) => req(cfg, 'POST', '/v1/terminal/sessions', { name, shell, cwd }),
      close: (id) => req(cfg, 'DELETE', `/v1/terminal/sessions/${id}`),
      exec: (id, command, opts) => req(cfg, 'POST', `/v1/terminal/sessions/${id}/exec`, { command, ...opts }),
      buffer: (id) => req(cfg, 'GET', `/v1/terminal/sessions/${id}/buffer`),
      completions: (prefix) => req(cfg, 'GET', `/v1/terminal/completions?prefix=${encodeURIComponent(prefix)}`),
    },
    system: {
      snapshot: () => req(cfg, 'GET', '/v1/system/snapshot'),
      processes: () => req(cfg, 'GET', '/v1/system/processes'),
      kill: (pid) => req(cfg, 'POST', `/v1/system/processes/${pid}/kill`),
      integrations: () => req(cfg, 'GET', '/v1/integrations'),
      connect: (id) => req(cfg, 'POST', `/v1/integrations/${id}/connect`),
      disconnect: (id) => req(cfg, 'POST', `/v1/integrations/${id}/disconnect`),
      devices: () => req(cfg, 'GET', '/v1/system/devices'),
      setDefaultDevice: (id) => req(cfg, 'POST', `/v1/system/devices/${id}/default`),
      openSettings: (pane) => req(cfg, 'POST', '/v1/system/open-settings', { pane }),
      launchAtLogin: (on) => req(cfg, 'PATCH', '/v1/system/login-item', { on }),
      setKeepAwake: (on) => req(cfg, 'PATCH', '/v1/system/keep-awake', { on }),
      onSample: { subscribe: (fn) => connectStream(cfg, (e) => { const p = JSON.parse(e.data); if (p.channel === 'system') fn(p); }) },
    },
    analytics: {
      summary: (days) => req(cfg, 'GET', `/v1/analytics/summary?days=${days}`),
      export: () => req(cfg, 'POST', '/v1/analytics/export'),
    },
    activity: {
      list: (filter) => req(cfg, 'POST', '/v1/activity/list', filter ?? {}),
      export: (format) => req(cfg, 'POST', '/v1/activity/export', { format }),
      onEvent: { subscribe: (fn) => connectStream(cfg, (e) => { const p = JSON.parse(e.data); if (p.channel === 'activity') fn(p); }) },
    },
    notifications: {
      list: () => req(cfg, 'GET', '/v1/notifications'),
      markRead: (ids) => req(cfg, 'POST', '/v1/notifications/read', { ids }),
      markAllRead: () => req(cfg, 'POST', '/v1/notifications/read-all'),
      dismiss: (id) => req(cfg, 'DELETE', `/v1/notifications/${id}`),
      snooze: (id, minutes) => req(cfg, 'POST', `/v1/notifications/${id}/snooze`, { minutes }),
      approvals: () => req(cfg, 'GET', '/v1/approvals'),
      respond: (requestId, approved) => req(cfg, 'POST', `/v1/approvals/${requestId}`, { approved }),
      onNotice: { subscribe: (fn) => connectStream(cfg, (e) => { const p = JSON.parse(e.data); if (p.channel === 'notice') fn(p); }) },
    },
    settings: {
      get: () => req<AppConfig>(cfg, 'GET', '/v1/settings').then((c) => {
        settingsSnapshot = c;
        return c;
      }),
      current: () => settingsSnapshot,
      patch: (patch) => req(cfg, 'PATCH', '/v1/settings', patch),
      reset: () => req(cfg, 'POST', '/v1/settings/reset'),
      export: () => req(cfg, 'GET', '/v1/settings/export'),
      import: (json) => req(cfg, 'POST', '/v1/settings/import', { json }),
    },
    permissions: {
      scopes: () => req(cfg, 'GET', '/v1/permissions/scopes'),
      grant: (scopeId, tiers) => req(cfg, 'POST', '/v1/permissions/grant', { scopeId, tiers }),
      revoke: (scopeId, tiers) => req(cfg, 'POST', '/v1/permissions/revoke', { scopeId, tiers }),
      roleAccess: (agentId, access) => req(cfg, 'PATCH', `/v1/agents/${agentId}/access`, { access }),
      secrets: () => req(cfg, 'GET', '/v1/secrets'),
      rotateSecret: (id) => req(cfg, 'POST', `/v1/secrets/${id}/rotate`),
      audit: (filter) => req(cfg, 'POST', '/v1/audit/list', filter ?? {}),
      simulateAttack: notWired('permissions.simulateAttack (demo only)'),
      autonomy: () => req<AutonomyPolicy>(cfg, 'GET', '/v1/policy/autonomy'),
      setAutonomy: (patch) => req<AutonomyPolicy>(cfg, 'PATCH', '/v1/policy/autonomy', patch),
    },
    media: {
      state: () => req(cfg, 'GET', '/v1/media/state'),
      play: () => req(cfg, 'POST', '/v1/media/play'),
      pause: () => req(cfg, 'POST', '/v1/media/pause'),
      next: () => req(cfg, 'POST', '/v1/media/next'),
      prev: () => req(cfg, 'POST', '/v1/media/prev'),
      seek: (positionSec) => req(cfg, 'POST', '/v1/media/seek', { positionSec }),
      setVolume: (volume) => req(cfg, 'POST', '/v1/media/volume', { volume }),
      library: () => req<MediaArtifact[]>(cfg, 'GET', '/v1/media/library'),
      removeFromQueue: (index) => req(cfg, 'POST', '/v1/media/queue/remove', { index }),
      toggleLibraryItem: (id) => req(cfg, 'POST', `/v1/media/library/${id}/toggle`),
      toggleMute: () => req(cfg, 'POST', '/v1/media/mute'),
      setShuffle: (on) => req(cfg, 'POST', '/v1/media/shuffle', { on }),
      cycleRepeat: () => req(cfg, 'POST', '/v1/media/repeat'),
      setDevice: (device) => req(cfg, 'POST', '/v1/media/device', { device }),
      enqueue: (trackIds) => req(cfg, 'POST', '/v1/media/enqueue', { trackIds }),
      onState: { subscribe: (fn) => connectStream(cfg, (e) => { const p = JSON.parse(e.data); if (p.channel === 'media') fn(p); }) },
    },
    voice: {
      profiles: () => req(cfg, 'GET', '/v1/voice/profiles'),
      config: () => req(cfg, 'GET', '/v1/voice/config'),
      configure: (patch) => req(cfg, 'PATCH', '/v1/voice/config', patch),
      // The browser can capture locally; the backend only receives audio
      // when policy explicitly allows cloud STT.
      listen: notWired('voice.listen (delegates to the desktop shell)'),
      stop: notWired('voice.stop'),
      speak: notWired('voice.speak'),
      stopSpeaking: notWired('voice.stopSpeaking'),
      onVoiceEvent: { subscribe: (fn) => connectStream(cfg, (e) => { const p = JSON.parse(e.data); if (p.channel === 'voice') fn(p); }) },
      capabilities: async () => ({ stt: true, tts: true, wakeWord: true }),
    },
    dispose: () => undefined,
  };
}
