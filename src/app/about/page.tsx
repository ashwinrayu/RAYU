import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, Quote } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About RAYU — Raw Awareness. Unfiltered Perspective.',
  description:
    'RAYU is an independent running commentary on technology, the world, life, ideas, and observations. Posted as it happens, not after it is edited into something safer.',
  alternates: {
    canonical: 'https://rayu.com/about',
  },
  openGraph: {
    title: 'About RAYU — Raw Awareness. Unfiltered Perspective.',
    description:
      'RAYU is an independent running commentary on technology, the world, life, ideas, and observations.',
    url: 'https://rayu.com/about',
    siteName: 'RAYU',
    type: 'profile',
    images: ['https://rayu.com/api/og?title=ABOUT%20RAYU&category=ABOUT'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About RAYU — Thinking as it happens',
    description: 'Raw awareness. Straight to you. Unfiltered.',
    images: ['https://rayu.com/api/og?title=ABOUT%20RAYU&category=ABOUT'],
    creator: '@thisisrayu',
  },
};

export default function AboutPage() {
  const personOrganizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RAYU',
    url: 'https://rayu.com',
    logo: 'https://rayu.com/icon.svg',
    description: 'Unfiltered running commentary on technology, the world, life, and ideas.',
    founder: {
      '@type': 'Person',
      name: 'RAYU',
      jobTitle: 'Independent Technologist & Writer',
      url: 'https://rayu.com/about',
      sameAs: [
        'https://x.com/thisisrayu',
        'https://instagram.com/thisisrayu',
        'https://youtube.com/@thisisrayu',
      ],
    },
    sameAs: [
      'https://x.com/thisisrayu',
      'https://instagram.com/thisisrayu',
      'https://youtube.com/@thisisrayu',
    ],
  };

  return (
    <div className="bg-[#050505] text-white pt-32 pb-24 min-h-screen">
      {/* Inject Person & Organization JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personOrganizationSchema) }}
      />

      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Header Title */}
        <div className="mb-16 border-b border-white/10 pb-10">
          <span className="text-xs font-mono font-bold tracking-widest text-[#CCFF00] uppercase block mb-3">
            ABOUT RAYU
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase leading-none mb-6">
            RAW AWARENESS.<br />
            <span className="text-[#CCFF00]">UNFILTERED PERSPECTIVE.</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 max-w-2xl leading-relaxed">
            Tech. World. Life. Whatever&apos;s actually on my mind — posted as it happens, not after it&apos;s been cleaned up into something safer.
          </p>
        </div>

        {/* Section 1: WHAT IS RAYU? */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20">
          <div className="md:col-span-4">
            <h2 className="text-xs font-mono font-bold tracking-widest text-[#CCFF00] uppercase">
              01 — WHAT IS RAYU?
            </h2>
          </div>
          <div className="md:col-span-8 space-y-6 text-neutral-300 text-base leading-relaxed">
            <p className="text-xl font-bold text-white leading-snug">
              RAYU is not a niche page. It is an unfiltered running commentary on technology, the world, life, ideas, observations, and anything else worth talking about.
            </p>
            <p>
              In a digital landscape saturated with SEO-optimized articles, PR spin, and algorithmically sanitized content, RAYU is designed to be the exact opposite: an authentic human voice recording thoughts in real time.
            </p>
          </div>
        </div>

        {/* Section 2: THE R-A-Y-U MEANING */}
        <div className="mb-24 p-8 md:p-12 bg-[#0B0B0B] border border-white/10 rounded-sm">
          <div className="mb-8 border-b border-white/10 pb-4">
            <h2 className="text-xs font-mono font-bold tracking-widest text-[#CCFF00] uppercase">
              02 — THE R-A-Y-U MEANING
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <div className="text-4xl font-black text-[#CCFF00] mb-2">R</div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-2">RAW</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                The first, honest version of a thought, before it gets edited into something safer.
              </p>
            </div>
            <div>
              <div className="text-4xl font-black text-[#CCFF00] mb-2">A</div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-2">AWARENESS</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                The moment something registers, before it&apos;s even fully formed into words.
              </p>
            </div>
            <div>
              <div className="text-4xl font-black text-[#CCFF00] mb-2">Y</div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-2">YOU</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Where that awareness goes — shared straight to you, as it happens.
              </p>
            </div>
            <div>
              <div className="text-4xl font-black text-[#CCFF00] mb-2">U</div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-2">UNFILTERED</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                No spin. No sugarcoating. What you see is what was actually thought.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: THE RULE */}
        <div className="mb-24 relative p-10 bg-gradient-to-r from-[#CCFF00]/10 via-transparent to-transparent border-l-4 border-[#CCFF00]">
          <Quote size={36} className="text-[#CCFF00] mb-4 opacity-50" />
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white uppercase mb-3">
            THE RULE
          </h2>
          <p className="text-xl sm:text-2xl font-mono text-[#CCFF00]">
            &quot;If it catches my attention, it belongs here.&quot;
          </p>
        </div>

        {/* Section 4: WHO IS BEHIND IT? */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20 items-center">
          <div className="md:col-span-5 relative aspect-[4/5] rounded-sm overflow-hidden border border-white/10 bg-neutral-900">
            <Image
              src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1000&auto=format&fit=crop"
              alt="Rayu Creator Silhouette"
              fill
              className="object-cover grayscale contrast-150 brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
          </div>
          <div className="md:col-span-7 space-y-6 text-neutral-300">
            <h2 className="text-xs font-mono font-bold tracking-widest text-[#CCFF00] uppercase">
              03 — WHO IS BEHIND IT?
            </h2>
            <h3 className="text-2xl font-bold text-white uppercase tracking-tight">
              THERE&apos;S A PERSON BEHIND RAYU. BUT RAYU IS NOT ABOUT THAT PERSON.
            </h3>
            <p className="leading-relaxed text-sm sm:text-base">
              I am a creator, technologist, and observer based somewhere between code lines and real-world observations. I created RAYU because I got tired of reading corporate-approved, over-edited internet commentary.
            </p>
            <p className="leading-relaxed text-sm sm:text-base">
              This site isn&apos;t a resume. It&apos;s not a portfolio meant to impress recruiters. It is an open window into a mind reacting to the world in real time.
            </p>
            <div className="pt-4">
              <Link
                href="/contact"
                data-cursor-label="GO"
                className="cta-element btn-sweep inline-flex items-center gap-3 bg-[#CCFF00] text-[#050505] text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-sm hover:bg-[#b8e600] transition-colors"
              >
                <span>GET IN TOUCH WITH ME</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
