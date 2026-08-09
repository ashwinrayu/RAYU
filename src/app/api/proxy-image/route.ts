import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 30;

/**
 * Image proxy — fetches an external image URL server-side and returns it
 * as a base64 data URL. Used by the studio download function to avoid
 * canvas CORS taint when exporting cards with Pollinations/external backgrounds.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const imageUrl = searchParams.get('url');

  if (!imageUrl) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  // Only allow fetching from known safe image sources
  const allowedHosts = [
    'image.pollinations.ai',
    'oaidalleapiprodscus.blob.core.windows.net',
    'images.unsplash.com',
    'api-inference.huggingface.co',
    'generativelanguage.googleapis.com',
  ];

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(imageUrl);
  } catch {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  const isAllowed = allowedHosts.some((h) => parsedUrl.hostname.endsWith(h));
  if (!isAllowed) {
    return NextResponse.json({ error: 'Host not allowed' }, { status: 403 });
  }

  try {
    const response = await fetch(imageUrl, {
      headers: { 'User-Agent': 'RAYU-Studio/1.0' },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch image: ${response.status}` },
        { status: 502 }
      );
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const dataUrl = `data:${contentType};base64,${base64}`;

    return NextResponse.json({ dataUrl, contentType });
  } catch (err) {
    console.error('[proxy-image] fetch error:', err);
    return NextResponse.json({ error: 'Failed to proxy image' }, { status: 500 });
  }
}
