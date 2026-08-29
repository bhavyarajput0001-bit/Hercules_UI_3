/**
 * HERCULES · Agent estate
 * The org chart of intelligence, not a list of chatbots: tiers, delegation,
 * live load, and the controls that matter (steer, boost, park, retire).
 */
import { useMemo, useState } from 'react';
import { Icon } from '@/components/Icon';
import { Bars, Button, Chip, IconButton, Meter, Row, SectionLabel, Select, StatusDot, TextInput, Toggle, cx } from '@/components/ui';
import { actions, store, toast, ui } from '@/state/hercules';
import { useAsync } from '@/hooks/useAsync';
import { formatNum, money, relativeTime } from '@/services/mock/helpers';
import type { Agent } from '@/types/domain';

const TIERS = ['all', 'ceo', 'orchestrator', 'department', 'specialist', 'subagent', 'labor'] as const;
const TIER_LABEL: Record<string, string> = {
  ceo: 'Core / CEO',
  orchestrator: 'Orchestrator',
  department: 'Department lead',
  specialist: 'Specialized agent',
  subagent: 'Sub-agent',
  labor: 'Labour / execution',
};

export default function AgentsScreen() {
  const agents = store.use((s) => s.agents);
  const rev = store.use((s) => s.rev);
  const busy = store.use((s) => s.busy);
  const flash = store.use((s) => s.flash);
  const selected = store.use((s) => s.selected);
  const services = store.get().services;
  const [query, setQuery] = useState('');
  const [tier, setTier] = useState<(typeof TIERS)[number]>('all');
  const [onlyBusy, setOnlyBusy] = useState(false);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [recruit, setRecruit] = useState(false);
  const { data: roles } = useAsync(() => services.agents.roles(), [rev.agents]);
  const { data: departments } = useAsync(() => services.departments.list(), [rev.departments]);

  const byParent = useMemo(() => {
    const map = new Map<string | null, Agent[]>();
    for (const a of agents) {
      const k = a.parentId ?? null;
      if (!map.has(k)) map.set(k, []);
      map.get(k)!.push(a);
    }
    return map;
  }, [agents]);

  const matches = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return null;
    const set = new Set<string>();
    for (const a of agents) {
      if (`${a.name} ${a.roleId} ${a.task} ${a.capabilities.join(' ')} ${a.tier}`.toLowerCase().includes(q)) {
        set.add(a.id);
        let p = a.parentId;
        while (p) {
          set.add(p);
          p = agents.find((x) => x.id === p)?.parentId ?? null;
        }
      }
    }
    return set;
  }, [agents, query]);

  const root = agents.find((a) => a.tier === 'ceo') ?? agents[0];

  const visible = (a: Agent) => (matches ? matches.has(a.id) : true) && (tier === 'all' || a.tier === tier) && (!onlyBusy || a.status === 'working' || a.status === 'thinking' || a.status === 'blocked');

  const totals = agents.reduce(
    (acc, a) => ({
      tokens: acc.tokens + a.tokensIn + a.tokensOut,
      cost: acc.cost + a.costUsd,
      success: acc.success + a.successRate,
    }),
    { tokens: 0, cost: 0, success: 0 },
  );

  return (
    <div className="screen agents-screen">
      <div className="agents-toolbar">
        <div className="agents-toolbar__left">
          <TextInput value={query} onChange={setQuery} placeholder="Search agents, roles, tasks…" icon="search" />
          <Select value={tier} onChange={(v) => setTier(v)} options={TIERS.map((t) => ({ value: t, label: t === 'all' ? 'All tiers' : TIER_LABEL[t] ?? t }))} />
          <Toggle checked={onlyBusy} onChange={setOnlyBusy} label="Engaged only" />
          <Chip size="sm" tone="dim" icon="users">{agents.length} recruited</Chip>
          <Chip size="sm" tone="accent" icon="bolt">{agents.filter((a) => a.status === 'working' || a.status === 'thinking').length} engaged</Chip>
          <Chip size="sm" tone={agents.some((a) => a.status === 'error') ? 'danger' : 'dim'} icon="alert">{agents.filter((a) => a.status === 'blocked' || a.status === 'error').length} in trouble</Chip>
        </div>
        <div className="agents-toolbar__right">
          <Button icon="copy" size="sm" onClick={() => { navigator.clipboard?.writeText(agents.map((a) => `${a.id}\t${a.name}\t${a.status}\t${a.load}%\t${a.task}`).join('\n')); toastOk('Estate copied to clipboard', `${agents.length} rows`); }}>
            Copy
          </Button>
          <Button icon="refresh" size="sm" busy={!!busy['agents.refresh']} onClick={() => { void actions.refreshAgents(); toastOk('Registry re-read'); }}>
            Re-read
          </Button>
          <Button icon="lock" size="sm" variant="outline" onClick={() => void actions.freezeEstate()}>
            Freeze estate
          </Button>
          <Button icon="plus" size="sm" variant="solid" onClick={() => setRecruit(true)}>
            Recruit agent
          </Button>
        </div>
      </div>

      <div className="split split--a">
        <section className="hud__panel agents-tree-panel">
          <header className="hud__panel-head">
            <div className="hud__panel-title">
              <Icon name="department" size={14} className="hud__panel-icon" />
              <div>
                <h3>Delegation tree</h3>
                <p className="hud__panel-sub">USER → CORE → ORCHESTRATOR → DEPARTMENTS → SPECIALISTS → SUB-AGENTS → LABOUR → TOOLS</p>
              </div>
            </div>
            <div className="hud__panel-actions">
              <Button size="sm" variant="bare" onClick={() => setCollapsed({})}>
                expand all
              </Button>
            </div>
          </header>
          <div className="hud__panel-body agents-tree">
            <div className="tree__operator">
              <Icon name="users" size={13} />
              <b>Operator · you</b>
              <span className="dim mono">clearance: owner</span>
            </div>
            {root ? (
              <Node agent={root} byParent={byParent} visible={visible} collapsed={collapsed} setCollapsed={setCollapsed} depth={0} selectedId={selected?.kind === 'agent' ? selected.id : null} departments={departments ?? []} />
            ) : (
              <div className="dim">Registry empty.</div>
            )}
            {(() => {
              const orphans = agents.filter((a) => a.parentId && !agents.some((p) => p.id === a.parentId));
              if (!orphans.length) return null;
              return (
                <div className="tree__orphans">
                  <SectionLabel>Unparented ({orphans.length})</SectionLabel>
                  {orphans.map((a) => (
                    <Leaf key={a.id} agent={a} selected={selected?.id === a.id} department={departments?.find((d) => d.id === a.departmentId)} />
                  ))}
                </div>
              );
            })()}
          </div>
        </section>

        <div className="stack">
          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="analytics" size={14} className="hud__panel-icon" />
                <div>
                  <h3>Fleet telemetry</h3>
                  <p className="hud__panel-sub">Aggregate of everything running.</p>
                </div>
              </div>
            </header>
            <div className="hud__panel-body">
              <div className="fleet-stats">
                <div>
                  <b className="mono">{formatNum(totals.tokens)}</b>
                  <span>tokens this cycle</span>
                </div>
                <div>
                  <b className="mono">{money(totals.cost)}</b>
                  <span>spend</span>
                </div>
                <div>
                  <b className="mono">{Math.round((totals.success / Math.max(1, agents.length)) * 100)}%</b>
                  <span>avg success</span>
                </div>
              </div>
              <SectionLabel>Load by agent</SectionLabel>
              <Bars data={agents.filter((a) => a.status === 'working').slice(0, 10).map((a) => ({ label: (a.name.split(' ')[0] ?? a.name).slice(0, 5), value: a.load }))} height={58} onPick={(l) => ui.select({ kind: 'agent', id: agents.find((a) => a.name.startsWith(l))?.id ?? '', label: l })} />
            </div>
          </section>

          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="bolt" size={14} className="hud__panel-icon" />
                <div>
                  <h3>Labour pool</h3>
                  <p className="hud__panel-sub">Dumb, fast, parallel. Restricted scopes by policy.</p>
                </div>
              </div>
              <span className="badge">{agents.filter((a) => a.tier === 'subagent' || a.tier === 'labor').length}</span>
            </header>
            <div className="hud__panel-body">
              {agents
                .filter((a) => a.tier === 'subagent' || a.tier === 'labor')
                .map((a) => (
                  <Row key={a.id} className="labour-row" onClick={() => ui.select({ kind: 'agent', id: a.id, label: a.name })} flash={!!flash[`agent:${a.id}`]}>
                    <StatusDot status={a.status} />
                    <div>
                      <b className="mono">{a.name}</b>
                      <span>{a.task}</span>
                      {a.stepsTotal > 0 && <Meter value={a.stepsCompleted} max={a.stepsTotal} tone="accent2" height={2} />}
                    </div>
                    <em className="mono">{formatNum(a.tokensIn + a.tokensOut)}</em>
                  </Row>
                ))}
            </div>
            <footer className="hud__panel-foot">
              <Icon name="shield" size={11} /> labour agents cannot write outside the sandbox, spend above $0.50, or touch secrets
            </footer>
          </section>

          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="route" size={14} className="hud__panel-icon" />
                <div>
                  <h3>Model per agent</h3>
                  <p className="hud__panel-sub">What the router assigned, and why.</p>
                </div>
              </div>
            </header>
            <div className="hud__panel-body">
              <ModelMix agents={agents} />
            </div>
          </section>
        </div>
      </div>

      {recruit && <RecruitModal roles={roles ?? []} departments={departments ?? []} onClose={() => setRecruit(false)} />}
    </div>
  );
}

