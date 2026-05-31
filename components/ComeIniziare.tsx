import { CopyButton } from '@/components/CopyButton';

/**
 * "Come iniziare" — Round 7. Tre opzioni (CLI / VS Code / Mobile) come card
 * outline sul sistema due-colori. I comandi restano copiabili (CopyButton) e
 * verificati 1:1 contro la documentazione ufficiale (code.claude.com,
 * claude.com, apps.apple.com, play.google.com). Gli URL store/marketplace sono
 * link reali.
 *
 * Server component: solo CopyButton è client.
 */

const MICRO = 'text-[11px] font-medium uppercase tabular-figures text-soft';

// Riga comando copiabile — mono in box outline + CopyButton a destra.
function CommandLine({ command, label }: { command: string; label: string }) {
  return (
    <div className="mt-2 flex items-center justify-between gap-3 rounded-sm border border-line px-4 py-2.5">
      <code
        className="min-w-0 overflow-x-auto whitespace-pre text-[0.8125rem] text-red/85"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {command}
      </code>
      <CopyButton text={command} label={label} />
    </div>
  );
}

// Link esterno in linea — accento rosso, apertura in nuova scheda.
function LinkOut({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-red underline decoration-red/40 underline-offset-[3px] transition-colors hover:decoration-red"
    >
      {children}
    </a>
  );
}

// Un passo del blocco: micro-etichetta + corpo (testo, comandi, link).
function Step({ kicker, children }: { kicker: string; children: React.ReactNode }) {
  return (
    <div className="mt-5 first:mt-6">
      <div className={MICRO} style={{ letterSpacing: 'var(--tracking-micro)' }}>
        {kicker}
      </div>
      <div className="mt-1.5 text-[1.0625rem] text-red/85 prose-pretty" style={{ lineHeight: 1.6 }}>
        {children}
      </div>
    </div>
  );
}

// Una card-opzione: numero + titolo + passi, dentro un outline morbido.
function SetupCard({
  index,
  title,
  children,
}: {
  index: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[var(--radius)] border border-line p-6 sm:p-7">
      <div className="flex items-baseline gap-3">
        <span
          aria-hidden="true"
          className="font-display text-[1.25rem] font-bold tabular-figures text-red/70"
        >
          0{index}
        </span>
        <h2
          className="text-[1.25rem] font-semibold text-red"
          style={{ fontFamily: 'var(--font-display)', letterSpacing: 'var(--tracking-display)' }}
        >
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

export function ComeIniziare() {
  return (
    <div className="mt-10 flex max-w-[var(--measure-prose)] flex-col gap-6">
      {/* ── 01 · Claude Code da terminale (CLI) ───────────────────────── */}
      <SetupCard index={1} title="Claude Code da terminale">
        <Step kicker="prerequisito">
          Node.js 18 o superiore. Se non ce l&rsquo;hai, scaricalo da{' '}
          <LinkOut href="https://nodejs.org">nodejs.org</LinkOut> (versione LTS) e
          installalo: due clic, avanti-avanti.
        </Step>
        <Step kicker="installa">
          Apri il Terminale e incolla questo comando:
          <CommandLine
            command="npm install -g @anthropic-ai/claude-code"
            label="il comando di installazione di Claude Code"
          />
        </Step>
        <Step kicker="accedi">
          Lancia{' '}
          <code
            className="rounded-sm border border-line px-1 py-px not-italic"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9em' }}
          >
            claude
          </code>
          : si apre il browser per accedere col tuo account Claude (serve un piano
          Pro o Max).
          <CommandLine command="claude" label="il comando per avviare Claude Code" />
        </Step>
        <Step kicker="verifica">
          Per confermare che è tutto a posto:
          <CommandLine command="claude --version" label="il comando di verifica versione" />
        </Step>
        <Step kicker="da qui">
          Puoi installare tutte le skill di questa lista che hanno il tag{' '}
          <span className="font-medium text-red">CLI</span>.
        </Step>
      </SetupCard>

      {/* ── 02 · Estensione VS Code ───────────────────────────────────── */}
      <SetupCard index={2} title="Estensione VS Code">
        <Step kicker="prerequisito">
          <LinkOut href="https://code.visualstudio.com">VS Code</LinkOut> installato
          (versione 1.98 o superiore).
        </Step>
        <Step kicker="installa">
          In VS Code apri il pannello Estensioni (
          <span className="font-medium text-red">Cmd+Shift+X</span> su Mac,{' '}
          <span className="font-medium text-red">Ctrl+Shift+X</span> su
          Windows/Linux), cerca <span className="font-medium text-red">Claude Code</span> e
          premi Installa. In alternativa, dalla{' '}
          <LinkOut href="https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code">
            pagina del marketplace
          </LinkOut>
          .
        </Step>
        <Step kicker="apri">
          Clicca l&rsquo;icona <span className="font-medium text-red">✱</span> (Spark) in
          alto a destra nell&rsquo;editor, oppure apri la Command Palette (
          <span className="font-medium text-red">Cmd+Shift+P</span> /{' '}
          <span className="font-medium text-red">Ctrl+Shift+P</span>) e scrivi
          &ldquo;Claude Code&rdquo;. Al primo avvio premi{' '}
          <span className="font-medium text-red">Sign in</span> e accedi dal browser.
        </Step>
        <Step kicker="così funziona">
          Funziona come la CLI ma dentro VS Code. Stesse skill, stesso ambiente.
        </Step>
      </SetupCard>

      {/* ── 03 · Mobile (iOS e Android) ───────────────────────────────── */}
      <SetupCard index={3} title="Sul telefono">
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
          <span className="font-medium text-red">Mobile</span> in questa lista
          funzionano qui. La maggior parte richiede CLI o VS Code.
        </Step>
      </SetupCard>
    </div>
  );
}
