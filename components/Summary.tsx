import type { Skill } from '@/types/skill';
import { TEMA_ORDER } from '@/components/Catalog';
import { ContextFilter, type CtxCounts } from '@/components/ContextFilter';

/**
 * Sommario tematico — "sala d'ingresso" subito dopo l'Hero (vedi SPEC §7,
 * criterio successo: capire le essenziali in <2 min).
 *
 * Due assi di navigazione, distinti STRUTTURALMENTE (non per colore):
 *   - PARTI DA QUI → chip "Essenziali (N)" che salta a #parti-da-qui. Peso
 *     tipografico maggiore, micro-label propria, separato da una hairline
 *     verticale (desktop) / orizzontale (mobile) dai temi.
 *   - PER TEMA → chip {tema} (N) sulle skill NON essenziali, che saltano al
 *     gruppo #tema-{slug} del catalogo. Stesso conteggio che mostra il
 *     catalogo: count = esattamente ciò su cui si atterra.
 *
 * Conteggi derivati da skills.json (stesso criterio di Catalog: importanza
 * essenziale per il primo asse, !== essenziale raggruppato per tema per il
 * secondo) → fonte unica, restano corretti quando l'agent aggiunge skill.
 *
 * Server component, zero JS: gli anchor usano lo smooth-scroll globale.
 */

const MICRO =
  'text-[11px] font-medium uppercase tabular-figures text-muted';

export function Summary({ skills }: { skills: Skill[] }) {
  const essenzialiCount = skills.filter((s) => s.importanza === 'essenziale').length;
  const nonEssenziali = skills.filter((s) => s.importanza !== 'essenziale');

  const temi = TEMA_ORDER.map((t) => ({
    slug: t.slug,
    short: t.short,
    count: nonEssenziali.filter((s) => s.tema === t.match).length,
  })).filter((t) => t.count > 0);

  // Conteggi per contesto d'uso (una skill conta su ogni contesto che dichiara).
  const ctxCounts: CtxCounts = {
    'claude-code': skills.filter((s) => s.dove_funziona.includes('claude-code')).length,
    'claude-in-vscode': skills.filter((s) => s.dove_funziona.includes('claude-in-vscode')).length,
    'claude-mobile': skills.filter((s) => s.dove_funziona.includes('claude-mobile')).length,
  };

  return (
    <section
      id="sommario"
      aria-label="Sommario"
      className="relative pl-[var(--gutter-indent)] pr-[calc(7vw+var(--gutter-edge))] min-[1440px]:pr-[calc(7vw+var(--gutter-edge)+8rem)] py-10 sm:py-12 border-t border-rule"
      style={{ scrollMarginTop: '100px' }}
    >
      <div className={MICRO} style={{ letterSpacing: 'var(--tracking-micro)' }}>
        sommario
      </div>

      {/* Filtro contesto d'uso — globale (essenziali + catalogo), stato in URL */}
      <div className="mt-6">
        <ContextFilter counts={ctxCounts} />
      </div>

      {/* Divisore tra filtro contesto e navigazione tematica */}
      <div aria-hidden="true" className="mt-8 h-px w-full bg-rule" />

      <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-stretch sm:gap-10">
        {/* Asse 1 — PARTI DA QUI. Distinto: label propria + chip più pesante e
            non-uppercase, separato dalla hairline. */}
        <div className="shrink-0">
          <div className={MICRO} style={{ letterSpacing: 'var(--tracking-micro)' }}>
            parti da qui
          </div>
          <a
            href="#parti-da-qui"
            className="mt-2 inline-flex items-baseline gap-2 text-[1.0625rem] font-semibold text-ink transition-colors hover:text-terracotta-deep"
          >
            Essenziali
            <span className="tabular-figures text-muted">({essenzialiCount})</span>
            <span aria-hidden="true" className="text-terracotta">→</span>
          </a>
          {/* Prerequisito pratico — non è un tema: come installare l'ambiente.
              Link d'ingresso, peso minore del chip Essenziali. */}
          <a
            href="#come-iniziare"
            className="mt-2 flex items-baseline gap-1.5 text-[0.9375rem] text-muted transition-colors hover:text-ink"
          >
            Come iniziare
            <span aria-hidden="true" className="text-terracotta/70">→</span>
          </a>
        </div>

        {/* Divisore strutturale — verticale su desktop, orizzontale su mobile */}
        <div
          aria-hidden="true"
          className="h-px w-full bg-rule sm:h-auto sm:w-px sm:self-stretch"
        />

        {/* Asse 2 — PER TEMA. Chip uppercase, jump al gruppo del catalogo. */}
        <div>
          <div className={MICRO} style={{ letterSpacing: 'var(--tracking-micro)' }}>
            per tema
          </div>
          <div
            className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-2 text-[11px] font-medium uppercase tabular-figures"
            style={{ letterSpacing: 'var(--tracking-micro)' }}
          >
            {temi.map((t, i) => (
              <span key={t.slug} className="inline-flex items-baseline gap-x-3">
                {i > 0 && (
                  <span aria-hidden="true" className="text-muted/40">
                    ·
                  </span>
                )}
                <a
                  href={`#tema-${t.slug}`}
                  className="text-muted transition-colors hover:text-ink hover:underline hover:decoration-terracotta/60 hover:underline-offset-[6px]"
                >
                  {t.short}{' '}
                  <span className="text-muted">({t.count})</span>
                </a>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
