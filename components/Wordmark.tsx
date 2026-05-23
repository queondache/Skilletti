// Wordmark testuale (non-SVG) — testo HTML, accessibile, selezionabile,
// nitido a qualunque ratio. Versione SVG in public/wordmark.svg riservata
// agli asset esterni (OG image, favicon, social).
//
// Discipline: type-as-hero. Fraunces wght 700, opsz 144 forzato via
// font-variation-settings così Fraunces renderizza nella variante display
// (contrasti più alti, terminali più affilati) anche se la size finale è
// minore della "naturale" opsz.

type WordmarkProps = {
  as?: 'h1' | 'span' | 'div';
  size?: 'hero' | 'nav';
  className?: string;
};

export function Wordmark({ as: Tag = 'span', size = 'nav', className = '' }: WordmarkProps) {
  // Due taglie: hero (homepage) e nav (header sezioni).
  // Il punto è sempre terracotta — singolo tocco di colore strutturale.
  const sizeStyle =
    size === 'hero'
      ? {
          fontSize: 'clamp(5rem, 11vw, 9rem)',
          lineHeight: '0.9',
          fontVariationSettings: '"opsz" 144, "SOFT" 50',
        }
      : {
          fontSize: '1.5rem',
          lineHeight: '1',
          fontVariationSettings: '"opsz" 48',
        };

  return (
    <Tag
      className={`font-display font-bold text-ink ${className}`}
      style={{
        ...sizeStyle,
        letterSpacing: 'var(--tracking-wordmark)',
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
      }}
    >
      skilletti<span className="text-terracotta">.</span>
    </Tag>
  );
}
