"use client";

import React, { useRef, useState } from "react";

interface TiltCard3DProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "red" | "gold" | "cyan" | "emerald";
}

export default function TiltCard3D({
  children,
  className = "",
  glowColor = "gold",
}: TiltCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotations, setRotations] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12; // tilt max 12deg
    const rotateY = ((x - centerX) / centerX) * 12;

    setRotations({ x: rotateX, y: rotateY });
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.25,
    });
  };

  const handleMouseLeave = () => {
    setRotations({ x: 0, y: 0 });
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const glowStyles = {
    gold: "hover:border-amber-500/60 hover:shadow-[0_0_40px_rgba(245,158,11,0.25)]",
    red: "hover:border-red-500/60 hover:shadow-[0_0_40px_rgba(255,0,51,0.25)]",
    cyan: "hover:border-cyan-500/60 hover:shadow-[0_0_40px_rgba(6,182,212,0.25)]",
    emerald: "hover:border-emerald-500/60 hover:shadow-[0_0_40px_rgba(16,185,129,0.25)]",
  };

  return (
    <div
      style={{ perspective: "1000px" }}
      className="transition-transform duration-300 ease-out"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotations.x}deg) rotateY(${rotations.y}deg) scale3d(${
            rotations.x !== 0 ? 1.02 : 1
          }, ${rotations.x !== 0 ? 1.02 : 1}, 1)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.15s ease-out, border-color 0.3s ease, box-shadow 0.3s ease",
        }}
        className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-xl p-6 md:p-8 ${glowStyles[glowColor]} ${className}`}
      >
        {/* Prismatic Glare Overlay */}
        <div
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,${glarePos.opacity}), transparent 60%)`,
          }}
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        />

        {/* Content with 3D Depth */}
        <div style={{ transform: "translateZ(30px)" }} className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}
