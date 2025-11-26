'use client';

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useSeason } from "./SeasonContext";

// Minimal Simplex Noise implementation for organic deformation
class SimplexNoise {
  constructor() {
    this.grad3 = [
      [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
      [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
      [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]
    ];
    this.p = [];
    for (let i = 0; i < 256; i++) {
      this.p[i] = Math.floor(Math.random() * 256);
    }
    this.perm = [];
    for (let i = 0; i < 512; i++) {
      this.perm[i] = this.p[i & 255];
    }
  }

  dot(g, x, y, z) {
    return g[0] * x + g[1] * y + g[2] * z;
  }

  noise(xin, yin, zin) {
    let n0, n1, n2, n3;
    const F3 = 1.0 / 3.0;
    const s = (xin + yin + zin) * F3;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    const k = Math.floor(zin + s);
    const G3 = 1.0 / 6.0;
    const t = (i + j + k) * G3;
    const X0 = i - t;
    const Y0 = j - t;
    const Z0 = k - t;
    const x0 = xin - X0;
    const y0 = yin - Y0;
    const z0 = zin - Z0;
    let i1, j1, k1;
    let i2, j2, k2;
    if (x0 >= y0) {
      if (y0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
      else if (x0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1; }
      else { i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1; }
    } else {
      if (y0 < z0) { i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1; }
      else if (x0 < z0) { i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1; }
      else { i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
    }
    const x1 = x0 - i1 + G3;
    const y1 = y0 - j1 + G3;
    const z1 = z0 - k1 + G3;
    const x2 = x0 - i2 + 2.0 * G3;
    const y2 = y0 - j2 + 2.0 * G3;
    const z2 = z0 - k2 + 2.0 * G3;
    const x3 = x0 - 1.0 + 3.0 * G3;
    const y3 = y0 - 1.0 + 3.0 * G3;
    const z3 = z0 - 1.0 + 3.0 * G3;
    const ii = i & 255;
    const jj = j & 255;
    const kk = k & 255;
    const gi0 = this.perm[ii + this.perm[jj + this.perm[kk]]] % 12;
    const gi1 = this.perm[ii + i1 + this.perm[jj + j1 + this.perm[kk + k1]]] % 12;
    const gi2 = this.perm[ii + i2 + this.perm[jj + j2 + this.perm[kk + k2]]] % 12;
    const gi3 = this.perm[ii + 1 + this.perm[jj + 1 + this.perm[kk + 1]]] % 12;
    let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
    if (t0 < 0) n0 = 0.0;
    else {
      t0 *= t0;
      n0 = t0 * t0 * this.dot(this.grad3[gi0], x0, y0, z0);
    }
    let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
    if (t1 < 0) n1 = 0.0;
    else {
      t1 *= t1;
      n1 = t1 * t1 * this.dot(this.grad3[gi1], x1, y1, z1);
    }
    let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
    if (t2 < 0) n2 = 0.0;
    else {
      t2 *= t2;
      n2 = t2 * t2 * this.dot(this.grad3[gi2], x2, y2, z2);
    }
    let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
    if (t3 < 0) n3 = 0.0;
    else {
      t3 *= t3;
      n3 = t3 * t3 * this.dot(this.grad3[gi3], x3, y3, z3);
    }
    return 32.0 * (n0 + n1 + n2 + n3);
  }
}

export const ThreeBackground = () => {
  const mountRef = useRef(null);
  const { season } = useSeason();

  // Refs to store objects for updates
  const sceneRef = useRef(null);
  const materialRef = useRef(null);
  const geometryRef = useRef(null); // Added geometryRef
  const particlesRef = useRef(null);
  const particleTargetColorsRef = useRef(null); // NEW: Store target colors for particles
  const targetPropsRef = useRef({
    color: new THREE.Color(0xff8800),
    emissive: new THREE.Color(0xff4400),
    emissiveIntensity: 0.4,
    metalness: 0.2,
    roughness: 0.2,
    transmission: 0.2,
    thickness: 2,
    ior: 1.5,
    noiseScale: 0.4,
    noiseSpeed: 1.5,
    displacementStrength: 1.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1
  });

  // Update target properties when season changes
  useEffect(() => {
    const common = {
      envMapIntensity: 1.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    };

    let props = {};

    switch (season) {
      case 'summer': // Radiant Plasma
        props = {
          color: 0xff8800,
          emissive: 0xff4400,
          emissiveIntensity: 0.4,
          metalness: 0.2,
          roughness: 0.2,
          transmission: 0.2,
          thickness: 2,
          ior: 1.5,
          noiseScale: 0.4,
          noiseSpeed: 1.5,
          displacementStrength: 1.2,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1
        };
        break;
      case 'autumn': // Deep Amber Sunset (Rugged/Dry Leaf)
        props = {
          color: 0xc26a1b, // warm leaf amber
          emissive: 0x5a2a10, // ember veins
          emissiveIntensity: 0.3,
          metalness: 0.08, // matte leaf surface
          roughness: 0.68, // textured like foliage
          transmission: 0.26, // subtle translucency through the leaf
          thickness: 2.8,
          ior: 1.35,
          noiseScale: 1.1, // more organic lobes
          noiseSpeed: 0.6, // calm drift
          displacementStrength: 1.4,
          clearcoat: 0.12,
          clearcoatRoughness: 0.9
        };
        break;
      case 'spring': // Floral Bloom (Soft/Pastel)
        props = {
          color: 0xff1493, // Deep Pink
          emissive: 0xff007f, // Bright Pink
          emissiveIntensity: 0.6,
          metalness: 0.1,
          roughness: 0.4, // Soft luster
          transmission: 0.8, // Translucent/Jelly-like
          thickness: 3,
          ior: 1.2,
          noiseScale: 1.5, // Higher scale for more "petals" (Sakura shape)
          noiseSpeed: 0.6,
          displacementStrength: 1.8, // Stronger distortion for petal definition
          clearcoat: 1.0,
          clearcoatRoughness: 0.1
        };
        break;
      case 'winter': // Frozen Ice
        props = {
          color: 0x88ccff, // Stronger blue
          emissive: 0x002244, // Deep blue glow
          emissiveIntensity: 0.6, // Stronger glow
          metalness: 0.8, // Metallic ice
          roughness: 0.1, // Shiny
          transmission: 0.2, // More solid
          thickness: 4,
          ior: 1.5,
          noiseScale: 0.8,
          noiseSpeed: 0.4, // Slower movement
          displacementStrength: 1.2,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1
        };
        break;
      case 'rainy': // Refractive Water
        props = {
          color: 0x88ccff,
          emissive: 0x000000,
          emissiveIntensity: 0.1,
          metalness: 0.1,
          roughness: 0.05,
          transmission: 1.0,
          thickness: 5,
          ior: 1.33,
          noiseScale: 0.8,
          noiseSpeed: 1.0,
          displacementStrength: 0.8
        };
        break;
      default:
        props = {
          color: 0xff8800,
          emissive: 0xff4400,
          emissiveIntensity: 0.4,
          metalness: 0.2,
          roughness: 0.2,
          transmission: 0.2,
          thickness: 2,
          ior: 1.5,
          noiseScale: 0.5,
          noiseSpeed: 1.0,
          displacementStrength: 1.0
        };
    }

    // Update target ref
    targetPropsRef.current = {
      ...targetPropsRef.current,
      ...props,
      color: new THREE.Color(props.color),
      emissive: new THREE.Color(props.emissive)
    };

    // Update Vertex Colors for Autumn
    if (geometryRef.current) {
      const colors = geometryRef.current.attributes.color;
      if (colors) {
        const count = colors.count;
        const color = new THREE.Color();

        for (let i = 0; i < count; i++) {
          if (season === 'autumn') {
            // Autumn Palette: Red, Orange, Gold, Brown + Darker Shades
            const palette = [
              0xff0000, 0xffaa00, 0xff8800, 0x8b4513, // Standard
              0x3e2723, 0x4a0404, 0x2d1b0e // Darker shades (Dark Brown, Deep Red)
            ];
            const randomColor = palette[Math.floor(Math.random() * palette.length)];
            color.setHex(randomColor);
            // Add some variation
            color.offsetHSL(0, 0, (Math.random() - 0.5) * 0.1);
          } else {
            // Reset to white (so material color takes over)
            color.setHex(0xffffff);
          }
          colors.setXYZ(i, color.r, color.g, color.b);
        }
        colors.needsUpdate = true;
      }
    }

    // Update Background Particle Target Colors
    if (particleTargetColorsRef.current) {
      const count = particleTargetColorsRef.current.length / 3;
      const color = new THREE.Color();

      for (let i = 0; i < count; i++) {
        if (season === 'autumn') {
          const palette = [
            0xff0000, 0xffaa00, 0xff8800, 0x8b4513,
            0x3e2723, 0x4a0404, 0x2d1b0e
          ];
          const randomColor = palette[Math.floor(Math.random() * palette.length)];
          color.setHex(randomColor);
          color.offsetHSL(0, 0, (Math.random() - 0.5) * 0.1);
        } else {
          // Use main color but vary lightness
          color.set(props.color);
          color.offsetHSL(0, 0, (Math.random() - 0.5) * 0.2);
        }

        particleTargetColorsRef.current[i * 3] = color.r;
        particleTargetColorsRef.current[i * 3 + 1] = color.g;
        particleTargetColorsRef.current[i * 3 + 2] = color.b;
      }
    }

  }, [season]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const performanceMode = prefersReducedMotion || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2);

    // Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 25);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
      stencil: false,
      depth: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    mount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.0);
    mainLight.position.set(10, 10, 10);
    scene.add(mainLight);

    const rimLight = new THREE.SpotLight(0xffffff, 5.0);
    rimLight.position.set(-10, 5, -5);
    rimLight.lookAt(0, 0, 0);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0xffffff, 1.0);
    fillLight.position.set(0, -10, 5);
    scene.add(fillLight);

    // --- The "Digital Soul" (Solid Crystal) ---
    // Use Non-Indexed geometry to allow faces to separate (crack open)
    const baseGeometry = new THREE.IcosahedronGeometry(6, performanceMode ? 8 : 12);
    const geometry = baseGeometry.toNonIndexed();
    const originalPositions = geometry.attributes.position.array.slice();

    // Initialize vertex colors
    const count = geometry.attributes.position.count;
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      if (season === 'autumn') {
        const palette = [
          0xff0000, 0xffaa00, 0xff8800, 0x8b4513, // Standard
          0x3e2723, 0x4a0404, 0x2d1b0e // Darker shades
        ];
        const randomColor = palette[Math.floor(Math.random() * palette.length)];
        color.setHex(randomColor);
        color.offsetHSL(0, 0, (Math.random() - 0.5) * 0.1);
      } else {
        color.setHex(0xffffff);
      }
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometryRef.current = geometry;

    // Material for Solid Crystal
    const material = new THREE.MeshPhysicalMaterial({
      envMapIntensity: 1.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      color: targetPropsRef.current.color,
      emissive: targetPropsRef.current.emissive,
      emissiveIntensity: targetPropsRef.current.emissiveIntensity,
      metalness: targetPropsRef.current.metalness,
      roughness: targetPropsRef.current.roughness,
      transmission: targetPropsRef.current.transmission,
      thickness: targetPropsRef.current.thickness,
      ior: targetPropsRef.current.ior,
      transparent: true, // Enable transparency for fade-out
      opacity: 1.0,
      vertexColors: true // Enable vertex colors
    });
    materialRef.current = material;

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // --- "Stardust" System (Exploding Particles) ---
    const dustGeometry = new THREE.BufferGeometry();
    const dustCount = originalPositions.length / 3;
    const dustPositions = new Float32Array(dustCount * 3);
    const dustSizes = new Float32Array(dustCount);
    const dustRandoms = new Float32Array(dustCount * 3); // For random explosion direction
    const dustColors = new Float32Array(dustCount * 3);
    const dustRotations = new Float32Array(dustCount); // Initial rotation

    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = originalPositions[i * 3];
      dustPositions[i * 3 + 1] = originalPositions[i * 3 + 1];
      dustPositions[i * 3 + 2] = originalPositions[i * 3 + 2];

      // Random sizes for "different sizes" requirement
      dustSizes[i] = Math.random() * 0.3 + 0.05;

      // Pre-calculate random explosion vectors
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      dustRandoms[i * 3] = Math.sin(phi) * Math.cos(theta);
      dustRandoms[i * 3 + 1] = Math.sin(phi) * Math.sin(theta);
      dustRandoms[i * 3 + 2] = Math.cos(phi);

      // Copy colors from crystal geometry (first vertex of the face)
      dustColors[i * 3] = colors[i * 3 * 3];
      dustColors[i * 3 + 1] = colors[i * 3 * 3 + 1];
      dustColors[i * 3 + 2] = colors[i * 3 * 3 + 2];

      dustRotations[i] = Math.random() * Math.PI * 2;
    }

    dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    dustGeometry.setAttribute('size', new THREE.BufferAttribute(dustSizes, 1));
    dustGeometry.setAttribute('color', new THREE.BufferAttribute(dustColors, 3));
    dustGeometry.setAttribute('rotation', new THREE.BufferAttribute(dustRotations, 1));

    const dustShaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        opacity: { value: 0.0 },
        time: { value: 0.0 }
      },
      vertexShader: `
            attribute float size;
            attribute vec3 color;
            attribute float rotation;
            varying vec3 vColor;
            varying float vRotation;
            void main() {
                vColor = color;
                vRotation = rotation;
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                gl_PointSize = size * (300.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
      fragmentShader: `
            uniform float opacity;
            uniform float time;
            varying vec3 vColor;
            varying float vRotation;
            
