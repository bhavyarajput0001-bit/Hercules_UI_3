/**
 * HERCULES · React binding for the 3D orb hologram (useHologram sibling).
 * Same feed/palette contract as `useHologram` but renders the volumetric
 * Three.js orb instead of the 2D canvas engine. Full Ultron experience:
 * visible camera preview + hand overlay + live gesture status + keyboard
 * shortcuts (G/R/+/-) + error banner, all theme-aware.
 *
 * - Theme-aware: tints the orb + pointer glow to `currentPalette()`'s accent,
 *   and re-tints live on `hercules:theme`.
 * - Pointer-driven: drag to rotate, wheel to zoom — works without a camera.
 * - Optional camera gestures (MediaPipe pinch) when `gesturesEnabled` and the
 *   user has granted camera permission. `onTrackerStatus` reports state.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { currentPalette } from '@/theme/bridge';
import { createOrbScene, orbPaletteFromHex, type OrbSceneApi } from '@/hologram/orb/orbScene';
import { HandTracker, type GestureMode, type TrackerStatus } from '@/hologram/orb/handTracker';
import { type HologramFeed } from '@/hologram/useHologram';
import { getHologramDesign, type HologramDesignId } from '@/hologram/designs';

export interface OrbHologramProps {
  /** How the orb is presented. 'hero' is a large free-floating core. */
  variant?: 'hero' | 'dock' | 'inline';
  /** Live core feed, read every frame (same shape as HologramFeed). */
  feed: () => HologramFeed;
  /** Extra deps to re-init on. */
  deps?: unknown[];
  /** Design family to render (ultron / nexus / aegis). */
  design?: HologramDesignId;
  /** When true, show the orb plus interactive camera (drag/zoom). */
  interactive?: boolean;
  /** When true and camera permission granted, enable pinch gestures. */
  gesturesEnabled?: boolean;
  /** Called with tracker status when gesture mode changes. */
  onTrackerStatus?: (status: { hands: number; mode: GestureMode }) => void;
  /** Called when camera permission/api is unavailable (gestures can't start). */
  onGesturesUnavailable?: (reason: string) => void;
}

type CameraState = 'off' | 'starting' | 'on' | 'error';

const MODE_LABEL: Record<GestureMode, string> = {
  idle: 'STANDBY',
  spin: 'SPIN',
  zoom: 'ZOOM',
};

