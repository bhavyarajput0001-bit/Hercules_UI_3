/**
 * HERCULES · 3D Orb hologram (ported from ultron_hologram, theme-aware)
 * ---------------------------------------------------------------------------
 * A Three.js Iron-Man-style orb: layered wireframe shells, inner spiral core,
 * floating code sprites, orbiting debris, dust, scan rings, and a
 * bloom + chromatic-aberration post-processing stack. Unlike the packed-in
 * 2D `hologram.ts`, this one is a real volumetric renderer.
 *
 * Colors are driven by the active Hercules accent palette (passed once at
 * creation and re-tinted live via `applyPalette`), so the orb follows every
 * theme rather than staying amber forever.
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { buildVariantLayers, type HologramVariant } from './designVariants';

export interface OrbPalette {
  bright: number;
  mid: number;
  dim: number;
  faint: number;
  hot: number;
}

export interface OrbSceneApi {
  /** Live re-tint from the active theme. */
  applyPalette(palette: OrbPalette): void;
  /** Push live agent/chat state into the orb's animation (reactivity). */
  setFeed(feed: OrbSceneFeed): void;
  /** Rotate the camera around the orb by the given angles (radians). */
  rotateBy(deltaTheta: number, deltaPhi: number): void;
  /** Multiply the camera distance by `factor` (<1 zooms in, >1 zooms out). */
  zoomBy(factor: number): void;
  zoomIn(): void;
  zoomOut(): void;
  resetView(): void;
  dispose(): void;
}

/**
 * Live state that makes the orb react to what Hercules is doing:
 *  - `energy`       → core surge/glow + shell spin intensity
 *  - `amplitude`    → extra core pulse (voice/streaming waveform)
 *  - `satellites`   → how many orbiting debris are visible (live agents)
 *  - `state`        → agitation tier (idle calm, listening/thinking busy)
 */
export interface OrbSceneFeed {
  energy?: number;      // 0..~1
  amplitude?: number;   // 0..~1
  satellites?: number;  // 0+
  state?: 'idle' | 'dormant' | 'alert' | 'error' | 'working' | 'listening' | 'speaking' | 'thinking' | 'executing' | 'updating';
}

const HOME_POSITION = new THREE.Vector3(0, 0.5, 5.5);
const MIN_DISTANCE = 0.6;
const MAX_DISTANCE = 40;

/**
 * Build a tinted orb palette from any accent hue (a #rrggbb hex string).
 * Uses HSL so the orb keeps the accent's true hue across every Hercules theme:
 *  - mid    = the accent as-is (drives lines + the chromatic grade)
 *  - bright = accent lifted toward white (meridian / core structure)
 *  - hot    = near-white accent (innermost flare + text)
 *  - dim    = accent darkened (secondary shell)
 *  - faint  = accent darkened further (dust / trail)
 */
export function orbPaletteFromHex(accent: string): OrbPalette {
  const n = parseInt(accent.replace('#', ''), 16);
  const { h, s, l } = rgbToHsl(n);
  const from = (l2: number, s2 = s, hue = h) => hslToRgb(hue, s2, l2);
  return {
    bright: from(Math.min(0.95, l + 0.28)),
    mid: n,
    dim: from(Math.max(0.05, l - 0.16)),
    faint: from(Math.max(0.03, l - 0.26)),
    hot: from(0.96, Math.max(0.15, s - 0.35)),
  };
}

function rgbToHsl(rgb: number): { h: number; s: number; l: number } {
  let r = (rgb >> 16) & 255;
  let g = (rgb >> 8) & 255;
  let b = rgb & 255;
  if (Number.isNaN(r)) { r = 255; g = 170; b = 48; }
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      default: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h, s, l };
}

