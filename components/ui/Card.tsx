// Card base Round 7 (Fase A).
// Card outline: bordo rosso tenue, angoli morbidi, sfondo crema, lift su hover
// (il bordo vira al rosso pieno). Stile nella classe globale `.card`.
// Server component. Polimorfica via `as` per usarla anche come <article>/<li>.
import type { ElementType, HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType; // elemento di rendering (default: div)
  children: ReactNode;
}

export function Card({ as, children, className = '', ...rest }: CardProps) {
  const Tag = as ?? 'div';
  return (
    <Tag className={`card ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
