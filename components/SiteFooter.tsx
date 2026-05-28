// Footer globale (Round 6). Bio Andrea PLACEHOLDER (Andrea riscrive in Round 7),
// link LinkedIn (href segnaposto) e "chatta con Claude" → claude.ai.
// NESSUN link al repo (decisione di prodotto). Stile sobrio coerente v1.

export function SiteFooter() {
  return (
    <footer className="relative pl-[var(--gutter-indent)] pr-[calc(7vw+var(--gutter-edge))] min-[1440px]:pr-[calc(7vw+var(--gutter-edge)+8rem)] py-12 border-t border-rule">
      <p
        className="max-w-[var(--measure-prose)] text-[1.0625rem] text-ink-soft prose-pretty"
        style={{ lineHeight: 1.6, fontVariationSettings: '"opsz" 24' }}
      >
        {/* PLACEHOLDER — bio reale in Round 7 */}
        Skilletti è un progetto personale di Andrea Pesce: una guida curata a mano
        alle skill di Claude, pensata per gli amici che vogliono iniziare.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
        <a
          href="#"
          className="text-[12px] font-medium uppercase tabular-figures text-ink/70 underline-offset-4 hover:text-ink hover:underline"
          style={{ letterSpacing: 'var(--tracking-micro)' }}
        >
          LinkedIn
        </a>
        <a
          href="https://claude.ai"
          className="text-[12px] font-medium uppercase tabular-figures text-terracotta-deep underline-offset-4 hover:underline"
          style={{ letterSpacing: 'var(--tracking-micro)' }}
        >
          Se ti serve aiuto, chatta con Claude →
        </a>
      </div>

      <div
        className="mt-8 text-[11px] font-medium uppercase tabular-figures text-muted"
        style={{ letterSpacing: 'var(--tracking-micro)' }}
      >
        2026 · Andrea Pesce · curato a mano
      </div>
    </footer>
  );
}
