'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Copy, Download, Check, Sparkles, Share2, AlertCircle, Quote, Cpu, Newspaper, Loader2, Film, Layers, MessageSquare, LayoutGrid, Image as ImageIcon, RefreshCw, Sliders, ShieldCheck, Zap } from 'lucide-react';
import { OmniNewsItem } from '@/services/newsFetcher';
import { INSTAGRAM_HANDLE, WEBSITE_DOMAIN } from '@/data/instagram';
import { toPng } from 'html-to-image';
import { ReelsVideoStudio } from './ReelsVideoStudio';
import { CarouselStudio } from './CarouselStudio';
import { TwitterThreadStudio } from './TwitterThreadStudio';
import { generateInStudioAiVisual } from '@/utils/aiImageGenerator';

interface Props {
  newsItem: OmniNewsItem;
}

export const TEMPLATES = [
  { id: 't1', name: '01. KINETIC MINIMAL', icon: Sparkles, color: '#CCFF00' },
  { id: 't2', name: '02. EDITORIAL ESSAY', icon: Newspaper, color: '#FFFFFF' },
  { id: 't3', name: '03. BREAKING ALERT', icon: AlertCircle, color: '#FF4D4D' },
  { id: 't4', name: '04. TECH DATA GRID', icon: Cpu, color: '#00F0FF' },
  { id: 't5', name: '05. QUOTE SPOTLIGHT', icon: Quote, color: '#FFB800' },
];

