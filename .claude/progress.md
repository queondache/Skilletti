# Skilletti — Progress

> Snapshot di fine sessione: cosa è stato fatto, dove ci si è fermati, blocchi aperti.

## Ultima sessione — 2026-05-23

**Fase 2 parziale — pronto per seed reale (no catalog render finché data/skills.json arriva)**

### Contesto

Andrea ha avuto problemi col download del file seed `data/skills.json`. Su sua indicazione ho proceduto con **opzione 3**:
- types + schema Ajv + validator
- SkillCard isolato (con `lib/mock-skills.ts` — 2 mock inline)
- `app/page.tsx` con anteprima SkillCard + placeholder testuale per "Parti da qui"
- nessun render del catalogo reale fino al seed

### Cosa è stato fatto

1. **`types/skill.ts`** — `Skill` type 16 campi + 2 opzionali (`note`, `note_stelle`). Enum chiusi: `TEMI`, `IMPORTANZE`, `LIVELLI`, `DOVE_FUNZIONA`, `STATI`, `PROFILI_SICUREZZA` (con `ufficiale-anthropic`). `DRAFT_PREFIX` const. `TRUSTED_ORGS` whitelist anthropics/vercel/google/supabase/microsoft/github.
2. **`data/skills.schema.json`** — JSON Schema 2020-12. `additionalProperties: false`. `maxItems: 30`. Pattern `^[a-z][a-z0-9-]*$` per id. Date `format: date`. Regola condizionale via `if/then`: `stelle:null` ⇒ `note_stelle` obbligatorio + `repo_url` pattern `^https?://github\.com/anthropics/`.
3. **`scripts/validate-data.ts`** — Ajv2020 + ajv-formats. Strict mode. Vincoli extra non esprimibili in schema: 30-cap rigido, id duplicati, repo_url duplicati. Skip pulito se `skills.json` manca (pre-seed). Errori formattati con path+message+params.
4. **Hook + CI** — `prebuild` runna `validate:data` (build fallisce se invalido). `simple-git-hooks` installa pre-commit che esegue `pnpm validate:data`. `.git/hooks/pre-commit` verificato attivo. Per Fase 4/5 CI farà lo stesso (`pnpm build` ⇒ `prebuild` ⇒ validate).
5. **`lib/markdown.tsx`** — `react-markdown` con allowlist stretta (p/em/strong/code/pre/ul/ol/li/a/blockquote). Override `<a>` per `rel="noopener noreferrer"` su esterni. `<code>` inline con bg paper-deep + mono stack. `<p>` con leading editoriale. `extractDraftMarker()` strippa `[BOZZA — Andrea rifinisce]` e ritorna `{ content, isDraft }`.
6. **`components/SkillCard.tsx`** — server component (zero JS client). Layout editoriale: hairline rule sopra, tag meta (tema · dove_funziona · importanza) a destra in alto, badge "bozza" terracotta su card draft, nome (display weight 600 opsz 60), tagline italic, **profilo sicurezza SOPRA la piega** (badges variant positive/info/caution mappati per ogni tag), descrizione personale renderizzata via `Prose`, dettagli tecnici in `<details>` native (accessibile keyboard).
7. **`components/Hero.tsx`** — estratto da `app/page.tsx` per pulizia. Composizione asimmetrica Fase 1 preservata.
8. **`lib/mock-skills.ts`** — 2 mock: standard (con [BOZZA] prefix, stelle 1842) + anthropics edge case (stelle null + note_stelle). Esercita entrambi i path del validator e del rendering.
9. **`app/page.tsx`** — Hero + sezione "Anteprima scheda" con SkillCard mock + placeholder testuale "Parti da qui" + footer firma in fondo pagina. Colonna paper-deep di rilegatura ora si estende full-page (non solo hero).

### Verifiche

- `pnpm install` clean (esbuild build permesso per tsx, simple-git-hooks/sharp vietati)
- `pnpm validate:data` testato su 5 casi: vuoto, valido base, anthropics+null+note (pass), non-anthropics+null (fail), anthropics+null+missing note (fail), duplicate id (fail). Tutti i path corretti.
- `pnpm build` clean (`prebuild` chiama validate, skip pre-seed, next build OK, 3 static routes prerendered, ~1s con Turbopack)
- Pre-commit hook installato e operativo (`.git/hooks/pre-commit` verificato)
- Console browser: 0 errori, 0 warning
- **Lighthouse desktop**: Accessibility 100, Best Practices 100, SEO 100, Agentic Browsing 100. 45/45 audit, 0 fail.
- Screenshot persistiti: hero, fullpage closed, fullpage details expanded
- Reports Lighthouse in `.claude/lighthouse/2026-05-23-desktop-a11y.{html,json}`

### Dipendenze aggiunte

Runtime: `react-markdown ^9.0.0`
Dev: `ajv ^8.17.1`, `ajv-formats ^3.0.1`, `tsx ^4.19.2`, `simple-git-hooks ^2.11.1`

Tutte ≥1000★, mature, dichiarate prima dell'install come da convenzione globale.

### Note tecniche

- Ajv strict mode richiede che ogni `required` field abbia anche le `properties` definite nel medesimo subschema. Schema patchato: `then.properties.note_stelle` ridichiarata dentro `then` oltre alla definizione root.
- Markdown reso solo via react-markdown con allowlist tag. Niente `rehype-raw`. Niente bypass HTML inline. Difesa in profondità anche se input proviene da repo controllato.

## Stato attuale

Pipeline dati + scheda funzionante con mock. **Aspetto seed Andrea.**
Repo remoto ancora da creare.

## Blocchi aperti

- **Seed reale `data/skills.json`** — bloccante per chiudere Fase 2 (sostituzione mock → real catalog → sezione "Parti da qui" reale max-5 essenziali).

## Cost log API (per agent, dalla Fase 4)

_(da popolare a partire dalla prima esecuzione agent)_
