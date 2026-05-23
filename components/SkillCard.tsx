import type { ProfiloSicurezza, Skill } from '@/types/skill';
import { extractDraftMarker, Prose } from '@/lib/markdown';

/**
 * Scheda skill — server component.
 *
 * Layout editoriale, non card-SaaS:
 * - hairline rule sopra (separa dalla skill precedente)
 * - tipografia primaria leggibile sopra la piega, dettagli tecnici
 *   dentro `<details>` (native, zero JS, accessibile keyboard)
 * - profilo sicurezza SEMPRE sopra la piega (informazione critica)
 * - badge "bozza" se la descrizione inizia con [BOZZA — Andrea rifinisce]
 */

// Stile per tag di sicurezza — mappa intento → look.
// I tag "positivi" (self-contained, ufficiale) hanno border terracotta;
// quelli "informativi" hanno solo bordo neutro; quelli "cauzionali" hanno
// fondo carta scura + bordo terracotta più marcato.
type SecurityVariant = 'positive' | 'info' | 'caution';

const SECURITY_VARIANT: Record<ProfiloSicurezza, SecurityVariant> = {
  'self-contained': 'positive',
  'ufficiale-anthropic': 'positive',
  'chiamate-esterne': 'info',
  'si-auto-aggiorna': 'info',
  'legge-credenziali': 'caution',
  'esegue-script': 'caution',
};

const SECURITY_LABEL: Record<ProfiloSicurezza, string> = {
  'self-contained': 'self-contained',
  'ufficiale-anthropic': 'ufficiale Anthropic',
  'chiamate-esterne': 'chiama servizi esterni',
  'si-auto-aggiorna': 'si auto-aggiorna',
  'legge-credenziali': 'legge credenziali',
  'esegue-script': 'esegue script',
};

const VARIANT_CLASS: Record<SecurityVariant, string> = {
  positive:
    'border-terracotta/70 bg-paper-deep text-ink-soft',
  info: 'border-rule bg-transparent text-muted',
  caution: 'border-terracotta bg-paper-deep text-terracotta-deep',
};

function SecurityBadge({ tag }: { tag: ProfiloSicurezza }) {
  const variant = SECURITY_VARIANT[tag];
  return (
    <span
      className={`inline-flex items-center border ${VARIANT_CLASS[variant]} rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tabular-figures`}
      style={{ letterSpacing: 'var(--tracking-micro)' }}
    >
      {SECURITY_LABEL[tag]}
    </span>
  );
}

function MetaTag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center text-[11px] font-medium uppercase tabular-figures text-muted"
      style={{ letterSpacing: 'var(--tracking-micro)' }}
    >
      {children}
    </span>
  );
}

function DraftBadge() {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border border-terracotta/70 bg-terracotta/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tabular-figures text-terracotta-deep"
      style={{ letterSpacing: 'var(--tracking-micro)' }}
      title="Descrizione personale ancora in bozza — Andrea la rifinirà"
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-terracotta" />
      bozza
    </span>
  );
}

function formatDate(iso: string): string {
  // Formato italiano corto: 22 mag 2026
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function formatStars(stelle: number | null, noteStelle?: string): string {
  if (stelle === null) return noteStelle ?? '— stelle';
  if (stelle >= 1000) return `${(stelle / 1000).toFixed(1).replace('.0', '')}k stelle`;
  return `${stelle} stelle`;
}

export function SkillCard({ skill }: { skill: Skill }) {
  const { content, isDraft } = extractDraftMarker(skill.descrizione_personale);

  return (
    <article className="relative border-t border-rule pt-10 pb-12">
      {/* Riga superiore — tag tema + dove funziona + badge bozza, tutti allineati a destra */}
      <div className="mb-4 flex flex-wrap items-center justify-end gap-3">
        {isDraft && <DraftBadge />}
        <MetaTag>{skill.tema}</MetaTag>
        <span aria-hidden="true" className="text-muted/40">·</span>
        <MetaTag>{skill.dove_funziona}</MetaTag>
        <span aria-hidden="true" className="text-muted/40">·</span>
        <MetaTag>{skill.importanza}</MetaTag>
      </div>

      {/* Nome — corpo display, sobrio, weight 600 */}
      <h2
        className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold text-ink balance"
        style={{
          lineHeight: 1.1,
          letterSpacing: 'var(--tracking-display)',
          fontVariationSettings: '"opsz" 60',
        }}
      >
        {skill.nome}
      </h2>

      {/* Tagline — italic, opsz medio, prosa stretta */}
      <p
        className="mt-3 max-w-[50ch] text-[clamp(1.05rem,1.3vw,1.25rem)] italic text-ink-soft"
        style={{
          lineHeight: 1.4,
          letterSpacing: 'var(--tracking-display)',
          fontVariationSettings: '"opsz" 24',
        }}
      >
        {skill.tagline}
      </p>

      {/* Profilo sicurezza — SOPRA la piega: l'amico non-power-user lo vede subito */}
      <div className="mt-6 flex flex-wrap gap-2">
        {skill.profilo_sicurezza.map((tag) => (
          <SecurityBadge key={tag} tag={tag} />
        ))}
      </div>

      {/* Descrizione personale — markdown */}
      <Prose className="mt-7 max-w-[var(--measure-prose)] text-[1.0625rem] text-ink/80 prose-pretty">
        {content}
      </Prose>

      {/* Dettagli tecnici — collassabile native, accessibile da tastiera */}
      <details className="group mt-7 max-w-[var(--measure-prose)]">
        <summary
          className="cursor-pointer select-none list-none text-[11px] font-medium uppercase tabular-figures text-muted hover:text-terracotta-deep [&::-webkit-details-marker]:hidden"
          style={{ letterSpacing: 'var(--tracking-micro)' }}
        >
          <span className="inline-flex items-center gap-2">
            <span aria-hidden="true" className="inline-block h-px w-6 bg-terracotta/50 transition-all group-open:w-10" />
            dettagli tecnici
          </span>
        </summary>

        <dl className="mt-5 grid grid-cols-[max-content_1fr] gap-x-6 gap-y-2 text-[0.95rem] text-ink-soft">
          <dt className="text-muted">installazione</dt>
          <dd>
            <code
              className="rounded-sm bg-paper-deep px-2 py-1 font-mono text-[0.85rem] text-ink-soft"
              style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}
            >
              {skill.installazione}
            </code>
          </dd>

          <dt className="text-muted">stelle</dt>
          <dd className="tabular-figures">{formatStars(skill.stelle, skill.note_stelle)}</dd>

          <dt className="text-muted">ultimo commit</dt>
          <dd className="tabular-figures">{formatDate(skill.ultimo_commit)}</dd>

          <dt className="text-muted">licenza</dt>
          <dd>{skill.licenza}</dd>

          <dt className="text-muted">livello</dt>
          <dd>{skill.livello}</dd>

          <dt className="text-muted">verifica</dt>
          <dd className="tabular-figures">{formatDate(skill.data_controllo)}</dd>

          <dt className="text-muted">repository</dt>
          <dd>
            <a
              href={skill.repo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-terracotta/40 decoration-1 underline-offset-4 hover:decoration-terracotta"
            >
              {skill.repo_url.replace(/^https?:\/\//, '')}
            </a>
          </dd>

          {skill.note && (
            <>
              <dt className="text-muted">note</dt>
              <dd className="italic text-muted">{skill.note}</dd>
            </>
          )}
        </dl>
      </details>
    </article>
  );
}
