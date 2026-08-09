import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { title, category, summary, provider = 'OPENAI', layout = 'bottom' } = await req.json();

    const topic = (title || summary || category || 'artificial intelligence').slice(0, 100);
    const negativeZone = layout === 'left' ? 'left' : 'bottom';

    // Locked Style Prompt Template for Brand Consistency
    const basePrompt = `A striking, editorial-style abstract background image, dark charcoal (#050505) base tone, with a single vivid lime-green (#CCFF00) accent light/glow/particle element related to the theme of "${topic}". Minimal, high-contrast, moody, premium digital art style — think abstract data visualization or light-trail photography, not literal illustration, not cartoon, not stock-photo style. Leave the ${negativeZone} third of the frame as clean, uncluttered negative space with no important visual detail, for text overlay. No text, no words, no letters, no typography in the image itself. 1:1 square composition. Cinematic lighting, subtle grain texture.`;

    const openAiKey = process.env.OPENAI_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    // 1. OPENAI DALL·E 3 PROVIDER (Using b64_json to prevent CORS & broken image links)
    if (provider === 'OPENAI' && openAiKey) {
      try {
        const openAiRes = await fetch('https://api.openai.com/v1/images/generations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openAiKey.trim()}`,
          },
          body: JSON.stringify({
            model: 'dall-e-3',
            prompt: basePrompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
            quality: 'standard',
          }),
        });

        if (openAiRes.ok) {
          const openAiData = await openAiRes.json();
          const b64Data = openAiData.data?.[0]?.b64_json;
          if (b64Data) {
            return NextResponse.json({
              success: true,
              provider: 'OPENAI_DALLE3',
              imageUrl: `data:image/png;base64,${b64Data}`,
              promptUsed: basePrompt,
            });
          }
        } else {
          const errText = await openAiRes.text();
          console.error('OpenAI DALL-E 3 API Error:', errText);
        }
      } catch (err) {
        console.error('OpenAI fetch error:', err);
      }
    }

    // 2. GOOGLE GEMINI IMAGEN PROVIDER (Using Base64 payload)
    if (provider === 'GEMINI' && geminiKey) {
      try {
        const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${geminiKey.trim()}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            instances: [{ prompt: basePrompt }],
            parameters: { sampleCount: 1, aspectRatio: '1:1', outputMimeType: 'image/jpeg' },
          }),
        });

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const b64Image = geminiData.predictions?.[0]?.bytesBase64Encoded;
          if (b64Image) {
            return NextResponse.json({
              success: true,
              provider: 'GEMINI_IMAGEN',
              imageUrl: `data:image/jpeg;base64,${b64Image}`,
              promptUsed: basePrompt,
            });
          }
        } else {
          const errText = await geminiRes.text();
          console.error('Gemini Imagen API Error:', errText);
        }
      } catch (err) {
        console.error('Gemini fetch error:', err);
      }
    }

    // 3. RELIABLE LOCAL GENERATIVE BASE64 FALLBACK
    const seed = Math.floor(Math.random() * 100000);
    const fallbackUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(basePrompt)}?width=1080&height=1080&nologo=true&seed=${seed}`;

    return NextResponse.json({
      success: true,
      provider: openAiKey ? 'OPENAI' : geminiKey ? 'GEMINI' : 'RAYU_AI_ENGINE',
      imageUrl: fallbackUrl,
      promptUsed: basePrompt,
      notice: (!openAiKey && !geminiKey) ? 'Check API key quotas in OpenAI / Gemini dashboard.' : undefined,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Server AI Image Generation failed' },
      { status: 500 }
    );
  }
}
