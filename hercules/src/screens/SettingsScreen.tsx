/**
 * HERCULES · Settings
 * Not a preferences form: this is the console for the whole machine. Every
 * control writes through the settings service (persisted, validated, secret-
 * scrubbed) and most take effect live — no restart, no reload, no dev tools.
 */
import { useMemo, useRef, useState } from 'react';
import { Icon } from '@/components/Icon';
import { Button, Chip,  SectionLabel, Select, Slider, TextInput, Toggle, cx } from '@/components/ui';
import { Sparkline } from '@/components/ui';
import { THEMES } from '@/theme/engine';
import { useTheme } from '@/theme/bridge';
import { HologramDesignSwitcher } from '@/components/hologram/HologramDesignSwitcher';
import { actions, store, toast, ui } from '@/state/hercules';
import { useAsync } from '@/hooks/useAsync';
import { relativeTime } from '@/services/mock/helpers';
import type { AppConfig, DensityId, PersonalityPresetId, ThemeId } from '@/types/domain';

const SECTIONS = [
  { id: 'appearance', label: 'Appearance', icon: 'spark' },
  { id: 'persona', label: 'Persona', icon: 'agent' },
  { id: 'voice', label: 'Voice', icon: 'mic' },
  { id: 'models', label: 'Model routing', icon: 'route' },
  { id: 'brain', label: 'Brain', icon: 'cpu' },
  { id: 'privacy', label: 'Privacy & trust', icon: 'shield' },
  { id: 'notifications', label: 'Notifications', icon: 'bell' },
  { id: 'system', label: 'System & boot', icon: 'system' },
  { id: 'developer', label: 'Developer', icon: 'terminal' },
] as const;

type SectionId = (typeof SECTIONS)[number]['id'];

const PRESETS: { id: PersonalityPresetId; label: string; blurb: string; persona: Partial<AppConfig['ai']['persona']> }[] = [
  { id: 'chief-of-staff', label: 'Chief of staff', blurb: 'Opinionated, terse, pushes back, runs the estate without drama.', persona: { initiative: 0.78, verbosity: 0.34, wit: 0.42, caution: 0.66, formality: 'terse' } },
  { id: 'sentinel', label: 'Sentinel', blurb: 'Guard first. Reports anomalies before opportunities.', persona: { initiative: 0.5, verbosity: 0.4, wit: 0.1, caution: 0.95, formality: 'balanced' } },
  { id: 'analyst', label: 'Analyst', blurb: 'Slow to conclude, impossible to catch guessing.', persona: { initiative: 0.35, verbosity: 0.62, wit: 0.12, caution: 0.8, formality: 'formal' } },
  { id: 'engineer', label: 'Engineer', blurb: 'Ships patches, not paragraphs.', persona: { initiative: 0.85, verbosity: 0.22, wit: 0.3, caution: 0.5, formality: 'terse' } },
  { id: 'companion', label: 'Companion', blurb: 'Warmer, chattier, still bounded by the same gates.', persona: { initiative: 0.6, verbosity: 0.8, wit: 0.75, caution: 0.45, formality: 'balanced' } },
];

export default function SettingsScreen() {
  const config = store.use((s) => s.config);
  const rev = store.use((s) => s.rev);
  const services = store.get().services;
  const [section, setSection] = useState<SectionId>('appearance');
  const voiceCfg = useAsync(() => services.voice.config(), [rev.settings]);
  const caps = useAsync(() => services.voice.capabilities(), []);
  const profiles = useAsync(() => services.voice.profiles(), []);
  const models = useAsync(() => services.ai.models(), []);
  const { theme } = useTheme();
  const dirty = store.use((s) => !!s.busy['settings.patch']);

  const patch = (p: Partial<AppConfig>, label?: string) => void actions.patchSettings(p, label);

  return (
    <div className="screen settings-screen">
      <aside className="set-nav">
        <div className="set-nav__head">
          <Icon name="settings" size={13} />
          <b>Settings</b>
          {dirty && <span className="set-nav__saving" title="writing" />}
        </div>
        {SECTIONS.map((s) => (
          <button key={s.id} type="button" className={cx('set-nav__item', section === s.id && 'is-on')} onClick={() => setSection(s.id)}>
            <Icon name={s.icon} size={12} />
            {s.label}
          </button>
        ))}
        <div className="set-nav__foot">
          <span className="mono dim">saved to disk as <b>hercules.config.v1</b></span>
          <span className="mono dim">schema v{config.schemaVersion} · {config.developer.transport}</span>
        </div>
      </aside>

      <div className="set-body">
        {section === 'appearance' && <Appearance config={config} patch={patch} themeId={theme.themeId} />}
        {section === 'persona' && <PersonaPanel config={config} patch={patch} />}
        {section === 'voice' && <VoicePanel config={config} patch={patch} caps={caps.data} profiles={profiles.data ?? []} loaded={!!voiceCfg.data} />}
        {section === 'models' && <ModelsPanel config={config} patch={patch} models={models.data ?? []} />}
        {section === 'brain' && <BrainPanel />}
        {section === 'privacy' && <PrivacyPanel config={config} patch={patch} />}
        {section === 'notifications' && <NotificationsPanel config={config} patch={patch} />}
        {section === 'system' && <SystemPanel config={config} patch={patch} />}
        {section === 'developer' && <DeveloperPanel config={config} patch={patch} />}
      </div>
    </div>
  );
}

