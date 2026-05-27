import Link from 'next/link';
import { Wordmark } from '@/components/Wordmark';

// Header persistente minimale (Round 6 — wizard minimale): solo il wordmark
// "skilletti." linkato alla home. Niente menu, niente ancore. Il movimento
// tra gli step avviene via StepNav (prev/next) in fondo a ogni pagina.

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule/40 bg-paper/85 backdrop-blur-md">
      <div className="px-5 sm:pl-[var(--gutter-indent)] sm:pr-[calc(7vw+var(--gutter-edge))] py-3.5">
        <Link
          href="/"
          aria-label="skilletti — torna all'inizio"
          className="inline-block rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta focus-visible:outline-offset-2"
        >
          <Wordmark size="nav" />
        </Link>
      </div>
    </header>
  );
}
