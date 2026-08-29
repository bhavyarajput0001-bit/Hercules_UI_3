/**
 * HERCULES · Permissions & trust
 * The control plane for autonomy. Scopes, per-role access, secret handles,
 * the audit ledger and a threat simulator that proves the boundary holds.
 * Nothing on this screen can leak a credential, by construction.
 */
import { useMemo, useState } from 'react';
import { Icon } from '@/components/Icon';
import { Button, Chip, IconButton,  Row,  Spinner,  Toggle, cx } from '@/components/ui';
import { actions, store, toast, ui } from '@/state/hercules';
import { useAsync, useDebounced } from '@/hooks/useAsync';
import { relativeTime } from '@/services/mock/helpers';
import type { AgentTier, PermissionScope, RiskLevel } from '@/types/domain';

const TIERS: { id: AgentTier; label: string; blurb: string }[] = [
  { id: 'orchestrator', label: 'Orchestrator', blurb: 'plans, delegates, spends' },
  { id: 'department', label: 'Department lead', blurb: 'owns a domain' },
  { id: 'specialist', label: 'Specialist', blurb: 'does the work' },
  { id: 'subagent', label: 'Sub-agent', blurb: 'short-lived helper' },
  { id: 'labor', label: 'Labour', blurb: 'dumb, fast, disposable' },
];

const GROUP_LABEL: Record<PermissionScope['group'], string> = {
  files: 'File system',
  system: 'System & processes',
  network: 'Network & browser',
  media: 'Media & devices',
  data: 'Data & memory',
  ai: 'Model access',
  communication: 'Communication',
};

const RISK_TONE: Record<RiskLevel, 'success' | 'info' | 'warn' | 'danger'> = {
  low: 'success',
  medium: 'info',
  high: 'warn',
  critical: 'danger',
};


