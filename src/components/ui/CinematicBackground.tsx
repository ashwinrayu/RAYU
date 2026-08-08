'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export const CinematicBackground: React.FC = () => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#030303]">
      {/* 1. Exact High-Resolution User-Provided Background Image with Subtle Parallax */}
      <div
        className="absolute inset-[-20px] transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0) scale(1.03)`,
        }}
      >
        <Image
          src="/v2-background.png"
          alt="RAYU Cinematic Background"
          fill
          priority
          quality={100}
          className="object-cover object-center brightness-105 contrast-105"
        />
      </div>

      {/* 2. Soft Edge Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_40%,_rgba(3,3,3,0.7) 100%)] pointer-events-none" />

      {/* 3. Subtle Film Grain Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>")`,
        }}
      />
    </div>
  );
};
