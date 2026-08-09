export interface InstagramPost {
  id: string;
  type: 'POST' | 'REEL' | 'STORY';
  caption: string;
  imageUrl: string;
  likesCount: number;
  commentsCount: number;
  date: string;
  permalink: string;
}

export const INSTAGRAM_HANDLE = 'thisisrayu';
export const INSTAGRAM_URL = 'https://www.instagram.com/thisisrayu/';
export const CONTACT_EMAIL = 'thisisrayu@gmail.com';
export const WEBSITE_DOMAIN = 'rayu-360.vercel.app';
export const WEBSITE_URL = 'https://rayu-360.vercel.app';

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'ig-1',
    type: 'REEL',
    caption: 'Why autonomous agents will change how software gets built in 2026. No more hand-coding repetitive boilerplates. Raw observations. #RAYU #Tech #AI',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    likesCount: 1420,
    commentsCount: 89,
    date: '2 HOURS AGO',
    permalink: INSTAGRAM_URL,
  },
  {
    id: 'ig-2',
    type: 'POST',
    caption: 'The Dark Forest Web: Why the best conversations are moving out of public algorithmic feeds and into private micro-communities.',
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    likesCount: 980,
    commentsCount: 42,
    date: 'YESTERDAY',
    permalink: INSTAGRAM_URL,
  },
  {
    id: 'ig-3',
    type: 'REEL',
    caption: 'India’s semiconductor revolution: Inside the new fab facilities shaping global hardware supply chains.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    likesCount: 2310,
    commentsCount: 154,
    date: '2 DAYS AGO',
    permalink: INSTAGRAM_URL,
  },
  {
    id: 'ig-4',
    type: 'POST',
    caption: 'First-principles breakdown: How to maintain deep focus in an era of hyper-stimulation.',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    likesCount: 1840,
    commentsCount: 96,
    date: '4 DAYS AGO',
    permalink: INSTAGRAM_URL,
  },
];
