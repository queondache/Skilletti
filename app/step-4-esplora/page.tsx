import type { Metadata } from 'next';
import { Summary } from '@/components/Summary';
import { Catalog } from '@/components/Catalog';
import { StepNav } from '@/components/StepNav';
import type { Skill } from '@/types/skill';
import skillsData from '@/data/skills.json';

// Step 4 — Esplora. Catalogo completo + Summary tematico + ContextFilter
// migrati da v1 COM'È. NB: la sostituzione del Summary con la mappa parole
// è Fase D — qui si migra soltanto.

const skills = skillsData as Skill[];

export const metadata: Metadata = {
  title: 'Esplora — il catalogo completo',
  description:
    'Tutte le skill di Claude raggruppate per tema, filtrabili per contesto (CLI, VS Code, mobile).',
  alternates: { canonical: '/step-4-esplora' },
  openGraph: { url: '/step-4-esplora', title: 'Esplora · skilletti' },
};

export default function Step4Esplora() {
  return (
    <main className="relative bg-paper text-ink">
      {/* Sommario tematico — orientamento (Fase D lo sostituirà con la mappa) */}
      <Summary skills={skills} />

      <section
        className="relative pl-[var(--gutter-indent)] pr-[calc(7vw+var(--gutter-edge))] min-[1440px]:pr-[calc(7vw+var(--gutter-edge)+8rem)] py-12 sm:py-20 border-t border-rule"
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
          style={{ lineHeight: 1.6, fontVariationSettings: '"opsz" 24' }}
        >
          Tutte le altre schede attive, raggruppate per tema. Scegli un tema
          dall&rsquo;indice per isolarlo, oppure scorri tutto.
        </p>

        <Catalog skills={skills} />

        <StepNav current={4} />
      </section>
    </main>
  );
}
