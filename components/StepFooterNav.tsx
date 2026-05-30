import Link from 'next/link';
import { TOTAL_STEPS, stepByN } from '@/lib/steps';
import { Button } from '@/components/ui/Button';
import { ArrowLeftIcon, ArrowRightIcon } from '@/components/icons';

// Navigatore del percorso (Round 7) — prev/next in fondo a ogni step, con
// indicatore "Passo X di 5". All'ultimo passo mostra una closing card. Stile
// sul sistema due-colori (card outline, bottoni pill). Server component.

export function StepFooterNav({ current }: { current: number }) {
  const prev = current > 1 ? stepByN(current - 1) : null;
  const next = current < TOTAL_STEPS ? stepByN(current + 1) : null;
  const isLast = current === TOTAL_STEPS;

  return (
    <nav aria-label="Navigazione percorso" className="mt-16 border-t border-line pt-8">
      <div
        className="text-[11px] font-medium uppercase tabular-figures text-soft"
        style={{ letterSpacing: 'var(--tracking-micro)' }}
      >
        Passo {current} di {TOTAL_STEPS}
      </div>

      {isLast ? (
        <div className="mt-5 rounded-[var(--radius)] border border-line p-6 sm:p-8">
          <h2
            className="text-[clamp(1.5rem,2.4vw,2rem)] font-semibold text-red balance"
            style={{ lineHeight: 1.15, letterSpacing: 'var(--tracking-display)' }}
          >
            Hai finito il percorso.
          </h2>
          <p
            className="mt-3 max-w-[var(--measure-prose)] text-[1.0625rem] italic text-soft prose-pretty"
            style={{ lineHeight: 1.6 }}
          >
            Da qui in poi si impara facendo. Torna all&rsquo;inizio per rivedere
            qualcosa, o apri una conversazione con Claude quando ti serve una mano.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button href="/" variant="ghost">
              <ArrowLeftIcon className="h-4 w-4" />
              Torna all&rsquo;inizio
            </Button>
            <Button href="https://claude.ai" variant="primary" external>
              Chatta con Claude
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-5 flex items-center justify-between gap-4">
          <Link href={prev ? `${prev.href}/` : '/'} className="group max-w-[46%] text-left">
            <span
              className="flex items-center gap-1.5 text-[11px] font-medium uppercase tabular-figures text-soft"
              style={{ letterSpacing: 'var(--tracking-micro)' }}
            >
              <ArrowLeftIcon className="h-3.5 w-3.5" />
              Indietro
            </span>
            <span className="mt-1 block text-[15px] font-medium text-red group-hover:underline group-hover:decoration-red/50 group-hover:underline-offset-4">
              {prev ? prev.label : 'Inizio'}
            </span>
          </Link>

          {next && (
            <Link href={`${next.href}/`} className="group max-w-[46%] text-right">
              <span
                className="flex items-center justify-end gap-1.5 text-[11px] font-medium uppercase tabular-figures text-soft"
                style={{ letterSpacing: 'var(--tracking-micro)' }}
              >
                Avanti
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </span>
              <span className="mt-1 block text-[15px] font-medium text-red group-hover:underline group-hover:decoration-red/50 group-hover:underline-offset-4">
                {next.label}
              </span>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
