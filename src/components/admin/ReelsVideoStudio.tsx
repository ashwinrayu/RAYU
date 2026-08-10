'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Download, Sparkles, Film, Video, Check, RefreshCw } from 'lucide-react';
import { OmniNewsItem } from '@/services/newsFetcher';
import { PostContent } from '@/types/postContent';
import { INSTAGRAM_HANDLE, WEBSITE_DOMAIN } from '@/data/instagram';

interface Props {
  newsItem?: OmniNewsItem;
  postContent?: PostContent;
}

export const ReelsVideoStudio: React.FC<Props> = ({ newsItem, postContent }) => {
  const itemTitle = postContent?.headline || newsItem?.title || 'UNTITLED POST';
  const itemCategory = postContent?.category || newsItem?.category || 'TECH';
  const itemSummary = postContent?.body || newsItem?.summary || '';
  const itemTakeaway = postContent?.rayuTakeaway || newsItem?.rayuTakeaway || itemSummary;
  const bgImageUrl = postContent?.sourceImage || newsItem?.imageUrl || '';

  const [isPlaying, setIsPlaying] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [recordNotice, setRecordNotice] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const imageLoadedRef = useRef<HTMLImageElement | null>(null);

  // Preload background image for canvas render loop
  useEffect(() => {
    if (!bgImageUrl) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = bgImageUrl;
    img.onload = () => {
      imageLoadedRef.current = img;
    };
  }, [bgImageUrl]);

  // Programmatic Motion Animation Loop (1080x1920 9:16 Vertical Reel)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let startTime = performance.now();

    const renderFrame = (now: number) => {
      const elapsed = (now - startTime) / 1000; // seconds
      const cycleTime = elapsed % 8; // 8-second video loop

      // Clear Canvas
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, 1080, 1920);

      // 1. Ken Burns Slow Zoom & Pan Background Image
      if (imageLoadedRef.current) {
        ctx.save();
        const zoom = 1 + (cycleTime / 8) * 0.15; // Smooth 15% zoom over 8s
        const panY = (cycleTime / 8) * 40; // Slow 40px vertical drift

        ctx.translate(540, 960);
        ctx.scale(zoom, zoom);
        ctx.translate(-540, -960 - panY);

        // Draw cover-fitted background
        ctx.globalAlpha = 0.35;
        ctx.drawImage(imageLoadedRef.current, 0, 0, 1080, 1920);
        ctx.restore();
      }

      // 2. Volumetric Glowing Cyber Gradient Overlay
      const grad = ctx.createRadialGradient(540, 960, 100, 540, 960, 900);
      grad.addColorStop(0, 'rgba(204, 255, 0, 0.08)');
      grad.addColorStop(1, 'rgba(5, 5, 5, 0.95)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1080, 1920);

      // 3. Animated Glowing Scanline Line Sweep
      const scanY = (cycleTime / 8) * 1920;
      ctx.strokeStyle = 'rgba(204, 255, 0, 0.25)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(1080, scanY);
      ctx.stroke();

      // 4. Header Branding
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '900 48px monospace';
      ctx.fillText('RAYU.', 90, 180);

      ctx.fillStyle = '#CCFF00';
      ctx.font = 'bold 24px monospace';
      ctx.fillText(`[${itemCategory} • 9:16 MOTION REEL]`, 90, 230);

      // 5. Headline Text Entrance Fade
      const headlineAlpha = Math.min(1, Math.max(0, (cycleTime - 0.5) * 2));
      ctx.save();
      ctx.globalAlpha = headlineAlpha;
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '900 58px sans-serif';

      // Wrap headline lines
      const words = itemTitle.toUpperCase().split(' ');
      let line = '';
      let y = 800;
      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        if (ctx.measureText(testLine).width > 900 && i > 0) {
          ctx.fillText(line, 90, y);
          line = words[i] + ' ';
          y += 75;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 90, y);
      ctx.restore();

      // 6. Body Text / Takeaway Entrance
      const bodyAlpha = Math.min(1, Math.max(0, (cycleTime - 2.0) * 1.5));
      ctx.save();
      ctx.globalAlpha = bodyAlpha;
      ctx.fillStyle = '#CCFF00';
      ctx.font = 'bold 28px monospace';
      ctx.fillText(`💡 INSIGHT:`, 90, y + 100);

      ctx.fillStyle = '#E5E5E5';
      ctx.font = '500 32px monospace';
      const takeawayText = itemTakeaway.slice(0, 160);
      ctx.fillText(takeawayText.slice(0, Math.floor((cycleTime - 2.0) * 45)), 90, y + 150);
      ctx.restore();

      // 7. Footer Handle
      ctx.fillStyle = '#CCFF00';
      ctx.font = 'bold 26px monospace';
      ctx.fillText(`@${INSTAGRAM_HANDLE} • ${WEBSITE_DOMAIN}`, 90, 1780);

      if (isPlaying) {
        animFrameRef.current = requestAnimationFrame(renderFrame);
      }
    };

    if (isPlaying) {
      animFrameRef.current = requestAnimationFrame(renderFrame);
    }

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, itemTitle, itemCategory, itemTakeaway]);

  // Programmatic Video Recording via MediaRecorder
  const handleRecordVideoClip = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsRecording(true);
    setRecordNotice('📹 RECORDING 8-SECOND MOTION REEL VIDEO MP4/WEBM...');

    try {
      const stream = canvas.captureStream(30); // 30 FPS
      const recorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' });
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.download = `rayu-motion-reel-${Date.now()}.webm`;
        a.href = url;
        a.click();
        URL.revokeObjectURL(url);
        setIsRecording(false);
        setRecordNotice('✅ MOTION REEL VIDEO EXPORT COMPLETE!');
        setTimeout(() => setRecordNotice(null), 3000);
      };

      recorder.start();
      setTimeout(() => recorder.stop(), 8000); // Record 8s clip
    } catch (err: any) {
      console.error('Video recording failed:', err);
      setIsRecording(false);
      setRecordNotice(`❌ Video recording error: ${err.message}`);
    }
  };

  return (
    <div className="bg-[#050505] border border-white/10 p-5 sm:p-7 rounded-sm text-white space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-[#090909] border border-[#CCFF00]/30 rounded-sm shadow-[0_0_15px_rgba(204,255,0,0.1)]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full bg-[#CCFF00] text-black flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_15px_rgba(204,255,0,0.4)] shrink-0 cursor-pointer"
          >
            {isPlaying ? <Pause size={18} className="fill-black" /> : <Play size={18} className="fill-black ml-0.5" />}
          </button>
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#CCFF00] uppercase mb-0.5">
              <Film size={14} />
              <span>REMOTION PROGRAMMATIC MOTION VIDEO ENGINE (9:16 REEL)</span>
            </div>
            <span className="text-xs font-mono text-neutral-400">
              KEN BURNS ZOOM + TEXT ENTRANCE + SCANLINE PULSE (8S CLIP)
            </span>
          </div>
        </div>

        <button
          onClick={handleRecordVideoClip}
          disabled={isRecording}
          className="px-5 py-2.5 bg-[#CCFF00] text-black hover:bg-[#b5e600] font-mono text-xs font-bold uppercase rounded-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(204,255,0,0.3)] disabled:opacity-50"
        >
          <Video size={14} />
          <span>{isRecording ? 'RECORDING VIDEO...' : 'EXPORT MOTION REEL (MP4/WEBM) 🚀'}</span>
        </button>
      </div>

      {recordNotice && (
        <div className="p-3 bg-[#CCFF00]/10 border border-[#CCFF00]/40 rounded text-xs font-mono text-[#CCFF00] flex items-center gap-2">
          <Sparkles size={14} />
          <span>{recordNotice}</span>
        </div>
      )}

      {/* 9:16 Vertical Canvas Preview */}
      <div className="flex flex-col items-center">
        <div className="relative aspect-[9/16] w-full max-w-[340px] bg-[#050505] border border-white/20 rounded-sm overflow-hidden shadow-2xl">
          <canvas
            ref={canvasRef}
            width={1080}
            height={1920}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};
