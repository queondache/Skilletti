# Skilletti — Progress

> Snapshot di stato: fasi chiuse, fase corrente, blocchi aperti.

## Stato attuale — 2026-05-30

Sito **v1 live su Vercel** (`skilletti.vercel.app`), Round 1–5.5 chiusi (PR #7, #8 mergiate).
Round 6 — Rifondazione (PR #9, in review). 

**Round 7 — Redesign v3.0 COMPLETATO** sul branch `round7-redesign`,
**PR #10 aperta** (in review, NON mergiata — NO merge autonomo).
Redesign da zero in 6 fasi: nuovo design system (due colori `#EDE0C8`/`#8A2A18`,
font Bricolage Grotesque + Hanken Grotesk, 6 icone outline), navigazione vetrina
(menu sticky + back vero + struttura a pagine), hero pin-scroll (claim word-reveal
+ cactus) + percorso sticky storytelling, viste ridisegnate (home/Capisci/Installa/
Esplora con griglia+chip per TEMA, NO mappa/Costruisci/dettaglio skill — 12 pagine
statiche `/skill/[id]/`), animazioni icone al reveal (stroke-dashoffset) +
reduced-motion off-tutto, QA con **Lighthouse 100/100/100 (a11y/BP/SEO) su tutte le 6 route, sia desktop sia mobile**.
PR: https://github.com/queondache/Skilletti/pull/10
Preview: https://skilletti-git-round7-redesign-queondaches-projects.vercel.app

`data/skills.json` + schema **intatti**, nessuna nuova dipendenza npm.

### Round 7 — commit reali (branch `round7-redesign`)

> Nota: l'esecuzione multi-agente iniziale ha prodotto commit incoerenti (Fasi A/D non
> compilavano — API icone/Button/Card disallineate — e step-1/step-4 erano rimasti Round 6).
> Riconciliato a mano. Hash reali sotto (i precedenti report con hash tipo `8af3a16` erano fabbricati).

- **A** (`c5e4b40`) — Design system: due colori `#EDE0C8`/`#8A2A18`, font Bricolage + Hanken, 6 icone outline, componenti base Button/Card/Suggest.
- **D** (`886e5c0`) — Viste ridisegnate (home/Capisci/Installa/Esplora/Costruisci/dettaglio, 12 pagine statiche `/skill/[id]/`) + SkillGrid/ChipFilter/Hero/Percorso/StepFooterNav/BackLink (B+C inclusi).
- **fix A–D** (`f0bb9b8`) — riconciliazione: API icone/Button/Card, step-1 e step-4 ridisegnati (rimossa mappa parole + componenti Round 6 orfani), build verde.
- **E** (`64ff92e`) — Animazioni icone al reveal (stroke-dashoffset) + reduced-motion off-tutto.
- **F** (`3ec7538`) — QA: tsc/build/validate verdi; **Lighthouse 100/100/100 su 6 route desktop+mobile**; contrasto AA (`--color-soft` .85 = 4.95:1); 12 screenshot in `.claude/screenshots/round7/`.

### Flag aperto Round 7

Il filtro per contesto (CLI/VSCode/mobile) introdotto in Round 5 è stato **rimosso**:
la spec Round 7 chiede chip per **tema**. Il campo `dove_funziona` resta visibile su
card/dettaglio ma non è più filtrabile — in attesa di conferma Andrea.

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

### Round 5 — Multi-contesto + UX modern ✅ (PR #7 squash su main)
- **TASK A**: `dove_funziona` da string → array. Nuovo enum
  `[claude-code, claude-in-vscode, claude-mobile]`; rimosso `claude.ai`. 12 record
  migrati (MCP→CLI, skill/plugin→CLI+VS Code). `ContextFilter.tsx` "mostra solo"
  nel sommario, stato URL `?ctx=`, compone con `?tema=`. SkillCard micro-label.
- **TASK B**: indice verticale marginalia destra (≥1440px) + barra orizzontale
  sotto, pallino terracotta attivo; densità −20% padding; `Reveal.tsx`
  (IntersectionObserver, reduced-motion safe); hover hairline terracotta.

### Round 5.5 — Sezione "Come iniziare" 🟡 (branch `round5.5-come-iniziare`, PR aperta)
- **TASK 1** (verifica mobile): audit `skill-creator` + `taste-skill` per tag
  `claude-mobile`. Esito: **nessun cambio dati**. Doc ufficiali (`platform.claude.com`
  "Where Skills work") confermano solo claude.ai web, **non** l'app mobile;
  `taste-skill` non cita nemmeno claude.ai. Regola "se non esplicito, lascia" → 0 commit.
- **TASK 2** (`2016f7e`): `ComeIniziare.tsx` — 3 blocchi (CLI / VS Code / Mobile),
  comandi+URL verificati 1:1 contro docs, copy-button riusato. Tra Essenziali e
  Catalogo. Nav +1 ancora "inizia" (6 voci, regge 1440+390). Summary: link
  prerequisito separato dai chip tema.
- **TASK 3**: docs sync (CLAUDE.md struttura + SPEC.md MVP + questo progress.md).
- round 5.5: mobile toggle dynamic, hide if 0 skills (render solo se ≥1 skill ha `claude-mobile`).

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

- [ ] **Andrea: review/merge PR #10 (Round 7)** — aprire il preview Vercel
      (https://skilletti-git-round7-redesign-queondache.vercel.app), controllare i 12
      screenshot in `.claude/screenshots/round7/`, poi squash-merge su `main`. NO merge
      autonomo da parte di CC.
- [ ] **Decidere se reintrodurre il filtro per contesto** (CLI/VSCode/mobile, rimosso in
      Round 7) o tenere `dove_funziona` solo informativo su card/dettaglio — vedi flag aperto.
- [ ] **Fase 4 — agent mensile** resta in backlog: costruire `scripts/agent/` + workflow
      cron `0 9 1 * *`. Regola d'oro = gate umano sulla review PR; agent mai merge autonomo.
