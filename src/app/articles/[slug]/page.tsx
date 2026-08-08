import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Share2, Check, Clock, Calendar } from 'lucide-react';
import { IconX } from '@/components/ui/SocialIcons';
import { ARTICLES_DATA } from '@/data/articles';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const article = ARTICLES_DATA.find((a) => a.slug === resolvedParams.slug);

  if (!article) {
    return {
      title: 'Article Not Found — RAYU',
      description: 'The requested article could not be found.',
    };
  }

  const baseUrl = 'https://rayu.com';
  const articleUrl = `${baseUrl}/articles/${article.slug}`;
  const ogImageUrl = `${baseUrl}/api/og?title=${encodeURIComponent(article.title)}&category=${encodeURIComponent(article.category)}&date=${encodeURIComponent(article.date)}`;
  const teaserDescription = `${article.excerpt} Read raw, unfiltered commentary on ${article.category.toLowerCase()} at RAYU.`;

  return {
    title: `${article.title} — RAYU`,
    description: teaserDescription.slice(0, 160),
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      title: `${article.title} — RAYU`,
      description: teaserDescription,
      url: articleUrl,
      siteName: 'RAYU',
      type: 'article',
      publishedTime: article.date,
      authors: ['RAYU'],
      tags: article.tags,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${article.title} — RAYU`,
      description: teaserDescription,
      images: [ogImageUrl],
      creator: '@thisisrayu',
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const article = ARTICLES_DATA.find((a) => a.slug === resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const currentIndex = ARTICLES_DATA.findIndex((a) => a.id === article.id);
  const nextArticle = ARTICLES_DATA[(currentIndex + 1) % ARTICLES_DATA.length];
  const prevArticle = ARTICLES_DATA[(currentIndex - 1 + ARTICLES_DATA.length) % ARTICLES_DATA.length];

  const baseUrl = 'https://rayu.com';

  // BlogPosting JSON-LD Schema
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Person',
      name: 'RAYU',
      url: 'https://rayu.com/about',
      sameAs: [
        'https://x.com/thisisrayu',
        'https://instagram.com/thisisrayu',
        'https://youtube.com/@thisisrayu',
      ],
    },
    publisher: {
      '@type': 'Organization',
      name: 'RAYU',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/icon.svg`,
      },
    },
    image: article.imageUrl,
    mainEntityOfPage: `${baseUrl}/articles/${article.slug}`,
  };

  // BreadcrumbList JSON-LD Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Articles',
        item: `${baseUrl}/articles`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.category,
        item: `${baseUrl}/articles?category=${article.category}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: article.title,
        item: `${baseUrl}/articles/${article.slug}`,
      },
    ],
  };

  return (
    <article className="bg-[#050505] text-white pt-32 pb-24 min-h-screen">
      {/* Inject JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-neutral-400 hover:text-[#CCFF00] transition-colors uppercase"
          >
            <ArrowLeft size={14} />
            <span>BACK TO ALL ARTICLES</span>
          </Link>
        </div>

        {/* Header Metadata */}
        <div className="mb-8">
          <div className="flex items-center gap-3 text-xs font-mono text-[#CCFF00] mb-4 uppercase">
            <span className="font-bold border border-[#CCFF00]/40 px-2.5 py-1 rounded-sm bg-[#CCFF00]/10">
              {article.category}
            </span>
            <div className="flex items-center gap-1.5 text-neutral-400">
              <Calendar size={13} />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1.5 text-neutral-400">
              <Clock size={13} />
              <span>{article.readTime}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase leading-tight mb-6">
            {article.title}
          </h1>

          <p className="text-lg sm:text-xl text-neutral-300 font-normal leading-relaxed mb-8">
            {article.subtitle || article.excerpt}
          </p>

          {/* Author & Share Bar */}
          <div className="flex items-center justify-between border-y border-white/10 py-4 text-xs font-mono">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#CCFF00] text-[#050505] font-black flex items-center justify-center">
                R
              </div>
              <div>
                <div className="font-bold text-white uppercase">{article.author}</div>
                <div className="text-neutral-500 text-[10px]">UNFILTERED COMMENTARY</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`${baseUrl}/articles/${article.slug}`)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-neutral-400 hover:text-[#CCFF00] transition-colors border border-white/10 px-3 py-1.5 rounded-sm"
              >
                <IconX size={14} />
                <span>SHARE ON X</span>
              </a>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] w-full bg-neutral-900 rounded-sm overflow-hidden border border-white/10 mb-12">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Formatted Article Body */}
        <div className="prose prose-invert max-w-none text-neutral-300 text-base sm:text-lg leading-relaxed font-normal space-y-6 mb-16">
          {article.content.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h2
                  key={index}
                  className="text-2xl font-bold tracking-tight text-white uppercase pt-6 pb-2 border-b border-white/10"
                >
                  {paragraph.replace('### ', '')}
                </h2>
              );
            }
            if (paragraph.startsWith('> ')) {
              return (
                <blockquote
                  key={index}
                  className="p-6 bg-[#0B0B0B] border-l-4 border-[#CCFF00] italic text-white font-mono text-base rounded-r-sm my-6"
                >
                  {paragraph.replace('> ', '')}
                </blockquote>
              );
            }
            return <p key={index}>{paragraph}</p>;
          })}
        </div>

        {/* Article Navigation Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10 pt-10 mb-16">
          <Link
            href={`/articles/${prevArticle.slug}`}
            className="p-5 bg-[#0B0B0B] border border-white/10 rounded-sm hover:border-[#CCFF00] transition-colors flex flex-col justify-between group"
          >
            <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-500 uppercase mb-2">
              ← PREVIOUS ARTICLE
            </span>
            <span className="text-sm font-bold text-white group-hover:text-[#CCFF00] transition-colors line-clamp-1 uppercase">
              {prevArticle.title}
            </span>
          </Link>

          <Link
            href={`/articles/${nextArticle.slug}`}
            className="p-5 bg-[#0B0B0B] border border-white/10 rounded-sm hover:border-[#CCFF00] transition-colors flex flex-col justify-between text-right group"
          >
            <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-500 uppercase mb-2">
              NEXT ARTICLE →
            </span>
            <span className="text-sm font-bold text-white group-hover:text-[#CCFF00] transition-colors line-clamp-1 uppercase">
              {nextArticle.title}
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
