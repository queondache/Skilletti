// Loader Fraunces per next/og: scarica TTF da Google Fonts a build time.
// next/og non può usare next/font direttamente: serve ArrayBuffer raw del font.
// Build statico → fetch eseguito sulla macchina di build, output embed nel PNG.

type FraucesAxis = {
  weight: number;
  italic?: boolean;
};

// UA "Chrome 41": Google Fonts serve WOFF (non WOFF2) — Satori supporta WOFF,
// non WOFF2. Trick deterministico per ottenere un formato leggibile da next/og.
const UA = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36';

export async function loadFraunces({ weight, italic = false }: FraucesAxis): Promise<ArrayBuffer> {
  const params = new URLSearchParams({
    family: `Fraunces:ital,wght@${italic ? 1 : 0},${weight}`,
    display: 'swap',
  });
  const cssUrl = `https://fonts.googleapis.com/css2?${params.toString()}`;

  const css = await fetch(cssUrl, { headers: { 'User-Agent': UA } }).then((res) => {
    if (!res.ok) throw new Error(`Google Fonts CSS fetch failed: ${res.status}`);
    return res.text();
  });

  // Preferisci truetype/opentype, fallback su woff. Prendo il subset "latin"
  // (l'ultimo @font-face nella CSS) per coerenza visiva sull'OG italiano.
  const matches: Array<{ url: string; format: string }> = [];
  for (const m of css.matchAll(/src:\s*url\((https:\/\/[^)]+)\)\s*format\('([^']+)'\)/g)) {
    const url = m[1];
    const format = m[2];
    if (url && format) matches.push({ url, format });
  }
  const supported = matches.filter((m) => /^(truetype|opentype|woff)$/.test(m.format));
  const chosen = supported[supported.length - 1] ?? supported[0];

  if (!chosen) {
    throw new Error(
      `Fraunces ${weight} ${italic ? 'italic' : 'normal'} — nessun formato supportato (TTF/OTF/WOFF) nella CSS Google Fonts`,
    );
  }

  return fetch(chosen.url).then((res) => {
    if (!res.ok) throw new Error(`Fraunces font fetch failed: ${res.status}`);
    return res.arrayBuffer();
  });
}
