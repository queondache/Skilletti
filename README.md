# skilletti.

Digest curato di skill di Claude. Massimo trenta, scelte a mano.
Museo, non magazzino.

## Cosa è

Un sito statico che raccoglie un numero limitato di skill di Claude
(Claude.ai e Claude Code), ognuna scelta, raccontata e valutata da Andrea.
Non aspira ad essere una directory: esistono già aggregatori con migliaia
di voci. Skilletti fa l'opposto.

Specifica completa: vedi [`SPEC.md`](./SPEC.md).
Convenzioni di sviluppo: vedi [`CLAUDE.md`](./CLAUDE.md).

## Stack

- Next.js 16 (App Router, `output: 'export'`)
- TypeScript strict
- Tailwind CSS v4 (CSS-first config)
- Dati: `data/skills.json` versionato
- Agent settimanale: GitHub Actions cron → PR automatica
- Hosting: GitHub Pages

## Sviluppo locale

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # produce out/ statico
pnpm preview      # serve out/ via npx serve
pnpm typecheck    # tsc --noEmit
```

## Convenzioni

- Commenti in italiano. Codice (variabili, funzioni, tipi) in inglese.
- Niente segreti nel repo. `ANTHROPIC_API_KEY` solo nei GitHub Secrets.
- Branch `main` protetto. L'agent apre PR, non pusha mai diretto.
- Soglia rigida: **30 skill massimo**, **≥1000 stelle** (eccetto org ufficiali).

## Stato

In costruzione. Fase 1 (scaffolding) in corso.
