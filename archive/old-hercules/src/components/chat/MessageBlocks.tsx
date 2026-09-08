/**
 * HERCULES · answer blocks
 * The core does not answer in paragraphs only — it answers in structures:
 * plans it executed, tool calls it made, artifacts it produced, gates it needs
 * you at, and the sources it leaned on. Each renders as its own object.
 */
import { useState } from 'react';
import { Icon } from '@/components/Icon';
import { Button, Chip, Meter, Row, Spinner, StatusDot, cx } from '@/components/ui';
import { actions, store, ui } from '@/state/hercules';
import type { MessageBlock } from '@/types/domain';

export function MessageBlocks({ blocks, streaming }: { blocks: MessageBlock[]; streaming?: boolean }) {
  return (
    <div className="blocks">
      {blocks.map((b, i) => (
        <Block key={i} block={b} last={i === blocks.length - 1} streaming={streaming} />
      ))}
    </div>
  );
}

function Block({ block, last, streaming }: { block: MessageBlock; last: boolean; streaming?: boolean }) {
  switch (block.kind) {
    case 'text':
      return (
        <p className={cx('block block--text', last && streaming && 'is-typing')}>
          <RichText text={block.text ?? ''} />
          {last && streaming && <span className="caret" />}
        </p>
      );
    case 'code':
      return <CodeBlock text={block.text ?? ''} lang={block.lang ?? block.language} />;
    case 'plan':
      return <PlanBlock steps={block.steps ?? []} />;
    case 'tool-call':
      return <ToolCall block={block} />;
    case 'file':
      return (
        <div className="block block--file">
          <Icon name="file" size={12} />
          <span>{block.text}</span>
          <Chip size="sm" tone={block.status === 'ok' ? 'success' : 'dim'}>
            {block.status ?? 'ok'}
          </Chip>
        </div>
      );
    case 'citations':
      return <Citations items={block.citations ?? []} />;
    case 'approval':
      return <ApprovalGate text={block.text ?? ''} />;
    case 'chart':
      return <MiniChart label={block.text ?? ''} series={block.series ?? []} />;
    default:
      return <p className="block block--text">{block.text}</p>;
  }
}

/* ── text ────────────────────────────────────────────────────────────────── */

function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\n)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (p === '\n') return <br key={i} />;
        if (p.startsWith('**') && p.endsWith('**'))
          return (
            <b key={i} style={{ fontWeight: 600, color: 'var(--text)' }}>
              {p.slice(2, -2)}
            </b>
          );
        if (p.startsWith('`') && p.endsWith('`'))
          return (
            <code key={i} className="inline-code">
              {p.slice(1, -1)}
            </code>
          );
        return <span key={i}>{p}</span>;
      })}
    </>
  );
}

/* ── plan ────────────────────────────────────────────────────────────────── */

