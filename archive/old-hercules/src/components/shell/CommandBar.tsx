/**
 * HERCULES · command bar
 * ⌘K everywhere. One input, three modes: navigate to a real entity, execute a
 * real action, or hand the sentence to the core as an intent. Nothing here is
 * decorative — every row mutates the same store a screen would.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from '@/components/Icon';
import { Chip, Spinner, cx } from '@/components/ui';
import { actions, store, toast, ui } from '@/state/hercules';
import { buildCommands, buildDeferredCommands, rankCommands, type Command } from '@/components/command/registry';
import { useDebounced } from '@/hooks/useAsync';

const MODES = [
  { id: 'all', label: 'Everything', icon: 'layers' },
  { id: 'act', label: 'Actions', icon: 'bolt' },
  { id: 'entities', label: 'Entities', icon: 'agent' },
  { id: 'nav', label: 'Screens', icon: 'grid' },
] as const;

export function CommandBar() {
  const open = store.use((s) => s.commandBarOpen);
  const state = store.get();
  const [query, setQuery] = useState('');
  const debounced = useDebounced(query, 90);
  const [mode, setMode] = useState<(typeof MODES)[number]['id']>('all');
  const [cursor, setCursor] = useState(0);
  const [deferred, setDeferred] = useState<Command[]>([]);
  const [thinking, setThinking] = useState(false);
  const [intentHint, setIntentHint] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setCursor(0);
    setMode('all');
    setIntentHint(null);
    const t = window.setTimeout(() => inputRef.current?.focus(), 20);
    void buildDeferredCommands(store.get()).then(setDeferred);
    return () => window.clearTimeout(t);
  }, [open]);

  const all = useMemo(() => [...buildCommands(store.get()), ...deferred], [deferred, open, state.rev]);

  const filtered = useMemo(() => {
    const scoped =
      mode === 'all'
        ? all
        : mode === 'nav'
          ? all.filter((c) => c.group === 'Navigate')
          : mode === 'act'
            ? all.filter((c) => c.group === 'Act' || c.group === 'Automations')
            : all.filter((c) => ['Agents', 'Tasks', 'Memory', 'Files', 'Projects'].includes(c.group));
    return rankCommands(debounced, scoped);
  }, [all, debounced, mode]);

  const showAsk = debounced.trim().length > 3 && !filtered.some((c) => c.label.toLowerCase() === debounced.trim().toLowerCase());

  useEffect(() => setCursor(0), [debounced, mode]);
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${cursor}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [cursor]);

  useEffect(() => {
    let cancelled = false;
    if (debounced.trim().split(' ').length < 3) {
      setIntentHint(null);
      return;
    }
    const t = window.setTimeout(async () => {
      if (cancelled) return;
      setThinking(true);
      const intent = await store.get().services.ai.actAsIntent(debounced).catch(() => null);
      setThinking(false);
      if (!cancelled && intent) setIntentHint(`${intent.verb} · ${Math.round(intent.confidence * 100)}% confidence`);
    }, 320);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [debounced]);

  if (!open) return null;

  const runCommand = (c: Command) => {
    ui.setCommandBar(false);
    void Promise.resolve(c.run()).catch(() => undefined);
  };

  const ask = () => {
    const text = query.trim();
    if (!text) return;
    ui.setCommandBar(false);
    ui.go('core');
    void actions.sendPrompt(text);
  };

  const items = [...filtered.map((c) => ({ kind: 'cmd' as const, cmd: c })), ...(showAsk ? [{ kind: 'ask' as const, cmd: null }] : [])];

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      ui.setCommandBar(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCursor((c) => Math.min(items.length - 1, c + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCursor((c) => Math.max(0, c - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = items[cursor];
      if (!item) return ask();
      if (item.kind === 'ask') ask();
      else runCommand(item.cmd!);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const i = MODES.findIndex((m) => m.id === mode);
      setMode(MODES[(i + (e.shiftKey ? MODES.length - 1 : 1)) % MODES.length]!.id);
    } else if (e.key === 'Backspace' && !query) {
      e.preventDefault();
      ui.setCommandBar(false);
    }
  };

  return (
    <div className="scrim" onMouseDown={(e) => e.target === e.currentTarget && ui.setCommandBar(false)}>
      <div className="cmdbar" role="dialog" aria-label="HERCULES command bar" onKeyDown={onKey}>
        <div className="cmdbar__input">
          <span className="cmdbar__sigil">
            <Icon name="core" size={16} />
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Give an order, ask a question, or find anything…"
            spellCheck={false}
            autoComplete="off"
          />
          {thinking ? <Spinner size={12} /> : intentHint ? <Chip size="sm" tone="info" icon="target">{intentHint}</Chip> : null}
          <kbd className="cmdbar__esc">esc</kbd>
        </div>

        <div className="cmdbar__modes">
          <div className="cmdbar__modeset">
            {MODES.map((m) => (
              <button key={m.id} type="button" className={cx('cmdbar__mode', mode === m.id && 'is-active')} onClick={() => setMode(m.id)}>
                <Icon name={m.icon} size={11} />
                {m.label}
              </button>
            ))}
          </div>
          <span className="mono cmdbar__count">
            {items.length} {items.length === 1 ? 'match' : 'matches'}
          </span>
        </div>

        <div className="cmdbar__list" ref={listRef}>
          {items.length === 0 && (
            <div className="cmdbar__none">
              <Icon name="spark" size={16} />
              <span>No registry entry matched. The core can still reason about it — press ⏎ to hand it over.</span>
            </div>
          )}
          {items.map((item, i) =>
            item.kind === 'ask' ? (
              <button key="ask" type="button" data-idx={i} className={cx('cmdbar__item', 'cmdbar__item--ask', cursor === i && 'is-cursor')} onMouseEnter={() => setCursor(i)} onClick={ask}>
                <span className="cmdbar__icon is-accent">
                  <Icon name="spark" size={14} />
                </span>
                <span className="cmdbar__main">
                  <b>Ask HERCULES: “{query.trim().slice(0, 80)}”</b>
                  <small>Streams a plan, dispatches agents, reports cost</small>
                </span>
                <kbd>⏎</kbd>
              </button>
            ) : (
              <button
                key={item.cmd!.id}
                type="button"
                data-idx={i}
                className={cx('cmdbar__item', cursor === i && 'is-cursor')}
                onMouseEnter={() => setCursor(i)}
                onClick={() => runCommand(item.cmd!)}
              >
                <span className={cx('cmdbar__icon', item.cmd!.tone && `is-${item.cmd!.tone}`)}>
                  <Icon name={item.cmd!.icon} size={14} />
                </span>
                <span className="cmdbar__main">
                  <b>{item.cmd!.label}</b>
                  {item.cmd!.hint && <small>{item.cmd!.hint}</small>}
                </span>
                {item.cmd!.badge && <Chip size="sm" tone={item.cmd!.tone === 'danger' ? 'danger' : 'dim'}>{item.cmd!.badge}</Chip>}
                <span className="cmdbar__group">{item.cmd!.group}</span>
                {item.cmd!.shortcut && <kbd>{item.cmd!.shortcut}</kbd>}
              </button>
            ),
          )}
        </div>

        <footer className="cmdbar__foot">
          <span>
            <kbd>↑↓</kbd> move
          </span>
          <span>
            <kbd>⇥</kbd> scope
          </span>
          <span>
            <kbd>⌘⏎</kbd> pin to core
          </span>
          <button
            type="button"
            onClick={() => {
              toast({ title: 'Command bar is live', body: 'Every entry runs against the same store the screens read.', severity: 'info', ttlMs: 4_000 });
            }}
          >
            <Icon name="alert" size={11} /> about
          </button>
          <span className="cmdbar__transport mono">{store.get().services.transport} transport</span>
        </footer>
      </div>
    </div>
  );
}
