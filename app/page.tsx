import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { Hero } from '@/components/Hero';
import { SkillCard } from '@/components/SkillCard';
import { Article } from '@/lib/markdown';
import type { Skill } from '@/types/skill';
import skillsData from '@/data/skills.json';

// Letto a build time (static export). Single source of truth = il .mdx.
const workflowMdx = readFileSync(
  resolve(process.cwd(), 'content/workflow.mdx'),
  'utf-8',
);

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

      {/* Parti da qui — porte d'ingresso curate */}
      <section
        id="parti-da-qui"
        className="relative pl-[var(--gutter-indent)] pr-[calc(7vw+var(--gutter-edge))] py-24"
      >
        <div
          className="text-[11px] font-medium uppercase tabular-figures text-muted"
          style={{ letterSpacing: 'var(--tracking-micro)' }}
        >
          parti da qui
        </div>
        <h2
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
          className="mt-4 max-w-[var(--measure-prose)] text-[1.0625rem] italic text-ink-soft prose-pretty"
          style={{
            lineHeight: 1.55,
            fontVariationSettings: '"opsz" 24',
          }}
        >
          Per chi parte da zero o quasi: le skill che cambiano il modo in cui
          lavori con Claude prima di tutte le altre. Provale in quest&rsquo;ordine,
          una alla volta, senza fretta.
        </p>

        <div className="mt-10 max-w-[820px]">
          {partiDaQui.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </section>

      {/* Catalogo — placeholder, render reale arriva in Fase 3 (filtri + catalogo completo) */}
      <section
        id="catalogo"
        className="relative pl-[var(--gutter-indent)] pr-[calc(7vw+var(--gutter-edge))] py-24 border-t border-rule"
      >
        <div
          className="text-[11px] font-medium uppercase tabular-figures text-muted"
          style={{ letterSpacing: 'var(--tracking-micro)' }}
        >
          in arrivo · fase 3
        </div>
        <h2
          className="mt-2 text-[clamp(2rem,3.5vw,3rem)] font-semibold text-ink balance"
          style={{
            lineHeight: 1.1,
            letterSpacing: 'var(--tracking-display)',
            fontVariationSettings: '"opsz" 96',
          }}
        >
          Catalogo
        </h2>
        <p
          className="mt-4 max-w-[var(--measure-prose)] text-[1.0625rem] italic text-ink-soft prose-pretty"
          style={{
            lineHeight: 1.55,
            fontVariationSettings: '"opsz" 24',
          }}
        >
          Le altre {skills.length - partiDaQui.length} schede attive — filtri per tema,
          livello e dove funzionano — apriranno qui appena la Fase 3 sarà pronta.
        </p>
      </section>

      {/* Workflow — sezione editoriale tra catalogo e didattica.
          Contenuto canonico in content/workflow.mdx, render via Article. */}
      <section
        id="workflow"
        className="relative pl-[var(--gutter-indent)] pr-[calc(7vw+var(--gutter-edge))] py-24 border-t border-rule"
      >
        <div
          className="text-[11px] font-medium uppercase tabular-figures text-muted"
          style={{ letterSpacing: 'var(--tracking-micro)' }}
        >
          metodo
        </div>
        <h2
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

      {/* Didattica — placeholder, contenuto in content/pedagogia.mdx già scritto */}
      <section
        id="didattica"
        className="relative pl-[var(--gutter-indent)] pr-[calc(7vw+var(--gutter-edge))] py-24 border-t border-rule"
      >
        <div
          className="text-[11px] font-medium uppercase tabular-figures text-muted"
          style={{ letterSpacing: 'var(--tracking-micro)' }}
        >
          in arrivo · fase 4
        </div>
        <h2
          className="mt-2 text-[clamp(2rem,3.5vw,3rem)] font-semibold text-ink balance"
          style={{
            lineHeight: 1.1,
            letterSpacing: 'var(--tracking-display)',
            fontVariationSettings: '"opsz" 96',
          }}
        >
          Un piccolo vocabolario
        </h2>
        <p
          className="mt-4 max-w-[var(--measure-prose)] text-[1.0625rem] italic text-ink-soft prose-pretty"
          style={{
            lineHeight: 1.55,
            fontVariationSettings: '"opsz" 24',
          }}
        >
          Skill, plugin, MCP, slash command: le parole che servono per leggere
          le schede senza inciampare. Sezione redatta, ancora da legare alla pagina.
        </p>
      </section>

      {/* Firma — fondo pagina, non più dentro l'hero */}
      <footer
        className="relative pl-[var(--gutter-indent)] pr-[calc(7vw+var(--gutter-edge))] py-12 border-t border-rule"
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