function PlanBlock({ steps }: { steps: NonNullable<MessageBlock['steps']> }) {
  const done = steps.filter((s) => s.status === 'done').length;
  return (
    <div className="block plan">
      <div className="plan__head">
        <Icon name="layers" size={12} />
        <b>Plan</b>
        <span className="dim mono">
          {done}/{steps.length}
        </span>
        <span className="plan__bar">
          <span style={{ width: `${(done / Math.max(1, steps.length)) * 100}%` }} />
        </span>
      </div>
      {steps.map((s) => (
        <div key={s.id} className={cx('plan__step', `is-${s.status}`)}>
          <span className="plan__mark">
            {s.status === 'active' ? <Spinner size={10} /> : s.status === 'done' ? <Icon name="check" size={10} /> : s.status === 'failed' ? <Icon name="close" size={10} /> : <span className="plan__dot" />}
          </span>
          <span className="plan__label">{s.label}</span>
          {s.agent && (
            <button type="button" className="plan__agent" onClick={() => ui.go('agents')} title={`Handled by ${s.agent}`}>
              {s.agent}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── tool call ───────────────────────────────────────────────────────────── */

function ToolCall({ block }: { block: MessageBlock }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={cx('block toolcall', `is-${block.status ?? 'ok'}`)}>
      <button type="button" className="toolcall__head" onClick={() => setOpen((o) => !o)}>
        <StatusDot status={block.status === 'running' ? 'working' : block.status === 'error' ? 'error' : 'ok'} pulse={false} />
        <span className="mono">{block.tool}</span>
        <span className="toolcall__args mono dim">{open ? block.args : truncate(block.args ?? '', 56)}</span>
        <Icon name={open ? 'chevUp' : 'chevDown'} size={11} />
      </button>
      {open && (
        <div className="toolcall__body">
          <pre className="mono">{block.args}</pre>
          {block.result && (
            <p>
              <span className="dim">result · </span>
              {block.result}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

/* ── citations ───────────────────────────────────────────────────────────── */

function Citations({ items }: { items: NonNullable<MessageBlock['citations']> }) {
  return (
    <div className="block citations">
      <span className="citations__label">
        <Icon name="link" size={11} /> sources
      </span>
      {items.map((c, i) => (
        <button key={c.id} type="button" className="citation" onClick={() => { ui.go('knowledge'); toastFlash(); }} title={`${c.source} · open in knowledge estate`}>
          <em>[{i + 1}]</em>
          <span>{c.title}</span>
          <small>{c.source}</small>
        </button>
      ))}
    </div>
  );
}

function toastFlash() {
  ui.bump('knowledge');
}

/* ── approval gate ───────────────────────────────────────────────────────── */

function ApprovalGate({ text }: { text: string }) {
  const approvals = store.use((s) => s.approvals);
  const [done, setDone] = useState<'approved' | 'denied' | null>(null);
  const first = approvals[0];
  return (
    <div className={cx('block gate', done && `is-${done}`)}>
      <div className="gate__head">
        <Icon name="shield" size={13} />
        <b>Decision needed</b>
        <span className="spacer" />
        {done ? <Chip size="sm" tone={done === 'approved' ? 'success' : 'danger'}>{done}</Chip> : <Chip size="sm" tone="warn">pending</Chip>}
      </div>
      <p>{text}</p>
      {!done && (
        <div className="gate__actions">
          <Button
            variant="solid"
            size="sm"
            icon="check"
            onClick={async () => {
              if (!first) return setDone('approved');
              await actions.respondApproval(first.id, true);
              setDone('approved');
            }}
          >
            Approve
          </Button>
          <Button
            size="sm"
            onClick={async () => {
              if (!first) return setDone('denied');
              await actions.respondApproval(first.id, false);
              setDone('denied');
            }}
          >
            Deny
          </Button>
          <Button size="sm" variant="bare" onClick={() => ui.go('permissions')}>
            Inspect policy
          </Button>
        </div>
      )}
    </div>
  );
}

/* ── chart ───────────────────────────────────────────────────────────────── */

function MiniChart({ label, series }: { label: string; series: NonNullable<MessageBlock['series']> }) {
  const data = series[0]?.values ?? [];
  const max = Math.max(1, ...data);
  return (
    <div className="block mini-chart">
      <div className="mini-chart__head">
        <b>{label}</b>
        <span className="mono dim">peak {max}</span>
      </div>
      <div className="mini-chart__bars">
        {data.map((v, i) => (
          <span key={i} style={{ height: `${(v / max) * 100}%` }} title={`day ${i + 1}: $${v}`} />
        ))}
      </div>
    </div>
  );
}

/* ── code ────────────────────────────────────────────────────────────────── */

export function CodeBlock({ text, lang = 'text', maxHeight = 300 }: { text: string; lang?: string; maxHeight?: number }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="block codeblock">
      <div className="codeblock__head">
        <span className="mono">{lang}</span>
        <span className="spacer" />
        <button
          type="button"
          className="codeblock__copy"
          onClick={() => {
            void navigator.clipboard?.writeText(text).catch(() => undefined);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1_400);
          }}
        >
          <Icon name={copied ? 'check' : 'copy'} size={11} />
          {copied ? 'copied' : 'copy'}
        </button>
      </div>
      <pre className="codeblock__body" style={{ maxHeight }}>
        <Highlight code={text} />
      </pre>
    </div>
  );
}

/** Deliberately tiny highlighter: keywords, strings, comments, numbers. */
export function Highlight({ code }: { code: string }) {
  const re = /(\/\/[^\n]*|#[^\n]*|\/\*[\s\S]*?\*\/)|(['"`])(?:\\.|(?!\2)[^\\])*\2|\b(const|let|var|function|return|if|else|for|while|async|await|export|import|from|interface|type|new|class|throw|try|catch|=>|null|undefined|true|false)\b|\b(\d+(?:\.\d+)?)\b/g;
  const out: React.ReactNode[] = [];
  let i = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(code))) {
    if (m.index > i) out.push(code.slice(i, m.index));
    const cls = m[1] ? 'c' : m[2] ? 's' : m[3] ? 'k' : 'n';
    out.push(
      <span key={m.index} className={`tok-${cls}`}>
        {m[0]}
      </span>,
    );
    i = m.index + m[0].length;
  }
  if (i < code.length) out.push(code.slice(i));
  return <>{out}</>;
}

const truncate = (s: string, n: number) => (s.length > n ? `${s.slice(0, n)}…` : s);

export function ActivityRow({ children, tone = 'dim', flash }: { children: React.ReactNode; tone?: string; flash?: boolean }) {
  return (
    <Row className={cx('act-row', `act-row--${tone}`)} flash={flash}>
      {children}
    </Row>
  );
}

export function ProgressLine({ label, value, max = 100 }: { label: string; value: number; max?: number }) {
  return (
    <div className="progressline">
      <span>{label}</span>
      <Meter value={value} max={max} tone="accent" height={3} />
    </div>
  );
}
