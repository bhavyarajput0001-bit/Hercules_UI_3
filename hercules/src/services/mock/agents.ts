/**
 * HERCULES · mock agents / departments / tasks / projects
 */
import type { AgentService, DepartmentService, ProjectService, TaskService } from '@/services/contracts';
import type { Agent, AgentStatus, Department, Project, Task, TaskEvent } from '@/types/domain';
import { models, roles } from './fixtures';
import { agentBus, holdState, logCore, pushActivity, pushNotice, recomputeVitals, taskBus, world } from './runtime';
import { chance, clamp, iso, jitter, pick, rand, randInt, uid } from './helpers';

export const mockAgents: AgentService = {
  onAgentEvent: agentBus,
  async list() {
    await jitter(40, 90);
    return world.agents.map((a) => ({ ...a }));
  },
  async roles() {
    await jitter();
    return roles;
  },
  async get(id) {
    const a = world.agents.find((x) => x.id === id);
    return a ? { ...a } : null;
  },
  async spawn(input) {
    await jitter(220, 500);
    const role = roles.find((r) => r.id === input.roleId) ?? roles[0]!;
    const model =
      models.find((m) => m.tier === role.defaultModelTier && (m.status === 'ready' || m.status === 'slow')) ?? models[1]!;
    const agent: Agent = {
      id: uid('agt'),
      name: input.name.trim() || `${role.name} · new`,
      roleId: role.id,
      tier: role.category === 'Execution' ? 'labor' : 'specialist',
      departmentId: input.departmentId,
      parentId: input.parentId ?? 'agt-hercules',
      childIds: [],
      status: 'recruited',
      load: 6,
      autonomy: clamp(input.autonomy, 0, 1),
      risk: input.risk,
      capabilities: (world.departments.find((d) => d.id === input.departmentId)?.tools ?? []).slice(0, 3),
      modelId: model.id,
      task: 'Calibrating role · reading policy',
      stepsCompleted: 0,
      stepsTotal: 0,
      tokensIn: 0,
      tokensOut: 0,
      costUsd: 0,
      successRate: 0.9,
      lastHeartbeat: iso(),
    };
    world.agents = [...world.agents, agent];
    if (agent.parentId) {
      const parent = world.agents.find((a) => a.id === agent.parentId);
      if (parent) parent.childIds = [...parent.childIds, agent.id];
    }
    const dep = world.departments.find((d) => d.id === input.departmentId);
    if (dep) dep.agentIds = [...dep.agentIds, agent.id];
    agentBus.emit({ type: 'updated', agent: { ...agent } });
    pushActivity('agent', 'HERCULES', `recruited ${agent.name}`, `${role.name} · ${model.name} · autonomy ${Math.round(input.autonomy * 100)}%`);
    logCore('success', 'registry', `Recruited ${agent.name} under ${dep?.name ?? 'Command'} · scopes inherited from role “${role.name}”`);
    recomputeVitals();

    window.setTimeout(() => {
      agent.status = 'idle';
      agent.task = 'Ready · no objective assigned';
      agentBus.emit({ type: 'updated', agent: { ...agent } });
    }, 1_600);
    return agent;
  },
  async retire(id) {
    await jitter(140, 220);
    const a = world.agents.find((x) => x.id === id);
    if (!a) return;
    world.agents = world.agents.filter((x) => x.id !== id);
    if (a.parentId) {
      const p = world.agents.find((x) => x.id === a.parentId);
      if (p) p.childIds = p.childIds.filter((c) => c !== id);
    }
    const dep = world.departments.find((d) => d.id === a.departmentId);
    if (dep) dep.agentIds = dep.agentIds.filter((x) => x !== id);
    for (const t of world.tasks) if (t.assigneeAgentId === id) t.assigneeAgentId = null;
    agentBus.emit({ type: 'removed', id });
    pushActivity('agent', 'HERCULES', `retired ${a.name}`, 'process reclaimed · scopes revoked');
    recomputeVitals();
  },
  async pause(id) {
    const a = world.agents.find((x) => x.id === id);
    if (!a) return;
    a.status = 'idle';
    a.task = `Paused by operator · ${a.stepsCompleted}/${Math.max(1, a.stepsTotal)} steps retained`;
    agentBus.emit({ type: 'updated', agent: { ...a } });
    pushActivity('agent', a.name, 'paused by operator', 'queue frozen, no new dispatches');
    recomputeVitals();
  },
  async resume(id) {
    const a = world.agents.find((x) => x.id === id);
    if (!a) return;
    a.status = 'working';
    a.task = a.task.startsWith('Paused') ? a.task.replace('Paused by operator · ', 'Resumed · ') : 'Resumed · re-acquired context';
    agentBus.emit({ type: 'updated', agent: { ...a } });
    pushActivity('agent', a.name, 'resumed', 're-acquired context from memory');
    recomputeVitals();
  },
  async boost(id) {
    const release = holdState('executing', `boost:${id}`);
    await jitter(500, 900);
    const a = world.agents.find((x) => x.id === id);
    if (a) {
      a.load = Math.round(clamp(a.load + rand(8, 22), 10, 99));
      a.stepsTotal = Math.max(1, a.stepsTotal);
      a.stepsCompleted = Math.min(a.stepsTotal, a.stepsCompleted + randInt(2, 6));
      a.modelId = models.find((m) => m.tier === 'frontier')!.id;
      a.task = `Boosted · ${models.find((m) => m.tier === 'frontier')!.name} engaged for this objective`;
      agentBus.emit({ type: 'updated', agent: { ...a } });
      pushActivity('agent', a.name, 'boosted to frontier tier', 'projected +$0.42 for this objective');
      logCore('info', 'router', `Boost applied to ${a.name} · cost override accepted`);
    }
    release();
    recomputeVitals();
  },
  async steer(id, guidance) {
    const a = world.agents.find((x) => x.id === id);
    if (!a) return;
    const release = holdState('thinking', `steer:${id}`);
    await jitter(280, 520);
    a.status = 'working';
    a.task = `Steered · ${guidance.slice(0, 84)}`;
    a.stepsTotal = Math.max(a.stepsTotal, a.stepsCompleted + randInt(2, 5));
    agentBus.emit({ type: 'updated', agent: { ...a } });
    const ev: TaskEvent = { at: iso(), actor: 'Operator', kind: 'note', text: `Steering: ${guidance}` };
    for (const t of world.tasks) if (t.assigneeAgentId === id) t.events = [ev, ...t.events];
    pushActivity('agent', a.name, 'received operator guidance', guidance.slice(0, 90));
    release();
  },
  async grantCapability(id, scopeId) {
    await jitter();
    const a = world.agents.find((x) => x.id === id);
    if (!a || a.capabilities.includes(scopeId)) return;
    a.capabilities = [...a.capabilities, scopeId];
    agentBus.emit({ type: 'updated', agent: { ...a } });
    pushActivity('security', 'Operator', `granted ${scopeId}`, `to ${a.name} · audited`, true);
  },
  async revokeCapability(id, scopeId) {
    await jitter();
    const a = world.agents.find((x) => x.id === id);
    if (!a) return;
    a.capabilities = a.capabilities.filter((c) => c !== scopeId);
    agentBus.emit({ type: 'updated', agent: { ...a } });
    pushActivity('security', 'Operator', `revoked ${scopeId}`, `from ${a.name}`, true);
  },
  async trace(id) {
    await jitter(80, 160);
    const a = world.agents.find((x) => x.id === id);
    if (!a) return [];
    const base = world.tasks.find((t) => t.assigneeAgentId === id);
    const lines: TaskEvent[] = [
      { at: iso(), actor: a.name, kind: 'status', text: `heartbeat · load ${a.load}% · ${a.stepsCompleted}/${Math.max(1, a.stepsTotal)} steps` },
      { at: iso(), actor: a.name, kind: 'tool', text: base ? `working “${base.title}”` : 'no bound task · standing by' },
      { at: iso(), actor: 'router', kind: 'tool', text: `model ${models.find((m) => m.id === a.modelId)?.name} · ${a.tokensIn + a.tokensOut} tokens this objective` },
      ...(a.childIds.length ? [{ at: iso(), actor: a.name, kind: 'step' as const, text: `dispatched ${a.childIds.length} sub-agent(s)` }] : []),
      ...(base?.events ?? []).slice(0, 4),
    ];
    if (a.status === 'blocked') lines.unshift({ at: iso(), actor: a.name, kind: 'error', text: 'blocked: waiting on operator decision' });
    if (a.status === 'awaiting-approval') lines.unshift({ at: iso(), actor: a.name, kind: 'approval', text: 'approval request raised' });
    return lines;
  },
};