            void main() {
                if (opacity <= 0.01) discard;
                
                vec2 uv = gl_PointCoord - 0.5;
                
                // Rotate
                float angle = vRotation + time * 2.0;
                float c = cos(angle);
                float s = sin(angle);
                vec2 p = vec2(uv.x * c - uv.y * s, uv.x * s + uv.y * c);
                
                // Triangle SDF
                p.y += 0.1;
                float r = 0.4;
                vec2 q = vec2(abs(p.x), p.y);
                float d = max(q.x * 0.866025 + p.y * 0.5, -p.y * 0.5) - r * 0.5;
                
                if (d > 0.0) discard;

                gl_FragColor = vec4(vColor, opacity);
            }
        `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const dustPoints = new THREE.Points(dustGeometry, dustShaderMaterial);
    scene.add(dustPoints);


    // --- Ambient Background Particles (Floating dots) ---
    const particleCount = 1200;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositionsArray = new Float32Array(particleCount * 3);
    const particleOriginalPositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount); // NEW: Sizes
    const particleBlinkOffsets = new Float32Array(particleCount);
    const particleRotations = new Float32Array(particleCount);

    // Initialize target colors ref
    particleTargetColorsRef.current = new Float32Array(particleCount * 3);

    // Reuse palette logic for background particles
    const getPaletteColor = () => {
      if (season === 'autumn') {
        const palette = [
          0xff0000, 0xffaa00, 0xff8800, 0x8b4513,
          0x3e2723, 0x4a0404, 0x2d1b0e
        ];
        const c = new THREE.Color(palette[Math.floor(Math.random() * palette.length)]);
        c.offsetHSL(0, 0, (Math.random() - 0.5) * 0.1);
        return c;
      } else {
        // For other seasons, use the main color but vary lightness
        const c = new THREE.Color(targetPropsRef.current.color);
        c.offsetHSL(0, 0, (Math.random() - 0.5) * 0.2);
        return c;
      }
    };

    for (let i = 0; i < particleCount; i++) {
      const r = 15 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      particlePositionsArray[i * 3] = x;
      particlePositionsArray[i * 3 + 1] = y;
      particlePositionsArray[i * 3 + 2] = z;

      particleOriginalPositions[i * 3] = x;
      particleOriginalPositions[i * 3 + 1] = y;
      particleOriginalPositions[i * 3 + 2] = z;

      const pColor = getPaletteColor();
      particleColors[i * 3] = pColor.r;
      particleColors[i * 3 + 1] = pColor.g;
      particleColors[i * 3 + 2] = pColor.b;

      // Also set initial target
      particleTargetColorsRef.current[i * 3] = pColor.r;
      particleTargetColorsRef.current[i * 3 + 1] = pColor.g;
      particleTargetColorsRef.current[i * 3 + 2] = pColor.b;

      // Random sizes for background stardust
      particleSizes[i] = Math.random() * 0.4 + 0.1;

      particleBlinkOffsets[i] = Math.random() * Math.PI * 2;
      particleRotations[i] = Math.random() * Math.PI * 2;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositionsArray, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
    particleGeometry.setAttribute('rotation', new THREE.BufferAttribute(particleRotations, 1));

    // Shader for Background Particles (Supports vertex colors + variable size)
    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        globalOpacity: { value: 0.8 },
        time: { value: 0.0 }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        attribute float rotation;
        varying vec3 vColor;
        varying float vRotation;
        void main() {
          vColor = color;
          vRotation = rotation;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float globalOpacity;
        uniform float time;
        varying vec3 vColor;
        varying float vRotation;
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          
          // Rotate
          float angle = vRotation + time * 0.5; // Slower rotation for background
          float c = cos(angle);
          float s = sin(angle);
          vec2 p = vec2(uv.x * c - uv.y * s, uv.x * s + uv.y * c);
          
          // Triangle SDF
          p.y += 0.1;
          float r = 0.4;
          vec2 q = vec2(abs(p.x), p.y);
          float d = max(q.x * 0.866025 + p.y * 0.5, -p.y * 0.5) - r * 0.5;
          
          if (d > 0.0) discard;

          gl_FragColor = vec4(vColor, globalOpacity);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    particlesRef.current = particleMaterial;

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const simplex = new SimplexNoise();

    let mouseX = 0;
    let mouseY = 0;
    let scrollY = 0;

    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onScroll = () => {
      const scrollableHeight = document.body.scrollHeight - window.innerHeight;
      scrollY = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const clock = new THREE.Clock();
    const currentProps = { ...targetPropsRef.current };
    const tempVector = new THREE.Vector3();
    const cursorPosCache = new THREE.Vector3(0, 0, 0);
    let frameCount = 0;

    // Random scale factors for crystal faces
    const faceRandomScales = new Float32Array(count / 3);
    for (let i = 0; i < count / 3; i++) {
      faceRandomScales[i] = 0.5 + Math.random() * 1.0; // 0.5 to 1.5
    }

    const animate = () => {
      const time = clock.getElapsedTime();
      const delta = 0.02;
      frameCount++;
      if (frameCount % 100 === 0) console.log("ThreeBackground: Animate running", frameCount);

      // --- Smooth Transition Logic ---
      const target = targetPropsRef.current;
      material.color.lerp(target.color, delta);
      material.emissive.lerp(target.emissive, delta);

      // Update Dust Color (Vertex colors handle the main color, but we can tint or just update time)
      dustShaderMaterial.uniforms.time.value = time;
      particleMaterial.uniforms.time.value = time;

      material.emissiveIntensity += (target.emissiveIntensity - material.emissiveIntensity) * delta;
      material.metalness += (target.metalness - material.metalness) * delta;
      material.roughness += (target.roughness - material.roughness) * delta;
      material.transmission += (target.transmission - material.transmission) * delta;
      material.thickness += (target.thickness - material.thickness) * delta;
      material.ior += (target.ior - material.ior) * delta;
      material.clearcoat += (target.clearcoat - material.clearcoat) * delta;
      material.clearcoatRoughness += (target.clearcoatRoughness - material.clearcoatRoughness) * delta;

      currentProps.noiseScale += (target.noiseScale - currentProps.noiseScale) * delta;
      currentProps.noiseSpeed += (target.noiseSpeed - currentProps.noiseSpeed) * delta;
      currentProps.displacementStrength += (target.displacementStrength - currentProps.displacementStrength) * delta;

      if (!performanceMode) {
        // Cursor interaction
        tempVector.set(mouseX, mouseY, 0.5);
        tempVector.unproject(camera);
        tempVector.sub(camera.position).normalize();
        const distance = -camera.position.z / tempVector.z;
        cursorPosCache.copy(camera.position).add(tempVector.multiplyScalar(distance));

        // --- Deform Crystal & Dust ---
        const positions = mesh.geometry.attributes.position;
        const dPositions = dustGeometry.attributes.position;
        const count = positions.count;

        // Calculate scroll-based disintegration factors
        const scrollProgress = Number.isFinite(scrollY) ? scrollY : 0;

        // --- 3-PHASE DISINTEGRATION LOGIC ---
        // Phase 1: Stress & Cracking (0% - 40%)
        // Phase 2: Shattering & Transition (40% - 60%)
        // Phase 3: Dissipation (60% - 100%)

        let crystalOpacity = 1.0;
        let dustOpacity = 0.0;
        let gapStrength = 0.0;
        let explosionStrength = 0.0;

        if (scrollProgress < 0.4) {
          // Phase 1: Slow Cracking
          // Gap increases slowly from 0 to 20.0 (Increased from 8.0)
          const phase1Progress = scrollProgress / 0.4;
          gapStrength = Math.pow(phase1Progress, 2) * 20.0;
          crystalOpacity = 1.0;
          dustOpacity = 0.0;
        } else if (scrollProgress < 0.7) {
          // Phase 2: Shattering
          gapStrength = 20.0 + (scrollProgress - 0.4) * 60.0; // Widen aggressively

          // Fade Crystal Out (0.4 -> 0.55)
          const fadeOutProgress = Math.min((scrollProgress - 0.4) / 0.15, 1.0);
          crystalOpacity = 1.0 - fadeOutProgress;

          // Fade Dust In (0.4 -> 0.5)
          const fadeInProgress = Math.min((scrollProgress - 0.4) / 0.1, 1.0);
          dustOpacity = fadeInProgress;

          // Start Explosion
          explosionStrength = (scrollProgress - 0.4) * 80.0; // Much stronger explosion
        } else {
          // Phase 3: Dissipation
          gapStrength = 40.0; // Max gap
          crystalOpacity = 0.0;

          // Fade Dust Out (0.7 -> 1.0)
          const dustFadeOut = (scrollProgress - 0.7) / 0.3;
          dustOpacity = Math.max(1.0 - dustFadeOut, 0.0);

          // Continue Explosion drift
          explosionStrength = 24.0 + (scrollProgress - 0.7) * 40.0;
        }

        material.opacity = crystalOpacity;
        dustShaderMaterial.uniforms.opacity.value = dustOpacity;

        // Iterate by 3 (Face-based manipulation)
        for (let i = 0; i < count; i += 3) {
          // Get original positions for the face (3 vertices)
          const ox1 = originalPositions[i * 3];
          const oy1 = originalPositions[i * 3 + 1];
          const oz1 = originalPositions[i * 3 + 2];

          const ox2 = originalPositions[(i + 1) * 3];
          const oy2 = originalPositions[(i + 1) * 3 + 1];
          const oz2 = originalPositions[(i + 1) * 3 + 2];

          const ox3 = originalPositions[(i + 2) * 3];
          const oy3 = originalPositions[(i + 2) * 3 + 1];
          const oz3 = originalPositions[(i + 2) * 3 + 2];

          // 1. Calculate Base Deformation (Breathing) PER VERTEX
          const applyBaseDeformation = (ox, oy, oz) => {
            const n = simplex.noise(
              ox * currentProps.noiseScale + time * currentProps.noiseSpeed * 0.2,
              oy * currentProps.noiseScale + time * currentProps.noiseSpeed * 0.3,
              oz * currentProps.noiseScale + time * currentProps.noiseSpeed * 0.2
            );
            const deformation = n * currentProps.displacementStrength;
            const len = Math.sqrt(ox * ox + oy * oy + oz * oz);
            const nx = ox / len;
            const ny = oy / len;
            const nz = oz / len;
            return {
              x: ox + nx * deformation,
              y: oy + ny * deformation,
              z: oz + nz * deformation
            };
          };

          const p1 = applyBaseDeformation(ox1, oy1, oz1);
          const p2 = applyBaseDeformation(ox2, oy2, oz2);
          const p3 = applyBaseDeformation(ox3, oy3, oz3);

          // 2. Apply Cracking/Gap Effect (Phase 1 & 2)
          // Calculate Centroid of the DEFORMED face
          const cx = (p1.x + p2.x + p3.x) / 3;
          const cy = (p1.y + p2.y + p3.y) / 3;
          const cz = (p1.z + p2.z + p3.z) / 3;

          let faceScale = 1.0;
          let moveX = 0, moveY = 0, moveZ = 0;

          if (gapStrength > 0.01) {
            const progress = Math.min(scrollProgress / 0.6, 1.0);

            // Noise for cracking pattern
            const origCx = (ox1 + ox2 + ox3) / 3;
            const origCy = (oy1 + oy2 + oy3) / 3;
            const origCz = (oz1 + oz2 + oz3) / 3;

            const crackNoise = simplex.noise(origCx * 0.5, origCy * 0.5, origCz * 0.5);
            const gapFactor = (crackNoise + 1) * 0.5;
            const disperse = gapStrength * gapFactor;

            // Calculate face normal for direction
            const len = Math.sqrt(cx * cx + cy * cy + cz * cz);
            const nx = cx / len;
            const ny = cy / len;
            const nz = cz / len;

            moveX = nx * disperse;
            moveY = ny * disperse;
            moveZ = nz * disperse;

            // Randomize face scale slightly for broken look
            const randomScale = faceRandomScales[i / 3];
            faceScale = Math.max(1.0 - (gapStrength * 0.015), 0.1) * randomScale;
          }

          // 3. Apply Final Positions
          const applyFinal = (idx, p) => {
            const vx = p.x - cx;
            const vy = p.y - cy;
            const vz = p.z - cz;

            const px = cx + moveX + vx * faceScale;
            const py = cy + moveY + vy * faceScale;
            const pz = cz + moveZ + vz * faceScale;

            positions.setXYZ(idx, px, py, pz);
            return { x: px, y: py, z: pz };
          };

          const v1 = applyFinal(i, p1);
          const v2 = applyFinal(i + 1, p2);
          const v3 = applyFinal(i + 2, p3);

          // 4. Apply to Dust
          if (dustOpacity > 0.01) {
            const applyDust = (idx, p) => {
              const rx = dustRandoms[idx * 3];
              const ry = dustRandoms[idx * 3 + 1];
              const rz = dustRandoms[idx * 3 + 2];

              const mX = rx * explosionStrength;
              const mY = ry * explosionStrength;
              const mZ = rz * explosionStrength;

              const fX = Math.sin(time * 0.5 + idx) * 0.5;
              const fY = Math.cos(time * 0.3 + idx) * 0.5;
              const fZ = Math.sin(time * 0.4 + idx) * 0.5;

              dPositions.setXYZ(idx, p.x + mX + fX, p.y + mY + fY, p.z + mZ + fZ);
            };

            applyDust(i, v1);
            applyDust(i + 1, v2);
            applyDust(i + 2, v3);
          } else {
            dPositions.setXYZ(i, v1.x, v1.y, v1.z);
            dPositions.setXYZ(i + 1, v2.x, v2.y, v2.z);
            dPositions.setXYZ(i + 2, v3.x, v3.y, v3.z);
          }
        }


        mesh.geometry.attributes.position.needsUpdate = true;
        mesh.geometry.computeVertexNormals();
        dustGeometry.attributes.position.needsUpdate = true;

        // --- Update Ambient Background Particles ---
        const pPositions = particles.geometry.attributes.position;
        const pColors = particles.geometry.attributes.color;
        const updateColors = frameCount % 3 === 0;

        for (let i = 0; i < particleCount; i++) {
          const ox = particleOriginalPositions[i * 3];
          const oy = particleOriginalPositions[i * 3 + 1];
          const oz = particleOriginalPositions[i * 3 + 2];

          let px, py, pz;

          // Ambient Float
          const floatSpeed = 0.2;
          const floatX = Math.sin(time * floatSpeed + ox) * 0.5;
          const floatY = Math.cos(time * floatSpeed + oy) * 0.5;
          const floatZ = Math.sin(time * floatSpeed + oz) * 0.5;

          px = ox + floatX;
          py = oy + floatY;
          pz = oz + floatZ;

          // Scroll dispersion for background particles
          if (scrollY > 0.001) {
            const progress = Math.min((scrollY - 0.001) / 0.9, 1.0);
            const ease = Math.pow(progress, 1.5);
            const disperseFactor = ease * 20.0;

            const currentLenSq = px * px + py * py + pz * pz;
            const currentLen = Math.sqrt(currentLenSq);

            if (currentLen > 0.001) {
              px += (px / currentLen) * disperseFactor;
              py += (py / currentLen) * disperseFactor;
              pz += (pz / currentLen) * disperseFactor;
            }
          }

          pPositions.setXYZ(i, px, py, pz);

          if (updateColors && particleTargetColorsRef.current) {
            const blink = Math.sin(time * 3.0 + particleBlinkOffsets[i]);
            const brightness = 0.4 + (blink * 0.5 + 0.5) * 0.6;

            const tr = particleTargetColorsRef.current[i * 3];
            const tg = particleTargetColorsRef.current[i * 3 + 1];
            const tb = particleTargetColorsRef.current[i * 3 + 2];

            const r = THREE.MathUtils.lerp(pColors.getX(i), tr * brightness, delta);
            const g = THREE.MathUtils.lerp(pColors.getY(i), tg * brightness, delta);
            const b = THREE.MathUtils.lerp(pColors.getZ(i), tb * brightness, delta);
            pColors.setXYZ(i, r, g, b);
          }
        }
        pPositions.needsUpdate = true;
        if (updateColors) pColors.needsUpdate = true;

        // --- Global Rotation & Movement ---
        const rotX = Math.sin(time * 0.2) * 0.1;
        const rotY = time * 0.1;

        mesh.rotation.x = rotX;
        mesh.rotation.y = rotY;
        dustPoints.rotation.x = rotX;
        dustPoints.rotation.y = rotY;

        // Scroll-based movement (Wave)
        const waveY = Math.sin(scrollProgress * Math.PI * 2 + time * 0.5) * 2;
        const waveX = Math.cos(scrollProgress * Math.PI * 1.5 + time * 0.3) * 1.5;

        const targetPosX = waveX * 0.05;
        const targetPosY = (waveY - scrollProgress * 8) * 0.05;

        mesh.position.x += (targetPosX - mesh.position.x) * 0.1;
        mesh.position.y += (targetPosY - mesh.position.y) * 0.1;

        dustPoints.position.copy(mesh.position);

        // Reduced zoom effect (was 5, now 2)
        const targetZ = 25 - scrollProgress * 2;
        camera.position.z += (targetZ - camera.position.z) * 0.08;

        // Scaling
        const pulseScale = 1 + Math.sin(time * 2) * 0.05;
        // Removed scrollScale to prevent "just zooming" effect
        let responsiveScale = 1.0;
        if (window.innerWidth < 768) responsiveScale = 0.6;
        else if (window.innerWidth < 1024) responsiveScale = 0.8;

        const targetScale = pulseScale * responsiveScale;

        mesh.scale.setScalar(targetScale);
        dustPoints.scale.setScalar(targetScale);

        // Extra rotation on scroll
        mesh.rotation.z += scrollProgress * 0.002;
        dustPoints.rotation.z += scrollProgress * 0.002;
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      dustGeometry.dispose();
      dustShaderMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      if (mount) mount.innerHTML = '';
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1, opacity: 1, transition: 'opacity 1s ease' }}
    />
  );
};
