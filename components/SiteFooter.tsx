// Footer globale (Round 7). Bio Andrea (placeholder, Andrea rifinisce), link
// LinkedIn (href segnaposto) e "chatta con Claude" → claude.ai. NESSUN link al
// repo (decisione di prodotto). Stile sul sistema due-colori.

export function SiteFooter() {
  return (
    <footer className="relative pl-[var(--gutter-indent)] pr-[calc(7vw+var(--gutter-edge))] py-12 border-t border-line">
      <p
        className="max-w-[var(--measure-prose)] text-[1.0625rem] text-soft prose-pretty"
        style={{ lineHeight: 1.6 }}
      >
        {/* PLACEHOLDER — bio reale in arrivo */}
        Skilletti è un progetto personale di Andrea Pesce: una guida curata a mano
        alle skill di Claude, pensata per gli amici che vogliono iniziare.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
        <a
          href="#"
          className="text-[12px] font-medium uppercase tabular-figures text-red/70 underline-offset-4 hover:text-red hover:underline"
          style={{ letterSpacing: 'var(--tracking-micro)' }}
        >
          LinkedIn
        </a>
        <a
          href="https://claude.ai"
          className="text-[12px] font-medium uppercase tabular-figures text-red underline-offset-4 hover:underline"
          style={{ letterSpacing: 'var(--tracking-micro)' }}
        >
          Se ti serve aiuto, chatta con Claude →
        </a>
      </div>

      <div
        className="mt-8 text-[11px] font-medium uppercase tabular-figures text-soft"
        style={{ letterSpacing: 'var(--tracking-micro)' }}
      >
        2026 · Andrea Pesce · curato a mano
      </div>
    </footer>
  );
}
