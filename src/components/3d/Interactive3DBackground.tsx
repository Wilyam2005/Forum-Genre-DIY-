import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ecc } from '../../utils/eccOptimizer';

interface Interactive3DBackgroundProps {
  className?: string;
}

/**
 * Interactive 3D Background Canvas
 * Renders an expansive, aesthetic 3D world:
 * - Fluid undulating 3D particle wave terrain (Genre Blue & Amber)
 * - Drifting interactive 3D geometric crystals & orbital rings
 * - Mouse-reactive physics & inertia ripples
 * - Tailored for high performance, zero clutter, and flawless contrast on light theme
 */
export const Interactive3DBackground: React.FC<Interactive3DBackgroundProps> = ({
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xF8FAFC, 0.04);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 5, 14);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(ecc.getClampedDPR());
    container.appendChild(renderer.domElement);

    const geometriesToDispose: THREE.BufferGeometry[] = [];
    const materialsToDispose: THREE.Material[] = [];

    // --- 1. Interactive 3D Wave Particle Grid (Terrain of Youth Energy) ---
    const GRID_X = 55;
    const GRID_Z = 45;
    const SEPARATION = 0.55;
    const numPoints = GRID_X * GRID_Z;

    const positions = new Float32Array(numPoints * 3);
    const colors = new Float32Array(numPoints * 3);
    const initialY = new Float32Array(numPoints);

    // Color tones: Soft Genre Royal Blue (0.15, 0.39, 0.92) & Radiant Amber (0.96, 0.62, 0.04)
    const colorBlue = new THREE.Color(0x3B82F6);
    const colorAmber = new THREE.Color(0xF59E0B);
    const colorSky = new THREE.Color(0x008DD3);

    let idx = 0;
    for (let ix = 0; ix < GRID_X; ix++) {
      for (let iz = 0; iz < GRID_Z; iz++) {
        const posX = (ix - GRID_X / 2) * SEPARATION;
        const posZ = (iz - GRID_Z / 2) * SEPARATION - 1;
        const posY = -1.5;

        positions[idx * 3] = posX;
        positions[idx * 3 + 1] = posY;
        positions[idx * 3 + 2] = posZ;

        initialY[idx] = posY;

        // Gradient color across wave
        const ratio = (ix / GRID_X + iz / GRID_Z) * 0.5;
        const mixedColor = ratio > 0.6 ? colorAmber : (ratio > 0.3 ? colorBlue : colorSky);
        colors[idx * 3] = mixedColor.r;
        colors[idx * 3 + 1] = mixedColor.g;
        colors[idx * 3 + 2] = mixedColor.b;

        idx++;
      }
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometriesToDispose.push(particleGeo);

    // Particle Texture circle
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        ctx.arc(32, 32, 28, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }
      return new THREE.CanvasTexture(canvas);
    };

    const particleTex = createCircleTexture();

    const particleMat = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      map: particleTex,
      transparent: true,
      opacity: 0.65,
      alphaTest: 0.01,
      blending: THREE.NormalBlending,
    });
    materialsToDispose.push(particleMat);

    const particleField = new THREE.Points(particleGeo, particleMat);
    scene.add(particleField);

    // --- 2. Floating 3D Floating Geometric Elements (Light, Elegant Crystals & Rings) ---
    const floatingGroup = new THREE.Group();
    scene.add(floatingGroup);

    // Floating Ring 1 (Gold/Amber)
    const ringGeo = new THREE.TorusGeometry(2.8, 0.02, 16, 80);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xF59E0B,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.set(4, 2, -3);
    ringMesh.rotation.x = Math.PI / 3;
    floatingGroup.add(ringMesh);
    geometriesToDispose.push(ringGeo);
    materialsToDispose.push(ringMat);

    // Floating Ring 2 (Sky Blue)
    const ringGeo2 = new THREE.TorusGeometry(2.2, 0.015, 16, 70);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x008DD3,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.position.set(-4.5, 1.5, -4);
    ringMesh2.rotation.y = Math.PI / 4;
    floatingGroup.add(ringMesh2);
    geometriesToDispose.push(ringGeo2);
    materialsToDispose.push(ringMat2);

    // Floating Icosahedrons (Subtle wireframe crystals)
    const crystals: THREE.Mesh[] = [];
    const crystalGeo = new THREE.IcosahedronGeometry(0.7, 0);
    geometriesToDispose.push(crystalGeo);

    const crystalMatBlue = new THREE.MeshBasicMaterial({
      color: 0x008DD3,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    materialsToDispose.push(crystalMatBlue);

    const crystalMatAmber = new THREE.MeshBasicMaterial({
      color: 0xD97706,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    materialsToDispose.push(crystalMatAmber);

    const crystalCoords = [
      { x: -5, y: 3, z: -2, mat: crystalMatBlue, rotSpeed: 0.008 },
      { x: 5.5, y: -0.5, z: -1, mat: crystalMatAmber, rotSpeed: -0.007 },
      { x: -2.5, y: 3.5, z: -5, mat: crystalMatAmber, rotSpeed: 0.005 },
      { x: 3, y: 4, z: -6, mat: crystalMatBlue, rotSpeed: -0.006 },
    ];

    crystalCoords.forEach((c) => {
      const mesh = new THREE.Mesh(crystalGeo, c.mat);
      mesh.position.set(c.x, c.y, c.z);
      (mesh as any).rotSpeed = c.rotSpeed;
      floatingGroup.add(mesh);
      crystals.push(mesh);
    });

    // --- Interactive Mouse & Motion State ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      // Calculate normalized coords (-1 to 1)
      mouse.targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.targetY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });

    // Window Resize Handler
    const onResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(ecc.getClampedDPR());
    };

    window.addEventListener('resize', onResize);

    // --- Animation Frame Loop ---
    let frameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // Camera parallax tilt
      camera.position.x = mouse.x * 1.5;
      camera.position.y = 5 + mouse.y * 1.0;
      camera.lookAt(0, 0, 0);

      // 1. Waveform vertex animation on points
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      let pIdx = 0;
      for (let ix = 0; ix < GRID_X; ix++) {
        for (let iz = 0; iz < GRID_Z; iz++) {
          const x = (ix - GRID_X / 2) * SEPARATION;
          const z = (iz - GRID_Z / 2) * SEPARATION - 1;

          // Multi-frequency organic sine wave + mouse disturbance
          const distToMouse = Math.sqrt(
            Math.pow(x - mouse.x * 6, 2) + Math.pow(z - mouse.y * 4, 2)
          );
          const mouseWave = Math.sin(distToMouse * 2.5 - elapsedTime * 3.5) * Math.exp(-distToMouse * 0.3) * 0.45;

          const wave =
            Math.sin(ix * 0.25 + elapsedTime * 1.8) * 0.45 +
            Math.cos(iz * 0.3 + elapsedTime * 1.5) * 0.35 +
            mouseWave;

          posArray[pIdx * 3 + 1] = initialY[pIdx] + wave;
          pIdx++;
        }
      }
      posAttr.needsUpdate = true;

      // 2. Rotate crystals & rings
      ringMesh.rotation.z += 0.003;
      ringMesh.rotation.y += 0.002;
      ringMesh2.rotation.z -= 0.003;

      crystals.forEach((crystal) => {
        const speed = (crystal as any).rotSpeed || 0.005;
        crystal.rotation.x += speed;
        crystal.rotation.y += speed * 1.2;
      });

      floatingGroup.rotation.y = mouse.x * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('resize', onResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      geometriesToDispose.forEach((g) => g.dispose());
      materialsToDispose.forEach((m) => m.dispose());
      particleTex.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
      aria-hidden="true"
    />
  );
};
