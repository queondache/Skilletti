import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { Percorso } from '@/components/Percorso';
import { SkillGridCard } from '@/components/SkillGridCard';
import { Button } from '@/components/ui/Button';
import { ArrowRightIcon, StarIcon } from '@/components/icons';
import { getEssentialSkills } from '@/lib/skills';

// Home Round 7 — calma. Hero + Percorso (i 5 passi) + anteprima "Le essenziali"
// (griglia di card che linkano al dettaglio e a Esplora) + footer (nel layout).

const essenziali = getEssentialSkills();

export const metadata: Metadata = {
  title: 'Le migliori skill di Claude, scelte a mano',
  description:
    'Una guida curata alle skill di Claude: poche, scelte e raccontate una a una. Dal vocabolario al primo progetto.',
  alternates: { canonical: '/' },
  openGraph: {
    url: '/',
    title: 'skilletti — le migliori skill di Claude, scelte a mano',
    description:
      'Una guida curata alle skill di Claude: poche, scelte e raccontate una a una.',
  },
};

export default function HomePage() {
  return (
    <main className="relative bg-cream text-red">
      <Hero />

      <Percorso />

      {/* Anteprima — Le essenziali */}
      <section className="relative pl-[var(--gutter-indent)] pr-[calc(7vw+var(--gutter-edge))] py-16 sm:py-24 border-t border-line">
        <div
          className="flex items-center gap-2 text-[11px] font-medium uppercase tabular-figures text-soft"
          style={{ letterSpacing: 'var(--tracking-micro)' }}
        >
          <StarIcon className="h-3.5 w-3.5 text-red" />
          le essenziali
        </div>
        <h2
          data-reveal
          className="mt-2 text-[clamp(2rem,3.5vw,3rem)] font-semibold text-red balance"
          style={{ lineHeight: 1.1, letterSpacing: 'var(--tracking-display)' }}
        >
          Da queste partirei
        </h2>
        <p
          className="mt-4 max-w-[var(--measure-prose)] text-[1.0625rem] italic text-soft prose-pretty"
          style={{ lineHeight: 1.6 }}
        >
          Le quattro skill che cambiano come lavori con Claude prima di tutte le
          altre. Aprile una alla volta, senza fretta.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {essenziali.map((skill) => (
            <div key={skill.id} data-reveal>
              <SkillGridCard skill={skill} />
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Button href="/step-4-esplora/" variant="ghost">
            Vedi tutto il catalogo
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </main>
  );
}
