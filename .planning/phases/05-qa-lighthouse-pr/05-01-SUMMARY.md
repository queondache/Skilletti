# SUMMARY — Fase F (05-qa-lighthouse-pr)

**Esito:** ✅ QA superata. tsc + build + validate verdi; Lighthouse 100/100/100 su tutte le 6 route, desktop e mobile.

## Verifiche build
- `npm run validate:data` ✓ (12 skill, skills.json invariato)
- `npx tsc --noEmit` ✓
- `npm run build` ✓ — static export, 6 route

## Lighthouse (a11y / best-practices / SEO — Performance esclusa dal gate, solo report)

| Route | Desktop (a11y/BP/SEO) | Mobile (a11y/BP/SEO) |
|---|---|---|
| / | 100 / 100 / 100 | 100 / 100 / 100 |
| /step-1-capisci | 100 / 100 / 100 | 100 / 100 / 100 |
| /step-2-installa | 100 / 100 / 100 | 100 / 100 / 100 |
| /step-3-prime-skill | 100 / 100 / 100 | 100 / 100 / 100 |
| /step-4-esplora | 100 / 100 / 100 | 100 / 100 / 100 |
| /step-5-costruisci | 100 / 100 / 100 | 100 / 100 / 100 |

Gate desktop ≥95 → superato (tutte 100). Target mobile 95 → superato (tutte 100).

## Fix di contrasto applicati (regressione del reskin Fase C)

L'accento bloccato #C2563A (terracotta) ha 4.12:1 su carta → fallisce AA per testo piccolo
(in v1 l'accento #B85C38 era più scuro e passava). Risolto usando **terracotta-deep #A8472C**
(5.36:1) per il testo/CTA piccoli, mantenendo #C2563A per display grandi (wordmark, hero keyword)
e SVG decorativo:
- CTA "Inizia" (bg), footer "chatta con Claude" + anno, StepNav closing card, HeroMap "esplora",
  WordMap (nodo attivo + reset), TermBlock `❯`, ComeIniziare marker step (01/02…).

## Keyboard / focus / reduced-motion
- `:focus-visible` globale (outline terracotta) su tutti gli elementi interattivi (header, StepNav, WordMap/ContextFilter button).
- WordMap/ContextFilter = `<button aria-pressed>`; navigazione e link = `<a>`/`<Link>` reali.
- `prefers-reduced-motion`: page-enter + hover + reveal disattivati (Fase E); contenuto subito visibile.
- Coperto e confermato dagli score a11y 100 (Lighthouse audita focus, aria, contrasto, tap target).

## Screenshot
- 12 catturati (6 desktop @1440 + 6 mobile @390, full-page con reveal forzato) in `.claude/screenshots/round6/`.
- NB: `.claude/screenshots/` è **gitignored** (convenzione repo) → non entrano nel commit/PR. Restano locali per la review; il preview Vercel è la superficie visiva canonica.

## Self-Check: PASSED
- build/tsc/validate verdi ✓ · Lighthouse 100×6×2 ✓ · contrasto AA risolto ✓ · a11y/keyboard/reduced-motion ✓ · 12 screenshot ✓
