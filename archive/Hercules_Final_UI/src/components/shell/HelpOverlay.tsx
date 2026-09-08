/**
 * HERCULES · keyboard map
 * Because a command-center product is used at speed, the shortcuts are the
 * product. This overlay doubles as the onboarding surface.
 */
import { Icon } from '@/components/Icon';
import { store, ui } from '@/state/hercules';
import { SCREENS } from '@/state/nav';

const KEYS: [string, string][] = [
  ['⌘K / Ctrl K', 'Summon the command bar from anywhere'],
  ['⌘⇧Space', 'Armed voice capture (barge-in to interrupt speech)'],
  ['⌘1 … ⌘0', 'Jump to the first ten surfaces'],
  ['⌘J', 'Jump straight to the terminal'],
  ['⌘⇧M', 'Media play / pause'],
  ['⌘I', 'Toggle the inspector'],
  ['⌘⇧F', 'Freeze the estate at safe boundaries'],
  ['⌘/', 'This keyboard map (also “?”)'],
  ['Esc', 'Close the topmost layer, stop a stream'],
  ['↑ ↓ ⏎', 'Move and run inside the command bar'],
  ['Tab', 'Switch command scope (Everything / Actions / Entities / Screens)'],
  ['⌥⌘H', 'Summon the floating core (desktop shell hotkey)'],
];

export function HelpOverlay() {
  const open = store.use((s) => s.helpOpen);
  if (!open) return null;
  return (
    <div className="scrim" onMouseDown={(e) => e.target === e.currentTarget && ui.setHelp(false)}>
      <div className="help" role="dialog" aria-label="Keyboard map">
        <header>
          <div>
            <h2>Command in the keyboard</h2>
            <p>HERCULES is built to be driven without reaching for the mouse. These are the only bindings you need.</p>
          </div>
          <button type="button" className="iconbtn" onClick={() => ui.setHelp(false)} aria-label="Close">
            <Icon name="close" size={15} />
          </button>
        </header>

        <div className="help__grid">
          {KEYS.map(([k, v]) => (
            <div key={k} className="help__key">
              <kbd>{k}</kbd>
              <span>{v}</span>
            </div>
          ))}
        </div>

        <div className="help__screens">
          <div className="help__subtitle">Surfaces</div>
          <div className="help__screenset">
            {SCREENS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  ui.setHelp(false);
                  ui.go(s.id);
                }}
              >
                <Icon name={s.icon} size={13} />
                <b>{s.label}</b>
                <span>{s.group}</span>
              </button>
            ))}
          </div>
        </div>

        <footer>
          <p>
            Mock transport is running: every number, log line, approval and agent state comes from the service layer in
            <code> src/services/mock</code>. Swap it for a real backend without touching a component.
          </p>
          <button type="button" className="btn btn--outline" onClick={() => ui.setHelp(false)}>
            Close
          </button>
        </footer>
      </div>
    </div>
  );
}
