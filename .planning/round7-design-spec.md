# Round 7 — Design Spec (contratto visivo bloccato)

> Direzione decisa con Andrea su Claude.ai. Questo file è il CONTRATTO.
> CC esegue con la skill `nothing-design`. Niente rinegoziazione della direzione.
> Prototipo navigabile di riferimento: `skilletti-spec-bloccata.html`.

---

## Obiettivo del redesign

Skilletti smette di essere un catalogo editoriale museale e diventa un **prodotto di onboarding a Claude Code**: UX-first, navigabile, sperimentale ma usabile. Le persone devono trovare le informazioni facilmente, orientarsi senza sforzo, e rimanere colpite.

Round 6 (PR #9, in `main`) è uscito troppo simile alla v1: layout verticale editoriale, niente menu/back, mappa parole statica e brutta. **Round 7 riscrive il design da zero** ma tiene routing, `skills.json` e contenuti.

---

## Cosa si tiene, cosa si butta

| SI TIENE (il valore) | SI BUTTA (il contenitore) |
|---|---|
| `skills.json` + schema (INTOCCATI) | layout verticale editoriale Round 6 |
| 12 schede curate + voce personale | mappa parole tematica |
| routing 6 route App Router | design system "terminale editoriale" |
| contenuti migrati (Vocabolario, ComeIniziare, ecc.) | navigazione attuale (no menu, no back) |
| filosofia "museo, non magazzino" | font Fraunces |

---

## COLORI — due colori letterali

```
crema sabbia    #EDE0C8   -> sfondo
rosso borbone   #8A2A18   -> testo, linee, accenti
```

- **Solo questi due hex.** Nessun terzo colore.
- I "toni" ammessi sono **solo opacità del rosso** sul crema (linee, wash, hover). Es: `rgba(138,42,24,.22)` per le linee, `.07` per i wash.
- Testo di lettura = rosso pieno `#8A2A18` su crema (contrasto AA verificato — crema scelto chiaro apposta per superare il gate).
- **NO dark mode. NO grigi. NO dot-matrix.** Se `nothing-design` propone questi, ignorali: il vincolo due-colori-caldi vince.

---

## TIPOGRAFIA

```
display   Bricolage Grotesque  (morbido, caratteriale)
body      Hanken Grotesk       (pulito, caldo)
```

- CC può proporre un abbinamento alternativo SE `nothing-design` ne ha uno più forte, ma restando su **display caratteriale + body pulito**.
- VIETATI: Inter, Roboto, Arial, system fonts, Space Grotesk.

---

## FORME

- Outline / linee vuote, angoli morbidi.
- Niente riempimenti pieni se non gli accenti (bottoni primari, badge attivi).
- Coerenza con l'estetica "linea che disegna".

---

## ICONE — set di 6, outline, animate al reveal

| Sezione | Icona | Animazione |
|---|---|---|
| Capisci | libro aperto | pagine che si sfogliano |
| Installa | terminale `>_` | cursore che lampeggia |
| Le essenziali | stella | si traccia (stroke-dashoffset) al reveal |
| Esplora | cactus | cresce a scroll |
| Costruisci | blocchi impilati | cadono uno alla volta |
| Suggerimento | mano puntata | oscillazione leggera |

Stesso stile: stroke ~2px, terminazioni arrotondate, fill none.

---

## SCROLL — mix H (due momenti coreografati, resto calmo)

- **Hero**: il claim si "scrive" + il cactus cresce, in sync col primo scroll (pin-scroll breve).
- **Percorso (i 5 step)**: sticky storytelling — numero gigante + icona restano fermi a sinistra, il contenuto scorre a destra; l'icona cambia in sync con lo step (libro -> terminale -> stella -> cactus -> blocchi).
- **Resto del sito**: calmo. Solo reveal d'ingresso sottile.
- Principio: *one well-orchestrated moment > scattered micro-interactions*. Non animare ovunque.
- `prefers-reduced-motion`: disabilita tutto (cactus a scala fissa, niente pin, reveal istantaneo).

Reference di movimento (solo ispirazione, non copiare):
- yanliuportfolio.vercel.app -> movimento "divertente" hero
- handhold.io -> sticky storytelling pulito
- genpire.com -> progressione 1->2->3
- alt-portfolio.framer.website -> doppio colore pulito/fresco

---

## NAVIGAZIONE — vetrina classica, fluida

- **Menu sticky sempre presente** (Capisci · Installa · Esplora · Costruisci).
- **Back vero** in ogni vista di dettaglio.
- Struttura a pagine: home -> step -> dettaglio skill. NIENTE muro verticale unico.
- Navigazione rapida, intuitiva, fluida. È il problema #1 da risolvere.

---

## CONTENUTO

- 12 schede curate + voce personale ("perché la uso, quando") — restano il cuore.
- **Suggerimenti espliciti** ("il mio consiglio") almeno in Capisci e Installa.
  Es. Installa -> "ti consiglio l'estensione VS Code per iniziare".
- NIENTE mappa parole. Catalogo a griglia + chip filtro per tema.
- Copy hero/bio: placeholder ammessi (Andrea li rifinisce dopo), ma niente lorem letterale —
  testo plausibile in voce Skilletti.

---

## QA (gate Round 7)

- tsc + build + validate:data verdi
- Lighthouse desktop ≥95 (a11y / best-practices / SEO) su tutte le route
- Lighthouse mobile target 95, accettato ≥90 con doc (pragmatic)
- contrasto AA verificato sui due colori (testo piccolo incluso)
- keyboard nav completa, focus visible, prefers-reduced-motion rispettato
- mobile 390px: menu, step, card, comandi non sfondano

---

## Fasi (A -> F)

- **A — Design system**: CSS vars due colori, tipografia, set icone outline, componenti base (card, btn, nav, suggest) con nothing-design dentro la spec
- **B — Navigazione**: menu sticky + back + struttura a pagine (home/step/dettaglio), elimina layout verticale Round 6
- **C — Hero + scroll coreografato**: pin-scroll claim+cactus, sticky storytelling percorso
- **D — Viste**: home, Capisci, Installa (con suggerimenti), Esplora (griglia+chip, NO mappa), Costruisci, dettaglio skill
- **E — Animazioni icone** (reveal, stroke-dashoffset) + reduced-motion off-tutto
- **F — QA + Lighthouse + screenshot + PR**
