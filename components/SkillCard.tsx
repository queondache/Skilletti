import type { DoveFunziona, ProfiloSicurezza, Skill } from '@/types/skill';
import { DOVE_FUNZIONA_LABEL } from '@/types/skill';
import { extractDraftMarker, Prose } from '@/lib/markdown';
import { CopyButton } from '@/components/CopyButton';

/**
 * Scheda skill — server component (Round 3: layout "open pages").
 *
 * Doppia pagina di libro aperto. La hairline verticale tra le due colonne è la
 * "spina" del libro.
 *
 * Desktop ≥1024px (lg): due colonne dentro un grid 60/40 senza gap.
 *   SINISTRA (~60%): tag-row → nome → tagline → a_che_serve → <details>
 *     "approfondisci" (descrizione personale + note).
 *   DESTRA (~40%, pannello "info pratiche" sempre visibile): installazione +
 *     copia → riconoscimenti → badge sicurezza → repo → fine-print
 *     (livello · verificata).
 *
 * Mobile <1024px: singola colonna impilata, ordine tag-row → nome → tagline →
 *   a_che_serve → [pannello info pratiche] → approfondisci. Nessun bordo
 *   verticale.
 *
 * Note:
 * - il pannello info pratiche è SEMPRE visibile: chi non aprirà mai i dettagli
 *   ha comunque install, sicurezza, repo e provenienza sotto gli occhi.
 * - badge "bozza" appare solo se la descrizione personale comincia con
 *   [BOZZA — Andrea rifinisce] → marker estratto da `extractDraftMarker`.
 * - il pulsante copia (CopyButton) è l'unica parte client della scheda.
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

// Contesti d'uso (dove_funziona) → micro-label compatti, niente emoji.
// Più contesti uniti da "/" (es. "CLI / VS Code") per distinguerli dal "·"
// che separa i campi meta (tema · dove · importanza).
function doveLabel(contexts: DoveFunziona[]): string {
  return contexts.map((c) => DOVE_FUNZIONA_LABEL[c]).join(' / ');
}

// Micro-label di sezione nel pannello "info pratiche" (destra): 11px uppercase
// tracking ampio, neutro. Marca ogni riga del pannello senza rumore visivo.
function InfoLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-[11px] font-medium uppercase tabular-figures text-muted"
      style={{ letterSpacing: 'var(--tracking-micro)' }}
    >
      {children}
    </div>
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

// Formato esteso per la riga riconoscimenti: "maggio 2026"
function formatMonthYear(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });
}

function formatStars(stelle: number | null, noteStelle?: string): string {
  if (stelle === null) return noteStelle ?? '— stelle';
  if (stelle >= 1000) return `${(stelle / 1000).toFixed(1).replace('.0', '')}k stelle`;
  return `${stelle} stelle`;
}

// Versione "corta" per la riga riconoscimenti — senza note_stelle, restituisce
// null quando stelle è null (in quel caso la riga usa "Ufficiale {autore}").
function formatStarsShort(stelle: number | null): string | null {
  if (stelle === null) return null;
  if (stelle >= 1000) return `${(stelle / 1000).toFixed(1).replace('.0', '')}k stelle`;
  return `${stelle} stelle`;
}

// Riga sempre visibile: stelle · licenza · creato da · aggiornato.
// Per stelle:null la lead diventa "Ufficiale {autore}" (assorbe il "creato da").
function buildRiconoscimenti(skill: Skill): string {
  const parts: string[] = [];
  const starsLabel = formatStarsShort(skill.stelle);
  if (starsLabel) {
    parts.push(starsLabel);
    parts.push(skill.licenza);
    parts.push(`creato da ${skill.autore}`);
  } else {
    parts.push(`Ufficiale ${skill.autore}`);
    parts.push(skill.licenza);
  }
  parts.push(`aggiornato ${formatMonthYear(skill.ultimo_commit)}`);
  return parts.join(' · ');
}

export function SkillCard({
  skill,
  showTema = true,
  variant = 'open',
}: {
  skill: Skill;
  showTema?: boolean;
  variant?: 'open' | 'doorway';
}) {
  const { content, isDraft } = extractDraftMarker(skill.descrizione_personale);

  // Variante "doorway" — usata dalle essenziali in griglia 2×2. Card-porta calma
  // in colonna singola: niente spina 60/40 (a metà larghezza affolla). Il profilo
  // sicurezza resta sopra la piega (SPEC §7); install, riconoscimenti e repo
  // vivono dentro "approfondisci". Testa (tag/nome/tagline/a_che_serve) duplicata
  // dalla variante open di proposito, per non toccare il layout open già in uso.
  if (variant === 'doorway') {
    return (
      <article
        data-skill-card
        data-contexts={skill.dove_funziona.join(' ')}
        className="relative border-t border-rule pt-10 pb-10"
      >
        <div className="mb-4 flex flex-wrap items-center justify-start gap-3">
          {isDraft && <DraftBadge />}
          {showTema && (
            <>
              <MetaTag>{skill.tema}</MetaTag>
              <span aria-hidden="true" className="text-muted/40">·</span>
            </>
          )}
          <MetaTag>{doveLabel(skill.dove_funziona)}</MetaTag>
          <span aria-hidden="true" className="text-muted/40">·</span>
          <MetaTag>{skill.importanza}</MetaTag>
        </div>

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

        <p
          className="lead mt-3 max-w-[50ch] text-[clamp(1.05rem,1.3vw,1.25rem)] italic text-ink-soft"
          style={{
            lineHeight: 1.4,
            letterSpacing: 'var(--tracking-display)',
            fontVariationSettings: '"opsz" 24',
          }}
        >
          {skill.tagline}
        </p>

        <p
          className="mt-6 max-w-[var(--measure-prose)] text-[1.0625rem] text-ink prose-pretty"
          style={{ lineHeight: 1.6, fontVariationSettings: '"opsz" 24' }}
        >
          {skill.a_che_serve}
        </p>

        {/* Profilo sicurezza — visibile sopra la piega */}
        <div className="mt-6 flex flex-wrap gap-2">
          {skill.profilo_sicurezza.map((tag) => (
            <SecurityBadge key={tag} tag={tag} />
          ))}
        </div>

        {/* Approfondisci — voce di Andrea + info pratiche (badge esclusi: già sopra) */}
        <details className="group mt-7 max-w-[var(--measure-prose)]">
          <summary
            className="cursor-pointer select-none list-none text-[11px] font-medium uppercase tabular-figures text-muted hover:text-terracotta-deep [&::-webkit-details-marker]:hidden"
            style={{ letterSpacing: 'var(--tracking-micro)' }}
          >
            <span className="inline-flex items-center gap-2">
              <span aria-hidden="true" className="inline-block h-px w-6 bg-terracotta/50 transition-all group-open:w-10" />
              approfondisci
            </span>
          </summary>

          <Prose className="mt-6 max-w-[var(--measure-prose)] text-[1.0625rem] text-ink/80 prose-pretty">
            {content}
          </Prose>

          {skill.note && (
            <p className="mt-4 max-w-[var(--measure-prose)] text-[0.95rem] italic text-muted">
              {skill.note}
            </p>
          )}

          <InfoPanel skill={skill} showSecurity={false} />
        </details>
      </article>
    );
  }

  return (
    <article
      data-skill-card
      data-contexts={skill.dove_funziona.join(' ')}
      className="relative border-t border-rule pt-10 pb-12"
    >
      {/*
        Griglia "open pages". Su mobile colonna singola (default). Da lg in su
        diventa 60/40 SENZA gap: la separazione è data dalla hairline verticale
        (border-l su .info-panel), la "spina" del libro. La colonna sinistra
        respira con padding-right, la destra rientra dalla spina con padding-left.
      */}
      <div className="lg:grid lg:grid-cols-[60fr_40fr]">
        {/* ── PAGINA SINISTRA — voce, lettura ───────────────────────── */}
        <div className="lg:pr-[clamp(1.5rem,3vw,2.5rem)]">
          {/* Riga superiore — tag dove funziona + importanza (+ tema se non già
              implicito dal raggruppamento) + badge bozza. Allineata a sinistra:
              apre la pagina come una riga di catalogo. `showTema=false` nel
              catalogo: il tema è già nel titolo del gruppo. */}
          <div className="mb-4 flex flex-wrap items-center justify-start gap-3">
            {isDraft && <DraftBadge />}
            {showTema && (
              <>
                <MetaTag>{skill.tema}</MetaTag>
                <span aria-hidden="true" className="text-muted/40">·</span>
              </>
            )}
            <MetaTag>{doveLabel(skill.dove_funziona)}</MetaTag>
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
            className="lead mt-3 max-w-[50ch] text-[clamp(1.05rem,1.3vw,1.25rem)] italic text-ink-soft"
            style={{
              lineHeight: 1.4,
              letterSpacing: 'var(--tracking-display)',
              fontVariationSettings: '"opsz" 24',
            }}
          >
            {skill.tagline}
          </p>

          {/* A che serve — la risposta concreta al "cosa fa", in linguaggio
              piano. Voce più presente della descrizione personale: questo è il
              primo paragrafo che l'amico legge. */}
          <p
            className="mt-6 max-w-[var(--measure-prose)] text-[1.0625rem] text-ink prose-pretty"
            style={{
              lineHeight: 1.6,
              fontVariationSettings: '"opsz" 24',
            }}
          >
            {skill.a_che_serve}
          </p>

          {/* ── PANNELLO INFO PRATICHE — su mobile vive QUI, nel flusso della
              pagina, tra "a che serve" e "approfondisci". Da lg in su è
              nascosto qui e mostrato nella colonna destra (vedi sotto). ──── */}
          <div className="lg:hidden">
            <InfoPanel skill={skill} />
          </div>

          {/* Approfondisci — collassabile native, accessibile da tastiera.
              Round 3: contiene SOLO la voce di Andrea (descrizione_personale)
              + eventuale `note`. I dati tecnici sono migrati nel pannello
              info pratiche. */}
          <details className="group mt-7 max-w-[var(--measure-prose)]">
            <summary
              className="cursor-pointer select-none list-none text-[11px] font-medium uppercase tabular-figures text-muted hover:text-terracotta-deep [&::-webkit-details-marker]:hidden"
              style={{ letterSpacing: 'var(--tracking-micro)' }}
            >
              <span className="inline-flex items-center gap-2">
                <span aria-hidden="true" className="inline-block h-px w-6 bg-terracotta/50 transition-all group-open:w-10" />
                approfondisci
              </span>
            </summary>

            {/* Voce personale — markdown, dentro details */}
            <Prose className="mt-6 max-w-[var(--measure-prose)] text-[1.0625rem] text-ink/80 prose-pretty">
              {content}
            </Prose>

            {/* Note free-text (caso edge) — sotto la descrizione, muted italic */}
            {skill.note && (
              <p className="mt-4 max-w-[var(--measure-prose)] text-[0.95rem] italic text-muted">
                {skill.note}
              </p>
            )}
          </details>
        </div>

        {/* ── PAGINA DESTRA — info pratiche, sempre visibile da lg in su.
            La hairline verticale (border-l border-rule) è la spina del libro;
            il padding-left fa rientrare il contenuto dalla spina. ─────────── */}
        <div className="hidden lg:block lg:border-l lg:border-rule lg:pl-[clamp(2rem,4vw,3.5rem)]">
          <InfoPanel skill={skill} />
        </div>
      </div>
    </article>
  );
}