/* ── tree ────────────────────────────────────────────────────────────────── */

function Node({
  agent,
  byParent,
  visible,
  collapsed,
  setCollapsed,
  depth,
  selectedId,
  departments,
}: {
  agent: Agent;
  byParent: Map<string | null, Agent[]>;
  visible: (a: Agent) => boolean;
  collapsed: Record<string, boolean>;
  setCollapsed: (v: Record<string, boolean>) => void;
  depth: number;
  selectedId: string | null;
  departments: import('@/types/domain').Department[];
}) {
  const kids = (byParent.get(agent.id) ?? []).filter(visible);
  const open = !collapsed[agent.id];
  const dep = departments.find((d) => d.id === agent.departmentId);
  return (
    <div className={cx('node', `node--${agent.tier}`)} style={{ ['--depth' as string]: depth }}>
      <div className={cx('node__row', selectedId === agent.id && 'is-selected')}>
        {kids.length > 0 ? (
          <button
            type="button"
            className="node__twist"
            onClick={() => setCollapsed({ ...collapsed, [agent.id]: open })}
            aria-label={open ? 'Collapse' : 'Expand'}
          >
            <Icon name={open ? 'chevDown' : 'chevRight'} size={10} />
          </button>
        ) : (
          <span className="node__twist node__twist--leaf" />
        )}
        <StatusDot status={agent.status} />
        <button type="button" className="node__main" onClick={() => ui.select({ kind: 'agent', id: agent.id, label: agent.name }, { inspector: true })}>
          <b>{agent.name}</b>
          <span className="node__task">{agent.task}</span>
        </button>
        {dep && <span className="node__dep" style={{ ['--c' as string]: dep.color }}>{dep.code}</span>}
        <span className="node__load">
          <Meter value={agent.load} tone={agent.load > 88 ? 'warn' : 'accent'} height={2} />
          <em className="mono">{agent.load}%</em>
        </span>
        <Chip size="sm" tone={agent.risk === 'critical' ? 'danger' : agent.risk === 'high' ? 'warn' : 'dim'}>{agent.risk}</Chip>
        <span className="node__tools">
          <IconButton icon={agent.status === 'working' || agent.status === 'thinking' ? 'pause' : 'play'} size="sm" title={agent.status === 'working' ? 'Park' : 'Resume'} onClick={() => void (agent.status === 'working' || agent.status === 'thinking' ? actions.pauseAgent(agent.id) : actions.resumeAgent(agent.id))} />
          <IconButton icon="bolt" size="sm" title="Boost to frontier model" onClick={() => void actions.boostAgent(agent.id)} />
          <IconButton icon="spark" size="sm" title="Steer" onClick={() => ui.select({ kind: 'agent', id: agent.id, label: agent.name })} />
        </span>
      </div>
      {open && kids.length > 0 && (
        <div className="node__kids">
          {kids.map((k) => (
            <Node key={k.id} agent={k} byParent={byParent} visible={visible} collapsed={collapsed} setCollapsed={setCollapsed} depth={depth + 1} selectedId={selectedId} departments={departments} />
          ))}
        </div>
      )}
    </div>
  );
}