/* ── sections ────────────────────────────────────────────────────────────── */

function Panel({ title, sub, children, aside }: { title: string; sub: string; children: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <section className="hud__panel set-panel">
      <header className="hud__panel-head">
        <div className="hud__panel-title">
          <div>
            <h3>{title}</h3>
            <p className="hud__panel-sub">{sub}</p>
          </div>
        </div>
        {aside}
      </header>
      <div className="hud__panel-body">{children}</div>
    </section>
  );
}

function Appearance({ config, patch, themeId }: { config: AppConfig; patch: (p: Partial<AppConfig>, label?: string) => void; themeId: ThemeId }) {
  const ids = Object.keys(THEMES) as ThemeId[];
  return (
    <>
      <Panel
        title="Identity"
        sub="Palette, not decoration — the core, the rails and every chart follow this."
        aside={<Chip size="sm" tone="dim" icon="spark">{themeId}</Chip>}
      >
        <div className="theme-grid">
          {ids.map((id) => {
            const t = THEMES[id];
            return (
              <button
                key={id}
                type="button"
                className={cx('theme-card', config.theme.themeId === id && 'is-on')}
                onClick={() => patch({ theme: { ...config.theme, themeId: id } }, `${t.label} applied`)}
                style={{ ['--swatch' as string]: t.palette.accent, ['--bg' as string]: t.palette.bg }}
              >
                <span className="theme-card__strip">
                  <i style={{ background: t.palette.accent }} />
                  <i style={{ background: t.palette.accent2 }} />
                  <i style={{ background: t.palette.corePrimary }} />
                </span>
                <b>{t.label}</b>
                <span className="dim">{t.hint}</span>
                <span className="theme-card__preview">
                  <span className="theme-card__orb" />
                  <span className="theme-card__bar" style={{ width: '70%' }} />
                  <span className="theme-card__bar" style={{ width: '45%' }} />
                </span>
              </button>
            );
          })}
        </div>
      </Panel>

      <Panel title="Layout & motion" sub="Density and intensity are global; the workstation should be adjustable without being fussy.">
        <div className="set-row">
          <div><b>Density</b><span className="dim">Row height, padding and type scale, applied through CSS variables.</span></div>
          <div className="segmented">
            {(['comfortable', 'standard', 'compact'] as DensityId[]).map((d) => (
              <button key={d} type="button" className={cx('segmented__item', config.theme.density === d && 'is-active')} onClick={() => patch({ theme: { ...config.theme, density: d } }, `${d} density`)}>{d}</button>
            ))}
          </div>
        </div>
        <Slider
          label="Holographic intensity"
          value={config.theme.intensity}
          min={0}
          max={1}
          step={0.01}
          format={(v) => `${Math.round(v * 100)}%`}
          onCommit={(v) => patch({ theme: { ...config.theme, intensity: v } })}
        />
        <div className="set-row">
          <div><b>Reduce motion</b><span className="dim">Cuts orbit animation, scanlines and streaming flicker. Audio and data keep flowing.</span></div>
          <Toggle checked={config.theme.reduceMotion} onChange={(v) => patch({ theme: { ...config.theme, reduceMotion: v } }, v ? 'Motion reduced' : 'Motion restored')} />
        </div>
        <div className="set-row">
          <div><b>Let the core glow when the CPU is hot</b><span className="dim">Off means the hologram stops animating above ~80% load and shows a static frame.</span></div>
          <Toggle checked={config.theme.allowGlowThroughCpu} onChange={(v) => patch({ theme: { ...config.theme, allowGlowThroughCpu: v } })} />
        </div>
      </Panel>

      <Panel
        title="Hologram & surfaces"
        sub="Pick the core’s renderer and how much frosted glass the estate wears. Changes apply live and persist."
        aside={<Chip size="sm" tone="accent" icon="layers">{config.appearance.hologram}</Chip>}
      >
        <div className="set-row">
          <div><b>Core renderer</b><span className="dim">Orb is a volumetric 3D core (drag/scroll/gesture). Core is the fast 2D canvas engine.</span></div>
          <div className="segmented">
            {(['core', 'orb'] as const).map((h) => (
              <button key={h} type="button" className={cx('segmented__item', config.appearance.hologram === h && 'is-active')} onClick={() => patch({ appearance: { ...config.appearance, hologram: h } }, `${h} hologram`)}>{h}</button>
            ))}
          </div>
        </div>
        {config.appearance.hologram === 'orb' && (
          <div className="set-row">
            <div><b>Orb design</b><span className="dim">ULTRON is the Iron-Man forge. NEXUS is the cold instrument panel. AEGIS is the violet sentinel lattice.</span></div>
            <HologramDesignSwitcher
              value={config.appearance.hologramDesign ?? 'ultron'}
              onChange={(id) => patch({ appearance: { ...config.appearance, hologramDesign: id } }, `design → ${id}`)}
            />
          </div>
        )}
        <div className="set-row">
          <div><b>Glass treatment</b><span className="dim">Frosted adds backdrop blur + luminance to panels; soft is light; off is flat.</span></div>
          <div className="segmented">
            {([['soft', 'Soft'], ['frosted', 'Frosted'], ['off', 'Off']] as const).map(([v, label]) => (
              <button key={v} type="button" className={cx('segmented__item', config.appearance.glass === v && 'is-active')} onClick={() => patch({ appearance: { ...config.appearance, glass: v } }, `${label} glass`)}>{label}</button>
            ))}
          </div>
        </div>
        <div className="set-row">
          <div><b>Cinemascope</b><span className="dim">Full-bleed cinematic presentation on the core screen — the side rail steps back.</span></div>
          <Toggle checked={config.appearance.cinemascope} onChange={(v) => patch({ appearance: { ...config.appearance, cinemascope: v } }, v ? 'Cinemascope on' : 'Cinemascope off')} />
        </div>
        <div className="set-row">
          <div><b>Pinch gestures</b><span className="dim">Camera pinch to spin / zoom the orb. Button hands you control; it only grabs the camera when on.</span></div>
          <Toggle checked={config.appearance.gesturesEnabled} onChange={(v) => patch({ appearance: { ...config.appearance, gesturesEnabled: v } }, v ? 'Gestures on' : 'Gestures off')} />
        </div>
        <div className="set-row">
          <div><b>Auto-start camera</b><span className="dim">Grab the camera immediately on boot so gestures are ready the moment you are.</span></div>
          <Toggle checked={config.appearance.gesturesAutostart} onChange={(v) => patch({ appearance: { ...config.appearance, gesturesAutostart: v } }, v ? 'Camera autostart on' : 'Camera autostart off')} />
        </div>
      </Panel>
    </>
  );
}

