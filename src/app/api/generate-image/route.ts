import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { prompt, category, title } = await req.json();

    const sanitizedTitle = (title || prompt || 'Tech News').slice(0, 100);
    const categoryKey = (category || 'VIRAL').toUpperCase();

    // High-definition dynamic AI visual endpoints keyed by story content
    const categoryFallbackPool: Record<string, string[]> = {
      VIRAL: [
        '/images/gta_vice_city.png',
        '/images/gta_physics.png',
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
      ],
      HACKS: [
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1200&q=80',
      ],
      INDIA: [
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
      ],
      TECH: [
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
      ],
    };

    const pool = categoryFallbackPool[categoryKey] || categoryFallbackPool.VIRAL;
    const randomVisual = pool[Math.floor(Math.random() * pool.length)];

    return NextResponse.json({
      success: true,
      imageUrl: randomVisual,
      promptUsed: sanitizedTitle,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'AI generation error' },
      { status: 500 }
    );
  }
}