export const InstagramPostStudio: React.FC<Props> = ({ newsItem }) => {
  const [studioFormat, setStudioFormat] = useState<'single' | 'reels' | 'carousel' | 'twitter'>('single');
  const [selectedTemplate, setSelectedTemplate] = useState('t1');
  const [copied, setCopied] = useState(false);
  const [published, setPublished] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Hybrid AI Generator Controls
  const [aiProvider, setAiProvider] = useState<'OPENAI' | 'GEMINI' | 'AUTO'>('OPENAI');
  const [negativeZone, setNegativeZone] = useState<'bottom' | 'left'>('bottom');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [elapsedTimer, setElapsedTimer] = useState(0);
  const [generationTimeMs, setGenerationTimeMs] = useState<number | null>(null);
  const [apiNotice, setApiNotice] = useState<string | null>(null);
  const [customImageUrl, setCustomImageUrl] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Auto-generate AI background on story change
  useEffect(() => {
    handleGenerateServerAiBackground();
  }, [newsItem.id, newsItem.title, aiProvider, negativeZone]);

  // Elapsed timer tracking
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGeneratingAI) {
      setElapsedTimer(0);
      interval = setInterval(() => {
        setElapsedTimer((prev) => +(prev + 0.1).toFixed(1));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isGeneratingAI]);

  // Server-Side Hybrid AI Background Generator Call
  const handleGenerateServerAiBackground = async () => {
    setIsGeneratingAI(true);
    setApiNotice(null);
    const startTime = performance.now();

    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newsItem.title,
          category: newsItem.category,
          summary: newsItem.summary,
          provider: aiProvider,
          layout: negativeZone,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.imageUrl) {
          setCustomImageUrl(data.imageUrl);
        }
        if (data.notice) {
          setApiNotice(data.notice);
        }
      } else {
        // Fallback to client synthesis if server call errors
        const clientDataUrl = generateInStudioAiVisual(newsItem.title, newsItem.category, newsItem.summary);
        if (clientDataUrl) setCustomImageUrl(clientDataUrl);
      }
    } catch (err) {
      console.error('Server AI Background generation failed:', err);
      const clientDataUrl = generateInStudioAiVisual(newsItem.title, newsItem.category, newsItem.summary);
      if (clientDataUrl) setCustomImageUrl(clientDataUrl);
    } finally {
      const endTime = performance.now();
      const duration = +((endTime - startTime) / 1000).toFixed(2);
      setGenerationTimeMs(duration > 0 ? duration : 1.2);
      setIsGeneratingAI(false);
    }
  };

  const activeDisplayImage = customImageUrl || newsItem.imageUrl || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80';

  // Generate Instagram Caption
  const instagramCaption = `⚡ RAYU SOCIAL STREAM: [${newsItem.category}]

${newsItem.title.toUpperCase()}

📍 Region: ${newsItem.region}
⏱️ Published: ${newsItem.publishedAt}

Summary:
${newsItem.summary}

💡 RAYU'S UNFILTERED TAKEAWAY:
"${newsItem.rayuTakeaway || newsItem.summary}"

🔗 Full analysis & primary sources live at ${WEBSITE_DOMAIN}
Link in bio 👉 @${INSTAGRAM_HANDLE}

#RAYU #thisisrayu #IndiaTech #TechNews #GlobalShift #${newsItem.category} #${newsItem.region}`;

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(instagramCaption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePublishSimulated = () => {
    setPublished(true);
    setTimeout(() => setPublished(false), 3000);
  };

  const handleDownloadCard = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1.0,
        pixelRatio: 3,
        cacheBust: true,
      });
      const link = document.createElement('a');
      link.download = `rayu-post-${selectedTemplate}-${newsItem.id}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export post card image:', err);
      const link = document.createElement('a');
      link.download = `rayu-template-${selectedTemplate}-${newsItem.id}.png`;
      link.href = activeDisplayImage;
      link.click();
    } finally {
      setIsDownloading(false);
    }
  };

  // Clone newsItem with active AI background
  const dynamicNewsItem: OmniNewsItem = {
    ...newsItem,
    imageUrl: activeDisplayImage,
  };

  return (
    <div className="bg-[#0B0B0B] border border-white/10 p-6 md:p-8 rounded-sm text-white">
      {/* Hybrid AI Background Art Generator Control Bar */}
      <div className="mb-8 p-5 bg-[#050505] border border-[#CCFF00]/40 rounded-sm space-y-4 shadow-[0_0_25px_rgba(204,255,0,0.1)]">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#CCFF00]/10 border border-[#CCFF00]/40 flex items-center justify-center text-[#CCFF00] shrink-0">
              {isGeneratingAI ? <Loader2 size={20} className="animate-spin text-[#CCFF00]" /> : <Zap size={20} />}
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#CCFF00] uppercase">
                <Sparkles size={14} />
                <span>HYBRID AI BACKGROUND ART + BRAND TYPOGRAPHY OVERLAY SYSTEM</span>
              </div>
              <span className="text-xs font-mono text-neutral-400">
                {isGeneratingAI
                  ? `CALLING ${aiProvider} API... GENERATING ARTWORK (${elapsedTimer}s)`
                  : `ARTWORK COMPOSITED IN ${generationTimeMs || 1.2}s • CRISP CODE TYPOGRAPHY OVERLAY READY`}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* AI Provider Switcher Toggle */}
            <div className="flex items-center bg-[#090909] border border-white/15 rounded-sm p-1 text-xs font-mono">
              <button
                onClick={() => setAiProvider('OPENAI')}
                className={`px-3 py-1.5 rounded-sm font-bold uppercase transition-all ${
                  aiProvider === 'OPENAI' ? 'bg-[#CCFF00] text-black shadow-[0_0_10px_rgba(204,255,0,0.4)]' : 'text-neutral-400 hover:text-white'
                }`}
              >
                OPENAI DALL·E 3
              </button>
              <button
                onClick={() => setAiProvider('GEMINI')}
                className={`px-3 py-1.5 rounded-sm font-bold uppercase transition-all ${
                  aiProvider === 'GEMINI' ? 'bg-[#CCFF00] text-black shadow-[0_0_10px_rgba(204,255,0,0.4)]' : 'text-neutral-400 hover:text-white'
                }`}
              >
                GEMINI IMAGEN
              </button>
            </div>

            {/* Negative Space Zone Selector */}
            <div className="flex items-center bg-[#090909] border border-white/15 rounded-sm p-1 text-xs font-mono">
              <button
                onClick={() => setNegativeZone('bottom')}
                className={`px-2.5 py-1.5 rounded-sm uppercase ${
                  negativeZone === 'bottom' ? 'bg-white/20 text-white font-bold' : 'text-neutral-500'
                }`}
              >
                BOTTOM SPACE
              </button>
              <button
                onClick={() => setNegativeZone('left')}
                className={`px-2.5 py-1.5 rounded-sm uppercase ${
                  negativeZone === 'left' ? 'bg-white/20 text-white font-bold' : 'text-neutral-500'
                }`}
              >
                LEFT SPACE
              </button>
            </div>

            <button
              onClick={handleGenerateServerAiBackground}
              disabled={isGeneratingAI}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold bg-[#CCFF00] text-black hover:bg-[#b5e600] px-4 py-2.5 rounded-sm transition-colors uppercase cursor-pointer disabled:opacity-50 shrink-0"
            >
              <RefreshCw size={14} className={isGeneratingAI ? 'animate-spin' : ''} />
              <span>{isGeneratingAI ? `GENERATING (${elapsedTimer}s)...` : 'RE-ROLL AI ART 🎨'}</span>
            </button>
          </div>
        </div>

        {apiNotice && (
          <div className="p-2.5 bg-yellow-500/10 border border-yellow-500/30 rounded-sm text-[11px] font-mono text-yellow-300 flex items-center justify-between">
            <span>💡 {apiNotice}</span>
            <span className="text-neutral-400">Keys stored in .env.local</span>
          </div>
        )}
      </div>

      {/* Format Selection Bar */}
      <div className="mb-8 border-b border-white/10 pb-6">
        <span className="text-xs font-mono font-bold text-[#CCFF00] uppercase block mb-3">
          CHOOSE SOCIAL MEDIA OUTPUT FORMAT:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => setStudioFormat('single')}
            className={`p-3.5 rounded-sm border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
              studioFormat === 'single'
                ? 'bg-[#CCFF00] text-black font-bold border-[#CCFF00] shadow-[0_0_15px_rgba(204,255,0,0.3)]'
                : 'bg-[#050505] border-white/10 text-neutral-300 hover:border-white/30'
            }`}
          >
            <LayoutGrid size={16} />
            <span className="text-xs font-mono uppercase">📸 SINGLE POST CARD</span>
          </button>

          <button
            onClick={() => setStudioFormat('reels')}
            className={`p-3.5 rounded-sm border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
              studioFormat === 'reels'
                ? 'bg-[#CCFF00] text-black font-bold border-[#CCFF00] shadow-[0_0_15px_rgba(204,255,0,0.3)]'
                : 'bg-[#050505] border-white/10 text-neutral-300 hover:border-white/30'
            }`}
          >
            <Film size={16} />
            <span className="text-xs font-mono uppercase">🎬 AI REELS & VOICE</span>
          </button>

          <button
            onClick={() => setStudioFormat('carousel')}
            className={`p-3.5 rounded-sm border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
              studioFormat === 'carousel'
                ? 'bg-[#CCFF00] text-black font-bold border-[#CCFF00] shadow-[0_0_15px_rgba(204,255,0,0.3)]'
                : 'bg-[#050505] border-white/10 text-neutral-300 hover:border-white/30'
            }`}
          >
            <Layers size={16} />
            <span className="text-xs font-mono uppercase">🎡 5-SLIDE CAROUSEL</span>
          </button>

          <button
            onClick={() => setStudioFormat('twitter')}
            className={`p-3.5 rounded-sm border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
              studioFormat === 'twitter'
                ? 'bg-[#CCFF00] text-black font-bold border-[#CCFF00] shadow-[0_0_15px_rgba(204,255,0,0.3)]'
                : 'bg-[#050505] border-white/10 text-neutral-300 hover:border-white/30'
            }`}
          >
            <MessageSquare size={16} />
            <span className="text-xs font-mono uppercase">🧵 TWITTER THREAD</span>
          </button>
        </div>
      </div>

      {/* RENDER FORMAT COMPONENT WITH DYNAMIC ITEM */}
      {studioFormat === 'reels' && <ReelsVideoStudio newsItem={dynamicNewsItem} />}
      {studioFormat === 'carousel' && <CarouselStudio newsItem={dynamicNewsItem} />}
      {studioFormat === 'twitter' && <TwitterThreadStudio newsItem={dynamicNewsItem} />}

      {/* SINGLE POST CARD FORMAT (DEFAULT) */}
      {studioFormat === 'single' && (
        <>
          {/* Studio Action Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#CCFF00] uppercase mb-1">
                <Sparkles size={14} />
                <span>1080x1080 SINGLE POST GRAPHIC GENERATOR</span>
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight">
                POST DESIGNER FOR @{INSTAGRAM_HANDLE}
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleCopyCaption}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold bg-[#050505] border border-white/15 px-4 py-2.5 rounded-sm hover:border-[#CCFF00] text-white hover:text-[#CCFF00] transition-colors uppercase cursor-pointer"
              >
                {copied ? <Check size={14} className="text-[#CCFF00]" /> : <Copy size={14} />}
                <span>{copied ? 'CAPTION COPIED!' : 'COPY CAPTION'}</span>
              </button>

              <button
                onClick={handleDownloadCard}
                disabled={isDownloading}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold bg-[#050505] border border-white/15 px-4 py-2.5 rounded-sm hover:border-[#CCFF00] text-white hover:text-[#CCFF00] transition-colors uppercase cursor-pointer disabled:opacity-50"
              >
                {isDownloading ? <Loader2 size={14} className="animate-spin text-[#CCFF00]" /> : <Download size={14} />}
                <span>{isDownloading ? 'EXPORTING 1080x1080 PNG...' : 'DOWNLOAD DESIGN PNG'}</span>
              </button>

              <button
                onClick={handlePublishSimulated}
                className="cta-element btn-sweep inline-flex items-center gap-2 bg-[#CCFF00] text-[#050505] text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-sm hover:bg-[#b5e600] transition-colors cursor-pointer"
              >
                {published ? <Check size={14} /> : <Share2 size={14} />}
                <span>{published ? 'POSTED TO @THISISRAYU!' : 'PUBLISH TO INSTAGRAM'}</span>
              </button>
            </div>
          </div>

          {/* 5 Social Media Templates Selector Bar */}
          <div className="mb-8">
            <span className="text-xs font-mono font-bold text-neutral-400 uppercase block mb-3">
              SELECT DESIGN TEMPLATE (5 STYLES AVAILABLE):
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {TEMPLATES.map((t) => {
                const Icon = t.icon;
                const isSelected = selectedTemplate === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTemplate(t.id)}
                    className={`p-3 rounded-sm border text-left flex items-center gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#CCFF00]/10 border-[#CCFF00] text-[#CCFF00] shadow-[0_0_12px_rgba(204,255,0,0.2)] font-bold'
                        : 'bg-[#050505] border-white/10 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Icon size={14} style={{ color: t.color }} />
                    <span className="text-xs font-mono uppercase">{t.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 1080x1080 Square Post Card Preview Container */}
            <div className="lg:col-span-6">
              <span className="text-xs font-mono font-bold text-neutral-400 uppercase block mb-3 flex items-center justify-between">
                <span>📸 LIVE 1080x1080 SQUARE POST CARD PREVIEW ({selectedTemplate.toUpperCase()})</span>
                {isGeneratingAI && <span className="text-[#CCFF00] font-mono animate-pulse">COMPOSITING AI ART ({elapsedTimer}s)...</span>}
              </span>

              <div
                ref={cardRef}
                className="relative aspect-square w-full bg-[#050505] border border-white/20 rounded-sm p-6 flex flex-col justify-between overflow-hidden shadow-2xl"
              >
                {/* Background AI Artwork Layer */}
                {activeDisplayImage && (
                  <img
                    src={activeDisplayImage}
                    alt={newsItem.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isGeneratingAI ? 'opacity-20 scale-105' : 'opacity-40 scale-100'}`}
                  />
                )}

                {/* TEMPLATE 1: KINETIC MINIMAL */}
                {selectedTemplate === 't1' && (
                  <>
                    <div className="relative z-10 flex items-center justify-between border-b border-white/15 pb-4">
                      <div className="text-2xl font-black text-white">RAY<span className="text-[#CCFF00]">U.</span></div>
                      <div className="text-[10px] font-mono font-bold px-2.5 py-1 bg-[#CCFF00] text-black rounded-sm uppercase">[{newsItem.category}]</div>
                    </div>
                    <div className="relative z-10 my-auto py-4">
                      <span className="text-[10px] font-mono text-[#CCFF00] uppercase block mb-2">● LIVE AWARENESS • {newsItem.region}</span>
                      <h4 className="text-xl sm:text-2xl font-black text-white leading-tight uppercase mb-3 drop-shadow-md">{newsItem.title}</h4>
                      <p className="text-xs text-neutral-200 line-clamp-3 leading-relaxed">{newsItem.summary}</p>
                    </div>
                    <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between text-[10px] font-mono text-neutral-300">
                      <span className="text-[#CCFF00] font-bold">@THISISRAYU</span>
                      <span>RAYU-360.VERCEL.APP</span>
                    </div>
                  </>
                )}

                {/* TEMPLATE 2: EDITORIAL ESSAY */}
                {selectedTemplate === 't2' && (
                  <>
                    <div className="relative z-10 flex items-center justify-between border-b border-white/20 pb-3">
                      <span className="text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase">RAYU EDITORIAL</span>
                      <span className="text-[10px] font-mono text-neutral-500 uppercase">{newsItem.publishedAt}</span>
                    </div>
                    <div className="relative z-10 my-auto p-4 bg-[#090909]/90 border border-white/10 rounded-sm backdrop-blur-md">
                      <div className="text-[10px] font-mono text-[#CCFF00] mb-2 uppercase font-bold">[{newsItem.category} ESSAY]</div>
                      <h4 className="text-2xl font-serif text-white font-bold leading-tight mb-3">{newsItem.title}</h4>
                      <p className="text-xs text-neutral-300 leading-relaxed italic">"{newsItem.rayuTakeaway || newsItem.summary}"</p>
                    </div>
                    <div className="relative z-10 pt-3 border-t border-white/20 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-white font-bold">BY RAYU (@THISISRAYU)</span>
                      <span className="text-[#CCFF00]">READ AT RAYU-360.VERCEL.APP</span>
                    </div>
                  </>
                )}

                {/* TEMPLATE 3: BREAKING ALERT */}
                {selectedTemplate === 't3' && (
                  <>
                    <div className="relative z-10 bg-red-500 text-black px-4 py-2 font-mono font-black text-xs uppercase tracking-widest flex items-center justify-between">
                      <span>⚡ BREAKING AWARENESS ALERT</span>
                      <span>[{newsItem.region}]</span>
                    </div>
                    <div className="relative z-10 my-auto py-4">
                      <h4 className="text-2xl font-black text-white leading-tight uppercase mb-4 text-red-400">{newsItem.title}</h4>
                      <div className="p-4 bg-red-950/80 border border-red-500/40 rounded-sm text-xs text-neutral-200 leading-relaxed font-mono backdrop-blur-md">
                        {newsItem.summary}
                      </div>
                    </div>
                    <div className="relative z-10 pt-3 border-t border-red-500/40 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                      <span className="text-red-400 font-bold">URGENT REPORTING</span>
                      <span className="text-white">@THISISRAYU</span>
                    </div>
                  </>
                )}

                {/* TEMPLATE 4: TECH DATA GRID */}
                {selectedTemplate === 't4' && (
                  <>
                    <div className="relative z-10 flex items-center justify-between font-mono text-[10px] border-b border-[#00F0FF]/30 pb-3 text-[#00F0FF]">
                      <span>SYSTEM_ID: RAYU-{newsItem.id.toUpperCase()}</span>
                      <span>DATA_STREAM</span>
                    </div>
                    <div className="relative z-10 my-auto py-2">
                      <h4 className="text-xl font-mono font-bold text-[#00F0FF] uppercase mb-4">{newsItem.title}</h4>
                      {newsItem.keyFacts && newsItem.keyFacts.length > 0 ? (
                        <div className="space-y-2">
                          {newsItem.keyFacts.slice(0, 3).map((f, i) => (
                            <div key={i} className="text-xs font-mono text-neutral-300 bg-neutral-900/90 p-2.5 border border-white/10 rounded-sm backdrop-blur-md">
                              <span className="text-[#00F0FF] font-bold">[{i + 1}]</span> {f}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs font-mono text-neutral-300">{newsItem.summary}</p>
                      )}
                    </div>
                    <div className="relative z-10 pt-3 border-t border-[#00F0FF]/30 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                      <span className="text-[#00F0FF]">TERMINAL_ACTIVE</span>
                      <span>@THISISRAYU</span>
                    </div>
                  </>
                )}

                {/* TEMPLATE 5: QUOTE SPOTLIGHT */}
                {selectedTemplate === 't5' && (
                  <>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,184,0,0.2)_0%,_rgba(5,5,5,0.9)_80%)] pointer-events-none" />
                    <div className="relative z-10 text-center pt-2">
                      <span className="text-xs font-mono font-bold text-[#FFB800] uppercase tracking-widest">SPOTLIGHT TAKEAWAY</span>
                    </div>
                    <div className="relative z-10 my-auto text-center px-4">
                      <Quote size={32} className="text-[#FFB800] mx-auto mb-3 opacity-60" />
                      <p className="text-lg sm:text-xl font-bold text-white leading-relaxed italic mb-4">
                        "{newsItem.rayuTakeaway || newsItem.summary}"
                      </p>
                      <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">— RAYU (@THISISRAYU)</span>
                    </div>
                    <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                      <span>UNFILTERED PERSPECTIVE</span>
                      <span className="text-[#FFB800]">RAYU-360.VERCEL.APP</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right Formatted Instagram Caption Preview */}
            <div className="lg:col-span-6">
              <span className="text-xs font-mono font-bold text-neutral-400 uppercase block mb-3">
                📝 GENERATED INSTAGRAM CAPTION FOR TEMPLATE
              </span>

              <div className="bg-[#050505] border border-white/15 p-5 rounded-sm font-mono text-xs text-neutral-300 leading-relaxed max-h-[420px] overflow-y-auto whitespace-pre-wrap select-all">
                {instagramCaption}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
