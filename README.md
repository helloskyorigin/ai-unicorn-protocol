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
```

After building, `npm start` serves a local production preview at http://localhost:3000.

`next build` creates `out/`. The page is fully static and requires no database, login, API key, or backend.

## Connect checkout

Set `NEXT_PUBLIC_DODO_CHECKOUT_URL` to the actual hosted Dodo checkout link for the **$9 USD one-time product**. Only valid HTTPS Dodo-domain URLs are accepted. The example value is deliberately blank; there is no fake checkout. Rebuild after changing any `NEXT_PUBLIC_` variable.

Until connected, purchase buttons open an honest “Checkout is being connected” dialog. They do not simulate payment. Set publisher contact and policy fields in `.env.local` or Vercel environment settings; missing fields open a clear pending-information message. No refund terms, contact address, or privacy promises are invented.

See [Dodo setup](docs/DODO_SETUP.md) for secure digital fulfillment. Checkout and fulfillment have not been transaction-tested because no product checkout URL was supplied.

## Deploy to Vercel

1. Push this project to a new GitHub repository, or import it with the Vercel CLI.
2. Import that repository into Vercel. Use the Next.js preset and Node.js 22/24.
3. Set the variables from `.env.example` in Project Settings → Environment Variables. Use a live Dodo link for production and a separate test link for preview if desired.
4. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS domain. The supplied `vercel.json` builds and serves the static `out` directory.
5. Deploy. Verify sample downloads, viewer controls, policy links, the real $9 checkout, and Dodo delivery before advertising that sales are live.

The optional `NEXT_PUBLIC_SITE_URL` controls canonical and sharing URLs. Vercel's deployment URL is used when available. Open Graph uses an image composed with the actual official cover; there are no invented endorsements or ratings in metadata.

## Keep the paid book private

The full 179-page PDF is intentionally **not included in this repository, public/, export, or ZIP**. Upload it directly into Dodo's Digital Files entitlement. The only public PDF is the supplied five-page free preview. Never add the complete PDF to a public URL or a frontend environment variable.

## Configuration and files

- `lib/site-config.ts`: publication constants and validated public configuration.
- `components/book-preview.tsx`: native swipe/scroll-snap viewer, arrow keys, expanded dialog, zoom, and genuine page renders.
- `components/publication-actions.tsx`: consistent purchase links, missing-configuration dialogs, publisher links, and restrained mobile sticky CTA.
- `app/page.tsx`: all five editorial sections and verified product metadata.
- `app/globals.css`: responsive publication design with reduced-motion support.
- `asset-verification.json`: input verification and paid-file exclusion record.

The page uses no analytics, email capture, payment SDK, or third-party animation library. Dodo is responsible for checkout and customer delivery; its dashboard settings must be configured by the merchant.

## Verified release and remaining setup

See [QA notes](docs/QA.md) for the actual checks and the checkout/deployment limitations.
