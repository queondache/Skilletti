import Markdown from 'react-markdown';
import type { Components } from 'react-markdown';
import { DRAFT_PREFIX } from '@/types/skill';

/**
 * Rilevamento marker di bozza nella descrizione_personale.
 *
 * Le schede in stato di prima stesura sono marcate da Andrea con
 * il prefisso "[BOZZA — Andrea rifinisce]". Il marker viene strippato
 * dal contenuto rendarizzato e segnalato da un badge separato sulla card.
 */
export function extractDraftMarker(raw: string): { content: string; isDraft: boolean } {
  const trimmed = raw.trimStart();
  if (trimmed.startsWith(DRAFT_PREFIX)) {
    return {
      content: trimmed.slice(DRAFT_PREFIX.length).trimStart(),
      isDraft: true,
    };
  }
  return { content: raw, isDraft: false };
}

/**
 * Allowlist stretta: solo tag tipografici minimi per descrizioni brevi.
 * Esclusi: img (no immagini nelle descrizioni), heading (gestiti dal layout),
 * table (eccessivo per il formato scheda), hr (estraneo allo stile),
 * html raw (sempre vietato in react-markdown).
 */
const ALLOWED: ReadonlyArray<string> = [
  'p',
  'em',
  'strong',
  'code',
  'pre',
  'ul',
  'ol',
  'li',
  'a',
  'blockquote',
];

/**
 * Override renderer dei pochi tag in cui ci serve disciplina extra:
 * - `<a>`: link esterni si aprono in nuovo tab con rel sicuro
 * - `<code>` inline: stile mono tenue (Fraunces non ha mono — usiamo
 *   stack di sistema)
 */
const COMPONENTS: Components = {
  a({ href, children, ...rest }) {
    const isExternal = typeof href === 'string' && /^https?:\/\//i.test(href);
    return (
      <a
        href={href}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="underline decoration-terracotta/40 decoration-1 underline-offset-4 hover:decoration-terracotta"
        {...rest}
      >
        {children}
      </a>
    );
  },
  code({ children, ...rest }) {
    return (
      <code
        className="rounded-sm bg-paper-deep px-1 py-px font-mono text-[0.9em] text-ink-soft"
        style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}
        {...rest}
      >
        {children}
      </code>
    );
  },
  // Forza paragrafi a sfruttare il sistema editoriale di leading
  p({ children }) {
    return <p className="leading-[1.65]">{children}</p>;
  },
};

/**
 * Wrapper sicuro per le descrizioni in skills.json.
 *
 * Accetta SOLO testo grezzo da `skills.json` (non da input utente runtime),
 * ma applichiamo comunque allowlist + nessun bypass HTML come difesa
 * in profondità. Nessun uso di rehype-raw, nessun innerHTML manuale.
 */
export function Prose({ children, className }: { children: string; className?: string }) {
  return (
    <div className={className}>
      <Markdown allowedElements={[...ALLOWED]} unwrapDisallowed components={COMPONENTS}>
        {children}
      </Markdown>
    </div>
  );
}
