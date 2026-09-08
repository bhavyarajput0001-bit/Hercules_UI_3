/**
 * HERCULES · theme engine
 * ---------------------------------------------------------------------------
 * One source of truth for look & feel. Themes are *token sets* applied as CSS
 * custom properties on <html>; components never hardcode colours. Density,
 * motion intensity and a reduce-motion override are part of the same engine so
 * a theme switch is instant and persists.
 */
import type { DensityId, ThemeConfig, ThemeId } from '@/types/domain';

export interface ThemePalette {
  /** --c-bg … */
  bg: string;
  bgDeep: string;
  surface: string;
  surfaceRaised: string;
  surfaceSunken: string;
  line: string;
  lineStrong: string;
  text: string;
  textDim: string;
  textFaint: string;
  accent: string;
  accent2: string;
  accent3: string;
  success: string;
  warn: string;
  danger: string;
  info: string;
  /** Hologram-specific */
  corePrimary: string;
  coreSecondary: string;
  coreGlow: string;
  /** grid + vignette */
  gridColor: string;
  gridOpacity: number;
  vignette: string;
  noiseOpacity: number;
  scanline: boolean;
  dark: boolean;
}

export const THEMES: Record<ThemeId, { label: string; hint: string; palette: ThemePalette }> = {
  'obsidian-night': {
    label: 'Obsidian Night',
    hint: 'Default · deep black, single cyan signal',
    palette: {
      bg: '#05070b',
      bgDeep: '#010203',
      surface: 'rgba(12,17,25,0.72)',
      surfaceRaised: 'rgba(18,25,36,0.86)',
      surfaceSunken: 'rgba(6,9,14,0.6)',
      line: 'rgba(112,150,180,0.16)',
      lineStrong: 'rgba(120,190,225,0.34)',
      text: '#e6f1f8',
      textDim: 'rgba(206,224,236,0.66)',
      textFaint: 'rgba(180,200,216,0.4)',
      accent: '#3fe0ff',
      accent2: '#7d8cff',
      accent3: '#5ff0c0',
      success: '#5ff0c0',
      warn: '#ffc861',
      danger: '#ff5f6d',
      info: '#63b3ff',
      corePrimary: '#3fe0ff',
      coreSecondary: '#8a6bff',
      coreGlow: 'rgba(63,224,255,0.5)',
      gridColor: '#1d6b85',
      gridOpacity: 0.16,
      vignette: 'rgba(0,0,0,0.72)',
      noiseOpacity: 0.035,
      scanline: true,
      dark: true,
    },
  },
  'cyan-eclipse': {
    label: 'Cyan Eclipse',
    hint: 'Cold instrument panel, high contrast',
    palette: {
      bg: '#02090f',
      bgDeep: '#000407',
      surface: 'rgba(6,24,34,0.74)',
      surfaceRaised: 'rgba(9,32,45,0.88)',
      surfaceSunken: 'rgba(2,12,18,0.6)',
      line: 'rgba(60,190,220,0.2)',
      lineStrong: 'rgba(80,225,255,0.4)',
      text: '#e3f9ff',
      textDim: 'rgba(180,225,240,0.7)',
      textFaint: 'rgba(150,200,220,0.42)',
      accent: '#00e5ff',
      accent2: '#00ffc3',
      accent3: '#7ea6ff',
      success: '#00ffc3',
      warn: '#ffd166',
      danger: '#ff4d6d',
      info: '#5bc0ff',
      corePrimary: '#00e5ff',
      coreSecondary: '#00ffc3',
      coreGlow: 'rgba(0,229,255,0.55)',
      gridColor: '#0d5d75',
      gridOpacity: 0.24,
      vignette: 'rgba(0,4,8,0.7)',
      noiseOpacity: 0.03,
      scanline: true,
      dark: true,
    },
  },
  'amber-forge': {
    label: 'Amber Forge',
    hint: 'Warm engineering console, brass and heat',
    palette: {
      bg: '#0a0704',
      bgDeep: '#040201',
      surface: 'rgba(26,17,8,0.74)',
      surfaceRaised: 'rgba(36,23,11,0.88)',
      surfaceSunken: 'rgba(14,9,4,0.6)',
      line: 'rgba(220,150,70,0.2)',
      lineStrong: 'rgba(255,180,90,0.38)',
      text: '#fdeee0',
      textDim: 'rgba(235,200,170,0.7)',
      textFaint: 'rgba(210,175,145,0.42)',
      accent: '#ffb347',
      accent2: '#ff7a45',
      accent3: '#ffe08a',
      success: '#b8e986',
      warn: '#ffd166',
      danger: '#ff6b5e',
      info: '#ffb347',
      corePrimary: '#ffb347',
      coreSecondary: '#ff5f3c',
      coreGlow: 'rgba(255,179,71,0.5)',
      gridColor: '#7a4a12',
      gridOpacity: 0.18,
      vignette: 'rgba(8,3,0,0.72)',
      noiseOpacity: 0.05,
      scanline: true,
      dark: true,
    },
  },
  'solar-flare': {
    label: 'Solar Flare',
    hint: 'Magenta plasma · presentation mode',
    palette: {
      bg: '#0b0410',
      bgDeep: '#05010a',
      surface: 'rgba(26,10,34,0.74)',
      surfaceRaised: 'rgba(36,14,46,0.88)',
      surfaceSunken: 'rgba(14,5,20,0.6)',
      line: 'rgba(240,120,220,0.2)',
      lineStrong: 'rgba(255,140,230,0.4)',
      text: '#fdeafc',
      textDim: 'rgba(235,190,235,0.7)',
      textFaint: 'rgba(210,165,215,0.42)',
      accent: '#ff5fd2',
      accent2: '#8a5cff',
      accent3: '#ffd166',
      success: '#5ff0c0',
      warn: '#ffd166',
      danger: '#ff4d6d',
      info: '#c08cff',
      corePrimary: '#ff5fd2',
      coreSecondary: '#8a5cff',
      coreGlow: 'rgba(255,95,210,0.5)',
      gridColor: '#6b1c5e',
      gridOpacity: 0.2,
      vignette: 'rgba(6,0,10,0.72)',
      noiseOpacity: 0.04,
      scanline: true,
      dark: true,
    },
  },
  'graphite-steel': {
    label: 'Graphite Steel',
    hint: 'Neutral workstation · long sessions',
    palette: {
      bg: '#0b0d10',
      bgDeep: '#050607',
      surface: 'rgba(20,23,27,0.78)',
      surfaceRaised: 'rgba(28,32,37,0.9)',
      surfaceSunken: 'rgba(12,14,16,0.6)',
      line: 'rgba(160,175,190,0.16)',
      lineStrong: 'rgba(180,200,215,0.32)',
      text: '#e9edf1',
      textDim: 'rgba(200,209,218,0.68)',
      textFaint: 'rgba(180,190,200,0.4)',
      accent: '#8fb6c9',
      accent2: '#a5b4ff',
      accent3: '#8ad9b6',
      success: '#7fd6ac',
      warn: '#e0c07a',
      danger: '#e08a92',
      info: '#8fb6c9',
      corePrimary: '#c6dbe6',
      coreSecondary: '#8fa4ff',
      coreGlow: 'rgba(180,205,220,0.4)',
      gridColor: '#3a444e',
      gridOpacity: 0.14,
      vignette: 'rgba(2,3,4,0.7)',
      noiseOpacity: 0.02,
      scanline: false,
      dark: true,
    },
  },
  'paper-daylight': {
    label: 'Paper Daylight',
    hint: 'Light mode for bright rooms & screen shares',
    palette: {
      bg: '#f2f1ec',
      bgDeep: '#e6e5df',
      surface: 'rgba(255,255,255,0.78)',
      surfaceRaised: 'rgba(255,255,255,0.94)',
      surfaceSunken: 'rgba(232,231,225,0.7)',
      line: 'rgba(20,40,60,0.14)',
      lineStrong: 'rgba(15,70,95,0.3)',
      text: '#0d1620',
      textDim: 'rgba(16,32,48,0.68)',
      textFaint: 'rgba(20,40,60,0.45)',
      accent: '#00697d',
      accent2: '#3f4bab',
      accent3: '#0d7f5f',
      success: '#0d7f5f',
      warn: '#9a6400',
      danger: '#a8202f',
      info: '#00628f',
      corePrimary: '#0f7f99',
      coreSecondary: '#6b4fd8',
      coreGlow: 'rgba(15,127,153,0.28)',
      gridColor: '#8fa3ae',
      gridOpacity: 0.14,
      vignette: 'rgba(120,130,140,0.14)',
      noiseOpacity: 0.02,
      scanline: false,
      dark: false,
    },
  },
};

