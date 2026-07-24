# YouTube Empire Builders workshop

Mobile-first Next.js landing page for `abrarnadir.com/ytworkshop`.

## Local setup

Copy `.env.local.example` to `.env.local`, enter approved business details, then run `npm install` and `npm run dev`.

In development, valid registrations return a local test success when GHL credentials are absent. Production fails closed until GHL is configured.

## GHL mapping

Create contact custom fields for workshop batch date, transaction ID, payment method, offer version, and payment proof. Put their exact field keys in the matching environment variables. Create the `yt-workshop` workflow trigger and use `payment-pending` as the review queue tag. The private integration token must have Contacts write access and must never use a `NEXT_PUBLIC_` prefix.

## Before launch

- Replace the presenter image placeholder with an approved portrait.
- Add bank/Easypaisa/JazzCash details and WhatsApp number.
- Configure secure screenshot storage and add its returned URL to the GHL payment-proof field.
- Add GHL location, token, workflow and exact custom-field keys.
- Add Meta Pixel, GA4 and GTM IDs.
- Test payment verification, confirmation workflow, mobile upload, rate limiting and the 7 PM PKT rollover.
- Confirm refund/transfer policy with the business owner.
- Add DNS/proxy rules for the WordPress path and configure `lms.abrarnadir.com` in GHL.
