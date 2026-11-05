import type { Metadata } from 'next';
import { PolicyLayout } from '@/components/policy-layout';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Privacy Policy | The AI Unicorn Protocol',
  description: 'How the book website handles browsing, checkout, and support information.',
  alternates: { canonical: '/privacy/' },
};

export default function PrivacyPage() {
  return <PolicyLayout current="privacy" title="Privacy Policy" intro="How information is handled when you browse this website, buy the book, or ask for help.">
    <section><h2>Browsing this website</h2>
      <p>This website presents The AI Unicorn Protocol — 2027 Edition and its free preview. You do not need an account, registration, or an email submission to read the preview.</p>
      <p>The website does not use advertising pixels or site-analytics trackers, and it does not set analytics or advertising cookies. The hosting infrastructure may process standard request information, such as IP address, browser information, requested pages, and access times, to deliver and protect the website.</p>
    </section>
    <section><h2>Checkout and payment information</h2>
      <p>Purchase buttons take you to Dodo Payments. Payment information is entered on Dodo's hosted checkout, not on this website. Dodo processes transaction, billing, tax, fraud-prevention, and delivery information under its own policies.</p>
      <p>Read <a href={siteConfig.dodoPrivacyUrl}>Dodo Payments' Privacy Policy</a> for information about data handled by Dodo. The publisher may receive order information, including the checkout email, product, payment status, and transaction reference, for purchase support and business records.</p>
    </section>
    <section><h2>When you contact the publisher</h2>
      <p>If you email <a href={'mailto:' + siteConfig.contactEmail}>{siteConfig.contactEmail}</a>, your email address, message, and any order information you provide are used to answer your inquiry, resolve access or refund issues, and keep necessary support records. Email services process those messages as part of delivering and storing email.</p>
      <p>Do not send full card details, passwords, or one-time codes. An order reference and the email used at checkout are sufficient to describe a purchase issue.</p>
    </section>
    <section><h2>Use, sharing, and retention</h2>
      <p>Publisher-held purchase and support information is used for fulfillment assistance, customer support, security, and required business or legal records. Information may be handled by the services needed for hosting, email, and payment support, or disclosed when required by law.</p>
      <p>Support and purchase records are retained for as long as needed for those purposes and applicable recordkeeping requirements. This policy does not promise a fixed deletion period for information controlled by another provider.</p>
    </section>
    <section><h2>Questions and privacy requests</h2>
      <p>To ask about information held by the publisher, or request access, correction, or deletion where applicable, email <a href={'mailto:' + siteConfig.contactEmail}>{siteConfig.contactEmail}</a>. Information may need to be retained for unresolved purchases, disputes, or legal obligations.</p>
      <p>For information held independently by Dodo Payments, use the privacy contact instructions in its policy. Updates to this website's policy will be reflected in the date above.</p>
    </section>
  </PolicyLayout>;
}
