'use client';

import { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type { HologramPreset, HologramConfig, StateAnimation } from '@/types';
import { useHerculesState, useSelectedHologram, useHologramPresets } from '@/store';

extend(THREE);

const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  varying float vDepth;
  uniform float uTime;
  uniform float uIntensity;
  uniform float uRingSpeed;
  uniform float uParticleSpeed;

  // Simplex noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    vUv = uv;
    vDepth = length(vPosition);

    float breathe = sin(uTime * 0.5 * uIntensity) * 0.08 + 1.0;
    vec3 pos = position * breathe;

    float ringAnim = sin(uTime * uRingSpeed * uIntensity + vPosition.y * 3.0) * 0.02 * uIntensity;
    pos += normal * ringAnim;

    float noise = snoise(vPosition * 1.5 + uTime * 0.1 * uIntensity);
    pos += normal * noise * 0.03 * uIntensity;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  varying float vDepth;
  uniform float uTime;
  uniform float uIntensity;
  uniform float uGlowIntensity;
  uniform vec3 uCoreColor;
  uniform vec3 uRingColor1;
  uniform vec3 uRingColor2;
  uniform vec3 uRingColor3;
  uniform vec3 uParticleColor;
  uniform vec3 uGlowColor;
  uniform vec3 uAccentColor;

  void main() {
    float fresnel = pow(1.0 - abs(dot(vNormal, normalize(vPosition))), 3.0);
    float depthFade = smoothstep(3.0, 5.0, vDepth);

    float ring1 = smoothstep(1.15, 1.25, vDepth) * sin(vUv.x * 20.0 - uTime * 2.0) * 0.5 + 0.5;
    float ring2 = smoothstep(1.8, 2.0, vDepth) * sin(vUv.x * 15.0 + uTime * 1.5) * 0.5 + 0.5;
    float ring3 = smoothstep(2.5, 2.8, vDepth) * sin(vUv.x * 10.0 - uTime * 1.0) * 0.5 + 0.5;

    float pulse = sin(uTime * 3.0 * uIntensity + vDepth * 2.0) * 0.5 + 0.5;

    vec3 core = mix(uCoreColor, uRingColor1, pulse * 0.3) * (1.0 - depthFade);
    vec3 rings = mix(uRingColor1, uRingColor2, ring1) * ring1 * uIntensity;
    rings += mix(uRingColor2, uRingColor3, ring2) * ring2 * uIntensity * 0.8;
    rings += mix(uRingColor3, uAccentColor, ring3) * ring3 * uIntensity * 0.6;

    vec3 color = core + rings;
    color = mix(color, uGlowColor, fresnel * uGlowIntensity * uIntensity);

    float alpha = (0.15 + 0.5 * uIntensity * (1.0 - depthFade) + fresnel * 0.6 * uGlowIntensity) * (1.0 - depthFade * 0.5);

    gl_FragColor = vec4(color, alpha);
  }
`;

const particleVertexShader = `
  attribute float aSize;
  attribute float aLife;
  attribute float aSpeed;
  attribute vec3 aColor;
  varying float vLife;
  varying vec3 vColor;
  varying float vAlpha;
  uniform float uTime;
  uniform float uIntensity;
  uniform float uParticleSpeed;

  void main() {
    vLife = aLife;
    vColor = aColor;
    vAlpha = aLife;

    vec3 pos = position;

    float orbitSpeed = aSpeed * uParticleSpeed * uIntensity;
    float angle = uTime * orbitSpeed + position.x * 10.0;
    float radius = length(position.xz) + sin(uTime * 0.5 + position.y * 5.0) * 0.1;

    pos.x = cos(angle) * radius;
    pos.z = sin(angle) * radius;
    pos.y += sin(uTime * 0.3 * aSpeed + position.x * 3.0) * 0.05;

    float lifeCycle = fract(uTime * 0.2 * aSpeed + aLife);
    float scale = smoothstep(0.0, 0.1, lifeCycle) * smoothstep(1.0, 0.9, lifeCycle);
    pos *= scale * (0.5 + 0.5 * uIntensity);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (300.0 / -mvPosition.z) * scale;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const particleFragmentShader = `
  varying float vLife;
  varying vec3 vColor;
  varying float vAlpha;
  uniform float uTime;
  uniform float uIntensity;

  void main() {
    float dist = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.0, dist) * vAlpha * uIntensity;

    vec3 color = vColor;
    float pulse = sin(uTime * 5.0 + vLife * 20.0) * 0.3 + 0.7;
    color *= pulse;

    gl_FragColor = vec4(color, alpha);
  }
`;

interface CoreGeometryProps {
  config: HologramConfig;
  intensity: number;
  state: StateAnimation;
  time: number;
  coreColor: THREE.Color;
  ringColors: THREE.Color[];
  particleColors: THREE.Color[];
  glowColor: THREE.Color;
  accentColor: THREE.Color;
}

function CoreGeometry({ config, intensity, state, time, coreColor, ringColors, particleColors, glowColor, accentColor }: CoreGeometryProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uIntensity: { value: intensity },
    uRingSpeed: { value: state.ringSpeed },
    uParticleSpeed: { value: state.particleSpeed },
    uGlowIntensity: { value: state.glowIntensity },
    uCoreColor: { value: coreColor },
    uRingColor1: { value: ringColors[0] },
    uRingColor2: { value: ringColors[1] },
    uRingColor3: { value: ringColors[2] },
    uParticleColor: { value: particleColors[0] },
    uGlowColor: { value: glowColor },
    uAccentColor: { value: accentColor },
  }), [coreColor, ringColors, particleColors, glowColor, accentColor, state.ringSpeed, state.particleSpeed, state.glowIntensity]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      uniforms.uTime.value += delta * state.coreSpeed;
      uniforms.uIntensity.value = intensity;
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1, 8);
    return geo;
  }, []);

  const material = useMemo(() => new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  }), [uniforms]);

  return <mesh ref={meshRef} geometry={geometry} material={material} scale={state.coreScale[0] + (state.coreScale[1] - state.coreScale[0]) * intensity} />;
}

