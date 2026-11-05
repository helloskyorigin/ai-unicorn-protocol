'use client';
import { useEffect, useState, type ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export function PurchaseButton({ className = '' }: { className?: string }) {
  return <a className={`button button-primary ${className}`} href={siteConfig.checkoutUrl}>{siteConfig.purchaseLabel}<ArrowUpRight size={17} aria-hidden="true" /></a>;
}
export function PublisherLink({ kind, children }: { kind: 'contact' | 'privacy' | 'terms' | 'refund'; children: ReactNode }) {
  const target = kind === 'contact' ? siteConfig.contactUrl :
    kind === 'privacy' ? siteConfig.privacyUrl : kind === 'terms' ? siteConfig.termsUrl : siteConfig.refundUrl;
  return <a href={target}>{children}</a>;
}
export function StickyPurchase() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const hero = document.getElementById('hero');
    const purchase = document.getElementById('purchase');
    if (!hero || !purchase) return;
    let pastHero = false; let atPurchase = false;
    const update = () => setVisible(pastHero && !atPurchase);
    const heroObserver = new IntersectionObserver(([entry]) => { pastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0; update(); });
    const purchaseObserver = new IntersectionObserver(([entry]) => { atPurchase = entry.isIntersecting; update(); }, { threshold: 0.08 });
    heroObserver.observe(hero); purchaseObserver.observe(purchase);
    return () => { heroObserver.disconnect(); purchaseObserver.disconnect(); };
  }, []);
  return <div className={`sticky-purchase ${visible ? 'is-visible' : ''}`} aria-hidden={!visible} inert={!visible}>
    <PurchaseButton />
  </div>;
}
