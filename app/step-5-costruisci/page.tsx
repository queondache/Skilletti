import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Metadata } from 'next';
import { Article } from '@/lib/markdown';
import { TemplateSection } from '@/components/TemplateSection';
import { Suggest } from '@/components/ui/Suggest';
import { StepFooterNav } from '@/components/StepFooterNav';
import { IconReveal } from '@/components/IconReveal';

// Step 5 — Costruisci. Metodo (content/workflow.mdx) + Template (i due file
// copiabili). Ridisegnato sul sistema Round 7. Chiude con la closing card.

const workflowMdx = readFileSync(resolve(process.cwd(), 'content/workflow.mdx'), 'utf-8');

const claudeBaseMd = readFileSync(
  resolve(process.cwd(), 'content/templates/claude-base.md'),
  'utf-8',
).trimEnd();

const specBaseMd = readFileSync(
  resolve(process.cwd(), 'content/templates/spec-base.md'),
  'utf-8',
).trimEnd();

export const metadata: Metadata = {
  title: 'Costruisci — metodo e template',
  description:
    'Come usare Claude.ai e Claude Code insieme, più i due file (CLAUDE.md e SPEC.md) per partire.',
  alternates: { canonical: '/step-5-costruisci' },
  openGraph: { url: '/step-5-costruisci', title: 'Costruisci · skilletti' },
};

export default function Step5Costruisci() {
  return (
    <main id="contenuto" className="relative bg-cream text-red">
      {/* Metodo */}
      <section className="relative pl-[var(--gutter-indent)] pr-[calc(7vw+var(--gutter-edge))] py-12 sm:py-16">
        <div
          className="flex items-center gap-2 text-[11px] font-medium uppercase tabular-figures text-soft"
          style={{ letterSpacing: 'var(--tracking-micro)' }}
        >
          <IconReveal icon="blocchi" className="h-4 w-4 text-red" />
          costruisci · passo 5
        </div>
        <h1
          data-reveal
          className="mt-2 text-[clamp(2rem,3.5vw,3rem)] font-bold text-red balance"
          style={{ lineHeight: 1.1, letterSpacing: 'var(--tracking-display)' }}
        >
          Il cervello e il braccio
        </h1>

        <div className="mt-8 max-w-[var(--measure-prose)] rounded-[var(--radius)] border border-line p-6 sm:p-8">
          <Article>{workflowMdx}</Article>
        </div>

        <div className="mt-10 max-w-[var(--measure-prose)]">
          <Suggest>
            La regola che mi fa risparmiare più tempo: <strong>mai codice</strong>{' '}
            nel prompt che incollo in Claude Code. Su Claude.ai decido cosa e
            perché; il codice lo scrive Claude Code, lì dove vivono i file. Tieni
            i due ruoli separati e smetti di rincorrerti.
          </Suggest>
        </div>
      </section>

      {/* Template */}
      <section className="relative pl-[var(--gutter-indent)] pr-[calc(7vw+var(--gutter-edge))] py-12 sm:py-16 border-t border-line">
        <div
          className="text-[11px] font-medium uppercase tabular-figures text-soft"
          style={{ letterSpacing: 'var(--tracking-micro)' }}
        >
          template
        </div>
        <h2
          data-reveal
          className="mt-2 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold text-red balance"
          style={{ lineHeight: 1.1, letterSpacing: 'var(--tracking-display)' }}
        >
          Due file per partire
        </h2>
        <TemplateSection claudeMd={claudeBaseMd} specMd={specBaseMd} />

        <StepFooterNav current={5} />
      </section>
    </main>
  );
}
