/**
 * HERCULES · application shell
 * Global chrome: rail, top bar, screen outlet, inspector, overlays, toasts,
 * the floating mini-core (always-available), and the global keymap.
 */
import { useEffect } from 'react';
import { Sidebar } from '@/components/shell/Sidebar';
import { TopBar } from '@/components/shell/TopBar';
import { CommandBar } from '@/components/shell/CommandBar';
import { VoiceOverlay } from '@/components/shell/VoiceOverlay';
import { Inspector } from '@/components/shell/Inspector';
import { ToastStack } from '@/components/shell/ToastStack';
import { HelpOverlay } from '@/components/shell/HelpOverlay';
import { FloatingCore } from '@/components/shell/FloatingCore';
import { BootOverlay } from '@/components/shell/BootOverlay';
import { ScreenOutlet } from '@/app/router';
import { actions, store, ui, bootHercules } from '@/state/hercules';
import { SCREENS } from '@/state/nav';
import { cx } from '@/components/ui';

export function App() {
  const phase = store.use((s) => s.phase);
  const booted = store.use((s) => s.booted);
  const overlay = store.use((s) => s.modelOverlay);
  const screen = store.use((s) => s.screen);
  const bootDismissed = store.use((s) => s.bootDismissed);
  const cinematic = store.use((s) => s.config.boot.cinematicSequence);

  useEffect(() => {
    (window as unknown as { __herculesStart: number }).__herculesStart = Date.now();
    void bootHercules();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      const target = e.target as HTMLElement | null;
      const typing = !!target?.closest('input, textarea, [contenteditable="true"]');

      if (mod && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        ui.setCommandBar(!store.get().commandBarOpen);
        return;
      }
      if (mod && e.shiftKey && (e.code === 'Space' || e.key === ' ')) {
        e.preventDefault();
        void actions.toggleVoice();
        return;
      }
      if (mod && e.shiftKey && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        void actions.freezeEstate();
        return;
      }
      if (mod && e.shiftKey && e.key.toLowerCase() === 'm') {
        e.preventDefault();
        void actions.media('toggle');
        return;
      }
      if (mod && !e.shiftKey && e.key.toLowerCase() === 'i') {
        e.preventDefault();
        ui.setInspector(!store.get().inspectorOpen);
        return;
      }
      if (mod && e.key.toLowerCase() === 'j') {
        e.preventDefault();
        ui.go('terminal');
        return;
      }
      if (mod && /^[0-9]$/.test(e.key) && !typing) {
        const n = Number(e.key);
        const def = SCREENS.find((s) => s.hotkey === n);
        if (def) {
          e.preventDefault();
          ui.go(def.id);
        }
        return;
      }
      if (!mod && !typing && (e.key === '?' || (e.key === '/' && e.shiftKey))) {
        e.preventDefault();
        ui.setHelp(true);
        return;
      }
      if (e.key === 'Escape') {
        const s = store.get();
        if (s.commandBarOpen) ui.setCommandBar(false);
        else if (s.helpOpen) ui.setHelp(false);
        else if (s.voice.active) void actions.toggleVoice(false);
        else if (s.vitals.state === 'speaking') void actions.stopSpeaking();
        else if (s.inspectorOpen) ui.setInspector(false);
        else if (s.screen !== 'core') ui.go('core');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className={cx('shell', !booted && 'is-booting', `screen-${screen}`)}>
      <div className="shell__bg" aria-hidden>
        <div className="shell__grid" />
        <div className="shell__vignette" />
        <div className="shell__noise" />
        <div className="shell__scan" />
      </div>
      <Sidebar />
      <div className="shell__main">
        <TopBar />
        <main className="shell__content" id="hercules-content">
          <ScreenOutlet />
        </main>
      </div>
      <Inspector />
      <CommandBar />
      <VoiceOverlay />
      <HelpOverlay />
      <ToastStack />
      <FloatingCore />
      {overlay.on && (
        <div className="overlay-bar">
          <span className="overlay-bar__dot" />
          {overlay.label} · the estate is listening to the operator only
        </div>
      )}
      {(!booted || !bootDismissed) && (cinematic || !booted) && <BootOverlay onDone={() => ui.finishBoot()} />}
      {phase === 'cold' && !booted && <span className="sr-only">Booting HERCULES…</span>}
    </div>
  );
}
