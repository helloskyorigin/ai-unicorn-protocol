# Release QA — November 5, 2026

## Passed

- Inspected the supplied 179-page full PDF and exact five-page preview. Verified 21 chapters, seven parts, eight researched case files, the scorecard, founder toolkit, and ninety-day roadmap against the book.
- Used the actual supplied cover and 3D mockup; optimized them to WebP. Viewer pages are genuine PDF renders. Scorecard and roadmap excerpts are actual pages 4 and 133.
- Production build, TypeScript check, and public-asset/privacy checks pass. Local static production server returns the page, optimized imagery, and exact sample PDF with HTTP 200; PDF attachment header and SHA-256 verified. Missing routes return 404.
- Browser inspected at 360, 390, 430, 768, and 1440 CSS-pixel iframe viewports, plus the native desktop browser viewport. No horizontal document overflow. Mobile hero, actual mockup, purchase action, preview controls, and sticky CTA visually inspected. No broken images observed.
- Desktop and phone preview navigation tested. The current page follows the centered page. Previous/next bounds, keyboard navigation, expanded view, zoom in/out, and Escape dismissal tested.
- FAQ disclosure and pending publisher-information dialog tested. Missing-checkout dialog tested and clearly states payments are unavailable.
- Actual public sample URL opened successfully in the browser PDF reader, displaying five pages. Sample SHA-256 matches the supplied PDF. Native automated download capture timed out; Vercel and local production headers explicitly serve the PDF as a named attachment. Verify a normal browser download on the final domain.
- Reduced-motion styles, semantic landmarks, image descriptions, focus indicators, touch controls, modal labeling, and a skip link are included.
- The paid 179-page PDF is absent from source, public assets, exported site, and delivery ZIP. No API keys or payment secrets are included.

## Merchant configuration required

- Set the real NEXT_PUBLIC_DODO_CHECKOUT_URL. No URL was supplied; no payment or digital fulfillment transaction has been tested.
- Attach the full PDF through Dodo Digital Files entitlements. Follow DODO_SETUP.md.
- Set the actual publisher contact and privacy/terms/refund URLs. No policies or contact information have been invented.
- Set NEXT_PUBLIC_SITE_URL to the final HTTPS domain, then rebuild for canonical/social metadata.

## Deployment status

The connected Vercel account returned 403 Forbidden when creating the new project. No Vercel deployment was created, and the temporary local preview is not a public production deployment. The complete source and deployment instructions are included for the user's authorized fallback.
