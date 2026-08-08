'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  alpha: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulsePhase: number;
  color: string;
}

export const ParticleField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId: number;
    let isVisibleOnScreen = true;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 300 : 1100;

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const distFromCenter = Math.pow(Math.random(), 2) * (height * 0.45);
      const y = height * 0.5 + (Math.random() > 0.5 ? distFromCenter : -distFromCenter);
      const x = Math.random() * width;
      const size = Math.random() * 1.8 + 0.4;
      const vx = (Math.random() - 0.45) * 0.35;
      const vy = (Math.random() - 0.5) * 0.08;
      const baseAlpha = Math.random() * 0.6 + 0.15;
      const pulseSpeed = Math.random() * 0.02 + 0.005;

      const randColor = Math.random();
      let color = '#CCFF00';
      if (randColor > 0.6) color = '#E6FF66';
      else if (randColor > 0.85) color = '#FFFFFF';

      particles.push({
        x,
        y,
        size,
        vx,
        vy,
        alpha: baseAlpha,
        baseAlpha,
        pulseSpeed,
        pulsePhase: Math.random() * Math.PI * 2,
        color,
      });
    }

    // IntersectionObserver to pause rendering when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        isVisibleOnScreen = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );

    if (canvas.parentElement) {
      observer.observe(canvas.parentElement);
    }

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      if (isVisibleOnScreen) {
        mouseX += (targetMouseX - mouseX) * 0.03;
        mouseY += (targetMouseY - mouseY) * 0.03;

        ctx.clearRect(0, 0, width, height);
        const centerY = height * 0.52;

        // Draw laser beam
        const beamGradient = ctx.createLinearGradient(0, centerY, width, centerY);
        beamGradient.addColorStop(0, 'rgba(204, 255, 0, 0)');
        beamGradient.addColorStop(0.2, 'rgba(204, 255, 0, 0.08)');
        beamGradient.addColorStop(0.5, 'rgba(204, 255, 0, 0.45)');
        beamGradient.addColorStop(0.8, 'rgba(204, 255, 0, 0.08)');
        beamGradient.addColorStop(1, 'rgba(204, 255, 0, 0)');

        ctx.save();
        ctx.fillStyle = beamGradient;
        ctx.fillRect(0, centerY - 2, width, 4);

        const coreGradient = ctx.createLinearGradient(width * 0.15, centerY, width * 0.85, centerY);
        coreGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        coreGradient.addColorStop(0.5, 'rgba(204, 255, 0, 0.95)');
        coreGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = coreGradient;
        ctx.fillRect(width * 0.15, centerY - 0.75, width * 0.7, 1.5);
        ctx.restore();

        // Render particles with subtle cursor force
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.pulsePhase += p.pulseSpeed;
          p.alpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.2;

          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (!isMobile && dist < 160) {
            const force = (1 - dist / 160) * 0.4;
            p.x -= (dx / dist) * force;
            p.y -= (dy / dist) * force;
          }

          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          ctx.save();
          ctx.globalAlpha = Math.max(0.05, Math.min(1, p.alpha));
          ctx.fillStyle = p.color;
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
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-90 transition-opacity duration-1000"
      />
    </div>
  );
};
