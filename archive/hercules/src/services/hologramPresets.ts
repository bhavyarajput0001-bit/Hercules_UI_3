import type { HologramPreset, HologramConfig, RingConfig, ParticleConfig, ShaderConfig, AnimationConfig, StateAnimation } from '@/types';

export const hologramPresets: HologramPreset[] = [
  {
    id: 'core',
    name: 'CORE',
    description: 'Central intelligence - pulsing spherical core with orbital rings',
    preview: 'radial-gradient(circle at center, #b88aff 0%, #7c4dff 50%, transparent 70%)',
    config: {
      coreGeometry: 'sphere',
      rings: [
        {
          count: 3,
          radiusRange: [1.2, 2.5],
          speedRange: [0.15, 0.4],
          thicknessRange: [0.008, 0.02],
          opacityRange: [0.15, 0.4],
          colorStops: ['var(--h-holo-ring-1)', 'var(--h-holo-ring-2)', 'var(--h-holo-ring-3)'],
        },
        {
          count: 2,
          radiusRange: [2.8, 3.5],
          speedRange: [0.05, 0.12],
          thicknessRange: [0.005, 0.015],
          opacityRange: [0.08, 0.25],
          colorStops: ['var(--h-holo-ring-2)', 'var(--h-holo-ring-3)'],
        },
      ],
      particles: {
        count: 150,
        sizeRange: [0.01, 0.04],
        speedRange: [0.2, 0.8],
        lifeRange: [2, 6],
        colorPalette: ['var(--h-holo-particle)', 'var(--h-holo-ring-1)', 'var(--h-holo-ring-3)'],
        behavior: 'orbit',
      },
      shaders: {
        vertex: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          varying float vDepth;
          uniform float uTime;
          uniform float uIntensity;

          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
            vDepth = length(vPosition);

            float pulse = sin(uTime * 0.5 * uIntensity) * 0.1 + 1.0;
            vec3 pos = position * pulse;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragment: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          varying float vDepth;
          uniform float uTime;
          uniform float uIntensity;
          uniform vec3 uCoreColor;
          uniform vec3 uGlowColor;

          void main() {
            float fresnel = pow(1.0 - abs(dot(vNormal, normalize(vPosition))), 3.0);
            float pulse = sin(uTime * 2.0 * uIntensity + vDepth * 3.0) * 0.5 + 0.5;

            vec3 color = mix(uCoreColor, uGlowColor, fresnel * pulse * uIntensity);
            float alpha = fresnel * (0.3 + 0.7 * uIntensity) * pulse;

            gl_FragColor = vec4(color, alpha);
          }
        `,
        uniforms: {
          uTime: 0,
          uIntensity: 0.4,
          uCoreColor: [1.0, 1.0, 1.0],
          uGlowColor: [0.72, 0.54, 1.0],
        },
      },
      animations: {
        idle: {
          coreScale: [0.98, 1.02],
          coreSpeed: 0.3,
          ringSpeed: 1.0,
          particleSpeed: 1.0,
          glowIntensity: 0.3,
          colorShift: 'var(--h-holo-core)',
        },
        listening: {
          coreScale: [1.0, 1.15],
          coreSpeed: 1.2,
          ringSpeed: 2.0,
          particleSpeed: 2.5,
          glowIntensity: 0.8,
          colorShift: 'var(--h-holo-ring-1)',
          specialEffects: ['waveform-react', 'particle-attract'],
        },
        thinking: {
          coreScale: [0.95, 1.08],
          coreSpeed: 0.8,
          ringSpeed: 3.0,
          particleSpeed: 1.5,
          glowIntensity: 0.6,
          colorShift: 'var(--h-holo-ring-2)',
          specialEffects: ['particle-reorganize', 'computational-pattern'],
        },
        speaking: {
          coreScale: [0.9, 1.2],
          coreSpeed: 2.0,
          ringSpeed: 1.5,
          particleSpeed: 2.0,
          glowIntensity: 0.9,
          colorShift: 'var(--h-holo-ring-1)',
          specialEffects: ['voice-sync', 'glow-expand'],
        },
        executing: {
          coreScale: [1.0, 1.12],
          coreSpeed: 1.5,
          ringSpeed: 2.5,
          particleSpeed: 2.0,
          glowIntensity: 0.85,
          colorShift: 'var(--h-holo-ring-2)',
          specialEffects: ['energy-surge', 'task-indicators'],
        },
        success: {
          coreScale: [1.0, 1.25],
          coreSpeed: 0.5,
          ringSpeed: 0.8,
          particleSpeed: 0.5,
          glowIntensity: 1.0,
          colorShift: 'var(--h-success)',
          specialEffects: ['completion-pulse', 'expansion-wave'],
        },
        warning: {
          coreScale: [0.95, 1.1],
          coreSpeed: 1.8,
          ringSpeed: 2.0,
          particleSpeed: 1.8,
          glowIntensity: 0.9,
          colorShift: 'var(--h-warning)',
          specialEffects: ['alert-pulse', 'particle-warning'],
        },
        error: {
          coreScale: [0.9, 1.05],
          coreSpeed: 0.6,
          ringSpeed: 0.5,
          particleSpeed: 0.3,
          glowIntensity: 0.7,
          colorShift: 'var(--h-error)',
          specialEffects: ['error-contraction', 'stable-glow'],
        },
        offline: {
          coreScale: [0.95, 1.0],
          coreSpeed: 0.15,
          ringSpeed: 0.2,
          particleSpeed: 0.1,
          glowIntensity: 0.15,
          colorShift: 'var(--h-text-dim)',
          specialEffects: ['minimal'],
        },
      },
    },
  },
  {
    id: 'singularity',
    name: 'SINGULARITY',
    description: 'Gravitational collapse - toroidal event horizon with accretion disk',
    preview: 'radial-gradient(ellipse at center, transparent 30%, #9333ea 50%, #000 100%)',
    config: {
      coreGeometry: 'torus',
      rings: [
        {
          count: 4,
          radiusRange: [0.8, 2.2],
          speedRange: [0.3, 0.8],
          thicknessRange: [0.01, 0.03],
          opacityRange: [0.2, 0.5],
          colorStops: ['var(--h-holo-ring-1)', 'var(--h-holo-ring-2)', 'var(--h-holo-ring-3)', 'var(--h-holo-ring-1)'],
        },
        {
          count: 1,
          radiusRange: [3.0, 3.0],
          speedRange: [0.02, 0.02],
          thicknessRange: [0.02, 0.02],
          opacityRange: [0.1, 0.1],
          colorStops: ['var(--h-holo-ring-2)'],
        },
      ],
      particles: {
        count: 300,
        sizeRange: [0.005, 0.025],
        speedRange: [0.5, 2.0],
        lifeRange: [1, 4],
        colorPalette: ['var(--h-holo-particle)', 'var(--h-holo-ring-1)', 'var(--h-holo-ring-2)', 'var(--h-holo-ring-3)'],
        behavior: 'drift',
      },
      shaders: {
        vertex: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          varying vec2 vUv;
          varying float vDepth;
          uniform float uTime;
          uniform float uIntensity;

          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
            vUv = uv;
            vDepth = length(vPosition);

            float distortion = sin(uTime * 0.3 * uIntensity + vPosition.y * 5.0) * 0.05 * uIntensity;
            vec3 pos = position + normal * distortion;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragment: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          varying vec2 vUv;
          varying float vDepth;
          uniform float uTime;
          uniform float uIntensity;
          uniform vec3 uCoreColor;
          uniform vec3 uGlowColor;
          uniform vec3 uAccretionColor;

          void main() {
            float ringFactor = smoothstep(0.45, 0.55, vUv.y);
            float spiral = sin(vUv.x * 30.0 - uTime * 2.0 * uIntensity) * 0.5 + 0.5;

            float fresnel = pow(1.0 - abs(dot(vNormal, normalize(vPosition))), 2.0);
            float accretion = ringFactor * spiral * uIntensity;

            vec3 color = mix(uCoreColor, uAccretionColor, accretion);
            color = mix(color, uGlowColor, fresnel * uIntensity);

            float alpha = (0.2 + 0.8 * accretion + fresnel * 0.5) * uIntensity;

            gl_FragColor = vec4(color, alpha);
          }
        `,
        uniforms: {
          uTime: 0,
          uIntensity: 0.4,
          uCoreColor: [0.1, 0.05, 0.2],
          uGlowColor: [0.75, 0.52, 1.0],
          uAccretionColor: [0.58, 0.2, 0.9],
        },
      },
      animations: {
        idle: {
          coreScale: [0.99, 1.01],
          coreSpeed: 0.2,
          ringSpeed: 1.0,
          particleSpeed: 0.8,
          glowIntensity: 0.25,
          colorShift: 'var(--h-holo-core)',
        },
        listening: {
          coreScale: [1.0, 1.1],
          coreSpeed: 1.0,
          ringSpeed: 2.5,
          particleSpeed: 3.0,
          glowIntensity: 0.75,
          colorShift: 'var(--h-holo-ring-1)',
          specialEffects: ['accretion-respond', 'particle-gravitate'],
        },
        thinking: {
          coreScale: [0.95, 1.05],
          coreSpeed: 0.6,
          ringSpeed: 4.0,
          particleSpeed: 2.0,
          glowIntensity: 0.55,
          colorShift: 'var(--h-holo-ring-2)',
          specialEffects: ['event-horizon-compute', 'data-spiral'],
        },
        speaking: {
          coreScale: [0.9, 1.15],
          coreSpeed: 1.8,
          ringSpeed: 2.0,
          particleSpeed: 2.5,
          glowIntensity: 0.85,
          colorShift: 'var(--h-holo-ring-1)',
          specialEffects: ['voice-distortion', 'corona-flare'],
        },
        executing: {
          coreScale: [1.0, 1.12],
          coreSpeed: 1.3,
          ringSpeed: 3.0,
          particleSpeed: 2.2,
          glowIntensity: 0.8,
          colorShift: 'var(--h-holo-ring-2)',
          specialEffects: ['mass-increase', 'jet-emission'],
        },
        success: {
          coreScale: [1.0, 1.3],
          coreSpeed: 0.4,
          ringSpeed: 0.6,
          particleSpeed: 0.4,
          glowIntensity: 1.0,
          colorShift: 'var(--h-success)',
          specialEffects: ['horizon-expand', 'gamma-burst'],
        },
        warning: {
          coreScale: [0.92, 1.08],
          coreSpeed: 2.0,
          ringSpeed: 2.5,
          particleSpeed: 2.0,
          glowIntensity: 0.85,
          colorShift: 'var(--h-warning)',
          specialEffects: ['instability', 'radiation-spike'],
        },
        error: {
          coreScale: [0.88, 0.98],
          coreSpeed: 0.4,
          ringSpeed: 0.3,
          particleSpeed: 0.2,
          glowIntensity: 0.6,
          colorShift: 'var(--h-error)',
          specialEffects: ['collapse-contain', 'hawking-radiation'],
        },
        offline: {
          coreScale: [0.95, 1.0],
          coreSpeed: 0.1,
          ringSpeed: 0.1,
          particleSpeed: 0.05,
          glowIntensity: 0.1,
          colorShift: 'var(--h-text-dim)',
          specialEffects: ['dormant'],
        },
      },
    },
  },
  {
    id: 'nebula',
    name: 'NEBULA',
    description: 'Stellar nursery - volumetric cloud with ionization fronts',
    preview: 'radial-gradient(ellipse at center, #d4a5ff 0%, #a855f7 40%, transparent 80%)',
    config: {
      coreGeometry: 'icosahedron',
      rings: [
        {
          count: 5,
          radiusRange: [1.0, 3.0],
          speedRange: [0.08, 0.25],
          thicknessRange: [0.02, 0.06],
          opacityRange: [0.05, 0.2],
          colorStops: ['var(--h-holo-ring-1)', 'var(--h-holo-ring-2)', 'var(--h-holo-ring-3)', 'var(--h-holo-ring-1)', 'var(--h-holo-ring-2)'],
        },
        {
          count: 3,
          radiusRange: [3.2, 4.5],
          speedRange: [0.03, 0.1],
          thicknessRange: [0.01, 0.04],
          opacityRange: [0.03, 0.12],
          colorStops: ['var(--h-holo-ring-2)', 'var(--h-holo-ring-3)', 'var(--h-holo-ring-1)'],
        },
      ],
      particles: {
        count: 500,
        sizeRange: [0.008, 0.05],
        speedRange: [0.1, 0.6],
        lifeRange: [3, 8],
        colorPalette: ['var(--h-holo-particle)', 'var(--h-holo-ring-1)', 'var(--h-holo-ring-2)', 'var(--h-holo-ring-3)', 'var(--h-accent)'],
        behavior: 'reactive',
      },
      shaders: {
        vertex: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          varying float vNoise;
          uniform float uTime;
          uniform float uIntensity;

          // Simplex noise for volumetric effect
          float snoise(vec3 v) {
            // Simplified noise
            return fract(sin(dot(v, vec3(12.9898, 78.233, 45.164))) * 43758.5453);
          }

          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = (modelMatrix * vec4(position, 1.0)).xyz;

            vNoise = snoise(vPosition * 2.0 + uTime * 0.1 * uIntensity);

            float displacement = vNoise * 0.15 * uIntensity;
            vec3 pos = position + normal * displacement;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragment: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          varying float vNoise;
          uniform float uTime;
          uniform float uIntensity;
          uniform vec3 uCoreColor;
          uniform vec3 uGlowColor;
          uniform vec3 uCloudColor1;
          uniform vec3 uCloudColor2;

          void main() {
            float fresnel = pow(1.0 - abs(dot(vNormal, normalize(vPosition))), 1.5);

            // Volumetric cloud layers
            float cloud1 = smoothstep(0.3, 0.7, vNoise + sin(uTime * 0.2 + vPosition.y) * 0.3);
            float cloud2 = smoothstep(0.4, 0.8, vNoise * 1.5 + cos(uTime * 0.15 - vPosition.z) * 0.2);

            vec3 cloudColor = mix(uCloudColor1, uCloudColor2, cloud2);
            vec3 color = mix(uCoreColor, cloudColor, (cloud1 + cloud2) * 0.5 * uIntensity);
            color = mix(color, uGlowColor, fresnel * uIntensity * 0.8);

            float alpha = (0.15 + 0.6 * (cloud1 + cloud2) * 0.5 + fresnel * 0.4) * uIntensity;

            gl_FragColor = vec4(color, alpha);
          }
        `,
        uniforms: {
          uTime: 0,
          uIntensity: 0.4,
          uCoreColor: [0.05, 0.02, 0.1],
          uGlowColor: [0.83, 0.65, 1.0],
          uCloudColor1: [0.5, 0.2, 0.8],
          uCloudColor2: [0.83, 0.65, 1.0],
        },
      },
      animations: {
        idle: {
          coreScale: [0.97, 1.03],
          coreSpeed: 0.15,
          ringSpeed: 0.6,
          particleSpeed: 0.7,
          glowIntensity: 0.35,
          colorShift: 'var(--h-holo-core)',
        },
        listening: {
          coreScale: [1.0, 1.2],
          coreSpeed: 0.8,
          ringSpeed: 1.5,
          particleSpeed: 2.0,
          glowIntensity: 0.8,
          colorShift: 'var(--h-holo-ring-1)',
          specialEffects: ['ionization-front', 'particle-ionize'],
        },
        thinking: {
          coreScale: [0.95, 1.1],
          coreSpeed: 0.5,
          ringSpeed: 1.2,
          particleSpeed: 1.8,
          glowIntensity: 0.6,
          colorShift: 'var(--h-holo-ring-2)',
          specialEffects: ['magnetic-reconnection', 'plasma-structure'],
        },
        speaking: {
          coreScale: [0.9, 1.25],
          coreSpeed: 1.5,
          ringSpeed: 1.0,
          particleSpeed: 2.2,
          glowIntensity: 0.9,
          colorShift: 'var(--h-holo-ring-1)',
          specialEffects: ['sound-propagation', 'shockwave'],
        },
        executing: {
          coreScale: [1.0, 1.15],
          coreSpeed: 1.0,
          ringSpeed: 1.8,
          particleSpeed: 1.5,
          glowIntensity: 0.8,
          colorShift: 'var(--h-holo-ring-2)',
          specialEffects: ['stellar-wind', 'energy-channel'],
        },
        success: {
          coreScale: [1.0, 1.35],
          coreSpeed: 0.3,
          ringSpeed: 0.4,
          particleSpeed: 0.3,
          glowIntensity: 1.0,
          colorShift: 'var(--h-success)',
          specialEffects: ['supernova-bloom', 'element-synthesis'],
        },
        warning: {
          coreScale: [0.93, 1.1],
          coreSpeed: 1.5,
          ringSpeed: 1.8,
          particleSpeed: 2.0,
          glowIntensity: 0.85,
          colorShift: 'var(--h-warning)',
          specialEffects: ['flare-activity', 'magnetic-storm'],
        },
        error: {
          coreScale: [0.85, 0.95],
          coreSpeed: 0.2,
          ringSpeed: 0.2,
          particleSpeed: 0.15,
          glowIntensity: 0.5,
          colorShift: 'var(--h-error)',
          specialEffects: ['gravitational-collapse', 'dark-matter'],
        },
        offline: {
          coreScale: [0.95, 1.0],
          coreSpeed: 0.08,
          ringSpeed: 0.1,
          particleSpeed: 0.05,
          glowIntensity: 0.1,
          colorShift: 'var(--h-text-dim)',
          specialEffects: ['cold-dark-cloud'],
        },
      },
    },
  },
  {
    id: 'prism',
    name: 'PRISM',
    description: 'Crystalline lattice - geometric precision with chromatic dispersion',
    preview: 'conic-gradient(from 0deg at center, #e0b0ff, #b366ff, #f5d6ff, #e0b0ff)',
    config: {
      coreGeometry: 'icosahedron',
      rings: [
        {
          count: 6,
          radiusRange: [1.1, 2.8],
          speedRange: [0.2, 0.6],
          thicknessRange: [0.005, 0.015],
          opacityRange: [0.15, 0.4],
          colorStops: ['var(--h-holo-ring-1)', 'var(--h-holo-ring-2)', 'var(--h-holo-ring-3)', 'var(--h-holo-accent)', 'var(--h-holo-ring-2)', 'var(--h-holo-ring-1)'],
        },
        {
          count: 12,
          radiusRange: [1.0, 3.0],
          speedRange: [0.1, 0.3],
          thicknessRange: [0.003, 0.01],
          opacityRange: [0.08, 0.2],
          colorStops: ['var(--h-holo-ring-3)'],
        },
      ],
      particles: {
        count: 200,
        sizeRange: [0.006, 0.03],
        speedRange: [0.3, 1.2],
        lifeRange: [1.5, 4],
        colorPalette: ['var(--h-holo-particle)', 'var(--h-holo-ring-1)', 'var(--h-holo-ring-2)', 'var(--h-holo-ring-3)', 'var(--h-accent)'],
        behavior: 'orbit',
      },
      shaders: {
        vertex: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          varying vec3 vWorldPos;
          varying float vFacet;
          uniform float uTime;
          uniform float uIntensity;

          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
            vWorldPos = vPosition;

            // Faceted look for crystalline appearance
            vFacet = floor(length(vPosition * 5.0)) / 5.0;

            // Breathing animation
            float breathe = sin(uTime * 0.4 * uIntensity) * 0.05 + 1.0;
            vec3 pos = position * breathe;

            // Subtle rotation on each axis
            float rx = uTime * 0.05 * uIntensity;
            float ry = uTime * 0.08 * uIntensity;
            float rz = uTime * 0.03 * uIntensity;

            mat3 rotX = mat3(1, 0, 0, 0, cos(rx), -sin(rx), 0, sin(rx), cos(rx));
            mat3 rotY = mat3(cos(ry), 0, sin(ry), 0, 1, 0, -sin(ry), 0, cos(ry));
            mat3 rotZ = mat3(cos(rz), -sin(rz), 0, sin(rz), cos(rz), 0, 0, 0, 1);

            pos = rotZ * rotY * rotX * pos;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragment: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          varying vec3 vWorldPos;
          varying float vFacet;
          uniform float uTime;
          uniform float uIntensity;
          uniform vec3 uCoreColor;
          uniform vec3 uGlowColor;
          uniform vec3 uPrismColor1;
          uniform vec3 uPrismColor2;
          uniform vec3 uPrismColor3;

          void main() {
            float fresnel = pow(1.0 - abs(dot(vNormal, normalize(vPosition))), 4.0);

            // Chromatic dispersion based on view angle
            float dispersion = fract(vWorldPos.x * 3.0 + vWorldPos.y * 2.0 + vWorldPos.z * 4.0 + uTime * 0.1);
            vec3 prismColor = mix(
              mix(uPrismColor1, uPrismColor2, dispersion),
              uPrismColor3,
              smoothstep(0.3, 0.7, dispersion)
            );

            // Faceted shading
            float facetShade = sin(vFacet * 20.0 + uTime * 2.0) * 0.1 + 0.9;

            vec3 color = mix(uCoreColor, prismColor, uIntensity * 0.7) * facetShade;
            color = mix(color, uGlowColor, fresnel * uIntensity);

            float alpha = (0.25 + 0.5 * uIntensity + fresnel * 0.6) * facetShade;

            gl_FragColor = vec4(color, alpha);
          }
        `,
        uniforms: {
          uTime: 0,
          uIntensity: 0.4,
          uCoreColor: [1.0, 1.0, 1.0],
          uGlowColor: [0.88, 0.69, 1.0],
          uPrismColor1: [0.88, 0.69, 1.0],
          uPrismColor2: [0.7, 0.4, 1.0],
          uPrismColor3: [0.96, 0.84, 1.0],
        },
      },
      animations: {
        idle: {
          coreScale: [0.99, 1.01],
          coreSpeed: 0.25,
          ringSpeed: 1.0,
          particleSpeed: 1.0,
          glowIntensity: 0.3,
          colorShift: 'var(--h-holo-core)',
        },
        listening: {
          coreScale: [1.0, 1.12],
          coreSpeed: 1.2,
          ringSpeed: 2.0,
          particleSpeed: 2.5,
          glowIntensity: 0.8,
          colorShift: 'var(--h-holo-ring-1)',
          specialEffects: ['refraction-shift', 'facet-highlight'],
        },
        thinking: {
          coreScale: [0.98, 1.05],
          coreSpeed: 0.7,
          ringSpeed: 2.5,
          particleSpeed: 1.8,
          glowIntensity: 0.65,
          colorShift: 'var(--h-holo-ring-2)',
          specialEffects: ['lattice-compute', 'fracture-lines'],
        },
        speaking: {
          coreScale: [0.95, 1.18],
          coreSpeed: 2.0,
          ringSpeed: 1.5,
          particleSpeed: 2.0,
          glowIntensity: 0.9,
          colorShift: 'var(--h-holo-ring-1)',
          specialEffects: ['resonance-modes', 'harmonic-split'],
        },
        executing: {
          coreScale: [1.0, 1.1],
          coreSpeed: 1.5,
          ringSpeed: 2.2,
          particleSpeed: 2.0,
          glowIntensity: 0.85,
          colorShift: 'var(--h-holo-ring-2)',
          specialEffects: ['beam-emission', 'coherent-pulse'],
        },
        success: {
          coreScale: [1.0, 1.2],
          coreSpeed: 0.4,
          ringSpeed: 0.5,
          particleSpeed: 0.4,
          glowIntensity: 1.0,
          colorShift: 'var(--h-success)',
          specialEffects: ['perfect-alignment', 'rainbow-burst'],
        },
        warning: {
          coreScale: [0.95, 1.08],
          coreSpeed: 1.8,
          ringSpeed: 2.0,
          particleSpeed: 1.8,
          glowIntensity: 0.85,
          colorShift: 'var(--h-warning)',
          specialEffects: ['stress-fracture', 'amber-shift'],
        },
        error: {
          coreScale: [0.9, 0.98],
          coreSpeed: 0.5,
          ringSpeed: 0.3,
          particleSpeed: 0.2,
          glowIntensity: 0.6,
          colorShift: 'var(--h-error)',
          specialEffects: ['shatter-contain', 'red-shift'],
        },
        offline: {
          coreScale: [0.98, 1.0],
          coreSpeed: 0.12,
          ringSpeed: 0.15,
          particleSpeed: 0.08,
          glowIntensity: 0.12,
          colorShift: 'var(--h-text-dim)',
          specialEffects: ['dormant-crystal'],
        },
      },
    },
  },
];

export function getHologramPreset(id: string): HologramPreset | undefined {
  return hologramPresets.find(p => p.id === id);
}

export function getCurrentHologramPreset(): HologramPreset {
  const stored = localStorage.getItem('hercules-hologram');
  if (stored) {
    const preset = getHologramPreset(stored);
    if (preset) return preset;
  }
  return hologramPresets[0];
}

export function applyHologramPreset(preset: HologramPreset): void {
  localStorage.setItem('hercules-hologram', preset.id);
}