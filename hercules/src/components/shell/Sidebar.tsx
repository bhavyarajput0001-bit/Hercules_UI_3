/**
 * HERCULES · sidebar (the rail)
 * Grouped navigation, live estate counters, and the one control that matters
 * most in a panic: freeze everything.
 */
import { Icon } from '@/components/Icon';
import { Chip, IconButton, cx } from '@/components/ui';
import { GROUPS, SCREENS, type ScreenId } from '@/state/nav';
import { actions, store, ui } from '@/state/hercules';
import { useHologram } from '@/hologram/useHologram';

export function Sidebar() {
  const screen = store.use((s) => s.screen);
  const agents = store.use((s) => s.agents);
  const tasks = store.use((s) => s.tasks);
  const approvals = store.use((s) => s.approvals);
  const overlay = store.use((s) => s.modelOverlay);

  const live = agents.filter((a) => a.status === 'working' || a.status === 'thinking').length;
  const stuck = agents.filter((a) => a.status === 'blocked' || a.status === 'error').length;
  const open = tasks.filter((t) => t.status !== 'done' && t.status !== 'cancelled').length;

  const canvasRef = useHologram(
    'dock',
    () => ({
      state: store.get().vitals.state,
      energy: store.get().vitals.energy,
      amplitude: store.get().voice.active ? 0.6 : store.get().voice.level,
      satellites: store.get().agents.filter((a) => a.status === 'working' || a.status === 'thinking').length,
    }),
    [],
  );

  return (
    <nav className={cx('rail', overlay.on && 'is-overlay')} aria-label="Primary">
      <div className="rail__core" onClick={() => ui.go('core')} role="button" tabIndex={0}>
        <canvas ref={canvasRef} className="rail__canvas" />
        <span className="rail__word">HERCULES</span>
      </div>

      <div className="rail__scroll">
        {GROUPS.map((g) => (
          <div key={g} className="rail__group">
            <span className="rail__group-label">{g}</span>
            {SCREENS.filter((s) => s.group === g).map((s) => {
              const badge = badgeFor(s.id, { approvals: approvals.length, open, live, stuck });
              return (
                <button
                  key={s.id}
                  type="button"
                  className={cx('rail__item', screen === s.id && 'is-active')}
                  onClick={() => ui.go(s.id as ScreenId)}
                  title={`${s.title} — ${s.blurb}`}
                >
                  <span className="rail__item-icon">
                    <Icon name={s.icon} size={15} />
                  </span>
                  <span className="rail__item-label">{s.label}</span>
                  {typeof badge === 'number' && badge > 0 ? <span className="rail__count">{badge}</span> : badge ? <span className="rail__count rail__count--warn">{badge}</span> : null}
                  {s.hotkey !== undefined && <span className="rail__key mono">⌘{s.hotkey}</span>}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="rail__foot">
        <div className="rail__counters">
          <div>
            <b className="mono">{live}</b>
            <span>live</span>
          </div>
          <div>
            <b className="mono">{open}</b>
            <span>open</span>
          </div>
          <div>
            <b className="mono">{approvals.length}</b>
            <span>asks</span>
          </div>
        </div>
        <div className="rail__actions">
          <Chip tone={stuck ? 'danger' : 'dim'} size="sm" icon="bolt" title={`${stuck} agents need attention`}>
            {stuck ? `${stuck} stuck` : 'nominal'}
          </Chip>
          <IconButton icon="lock" title="Freeze every agent at a safe boundary" tone="warn" size="sm" onClick={() => void actions.freezeEstate()} />
          <IconButton icon="settings" title="Settings" size="sm" onClick={() => ui.go('settings')} />
        </div>
      </div>
    </nav>
  );
}

function badgeFor(id: ScreenId, ctx: { approvals: number; open: number; live: number; stuck: number }): number | string | null {
  switch (id) {
    case 'notifications':
      return ctx.approvals || null;
    case 'tasks':
      return ctx.open || null;
    case 'agents':
      return ctx.stuck ? `${ctx.stuck}!` : ctx.live || null;
    default:
      return null;
  }
}