/**
 * Pannello "info pratiche" — colonna destra (desktop) / blocco impilato
 * (mobile). Ordine fisso: installazione + copia → riconoscimenti → badge
 * sicurezza → repo → fine-print (livello · verificata). Server component:
 * solo il pulsante copia (CopyButton) è client.
 *
 * Body in Geist (ereditato): nessun font-family forzato, a parte il mono del
 * comando di installazione che usa la CSS var --font-mono.
 */
function InfoPanel({ skill, showSecurity = true }: { skill: Skill; showSecurity?: boolean }) {
  return (
    <div className="mt-8 lg:mt-0 flex flex-col gap-6">
      {/* (1) Installazione — comando in mono + pulsante copia */}
      <div>
        <div className="flex items-baseline justify-between gap-3">
          <InfoLabel>installazione</InfoLabel>
          <CopyButton text={skill.installazione} />
        </div>
        <code
          className="mt-2 block overflow-x-auto rounded-sm bg-paper-deep px-3 py-2 text-[0.85rem] text-ink-soft"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {skill.installazione}
        </code>
      </div>

      {/* (2) Riconoscimenti — stelle · licenza · creato da · aggiornato.
          Per stelle:null → "Ufficiale {autore} · {licenza} · aggiornato …". */}
      <div
        className="text-[11px] font-medium uppercase tabular-figures text-ink/65"
        style={{ letterSpacing: '0.08em' }}
      >
        {buildRiconoscimenti(skill)}
      </div>

      {/* (3) Profilo sicurezza — badge impilati/wrap. Nascosti se già mostrati
          sopra la piega (variante doorway). */}
      {showSecurity && (
        <div className="flex flex-wrap gap-2">
          {skill.profilo_sicurezza.map((tag) => (
            <SecurityBadge key={tag} tag={tag} />
          ))}
        </div>
      )}

      {/* (4) Repository — link esterno */}
      <div>
        <InfoLabel>repository</InfoLabel>
        <a
          href={skill.repo_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 block break-all text-[0.95rem] text-ink-soft underline decoration-terracotta/40 decoration-1 underline-offset-4 hover:decoration-terracotta visited:decoration-muted/50"
        >
          {repoLabelOf(skill.repo_url)}
        </a>
      </div>

      {/* (5) Fine-print — compatto: livello · verificata {data} */}
      <div
        className="text-[11px] tabular-figures text-muted"
        style={{ letterSpacing: '0.04em' }}
      >
        {skill.livello} · verificata {formatDate(skill.data_controllo)}
      </div>
    </div>
  );
}

// Estrae label leggibile dall'URL repo (toglie lo schema http/https).
function repoLabelOf(url: string): string {
  return url.replace(/^https?:\/\//, '');
}
