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
          color: 0xaaddff,
          emissive: 0x000000, // No emissive for ice usually, or very faint
          emissiveIntensity: 0.1,
          metalness: 0.1,
          roughness: 0.05,
          transmission: 1.0,
          thickness: 8,
          ior: 1.31,
          noiseScale: 0.8,
          noiseSpeed: 1.0,
          displacementStrength: 0.8
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
      antialias: false, // OPTIMIZATION: Disabled antialias
      powerPreference: "high-performance",
      stencil: false,
      depth: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // OPTIMIZATION: Cap pixelRatio at 1.5
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

    // The "Digital Soul"
    const geometry = new THREE.IcosahedronGeometry(6, performanceMode ? 8 : 12); // OPTIMIZATION: Reduced detail from 20 to 12
    const originalPositions = geometry.attributes.position.array.slice();

    // Initial Material
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
      ior: targetPropsRef.current.ior
    });
    materialRef.current = material;

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Ambient Particle System
    const particleCount = 1600; // OPTIMIZATION: Reduced from 2100 to 1600
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositionsArray = new Float32Array(particleCount * 3);
    const particleOriginalPositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
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

      particleBlinkOffsets[i] = Math.random() * Math.PI * 2;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositionsArray, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      vertexColors: true,
      size: 0.2, // Increased from 0.15 for better visibility
      transparent: true,
      opacity: 0.75, // Increased from 0.6
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
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

    // Current animation state for smooth transitions
    const currentProps = { ...targetPropsRef.current };

    const animate = () => {
      const time = clock.getElapsedTime();
      const delta = 0.02; // Slower lerp for smoother transitions

      // SMOOTH TRANSITION LOGIC
      const target = targetPropsRef.current;

      // Lerp Colors
      material.color.lerp(target.color, delta);
      material.emissive.lerp(target.emissive, delta);

      // Lerp Numbers
      material.emissiveIntensity += (target.emissiveIntensity - material.emissiveIntensity) * delta;
      material.metalness += (target.metalness - material.metalness) * delta;
      material.roughness += (target.roughness - material.roughness) * delta;
      material.transmission += (target.transmission - material.transmission) * delta;
      material.thickness += (target.thickness - material.thickness) * delta;
      material.ior += (target.ior - material.ior) * delta;

      // Lerp Noise Params
      currentProps.noiseScale += (target.noiseScale - currentProps.noiseScale) * delta;
      currentProps.noiseSpeed += (target.noiseSpeed - currentProps.noiseSpeed) * delta;
      currentProps.displacementStrength += (target.displacementStrength - currentProps.displacementStrength) * delta;

      if (!performanceMode) {
        const vector = new THREE.Vector3(mouseX, mouseY, 0.5);
        vector.unproject(camera);
        const dir = vector.sub(camera.position).normalize();
        const distance = -camera.position.z / dir.z;
        const cursorPos = camera.position.clone().add(dir.multiplyScalar(distance));

        const positions = mesh.geometry.attributes.position;
        const count = positions.count;

        for (let i = 0; i < count; i++) {
          const ox = originalPositions[i * 3];
          const oy = originalPositions[i * 3 + 1];
          const oz = originalPositions[i * 3 + 2];

          const n = simplex.noise(
            ox * currentProps.noiseScale + time * currentProps.noiseSpeed * 0.2,
            oy * currentProps.noiseScale + time * currentProps.noiseSpeed * 0.3,
            oz * currentProps.noiseScale + time * currentProps.noiseSpeed * 0.2
          );

          let deformation = n * currentProps.displacementStrength;
          let px = ox, py = oy, pz = oz;

          // Apply deformation (simplified for smooth transition, using generic spherical + noise)
          // We can't easily switch logic branches (if/else) smoothly, so we stick to a versatile noise deformation
          // that varies by parameters (scale/speed/strength)

          // Exception: Spring petal logic is distinct. We can blend it in?
          // For simplicity and smoothness, we'll stick to the noise deformation which looks great for all if tuned right.
          // If we really need the petal shape, we'd need a 'petalFactor' to lerp.
          // Let's stick to the high-quality noise deformation for now to ensure smoothness.

          const len = Math.sqrt(ox * ox + oy * oy + oz * oz);
          const nx = ox / len;
          const ny = oy / len;
          const nz = oz / len;

          px = ox + nx * deformation;
          py = oy + ny * deformation;
          pz = oz + nz * deformation;

          // DISINTEGRATION EFFECT ON SCROLL
          const scrollProgress = scrollY;

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

            px += (randX - 0.5) * disperseStrength;
            py += (randY - 0.5) * disperseStrength;
            pz += (randZ - 0.5) * disperseStrength;

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

          positions.setXYZ(i, px, py, pz);
        }

        mesh.geometry.attributes.position.needsUpdate = true;
        mesh.geometry.computeVertexNormals();

        // Update Ambient Particles
        const pPositions = particles.geometry.attributes.position;
        const pColors = particles.geometry.attributes.color;

        for (let i = 0; i < particleCount; i++) {
          const ox = particleOriginalPositions[i * 3];
          const oy = particleOriginalPositions[i * 3 + 1];
          const oz = particleOriginalPositions[i * 3 + 2];

          let px, py, pz;

          if (i % 25 === 0) { // Stream - Increased from every 50th to every 25th particle
            const speed = 0.12; // Slightly slower for smoother detachment
            const offset = i * 0.01;
            let t = (time * speed + offset) % 1;
            t = t * t * (3 - 2 * t); // Smooth hermite interpolation

            const len = Math.sqrt(ox * ox + oy * oy + oz * oz);
            const shellRadius = 8.0;
            let startScale = 1.0;
            if (len > 0.001) startScale = shellRadius / len;

            const startX = ox * startScale;
            const startY = oy * startScale;
            const startZ = oz * startScale;

            px = startX + (cursorPos.x - startX) * t;
            py = startY + (cursorPos.y - startY) * t;
            pz = startZ + (cursorPos.z - startZ) * t;

            const noiseAmp = 1.2 * Math.sin(t * Math.PI); // Reduced noise
            px += Math.sin(time * 2.0 + i) * noiseAmp;
            py += Math.cos(time * 1.5 + i) * noiseAmp;
            pz += Math.sin(time * 2.2 + i) * noiseAmp;

          } else { // Ambient
            const floatSpeed = 0.2;
            const floatX = Math.sin(time * floatSpeed + ox) * 0.5;
            const floatY = Math.cos(time * floatSpeed + oy) * 0.5;
            const floatZ = Math.sin(time * floatSpeed + oz) * 0.5;

            px = ox + floatX;
            py = oy + floatY;
            pz = oz + floatZ;

            const currentLen = Math.sqrt(px * px + py * py + pz * pz);
            const gapRadius = 5.5;
            const shellTarget = 8.0;

            if (currentLen < gapRadius && currentLen > 0.001) {
              const pushFactor = gapRadius / currentLen;
              px *= pushFactor;
              py *= pushFactor;
              pz *= pushFactor;
            } else if (currentLen < 20.0 && currentLen > gapRadius) {
              const distToShell = shellTarget - currentLen;
              const pullFactor = 0.05;
              const dirX = px / currentLen;
              const dirY = py / currentLen;
              const dirZ = pz / currentLen;
              px += dirX * distToShell * pullFactor;
              py += dirY * distToShell * pullFactor;
              pz += dirZ * distToShell * pullFactor;
            }

            if (scrollY > 0.001) {
              const progress = Math.min((scrollY - 0.001) / 0.9, 1.0);
              const ease = Math.pow(progress, 1.5);
              const seed = i;
              const rand = ((seed * 12.9898) % 1);
              const disperseFactor = ease * (10.0 + rand * 20.0);
              const len2 = Math.sqrt(px * px + py * py + pz * pz);
              const dx = px / len2;
              const dy = py / len2;
              const dz = pz / len2;
              px += dx * disperseFactor;
              py += dy * disperseFactor;
              pz += dz * disperseFactor;
            }
          }

          pPositions.setXYZ(i, px, py, pz);

          const blink = Math.sin(time * 3.0 + particleBlinkOffsets[i]);
          const brightness = 0.4 + (blink * 0.5 + 0.5) * 0.6;

          // Lerp particle colors too
          const r = THREE.MathUtils.lerp(pColors.getX(i), target.color.r * brightness, delta);
          const g = THREE.MathUtils.lerp(pColors.getY(i), target.color.g * brightness, delta);
          const b = THREE.MathUtils.lerp(pColors.getZ(i), target.color.b * brightness, delta);

          pColors.setXYZ(i, r, g, b);
        }
        pPositions.needsUpdate = true;
        pColors.needsUpdate = true;

        mesh.rotation.y = time * 0.1;
        mesh.rotation.x = Math.sin(time * 0.2) * 0.1;

        const scrollProgress = scrollY;
        const waveY = Math.sin(scrollProgress * Math.PI * 2 + time * 0.5) * 2;
        const waveX = Math.cos(scrollProgress * Math.PI * 1.5 + time * 0.3) * 1.5;

        mesh.position.x += (waveX - mesh.position.x) * 0.05;
        mesh.position.y += (waveY - scrollProgress * 8 - mesh.position.y) * 0.05;

        const targetZ = 25 - scrollProgress * 14 + Math.sin(scrollProgress * Math.PI) * 5;
        camera.position.z += (targetZ - camera.position.z) * 0.08;

        const pulseScale = 1 + Math.sin(time * 2) * 0.05;
        const scrollScale = 1 + scrollProgress * 0.5;

        // Responsive scaling logic
        let responsiveScale = 1.0;
        if (window.innerWidth < 768) {
          responsiveScale = 0.6;
        } else if (window.innerWidth < 1024) {
          responsiveScale = 0.8;
        }

        const targetScale = pulseScale * scrollScale * responsiveScale;

        mesh.scale.x += (targetScale - mesh.scale.x) * 0.05;
        mesh.scale.y += (targetScale - mesh.scale.y) * 0.05;
        mesh.scale.z += (targetScale - mesh.scale.z) * 0.05;

        mesh.rotation.z += scrollProgress * 0.002;
        mesh.rotation.x += Math.sin(scrollProgress * Math.PI) * 0.001;
        mesh.rotation.y += time * 0.05;

        if (scrollProgress > 0.8) {
          const opacity = Math.max(0.3, 1 - (scrollProgress - 0.8) * 2);
          renderer.domElement.style.opacity = opacity;
        } else {
          renderer.domElement.style.opacity = 1;
        }
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      if (mount) mount.innerHTML = '';
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []); // Run once!

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1, opacity: 1, transition: 'opacity 1s ease' }}
    />
  );
};
