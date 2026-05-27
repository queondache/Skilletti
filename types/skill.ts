/**
 * Modello dati di una skill — fonte di verità tipata.
 * Corrisponde 1:1 al campo del JSON Schema (data/skills.schema.json).
 * Modifiche qui richiedono modifica parallela dello schema.
 */

// Enum chiusi — devono restare in sync con skills.schema.json
export const TEMI = [
  'Scrittura',
  'Ricerca & web',
  'Gestione file e documenti',
  'Coding & sviluppo',
  'Design & UI',
  'Produttività & workflow',
  'Sicurezza',
  'Dati',
  'Marketing',
] as const;
export type Tema = (typeof TEMI)[number];

export const IMPORTANZE = ['essenziale', 'forte', 'situazionale'] as const;
export type Importanza = (typeof IMPORTANZE)[number];

export const LIVELLI = ['base', 'intermedio', 'power'] as const;
export type Livello = (typeof LIVELLI)[number];

/**
 * Contesti d'uso. Una skill può girare su più contesti (campo array).
 * - claude-code     → CLI da terminale
 * - claude-in-vscode → estensione VS Code di Claude Code
 * - claude-mobile   → app iOS/Android
 * Niente `claude.ai`: decisione strategica, il sito copre solo Claude Code/IDE.
 */
export const DOVE_FUNZIONA = [
  'claude-code',
  'claude-in-vscode',
  'claude-mobile',
] as const;
export type DoveFunziona = (typeof DOVE_FUNZIONA)[number];

/** Etichette brevi per il render (micro-label, niente emoji — coerenza editoriale). */
export const DOVE_FUNZIONA_LABEL: Record<DoveFunziona, string> = {
  'claude-code': 'CLI',
  'claude-in-vscode': 'VS Code',
  'claude-mobile': 'Mobile',
};

export const STATI = ['attiva', 'da-verificare', 'archiviata'] as const;
export type Stato = (typeof STATI)[number];

/**
 * Tag profilo sicurezza. Enum chiuso.
 * Aggiunto `ufficiale-anthropic` come tag privilegiato per skill mantenute
 * dall'org Anthropic (qualifica diversa da self-contained — affidabilità
 * istituzionale, non solo tecnica).
 */
export const PROFILI_SICUREZZA = [
  'self-contained',
  'legge-credenziali',
  'esegue-script',
  'chiamate-esterne',
  'si-auto-aggiorna',
  'ufficiale-anthropic',
] as const;
export type ProfiloSicurezza = (typeof PROFILI_SICUREZZA)[number];

/**
 * Una skill nel catalogo. 18 campi obbligatori SPEC §5 + 2 opzionali
 * (`note` free-text per casi edge + `note_stelle` quando `stelle` è null).
 */
export type Skill = {
  id: string;
  nome: string;
  tagline: string;
  tema: Tema;
  importanza: Importanza;
  livello: Livello;
  /** Contesti d'uso. Array non vuoto: una skill può girare su più contesti. */
  dove_funziona: DoveFunziona[];
  /** Spiegazione concreta in linguaggio piano: cosa fa per l'utente, non come
   *  funziona dentro. Sempre visibile nella scheda, sopra la piega.
   *  Min 50, max 500 caratteri (vincolato dallo schema). */
  a_che_serve: string;
  /** Voce personale di Andrea. Può iniziare con "[BOZZA — Andrea rifinisce]"
   *  per marcare schede da rifinire. Il prefisso viene strippato in render
   *  e sostituito da un badge visivo. */
  descrizione_personale: string;
  profilo_sicurezza: readonly ProfiloSicurezza[];
  repo_url: string;
  /** Numero stelle GitHub al momento del controllo.
   *  Può essere `null` SOLO per repo in org whitelist (`anthropics/...`,
   *  `firecrawl/...`) — in tal caso `note_stelle` deve essere presente.
   *  Vincolato dallo schema. */
  stelle: number | null;
  /** Spiegazione del `null` in `stelle` — obbligatorio se `stelle === null`. */
  note_stelle?: string;
  /** Data ISO 8601 (YYYY-MM-DD). */
  ultimo_commit: string;
  licenza: string;
  /** Maintainer principale o org. Format libero ma leggibile
   *  (es. 'Anthropic', 'obra (Jesse Vincent)'). */
  autore: string;
  installazione: string;
  /** Data ISO 8601 (YYYY-MM-DD). */
  data_controllo: string;
  stato: Stato;
  /** Free text per casi edge non coperti dagli enum. Opzionale. */
  note?: string;
};

/** Marker di bozza nella `descrizione_personale`. */
export const DRAFT_PREFIX = '[BOZZA — Andrea rifinisce]';

/** Whitelist di org GitHub esenti dalla soglia 1000 stelle (SPEC §6.1).
 *  Aggiunte solo con OK esplicito di Andrea (vedi piano Fase 4). */
export const TRUSTED_ORGS = [
  'anthropics',
  'vercel',
  'google',
  'supabase',
  'microsoft',
  'github',
] as const;
export type TrustedOrg = (typeof TRUSTED_ORGS)[number];

/** Org whitelisted per consentire `stelle: null` (richiede `note_stelle`).
 *  Sottoinsieme stretto di TRUSTED_ORGS — coerente con la regola if/then
 *  in skills.schema.json. firecrawl/* è incluso perché firecrawl-mcp è un
 *  MCP server in un monorepo (lib madre conta ma il server no). */
export const ORGS_NULL_STARS_OK = ['anthropics', 'firecrawl'] as const;
export type OrgNullStarsOk = (typeof ORGS_NULL_STARS_OK)[number];
