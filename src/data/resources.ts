import { Resource, Topic } from '@/types';

export const TOPICS_DATA: Topic[] = [
  {
    id: 'tech',
    name: 'TECH',
    description: 'Thoughts on tech, AI, tools and the future.',
    iconName: 'Cpu',
    count: 24,
  },
  {
    id: 'world',
    name: 'WORLD',
    description: "What's happening around the world that matters.",
    iconName: 'Globe',
    count: 18,
  },
  {
    id: 'life',
    name: 'LIFE',
    description: 'Lessons, reflections and everyday realizations.',
    iconName: 'User',
    count: 31,
  },
  {
    id: 'thoughts',
    name: 'THOUGHTS',
    description: "Opinions, takes and things I can't stop thinking about.",
    iconName: 'MessageSquare',
    count: 45,
  },
  {
    id: 'random',
    name: 'RANDOM',
    description: 'Random stuff that caught my attention.',
    iconName: 'Dices',
    count: 12,
  },
];

export const RESOURCES_DATA: Resource[] = [
  {
    id: 'res-1',
    title: 'Next.js App Router Documentation',
    description: 'The definitive architectural guide for modern React application architecture.',
    category: 'TOOLS',
    url: 'https://nextjs.org/docs',
    badge: 'Essential',
    featured: true,
  },
  {
    id: 'res-2',
    title: 'Framer Motion API Reference',
    description: 'Production-ready animation library for React to create declarative UI transitions.',
    category: 'CREATIVE',
    url: 'https://framer.com/motion',
    badge: 'Animation',
  },
  {
    id: 'res-3',
    title: 'Three.js & WebGL Engine',
    description: 'High performance 3D graphics rendering in the browser without plugins.',
    category: 'CREATIVE',
    url: 'https://threejs.org',
    badge: 'WebGL',
  },
  {
    id: 'res-4',
    title: 'Anthropic Claude 3.7 Sonnet',
    description: 'State of the art reasoning model for code generation and deep architectural synthesis.',
    category: 'AI',
    url: 'https://anthropic.com',
    badge: 'AI Model',
    featured: true,
  },
  {
    id: 'res-5',
    title: 'Supabase Open Source Firebase Alternative',
    description: 'PostgreSQL database with instant realtime subscriptions, auth, and edge functions.',
    category: 'TOOLS',
    url: 'https://supabase.com',
    badge: 'Backend',
  },
  {
    id: 'res-6',
    title: 'Lucide Icon Library',
    description: 'Beautiful & consistent open-source icon set designed for modern web applications.',
    category: 'PRODUCTIVITY',
    url: 'https://lucide.dev',
    badge: 'Design System',
  },
];
