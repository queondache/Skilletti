'use client';

import { useCallback, useEffect, useState } from 'react';

// WordMap (Round 6, Fase D) — mappa parole tematica interattiva di
// /step-4-esplora. Unico device tema (sostituisce Summary "per tema" +
// CatalogControls). Stesso linguaggio visivo di HeroMap (nodi + connettori
// hairline), ma cliccabile: single-select + reset "Tutti".
//
// Filtro via data-attribute, NESSUN re-render: toggla `data-tema-hidden` su
// `.tema-group` (CSS → display:none). Compone in AND col ContextFilter, che usa
// attributi distinti (`data-ctx-hidden`/`data-ctx-empty`). Stato in URL
// (`?tema=design`), deep-link sharable. aria-pressed + focus per a11y.

type Tema = { slug: string; short: string; count: number };

// Coordinate (viewBox 0..100) per slug — stesse posizioni di HeroMap.
const COORDS: Record<string, { x: number; y: number }> = {
  design: { x: 17, y: 20 },
  coding: { x: 80, y: 16 },
  marketing: { x: 88, y: 52 },
  sicurezza: { x: 74, y: 86 },
  workflow: { x: 22, y: 84 },
  web: { x: 10, y: 54 },
};

export function WordMap({ temi }: { temi: Tema[] }) {
  const [active, setActive] = useState<string>('all');

  const apply = useCallback((slug: string, pushUrl: boolean) => {
    setActive(slug);

    if (pushUrl) {
      const url = new URL(window.location.href);
      if (slug === 'all') url.searchParams.delete('tema');
      else url.searchParams.set('tema', slug);
      window.history.pushState({}, '', url.toString());
    }

    // Toggle visibilità gruppi: mostra solo il tema scelto (o tutti).
    document.querySelectorAll<HTMLElement>('.tema-group').forEach((g) => {
      if (slug === 'all' || g.dataset.tema === slug) {
        delete g.dataset.temaHidden;
      } else {
        g.dataset.temaHidden = 'true';
      }
    });
  }, []);

  // Inizializza da URL (?tema=design) al mount, senza ri-pushare.
  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get('tema');
    if (initial && temi.some((t) => t.slug === initial)) {
      apply(initial, false);
    }
  }, [apply, temi]);

  const visible = temi.flatMap((t) => {
    const c = COORDS[t.slug];
    return c ? [{ ...t, c }] : [];
  });

  return (
    <div
      role="group"
      aria-label="Filtra il catalogo per tema"
      className="relative mx-auto aspect-[4/3] w-full max-w-[520px]"
    >
      {/* Connettori hairline */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      >
        {visible.map((t) => {
          const c = t.c;
          const dim = active !== 'all' && active !== t.slug;
          return (
            <line
              key={t.slug}
              x1="50"
              y1="50"
              x2={c.x}
              y2={c.y}
              stroke={active === t.slug ? 'var(--color-terracotta)' : 'var(--color-rule)'}
              strokeWidth="0.4"
              vectorEffect="non-scaling-stroke"
              opacity={dim ? 0.4 : 1}
            />
          );
        })}
        {visible.map((t) => {
          const c = t.c;
          return (
            <circle
              key={`${t.slug}-d`}
              cx={c.x}
              cy={c.y}
              r="0.9"
              fill={active === t.slug ? 'var(--color-terracotta)' : 'var(--color-muted)'}
            />
          );
        })}
        <circle cx="50" cy="50" r="1.4" fill="var(--color-terracotta)" />
      </svg>

      {/* Nodi-tema cliccabili */}
      {visible.map((t) => {
        const c = t.c;
        const isActive = active === t.slug;
        const dim = active !== 'all' && !isActive;
        return (
          <button
            key={t.slug}
            type="button"
            aria-pressed={isActive}
            onClick={() => apply(isActive ? 'all' : t.slug, true)}
            className={
              'absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-paper/90 px-2 py-0.5 text-[0.9rem] font-medium transition-colors duration-150 ' +
              (isActive
                ? 'text-terracotta-deep'
                : dim
                  ? 'text-muted hover:text-ink'
                  : 'text-ink hover:text-terracotta-deep')
            }
            style={{ left: `${c.x}%`, top: `${c.y}%`, fontFamily: 'var(--font-display)' }}
          >
            {t.short}{' '}
            <span className="tabular-figures text-muted">({t.count})</span>
          </button>
        );
      })}

      {/* Centro — reset "Tutti" */}
      <button
        type="button"
        aria-pressed={active === 'all'}
        onClick={() => apply('all', true)}
        className={
          'absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-3 whitespace-nowrap rounded bg-paper/90 px-2 py-0.5 text-[11px] font-medium uppercase tabular-figures transition-colors duration-150 ' +
          (active === 'all' ? 'text-ink' : 'text-terracotta-deep hover:text-ink')
        }
        style={{ letterSpacing: 'var(--tracking-micro)' }}
      >
        {active === 'all' ? 'tutti i temi' : 'tutti ↺'}
      </button>
    </div>
  );
}
