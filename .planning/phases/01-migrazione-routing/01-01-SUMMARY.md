# SUMMARY — Fase B (01-migrazione-routing)

**Esito:** ✅ Completata. Da single-page a 6 route App Router (static export), contenuti v1 migrati.

## Cosa è stato fatto

- **lib/steps.ts** — config dei 5 step (STEPS, TOTAL_STEPS, stepByN), single source per StepNav + mappa landing.
- **components/StepNav.tsx** — prev/next + "Step X di 5 — Nome"; closing card sullo step 5 (torna all'inizio + chatta con Claude).
- **components/SiteHeader.tsx** — header persistente solo-wordmark → home (sticky leggero, focus visible).
- **components/SiteFooter.tsx** — footer globale: bio placeholder + LinkedIn (#) + "chatta con Claude" → claude.ai. No link repo.
- **app/layout.tsx** — NavSticky → SiteHeader; Reveal mantenuto; SiteFooter dopo children.
- **app/page.tsx** — riscritta come landing: hero placeholder (~60 parole) + CTA "Inizia" + "Cos'è una skill?" + mappa 5 step cliccabile. Vecchie sezioni monolite rimosse.
- **5 route step** — app/step-{1..5}-*/page.tsx: contenuti migrati (pedagogia.mdx→1, ComeIniziare→2, essenziali→3, Summary+Catalog→4, workflow.mdx+TemplateSection→5), ognuna con StepNav + metadata (title/description/canonical/OG).

## Deviazioni dal piano

- **[minor] app/sitemap.ts** aggiornato: vecchie ancore (#parti-da-qui…) → 6 route reali. Implicito in STRUCT-06, non listato esplicitamente in files_modified.
- **[minor] copy hero**: aggiunto `{' '}` esplicito tra `<em>skill</em>` e "sono" per blindare lo spazio (whitespace JSX) — vale anche per il copy reale R7.
- **NavSticky.tsx e Hero.tsx** restano su disco ma non più importati (ritirati dall'uso, non cancellati per minimizzare il rischio).

## Verifiche

- `npm run validate:data` ✓ (12 skill, skills.json invariato)
- `npx tsc --noEmit` ✓
- `npm run build` ✓ — out/ ha le 6 route (index + step-1..5)
- Render verificato in Chrome (out/ servito): landing OK; step-4 catalogo+Summary+ContextFilter+StepNav OK (card rendono allo scroll).

## Note per fasi successive

- **Fase F**: i 12 screenshot full-page mostreranno contenuti `data-reveal` a opacity:0 sotto la piega. Catturare con `prefers-reduced-motion` (se Reveal lo rispetta → contenuto subito visibile) o con scroll-and-reveal.
- **metadataBase** in layout.tsx = `queondache.github.io/skilletti` (v1 Pages). Per il preview Vercel i canonical sono relativi alle route; valutare in Fase F se allineare a vercel.app.
- Reskin estetico "Terminale editoriale" (palette/font/hero mappa-testo) = Fase C.

## Self-Check: PASSED
- 6 route esportate ✓ · tsc/build/validate verdi ✓ · chrome wizard (header/footer/StepNav) ✓ · skills.json intoccato ✓ · zero nuove dipendenze ✓
