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

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const performanceMode = prefersReducedMotion || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2);

    // Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 25);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
      stencil: false,
      depth: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    mount.appendChild(renderer.domElement);

    // Lighting - High Contrast Studio Setup
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

    // The "Digital Soul" - A high-res morphing sphere
    const geometry = new THREE.IcosahedronGeometry(6, performanceMode ? 10 : 20); // High detail for smooth deformation
    const originalPositions = geometry.attributes.position.array.slice(); // Store original positions

    // Material Configuration per Season
    const getMaterial = (s) => {
      const common = {
        envMapIntensity: 1.5,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
      };

      switch (s) {
        case 'summer': // Radiant Plasma
          return new THREE.MeshPhysicalMaterial({
            ...common,
            color: 0xff8800,
            emissive: 0xff4400,
            emissiveIntensity: 0.4,
            metalness: 0.2,
            roughness: 0.2,
            transmission: 0.2,
            thickness: 2,
          });
        case 'autumn': // Deep Amber Sunset
          return new THREE.MeshPhysicalMaterial({
            ...common,
            color: 0xff6600, // Vibrant Deep Orange
            metalness: 0.8,
            roughness: 0.2, // Smooth and shiny
            emissive: 0xff4400, // Warm Glow
            emissiveIntensity: 0.4,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
          });
        case 'spring': // Floral Bloom (Soft, Organic)
          return new THREE.MeshPhysicalMaterial({
            ...common,
            color: 0xffb7c5, // Cherry Blossom Pink
            emissive: 0xff69b4,
            emissiveIntensity: 0.2,
            metalness: 0.1,
            roughness: 0.4, // Softer, petal-like
            transmission: 0.6, // Semi-translucent
            thickness: 3,
            ior: 1.45,
          });
        case 'winter': // Frozen Ice (Lighter)
          return new THREE.MeshPhysicalMaterial({
            ...common,
            color: 0xaaddff, // Pale Icy Blue (lighter)
            metalness: 0.1,
            roughness: 0.05, // Smooth ice
            transmission: 1.0, // Fully transparent ice/glass
            thickness: 8,
            ior: 1.31, // Ice IOR
            dispersion: 0.2, // Chromatic effect
          });
        case 'rainy': // Refractive Water
          return new THREE.MeshPhysicalMaterial({
            ...common,
            color: 0x88ccff,
            metalness: 0.1,
            roughness: 0.05,
            transmission: 1.0, // Glass
            thickness: 5,
            ior: 1.33,
          });
        default:
          return new THREE.MeshPhysicalMaterial(common);
      }
    };

    const material = getMaterial(season);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Noise Generator
    const simplex = new SimplexNoise();

    // Interaction State
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
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

    // Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();

      if (!performanceMode) {
        // 1. Morphing Logic
        const positions = mesh.geometry.attributes.position;
        const count = positions.count;

        // Season-specific deformation parameters
        let noiseScale, noiseSpeed, displacementStrength;

        switch (season) {
          case 'summer': // Fast, bubbling
            noiseScale = 0.4;
            noiseSpeed = 1.5;
            displacementStrength = 1.2;
            break;
          case 'autumn': // Slow, flowing liquid
            noiseScale = 0.3;
            noiseSpeed = 0.6;
            displacementStrength = 1.5;
            break;
          case 'spring': // Gentle, blooming
            noiseScale = 0.6;
            noiseSpeed = 0.8;
            displacementStrength = 1.0;
            break;
          case 'rainy': // Ripples
            noiseScale = 0.8;
            noiseSpeed = 1.0;
            displacementStrength = 0.8;
            break;
          case 'winter': // Now using Rainy settings (Ripples)
            noiseScale = 0.8;
            noiseSpeed = 1.0;
            displacementStrength = 0.8;
            break;
          default:
            noiseScale = 0.5;
            noiseSpeed = 1.0;
            displacementStrength = 1.0;
        }

        for (let i = 0; i < count; i++) {
          const ox = originalPositions[i * 3];
          const oy = originalPositions[i * 3 + 1];
          const oz = originalPositions[i * 3 + 2];

          // Calculate noise value
          const n = simplex.noise(
            ox * noiseScale + time * noiseSpeed * 0.2,
            oy * noiseScale + time * noiseSpeed * 0.3,
            oz * noiseScale + time * noiseSpeed * 0.2
          );

          let deformation = n * displacementStrength;
          let px = ox, py = oy, pz = oz;

          // Season-specific shape modifications
          if (season === 'winter') {
            // Winter now uses the EXACT Rainy logic (Ripples/Water)
            // Medium frequency ripple noise
            deformation = n * displacementStrength;

            const len = Math.sqrt(ox * ox + oy * oy + oz * oz);
            const nx = ox / len;
            const ny = oy / len;
            const nz = oz / len;

            px = ox + nx * deformation;
            py = oy + ny * deformation;
            pz = oz + nz * deformation;
          } else if (season === 'spring') {
            // Floral Bloom Logic
            const petal = Math.sin(ox * 0.5 + time) * Math.cos(oy * 0.5 + time);
            deformation = (n + petal * 0.5) * displacementStrength;

            const len = Math.sqrt(ox * ox + oy * oy + oz * oz);
            const nx = ox / len;
            const ny = oy / len;
            const nz = oz / len;

            px = ox + nx * deformation;
            py = oy + ny * deformation;
            pz = oz + nz * deformation;
          } else {
            // Standard spherical deformation for others
            const len = Math.sqrt(ox * ox + oy * oy + oz * oz);
            const nx = ox / len;
            const ny = oy / len;
            const nz = oz / len;

            px = ox + nx * deformation;
            py = oy + ny * deformation;
            pz = oz + nz * deformation;
          }

          // DISINTEGRATION EFFECT ON SCROLL (Optimized)
          const scrollProgress = scrollY;

          if (scrollProgress > 0.1) {
            // Calculate dispersion strength (starts at 10% scroll for early effect)
            const disperseFactor = (scrollProgress - 0.1) / 0.9; // 0 to 1 range

            // Simplified random offset (less calculations)
            // Use vertex index for consistent randomness without expensive trig in loop
            const seed = i;
            const randX = ((seed * 12.9898) % 1);
            const randY = ((seed * 78.233) % 1);
            const randZ = ((seed * 45.164) % 1);

            // Disperse vertices outward with randomness
            const disperseStrength = disperseFactor * disperseFactor * 12; // Quadratic easing
            px += (randX - 0.5) * disperseStrength;
            py += (randY - 0.5) * disperseStrength;
            pz += (randZ - 0.5) * disperseStrength;
          }

          positions.setXYZ(i, px, py, pz);
        }

        mesh.geometry.attributes.position.needsUpdate = true;
        mesh.geometry.computeVertexNormals(); // Essential for lighting updates

        // 2. Smooth Cursor Parallax Movement
        const targetX = mouseX * 3; // Horizontal parallax
        const targetY = mouseY * 3; // Vertical parallax

        // Smooth position interpolation
        mesh.position.x += (targetX - mesh.position.x) * 0.05;
        mesh.position.y += (targetY - mesh.position.y) * 0.05;

        // 3. Smooth Rotation with Cursor
        targetRotationY = mouseX * 0.3 + time * 0.15;
        targetRotationX = mouseY * 0.3;

        // Smooth interpolation
        mesh.rotation.y += (targetRotationY - mesh.rotation.y) * 0.05;
        mesh.rotation.x += (targetRotationX - mesh.rotation.x) * 0.05;

        // 4. Advanced Cinematic Scroll Effects
        const scrollProgress = scrollY;

        // Wave-like floating motion on scroll
        const waveY = Math.sin(scrollProgress * Math.PI * 2 + time * 0.5) * 2;
        const waveX = Math.cos(scrollProgress * Math.PI * 1.5 + time * 0.3) * 1.5;

        // Combine cursor parallax with scroll wave
        const finalTargetX = mouseX * 3 + waveX;
        const finalTargetY = mouseY * 3 + waveY - scrollProgress * 8; // Move up/down

        mesh.position.x += (finalTargetX - mesh.position.x) * 0.05;
        mesh.position.y += (finalTargetY - mesh.position.y) * 0.05;

        // Dynamic depth - crystal moves in Z-axis with easing
        const targetZ = 25 - scrollProgress * 20 + Math.sin(scrollProgress * Math.PI) * 5;
        camera.position.z += (targetZ - camera.position.z) * 0.08;

        // Dynamic scale with pulse effect
        const pulseScale = 1 + Math.sin(time * 2) * 0.05; // Gentle breathing
        const scrollScale = 1 + scrollProgress * 0.5; // Grows on scroll
        const targetScale = pulseScale * scrollScale;

        mesh.scale.x += (targetScale - mesh.scale.x) * 0.05;
        mesh.scale.y += (targetScale - mesh.scale.y) * 0.05;
        mesh.scale.z += (targetScale - mesh.scale.z) * 0.05;

        // Multi-axis cinematic rotation on scroll
        mesh.rotation.z += scrollProgress * 0.002; // Gentle Z tumble
        mesh.rotation.x += Math.sin(scrollProgress * Math.PI) * 0.001; // X wave
        mesh.rotation.y += time * 0.05; // Continuous Y spin

        // Opacity fade effect at extreme scroll
        if (scrollProgress > 0.8) {
          renderer.domElement.style.opacity = Math.max(0.3, 1 - (scrollProgress - 0.8) * 2);
        } else {
          renderer.domElement.style.opacity = 1;
        }
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      // Cleanup
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (mount) mount.innerHTML = '';
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, [season]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1, opacity: 1, transition: 'opacity 1s ease' }}
    />
  );
};
