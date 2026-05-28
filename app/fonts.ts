// Sistema tipografico Round 6 — direzione "Terminale editoriale":
// - Fraunces = display (wordmark, titoli) + voce/body. Variable: opsz 9-144 + italic + SOFT.
// - Inter Tight = sans display per CTA e micro-label UPPERCASE (grottesco stretto, bold).
// - JetBrains Mono = comandi terminale (il motivo command-line).
// Tutte inlineate a build time via next/font → zero FOUT. Nessuna dipendenza npm.
import { Fraunces, Inter_Tight, JetBrains_Mono } from 'next/font/google';

export const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz', 'SOFT'],
});

export const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  display: 'swap',
  weight: ['500', '600', '700'],
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500', '700'],
});
