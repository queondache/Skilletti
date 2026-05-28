import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Metadata } from 'next';
import { Article } from '@/lib/markdown';
import { TemplateSection } from '@/components/TemplateSection';
import { StepNav } from '@/components/StepNav';

// Step 5 — Costruisci. Metodo (content/workflow.mdx) + Template (i due file
// copiabili) migrati da v1. Chiude con la closing card (StepNav current=5).

const workflowMdx = readFileSync(
  resolve(process.cwd(), 'content/workflow.mdx'),
  'utf-8',
);

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
    <main className="relative bg-paper text-ink">
      {/* Metodo */}
      <section
        className="relative pl-[var(--gutter-indent)] pr-[calc(7vw+var(--gutter-edge))] min-[1440px]:pr-[calc(7vw+var(--gutter-edge)+8rem)] py-12 sm:py-20"
      >
        <div
          className="text-[11px] font-medium uppercase tabular-figures text-muted"
          style={{ letterSpacing: 'var(--tracking-micro)' }}
        >
          metodo
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
          Come uso Claude.ai e Claude Code insieme
        </h2>
        <Article className="mt-8">{workflowMdx}</Article>
      </section>

      {/* Template */}
      <section
        className="relative pl-[var(--gutter-indent)] pr-[calc(7vw+var(--gutter-edge))] min-[1440px]:pr-[calc(7vw+var(--gutter-edge)+8rem)] py-12 sm:py-20 border-t border-rule"
      >
        <div
          className="text-[11px] font-medium uppercase tabular-figures text-muted"
          style={{ letterSpacing: 'var(--tracking-micro)' }}
        >
          template
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
          Due file per partire
        </h2>
        <TemplateSection claudeMd={claudeBaseMd} specMd={specBaseMd} />

        <StepNav current={5} />
      </section>
    </main>
  );
}
