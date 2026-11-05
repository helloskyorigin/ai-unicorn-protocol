import type { Metadata } from 'next';
import { PolicyLayout } from '@/components/policy-layout';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Refund & Delivery Policy | The AI Unicorn Protocol',
  description: 'How to get help with digital delivery, file issues, charges, and refund requests.',
  alternates: { canonical: '/refunds/' },
};

export default function RefundPage() {
  return <PolicyLayout current="refund" title="Refund & Delivery Policy" intro="A clear way to get help with your digital-book purchase.">
    <section><h2>Digital delivery</h2>
      <p>The book is a digital PDF delivered through Dodo Payments after successful payment. There is no physical shipment. Check your checkout email inbox, Spam, and Promotions for the download message.</p>
      <p>If you cannot find the email, cannot open the file, or receive the wrong product, contact <a href={'mailto:' + siteConfig.contactEmail}>{siteConfig.contactEmail}</a> so we can help investigate the order and access problem.</p>
    </section>
    <section><h2>Requesting help or a refund</h2>
      <p>Email the publisher with your Dodo order or transaction number, the email used at checkout, and the reason for your request. Include details of missing delivery, an unreadable file, an incorrect product, or a duplicate charge when relevant.</p>
      <p>You can also use the payment-support instructions in your Dodo receipt. Never send card numbers, passwords, or one-time codes.</p>
    </section>
    <section><h2>How requests are handled</h2>
      <p>Dodo Payments handles payment-related refunds as merchant of record. Requests are reviewed under its <a href={siteConfig.dodoBuyerTermsUrl}>Buyer Terms</a>, applicable consumer law, and the circumstances of the order. Contacting support does not by itself mean a refund has been approved.</p>
      <p>Where a refund is approved, Dodo and the payment provider handle its processing. Processing time depends on the payment method and provider; the publisher cannot promise a specific bank-credit date.</p>
    </section>
    <section><h2>Your legal rights</h2>
      <p>This policy does not limit rights or remedies that applicable consumer law makes mandatory, including rights relating to non-delivery or defective digital content. Any additional refund terms expressly offered at checkout also apply.</p>
      <p>Questions about an order can always be sent to <a href={'mailto:' + siteConfig.contactEmail}>{siteConfig.contactEmail}</a>.</p>
    </section>
  </PolicyLayout>;
}
