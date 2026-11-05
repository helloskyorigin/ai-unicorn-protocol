# Live Dodo checkout and existing digital delivery

The existing product and delivery setup are preserved. No new product, checkout, API integration, webhook, or file delivery endpoint is required.

## Approved link

https://checkout.dodopayments.com/buy/pdt_0NrI93lJvUpzx9dstH48K?quantity=1

The checkout was opened on November 5, 2026. With the currency selector set to USD, it showed **The AI Unicorn Protocol — 2027 Edition**, **$9.00** base price, and **1 entitlement included → Digital Files**. With the observed India billing country, GST was $0.45 and total $9.45. Taxes and local-currency amounts vary with checkout configuration and customer location.

The website's four purchase actions all use the approved link, with no added query parameters. The label is **Get the Complete Book — $9**. The public link is the source default; the optional NEXT_PUBLIC_DODO_CHECKOUT_URL must match it exactly.

## After payment

Dodo handles confirmation and its existing Digital Files entitlement. Customers should check their inbox for the book download email, then Spam or Promotions if it is missing. No complete paid PDF is hosted by this website.

No separate thank-you page or post-payment redirect was added. The existing Dodo confirmation and delivery flow remains intact. Opening a URL such as ?paid=true never grants a download or counts as verified payment.

No live payment, card entry, or successful-purchase email test was performed. The merchant can use Dodo's supported test flow to verify actual post-payment delivery independently.

Official delivery reference: https://docs.dodopayments.com/features/digital-product-delivery
