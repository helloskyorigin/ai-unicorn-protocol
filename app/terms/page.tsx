import type { Metadata } from 'next';
import { PolicyLayout } from '@/components/policy-layout';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Purchase Terms | The AI Unicorn Protocol',
  description: 'Digital-book format, purchase, delivery, usage, and support terms.',
  alternates: { canonical: '/terms/' },
};

export default function TermsPage() {
  return <PolicyLayout current="terms" title="Purchase Terms" intro="The essentials of buying and using The AI Unicorn Protocol — 2027 Edition.">
    <section><h2>What you are buying</h2>
      <p>The product is the complete 179-page English-language digital PDF of The AI Unicorn Protocol — 2027 Edition. The advertised base price is $9 USD as a one-time purchase. This is not a subscription.</p>
      <p>Applicable taxes and any local-currency amounts are displayed at checkout. The hardcover imagery is a product presentation; no physical book is shipped.</p>
    </section>
    <section><h2>Checkout and delivery</h2>
      <p>Dodo Payments handles the transaction as merchant of record under its <a href={siteConfig.dodoBuyerTermsUrl}>Buyer Terms</a>. Review the product, final total, and checkout terms before completing payment.</p>
      <p>After a successful purchase, Dodo provides digital-file access by email. Enter a working email address and check Spam or Promotions if the message is missing. For delivery help, contact <a href={'mailto:' + siteConfig.contactEmail}>{siteConfig.contactEmail}</a> with your order reference.</p>
    </section>
    <section><h2>Using the book</h2>
      <p>Your purchase permits personal reading and applying the book's frameworks and worksheets to your own projects and business planning. You may keep a personal backup and print a copy for your own use.</p>
      <p>Except where permitted by law or with permission, you may not resell or repackage the PDF, publish the complete book or substantial portions online, or distribute copies as a substitute for purchasing the book. A purchase does not transfer ownership of the book's copyright.</p>
    </section>
    <section><h2>Educational scope</h2>
      <p>The book offers business education, research, examples, and decision frameworks. It does not guarantee revenue, funding, investment returns, startup success, or any company valuation. It is not personalized legal, financial, or investment advice.</p>
      <p>Company examples, products, prices, and market conditions may change after publication. Consider the evidence and your circumstances when making decisions.</p>
    </section>
    <section><h2>Refunds and consumer rights</h2>
      <p>Read the <a href={siteConfig.refundUrl}>refund and delivery policy</a> for how to request help or a refund. Payment-related refunds are handled through Dodo Payments under its Buyer Terms and applicable law.</p>
      <p>Nothing in these terms excludes rights or remedies that applicable consumer law does not allow to be excluded. The terms shown for your purchase and your mandatory legal rights continue to apply.</p>
    </section>
    <section><h2>Contact</h2>
      <p>For questions about the book or these terms, email <a href={'mailto:' + siteConfig.contactEmail}>{siteConfig.contactEmail}</a>.</p>
    </section>
  </PolicyLayout>;
}
