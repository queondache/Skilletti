import type { NextConfig } from 'next';

// Su GitHub Pages il sito vive sotto /skilletti, ma in locale serviamo `out/`
// da root → il basePath va attivato SOLO nella build CI per Pages.
// Convenzione: la GitHub Action setta PAGES_BASE_PATH=/skilletti prima del build.
// Build locale: variabile assente ⇒ basePath vuoto ⇒ asset servibili da `/`.
// Su Vercel il sito vive alla root del dominio *.vercel.app → basePath sempre
// vuoto, anche se PAGES_BASE_PATH fosse ereditato dall'ambiente. Vercel espone
// VERCEL=1 in build.
const isVercel = process.env.VERCEL === '1';
const basePath = isVercel ? '' : (process.env.PAGES_BASE_PATH ?? '');

const nextConfig: NextConfig = {
  output: 'export',
  // Pages serve come static — niente ottimizzazione immagini runtime.
  images: { unoptimized: true },
  // Forza /me/ → /me/index.html, evita redirect 308 in static hosting.
  trailingSlash: true,
  basePath,
  // Espongo basePath ai componenti per costruire URL asset corretti.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  reactStrictMode: true,
};

export default nextConfig;
