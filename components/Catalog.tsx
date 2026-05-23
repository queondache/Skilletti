import { SkillCard } from '@/components/SkillCard';
import { CatalogControls } from '@/components/CatalogControls';
import type { Skill } from '@/types/skill';

/**
 * Catalogo — server component.
 *
 * Raggruppa le schede non-essenziali per tema in ordine semantico
 * user-first (Design → Coding → Marketing → Sicurezza → Workflow → Web).
 * I gruppi vuoti vengono saltati per evitare titoli orfani: l'ordine
 * resta canonico, ma se domani Marketing va a zero non si vede.
 *
 * I conteggi mostrati nel controllo ibrido sono calcolati qui da
 * `skills.json` filtrando `importanza !== 'essenziale'`: la fonte è
 * unica, niente numeri hard-coded.
 */

// Ordine semantico user-first (decisione Fase A Round 2).
// `match` è il valore esatto del campo `tema` in skills.json.
// `slug` è l'anchor e l'identificatore URL.
const TEMA_ORDER = [
  { slug: 'design', label: 'Design & UI', short: 'Design', match: 'Design & UI' },
  { slug: 'coding', label: 'Coding & sviluppo', short: 'Coding', match: 'Coding & sviluppo' },
  { slug: 'marketing', label: 'Marketing', short: 'Marketing', match: 'Marketing' },
  { slug: 'sicurezza', label: 'Sicurezza', short: 'Sicurezza', match: 'Sicurezza' },
  { slug: 'workflow', label: 'Produttività & workflow', short: 'Workflow', match: 'Produttività & workflow' },
  { slug: 'web', label: 'Ricerca & web', short: 'Web', match: 'Ricerca & web' },
] as const;

type TemaSlug = (typeof TEMA_ORDER)[number]['slug'];

export interface TemaInfo {
  slug: TemaSlug;
  short: string;
  count: number;
}

export function Catalog({ skills }: { skills: Skill[] }) {
  const nonEssenziali = skills.filter((s) => s.importanza !== 'essenziale');

  const groups = TEMA_ORDER.map((t) => ({
    slug: t.slug,
    label: t.label,
    short: t.short,
    skills: nonEssenziali.filter((s) => s.tema === t.match),
  })).filter((g) => g.skills.length > 0);

  const controls: TemaInfo[] = groups.map((g) => ({
    slug: g.slug,
    short: g.short,
    count: g.skills.length,
  }));

  return (
    <>
      <CatalogControls temi={controls} />

      <div id="catalog-groups" className="mt-12">
        {groups.map((g, i) => (
          <section
            key={g.slug}
            id={`tema-${g.slug}`}
            data-tema={g.slug}
            className={`tema-group transition-opacity duration-200 ease-out ${
              i === 0 ? '' : 'mt-20'
            }`}
            style={{ scrollMarginTop: '120px' }}
          >
            <div className="flex items-center gap-4">
              <span aria-hidden="true" className="inline-block h-px w-12 bg-terracotta/60" />
              <h3
                className="text-[clamp(1.5rem,2.4vw,2rem)] font-semibold text-ink balance"
                style={{
                  lineHeight: 1.15,
                  letterSpacing: 'var(--tracking-display)',
                  fontVariationSettings: '"opsz" 48',
                }}
              >
                {g.label}
              </h3>
            </div>

            <div className="mt-2 max-w-[820px]">
              {g.skills.map((s) => (
                <SkillCard key={s.id} skill={s} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