function PersonaPanel({ config, patch }: { config: AppConfig; patch: (p: Partial<AppConfig>, label?: string) => void }) {
  const p = config.ai.persona;
  const set = (patch2: Partial<AppConfig['ai']['persona']>) => patch({ ai: { ...config.ai, persona: { ...p, ...patch2 } } });
  return (
    <>
      <Panel title="Who you are talking to" sub="A name, a register, and four dials. It changes tone and initiative — never the gates.">
        <div className="g2">
          <div className="field">
            <div className="field__head"><label>Name</label></div>
            <TextInput value={p.name} onChange={(v) => set({ name: v })} />
          </div>
          <div className="field">
            <div className="field__head"><label>Callsign</label></div>
            <TextInput value={p.callsign} onChange={(v) => set({ callsign: v })} mono />
          </div>
        </div>
        <div className="preset-row">
          {PRESETS.map((preset) => (
            <button key={preset.id} type="button" className={cx('preset', p.preset === preset.id && 'is-on')} onClick={() => set({ ...preset.persona, preset: preset.id })}>
              <b>{preset.label}</b>
              <span className="dim">{preset.blurb}</span>
            </button>
          ))}
        </div>
        <div className="dials">
          {([
            ['initiative', 'Initiative', 'How much I start without being asked.'],
            ['verbosity', 'Verbosity', 'Length of the answer, not depth of the work.'],
            ['wit', 'Wit', 'A little personality, never at the cost of clarity.'],
            ['caution', 'Caution', 'How often I double-check before acting.'],
          ] as const).map(([key, label, hint]) => (
            <Slider key={key} label={label} hint={hint} value={p[key]} min={0} max={1} step={0.01} format={(v) => `${Math.round(v * 100)}`} onCommit={(v) => set({ [key]: v } as Partial<AppConfig['ai']['persona']>)} />
          ))}
        </div>
        <div className="set-row">
          <div><b>Formality</b><span className="dim">Terse reads like a colleague; formal reads like a briefing note.</span></div>
          <div className="segmented">
            {(['terse', 'balanced', 'formal'] as const).map((f) => (
              <button key={f} type="button" className={cx('segmented__item', p.formality === f && 'is-active')} onClick={() => set({ formality: f })}>{f}</button>
            ))}
          </div>
        </div>
        <div className="set-row">
          <div><b>Core hue</b><span className="dim">Drives the hologram only. {p.avatarHue}°</span></div>
          <input className="range" type="range" min={0} max={360} value={p.avatarHue} onChange={(e) => set({ avatarHue: Number(e.target.value) })} />
        </div>
        <div className="set-row">
          <div><b>Test the voice</b><span className="dim">Sends one line through the real pipeline so you hear the result, not a preview.</span></div>
          <Button size="sm" icon="play" onClick={() => void actions.sendPrompt(`Say one line in your current register to confirm this persona sounds right.`)}>Talk to me</Button>
        </div>
      </Panel>
    </>
  );
}

