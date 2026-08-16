"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroScene3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 7.5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group to hold all 3D elements
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Inner Core Glowing Wireframe Icosahedron
    const coreGeometry = new THREE.IcosahedronGeometry(2.1, 3);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0033,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    globeGroup.add(coreMesh);

    // 2. Outer Point Cloud / Particle Sphere
    const particlesCount = 900;
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);
    const goldColor = new THREE.Color(0xf59e0b);
    const redColor = new THREE.Color(0xff0033);
    const whiteColor = new THREE.Color(0xffffff);

    for (let i = 0; i < particlesCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.25 + (Math.random() - 0.5) * 0.2;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      posArray[i * 3] = x;
      posArray[i * 3 + 1] = y;
      posArray[i * 3 + 2] = z;

      const rand = Math.random();
      const c = rand > 0.6 ? goldColor : rand > 0.2 ? redColor : whiteColor;
      colorArray[i * 3] = c.r;
      colorArray[i * 3 + 1] = c.g;
      colorArray[i * 3 + 2] = c.b;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colorArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    globeGroup.add(particlesMesh);

    // 3. Orbital Rings (Golden Ring + Red Ring)
    const ringGeo1 = new THREE.RingGeometry(2.8, 2.83, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.55,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2.6;
    ring1.rotation.y = Math.PI / 8;
    globeGroup.add(ring1);

    const ringGeo2 = new THREE.RingGeometry(3.2, 3.22, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xff0033,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 3;
    ring2.rotation.y = -Math.PI / 6;
    globeGroup.add(ring2);

    // 4. Key Global High-RPM Market Beacons
    const cities = [
      { lat: 40.7128, lon: -74.006, color: 0xf59e0b },
      { lat: 51.5074, lon: -0.1278, color: 0xff0033 },
      { lat: 52.52, lon: 13.405, color: 0xf59e0b },
      { lat: 25.2048, lon: 55.2708, color: 0xffd700 },
      { lat: 35.6762, lon: 139.6503, color: 0xff0033 },
    ];

    const beaconGroup = new THREE.Group();
    cities.forEach((city) => {
      const phi = (90 - city.lat) * (Math.PI / 180);
      const theta = (city.lon + 180) * (Math.PI / 180);
      const r = 2.26;

      const x = -(r * Math.sin(phi) * Math.cos(theta));
      const z = r * Math.sin(phi) * Math.sin(theta);
      const y = r * Math.cos(phi);

      const beaconGeo = new THREE.SphereGeometry(0.09, 16, 16);
      const beaconMat = new THREE.MeshBasicMaterial({
        color: city.color,
        wireframe: false,
      });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.set(x, y, z);
      beaconGroup.add(beacon);

      const beamGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.6, 8);
      const beamMat = new THREE.MeshBasicMaterial({
        color: city.color,
        transparent: true,
        opacity: 0.8,
      });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.set(x * 1.12, y * 1.12, z * 1.12);
      beam.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(x, y, z).normalize()
      );
      beaconGroup.add(beam);
    });
    globeGroup.add(beaconGroup);

    // Mouse Interaction Physics
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX) * 0.0008;
      mouseY = (event.clientY - windowHalfY) * 0.0008;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      targetRotationY += (mouseX - targetRotationY) * 0.05;
      targetRotationX += (mouseY - targetRotationX) * 0.05;

      globeGroup.rotation.y = elapsedTime * 0.15 + targetRotationY * 2;
      globeGroup.rotation.x = THREE.MathUtils.clamp(
        targetRotationX + Math.sin(elapsedTime * 0.3) * 0.05,
        -0.4,
        0.4
      );

      const scale = 1 + Math.sin(elapsedTime * 2) * 0.03;
      coreMesh.scale.set(scale, scale, scale);

      ring1.rotation.z = elapsedTime * 0.1;
      ring2.rotation.z = -elapsedTime * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[480px] md:h-[580px] flex items-center justify-center pointer-events-none select-none">
      <div ref={containerRef} className="w-full h-full absolute inset-0 pointer-events-auto" />
      
      {/* Overlay Cyber HUD Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[320px] h-[320px] md:w-[460px] md:h-[460px] rounded-full border border-dashed border-red-500/20 animate-spin-slow" />
        <div className="absolute w-[380px] h-[380px] md:w-[540px] md:h-[540px] rounded-full border border-amber-400/15 animate-reverse-spin" />
      </div>

      {/* Floating Holographic Market Badges */}
      <div className="absolute top-8 left-2 md:left-6 bg-black/70 backdrop-blur-md border border-amber-500/40 px-3.5 py-2 rounded-xl shadow-2xl flex items-center gap-2.5 animate-float-delayed z-10 pointer-events-auto">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
        <div>
          <div className="text-[10px] uppercase font-mono tracking-wider text-amber-300">Targeting US / UK CPM</div>
          <div className="text-xs font-extrabold text-white">$14.50 – $28.00 / 1K</div>
        </div>
      </div>

      <div className="absolute bottom-8 right-2 md:right-8 bg-black/70 backdrop-blur-md border border-red-500/40 px-3.5 py-2 rounded-xl shadow-2xl flex items-center gap-2.5 animate-float z-10 pointer-events-auto">
        <span className="text-base">⚡</span>
        <div>
          <div className="text-[10px] uppercase font-mono tracking-wider text-red-300">Global AI Node Network</div>
          <div className="text-xs font-extrabold text-white">100% Faceless Automation</div>
        </div>
      </div>
    </div>
  );
}
