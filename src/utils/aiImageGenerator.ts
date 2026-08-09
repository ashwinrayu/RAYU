/**
 * In-Studio Live Generative Visual Engine
 * Dynamically synthesizes high-resolution content-aware AI graphics directly inside the browser canvas.
 */

export function generateInStudioAiVisual(title: string, category: string, summary: string): string {
  if (typeof window === 'undefined') return '';

  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 1200;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const text = (title + ' ' + summary + ' ' + category).toLowerCase();

  // Background Gradient Base based on category/content
  let primaryColor = '#CCFF00';
  let secondaryColor = '#00F0FF';
  let darkBg = '#050505';

  if (text.includes('gta') || text.includes('vice city') || category === 'VIRAL') {
    primaryColor = '#FF00AA';
    secondaryColor = '#CCFF00';
    darkBg = '#0a0014';
  } else if (text.includes('hack') || text.includes('code') || category === 'HACKS') {
    primaryColor = '#00FF66';
    secondaryColor = '#00F0FF';
    darkBg = '#000f08';
  } else if (text.includes('war') || text.includes('alert') || category === 'WAR') {
    primaryColor = '#FF3333';
    secondaryColor = '#FF9900';
    darkBg = '#140000';
  } else if (category === 'POLITICS') {
    primaryColor = '#FFB800';
    secondaryColor = '#CCFF00';
    darkBg = '#140f00';
  } else if (category === 'MOVIES') {
    primaryColor = '#FF00AA';
    secondaryColor = '#00F0FF';
    darkBg = '#000b14';
  }

  // 1. Dark Base
  ctx.fillStyle = darkBg;
  ctx.fillRect(0, 0, 1200, 1200);

  // 2. Volumetric Glow Blobs
  const grad1 = ctx.createRadialGradient(900, 300, 50, 900, 300, 600);
  grad1.addColorStop(0, primaryColor + '66');
  grad1.addColorStop(1, 'transparent');
  ctx.fillStyle = grad1;
  ctx.fillRect(0, 0, 1200, 1200);

  const grad2 = ctx.createRadialGradient(300, 900, 50, 300, 900, 600);
  grad2.addColorStop(0, secondaryColor + '44');
  grad2.addColorStop(1, 'transparent');
  ctx.fillStyle = grad2;
  ctx.fillRect(0, 0, 1200, 1200);

  // 3. Cyber Grid Mesh overlay
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.lineWidth = 1;
  const gridSize = 60;
  for (let x = 0; x < 1200; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 1200);
    ctx.stroke();
  }
  for (let y = 0; y < 1200; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1200, y);
    ctx.stroke();
  }

  // 4. Content Key Visual Elements (Laser Streaks & Light Rays)
  ctx.save();
  ctx.translate(600, 600);
  ctx.rotate(-Math.PI / 6);
  const streakGrad = ctx.createLinearGradient(-600, 0, 600, 0);
  streakGrad.addColorStop(0, 'transparent');
  streakGrad.addColorStop(0.5, primaryColor + '99');
  streakGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = streakGrad;
  ctx.fillRect(-800, -20, 1600, 40);
  ctx.restore();

  // 5. Procedural Glowing Particles
  const seedNum = (title.length * 37) % 100;
  for (let i = 0; i < 40; i++) {
    const px = ((i * 137 + seedNum * 29) % 1100) + 50;
    const py = ((i * 269 + seedNum * 53) % 1100) + 50;
    const pr = ((i * 7) % 4) + 2;

    ctx.beginPath();
    ctx.arc(px, py, pr, 0, Math.PI * 2);
    ctx.fillStyle = i % 2 === 0 ? primaryColor : secondaryColor;
    ctx.shadowBlur = 15;
    ctx.shadowColor = primaryColor;
    ctx.fill();
  }

  // 6. Bold Story Category Identifier Watermark
  ctx.shadowBlur = 0;
  ctx.font = '900 120px monospace';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.textAlign = 'center';
  ctx.fillText(category.toUpperCase(), 600, 640);

  return canvas.toDataURL('image/png');
}