function VoicePanel({ config, patch, caps, profiles, loaded }: { config: AppConfig; patch: (p: Partial<AppConfig>, label?: string) => void; caps: { stt: boolean; tts: boolean; wakeWord: boolean } | null; profiles: { id: string; name: string; engine: string; privacyNote: string; latencyMs: number }[]; loaded: boolean }) {
  const services = store.get().services;
  const v = config.voice;
  const set = (p2: Partial<AppConfig['voice']>) => patch({ voice: { ...v, ...p2 } });
  return (
    <>
      <Panel
        title="Wake & input"
        sub="Speech recognition runs where you tell it to. The badge shows what this machine actually supports."
        aside={<Chip size="sm" tone={caps?.stt ? 'success' : 'warn'} icon={caps?.stt ? 'check' : 'alert'}>{caps?.stt ? 'native STT available' : 'simulated (no OS speech API)'}</Chip>}
      >
        {!loaded && <div className="dim" style={{ fontSize: 11 }}>reading voice config…</div>}
        <div className="set-row">
          <div><b>Wake word</b><span className="dim">{caps?.wakeWord ? 'Keyword spotting runs locally and never leaves the device.' : 'Not available on this platform — use the push-to-talk key instead.'}</span></div>
          <div className="cluster">
            <TextInput value={v.wakeWord} onChange={(x) => set({ wakeWord: x })} mono />
            <Toggle checked={v.alwaysAvailable} onChange={(x) => set({ alwaysAvailable: x })} label="always on" />
          </div>
        </div>
        <div className="set-row">
          <div><b>Push-to-talk</b><span className="dim">Hold to talk, release to send. Works everywhere.</span></div>
          <TextInput value={v.pushToTalkKey} onChange={(x) => set({ pushToTalkKey: x })} mono />
        </div>
        <div className="set-row">
          <div><b>Transcription engine</b><span className="dim">Local keeps audio on-device; cloud is faster on long form but sends it out.</span></div>
          <div className="segmented">
            {(['local', 'cloud'] as const).map((e) => (
              <button key={e} type="button" className={cx('segmented__item', v.sttEngine === e && 'is-active')} onClick={() => set({ sttEngine: e })}>{e}</button>
            ))}
          </div>
        </div>
        <div className="set-row">
          <div><b>Barge-in</b><span className="dim">Interrupting me mid-sentence stops playback instantly.</span></div>
          <Toggle checked={v.bargeIn} onChange={(x) => set({ bargeIn: x })} />
        </div>
        <div className="set-row">
          <div><b>Duck media while I speak</b><span className="dim">Playback drops to 18% instead of pausing.</span></div>
          <Toggle checked={v.duckMedia} onChange={(x) => set({ duckMedia: x })} />
        </div>
      </Panel>

      <Panel title="Voice output" sub="Profiles are ranked by latency. Cloud voices are better; local voices are private.">
        <div className="voice-grid">
          {profiles.map((pr) => (
            <button key={pr.id} type="button" className={cx('voicecard', v.ttsProfileId === pr.id && 'is-on')} onClick={() => { set({ ttsProfileId: pr.id }); void services.voice.configure({ ttsProfileId: pr.id }); }}>
              <b>{pr.name}</b>
              <span className="mono dim">{pr.engine} · {pr.latencyMs}ms</span>
              <span className="dim">{pr.privacyNote}</span>
            </button>
          ))}
        </div>
        <div className="set-row">
          <div><b>Speak what I hear</b><span className="dim">Test through the real engine — the same path a voice session uses.</span></div>
          <Button size="sm" icon="mic" onClick={() => void actions.speak('Holographic core online. Sixteen agents on shift, nothing at the gate.')}>Say it</Button>
        </div>
        <div className="set-row">
          <div><b>Languages</b><span className="dim">{v.languages.join(', ')}</span></div>
          <Button size="sm" onClick={() => patch({ voice: { ...v, languages: [...new Set([...v.languages, 'pa-Guru'])] } }, 'Punjabi added')}>+ pa-Guru</Button>
        </div>
      </Panel>
    </>
  );
}

