import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { loadSkills, getSkillById } from '@/lib/skills';
import { extractDraftMarker, Prose } from '@/lib/markdown';
import { CopyButton } from '@/components/CopyButton';
import { BackLink } from '@/components/ui/BackLink';
import { DOVE_FUNZIONA_LABEL } from '@/types/skill';
import type { ProfiloSicurezza } from '@/types/skill';

// Pagina di dettaglio skill (VIEW-06) — static export. Una pagina per ogni id
// del JSON via generateStaticParams; dynamicParams=false → solo i 12 id noti.
// Contenuto: nome, tagline, meta (tema/contesto), voce personale (markdown),
// comando copiabile, riconoscimenti (stelle/ufficiale/verificata) e BackLink
// "Torna al catalogo".

export const dynamicParams = false;

// Next 16: `params` è asincrono (Promise) in page e generateMetadata.
// generateStaticParams resta sincrono e restituisce gli oggetti dei 12 id.
type Params = Promise<{ id: string }>;

export function generateStaticParams() {
  return loadSkills().map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const skill = getSkillById(id);
  if (!skill) return { title: 'Skill non trovata' };
  return {
    title: `${skill.nome} — ${skill.tema}`,
    description: skill.tagline,
    alternates: { canonical: `/skill/${skill.id}` },
    openGraph: {
      url: `/skill/${skill.id}`,
      title: `${skill.nome} · skilletti`,
      description: skill.tagline,
    },
  };
}

const SECURITY_LABEL: Record<ProfiloSicurezza, string> = {
  'self-contained': 'self-contained',
  'ufficiale-anthropic': 'ufficiale Anthropic',
  'chiamate-esterne': 'chiama servizi esterni',
  'si-auto-aggiorna': 'si auto-aggiorna',
  'legge-credenziali': 'legge credenziali',
  'esegue-script': 'esegue script',
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('it-IT', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatStars(stelle: number | null, noteStelle?: string): string {
  if (stelle === null) return noteStelle ?? '— stelle';
  if (stelle >= 1000) return `${(stelle / 1000).toFixed(1).replace('.0', '')}k stelle`;
  return `${stelle} stelle`;
}

function MicroLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-[11px] font-medium uppercase tabular-figures text-soft"
      style={{ letterSpacing: 'var(--tracking-micro)' }}
    >
      {children}
    </div>
  );
}

export default async function SkillDetail({ params }: { params: Params }) {
  const { id } = await params;
  const skill = getSkillById(id);
  if (!skill) notFound();

  const { content, isDraft } = extractDraftMarker(skill.descrizione_personale);
  const dove = skill.dove_funziona.map((c) => DOVE_FUNZIONA_LABEL[c]).join(' / ');

  return (
    <main id="contenuto" className="relative bg-cream text-red">
      <article className="relative pl-[var(--gutter-indent)] pr-[calc(7vw+var(--gutter-edge))] py-12 sm:py-16">
        <BackLink href="/step-4-esplora/">Torna al catalogo</BackLink>

        {/* Meta-riga */}
        <div
          className="mt-8 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] font-medium uppercase tabular-figures text-soft"
          style={{ letterSpacing: 'var(--tracking-micro)' }}
        >
          {skill.importanza === 'essenziale' && (
            <>
              <span className="text-red">essenziale</span>
              <span aria-hidden="true" className="text-soft/40">·</span>
            </>
          )}
          <span>{skill.tema}</span>
          <span aria-hidden="true" className="text-soft/40">·</span>
          <span>{dove}</span>
          <span aria-hidden="true" className="text-soft/40">·</span>
          <span>{skill.livello}</span>
          {isDraft && (
            <>
              <span aria-hidden="true" className="text-soft/40">·</span>
              <span className="text-red">bozza</span>
            </>
          )}
        </div>

        {/* Nome */}
        <h1
          className="mt-3 text-[clamp(2.25rem,5vw,3.5rem)] font-bold text-red balance"
          style={{ lineHeight: 1.05, letterSpacing: 'var(--tracking-display)' }}
        >
          {skill.nome}
        </h1>

        {/* Tagline */}
        <p
          className="lead mt-4 max-w-[var(--measure-tagline)] text-[clamp(1.2rem,2vw,1.6rem)] italic text-soft balance"
          style={{ lineHeight: 1.35 }}
        >
          {skill.tagline}
        </p>

        {/* Due colonne da lg: voce a sinistra, info pratiche a destra. */}
        <div className="mt-12 grid grid-cols-1 gap-x-14 gap-y-12 lg:grid-cols-[1fr_22rem] lg:items-start">
          {/* ── Colonna sinistra — a che serve + voce personale ── */}
          <div>
            <MicroLabel>a che serve</MicroLabel>
            <p
              className="mt-2 max-w-[var(--measure-prose)] text-[1.0625rem] text-red prose-pretty"
              style={{ lineHeight: 1.6 }}
            >
              {skill.a_che_serve}
            </p>

            <div className="mt-10">
              <MicroLabel>perché la uso, quando</MicroLabel>
              <Prose className="mt-3 max-w-[var(--measure-prose)] text-[1.0625rem] text-red/85 prose-pretty">
                {content}
              </Prose>
              {skill.note && (
                <p className="mt-4 max-w-[var(--measure-prose)] text-[0.95rem] italic text-soft">
                  {skill.note}
                </p>
              )}
            </div>
          </div>

          {/* ── Colonna destra — info pratiche ── */}
          <aside className="flex flex-col gap-7 rounded-[var(--radius)] border border-line p-6">
            {/* Installazione */}
            <div>
              <div className="flex items-baseline justify-between gap-3">
                <MicroLabel>installazione</MicroLabel>
                <CopyButton text={skill.installazione} />
              </div>
              <code
                className="mt-2 block overflow-x-auto rounded-sm border border-line px-3 py-2 text-[0.85rem] text-red/85"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {skill.installazione}
              </code>
            </div>

            {/* Riconoscimenti */}
            <div
              className="text-[11px] font-medium uppercase tabular-figures text-red/70"
              style={{ letterSpacing: '0.06em' }}
            >
              {formatStars(skill.stelle, skill.note_stelle)} · {skill.licenza} · creato da{' '}
              {skill.autore}
            </div>

            {/* Profilo sicurezza */}
            <div>
              <MicroLabel>profilo sicurezza</MicroLabel>
              <div className="mt-2 flex flex-wrap gap-2">
                {skill.profilo_sicurezza.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-[var(--radius-pill)] border border-line px-2.5 py-0.5 text-[11px] font-medium uppercase tabular-figures text-soft"
                    style={{ letterSpacing: 'var(--tracking-micro)' }}
                  >
                    {SECURITY_LABEL[tag]}
                  </span>
                ))}
              </div>
            </div>

            {/* Repository */}
            <div>
              <MicroLabel>repository</MicroLabel>
              <a
                href={skill.repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block break-all text-[0.95rem] text-red/85 underline decoration-red/40 decoration-1 underline-offset-4 hover:decoration-red"
              >
                {skill.repo_url.replace(/^https?:\/\//, '')}
              </a>
            </div>

            {/* Fine-print */}
            <div className="text-[11px] tabular-figures text-soft" style={{ letterSpacing: '0.04em' }}>
              verificata {formatDate(skill.data_controllo)}
            </div>
          </aside>
        </div>

        <div className="mt-16 border-t border-line pt-8">
          <BackLink href="/step-4-esplora/">Torna al catalogo</BackLink>
        </div>
      </article>
    </main>
  );
}
