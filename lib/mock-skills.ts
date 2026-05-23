import type { Skill } from '@/types/skill';

/**
 * Mock di sviluppo — usato SOLO per validare il render di SkillCard
 * prima dell'arrivo del seed reale (data/skills.json) di Andrea.
 *
 * Le voci sono chiaramente fittizie (`example/...` o `anthropics/...`
 * di repository plausibili ma con campi inventati). Una volta che il
 * seed reale è in `data/skills.json`, questo file viene rimosso.
 *
 * Le due voci coprono entrambi i path interessanti per testare la card:
 *  1. skill standard con stelle numeriche + descrizione marcata [BOZZA]
 *  2. skill ufficiale Anthropic con `stelle: null` + `note_stelle`
 *     (esercita la regola condizionale dello schema)
 */
import { DRAFT_PREFIX } from '@/types/skill';

export const MOCK_SKILLS: Skill[] = [
  {
    id: 'mock-skill-editorial',
    nome: 'Skill di esempio (mock)',
    tagline: 'Mock per validare il rendering della scheda prima del seed.',
    tema: 'Coding & sviluppo',
    importanza: 'essenziale',
    livello: 'base',
    dove_funziona: 'entrambi',
    descrizione_personale: `${DRAFT_PREFIX} La uso quando devo **disambiguare** un blocco di codice e voglio una spiegazione in italiano. Funziona sia in Claude.ai che in Claude Code — di solito parto da \`/spiega\` e lascio che proponga lei la traduzione concettuale.\n\nEsempio: incolla un blocco, lei ti restituisce *cosa fa* e *perché*, non solo come.`,
    profilo_sicurezza: ['self-contained'],
    repo_url: 'https://github.com/example/mock-editorial-skill',
    stelle: 1842,
    ultimo_commit: '2026-05-12',
    licenza: 'MIT',
    installazione: 'pnpm dlx claude install example/mock-editorial-skill',
    data_controllo: '2026-05-22',
    stato: 'attiva',
  },
  {
    id: 'mock-skill-anthropic-official',
    nome: 'Mock skill ufficiale Anthropic',
    tagline: 'Caso limite: stelle null + repo anthropics/* + note_stelle obbligatorio.',
    tema: 'Produttività & workflow',
    importanza: 'essenziale',
    livello: 'intermedio',
    dove_funziona: 'claude-code',
    descrizione_personale: `Mantenuta da Anthropic, vive dentro un monorepo (claude-cookbooks): il conteggio stelle del repo aggrega molte risorse, quindi non è un proxy onesto per questa singola skill.\n\nPer i nostri filtri vale l'eccezione "ufficiale": dentro per qualità istituzionale, fuori dal conteggio stelle.`,
    profilo_sicurezza: ['ufficiale-anthropic', 'chiamate-esterne'],
    repo_url: 'https://github.com/anthropics/claude-cookbooks',
    stelle: null,
    note_stelle: 'Monorepo: il conteggio aggrega molte skill, non riflette questa.',
    ultimo_commit: '2026-05-18',
    licenza: 'MIT',
    installazione: 'gh repo clone anthropics/claude-cookbooks',
    data_controllo: '2026-05-22',
    stato: 'attiva',
    note: 'Inclusa per qualifica `ufficiale-anthropic`, non per soglia 1000★.',
  },
];
