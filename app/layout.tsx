import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Analytics } from '@/components/Analytics';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nudgeable.ai';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Nudgeable | Practical AI for Work',
    template: '%s | Nudgeable'
  },
  description: 'Corporate AI for Work training, AI Coach roleplays and the Actions Engine for practical workplace capability.',
  applicationName: 'Nudgeable',
  authors: [{ name: 'Gaurav Patel', url: 'https://www.linkedin.com/in/gauravpatel25/ai' }],
  creator: 'Nudgeable',
  publisher: 'Nudgeable',
  icons: {
    apple: '/icon.png'
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined
  },
  openGraph: {
    siteName: 'Nudgeable',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/assets/ai-practice-lab.png', width: 2048, height: 1176, alt: 'Nudgeable AI Practice Lab interface' }]
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/assets/ai-practice-lab.png']
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
  themeColor: '#FEFCFA'
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Nudgeable',
      url: siteUrl,
      logo: `${siteUrl}/brand/nudgeable-black.png`,
      description: 'Practical AI for Work training and products for corporate capability building.',
      email: 'team@nudgeable.ai',
      sameAs: [
        'https://x.com/gauravxlri',
        'https://www.linkedin.com/in/gauravpatel25',
        'https://www.youtube.com/@Gaurav-NudgeableAI',
        'https://www.instagram.com/gaurav.patel_gp'
      ]
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: 'Nudgeable',
      url: siteUrl,
      publisher: { '@id': `${siteUrl}/#organization` }
    }
  ]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en">
    <body>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <Analytics />
    </body>
  </html>;
}
