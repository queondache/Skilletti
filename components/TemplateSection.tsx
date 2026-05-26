import { CopyButton } from '@/components/CopyButton';

/**
 * Sezione "Template" della home — server component.
 *
 * Riceve il testo grezzo dei due file template (CLAUDE.md e SPEC.md) come
 * props, letti a build time in app/page.tsx con readFileSync (stesso pattern
 * di workflow.mdx / pedagogia.mdx).
 *
 * I due template NON sono renderizzati come markdown: mostriamo il testo
 * grezzo in un blocco <pre><code> monospace, perché è esattamente ciò che
 * l'utente deve copiare e incollare nel suo progetto. Ogni blocco ha il
 * CopyButton in alto a destra (stesso componente delle schede skill).
 *
 * Layout: i due blocchi stanno in colonna (uno sopra l'altro), non
 * side-by-side. Sono template di file lunghi e con righe larghe: affiancarli
 * dimezzerebbe la larghezza e moltiplicherebbe lo scroll orizzontale,
 * rovinando la leggibilità. In colonna ogni template respira a piena
 * larghezza. Su mobile vale lo stesso, con overflow-x sul blocco per non
 * rompere il layout.
 */

function TemplateBlock({
  label,
  filename,
  text,
}: {
  label: string;
  filename: string;
  text: string;
}) {
  return (
    <div>
      {/* Intestazione del blocco: nome file (h3) + pulsante copia */}
      <div className="flex items-baseline justify-between gap-3">
        <h3
          className="text-[1.0625rem] font-semibold text-ink"
          style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0' }}
        >
          {filename}
          {/* Etichetta accessibile: dice a cosa serve il file, letta dagli
              screen reader ma anche utile visivamente come sottotitolo. */}
          <span className="sr-only"> — {label}</span>
        </h3>
        <CopyButton text={text} label={`il template ${filename}`} />
      </div>

      {/* Blocco codice — testo grezzo del template, mono, sfondo carta scura.
          overflow-x-auto per non rompere il layout su righe lunghe / mobile. */}
      <pre
        className="mt-3 overflow-x-auto rounded-sm bg-paper-deep px-4 py-4 text-[0.8125rem] leading-[1.65] text-ink-soft"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        <code>{text}</code>
      </pre>
    </div>
  );
}

export function TemplateSection({
  claudeMd,
  specMd,
}: {
  claudeMd: string;
  specMd: string;
}) {
  return (
    <>
      {/* Mini-intro */}
      <p
        className="lead mt-4 max-w-[var(--measure-prose)] text-[1.0625rem] italic text-ink-soft prose-pretty"
        style={{
          lineHeight: 1.6,
          fontVariationSettings: '"opsz" 24',
        }}
      >
        Ogni progetto serio inizia con due file. Un <code className="not-italic" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9em' }}>CLAUDE.md</code>{' '}
        che dice a Claude come comportarsi mentre lavora con te, e un{' '}
        <code className="not-italic" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9em' }}>SPEC.md</code>{' '}
        che dice cosa stai costruendo. Li scrivi una volta, all&rsquo;inizio, e
        Claude li legge da solo a ogni sessione.
      </p>

      {/* I due template in colonna, a piena larghezza */}
      <div className="mt-10 flex max-w-[820px] flex-col gap-10">
        <TemplateBlock
          filename="CLAUDE.md"
          label="dice a Claude come comportarsi"
          text={claudeMd}
        />
        <TemplateBlock
          filename="SPEC.md"
          label="dice cosa stai costruendo"
          text={specMd}
        />
      </div>

      {/* Come usarli */}
      <div className="mt-10 max-w-[var(--measure-prose)]">
        <div
          className="text-[11px] font-medium uppercase tabular-figures text-muted"
          style={{ letterSpacing: 'var(--tracking-micro)' }}
        >
          come usarli
        </div>
        <p
          className="mt-3 text-[1.0625rem] text-ink/85 prose-pretty"
          style={{ lineHeight: 1.6, fontVariationSettings: '"opsz" 24' }}
        >
          Copia i due testi qui sopra, crea nella cartella del tuo progetto due
          file chiamati esattamente <code className="rounded-sm bg-paper-deep px-1 py-px" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9em' }}>CLAUDE.md</code> e{' '}
          <code className="rounded-sm bg-paper-deep px-1 py-px" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9em' }}>SPEC.md</code>, e incollaci dentro
          il contenuto. Riempi le parti tra parentesi quadre con le tue
          informazioni e cancella i commenti che non ti servono. Da quel momento,
          ogni volta che apri il progetto con Claude Code, lui legge questi due
          file prima di toccare qualsiasi cosa: sa già come comportarsi e cosa
          state costruendo, senza che tu glielo ripeta ogni volta.
        </p>
      </div>
    </>
  );
}
