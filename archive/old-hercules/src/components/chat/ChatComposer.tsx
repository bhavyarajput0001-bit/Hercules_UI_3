/**
 * HERCULES · chat composer
 * One field, three affordances: type, talk, or hand it an artifact. It shows
 * the router's decision *before* you commit (which model, which privacy path,
 * rough cost) because a command centre should never be a surprise machine.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from '@/components/Icon';
import { Chip, IconButton, Spinner, cx } from '@/components/ui';
import { actions, store, toast, ui } from '@/state/hercules';
import { useAsync } from '@/hooks/useAsync';
import type { ModelInfo } from '@/types/domain';

const SUGGESTIONS: Record<'core' | 'wide', string[]> = {
  core: ['Brief me on TITAN', 'What needs my signature?', 'Cut this month’s spend'],
  wide: [
    'Replan TITAN so the audit lands before freeze',
    'Compare our pricing to the last 3 entrants',
    'Turn my Sunday invoice ritual into an automation',
    'What touched my files in the last hour?',
  ],
};

export function ChatComposer({
  variant = 'core',
  placeholder,
  autoFocus,
}: {
  variant?: 'core' | 'wide';
  placeholder?: string;
  autoFocus?: boolean;
}) {
  const [text, setText] = useState('');
  const [files, setFiles] = useState<{ name: string; sizeBytes: number }[]>([]);
  const [routing, setRouting] = useState<string | null>(null);
  const busy = store.use((s) => !!s.busy['core.stream']);
  const voice = store.use((s) => s.voice);
  const services = store.get().services;
  const ta = useRef<HTMLTextAreaElement | null>(null);
  const { data: models } = useAsync(() => services.ai.models(), []);

  const intent = useAsync(() => (text.trim().split(' ').length > 3 ? services.ai.actAsIntent(text) : Promise.resolve(null)), [text.split(' ').length > 3 ? text.slice(0, 24) : '']);

  useEffect(() => {
    if (!autoFocus) return;
    const t = window.setTimeout(() => ta.current?.focus(), 60);
    return () => window.clearTimeout(t);
  }, [autoFocus]);

  useEffect(() => {
    const el = ta.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(variant === 'core' ? 132 : 180, el.scrollHeight)}px`;
  }, [text, variant]);

  const guess = useMemo(() => {
    if (!models) return null;
    const t = text.toLowerCase();
    const needs = (cap: ModelInfo['capabilities'][number]) => t.includes(cap);
    if (needs('image') || /\b(hero|key art|poster|render)\b/.test(t)) return models.find((m) => m.id === 'mdl-pigment') ?? null;
    if (needs('video') || /\b(film|trailer|cut)\b/.test(t)) return models.find((m) => m.id === 'mdl-motion') ?? null;
    if (/\b(prove|derive|architect|redesign|why)\b/.test(t)) return models.find((m) => m.tier === 'frontier') ?? null;
    if (/\b(list|summar|rename|chase|quick)\b/.test(t)) return models.find((m) => m.tier === 'fast') ?? null;
    if (/\b(memory|my |private|receipts|contract)\b/.test(t)) return models.find((m) => m.provider === 'local') ?? null;
    return models.find((m) => m.tier === 'balanced') ?? null;
  }, [models, text]);

  useEffect(() => {
    if (!guess) return;
    const t = window.setTimeout(() => setRouting(guess.name), 260);
    return () => window.clearTimeout(t);
  }, [guess]);

  const send = () => {
    const value = text.trim();
    if (!value || busy) return;
    setText('');
    setFiles([]);
    ui.busy('core.stream', true);
    void actions.sendPrompt(value).finally(() => ui.busy('core.stream', false));
  };

  return (
    <div className={cx('composer', `composer--${variant}`, busy && 'is-busy')}>
      <div className="composer__field">
        <textarea
          ref={ta}
          value={text}
          rows={1}
          placeholder={placeholder ?? (variant === 'core' ? 'Command HERCULES, or ask it anything…' : 'Give it an outcome, not a message…')}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              send();
            }
            if (e.key === 'Escape') ta.current?.blur();
          }}
        />
        {files.length > 0 && (
          <div className="composer__files">
            {files.map((f, i) => (
              <Chip
                key={f.name + i}
                size="sm"
                tone="accent"
                icon="file"
                onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))}
                title="Click to drop this attachment"
              >
                {f.name}
              </Chip>
            ))}
          </div>
        )}
      </div>

      <div className="composer__rail">
        <label className="composer__attach" title="Attach a file to the context">
          <input
            type="file"
            multiple
            onChange={(e) => setFiles((prev) => [...prev, ...Array.from(e.target.files ?? []).map((f) => ({ name: f.name, sizeBytes: f.size }))])}
          />
          <Icon name="plus" size={14} />
        </label>
        <IconButton icon="mic" size="sm" title="Voice capture (⌘⇧Space)" active={voice.active} onClick={() => void actions.toggleVoice()} />
        <div className="composer__meta">
          {busy ? (
            <span className="composer__busy">
              <Spinner size={10} /> core is composing…
            </span>
          ) : (
            <>
              {intent.data && intent.data.confidence > 0.55 && (
                <Chip size="sm" tone="info" icon="target" title={`Parsed as ${intent.data.verb}`}>
                  {intent.data.verb}
                </Chip>
              )}
              {routing && (
                <Chip size="sm" tone="dim" icon="route" title="Router picks the cheapest model that clears the quality bar">
                  {routing}
                </Chip>
              )}
              {guess && guess.provider === 'local' && (
                <Chip size="sm" tone="success" icon="shield" title="Local inference: nothing leaves this machine">
                  on-device
                </Chip>
              )}
            </>
          )}
        </div>
        <div className="composer__suggest">
          {SUGGESTIONS[variant].map((s) => (
            <button key={s} type="button" onClick={() => setText(s)}>
              {s}
            </button>
          ))}
        </div>
        <button type="button" className="composer__send" onClick={send} disabled={!text.trim() || busy} title="Send (⏎)">
          {busy ? <Spinner size={13} /> : <Icon name="send" size={15} />}
        </button>
      </div>
      <div className="composer__foot">
        <span className="dim">⏎ send · ⇧⏎ newline · ⌘⇧Space voice</span>
        <button type="button" className="linklike" onClick={() => toast({ title: 'Context policy', body: 'Attachments are indexed locally and only the retrieved chunks enter the model window.', severity: 'info', ttlMs: 5_000 })}>
          how context is built
        </button>
      </div>
    </div>
  );
}

export function ComposerMini() {
  const [text, setText] = useState('');
  const busy = store.use((s) => !!s.busy['core.stream']);
  return (
    <div className="composer composer--mini">
      <input
        value={text}
        placeholder="Quick command…"
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && text.trim()) {
            ui.busy('core.stream', true);
            void actions.sendPrompt(text).finally(() => ui.busy('core.stream', false));
            setText('');
          }
        }}
      />
      <button type="button" className="iconbtn iconbtn--sm" onClick={() => ui.setCommandBar(true)} title="Open the full command bar">
        <Icon name={busy ? 'pause' : 'search'} size={13} />
      </button>
    </div>
  );
}

export { ui };
