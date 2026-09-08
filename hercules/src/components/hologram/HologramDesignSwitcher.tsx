/**
 * HERCULES · Hologram design switcher
 * A compact three-option picker for the orb design families (ULTRON / NEXUS /
 * AEGIS). Each option is a chip with the design's monogram, name and a swatch
 * of its accent — clicking it swaps the orb live via `appearance.hologramDesign`.
 */
import { HOLOGRAM_DESIGNS, HOLOGRAM_DESIGN_ORDER, type HologramDesignId } from '@/hologram/designs';

export interface HologramDesignSwitcherProps {
  value: HologramDesignId;
  onChange: (id: HologramDesignId) => void;
  /** Compact one-line row (used under the core stage). */
  compact?: boolean;
}

export function HologramDesignSwitcher({ value, onChange, compact = false }: HologramDesignSwitcherProps) {
  return (
    <div className={`holo-design-switcher${compact ? ' holo-design-switcher--compact' : ''}`} role="group" aria-label="Hologram design">
      {HOLOGRAM_DESIGN_ORDER.map((id) => {
        const d = HOLOGRAM_DESIGNS[id];
        const active = id === value;
        return (
          <button
            key={id}
            type="button"
            className={`holo-design-switcher__opt${active ? ' is-active' : ''}`}
            onClick={() => onChange(id)}
            title={d.blurb}
            aria-pressed={active}
            style={{ '--holo-accent': d.accentOverride } as React.CSSProperties}
          >
            <span className="holo-design-switcher__glyph" aria-hidden="true">
              {d.glyph}
            </span>
            <span className="holo-design-switcher__meta">
              <b>{d.name}</b>
              {!compact && <em>{d.tagline}</em>}
            </span>
          </button>
        );
      })}
    </div>
  );
}