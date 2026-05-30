// Set di 6 icone outline Round 7 (Fase A).
// Stile coerente: stroke 2px, fill none, terminazioni arrotondate, currentColor
// (ereditano il rosso borbone dal contesto). Nessuna animazione qui: il reveal
// e lo stroke-dashoffset arrivano in Fase E. Tutte tree-shakeable (export nominati).

import type { SVGProps } from 'react';

// Props condivise: `size` controlla width/height (default 24), `className`
// per utilities Tailwind. Tutto il resto passa allo <svg> (es. aria-hidden).
export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number | string;
}

// Attributi outline comuni a tutte le icone.
const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

/** Libro aperto — sezione "Capisci". Due pagine speculari con dorso centrale. */
export function IconLibro({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} aria-hidden="true" {...base} {...props}>
      {/* dorso centrale */}
      <path d="M12 6v13" />
      {/* pagina sinistra */}
      <path d="M12 6C10 4.5 6.5 4 4 4.5V17c2.5-.5 6 0 8 1.5" />
      {/* pagina destra */}
      <path d="M12 6c2-1.5 5.5-2 8-1.5V17c-2.5-.5-6 0-8 1.5" />
    </svg>
  );
}

/** Terminale `>_` — sezione "Installa". Riquadro con prompt e cursore. */
export function IconTerminale({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} aria-hidden="true" {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      {/* prompt > */}
      <path d="M7 10l2.5 2L7 14" />
      {/* cursore _ */}
      <path d="M13 14h4" />
    </svg>
  );
}

/** Stella — sezione "Le essenziali". Tracciata in un solo path (per Fase E). */
export function IconStella({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} aria-hidden="true" {...base} {...props}>
      <path d="M12 3.5l2.6 5.3 5.9.86-4.25 4.14 1 5.86L12 17.9l-5.25 2.76 1-5.86L3.5 9.66l5.9-.86z" />
    </svg>
  );
}

/** Cactus — sezione "Esplora". Fusto centrale + due bracci: pensato per
 *  crescere dal basso (Fase E) via scale-y con transform-origin in basso. */
export function IconCactus({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} aria-hidden="true" {...base} {...props}>
      {/* fusto centrale */}
      <path d="M12 21V7" />
      {/* braccio sinistro */}
      <path d="M12 13H9.5A2.5 2.5 0 0 1 7 10.5V9" />
      {/* braccio destro */}
      <path d="M12 11h2.5A2.5 2.5 0 0 0 17 8.5V7" />
      {/* apice arrotondato del fusto */}
      <path d="M12 7a2 2 0 0 1 4 0" />
      {/* vaso / terreno */}
      <path d="M8 21h8" />
    </svg>
  );
}

/** Blocchi impilati — sezione "Costruisci". Tre blocchi (cadranno in Fase E). */
export function IconBlocchi({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} aria-hidden="true" {...base} {...props}>
      {/* blocco basso sinistra */}
      <rect x="4" y="14" width="7" height="6" rx="1" />
      {/* blocco basso destra */}
      <rect x="13" y="14" width="7" height="6" rx="1" />
      {/* blocco in cima, centrato */}
      <rect x="8.5" y="6" width="7" height="6" rx="1" />
    </svg>
  );
}

/** Mano puntata — callout "il mio consiglio" (Suggest). Indice esteso. */
export function IconMano({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} aria-hidden="true" {...base} {...props}>
      {/* indice puntato verso l'alto */}
      <path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11" />
      {/* dorso e dita ripiegate */}
      <path d="M12 11V9a1.5 1.5 0 0 1 3 0v2" />
      <path d="M15 11v-.5a1.5 1.5 0 0 1 3 0V15a5 5 0 0 1-5 5h-1.6a4 4 0 0 1-2.83-1.17l-3.2-3.2a1.5 1.5 0 0 1 2.12-2.12L9 14.5" />
    </svg>
  );
}
