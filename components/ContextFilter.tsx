'use client';

import { useCallback, useEffect, useState } from 'react';
import type { DoveFunziona } from '@/types/skill';

/**
 * Filtro per contesto d'uso — globale (agisce su essenziali + catalogo).
 *
 * "Mostra solo": tutti · CLI · VS Code · Mobile. Click → mostra solo le schede
 * il cui campo `dove_funziona` include il contesto scelto; le altre vengono
 * nascoste (display:none, collassano la griglia/colonna). I gruppi tema che
 * restano senza schede visibili spariscono (niente titoli orfani).
 *
 * Coesiste col filtro tema (CatalogControls): meccanismi distinti su attributi
 * diversi (`data-ctx-hidden` qui, `data-hidden` lì) → si compongono senza
 * conflitti. Esempio URL combinato: `?tema=design&ctx=vscode`.
 *
 * Stato in URL (`?ctx=vscode`), deep-link sharable. Pattern data-attribute sul
 * DOM come il filtro tema: nessun re-render delle schede, niente stato globale.
 *
 * Un toggle è reso solo se almeno una skill del JSON dichiara quel contesto
 * (conteggio > 0). Oggi nessuna skill gira sull'app mobile → il toggle Mobile
 * non compare; riapparirà da solo appena esisterà una skill con `claude-mobile`.
 */

type CtxSlug = 'all' | 'cli' | 'vscode' | 'mobile';

// slug URL ↔ valore enum dove_funziona
const SLUG_TO_VALUE: Record<Exclude<CtxSlug, 'all'>, DoveFunziona> = {
  cli: 'claude-code',
  vscode: 'claude-in-vscode',
  mobile: 'claude-mobile',
};

const TOGGLES: { slug: Exclude<CtxSlug, 'all'>; label: string }[] = [
  { slug: 'cli', label: 'CLI' },
  { slug: 'vscode', label: 'VS Code' },
  { slug: 'mobile', label: 'Mobile' },
];

export type CtxCounts = Record<DoveFunziona, number>;

export function ContextFilter({ counts }: { counts: CtxCounts }) {
  const [active, setActive] = useState<CtxSlug>('all');

  const apply = useCallback((slug: CtxSlug, pushUrl: boolean) => {
    setActive(slug);

    // Aggiorna URL (deep-link), senza ricaricare
    if (pushUrl) {
      const url = new URL(window.location.href);
      if (slug === 'all') url.searchParams.delete('ctx');
      else url.searchParams.set('ctx', slug);
      window.history.pushState({}, '', url.toString());
    }

    const value = slug === 'all' ? null : SLUG_TO_VALUE[slug];

    // Nascondi le schede che non includono il contesto scelto
    document.querySelectorAll<HTMLElement>('[data-skill-card]').forEach((card) => {
      const ctxs = (card.dataset.contexts ?? '').split(' ');
      if (value === null || ctxs.includes(value)) {
        delete card.dataset.ctxHidden;
      } else {
        card.dataset.ctxHidden = 'true';
      }
    });

    // Gruppi tema rimasti senza schede visibili → nascosti (niente titoli orfani)
    document.querySelectorAll<HTMLElement>('.tema-group').forEach((group) => {
      const visible = group.querySelectorAll(
        '[data-skill-card]:not([data-ctx-hidden])',
      ).length;
      if (visible === 0) group.dataset.ctxEmpty = 'true';
      else delete group.dataset.ctxEmpty;
    });
  }, []);

  // Inizializza da URL (?ctx=vscode) al mount — applica senza ri-pushare l'URL.
  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get('ctx');
    if (initial === 'cli' || initial === 'vscode' || initial === 'mobile') {
      // Mobile a 0 non è uno stato valido (svuoterebbe la pagina): ignora.
      if (initial === 'mobile' && counts['claude-mobile'] === 0) return;
      apply(initial, false);
    }
  }, [apply, counts]);

  return (
    <div role="group" aria-label="Mostra solo le skill per contesto d'uso">
      <div
        className="text-[11px] font-medium uppercase tabular-figures text-muted"
        style={{ letterSpacing: 'var(--tracking-micro)' }}
      >
        mostra solo
      </div>
      <div
        className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-2 text-[11px] font-medium uppercase tabular-figures"
        style={{ letterSpacing: 'var(--tracking-micro)' }}
      >
        <CtxLink
          label="tutti"
          active={active === 'all'}
          onClick={() => apply('all', true)}
        />
        {TOGGLES.filter((t) => counts[SLUG_TO_VALUE[t.slug]] > 0).map((t) => {
          const count = counts[SLUG_TO_VALUE[t.slug]];
          return (
            <span key={t.slug} className="inline-flex items-baseline gap-x-3">
              <span aria-hidden="true" className="text-muted/40">
                ·
              </span>
              <CtxLink
                label={t.label}
                count={count}
                active={active === t.slug}
                disabled={count === 0}
                onClick={() => apply(t.slug, true)}
              />
            </span>
          );
        })}
      </div>
    </div>
  );
}

function CtxLink({
  label,
  count,
  active,
  disabled = false,
  onClick,
}: {
  label: string;
  count?: number;
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      data-active={active || undefined}
      title={disabled ? 'Nessuna skill della lista gira su mobile, per ora' : undefined}
      className={
        'inline-flex items-baseline gap-x-1.5 transition-colors duration-150 ' +
        (disabled
          ? 'cursor-not-allowed text-muted/40'
          : active
            ? 'text-ink underline decoration-terracotta decoration-2 underline-offset-[6px]'
            : 'text-muted hover:text-ink hover:underline hover:decoration-terracotta/60 hover:underline-offset-[6px]')
      }
    >
      {label}
      {typeof count === 'number' && (
        <span className="text-muted tabular-figures">({count})</span>
      )}
    </button>
  );
}
