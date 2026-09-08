/**
 * HERCULES · Hologram Studio (standalone mockup)
 * ---------------------------------------------------------------
 * Reuses the SAME orb engine + hand tracker + design families as the
 * Hercules app (imported from `../hercules/src/hologram` via the
 * `@hologram` alias). Three designs, individually previewable, with a
 * dock switcher at the bottom. Works standalone on localhost:5199.
 */
import { createOrbScene, orbPaletteFromHex, type OrbSceneApi } from '@hologram/orb/orbScene';
import { HandTracker, type GestureMode, type TrackerStatus } from '@hologram/orb/handTracker';
import { HOLOGRAM_DESIGNS, HOLOGRAM_DESIGN_ORDER, getHologramDesign, type HologramDesignId } from '@hologram/designs';

const stage = document.getElementById('stage') as HTMLDivElement;
const hud = document.getElementById('hud') as HTMLDivElement;
const hint = document.getElementById('hint') as HTMLDivElement;
const gestureStateEl = document.getElementById('gestureState') as HTMLDivElement;
const dockEl = document.getElementById('dock') as HTMLDivElement;

const DESIGN_ACCENTS: Record<HologramDesignId, string> = {
  ultron: '#ffaa30',
  nexus: '#3fe0ff',
  aegis: '#a78bfa',
};

let scene: OrbSceneApi | null = null;
let tracker: HandTracker | null = null;
let currentDesign: HologramDesignId = 'ultron';
let gestureOn = false;

function hashDesign(): HologramDesignId {
  const h = location.hash.replace('#/', '').replace('#', '');
  return (HOLOGRAM_DESIGN_ORDER as string[]).includes(h) ? (h as HologramDesignId) : 'ultron';
}

function applyDesign(id: HologramDesignId) {
  currentDesign = id;
  const d = getHologramDesign(id);
  const acc = DESIGN_ACCENTS[id];
  const rgb = hexToRgb(acc);

  // Set theme vars for the HUD/dock
  document.documentElement.style.setProperty('--acc', acc);
  document.documentElement.style.setProperty('--acc-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
  document.documentElement.style.setProperty('--line', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.18)`);

  // HUD
  hud.innerHTML = `
    <div class="title">${d.name}</div>
    <div class="sub">${d.tagline}</div>
    <div class="tag"><span class="dot"></span>${d.blurb}</div>
  `;
  hint.textContent = d.id === 'ultron'
    ? 'drag to spin · scroll to zoom · OPEN PALM to gesture'
    : d.id === 'nexus'
      ? 'drag to spin · scroll to zoom · PINCH to gesture'
      : 'drag to spin · scroll to zoom · SWIPE to gesture';

  // Rebuild scene
  scene?.dispose();
  scene = createOrbScene(stage, orbPaletteFromHex(acc), {
    ...d.scene,
    variant: d.id,
  });

  // Dock
  dockEl.innerHTML = '';
  for (const did of HOLOGRAM_DESIGN_ORDER) {
    const dd = HOLOGRAM_DESIGNS[did];
    const b = document.createElement('button');
    b.className = did === id ? 'active' : '';
    b.innerHTML = `<span class="dot"></span>${dd.name}`;
    b.onclick = () => { location.hash = `/${did}`; };
    dockEl.appendChild(b);
  }
}

function hexToRgb(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

// ——— Pointer / wheel camera control ———
let dragging = false;
let lx = 0, ly = 0;
stage.addEventListener('pointerdown', (e) => { dragging = true; lx = e.clientX; ly = e.clientY; stage.setPointerCapture(e.pointerId); });
window.addEventListener('pointermove', (e) => {
  if (!dragging) return;
  scene?.rotateBy(((e.clientX - lx) / stage.clientWidth) * 6, ((e.clientY - ly) / stage.clientHeight) * 6);
  lx = e.clientX; ly = e.clientY;
});
window.addEventListener('pointerup', () => { dragging = false; });
stage.addEventListener('wheel', (e) => {
  e.preventDefault();
  scene?.zoomBy(e.deltaY < 0 ? 0.9 : 1.12);
}, { passive: false });

// Auto-rotate feed (energy pulse) — mimics the Hercules live feed.
// Drives the orb's `setFeed` so every design reacts to state/energy/amplitude
// and satellites (live-agent count), just like the real app.
let pulseSeed = 0;
const STATES: HologramFeedState[] = ['idle', 'listening', 'thinking', 'speaking', 'working', 'alert'];
function feedTick() {
  const t = Date.now() / 1000;
  const energy = 0.35 + 0.6 * (0.5 + 0.5 * Math.sin(t * 0.6)); // 0.35..0.95 wave
  const amplitude = 0.25 * (0.5 + 0.5 * Math.sin(t * 1.7)); // breathing
  const satellites = Math.floor(3 * (0.5 + 0.5 * Math.sin(t * 0.35))); // 0..3 agents
  const state = STATES[Math.floor((t * 0.22) % STATES.length)];
  scene?.setFeed({ energy, amplitude, satellites, state });
}
setInterval(() => {
  pulseSeed += 0.35;
  feedTick();
}, 120);
feedTick();

type HologramFeedState = 'idle' | 'dormant' | 'alert' | 'error' | 'working' | 'listening' | 'speaking' | 'thinking' | 'executing' | 'updating';

// ——— Gestures (camera pinch) ———
async function toggleGesture() {
  gestureOn = !gestureOn;
  gestureStateEl.textContent = gestureOn ? 'CAMERA ON' : 'CAMERA OFF';
  gestureStateEl.classList.toggle('on', gestureOn);
  if (!gestureOn) {
    tracker?.stop();
    tracker = null;
    return;
  }
  const video = document.createElement('video');
  video.autoplay = true; video.muted = true; video.playsInline = true;
  video.style.cssText = 'position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;left:-999px;top:0;';
  document.body.appendChild(video);
  const overlay = document.createElement('canvas');
  overlay.style.cssText = 'position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;left:-999px;top:0;';
  document.body.appendChild(overlay);
  try {
    tracker = new HandTracker(video, overlay, {
      onRotate: (dt, dp) => scene?.rotateBy(dt, dp),
      onZoom: (f) => scene?.zoomBy(f),
      onStatus: (s: TrackerStatus) => {
        gestureStateEl.textContent = `HANDS ${s.hands} · ${s.mode.toUpperCase()}`;
        if (s.hands === 0) gestureStateEl.textContent = gestureOn ? 'CAMERA ON · NO HANDS' : 'CAMERA OFF';
      },
    });
    tracker.setPalette(DESIGN_ACCENTS[currentDesign]);
    await tracker.start();
  } catch {
    gestureOn = false;
    gestureStateEl.textContent = 'CAMERA UNAVAILABLE';
    gestureStateEl.classList.remove('on');
  }
}

gestureStateEl.onclick = toggleGesture;

// ——— Route ———
function route() {
  applyDesign(hashDesign());
}
window.addEventListener('hashchange', route);
route();