function ModelsPanel({ config, patch, models }: { config: AppConfig; patch: (p: Partial<AppConfig>, label?: string) => void; models: import('@/types/domain').ModelInfo[] }) {
  const r = config.ai.router;
  const set = (p2: Partial<AppConfig['ai']['router']>) => patch({ ai: { ...config.ai, router: { ...r, ...p2 } } });
  const spendSeries = useMemo(() => models.slice(0, 8).map((m) => Math.round((m.costPer1kIn + m.costPer1kOut) * 40)), [models]);
  return (
    <>
      <Panel
        title="Router policy"
        sub="One policy decides which model answers what. Agents do not pick models; the router does."
        aside={<Chip size="sm" tone="accent" icon="route">{r.mode}</Chip>}
      >
        <div className="mode-grid">
          {([
            ['auto', 'Auto', 'Rank by quality per dollar against the task, then respect the privacy floor.'],
            ['cost', 'Cheapest', 'Smallest model that can plausibly do it. Slowest to impress, fastest to save.'],
            ['speed', 'Fastest', 'Lowest latency wins. Costs more, reads better in a live conversation.'],
            ['quality', 'Best', 'Frontier model for everything. Spend is your problem, not the router’s.'],
            ['privacy', 'Private', 'Local only. If it cannot be done on-device, it does not get done.'],
            ['fixed', 'Fixed', 'One model, no routing. Useful for reproducing a bug.'],
          ] as const).map(([mode, label, blurb]) => (
            <button key={mode} type="button" className={cx('modecell', r.mode === mode && 'is-on')} onClick={() => { patch({ ai: { ...config.ai, router: { ...r, mode } } }, `Router → ${label}`); }}>
              <b>{label}</b>
              <span className="dim">{blurb}</span>
            </button>
          ))}
        </div>
        <div className="set-row">
          <div><b>Fixed model</b><span className="dim">Only used when mode is “fixed”.</span></div>
          <Select value={r.fixedModelId ?? ''} onChange={(x) => set({ fixedModelId: x || null })} options={[{ value: '', label: '— none —' }, ...models.map((m) => ({ value: m.id, label: `${m.name} · ${m.providerLabel}` }))]} />
        </div>
        <div className="set-row">
          <div><b>Prefer local</b><span className="dim">Whenever a local model clears the quality bar, it wins the tie.</span></div>
          <Toggle checked={r.preferLocal} onChange={(x) => set({ preferLocal: x })} />
        </div>
        <div className="set-row">
          <div><b>Redact before send</b><span className="dim">PII is masked at the boundary, not in the prompt template.</span></div>
          <Toggle checked={r.redactBeforeSend} onChange={(x) => set({ redactBeforeSend: x })} />
        </div>
        <div className="set-row">
          <div><b>Context budget</b><span className="dim">Tokens a single turn may consume across all agents.</span></div>
          <span className="cluster">
            <input className="range" type="range" min={8_000} max={400_000} step={4_000} value={config.ai.contextWindowBudget} onChange={(e) => patch({ ai: { ...config.ai, contextWindowBudget: Number(e.target.value) } })} />
            <span className="mono">{Math.round(config.ai.contextWindowBudget / 1000)}k</span>
          </span>
        </div>
        <div className="set-row">
          <div><b>Reasoning depth</b><span className="dim">How long I think before I act.</span></div>
          <div className="segmented">
            {(['fast', 'balanced', 'deep'] as const).map((d) => (
              <button key={d} type="button" className={cx('segmented__item', config.ai.reasoningDepth === d && 'is-active')} onClick={() => patch({ ai: { ...config.ai, reasoningDepth: d } }, `Reasoning → ${d}`)}>{d}</button>
            ))}
          </div>
        </div>
        <SectionLabel right={<span className="mono dim">fallback chain</span>}>Chain</SectionLabel>
        <div className="chain">
          {r.fallbackChain.map((id, i) => {
            const m = models.find((x) => x.id === id);
            return (
              <span key={id} className="chain__item">
                <em className="mono">{i + 1}</em>
                {m?.name ?? id}
                <i className="chain__sep">→</i>
              </span>
            );
          })}
        </div>
        <SectionLabel right={<span className="mono dim">${r.maxMonthlySpendUsd}/mo</span>}>Spend ceiling</SectionLabel>
        <input className="range" type="range" min={20} max={2000} step={20} value={r.maxMonthlySpendUsd} onChange={(e) => set({ maxMonthlySpendUsd: Number(e.target.value) })} />
        <Sparkline values={spendSeries} height={30} tone="var(--warn)" />
        <p className="dim" style={{ fontSize: 11 }}>Above the ceiling, work queues and I tell you rather than quietly overspending. Relative to {relativeTime(new Date().toISOString())} today.</p>
      </Panel>
    </>
  );
}

