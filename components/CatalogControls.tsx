'use client';

import { Fragment, useCallback, useEffect, useState } from 'react';
import type { TemaInfo } from '@/components/Catalog';

/**
 * Controllo ibrido catalogo — indice + filtro in un solo controllo.
 *
 * Click su tema → applica filtro (fade dei gruppi non-target via
 * `data-hidden` su `.tema-group`) + smooth scroll all'anchor del gruppo.
 * Click su "tutti" → rimuove il filtro e riporta lo scroll al catalogo.
 *
 * Stato persistito in URL (`?tema=design`) tramite history.pushState,
 * deep-link sharable. Sul mount, se l'URL ha già il parametro,
 * applica il filtro senza scrollare (evita il jump indesiderato
 * all'apertura della pagina).
 *
 * Pattern data-driven sul DOM: nessun re-render del catalogo, niente
 * stato globale — solo un attributo toggleato via querySelectorAll.
 * Il fade è gestito dalla regola CSS `.tema-group[data-hidden]`.
 */

type ActiveTema = 'all' | string;

export function CatalogControls({ temi }: { temi: TemaInfo[] }) {
  const [active, setActive] = useState<ActiveTema>('all');

  const applyFilter = useCallback(
    (slug: ActiveTema, scroll: boolean) => {
      setActive(slug);

      // Aggiorna URL (deep-link friendly) senza ricaricare la pagina
      const url = new URL(window.location.href);
      if (slug === 'all') {
        url.searchParams.delete('tema');
      } else {
        url.searchParams.set('tema', slug);
      }
      window.history.pushState({}, '', url.toString());

      // Toggle data-hidden sui gruppi non-target — CSS fa il resto
      const groups = document.querySelectorAll<HTMLElement>('.tema-group');
      groups.forEach((g) => {
        if (slug === 'all' || g.dataset.tema === slug) {
          delete g.dataset.hidden;
        } else {
          g.dataset.hidden = 'true';
        }
      });

      if (!scroll) return;

      const target =
        slug === 'all'
          ? document.getElementById('catalogo')
          : document.getElementById(`tema-${slug}`);

      // Respect reduced-motion: salta direttamente se l'utente lo preferisce
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target?.scrollIntoView({
        behavior: reduced ? 'auto' : 'smooth',
        block: 'start',
      });
    },
    [],
  );

  // Inizializza da URL (?tema=design) — applica filtro e porta al gruppo
  // target. Scroll forzato a `auto` per evitare l'animazione smooth allo
  // sbarco da link condiviso (sarebbe disorientante).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initial = params.get('tema');
    if (!initial || !temi.some((t) => t.slug === initial)) return;

    setActive(initial);

    // Toggle data-hidden senza scroll smooth
    const groups = document.querySelectorAll<HTMLElement>('.tema-group');
    groups.forEach((g) => {
      if (g.dataset.tema === initial) {
        delete g.dataset.hidden;
      } else {
        g.dataset.hidden = 'true';
      }
    });

    // Scroll istantaneo al gruppo richiesto, dopo il primo paint
    requestAnimationFrame(() => {
      document
        .getElementById(`tema-${initial}`)
        ?.scrollIntoView({ behavior: 'auto', block: 'start' });
    });
  }, [temi]);

  return (
    <div
      role="group"
      aria-label="Filtra il catalogo per tema"
      className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-2 text-[11px] font-medium uppercase tabular-figures"
      style={{ letterSpacing: 'var(--tracking-micro)' }}
    >
      <FilterLink
        label="tutti"
        active={active === 'all'}
        onClick={() => applyFilter('all', true)}
      />
      {temi.map((t) => (
        <Fragment key={t.slug}>
          <span aria-hidden="true" className="text-muted/40">·</span>
          <FilterLink
            label={
              <>
                {t.short}{' '}
                <span className="text-muted tabular-figures">({t.count})</span>
              </>
            }
            active={active === t.slug}
            onClick={() => applyFilter(t.slug, true)}
          />
        </Fragment>
      ))}
    </div>
  );
}

function FilterLink({
  label,
  active,
  onClick,
}: {
  label: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-active={active || undefined}
      className={
        'inline-flex items-center transition-colors duration-150 ' +
        (active
          ? 'text-ink underline decoration-terracotta decoration-2 underline-offset-[6px]'
          : 'text-muted hover:text-ink hover:underline hover:decoration-terracotta/60 hover:underline-offset-[6px]')
      }
    >
      {label}
    </button>
  );
}
