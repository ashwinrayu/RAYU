import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') || 'RAW AWARENESS. STRAIGHT TO YOU. UNFILTERED.';
    const category = searchParams.get('category') || 'TECH';
    const date = searchParams.get('date') || '2026';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#050505',
            padding: '60px 80px',
            fontFamily: 'sans-serif',
            position: 'relative',
          }}
        >
          {/* Top Logo & Category Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', fontSize: 36, fontWeight: 900, color: '#FFFFFF', letterSpacing: '-2px' }}>
              RA<span style={{ color: '#CCFF00' }}>Y</span>U.
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: 16,
                fontWeight: 800,
                color: '#CCFF00',
                border: '1px solid rgba(204, 255, 0, 0.4)',
                padding: '6px 16px',
                borderRadius: '4px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                backgroundColor: 'rgba(204, 255, 0, 0.1)',
              }}
            >
              {category}
            </div>
          </div>

          {/* Central Horizontal Neon Laser Beam */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: '3px',
              backgroundColor: '#CCFF00',
              boxShadow: '0 0 25px #CCFF00',
            }}
          />

          {/* Title Banner */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', zIndex: 10 }}>
            <div
              style={{
                fontSize: 54,
                fontWeight: 900,
                color: '#FFFFFF',
                lineHeight: 1.15,
                letterSpacing: '-1.5px',
                textTransform: 'uppercase',
                maxWidth: '1000px',
              }}
            >
              {title}
            </div>
          </div>

          {/* Bottom Footer Tagline */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#CCFF00', letterSpacing: '2px' }}>
              RAW AWARENESS. STRAIGHT TO YOU. UNFILTERED.
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#888888' }}>{date} • RAYU.COM</div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch {
    return new Response('Failed to generate OpenGraph image', { status: 500 });
  }
}