export const mockDepartments: DepartmentService = {
  async list() {
    await jitter(60, 120);
    return world.departments.map((d) => ({ ...d }));
  },
  async get(id) {
    return world.departments.find((d) => d.id === id) ?? null;
  },
  async create(input) {
    await jitter(220, 420);
    const dep: Department = {
      id: uid('dep'),
      name: input.name,
      code: (input.code || input.name.slice(0, 3)).toUpperCase().slice(0, 4),
      mission: input.mission,
      leadAgentId: 'agt-hercules',
      agentIds: [],
      status: 'standing-by',
      throughput: 0,
      backlogPressure: 0,
      budgetUsd: 250,
      spentUsd: 0,
      tools: [],
      kpis: [
        { label: 'Agents', value: '0' },
        { label: 'Objectives', value: '0' },
      ],
      color: pick(['#46e8ff', '#7d8cff', '#5ff0c0', '#ff7ad9', '#ffc861', '#9df99b']),
      icon: 'ops',
    };
    world.departments = [...world.departments, dep];
    pushActivity('agent', 'HERCULES', `opened department ${dep.name}`, dep.code);
    logCore('success', 'registry', `Department ${dep.name} established · no agents assigned yet`);
    return dep;
  },
  async setBudget(id, budgetUsd) {
    const d = world.departments.find((x) => x.id === id);
    if (!d) return;
    d.budgetUsd = Math.round(budgetUsd);
    pushActivity('system', 'Operator', `set ${d.name} budget`, `$${d.budgetUsd}/mo · enforced by router`);
  },
  async toggleAgentAccess(id, agentId, enabled) {
    const d = world.departments.find((x) => x.id === id);
    const a = world.agents.find((x) => x.id === agentId);
    if (!d || !a) return;
    if (enabled && !d.agentIds.includes(agentId)) {
      d.agentIds = [...d.agentIds, agentId];
      a.departmentId = d.id;
    } else if (!enabled) {
      d.agentIds = d.agentIds.filter((x) => x !== agentId);
      a.departmentId = null;
    }
    agentBus.emit({ type: 'updated', agent: { ...a } });
    pushActivity('security', 'Operator', enabled ? `attached ${a.name}` : `detached ${a.name}`, `${d.name} · scopes ${enabled ? 'inherited' : 'revoked'}`, true);
  },
  async setDepartmentAutonomy(id, autonomy) {
    await jitter(60, 120);
    const d = world.departments.find((x) => x.id === id);
    if (!d) return;
    for (const a of world.agents.filter((x) => x.departmentId === id)) a.autonomy = clamp(autonomy, 0, 1);
    logCore('info', 'registry', `${d.name} autonomy set to ${Math.round(autonomy * 100)}%`);
    pushActivity('security', 'Operator', `set ${d.name} autonomy`, `${Math.round(autonomy * 100)}%`);
  },
  async roster(departmentId) {
    return world.agents.filter((a) => a.departmentId === departmentId).map((a) => ({ ...a }));
  },
};

