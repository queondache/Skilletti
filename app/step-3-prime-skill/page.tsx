import type { Metadata } from 'next';
import { SkillCard } from '@/components/SkillCard';
import { StepNav } from '@/components/StepNav';
import type { Skill } from '@/types/skill';
import skillsData from '@/data/skills.json';

// Step 3 — Prime skill. Le essenziali migrate da v1 ("Parti da qui").
// Schema garantito da prebuild validate-data → cast diretto sicuro.

const skills = skillsData as Skill[];

const PARTI_DA_QUI_LIMIT = 5;
const partiDaQui = skills
  .filter((s) => s.importanza === 'essenziale')
  .slice(0, PARTI_DA_QUI_LIMIT);

export const metadata: Metadata = {
  title: 'Prime skill — le essenziali',
  description:
    'Le skill di Claude da cui partire: quelle che cambiano come lavori prima di tutte le altre. Una alla volta.',
  alternates: { canonical: '/step-3-prime-skill' },
  openGraph: { url: '/step-3-prime-skill', title: 'Prime skill · skilletti' },
};

export default function Step3PrimeSkill() {
  return (
    <main className="relative bg-paper text-ink">
      <section
        className="relative pl-[var(--gutter-indent)] pr-[calc(7vw+var(--gutter-edge))] min-[1440px]:pr-[calc(7vw+var(--gutter-edge)+8rem)] py-12 sm:py-20"
      >
        <div
          className="text-[11px] font-medium uppercase tabular-figures text-muted"
          style={{ letterSpacing: 'var(--tracking-micro)' }}
        >
          prime skill
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
          style={{ lineHeight: 1.6, fontVariationSettings: '"opsz" 24' }}
        >
          Per chi parte da zero o quasi: le skill che cambiano il modo in cui
          lavori con Claude prima di tutte le altre. Provale in quest&rsquo;ordine,
          una alla volta, senza fretta.
        </p>

        <div className="mt-10 grid max-w-[820px] grid-cols-1 gap-x-16 gap-y-2 xl:max-w-[1180px] xl:grid-cols-2 xl:items-start">
          {partiDaQui.map((skill) => (
            <SkillCard key={skill.id} skill={skill} variant="doorway" />
          ))}
        </div>

        <StepNav current={3} />
      </section>
    </main>
  );
}
