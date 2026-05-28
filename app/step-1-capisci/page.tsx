import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Metadata } from 'next';
import { Article } from '@/lib/markdown';
import { StepNav } from '@/components/StepNav';

// Step 1 — Capisci. Vocabolario migrato da v1 (content/pedagogia.mdx).
// Stesso trattamento markdown del monolite: togli l'h1 autonomo e promuovi
// ## → # così Article rende h3 (gerarchia h2 sezione → h3 sottosezioni).

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
    <main className="relative bg-paper text-ink">
      <section
        className="relative pl-[var(--gutter-indent)] pr-[calc(7vw+var(--gutter-edge))] min-[1440px]:pr-[calc(7vw+var(--gutter-edge)+8rem)] py-12 sm:py-20"
      >
        <div
          className="text-[11px] font-medium uppercase tabular-figures text-muted"
          style={{ letterSpacing: 'var(--tracking-micro)' }}
        >
          capisci
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
          Un piccolo vocabolario
        </h2>
        <Article className="mt-8">{pedagogiaMdx}</Article>

        <StepNav current={1} />
      </section>
    </main>
  );
}
