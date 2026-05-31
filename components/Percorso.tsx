import Link from 'next/link';
import { STEPS } from '@/lib/steps';
import { StepIcon, ArrowRightIcon } from '@/components/icons';

// Percorso — i cinque passi in home. Versione calma (server component, niente
// sticky-scroll JS): ogni step è una riga-porta con numero gigante, icona di
// sezione e blurb. È l'overview cliccabile del wizard. La coreografia sticky
// "numero fermo a sinistra, contenuto che scorre" è un'evoluzione possibile in
// Fase E; qui resta una lista leggibile e accessibile.

export function Percorso() {
  return (
    <section
      className="relative pl-[var(--gutter-indent)] pr-[calc(7vw+var(--gutter-edge))] py-16 sm:py-24 border-t border-line"
    >
      <div
        className="text-[11px] font-medium uppercase tabular-figures text-soft"
        style={{ letterSpacing: 'var(--tracking-micro)' }}
      >
        il percorso
      </div>
      <h2
        data-reveal
        className="mt-2 text-[clamp(2rem,3.5vw,3rem)] font-semibold text-red balance"
        style={{ lineHeight: 1.1, letterSpacing: 'var(--tracking-display)' }}
      >
        Cinque passi, senza fretta
      </h2>
      <p
        className="mt-4 max-w-[var(--measure-prose)] text-[1.0625rem] italic text-soft prose-pretty"
        style={{ lineHeight: 1.6 }}
      >
        Dalle parole al primo progetto. Puoi seguirli in ordine o saltare dove
        ti serve.
      </p>

      <ol className="mt-12 max-w-[860px]">
        {STEPS.map((step) => (
          <li key={step.slug} className="border-t border-line first:border-t-0">
            <Link
              href={`${step.href}/`}
              className="group flex items-center gap-5 py-6 sm:py-7"
              data-reveal
            >
              <span
                aria-hidden="true"
                className="shrink-0 font-display text-[clamp(2rem,4vw,3rem)] font-bold tabular-figures text-red/25 transition-colors group-hover:text-red/50"
                style={{ letterSpacing: 'var(--tracking-display)' }}
              >
                0{step.n}
              </span>
              <span
                aria-hidden="true"
                className="hidden shrink-0 text-red/70 transition-colors group-hover:text-red sm:block"
              >
                <StepIcon slug={step.slug} className="h-8 w-8" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[1.3rem] font-semibold text-red">
                  {step.label}
                </span>
                <span className="mt-1 block text-[1rem] text-soft prose-pretty">
                  {step.blurb}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="shrink-0 self-center text-red/40 transition-all duration-200 group-hover:translate-x-1 group-hover:text-red"
              >
                <ArrowRightIcon className="h-5 w-5" />
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
