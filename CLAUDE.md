# Skilletti — Project Context

> Sito curato di skill di Claude per amici. **Max 30 schede**, voce personale, agent settimanale che propone novità via PR automatica. Vedi `SPEC.md` per i requisiti completi.

---

## Stack

- **Frontend**: Next.js (export statico) + TypeScript + Tailwind
- **Hosting**: GitHub Pages
- **Agent settimanale**: GitHub Actions (cron, lunedì mattina)
- **LLM**: Claude API + web search tool nativo
- **Dati**: `data/skills.json` versionato nel repo — niente DB

---

## Identità visiva

**Palette — Editoriale caldo / Carta da museo:**
- Sfondo: `#FAF6F0`
- Testo: `#1A1815`
- Accento: `#B85C38` (terracotta)

**Logo**: wordmark puro (`skilletti` o `skilletti.`). Font serif elegante o grottesco moderno — da rifinire con `taste-skill`.

**Vibe**: museo italiano, libro raffinato, sobrio-personale.

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
- `scripts/agent/` — logica dell'agent settimanale
- `.github/workflows/weekly-agent.yml` — cron + esecuzione agent

---

## Workflow Git

- Branch **`main` protetto**: nessun push diretto, solo via PR
- L'agent settimanale apre PR taggate `[agent]` con candidati nuovi
- Andrea: review → merge / close / modifica
- Deploy automatico su GitHub Pages al merge

---

## Sicurezza — non negoziabile

- **Nessun segreto nel repo, mai.** `.env*` in `.gitignore` da subito
- `ANTHROPIC_API_KEY` solo in **GitHub Actions Secrets**
- `GITHUB_TOKEN` dell'Action: permessi minimi (`pull-requests: write`, `contents: write`)
- L'agent **non può pushare su `main`**, solo aprire PR
- Web search legge contenuto non fidato → review umana sulla PR è il muro di sicurezza
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
- Health-check settimanale anche per le skill già in lista.

---

## [CC compila — Comandi slash creati]

_(da popolare alla prima sessione: `status.md`, `review.md`, `compact-and-continue.md`)_

---

## [CC compila — Pattern emersi]

_(da popolare durante le sessioni)_

---

## [CC compila — Lessons critiche]

_(da popolare durante le sessioni)_
