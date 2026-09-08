/**
 * HERCULES · Terminal bay
 * A real shell surface with agent-driven and operator-driven modes. Commands
 * go through the terminal service, output streams into a per-session buffer,
 * Tab completes verbs, and every line carries the traceId it was audited under.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from '@/components/Icon';
import { Button, Chip, IconButton, Row,  Toggle, cx } from '@/components/ui';
import { actions, store, toast, ui } from '@/state/hercules';
import { useAsync } from '@/hooks/useAsync';
import { clockTime } from '@/services/mock/helpers';
import type { TerminalLine } from '@/types/domain';

const DANGEROUS = ['rm ', 'sudo ', 'kill ', 'docker rm', 'git push', 'npm publish', '>', 'DROP '];

export default function TerminalScreen() {
  const services = store.get().services;
  const rev = store.use((s) => s.rev);
  const agents = store.use((s) => s.agents);
  const { data: sessions } = useAsync(() => services.terminal.sessions(), [rev.terminal]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [value, setValue] = useState('');
  const [historyIdx, setHistoryIdx] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [agentDriven, setAgentDriven] = useState(true);
  const [completions, setCompletions] = useState<string[]>([]);
  const [confirming, setConfirming] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scroller = useRef<HTMLDivElement | null>(null);
  const cmdRef = useRef<HTMLDivElement | null>(null);

  const active = useMemo(() => sessions?.find((s) => s.id === activeId) ?? sessions?.[0] ?? null, [sessions, activeId]);

  const loadBuffer = useCallback(async (id: string) => {
    const buf = await services.terminal.buffer(id);
    setLines(buf);
  }, [services]);

  useEffect(() => {
    if (active) void loadBuffer(active.id);
  }, [active?.id, loadBuffer]);

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      // ⌘/Ctrl+` focuses the terminal from anywhere; ⌥+` jumps to this screen.
      if ((e.metaKey || e.ctrlKey) && e.key === '`') {
        e.preventDefault();
        ui.go('terminal');
        window.setTimeout(() => inputRef.current?.focus(), 80);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [rev.terminal]);

  const submit = useCallback(
    async (raw?: string) => {
      const command = (raw ?? value).trim();
      if (!command || !active) return;
      if (DANGEROUS.some((d) => command.includes(d)) && !confirming) {
        setConfirming(command);
        return;
      }
      setConfirming(null);
      setBusy(true);
      setValue('');
      setHistoryIdx(null);
      const result = await services.terminal.exec(active.id, command, { agentDriven });
      await loadBuffer(active.id);
      setBusy(false);
      if (result.exitCode !== 0) {
        toast({ title: `exit ${result.exitCode}`, body: `“${command}” did not finish cleanly · ${result.durationMs}ms · traceId attached in the audit log`, severity: 'warning', ttlMs: 5_000 });
      }
    },
    [active, agentDriven, confirming, loadBuffer, services, value],
  );

  const onKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      void submit();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const word = value.split(/\s+/).pop() ?? '';
      const list = await services.terminal.completions(word);
      if (list.length === 1 && list[0]) setValue(value.replace(/(\S*)$/, list[0] + ' '));
      setCompletions(list.slice(0, 8));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const cmds = lines.filter((l) => l.kind === 'cmd').map((l) => l.text);
      const next = historyIdx === null ? cmds.length - 1 : Math.max(0, historyIdx - 1);
      if (cmds[next]) {
        setHistoryIdx(next);
        setValue(cmds[next]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const cmds = lines.filter((l) => l.kind === 'cmd').map((l) => l.text);
      const next = historyIdx === null ? null : Math.min(cmds.length - 1, historyIdx + 1);
      setHistoryIdx(next);
      if (next !== null && cmds[next]) setValue(cmds[next]);
    } else if (e.key === 'Escape') {
      setCompletions([]);
      setConfirming(null);
    } else if (value) {
      const word = value.split(/\s+/).pop() ?? '';
      setCompletions(word.length > 1 ? (await services.terminal.completions(word)).slice(0, 8) : []);
    }
  };

  const lastExit = [...lines].reverse().find((l) => l.kind === 'note' && l.text.startsWith('exit'));
  const danger = DANGEROUS.some((d) => value.includes(d));

  return (
    <div className="screen term-screen">
      <div className="term-tabs">
        {(sessions ?? []).map((s) => (
          <button key={s.id} type="button" className={cx('term-tab', active?.id === s.id && 'is-active')} onClick={() => setActiveId(s.id)} title={`${s.cwd} · ${s.shell}`}>
            <span className={cx('term-tab__dot', s.agentDriven && 'is-agent')} />
            <b>{s.name}</b>
            <span className="mono dim">{s.cwd.replace(/^~/, '~')}</span>
            <span
              className="term-tab__x"
              onClick={(e) => {
                e.stopPropagation();
                void services.terminal.close(s.id).then(() => { ui.bump('terminal'); toast({ title: 'Session closed', body: 'Buffer archived to the audit log.', severity: 'info', ttlMs: 3_000 }); });
              }}
            >
              <Icon name="close" size={10} />
            </span>
          </button>
        ))}
        <button
          type="button"
          className="term-tab term-tab--new"
          onClick={() => void services.terminal.create(`shell-${(sessions?.length ?? 0) + 1}`, 'zsh', '~/hercules').then((s) => { ui.bump('terminal'); setActiveId(s.id); })}
        >
          <Icon name="plus" size={11} /> session
        </button>
        <span className="spacer" />
        <Toggle size="sm" checked={agentDriven} onChange={setAgentDriven} hint={agentDriven ? 'commands run as agent-driven (audited, gated)' : 'operator-only — no agent sees this session'} />
        <Chip size="sm" tone={lastExit?.text.includes('exit 0') ? 'success' : 'dim'}>{lastExit?.text.split('·')[0]?.trim() ?? 'no exit yet'}</Chip>
      </div>

      <div className="split split--a">
        <section className="hud__panel term-panel">
          <header className="hud__panel-head">
            <div className="hud__panel-title">
              <Icon name="terminal" size={14} className="hud__panel-icon" />
              <div>
                <h3 className="mono">{active ? `${active.name} · ${active.shell}` : 'terminal'}</h3>
                <p className="hud__panel-sub">
                  {active?.cwd ?? '—'} · risk {active?.risk ?? '—'} · {agentDriven ? 'shared with the estate' : 'private to you'} · Tab completes, ↑↓ walks history
                </p>
              </div>
            </div>
            <div className="cluster">
              <IconButton icon="chevUp" size="sm" title="Scroll up" onClick={() => scroller.current?.scrollBy({ top: -420 })} />
              <IconButton icon="chevDown" size="sm" title="Scroll to bottom" onClick={() => scroller.current?.scrollTo({ top: 1e9, behavior: 'smooth' })} />
              <Button size="sm" icon="close" onClick={() => { void submit('clear'); }}>Clear</Button>
            </div>
          </header>
          <div className="hud__panel-body term-out" ref={scroller}>
            {lines.map((l, i) => (
              <div key={`${l.id}-${i}`} className={cx('term-line', `term-line--${l.kind}`)}>
                <span className="term-line__t mono">{clockTime(l.at)}</span>
                {l.kind === 'cmd' ? <span className="term-line__pfx">$</span> : null}
                <span className="term-line__text">{l.text}</span>
              </div>
            ))}
            {!lines.length && <div className="term-line term-line--note"><span className="dim">empty buffer — type `help` for the verb list</span></div>}
            {busy && (
              <div className="term-line term-line--run">
                <span className="term-line__pfx">›</span>
                <span className="dim">executing…</span>
              </div>
            )}
          </div>

          <div className="term-input" ref={cmdRef}>
            <span className={cx('term-input__pfx', danger && 'is-danger', agentDriven && 'is-agent')}>{agentDriven ? '⌁' : '$'}</span>
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={agentDriven ? 'command · audited and gated when destructive' : 'command · operator-only session'}
              spellCheck={false}
            />
            {busy && <Icon name="refresh" size={12} className="spin dim" />}
            <Button size="sm" variant={danger ? 'danger' : 'ghost'} icon="play" disabled={!value.trim() || busy} onClick={() => void submit()}>
              Run
            </Button>
            {completions.length > 1 && (
              <div className="term-pop">
                {completions.map((c) => (
                  <button key={c} type="button" onClick={() => { setValue(value.replace(/(\S*)$/, c + ' ')); setCompletions([]); inputRef.current?.focus(); }}>
                    <span className="mono">{c}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {confirming && (
            <div className="term-confirm">
              <Icon name="alert" size={13} />
              <div>
                <b>Destructive verb detected</b>
                <span className="mono">{confirming}</span>
                <p>It matches a pattern the policy engine flags: writes outside the workspace, kills, or pushes. Approve once, or let an agent handle it through the gate so the reason is recorded.</p>
              </div>
              <span className="spacer" />
              <Button size="sm" onClick={() => setConfirming(null)}>Cancel</Button>
              <Button size="sm" variant="danger" icon="check" onClick={() => { const c = confirming; setConfirming(null); void submit(c); }}>
                Run anyway
              </Button>
            </div>
          )}
        </section>

        <div className="stack">
          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="command" size={14} className="hud__panel-icon" />
                <div>
                  <h3>Verbs</h3>
                  <p className="hud__panel-sub">Click to run. This is the same set the agents use.</p>
                </div>
              </div>
            </header>
            <div className="hud__panel-body verbgrid">
              {[
                ['help', 'verb list'],
                ['status', 'estate health'],
                ['agents', 'fleet + load'],
                ['task list', 'open work'],
                ['memory search "pricing"', 'recall'],
                ['ps', 'processes'],
                ['trace tr-91f2ac', 'audit a run'],
                ['model select local', 'route override'],
                ['index --now', 'rebuild ATLAS'],
                ['approve', 'clear the gate'],
                ['git status', 'repo state'],
                ['whoami', 'identity + scopes'],
              ].map(([cmd, label]) => (
                <button key={cmd} type="button" className="verbcell" onClick={() => void submit(cmd)}>
                  <b className="mono">{cmd}</b>
                  <span className="dim">{label}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="agent" size={14} className="hud__panel-icon" />
                <div>
                  <h3>Hand this to an agent</h3>
                  <p className="hud__panel-sub">The command becomes a task with your session as its working directory.</p>
                </div>
              </div>
            </header>
            <div className="hud__panel-body">
              <div className="stack--tight">
                {agents.filter((a) => a.status !== 'retired').slice(0, 5).map((a) => (
                  <Row key={a.id} className="minirow" onClick={() => {
                    void actions.createTask({
                      title: `Run \`${value || 'status'}\` in ${active?.name ?? 'core'}`,
                      objective: `Execute in session ${active?.cwd ?? '~'}, report exit code and the two lines that matter.`,
                      priority: 'p2',
                      projectId: null,
                      departmentId: a.departmentId,
                      assigneeAgentId: a.id,
                      estimateMin: 15,
                    }).then(() => toast({ title: `Delegated to ${a.name}`, body: 'The task carries your command and the reason you typed it.', severity: 'success', ttlMs: 4_000 }));
                  }}>
                    <Icon name="chevRight" size={11} className="dim" />
                    <span>{a.name}</span>
                    <em className="mono">{a.load}% · {a.status}</em>
                  </Row>
                ))}
              </div>
            </div>
            <footer className="hud__panel-foot"><span className="dim">delegated commands run under the agent's scopes, not yours</span></footer>
          </section>

          <section className="hud__panel">
            <header className="hud__panel-head">
              <div className="hud__panel-title">
                <Icon name="key" size={14} className="hud__panel-icon" />
                <div>
                  <h3>Session audit</h3>
                  <p className="hud__panel-sub">Last {Math.min(6, lines.length)} lines as recorded.</p>
                </div>
              </div>
            </header>
            <div className="hud__panel-body stack--tight">
              {lines.slice(-6).reverse().map((l) => (
                <Row key={l.id} className="miniline">
                  <Chip size="sm" tone={l.kind === 'err' ? 'danger' : l.kind === 'cmd' ? 'accent' : 'dim'}>{l.kind}</Chip>
                  <span className="mono miniline__t">{clockTime(l.at)}</span>
                  <span className="miniline__x">{l.text.slice(0, 70)}</span>
                </Row>
              ))}
              {!lines.length && <span className="dim" style={{ fontSize: 11 }}>Nothing recorded yet.</span>}
            </div>
            <footer className="hud__panel-foot">
              <span className="spacer" />
              <button className="linklike" onClick={() => ui.go('activity')}>full activity stream</button>
            </footer>
          </section>
        </div>
      </div>
    </div>
  );
}
