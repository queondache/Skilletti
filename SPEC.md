# SPEC — Skilletti
> Sito curato di skill di Claude · Output Fase 0 · Pronto per Plan Mode in CC

---

## 1. Obiettivo e contesto

**Skilletti** è una pagina web semplice e raffinata che raccoglie **massimo 30 skill di Claude** (formato SKILL.md), selezionate a mano da Andrea. Non è una directory: è un **digest d'autore**.

**Il problema che risolve:** cercare skill online oggi è macchinoso — esistono già 5+ aggregatori con migliaia di voci (claudemarketplaces.com ~4.200 skill, awesome-skills.com, skillsmp.com). Troppa roba, zero filtro. Skilletti fa l'opposto: poche skill, ognuna scelta e spiegata da Andrea.

**Principio guida — museo, non magazzino.** Il valore non è il numero di skill, è il *no* detto 95 volte su 100. Se non è curata e spiegata bene, non entra.

---

## 2. Target

Amici di Andrea che **usano già Claude** (Claude.ai e/o Claude Code). Profilo: persone tech-friendly ma non necessariamente power user. Hanno bisogno di sapere non solo *cosa* installare ma *da dove partire* e *quanto fidarsi*.

---

## 3. Identità visiva

**Nome:** Skilletti — diminutivo italiano, voce personale, niente posa.

**Palette — Editoriale caldo / Carta da museo:**
- Sfondo: `#FAF6F0`
- Testo: `#1A1815`
- Accento: `#B85C38` (terracotta)

**Logo:** wordmark puro (`skilletti` o `skilletti.`). Font serif elegante (es. Fraunces, Cormorant) o grottesco moderno (es. Söhne). Da rifinire in fase di build con `taste-skill` + `frontend-design`.

**Vibe:** museo italiano, libro raffinato, sobrio-personale.

---

## 4. Funzionalità core (MVP) vs nice-to-have

### MVP — deve esserci al lancio
- Sito statico con le schede skill (parti dal seed di Andrea, anche meno di 30)
- Navigazione per **tema** e per **importanza**
- Ogni scheda completa: voce personale, profilo sicurezza, "dove funziona", comando d'installazione
- Sezione didattica "Cosa sono skill, plugin, MCP, CLI"
- Agent di ricerca settimanale che apre una **PR automatica** sul repo con 0-3 candidati nuovi
- Health-check settimanale delle skill già in lista (segnala quelle morte)

### Nice-to-have — dopo il lancio
- Ricerca testuale interna
- Filtro combinato (tema + livello + dove funziona)
- Cronologia "novità del mese"
- Tema chiaro/scuro

---

## 5. Modello dati — la scheda skill

I dati vivono in **`data/skills.json`** versionato nel repo. Nessun database.

| Campo | Tipo | Note |
|---|---|---|
| `id` | slug | identificatore univoco |
| `nome` | testo | nome ufficiale della skill |
| `tagline` | testo | una frase, cosa fa |
| `tema` | enum | categoria (vedi sotto) |
| `importanza` | enum | `essenziale` / `forte` / `situazionale` |
| `livello` | enum | `base` / `intermedio` / `power` — tag secondario |
| `dove_funziona` | enum | `claude.ai` / `claude-code` / `entrambi` |
| `descrizione_personale` | testo | la voce di Andrea: perché la uso, quando |
| `profilo_sicurezza` | array di tag | es. `self-contained`, `legge-credenziali`, `esegue-script`, `chiamate-esterne`, `si-auto-aggiorna` |
| `repo_url` | url | sorgente |
| `stelle` | numero | conteggio GitHub al momento del controllo |
| `ultimo_commit` | data | freschezza del repo |
| `licenza` | testo | es. MIT |
| `installazione` | testo | comando reale e testato |
| `data_controllo` | data | quando l'agent l'ha verificata l'ultima volta |
| `stato` | enum | `attiva` / `da-verificare` / `archiviata` |

**Temi:** Scrittura · Ricerca & web · Gestione file e documenti · Coding & sviluppo · Design & UI · Produttività & workflow · Sicurezza · Dati.

**Importanza** = come si naviga il sito:
- `essenziale` → "Parti da qui" — le 5 con cui un amico nuovo dovrebbe iniziare
- `forte` → uso regolare, settimanale
- `situazionale` → utili in casi specifici

---

## 6. Criteri di curation

