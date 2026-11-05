import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const checkout = 'https://checkout.dodopayments.com/buy/pdt_0NrI93lJvUpzx9dstH48K?quantity=1';
const label = 'Get the Complete Book — $9';
const html = await readFile('out/index.html', 'utf8');
const links = [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)];
const purchases = links.filter(([, attributes]) => /href="[^"]*dodopayments\.com/.test(attributes));
assert.equal(purchases.length, 4, 'Header, hero, final, and sticky purchase links must all be rendered');
for (const [, attributes, body] of purchases) {
  assert.equal(attributes.match(/href="([^"]+)"/)?.[1], checkout, 'Every purchase uses the exact approved link');
  assert.equal(body.replace(/<[^>]*>/g, '').trim(), label, 'Every purchase uses the approved $9 label');
}
assert.ok(!/Checkout is being connected|Checkout is not yet connected|Payments aren’t available/.test(html));
assert.match(html, /Spam or Promotions/);
const data = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
assert.ok(data, 'Book metadata must be present');
const book = JSON.parse(data);
assert.equal(book.offers.price, '9.00');
assert.equal(book.offers.priceCurrency, 'USD');
assert.equal(book.offers.url, checkout);
assert.equal(book.numberOfPages, 179);
for (let page = 1; page <= 5; page++) assert.ok(html.includes(`/preview/page-${page}.webp`));
assert.ok(html.includes('/images/share.jpg'));
for (const route of ['contact', 'privacy', 'terms', 'refunds']) {
  const footerLabel = { contact: 'Contact', privacy: 'Privacy', terms: 'Terms', refunds: 'Refund policy' }[route];
  const footerLink = links.find(([, , body]) => body.replace(/<[^>]*>/g, '').trim() === footerLabel);
  const destination = footerLink?.[1].match(/href="([^"]+)"/)?.[1];
  assert.ok(destination === '/' + route + '/' || destination?.startsWith('https://'), 'Footer must link to the real ' + route + ' page');
  const policy = await readFile('out/' + route + '/index.html', 'utf8');
  assert.ok(policy.includes('mailto:hello.skyorigin@gmail.com'), 'Publisher email must be usable on ' + route);
  assert.ok(!/Details coming soon|has not added/.test(policy), 'Policy pages must not contain placeholders');
  const policyPurchases = [...policy.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)]
    .filter(([, attributes, body]) => body.replace(/<[^>]*>/g, '').trim() === label);
  assert.equal(policyPurchases.length, 1);
  assert.equal(policyPurchases[0][1].match(/href="([^"]+)"/)?.[1], checkout);
}
assert.ok(!/Details coming soon|has not added/.test(html));

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    files.push(...(entry.isDirectory() ? await walk(path) : [path]));
  }
  return files;
}
const pdfs = (await walk('out')).filter(path => /\.pdf$/i.test(path));
assert.deepEqual(pdfs, ['out/preview/the-ai-unicorn-protocol-preview.pdf']);
const audit = JSON.parse(await readFile('asset-verification.json', 'utf8'));
assert.equal(createHash('sha256').update(await readFile(pdfs[0])).digest('hex'), audit.sourcePreviewSha256);
console.log('Passed: live checkout CTAs, contact and policy routes, $9 metadata, five preview pages, and no public paid PDF.');
