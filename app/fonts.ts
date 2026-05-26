// Sistema tipografico duplice (Round 3):
// - Fraunces = display + voce (wordmark, titoli h1-h3, taglini italic).
//   Variable: copre weight 100-900 + opsz 9-144 + italic.
// - Geist = body (paragrafi, micro-label, dati, badge): grottesco moderno,
//   regge linee più lunghe e densità informativa meglio del serif.
// - Geist Mono = comando d'installazione.
// Tutte inlineate a build time via next/font → zero FOUT. Fallback: Inter
// (vedi --font-body in globals.css) → system sans.
import { Fraunces, Geist, Geist_Mono } from 'next/font/google';

export const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz', 'SOFT'],
});

export const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

export const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});
