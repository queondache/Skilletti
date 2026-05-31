'use client';

import { useCallback, useEffect, useState } from 'react';
import type { ThemeInfo } from '@/lib/skills';

// Filtro a chip per tema (spec: "Catalogo a griglia + chip filtro per tema").
// Accessibile: bottoni con aria-pressed, focus visibile. Single-select con
// reset "Tutte". Stato in URL (?tema=slug) per deep-link.
//
// Filtro via data-attribute sul DOM (nessun re-render della griglia): toggla
// `data-chip-hidden` sui wrapper `[data-grid-item]` in base a `data-tema`. CSS
// in globals.css (`[data-grid-item][data-chip-hidden] { display:none }`).

export function ChipFilter({ themes }: { themes: ThemeInfo[] }) {
  const [active, setActive] = useState<string>('all');

  const apply = useCallback((slug: string, pushUrl: boolean) => {
    setActive(slug);

    if (pushUrl) {
      const url = new URL(window.location.href);
      if (slug === 'all') url.searchParams.delete('tema');
      else url.searchParams.set('tema', slug);
      window.history.pushState({}, '', url.toString());
    }

    document.querySelectorAll<HTMLElement>('[data-grid-item]').forEach((item) => {
      if (slug === 'all' || item.dataset.tema === slug) {
        delete item.dataset.chipHidden;
      } else {
        item.dataset.chipHidden = 'true';
      }
    });
  }, []);

  // Inizializza da URL (?tema=slug) al mount, senza ri-pushare.
  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get('tema');
    if (initial && themes.some((t) => t.slug === initial)) {
      apply(initial, false);
    }
  }, [apply, themes]);

  return (
    <div role="group" aria-label="Filtra il catalogo per tema" className="flex flex-wrap gap-2.5">
      <Chip label="Tutte" active={active === 'all'} onClick={() => apply('all', true)} />
      {themes.map((t) => (
        <Chip
          key={t.slug}
          label={t.short}
          count={t.count}
          active={active === t.slug}
          onClick={() => apply(active === t.slug ? 'all' : t.slug, true)}
        />
      ))}
    </div>
  );
}

function Chip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        'inline-flex items-baseline gap-1.5 rounded-[var(--radius-pill)] border px-3.5 py-1.5 text-[12px] font-medium uppercase tabular-figures transition-colors duration-150 ' +
        (active
          ? 'border-red bg-red text-cream'
          : 'border-line text-soft hover:border-red hover:text-red')
      }
      style={{ letterSpacing: 'var(--tracking-micro)' }}
    >
      {label}
      {typeof count === 'number' && (
        <span className={active ? 'text-cream' : 'text-soft'}>({count})</span>
      )}
    </button>
  );
}
