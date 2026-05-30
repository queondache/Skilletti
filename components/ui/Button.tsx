// Button base Round 7 (Fase A).
// Varianti: `primary` (rosso pieno, testo crema) e `ghost` (outline rosso).
// Reso come <a> quando è presente `href` (link interno o, con `external`, esterno
// in nuova scheda); altrimenti <button>. `arrow` aggiunge una freccia → in coda.
// Server component: nessuna interattività propria, solo presentazione.
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'ghost';

// Props comuni alle due forme (link/button).
interface CommonProps {
  variant?: Variant;
  arrow?: boolean; // mostra una freccia → in coda al label
  children: ReactNode;
  className?: string;
}

// Forma "link": presenza di `href` → <a>. `external` apre in nuova scheda.
type LinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps | 'href'> & {
    href: string;
    external?: boolean;
    as?: 'a';
  };

// Forma "button" (default): attributi nativi del button, nessun href.
type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
    as?: 'button';
  };

type ButtonProps = LinkProps | NativeButtonProps;

// Mappa variante → classe globale (definite in globals.css coi due colori).
const variantClass: Record<Variant, string> = {
  primary: 'btn-primary',
  ghost: 'btn-ghost',
};

function Arrow() {
  // Freccia outline coerente col set icone (currentColor, stroke arrotondato).
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

export function Button(props: ButtonProps) {
  const { variant = 'primary', arrow = false, children, className = '' } = props;
  const classes = `btn ${variantClass[variant]} ${className}`.trim();

  // Link: presenza di `href`.
  if (props.href != null) {
    const {
      as: _as,
      variant: _v,
      arrow: _a,
      children: _c,
      className: _cn,
      external,
      ...rest
    } = props;
    // `external` → nuova scheda con rel di sicurezza.
    const relProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    return (
      <a className={classes} {...relProps} {...rest}>
        {children}
        {arrow && <Arrow />}
      </a>
    );
  }

  const { as: _as, variant: _v, arrow: _a, children: _c, className: _cn, ...rest } = props;
  return (
    <button className={classes} {...rest}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}
