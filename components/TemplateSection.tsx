import { CopyButton } from '@/components/CopyButton';

/**
 * Sezione "Template" (Round 7) — i due file (CLAUDE.md e SPEC.md) come blocchi
 * di testo grezzo copiabili. Riceve il testo a build time (readFileSync nella
 * pagina). Non renderizzati come markdown: è esattamente ciò che l'utente copia
 * e incolla. Ogni blocco ha il CopyButton in alto a destra. Stile sul sistema
 * due-colori (box outline). Server component (solo CopyButton è client).
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
    <div className="rounded-[var(--radius)] border border-line p-5 sm:p-6">
      <div className="flex items-baseline justify-between gap-3">
        <h3
          className="text-[1.0625rem] font-semibold text-red"
          style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0' }}
        >
          {filename}
          <span className="sr-only"> — {label}</span>
        </h3>
        <CopyButton text={text} label={`il template ${filename}`} />
      </div>

      <pre
        className="mt-3 overflow-x-auto rounded-sm border border-line px-4 py-4 text-[0.8125rem] leading-[1.65] text-red/85"
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
      <p
        className="mt-4 max-w-[var(--measure-prose)] text-[1.0625rem] italic text-soft prose-pretty"
        style={{ lineHeight: 1.6 }}
      >
        Ogni progetto serio inizia con due file. Un{' '}
        <code
          className="not-italic"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9em' }}
        >
          CLAUDE.md
        </code>{' '}
        che dice a Claude come comportarsi mentre lavora con te, e un{' '}
        <code
          className="not-italic"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9em' }}
        >
          SPEC.md
        </code>{' '}
        che dice cosa stai costruendo. Li scrivi una volta, all&rsquo;inizio, e
        Claude li legge da solo a ogni sessione.
      </p>

      <div className="mt-10 flex max-w-[var(--measure-prose)] flex-col gap-6">
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

      <div className="mt-10 max-w-[var(--measure-prose)]">
        <div
          className="text-[11px] font-medium uppercase tabular-figures text-soft"
          style={{ letterSpacing: 'var(--tracking-micro)' }}
        >
          come usarli
        </div>
        <p
          className="mt-3 text-[1.0625rem] text-red/85 prose-pretty"
          style={{ lineHeight: 1.6 }}
        >
          Copia i due testi qui sopra, crea nella cartella del tuo progetto due
          file chiamati esattamente{' '}
          <code
            className="rounded-sm border border-line px-1 py-px"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9em' }}
          >
            CLAUDE.md
          </code>{' '}
          e{' '}
          <code
            className="rounded-sm border border-line px-1 py-px"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9em' }}
          >
            SPEC.md
          </code>
          , e incollaci dentro il contenuto. Riempi le parti tra parentesi quadre
          con le tue informazioni e cancella i commenti che non ti servono. Da
          quel momento, ogni volta che apri il progetto con Claude Code, lui legge
          questi due file prima di toccare qualsiasi cosa: sa già come comportarsi
          e cosa state costruendo, senza che tu glielo ripeta ogni volta.
        </p>
      </div>
    </>
  );
}
