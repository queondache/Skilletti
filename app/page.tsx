import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { Hero } from '@/components/Hero';
import { Summary } from '@/components/Summary';
import { SkillCard } from '@/components/SkillCard';
import { Catalog } from '@/components/Catalog';
import { TemplateSection } from '@/components/TemplateSection';
import { Article } from '@/lib/markdown';
import type { Skill } from '@/types/skill';
import skillsData from '@/data/skills.json';

// Letto a build time (static export). Single source of truth = il .mdx.
const workflowMdx = readFileSync(
  resolve(process.cwd(), 'content/workflow.mdx'),
  'utf-8',
);

// Pedagogia.mdx ha un h1 "Un piccolo vocabolario" perché è un documento
// autonomo. La sezione della home ha già lo stesso titolo (h2), quindi
// togliamo l'h1 iniziale dal markdown per evitare duplicazione.
// Poi promuoviamo ## → # così Article li rende come h3 (e non h4):
// così la gerarchia resta h2 (sezione) → h3 (sottosezioni) senza skip,
// coerente con la sezione "Metodo" che usa lo stesso pattern.
const pedagogiaMdx = readFileSync(
  resolve(process.cwd(), 'content/pedagogia.mdx'),
  'utf-8',
)
  .replace(/^#\s+.+\n+/, '')
  .replace(/^##\s/gm, '# ');

// Template versionati (fonte unica copiabile) — testo grezzo mostrato in
// blocco mono dalla sezione "Template". Stesso pattern readFileSync a build
// time degli .mdx sopra; qui niente trasformazioni, l'utente copia 1:1.
const claudeBaseMd = readFileSync(
  resolve(process.cwd(), 'content/templates/claude-base.md'),
  'utf-8',
).trimEnd();

const specBaseMd = readFileSync(
  resolve(process.cwd(), 'content/templates/spec-base.md'),
  'utf-8',
).trimEnd();

/**
 * Home — single-page con ancore (vedi SPEC §7).
 *
 * Fase 2 close (post-seed): caricamento server-side delle skill da
 * `data/skills.json`, sezione "Parti da qui" che mostra le essenziali
 * (top 5). Catalogo e didattica restano placeholder fino alle prossime fasi.
 *
 * La firma e la colonna paper-deep di rilegatura vivono nel layout della
 * pagina (non più dentro l'hero) → coprono tutta la scrollata.
 */

// Lo schema (scripts/validate-data.ts) garantisce il contratto tipato:
// cast diretto sicuro dopo prebuild → niente runtime parsing.
const skills = skillsData as Skill[];

// "Parti da qui": fino a 5 schede essenziali, in ordine di file
// (Andrea cura manualmente l'ordine in skills.json).
const PARTI_DA_QUI_LIMIT = 5;
const partiDaQui = skills
  .filter((s) => s.importanza === 'essenziale')
  .slice(0, PARTI_DA_QUI_LIMIT);

export default function HomePage() {
  return (
    <main className="relative bg-paper text-ink overflow-hidden">
      {/* Rilegatura editoriale — colonna paper-deep full-page (non solo hero) */}
      <aside
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-[7vw] min-w-[48px] bg-paper-deep border-l border-rule/60"
      />

      <Hero />

      {/* Sommario tematico — sala d'ingresso, orientamento immediato */}
      <Summary skills={skills} />

      {/* Parti da qui — porte d'ingresso curate */}
      <section
        id="parti-da-qui"
        className="relative pl-[var(--gutter-indent)] pr-[calc(7vw+var(--gutter-edge))] min-[1440px]:pr-[calc(7vw+var(--gutter-edge)+8rem)] py-12 sm:py-20"
        style={{ scrollMarginTop: '100px' }}
      >
        <div
          className="text-[11px] font-medium uppercase tabular-figures text-muted"
          style={{ letterSpacing: 'var(--tracking-micro)' }}
        >
          parti da qui
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
          Le essenziali
        </h2>
        <p
          className="lead mt-4 max-w-[var(--measure-prose)] text-[1.0625rem] italic text-ink-soft prose-pretty"
          style={{
            lineHeight: 1.6,
            fontVariationSettings: '"opsz" 24',
          }}
        >
          Per chi parte da zero o quasi: le skill che cambiano il modo in cui
          lavori con Claude prima di tutte le altre. Provale in quest&rsquo;ordine,
          una alla volta, senza fretta.
        </p>

        {/* Essenziali in griglia 2×2 da xl (≥1280px); sotto, colonna singola.
            Variante "doorway": card-porta calme (niente spina 60/40, che a metà
            larghezza affolla). gap-y per staccare le righe; items-start lascia
            variare l'altezza senza stiramenti. */}
        <div className="mt-10 grid max-w-[820px] grid-cols-1 gap-x-16 gap-y-2 xl:max-w-[1180px] xl:grid-cols-2 xl:items-start">
          {partiDaQui.map((skill) => (
            <SkillCard key={skill.id} skill={skill} variant="doorway" />
          ))}
        </div>
      </section>

      {/* Catalogo — schede non-essenziali raggruppate per tema, con controllo
          ibrido (indice + filtro in un solo controllo). Stato in URL ?tema=. */}
      <section
        id="catalogo"
        className="relative pl-[var(--gutter-indent)] pr-[calc(7vw+var(--gutter-edge))] min-[1440px]:pr-[calc(7vw+var(--gutter-edge)+8rem)] py-12 sm:py-20 border-t border-rule"
        style={{ scrollMarginTop: '100px' }}
      >
        <div
          className="text-[11px] font-medium uppercase tabular-figures text-muted"
          style={{ letterSpacing: 'var(--tracking-micro)' }}
        >
          catalogo
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
          Le altre
        </h2>
        <p
          className="lead mt-4 max-w-[var(--measure-prose)] text-[1.0625rem] italic text-ink-soft prose-pretty"
          style={{
            lineHeight: 1.6,
            fontVariationSettings: '"opsz" 24',
          }}
        >
          Tutte le altre schede attive, raggruppate per tema. Scegli un tema
          dall&rsquo;indice per isolarlo, oppure scorri tutto.
        </p>

        <Catalog skills={skills} />
      </section>

      {/* Workflow — sezione editoriale tra catalogo e didattica.
          Contenuto canonico in content/workflow.mdx, render via Article. */}
      <section
        id="workflow"
        className="relative pl-[var(--gutter-indent)] pr-[calc(7vw+var(--gutter-edge))] min-[1440px]:pr-[calc(7vw+var(--gutter-edge)+8rem)] py-12 sm:py-20 border-t border-rule"
        style={{ scrollMarginTop: '100px' }}
      >
        <div
          className="text-[11px] font-medium uppercase tabular-figures text-muted"
          style={{ letterSpacing: 'var(--tracking-micro)' }}
        >
          metodo
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
          Come uso Claude.ai e Claude Code insieme
        </h2>
        <Article className="mt-8">{workflowMdx}</Article>
      </section>

      {/* Template — due file per partire (CLAUDE.md + SPEC.md), copiabili.
          Testo grezzo letto a build time, render via TemplateSection. */}
      <section
        id="template"
        className="relative pl-[var(--gutter-indent)] pr-[calc(7vw+var(--gutter-edge))] min-[1440px]:pr-[calc(7vw+var(--gutter-edge)+8rem)] py-12 sm:py-20 border-t border-rule"
        style={{ scrollMarginTop: '100px' }}
      >
        <div
          className="text-[11px] font-medium uppercase tabular-figures text-muted"
          style={{ letterSpacing: 'var(--tracking-micro)' }}
        >
          template
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
          Due file per partire
        </h2>
        <TemplateSection claudeMd={claudeBaseMd} specMd={specBaseMd} />
      </section>

      {/* Didattica — render reale di content/pedagogia.mdx via Article,
          stesso pattern di workflow.mdx. */}
      <section
        id="didattica"
        className="relative pl-[var(--gutter-indent)] pr-[calc(7vw+var(--gutter-edge))] min-[1440px]:pr-[calc(7vw+var(--gutter-edge)+8rem)] py-12 sm:py-20 border-t border-rule"
        style={{ scrollMarginTop: '100px' }}
      >
        <div
          className="text-[11px] font-medium uppercase tabular-figures text-muted"
          style={{ letterSpacing: 'var(--tracking-micro)' }}
        >
          vocabolario
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
          Un piccolo vocabolario
        </h2>
        <Article className="mt-8">{pedagogiaMdx}</Article>
      </section>

      {/* Firma — fondo pagina, non più dentro l'hero */}
      <footer
        className="relative pl-[var(--gutter-indent)] pr-[calc(7vw+var(--gutter-edge))] min-[1440px]:pr-[calc(7vw+var(--gutter-edge)+8rem)] py-12 border-t border-rule"
      >
        <div
          className="text-[11px] font-medium uppercase tabular-figures text-ink/65"
          style={{ letterSpacing: 'var(--tracking-micro)' }}
        >
          2026 · Andrea Pesce · curato a mano
        </div>
      </footer>
    </main>
  );
}
