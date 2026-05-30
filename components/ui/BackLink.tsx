import Link from 'next/link';
import { ArrowLeftIcon } from '@/components/icons';

// BackLink — "back vero" per le viste di dettaglio (spec NAVIGAZIONE). Freccia
// outline + etichetta, accento rosso all'hover. Server component, nessun JS:
// è un Link interno classico (niente history.back, che si rompe in apertura
// diretta / static export).

export function BackLink({
  href,
  children,
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={
        'group inline-flex items-center gap-2 text-[13px] font-medium uppercase tabular-figures text-soft transition-colors hover:text-red ' +
        className
      }
      style={{ letterSpacing: 'var(--tracking-micro)' }}
    >
      <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
      {children}
    </Link>
  );
}
