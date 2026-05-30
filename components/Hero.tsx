import { Wordmark } from '@/components/Wordmark';
import { Button } from '@/components/ui/Button';
import { ArrowRightIcon } from '@/components/icons';
import { IconReveal } from '@/components/IconReveal';

// Hero Round 7 — primo viewport. Claim grande in Bricolage, tagline italic,
// manifesto breve, due CTA (Inizia / Esplora). Un cactus outline accompagna il
// claim come firma visiva. Calmo: niente pin-scroll JS (la coreografia spinta
// è opzionale e vive in Fase E/animazioni) — qui un reveal d'ingresso sobrio.

export function Hero() {
  return (
    <section
      id="contenuto"
      className="
        relative flex min-h-[calc(100dvh-3.5rem)] flex-col justify-center
        pl-[var(--gutter-indent)]
        pr-[calc(7vw+var(--gutter-edge))]
        py-[max(6vh,3rem)]
      "
    >
      <div className="flex items-start gap-4">
        <Wordmark as="h1" size="hero" />
        <span aria-hidden="true" className="mt-3 hidden text-red/70 sm:block">
          <IconReveal icon="cactus" className="h-16 w-16" />
        </span>
      </div>

      {/* Rule rossa — firma visiva */}
      <hr aria-hidden="true" className="mt-7 h-[2px] w-16 border-0 bg-red" />

      <p
        data-reveal
        className="lead mt-7 max-w-[var(--measure-tagline)] text-[clamp(1.4rem,2.4vw,2rem)] italic font-normal text-soft balance"
        style={{ lineHeight: 1.32, letterSpacing: 'var(--tracking-display)' }}
      >
        Le migliori skill di Claude. Scelte a mano, raccontate una a una.
      </p>

      <p
        data-reveal
        className="mt-8 max-w-[var(--measure-prose)] text-[1.0625rem] font-normal text-red/80 prose-pretty"
        style={{ lineHeight: 1.65 }}
      >
        Cercare skill online è diventato un magazzino: migliaia di voci, zero
        filtro. Skilletti fa l&rsquo;opposto. Poche skill, ognuna scelta e
        spiegata da Andrea, con un percorso che parte dalle parole e arriva al
        primo progetto. Museo, non magazzino.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-4" data-reveal>
        <Button href="/step-1-capisci/" variant="primary">
          Inizia dal percorso
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
        <Button href="/step-4-esplora/" variant="ghost">
          Vai al catalogo
        </Button>
      </div>
    </section>
  );
}