function Leaf({ agent, selected, department }: { agent: Agent; selected: boolean; department?: { name: string } }) {
  return (
    <Row className={cx('leaf', selected && 'is-active')} onClick={() => ui.select({ kind: 'agent', id: agent.id, label: agent.name })}>
      <StatusDot status={agent.status} />
      <div>
        <b>{agent.name}</b>
        <span>{agent.task}</span>
      </div>
      {department && <Chip size="sm" tone="dim">{department.name}</Chip>}
      <em className="mono">{agent.load}%</em>
    </Row>
  );
}

/* ── model mix ───────────────────────────────────────────────────────────── */

function ModelMix({ agents }: { agents: Agent[] }) {
  const services = store.get().services;
  const { data: models } = useAsync(() => services.ai.models(), []);
  const grouped = agents.reduce<Record<string, number>>((acc, a) => {
    acc[a.modelId] = (acc[a.modelId] ?? 0) + 1;
    return acc;
  }, {});
  return (
    <div className="modelmix">
      {Object.entries(grouped)
        .sort((a, b) => b[1] - a[1])
        .map(([id, count]) => {
          const m = models?.find((x) => x.id === id);
          return (
            <div key={id} className="modelmix__row">
              <span className="modelmix__dot" data-local={m?.provider === 'local'} />
              <b>{m?.name ?? id}</b>
              <span className="dim">{m?.providerLabel ?? '—'}</span>
              <em className="mono">{count}</em>
              <span className="modelmix__bar" style={{ ['--w' as string]: `${(count / agents.length) * 100}%` }} />
            </div>
          );
        })}
      {!agents.length && <div className="dim">No agents.</div>}
    </div>
  );
}

