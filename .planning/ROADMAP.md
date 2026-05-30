# Roadmap: Skilletti

**Stato**: Round 7 completato — PR #10 in review (non mergiata)

## Milestones

- ✅ **v1.0 Catalogo museale** — Round 1–5.5 (shipped 2026-05-27, live su skilletti.vercel.app)
- ✅ **v2.0 Rifondazione multi-step** — Fasi A–F (Round 6, PR #9 in review)
- ✅ **v3.0 Redesign** — Round 7, Fasi A–F (PR #10 in review, non mergiata)
- 📋 **v2.2 i18n** — Round 8 · **v2.3 Dominio/branding** — Round 9

## Overview

Round 6 trasforma Skilletti da catalogo editoriale single-page a sito didattico multi-step:
6 route App Router (static export) che guidano dall'introduzione all'installazione delle prime
skill. v1 resta intatta su `main`; tutto il lavoro su branch `round6-rifondazione` → preview
Vercel → PR finale senza merge autonomo. Contenuti migrati (non riscritti), tranne hero/bio
placeholder e la nuova mappa parole. Modello: tutti i blueprint approvati in chat, poi
esecuzione in fila (1 commit per fase B–F; Fase A no commit codice).

## Phases

<details>
<summary>✅ v1.0 Catalogo museale (Round 1–5.5) — SHIPPED 2026-05-27</summary>

Catalogo di 12 skill, filtro contesto multi-dimensione, sezione "Come iniziare",
Metodo/Template/Vocabolario, nav sticky. Lighthouse desktop 100/100/100/100.
Live su skilletti.vercel.app (origin/main @ 6ca4bdb).

</details>

### 🚧 v2.0 Rifondazione multi-step (Round 6 — in progress)

**Milestone Goal:** Da single-page museale a sito didattico a 6 route che porta un amico non
tecnico da "cos'è Claude Code" a "ho installato le prime skill".

**Stop / review gates:** (1) piano fasi approvato ✓ · (2) blueprint di tutte le 6 fasi
approvati in chat · (3) PR finale (review umana, NO merge autonomo).

---

#### Fase A: Discovery estetica
**Goal**: Bloccare 1 direzione estetica (palette + font display + grid + tono motion) prima di costruire qualsiasi componente.
**Depends on**: Nothing (prima fase)
**Requirements**: DESIGN-01, DESIGN-02
**Risolta in blueprint-time** — nessun commit di codice. Output: 3 mockup HTML in `.claude/round6-mockups/` + note brainstorming.
**Success Criteria** (cosa deve essere VERO):
  1. ui-ux-pro-max ha prodotto 3 direzioni come mockup HTML statici in `.claude/round6-mockups/`
  2. Andrea ha approvato 1 direzione (o il fallback carta+terracotta v1)
  3. Sans display per CTA confermato (Inter Tight default); token palette/font/grid documentati in note
  4. Zero codice committato in questa fase
**Plans**: 1 plan (discovery)

Plans:
- [ ] A-01: ui-ux-pro-max genera 3 direzioni → scelta + note token

#### Fase B: Migrazione routing
**Goal**: Da single-page v1 a 6 route App Router, static export verde, contenuti migrati.
**Depends on**: Fase A (direzione estetica scelta)
**Requirements**: STRUCT-01, STRUCT-02, STRUCT-03, STRUCT-04, STRUCT-05, STRUCT-06
**Success Criteria** (cosa deve essere VERO):
  1. Le 6 route buildano ed esportano staticamente; `tsc` e `validate:data` verdi
  2. La landing `/` ha hero placeholder + CTA "Inizia" → /step-1-capisci
  3. Contenuti v1 visibili nelle route corrette senza riscrittura
  4. Step-navigator prev/next + "X di 5" funziona; footer con bio placeholder + LinkedIn + link claude.ai
  5. Ogni route ha metadata SEO (title/description/canonical/OG)
**Plans**: 1 plan → 1 commit

Plans:
- [ ] B-01: routing 6 route + migrazione contenuti + step-navigator + footer + metadata

#### Fase C: Componenti UX chiave
**Goal**: Applicare la direzione estetica (Fase A) ai componenti chiave + hero con visualizzazione.
**Depends on**: Fase B
**Requirements**: DESIGN-03, DESIGN-04
**Success Criteria** (cosa deve essere VERO):
  1. Hero con visualizzazione mappa-testo CSS (no parallax/Lottie/video), anteprima narrativa di /step-4-esplora
  2. SkillCard, nav, step-navigator rifiniti secondo la direzione scelta
  3. Tipografia Fraunces + sans display applicata; palette come CSS variables
  4. Responsive desktop+mobile; keyboard-accessibile; `tsc`/build verdi
**Plans**: 1 plan → 1 commit

Plans:
- [ ] C-01: hero viz mappa-testo + refresh componenti con direzione estetica

#### Fase D: Mappa parole tematiche
**Goal**: Word-map in /step-4-esplora che filtra il catalogo, coesistente con ContextFilter.
**Depends on**: Fase C
**Requirements**: MAP-01, MAP-02, MAP-03
**Success Criteria** (cosa deve essere VERO):
  1. Click su un tema filtra il catalogo via data-attribute, senza re-render React
  2. Mappa parole + ContextFilter si combinano (asse tema vs contesto) coerentemente
  3. Relazione mappa/Sommario tematico risolta (sostituito o affiancato, deciso in blueprint D)
  4. Mappa keyboard-accessibile; nessuna regressione di performance
**Plans**: 1 plan → 1 commit

Plans:
- [ ] D-01: componente mappa parole filtrante + integrazione ContextFilter/Summary

#### Fase E: Animazioni minimali
**Goal**: Motion minimale stile politico.eu, con reduced-motion pieno.
**Depends on**: Fase D
**Requirements**: MOTION-01, MOTION-02
**Success Criteria** (cosa deve essere VERO):
  1. Hover card + transizioni gentili tra step/route + reveal sottile, coerenti e discrete
  2. `prefers-reduced-motion` disattiva tutte le animazioni
  3. Nessun CLS / regressione perf; `tsc`/build verdi
**Plans**: 1 plan → 1 commit

Plans:
- [ ] E-01: animazioni minimali + reduced-motion

#### Fase F: QA + Lighthouse + PR
**Goal**: Verificare, produrre preview e aprire la PR (senza merge).
**Depends on**: Fase E
**Requirements**: QA-01, QA-02, QA-03, QA-04, QA-05, QA-06
**Success Criteria** (cosa deve essere VERO):
  1. `tsc` + build + `validate:data` verdi
  2. Lighthouse desktop ≥95 (a11y/best-practices/SEO) sulle 6 route; mobile ≥90 con doc se sotto
  3. Keyboard nav + focus visible + reduced-motion verificati su tutte le route
  4. 12 screenshot (6×desktop 1440 + 6×mobile 390) in `.claude/screenshots/round6-*`
  5. PR aperta via `gh` CLI verso `main` con riepilogo fasi + Lighthouse; preview URL; NESSUN merge autonomo
**Plans**: 1 plan → 1 commit

Plans:
- [ ] F-01: QA + Lighthouse 6 route + screenshot + apertura PR

### ✅ v3.0 Redesign (Round 7 — PR #10 in review)

Redesign da zero su branch `round7-redesign`: nuovo design system (due colori
`#EDE0C8`/`#8A2A18`, font Bricolage Grotesque + Hanken Grotesk, 6 icone outline),
navigazione vetrina, hero pin-scroll + percorso storytelling, viste ridisegnate
(Esplora con chip per TEMA, NO mappa; 12 pagine statiche `/skill/[id]/`), animazioni
icone al reveal + reduced-motion. Lighthouse desktop ≥96, mobile ≥96 su a11y/BP/SEO.
`skills.json`/schema intatti, nessuna nuova dipendenza. PR #10 — non mergiata.

#### Panoramica fasi (Round 7)

| Fase | Nome                          | Stato |
| ---- | ----------------------------- | ----- |
| 7    | Design system (Round 7)       | Done  |
| 8    | Navigazione vetrina           | Done  |
| 9    | Hero pin-scroll + percorso    | Done  |
| 10   | Viste ridisegnate             | Done  |
| 11   | Animazioni icone              | Done  |
| 12   | QA Round 7                    | Done  |

### 📋 v2.2 / v2.3 (Round 8–9, planned)

- **Round 8 (v2.2)**: i18n EN + ES
- **Round 9 (v2.3)**: dominio skilletti.com + branding (favicon, OG image)

## Progress

**Execution Order:** A → B → C → D → E → F (Fase A risolta in blueprint-time; B–F = 5 commit ordinati)

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| A. Discovery estetica | v2.0 | 1/1 | Complete | 2026-05-27 |
| B. Migrazione routing | v2.0 | 1/1 | Complete | 2026-05-28 |
| C. Componenti UX | v2.0 | 1/1 | Complete | 2026-05-28 |
| D. Mappa parole | v2.0 | 1/1 | Complete | 2026-05-28 |
| E. Animazioni minimali | v2.0 | 1/1 | Complete | 2026-05-28 |
| F. QA + Lighthouse + PR | v2.0 | 1/1 | Complete | 2026-05-28 |

---
*Roadmap created: 2026-05-27 — Round 6 milestone start*
