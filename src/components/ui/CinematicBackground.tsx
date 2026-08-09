'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface BannerParticle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  pulsePhase: number;
  pulseSpeed: number;
  sineOffset: number;
  sineSpeed: number;
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

    let mouseX = width * 0.7;
    let mouseY = height * 0.5;

    const handleCanvasMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleCanvasMouseMove);

    // Dedicated Banner Side Particles (Focused on right half x = 0.45 * width to width)
    const particleCount = 220;
    const particles: BannerParticle[] = [];

    const colors = ['#CCFF00', '#D8FF33', '#EEFF99', '#FFFFFF', '#A6E600'];

    for (let i = 0; i < particleCount; i++) {
      // Concentrated on the right 55% of the banner along the glass arc curve
      const baseX = (0.45 + Math.random() * 0.53) * width;
      const baseY = Math.random() * height;

      particles.push({
        x: baseX,
        y: baseY,
        baseX,
        baseY,
        size: Math.random() * 2.2 + 0.5,
        vx: (Math.random() - 0.35) * 0.35,
        vy: -(Math.random() * 0.45 + 0.15), // Upward drift
        alpha: Math.random() * 0.65 + 0.15,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        sineOffset: Math.random() * Math.PI * 2,
        sineSpeed: Math.random() * 0.015 + 0.005,
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

      // 1. Volumetric Energy Core Glow Overlay on Right Banner Side
      const flareX = width * 0.72;
      const flareY = height * 0.54;
      const flarePulse = 0.85 + Math.sin(time * 1.6) * 0.15;

      const flareGradient = ctx.createRadialGradient(
        flareX,
        flareY,
        15,
        flareX,
        flareY,
        width * 0.38
      );
      flareGradient.addColorStop(0, `rgba(255, 255, 190, ${0.5 * flarePulse})`);
      flareGradient.addColorStop(0.22, `rgba(204, 255, 0, ${0.38 * flarePulse})`);
      flareGradient.addColorStop(0.55, `rgba(204, 255, 0, ${0.14 * flarePulse})`);
      flareGradient.addColorStop(1, 'rgba(204, 255, 0, 0)');

      ctx.fillStyle = flareGradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Animated Right Banner Side Laser Beam Sweep
      const beamX = (Math.sin(time * 0.9) * 0.08 + 0.68) * width;
      const beamLineGrad = ctx.createLinearGradient(beamX - 320, flareY, beamX + 320, flareY);
      beamLineGrad.addColorStop(0, 'rgba(204, 255, 0, 0)');
      beamLineGrad.addColorStop(0.5, `rgba(204, 255, 0, ${0.8 * flarePulse})`);
      beamLineGrad.addColorStop(1, 'rgba(204, 255, 0, 0)');

      ctx.fillStyle = beamLineGrad;
      ctx.fillRect(width * 0.35, flareY - 1, width * 0.65, 2);

      // 3. Render Banner Side Particle Stream with Mouse Reactivity & Hairline Connections
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.pulsePhase += p.pulseSpeed;
        p.sineOffset += p.sineSpeed;

        // Upward floating drift with horizontal sine oscillation
        p.y += p.vy;
        p.x += Math.sin(p.sineOffset) * 0.35 + p.vx;

        // Reset particle when it floats off the top
        if (p.y < -10) {
          p.y = height + 10;
          p.x = (0.45 + Math.random() * 0.53) * width;
        }

        // Distance to cursor for interactive displacement
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.hypot(dx, dy);

        let renderX = p.x;
        let renderY = p.y;

        if (dist < 140) {
          const force = (1 - dist / 140) * 12;
          renderX += (dx / dist) * force;
          renderY += (dy / dist) * force;
        }

        // Calculate opacity based on pulse phase and right side proximity
        const currentAlpha = Math.max(
          0.05,
          Math.min(0.85, (p.alpha + Math.sin(p.pulsePhase) * 0.25))
        );

        // Draw glowing particle
        ctx.save();
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.size * 6;
        ctx.globalAlpha = currentAlpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(renderX, renderY, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Draw fine hairline connection links between nearby particles on right side
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const pDist = Math.hypot(p2.x - p.x, p2.y - p.y);

          if (pDist < 65) {
            ctx.save();
            ctx.globalAlpha = (1 - pDist / 65) * 0.12;
            ctx.strokeStyle = '#CCFF00';
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(renderX, renderY);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleCanvasMouseMove);
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

      {/* 2. Dynamic Banner Side Particle Animation Canvas Overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block opacity-95 mix-blend-screen"
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
