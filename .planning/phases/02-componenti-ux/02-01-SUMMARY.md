# SUMMARY — Fase C (02-componenti-ux)

**Esito:** ✅ Completata. Direzione "Terminale editoriale" raffinata Apple-clean applicata.

## Cosa è stato fatto

- **app/fonts.ts** — ritirati Geist/Geist Mono; aggiunti **Inter Tight** (--font-inter-tight, 500/600/700) e **JetBrains Mono** (--font-jetbrains). Fraunces mantenuto. Nessuna dipendenza npm (next/font).
- **app/layout.tsx** — className html aggiornato alle nuove variabili font.
- **app/globals.css** — token direzione: paper #F8F5EF, ink #1A1714, terracotta #C2563A, terracotta-deep #A8472C, rule #EAE4D8, muted #6E685D. --font-body → Fraunces (voce); --font-sans = Inter Tight; --font-mono = JetBrains; --radius 10px; tracking-micro 0.14em. Regola globale: micro-label `uppercase.tabular-figures` → font-sans (Inter Tight).
- **components/HeroMap.tsx** — mappa-testo connessa: 6 temi-nodo (Scrittura, Coding, Design, Sicurezza, Workflow, Ricerca) + connettori hairline SVG → centro terracotta "esplora →". Link a /step-4-esplora. CSS/SVG only.
- **app/page.tsx** — hero a 2 colonne: copy+CTA (Inter Tight, radius) a sinistra, HeroMap a destra.
- **components/TermBlock.tsx** + **app/step-2-installa** — blocco terminale (barra + `❯ npm i -g @anthropic-ai/claude-code` mono) come firma command-line, spostato dall'hero a installa.
- **SkillCard / StepNav / SiteFooter** — re-skinnati automaticamente via CSS variables + regola label globale (nessuna modifica per-file necessaria).

## Deviazioni dal piano

- **[fix] HeroMap sizing**: `justify-self-end` faceva collassare la cella → `w-full` a zero. Risolto con `w-full` sul wrapper + `mx-auto lg:ml-auto` sulla mappa. Label con bg-paper/90 + padding per leggibilità sopra i connettori.
- **Body in Fraunces**: come da DIRECTION-LOCKED ("Fraunces display + body"). Tutto il corpo testo è ora Fraunces (voce editoriale); le micro-label e CTA in Inter Tight.

## Verifiche

- `npm run validate:data` ✓ · `npx tsc --noEmit` ✓ · `npm run build` ✓ (6 route)
- Render verificato in Chrome: landing (hero + mappa-testo connessa OK), /step-2-installa (terminale OK), kicker Inter Tight, palette/radius applicati.

## Self-Check: PASSED
- Direzione applicata (palette/font/radius) ✓ · hero mappa-testo ✓ · terminale su installa ✓ · CSS/SVG only ✓ · reduced-motion intatto ✓ · skills.json intoccato ✓ · zero nuove dip ✓
