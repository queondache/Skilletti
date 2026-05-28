# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-05-27)

**Core value:** Un amico non tecnico capisce cos'è Claude Code e installa le prime skill senza sentirsi perso.
**Current focus:** Fase A — Discovery estetica (blueprint)

## Current Position

Phase: C ✅ done → D of 5 (esecuzione)
Plan: Fasi B+C chiuse. Prossima: Fase D (mappa parole filtrante in /step-4-esplora)
Status: IN ESECUZIONE — bridge GSD (gsd-execute-phase --interactive). B+C committate, build verde 6 route.
Last activity: 2026-05-28 — Fase C completata: direzione "Terminale editoriale" applicata (font, palette, hero mappa-testo, terminale su installa). Vedi 02-01-SUMMARY.md

Progress: [░░░░░░░░░░] 0%

## Accumulated Context

### Decisions

Full log in PROJECT.md Key Decisions. Recenti:
- Architettura: true multi-route (6 route App Router static export)
- Branch off origin/main (6ca4bdb) — local main era stale, mancava round5.5
- Hero viz = mappa-testo CSS (continuità con mappa parole Fase D)
- Brief LOCKED = contratto, GSD = paper trail, no re-litigation
- [Fase A] Direzione estetica = Dir 1 "Terminale editoriale" raffinata Apple-clean; accento #C2563A smorzato; token in DIRECTION-LOCKED.md

### Operating Model

- Tutti i blueprint delle 6 fasi approvati in chat PRIMA di eseguire
- "esegui tutto in fila" → esecuzione autonoma, 1 commit per fase B–F (Fase A no commit codice)
- PR finale via gh CLI, NO merge autonomo (review umana = muro di sicurezza)
- Mai push su main; static export; skills.json/schema intoccati; no nuove dipendenze senza chiedere

### Pending Todos

Da v1 (deferred, fuori Round 6): agent mensile (Fase 4), pdfplumber come future skill,
conflitto schema `stelle: null`, skill zeroCO2 per Claude.ai.

### Blockers/Concerns

None yet.

## Deferred Items

| Category | Item | Status | Deferred At |
|----------|------|--------|-------------|
| Contenuto | Copy reale hero + bio, mini-esempi, FAQ | Round 7 | 2026-05-27 |
| i18n | EN + ES | Round 8 | 2026-05-27 |
| Branding | skilletti.com + favicon/OG | Round 9 | 2026-05-27 |
| Backend | Agent mensile | Post-v2 | 2026-05-27 |

## Session Continuity

Last session: 2026-05-27
Stopped at: .planning/ scaffolding creato; pronto per blueprint Fase A
Resume file: None
