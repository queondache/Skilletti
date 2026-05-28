import type { Metadata, Viewport } from 'next';
import { fraunces, interTight, jetbrainsMono } from './fonts';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { Reveal } from '@/components/Reveal';
import './globals.css';

const SITE_URL = 'https://queondache.github.io/skilletti';
const TITLE = 'skilletti — Le migliori skill di Claude. Scelte a mano.';
const DESCRIPTION =
  'Un digest curato di skill di Claude. Massimo trenta, scelte e spiegate a una a una. Museo, non magazzino.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s · skilletti',
  },
  description: DESCRIPTION,
  authors: [{ name: 'Andrea Pesce' }],
  creator: 'Andrea Pesce',
  applicationName: 'skilletti',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: '/',
    siteName: 'skilletti',
    title: TITLE,
    description: DESCRIPTION,
    // og:image risolta automaticamente da app/opengraph-image.tsx
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#FAF6F0',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="it"
      className={`${fraunces.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-paper text-ink antialiased">
        <SiteHeader />
        <Reveal />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
