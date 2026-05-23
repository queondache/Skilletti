# Skilletti — Tasks

> Roadmap operativa per fase. Aggiornato a fine sessione.

## Fase corrente — Fase 2 (Dati + SkillCard) — parziale, in attesa di seed

- [x] 2.0 — Dichiarazione dipendenze (react-markdown, ajv, ajv-formats, tsx, simple-git-hooks)
- [x] 2.1 — types/skill.ts (16 campi + enum chiusi + DRAFT_PREFIX + TRUSTED_ORGS)
- [x] 2.2 — data/skills.schema.json (Ajv, regola condizionale anthropics/null/note_stelle)
- [x] 2.3 — scripts/validate-data.ts + prebuild + pre-commit (simple-git-hooks)
- [x] 2.4 — lib/markdown.tsx (allowlist stretta + extractDraftMarker)
- [x] 2.5 — components/SkillCard.tsx (server component + badge sicurezza + bozza)
- [x] 2.6 — app/page.tsx con anteprima mock + placeholder "Parti da qui"
- [x] 2.7 — Build verde + Lighthouse 100×4 + screenshot
- [ ] **2.8 — Andrea consegna `data/skills.json`** (download in corso lato Andrea)
- [ ] 2.9 — Rimuovere `lib/mock-skills.ts` + collegare `data/skills.json` reale
- [ ] 2.10 — "Parti da qui": filtrare `importanza === 'essenziale'` + slice top 5 + render reale
- [ ] 2.11 — Re-build + re-screenshot + re-Lighthouse a11y ≥95

## Prossimo — Fase 3 (Catalogo + Pedagogia)

In attesa di chiusura Fase 2.

Step previsti:
1. `components/CatalogFilters.tsx` — client component filtri tema + importanza combinabili
2. `components/Catalog.tsx` — server component, render tutte le skill, filter via CSS `[data-tema][data-importanza]` per graceful degradation senza JS
3. Deep-link `?tema=coding&importanza=essenziale` ripristina stato
4. `components/Nav.tsx` — anchor links Intro / Parti da qui / Catalogo / Cosa sono / Footer
5. `components/Pedagogia.tsx` + `content/pedagogia.mdx` — sezione didattica. Definizioni verificate contro `docs.claude.com` via context7

## Backlog

- Fase 4 — Agent settimanale (locale → cron). TRUSTED_ORGS già in types/skill.ts. Cap 50k token/run. Log costo in progress.md per 4 settimane.
- Fase 5 — Deploy Pages (CI con `PAGES_BASE_PATH=/skilletti`) + sitemap + robots + meta OG + Lighthouse perf reale contro URL live

## Andrea — open items

- [ ] `gh repo create queondache/Skilletti --public --source=. --remote=origin --push`
- [ ] Download `data/skills.json` seed

## Done

- 2026-05-22 — Fase 1 v2 (Brand editoriale museum-grade) ✅ Lighthouse 100×4
- 2026-05-23 — Fase 2 parziale (types + schema + validator + SkillCard mock) ✅ Lighthouse 100×4
