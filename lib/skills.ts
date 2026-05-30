// Loader unico delle skill — fonte di verità a build time.
//
// Le viste leggono da qui invece di importare data/skills.json sparsamente:
// così l'ordine essenziali, i temi e il lookup per id restano coerenti in
// tutto il sito (home, Esplora, dettaglio). Schema garantito dal prebuild
// `validate:data` → cast diretto sicuro.

import skillsData from '@/data/skills.json';
import type { Skill } from '@/types/skill';

// Ordine semantico dei temi (user-first). `match` = valore esatto del campo
// `tema` in skills.json; `slug` = identificatore per chip/URL; `short` =
// etichetta breve per i chip. Solo i temi con almeno una skill non-essenziale
// vengono esposti da `getThemes()`.
export const TEMA_ORDER = [
  { slug: 'design', label: 'Design & UI', short: 'Design', match: 'Design & UI' },
  { slug: 'coding', label: 'Coding & sviluppo', short: 'Coding', match: 'Coding & sviluppo' },
  { slug: 'marketing', label: 'Marketing', short: 'Marketing', match: 'Marketing' },
  { slug: 'sicurezza', label: 'Sicurezza', short: 'Sicurezza', match: 'Sicurezza' },
  { slug: 'workflow', label: 'Produttività & workflow', short: 'Workflow', match: 'Produttività & workflow' },
  { slug: 'web', label: 'Ricerca & web', short: 'Web', match: 'Ricerca & web' },
] as const;

export type TemaSlug = (typeof TEMA_ORDER)[number]['slug'];

export type ThemeInfo = {
  slug: TemaSlug;
  short: string;
  label: string;
  count: number;
};

const ALL: Skill[] = skillsData as Skill[];

/** Tutte le skill, ordine del JSON (= ordine curato da Andrea). */
export function loadSkills(): Skill[] {
  return ALL;
}

/** Le essenziali, nell'ordine in cui compaiono nel JSON (= ordine consigliato). */
export function getEssentialSkills(): Skill[] {
  return ALL.filter((s) => s.importanza === 'essenziale');
}

/** Le non-essenziali — il "catalogo" oltre le quattro porte d'ingresso. */
export function getCatalogSkills(): Skill[] {
  return ALL.filter((s) => s.importanza !== 'essenziale');
}

/**
 * Temi presenti nel catalogo, con conteggio. Conta TUTTE le skill del tema
 * (essenziali incluse): in Esplora il chip filtra l'intera griglia, non solo
 * il catalogo "oltre le essenziali". Solo i temi con almeno una skill vengono
 * restituiti — niente chip vuoti.
 */
export function getThemes(): ThemeInfo[] {
  return TEMA_ORDER.map((t) => ({
    slug: t.slug,
    short: t.short,
    label: t.label,
    count: ALL.filter((s) => s.tema === t.match).length,
  })).filter((t) => t.count > 0);
}

/** Lookup per id — per le pagine di dettaglio. `undefined` se l'id non esiste. */
export function getSkillById(id: string): Skill | undefined {
  return ALL.find((s) => s.id === id);
}

/** Mappa tema (valore JSON) → slug, per assegnare lo slug-chip a ogni card. */
export function temaSlugOf(tema: Skill['tema']): TemaSlug | null {
  const entry = TEMA_ORDER.find((t) => t.match === tema);
  return entry ? entry.slug : null;
}
