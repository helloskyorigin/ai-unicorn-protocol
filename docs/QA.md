# Launch QA — November 5, 2026

## Build and asset checks

- Production Next.js build, TypeScript, check:assets, and check:launch pass.
- The exported landing page contains four purchase links: header, hero, final purchase section, and mobile sticky bar. Every href is the exact supplied live Dodo URL; every label is Get the Complete Book — $9. Each contact/policy page also has one purchase link with that same label and URL.
- Structured product metadata uses USD 9.00 and the same official checkout URL. Sharing imagery uses the actual official cover. Configure NEXT_PUBLIC_SITE_URL with the final HTTPS domain; Vercel's deployment URL is used automatically when available.
- The original cover, 3D mockup, and five genuine page images are preserved. The only PDF in public/ and out/ is the official five-page preview. Its SHA-256 matches the supplied sample; no complete paid PDF is in the repository or export.

## Browser checks

- Completed landing page → Read 5 Pages Free → page navigation → expanded page/zoom → purchase CTA → Dodo checkout. The checkout opened the correct book.
- Verified all four link labels and exact hrefs in the rendered page, including the mobile sticky bar.
- Rechecked at 360, 390, 430, and 768 CSS-pixel iframe widths and the desktop browser viewport. No document overflow or broken loaded images. The mobile header and full-width sticky purchase link fit without covering reader controls.
- Next/Previous, keyboard navigation, page counter, expanded view, zoom, and Escape dismissal work. Horizontal scrolling remains native to the reader; no login or payment is required to read it.
- Free preview URL, filename, exact file hash, and production attachment response are verified. Browser automation could not capture the native download event; verify a normal download once the final domain is deployed.

## Contact and purchase-policy update

- Added the user-provided publisher email hello.skyorigin@gmail.com with usable mailto links.
- Added complete Contact, Privacy Policy, Purchase Terms, and Refund & Delivery Policy pages. Footer links open the actual routes, with no pending-information dialogs.
- Checked all four routes return HTTP 200 from the static production export. Trailing-slash export creates real route/index.html files for reliable static hosting.
- Opened each page from the footer in the browser. Checked contact/privacy at 360px, terms at 390px, refunds at 430px, and the desktop layout. No horizontal overflow; the email, text, and real cover fit cleanly.
- Refund text describes the request process and preserves Dodo Buyer Terms and mandatory consumer rights. It does not invent a fixed refund period or automatic approval. Privacy text reflects the actual static site, hosted checkout, and email support.

## Verified live product

Opening the exact supplied hosted link showed The AI Unicorn Protocol — 2027 Edition and one included Digital Files entitlement. Selecting USD showed a **$9.00 base price**. With the observed India billing country, GST was $0.45 and total $9.45. The website clearly states that applicable taxes are shown at checkout; amounts can vary with customer location/currency.

No card details were entered and no purchase was submitted. Successful-payment email delivery was not transaction-tested. The merchant's existing Dodo delivery setup is preserved, with no new product, API, payment backend, download endpoint, success page, or redirect.

## Publisher and deployment configuration

Publisher contact and the four information pages are now included and configured. Optional external policy overrides remain editable. No Vercel project linked to this repository was returned during the preceding checkout update. This QA preview verifies the built code, not a public production deployment; import/deploy the latest main branch using the existing Vercel configuration.
