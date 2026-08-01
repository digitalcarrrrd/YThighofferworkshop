# Manual actions for Abrar

These actions happen outside the code repository. They are not performed by this branch.

## GoHighLevel

- Create or confirm the form and workflow for each real offer.
- Create custom fields for offer ID, offer type, audience segment, landing page, form ID, and all five UTM values.
- Copy each custom-field key into its matching private Vercel environment variable.
- Confirm the `yt-workshop` and `payment-pending` automation still handles the existing workshop.
- Test payment review and WhatsApp confirmation with a test contact.

## Meta Events Manager

- Confirm the Meta Pixel ID belongs to the correct business.
- Verify `InitiateCheckout` fires when payment instructions open.
- Verify `CompleteRegistration` fires only after the registration API succeeds.
- Confirm no `Purchase` event fires for payment instructions or screenshot upload.
- Confirm browser events contain offer and UTM fields but no name, email, phone, or transaction ID.

## Vercel

- Add the variables listed in `.env.local.example` to Preview first.
- Add each future offer's GHL form ID and public WhatsApp variable.
- Test the draft pull request Preview deployment before approving production.
- Never copy private GHL, AWS, Cloudinary, or Supabase values into `NEXT_PUBLIC_*` variables.

## Cloudflare

- After final URLs are approved, decide whether an old landing-page path needs a redirect.
- Change DNS or proxy rules only during an approved production migration window.

## GitHub

- Review the draft pull request and Preview URL.
- Confirm the current `/` design and registration flow before approving the pull request.
- Merge only after GHL, Meta, mobile, and Vercel Preview testing is complete.
