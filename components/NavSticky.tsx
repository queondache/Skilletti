'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Wordmark } from '@/components/Wordmark';

// Menu di vetrina sticky — sempre presente (spec NAVIGAZIONE: "Menu sticky
// sempre presente"). Quattro voci: Capisci · Installa · Esplora · Costruisci.
// La voce attiva è derivata dal pathname. La route step-3 (prime-skill) viene
// considerata "Esplora" perché vi confluisce (decisione: Esplora assorbe
// step-3). Wordmark a sinistra → home, voci a destra.
//
// Client component perché legge il pathname per evidenziare la voce attiva. Il
// movimento si limita a un cambio colore (calmo, niente animazioni pesanti).

type Item = { href: string; label: string; matches: string[] };

const ITEMS: Item[] = [
  { href: '/step-1-capisci/', label: 'Capisci', matches: ['/step-1-capisci'] },
  { href: '/step-2-installa/', label: 'Installa', matches: ['/step-2-installa'] },
  // Esplora è attivo anche su step-3 (vi confluisce) e sulle pagine /skill/*.
  { href: '/step-4-esplora/', label: 'Esplora', matches: ['/step-4-esplora', '/step-3-prime-skill', '/skill'] },
  { href: '/step-5-costruisci/', label: 'Costruisci', matches: ['/step-5-costruisci'] },
];

export function NavSticky() {
  const pathname = usePathname() ?? '/';

  const isActive = (item: Item) =>
    item.matches.some((m) => pathname === m || pathname.startsWith(m + '/'));

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/90 backdrop-blur-md">
      <nav
        aria-label="Navigazione principale"
        className="flex items-center justify-between gap-4 px-5 sm:pl-[var(--gutter-indent)] sm:pr-[calc(7vw+var(--gutter-edge))] py-3"
      >
        <Link
          href="/"
          aria-label="skilletti — torna all'inizio"
          className="inline-block rounded-sm"
        >
          <Wordmark size="nav" />
        </Link>

        <ul
          className="flex flex-wrap items-baseline justify-end gap-x-4 gap-y-1 sm:gap-x-6 text-[12px] sm:text-[13px] font-medium uppercase tabular-figures"
          style={{ letterSpacing: 'var(--tracking-micro)' }}
        >
          {ITEMS.map((item) => {
            const active = isActive(item);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={
                    'transition-colors duration-150 ' +
                    (active
                      ? 'text-red underline decoration-red decoration-2 underline-offset-[6px]'
                      : 'text-soft hover:text-red')
                  }
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
