// Carico Fraunces via next/font — inlineata a build time, zero FOUT.
// Singolo font per tutta l'identità (display + body) → coesione editoriale
// e bundle ridotto. Variable font: copre weight 100-900 + opsz 9-144 + italic.
import { Fraunces } from 'next/font/google';

export const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz', 'SOFT'],
});
