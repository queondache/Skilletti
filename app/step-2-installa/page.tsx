import type { Metadata } from 'next';
import { ComeIniziare } from '@/components/ComeIniziare';
import { StepNav } from '@/components/StepNav';

// Step 2 — Installa. Sezione "Come iniziare" migrata da v1 (setup CLI / VS Code
// / Mobile, comandi verificati). Componente invariato.

export const metadata: Metadata = {
  title: 'Installa — metti Claude Code sul tuo computer',
  description:
    'Come installare Claude Code: da riga di comando, in VS Code o da mobile. Comandi passo-passo.',
  alternates: { canonical: '/step-2-installa' },
  openGraph: { url: '/step-2-installa', title: 'Installa · skilletti' },
};

export default function Step2Installa() {
  return (
    <main className="relative bg-paper text-ink">
      <section
        className="relative pl-[var(--gutter-indent)] pr-[calc(7vw+var(--gutter-edge))] min-[1440px]:pr-[calc(7vw+var(--gutter-edge)+8rem)] py-12 sm:py-20"
      >
        <div
          className="text-[11px] font-medium uppercase tabular-figures text-muted"
          style={{ letterSpacing: 'var(--tracking-micro)' }}
        >
          installa
        </div>
        <h2
          data-reveal
          className="mt-2 text-[clamp(2rem,3.5vw,3rem)] font-semibold text-ink balance"
          style={{
            lineHeight: 1.1,
            letterSpacing: 'var(--tracking-display)',
            fontVariationSettings: '"opsz" 96',
          }}
        >
          Come iniziare
        </h2>
        <ComeIniziare />

        <StepNav current={2} />
      </section>
    </main>
  );
}
