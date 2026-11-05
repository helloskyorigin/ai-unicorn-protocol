# Dodo Payments: checkout and private book delivery

Configuration instructions checked against Dodo's official documentation on November 5, 2026:
https://docs.dodopayments.com/features/digital-product-delivery

## Dashboard setup

1. Create a **one-time** product for The AI Unicorn Protocol — 2027 Edition at **$9 USD**. Confirm tax/currency behavior in your account.
2. In **Entitlements**, create an entitlement of type **Digital Files**.
3. Upload the supplied `The_AI_Unicorn_Protocol_2027_Production_Final.pdf` directly to that entitlement. Do not place it in this website or use a public download link.
4. Add brief delivery instructions identifying it as the 179-page digital PDF. Save the entitlement.
5. Open the product's **Entitlements** section and attach the Digital Files entitlement.
6. Obtain the real hosted checkout/payment link for this product from your Dodo dashboard. Paste it into `NEXT_PUBLIC_DODO_CHECKOUT_URL` in Vercel or `.env.local`, then rebuild and deploy.
7. Add the publisher's real contact, privacy, terms, and refund-policy URLs using `.env.example`. Review the complete purchase flow before announcing availability.

Dodo delivers the attached file after successful payment through its email and Customer Portal. Its hosted files use short-lived download URLs; do not hardcode those URLs in this website. Legacy product-level delivery is migrated to Digital Files entitlements; edit the entitlement as the source of truth.

## Verification to perform in the merchant account

- Use the correct test environment and a test product/link first.
- Confirm the product title, **$9 one-time price**, and taxes/currency shown at checkout.
- Complete a successful supported test payment; verify delivery email and the correct 179-page PDF.
- Open the Customer Portal and verify that download access can be recovered.
- Test cancellation and unsuccessful payment: no website download should be granted.
- Switch to the real live product/link, rebuild, and verify the live product details.

No checkout or delivery transaction is claimed as tested in this project. No Dodo API key is needed for the hosted-link plus native-delivery approach. A query string such as `?paid=true` is never treated as proof of purchase.