export function OrbHologram({
  variant = 'hero',
  feed,
  deps = [],
  design = 'ultron',
  interactive = true,
  gesturesEnabled = false,
  onTrackerStatus,
  onGesturesUnavailable,
}: OrbHologramProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const overlayRef = useRef<HTMLCanvasElement | null>(null);
  const sceneRef = useRef<OrbSceneApi | null>(null);
  const trackerRef = useRef<HandTracker | null>(null);
  const feedRef = useRef(feed);
  feedRef.current = feed;

  const [camera, setCamera] = useState<CameraState>('off');
  const [status, setStatus] = useState<TrackerStatus>({ hands: 0, mode: 'idle' });
  const [error, setError] = useState<string | null>(null);

  const cameraOn = camera === 'on';

  // ——— Per-frame pump: push live state into the scene + label onto the container ———
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const f = feedRef.current();
      const el = mountRef.current;
      if (el && f.label) el.dataset.label = f.label;
      sceneRef.current?.setFeed({
        energy: f.energy,
        amplitude: f.amplitude,
        satellites: f.satellites,
        state: f.state,
      });
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, []);

  // ——— Mount the Three scene once ———
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const pal = currentPalette();
    const designCfg = getHologramDesign(design);
    let scene: OrbSceneApi;
    try {
      console.log('[OrbHologram] Creating orb scene with design:', design, 'palette:', designCfg.accentOverride ?? pal.accent);
      scene = createOrbScene(mount, orbPaletteFromHex(designCfg.accentOverride ?? pal.accent), {
        ...designCfg.scene,
        variant: designCfg.scene.variant,
      });
      console.log('[OrbHologram] Scene created successfully');
    } catch (err) {
      console.error('[OrbHologram] Failed to create orb scene:', err);
      return;
    }
    sceneRef.current = scene;

    // Re-tint on theme change (accent override designs keep their identity)
    const onTheme = () => {
      const p = currentPalette();
      const d = getHologramDesign(design);
      scene.applyPalette(orbPaletteFromHex(d.accentOverride ?? p.accent));
      trackerRef.current?.setPalette(p.accent);
    };
    window.addEventListener('hercules:theme', onTheme);

    return () => {
      window.removeEventListener('hercules:theme', onTheme);
      scene.dispose();
      sceneRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant, design, ...deps]);

  // ——— Pointer + wheel camera control (works without gestures) ———
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !interactive) return;
    let dragging = false;
    let lx = 0;
    let ly = 0;

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lx = e.clientX;
      ly = e.clientY;
      mount.setPointerCapture?.(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = (e.clientX - lx) / mount.clientWidth;
      const dy = (e.clientY - ly) / mount.clientHeight;
      sceneRef.current?.rotateBy(dx * 6, dy * 6);
      lx = e.clientX;
      ly = e.clientY;
    };
    const onUp = () => {
      dragging = false;
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 0.9 : 1.12;
      sceneRef.current?.zoomBy(factor);
    };

    mount.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    mount.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      mount.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      mount.removeEventListener('wheel', onWheel);
    };
  }, [interactive, ...deps]);

  // ——— Gesture lifecycle: start / stop tracker ———
  const stopGestures = useCallback(() => {
    trackerRef.current?.stop();
    trackerRef.current = null;
    setCamera('off');
    setStatus({ hands: 0, mode: 'idle' });
  }, []);

  const startGestures = useCallback(async () => {
    if (trackerRef.current) return;

    // Camera MUST stay inside the 208×156 HUD panel. Never append a full-stage
    // video onto the Three.js mount — that covers the orb with the user's face.
    const video = videoRef.current;
    const overlay = overlayRef.current;
    if (!video || !overlay) return;

    // Ensure we have a strict panel-local preview (not full-stage).
    // The <video> and <canvas> are already positioned to fill the
    // 208×156 panel via CSS.

    setCamera('starting');

    // Explicitly reset transforms in case a previous session toggled it.
    try {
      video.style.transform = 'scaleX(-1)';
      video.style.pointerEvents = 'none';
      overlay.style.pointerEvents = 'none';
    } catch {
      // ignore
    }
    setError(null);

    let tracker: HandTracker | null = null;
    try {
      tracker = new HandTracker(video, overlay, {
        onRotate: (dt, dp) => sceneRef.current?.rotateBy(dt, dp),
        onZoom: (f) => sceneRef.current?.zoomBy(f),
        onStatus: (s: TrackerStatus) => {
          setStatus(s);
          onTrackerStatus?.(s);
        },
      });
      tracker.setPalette(currentPalette().accent);
      trackerRef.current = tracker;
      await tracker.start();
      setCamera('on');
    } catch (err) {
      trackerRef.current = null;
      tracker?.stop();
      setCamera('error');
      const reason = err instanceof DOMException && err.name === 'NotAllowedError'
        ? 'CAMERA ACCESS DENIED'
        : (err as Error)?.message || 'TRACKING INIT FAILED';
      setError(reason);
      onGesturesUnavailable?.(reason);
    }
  }, [onGesturesUnavailable, onTrackerStatus]);

  const toggleGestures = useCallback(() => {
    if (trackerRef.current) stopGestures();
    else void startGestures();
  }, [startGestures, stopGestures]);

  // ——— Start gestures automatically if prop enabled ———
  useEffect(() => {
    // Gestures are opt-in and should never cover the orb.
    // We do NOT autostart here because CoreScreen should control it.
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gesturesEnabled, ...deps]);

  // Gestures start only when user clicks the UI button or when CoreScreen
  // toggles gesturesEnabled and explicitly calls startGestures().

  // ——— Keyboard shortcuts: G gestures, R reset, +/- zoom ———
  useEffect(() => {
    if (!interactive) return;
    const onKey = (e: KeyboardEvent) => {
      // Don't hijack typing in inputs/textareas/contenteditable
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      switch (e.key) {
        case '+':
        case '=':
          sceneRef.current?.zoomIn();
          break;
        case '-':
        case '_':
          sceneRef.current?.zoomOut();
          break;
        case 'r':
        case 'R':
          sceneRef.current?.resetView();
          break;
        case 'g':
        case 'G':
          toggleGestures();
          break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [interactive, toggleGestures]);

  return (
    <div className="orb-hologram-wrap">
      <div
        ref={mountRef}
        className={`orb-hologram orb-hologram--${variant}${interactive ? ' orb-hologram--interactive' : ''}`}
        data-hologram="orb"
        role="img"
        aria-label="Holographic core"
      />

      {/* ⇩ FULL ULTRON EXPERIENCE ⇩ */}
      <div className="orb-vignette" aria-hidden="true" />
      <div className="orb-grain" aria-hidden="true" />
      <div className="orb-scanlines" aria-hidden="true" />

      <div className="orb-hud orb-hud--title" aria-hidden="true">H.E.R.C.U.L.E.S.</div>

      <div className="orb-hud orb-hud--hints">
        <div>
          <span className="orb-key">DRAG</span> spin&nbsp;&nbsp;
          <span className="orb-key">SCROLL</span> zoom
        </div>
        {cameraOn ? (
          <div>
            <span className="orb-key">PINCH + MOVE</span> spin&nbsp;&nbsp;
            <span className="orb-key">PINCH BOTH HANDS ± SPREAD</span> zoom
          </div>
        ) : (
          <div>
            <span className="orb-key">G</span> hand gestures&nbsp;&nbsp;
            <span className="orb-key">R</span> reset&nbsp;&nbsp;
            <span className="orb-key">+/−</span> zoom
          </div>
        )}
      </div>

      <div className="orb-hud orb-hud--controls" onClick={(e) => e.stopPropagation()}>
        <div className={`orb-camera-panel${cameraOn ? ' visible' : ''}`} onClick={() => cameraOn && stopGestures()}>
          {/* Mirrored preview so it behaves like a mirror */}
          <video ref={videoRef} muted playsInline className="orb-camera-video" />
          <canvas ref={overlayRef} width={208} height={156} className="orb-camera-overlay" />
          <div className="orb-camera-status">
            {status.hands > 0
              ? `${status.hands} HAND${status.hands > 1 ? 'S' : ''} · ${MODE_LABEL[status.mode]}`
              : 'SHOW HANDS'}
          </div>
        </div>

        {error && <div className="orb-hud-error">{error}</div>}

        <div className="orb-hud-row">
          <button
            type="button"
            className="orb-hud-btn"
            aria-pressed={cameraOn}
            onClick={() => toggleGestures()}
            disabled={camera === 'starting'}
          >
            {camera === 'starting' ? 'INITIALIZING…' : cameraOn ? 'GESTURES ON' : 'GESTURES OFF'}
          </button>
        </div>
        <div className="orb-hud-row">
          <button type="button" className="orb-hud-btn" onClick={() => sceneRef.current?.zoomIn()} aria-label="Zoom in">
            +
          </button>
          <button type="button" className="orb-hud-btn" onClick={() => sceneRef.current?.zoomOut()} aria-label="Zoom out">
            −
          </button>
          <button type="button" className="orb-hud-btn" onClick={() => sceneRef.current?.resetView()}>
            RESET
          </button>
        </div>
      </div>
    </div>
  );
}