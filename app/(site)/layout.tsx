import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Header } from '@/components/Header';
import { getSiteSettings } from '@/content';
import './styles.css';
import './site.css';

export const metadata: Metadata = {
  title: { default: 'NYS Creative Academy', template: '%s — NYS Creative Academy' },
  description: 'Practical digital, creative and AI training for the youth of Abotakyi and Akuapem.',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const settings = await getSiteSettings();
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Mono&family=Manrope:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap"
        />
        <link rel="stylesheet" href="https://cdn.hugeicons.com/font/hgi-stroke-rounded.css" />
      </head>
      <body>
        <div className="site-shell">
          <Header settings={settings} />
          {children}
        </div>
      </body>
    </html>
  );
}