function PrivacyPanel({ config, patch }: { config: AppConfig; patch: (p: Partial<AppConfig>, label?: string) => void }) {
  const p = config.privacy;
  const set = (p2: Partial<AppConfig['privacy']>) => patch({ privacy: { ...p, ...p2 } });
  return (
    <>
      <Panel title="What leaves this machine" sub="The honest version. Turning these off changes what I am able to do, and I will say so." aside={<Button size="sm" icon="shield" onClick={() => ui.go('permissions')}>Scopes & gates</Button>}>
        <div className="set-row">
          <div><b>Local-first</b><span className="dim">Prefer on-device models and tools; cloud use becomes the exception that needs a reason.</span></div>
          <Toggle checked={p.localFirst} onChange={(x) => set({ localFirst: x })} />
        </div>
        <div className="set-row">
          <div><b>On-device transcription</b><span className="dim">Ambient audio never becomes a network request.</span></div>
          <Toggle checked={p.onDeviceTranscription} onChange={(x) => set({ onDeviceTranscription: x })} />
        </div>
        <div className="set-row">
          <div><b>Redact PII before any send</b><span className="dim">Names, addresses, account numbers masked at the boundary.</span></div>
          <Toggle checked={p.redactPII} onChange={(x) => set({ redactPII: x })} />
        </div>
        <div className="set-row">
          <div><b>Screen awareness</b><span className="dim">Lets me read the focused window for context. Off means I only ever see what you type or attach.</span></div>
          <Toggle checked={p.screenAwareness} onChange={(x) => set({ screenAwareness: x })} />
        </div>
        <div className="set-row">
          <div><b>Clipboard access</b><span className="dim">Ask each time keeps paste-once semantics; full is only reasonable on a machine you trust completely.</span></div>
          <div className="segmented">
            {(['full', 'ask', 'restricted'] as const).map((m) => (
              <button key={m} type="button" className={cx('segmented__item', `is-${m}`, p.clipboardAccess === m && 'is-active')} onClick={() => set({ clipboardAccess: m })}>{m}</button>
            ))}
          </div>
        </div>
        <div className="set-row">
          <div><b>Telemetry</b><span className="dim">There is no analytics pipeline in this build. This control exists so the day there is one, it is already yours.</span></div>
          <div className="segmented">
            {(['off', 'anonymous', 'full'] as const).map((m) => (
              <button key={m} type="button" className={cx('segmented__item', p.telemetry === m && 'is-active')} onClick={() => set({ telemetry: m })}>{m}</button>
            ))}
          </div>
        </div>
        <div className="set-row">
          <div><b>Retention</b><span className="dim">Activity, transcripts and logs older than this are purged by a nightly job.</span></div>
          <span className="cluster">
            <input className="range" type="range" min={7} max={730} step={1} value={p.retentionDays} onChange={(e) => set({ retentionDays: Number(e.target.value) })} />
            <span className="mono">{p.retentionDays}d</span>
          </span>
        </div>
        <SectionLabel>Always ask me before…</SectionLabel>
        <div className="gate-grid">
          {(['low', 'medium', 'high', 'critical'] as const).map((r) => (
            <button key={r} type="button" className={cx('gatecell', p.requireApprovalFor.includes(r) && 'is-on')} onClick={() => set({ requireApprovalFor: p.requireApprovalFor.includes(r) ? p.requireApprovalFor.filter((x) => x !== r) : [...p.requireApprovalFor, r] })}>
              <Icon name={p.requireApprovalFor.includes(r) ? 'check' : 'lock'} size={11} />
              <b>{r} risk</b>
              <span className="dim">{r === 'low' ? 'reads, drafts, indexing' : r === 'medium' ? 'writes, tool calls, spend' : r === 'high' ? 'outbound, deletions, deploys' : 'anything irreversible or public'}</span>
            </button>
          ))}
        </div>
      </Panel>
    </>
  );
}

function NotificationsPanel({ config, patch }: { config: AppConfig; patch: (p: Partial<AppConfig>, label?: string) => void }) {
  const n = config.notifications;
  const set = (p2: Partial<AppConfig['notifications']>) => patch({ notifications: { ...n, ...p2 } });
  return (
    <Panel title="Interruption design" sub="I would rather batch than bug you — except where a gate is involved.">
      <div className="set-row">
        <div><b>Channel</b><span className="dim">in-app only means nothing reaches the OS notification centre.</span></div>
        <div className="segmented">
          {(['os', 'in-app', 'both'] as const).map((c) => (
            <button key={c} type="button" className={cx('segmented__item', n.channel === c && 'is-active')} onClick={() => set({ channel: c })}>{c}</button>
          ))}
        </div>
      </div>
      <div className="set-row">
        <div><b>Sound</b><span className="dim">One soft tone, never during voice or media.</span></div>
        <Toggle checked={n.sound} onChange={(x) => set({ sound: x })} />
      </div>
      <div className="set-row">
        <div><b>Digest</b><span className="dim">Everything non-urgent is folded into one read instead of twenty pings.</span></div>
        <div className="segmented">
          {(['off', 'hourly', 'daily'] as const).map((d) => (
            <button key={d} type="button" className={cx('segmented__item', n.digest === d && 'is-active')} onClick={() => set({ digest: d })}>{d}</button>
          ))}
        </div>
      </div>
      <div className="set-row">
        <div><b>Quiet hours</b><span className="dim">Critical gates still come through. Everything else waits.</span></div>
        <span className="cluster">
          <input className="input input--time" type="time" value={n.quietHours.from} onChange={(e) => set({ quietHours: { ...n.quietHours, from: e.target.value } })} />
          <span className="dim">→</span>
          <input className="input input--time" type="time" value={n.quietHours.to} onChange={(e) => set({ quietHours: { ...n.quietHours, to: e.target.value } })} />
          <Toggle checked={n.quietHours.enabled} onChange={(x) => set({ quietHours: { ...n.quietHours, enabled: x } })} />
        </span>
      </div>
      <div className="set-row">
        <div><b>Preview the inbox</b><span className="dim">Approvals, alerts and digests in one place.</span></div>
        <Button size="sm" icon="bell" onClick={() => ui.go('notifications')}>Open inbox</Button>
      </div>
    </Panel>
  );
}