function hslToRgb(h: number, s: number, l: number): number {
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  if (s === 0) {
    const c = Math.round(l * 255);
    return (c << 16) | (c << 8) | c;
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const r = hue2rgb(p, q, h + 1 / 3);
  const g = hue2rgb(p, q, h);
  const b = hue2rgb(p, q, h - 1 / 3);
  return (Math.round(r * 255) << 16) | (Math.round(g * 255) << 8) | Math.round(b * 255);
}

/**
 * Optional design family overrides imported from the design families module.
 * Kept as an interface here to avoid a circular import with hologram/designs.ts.
 */
export interface OrbDesignOptions {
  bloomStrength?: number;
  aberration?: number;
  surge?: number;
  spin?: [number, number];
  debrisDrift?: number;
  dustOpacity?: number;
  coreBrightness?: number;
  /** Visual identity variant: 'ultron' | 'nexus' | 'aegis'. Controls structural geometry. */
  variant?: 'ultron' | 'nexus' | 'aegis';
}

export function createOrbScene(container: HTMLElement, initial: OrbPalette, designOpts?: OrbDesignOptions): OrbSceneApi {
  const width = container.clientWidth;
  const height = container.clientHeight;

  console.log('[createOrbScene] container:', container, 'width:', width, 'height:', height);
  if (width === 0 || height === 0) {
    console.error('[createOrbScene] Container has zero dimensions!', { width, height });
  }

  // ——— SCENE ———
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 500);
  camera.position.copy(HOME_POSITION);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.8;
  container.appendChild(renderer.domElement);

  console.log('[createOrbScene] renderer.domElement appended, canvas size:', renderer.domElement.width, 'x', renderer.domElement.height);

  // ——— POST PROCESSING ———
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  const bloom = new UnrealBloomPass(new THREE.Vector2(width, height), designOpts?.bloomStrength ?? 1.8, 0.4, 0.2);
  composer.addPass(bloom);

  // Chromatic aberration + color grade shader (tinted by the mid color)
  const chromaticPass = new ShaderPass({
    uniforms: {
      tDiffuse: { value: null },
      uTime: { value: 0 },
      uIntensity: { value: designOpts?.aberration ?? 0.003 },
      uTint: { value: new THREE.Color(initial.mid) },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D tDiffuse;
      uniform float uTime;
      uniform float uIntensity;
      uniform vec3 uTint;
      varying vec2 vUv;
      void main() {
        vec2 dir = vUv - vec2(0.5);
        float d = length(dir);
        float offset = uIntensity * d;
        float flicker = 1.0 + 0.02 * sin(uTime * 30.0) * sin(uTime * 7.3);
        vec4 cr = texture2D(tDiffuse, vUv + dir * offset);
        vec4 cg = texture2D(tDiffuse, vUv);
        vec4 cb = texture2D(tDiffuse, vUv - dir * offset * 0.5);
        gl_FragColor = vec4(cr.r, cg.g * 1.05, cb.b * 0.6, 1.0) * flicker;
        // Push toward the theme tint
        gl_FragColor.rgb = mix(gl_FragColor.rgb, gl_FragColor.rgb * (uTint * 1.35), 0.3);
      }
    `,
  });
  composer.addPass(chromaticPass);

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.04;
  controls.minDistance = MIN_DISTANCE;
  controls.maxDistance = MAX_DISTANCE;
  controls.zoomSpeed = 1.4;
  controls.enablePan = false;
  // Input is driven by the custom pointer/wheel handlers in OrbHologram
  // (rotateBy/zoomBy) — letting OrbitControls attach its own listeners doubles
  // the rotation/zoom sensitivity.
  controls.enabled = false;

  // ——— COLORS (re-tintable) ———
  let C: OrbPalette = initial;
  function setColors(p: OrbPalette) {
    // Map old palette values → new ones so we can re-paint already-baked
    // materials by comparing each material's current color.
    const remap = new Map<number, number>();
    for (const key of Object.keys(C) as (keyof OrbPalette)[]) {
      remap.set(C[key], p[key]);
    }
    scene.traverse((obj) => {
      const m = (obj as THREE.Mesh).material as THREE.Material & { color?: THREE.Color } | undefined;
      if (!m?.color) return;
      const cur = m.color.getHex();
      const next = remap.get(cur);
      if (next !== undefined) m.color.setHex(next);
    });
    C = p;
    chromaticPass.uniforms.uTint.value = new THREE.Color(p.mid);
    bloom.strength = bloom.strength; // keep; intensity animated in loop
  }

  // ——— ORB ROOT ———
  const orbGroup = new THREE.Group();
  scene.add(orbGroup);

  // ——— DESIGN VARIANT LAYERS (structural identity) ———
  const variant: HologramVariant = designOpts?.variant ?? 'ultron';
  const { shell: variantShell, core: variantCore, ambient: variantAmbient } = buildVariantLayers(variant, initial);
  orbGroup.add(variantShell, variantCore, variantAmbient);

  // ——— MATERIAL HELPERS ———
  function lineMat(color: number, opacity = 1) {
    return new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }

  // ——— UTILITY: Create ring at latitude ———
  function latRing(radius: number, lat: number, segs = 120) {
    const r = radius * Math.cos(lat);
    const y = radius * Math.sin(lat);
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= segs; i++) {
      const a = (i / segs) * Math.PI * 2;
      pts.push(new THREE.Vector3(r * Math.cos(a), y, r * Math.sin(a)));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }

  // ——— UTILITY: Create meridian ———
  function meridian(radius: number, lon: number, segs = 120) {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= segs; i++) {
      const lat = (i / segs) * Math.PI - Math.PI / 2;
      pts.push(
        new THREE.Vector3(
          radius * Math.cos(lat) * Math.cos(lon),
          radius * Math.sin(lat),
          radius * Math.cos(lat) * Math.sin(lon),
        ),
      );
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }

  // ═══════ LAYER 1: OUTER SHELL — dense wireframe grid ═══════
  const outerShell = new THREE.Group();
  const R1 = 2.0;

  for (let i = -15; i <= 15; i++) {
    const lat = (i / 15) * (Math.PI / 2) * 0.95;
    const opacity = i % 3 === 0 ? 0.5 : 0.12;
    const color = i % 3 === 0 ? C.mid : C.faint;
    outerShell.add(new THREE.Line(latRing(R1, lat), lineMat(color, opacity)));
  }
  for (let i = 0; i < 24; i++) {
    const lon = (i / 24) * Math.PI * 2;
    const isMajor = i % 6 === 0;
    outerShell.add(new THREE.Line(meridian(R1, lon), lineMat(isMajor ? C.mid : C.faint, isMajor ? 0.6 : 0.1)));
  }
  const CROSS_LINES = 18;
  const CROSS_SPREAD = 0.25;
  for (let i = 0; i < 4; i++) {
    const lon = (i / 4) * Math.PI * 2;
    for (let j = 0; j < CROSS_LINES; j++) {
      const t = (j / (CROSS_LINES - 1)) * 2 - 1;
      const offset = (t * CROSS_SPREAD) / 2;
      const falloff = 1 - Math.abs(t) * 0.7;
      const opacity = 0.85 * falloff;
      const color = Math.abs(t) < 0.3 ? C.bright : C.mid;
      outerShell.add(new THREE.Line(meridian(R1, lon + offset, 200), lineMat(color, opacity)));
    }
  }
  const EQ_LINES = 20;
  const EQ_SPREAD = 0.35;
  for (let j = 0; j < EQ_LINES; j++) {
    const t = (j / (EQ_LINES - 1)) * 2 - 1;
    const offset = (t * EQ_SPREAD) / 2;
    const falloff = 1 - Math.abs(t) * 0.65;
    const opacity = 0.8 * falloff;
    const color = Math.abs(t) < 0.3 ? C.bright : C.mid;
    outerShell.add(new THREE.Line(latRing(R1, offset, 200), lineMat(color, opacity)));
  }
  orbGroup.add(outerShell);

  // ═══════ LAYER 2: GRID PANELS on the sphere surface ═══════
  const panelGroup = new THREE.Group();
  function createSpherePanel(latCenter: number, lonCenter: number, latSpan: number, lonSpan: number, radius: number, divisions = 4) {
    const group = new THREE.Group();
    const mat = lineMat(C.dim, 0.25);
    for (let i = 0; i <= divisions; i++) {
      const lat = latCenter - latSpan / 2 + (i / divisions) * latSpan;
      const pts: THREE.Vector3[] = [];
      for (let j = 0; j <= divisions * 4; j++) {
        const lon = lonCenter - lonSpan / 2 + (j / (divisions * 4)) * lonSpan;
        pts.push(new THREE.Vector3(radius * Math.cos(lat) * Math.cos(lon), radius * Math.sin(lat), radius * Math.cos(lat) * Math.sin(lon)));
      }
      group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat));
    }
    for (let j = 0; j <= divisions; j++) {
      const lon = lonCenter - lonSpan / 2 + (j / divisions) * lonSpan;
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= divisions * 4; i++) {
        const lat = latCenter - latSpan / 2 + (i / (divisions * 4)) * latSpan;
        pts.push(new THREE.Vector3(radius * Math.cos(lat) * Math.cos(lon), radius * Math.sin(lat), radius * Math.cos(lat) * Math.sin(lon)));
      }
      group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat));
    }
    return group;
  }
  for (let i = 0; i < 30; i++) {
    const lat = (Math.random() - 0.5) * Math.PI * 0.8;
    const lon = Math.random() * Math.PI * 2;
    const size = 0.15 + Math.random() * 0.25;
    panelGroup.add(createSpherePanel(lat, lon, size, size, R1 + 0.01, 3 + Math.floor(Math.random() * 3)));
  }
  orbGroup.add(panelGroup);

  // ═══════ LAYER 3: SECONDARY SHELL — offset, partial arcs ═══════
  const shell2 = new THREE.Group();
  const R2 = 2.12;
  for (let i = 0; i < 16; i++) {
    const lat = (Math.random() - 0.5) * Math.PI * 0.85;
    const startLon = Math.random() * Math.PI * 2;
    const arcLen = 0.3 + Math.random() * 1.2;
    const pts: THREE.Vector3[] = [];
    const segs = 60;
    const r = R2 * Math.cos(lat);
    const y = R2 * Math.sin(lat);
    for (let j = 0; j <= segs; j++) {
      const a = startLon + (j / segs) * arcLen;
      pts.push(new THREE.Vector3(r * Math.cos(a), y, r * Math.sin(a)));
    }
    shell2.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat(C.mid, 0.2 + Math.random() * 0.3)));
  }
  for (let i = 0; i < 12; i++) {
    const lon = Math.random() * Math.PI * 2;
    const startLat = (Math.random() - 0.5) * Math.PI * 0.8;
    const arcLen = 0.3 + Math.random() * 0.8;
    const pts: THREE.Vector3[] = [];
    const segs = 40;
    for (let j = 0; j <= segs; j++) {
      const lat = startLat + (j / segs) * arcLen;
      pts.push(new THREE.Vector3(R2 * Math.cos(lat) * Math.cos(lon), R2 * Math.sin(lat), R2 * Math.cos(lat) * Math.sin(lon)));
    }
    shell2.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat(C.dim, 0.15 + Math.random() * 0.2)));
  }
  orbGroup.add(shell2);

  // ═══════ LAYER 4: INNER CORE — spiral geodesic ═══════
  const innerCore = new THREE.Group();
  const R3 = 0.9;
  for (let s = 0; s < 8; s++) {
    const pts: THREE.Vector3[] = [];
    const turns = 3 + Math.random() * 2;
    const segs = 300;
    const phase = (s / 8) * Math.PI * 2;
    for (let i = 0; i <= segs; i++) {
      const t = i / segs;
      const lat = t * Math.PI - Math.PI / 2;
      const lon = t * turns * Math.PI * 2 + phase;
      pts.push(new THREE.Vector3(R3 * Math.cos(lat) * Math.cos(lon), R3 * Math.sin(lat), R3 * Math.cos(lat) * Math.sin(lon)));
    }
    innerCore.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat(C.bright, 0.3 + Math.random() * 0.2)));
  }
  for (let i = -6; i <= 6; i++) {
    const lat = (i / 6) * (Math.PI / 2) * 0.9;
    innerCore.add(new THREE.Line(latRing(R3, lat, 80), lineMat(C.dim, 0.2)));
  }
  for (let i = 0; i < 12; i++) {
    const lon = (i / 12) * Math.PI * 2;
    innerCore.add(new THREE.Line(meridian(R3, lon, 80), lineMat(C.dim, 0.15)));
  }
  orbGroup.add(innerCore);

  // ═══════ LAYER 5: INNERMOST CORE — bright hot center ═══════
  const coreR = 0.25;
  const icoGeo = new THREE.IcosahedronGeometry(coreR, 1);
  const icoEdges = new THREE.EdgesGeometry(icoGeo);
  const icoWireMat = lineMat(C.hot, 0.9);
  const icoWire = new THREE.LineSegments(icoEdges, icoWireMat);
  orbGroup.add(icoWire);

  const coreSphereMat = new THREE.MeshBasicMaterial({ color: C.hot, transparent: true, opacity: 0.15, blending: THREE.AdditiveBlending });
  const coreSphere = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16), coreSphereMat);
  orbGroup.add(coreSphere);

  const glowSphereMat = new THREE.MeshBasicMaterial({ color: C.mid, transparent: true, opacity: 0.04, blending: THREE.AdditiveBlending });
  const glowSphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), glowSphereMat);
  orbGroup.add(glowSphere);

  // ═══════ CODE TEXT — tiny, dense, scattered ═══════
  const codeSnippets = [
    "sys.init()", "0xFF3A", "malloc()", ">> SCAN", "void*", "ACK",
    "SYNC OK", "ptr_ref", "exec()", "hash256", "::bind", "core.0",
    "01101001", "10110100", ">>> RDY", "HEAP 4K", "TCP/SYN",
    "mutex.lk", "IRQ 0x7", "DMA xfer", "REG EAX", "FAULT 0",
    "kernel.d", "pipe |>", "chmod +x", "fork()", "SIGTERM",
    "eth0: UP", "AES-256", "RSA 4096", "TLS 1.3", "HTTP/2",
    "latency", "200 OK", "PATCH /", "fn main", "use std",
    "impl Orb", "async {}", "spawn()", "arc::new", ".unwrap",
  ];
  interface SpriteDrift { phi: number; theta: number; r: number; speed: number; }

  function makeTextSprite(text: string, size = 0.08) {
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 32;
    const ctx = c.getContext("2d")!;
    ctx.font = "bold 14px Courier New";
    const alpha = 0.35 + Math.random() * 0.55;
    ctx.fillStyle = `rgba(${((C.hot >> 16) & 255) | 0}, ${(((C.hot >> 8) & 255) + 60) | 0}, ${(((C.hot & 255) + 60)) | 0}, ${alpha})`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 128, 16);
    const tex = new THREE.CanvasTexture(c);
    tex.minFilter = THREE.LinearFilter;
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
    s.scale.set(size * 5, size * 0.7, 1);
    return s;
  }
  function scatterText(count: number, sizeFn: () => number, rFn: () => number, speedScale: [number, number]) {
    const group = new THREE.Group();
    for (let i = 0; i < count; i++) {
      const sp = makeTextSprite(codeSnippets[Math.floor(Math.random() * codeSnippets.length)], sizeFn());
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = rFn();
      sp.position.set(r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
      sp.userData = { phi, theta, r, speed: (speedScale[0] + Math.random() * speedScale[1]) * (Math.random() > 0.5 ? 1 : -1) } satisfies SpriteDrift;
      group.add(sp);
    }
    return group;
  }
  const textOuter = scatterText(1200, () => 0.04 + Math.random() * 0.04, () => R1 + 0.03 + Math.random() * 0.08, [0.0002, 0.0008]);
  orbGroup.add(textOuter);
  const textInner = scatterText(100, () => 0.03 + Math.random() * 0.03, () => R3 + 0.02, [0.0005, 0.001]);
  orbGroup.add(textInner);
  const textAmbient = scatterText(400, () => 0.03, () => R3 + 0.2 + Math.random() * (R1 - R3 - 0.3), [0.0003, 0.0006]);
  orbGroup.add(textAmbient);

  // ═══════ ORBITING DEBRIS ═══════
  const debrisGeos = [
    new THREE.IcosahedronGeometry(0.012, 0),
    new THREE.IcosahedronGeometry(0.02, 0),
    new THREE.IcosahedronGeometry(0.03, 1),
    new THREE.IcosahedronGeometry(0.008, 0),
    new THREE.TetrahedronGeometry(0.015, 0),
    new THREE.OctahedronGeometry(0.018, 0),
  ];
  interface DebrisOrbit { orbitR: number; speed: number; tiltX: number; tiltZ: number; phase: number; }
  const debris: THREE.Mesh[] = [];
  for (let i = 0; i < 250; i++) {
    const geo = debrisGeos[Math.floor(Math.random() * debrisGeos.length)];
    const mat = new THREE.MeshBasicMaterial({ color: Math.random() > 0.7 ? C.bright : C.mid, transparent: true, opacity: 0.3 + Math.random() * 0.6, blending: THREE.AdditiveBlending });
    const mesh = new THREE.Mesh(geo, mat);
    const orbitR = 1.2 + Math.random() * 4.0;
    const speed = (0.08 + Math.random() * 0.6) * (Math.random() > 0.5 ? 1 : -1);
    const tiltX = (Math.random() - 0.5) * Math.PI * 0.9;
    const tiltZ = (Math.random() - 0.5) * Math.PI * 0.5;
    const phase = Math.random() * Math.PI * 2;
    mesh.userData = { orbitR, speed, tiltX, tiltZ, phase } satisfies DebrisOrbit;
    debris.push(mesh);
    orbGroup.add(mesh);
    if (Math.random() > 0.85) {
      const trailPts: THREE.Vector3[] = [];
      for (let j = 0; j <= 15; j++) {
        const a = -(j / 15) * 0.3;
        trailPts.push(new THREE.Vector3(orbitR * Math.cos(a + phase), orbitR * 0.08 * Math.sin(a * 3), orbitR * Math.sin(a + phase)));
      }
      const trail = new THREE.Line(new THREE.BufferGeometry().setFromPoints(trailPts), lineMat(C.faint, 0.08));
      mesh.add(trail);
    }
  }

  // ═══════ DUST PARTICLES ═══════
  const dustCount = 2000;
  const dustPos = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i++) {
    const rr = 0.5 + Math.pow(Math.random(), 0.6) * 7;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    dustPos[i * 3] = rr * Math.sin(phi) * Math.cos(theta);
    dustPos[i * 3 + 1] = rr * Math.cos(phi);
    dustPos[i * 3 + 2] = rr * Math.sin(phi) * Math.sin(theta);
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.Float32BufferAttribute(dustPos, 3));
  const dotC = document.createElement("canvas");
  dotC.width = dotC.height = 64;
  const dCtx = dotC.getContext("2d")!;
  const g = dCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,170,48,1)");
  g.addColorStop(0.2, "rgba(255,120,20,0.6)");
  g.addColorStop(0.5, "rgba(200,80,0,0.15)");
  g.addColorStop(1, "rgba(100,40,0,0)");
  dCtx.fillStyle = g;
  dCtx.fillRect(0, 0, 64, 64);
  const dustMat = new THREE.PointsMaterial({ map: new THREE.CanvasTexture(dotC), size: 0.04, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true, color: C.bright });
  const dustPoints = new THREE.Points(dustGeo, dustMat);
  orbGroup.add(dustPoints);

  // ═══════ SCANNING RINGS ═══════
  function makeScanRing(radius: number, thickness = 0.015) {
    const geo = new THREE.RingGeometry(radius - thickness, radius + thickness, 120);
    const mat = new THREE.MeshBasicMaterial({ color: C.bright, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = Math.PI / 2;
    return mesh;
  }
  const scanRing1 = makeScanRing(R1, 0.01);
  const scanRing2 = makeScanRing(R1 * 0.7, 0.008);
  orbGroup.add(scanRing1, scanRing2);

  // ═══════ HEXAGONAL NODES ═══════
  for (let i = 0; i < 15; i++) {
    const phi = Math.acos(2 * Math.random() - 1);
    const theta = Math.random() * Math.PI * 2;
    const r = R1 + 0.02;
    const hexGeo = new THREE.CircleGeometry(0.03 + Math.random() * 0.02, 6);
    const hexEdges = new THREE.EdgesGeometry(hexGeo);
    const hex = new THREE.LineSegments(hexEdges, lineMat(C.mid, 0.5));
    hex.position.set(r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
    hex.lookAt(0, 0, 0);
    outerShell.add(hex);
  }

  // ═══════ GESTURE / PROGRAMMATIC CAMERA CONTROL ═══════
  const sphericalScratch = new THREE.Spherical();
  const offsetScratch = new THREE.Vector3();
  function rotateBy(deltaTheta: number, deltaPhi: number) {
    offsetScratch.copy(camera.position).sub(controls.target);
    sphericalScratch.setFromVector3(offsetScratch);
    sphericalScratch.theta -= deltaTheta;
    sphericalScratch.phi = THREE.MathUtils.clamp(sphericalScratch.phi - deltaPhi, 0.05, Math.PI - 0.05);
    sphericalScratch.makeSafe();
    offsetScratch.setFromSpherical(sphericalScratch);
    camera.position.copy(controls.target).add(offsetScratch);
    camera.lookAt(controls.target);
  }
  function zoomBy(factor: number) {
    offsetScratch.copy(camera.position).sub(controls.target);
    const dist = THREE.MathUtils.clamp(offsetScratch.length() * factor, MIN_DISTANCE, MAX_DISTANCE);
    offsetScratch.setLength(dist);
    camera.position.copy(controls.target).add(offsetScratch);
  }
  function resetView() {
    camera.position.copy(HOME_POSITION);
    controls.target.set(0, 0, 0);
    camera.lookAt(controls.target);
    controls.update();
  }

  // ═══════ ANIMATION ═══════
  const clock = new THREE.Clock();
  let flickerTimer = 0;
  let rafId = 0;
  let disposed = false;

  function animate() {
    if (disposed) return;
    rafId = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Live reactivity multipliers (agent/chat state → motion)
    const energy = Math.max(0, Math.min(1.5, (liveFeed.energy ?? 0.5)));
    const amp = Math.max(0, Math.min(1.5, (liveFeed.amplitude ?? 0)));
    const busyTier =
      liveFeed.state === 'error' ? 0.5
      : liveFeed.state === 'working' || liveFeed.state === 'thinking' || liveFeed.state === 'listening' || liveFeed.state === 'speaking' || liveFeed.state === 'executing' || liveFeed.state === 'updating' ? 1.0
      : liveFeed.state === 'alert' ? 0.8
      : 0.3; // idle / dormant
    const pace = 1 + energy * 0.5 + busyTier * 0.4; // global speed

    outerShell.rotation.y += 0.0015 * (designOpts?.spin?.[0] ?? 1) * pace;
    outerShell.rotation.x = Math.sin(t * 0.08) * 0.05;
    panelGroup.rotation.y += 0.0018 * (designOpts?.spin?.[0] ?? 1) * pace;
    panelGroup.rotation.x = Math.sin(t * 0.08 + 0.5) * 0.04;
    shell2.rotation.y -= 0.001 * (designOpts?.spin?.[1] ?? 1.6) * pace;
    shell2.rotation.z = Math.sin(t * 0.12) * 0.03;
    innerCore.rotation.y -= 0.005 * pace;
    innerCore.rotation.z += 0.002;
    innerCore.rotation.x = Math.cos(t * 0.1) * 0.08;
    icoWire.rotation.x += 0.008 * pace;
    icoWire.rotation.y += 0.012 * pace;

    // Variant-specific animation
    if (variant === 'nexus') {
      variantShell.rotation.y += 0.0008;
      variantShell.rotation.z = Math.sin(t * 0.05) * 0.02;
      variantCore.rotation.y -= 0.006;
      variantCore.rotation.x = Math.sin(t * 0.03) * 0.04;
      // Shield arcs wobble
      variantShell.children.forEach((c) => { const g = (c as THREE.Mesh).geometry; if (g?.type === 'TorusGeometry') { c.rotation.x += 0.002; c.rotation.z += 0.0015; } });
    }
    if (variant === 'aegis') {
      variantShell.rotation.y += 0.0012;
      variantShell.rotation.x = Math.cos(t * 0.07) * 0.02;
      variantCore.rotation.y += 0.004;
      variantCore.rotation.z = Math.sin(t * 0.04) * 0.03;
      variantAmbient.rotation.y -= 0.0008;
      variantAmbient.children.forEach((c) => { c.rotation.y += 0.01; c.rotation.x += 0.005; });
    }

    const wave1 = Math.sin(t * 1.2);
    const wave3 = Math.pow(Math.max(0, Math.sin(t * 0.4)), 5);
    const wave4 = Math.pow(Math.max(0, Math.sin(t * 0.7 + 2)), 8);
    const fadeOut = Math.pow(Math.max(0, Math.sin(t * 0.25)), 3);
    const surgeK = (designOpts?.surge ?? 1) * (0.6 + energy * 0.8);
    const surge = (wave3 * 1.5 + wave4 * 2.0) * surgeK + amp * 0.5;
    const coreScale = 1 + surge + Math.sin(t * 5) * (0.05 + amp * 0.1) + Math.sin(t * 11) * amp * 0.06;
    coreSphere.scale.setScalar(coreScale);
    const coreOpacity = Math.max(0, (0.08 + wave1 * 0.05 + surge * 0.2) * (1 - fadeOut * 0.95));
    coreSphereMat.opacity = Math.min(0.6, coreOpacity * (designOpts?.coreBrightness ?? 1));
    glowSphere.scale.setScalar(1 + surge * 0.8);
    glowSphereMat.opacity = Math.max(0, (0.03 + surge * 0.08) * (1 - fadeOut * 0.9)) * (designOpts?.coreBrightness ?? 1);
    icoWire.scale.setScalar(1 + surge * 0.6);
    icoWireMat.opacity = Math.min(1, 0.5 + surge * 0.4);

    // Orbit debris — only show as many as there are live agents (satellites)
    const visibleDebris = Math.max(1, Math.min(debris.length, Math.round((liveFeed.satellites ?? 0) / Math.max(1, debris.length) * debris.length) + 1));
    dustPoints.rotation.y += 0.0004 * pace;
    debris.forEach((d, i) => {
      d.visible = i < visibleDebris;
      const u = d.userData as DebrisOrbit;
      const a = t * u.speed * (1 + amp * 0.4) + u.phase;
      d.position.set(u.orbitR * Math.cos(a) * Math.cos(u.tiltX), u.orbitR * Math.sin(u.tiltX) * Math.sin(a * 0.8) + Math.sin(a * 0.3 + u.tiltZ) * 0.2, u.orbitR * Math.sin(a) * Math.cos(u.tiltZ));
      d.rotation.x += 0.015;
      d.rotation.z += 0.01;
    });

    const driftGroups: [THREE.Group, number][] = [[textOuter, 1], [textInner, 2], [textAmbient, 1.2]];
    for (const [group, mult] of driftGroups) {
      group.children.forEach((sp) => {
        const u = sp.userData as SpriteDrift;
        u.theta += u.speed * mult;
        sp.position.set(u.r * Math.sin(u.phi) * Math.cos(u.theta), u.r * Math.cos(u.phi), u.r * Math.sin(u.phi) * Math.sin(u.theta));
      });
    }

    const scanY1 = Math.sin(t * 0.4) * R1;
    scanRing1.position.y = scanY1;
    const scanS1 = Math.sqrt(Math.max(0, R1 * R1 - scanY1 * scanY1)) / R1;
    scanRing1.scale.set(scanS1, scanS1, 1);
    (scanRing1.material as THREE.MeshBasicMaterial).opacity = 0.2 * scanS1;
    const scanY2 = Math.sin(t * 0.6 + 2) * R3;
    scanRing2.position.y = scanY2;
    const scanS2 = Math.sqrt(Math.max(0, R3 * R3 - scanY2 * scanY2)) / R3;
    scanRing2.scale.set(scanS2, scanS2, 1);
    (scanRing2.material as THREE.MeshBasicMaterial).opacity = 0.15 * scanS2;

    dustPoints.rotation.y += 0.0002;
    flickerTimer += 0.016;
    if (flickerTimer > 0.1) {
      flickerTimer = 0;
      panelGroup.children.forEach((p) => { if (Math.random() > 0.95) p.visible = !p.visible; });
    }
    bloom.strength = (designOpts?.bloomStrength ?? 1.8) + Math.sin(t * 0.8) * 0.3 + energy * 0.4 + amp * 0.3;
    chromaticPass.uniforms.uTime.value = t;
    controls.update();
    composer.render();
  }
  animate();
  console.log('[createOrbScene] animate() started, rafId:', rafId);

  // ——— RESIZE ———
  function onResize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    composer.setSize(w, h);
  }
  window.addEventListener("resize", onResize);

  // ——— LIVE FEED (agent/chat reactivity) ———
  const liveFeed: Required<Pick<OrbSceneFeed, 'energy' | 'amplitude' | 'satellites'>> & { state: OrbSceneFeed['state'] } = {
    energy: 0.5,
    amplitude: 0,
    satellites: 0,
    state: 'idle',
  };
  function setFeed(feed: OrbSceneFeed): void {
    if (feed.energy !== undefined) liveFeed.energy = feed.energy;
    if (feed.amplitude !== undefined) liveFeed.amplitude = feed.amplitude;
    if (feed.satellites !== undefined) liveFeed.satellites = feed.satellites;
    if (feed.state !== undefined) liveFeed.state = feed.state;
  }

  // ——— CLEANUP ———
  function dispose() {
    disposed = true;
    cancelAnimationFrame(rafId);
    window.removeEventListener("resize", onResize);
    controls.dispose();
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.geometry) mesh.geometry.dispose();
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      for (const mat of mats) {
        if (!mat) continue;
        const anyMat = mat as THREE.Material & { map?: THREE.Texture };
        anyMat.map?.dispose();
        mat.dispose();
      }
    });
    composer.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  }

  return {
    applyPalette: setColors,
    setFeed,
    rotateBy,
    zoomBy,
    zoomIn: () => zoomBy(0.65),
    zoomOut: () => zoomBy(1.55),
    resetView,
    dispose,
  };
}