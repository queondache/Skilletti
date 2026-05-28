import type { MetadataRoute } from 'next';
import { STEPS } from '@/lib/steps';

// Sitemap statica generata a build time. Round 6: il sito è multi-route
// (landing + 5 step) → mappiamo le 6 route reali.
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
    ...STEPS.map((step) => ({
      url: `${SITE}${step.href}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];
}
