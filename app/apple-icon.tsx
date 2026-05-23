import { ImageResponse } from 'next/og';
import { loadFraunces } from '@/lib/og-fonts';

// Apple touch icon 180×180 — stessa identità della favicon, scalata.
export const dynamic = 'force-static';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

const PAPER = '#FAF6F0';
const INK = '#1A1815';
const TERRACOTTA = '#B85C38';

export default async function AppleIcon() {
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
            fontSize: 150,
            color: INK,
            lineHeight: 1,
            letterSpacing: '-0.06em',
            fontVariationSettings: '"opsz" 144',
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
