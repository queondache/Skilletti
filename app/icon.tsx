import { ImageResponse } from 'next/og';
import { loadFraunces } from '@/lib/og-fonts';

// Favicon 32×32 — coerente con OG: paper + "s" ink + punto terracotta.
export const dynamic = 'force-static';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

const PAPER = '#FAF6F0';
const INK = '#1A1815';
const TERRACOTTA = '#B85C38';

export default async function Icon() {
  const fraunces900 = await loadFraunces({ weight: 900 });

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: PAPER,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Fraunces',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            fontWeight: 900,
            fontSize: 28,
            color: INK,
            lineHeight: 1,
            letterSpacing: '-0.06em',
            fontVariationSettings: '"opsz" 9',
          }}
        >
          <span>s</span>
          <span style={{ color: TERRACOTTA }}>.</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Fraunces', data: fraunces900, style: 'normal', weight: 900 }],
    },
  );
}