export const DENSITY: Record<DensityId, { scale: number; radius: number; pad: number; rowH: number }> = {
  comfortable: { scale: 1.06, radius: 14, pad: 18, rowH: 40 },
  standard: { scale: 1, radius: 11, pad: 14, rowH: 34 },
  compact: { scale: 0.94, radius: 8, pad: 10, rowH: 27 },
};

const hexToRgb = (hex: string) => {
  const h = hex.replace('#', '');
  const v = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(v, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255] as const;
};

export const withAlpha = (hex: string, a: number) => {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r},${g},${b},${a})`;
};

export function applyTheme(config: ThemeConfig) {
  const root = document.documentElement;
  const theme = THEMES[config.themeId] ?? THEMES['obsidian-night'];
  const p = theme.palette;
  const d = DENSITY[config.density] ?? DENSITY.standard;
  const i = Math.max(0, Math.min(1, config.intensity));

  root.dataset.theme = config.themeId;
  root.dataset.density = config.density;
  root.dataset.mode = p.dark ? 'dark' : 'light';
  root.dataset.reduceMotion = config.reduceMotion ? 'true' : 'false';

  const set = (k: string, v: string) => root.style.setProperty(k, v);
  set('--bg', p.bg);
  set('--bg-deep', p.bgDeep);
  set('--surface', p.surface);
  set('--surface-raised', p.surfaceRaised);
  set('--surface-sunken', p.surfaceSunken);
  set('--line', p.line);
  set('--line-strong', p.lineStrong);
  set('--text', p.text);
  set('--text-dim', p.textDim);
  set('--text-faint', p.textFaint);
  set('--accent', p.accent);
  set('--accent-2', p.accent2);
  set('--accent-3', p.accent3);
  set('--success', p.success);
  set('--warn', p.warn);
  set('--danger', p.danger);
  set('--info', p.info);
  set('--core-primary', p.corePrimary);
  set('--core-secondary', p.coreSecondary);
  set('--core-glow', p.coreGlow);
  set('--grid-color', p.gridColor);
  set('--grid-opacity', String(p.gridOpacity * i));
  set('--vignette', p.vignette);
  set('--noise-opacity', String(p.noiseOpacity * i));
  set('--scanline', p.scanline && i > 0.3 ? '1' : '0');
  set('--glow-scale', String(config.reduceMotion ? i * 0.4 : i));
  set('--blur', p.dark ? '18px' : '10px');
  set('--r', `${d.radius}px`);
  set('--pad', `${d.pad}px`);
  set('--row-h', `${d.rowH}px`);
  set('--fs', `${d.scale}`);
  root.style.colorScheme = p.dark ? 'dark' : 'light';
  return theme;
}

export const themeList = (Object.keys(THEMES) as ThemeId[]).map((id) => ({
  id,
  label: THEMES[id]!.label,
  hint: THEMES[id]!.hint,
  swatch: [THEMES[id]!.palette.accent, THEMES[id]!.palette.accent2, THEMES[id]!.palette.accent3],
}));
