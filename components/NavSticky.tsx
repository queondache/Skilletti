'use client';

import { useEffect, useState } from 'react';

/**
 * Nav sticky tipografica — appare dopo l'hero, allineata a destra
 * (mirror della colonna paper-deep di rilegatura).
 *
 * Comportamento:
 * - Nascosta sotto la soglia di scroll (85% del primo viewport) per
 *   far respirare l'hero.
 * - 4 ancore: essenziali · catalogo · metodo · vocabolario.
 * - Stato attivo via IntersectionObserver con rootMargin che attiva
 *   la sezione quando il suo bordo superiore passa ~30% dall'alto.
 * - Sfondo bg-paper/70 + backdrop-blur-md: leggibile su qualsiasi
 *   sezione, non spezza la pagina.
 * - Rispetta `prefers-reduced-motion` (la transizione di opacità
 *   diventa istantanea).
 */

const SECTIONS = [
  { id: 'parti-da-qui', label: 'essenziali' },
  { id: 'catalogo', label: 'catalogo' },
  { id: 'workflow', label: 'metodo' },
  { id: 'didattica', label: 'vocabolario' },
] as const;

type SectionId = (typeof SECTIONS)[number]['id'];

export function NavSticky() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<SectionId | null>(null);

  // Visibilità: appare dopo 85vh di scroll
  useEffect(() => {
    const threshold = window.innerHeight * 0.85;
    const onScroll = () => setVisible(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Stato attivo: la sezione corrente è quella la cui banda centrale
  // (10%-40% dall'alto) è intersecata dal viewport.
  useEffect(() => {
    const targets = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Trova l'entry "più in alto" tra quelle che intersecano
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target as HTMLElement)
          .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
        const first = intersecting[0];
        if (first) {
          setActive(first.id as SectionId);
        }
      },
      { rootMargin: '-10% 0px -60% 0px', threshold: 0 },
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Indice della pagina"
      data-visible={visible || undefined}
      className={
        'fixed top-0 left-0 right-0 z-40 pointer-events-none ' +
        'transition-opacity duration-200 ease-out ' +
        (visible ? 'opacity-100' : 'opacity-0')
      }
    >
      <div
        className={
          'pointer-events-auto bg-paper/85 backdrop-blur-md ' +
          'border-b border-rule/40 ' +
          'pl-[var(--gutter-indent)] pr-[calc(7vw+var(--gutter-edge))] ' +
          'py-3'
        }
      >
        <ul
          className="flex flex-wrap items-baseline justify-end gap-x-6 gap-y-1 sm:gap-x-7 text-[10px] sm:text-[11px] font-medium uppercase tabular-figures"
          style={{ letterSpacing: 'var(--tracking-micro)' }}
        >
          {SECTIONS.map((s) => {
            const isActive = active === s.id;
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  data-active={isActive || undefined}
                  className={
                    'transition-opacity duration-150 ' +
                    (isActive
                      ? 'text-ink opacity-100'
                      : 'text-ink/55 hover:opacity-85 hover:text-ink')
                  }
                >
                  {s.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