/* ── recruit modal ───────────────────────────────────────────────────────── */

function RecruitModal({ roles, departments, onClose }: { roles: import('@/types/domain').AgentRole[]; departments: { id: string; name: string }[]; onClose: () => void }) {
  const [name, setName] = useState('');
  const [roleId, setRoleId] = useState(roles[3]?.id ?? roles[0]?.id ?? 'executor');
  const [dept, setDept] = useState(departments[1]?.id ?? '');
  const [autonomy, setAutonomy] = useState(0.5);
  const [risk, setRisk] = useState<Agent['risk']>('medium');
  const busy = store.use((s) => !!s.busy['agents.spawn']);
  const role = roles.find((r) => r.id === roleId);

  return (
    <div className="scrim" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <header className="modal__head">
          <div>
            <span className="mono modal__eyebrow">AGENT REGISTRY</span>
            <h2>Recruit an agent</h2>
            <p>Access inherits from the role. Nothing is granted beyond it without your approval.</p>
          </div>
          <IconButton icon="close" onClick={onClose} title="Close" />
        </header>
        <div className="modal__body">
          <div className="field">
            <div className="field__head">
              <label>Name</label>
            </div>
            <TextInput value={name} onChange={setName} placeholder={role ? `${role.name} · new` : 'New agent'} />
          </div>
          <div className="g2">
            <div className="field">
              <div className="field__head">
                <label>Role</label>
              </div>
              <Select value={roleId} onChange={setRoleId} options={roles.map((r) => ({ value: r.id, label: `${r.name} · ${r.category}` }))} />
            </div>
            <div className="field">
              <div className="field__head">
                <label>Department</label>
              </div>
              <Select value={dept} onChange={setDept} options={[{ value: '', label: 'Unassigned' }, ...departments.map((d) => ({ value: d.id, label: d.name }))]} />
            </div>
          </div>
          {role && (
            <div className="modal__rolecard">
              <div>
                <b>{role.name}</b>
                <p>{role.description}</p>
              </div>
              <div className="cluster">
                {role.tools.map((t) => (
                  <Chip key={t} size="sm" tone="dim" icon="bolt">
                    {t}
                  </Chip>
                ))}
              </div>
              <KV2
                items={[
                  { k: 'Default model tier', v: role.defaultModelTier },
                  { k: 'Role access', v: role.access },
                  { k: 'Default autonomy', v: `${Math.round(role.autonomy * 100)}%` },
                ]}
              />
            </div>
          )}
          <div className="field">
            <div className="field__head">
              <label>Autonomy</label>
              <span className="mono dim">{Math.round(autonomy * 100)}%</span>
            </div>
            <input type="range" min={0} max={1} step={0.05} value={autonomy} onChange={(e) => setAutonomy(Number(e.target.value))} className="range" />
            <small className="field__hint">
              {autonomy < 0.34 ? 'Asks before each consequential step. Slow, safe.' : autonomy < 0.7 ? 'Acts within scope, reports at boundaries.' : 'Runs the whole objective unattended; only gates stop it.'}
            </small>
          </div>
          <div className="field">
            <div className="field__head">
              <label>Risk classification</label>
            </div>
            <SegmentedRisk value={risk} onChange={setRisk} />
          </div>
        </div>
        <footer className="modal__foot">
          <span className="dim mono">projected cost · ${(role?.defaultModelTier === 'frontier' ? 0.42 : role?.defaultModelTier === 'balanced' ? 0.11 : 0.02).toFixed(2)}/objective</span>
          <span className="spacer" />
          <Button onClick={onClose}>Cancel</Button>
          <Button
            variant="solid"
            icon="plus"
            busy={busy}
            onClick={() =>
              void actions.spawnAgent({ name: name.trim() || `${role?.name ?? 'Agent'} · new`, roleId, departmentId: dept || null, autonomy, risk }).then(() => onClose())
            }
          >
            Recruit
          </Button>
        </footer>
      </div>
    </div>
  );
}

function SegmentedRisk({ value, onChange }: { value: Agent['risk']; onChange: (v: Agent['risk']) => void }) {
  const opts: Agent['risk'][] = ['low', 'medium', 'high', 'critical'];
  return (
    <div className="segmented">
      {opts.map((o) => (
        <button key={o} type="button" className={cx('segmented__item', value === o && 'is-active')} onClick={() => onChange(o)}>
          {o}
        </button>
      ))}
    </div>
  );
}

function KV2({ items }: { items: { k: string; v: string }[] }) {
  return (
    <div className="kv kv--dense">
      {items.map((i) => (
        <div className="kv__row" key={i.k}>
          <dt>{i.k}</dt>
          <dd>{i.v}</dd>
        </div>
      ))}
    </div>
  );
}

function toastOk(title: string, body?: string) {
  toast({ title, body, severity: 'success', ttlMs: 3_400 });
}

export const agentsRelative = relativeTime;
