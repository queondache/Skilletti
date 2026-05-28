# SUMMARY — Fase E (04-animazioni)

**Esito:** ✅ Completata. Motion minimale stile politico.eu, reduced-motion off-tutto.

## Cosa è stato fatto

- **components/Reveal.tsx** — fix multi-route: ora dipende da `usePathname()` e ri-scansiona i `[data-reveal]` a ogni cambio rotta. Bug risolto: con layout persistente (client nav via `<Link>`) i nuovi elementi non venivano osservati e restavano a opacity:0. Filtra quelli già `data-revealed` per non ri-osservarli.
- **app/globals.css**:
  - Hover scheda: oltre alla hairline che vira terracotta, `translateY(-2px)` + ombra morbida (`0 16px 38px -24px`). Reduced-motion-gated.
  - **page-enter**: `@keyframes` fade + translateY(12px)→0, 220ms ease-out, su `main`. Ogni route (anche client nav) rimonta `<main>` → senso di "transizione tra step". Reduced-motion-gated.

## Conformità blueprint E

- Reveal-on-scroll sottile (IntersectionObserver, una volta) ✓ — già esistente, ora multi-route-safe.
- Hover card translateY(-2px) + ombra soft ✓.
- Transizione gentile tra step = page-enter su `main` ✓.
- Hero mappa-testo: solo fade (parte del page-enter), niente line-draw ✓.
- `prefers-reduced-motion`: tutto gated + Reveal early-return → contenuto subito visibile ✓.
- Niente parallax/Lottie/video/canvas ✓. Zero nuove dipendenze.

## Verifiche

- `npm run build` ✓ (6 route) · tsc ✓ · validate ✓
- Test client-nav in Chrome: landing → click "Inizia" → /step-1-capisci; `revealHiddenBelowFold: 0` (nessun elemento bloccato invisibile), `mainOpacity: 1` (page-enter completata). Bug reveal multi-route confermato risolto.

## Self-Check: PASSED
- page-enter + hover lift + reveal-on-scroll ✓ · reduced-motion off-tutto ✓ · client-nav reveal fixed ✓ · no parallax/Lottie/video ✓ · zero dip ✓
