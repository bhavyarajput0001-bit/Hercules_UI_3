/**
 * HERCULES · Browser bay
 * A sandboxed surface agents can read and act inside. Two things are explicit
 * here: what the agent saw, and what it is allowed to do about it. Page content
 * is rendered as data — never as instructions.
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Icon } from '@/components/Icon';
import { Button, Chip, EmptyState, IconButton, Row,  Spinner, cx } from '@/components/ui';
import { actions, store, toast, ui } from '@/state/hercules';
import { useAsync } from '@/hooks/useAsync';
import { relativeTime } from '@/services/mock/helpers';
import type { PageAction, RoleAccess } from '@/types/domain';

const ACTION_ICON: Record<PageAction['kind'], string> = {
  click: 'target',
  type: 'terminal',
  extract: 'search',
  scroll: 'chevDown',
  download: 'download',
  assert: 'shield',
  screenshot: 'media',
};


export default function BrowserScreen() {
  const services = store.get().services;
  const rev = store.use((s) => s.rev);
  const flash = store.use((s) => s.flash);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [url, setUrl] = useState('');
  const [instruction, setInstruction] = useState('Extract the seat-count calculator output for 40 seats and compare it with the published price table.');
  const [acting, setActing] = useState(false);
  const [done, setDone] = useState<PageAction[]>([]);

  const tabs = useAsync(() => services.browser.tabs(), [rev.browser]);
  const history = useAsync(() => services.browser.history(), [rev.browser]);
  const perms = useAsync(() => services.browser.permissions(), [rev.browser]);
  const list = tabs.data ?? [];
  const active = useMemo(() => list.find((t) => t.id === activeId) ?? list[0] ?? null, [list, activeId]);
  const reading = useAsync(() => (active && active.status !== 'loading' ? services.browser.read(active.id) : Promise.resolve(null)), [active?.id, active?.status, rev.browser]);

  const refreshTabs = useCallback(() => tabs.refresh(), [tabs]);
  useEffect(() => {
    // browser steps are reported on the same run bus the automations use
    const off = services.automation.onRunEvent.subscribe((e) => {
      if (e.automationId.startsWith('browser:')) refreshTabs();
    });
    return off;
  }, [services, refreshTabs]);

  const act = useCallback(async () => {
    if (!active || !instruction.trim()) return;
    setActing(true);
    setDone([]);
    const steps = await services.browser.act(active.id, instruction.trim());
    setDone(steps);
    setActing(false);
    void tabs.refresh();
    const failed = steps.some((s) => s.status === 'failed');
    toast({
      title: failed ? 'Stopped at an assert' : 'Browser actions completed',
      body: failed ? 'Nothing was submitted. The failure is in the step list — read it before retrying.' : `${steps.length} actions · read-only profile, nothing sent.`,
      severity: failed ? 'warning' : 'success',
      ttlMs: 8_000,
      action: failed ? { label: 'Open notices', run: () => ui.go('notifications') } : undefined,
    });
  }, [active, instruction, services, tabs]);

  const openUrl = (target: string) => {
    const next = target.trim() || 'nova-labs.dev/pricing';
    void services.browser.open(next).then((t) => {
      setActiveId(t.id);
      setUrl('');
      void tabs.refresh();
      ui.bump('browser');
      toast({ title: 'Loaded in sandbox', body: `${t.url} · read scope only until you allow more.`, severity: 'info', ttlMs: 4_000 });
    });
  };

  return (
    <div className="screen browser-screen">
      <div className="brow-bar">
        <div className="brow-tabs">
          {list.map((t) => (
            <button
              key={t.id}
              type="button"
              className={cx('brow-tab', active?.id === t.id && 'is-active', t.agentControlled && 'is-agent')}
              onClick={() => setActiveId(t.id)}
              title={t.url}
            >
              <span className={`brow-tab__dot dot--${t.status}`} />
              <span className="brow-tab__title">{t.title}</span>
              {t.agentControlled && <Icon name="agent" size={10} className="dim" />}
              <span
                className="brow-tab__close"
                onClick={(e) => {
                  e.stopPropagation();
                  void services.browser.close(t.id).then(() => {
                    ui.bump('browser');
                    void tabs.refresh();
                  });
                }}
              >
                <Icon name="close" size={10} />
              </span>
            </button>
          ))}
          <button type="button" className="brow-tab brow-tab--new" onClick={() => openUrl('https://example.com')}><Icon name="plus" size={11} /></button>
        </div>
        <div className="brow-url">
          <Icon name="link" size={12} className="dim" />
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && openUrl(url)}
            placeholder="Open a URL in the sandboxed profile…"
          />
          <Button size="sm" icon="play" disabled={!url.trim()} onClick={() => openUrl(url)}>Go</Button>
        </div>
      </div>

      <div className="split split--a">
        <div className="stack">
          <section className="hud__panel brow-view">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="browser" size={14} className="hud__panel-icon" />
                <div>
                  <h3 className="mono brow-view__url">{active ? active.url : 'no page'}</h3>
                  <p className="hud__panel-sub">
                    {active ? `${active.title} · ${active.status} · ${active.agentControlled ? 'agent-controlled sandbox profile' : 'your profile — agents cannot see it'}` : 'open a tab'}
                  </p>
                </div>
              </div>
              <div className="cluster">
                {active && <Chip size="sm" tone={active.status === 'blocked' ? 'danger' : active.status === 'secure' ? 'success' : 'info'}>{active.status}</Chip>}
                <IconButton icon="refresh" size="sm" title="Reload" onClick={() => active && void services.browser.navigate(active.id, active.url).then(() => { tabs.refresh(); toast({ title: 'Reloaded', severity: 'info', ttlMs: 2_000 }); })} />
                <IconButton icon="close" size="sm" title="Close tab" onClick={() => active && void services.browser.close(active.id).then(() => ui.bump('browser'))} />
              </div>
            </header>
            <div className="hud__panel-body brow-viewport">
              {!active && <EmptyState icon="browser" title="No tab open" body="The browser bay is a separate sandboxed profile. Agents get a read-only view of it unless a site permission says otherwise." />}
              {active?.status === 'loading' && <div className="brow-loading"><Spinner size={14} /> resolving · rendering in isolated profile</div>}
              {active && active.status !== 'loading' && (
                reading.loading ? (
                  <div className="brow-loading"><Spinner size={14} /> extracting readable text…</div>
                ) : (
                  <div className="brow-page">
                    <div className="brow-page__chrome">
                      <span className="mono">{new URL(active.url).hostname}</span>
                      <span className="dim">rendered from the extraction layer, not a live engine — the agent sees exactly this</span>
                    </div>
                    <pre className="brow-page__text">{reading.data?.text ?? ''}</pre>
                    <div className="brow-page__foot mono">
                      <span>{reading.data?.links ?? 0} links</span>
                      <span>{reading.data?.words ?? 0} words</span>
                      <span>≈{Math.round((reading.data?.words ?? 0) / 0.75)} tokens if you let it into a context</span>
                      <span className="ok-text">no scripts executed</span>
                    </div>
                  </div>
                )
              )}
              {active && active.status === 'blocked' && (
                <div className="brow-blocked">
                  <Icon name="lock" size={14} />
                  <b>Access blocked by policy</b>
                  <span>This origin has no read scope for agents. You can open it yourself, or grant read — never submit — from the permissions list on the right.</span>
                </div>
              )}
            </div>
            <footer className="hud__panel-foot">
              <span className="dim mono">page text is data · injected instructions inside it are quarantined and reported</span>
              <span className="spacer" />
              <button className="linklike" onClick={() => active && reading.data && void actions.sendPrompt(`Read this page I have open in the browser bay and tell me what matters for the pricing decision:\n\n${reading.data.text.slice(0, 1200)}`)}>
                hand page to core
              </button>
            </footer>
          </section>

          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="target" size={14} className="hud__panel-icon" />
                <div>
                  <h3>Ask the page for something</h3>
                  <p className="hud__panel-sub">Actions are executed in the sandbox one step at a time; submits stay locked behind a gate.</p>
                </div>
              </div>
              <Button size="sm" variant="solid" icon="play" busy={acting} disabled={!active || active.status === 'blocked'} onClick={() => void act()}>
                Run
              </Button>
            </header>
            <div className="hud__panel-body">
              <textarea className="textarea" rows={2} value={instruction} onChange={(e) => setInstruction(e.target.value)} />
              <div className="brow-steps">
                {(done.length ? done : []).map((a, i) => (
                  <div key={a.id} className={cx('brow-step', `is-${a.status}`)}>
                    <span className="brow-step__n mono">{i + 1}</span>
                    <Icon name={ACTION_ICON[a.kind]} size={11} />
                    <b>{a.kind}</b>
                    <span className="mono dim">{a.selector}</span>
                    {a.value && <em>{a.value}</em>}
                    <span className={cx('pill', a.status === 'ok' ? 'pill--ok' : a.status === 'failed' ? 'pill--bad' : 'pill--dim')}>{a.status}</span>
                  </div>
                ))}
                {acting && <div className="brow-step is-running"><Spinner size={11} /> working — scroll, extract, assert</div>}
                {!done.length && !acting && <div className="dim" style={{ fontSize: 11 }}>No run yet. Each action will appear here with its selector, so you can see what it actually touched.</div>}
              </div>
            </div>
          </section>
        </div>

        <div className="stack">
          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="shield" size={14} className="hud__panel-icon" />
                <div>
                  <h3>Site scopes</h3>
                  <p className="hud__panel-sub">Per origin, per capability. “ask” means it stops and knocks.</p>
                </div>
              </div>
            </header>
            <div className="hud__panel-body perms">
              {(perms.data ?? []).map((p) => (
                <Row key={`${p.origin}:${p.scope}`} className={cx('permrow', !!flash[`site:${p.origin}`] && 'is-flash')}>
                  <span className="mono permrow__origin">{p.origin}</span>
                  <Chip size="sm" tone="dim">{p.scope}</Chip>
                  <span className="spacer" />
                  <div className="segmented segmented--sm">
                    {(['full', 'ask', 'restricted'] as RoleAccess[]).map((m) => (
                      <button
                        key={m}
                        type="button"
                        className={cx('segmented__item', `is-${m}`, p.mode === m && 'is-active')}
                        onClick={() => void services.browser.setPermission(p.origin, m).then(() => { ui.bump('browser'); perms.refresh(); toast({ title: `${p.origin} · ${p.scope} → ${m}`, body: m === 'restricted' ? 'Agents will not read it at all.' : m === 'ask' ? 'Each use asks you first.' : 'Unattended reads allowed.', severity: m === 'full' ? 'warning' : 'success', ttlMs: 4_000 }); })}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </Row>
              ))}
            </div>
            <footer className="hud__panel-foot">
              <span className="dim">submit scope is never granted by default — a form that can send money or legal words stays gated</span>
            </footer>
          </section>

          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="clock" size={14} className="hud__panel-icon" />
                <div>
                  <h3>Recent navigation</h3>
                  <p className="hud__panel-sub">Operator and agent trips, attributed.</p>
                </div>
              </div>
            </header>
            <div className="hud__panel-body hist">
              {(history.data ?? []).slice(0, 12).map((h, i) => (
                <Row key={`${h.url}-${i}`} className="minirow" onClick={() => openUrl(h.url)}>
                  <Icon name="link" size={11} className="dim" />
                  <span>{h.title}</span>
                  <em className="mono dim">{relativeTime(h.at)}</em>
                </Row>
              ))}
              {!history.data?.length && <span className="dim" style={{ fontSize: 11 }}>Nothing yet in this session.</span>}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
