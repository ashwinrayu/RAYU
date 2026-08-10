/**
 * RAYU Studio V2 — Content-Type Agnostic Post Content Interface
 * Replaces old news-specific data models with a generic model for any post type.
 */

export type ContentType = 'TAKE' | 'REFLECTION' | 'LIST' | 'REACTION' | 'THOUGHT';
export type PostCategory = 'TECH' | 'WORLD' | 'LIFE' | 'LEARNINGS';
export type LayoutVariant = 'HEADLINE_DOMINANT' | 'QUOTE_STATEMENT' | 'DATA_LED' | 'SPLIT' | 'LIST_BREAKDOWN';
export type AspectRatio = '1:1' | '4:5';

export interface CarouselSlide {
  id: string;
  slideNumber: number;
  slideType: 'COVER' | 'CONTENT' | 'CTA';
  headline: string;
  bodyText?: string;
  bulletPoints?: string[];
}

export interface PostContent {
  id: string;
  contentType: ContentType;
  category: PostCategory;
  layoutVariant: LayoutVariant;
  aspectRatio: AspectRatio;
  headline: string;
  body?: string;
  rayuTakeaway?: string;
  sourceUrl?: string;
  sourceImage?: string;
  slides?: CarouselSlide[];
  publishedAt?: string;
}

export const DEFAULT_POST_CONTENT: PostContent = {
  id: 'v2-default-1',
  contentType: 'TAKE',
  category: 'TECH',
  layoutVariant: 'HEADLINE_DOMINANT',
  aspectRatio: '1:1',
  headline: 'ARTIFICIAL INTELLIGENCE IS NOT REPLACING CREATORS — IT IS EXPANDING LEVERAGE',
  body: 'The real shift happening right now is not automation of output, but scaling human intentionality across visual and interactive media.',
  rayuTakeaway: 'Leverage compounds for those who control direction over execution.',
  sourceUrl: 'https://rayu-360.vercel.app',
};
