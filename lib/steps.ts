// Config dei 5 step del percorso guidato (Round 6). Single source per lo
// step-navigator (components/StepNav) e per la mappa dei 5 step in landing.
// I blurb sono placeholder didattici: Andrea li rifinisce in Round 7.

export type Step = {
  n: number;
  slug: string;
  label: string;
  href: string;
  blurb: string;
};

export const STEPS: Step[] = [
  {
    n: 1,
    slug: 'step-1-capisci',
    label: 'Capisci',
    href: '/step-1-capisci',
    blurb: 'Le parole che servono: skill, plugin, MCP, CLI.',
  },
  {
    n: 2,
    slug: 'step-2-installa',
    label: 'Installa',
    href: '/step-2-installa',
    blurb: 'Metti Claude Code sul tuo computer: CLI, VS Code, mobile.',
  },
  {
    n: 3,
    slug: 'step-3-prime-skill',
    label: 'Prime skill',
    href: '/step-3-prime-skill',
    blurb: 'Le quattro essenziali da cui partire, una alla volta.',
  },
  {
    n: 4,
    slug: 'step-4-esplora',
    label: 'Esplora',
    href: '/step-4-esplora',
    blurb: 'Il catalogo completo, filtrabile per tema e contesto.',
  },
  {
    n: 5,
    slug: 'step-5-costruisci',
    label: 'Costruisci',
    href: '/step-5-costruisci',
    blurb: 'Il metodo e i due file per partire sul serio.',
  },
];

export const TOTAL_STEPS = STEPS.length;

export function stepByN(n: number): Step | undefined {
  return STEPS.find((s) => s.n === n);
}
