import { Wordmark } from '@/components/Wordmark';

/**
 * Hero editoriale — primo viewport pieno.
 *
 * Composizione asimmetrica:
 * - wordmark + rule + tagline + manifesto incassati a sinistra (gutter-indent)
 * - v0.1 micro-label top-right
 *
 * Il footer firma e la colonna paper-deep di rilegatura vivono nel layout
 * della pagina (app/page.tsx), non qui — così funzionano per tutta la
 * scrollata, non solo per il primo viewport.
 */
export function Hero() {
  return (
    <section
      className="
        relative flex flex-col justify-center
        min-h-dvh
        pl-[var(--gutter-indent)]
        pr-[calc(7vw+var(--gutter-edge))]
        py-[max(8vh,4rem)]
      "
    >
      {/* Versione — singola stringa, em-dash esplicito */}
      <div
        className="absolute top-[var(--gutter-edge)] right-[calc(7vw+var(--gutter-edge))] text-[11px] font-medium uppercase tabular-figures text-ink/65 select-none"
        style={{ letterSpacing: 'var(--tracking-micro)' }}
      >
        v0.1 — in costruzione
      </div>

      <Wordmark as="h1" size="hero" />

      {/* Rule terracotta — firma visiva */}
      <hr aria-hidden="true" className="mt-7 h-[2px] w-16 border-0 bg-terracotta" />

      <p
        className="lead mt-7 max-w-[var(--measure-tagline)] text-[clamp(1.35rem,2.2vw,1.875rem)] italic font-normal text-ink-soft balance"
        style={{
          lineHeight: 1.35,
          letterSpacing: 'var(--tracking-display)',
          fontVariationSettings: '"opsz" 36',
        }}
      >
        Trenta skill di Claude. Scelte a mano, raccontate una a una.
      </p>

      <p
        className="mt-10 max-w-[var(--measure-prose)] text-[1.0625rem] font-normal text-ink/78 prose-pretty"
        style={{
          lineHeight: 1.65,
          letterSpacing: 'var(--tracking-body)',
          fontVariationSettings: '"opsz" 18',
        }}
      >
        Cercare skill online è diventato un magazzino: migliaia di voci,
        zero filtro. Skilletti fa l&rsquo;opposto. Poche skill, ognuna
        scelta e spiegata da Andrea. Museo, non magazzino.
      </p>
    </section>
  );
}
