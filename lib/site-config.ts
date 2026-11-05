/** The approved live product link is public. Never add credentials or a paid file URL. */
export const LIVE_DODO_CHECKOUT_URL = 'https://checkout.dodopayments.com/buy/pdt_0NrI93lJvUpzx9dstH48K?quantity=1';
const configuredCheckout = process.env.NEXT_PUBLIC_DODO_CHECKOUT_URL?.trim();
if (configuredCheckout && configuredCheckout !== LIVE_DODO_CHECKOUT_URL) {
  throw new Error('NEXT_PUBLIC_DODO_CHECKOUT_URL must match the approved live Dodo product URL.');
}
function publicUrl(value: string | undefined): string | null {
  if (!value) return null;
  try { const url = new URL(value); return url.protocol === 'https:' ? url.href : null; }
  catch { return null; }
}
const publisherEmail = 'hello.skyorigin@gmail.com';
const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || publisherEmail;
export const siteConfig = {
  title: 'THE AI UNICORN PROTOCOL',
  edition: '2027 Edition',
  price: 9,
  currency: 'USD',
  checkoutUrl: LIVE_DODO_CHECKOUT_URL,
  purchaseLabel: 'Get the Complete Book — $9',
  contactEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : publisherEmail,
  contactUrl: '/contact/',
  privacyUrl: publicUrl(process.env.NEXT_PUBLIC_PRIVACY_URL) || '/privacy/',
  termsUrl: publicUrl(process.env.NEXT_PUBLIC_TERMS_URL) || '/terms/',
  refundUrl: publicUrl(process.env.NEXT_PUBLIC_REFUND_URL) || '/refunds/',
  dodoBuyerTermsUrl: 'https://dodopayments.com/legal/buyer-terms',
  dodoPrivacyUrl: 'https://dodopayments.com/legal/privacy-policy',
  siteUrl: publicUrl(process.env.NEXT_PUBLIC_SITE_URL) ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` :
      process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null),
  previewPdf: '/preview/the-ai-unicorn-protocol-preview.pdf',
} as const;