export const mockTasks: TaskService = {
  onTaskEvent: taskBus,
  async list() {
    await jitter(40, 120);
    return world.tasks.map((t) => ({ ...t }));
  },
  async get(id) {
    return world.tasks.find((t) => t.id === id) ?? null;
  },
  async create(input) {
    await jitter(180, 360);
    const needsApproval = input.priority === 'p0' || chance(0.25);
    const task: Task = {
      id: uid('tsk'),
      title: input.title,
      objective: input.objective || input.title,
      status: needsApproval ? 'awaiting-approval' : 'queued',
      priority: input.priority,
      assigneeAgentId: input.assigneeAgentId,
      departmentId: input.departmentId,
      projectId: input.projectId,
      progress: 0,
      estimateMin: input.estimateMin,
      elapsedMin: 0,
      requiresApproval: needsApproval,
      approvalReason: needsApproval ? 'Priority p0 / outbound effect — standing policy requires a signature.' : undefined,
      tags: ['created-in-ui'],
      events: [{ at: iso(), actor: 'Operator', kind: 'status', text: `Created · routed to ${world.departments.find((d) => d.id === input.departmentId)?.name ?? 'HERCULES'}` }],
      artifacts: [],
      createdAt: iso(),
      updatedAt: iso(),
    };
    world.tasks = [task, ...world.tasks];
    taskBus.emit({ type: 'created', task: { ...task } });
    pushActivity('task', 'Operator', `created “${task.title}”`, task.priority.toUpperCase());
    const release = holdState('thinking', 'task.create');
    window.setTimeout(() => {
      release();
      if (!task.requiresApproval) {
        task.status = 'in-progress';
        task.events = [{ at: iso(), actor: 'HERCULES', kind: 'plan', text: 'Plan accepted · 4 phases · verification gate before hand-off' }, ...task.events];
        taskBus.emit({ type: 'updated', task: { ...task } });
        const a = world.agents.find((x) => x.id === task.assigneeAgentId);
        if (a) {
          a.status = 'working' as AgentStatus;
          a.task = task.title.slice(0, 72);
          a.stepsTotal = randInt(6, 24);
          agentBus.emit({ type: 'updated', agent: { ...a } });
        }
        logCore('info', 'core', `Dispatched “${task.title}” → ${a?.name ?? 'unassigned'}`);
      }
      recomputeVitals();
    }, 1_200);
    return task;
  },
  async update(id, patch) {
    const t = world.tasks.find((x) => x.id === id);
    if (!t) throw new Error('E_NOT_FOUND');
    Object.assign(t, patch, { updatedAt: iso() });
    if (patch.status === 'done') t.progress = 100;
    taskBus.emit({ type: 'updated', task: { ...t } });
    pushActivity('task', 'Operator', `set ${t.title} → ${patch.status}`, patch.status);
    recomputeVitals();
    return { ...t };
  },
  async approve(id, approved) {
    const release = holdState('executing', `approve:${id}`);
    await jitter(260, 460);
    const t = world.tasks.find((x) => x.id === id);
    if (!t) return release();
    t.requiresApproval = false;
    t.status = approved ? 'in-progress' : 'cancelled';
    t.events = [
      { at: iso(), actor: 'Operator', kind: 'approval', text: approved ? 'Approved · autonomy granted for this objective' : 'Denied · objective returned to backlog' },
      ...t.events,
    ];
    world.approvals = world.approvals.filter((a) => a.id !== `apr:${id}`);
    taskBus.emit({ type: 'updated', task: { ...t } });
    pushActivity('task', 'Operator', approved ? `approved “${t.title}”` : `denied “${t.title}”`, 'decision recorded in audit');
    logCore(approved ? 'success' : 'warn', 'approval', `${approved ? 'Approved' : 'Denied'}: ${t.title}`);
    if (approved) {
      const a = world.agents.find((x) => x.id === t.assigneeAgentId);
      if (a) {
        a.status = 'working';
        agentBus.emit({ type: 'updated', agent: { ...a } });
      }
      pushNotice({
        severity: 'success',
        title: `Dispatched · ${t.title}`,
        body: 'Agents are moving. I will interrupt only if it needs you again.',
        source: 'Task engine',
        actionable: false,
      });
    }
    release();
    recomputeVitals();
  },
  async cancel(id) {
    const t = world.tasks.find((x) => x.id === id);
    if (!t) return;
    t.status = 'cancelled';
    t.updatedAt = iso();
    taskBus.emit({ type: 'updated', task: { ...t } });
    pushActivity('task', 'Operator', `cancelled “${t.title}”`, 'labour pool released');
    recomputeVitals();
  },
  async retry(id) {
    const t = world.tasks.find((x) => x.id === id);
    if (!t) return;
    const release = holdState('executing', `retry:${id}`);
    await jitter(320, 620);
    t.status = 'in-progress';
    t.progress = Math.max(0, t.progress - 6);
    t.events = [{ at: iso(), actor: 'HERCULES', kind: 'status', text: 'Retried with backoff · same plan, new sub-agent tree' }, ...t.events];
    taskBus.emit({ type: 'updated', task: { ...t } });
    pushActivity('task', 'HERCULES', `retried “${t.title}”`, 'queue position 1');
    logCore('info', 'core', `Retry scheduled for ${t.title}`);
    release();
  },
  async assignTo(id, agentId) {
    const t = world.tasks.find((x) => x.id === id);
    const a = world.agents.find((x) => x.id === agentId);
    if (!t || !a) return;
    t.assigneeAgentId = agentId;
    t.departmentId = a.departmentId;
    t.status = t.status === 'backlog' ? 'queued' : t.status;
    taskBus.emit({ type: 'updated', task: { ...t } });
    if (a.status === 'idle') {
      a.status = 'working';
      a.task = t.title.slice(0, 72);
      agentBus.emit({ type: 'updated', agent: { ...a } });
    }
    pushActivity('task', 'Operator', `assigned “${t.title}”`, `→ ${a.name}`);
    recomputeVitals();
  },
  async log(id, text) {
    const t = world.tasks.find((x) => x.id === id);
    if (!t) return;
    t.events = [{ at: iso(), actor: 'Operator', kind: 'note', text }, ...t.events];
    taskBus.emit({ type: 'updated', task: { ...t } });
  },
  async artifacts(taskId) {
    const t = world.tasks.find((x) => x.id === taskId);
    return t ? [...t.artifacts] : [];
  },
};

