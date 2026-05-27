'use client';

import { useEffect, useState } from 'react';

/**
 * Indice di pagina tipografico — due forme responsive che condividono lo stesso
 * stato (visibilità + sezione attiva):
 *
 * - < 1280px (sotto xl): barra orizzontale fissa in alto, allineata a destra
 *   (mirror della colonna paper-deep di rilegatura). Appare dopo l'hero.
 * - ≥ 1280px (xl): rail verticale nella marginalia destra — sfrutta il
 *   whitespace che a video largo restava vuoto a destra della colonna di prosa
 *   (~62ch). Indice "da museo": etichette a filo destro, pallino terracotta sul
 *   capitolo corrente (lo stesso punto del wordmark `skilletti.`).
 *
 * Comportamento condiviso:
 * - Nascosto sotto la soglia di scroll (85% del primo viewport) per far
 *   respirare l'hero.
 * - 6 ancore: essenziali · inizia · catalogo · metodo · template · vocabolario.
 * - Sezione attiva via IntersectionObserver (banda 10%-40% dall'alto).
 * - Rispetta `prefers-reduced-motion` (transizioni di opacità istantanee).
 */

const SECTIONS = [
  { id: 'parti-da-qui', label: 'essenziali' },
  { id: 'come-iniziare', label: 'inizia' },
  { id: 'catalogo', label: 'catalogo' },
  { id: 'workflow', label: 'metodo' },
  { id: 'template', label: 'template' },
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
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target as HTMLElement)
          .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
        const first = intersecting[0];
        if (first) setActive(first.id as SectionId);
      },
      { rootMargin: '-10% 0px -60% 0px', threshold: 0 },
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── Barra orizzontale — sotto 1440px ────────────────────────────── */}
      <nav
        aria-label="Indice della pagina"
        data-visible={visible || undefined}
        className={
          'min-[1440px]:hidden fixed top-0 left-0 right-0 z-40 pointer-events-none ' +
          'transition-opacity duration-200 ease-out ' +
          (visible ? 'opacity-100' : 'opacity-0')
        }
      >
        <div
          className={
            'pointer-events-auto bg-paper/85 backdrop-blur-md ' +
            'border-b border-rule/40 ' +
            'px-5 sm:pl-[var(--gutter-indent)] sm:pr-[calc(7vw+var(--gutter-edge))] ' +
            'py-3'
          }
        >
          <ul
            className="flex flex-wrap items-baseline justify-end gap-x-3 gap-y-1 sm:gap-x-7 text-[9px] sm:text-[11px] font-medium uppercase tabular-figures"
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

      {/* ── Rail verticale — da 1440px, nella marginalia destra (si sblocca
          quando lo spazio a destra è davvero ampio) ─────────────────────── */}
      <nav
        aria-label="Indice della pagina"
        data-visible={visible || undefined}
        className={
          'hidden min-[1440px]:block fixed z-40 ' +
          'top-1/2 -translate-y-1/2 right-[calc(7vw_+_1rem)] ' +
          'transition-opacity duration-300 ease-out ' +
          (visible ? 'opacity-100' : 'opacity-0 pointer-events-none')
        }
      >
        <ul className="flex flex-col items-end gap-y-3.5">
          {SECTIONS.map((s) => {
            const isActive = active === s.id;
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  data-active={isActive || undefined}
                  className="group flex items-center justify-end gap-x-3"
                >
                  <span
                    className={
                      'text-right text-[11px] font-medium uppercase tabular-figures transition-colors duration-150 ' +
                      (isActive
                        ? 'text-ink'
                        : 'text-muted/70 group-hover:text-ink')
                    }
                    style={{ letterSpacing: 'var(--tracking-micro)' }}
                  >
                    {s.label}
                  </span>
                  {/* Marcatore: pallino terracotta sul capitolo corrente (motivo
                      del wordmark), hairline che cresce sugli altri all'hover. */}
                  <span
                    aria-hidden="true"
                    className="flex w-4 shrink-0 items-center justify-end"
                  >
                    {isActive ? (
                      <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
                    ) : (
                      <span className="h-px w-2.5 bg-rule transition-all duration-150 group-hover:w-4 group-hover:bg-terracotta/60" />
                    )}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