function SystemPanel({ config, patch }: { config: AppConfig; patch: (p: Partial<AppConfig>, label?: string) => void }) {
  const services = store.get().services;
  return (
    <>
      <Panel title="Boot & presence" sub="How HERCULES starts, and how visible it is when it is not wanted.">
        <div className="set-row">
          <div><b>Cinematic boot sequence</b><span className="dim">The full cold-start. Turning this off skips straight to work.</span></div>
          <Toggle checked={config.boot.cinematicSequence} onChange={(x) => patch({ boot: { ...config.boot, cinematicSequence: x } })} />
        </div>
        <div className="set-row">
          <div><b>Run diagnostics on boot</b><span className="dim">Checks disks, clocks, watchers and model availability before the first dispatch.</span></div>
          <Toggle checked={config.boot.autoRunDiagnostics} onChange={(x) => patch({ boot: { ...config.boot, autoRunDiagnostics: x } })} />
        </div>
        <div className="set-row">
          <div><b>Tray / menu-bar presence</b><span className="dim">The floating core is the in-app equivalent of the always-on-top window.</span></div>
          <Toggle checked={config.boot.showTrayIcon} onChange={(x) => patch({ boot: { ...config.boot, showTrayIcon: x } })} />
        </div>
        <div className="set-row">
          <div><b>Summon hotkey</b><span className="dim">Used by the floating core and the command bar.</span></div>
          <TextInput value={config.core.hotkeySummon} onChange={(x) => patch({ core: { ...config.core, hotkeySummon: x } }, 'Hotkey updated')} mono />
        </div>
        <div className="set-row">
          <div><b>Always-available core</b><span className="dim">Keep a miniature hologram on top of everything, even when this window is not focused.</span></div>
          <Toggle checked={config.core.alwaysAvailable} onChange={(x) => patch({ core: { ...config.core, alwaysAvailable: x } })} />
        </div>
        <div className="set-row">
          <div><b>Replay the boot sequence</b><span className="dim">Watch the core come up again, subsystems and all.</span></div>
          <Button size="sm" icon="play" onClick={() => void actions.replayBoot()}>Replay</Button>
        </div>
      </Panel>

      <Panel title="Files & indexing" sub="Where the estate is allowed to look, and what it may keep touching.">
        <div className="set-row">
          <div><b>Default workspace</b><span className="dim">Everything agents read starts here.</span></div>
          <TextInput value={config.files.defaultRoot} onChange={(x) => patch({ files: { ...config.files, defaultRoot: x } })} mono />
        </div>
        <div className="set-row">
          <div><b>Watch open projects</b><span className="dim">File changes wake the intake automation instead of waiting for a rebuild.</span></div>
          <Toggle checked={config.files.watchProjects} onChange={(x) => patch({ files: { ...config.files, watchProjects: x } })} />
        </div>
        <div className="set-row">
          <div><b>Auto-index new files</b><span className="dim">Adds them to ATLAS without asking. Off is the safer default.</span></div>
          <Toggle checked={config.files.autoIndex} onChange={(x) => patch({ files: { ...config.files, autoIndex: x } }, x ? 'Auto-index on' : 'Auto-index off')} />
        </div>
        <div className="set-row">
          <div><b>Host panels</b><span className="dim">The desktop shell deep-links into these; in the browser demo the request is logged and reported.</span></div>
          <span className="cluster">
            {(['privacy', 'network', 'sound', 'accessibility', 'general'] as const).map((pane) => (
              <Button key={pane} size="sm" onClick={() => void services.system.openSettings(pane).then(() => toast({ title: `OS ${pane} panel`, body: 'Deep link requested through the system service.', severity: 'info', ttlMs: 3_000 }))}>{pane}</Button>
            ))}
          </span>
        </div>
      </Panel>
    </>
  );
}

