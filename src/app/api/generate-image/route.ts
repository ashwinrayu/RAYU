import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { prompt, category, title } = await req.json();

    const sanitizedTitle = (title || prompt || 'Global News').toLowerCase();
    const categoryKey = (category || 'VIRAL').toUpperCase();

    // 100% Comprehensive Category Prompt Synthesizer
    let keywords = '';

    switch (categoryKey) {
      case 'VIRAL':
        keywords = 'grand theft auto vice city neon palm trees hyperrealistic night lighting tropical city sports car high detail game engine render 8k';
        break;

      case 'HACKS':
        keywords = 'step by step tech tutorial code terminal screen developer workstation laptop glowing code syntax cyber aesthetic 8k photo';
        break;

      case 'INDIA':
        keywords = 'modern india high tech infrastructure semiconductor silicon wafer facility ISRO spaceport futuristic digital india 8k photograph';
        break;

      case 'TECH':
        keywords = 'futuristic artificial intelligence neural network glowing code matrix screen developer workstation 8k cyber aesthetic';
        break;

      case 'WAR':
        keywords = 'global cybersecurity defense network radar submarine fiber optic cable network glowing digital world map 8k dramatic lighting';
        break;

      case 'POLITICS':
        keywords = 'financial capital stock exchange market central bank building monetary digital charts macro economy high resolution photo 8k';
        break;

      case 'MOVIES':
        keywords = 'cinematic blockbuster movie scene IMAX 70mm sci-fi film set dramatic lighting Hollywood production quality 8k photorealistic';
        break;

      case 'GAMING':
        keywords = 'next generation game engine photorealistic virtual world esports arena real-time ray tracing graphics render 8k';
        break;

      case 'WEATHER':
        keywords = 'satellite climate telemetry tropical monsoon storm rain clouds dramatic weather sky forecast 8k nature photograph';
        break;

      default:
        keywords = `${sanitizedTitle} cinematic minimalist photorealistic 8k high quality photo`;
        break;
    }

    // Append title keywords for maximum content relevance
    const finalPrompt = `${sanitizedTitle} ${keywords}`;
    const seed = Math.floor(Math.random() * 100000);
    const dynamicAiImageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(finalPrompt)}?width=1200&height=1200&nologo=true&seed=${seed}`;

    return NextResponse.json({
      success: true,
      imageUrl: dynamicAiImageUrl,
      categoryUsed: categoryKey,
      promptUsed: finalPrompt,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'AI generation error' },
      { status: 500 }
    );
  }
}
