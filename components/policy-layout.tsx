import type { ReactNode } from 'react';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { PurchaseButton } from '@/components/publication-actions';
import { siteConfig } from '@/lib/site-config';

const links = [
  { kind: 'contact', label: 'Contact', href: siteConfig.contactUrl },
  { kind: 'privacy', label: 'Privacy', href: siteConfig.privacyUrl },
  { kind: 'terms', label: 'Purchase terms', href: siteConfig.termsUrl },
  { kind: 'refund', label: 'Refund policy', href: siteConfig.refundUrl },
] as const;

export function PolicyLayout({ title, intro, current, children }: {
  title: string;
  intro: string;
  current: typeof links[number]['kind'];
  children: ReactNode;
}) {
  return <>
    <header className="site-header"><nav className="wrap nav" aria-label="Publication navigation">
      <a href="/" className="wordmark">THE AI UNICORN<br />PROTOCOL<span>2027 EDITION</span></a>
      <a className="policy-back" href="/"><ArrowLeft size={15} aria-hidden="true" />Back to the book</a>
    </nav></header>
    <main id="main" className="wrap policy-main">
      <div className="policy-intro">
        <p className="eyebrow">PUBLICATION &amp; PURCHASE INFORMATION</p>
        <h1>{title}</h1><p className="policy-lead">{intro}</p>
        <p className="policy-date">Updated November 5, 2026</p>
      </div>
      <div className="policy-grid">
        <article className="policy-content">{children}</article>
        <aside className="policy-aside" aria-label="Book and purchase support">
          <div className="policy-book">
            <Image src="/images/cover-small.webp" width={80} height={120} alt="Official cover of The AI Unicorn Protocol — 2027 Edition" />
            <div><p>THE AI UNICORN<br />PROTOCOL</p><span>2027 Edition</span></div>
          </div>
          <dl className="policy-facts">
            <div><dt>Format</dt><dd>Digital PDF · 179 pages</dd></div>
            <div><dt>Price</dt><dd>$9 USD · One time</dd></div>
            <div><dt>Delivery</dt><dd>Email through Dodo Payments</dd></div>
          </dl>
          <PurchaseButton />
          <p className="policy-tax">Applicable taxes are shown at checkout.</p>
          <div className="policy-support"><span>PUBLISHER SUPPORT</span>
            <a href={'mailto:' + siteConfig.contactEmail}>{siteConfig.contactEmail}</a>
          </div>
        </aside>
      </div>
    </main>
    <footer className="wrap policy-footer">
      <a href="/">The AI Unicorn Protocol · 2027 Edition</a>
      <nav aria-label="Contact and policies">{links.map(link => <a key={link.kind} href={link.href} aria-current={current === link.kind ? 'page' : undefined}>{link.label}</a>)}</nav>
    </footer>
  </>;
}
