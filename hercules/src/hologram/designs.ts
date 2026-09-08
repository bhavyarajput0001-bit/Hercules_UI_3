/**
 * HERCULES · Hologram design families
 * ---------------------------------------------------------------------------
 * Three deliberately different hologram identities, all driven by the SAME
 * Three.js orb engine (`orb/orbScene.ts`) and the SAME MediaPipe gesture
 * tracker (`orb/handTracker.ts`). Each family is a *personality*: a palette
 * derived from the active Hercules theme accent, a motion signature, a
 * post-process grade, and a HUD/UI language.
 *
 * The switcher UI (`HologramDesignSwitcher`) lets the operator flip between
 * them live — the orb is torn down and re-instantiated with the new family's
 * scene options, so switching feels instant and stays theme-aware.
 *
 * ULTRON  — Iron-Man forge. Amber, dense, hot core, aggressive surge.
 * NEXUS   — Cold instrument panel. Cyan, precise, geometric, calm spin.
 * AEGIS   — Defensive sentinel lattice. Violet, crystalline, guarded arcs.
 */

export type HologramDesignId = 'ultron' | 'nexus' | 'aegis';

export interface HologramSceneOptions {
  /** Extra scale for the bloom pass (0..~3). */
  bloomStrength: number;
  /** Post-process chromatic aberration intensity. */
  aberration: number;
  /** Core glob surge strength (0 = calm, 1 = aggressive). */
  surge: number;
  /** Shell spin speeds — [outer, inner]. */
  spin: [number, number];
  /** How strongly orbiting debris drifts. */
  debrisDrift: number;
  /** Dust particle opacity. */
  dustOpacity: number;
  /** Inner core visible & bright. */
  coreBrightness: number;
  /** Structural identity variant: 'ultron' | 'nexus' | 'aegis'. */
  variant: 'ultron' | 'nexus' | 'aegis';
}

export interface HologramDesign {
  id: HologramDesignId;
  /** Short monogram shown in the switcher. */
  glyph: string;
  name: string;
  /** One-line operator-facing description. */
  blurb: string;
  /** HUD signature line + accent hue bias. */
  tagline: string;
  /** Scene personality passed into createOrbScene. */
  scene: HologramSceneOptions;
  /** Accent override: if set, forces the orb hue regardless of theme. */
  accentOverride?: string;
}

export const HOLOGRAM_DESIGNS: Record<HologramDesignId, HologramDesign> = {
  ultron: {
    id: 'ultron',
    glyph: 'U',
    name: 'ULTRON',
    blurb: 'Iron-Man forge. Hot amber core, dense lattice, aggressive presence.',
    tagline: 'FORGE · SURGE',
    scene: {
      bloomStrength: 2.0,
      aberration: 0.0035,
      surge: 1.0,
      spin: [1.0, 1.6],
      debrisDrift: 1.0,
      dustOpacity: 0.5,
      coreBrightness: 1.0,
      variant: 'ultron',
    },
    accentOverride: '#ffaa30',
  },
  nexus: {
    id: 'nexus',
    glyph: 'N',
    name: 'NEXUS',
    blurb: 'Cold instrument panel. Cyan precision, geometric calm, steady readout.',
    tagline: 'PANEL · PRECISE',
    scene: {
      bloomStrength: 1.4,
      aberration: 0.0015,
      surge: 0.35,
      spin: [1.3, 1.0],
      debrisDrift: 0.5,
      dustOpacity: 0.3,
      coreBrightness: 0.6,
      variant: 'nexus',
    },
    accentOverride: '#3fe0ff',
  },
  aegis: {
    id: 'aegis',
    glyph: 'A',
    name: 'AEGIS',
    blurb: 'Defensive sentinel lattice. Violet arcs, crystalline shell, guarded.',
    tagline: 'SENTINEL · ARCS',
    scene: {
      bloomStrength: 1.7,
      aberration: 0.0022,
      surge: 0.6,
      spin: [0.8, 1.3],
      debrisDrift: 0.7,
      dustOpacity: 0.42,
      coreBrightness: 0.8,
      variant: 'aegis',
    },
    accentOverride: '#a78bfa',
  },
};

/** Ordered list for the UI switcher. */
export const HOLOGRAM_DESIGN_ORDER: HologramDesignId[] = ['ultron', 'nexus', 'aegis'];

export function isHologramDesignId(v: unknown): v is HologramDesignId {
  return v === 'ultron' || v === 'nexus' || v === 'aegis';
}

/** Resolve a design id safely (falls back to ultron). */
export function getHologramDesign(id: unknown): HologramDesign {
  return HOLOGRAM_DESIGNS[isHologramDesignId(id) ? id : 'ultron'];
}