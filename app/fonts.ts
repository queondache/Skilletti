// Sistema tipografico Round 7 — direzione "due colori caldi":
// - Bricolage Grotesque = display caratteriale (wordmark, titoli, numeri giganti).
// - Hanken Grotesk = body pulito e caldo (lettura, UI, micro-label).
// Entrambi inlineati a build time via next/font → zero FOUT. Nessuna dipendenza npm.
import { Bricolage_Grotesque, Hanken_Grotesk } from 'next/font/google';

export const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
  weight: ['400', '500', '700', '800'],
});

export const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
  display: 'swap',
  weight: ['400', '500', '600'],
});