### Filtri di ammissione — binari, o passa o è fuori
1. **Soglia stelle** — repo con **< 1000 stelle = fuori** (regola hard di Andrea). Eccezione unica: repo ufficiali di org note (Anthropic, Vercel, Google, Supabase).
2. **Vivo** — almeno un commit negli ultimi ~60 giorni. Abbandonware = fuori.
3. **Installabile davvero** — path/comando d'installazione reale e testato.
4. **Sicurezza non opaca** — il profilo di rischio deve essere dichiarabile.

### Criteri di qualità — graduati
- **Utilità ricorrente** — roba che useresti ogni settimana.
- **Chiarezza del trigger** — descrizione YAML scritta bene.
- **Spiegabilità** — Andrea riesce a dire cosa fa in 2 frasi senza gergo.

### Regola d'oro
**L'ha usata Andrea, o un amico fidato, almeno una volta.**

### Anti-pattern — da rifiutare sempre
- Hype senza uso reale
- Framework totalizzanti che prendono il controllo dell'ambiente
- Doppioni (12 skill che fanno la stessa cosa → si tiene la migliore)
- Roba iper-tecnica di nicchia

---

## 7. Struttura del sito

**Single-page con ancore.** Sezioni:

1. **Intro** — voce di Andrea, breve.
2. **Parti da qui** — le essenziali (massimo 5).
3. **Catalogo** — tutte le schede, filtrabili per tema e importanza.
4. **Scheda skill** — card espandibile con tutti i campi del modello dati; profilo sicurezza ben visibile.
5. **Cosa sono skill, plugin, MCP, CLI** — sezione didattica (vedi §8).
6. **Footer / Come funziona** — come è curata la lista, ogni quanto si aggiorna, chi è Andrea.

---

## 8. Sezione didattica

Spiega in linguaggio piano, senza gergo:

- **Skill** — istruzioni che insegnano a Claude un compito; si attivano da sole quando servono.
- **Plugin** — pacchetto che racchiude più skill, comandi e altro, installabile in un colpo.
- **MCP** — connettore che collega Claude a servizi esterni (Gmail, Drive, un database).
- **CLI / Claude Code** — Claude nel terminale, per chi programma.
- **Slash command, subagent, hook** — accessori per chi usa Claude Code.

**Punto chiave per il target:** le skill funzionano sia su Claude.ai (sezione Competenze) sia su Claude Code, mentre plugin/MCP/CLI sono soprattutto da developer. Per questo ogni scheda ha il campo `dove_funziona` — è l'informazione più importante per un amico non-power-user.

> Definizioni esatte e comandi vanno verificati contro `docs.claude.com` quando si scrivono i contenuti veri.

---

## 9. Agent di ricerca settimanale

### Architettura

L'agent vive in **GitHub Actions**. Stesso repo del sito. Zero dipendenze esterne (niente Vercel Cron, niente Resend, niente domain setup).

- **Trigger** — GitHub Actions cron schedule, ogni lunedì mattina.
- **Cervello** — chiama la Claude API con il **web search tool** attivo.
- **Output** — apre una **PR automatica** sul repo con i candidati pre-compilati come modifica a `skills.json`. Niente email.

### Flusso, passo per passo

1. Legge `data/skills.json` → sa cosa è già in lista (evita duplicati).
2. **Health-check**: per ogni skill in lista verifica che il repo sia ancora vivo (commit recenti, non archiviato). Segnala le morte.
3. **Ricerca novità** su fonti fisse: awesome-list su GitHub (es. travisvn/awesome-claude-skills, hesreallyhim/awesome-claude-code), blog Anthropic, changelog dei marketplace, r/ClaudeAI.
4. Estrae candidati nuovi.
5. Applica i **filtri binari** (stelle ≥ 1000, vivo, installabile, sicurezza non opaca).
6. Valuta i sopravvissuti sui criteri di qualità, ordina per stelle decrescente.
7. Seleziona **massimo 3 candidati**, ognuno con scheda pre-compilata (tagline bozza, profilo sicurezza, tema suggerito, comando install, stelle/commit/licenza).
8. Apre una PR taggata `[agent]` con: candidati nuovi + skill da verificare nel body.

### Regola non negoziabile

**L'agent non pubblica mai da solo.** Solo ciò che Andrea fa merge entra in `skills.json`. Il `GITHUB_TOKEN` dell'Action ha permessi minimi (`pull-requests: write`, `contents: write`) e branch `main` è protetto. L'agent legge contenuto web non fidato — la review umana sulla PR è il muro di sicurezza.

