# The AI Unicorn Protocol — 2027 Edition

A focused, responsive book launch site built with Next.js App Router, React, TypeScript, Tailwind CSS, and Lucide. The supplied cover and mockup are used unchanged apart from image optimization. All five viewer pages are genuine renders of the supplied preview PDF. The scorecard and roadmap are genuine book excerpts.

## Run

Node.js 22 or 24 is recommended.

```
npm ci
cp .env.example .env.local
npm run dev
```

Visit the URL printed by Next.js. For release checks:

```
npm run typecheck
npm run check:assets
npm run build
npm run check:launch
```

After building, `npm start` serves a local production preview at http://localhost:3000.

`next build` creates `out/`. The page is fully static and requires no database, login, API key, or backend.

## Live hosted checkout

Every purchase CTA uses the approved live Dodo link and the label **Get the Complete Book — $9**:

https://checkout.dodopayments.com/buy/pdt_0NrI93lJvUpzx9dstH48K?quantity=1

The live product's USD base price was verified as **$9.00** on November 5, 2026. Applicable taxes and currency conversion are displayed by Dodo. Its checkout shows the correct book and an included Digital Files entitlement.

The approved link is already the default in `lib/site-config.ts`; no environment variable is needed to activate it. If `NEXT_PUBLIC_DODO_CHECKOUT_URL` is set, it must match the exact approved link. A different or stale link fails the build instead of sending customers to another product.

Dodo owns payment, confirmation, and email delivery. The website has no payment backend, purchase-verification query string, success redirect, or paid-PDF download route. It does not create a new checkout or delivery system. No purchase transaction or post-payment email delivery is claimed as tested.

Publisher support is configured as **hello.skyorigin@gmail.com**. The included **/contact/**, **/privacy/**, **/terms/**, and **/refunds/** pages are linked from the footer. They cover the digital-book purchase, license, delivery, support, privacy, and refund requests under Dodo Buyer Terms and applicable consumer rights. No fixed refund window or guaranteed approval has been invented. Optional publisher/policy overrides remain in `.env.example`. See [Dodo flow](docs/DODO_SETUP.md) and [QA notes](docs/QA.md).

## Deploy to Vercel

1. Use the existing repository: `helloskyorigin/ai-unicorn-protocol`.
2. Import that repository into Vercel. Use the Next.js preset and Node.js 22/24.
3. Contact details and the included policy pages work by default. Optional external policy URLs can be configured from `.env.example`. The approved live checkout is already configured; remove any stale checkout environment override or set it to the exact approved link.
4. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS domain. The supplied `vercel.json` builds and serves the static `out` directory.
5. Deploy. Verify sample downloads, viewer controls, policy links, the real $9 checkout, and Dodo delivery before advertising that sales are live.

The optional `NEXT_PUBLIC_SITE_URL` controls canonical and sharing URLs. Vercel's deployment URL is used when available. Open Graph uses an image composed with the actual official cover; there are no invented endorsements or ratings in metadata.

## Keep the paid book private

The full 179-page PDF is intentionally **not included in this repository, public/, export, or ZIP**. Upload it directly into Dodo's Digital Files entitlement. The only public PDF is the supplied five-page free preview. Never add the complete PDF to a public URL or a frontend environment variable.

## Configuration and files

- `lib/site-config.ts`: publication constants and validated public configuration.
- `components/book-preview.tsx`: native swipe/scroll-snap viewer, arrow keys, expanded dialog, zoom, and genuine page renders.
- `components/publication-actions.tsx`: consistent live purchase links, real contact/policy links, and a restrained mobile sticky CTA.
- `app/page.tsx`: all five editorial sections and verified product metadata.
- `app/contact/`, `app/privacy/`, `app/terms/`, `app/refunds/`: complete customer-facing purchase information.
- `components/policy-layout.tsx`: shared editorial layout and purchase-support details for those pages.
- `app/globals.css`: responsive publication design with reduced-motion support.
- `asset-verification.json`: input verification and paid-file exclusion record.
- `scripts/check-launch.mjs`: verifies the four landing-page checkout links, policy-page purchase links, publisher email, legal routes, metadata, and public-PDF exclusion after building.

The page uses no analytics, email capture, payment SDK, or third-party animation library. Dodo is responsible for the already-configured checkout and customer delivery.

## Verified release and remaining setup

See [QA notes](docs/QA.md) for the actual checks and the checkout/deployment limitations.
