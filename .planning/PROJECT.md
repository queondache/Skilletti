# Skilletti

## What This Is

Sito curato di skill di Claude per amici, voce personale, max 30 schede. Nato come catalogo
editoriale museale single-page (v1, live su skilletti.vercel.app). Round 6 lo rifonda in un
**sito didattico multi-step** che guida l'utente da "non so cosa sia Claude Code" a "ho
installato le prime skill", attraverso 5 step navigabili come route distinte.

## Core Value

Un amico non tecnico arriva, capisce cos'è Claude Code e arriva a installare le prime skill
senza sentirsi perso. Chiarezza didattica > completezza.

## Requirements

### Validated

<!-- Shipped e confermati (v1.0, round 1-5.5, live su skilletti.vercel.app) -->

- ✓ 12 schede skill (4 essenziali + 8 catalogo) — v1.0
- ✓ Filtro contesto multi-dimensione (`dove_funziona` array CLI/VSCode/Mobile) — Round 5
- ✓ Sezione "Come iniziare" (setup CLI/VS Code/Mobile, comandi verificati) — Round 5.5
- ✓ Sommario tematico con chip cliccabili — v1.0
- ✓ Sezioni Metodo, Template, Vocabolario — v1.0
- ✓ Nav sticky scroll-aware, Lighthouse desktop 100/100/100/100 — v1.0
- ✓ Architettura multi-route (6 route App Router, static export) — Round 6 (v2.0)
- ✓ Progressive disclosure: Capisci → Installa → Esplora → Costruisci — Round 6 (v2.0)

## Current Milestone: v3.0 Round 7 Redesign

**Goal:** Riscrivere il design da zero — da catalogo editoriale museale a prodotto di onboarding a Claude Code: UX-first, navigabile, sperimentale ma usabile. Si tengono routing 6 route, `skills.json` + schema (INTOCCATI) e i contenuti migrati; si butta il contenitore visivo di Round 6.

**Contratto di design (locked):** `.planning/round7-design-spec.md` — la spec vince su ogni proposta `nothing-design` in conflitto.

### Active

<!-- Round 7 — Redesign (milestone v3.0). Vedi REQUIREMENTS.md per REQ-ID. -->

- [ ] Design system due colori (crema `#EDE0C8` + rosso `#8A2A18`, toni = solo opacità rosso) + tipografia Bricolage Grotesque + Hanken Grotesk + set 6 icone outline + componenti base
- [ ] Navigazione vetrina: menu sticky + back vero + struttura a pagine; eliminato il muro verticale di Round 6
- [ ] Hero coreografato: pin-scroll (claim che si scrive + cactus che cresce) + percorso sticky storytelling
- [ ] Viste ridisegnate: home, Capisci, Installa (suggerimenti), Esplora (griglia + chip, NO mappa parole), Costruisci, dettaglio skill
- [ ] Animazioni icone al reveal + `prefers-reduced-motion` off-tutto
- [ ] QA: tsc/build/validate verdi, Lighthouse desktop ≥95 / mobile ≥90, contrasto AA, 12 screenshot, PR verso main

### Out of Scope

<!-- Confini espliciti con motivo, per prevenire scope-creep -->

- **i18n EN/ES** — rinviato a Round 8 (questo round è IT only)
- **Dominio skilletti.com + branding** (favicon, OG image) — Round 9; Round 6 builda per `*.vercel.app` preview
- **Copy reale hero + bio footer** — placeholder in Round 6, Andrea riscrive in Round 7
- **Mini-esempi pratici 4 essenziali, FAQ, about completo** — Round 7
- **Agent mensile (cron, GitHub API, Claude ranker)** — pianificato Round 4, eseguito dopo v2
- **Modifiche a skills.json / schema** — congelati in Round 6
- **Redirect dalle vecchie ancore v1** — non servono, v1 resta live su main
- **Nuove dipendenze npm** — nessuna senza approvazione esplicita

## Context

- v1 live e solida su skilletti.vercel.app (Next.js 16, TS strict, Tailwind 4 CSS-first,
  Fraunces+Geist, static export, Vercel). Repo: github.com/queondache/Skilletti.
- Round 6 nasce dalla formazione di Andrea al team zeroCO2 con v1: serve un percorso guidato,
  non solo un catalogo.
- Reference visivi: politico.eu (sponsored "Hidden depths neurological disease"), sidewave.it
  (SOLO la mappa parole), storylab.defineamerican.com/session/digital, faunarobotics.com.
  Da NON usare: synapserstudio, larevoltosa, animazioni generiche sidewave.
- Modello operativo: blueprint di tutte le 6 fasi approvati in chat PRIMA dell'esecuzione, poi
  esecuzione autonoma 1 commit/fase, PR finale senza merge autonomo.

## Constraints

- **Tech stack**: Next.js App Router + static export mantenuto; TS strict; Tailwind 4 CSS-first;
  no CSS-in-JS — coerenza con v1.
- **Tipografia**: Fraunces resta (titoli/body); +1 sans display bold per CTA (Inter Tight default).
- **Animazioni**: minimali, no parallax / no Lottie / no video — tono politico.eu.
- **Git**: `main` protetto, no push diretto, no merge autonomo; tutto su branch `round6-rifondazione`;
  commit per fasi B–F (Fase A no commit codice).
- **Dati**: `data/skills.json` + schema NON si toccano.
- **Sicurezza**: nessun segreto nel repo; nessuna nuova dipendenza senza chiedere.
- **Performance**: Lighthouse desktop ≥95 (a11y/best-practices/SEO) su 6 route; mobile ≥90.

## Key Decisions

| Decisione | Rationale | Outcome |
|-----------|-----------|---------|
| Architettura true multi-route (6 route) vs scroll narrativo | Step deep-linkabili, SEO per step, feel "wizard" guidato | — Pending |
| Branch off `origin/main` (6ca4bdb, include round5.5) non local main | Local main era stale; v1 completa include Come iniziare + mobile toggle | ✓ Good |
| Hero viz = mappa-testo CSS | Coerente con politico.eu (no effetti) + continuità narrativa con mappa parole Fase D | — Pending |
| Fallback estetico carta+terracotta v1 se le 3 direzioni non convincono | Qualità raffinata > novità forzata | — Pending |
| GSD come paper trail, brief = contratto (no re-litigation) | Decisioni macro già locked da Andrea | ✓ Good |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition:**
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone:**
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-30 — Round 7 (milestone v3.0) milestone start*
