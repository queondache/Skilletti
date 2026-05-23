import { Hero } from '@/components/Hero';
import { SkillCard } from '@/components/SkillCard';
import { MOCK_SKILLS } from '@/lib/mock-skills';

/**
 * Home — single-page con ancore (vedi SPEC §7).
 *
 * Stato Fase 2 (pre-seed):
 *  - Hero asimmetrico (Fase 1)
 *  - Anteprima SkillCard con 2 mock (sostituiti quando arriva
 *    `data/skills.json` con il seed di Andrea)
 *  - "Parti da qui" / Catalogo / Pedagogia: placeholder testuali,
 *    completati nelle prossime fasi
 *
 * Il footer firma e la colonna paper-deep di rilegatura vivono nel layout
 * della pagina (non più dentro l'hero) → coprono tutta la scrollata.
 */
export default function HomePage() {
  return (
    <main className="relative bg-paper text-ink overflow-hidden">
      {/* Rilegatura editoriale — colonna paper-deep full-page (non solo hero) */}
      <aside
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-[7vw] min-w-[48px] bg-paper-deep border-l border-rule/60"
      />

      <Hero />

      {/* Anteprima SkillCard — temporaneo, sostituito dal catalogo reale al seed.
          Indent editoriale identico all'hero per coerenza visiva. */}
      <section
        id="anteprima"
        className="relative pl-[var(--gutter-indent)] pr-[calc(7vw+var(--gutter-edge))] py-24"
      >
        {/* Eyebrow + titolo sezione — micro-label sopra, serif sotto */}
        <div
          className="text-[11px] font-medium uppercase tabular-figures text-muted"
          style={{ letterSpacing: 'var(--tracking-micro)' }}
        >
          anteprima · pre-seed
        </div>
        <h2
          className="mt-2 text-[clamp(2rem,3.5vw,3rem)] font-semibold text-ink balance"
          style={{
            lineHeight: 1.1,
            letterSpacing: 'var(--tracking-display)',
            fontVariationSettings: '"opsz" 96',
          }}
        >
          Anteprima di una scheda
        </h2>
        <p
          className="mt-4 max-w-[var(--measure-prose)] text-[1.0625rem] italic text-ink-soft prose-pretty"
          style={{
            lineHeight: 1.55,
            fontVariationSettings: '"opsz" 24',
          }}
        >
          Le voci qui sotto sono <em>mock</em>: servono a validare l&rsquo;impaginazione
          della scheda prima che arrivi il seed reale di Andrea. Andrea le sostituirà
          con le sue, una a una.
        </p>

        <div className="mt-10 max-w-[820px]">
          {MOCK_SKILLS.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </section>

      {/* Placeholder testuale "Parti da qui" — render reale arriva al seed */}
      <section
        id="parti-da-qui"
        className="relative pl-[var(--gutter-indent)] pr-[calc(7vw+var(--gutter-edge))] py-24 border-t border-rule"
      >
        <div
          className="text-[11px] font-medium uppercase tabular-figures text-muted"
          style={{ letterSpacing: 'var(--tracking-micro)' }}
        >
          in arrivo
        </div>
        <h2
          className="mt-2 text-[clamp(2rem,3.5vw,3rem)] font-semibold text-ink balance"
          style={{
            lineHeight: 1.1,
            letterSpacing: 'var(--tracking-display)',
            fontVariationSettings: '"opsz" 96',
          }}
        >
          Parti da qui
        </h2>
        <p
          className="mt-4 max-w-[var(--measure-prose)] text-[1.0625rem] italic text-ink-soft prose-pretty"
          style={{
            lineHeight: 1.55,
            fontVariationSettings: '"opsz" 24',
          }}
        >
          Le cinque skill essenziali per chi inizia. La sezione apparirà
          quando Andrea consegnerà il seed di <code className="rounded-sm bg-paper-deep px-1 py-px font-mono text-[0.9em]" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>data/skills.json</code>.
        </p>
      </section>

      {/* Firma — fondo pagina, non più dentro l'hero */}
      <footer
        className="relative pl-[var(--gutter-indent)] pr-[calc(7vw+var(--gutter-edge))] py-12 border-t border-rule"
      >
        <div
          className="text-[11px] font-medium uppercase tabular-figures text-ink/65"
          style={{ letterSpacing: 'var(--tracking-micro)' }}
        >
          2026 · Andrea Pesce · curato a mano
        </div>
      </footer>
    </main>
  );
}
