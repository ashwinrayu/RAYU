'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface DustParticle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  alpha: number;
  pulsePhase: number;
  pulseSpeed: number;
}

export const CinematicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * 14;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Dust particles drifting around the central neon lime light flare
    const dustCount = 130;
    const dustParticles: DustParticle[] = [];

    const beamY = height * 0.54;

    for (let i = 0; i < dustCount; i++) {
      const x = Math.random() * width;
      const distFromBeam = Math.pow(Math.random(), 2.5) * (height * 0.35);
      const y = beamY + (Math.random() > 0.5 ? distFromBeam : -distFromBeam);

      dustParticles.push({
        x,
        y,
        size: Math.random() * 1.2 + 0.3,
        vx: (Math.random() - 0.45) * 0.18,
        vy: (Math.random() - 0.5) * 0.05,
        alpha: Math.random() * 0.4 + 0.08,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.012 + 0.004,
      });
    }

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    let time = 0;

    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      // 1. Pulsing Volumetric Light Flare Overlay (Aligned with background image beam)
      const flareX = width * 0.72;
      const flareY = height * 0.54;
      const flarePulse = 0.85 + Math.sin(time * 1.5) * 0.15;

      const flareGradient = ctx.createRadialGradient(
        flareX,
        flareY,
        10,
        flareX,
        flareY,
        width * 0.35
      );
      flareGradient.addColorStop(0, `rgba(255, 255, 180, ${0.45 * flarePulse})`);
      flareGradient.addColorStop(0.2, `rgba(204, 255, 0, ${0.35 * flarePulse})`);
      flareGradient.addColorStop(0.5, `rgba(204, 255, 0, ${0.12 * flarePulse})`);
      flareGradient.addColorStop(1, 'rgba(204, 255, 0, 0)');

      ctx.fillStyle = flareGradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Animated Horizontal Shimmer Laser Beam Line
      const beamX = (Math.sin(time * 0.8) * 0.1 + 0.6) * width;
      const beamLineGrad = ctx.createLinearGradient(beamX - 350, flareY, beamX + 350, flareY);
      beamLineGrad.addColorStop(0, 'rgba(204, 255, 0, 0)');
      beamLineGrad.addColorStop(0.5, `rgba(204, 255, 0, ${0.75 * flarePulse})`);
      beamLineGrad.addColorStop(1, 'rgba(204, 255, 0, 0)');

      ctx.fillStyle = beamLineGrad;
      ctx.fillRect(0, flareY - 1, width, 2);

      // 3. Floating Fine Dust Particles
      for (let i = 0; i < dustParticles.length; i++) {
        const p = dustParticles[i];
        p.pulsePhase += p.pulseSpeed;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const distToFlare = Math.hypot(p.x - flareX, p.y - flareY);
        const visibility = Math.max(0, 1 - distToFlare / (width * 0.45));

        if (visibility > 0.05) {
          const alpha = (p.alpha + Math.sin(p.pulsePhase) * 0.15) * visibility;
          ctx.save();
          ctx.globalAlpha = Math.max(0.02, Math.min(0.6, alpha));
          ctx.fillStyle = distToFlare < 160 ? '#FFFFCC' : '#CCFF00';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#030303]">
      {/* 1. Exact User Background Image with Slow Breathing & Parallax */}
      <div
        className="absolute inset-[-25px] transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0) scale(1.03)`,
        }}
      >
        <Image
          src="/v2-background.png"
          alt="RAYU Cinematic Animated Background"
          fill
          priority
          quality={100}
          className="object-cover object-center brightness-105 contrast-105 animate-pulse-slow"
        />
      </div>

      {/* 2. Dynamic Animated Canvas Overlay (Flare Glow, Shimmer Beam, Illuminated Dust) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block opacity-90 mix-blend-screen"
      />

      {/* 3. Soft Radial Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_40%,_rgba(3,3,3,0.7) 100%)] pointer-events-none" />

      {/* 4. Film Grain Noise Overlay */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>")`,
        }}
      />
    </div>
  );
};
