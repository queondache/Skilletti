# Fase A — Direzione estetica BLOCCATA

**Scelta:** Direzione 1 — "Terminale editoriale", raffinata Apple-clean (rosso smorzato, più aria, ombre soft).
**Data:** 2026-05-27 · **Decide:** DESIGN-01, DESIGN-02
**Mockup di riferimento:** `.claude/round6-mockups/dir-1-terminale.html` (+ `shot-dir-1b.png`)

> Vibe: developer-tool preciso + eleganza editoriale, ma **essenziale, arioso, pulito (Apple)**.
> Il blocco terminale è la "firma"; il mono si usa SOLO per i comandi veri, non per label/decoro.
> Audace nel contrasto tipografico Fraunces, non nel rumore. Carta-museo calda mantenuta.

## Token estetici (fonte di verità per Fasi B–E → CSS variables)

| Token | Valore | Uso |
|-------|--------|-----|
| `--bg` | `#F8F5EF` | sfondo warm off-white pulito |
| `--ink` | `#1A1714` | testo near-black ammorbidito |
| `--signal` | `#C2563A` | accento coral-terracotta smorzato (vicino al brand v1 #B85C38) — **parsimonia**: CTA, stato attivo, glyph `❯`, una keyword |
| `--signal-soft` | `rgba(194,86,58,0.12)` | tint accento per stati/sfondi tenui |
| `--muted-fg` | `#6E685D` | testo secondario |
| `--hairline` | `#EAE4D8` | bordi/righe a capello (delicate) |
| `--card` | `#FFFFFF` | superfici card |
| `--radius` | `10px` | angoli morbidi (Apple) |

## Tipografia

- **Fraunces** (display + body) — titoli hero oversize (clamp ~6.5rem), opsz alto per i display
- **Inter Tight** (600/700) — CTA + micro-label UPPERCASE, `letter-spacing: 0.12em`, ~11px
- **JetBrains Mono** — SOLO comandi terminale + indici step quieti (`02 / 05`)
- Body 18px, `line-height: 1.72`

## Layout & motion

- Griglia 12 colonne, `max-width: 1200px`, `gutter: 28px`
- Sezioni separate da una sola riga a capello (`--hairline`); molta aria (padding sezione ~74px top)
- Ombre **morbide/diffuse** (es. `0 18px 44px -28px rgba(26,23,20,0.30)`) — MAI "stamp" duro a offset
- Hover discreti: `translateY(-1/-2px)`, niente tilt/rotate, niente box-shadow a gradino
- Motion minimale stile politico.eu (dettaglio in Fase E) · `prefers-reduced-motion` rispettato

## Elementi-firma da portare nelle fasi successive

- **Hero**: titolo Fraunces enorme + keyword in `--signal` italic + blocco terminale (anteprima comando) → in Fase C diventa **mappa-testo CSS** (decisione Andrea), anteprima narrativa di /step-4-esplora
- **Step navigator**: barra minimale "Step X di 5 — Nome" + `‹ Indietro` / `Avanti ›` (no breadcrumb, no pallini)
- **SkillCard**: card bianca, label "Essenziale", tag tema + tag contesto, titolo Fraunces, riconoscimento "18k ★"
- **Mappa parole** (/step-4-esplora): nodi-pill a scala tipografica variata + context filter row

## Fallback non attivato

Le 3 direzioni hanno prodotto una scelta convinta → fallback carta+terracotta v1 NON necessario.
Direzioni scartate (archiviate): `dir-2-cartografia.html` (atlante indaco), `dir-3-rivista.html` (magazine).
