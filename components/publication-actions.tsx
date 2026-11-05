'use client';
import { useEffect, useRef, useState, useId, type ReactNode } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

type PurchaseProps = { className?: string; children?: ReactNode; compact?: boolean };
export function PurchaseButton({ className = '', children, compact = false }: PurchaseProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const label = children || (compact ? 'Get the Book — $9' : 'Get the Complete Book — $9');
  if (siteConfig.checkoutUrl) return <a className={`button button-primary ${className}`} href={siteConfig.checkoutUrl}>{label}<ArrowUpRight size={17} aria-hidden="true" /></a>;
  return <>
    <button className={`button button-primary ${className}`} onClick={() => dialog.current?.showModal()}>{label}<ArrowUpRight size={17} aria-hidden="true" /></button>
    <dialog ref={dialog} className="notice-dialog" aria-labelledby={titleId} onClick={e => { if (e.target === e.currentTarget) dialog.current?.close(); }}>
      <button className="icon-button dialog-close" aria-label="Close checkout information" onClick={() => dialog.current?.close()}><X size={21} /></button>
      <span className="eyebrow">The complete edition</span>
      <h2 id={titleId}>Checkout is being connected.</h2>
      <p>Payments aren’t available on this page yet. You can read and download the genuine five-page preview while the checkout is prepared.</p>
      <a className="button button-primary" href="#preview" onClick={() => dialog.current?.close()}>Read 5 Pages Free<ArrowUpRight size={17} /></a>
      <p className="notice-foot">$9 USD · One-time purchase · Digital PDF</p>
    </dialog>
  </>;
}
export function PublisherLink({ kind, children }: { kind: 'contact' | 'privacy' | 'terms' | 'refund'; children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const target = kind === 'contact' ? (siteConfig.contactEmail ? `mailto:${siteConfig.contactEmail}` : null) :
    kind === 'privacy' ? siteConfig.privacyUrl : kind === 'terms' ? siteConfig.termsUrl : siteConfig.refundUrl;
  if (target) return <a href={target}>{children}</a>;
  const descriptions = {
    contact: 'The publisher has not added contact details yet.',
    privacy: 'The publisher has not added the privacy policy yet.',
    terms: 'The publisher has not added the terms of sale yet.',
    refund: 'The publisher has not added the refund policy yet. Review the published policy before purchasing.',
  };
  return <>
    <button className="footer-link" onClick={() => dialog.current?.showModal()}>{children}</button>
    <dialog ref={dialog} className="notice-dialog" aria-label={`${kind} information`} onClick={e => { if (e.target === e.currentTarget) dialog.current?.close(); }}>
      <button className="icon-button dialog-close" aria-label="Close information" onClick={() => dialog.current?.close()}><X size={21} /></button>
      <span className="eyebrow">Publication information</span><h2>Details coming soon.</h2><p>{descriptions[kind]}</p>
      <button className="button button-outline" onClick={() => dialog.current?.close()}>Back to the book</button>
    </dialog>
  </>;
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
    <span><b>$9</b> <small>Digital edition</small></span><PurchaseButton compact />
  </div>;
}
