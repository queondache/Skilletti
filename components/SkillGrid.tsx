import { SkillGridCard } from '@/components/SkillGridCard';
import { temaSlugOf } from '@/lib/skills';
import type { Skill } from '@/types/skill';

// Griglia di card skill. Ogni card è avvolta in un wrapper `[data-grid-item]`
// che porta `data-tema` (slug): il ChipFilter di Esplora toggla `data-chip-hidden`
// su questi wrapper per filtrare senza re-render. Server component.

export function SkillGrid({ skills }: { skills: Skill[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {skills.map((skill) => (
        <div
          key={skill.id}
          data-grid-item
          data-tema={temaSlugOf(skill.tema) ?? ''}
          data-reveal
        >
          <SkillGridCard skill={skill} />
        </div>
      ))}
    </div>
  );
}