Lavoro settimanale di Andrea: aprire la PR, leggere 3 schede, mergere 0-1, chiudere il resto. ~10 minuti.

---

## 10. Stack tecnico

| Componente | Scelta | Perché |
|---|---|---|
| Frontend | Next.js (export statico) + TypeScript + Tailwind | Stack che Andrea conosce; export statico va su Pages |
| Hosting | GitHub Pages | Gratis, niente Vercel, niente domain obbligatorio |
| Dati | `data/skills.json` versionato | 30 record curati a mano → niente DB; versionato su Git; sito 100% statico |
| Cron | GitHub Actions (schedule) | Nativo, gratis, stesso repo |
| Agent | GitHub Action + Claude API + web search tool | Web search nativo nell'API |
| Output agent | PR automatica | Nessuna email, audit trail nativo Git |
| Doc librerie | context7 in CC | API che cambiano (Next.js) |

> Tutti i repo/librerie esterni rispettano la soglia 1000 stelle o sono di org ufficiali.

---

## 11. Struttura file/cartelle prevista

```
~/Dev/Skilletti/
├── CLAUDE.md
├── SPEC.md
├── README.md
├── .claude/
│   ├── lessons.md
│   ├── tasks.md
│   └── progress.md
├── .github/
│   └── workflows/
│       └── weekly-agent.yml      ← cron settimanale
├── data/
│   └── skills.json               ← fonte di verità delle schede
├── scripts/
│   └── agent/                    ← logica dell'agent (TS o Python)
│       ├── search.ts
│       ├── filter.ts
│       └── open-pr.ts
├── app/                          ← Next.js
│   ├── page.tsx                  ← single-page con ancore
│   └── layout.tsx
├── components/
│   ├── skill-card.tsx
│   ├── nav.tsx
│   └── section.tsx
└── public/
    └── wordmark.svg
```

---

## 12. Edge case identificati

- **Candidato già in lista** → dedup leggendo `skills.json` (step 1 dell'agent).
- **Meno di 3 candidati validi in una settimana** → l'agent apre PR con quelli che ha, anche 0. Mai forzare il numero.
- **Skill in lista che muore** (repo archiviato) → l'health-check la segnala nella PR; Andrea decide se marcarla `archiviata` o rimuoverla.
- **Web search restituisce risultati di bassa qualità** → i filtri binari scartano in automatico.
- **PR non si apre** (Action fallisce) → notifica GitHub nativa; retry alla settimana successiva.
- **Skill ottima ma < 1000 stelle** → esclusa per regola; l'agent può segnalarla nel body della PR come "watchlist", senza inserirla in `skills.json`.

---

## 13. Sicurezza

- `ANTHROPIC_API_KEY` solo in **GitHub Actions Secrets** — mai nel repo, mai in `.env` committato.
- `GITHUB_TOKEN` dell'Action: permessi minimi (`pull-requests: write`, `contents: write`).
- Branch `main` **protetto**: nessun push diretto, solo via PR. Vale anche per l'agent.
- L'agent legge contenuto web non fidato → output sempre via PR review umana, mai direct commit.
- `.env*` in `.gitignore` da subito; `.gitleaks` o `gh secret scanning` attivo.

---

## 14. Criteri di successo

- Un amico arriva sul sito e in **meno di 2 minuti** capisce quali 5 skill installare per prime.
- Ogni scheda ha tutti i campi compilati, inclusi voce personale, profilo sicurezza e `dove_funziona`.
- L'agent gira ogni lunedì e apre una PR con 0-3 candidati + stato delle skill esistenti.
- Andrea aggiorna la lista in **meno di 10 minuti a settimana**.
- Il sito resta sotto le 30 skill — la qualità non scende mai per fare numero.

---

## 15. Decisioni ancora aperte

1. **Lista skill di partenza (seed)** — Andrea sta preparando la sua lista aggiornata. Senza questa l'agent può girare lo stesso (parte da zero e propone candidati), ma il sito ha bisogno di almeno 5-10 seed iniziali per non apparire vuoto al lancio.
2. **Dominio personalizzato** — opzionale. Default: `[andrea-username].github.io/skilletti`. Si può collegare un dominio acquistato in seguito.
3. **Font esatto del wordmark** — da decidere in fase di build con `taste-skill` (proverà 3-4 opzioni).
