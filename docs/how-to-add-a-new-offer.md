# How to add a new offer

Every offer is defined in `lib/offers/offers.ts`. The allowed fields are defined in `lib/offers/types.ts`.

## The simple process

1. Open `lib/offers/offers.ts` and duplicate an existing offer object.
2. Give it a unique `id` using lowercase words separated by hyphens.
3. Set `slug` to the final URL name, such as `weekly-youtube-cohort`.
4. Choose `routeFamily`: `workshops`, `cohorts`, or `programs`.
5. Keep `status: "disabled"` while editing. Change it to `active` only after approval.
6. Change `title`, `subtitle`, and `description`.
7. Change `price`, `currency`, and `conversionValue`. Normally the conversion value equals the real price.
8. Change `schedule`. A fixed workshop can use `date: "YYYY-MM-DD"`; recurring offers use frequency, timezone, and hours.
9. Add curriculum items to `curriculum` and bonuses to `bonuses`.
10. Add approved questions and answers to `faqs`.
11. Set `ghlFormEnvironmentVariable` to the private Vercel variable that stores the correct GHL form ID.
12. Set `whatsappEnvironmentVariable` to the public Vercel variable for the offer's WhatsApp number.
13. Give Meta a stable `metaPixelOfferId`. Never reuse another offer's ID.
14. Set `thankYouRoute` to `/thank-you/your-slug`.
15. Add the object to the exported `offers` array.

The final URL combines `routeFamily` and `slug`. For example, `cohorts` plus `weekly-youtube-cohort` becomes `/cohorts/weekly-youtube-cohort`.

The existing visual template is `youtube-empire-builders`. Add a new typed template in `components/offers/OfferLanding.tsx` when a future offer needs a different design. Do not rewrite the existing workshop component.

## Copyable weekly cohort example

Keep this disabled until its copy, dates, design, GHL form, payment details, and Meta setup are approved.

```ts
export const weeklyYoutubeCohortOffer = {
  id: "weekly-youtube-cohort",
  slug: "weekly-youtube-cohort",
  type: "cohort",
  routeFamily: "cohorts",
  status: "disabled",
  template: "youtube-empire-builders",
  title: "Weekly YouTube Cohort",
  subtitle: "Replace with approved subtitle",
  description: "Replace with approved description",
  price: 0,
  currency: "PKR",
  schedule: {
    frequency: "weekly",
    timezone: "Asia/Karachi",
    capacity: 0,
  },
  duration: "Replace with approved duration",
  audienceSegment: "weekly-youtube-cohort-audience",
  hero: {
    kicker: "Replace with approved kicker",
    headline: "Replace with approved headline",
    accent: "Replace with approved accent",
    body: "Replace with approved body copy",
    proof: [],
  },
  curriculum: [],
  bonuses: [],
  faqs: [],
  ctaText: "Replace with approved CTA",
  ghlFormEnvironmentVariable: "GHL_WEEKLY_COHORT_FORM_ID",
  whatsappEnvironmentVariable: "NEXT_PUBLIC_WEEKLY_COHORT_WHATSAPP_NUMBER",
  thankYouRoute: "/thank-you/weekly-youtube-cohort",
  metaPixelOfferId: "weekly-youtube-cohort-v1",
  conversionValue: 0,
  sections: {
    hero: true,
    problem: true,
    agenda: true,
    bonuses: false,
    pricing: false,
    faq: true,
    finalCta: true,
    purchaseModal: false,
    ghlForm: false,
    whatsappCta: false,
  },
} satisfies OfferConfig;
```

## Vercel variables

Add only the variables used by the offer. Public browser variables must start with `NEXT_PUBLIC_`. GHL tokens and field keys are private and must never have that prefix.

For a new offer, add its form ID variable and WhatsApp variable. To store attribution in GHL, add the optional `GHL_OFFER_*_FIELD_KEY`, `GHL_LANDING_PAGE_FIELD_KEY`, and `GHL_UTM_*_FIELD_KEY` variables listed in `.env.local.example`.

Never place an environment-variable value in `offers.ts`, documentation, GitHub, or browser tracking events.
