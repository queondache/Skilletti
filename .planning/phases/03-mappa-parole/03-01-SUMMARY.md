# SUMMARY — Fase D (03-mappa-parole)

**Esito:** ✅ Completata. Mappa parole = unico device tema in /step-4-esplora; combine AND col contesto.

## Cosa è stato fatto

- **components/WordMap.tsx** (client) — mappa parole interattiva: 6 temi-nodo (stesso linguaggio visivo di HeroMap: connettori hairline → centro terracotta) come **button** con conteggi. Single-select + reset "Tutti ↺". Filtra via `data-tema-hidden` su `.tema-group` (no re-render), URL `?tema=`, init da URL al mount. aria-pressed + focusable.
- **app/globals.css** — `.tema-group[data-tema-hidden] { display: none }` (hard filter) → compone in AND col contesto (`data-ctx-hidden`/`data-ctx-empty`). Vecchia regola `data-hidden` (fade) lasciata come no-op compat.
- **components/Catalog.tsx** — rimosso `<CatalogControls>` (la mappa è il device tema). Gruppi `data-tema` invariati.
- **app/step-4-esplora/page.tsx** — rimosso `<Summary>` (conteneva anche ancore morte #parti-da-qui/#come-iniziare del vecchio single-page). Montati `<WordMap temi>` + `<ContextFilter counts>` (estratto, conteggi calcolati nella route) + `<Catalog>`.
- **components/HeroMap.tsx** — label allineate ai temi reali (Design, Coding, Marketing, Sicurezza, Workflow, Web) → anteprima ≡ mappa.

## Deviazioni dal piano

- **CatalogControls + Summary ritirati dall'uso** (file restano su disco, non importati). Erano due device-tema concorrenti; "unico device tema" = WordMap.
- **ContextFilter estratto da Summary**: ora montato direttamente in step-4 (i suoi conteggi sono calcolati nella route).
- **Hard filter** (`data-tema-hidden` display:none) invece del fade v1: necessario per la semantica AND col contesto (blueprint D).

## Verifiche

- `npm run build` ✓ (6 route) · tsc ✓ · validate:data ✓
- Test funzionale in Chrome: click "Coding" → solo gruppo coding (`display:block`), altri `display:none`; URL `?tema=coding`. Aggiunto VS Code → URL `?tema=coding&ctx=vscode`, coding mostra 1/2 card. **Combine AND confermato.**
- Nodi = button aria-pressed, keyboard-focusable.

## Self-Check: PASSED
- Mappa unico device tema ✓ · data-attribute no re-render ✓ · AND col contesto ✓ · single-select + reset ✓ · Summary rimosso ✓ · a11y nodi ✓
