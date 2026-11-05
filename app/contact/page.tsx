import type { Metadata } from 'next';
import { PolicyLayout } from '@/components/policy-layout';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Contact the Publisher | The AI Unicorn Protocol',
  description: 'Contact the publisher for book, download, and purchase support.',
  alternates: { canonical: '/contact/' },
};

export default function ContactPage() {
  return <PolicyLayout current="contact" title="Contact the Publisher" intro="Questions about the book, your order, or digital delivery? Here is how to reach us.">
    <section><h2>Email the publisher</h2>
      <p><a className="policy-email" href={'mailto:' + siteConfig.contactEmail}>{siteConfig.contactEmail}</a></p>
      <p>Use this address for questions about The AI Unicorn Protocol — 2027 Edition, access problems, purchase inquiries, or a refund request.</p>
    </section>
    <section><h2>For an existing purchase</h2>
      <p>Include your Dodo Payments order or transaction number, the email used at checkout, and a short description of the issue. Never send card numbers, passwords, or one-time codes.</p>
      <p>Dodo Payments handles the transaction and digital-file delivery. For payment-specific help, you can also use the support instructions in your Dodo receipt.</p>
    </section>
    <section><h2>Looking for your book?</h2>
      <p>Check the inbox of the email you entered at checkout, including Spam or Promotions. The download link is delivered through Dodo Payments after a successful purchase.</p>
      <p>If the email or file is missing, contact us with your order details. Read the <a href={siteConfig.refundUrl}>refund and delivery policy</a> for further information.</p>
    </section>
  </PolicyLayout>;
}
