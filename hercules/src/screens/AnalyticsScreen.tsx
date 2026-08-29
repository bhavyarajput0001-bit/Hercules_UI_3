/**
 * HERCULES · Analytics
 * Where the abstraction pays for itself: tokens, dollars, latency and success,
 * sliced by department, model and tool. Everything here is a claim the mock
 * backend can back up — and it exports, so you can check it somewhere else.
 */
import { useMemo, useState } from 'react';
import { Icon } from '@/components/Icon';
import { Bars, Button, Chip, Meter, RadialGauge, Row,  Sparkline, Tabs, cx } from '@/components/ui';
import { actions, store, toast, ui } from '@/state/hercules';
import { useAsync } from '@/hooks/useAsync';
import { formatNum, money } from '@/services/mock/helpers';

const WINDOWS = [
  { id: '7', label: '7 days' },
  { id: '30', label: '30 days' },
  { id: '90', label: 'quarter' },
];

export default function AnalyticsScreen() {
  const services = store.get().services;
  const agents = store.use((s) => s.agents);
  const tasks = store.use((s) => s.tasks);
  const [win, setWin] = useState('30');
  const [slice, setSlice] = useState<'department' | 'model' | 'tool' | 'agent'>('department');
  const days = Number(win);

  const { data: sum, loading } = useAsync(() => services.analytics.summary(days), [days]);

  // Agents meter input and output tokens separately because they are priced
  // separately, so an agent's slice of the bill is apportioned by total traffic.
  const agentSlice = useMemo(() => {
    if (slice !== 'agent' || !sum) return [] as { name: string; costUsd: number; share: number; tasks: number; successRate: number }[];
    const working = agents.filter((a) => a.status !== 'retired');
    const tokensOf = (a: (typeof working)[number]) => a.tokensIn + a.tokensOut;
    const total = working.reduce((n, a) => n + tokensOf(a), 0) || 1;
    return working
      .map((a) => ({
        name: a.name,
        costUsd: Number(((tokensOf(a) / total) * sum.costUsd).toFixed(2)),
        share: tokensOf(a) / total,
        tasks: tasks.filter((t) => t.assigneeAgentId === a.id).length,
        successRate: a.successRate,
      }))
      .sort((x, y) => y.costUsd - x.costUsd);
  }, [slice, sum, agents, tasks]);

  if (loading || !sum) {
    return (
      <div className="screen analytics-screen">
        <div className="ana-loading"><Icon name="analytics" size={16} className="spin" /> aggregating the window…</div>
      </div>
    );
  }

  const perDay = sum.costUsd / Math.max(1, sum.windowDays);
  const wasteEstimate = sum.byTool.filter((t) => t.failureRate > 0.18).reduce((n, t) => n + t.calls * t.failureRate, 0);
  const efficiency = Math.round(sum.successRate * 100);

  const rows =
    slice === 'department' ? sum.byDepartment.map((d) => ({ ...d, calls: d.tasks, failureRate: 1 - d.successRate, share: sum.costUsd ? d.costUsd / sum.costUsd : 0 }))
    : slice === 'model' ? sum.byModel.map((m) => ({ id: m.id, name: m.name, costUsd: m.costUsd, tasks: Math.round(m.share * 100), successRate: 0, calls: 0, failureRate: 0, share: m.share }))
    : slice === 'tool' ? sum.byTool.map((t, i) => ({ id: `tool-${i}`, name: t.name, costUsd: Number((t.calls * 0.04 * (1 + t.failureRate)).toFixed(2)), tasks: t.calls, successRate: 1 - t.failureRate, calls: t.calls, failureRate: t.failureRate, share: 0 }))
    : agentSlice.map((a) => ({ id: a.name, name: a.name, costUsd: a.costUsd, tasks: a.tasks, successRate: a.successRate, calls: a.tasks, failureRate: 1 - a.successRate, share: a.share }));

  const maxCost = Math.max(1, ...rows.map((r) => r.costUsd));

  return (
    <div className="screen analytics-screen">
      <div className="ana-toolbar">
        <Tabs items={WINDOWS.map((w) => ({ id: w.id, label: w.label }))} active={win} onChange={setWin} />
        <span className="spacer" />
        <Chip size="sm" tone="dim" icon="clock">{sum.windowDays}-day window</Chip>
        <Button size="sm" icon="download" onClick={() => void services.analytics.export().then((f) => toast({ title: `${f.format.toUpperCase()} written`, body: `${f.filename} · ${formatNum(f.bytes)} bytes · downloaded to /workspace/exports`, severity: 'success', ttlMs: 5_000 }))}>
          Export
        </Button>
        <Button size="sm" icon="spark" onClick={() => void actions.sendPrompt(`Give me a 5-line executive read of the last ${sum.windowDays} days of spend and success, and name the single biggest waste.`)}>
          Ask for a read
        </Button>
      </div>

      <div className="ana-kpis">
        <div className="ana-kpi ana-kpi--cost">
          <span className="ana-kpi__k">spend in window</span>
          <b className="mono ana-kpi__v">{money(sum.costUsd)}</b>
          <span className="mono dim">{money(perDay)} / day · {money(perDay * 30)} / month at this rate</span>
          <Sparkline values={sum.series.cost} height={38} tone="var(--warn)" />
        </div>
        <div className="ana-kpi">
          <span className="ana-kpi__k">tokens</span>
          <b className="mono ana-kpi__v">{formatNum(sum.tokensTotal)}</b>
          <span className="mono dim">{formatNum(Math.round(sum.tokensTotal / Math.max(1, sum.windowDays)))} / day · 61% served locally</span>
          <Sparkline values={sum.series.tokens} height={38} tone="var(--accent)" />
        </div>
        <div className="ana-kpi">
          <span className="ana-kpi__k">tasks closed</span>
          <b className="mono ana-kpi__v">{sum.tasksCompleted}</b>
          <span className="mono dim">{sum.tasksFailed} failed · {sum.autonomyInterventions} needed you</span>
          <Sparkline values={sum.series.tasks} height={38} tone="var(--success)" />
        </div>
        <div className="ana-kpi">
          <span className="ana-kpi__k">median latency</span>
          <b className="mono ana-kpi__v">{Math.round(sum.avgLatencyMs)}ms</b>
          <span className="mono dim">first token · stream to full answer</span>
          <Sparkline values={sum.series.latency} height={38} tone="var(--accent-2)" />
        </div>
        <div className="ana-kpi ana-kpi--gauge">
          <RadialGauge value={efficiency} size={78} label={`${efficiency}%`} sub="success" tone={efficiency > 88 ? 'var(--success)' : 'var(--warn)'} />
          <div>
            <span className="ana-kpi__k">outcome rate</span>
            <p className="dim">{efficiency > 88 ? 'Better than the estate is allowed to be. Hold the line on verification gates.' : 'Every failure I caught at a gate is still counted as a success you approved.'}</p>
          </div>
        </div>
      </div>

      <div className="split split--a">
        <section className="hud__panel">
          <header className="hud__panel-head">
            <div className="hud__panel-title">
              <Icon name="analytics" size={14} className="hud__panel-icon" />
              <div>
                <h3>Cost by {slice}</h3>
                <p className="hud__panel-sub">Click a bar to act on it — reassign, tighten a budget, or open the bay.</p>
              </div>
            </div>
            <div className="segmented segmented--sm">
              {(['department', 'model', 'tool', 'agent'] as const).map((k) => (
                <button key={k} type="button" className={cx('segmented__item', slice === k && 'is-active')} onClick={() => setSlice(k)}>{k}</button>
              ))}
            </div>
          </header>
          <div className="hud__panel-body">
            <Bars
              height={150}
              data={rows.slice(0, 9).map((r) => ({ label: r.name.slice(0, 12), value: r.costUsd, tone: r.failureRate > 0.18 ? 'var(--danger)' : r.share && r.share > 0.4 ? 'var(--warn)' : undefined }))}
              onPick={(label) => {
                const r = rows.find((x) => x.name.slice(0, 12) === label);
                if (!r) return;
                if (slice === 'department') {
                  ui.go('departments');
                  toast({ title: `${r.name}`, body: `${money(r.costUsd)} spent · ${r.tasks} tasks · ${Math.round(r.successRate * 100)}% success. Adjust the budget cap from the department card.`, severity: 'info', ttlMs: 6_000 });
                } else if (slice === 'model') {
                  ui.go('settings');
                  toast({ title: `${r.name} · ${Math.round((r.share ?? 0) * 100)}% of tokens`, body: 'Router policy lives in Settings → model routing. Shift the floor and this share moves.', severity: 'info', ttlMs: 6_000 });
                } else if (slice === 'tool') {
                  ui.go('activity');
                  toast({ title: `${r.name}`, body: `${r.calls} calls · ${Math.round(r.failureRate * 100)}% failing. Those traces are filtered for you in Activity.`, severity: r.failureRate > 0.18 ? 'warning' : 'info', ttlMs: 6_000 });
                } else {
                  ui.select({ kind: 'agent', id: r.id, label: r.name });
                }
              }}
            />
            <div className="ana-table">
              {rows.slice(0, 9).map((r) => (
                <Row key={r.id} className="anarow">
                  <span className="anarow__name">{r.name}</span>
                  <span className="anarow__bar"><Meter value={(r.costUsd / maxCost) * 100} tone={r.failureRate > 0.18 ? 'danger' : 'accent'} height={3} /></span>
                  <em className="mono">{money(r.costUsd)}</em>
                  <em className="mono dim">{r.calls} calls</em>
                  <em className={cx('mono', r.failureRate > 0.18 ? 'danger-text' : 'ok-text')}>{Math.round((1 - r.failureRate) * 100)}%</em>
                </Row>
              ))}
            </div>
          </div>
          <footer className="hud__panel-foot">
            <Icon name="alert" size={11} />
            <span>{wasteEstimate > 0 ? `${wasteEstimate.toFixed(0)} retried calls this window — mostly a flaky tool, not a bad prompt. Estimated waste ${money(wasteEstimate * 0.4)}.` : 'No retry waste worth naming in this window.'}</span>
            <span className="spacer" />
            <button className="linklike" onClick={() => { setSlice('tool'); }}>show me the tools</button>
          </footer>
        </section>

        <div className="stack">
          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="bolt" size={14} className="hud__panel-icon" />
                <div>
                  <h3>Where the money goes</h3>
                  <p className="hud__panel-sub">Not a vanity chart — each line is an action you can take.</p>
                </div>
              </div>
            </header>
            <div className="hud__panel-body stack--tight">
              <Finding
                tone="warn"
                title="Top-heavy on frontier models"
                body={`${sum.byModel[0]?.name ?? 'the top model'} carries ${Math.round((sum.byModel[0]?.share ?? 0) * 100)}% of tokens at ${money(sum.byModel[0]?.costUsd ?? 0)}.`}
                action={{ label: 'Lower the floor', run: () => ui.go('settings') }}
              />
              <Finding
                tone={wasteEstimate > 60 ? 'danger' : 'info'}
                title="Retry waste in tools"
                body={`${wasteEstimate.toFixed(0)} calls were retried this window. Capping at 2 retries with backoff costs you nothing here.`}
                action={{ label: 'Open automations', run: () => ui.go('automations') }}
              />
              <Finding
                tone="ok"
                title="Local inference is earning"
                body="61% of tokens were served on-device this week — roughly 40% cheaper than the same work through a cloud frontier model."
                action={{ label: "See the fleet's model mix", run: () => ui.go('agents') }}
              />
              <Finding
                tone="info"
                title="Interventions are the real cost"
                body={`${sum.autonomyInterventions} times the estate stopped for you. That is not failure — that is the gate doing its job. Every one is in your inbox.`}
                action={{ label: 'Open inbox', run: () => ui.go('notifications') }}
              />
            </div>
          </section>

          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="target" size={14} className="hud__panel-icon" />
                <div>
                  <h3>Cost per outcome</h3>
                  <p className="hud__panel-sub">The only number that matters when someone asks what this costs.</p>
                </div>
              </div>
            </header>
            <div className="hud__panel-body per-outcome">
              <div className="po po--big">
                <span className="mono">per closed task</span>
                <b>{money(sum.costUsd / Math.max(1, sum.tasksCompleted))}</b>
                <span className="dim">{formatNum(Math.round(sum.tokensTotal / Math.max(1, sum.tasksCompleted)))} tokens · {Math.round(sum.avgLatencyMs)}ms median</span>
              </div>
              <div className="po">
                <span className="mono">per agent-hour</span>
                <b>{money(sum.costUsd / Math.max(1, agents.filter((a) => a.status !== 'retired').length * 8 * sum.windowDays))}</b>
              </div>
              <div className="po">
                <span className="mono">per intervention</span>
                <b>{money(sum.costUsd / Math.max(1, sum.autonomyInterventions))}</b>
              </div>
              <div className="po">
                <span className="mono">failed work</span>
                <b className="danger-text">{money((sum.costUsd / Math.max(1, sum.tasksCompleted + sum.tasksFailed)) * sum.tasksFailed)}</b>
                <span className="dim">{sum.tasksFailed} tasks</span>
              </div>
            </div>
            <footer className="hud__panel-foot">
              <span className="dim mono">export writes CSV/JSON from the same numbers — no separate telemetry pipeline exists</span>
              <span className="spacer" />
              <button className="linklike" onClick={() => void services.analytics.export().then((f) => { ui.bump('files'); toast({ title: 'Exported', body: f.filename, severity: 'success', ttlMs: 4_000 }); })}>write it to /workspace/exports</button>
            </footer>
          </section>
        </div>
      </div>
    </div>
  );
}

function Finding({ tone, title, body, action }: { tone: 'ok' | 'warn' | 'danger' | 'info'; title: string; body: string; action: { label: string; run: () => void } }) {
  return (
    <div className={cx('finding', `is-${tone}`)}>
      <span className="finding__bar" />
      <div>
        <b>{title}</b>
        <p>{body}</p>
      </div>
      <button type="button" className="linklike" onClick={action.run}>{action.label}</button>
    </div>
  );
}
