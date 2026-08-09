import { NextResponse } from 'next/server';
import { fetchLiveOmniNews } from '@/services/newsFetcher';

export const revalidate = 300; // Revalidate every 5 minutes

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category')?.toUpperCase();
    const region = searchParams.get('region')?.toUpperCase();

    let data = await fetchLiveOmniNews();

    if (category && category !== 'ALL') {
      data = data.filter((item) => item.category === category);
    }

    if (region && region !== 'ALL') {
      data = data.filter((item) => item.region === region);
    }

    return NextResponse.json(
      {
        success: true,
        count: data.length,
        updatedAt: new Date().toISOString(),
        items: data,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch live news stream',
      },
      { status: 500 }
    );
  }
}
