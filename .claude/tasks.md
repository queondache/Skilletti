# Skilletti — Tasks

> Roadmap operativa. Per Round 6+ la fonte di verità è `.planning/ROADMAP.md` + `.planning/REQUIREMENTS.md` (GSD). Qui il riassunto operativo.

## Stato — Round 6 ✅ chiuso (mergiato su main)

Sito didattico multi-step (6 route) live. Vedi `.planning/` per fasi A–F.

## Prossimo — Round 7 (Contenuto)

- [ ] 7.1 — Copy hero reale "cos'è Claude Code" (sostituisce placeholder ~60 parole in `app/page.tsx`) | ~30 min
- [ ] 7.2 — Bio Andrea reale nel footer (`components/SiteFooter.tsx`, oggi placeholder) | ~15 min
- [ ] 7.3 — 4 mini-esempi pratici per le skill essenziali (step-3-prime-skill) | ~90 min
- [ ] 7.4 — FAQ (nuova sezione/route o blocco) | ~60 min
- [ ] 7.5 — About completo (chi sono / perché Skilletti) | ~30 min
- [ ] 7.0 — Avviare milestone con `/gsd:new-milestone` (REQUIREMENTS Round 7 già abbozzati) | ~10 min

## Sync repo (prossima sessione)

- [ ] `git fetch && git checkout main && git pull` (main locale dietro origin dopo merge #9) | ~2 min
- [ ] (opz.) cleanup branch `round6-rifondazione` locale/remoto | ~2 min

## Backlog (lungo periodo)

- [ ] **Fase 4 — Agent mensile**: `scripts/agent/` + workflow cron (`0 9 1 * *`), GitHub API + awesome-list (no Reddit/Twitter), Claude API come ranker su shortlist. Gate umano su PR (agent mai merge autonomo), watchlist <1000★ nel body PR mai in skills.json. Cap token/run + log costo. | ~1 giornata
- [ ] **Round 8 — i18n** EN + ES (CC + copywriting skill) | dopo R7
- [ ] **Round 9 — Dominio** skilletti.com + DNS Vercel + favicon/OG | dopo R8
- [ ] (minore) Conflitto schema/SPEC `stelle:null` whitelist (anthropics|firecrawl vs SPEC §6) | ~15 min
- [ ] (minore) Valutare `pdfplumber` come future skill | ~30 min

## Done

- 2026-05-22 — Fase 1 (Brand editoriale museum-grade) ✅ Lighthouse 100×4
- 2026-05-23 — Fase 2 (types + schema + validator + SkillCard) ✅
- 2026-05-26 — Round 3 (UX revamp) + Round 4 (refinements) ✅
- 2026-05-27 — Round 5 (multi-contesto, PR #7) + Round 5.5 (Come iniziare, PR #8) ✅
- 2026-05-28 — **Round 6 (Rifondazione multi-step, PR #9)** ✅ — 6 route, direzione "Terminale editoriale", mappa parole, Lighthouse 100/100/100 ×6 ×2