interface RingsGeometryProps {
  config: HologramConfig;
  intensity: number;
  state: StateAnimation;
  time: number;
  ringColors: THREE.Color[];
  glowColor: THREE.Color;
}

function RingsGeometry({ config, intensity, state, time, ringColors, glowColor }: RingsGeometryProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uIntensity: { value: intensity },
    uRingSpeed: { value: state.ringSpeed },
    uGlowIntensity: { value: state.glowIntensity },
    uCoreColor: { value: new THREE.Color(0x111111) },
    uRingColor1: { value: ringColors[0] },
    uRingColor2: { value: ringColors[1] },
    uRingColor3: { value: ringColors[2] },
    uParticleColor: { value: ringColors[0] },
    uGlowColor: { value: glowColor },
    uAccentColor: { value: ringColors[2] },
  }), [ringColors, glowColor, state.ringSpeed, state.glowIntensity]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      uniforms.uTime.value += delta * state.ringSpeed;
      uniforms.uIntensity.value = intensity;
      meshRef.current.rotation.y += delta * 0.02 * state.ringSpeed * intensity;
      meshRef.current.rotation.x += delta * 0.01 * state.ringSpeed * intensity;
    }
  });

  const geometry = useMemo(() => {
    const geometries: THREE.BufferGeometry[] = [];
    config.rings.forEach((ringConfig, ringIndex) => {
      for (let i = 0; i < ringConfig.count; i++) {
        const radius = THREE.MathUtils.lerp(ringConfig.radiusRange[0], ringConfig.radiusRange[1], i / Math.max(1, ringConfig.count - 1));
        const thickness = THREE.MathUtils.lerp(ringConfig.thicknessRange[0], ringConfig.thicknessRange[1], Math.random());
        const ringGeo = new THREE.TorusGeometry(radius, thickness, 32, 128);
        ringGeo.rotateX(Math.PI / 2);
        ringGeo.rotateY(Math.random() * Math.PI * 2);
        geometries.push(ringGeo);
      }
    });
    return mergeGeometries(geometries) || new THREE.BufferGeometry();
  }, [config.rings]);

  const material = useMemo(() => new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  }), [uniforms]);

  return <mesh ref={meshRef} geometry={geometry} material={material} />;
}

interface ParticlesGeometryProps {
  config: HologramConfig;
  intensity: number;
  state: StateAnimation;
  time: number;
  particleColors: THREE.Color[];
}

function ParticlesGeometry({ config, intensity, state, time, particleColors }: ParticlesGeometryProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uIntensity: { value: intensity },
    uParticleSpeed: { value: state.particleSpeed },
  }), [state.particleSpeed]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      uniforms.uTime.value += delta * state.particleSpeed;
      uniforms.uIntensity.value = intensity;
      pointsRef.current.rotation.y += delta * 0.005 * state.particleSpeed * intensity;
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const count = config.particles.count;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const lives = new Float32Array(count);
    const speeds = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = 1 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      sizes[i] = THREE.MathUtils.lerp(config.particles.sizeRange[0], config.particles.sizeRange[1], Math.random());
      lives[i] = Math.random();
      speeds[i] = THREE.MathUtils.lerp(config.particles.speedRange[0], config.particles.speedRange[1], Math.random());

      const color = particleColors[Math.floor(Math.random() * particleColors.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('aLife', new THREE.BufferAttribute(lives, 1));
    geo.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));
    geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));

    return geo;
  }, [config.particles, particleColors]);

  const material = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: particleVertexShader,
    fragmentShader: particleFragmentShader,
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  }), [uniforms]);

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

