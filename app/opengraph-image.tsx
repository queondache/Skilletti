import { ImageResponse } from 'next/og';
import { loadFraunces } from '@/lib/og-fonts';

// OG image generata a build time (force-static) — Pages serve PNG diretto.
export const dynamic = 'force-static';
export const alt = 'skilletti — Trenta skill di Claude. Scelte a mano.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const PAPER = '#FAF6F0';
const INK = '#1A1815';
const TERRACOTTA = '#B85C38';

export default async function OpenGraphImage() {
  const [fraunces700, fraunces500Italic] = await Promise.all([
    loadFraunces({ weight: 700 }),
    loadFraunces({ weight: 500, italic: true }),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: PAPER,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '88px 96px',
          fontFamily: 'Fraunces',
        }}
      >
        {/* Cornice ed elemento di apertura: punto terracotta come segno editoriale */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 22,
            color: INK,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              backgroundColor: TERRACOTTA,
            }}
          />
          <div>Digest curato</div>
        </div>

        {/* Blocco centrale: wordmark, rule, tagline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 28,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              fontWeight: 700,
              fontSize: 220,
              lineHeight: 0.9,
              color: INK,
              letterSpacing: '-0.04em',
              fontVariationSettings: '"opsz" 144',
            }}
          >
            <span>skilletti</span>
            <span style={{ color: TERRACOTTA }}>.</span>
          </div>
          <div
            style={{
              width: 80,
              height: 2,
              backgroundColor: TERRACOTTA,
            }}
          />
          <div
            style={{
              fontStyle: 'italic',
              fontWeight: 500,
              fontSize: 44,
              color: INK,
              lineHeight: 1.2,
              fontVariationSettings: '"opsz" 72',
            }}
          >
            Trenta skill di Claude. Scelte a mano.
          </div>
        </div>

        {/* Footer: micro-label dominio in maiuscoletto spaziato */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 20,
            color: INK,
            opacity: 0.7,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          <div>queondache.github.io/skilletti</div>
          <div>MMXXVI</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Fraunces', data: fraunces700, style: 'normal', weight: 700 },
        { name: 'Fraunces', data: fraunces500Italic, style: 'italic', weight: 500 },
      ],
    },
  );
}
