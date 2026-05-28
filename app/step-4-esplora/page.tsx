import type { Metadata } from 'next';
import { Catalog, TEMA_ORDER } from '@/components/Catalog';
import { WordMap } from '@/components/WordMap';
import { ContextFilter, type CtxCounts } from '@/components/ContextFilter';
import { StepNav } from '@/components/StepNav';
import type { Skill } from '@/types/skill';
import skillsData from '@/data/skills.json';

// Step 4 — Esplora. Mappa parole (tema) + ContextFilter (contesto) + catalogo.
// La mappa parole è l'unico device tema (Summary "per tema" e CatalogControls
// ritirati). Mappa e contesto compongono in AND su attributi distinti.

const skills = skillsData as Skill[];
const nonEssenziali = skills.filter((s) => s.importanza !== 'essenziale');

const temi = TEMA_ORDER.map((t) => ({
  slug: t.slug,
  short: t.short,
  count: nonEssenziali.filter((s) => s.tema === t.match).length,
})).filter((t) => t.count > 0);

const ctxCounts: CtxCounts = {
  'claude-code': skills.filter((s) => s.dove_funziona.includes('claude-code')).length,
  'claude-in-vscode': skills.filter((s) => s.dove_funziona.includes('claude-in-vscode')).length,
  'claude-mobile': skills.filter((s) => s.dove_funziona.includes('claude-mobile')).length,
};

export const metadata: Metadata = {
  title: 'Esplora — il catalogo completo',
  description:
    'Tutte le skill di Claude raggruppate per tema, filtrabili per contesto (CLI, VS Code, mobile).',
  alternates: { canonical: '/step-4-esplora' },
  openGraph: { url: '/step-4-esplora', title: 'Esplora · skilletti' },
};

export default function Step4Esplora() {
  return (
    <main className="relative bg-paper text-ink">
      <section
        className="relative pl-[var(--gutter-indent)] pr-[calc(7vw+var(--gutter-edge))] min-[1440px]:pr-[calc(7vw+var(--gutter-edge)+8rem)] py-12 sm:py-20"
      >
        <div
          className="text-[11px] font-medium uppercase tabular-figures text-muted"
          style={{ letterSpacing: 'var(--tracking-micro)' }}
        >
          esplora
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
          Esplora per tema
        </h2>
        <p
          className="lead mt-4 max-w-[var(--measure-prose)] text-[1.0625rem] italic text-ink-soft prose-pretty"
          style={{ lineHeight: 1.6, fontVariationSettings: '"opsz" 24' }}
        >
          Scegli un tema sulla mappa per isolarlo, e &ldquo;mostra solo&rdquo; per
          filtrare anche per contesto d&rsquo;uso. Oppure scorri tutto.
        </p>

        {/* Mappa parole (tema) + filtro contesto */}
        <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] lg:items-center">
          <WordMap temi={temi} />
          <div className="lg:pt-2">
            <ContextFilter counts={ctxCounts} />
          </div>
        </div>

        <Catalog skills={skills} />

        <StepNav current={4} />
      </section>
    </main>
  );
}
