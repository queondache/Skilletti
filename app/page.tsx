import Link from 'next/link';
import type { Metadata } from 'next';
import { Wordmark } from '@/components/Wordmark';
import { HeroMap } from '@/components/HeroMap';
import { STEPS } from '@/lib/steps';

// Landing (Round 6 — wizard minimale). Hero placeholder + CTA "Inizia" + mappa
// dei 5 step. Il copy dell'hero è un segnaposto ~60 parole: Andrea lo riscrive
// in Round 7. Stile = classi/utility v1 esistenti (il reskin "Terminale
// editoriale" è Fase C). Le vecchie sezioni single-page sono migrate nelle route.

export const metadata: Metadata = {
  title: 'Le migliori skill di Claude, spiegate da zero',
  description:
    'Una guida passo-passo per capire cos’è Claude Code e installare le tue prime skill, senza dare nulla per scontato.',
  alternates: { canonical: '/' },
  openGraph: {
    url: '/',
    title: 'skilletti — le migliori skill di Claude, spiegate da zero',
    description:
      'Una guida passo-passo per capire cos’è Claude Code e installare le tue prime skill.',
  },
};

export default function HomePage() {
  return (
    <main className="relative bg-paper text-ink">
      {/* Hero */}
      <section
        className="relative pl-[var(--gutter-indent)] pr-[calc(7vw+var(--gutter-edge))] min-[1440px]:pr-[calc(7vw+var(--gutter-edge)+8rem)] pt-16 pb-12 sm:pt-24 sm:pb-16"
      >
        <Wordmark as="h1" size="hero" />

        <div className="mt-10 grid grid-cols-1 items-center gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,42%)]">
          <div>
            <p
              className="lead max-w-[var(--measure-prose)] text-[1.125rem] text-ink-soft prose-pretty"
              style={{ lineHeight: 1.6, fontVariationSettings: '"opsz" 24' }}
            >
              {/* PLACEHOLDER ~60 parole — Andrea riscrive in Round 7 */}
              Claude Code è l&rsquo;assistente di Anthropic che vive sul tuo computer e
              lavora accanto a te: legge i tuoi file, scrive ed esegue codice,
              automatizza i compiti ripetitivi. Le <em>skill</em>{' '}sono estensioni
              che gli insegnano a fare cose specifiche meglio. Questa guida ti porta dal
              non sapere cosa sia all&rsquo;avere installato le tue prime skill — un
              passo alla volta, senza dare nulla per scontato.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link
                href="/step-1-capisci"
                className="inline-flex items-center rounded-[var(--radius)] bg-terracotta px-7 py-3.5 font-sans text-[15px] font-semibold text-paper transition-transform duration-200 hover:-translate-y-0.5"
              >
                Inizia
              </Link>
              <Link
                href="/step-1-capisci"
                className="font-sans text-[15px] font-medium text-ink underline-offset-4 hover:underline"
              >
                Cos&rsquo;è una skill?
              </Link>
            </div>
          </div>

          {/* Mappa-testo — anteprima di /step-4-esplora */}
          <div className="w-full">
            <HeroMap />
          </div>
        </div>
      </section>

      {/* Mappa dei 5 step — overview del percorso (cliccabile) */}
      <section
        className="relative pl-[var(--gutter-indent)] pr-[calc(7vw+var(--gutter-edge))] min-[1440px]:pr-[calc(7vw+var(--gutter-edge)+8rem)] py-12 sm:py-16 border-t border-rule"
      >
        <div
          className="text-[11px] font-medium uppercase tabular-figures text-muted"
          style={{ letterSpacing: 'var(--tracking-micro)' }}
        >
          il percorso
        </div>
        <h2
          data-reveal
          className="mt-2 text-[clamp(2rem,3.5vw,3rem)] font-semibold text-ink balance"
          style={{
            lineHeight: 1.1,
            letterSpacing: 'var(--tracking-display)',
            fontVariationSettings: '"opsz" 96',
          }}
        >
          Cinque passi
        </h2>

        <ol className="mt-10 max-w-[760px]">
          {STEPS.map((step) => (
            <li key={step.slug} className="border-t border-rule first:border-t-0">
              <Link
                href={step.href}
                className="group flex items-baseline gap-5 py-5 sm:py-6"
              >
                <span
                  className="shrink-0 text-[13px] font-medium tabular-figures text-muted"
                  style={{ letterSpacing: 'var(--tracking-micro)' }}
                >
                  0{step.n}
                </span>
                <span className="flex-1">
                  <span className="block text-[1.25rem] font-semibold text-ink group-hover:text-terracotta">
                    {step.label}
                  </span>
                  <span className="mt-1 block text-[1rem] text-ink-soft prose-pretty">
                    {step.blurb}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="shrink-0 self-center text-ink/40 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-terracotta"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
