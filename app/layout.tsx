import type { Metadata, Viewport } from 'next';
import { siteConfig } from '@/lib/site-config';
import './globals.css';
export const metadata: Metadata = {
  ...(siteConfig.siteUrl ? { metadataBase: new URL(siteConfig.siteUrl), alternates: { canonical: '/' } } : {}),
  title: 'The AI Unicorn Protocol — 2027 Edition | AI Startup Field Guide',
  description: 'A practical 179-page field guide to AI startup opportunities, customer validation, product development, distribution, and building a scalable business.',
  openGraph: { title: 'The AI Unicorn Protocol — 2027 Edition', description: 'Find the opportunity. Build the product. Win the market. A 179-page practical field guide for AI founders.', type: 'website', images: [{ url: '/images/share.jpg', width: 1200, height: 630, alt: 'The official cover of The AI Unicorn Protocol, 2027 Edition' }] },
  twitter: { card: 'summary_large_image', title: 'The AI Unicorn Protocol — 2027 Edition', images: ['/images/share.jpg'] },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#f8f6f0' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>;
}
