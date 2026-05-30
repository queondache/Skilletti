// Suggest base Round 7 (Fase A) — callout "il mio consiglio".
// Box outline rosso, sfondo wash, icona tonda (mano puntata), titolo + corpo,
// badge opzionale. Usato almeno in Capisci e Installa (vedi spec §Contenuto).
// Server component. Stile nelle classi globali `.suggest` / `.suggest-icon`.
import type { ReactNode } from 'react';
import { IconMano } from '@/components/icons';

interface SuggestProps {
  title?: string; // default: "il mio consiglio"
  badge?: string; // etichetta opzionale (es. "consigliato")
  children: ReactNode; // corpo del consiglio
  className?: string;
}

export function Suggest({
  title = 'il mio consiglio',
  badge,
  children,
  className = '',
}: SuggestProps) {
  return (
    <aside className={`suggest ${className}`.trim()}>
      <span className="suggest-icon" aria-hidden="true">
        <IconMano size={20} />
      </span>
      <div className="min-w-0">
        <p className="flex items-center gap-2 font-display text-base font-bold">
          {title}
          {badge && (
            <span className="rounded-full border border-red px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.1em]">
              {badge}
            </span>
          )}
        </p>
        <div className="mt-1 text-sm leading-relaxed text-soft">{children}</div>
      </div>
    </aside>
  );
}
