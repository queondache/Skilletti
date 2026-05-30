import type { Metadata } from 'next';
import { ComeIniziare } from '@/components/ComeIniziare';
import { Suggest } from '@/components/ui/Suggest';
import { StepFooterNav } from '@/components/StepFooterNav';
import { IconReveal } from '@/components/IconReveal';

// Step 2 — Installa. "Come iniziare" ridisegnato (3 opzioni come card outline,
// comandi copiabili verificati) + Suggest che consiglia l'estensione VS Code
// per iniziare (spec CONTENUTO).

export const metadata: Metadata = {
  title: 'Installa — metti Claude Code sul tuo computer',
  description:
    'Come installare Claude Code: da riga di comando, in VS Code o da mobile. Comandi passo-passo.',
  alternates: { canonical: '/step-2-installa' },
  openGraph: { url: '/step-2-installa', title: 'Installa · skilletti' },
};

export default function Step2Installa() {
  return (
    <main id="contenuto" className="relative bg-cream text-red">
      <section className="relative pl-[var(--gutter-indent)] pr-[calc(7vw+var(--gutter-edge))] py-12 sm:py-16">
        <div
          className="flex items-center gap-2 text-[11px] font-medium uppercase tabular-figures text-soft"
          style={{ letterSpacing: 'var(--tracking-micro)' }}
        >
          <IconReveal icon="terminale" className="h-4 w-4 text-red" />
          installa · passo 2
        </div>
        <h1
          data-reveal
          className="mt-2 text-[clamp(2rem,3.5vw,3rem)] font-bold text-red balance"
          style={{ lineHeight: 1.1, letterSpacing: 'var(--tracking-display)' }}
        >
          Come iniziare
        </h1>
        <p
          className="mt-4 max-w-[var(--measure-prose)] text-[1.0625rem] italic text-soft prose-pretty"
          style={{ lineHeight: 1.6 }}
        >
          Le skill vivono dentro Claude Code. Prima di installarle ti serve
          l&rsquo;ambiente giusto: bastano pochi minuti. Scegli dove vuoi lavorare.
        </p>

        {/* Suggerimento esplicito — VS Code per iniziare */}
        <div className="mt-8 max-w-[var(--measure-prose)]">
          <Suggest>
            Se è la tua prima volta, parti dall&rsquo;<strong>estensione VS Code</strong>{' '}
            (opzione 02): hai tutto sotto gli occhi — l&rsquo;editor, i file, Claude
            che lavora di fianco — senza dover prendere confidenza col terminale.
            Alla riga di comando ci arrivi dopo, quando ti sentirai pronto.
          </Suggest>
        </div>

        <ComeIniziare />

        <StepFooterNav current={2} />
      </section>
    </main>
  );
}
