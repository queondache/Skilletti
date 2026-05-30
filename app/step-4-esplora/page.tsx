import type { Metadata } from 'next';
import { loadSkills, getThemes } from '@/lib/skills';
import { SkillGrid } from '@/components/SkillGrid';
import { ChipFilter } from '@/components/ChipFilter';
import { StepFooterNav } from '@/components/StepFooterNav';
import { StarIcon } from '@/components/icons';
import { IconReveal } from '@/components/IconReveal';

// Step 4 — Esplora. Decisione approvata: assorbe anche step-3 (prime skill).
// Catalogo a griglia + chip filtro per TEMA (niente mappa parole). Le quattro
// essenziali sono in cima alla griglia (ordine del JSON) e segnate con la stella
// (badge nella SkillGridCard). Il filtro a chip agisce sull'intera griglia via
// data-attribute, senza re-render.

const skills = loadSkills();
const themes = getThemes();

export const metadata: Metadata = {
  title: 'Esplora — il catalogo completo',
  description:
    'Tutte le skill di Claude, a griglia, filtrabili per tema. Le quattro essenziali in cima.',
  alternates: { canonical: '/step-4-esplora' },
  openGraph: { url: '/step-4-esplora', title: 'Esplora · skilletti' },
};

export default function Step4Esplora() {
  return (
    <main id="contenuto" className="relative bg-cream text-red">
      <section className="relative pl-[var(--gutter-indent)] pr-[calc(7vw+var(--gutter-edge))] py-12 sm:py-16">
        <div
          className="flex items-center gap-2 text-[11px] font-medium uppercase tabular-figures text-soft"
          style={{ letterSpacing: 'var(--tracking-micro)' }}
        >
          <IconReveal icon="cactus" className="h-4 w-4 text-red" />
          esplora · passi 3–4
        </div>
        <h1
          data-reveal
          className="mt-2 text-[clamp(2rem,3.5vw,3rem)] font-bold text-red balance"
          style={{ lineHeight: 1.1, letterSpacing: 'var(--tracking-display)' }}
        >
          Il catalogo, per intero
        </h1>
        <p
          className="mt-4 max-w-[var(--measure-prose)] text-[1.0625rem] italic text-soft prose-pretty"
          style={{ lineHeight: 1.6 }}
        >
          Dodici skill scelte a mano. Filtra per tema, o scorri tutto. Le quattro
          essenziali sono in cima, segnate con la{' '}
          <span className="inline-flex items-center gap-1 not-italic text-red">
            <StarIcon className="h-3.5 w-3.5" /> stella
          </span>
          : da lì partirei.
        </p>

        {/* Filtro a chip per tema */}
        <div className="mt-10">
          <ChipFilter themes={themes} />
        </div>

        {/* Griglia — tutte le skill (essenziali per prime, badge nella card) */}
        <div className="mt-8">
          <SkillGrid skills={skills} headingLevel="h2" />
        </div>

        <StepFooterNav current={4} />
      </section>
    </main>
  );
}
