/**
 * HERCULES · theme bridge
 * Applies the theme engine to the document from an AppConfig, and exposes a
 * tiny React hook for components that need palette values in canvas code
 * (the hologram renderer reads from here — one source of truth).
 */
import { useEffect, useState } from 'react';
import { applyTheme, THEMES } from './engine';
import type { AppConfig, ThemeConfig } from '@/types/domain';
import { mockServices } from '@/services/registry';

let current: ThemeConfig = mockSettingsTheme();

function mockSettingsTheme(): ThemeConfig {
  // Best-effort synchronous read; boot() re-applies authoritatively.
  try {
    const raw = localStorage.getItem('hercules.config.v1');
    if (raw) {
      const parsed = JSON.parse(raw) as { theme?: ThemeConfig };
      if (parsed.theme) return parsed.theme;
    }
  } catch {
    /* ignore */
  }
  return { themeId: 'obsidian-night', density: 'standard', intensity: 0.82, reduceMotion: false, allowGlowThroughCpu: true };
}

export function currentTheme(): ThemeConfig {
  return current;
}

export function currentPalette() {
  return (THEMES[current.themeId] ?? THEMES['obsidian-night']).palette;
}

export function applyThemeFromConfig(config: AppConfig) {
  current = config.theme;
  applyTheme(config.theme);
  window.dispatchEvent(new CustomEvent('hercules:theme', { detail: { theme: config.theme } }));
}

/** React subscription: re-renders consumers when the theme changes. */
export function useTheme() {
  const [theme, setTheme] = useState<ThemeConfig>(current);
  useEffect(() => {
    const on = (e: Event) => {
      const detail = (e as CustomEvent<{ theme: ThemeConfig }>).detail;
      if (detail?.theme) setTheme(detail.theme);
    };
    window.addEventListener('hercules:theme', on);
    return () => window.removeEventListener('hercules:theme', on);
  }, []);
  const palette = (THEMES[theme.themeId] ?? THEMES['obsidian-night']).palette;
  return { theme, palette, setTheme: (patch: Partial<ThemeConfig>) => void mockServices.settings.patch({ theme: { ...theme, ...patch } }).then((c) => applyThemeFromConfig(c)) };
}

/** Initialise from persisted config before first paint. */
export async function initTheme() {
  const config = await mockServices.settings.get().catch(() => null);
  if (config) applyThemeFromConfig(config);
  else applyTheme(current);
  return config;
}
