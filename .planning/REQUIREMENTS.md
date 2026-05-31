# Requirements: Skilletti — Round 6 (milestone v2.0 Rifondazione)

**Defined:** 2026-05-27
**Core Value:** Un amico non tecnico capisce cos'è Claude Code e arriva a installare le prime skill senza sentirsi perso.

> Tutti i requisiti derivano dal brief LOCKED di Andrea. Il brief è il contratto: non si rinegozia.

## v2.0 Requirements (Round 6)

Requisiti per la rifondazione multi-step. Ognuno mappato a esattamente una fase (A–F).

### Struttura e routing (STRUCT)

- [ ] **STRUCT-01**: Il sito è servito su 6 route App Router con static export (`/`, `/step-1-capisci`, `/step-2-installa`, `/step-3-prime-skill`, `/step-4-esplora`, `/step-5-costruisci`)
- [ ] **STRUCT-02**: La landing `/` mostra hero placeholder (~50–80 parole su Claude Code) + CTA "Inizia" → `/step-1-capisci`
- [ ] **STRUCT-03**: I contenuti v1 sono migrati nelle route corrette senza riscrittura (Vocabolario→capisci, Come iniziare→installa, 4 essenziali→prime-skill, Catalogo+ContextFilter+Summary→esplora, Metodo+Template→costruisci)
- [ ] **STRUCT-04**: Ogni step route ha uno step-navigator prev/next + indicatore "X di 5" minimal (no breadcrumb, no pallini carosello)
- [ ] **STRUCT-05**: Il footer mostra bio Andrea placeholder + LinkedIn + "Se ti serve aiuto, chatta con Claude" → claude.ai (no link repo)
- [ ] **STRUCT-06**: Ogni route ha metadata SEO (title/description/canonical/OG) sufficiente per Lighthouse SEO ≥95

### Estetica e design (DESIGN)

- [ ] **DESIGN-01**: Direzione estetica scelta tra 3 proposte ui-ux-pro-max (o fallback carta+terracotta v1), formalizzata in note + token palette
- [ ] **DESIGN-02**: Tipografia confermata: Fraunces (titoli/body) + 1 sans display bold per CTA (Inter Tight default da confermare)
- [ ] **DESIGN-03**: Hero ricco con visualizzazione mappa-testo CSS (stile politico.eu, no parallax/Lottie/video), anteprima narrativa di /step-4-esplora
- [ ] **DESIGN-04**: SkillCard e componenti chiave (nav, step-navigator) rifiniti secondo la direzione estetica scelta, responsive desktop+mobile

### Mappa parole e navigazione catalogo (MAP)

- [ ] **MAP-01**: Mappa parole tematiche in /step-4-esplora che filtra il catalogo via data-attribute (stesso pattern di ContextFilter, no re-render)
- [ ] **MAP-02**: La mappa parole coesiste con ContextFilter (asse tema vs asse contesto), combinazione coerente
- [ ] **MAP-03**: Relazione tra mappa parole e Sommario tematico esistente risolta (sostituire o affiancare — decisa in blueprint Fase D)

### Animazioni (MOTION)

- [ ] **MOTION-01**: Animazioni minimali (hover card, transizioni gentili tra step/route, reveal sottile) stile politico.eu
- [ ] **MOTION-02**: `prefers-reduced-motion` pienamente rispettato (disattiva tutte le animazioni)

### Qualità e delivery (QA)

- [ ] **QA-01**: `tsc` + build + `validate:data` tutti verdi
- [ ] **QA-02**: Lighthouse desktop ≥95 (a11y + best-practices + SEO) su tutte e 6 le route
- [ ] **QA-03**: Lighthouse mobile target 95, accettato ≥90 con doc per ogni route sotto soglia
- [ ] **QA-04**: Keyboard nav completa + focus visible su tutte le route; reduced-motion verificato
- [ ] **QA-05**: 12 screenshot (6 route × desktop 1440 + mobile 390) in `.claude/screenshots/round6-*`
- [ ] **QA-06**: PR aperta via `gh` CLI verso `main` con riepilogo fasi + Lighthouse sintetico; NESSUN merge autonomo

## Future Requirements (deferred)

### Round 7 — Contenuto

- **CONT-R7-01**: Copy reale hero "cos'è Claude Code" (sostituisce placeholder)
- **CONT-R7-02**: Bio Andrea reale nel footer
- **CONT-R7-03**: 4 mini-esempi pratici per le skill essenziali
- **CONT-R7-04**: FAQ + about completo

### Round 8 — i18n

- **I18N-R8-01**: Traduzioni EN + ES via CC + copywriting skill

### Round 9 — Dominio e branding

- **BRAND-R9-01**: Dominio skilletti.com + DNS Vercel
- **BRAND-R9-02**: Favicon, OG image, rifiniture branding

## Out of Scope

| Feature | Reason |
|---------|--------|
| Modifiche a skills.json / schema | Congelati in Round 6 — il catalogo resta invariato |
| Redirect dalle vecchie ancore v1 | v1 resta live su main, niente da redirigere |
| Agent mensile (cron/GitHub API/Claude ranker) | Pianificato Round 4, eseguito dopo v2 |
| Parallax / Lottie / video | Tono politico.eu = animazioni minimali; fuori brand |
| Chatbot Claude API / academy / tutorial video | Scope-creep esplicitamente ristretto a "guida step + catalogo" |
| Nuove dipendenze npm | Nessuna senza approvazione esplicita di Andrea |
| Merge autonomo della PR | `main` protetto; review umana è il muro di sicurezza |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| DESIGN-01 | Fase A | Decided (Dir 1 raffinata) |
| DESIGN-02 | Fase A | Decided (Fraunces + Inter Tight + JetBrains Mono) |
| STRUCT-01 | Fase B | Done |
| STRUCT-02 | Fase B | Done |
| STRUCT-03 | Fase B | Done |
| STRUCT-04 | Fase B | Done |
| STRUCT-05 | Fase B | Done |
| STRUCT-06 | Fase B | Done |
| DESIGN-03 | Fase C | Done |
| DESIGN-04 | Fase C | Done |
| MAP-01 | Fase D | Done |
| MAP-02 | Fase D | Done |
| MAP-03 | Fase D | Done |
| MOTION-01 | Fase E | Done |
| MOTION-02 | Fase E | Done |
| QA-01 | Fase F | Done |
| QA-02 | Fase F | Done |
| QA-03 | Fase F | Done |
| QA-04 | Fase F | Done |
| QA-05 | Fase F | Done |
| QA-06 | Fase F | Done |

**Coverage:**
- v2.0 requirements: 21 total
- Mapped to phases: 21
- Unmapped: 0 ✓

---
*Requirements defined: 2026-05-27*
*Last updated: 2026-05-30 — Round 7 Redesign v3.0 completato (PR #10 in review); traceability marcata Done*
