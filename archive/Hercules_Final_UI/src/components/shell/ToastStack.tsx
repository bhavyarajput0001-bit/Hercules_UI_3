/**
 * HERCULES · toasts
 * Every action answers back. Severity, provenance and (where relevant) an
 * inline repair action — never a silent failure.
 */
import { Icon } from '@/components/Icon';
import { dismissToast, store } from '@/state/hercules';

const ICON = { info: 'spark', success: 'check', warning: 'alert', critical: 'shield' } as const;

export function ToastStack() {
  const toasts = store.use((s) => s.toasts);
  if (!toasts.length) return null;
  return (
    <div className="toasts" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast--${t.severity}`}>
          <span className="toast__icon">
            <Icon name={ICON[t.severity]} size={13} />
          </span>
          <div className="toast__body">
            <b>{t.title}</b>
            {t.body && <p>{t.body}</p>}
          </div>
          {t.action && (
            <button
              type="button"
              className="toast__action"
              onClick={() => {
                t.action?.run();
                dismissToast(t.id);
              }}
            >
              {t.action.label}
            </button>
          )}
          <button type="button" className="toast__close" onClick={() => dismissToast(t.id)} aria-label="Dismiss">
            <Icon name="close" size={12} />
          </button>
          {t.ttlMs > 0 && <span className="toast__fuse" style={{ animationDuration: `${t.ttlMs}ms` }} />}
        </div>
      ))}
    </div>
  );
}