interface GlowProps {
  intensity: number;
  state: StateAnimation;
  glowColor: THREE.Color;
}

function Glow({ intensity, state, glowColor }: GlowProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      const pulse = Math.sin(performance.now() * 0.001 * 2 * intensity) * 0.3 + 1;
      meshRef.current.scale.setScalar(pulse * (1 + state.glowIntensity * intensity));
      meshRef.current.material.opacity = 0.1 * intensity * state.glowIntensity;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2.5, 64, 64]} />
      <meshBasicMaterial
        color={glowColor}
        transparent
        opacity={0.1 * intensity * state.glowIntensity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

function parseColor(colorStr: string): THREE.Color {
  const color = new THREE.Color();
  if (colorStr.startsWith('var(')) {
    const computed = getComputedStyle(document.documentElement).getPropertyValue(colorStr.slice(4, -1)).trim();
    color.setStyle(computed || '#b88aff');
  } else {
    color.setStyle(colorStr);
  }
  return color;
}

export function HologramCore() {
  const herculesState = useHerculesState();
  const selectedHologramId = useSelectedHologram();
  const presets = useHologramPresets();
  const [intensity, setIntensity] = useState(0);
  const [colors, setColors] = useState({
    core: new THREE.Color('#ffffff'),
    rings: [new THREE.Color('#b88aff'), new THREE.Color('#7c4dff'), new THREE.Color('#d0a9ff')],
    particles: [new THREE.Color('#e8dfff')],
    glow: new THREE.Color('#b88aff'),
    accent: new THREE.Color('#d0a9ff'),
  });

  const preset = presets.find(p => p.id === selectedHologramId) || presets[0];
  const config = preset.config;
  const stateAnim = config.animations[herculesState];

  useEffect(() => {
    const targetIntensity = stateAnim.glowIntensity;
    const duration = 800;
    const start = performance.now();
    const startIntensity = intensity;

    const animate = () => {
      const elapsed = performance.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setIntensity(startIntensity + (targetIntensity - startIntensity) * eased);
      if (progress < 1) requestAnimationFrame(animate);
    };
    animate();
  }, [herculesState, stateAnim.glowIntensity]);

  useEffect(() => {
    const updateColors = () => {
      const root = document.documentElement;
      const getVar = (name: string) => root.style.getPropertyValue(name).trim() || name;
      setColors({
        core: parseColor(config.shaders.uniforms.uCoreColor as string || 'var(--h-holo-core)'),
        rings: [
          parseColor(getVar('--h-holo-ring-1')),
          parseColor(getVar('--h-holo-ring-2')),
          parseColor(getVar('--h-holo-ring-3')),
        ],
        particles: [parseColor(getVar('--h-holo-particle'))],
        glow: parseColor(getVar('--h-holo-glow')),
        accent: parseColor(getVar('--h-accent')),
      });
    };
    updateColors();
    const observer = new MutationObserver(updateColors);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });
    return () => observer.disconnect();
  }, [config.shaders.uniforms.uCoreColor]);

  const cameraPosition = [0, 0, 6];

  return (
    <div className="hologram-container" style={{ width: '100%', height: '100%', minHeight: 400 }}>
      <Canvas
        camera={{ position: cameraPosition, fov: 35, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false, powerPreference: 'high-performance' }}
        shadows={false}
        style={{ touchAction: 'none' }}
      >
        <color attach="background" color="#000000" />
        <fog attach="fog" args={['#030305', 5, 15]} />

        <ambientLight color="#ffffff" intensity={0.3 * intensity} />
        <pointLight position={[0, 2, 3]} color={colors.glow} intensity={2 * intensity} distance={10} decay={2} />
        <pointLight position={[0, -2, -3]} color={colors.rings[1]} intensity={1 * intensity} distance={10} decay={2} />

        <Glow intensity={intensity} state={stateAnim} glowColor={colors.glow} />
        <CoreGeometry
          config={config}
          intensity={intensity}
          state={stateAnim}
          time={0}
          coreColor={colors.core}
          ringColors={colors.rings}
          particleColors={colors.particles}
          glowColor={colors.glow}
          accentColor={colors.accent}
        />
        <RingsGeometry
          config={config}
          intensity={intensity}
          state={stateAnim}
          time={0}
          ringColors={colors.rings}
          glowColor={colors.glow}
        />
        <ParticlesGeometry
          config={config}
          intensity={intensity}
          state={stateAnim}
          time={0}
          particleColors={colors.particles}
        />
      </Canvas>
    </div>
  );
}

export function HologramCanvas({ className = '' }: { className?: string }) {
  return (
    <div className={`hologram-canvas ${className}`} style={{ width: '100%', height: '100%', minHeight: 400 }}>
      <HologramCore />
    </div>
  );
}