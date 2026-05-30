import { Card } from '@/components/ui/Card';
import { ArrowRightIcon, StarIcon } from '@/components/icons';
import type { DoveFunziona, Skill } from '@/types/skill';
import { DOVE_FUNZIONA_LABEL } from '@/types/skill';

// Card compatta per le griglie (essenziali in home + griglia Esplora). Card-link
// per intero verso il dettaglio /skill/{id}/. Mostra meta-riga (tema · contesto),
// nome, tagline e una riga d'invito. Server component: nessun JS.
//
// Il filtro a chip di Esplora agisce sul wrapper esterno `[data-grid-item]`
// (vedi SkillGrid) — questa card non porta lo stato del filtro.

function doveLabel(contexts: DoveFunziona[]): string {
  return contexts.map((c) => DOVE_FUNZIONA_LABEL[c]).join(' / ');
}

export function SkillGridCard({
  skill,
  headingLevel = 'h3',
}: {
  skill: Skill;
  headingLevel?: 'h2' | 'h3';
}) {
  const isEssential = skill.importanza === 'essenziale';
  // Il nome è il titolo della card. Il livello dipende dal contesto: sotto la
  // sezione "essenziali" (home, h2) → h3; in Esplora la griglia sta sotto l'h1
  // della pagina → h2. Niente aria-label: il nome accessibile del link è il suo
  // testo (evita label-content-name-mismatch).
  const Heading = headingLevel;

  return (
    <Card href={`/skill/${skill.id}/`} className="flex h-full flex-col">
      {/* Meta-riga */}
      <div
        className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] font-medium uppercase tabular-figures text-soft"
        style={{ letterSpacing: 'var(--tracking-micro)' }}
      >
        {isEssential && (
          <>
            <span className="inline-flex items-center gap-1 text-red">
              <StarIcon className="h-3 w-3" />
              essenziale
            </span>
            <span aria-hidden="true" className="text-soft/40">·</span>
          </>
        )}
        <span>{skill.tema}</span>
        <span aria-hidden="true" className="text-soft/40">·</span>
        <span>{doveLabel(skill.dove_funziona)}</span>
      </div>

      {/* Nome */}
      <Heading
        className="mt-3 text-[1.4rem] font-semibold text-red balance"
        style={{ lineHeight: 1.15, letterSpacing: 'var(--tracking-display)' }}
      >
        {skill.nome}
      </Heading>

      {/* Tagline */}
      <p
        className="lead mt-2 text-[1.0625rem] italic text-soft prose-pretty"
        style={{ lineHeight: 1.4 }}
      >
        {skill.tagline}
      </p>

      {/* Invito a leggere */}
      <span
        className="mt-5 inline-flex items-center gap-1.5 self-start text-[12px] font-medium uppercase tabular-figures text-red transition-colors group-hover:text-red"
        style={{ letterSpacing: 'var(--tracking-micro)' }}
      >
        Leggi la scheda
        <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Card>
  );
}