function DeveloperPanel({ config, patch }: { config: AppConfig; patch: (p: Partial<AppConfig>, label?: string) => void }) {
  const services = store.get().services;
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState<string | null>(null);
  const set = (p2: Partial<AppConfig['developer']>) => patch({ developer: { ...config.developer, ...p2 } });

  return (
    <>
      <Panel title="Transport" sub="Which implementation of the service contracts is in play. Screens do not know or care.">
        <div className="set-row">
          <div><b>Transport</b><span className="dim">mock runs the simulated estate. http/ws/ipc expect a real HERCULES host at the base URL below.</span></div>
          <div className="segmented">
            {(['mock', 'http', 'ws', 'ipc'] as const).map((t) => (
              <button key={t} type="button" className={cx('segmented__item', config.developer.transport === t && 'is-active')} onClick={() => { set({ transport: t }); toast({ title: `Transport → ${t}`, body: t === 'mock' ? 'Simulated services, already live.' : 'Set VITE_HERCULES_TRANSPORT and VITE_HERCULES_API_BASE, then restart to attach a real host.', severity: 'info', ttlMs: 7_000 }); }}>{t}</button>
            ))}
          </div>
        </div>
        <div className="set-row">
          <div><b>API base</b><span className="dim">Also readable from <code>VITE_HERCULES_API_BASE</code>. No credentials go in this field, ever.</span></div>
          <TextInput value={config.developer.apiBase} onChange={(x) => set({ apiBase: x })} mono placeholder="http://127.0.0.1:8712" />
        </div>
        <div className="set-row">
          <div><b>Verbose logs</b><span className="dim">Dumps every service call, chunk and state transition to the console.</span></div>
          <Toggle checked={config.developer.verboseLogs} onChange={(x) => set({ verboseLogs: x })} />
        </div>
        <div className="set-row">
          <div><b>World seed</b><span className="dim">The mock estate is deterministic: same seed, same agents, same tasks, same run history.</span></div>
          <span className="cluster">
            <input className="range" type="range" min={1} max={9999} value={config.developer.demoSeed} onChange={(e) => set({ demoSeed: Number(e.target.value) })} />
            <span className="mono">{config.developer.demoSeed}</span>
            <Button size="sm" icon="refresh" onClick={() => { ui.bump('agents', 'tasks', 'memory', 'automations'); toast({ title: 'World re-seeded', body: 'Counters bumped; every screen refetched from the same deterministic source.', severity: 'success', ttlMs: 4_000 }); }}>Reseed</Button>
          </span>
        </div>
        <div className="set-row">
          <div><b>Active transport now</b><span className="dim">Resolved at module load from env, falling back loudly to mock on failure.</span></div>
          <Chip size="sm" tone="accent" icon="bolt">{services.transport}</Chip>
        </div>
      </Panel>

      <Panel title="Config" sub="Portable, versioned, and incapable of carrying a secret.">
        <div className="set-row">
          <div><b>Export</b><span className="dim">Writes hercules.config.json. Handles are exported, values never are.</span></div>
          <span className="cluster">
            <Button size="sm" icon="download" onClick={() => void actions.exportConfig()}>Export</Button>
            <Button size="sm" icon="refresh" onClick={() => void actions.resetSettings()}>Restore defaults</Button>
          </span>
        </div>
        <SectionLabel>Import</SectionLabel>
        <textarea className="textarea" rows={5} value={importText} onChange={(e) => { setImportText(e.target.value); setImportError(null); }} placeholder='Paste config JSON, or {"theme":{"themeId":"amber-forge"}} for just a fragment…' />
        <div className="cluster" style={{ marginTop: 8 }}>
          <Button
            size="sm"
            variant="solid"
            icon="upload"
            disabled={!importText.trim()}
            onClick={() =>
              void services.settings
                .import(importText)
                .then((next) => {
                  patch({}, 'Config imported');
                  setImportText('');
                  toast({ title: 'Imported', body: `Applied to schema v${next.schemaVersion} · theme ${next.theme.themeId}`, severity: 'success', ttlMs: 4_000 });
                })
                .catch((e: unknown) => setImportError(e instanceof Error ? e.message : String(e)))
            }
          >
            Validate & apply
          </Button>
          <Button size="sm" icon="file" onClick={() => fileRef.current?.click()}>From file…</Button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            style={{ display: 'none' }}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void actions.importConfig(f);
              e.target.value = '';
            }}
          />
          {importError && <Chip size="sm" tone="danger" icon="shield">{importError}</Chip>}
        </div>
        <p className="dim" style={{ fontSize: 11, marginTop: 8 }}>
          Try pasting <code>{'{"ai":{"api_key":"sk-..."}}'}</code> and applying it — the importer refuses with <b>E_SECRET_IN_CONFIG</b>
          and writes nothing. Secrets belong in the OS vault, reachable only from the Trust screen.
        </p>
      </Panel>
    </>
  );
}

/* ── Brain panel ───────────────────────────────────────────────────────────── */

function BrainPanel() {
  const services = store.get().services;
  const modes = useAsync(() => services.brain.modes(), []);
  const procedures = useAsync(() => services.brain.procedures(), []);

  return (
    <>
      <Panel
        title="Thinking modes"
        sub="The brain selects a mode automatically from the directive. You can override it here."
      >
        {modes.loading ? (
          <div className="dim" style={{ fontSize: 11 }}>reading modes…</div>
        ) : (
          <div className="mode-grid">
            {modes.data?.map((m) => (
              <button key={m.id} type="button" className="modecell">
                <b>{m.name}</b>
                <span className="dim">{m.ethos}</span>
                <span className="mono dim">{m.depth} · {m.planStyle.slice(0, 60)}…</span>
              </button>
            ))}
          </div>
        )}
      </Panel>

      <Panel
        title="Pre-made procedures"
        sub="Procedures are the brain's hands — deterministic step graphs it can run offline. Models are only called to enrich step content."
      >
        {procedures.loading ? (
          <div className="dim" style={{ fontSize: 11 }}>reading procedures…</div>
        ) : (
          <div className="proc-list">
            {procedures.data?.map((p) => (
              <div key={p.id} className="proc-row">
                <div className="proc-row__head">
                  <b>{p.name}</b>
                  <Chip size="sm" tone="dim">{p.class}</Chip>
                  <Chip size="sm" tone={p.risk === 'high' || p.risk === 'critical' ? 'warn' : p.risk === 'medium' ? 'info' : 'success'} icon="shield">{p.risk}</Chip>
                  {p.requiresApproval && <Chip size="sm" tone="warn" icon="lock">gate</Chip>}
                </div>
                <div className="proc-row__triggers">{p.triggers.join(', ')}</div>
                <div className="proc-row__steps">
                  {p.steps.map((s, i) => (
                    <span key={`${p.id}-${i}`} className="proc-step">
                      <span className="mono">{i + 1}</span>
                      <span>{s.title} <span className="dim">→ {s.hand}</span></span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Panel>
    </>
  );
}
