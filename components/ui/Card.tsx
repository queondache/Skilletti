// Card base Round 7 (Fase A).
// Card outline: bordo rosso tenue, angoli morbidi, sfondo crema, lift su hover
// (il bordo vira al rosso pieno). Stile nella classe globale `.card`.
// Server component. Con `href` diventa una card-link <a> (aggiunge `group` per
// gli effetti hover dei figli + `aria-label` via `ariaLabel`); altrimenti
// polimorfica via `as` (div/article/li).
import type { ElementType, HTMLAttributes, ReactNode } from 'react';

interface CardProps extends Omit<HTMLAttributes<HTMLElement>, 'aria-label'> {
  as?: ElementType; // elemento di rendering (default: div) — ignorato se href
  href?: string; // se presente → card-link <a>
  ariaLabel?: string; // etichetta accessibile per la card-link
  children: ReactNode;
}

export function Card({ as, href, ariaLabel, children, className = '', ...rest }: CardProps) {
  if (href != null) {
    return (
      <a href={href} aria-label={ariaLabel} className={`card group ${className}`.trim()} {...rest}>
        {children}
      </a>
    );
  }
  const Tag = as ?? 'div';
  return (
    <Tag className={`card ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
