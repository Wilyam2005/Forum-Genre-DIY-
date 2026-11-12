import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ecc } from '../../utils/eccOptimizer';

interface HeroCanvas3DProps {
  onInteractiveClick?: () => void;
}

/**
 * Professional, Minimalist, Proportional 3D Centerpiece
 * Stylized geometric representation of Tugu Yogyakarta & Youth Pillar
 * Clean satin brass, soft studio lighting, subtle inertia, zero clutter.
 */
export const HeroCanvas3D: React.FC<HeroCanvas3DProps> = ({ onInteractiveClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      36,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(ecc.getClampedDPR());
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // --- Professional Studio Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffaed, 2.0);
    keyLight.position.set(5, 8, 7);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe0f2fe, 1.0);
    fillLight.position.set(-6, -4, 5);
    scene.add(fillLight);

    // --- Elegant Stylized Geometric Centerpiece ---
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Subtle downward offset for clean visual alignment with typography
    rootGroup.position.set(0, -0.2, 0);

    const geometriesToDispose: THREE.BufferGeometry[] = [];
    const materialsToDispose: THREE.Material[] = [];

    // Satin Gold Material
    const goldMat = new THREE.MeshPhysicalMaterial({
      color: 0xD97706,
      metalness: 0.85,
      roughness: 0.28,
      clearcoat: 0.4,
      clearcoatRoughness: 0.2,
    });
    materialsToDispose.push(goldMat);

    // Deep Navy Ceramic Material
    const navyMat = new THREE.MeshPhysicalMaterial({
      color: 0x1E3A8A,
      metalness: 0.3,
      roughness: 0.25,
      clearcoat: 0.8,
    });
    materialsToDispose.push(navyMat);

    // 1. Subtle Outer Concentric Orbit Rings (Thin, elegant, architectural)
    const ringGeo1 = new THREE.TorusGeometry(3.2, 0.03, 16, 120);
    const ringMesh1 = new THREE.Mesh(ringGeo1, goldMat);
    ringMesh1.rotation.x = Math.PI / 2.3;
    rootGroup.add(ringMesh1);
    geometriesToDispose.push(ringGeo1);

    const ringGeo2 = new THREE.TorusGeometry(3.6, 0.02, 16, 120);
    const ringMesh2 = new THREE.Mesh(ringGeo2, navyMat);
    ringMesh2.rotation.y = Math.PI / 3;
    rootGroup.add(ringMesh2);
    geometriesToDispose.push(ringGeo2);

    // 2. Sculptural Center Core: Stylized Spire / Youth Monolith
    const spireGeo = new THREE.ConeGeometry(0.8, 2.6, 6);
    const spireMesh = new THREE.Mesh(spireGeo, goldMat);
    spireMesh.position.y = 0.5;
    rootGroup.add(spireMesh);
    geometriesToDispose.push(spireGeo);

    // 3. Middle Tier Pedestal
    const baseGeo = new THREE.CylinderGeometry(0.9, 1.2, 0.8, 6);
    const baseMesh = new THREE.Mesh(baseGeo, navyMat);
    baseMesh.position.y = -0.9;
    rootGroup.add(baseMesh);
    geometriesToDispose.push(baseGeo);

    // 4. Subtle Base Ring
    const subBaseGeo = new THREE.CylinderGeometry(1.4, 1.6, 0.3, 6);
    const subBaseMesh = new THREE.Mesh(subBaseGeo, goldMat);
    subBaseMesh.position.y = -1.4;
    rootGroup.add(subBaseMesh);
    geometriesToDispose.push(subBaseGeo);

    // --- Interactive Mouse Parallax (Controlled, Subtle, Smooth) ---
    const targetMouse = { x: 0, y: 0 };
    const currentMouse = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouse.x = x * 0.4; // Scaled down for subtle, professional motion
      targetMouse.y = y * 0.3;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // --- Resize Observer ---
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(ecc.getClampedDPR());
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // --- Viewport Throttling ---
    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // --- Smooth Render Loop ---
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!ecc.shouldRender(isVisible)) return;

      const elapsedTime = clock.getElapsedTime();
      ecc.tick(performance.now());

      // Buttery smooth lerp
      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.05;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.05;

      // Steady dignified rotation
      rootGroup.rotation.y = elapsedTime * 0.2 + currentMouse.x;
      rootGroup.rotation.x = Math.sin(elapsedTime * 0.3) * 0.04 - currentMouse.y;

      ringMesh1.rotation.z = elapsedTime * 0.15;
      ringMesh2.rotation.z = -elapsedTime * 0.12;

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      geometriesToDispose.forEach((geo) => geo.dispose());
      materialsToDispose.forEach((mat) => mat.dispose());

      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full pointer-events-none select-none"
      aria-label="3D Stylized Genre Monument"
    />
  );
};
