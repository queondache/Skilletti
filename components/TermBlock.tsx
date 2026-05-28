// TermBlock (Round 6, Fase C) — blocco terminale editoriale: la "firma"
// command-line della direzione, spostata dall'hero a /step-2-installa (casa
// naturale dei comandi). Decorativo-introduttivo; i comandi reali e copiabili
// restano in ComeIniziare. CSS only, niente JS.

type TermBlockProps = {
  command?: string;
  caption?: string;
};

export function TermBlock({
  command = 'npm i -g @anthropic-ai/claude-code',
  caption = 'Un comando per partire. Il resto qui sotto, passo per passo.',
}: TermBlockProps) {
  return (
    <div className="max-w-[640px]">
      <div className="overflow-hidden rounded-[var(--radius)] border border-rule bg-white shadow-[0_18px_44px_-28px_rgba(26,23,20,0.30)]">
        {/* barra finestra */}
        <div className="flex items-center gap-2 border-b border-rule px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rule" />
          <span className="h-2.5 w-2.5 rounded-full bg-rule" />
          <span className="h-2.5 w-2.5 rounded-full bg-rule" />
          <span
            className="ml-2 text-[11px] uppercase tabular-figures text-muted"
            style={{ letterSpacing: 'var(--tracking-micro)' }}
          >
            terminale
          </span>
        </div>
        {/* prompt */}
        <div className="px-4 py-4 font-mono text-[13.5px] leading-relaxed text-ink">
          <span className="select-none text-terracotta">❯ </span>
          <span>{command}</span>
        </div>
      </div>
      <p
        className="mt-3 text-[0.95rem] italic text-muted prose-pretty"
        style={{ fontVariationSettings: '"opsz" 24' }}
      >
        {caption}
      </p>
    </div>
  );
}
