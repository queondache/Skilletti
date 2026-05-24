# Skilletti — Progress

> Snapshot di stato: fasi chiuse, fase corrente, blocchi aperti.

## Stato attuale — 2026-05-24

Sito **completo e funzionante** con seed reale (12 skill). Round 1 + 2 + 2.5 chiusi.
Repo remoto `queondache/Skilletti` allineato a `38b1af9`.
**Rimangono Fase 4 (agent settimanale) e Fase 5 (deploy GitHub Pages).**

`data/skills.json`: 12 skill — 4 essenziale · 6 forte · 2 situazionale.

---

## Fasi chiuse

### Fase 1 — Foundation ✅ → `3b13af5`
Next.js export statico + TS strict + Tailwind. Layout, fonts (Fraunces),
palette carta-da-museo, SEO/OG (sitemap, robots, opengraph-image, favicon,
apple-touch-icon). Workflow deploy GitHub Pages bozza.

### Fase 2 — Data pipeline + SkillCard ✅ → `27164a4`
- `types/skill.ts` — type 16 campi + opzionali (`note`, `note_stelle`, poi
  `a_che_serve`, `autore`). Enum chiusi. `TRUSTED_ORGS` whitelist.
- `data/skills.schema.json` — JSON Schema 2020-12, `additionalProperties:false`,
  `maxItems:30`, regola condizionale `stelle:null ⇒ note_stelle + repo anthropics`.
- `scripts/validate-data.ts` — Ajv2020 strict + vincoli extra (cap 30, id/url dup).
- Hook `prebuild` + pre-commit (`simple-git-hooks`) eseguono `validate:data`.
- `lib/markdown.tsx` — react-markdown allowlist stretta, niente rehype-raw.
- `components/SkillCard.tsx` — server component, profilo sicurezza sopra la piega.
- Chiusura: wire `skills.json` reale, drop mock (`lib/mock-skills.ts` rimosso).

### Fase 3 — Sito completo ✅ → `38b1af9`
Span round 1 (`3dbba1b`) → round 2 (`0d95804`) → round 2.5 QA (`38b1af9`).
- Catalogo reale con gruppi per tema, indice, filtri (`Catalog.tsx`).
- SkillCard single-source: essenziali in variante compatta, stessa sorgente.
- Card rende `a_che_serve` + riga riconoscimenti (autore).
- Schema esteso: `a_che_serve` + `autore` required, tema Marketing (`de47dd3`).
- Dati: +4 skill (ui-ux-pro-max, chrome-devtools-mcp, firecrawl-mcp, code-review)
  + bundle marketing 13 sub-skill.
- Sezione workflow + sezione didattica (`pedagogia.mdx`).
- Nav sticky scroll-aware con active state.
- Round 2.5 QA: gerarchia titoli, line-height unificato 1.6, layout mobile
  (nav 1 riga, padding py-16, tag-row left-align). 14 osservazioni audit risolte.
- **Lighthouse desktop**: A11y 100 · Best Practices 100 · SEO 100 · Agentic 100.

---

## Fasi rimanenti

### Fase 4 — Agent settimanale ❌ DA FARE
`scripts/agent/` vuoto (solo `.gitkeep`), nessun `weekly-agent.yml`.
Da costruire (SPEC §9):
- `search.ts` / `filter.ts` / `open-pr.ts` — Claude API + web search tool.
- Flusso: legge `skills.json` → health-check skill esistenti → cerca novità su
  fonti fisse → filtri binari (≥1000★, vivo, installabile, sicurezza non opaca)
  → max 3 candidati pre-compilati → apre PR taggata `[agent]`.
- `.github/workflows/weekly-agent.yml` — cron lunedì mattina.
- Sicurezza: `ANTHROPIC_API_KEY` in Actions Secrets, `GITHUB_TOKEN` permessi
  minimi (`pull-requests:write`, `contents:write`), mai push diretto su main.

### Fase 5 — Deploy 🟡 PARZIALE
`.github/workflows/deploy.yml` esiste (1.5KB) ma **non verificato live**.
Da fare:
- Verificare se GitHub Pages è attivo e il sito è raggiungibile.
- Confermare che il deploy scatti al merge su main e che `prebuild`/validate
  giri in CI.
- Branch protection su `main` (no push diretto, vale anche per l'agent).
- Attivare `gh secret scanning`.

---

## Blocchi aperti

Nessuno. Sito completo, seed presente, remote allineato.

## Cost log API (per agent, dalla Fase 4)

_(da popolare a partire dalla prima esecuzione agent)_

---

## Prossimo step

- [ ] Verificare stato GitHub Pages (Fase 5) prima di trattarla come "da fare" —
      `deploy.yml` già presente, controllare se il sito è live.
- [ ] Decidere ordine Fase 4 (agent) vs completamento Fase 5 (deploy live) col prossimo task di Andrea.
