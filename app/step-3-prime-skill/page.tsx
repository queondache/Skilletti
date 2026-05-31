'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { StarIcon, ArrowRightIcon } from '@/components/icons';

// Step 3 — Prime skill. Decisione (approvata): Esplora assorbe questo passo.
// La route resta fisica (6 route preservate) ma confluisce in /step-4-esplora:
// redirect lato client + fallback <noscript> e contenuto statico minimo, così
// non è mai una pagina bianca. Il menu mappa già step-3 → Esplora come attivo.
//
// `metadata` non è esportabile da un client component: il titolo è gestito dal
// template del layout; il contenuto statico qui sotto copre SEO/no-JS.

export default function Step3PrimeSkill() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/step-4-esplora/');
  }, [router]);

  return (
    <main id="contenuto" className="relative bg-cream text-red">
      <section className="relative flex min-h-[60vh] flex-col justify-center pl-[var(--gutter-indent)] pr-[calc(7vw+var(--gutter-edge))] py-16">
        <div
          className="flex items-center gap-2 text-[11px] font-medium uppercase tabular-figures text-soft"
          style={{ letterSpacing: 'var(--tracking-micro)' }}
        >
          <StarIcon className="h-4 w-4 text-red" />
          prime skill
        </div>
        <h1
          className="mt-2 text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-red balance"
          style={{ lineHeight: 1.1, letterSpacing: 'var(--tracking-display)' }}
        >
          Le prime skill vivono dentro Esplora
        </h1>
        <p
          className="mt-4 max-w-[var(--measure-prose)] text-[1.0625rem] text-soft prose-pretty"
          style={{ lineHeight: 1.6 }}
        >
          Ti stiamo portando al catalogo, dove le quattro essenziali sono
          evidenziate in cima. Se non succede nulla, vai pure a mano:
        </p>
        <p className="mt-6">
          <Link
            href="/step-4-esplora/"
            className="inline-flex items-center gap-2 text-[15px] font-semibold text-red underline decoration-red/50 underline-offset-4 hover:decoration-red"
          >
            Apri il catalogo
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </p>
      </section>
    </main>
  );
}