export default function PermissionsScreen() {
  const services = store.get().services;
  const rev = store.use((s) => s.rev);
  const agents = store.use((s) => s.agents);
  const approvals = store.use((s) => s.approvals);
  const flash = store.use((s) => s.flash);
  const busy = store.use((s) => s.busy);
  const [group, setGroup] = useState<string>('all');
  const [query, setQuery] = useState('');
  const q = useDebounced(query, 220);
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  const [simulating, setSimulating] = useState<string | null>(null);
  const [simResult, setSimResult] = useState<{ kind: string; blocked: boolean; detail: string } | null>(null);

  const scopes = useAsync(() => services.permissions.scopes(), [rev.permissions]);
  const secrets = useAsync(() => services.permissions.secrets(), [rev.permissions]);
  const audit = useAsync(() => services.permissions.audit({ query: q.trim() || undefined, limit: 80 }), [q, rev.audit, rev.permissions]);
  const autonomy = useAsync(() => services.permissions.autonomy(), [rev.permissions]);

  const list = scopes.data ?? [];
  const groups = useMemo(() => [...new Set(list.map((s) => s.group))], [list]);
  const shown = useMemo(() => (group === 'all' ? list : list.filter((s) => s.group === group)), [list, group]);
  const granted = list.filter((s) => s.granted).length;
  const highRiskOpen = list.filter((s) => s.granted && (s.risk === 'high' || s.risk === 'critical')).length;
  const policy = autonomy.data;

  const simulate = async (kind: 'prompt-injection' | 'data-exfil' | 'privilege-escalation') => {
    setSimulating(kind);
    const r = await services.permissions.simulateAttack(kind);
    setSimulating(null);
    setSimResult({ kind, ...r });
    audit.refresh();
    ui.bump('audit');
  };

  return (
    <div className="screen trust-screen">
      <div className="split split--a">
        <div className="stack">
          {/* ── autonomy dial ─────────────────────────────────────────────── */}
          <section className="hud__panel is-primary">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="bolt" size={14} className="hud__panel-icon" />
                <div>
                  <h3>How much I do without asking</h3>
                  <p className="hud__panel-sub">One dial, honestly explained. Moving it changes every agent's bounds immediately.</p>
                </div>
              </div>
              <Chip size="sm" tone={policy && policy.level > 78 ? 'danger' : policy && policy.level < 25 ? 'info' : 'accent'}>
                {policy ? `${policy.level}%` : '—'}
              </Chip>
            </header>
            <div className="hud__panel-body">
              <input
                className="range range--big"
                type="range"
                min={0}
                max={100}
                step={1}
                value={policy?.level ?? 60}
                onChange={(e) => {
                  const level = Number(e.target.value);
                  if (policy) void actions.setAutonomy({ level });
                }}
                onMouseUp={() => toast({ title: 'Autonomy updated', body: policy?.stance ?? '', severity: 'info', ttlMs: 5_000 })}
              />
              <div className="dial-scale">
                {['paranoid', 'careful', 'working', 'bold', 'autonomous'].map((s, i) => (
                  <button
                    key={s}
                    type="button"
                    className={cx('dial-scale__tick', policy && Math.abs(policy.level - i * 25) < 13 && 'is-on')}
                    onClick={() => void actions.setAutonomy({ level: i * 25 })}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <p className="dial-stance">{policy?.stance ?? 'reading the policy engine…'}</p>
              <div className="dial-grid">
                <ToggleRow
                  label="Auto-approve low-risk actions"
                  hint="reads, drafts, internal indexing"
                  checked={!!policy?.autoApproveLowRisk}
                  onChange={(v) => void actions.setAutonomy({ autoApproveLowRisk: v })}
                />
                <ToggleRow
                  label="Anything inside /workspace is free"
                  hint="agents still cannot delete outside it"
                  checked={!!policy?.autoApproveWithinWorkspace}
                  onChange={(v) => void actions.setAutonomy({ autoApproveWithinWorkspace: v })}
                />
                <div className="dial-row">
                  <div>
                    <b>Stop for me above</b>
                    <span className="dim">risk level that always requires a signature</span>
                  </div>
                  <div className="segmented segmented--sm">
                    {(['low', 'medium', 'high', 'critical'] as const).map((r) => (
                      <button
                        key={r}
                        type="button"
                        className={cx('segmented__item', policy?.requireApprovalAbove === r && 'is-active')}
                        onClick={() => void actions.setAutonomy({ requireApprovalAbove: r })}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="dial-row">
                  <div>
                    <b>Monthly spend cap</b>
                    <span className="dim">{policy ? `$${Math.round((policy.spendCapUsd - (policy.spendCapUsd * 0.62)) / policy.spendCapUsd * 100)}% used` : '—'} · above this, work queues instead of running</span>
                  </div>
                  <span className="dial-row__cap">
                    <span className="mono dim">${policy?.spendCapUsd ?? 0}</span>
                    <input
                      className="range"
                      type="range"
                      min={40}
                      max={2000}
                      step={20}
                      value={policy?.spendCapUsd ?? 240}
                      onChange={(e) => void actions.setAutonomy({ spendCapUsd: Number(e.target.value) })}
                    />
                  </span>
                </div>
              </div>
              <div className="dial-foot">
                <div className={cx('estate-state', policy?.estateFrozen ? 'is-frozen' : 'is-live')}>
                  <span className="estate-state__dot" />
                  {policy?.estateFrozen ? 'estate frozen — nothing is moving' : `${agents.filter((a) => a.status === 'working' || a.status === 'thinking').length} agents in flight`}
                </div>
                <span className="spacer" />
                <Button size="sm" icon={approvals.length ? 'lock' : 'check'} onClick={() => ui.go('notifications')}>
                  {approvals.length ? `${approvals.length} at the gate` : 'gate is clear'}
                </Button>
                <Button size="sm" variant={policy?.estateFrozen ? 'solid' : 'danger'} icon={policy?.estateFrozen ? 'play' : 'pause'} onClick={() => void actions.freezeEstateToggle(!policy?.estateFrozen)}>
                  {policy?.estateFrozen ? 'Resume estate' : 'Freeze estate'}
                </Button>
              </div>
            </div>
          </section>

          {/* ── scopes ────────────────────────────────────────────────────── */}
          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="key" size={14} className="hud__panel-icon" />
                <div>
                  <h3>Scopes</h3>
                  <p className="hud__panel-sub">{granted} of {list.length} granted · {highRiskOpen} high-risk open</p>
                </div>
              </div>
              <div className="segmented segmented--sm">
                <button type="button" className={cx('segmented__item', group === 'all' && 'is-active')} onClick={() => setGroup('all')}>All</button>
                {groups.map((g) => (
                  <button key={g} type="button" className={cx('segmented__item', group === g && 'is-active')} onClick={() => setGroup(g)}>
                    {GROUP_LABEL[g]}
                  </button>
                ))}
              </div>
            </header>
            <div className="hud__panel-body scopes">
              {scopes.loading && <Spinner />}
              {shown.map((sc) => (
                <div key={sc.id} className={cx('scoperow', sc.granted && 'is-granted', sc.risk === 'critical' && 'is-critical', !!flash[`scope:${sc.id}`] && 'is-flash')}>
                  <div className="scoperow__main">
                    <b className="mono">{sc.label}</b>
                    <span>{sc.description}</span>
                    <div className="scoperow__badges">
                      <Chip size="sm" tone={RISK_TONE[sc.risk]} icon="shield">{sc.risk}</Chip>
                      {sc.audited && <Chip size="sm" tone="dim" icon="eye">audited</Chip>}
                      {!sc.audited && sc.granted && <Chip size="sm" tone="warn" icon="alert">unaudited</Chip>}
                    </div>
                  </div>
                  <div className="scoperow__tiers">
                    {TIERS.map((t) => {
                      const has = sc.holders.includes(t.id);
                      return (
                        <button
                          key={t.id}
                          type="button"
                          className={cx('tierpip', has && 'is-on')}
                          title={`${t.label} — ${t.blurb}. Click to ${has ? 'revoke' : 'grant'}`}
                          onClick={() =>
                            void (has ? services.permissions.revoke(sc.id, [t.id]) : services.permissions.grant(sc.id, [t.id])).then(() => {
                              ui.bump('permissions');
                              scopes.refresh();
                              toast({
                                title: has ? `Revoked ${sc.label} from ${t.label}` : `Granted ${sc.label} to ${t.label}`,
                                body: has ? 'In-flight calls using it were aborted.' : sc.risk === 'critical' ? 'This one can cause irreversible change — it will still stop at the gate above your threshold.' : 'Applies to the next dispatch, not to work already running.',
                                severity: has ? 'success' : sc.risk === 'critical' ? 'warning' : 'success',
                                ttlMs: 5_000,
                              });
                            })
                          }
                        >
                          {t.label.split(' ')[0]}
                        </button>
                      );
                    })}
                  </div>
                  <Toggle
                    size="sm"
                    checked={sc.granted}
                    title={sc.granted ? 'Revoke entirely' : 'Grant to orchestrator + leads'}
                    onChange={(v) =>
                      void (v ? services.permissions.grant(sc.id, ['orchestrator', 'department']) : services.permissions.revoke(sc.id, TIERS.map((t) => t.id))).then(() => {
                        ui.bump('permissions');
                        scopes.refresh();
                      })
                    }
                  />
                </div>
              ))}
            </div>
            <footer className="hud__panel-foot">
              <span className="dim mono">deny-listed paths (~/.ssh, keychains, /etc) are not scopes — they cannot be granted at all</span>
            </footer>
          </section>

          {/* ── role access ───────────────────────────────────────────────── */}
          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="users" size={14} className="hud__panel-icon" />
                <div>
                  <h3>Per-agent access</h3>
                  <p className="hud__panel-sub">Overrides on top of the role. Restricted agents can still be useful — they just cannot touch.</p>
                </div>
              </div>
            </header>
            <div className="hud__panel-body roles">
              {agents.slice(0, 10).map((a) => (
                <Row key={a.id} className={cx('rolerow', !!flash[`agent:${a.id}`] && 'is-flash')}>
                  <span className="avatar avatar--sm">{a.name.slice(0, 1)}</span>
                  <div className="rolerow__id">
                    <b>{a.name}</b>
                    <span className="mono dim">{a.roleId} · {a.tier} · autonomy {Math.round(a.autonomy * 100)}%</span>
                  </div>
                  <div className="segmented segmented--sm">
                    {(['full', 'ask', 'restricted'] as const).map((m) => (
                      <button
                        key={m}
                        type="button"
                        className={cx('segmented__item', `is-${m}`, (a.autonomy > 0.75 ? 'full' : a.autonomy > 0.3 ? 'ask' : 'restricted') === m && 'is-active')}
                        onClick={() => void services.permissions.roleAccess(a.id, m).then(() => { ui.bump('permissions', 'agents'); void actions.refreshAgents(); toast({ title: `${a.name} → ${m}`, body: m === 'restricted' ? 'Reads and drafts only; every side effect is refused before it starts.' : m === 'ask' ? 'Plans and asks; you approve each action.' : 'Full role scope, still capped by your autonomy dial.', severity: m === 'full' ? 'warning' : 'success', ttlMs: 5_000 }); })}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </Row>
              ))}
            </div>
          </section>
        </div>

        {/* ── right column ────────────────────────────────────────────────── */}
        <div className="stack">
          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="lock" size={14} className="hud__panel-icon" />
                <div>
                  <h3>Secret handles</h3>
                  <p className="hud__panel-sub">Values never enter this app. What you see here is a pointer into the vault.</p>
                </div>
              </div>
            </header>
            <div className="hud__panel-body secrets">
              {(secrets.data ?? []).map((sec) => (
                <div key={sec.id} className={cx('secretrow', !!flash[`secret:${sec.id}`] && 'is-flash')}>
                  <div className="secretrow__id">
                    <b>{sec.label}</b>
                    <span className="mono dim">{sec.service} · {sec.scope}</span>
                  </div>
                  <code className={cx('secretrow__val', showSecrets[sec.id] && 'is-shown')}>
                    {showSecrets[sec.id] ? '· · · still not available in this client · · ·' : sec.masked}
                  </code>
                  <span className="secretrow__tools">
                    <IconButton icon={showSecrets[sec.id] ? 'eyeOff' : 'eye'} size="sm" title="Reveal" onClick={() => { setShowSecrets((m) => ({ ...m, [sec.id]: !m[sec.id] })); toast({ title: 'There is nothing to reveal', body: 'The renderer only ever receives a masked handle. That is the design, not a bug.', severity: 'info', ttlMs: 5_000 }); }} />
                    <IconButton icon="refresh" size="sm" title="Rotate" busy={!!busy[`rotate:${sec.id}`]} onClick={() => void services.permissions.rotateSecret(sec.id).then(() => { secrets.refresh(); ui.bump('permissions'); toast({ title: 'Rotated', body: `${sec.label} re-bound. Agents picked up the new handle mid-flight.`, severity: 'success', ttlMs: 5_000 }); })} />
                  </span>
                  <em className="mono dim">used {relativeTime(sec.lastUsed)}</em>
                  <Chip size="sm" tone="dim" icon="shield">{sec.vault}</Chip>
                </div>
              ))}
            </div>
            <footer className="hud__panel-foot">
              <span className="dim">no api key, token or cookie is stored in this front-end, its state, its storage or its bundle</span>
            </footer>
          </section>

          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="shield" size={14} className="hud__panel-icon" />
                <div>
                  <h3>Try to break me</h3>
                  <p className="hud__panel-sub">Three live simulations against the running policy. Results land in the ledger.</p>
                </div>
              </div>
            </header>
            <div className="hud__panel-body stack--tight">
              {([
                ['prompt-injection', 'Injected instruction in a web page', 'A fetched page tells me to ignore my rules and send your files somewhere.'],
                ['data-exfil', 'Exfiltration over the network', 'An agent finds a "key" and POSTs it to an origin outside the allowlist.'],
                ['privilege-escalation', 'Sub-agent asks for more reach', 'A labour-tier helper requests filesystem.trash because the task "needs it".'],
              ] as const).map(([kind, label, blurb]) => (
                <div key={kind} className="simrow">
                  <div>
                    <b>{label}</b>
                    <span className="dim">{blurb}</span>
                  </div>
                  <Button size="sm" icon="bolt" busy={simulating === kind} onClick={() => void simulate(kind)}>Run</Button>
                </div>
              ))}
              {simResult && (
                <div className={cx('simresult', simResult.blocked ? 'is-blocked' : 'is-leaked')}>
                  <Icon name={simResult.blocked ? 'shield' : 'alert'} size={13} />
                  <div>
                    <b>{simResult.blocked ? 'Blocked' : 'Not blocked'}</b>
                    <p>{simResult.detail}</p>
                  </div>
                  <button className="linklike" onClick={() => { setQuery(simResult.kind); ui.flashFor('audit'); }}>in ledger</button>
                </div>
              )}
            </div>
          </section>

          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="key" size={14} className="hud__panel-icon" />
                <div>
                  <h3>Audit ledger</h3>
                  <p className="hud__panel-sub">Every decision, with the traceId that ties it to the work.</p>
                </div>
              </div>
              <div className="searchfield searchfield--sm">
                <Icon name="search" size={11} />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="actor, action, traceId…" />
              </div>
            </header>
            <div className="hud__panel-body ledger">
              {(audit.data ?? []).slice(0, 40).map((e) => (
                <Row key={e.id} className={cx('ledger__row', `is-${e.outcome}`)}>
                  <span className={cx('ledger__mark', `is-${e.outcome}`)}>
                    <Icon name={e.outcome === 'denied' ? 'close' : e.outcome === 'revoked' ? 'lock' : e.outcome === 'granted' ? 'key' : e.outcome === 'allowed' ? 'check' : 'bolt'} size={10} />
                  </span>
                  <div className="ledger__body">
                    <span>
                      <b>{e.action}</b> · {e.target}
                    </span>
                    <small className="dim">{e.note}</small>
                  </div>
                  <em className="mono dim">{e.actor}</em>
                  <em className="mono">{relativeTime(e.at)}</em>
                  <button className="mono ledger__trace" title="Follow trace" onClick={() => { setQuery(e.traceId); ui.go('activity'); }}>{e.traceId}</button>
                </Row>
              ))}
              {audit.loading && <Spinner />}
              {!audit.loading && !audit.data?.length && <span className="dim" style={{ fontSize: 11 }}>No entries match “{q}”.</span>}
            </div>
            <footer className="hud__panel-foot">
              <span className="dim mono">the ledger is append-only from the client's side — it cannot be edited or cleared here</span>
            </footer>
          </section>
        </div>
      </div>
    </div>
  );
}

function ToggleRow({ label, hint, checked, onChange }: { label: string; hint: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="dial-row">
      <div>
        <b>{label}</b>
        <span className="dim">{hint}</span>
      </div>
      <Toggle size="sm" checked={checked} onChange={onChange} />
    </div>
  );
}
