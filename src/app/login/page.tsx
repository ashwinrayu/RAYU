'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(email, password);
    if (success) {
      router.push('/admin/studio');
    } else {
      setError('Invalid email or password. Access denied.');
    }
  };

  return (
    <div className="bg-[#050505] text-white pt-36 pb-24 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-6">
        {/* Header Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[#CCFF00]/10 border border-[#CCFF00]/30 text-[#CCFF00] text-xs font-mono font-bold uppercase mb-4">
            <Sparkles size={14} />
            <span>CREATOR ACCESS PORTAL</span>
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tight">
            CREATOR <span className="text-[#CCFF00]">STUDIO LOGIN</span>
          </h1>
          <p className="text-xs font-mono text-neutral-400 mt-2">
            Log in to access the Rayu Studio & Instagram cross-publisher
          </p>
        </div>

        {/* Login Form Card */}
        <div className="bg-[#0B0B0B] border border-white/10 p-8 rounded-sm shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Laser Glow */}
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#CCFF00]/10 rounded-full blur-2xl pointer-events-none" />

          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono rounded-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-neutral-300 mb-2">
                CREATOR EMAIL
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@domain.com"
                  className="w-full bg-[#050505] border border-white/15 focus:border-[#CCFF00] pl-11 pr-4 py-3.5 text-sm text-white rounded-sm outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-neutral-300 mb-2">
                PASSWORD
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-[#050505] border border-white/15 focus:border-[#CCFF00] pl-11 pr-4 py-3.5 text-sm text-white rounded-sm outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="cta-element btn-sweep w-full bg-[#CCFF00] text-[#050505] text-xs font-bold uppercase tracking-wider py-4 rounded-sm hover:bg-[#b5e600] transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(204,255,0,0.35)]"
            >
              <span>LOG IN TO CREATOR STUDIO</span>
              <ArrowRight size={15} />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center text-xs font-mono text-neutral-500">
            <ShieldCheck size={14} className="inline mr-1 text-[#CCFF00]" />
            <span>Encrypted Creator Session</span>
          </div>
        </div>
      </div>
    </div>
  );
}
