import { CopyButton } from '@/components/CopyButton';

/**
 * Sezione "Come iniziare" — server component.
 *
 * Spiega a un pubblico non-dev (ma tech-friendly) come installare l'ambiente
 * per usare le skill del catalogo. Tre blocchi, uno per contesto d'uso —
 * gli stessi del filtro `dove_funziona`: CLI, VS Code, Mobile.
 *
 * Layout: blocchi in colonna a piena larghezza (max 820px, come la sezione
 * Template), separati da una hairline terracotta. Niente 3 colonne: i comandi
 * hanno bisogno di larghezza, affiancarli costringerebbe a scroll orizzontale.
 *
 * Comandi e URL sono verificati 1:1 contro la documentazione ufficiale
 * (code.claude.com, claude.com, apps.apple.com, play.google.com).
 *
 * I comandi shell stanno in blocchi mono con CopyButton (stesso componente
 * delle schede e dei template). Gli URL store/marketplace sono link reali,
 * non finti "comandi".
 */

const MICRO = 'text-[11px] font-medium uppercase tabular-figures text-muted';

// Riga comando copiabile — mono su carta scura + CopyButton a destra.
function CommandLine({ command, label }: { command: string; label: string }) {
  return (
    <div className="mt-2 flex items-center justify-between gap-3 rounded-sm bg-paper-deep px-4 py-3">
      <code
        className="min-w-0 overflow-x-auto whitespace-pre text-[0.8125rem] text-ink-soft"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {command}
      </code>
      <CopyButton text={command} label={label} />
    </div>
  );
}

// Link esterno in linea — accento terracotta, apertura in nuova scheda.
function LinkOut({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-terracotta-deep underline decoration-terracotta/40 underline-offset-[3px] transition-colors hover:decoration-terracotta"
    >
      {children}
    </a>
  );
}

// Un passo del blocco: micro-etichetta + corpo (testo, comandi, link).
function Step({ kicker, children }: { kicker: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 first:mt-7">
      <div className={MICRO} style={{ letterSpacing: 'var(--tracking-micro)' }}>
        {kicker}
      </div>
      <div
        className="mt-2 text-[1.0625rem] text-ink/85 prose-pretty"
        style={{ lineHeight: 1.6, fontVariationSettings: '"opsz" 24' }}
      >
        {children}
      </div>
    </div>
  );
}

// Un blocco contesto: numero terracotta + titolo + passi.
function SetupBlock({
  index,
  title,
  children,
}: {
  index: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline gap-3">
        <span
          aria-hidden="true"
          className="text-[0.9375rem] font-semibold tabular-figures text-terracotta"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          0{index}
        </span>
        <h3
          className="text-[1.25rem] font-semibold text-ink"
          style={{
            fontFamily: 'var(--font-display)',
            fontVariationSettings: '"opsz" 36',
          }}
        >
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

export function ComeIniziare() {
  return (
    <>
      {/* Mini-intro */}
      <p
        className="lead mt-4 max-w-[var(--measure-prose)] text-[1.0625rem] italic text-ink-soft prose-pretty"
        style={{ lineHeight: 1.6, fontVariationSettings: '"opsz" 24' }}
      >
        Le skill vivono dentro Claude Code. Prima di installarle ti serve
        l&rsquo;ambiente giusto: bastano pochi minuti. Scegli dove vuoi lavorare.
      </p>

      <div className="mt-10 flex max-w-[820px] flex-col gap-10">
        {/* ── 01 · Claude Code da terminale (CLI) ───────────────────────── */}
        <SetupBlock index={1} title="Claude Code da terminale">
          <Step kicker="prerequisito">
            Node.js 18 o superiore. Se non ce l&rsquo;hai, scaricalo da{' '}
            <LinkOut href="https://nodejs.org">nodejs.org</LinkOut> (versione
            LTS) e installalo: due clic, avanti-avanti.
          </Step>
          <Step kicker="installa">
            Apri il Terminale e incolla questo comando:
            <CommandLine
              command="npm install -g @anthropic-ai/claude-code"
              label="il comando di installazione di Claude Code"
            />
          </Step>
          <Step kicker="accedi">
            Lancia <code className="rounded-sm bg-paper-deep px-1 py-px not-italic" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9em' }}>claude</code>: si apre
            il browser per accedere col tuo account Claude (serve un piano Pro o
            Max).
            <CommandLine command="claude" label="il comando per avviare Claude Code" />
          </Step>
          <Step kicker="verifica">
            Per confermare che è tutto a posto:
            <CommandLine command="claude --version" label="il comando di verifica versione" />
          </Step>
          <Step kicker="da qui">
            Puoi installare tutte le skill di questa lista che hanno il tag{' '}
            <span className="font-medium text-ink">CLI</span>.
          </Step>
        </SetupBlock>

        <div aria-hidden="true" className="h-px w-full bg-terracotta/30" />

        {/* ── 02 · Estensione VS Code ───────────────────────────────────── */}
        <SetupBlock index={2} title="Estensione VS Code">
          <Step kicker="prerequisito">
            <LinkOut href="https://code.visualstudio.com">VS Code</LinkOut>{' '}
            installato (versione 1.98 o superiore).
          </Step>
          <Step kicker="installa">
            In VS Code apri il pannello Estensioni (
            <span className="font-medium text-ink">Cmd+Shift+X</span> su Mac,{' '}
            <span className="font-medium text-ink">Ctrl+Shift+X</span> su
            Windows/Linux), cerca <span className="font-medium text-ink">Claude Code</span> e
            premi Installa. In alternativa, dalla{' '}
            <LinkOut href="https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code">
              pagina del marketplace
            </LinkOut>
            .
          </Step>
          <Step kicker="apri">
            Clicca l&rsquo;icona <span className="font-medium text-ink">✱</span> (Spark) in alto a
            destra nell&rsquo;editor, oppure apri la Command Palette (
            <span className="font-medium text-ink">Cmd+Shift+P</span> /{' '}
            <span className="font-medium text-ink">Ctrl+Shift+P</span>) e scrivi
            &ldquo;Claude Code&rdquo;. Al primo avvio premi <span className="font-medium text-ink">Sign in</span> e
            accedi dal browser.
          </Step>
          <Step kicker="così funziona">
            Funziona come la CLI ma dentro VS Code. Stessi skill, stesso ambiente.
          </Step>
        </SetupBlock>

        <div aria-hidden="true" className="h-px w-full bg-terracotta/30" />

        {/* ── 03 · Mobile (iOS e Android) ───────────────────────────────── */}
        <SetupBlock index={3} title="Sul telefono">
          <Step kicker="scarica l'app">
            <span className="flex flex-wrap gap-x-6 gap-y-2">
              <LinkOut href="https://apps.apple.com/app/claude-by-anthropic/id6473753684">
                App Store (iPhone)
              </LinkOut>
              <LinkOut href="https://play.google.com/store/apps/details?id=com.anthropic.claude">
                Google Play (Android)
              </LinkOut>
            </span>
          </Step>
          <Step kicker="come funziona">
            Su mobile usi Claude.ai. Le skill segnate{' '}
            <span className="font-medium text-ink">Mobile</span> in questa lista
            funzionano qui. La maggior parte richiede CLI o VS Code.
          </Step>
        </SetupBlock>
      </div>
    </>
  );
}
