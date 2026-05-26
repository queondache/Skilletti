# Skilletti — Progress

> Snapshot di stato: fasi chiuse, fase corrente, blocchi aperti.

## Stato attuale — 2026-05-26

Sito **completo e live su Vercel** (`skilletti.vercel.app`) con seed reale (12 skill).
Round 1 + 2 + 2.5 + 3 (UX revamp) + **4 (refinements)** chiusi.
**Rimangono Fase 4 (agent mensile) e Fase 5 (deploy GitHub Pages — opzionale, ora live su Vercel).**

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

### Round 3 — UX revamp ✅ (branch `feat/round3-ux` → PR squash su main)
Sito ora **live su Vercel** (`skilletti.vercel.app`). Pre-round3: `next.config.ts`
basePath condizionale Vercel (`VERCEL=1` ⇒ vuoto) + `.gitignore .vercel` (PR #2 `8f39dec`).
5 cambiamenti:
- **C1** font duplice: Fraunces display + Geist body (`next/font/google`), `--font-mono`,
  measure-prose 62ch. Heading/`.lead` ancorati a `--font-display`.
- **C2** SkillCard "open pages" 2-col ≥1024px (sx voce 60% / dx info pratiche 40%,
  hairline "spina"), single-col sotto. Nuovo `CopyButton.tsx` (isola client).
- **C3** sommario tematico (`Summary.tsx`) dopo Hero: chip `Essenziali (4)`
  (distinto strutturalmente) + chip tema, count auto-derivati (Modello B);
  `TEMA_ORDER` esportato da Catalog (fonte unica).
- **C4** rimossi 5 marker `[BOZZA]` + descrizioni reali (voce Andrea, no hype,
  lunghezza allineata alle esistenti). Tagline/a_che_serve invariati.
- **C5** sezione **Template** (`TemplateSection.tsx` + `content/templates/`
  claude-base.md/spec-base.md) tra Metodo e Vocabolario; nav 5ª ancora.
QA: responsive 1440/1024/768/390 ok, nav sticky 5 sezioni + active-state ok,
zero overflow orizzontale, build verde. Lighthouse prod 100/100/100/100
(desktop + mobile), dopo fix contrasto count sommario (PR #4).

### Round 4 — Refinements ✅ (PR squash su main)
- **Tagline**: "Trenta skill di Claude" → "Le migliori skill di Claude" (Hero,
  title/metadata, OG image alt + render). "Massimo trenta" tenuto (tetto-cap, non tagline).
- **Essenziali in griglia 2×2** da ≥1280px (xl); colonna singola sotto (le card
  open-pages restano a piena larghezza tra 1024-1279). Anchor `#parti-da-qui` invariato.
- **Docs**: CLAUDE.md + SPEC.md sincronizzati allo stato live (Vercel, font duplice,
  open-pages, sommario, Template, agent mensile, fonti GitHub, no merge commits).
- **Template** `content/templates/claude-base.md` rinfrescato dai pattern universali
  del master `~/Dev/CLAUDE.md` (esempio didattico non-dev, no roba interna).

---

## Fasi rimanenti

### Fase 4 — Agent mensile ❌ DA FARE
`scripts/agent/` vuoto (solo `.gitkeep`), nessun workflow agent.
Da costruire (SPEC §9, aggiornata):
- `search.ts` / `filter.ts` / `open-pr.ts` — GitHub API (pre-filtro su awesome-list
  curate) + Claude API che **valuta e ordina la shortlist** (no web search generica).
- Flusso: legge `skills.json` → health-check skill esistenti → cerca novità SOLO da
  fonti GitHub → filtri binari (≥1000★, vivo, installabile, sicurezza non opaca)
  → max 3 candidati pre-compilati → apre PR taggata `[agent]`.
- `.github/workflows/monthly-agent.yml` — cron `0 9 1 * *` (1° del mese).
- Sicurezza: `ANTHROPIC_API_KEY` in Actions Secrets, `GITHUB_TOKEN` permessi
  minimi (`pull-requests:write`, `contents:write`), mai push diretto su main.
- Manca ancora il prompt Fase 4 completo (finora solo placeholder × 2).

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

- [x] ~~**SPEC.md update**~~ — fatto in Round 4 (Task 3a): §3/§7/§9/§10/§13/§14
      allineati a stato live (Vercel, font duplice, open-pages, agent mensile, fonti GitHub).
- [ ] **Fase 4 — agent mensile**: costruire `scripts/agent/` + workflow cron. Manca
      ancora il prompt Fase 4 completo (due volte arrivato solo come placeholder).
      Conferme già date: regola d'oro = gate umano sulla review PR (agent non verifica);
      watchlist <1000★ nel body PR (mai in skills.json); agent mai merge autonomo.
- [ ] **Fase 5 — deploy**: decidere se Vercel è definitivo o tenere anche GitHub Pages.
      Se Vercel: branch protection su `main` + `gh secret scanning`. Nota: deploy
      intermedi di verifica = preview (auth-walled), solo il finale va in prod.
- [ ] **Conflitto schema vs SPEC** (minore): `stelle:null` whitelist è
      `anthropics|firecrawl` in `skills.schema.json`, ma SPEC §6 cita anche
      Vercel/Google/Supabase. Decidere se allargare il pattern.
