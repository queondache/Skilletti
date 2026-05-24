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
        className="underline decoration-terracotta/40 decoration-1 underline-offset-4 hover:decoration-terracotta visited:decoration-muted/50"
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
    return <p className="leading-[1.6]">{children}</p>;
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

/**
 * Variante long-form per MDX editoriale (content/*.mdx) — workflow e
 * vocabolario didattica. Estende l'allowlist di Prose con h1/h2/h3, che
 * vengono demoti semanticamente a h3/h4/h5 (sezione padre = h2) e stilizzati
 * coerentemente con la tipografia editoriale del sito.
 *
 * Strippa i commenti JSX MDX (`{/* ... */ /*`) prima del rendering — markdown
 * non li riconosce e li mostrerebbe come testo letterale.
 */
const ARTICLE_ALLOWED: ReadonlyArray<string> = [...ALLOWED, 'h1', 'h2', 'h3'];

const ARTICLE_COMPONENTS: Components = {
  ...COMPONENTS,
  h1({ children }) {
    // # Markdown → h3 semantico, look "sottosezione editoriale"
    return (
      <h3
        className="mt-12 first:mt-0 text-[clamp(1.375rem,2vw,1.625rem)] font-semibold text-ink balance"
        style={{
          lineHeight: 1.2,
          letterSpacing: 'var(--tracking-display)',
          fontVariationSettings: '"opsz" 48',
        }}
      >
        {children}
      </h3>
    );
  },
  h2({ children }) {
    return (
      <h4 className="mt-10 first:mt-0 text-[1.1875rem] font-semibold text-ink balance" style={{ lineHeight: 1.25 }}>
        {children}
      </h4>
    );
  },
  h3({ children }) {
    return (
      <h5 className="mt-8 first:mt-0 text-[1.0625rem] font-semibold text-ink balance">{children}</h5>
    );
  },
  p({ children }) {
    // Paragrafi long-form: leading 1.6 (allineato al corpo delle card).
    // Il primo paragrafo dell'articolo (quando precede ogni heading — è il
    // caso del lede di pedagogia.mdx) diventa intro corsivo ink-soft, a
    // specchio delle intro di "essenziali" e "catalogo". `first:mt-0` azzera
    // il gap iniziale così tutti gli Article partono allo stesso modo.
    return (
      <p
        className="mt-5 first:mt-0 [&:first-child]:italic [&:first-child]:text-ink-soft max-w-[var(--measure-prose)] text-[1.0625rem] text-ink/85 prose-pretty"
        style={{ lineHeight: 1.6, fontVariationSettings: '"opsz" 24' }}
      >
        {children}
      </p>
    );
  },
};

export function Article({ children, className }: { children: string; className?: string }) {
  // Strippa commenti JSX MDX `{/* … */ /*`} — markdown li renderebbe letterali
  const cleaned = children.replace(/\{\/\*[\s\S]*?\*\/\}/g, '').trim();
  return (
    <div className={className}>
      <Markdown allowedElements={[...ARTICLE_ALLOWED]} unwrapDisallowed components={ARTICLE_COMPONENTS}>
        {cleaned}
      </Markdown>
    </div>
  );
}