export const mockProjects: ProjectService = {
  async list() {
    await jitter(50, 110);
    return world.projects.map((p) => ({ ...p }));
  },
  async create(input) {
    await jitter(220, 400);
    const p: Project = {
      id: uid('prj'),
      name: input.name,
      codename: input.codename.toUpperCase() || 'NEW',
      goal: input.goal,
      status: 'planning',
      progress: 0,
      departmentIds: [],
      taskIds: [],
      riskScore: 30,
      budgetUsd: input.budgetUsd,
      spentUsd: 0,
      due: input.due,
      milestones: [],
      color: pick(['#7d8cff', '#46e8ff', '#5ff0c0', '#ffc861', '#ff7ad9']),
    };
    world.projects = [p, ...world.projects];
    pushActivity('task', 'Operator', `opened project ${p.name}`, p.codename);
    logCore('success', 'core', `Project ${p.codename} initialised · ask me to staff it`);
    return p;
  },
  async setStatus(id, status) {
    const p = world.projects.find((x) => x.id === id);
    if (!p) return;
    p.status = status;
    pushActivity('task', 'Operator', `set ${p.codename} → ${status}`);
  },
  async toggleMilestone(projectId, milestoneId) {
    const p = world.projects.find((x) => x.id === projectId);
    if (!p) throw new Error('E_NOT_FOUND');
    const ms = p.milestones.find((m) => m.id === milestoneId);
    if (ms) ms.done = !ms.done;
    p.progress = Math.round(clamp((p.milestones.filter((m) => m.done).length / Math.max(1, p.milestones.length)) * 100, 0, 100));
    pushActivity('task', 'Operator', `${ms?.done ? 'cleared' : 'reopened'} milestone “${ms?.name}”`, p.codename);
    return { ...p };
  },
  async brief(id) {
    const release = holdState('thinking', 'project.brief');
    await jitter(420, 900);
    const p = world.projects.find((x) => x.id === id);
    release();
    if (!p) return 'No such project.';
    const tasks = world.tasks.filter((t) => t.projectId === id);
    const risk = tasks.filter((t) => t.status === 'blocked' || t.status === 'failed');
    return [
      `${p.codename} is at ${p.progress}%. Goal: ${p.goal}`,
      `${tasks.length} tasks tracked · ${tasks.filter((t) => t.status === 'done').length} closed · ${risk.length} in trouble.`,
      risk.length ? `The thing that will actually move the date: ${risk[0]!.title}. I have Engineering Lead and Infrastructure both pointed at it.` : 'Nothing is blocking the date. I would ship the onboarding kit next — it is the long pole for partner perception.',
      `Spend $${p.spentUsd} of $${p.budgetUsd}. Due ${new Date(p.due).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}.`,
    ].join('\n');
  },
};
