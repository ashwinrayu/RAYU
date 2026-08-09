export interface TopicMeta {
  slug: string;
  categoryKey: string;
  name: string;
  tagline: string;
  description: string;
  longIntro: string;
  articleCount: number;
  iconName: string;
  accentColor: string;
  keyThemes: string[];
}

export const TOPICS_DATA: Record<string, TopicMeta> = {
  tech: {
    slug: 'tech',
    categoryKey: 'TECH',
    name: 'Tech & Systems',
    tagline: 'AI, Autonomous Agents & Systemic Software Shifts',
    description: 'Artificial intelligence, autonomous agents, modern software architecture, tech shifts, and what actually matters behind the hype cycle.',
    longIntro:
      'Technology moves faster than human comprehension. This space is dedicated to unvarnished analysis of artificial intelligence, autonomous agentic systems, developer tooling, and macro software shifts — written from the perspective of an active builder, not a hype producer.',
    articleCount: 14,
    iconName: 'Cpu',
    accentColor: '#CCFF00',
    keyThemes: ['Artificial Intelligence', 'Autonomous Agents', 'Software Architecture', 'Developer Experience', 'Next.js & Turbopack'],
  },
  world: {
    slug: 'world',
    categoryKey: 'WORLD',
    name: 'World & Culture',
    tagline: 'Internet Evolution, Dark Forest Web & Digital Shifts',
    description: 'Commentary on internet evolution, changing digital landscapes, dark forest web theories, social platforms, and global cultural shifts.',
    longIntro:
      'The public internet has transformed into an algorithmic noise machine. In this topic, we examine the migration toward private digital spaces (the Dark Forest Web), changing human behavior on social networks, and how technology reshapes real-world culture.',
    articleCount: 9,
    iconName: 'Globe',
    accentColor: '#CCFF00',
    keyThemes: ['Dark Forest Web', 'Internet Evolution', 'Algorithmic Feeds', 'Digital Culture', 'Privacy & Curation'],
  },
  life: {
    slug: 'life',
    categoryKey: 'LIFE',
    name: 'Life & Mindset',
    tagline: 'First-Principles Thinking & Unvarnished Observations',
    description: 'Personal reflections, first-principles realizations, mindset shifts, focus in an era of distraction, and unvarnished life observations.',
    longIntro:
      'Living intentionally in a hyper-stimulated world requires ruthless prioritization and clear mental models. Here you will find honest observations on discipline, long-term leverage, focus, and navigating modern life without losing your human edge.',
    articleCount: 11,
    iconName: 'Compass',
    accentColor: '#CCFF00',
    keyThemes: ['First-Principles', 'Focus & Deep Work', 'Mental Models', 'Discipline', 'Intentional Living'],
  },
  thoughts: {
    slug: 'thoughts',
    categoryKey: 'THOUGHTS',
    name: 'Raw Thoughts',
    tagline: 'Real-Time Running Commentary & Unfiltered Takes',
    description: 'Direct takes, unfiltered opinions, and persistent questions recorded in real time as observations register.',
    longIntro:
      'Raw, un-edited thoughts posted as they happen. No polishing, no PR safety, no corporate filter. Pure observation captured in the moment before it gets softened into something safe.',
    articleCount: 18,
    iconName: 'Zap',
    accentColor: '#CCFF00',
    keyThemes: ['Real-Time Notes', 'Unfiltered Commentary', 'Unresolved Questions', 'Direct Observations'],
  },
  learnings: {
    slug: 'learnings',
    categoryKey: 'RANDOM',
    name: 'Learnings & Frameworks',
    tagline: 'Curious Discoveries & Tactical Knowledge Breakdown',
    description: 'Eclectic insights, curious discoveries, tactical breakdowns, book notes, and practical frameworks worth sharing.',
    longIntro:
      'A collection of tactical learnings, technical mental models, book breakdowns, and curious discoveries gathered while building projects and studying complex systems.',
    articleCount: 7,
    iconName: 'BookOpen',
    accentColor: '#CCFF00',
    keyThemes: ['Mental Frameworks', 'Book Notes', 'System Architecture', 'Problem Solving', 'Tactical Insights'],
  },
};
