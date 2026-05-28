import Link from 'next/link';

// HeroMap (Round 6, Fase C) — mappa-testo connessa: 6 temi-parola legati da
// linee hairline a un centro. È l'anteprima narrativa di /step-4-esplora
// (la mappa parole interattiva vera arriva in Fase D). CSS/SVG only, niente
// canvas/JS pesante; nessuna animazione (il motion è Fase E).

type Node = { label: string; x: number; y: number };

// Coordinate in viewBox 0..100 — stesse posizioni di WordMap (anteprima ≡ mappa).
const NODES: Node[] = [
  { label: 'Design', x: 17, y: 20 },
  { label: 'Coding', x: 80, y: 16 },
  { label: 'Marketing', x: 88, y: 52 },
  { label: 'Sicurezza', x: 74, y: 86 },
  { label: 'Workflow', x: 22, y: 84 },
  { label: 'Web', x: 10, y: 54 },
];

export function HeroMap() {
  return (
    <Link
      href="/step-4-esplora"
      aria-label="Esplora il catalogo per tema"
      className="group relative mx-auto block aspect-[4/3] w-full max-w-[440px] lg:ml-auto lg:mr-0"
    >
      {/* Connettori hairline */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      >
        {NODES.map((n) => (
          <line
            key={n.label}
            x1="50"
            y1="50"
            x2={n.x}
            y2={n.y}
            stroke="var(--color-rule)"
            strokeWidth="0.4"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {/* punti-nodo */}
        {NODES.map((n) => (
          <circle key={`${n.label}-d`} cx={n.x} cy={n.y} r="0.9" fill="var(--color-muted)" />
        ))}
        <circle cx="50" cy="50" r="1.4" fill="var(--color-terracotta)" />
      </svg>

      {/* Etichette tema (HTML, leggibili e accessibili) */}
      {NODES.map((n) => (
        <span
          key={n.label}
          className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-paper/90 px-1.5 py-0.5 text-[0.875rem] font-medium text-ink transition-colors duration-200 group-hover:text-terracotta"
          style={{
            left: `${n.x}%`,
            top: `${n.y}%`,
            fontFamily: 'var(--font-display)',
          }}
        >
          {n.label}
        </span>
      ))}

      {/* Centro — invito a esplorare */}
      <span
        className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-3 whitespace-nowrap text-[11px] font-medium uppercase tabular-figures text-terracotta transition-transform duration-200 group-hover:translate-y-4"
        style={{ letterSpacing: 'var(--tracking-micro)' }}
      >
        esplora →
      </span>
    </Link>
  );
}
