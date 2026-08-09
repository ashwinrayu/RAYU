import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { prompt, category, title } = await req.json();

    const sanitizedTitle = (title || prompt || 'tech digital world').toLowerCase();
    
    // Extract key visual keywords from content
    let keywords = 'tech innovation minimalist high resolution photo 8k';
    
    if (sanitizedTitle.includes('gta') || sanitizedTitle.includes('vice city') || sanitizedTitle.includes('rockstar')) {
      keywords = 'grand theft auto vice city neon palm trees hyperrealistic night lighting tropical city sports car high detail game engine render 8k';
    } else if (sanitizedTitle.includes('llm') || sanitizedTitle.includes('ai') || sanitizedTitle.includes('model') || sanitizedTitle.includes('ollama')) {
      keywords = 'futuristic artificial intelligence neural network glowing code matrix screen developer workstation 8k cyber aesthetic';
    } else if (sanitizedTitle.includes('python') || sanitizedTitle.includes('bot') || sanitizedTitle.includes('terminal') || sanitizedTitle.includes('code')) {
      keywords = 'software engineering code editor dark theme cyber terminal neon code syntax developer desk photorealistic 8k';
    } else if (sanitizedTitle.includes('semiconductor') || sanitizedTitle.includes('chip') || sanitizedTitle.includes('fab') || sanitizedTitle.includes('silicon')) {
      keywords = 'high tech silicon wafer semiconductor cleanroom microchip manufacturing robotic cleanroom factory 8k precision photo';
    } else if (sanitizedTitle.includes('isro') || sanitizedTitle.includes('space') || sanitizedTitle.includes('rocket') || sanitizedTitle.includes('launch')) {
      keywords = 'futuristic space launch vehicle spacecraft rocket landing on coastal spaceport dramatic sunset sky 8k hyperrealistic';
    } else if (sanitizedTitle.includes('war') || sanitizedTitle.includes('defense') || sanitizedTitle.includes('navy') || sanitizedTitle.includes('cyber')) {
      keywords = 'global cybersecurity defense network radar submarine fiber optic cable network glowing digital world map 8k';
    } else if (sanitizedTitle.includes('india') || sanitizedTitle.includes('upi') || sanitizedTitle.includes('economy')) {
      keywords = 'modern india technology skyline digital fintech network glowing connections 8k cinematic photograph';
    } else {
      keywords = `${sanitizedTitle} cinematic minimalist photorealistic 8k high quality photo`;
    }

    // Generate real-time unique AI image via Pollinations AI live synthesis API
    const seed = Math.floor(Math.random() * 100000);
    const dynamicAiImageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(keywords)}?width=1200&height=1200&nologo=true&seed=${seed}`;

    return NextResponse.json({
      success: true,
      imageUrl: dynamicAiImageUrl,
      keywordsUsed: keywords,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'AI generation error' },
      { status: 500 }
    );
  }
}
