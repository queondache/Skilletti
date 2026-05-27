# Round 6 — Blueprint per fase (approvati in chat)

Modello: tutti i blueprint approvati PRIMA dell'esecuzione. Poi "esegui tutto in fila",
1 commit per fase B–F. Token estetici globali: vedi `.claude/round6-mockups/DIRECTION-LOCKED.md`.

---

## Fase A — Discovery estetica ✅ BLOCCATA
Direzione 1 "Terminale editoriale" raffinata Apple-clean. Token in `DIRECTION-LOCKED.md`.

---

## Fase B — Migrazione routing ✅ BLOCCATA (2026-05-27)

**Routing:** `/` · `/step-1-capisci` · `/step-2-installa` · `/step-3-prime-skill` · `/step-4-esplora` · `/step-5-costruisci`. App Router, static export.

**Chrome — Wizard minimale (deciso):**
- Header persistente su tutte le route = solo wordmark `skilletti.` → home.
- Step-navigator in fondo a ogni step: `‹ Indietro` / `Avanti ›` + "Step X di 5 — Nome". No breadcrumb, no pallini.

**Landing `/`:** hero placeholder (~50–80 parole IT) + CTA "Inizia" → /step-1-capisci + **mappa dei 5 step** (overview percorso, cliccabile). Visual mappa → Fase C; struttura → qui.

**Migrazione contenuti (no riscrittura):**
- step-1-capisci ← Vocabolario (`content/pedagogia.mdx`)
- step-2-installa ← ComeIniziare
- step-3-prime-skill ← 4 essenziali
- step-4-esplora ← Catalogo + ContextFilter + Summary tematico
- step-5-costruisci ← Metodo (`content/workflow.mdx`) + Template

**Footer:** bio Andrea placeholder + LinkedIn + "Se ti serve aiuto, chatta con Claude" → claude.ai. No link repo.
**SEO:** metadata per route (title/description/canonical/OG).

**Assunzioni bloccate:**
1. Mappa 5-step in landing cliccabile (deep-link); "Inizia" = CTA enfatizzata.
2. Step 5 "Avanti" → closing card ("percorso finito — torna all'inizio / chatta con Claude").
3. `skills.json`/schema intoccati; nessuna nuova dipendenza; export statico preservato.

---

## Fase C — Componenti UX chiave ✅ BLOCCATA (2026-05-27)

**Hero (landing):** titolo Fraunces enorme + keyword `#C2563A` italic + CTA "Inizia" + link "Cos'è una skill?" + **mappa-testo connessa leggera** = 6 temi-parola (Metodo, Frontend, Sicurezza, Dati, Scrittura, Ricerca) su campo hairline con linee sottilissime. CSS/SVG only, politico-clean. Anteprima compatta della mappa di Fase D (stesso linguaggio visivo).

**Terminale:** blocco `❯ npm i…` spostato in **/step-2-installa** (casa dei comandi). Fuori dall'hero.

**SkillCard:** card pulita (bianca, bordo hairline, radius 10, label "Essenziale", tag tema + tag contesto, titolo Fraunces, riconoscimento ★, descrizione personale). **Ritirato** il layout v1 "open-pages 60/40".

**Nav & step-navigator:** header wordmark; barra step-navigator con "Avanti ›" in accento.
**Sistema:** Fraunces + Inter Tight + JetBrains Mono (solo comandi); palette CSS variables (`DIRECTION-LOCKED.md`). Responsive + keyboard.

**Assunzioni bloccate:**
1. Terminale su /step-2-installa, non hero.
2. SkillCard = nuova card pulita (open-pages ritirato).
3. Hero mappa-testo = CSS/SVG, niente canvas/JS pesante (motion = Fase E).

---

## Fase D — Mappa parole tematiche ✅ BLOCCATA (2026-05-27)

**Mappa parole** = unico device tema in /step-4-esplora (Summary tematico RIMOSSO). 6 temi-nodo cliccabili, stesso linguaggio visivo dell'hero mappa-testo (Fase C), versione piena interattiva.

**Filtro:** via data-attribute (toggle classi CSS, no re-render React, no re-mount lista). Pattern come ContextFilter.
**Coesistenza:** combine **AND** con ContextFilter (asse tema × contesto). Visibile se match tema E contesto.
**Selezione:** tema single-select (click → filtra; click di nuovo / "Tutti" → reset). Nessuna selezione = tutto.
**A11y/perf:** nodi focusabili (button/link), focus visible, `aria-pressed`; nessuna regressione perf.

**Assunzioni bloccate:**
1. Tema single-select + reset "Tutti".
2. Combine mappa × contesto = AND.
3. Hero (anteprima) e mappa piena (step-4) condividono linguaggio visivo.
4. Componente `Summary` rimosso da step-4.

---

## Fase E — Animazioni minimali ✅ BLOCCATA (2026-05-27)

**Ingresso pagina:** fade + translate-up 12px, ~220ms ease-out, al mount di ogni route.
**Hover card:** `translateY(-2px)` + ombra soft.
**Reveal-on-scroll:** sottile, una volta per sezione (IntersectionObserver vanilla, no dep).
**Hero mappa-testo:** solo fade gentile, niente line-draw animato.
**Timing:** micro 150–220ms ease-out in ingresso; nessuna animazione > 400ms.
**Escluso:** parallax, Lottie, video, canvas.
**reduced-motion:** disattiva TUTTO; contenuto subito visibile.

**Assunzioni bloccate:**
1. Reveal-on-scroll via IntersectionObserver (vanilla, no dep).
2. Mappa hero = solo fade, niente disegno-linee animato.
3. reduced-motion = tutto off.

---

## Fase F — QA + Lighthouse + PR ✅ BLOCCATA (2026-05-27)

**Verifiche:** `tsc` + build + `validate:data` verdi.
**Lighthouse (6 route):** gate **a11y / best-practices / SEO ≥ 95** desktop; **Performance solo report** (no gate); mobile ≥ 90 (target 95) con doc per route sotto soglia.
**Check manuali:** keyboard nav, focus visible, reduced-motion su tutte le route.
**Screenshot:** 12 (6×desktop 1440 + 6×mobile 390) → `.claude/screenshots/round6-*`.
**PR:** push `round6-rifondazione` → origin; PR via `gh` CLI verso `main`; description = riepilogo fasi B–F + Lighthouse sintetico + ref screenshot; **NO merge autonomo**.
**Tooling:** build → `npx serve out/` effimero → Lighthouse per route. Nessuna dip npm aggiunta.

**Assunzioni bloccate:**
1. Performance = report only.
2. Push branch feature su origin consentito (solo `main` protetto); PR sì, merge mai.
3. Commit `docs:` separato per scaffolding+screenshot ⇒ 5 commit B–F puliti. Mockup dir-2/dir-3 tenuti come reference.
4. Lighthouse runner via `npx` effimero.

---

## ▶ Stato: tutti i blueprint BLOCCATI — in attesa di "esegui tutto in fila"

Esecuzione (su comando di Andrea): commit `docs:` scaffolding → B → C → D → E → F (5 commit di fase) → PR senza merge.

