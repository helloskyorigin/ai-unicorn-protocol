/** One place to configure the publication. No credentials or paid file URLs belong here. */
export function dodoCheckoutUrl(value: string | undefined): string | null {
  if (!value?.trim()) return null;
  try {
    const url = new URL(value.trim());
    const host = url.hostname.toLowerCase();
    if (url.protocol !== 'https:' || url.username || url.password ||
      !(host === 'dodopayments.com' || host.endsWith('.dodopayments.com')) ||
      url.pathname === '/') return null;
    return url.href;
  } catch { return null; }
}
function publicUrl(value: string | undefined): string | null {
  if (!value) return null;
  try { const url = new URL(value); return url.protocol === 'https:' ? url.href : null; }
  catch { return null; }
}
const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || '';
export const siteConfig = {
  title: 'THE AI UNICORN PROTOCOL',
  edition: '2027 Edition',
  price: 9,
  currency: 'USD',
  checkoutUrl: dodoCheckoutUrl(process.env.NEXT_PUBLIC_DODO_CHECKOUT_URL),
  contactEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null,
  privacyUrl: publicUrl(process.env.NEXT_PUBLIC_PRIVACY_URL),
  termsUrl: publicUrl(process.env.NEXT_PUBLIC_TERMS_URL),
  refundUrl: publicUrl(process.env.NEXT_PUBLIC_REFUND_URL),
  siteUrl: publicUrl(process.env.NEXT_PUBLIC_SITE_URL) ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` :
      process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null),
  previewPdf: '/preview/the-ai-unicorn-protocol-preview.pdf',
} as const;
