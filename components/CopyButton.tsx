'use client';

import { useCallback, useRef, useState } from 'react';

/**
 * Pulsante copia — unica parte client della scheda skill.
 *
 * Copia `text` negli appunti via navigator.clipboard, con feedback visivo
 * ("copia" → "copiato" per ~1.5s). Accessibile: type=button, aria-label
 * descrittivo, touch target ≥44px, focus-visible globale.
 *
 * Niente layout-shift: le due label ("copia"/"copiato") sono sovrapposte in
 * un grid 1×1, così il box mantiene sempre la larghezza della parola più
 * lunga ("copiato") e il cambio di stato non sposta nulla.
 *
 * `label` descrive COSA si copia, per l'aria-label degli screen reader
 * (default: "il comando di installazione" per le schede skill; la sezione
 * Template passa "il template CLAUDE.md" ecc.).
 */
export function CopyButton({
  text,
  label = 'il comando di installazione',
}: {
  text: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);
  // Timer per resettare lo stato "copiato" — ripulito tra un click e l'altro
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      // Errore loggato con contesto, mai silente (convenzione di progetto)
      console.error('CopyButton: copia negli appunti fallita', err);
    }
  }, [text]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? 'Copiato negli appunti' : `Copia ${label}`}
      className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-[11px] font-medium uppercase tabular-figures text-muted transition-colors hover:text-terracotta-deep"
      style={{ letterSpacing: 'var(--tracking-micro)' }}
    >
      {/* Grid 1×1 con label sovrapposte → larghezza fissa, zero layout-shift.
          Solo la label attiva è visibile; l'altra resta invisibile ma occupa
          la cella per fissare la larghezza del box. */}
      <span aria-hidden="true" className="grid">
        <span className={`col-start-1 row-start-1 ${copied ? 'invisible' : ''}`}>copia</span>
        <span className={`col-start-1 row-start-1 ${copied ? 'text-terracotta-deep' : 'invisible'}`}>
          copiato
        </span>
      </span>
    </button>
  );
}
