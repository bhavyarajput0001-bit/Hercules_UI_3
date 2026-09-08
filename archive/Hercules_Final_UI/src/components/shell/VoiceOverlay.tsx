/**
 * HERCULES · voice overlay
 * Presence made audible: the core answers out loud, the user interrupts by
 * talking, and the overlay never pretends to be listening when it is not —
 * the capture state and engine (on-device vs simulated) are always shown.
 */
import { useEffect, useState } from 'react';
import { Icon } from '@/components/Icon';
import { Chip } from '@/components/ui';
import { actions, store, ui } from '@/state/hercules';
import { useHologram } from '@/hologram/useHologram';

export function VoiceOverlay() {
  const voice = store.use((s) => s.voice);
  const vitals = store.use((s) => s.vitals);
  const [profileName, setProfileName] = useState('Hollow');

  useEffect(() => {
    if (!voice.active) return;
    void store.get().services.voice.profiles().then((ps) => {
      setProfileName(ps[0]?.name ?? 'Hollow');
    });
  }, [voice.active]);

  const canvasRef = useHologram('hero', () => {
    const s = store.get();
    return {
      state: s.voice.active ? 'listening' : s.voice.speaking ? 'speaking' : s.vitals.state,
      energy: s.vitals.energy,
      amplitude: s.voice.active ? 0.35 + Math.abs(Math.sin(performance.now() / 260)) * 0.3 : s.voice.level,
      satellites: s.agents.filter((a) => a.status === 'working' || a.status === 'thinking').length,
    };
  });

  if (!voice.active && !voice.speaking) return null;

  const words = voice.transcript.trim().split(/\s+/).filter(Boolean);

  return (
    <div className="scrim scrim--voice" onMouseDown={(e) => e.target === e.currentTarget && (void actions.toggleVoice(false))}>
      <div className="voice" role="dialog" aria-label="Voice capture">
        <div className="voice__stage">
          <canvas ref={canvasRef} className="voice__canvas" />
        </div>

        <div className="voice__frame">
          <div className="voice__head">
            <span className="mono">{voice.active ? 'CAPTURING' : 'SPEAKING'}</span>
            <Chip size="sm" tone={voice.engine === 'native' ? 'success' : 'warn'} icon="shield">
              {voice.engine === 'native' ? 'on-device capture' : 'simulated capture (no mic in this session)'}
            </Chip>
            <span className="voice__profile">{voice.active ? 'listening for intent' : `${profileName} · local-first TTS`}</span>
          </div>

          <div className="voice__transcript">
            {words.length ? (
              words.map((w, i) => (
                <span key={i} className={i === words.length - 1 && voice.interim ? 'is-live' : undefined}>
                  {w}{' '}
                </span>
              ))
            ) : (
              <span className="voice__idle">Say something. I have the floor and nothing else.</span>
            )}
          </div>

          {voice.error && (
            <div className="voice__error">
              <Icon name="alert" size={13} />
              <span>{voice.error}</span>
            </div>
          )}

          <div className="voice__levels">
            {Array.from({ length: 40 }, (_, i) => {
              const seed = Math.sin((performance.now() / 300 + i) * 0.9);
              const v = voice.active ? 0.25 + Math.abs(seed) * (0.3 + voice.level * 0.6) : voice.level * (0.4 + Math.abs(seed) * 0.6);
              return <span key={i} style={{ transform: `scaleY(${Math.max(0.08, v)})` }} className={v > 0.6 ? 'is-hot' : undefined} />;
            })}
          </div>

          <div className="voice__actions">
            <button type="button" className="btn btn--solid" onClick={() => void actions.submitVoice()} disabled={!voice.transcript.trim()}>
              <Icon name="send" size={13} />
              <span>Send to core</span>
            </button>
            <button type="button" className="btn btn--ghost" onClick={() => void actions.toggleVoice(false)}>
              <Icon name="close" size={13} />
              <span>Cancel</span>
            </button>
            {voice.speaking && (
              <button type="button" className="btn btn--outline" onClick={() => void actions.stopSpeaking()}>
                <Icon name="pause" size={13} />
                <span>Interrupt</span>
              </button>
            )}
            <span className="voice__state">
              {vitals.activeAgents} agents live · {vitals.queuedTasks} queued
            </span>
            <button type="button" className="btn btn--bare" onClick={() => ui.go('settings')}>
              Voice settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
