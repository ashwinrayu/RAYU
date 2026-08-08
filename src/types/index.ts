export interface Article {
  id: string;
  slug: string;
  category: 'TECH' | 'THOUGHTS' | 'WORLD' | 'LIFE' | 'RANDOM';
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
  featured?: boolean;
  tags: string[];
}

export interface Thought {
  id: string;
  date: string;
  timestamp: string;
  category: string;
  content: string;
  highlightText?: string;
  likesCount?: number;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'TOOLS' | 'WEBSITES' | 'BOOKS' | 'VIDEOS' | 'APPS' | 'AI' | 'CREATIVE' | 'PRODUCTIVITY';
  url: string;
  rating?: string;
  badge?: string;
  featured?: boolean;
}

export interface Topic {
  id: string;
  name: 'TECH' | 'WORLD' | 'LIFE' | 'THOUGHTS' | 'RANDOM';
  description: string;
  iconName: string;
  count: number;
}

export interface CreatorMetric {
  label: string;
  value: string;
  isAccent?: boolean;
}
