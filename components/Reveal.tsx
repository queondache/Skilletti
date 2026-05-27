'use client';

import { useEffect } from 'react';

/**
 * Reveal gentile all'ingresso nel viewport — vita senza chiasso (no parallax,
 * no sparkle). Ogni elemento con `data-reveal` fa un fade-up una sola volta
 * quando entra in vista.
 *
 * Sicuro senza JS: il fade parte SOLO quando questo componente aggiunge la
 * classe `reveal-ready` su <html> al mount. Senza JS gli elementi restano
 * visibili (vedi globals.css). Rispetta `prefers-reduced-motion`: niente
 * transizioni, tutto visibile da subito (gestito in CSS).
 *
 * Montato una volta nel layout. Usa un solo IntersectionObserver per tutti gli
 * elementi → costo trascurabile. Niente stato React, niente re-render.
 */
export function Reveal() {
  useEffect(() => {
    const root = document.documentElement;

    // Reduced motion: non nascondere nulla, lascia tutto visibile.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    root.classList.add('reveal-ready');

    const items = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]'),
    );
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.revealed = 'true';
            observer.unobserve(entry.target); // una sola volta
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    );

    items.forEach((el) => {
      // Elementi già in vista al primo paint → rivelati subito (niente flash
      // su chi è sopra la piega).
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.dataset.revealed = 'true';
      } else {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
