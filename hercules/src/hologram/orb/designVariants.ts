/**
 * HERCULES · Design-variant geometry for the orb hologram.
 * Each hologram family gets a different *structural* identity, not just a
 * palette:
 *
 *  ULTRON — dense wireframe sphere (the original) — no extra layer needed,
 *           the base orbScene build is already ULTRON.
 *
 *  NEXUS  — geodesic icosahedron wireframe shell + rotating shield arcs
 *           + central dodecahedron core + energy conduits (core → shell).
 *
 *  AEGIS  — torus-knot outer wireframe + octahedron skeleton + crystalline
 *           shard ring + particle nebula core.
 *
 * The variants are built as THREE Groups that the orb scene animation loop
 * rotates; they reuse the orb's re-tintable palette (`C`) via the materials.
 */
import * as THREE from 'three';
import type { OrbPalette } from './orbScene';

export type HologramVariant = 'ultron' | 'nexus' | 'aegis';

export interface VariantLayers {
  /** Rotating shell group (outer most, slow). */
  shell: THREE.Group;
  /** Inner rotating core group. */
  core: THREE.Group;
  /** Extra ambient group (particles/shards) — static, subtle rotation. */
  ambient: THREE.Group;
  /** Called each animation frame with elapsed seconds (for pulsing). */
  update?: (t: number) => void;
}

function lineMat(color: number, opacity = 1) {
  return new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
}

/** Build the extra layers for a design variant. Empty groups when none. */
export function buildVariantLayers(variant: HologramVariant, C: OrbPalette): VariantLayers {
  const shell = new THREE.Group();
  const core = new THREE.Group();
  const ambient = new THREE.Group();

  if (variant === 'nexus') {
    // ── NEXUS: geodesic icosahedron shell ──
    const geo = new THREE.IcosahedronGeometry(2.05, 1);
    const edges = new THREE.EdgesGeometry(geo);
    const wire = new THREE.LineSegments(edges, lineMat(C.mid, 0.5));
    shell.add(wire);
    // Hex panels on the shell
    for (let i = 0; i < 24; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const hexGeo = new THREE.CircleGeometry(0.045, 6);
      const hexEdges = new THREE.EdgesGeometry(hexGeo);
      const hex = new THREE.LineSegments(hexEdges, lineMat(Math.random() > 0.5 ? C.bright : C.dim, 0.4));
      hex.position.setFromSphericalCoords(2.06, phi, theta);
      hex.lookAt(0, 0, 0);
      shell.add(hex);
    }
    // Shield arcs (partial torus segments)
    const torusGeo = new THREE.TorusGeometry(1.55, 0.008, 6, 64, Math.PI * 1.2);
    for (let i = 0; i < 5; i++) {
      const arc = new THREE.Mesh(torusGeo, new THREE.MeshBasicMaterial({ color: i % 2 ? C.bright : C.dim, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending }));
      arc.rotation.x = Math.random() * Math.PI;
      arc.rotation.y = Math.random() * Math.PI * 2;
      shell.add(arc);
    }
    // Central dodecahedron core
    const dodeca = new THREE.DodecahedronGeometry(0.55, 0);
    const dodecaEdges = new THREE.EdgesGeometry(dodeca);
    const dodecaWire = new THREE.LineSegments(dodecaEdges, lineMat(C.hot, 0.9));
    core.add(dodecaWire);
    // Energy conduits core → shell vertices
    const vGeo = new THREE.IcosahedronGeometry(2.05, 1);
    const positions = vGeo.attributes.position;
    for (let i = 0; i < positions.count; i += 5) {
      const p = new THREE.Vector3().fromBufferAttribute(positions, i).normalize().multiplyScalar(2.05);
      const pts = [new THREE.Vector3(0, 0, 0), p];
      core.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat(C.dim, 0.25)));
    }
  }

  if (variant === 'aegis') {
    // ── AEGIS: torus-knot wireframe ──
    const knotGeo = new THREE.TorusKnotGeometry(1.35, 0.35, 96, 12, 2, 3);
    const knotEdges = new THREE.EdgesGeometry(knotGeo, 30);
    const knot = new THREE.LineSegments(knotEdges, lineMat(C.mid, 0.55));
    shell.add(knot);
    // Octahedron skeleton
    const octa = new THREE.OctahedronGeometry(1.1, 1);
    const octaEdges = new THREE.EdgesGeometry(octa);
    const octaWire = new THREE.LineSegments(octaEdges, lineMat(C.bright, 0.7));
    shell.add(octaWire);
    // Crystalline shard ring
    const shardGeo = new THREE.OctahedronGeometry(0.05, 0);
    for (let i = 0; i < 40; i++) {
      const shard = new THREE.Mesh(shardGeo, new THREE.MeshBasicMaterial({ color: i % 3 === 0 ? C.hot : C.mid, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending }));
      const a = (i / 40) * Math.PI * 2;
      shard.position.set(Math.cos(a) * 2.2, (Math.random() - 0.5) * 0.6, Math.sin(a) * 2.2);
      ambient.add(shard);
    }
    // Particle nebula core
    const nebCount = 600;
    const pos = new Float32Array(nebCount * 3);
    for (let i = 0; i < nebCount; i++) {
      const r = 0.7 * Math.random();
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi);
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    const nebGeo = new THREE.BufferGeometry();
    nebGeo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    const nebMat = new THREE.PointsMaterial({ color: C.bright, size: 0.03, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true });
    const nebula = new THREE.Points(nebGeo, nebMat);
    core.add(nebula);
  }

  return { shell, core, ambient };
}