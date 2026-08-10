'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, AlertTriangle, RefreshCw, Key, CheckCircle2, XCircle } from 'lucide-react';

interface KeyStatus {
  present: boolean;
  working: boolean;
  message: string;
}

interface StatusData {
  timestamp: string;
  statuses: {
    groq: KeyStatus;
    openai: KeyStatus;
    gemini: KeyStatus;
    huggingface: KeyStatus;
  };
  recommendation: string;
}

export const ApiKeysStatusPanel: React.FC = () => {
  const [data, setData] = useState<StatusData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const fetchStatus = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/keys-status');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error('Failed to fetch keys status:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <div className="mb-6 bg-[#080808] border border-white/15 rounded-sm text-white">
      {/* Header bar */}
      <div className="p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 bg-[#050505] border-b border-white/10">
        <div className="flex items-center gap-2">
          <Key size={16} className="text-[#CCFF00]" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider">
            AI ENGINE API KEY DIAGNOSTICS & STATUS
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick status badges */}
          <div className="flex items-center gap-1.5 font-mono text-[10px]">
            <span
              className={`px-2 py-0.5 rounded ${
                data?.statuses?.groq?.working ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400'
              }`}
            >
              GROQ: {data?.statuses?.groq?.working ? 'ACTIVE' : 'FAIL'}
            </span>

            <span
              className={`px-2 py-0.5 rounded ${
                data?.statuses?.openai?.working ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
              }`}
            >
              OPENAI: {data?.statuses?.openai?.working ? 'ACTIVE' : 'RESTRICTED'}
            </span>

            <span
              className={`px-2 py-0.5 rounded ${
                data?.statuses?.gemini?.working ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
              }`}
            >
              GEMINI: {data?.statuses?.gemini?.working ? 'ACTIVE' : 'OAUTH WARN'}
            </span>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[10px] font-mono text-neutral-400 hover:text-white px-2 py-1 border border-white/15 rounded hover:border-white/30 transition-colors uppercase cursor-pointer"
          >
            {isOpen ? 'HIDE DETAILS ▲' : 'VIEW DETAILS ▼'}
          </button>

          <button
            onClick={fetchStatus}
            disabled={isLoading}
            className="text-[10px] font-mono text-[#CCFF00] hover:text-white px-2 py-1 border border-[#CCFF00]/40 rounded hover:border-[#CCFF00] transition-colors uppercase cursor-pointer flex items-center gap-1"
          >
            <RefreshCw size={10} className={isLoading ? 'animate-spin' : ''} />
            <span>RE-TEST</span>
          </button>
        </div>
      </div>

      {/* Expanded Details Panel */}
      {isOpen && data && (
        <div className="p-4 space-y-3 bg-[#0A0A0A]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Groq Card */}
            <div className="p-3 bg-[#050505] border border-white/10 rounded">
              <div className="flex items-center justify-between text-xs font-mono font-bold mb-1">
                <span>GROQ LLAMA 3.1</span>
                {data.statuses.groq.working ? <CheckCircle2 size={14} className="text-green-400" /> : <XCircle size={14} className="text-red-400" />}
              </div>
              <p className="text-[10px] font-mono text-neutral-400 leading-tight">{data.statuses.groq.message}</p>
            </div>

            {/* OpenAI Card */}
            <div className="p-3 bg-[#050505] border border-white/10 rounded">
              <div className="flex items-center justify-between text-xs font-mono font-bold mb-1">
                <span>OPENAI DALL-E</span>
                {data.statuses.openai.working ? <CheckCircle2 size={14} className="text-green-400" /> : <AlertTriangle size={14} className="text-yellow-400" />}
              </div>
              <p className="text-[10px] font-mono text-neutral-400 leading-tight">{data.statuses.openai.message}</p>
            </div>

            {/* Gemini Card */}
            <div className="p-3 bg-[#050505] border border-white/10 rounded">
              <div className="flex items-center justify-between text-xs font-mono font-bold mb-1">
                <span>GEMINI IMAGEN</span>
                {data.statuses.gemini.working ? <CheckCircle2 size={14} className="text-green-400" /> : <AlertTriangle size={14} className="text-yellow-400" />}
              </div>
              <p className="text-[10px] font-mono text-neutral-400 leading-tight">{data.statuses.gemini.message}</p>
            </div>

            {/* Hugging Face Card */}
            <div className="p-3 bg-[#050505] border border-white/10 rounded">
              <div className="flex items-center justify-between text-xs font-mono font-bold mb-1">
                <span>HUGGING FACE</span>
                {data.statuses.huggingface.working ? <CheckCircle2 size={14} className="text-green-400" /> : <CheckCircle2 size={14} className="text-neutral-500" />}
              </div>
              <p className="text-[10px] font-mono text-neutral-400 leading-tight">{data.statuses.huggingface.message}</p>
            </div>
          </div>

          <div className="p-2.5 bg-[#CCFF00]/10 border border-[#CCFF00]/30 rounded text-[11px] font-mono text-[#CCFF00]">
            💡 <strong>System Engine Recommendation:</strong> {data.recommendation}
          </div>
        </div>
      )}
    </div>
  );
};
