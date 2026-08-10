import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

/**
 * Live API Keys Diagnostics & Health Check API Route
 * Tests OpenAI, Gemini, Groq, and HuggingFace API keys and returns status JSON.
 */

export async function GET() {
  const openAiKey = (process.env.OPENAI_API_KEY || '').trim().replace(/^["']|["']$/g, '');
  const geminiKey = (process.env.GEMINI_API_KEY || '').trim().replace(/^["']|["']$/g, '');
  const groqKey = (process.env.GROQ_API_KEY || '').trim().replace(/^["']|["']$/g, '');
  const hfKey = (process.env.HUGGINGFACE_API_KEY || '').trim().replace(/^["']|["']$/g, '');

  const statuses: Record<string, { present: boolean; working: boolean; message: string }> = {
    groq: { present: false, working: false, message: 'Not configured' },
    openai: { present: false, working: false, message: 'Not configured' },
    gemini: { present: false, working: false, message: 'Not configured' },
    huggingface: { present: false, working: false, message: 'Not configured' },
  };

  // 1. Test Groq Key
  if (groqKey) {
    statuses.groq.present = true;
    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${groqKey}` },
        body: JSON.stringify({ model: 'llama-3.1-8b-instant', messages: [{ role: 'user', content: 'hi' }], max_tokens: 5 }),
      });
      if (res.ok) {
        statuses.groq.working = true;
        statuses.groq.message = 'Active (Llama 3.1 8B Synthesizer Ready)';
      } else {
        const text = await res.text();
        statuses.groq.message = `HTTP ${res.status}: ${text.slice(0, 100)}`;
      }
    } catch (err: any) {
      statuses.groq.message = `Fetch error: ${err.message}`;
    }
  }

  // 2. Test OpenAI Key
  if (openAiKey) {
    statuses.openai.present = true;
    try {
      const res = await fetch('https://api.openai.com/v1/models', {
        headers: { Authorization: `Bearer ${openAiKey}` },
      });
      if (res.ok) {
        statuses.openai.working = true;
        statuses.openai.message = 'Active (OpenAI API Access Ready)';
      } else {
        const text = await res.text();
        statuses.openai.message = `HTTP ${res.status}: Quota or model restriction`;
      }
    } catch (err: any) {
      statuses.openai.message = `Fetch error: ${err.message}`;
    }
  }

  // 3. Test Gemini Key
  if (geminiKey) {
    statuses.gemini.present = true;
    if (!geminiKey.startsWith('AIza')) {
      statuses.gemini.message = `Format Warning: Key starts with '${geminiKey.slice(0, 5)}...' (OAuth token). Needs AI Studio Key starting with 'AIzaSy...'`;
    } else {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${geminiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ instances: [{ prompt: 'test' }] }),
          }
        );
        if (res.ok) {
          statuses.gemini.working = true;
          statuses.gemini.message = 'Active (Google Gemini Imagen 3 Ready)';
        } else {
          const text = await res.text();
          statuses.gemini.message = `HTTP ${res.status}: ${text.slice(0, 100)}`;
        }
      } catch (err: any) {
        statuses.gemini.message = `Fetch error: ${err.message}`;
      }
    }
  }

  // 4. Test Hugging Face Key
  if (hfKey) {
    statuses.huggingface.present = true;
    try {
      const res = await fetch('https://huggingface.co/api/whoami-v2', {
        headers: { Authorization: `Bearer ${hfKey}` },
      });
      if (res.ok) {
        statuses.huggingface.working = true;
        statuses.huggingface.message = 'Active (Hugging Face Account Connected)';
      } else {
        statuses.huggingface.message = `HTTP ${res.status}: Token invalid or scope restricted`;
      }
    } catch (err: any) {
      statuses.huggingface.message = `Fetch error: ${err.message}`;
    }
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    statuses,
    recommendation: statuses.groq.working
      ? 'AUTO mode will synthesize prompts via Groq Llama-3.1-8b and render visuals via Pollinations FLUX.'
      : 'Please check your GROQ_API_KEY in .env.local',
  });
}
