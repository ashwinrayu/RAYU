'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, Download, Sparkles, Radio, Check, RefreshCw, Film } from 'lucide-react';
import { OmniNewsItem } from '@/services/newsFetcher';
import { INSTAGRAM_HANDLE } from '@/data/instagram';
import { toPng } from 'html-to-image';

interface Props {
  newsItem: OmniNewsItem;
}

export const ReelsVideoStudio: React.FC<Props> = ({ newsItem }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [selectedVoiceTone, setSelectedVoiceTone] = useState<'cinematic' | 'news' | 'raw'>('cinematic');
  const [speechRate, setSpeechRate] = useState(1.0);
  const [downloading, setDownloading] = useState(false);
  const reelRef = useRef<HTMLDivElement | null>(null);

  // Script text for voiceover narration
  const scriptText = `Breaking Awareness. ${newsItem.category} Update. ${newsItem.title}. ${newsItem.summary}. Rayu takeaway: ${newsItem.rayuTakeaway || newsItem.summary}`;
  const scriptWords = scriptText.split(' ');

  // Speech Synthesis setup
  useEffect(() => {
    if (!isPlaying) return;

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(scriptText);
      utterance.rate = speechRate;
      utterance.pitch = selectedVoiceTone === 'raw' ? 0.8 : selectedVoiceTone === 'news' ? 1.1 : 1.0;

      utterance.onboundary = (event) => {
        if (event.name === 'word') {
          const charIdx = event.charIndex;
          const wordIdx = scriptText.substring(0, charIdx).trim().split(/\s+/).length - 1;
          setCurrentWordIdx(Math.max(0, wordIdx));
        }
      };

      utterance.onend = () => {
        setIsPlaying(false);
        setCurrentWordIdx(0);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback word simulation interval
      const interval = setInterval(() => {
        setCurrentWordIdx((prev) => {
          if (prev >= scriptWords.length - 1) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [isPlaying, scriptText, speechRate, selectedVoiceTone, scriptWords.length]);

  const togglePlayback = () => {
    if (isPlaying) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      setCurrentWordIdx(0);
      setIsPlaying(true);
    }
  };

  const handleDownloadReelFrame = async () => {
    if (!reelRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(reelRef.current, { quality: 1.0, pixelRatio: 3, cacheBust: true });
      const link = document.createElement('a');
      link.download = `rayu-reel-frame-${newsItem.id}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Reel frame export failed:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="bg-[#050505] border border-white/10 p-6 rounded-sm text-white">
      {/* Voiceover & Speech Control Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 p-4 bg-[#090909] border border-white/10 rounded-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlayback}
            className="w-12 h-12 rounded-full bg-[#CCFF00] text-black flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_20px_rgba(204,255,0,0.4)] shrink-0 cursor-pointer"
          >
            {isPlaying ? <Pause size={20} className="fill-black" /> : <Play size={20} className="fill-black ml-1" />}
          </button>

          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#CCFF00] uppercase">
              <Volume2 size={14} />
              <span>AI VOICEOVER SYNTHESIS ENTIRELY SYNCED</span>
            </div>
            <span className="text-xs font-mono text-neutral-400">
              {isPlaying ? 'PLAYING VOICE & ANIMATED CAPTIONS...' : 'CLICK PLAY TO START VOICEOVER NARRATION'}
            </span>
          </div>
        </div>

        {/* Voice Tones & Speed */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-black border border-white/15 rounded p-1 text-[11px] font-mono">
            <button
              onClick={() => setSelectedVoiceTone('cinematic')}
              className={`px-2.5 py-1 rounded uppercase ${selectedVoiceTone === 'cinematic' ? 'bg-[#CCFF00] text-black font-bold' : 'text-neutral-400'}`}
            >
              CINEMATIC AI
            </button>
            <button
              onClick={() => setSelectedVoiceTone('news')}
              className={`px-2.5 py-1 rounded uppercase ${selectedVoiceTone === 'news' ? 'bg-[#CCFF00] text-black font-bold' : 'text-neutral-400'}`}
            >
              NEWSROOM HOST
            </button>
            <button
              onClick={() => setSelectedVoiceTone('raw')}
              className={`px-2.5 py-1 rounded uppercase ${selectedVoiceTone === 'raw' ? 'bg-[#CCFF00] text-black font-bold' : 'text-neutral-400'}`}
            >
              RAW UNFILTERED
            </button>
          </div>

          <button
            onClick={handleDownloadReelFrame}
            disabled={downloading}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold bg-[#0B0B0B] border border-white/20 text-[#CCFF00] hover:border-[#CCFF00] px-4 py-2 rounded transition-colors uppercase cursor-pointer"
          >
            <Download size={14} />
            <span>{downloading ? 'EXPORTING...' : 'DOWNLOAD 9:16 FRAME'}</span>
          </button>
        </div>
      </div>

      {/* 9:16 Vertical Video Studio Canvas Preview */}
      <div className="flex flex-col items-center">
        <span className="text-xs font-mono font-bold text-neutral-400 uppercase mb-4 block">
          🎬 9:16 INSTAGRAM REELS / SHORTS / TIKTOK VIDEO CANVAS (1080x1920 RATIO)
        </span>

        <div
          ref={reelRef}
          className="relative w-full max-w-[340px] aspect-[9/16] bg-black border border-white/20 rounded-md overflow-hidden p-6 flex flex-col justify-between shadow-2xl"
        >
          {/* Background Cover Image with Motion Overlay */}
          {newsItem.imageUrl && (
            <img
              src={newsItem.imageUrl}
              alt={newsItem.title}
              className={`absolute inset-0 w-full h-full object-cover opacity-35 transition-transform duration-10000 ${isPlaying ? 'scale-125' : 'scale-100'}`}
            />
          )}

          {/* Top Reel Header Overlay */}
          <div className="relative z-10 flex items-center justify-between border-b border-white/20 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span className="text-xs font-mono font-black text-white uppercase tracking-widest">RAYU REELS</span>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#CCFF00] text-black rounded uppercase">
              [{newsItem.category}]
            </span>
          </div>

          {/* Center Dynamic Word-by-Word Kinetic Caption Container */}
          <div className="relative z-10 my-auto text-center py-6 px-2 bg-black/60 border border-white/10 rounded-md backdrop-blur-md">
            <span className="text-[10px] font-mono text-[#CCFF00] uppercase block mb-3 font-bold">
              ⚡ LIVE SPEECH SYNTHESIS NARRATION
            </span>

            <h3 className="text-lg font-black text-white leading-tight uppercase mb-4">
              {newsItem.title}
            </h3>

            {/* Kinetic Caption Highlighting Box */}
            <div className="p-3 bg-black/80 border border-[#CCFF00]/40 rounded text-sm font-black uppercase text-white min-h-[60px] flex items-center justify-center leading-snug">
              <span>
                {scriptWords.map((word, idx) => {
                  const isHighlighted = idx === currentWordIdx && isPlaying;
                  return (
                    <span
                      key={idx}
                      className={`inline-block mx-0.5 px-1 rounded transition-colors ${
                        isHighlighted ? 'bg-[#CCFF00] text-black scale-110 shadow-[0_0_10px_rgba(204,255,0,0.8)]' : 'text-neutral-200'
                      }`}
                    >
                      {word}{' '}
                    </span>
                  );
                })}
              </span>
            </div>
          </div>

          {/* Bottom Waveform Visualizer & Branding Footer */}
          <div className="relative z-10 pt-3 border-t border-white/20">
            {/* Audio Waveform Simulator */}
            <div className="flex items-center justify-center gap-1 mb-3 h-5">
              {[40, 70, 30, 90, 60, 100, 45, 80, 50, 95, 65, 35].map((h, i) => (
                <span
                  key={i}
                  style={{ height: isPlaying ? `${Math.max(15, Math.round(h * Math.random()))}%` : '20%' }}
                  className="w-1 bg-[#CCFF00] rounded-full transition-all duration-150"
                />
              ))}
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono font-bold text-neutral-300">
              <span className="text-[#CCFF00]">@{INSTAGRAM_HANDLE}</span>
              <span>WWW.RAYU.COM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
