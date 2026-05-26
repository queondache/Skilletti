# Skilletti — Project Context

> Sito curato di skill di Claude per amici. **Max 30 schede**, voce personale, agent mensile che propone novità via PR automatica. Live su [skilletti.vercel.app](https://skilletti.vercel.app). Vedi `SPEC.md` per i requisiti completi.

---

## Stack

- **Frontend**: Next.js (export statico) + TypeScript + Tailwind
- **Tipografia**: Fraunces (display/voce) + Geist (body) via `next/font`
- **Hosting**: Vercel ([skilletti.vercel.app](https://skilletti.vercel.app)) — deploy al merge su `main`
- **Agent mensile**: GitHub Actions (cron `0 9 1 * *`, 1° del mese)
- **LLM**: Claude API che *valuta e ordina* una shortlist pre-filtrata via GitHub API (no web search generica)
- **Fonti agent**: GitHub API + awesome-list curate — niente Reddit/Twitter/blog
- **Dati**: `data/skills.json` versionato nel repo — niente DB

---

## Identità visiva

**Palette — Editoriale caldo / Carta da museo:**
- Sfondo: `#FAF6F0`
- Testo: `#1A1815`
- Accento: `#B85C38` (terracotta)

**Logo**: wordmark puro `skilletti.` in Fraunces (display). Body in Geist (grottesco moderno).

**Vibe**: museo italiano, libro raffinato, sobrio-personale.

**Struttura pagina** (single-page con ancore): Hero → sommario tematico (chip
`Essenziali (4)` + 6 chip tema) → Essenziali (griglia 2×2 da ≥1280px) → Catalogo →
Metodo → Template → Vocabolario → Footer. SkillCard: layout "open-pages" 60/40 su
desktop (≥1024px), colonna singola su mobile.

---

## Convenzioni di codice

- TypeScript **strict mode**
- Path assoluti via alias `@/`
- Componenti **server-first** — usare client components solo se strettamente necessario
- **Solo Tailwind + CSS variables** per la palette. Niente CSS-in-JS.
- Niente librerie UI pesanti (no bundle shadcn completo); preferire componenti custom
- Markdown per le descrizioni lunghe nelle schede

---

## Struttura cartelle

Vedi `SPEC.md` §11. Cartelle critiche:
- `data/skills.json` — fonte di verità delle schede
- `scripts/agent/` — logica dell'agent mensile (da costruire, Fase 4)
- `.github/workflows/` — agent mensile (cron `0 9 1 * *`) + deploy

---

## Workflow Git

- Branch **`main` protetto**: nessun push diretto, solo via PR (squash merge, no merge commits)
- L'agent mensile apre PR taggate `[agent]` con candidati nuovi
- Andrea: review → merge / close / modifica
- Deploy automatico su Vercel al merge

---

## Sicurezza — non negoziabile

- **Nessun segreto nel repo, mai.** `.env*` in `.gitignore` da subito
- `ANTHROPIC_API_KEY` solo in **GitHub Actions Secrets**
- `GITHUB_TOKEN` dell'Action: permessi minimi (`pull-requests: write`, `contents: write`)
- L'agent **non può pushare su `main`**, solo aprire PR
- L'agent legge README/contenuto GitHub non fidato → review umana sulla PR è il muro di sicurezza
- Attivare `gh secret scanning` sul repo

---

## Tool CC attivi per questo progetto

- `superpowers` (sempre)
- `frontend-design` + `taste-skill` (estetica raffinata richiesta — palette editoriale, wordmark)
- `context7` (Next.js docs sempre aggiornate)
- `github` (gestione repo + PR)
- `security-guidance` (audit secrets, permessi Actions)
- `code-review` (review pre-merge)
- CCO sempre attivo

---

## Regole di prodotto — non negoziabili

- **30 skill è un tetto rigido.** Mai superare per fare numero.
- **Filtro 1000 stelle binario** (eccezione: org ufficiali — Anthropic, Vercel, Google, Supabase).
- **L'agent non pubblica mai autonomamente.** PR sempre, review sempre.
- Health-check mensile anche per le skill già in lista.

---

## [CC compila — Comandi slash creati]

_(da popolare alla prima sessione: `status.md`, `review.md`, `compact-and-continue.md`)_

---

## [CC compila — Pattern emersi]

_(da popolare durante le sessioni)_

---

## [CC compila — Lessons critiche]

_(da popolare durante le sessioni)_
