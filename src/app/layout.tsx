import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import { Header } from '@/components/chrome/Header';
import { Footer } from '@/components/chrome/Footer';
import './globals.css';

const display = Space_Grotesk({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Vstodiu — production slate',
    template: '%s — Vstodiu',
  },
  description:
    'A one-person game studio. Four titles: what shipped, what is being built, and what is still on paper — with the real numbers.',
  // Vercel sets VERCEL_PROJECT_PRODUCTION_URL for you; set NEXT_PUBLIC_SITE_URL
  // once a custom domain is attached and it wins.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : 'http://localhost:3000'),
  ),
  openGraph: {
    title: 'Vstodiu — production slate',
    description: 'What shipped, what is being built, and what is still on paper.',
    type: 'website',
    images: ['/works/turn-off-the-light/cover.png'],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: '#0B0D10',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        {/* Scroll reveals start hidden and are shown by an observer. With no
            JavaScript that observer never runs, so force them visible. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink-750 focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-fg-hi"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
