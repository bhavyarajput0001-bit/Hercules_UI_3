/**
 * HERCULES · Notification inbox
 * The place the estate comes when it needs you. Approvals live here first —
 * they are not notifications about something that happened, they are the thing
 * that has not happened yet.
 */
import { useMemo, useState } from 'react';
import { Icon } from '@/components/Icon';
import { Button, Chip, IconButton, Row, SectionLabel, Tabs, cx } from '@/components/ui';
import { actions, store, toast, ui } from '@/state/hercules';
import { relativeTime } from '@/services/mock/helpers';
import type { Notice } from '@/types/domain';

const SEV_TONE = { info: 'dim', success: 'success', warning: 'warn', critical: 'danger' } as const;

export default function NotificationsScreen() {
  const notices = store.use((s) => s.notices);
  const approvals = store.use((s) => s.approvals);
  const config = store.use((s) => s.config);
  const flash = store.use((s) => s.flash);
  const busy = store.use((s) => s.busy);
  const [tab, setTab] = useState<'needs-me' | 'all' | 'unread'>('needs-me');
  const [selected, setSelected] = useState<string | null>(null);

  const actionable = useMemo(() => notices.filter((n) => n.actionable && !n.read), [notices]);
  const unread = notices.filter((n) => !n.read);
  const list = tab === 'needs-me' ? actionable : tab === 'unread' ? unread : notices;
  const detail = notices.find((n) => n.id === selected) ?? null;

  const open = (n: Notice) => {
    setSelected(n.id);
    if (!n.read) void actions.markNoticesRead([n.id]);
    if (n.related?.kind === 'task') ui.select({ kind: 'task', id: n.related.id, label: n.title });
    else if (n.related?.kind === 'agent') ui.select({ kind: 'agent', id: n.related.id, label: n.title });
    else if (n.related?.kind === 'automation') ui.select({ kind: 'automation', id: n.related.id, label: n.title });
    else if (n.related?.kind === 'project') ui.select({ kind: 'project', id: n.related.id, label: n.title });
    else if (n.related?.kind === 'memory') ui.select({ kind: 'memory', id: n.related.id, label: n.title });
  };

  return (
    <div className="screen inbox-screen">
      <div className="inbox-toolbar">
        <Tabs
          items={[
            { id: 'needs-me', label: `Needs you${actionable.length ? ` · ${actionable.length}` : ''}` },
            { id: 'unread', label: `Unread${unread.length ? ` · ${unread.length}` : ''}` },
            { id: 'all', label: `Everything${notices.length ? ` · ${notices.length}` : ''}` },
          ]}
          active={tab}
          onChange={(id) => setTab(id as typeof tab)}
        />
        <span className="spacer" />
        <Chip size="sm" tone={approvals.length ? 'warn' : 'success'} icon="lock">
          {approvals.length} gated action{approvals.length === 1 ? '' : 's'}
        </Chip>
        <Chip size="sm" tone="dim" icon="bell">{config.notifications.channel}{config.notifications.quietHours.enabled ? ` · quiet ${config.notifications.quietHours.from}–${config.notifications.quietHours.to}` : ''}</Chip>
        <Button size="sm" icon="check" onClick={() => void actions.markAllRead()}>Mark all read</Button>
        <Button size="sm" icon="settings" onClick={() => ui.go('settings')}>Delivery rules</Button>
      </div>

      <div className="split split--a">
        <div className="stack">
          {approvals.length > 0 && (
            <section className="hud__panel is-gate">
              <header className="hud__panel-head">
                <div className="hud__panel-title">
                  <Icon name="shield" size={14} className="hud__panel-icon" />
                  <div>
                    <h3>At the gate</h3>
                    <p className="hud__panel-sub">Nothing here has happened. Your signature is the only thing that makes it real.</p>
                  </div>
                </div>
                <span className="badge">{approvals.length}</span>
              </header>
              <div className="hud__panel-body stack--tight">
                {approvals.map((a) => (
                  <div key={a.id} className={cx('askcard', `is-${a.risk}`, !!busy[`approval:${a.id}`] && 'is-busy')}>
                    <div className="askcard__head">
                      <span className={cx('askcard__risk', `is-${a.risk}`)}>{a.risk}</span>
                      <b>{a.action}</b>
                      <span className="spacer" />
                      <span className="mono dim">{relativeTime(a.createdAt)}</span>
                    </div>
                    <div className="askcard__body">
                      <p>{a.reason}</p>
                      {a.command && <pre className="askcard__cmd mono">{a.command}</pre>}
                      {a.target && <span className="mono dim">target · {a.target}</span>}
                      <span className="mono dim">requested by {a.requestedBy}</span>
                    </div>
                    <div className="askcard__foot">
                      <Button size="sm" icon="eye" onClick={() => ui.select({ kind: 'agent', id: a.agentId, label: a.requestedBy })}>Who is asking</Button>
                      <Button size="sm" icon="terminal" onClick={() => { ui.go('terminal'); toast({ title: 'Shell open', body: 'You can run this yourself if reading the intent is not enough.', severity: 'info', ttlMs: 4_000 }); }}>Do it myself</Button>
                      <span className="spacer" />
                      <Button size="sm" variant="danger" icon="close" busy={!!busy[`approval:${a.id}`]} onClick={() => void actions.respondApproval(a.id, false)}>Deny</Button>
                      <Button size="sm" variant="solid" icon="check" busy={!!busy[`approval:${a.id}`]} onClick={() => void actions.respondApproval(a.id, true)}>Approve</Button>
                    </div>
                  </div>
                ))}
              </div>
              <footer className="hud__panel-foot">
                <span className="dim">approving once does not change policy — “allow always” lives in Trust, where it can be revoked</span>
                <span className="spacer" />
                <button className="linklike" onClick={() => ui.go('permissions')}>open Trust</button>
              </footer>
            </section>
          )}

          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="notification" size={14} className="hud__panel-icon" />
                <div>
                  <h3>{tab === 'needs-me' ? 'Waiting on you' : tab === 'unread' ? 'Unread' : 'Everything'}</h3>
                  <p className="hud__panel-sub">Approvals, alerts, digests — from agents, automations and the core itself.</p>
                </div>
              </div>
              <span className="badge">{list.length}</span>
            </header>
            <div className="hud__panel-body inbox-list">
              {list.map((n) => (
                <Row
                  key={n.id}
                  className={cx('inboxrow', !n.read && 'is-unread', selected === n.id && 'is-open', !!flash[`notice:${n.id}`] && 'is-flash')}
                  onClick={() => open(n)}
                >
                  <span className={cx('inboxrow__sev', `is-${n.severity}`)}><Icon name={n.severity === 'critical' ? 'alert' : n.severity === 'warning' ? 'bolt' : n.severity === 'success' ? 'check' : 'activity'} size={11} /></span>
                  <div className="inboxrow__main">
                    <b>{n.title}</b>
                    <span>{n.body}</span>
                    <div className="inboxrow__meta mono dim">
                      <span>{n.source}</span>
                      <span>·</span>
                      <span>{relativeTime(n.at)}</span>
                      {n.related && <><span>·</span><span>{n.related.kind}</span></>}
                    </div>
                  </div>
                  {n.actionable && <Chip size="sm" tone="warn">action</Chip>}
                  <span className="inboxrow__tools" onClick={(e) => e.stopPropagation()}>
                    {n.actionable && n.actions?.map((a) => (
                      <Button
                        key={a.id}
                        size="sm"
                        variant={a.kind === 'approve' ? 'solid' : a.kind === 'deny' ? 'danger' : 'ghost'}
                        icon={a.kind === 'approve' ? 'check' : a.kind === 'deny' ? 'close' : a.kind === 'retry' ? 'refresh' : 'eye'}
                        onClick={() => {
                          if (a.kind === 'approve' || a.kind === 'deny') void actions.approveNotice(n.id, a.kind === 'approve');
                          else if (a.kind === 'retry') void actions.sendPrompt(`Retry what failed in “${n.title}”. Tell me what changed and whether it needs a gate.`);
                          else open(n);
                        }}
                      >
                        {a.label}
                      </Button>
                    ))}
                    <IconButton icon="clock" size="sm" title="Snooze 1h" onClick={() => void actions.snoozeNotice(n.id, 60)} />
                    <IconButton icon="close" size="sm" title="Dismiss" onClick={() => void actions.dismissNotice(n.id)} />
                  </span>
                  {!n.read && <span className="inboxrow__unread" />}
                </Row>
              ))}
              {!list.length && (
                <div className="inbox-empty">
                  <Icon name="check" size={18} />
                  <b>{tab === 'needs-me' ? 'Nothing needs you' : 'Empty'}</b>
                  <span>{tab === 'needs-me' ? 'The estate is working without asking. That is the target state — it does not mean I stopped reporting.' : 'No notifications in this view.'}</span>
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="stack">
          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name={detail ? 'file' : 'eye'} size={14} className="hud__panel-icon" />
                <div>
                  <h3>{detail ? 'Notice' : 'Nothing selected'}</h3>
                  <p className="hud__panel-sub">{detail ? detail.source : 'Pick a notice to read the whole thing with its context.'}</p>
                </div>
              </div>
              {detail && <IconButton icon="close" size="sm" title="Clear" onClick={() => setSelected(null)} />}
            </header>
            <div className="hud__panel-body">
              {detail ? (
                <div className="stack--tight">
                  <div className="cluster">
                    <Chip size="sm" tone={SEV_TONE[detail.severity]}>{detail.severity}</Chip>
                    <Chip size="sm" tone="dim">{detail.source}</Chip>
                    <span className="mono dim">{relativeTime(detail.at)}</span>
                  </div>
                  <h4 className="notice-title">{detail.title}</h4>
                  <p className="notice-body">{detail.body}</p>
                  {detail.related && (
                    <div className="notice-link">
                      <Icon name="route" size={11} />
                      <span>related {detail.related.kind} · <b className="mono">{detail.related.id}</b></span>
                      <button className="linklike" onClick={() => ui.select({ kind: detail.related!.kind === 'project' ? 'project' : detail.related!.kind, id: detail.related!.id, label: detail.title })}>
                        open
                      </button>
                    </div>
                  )}
                  <div className="inspector__actions">
                    {detail.actionable && (
                      <>
                        <Button size="sm" variant="solid" icon="check" onClick={() => void actions.approveNotice(detail.id, true)}>Approve</Button>
                        <Button size="sm" variant="danger" icon="close" onClick={() => void actions.approveNotice(detail.id, false)}>Deny</Button>
                      </>
                    )}
                    <Button size="sm" icon="reply" onClick={() => { ui.go('core'); void actions.sendPrompt(`About “${detail.title}”: `); }}>Reply from the core</Button>
                    <Button size="sm" icon="clock" onClick={() => void actions.snoozeNotice(detail.id, 180)}>Snooze 3h</Button>
                  </div>
                </div>
              ) : (
                <SectionLabel>How delivery works</SectionLabel>
              )}
            </div>
          </section>

          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="bell" size={14} className="hud__panel-icon" />
                <div>
                  <h3>Interruption policy</h3>
                  <p className="hud__panel-sub">I only break your focus for things with a gate on them.</p>
                </div>
              </div>
            </header>
            <div className="hud__panel-body stack--tight">
              <Policy label="Channel" value={config.notifications.channel} onClick={() => void actions.patchSettings({ notifications: { channel: config.notifications.channel === 'both' ? 'in-app' : 'both' } }, 'Delivery updated')} hint="os = native notification centre, in-app = this inbox only" />
              <Policy label="Sound" value={config.notifications.sound ? 'on' : 'off'} onClick={() => void actions.patchSettings({ notifications: { sound: !config.notifications.sound } })} hint="short, low, and never during voice" />
              <Policy label="Quiet hours" value={config.notifications.quietHours.enabled ? `${config.notifications.quietHours.from}–${config.notifications.quietHours.to}` : 'off'} onClick={() => void actions.patchSettings({ notifications: { quietHours: { ...config.notifications.quietHours, enabled: !config.notifications.quietHours.enabled } } }, 'Quiet hours updated')} hint="critical gates still come through; everything else waits" />
              <Policy label="Digest" value={config.notifications.digest} onClick={() => void actions.patchSettings({ notifications: { digest: config.notifications.digest === 'off' ? 'daily' : config.notifications.digest === 'daily' ? 'hourly' : 'off' } }, 'Digest cadence updated')} hint="batched summary instead of pings" />
              <Policy label="Always interrupt for" value={config.privacy.requireApprovalFor.join(', ') || 'nothing'} onClick={() => ui.go('permissions')} hint="risk levels that must break silence" />
            </div>
            <footer className="hud__panel-foot">
              <span className="dim mono">nothing here is push, webhook or email unless you connect one in Integrations</span>
            </footer>
          </section>
        </div>
      </div>
    </div>
  );
}

function Policy({ label, value, onClick, hint }: { label: string; value: string; onClick: () => void; hint: string }) {
  return (
    <button type="button" className="policybtn" onClick={onClick}>
      <span className="policybtn__k">{label}</span>
      <b className="mono">{value}</b>
      <span className="dim policybtn__hint">{hint}</span>
      <Icon name="chevRight" size={11} className="dim" />
    </button>
  );
}
