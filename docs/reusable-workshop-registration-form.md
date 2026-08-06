# Reusable Workshop Registration Form

This document explains the architecture of the centralized workshop registration form and its API backend, designed to power `/workshops/yt1` through `/workshops/yt5`.

## 1. Shared Form Location
The reusable form component is located at:
`components/workshops/WorkshopRegistrationForm.tsx`

It handles capturing the user's Full Name, WhatsApp Number, Email, Transaction ID, and Payment Screenshot. It validates the inputs locally before submitting to the backend.

## 2. Shared API Endpoint
The form submits data to the centralized API endpoint at:
`app/api/workshop-registration/route.ts`

This endpoint:
- Validates the request.
- Handles uploading the payment screenshot (Supabase, AWS S3, or Cloudinary).
- Maps hidden attribution fields.
- Pushes the contact to GoHighLevel (`POST /contacts/upsert`).
- Creates a new Opportunity in GoHighLevel under the specified Pipeline and Stage.

## 3. How Each Workshop Passes its Offer ID
Each workshop landing page passes its specific `offerId` to the `WorkshopRegistrationForm` component:
```tsx
<WorkshopRegistrationForm
  offerId={yt2Offer.id}
  offerName={yt2Offer.title}
  workshopDate="2026-08-10"
  variant="light"
/>
```
The API looks up the `offerId` in `lib/offers/offers.ts` to determine which GoHighLevel tags and pipeline configurations to apply.

## 4. How to Change the Design Variant
The component accepts a `variant` prop which applies specific CSS theme classes:
- `variant="light"` (default)
- `variant="dark"`
- `variant="minimal"`
- `variant="branded"`

You can override these themes by styling `.theme-dark`, `.theme-light`, etc. in your global stylesheet, or by passing a custom `className` prop directly to the form.

## 5. How to Add Workshop 6 Later
To add a new workshop (e.g. `/workshops/yt6`):
1. Add a new offer configuration object in `lib/offers/offers.ts` (e.g. `yt6Offer`), specifying the `leadTag` and `status`.
2. Add it to the exported `offers` array.
3. Create the route `app/workshops/yt6/page.tsx`.
4. Render the `<WorkshopRegistrationForm />` passing the new `offerId`.

## 6. Required GHL Fields and Tags
The API will dynamically map:
- **Tags**: `source:website`, `payment:pending`, and the specific `leadTag` configured for that workshop (e.g., `lead:workshop-yt1`). If `GHL_TEST_MODE=true`, it will also add `test-lead`.
- **Opportunities**: It creates an Opportunity in the `GHL_LIVE_WORKSHOP_PIPELINE_ID` and `GHL_LIVE_WORKSHOP_PAYMENT_PENDING_STAGE_ID`.

## 7. Screenshot-Storage Requirements
The API attempts to use **Supabase Storage** if `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are configured.
If no SDKs or secure storage configurations are detected, it skips saving the file locally (to avoid filling up server disks) and proceeds with creating the GoHighLevel lead, marking the payment proof field as `Pending Upload (No storage configured)`.

## 8. Vercel Environment Variables
You must configure the following in your Vercel project:
- `GHL_LOCATION_ID`
- `GHL_PRIVATE_INTEGRATION_TOKEN`
- `GHL_LIVE_WORKSHOP_PIPELINE_ID`
- `GHL_LIVE_WORKSHOP_PAYMENT_PENDING_STAGE_ID`

## 9. Test-Mode Procedure
If `GHL_TEST_MODE=true` is set:
- The backend appends `[TEST]` to the Opportunity Name.
- The backend applies the `test-lead` tag.
- It still creates the contact and opportunity, but your GoHighLevel automations should be configured to exclude contacts bearing the `test-lead` tag from receiving live emails or WhatsApp messages.

## 10. Production Activation Procedure
Once you are ready to go live:
1. Ensure your GoHighLevel Webhooks/Workflows are active.
2. Configure a secure storage provider (e.g., Supabase) and add the keys to Vercel.
3. Set `GHL_TEST_MODE=false`.
4. Ensure the `status` of your offers in `lib/offers/offers.ts` are set to `active`.
