import Link from 'next/link';
import { TOTAL_STEPS, stepByN } from '@/lib/steps';

// Step-navigator del percorso guidato (Round 6 — wizard minimale).
// prev/next + indicatore "Step X di 5 — Nome". Niente breadcrumb, niente
// pallini carosello. Per l'ultimo step rende una closing card al posto
// dell'Avanti. Stile sobrio coerente v1 (il reskin estetico è Fase C).

export function StepNav({ current }: { current: number }) {
  const step = stepByN(current);
  const prev = current > 1 ? stepByN(current - 1) : null;
  const next = current < TOTAL_STEPS ? stepByN(current + 1) : null;
  const isLast = current === TOTAL_STEPS;

  return (
    <nav
      aria-label="Navigazione percorso"
      className="mt-16 border-t border-rule pt-8"
    >
      {/* Indicatore tappa */}
      <div
        className="text-[11px] font-medium uppercase tabular-figures text-muted"
        style={{ letterSpacing: 'var(--tracking-micro)' }}
      >
        Step {current} di {TOTAL_STEPS}
        {step ? ` — ${step.label}` : ''}
      </div>

      {isLast ? (
        // Closing card — fine percorso
        <div className="mt-5 rounded-lg border border-rule bg-paper-deep/40 p-6 sm:p-8">
          <h2
            className="text-[clamp(1.5rem,2.4vw,2rem)] font-semibold text-ink balance"
            style={{
              lineHeight: 1.15,
              letterSpacing: 'var(--tracking-display)',
              fontVariationSettings: '"opsz" 72',
            }}
          >
            Hai finito il percorso.
          </h2>
          <p
            className="mt-3 max-w-[var(--measure-prose)] text-[1.0625rem] italic text-ink-soft prose-pretty"
            style={{ lineHeight: 1.6, fontVariationSettings: '"opsz" 24' }}
          >
            Da qui in poi si impara facendo. Torna all&rsquo;inizio per rivedere
            qualcosa, o apri una conversazione con Claude quando ti serve una mano.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/"
              className="text-[13px] font-medium uppercase tabular-figures text-ink underline-offset-4 hover:underline"
              style={{ letterSpacing: 'var(--tracking-micro)' }}
            >
              ‹ Torna all&rsquo;inizio
            </Link>
            <a
              href="https://claude.ai"
              className="text-[13px] font-medium uppercase tabular-figures text-terracotta underline-offset-4 hover:underline"
              style={{ letterSpacing: 'var(--tracking-micro)' }}
            >
              Chatta con Claude →
            </a>
          </div>
        </div>
      ) : (
        // prev / next
        <div className="mt-5 flex items-center justify-between gap-4">
          <Link
            href={prev ? prev.href : '/'}
            className="group max-w-[45%] text-left"
          >
            <span
              className="block text-[11px] font-medium uppercase tabular-figures text-muted"
              style={{ letterSpacing: 'var(--tracking-micro)' }}
            >
              ‹ Indietro
            </span>
            <span className="mt-1 block text-[15px] font-medium text-ink group-hover:text-terracotta">
              {prev ? prev.label : 'Inizio'}
            </span>
          </Link>

          {next && (
            <Link href={next.href} className="group max-w-[45%] text-right">
              <span
                className="block text-[11px] font-medium uppercase tabular-figures text-muted"
                style={{ letterSpacing: 'var(--tracking-micro)' }}
              >
                Avanti ›
              </span>
              <span className="mt-1 block text-[15px] font-medium text-ink group-hover:text-terracotta">
                {next.label}
              </span>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
