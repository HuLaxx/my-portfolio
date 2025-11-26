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
  const particlesRef = useRef(null);
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
    displacementStrength: 1.2
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
          displacementStrength: 1.2
        };
        break;
      case 'autumn': // Deep Amber Sunset
        props = {
          color: 0xff6600,
          emissive: 0xff4400,
          emissiveIntensity: 0.4,
          metalness: 0.8,
          roughness: 0.2,
          transmission: 0.2,
          thickness: 2,
          ior: 1.5,
          noiseScale: 0.3,
          noiseSpeed: 0.6,
          displacementStrength: 1.5
        };
        break;
      case 'spring': // Floral Bloom
        props = {
          color: 0xff69b4,
          emissive: 0xc71585,
          emissiveIntensity: 0.3,
          metalness: 0.1,
          roughness: 0.4,
          transmission: 0.6,
          thickness: 3,
          ior: 1.45,
          noiseScale: 0.6,
          noiseSpeed: 0.8,
          displacementStrength: 1.0
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
          displacementStrength: 1.2
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
    const geometry = new THREE.IcosahedronGeometry(6, performanceMode ? 8 : 12);
    const originalPositions = geometry.attributes.position.array.slice();

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
      opacity: 1.0
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
    }

    dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    dustGeometry.setAttribute('size', new THREE.BufferAttribute(dustSizes, 1));

    const dustMaterial = new THREE.PointsMaterial({
      color: targetPropsRef.current.color,
      size: 0.2, // Base size, modulated by attribute
      transparent: true,
      opacity: 0.0, // Start invisible
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      depthWrite: false,
    });

    // Custom shader or onBeforeCompile could be used for per-particle sizing, 
    // but for simplicity/performance we'll stick to standard PointsMaterial 
    // and just rely on the 'size' attribute if we were using a ShaderMaterial.
    // Standard PointsMaterial doesn't support 'size' attribute out of the box easily without modification.
    // So we will use a slightly modified approach: update the geometry positions and just let them be uniform size 
    // OR use a simple ShaderMaterial. Let's stick to standard PointsMaterial for stability, 
    // but we can simulate "different sizes" by actually just having them be small dots.
    // WAIT: User specifically asked for "different sizes". 
    // Let's use a simple ShaderMaterial for the dust to support 'attribute float size'.

    const dustShaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(targetPropsRef.current.color) },
        opacity: { value: 0.0 }
      },
      vertexShader: `
            attribute float size;
            varying float vOpacity;
            void main() {
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                gl_PointSize = size * (300.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
      fragmentShader: `
            uniform vec3 color;
            uniform float opacity;
            void main() {
                if (opacity <= 0.01) discard;
                vec2 coord = gl_PointCoord - vec2(0.5);
                if(length(coord) > 0.5) discard; // Circular particle
                gl_FragColor = vec4(color, opacity);
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

    const baseParticleColor = targetPropsRef.current.particleColor || targetPropsRef.current.color;

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

      particleColors[i * 3] = baseParticleColor.r;
      particleColors[i * 3 + 1] = baseParticleColor.g;
      particleColors[i * 3 + 2] = baseParticleColor.b;

      // Random sizes for background stardust
      particleSizes[i] = Math.random() * 0.4 + 0.1;

      particleBlinkOffsets[i] = Math.random() * Math.PI * 2;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositionsArray, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));

    // Shader for Background Particles (Supports vertex colors + variable size)
    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        globalOpacity: { value: 0.8 }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float globalOpacity;
        varying vec3 vColor;
        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          if(length(coord) > 0.5) discard; // Circular
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
      scrollY = window.scrollY / (document.body.scrollHeight - window.innerHeight);
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

    const animate = () => {
      const time = clock.getElapsedTime();
      const delta = 0.02;
      frameCount++;

      // --- Smooth Transition Logic ---
      const target = targetPropsRef.current;
      material.color.lerp(target.color, delta);
      material.emissive.lerp(target.emissive, delta);

      // Update Dust Color
      dustShaderMaterial.uniforms.color.value.lerp(target.color, delta);

      material.emissiveIntensity += (target.emissiveIntensity - material.emissiveIntensity) * delta;
      material.metalness += (target.metalness - material.metalness) * delta;
      material.roughness += (target.roughness - material.roughness) * delta;
      material.transmission += (target.transmission - material.transmission) * delta;
      material.thickness += (target.thickness - material.thickness) * delta;
      material.ior += (target.ior - material.ior) * delta;

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
        const scrollProgress = scrollY;

        // FADE LOGIC:
        let crystalOpacity = 1.0;
        let dustOpacity = 0.0;

        if (scrollProgress > 0.05) {
          const fadeProgress = Math.min((scrollProgress - 0.05) / 0.2, 1.0);
          crystalOpacity = 1.0 - fadeProgress;
          dustOpacity = fadeProgress;
        }

        material.opacity = crystalOpacity;
        dustShaderMaterial.uniforms.opacity.value = dustOpacity;

        // Explosion Logic
        const explosionStrength = Math.max(0, (scrollProgress - 0.05) * 30.0);

        for (let i = 0; i < count; i++) {
          const ox = originalPositions[i * 3];
          const oy = originalPositions[i * 3 + 1];
          const oz = originalPositions[i * 3 + 2];

          // 1. Calculate Base Deformation
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

          // Deformed position
          let px = ox + nx * deformation;
          let py = oy + ny * deformation;
          let pz = oz + nz * deformation;

          // DISINTEGRATION EFFECT ON SCROLL (Gaps/Strings for Crystal)
          if (scrollProgress > 0.001) {
            const progress = Math.min((scrollProgress - 0.001) / 0.9, 1.0);
            const ease = Math.pow(progress, 1.5);

            const noiseVal = simplex.noise(
              originalPositions[i * 3] * 0.5,
              originalPositions[i * 3 + 1] * 0.5,
              originalPositions[i * 3 + 2] * 0.5
            );

            const gapFactor = (noiseVal + 1) * 0.5;
            const distance = ease * 25.0;
            const disperseStrength = distance * (gapFactor + 0.2);

            const seed = i;
            const randX = ((seed * 12.9898) % 1);
            const randY = ((seed * 78.233) % 1);
            const randZ = ((seed * 45.164) % 1);

            // Apply to Solid Crystal (Restore Gaps/Strings)
            const dx = (randX - 0.5) * disperseStrength;
            const dy = (randY - 0.5) * disperseStrength;
            const dz = (randZ - 0.5) * disperseStrength;

            px += dx;
            py += dy;
            pz += dz;

            if (ease > 0.1) {
              const floatStrength = ease * 1.5;
              const floatX = Math.sin(time * 0.5 + originalPositions[i * 3]) * floatStrength;
              const floatY = Math.cos(time * 0.3 + originalPositions[i * 3 + 1]) * floatStrength;
              const floatZ = Math.sin(time * 0.4 + originalPositions[i * 3 + 2]) * floatStrength;

              px += floatX;
              py += floatY;
              pz += floatZ;
            }
          }

          // 2. Apply to Solid Crystal
          positions.setXYZ(i, px, py, pz);

          // 3. Apply to Dust (ADD EXPLOSION)
          if (dustOpacity > 0.01) {
            const rx = dustRandoms[i * 3];
            const ry = dustRandoms[i * 3 + 1];
            const rz = dustRandoms[i * 3 + 2];

            const moveX = rx * explosionStrength;
            const moveY = ry * explosionStrength;
            const moveZ = rz * explosionStrength;

            const floatX = Math.sin(time * 0.5 + i) * 0.5;
            const floatY = Math.cos(time * 0.3 + i) * 0.5;
            const floatZ = Math.sin(time * 0.4 + i) * 0.5;

            dPositions.setXYZ(i, px + moveX + floatX, py + moveY + floatY, pz + moveZ + floatZ);
          } else {
            dPositions.setXYZ(i, px, py, pz);
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

          if (updateColors) {
            const blink = Math.sin(time * 3.0 + particleBlinkOffsets[i]);
            const brightness = 0.4 + (blink * 0.5 + 0.5) * 0.6;
            const r = THREE.MathUtils.lerp(pColors.getX(i), target.color.r * brightness, delta);
            const g = THREE.MathUtils.lerp(pColors.getY(i), target.color.g * brightness, delta);
            const b = THREE.MathUtils.lerp(pColors.getZ(i), target.color.b * brightness, delta);
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

        const targetZ = 25 - scrollProgress * 14 + Math.sin(scrollProgress * Math.PI) * 5;
        camera.position.z += (targetZ - camera.position.z) * 0.08;

        // Scaling
        const pulseScale = 1 + Math.sin(time * 2) * 0.05;
        const scrollScale = 1 + scrollProgress * 0.5;
        let responsiveScale = 1.0;
        if (window.innerWidth < 768) responsiveScale = 0.6;
        else if (window.innerWidth < 1024) responsiveScale = 0.8;

        const targetScale = pulseScale * scrollScale * responsiveScale;

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
