import type { MetadataRoute } from 'next';

// Sitemap statica generata a build time. Skilletti vive in una pagina sola con
// ancore semantiche → mappiamo home + ancore principali per dare segnale ai
// crawler su cosa contiene il sito.
const SITE = 'https://queondache.github.io/skilletti';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${SITE}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE}/#parti-da-qui`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE}/#catalogo`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE}/#didattica`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
