import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Metadata } from 'next';
import { Article } from '@/lib/markdown';
import { Suggest } from '@/components/ui/Suggest';
import { StepFooterNav } from '@/components/StepFooterNav';
import { BookIcon } from '@/components/icons';

// Step 1 — Capisci. Vocabolario migrato da v1 (content/pedagogia.mdx),
// ridisegnato sul sistema Round 7 (due colori, Bricolage+Hanken). Chiude con un
// suggerimento esplicito ("il mio consiglio", spec §Contenuto) + il navigatore.
// Trattamento markdown del monolite: togli l'h1 autonomo e promuovi ## → # così
// Article rende h3 (gerarchia h1 sezione → h3 sottosezioni).

const pedagogiaMdx = readFileSync(
  resolve(process.cwd(), 'content/pedagogia.mdx'),
  'utf-8',
)
  .replace(/^#\s+.+\n+/, '')
  .replace(/^##\s/gm, '# ');

export const metadata: Metadata = {
  title: 'Capisci — un piccolo vocabolario',
  description:
    'Le parole che servono per iniziare con Claude Code: skill, plugin, MCP, CLI. Spiegate semplici.',
  alternates: { canonical: '/step-1-capisci' },
  openGraph: { url: '/step-1-capisci', title: 'Capisci · skilletti' },
};

export default function Step1Capisci() {
  return (
    <main id="contenuto" className="relative bg-cream text-red">
      <section className="relative pl-[var(--gutter-indent)] pr-[calc(7vw+var(--gutter-edge))] py-12 sm:py-16">
        <div
          className="flex items-center gap-2 text-[11px] font-medium uppercase tabular-figures text-soft"
          style={{ letterSpacing: 'var(--tracking-micro)' }}
        >
          <BookIcon className="h-4 w-4 text-red" />
          capisci · passo 1
        </div>
        <h1
          data-reveal
          className="mt-2 text-[clamp(2rem,3.5vw,3rem)] font-bold text-red balance"
          style={{ lineHeight: 1.1, letterSpacing: 'var(--tracking-display)' }}
        >
          Un piccolo vocabolario
        </h1>
        <p
          className="mt-4 max-w-[var(--measure-prose)] text-[1.0625rem] italic text-soft prose-pretty"
          style={{ lineHeight: 1.6 }}
        >
          Quattro parole e sei a posto. Niente manuale: solo il minimo per
          orientarti prima di installare qualcosa.
        </p>

        <Article className="mt-10 max-w-[var(--measure-prose)]">{pedagogiaMdx}</Article>

        {/* Suggerimento esplicito — spec §Contenuto */}
        <div className="mt-12 max-w-[var(--measure-prose)]">
          <Suggest>
            Non cercare di memorizzare tutto. L&rsquo;unica parola che conta davvero
            all&rsquo;inizio è <strong>skill</strong>: il resto lo incontri
            strada facendo. Quando questa pagina ti annoia, è il segnale giusto per
            passare all&rsquo;installazione.
          </Suggest>
        </div>

        <StepFooterNav current={1} />
      </section>
    </main>
  );
}
