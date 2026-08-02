import type { OfferConfig, OfferRouteFamily } from "./types";

export const youtubeEmpireBuildersOffer = {
  id: "youtube-empire-builders",
  slug: "youtube-empire-builders",
  type: "workshop",
  routeFamily: "workshops",
  status: "active",
  template: "youtube-empire-builders",
  title: "YouTube Empire Builders Live Workshop",
  subtitle: "Build a clear faceless YouTube channel blueprint",
  description:
    "A focused two-hour live workshop covering niche direction, content systems, and an AI-assisted production workflow.",
  price: 1999,
  currency: "PKR",
  schedule: {
    frequency: "daily",
    timezone: "Asia/Karachi",
    startHour: 20,
    endHour: 22,
    registrationCutoffHour: 19,
    capacity: 100,
  },
  duration: "2 hours",
  audienceSegment: "aspiring-faceless-youtube-creators",
  hero: {
    kicker: "Stop collecting tutorials. Start building.",
    headline: "Your faceless YouTube channel needs a clear blueprint",
    accent: "clear blueprint",
    body:
      "Build your niche direction, content system, and AI production workflow with Abrar Nadir.",
    proof: ["Live screen share", "Practical templates", "No income promises"],
  },
  curriculum: [
    {
      title: "Choose the channel",
      description: "Validate demand, study competitors, and select a faceless-friendly format.",
    },
    {
      title: "Build the content engine",
      description: "Create a repeatable AI-assisted workflow for research, scripts, visuals, and voiceover.",
    },
  ],
  bonuses: [
    { title: "50+ AI Prompts", description: "Tested prompt pack", statedValue: 3000 },
    { title: "Niche Research Template", description: "Validation framework", statedValue: 2000 },
    { title: "90-Day Content Calendar", description: "Publishing system", statedValue: 2500 },
    { title: "7-Day WhatsApp Group", description: "Community access", statedValue: 5000 },
    { title: "24-Hour Recording", description: "Replay access", statedValue: 2999 },
  ],
  faqs: [
    {
      question: "Is this beginner-friendly?",
      answer: "Yes. The workshop starts with selection and builds the workflow step by step.",
    },
    {
      question: "Is income guaranteed?",
      answer: "No. Results depend on execution and market conditions.",
    },
  ],
  ctaText: "Lock my seat - PKR 1,999",
  ghlFormEnvironmentVariable: "GHL_FORM_ID",
  whatsappEnvironmentVariable: "NEXT_PUBLIC_WHATSAPP_NUMBER",
  thankYouRoute: "/thank-you/youtube-empire-builders",
  metaPixelOfferId: "YEB-v1",
  conversionValue: 1999,
  sections: {
    hero: true,
    problem: true,
    agenda: true,
    bonuses: true,
    pricing: true,
    faq: true,
    finalCta: true,
    purchaseModal: true,
    ghlForm: true,
    whatsappCta: true,
  },
} satisfies OfferConfig;

export const weeklyYoutubeWorkshopOffer = {
  id: "weekly-youtube-workshop",
  slug: "weekly-youtube-workshop",
  type: "workshop",
  routeFamily: "workshops",
  status: "disabled",
  template: "youtube-empire-builders",
  title: "Weekly YouTube Workshop",
  subtitle: "Build your YouTube channel with live weekly guidance",
  description: "A practical weekly workshop with Abrar Nadir.",
  price: 1999,
  currency: "PKR",
  conversionValue: 1999,
  schedule: {
    frequency: "weekly",
    timezone: "Asia/Karachi",
    capacity: 100,
  },
  duration: "2 hours",
  audienceSegment: "weekly-youtube-workshop",
  hero: {
    kicker: "Live weekly implementation workshop",
    headline: "Build your YouTube channel with a clear execution plan",
    accent: "clear execution plan",
    body:
      "Learn the system, tools and workflow required to launch and grow a faceless YouTube channel.",
    proof: [
      "Live weekly session",
      "Practical implementation",
      "Templates and workflow",
    ],
  },
  curriculum: [],
  bonuses: [],
  faqs: [],
  ctaText: "Reserve your workshop seat",
  ghlFormEnvironmentVariable: "GHL_WEEKLY_YOUTUBE_WORKSHOP_FORM_ID",
  whatsappEnvironmentVariable:
    "NEXT_PUBLIC_WEEKLY_YOUTUBE_WORKSHOP_WHATSAPP_NUMBER",
  thankYouRoute: "/thank-you/weekly-youtube-workshop",
  metaPixelOfferId: "weekly-youtube-workshop-v1",
  sections: {
    hero: true,
    problem: true,
    agenda: true,
    bonuses: true,
    pricing: true,
    faq: true,
    finalCta: true,
    purchaseModal: true,
    ghlForm: true,
    whatsappCta: true,
  },
} satisfies OfferConfig;

export const offers: readonly OfferConfig[] = [
  youtubeEmpireBuildersOffer,
  weeklyYoutubeWorkshopOffer,
];

export function getOfferById(id: string) {
  return offers.find((offer) => offer.id === id && offer.status === "active");
}

export function getOfferByRoute(routeFamily: OfferRouteFamily, slug: string) {
  return offers.find(
    (offer) =>
      offer.routeFamily === routeFamily && offer.slug === slug && offer.status === "active",
  );
}

export function getOfferByThankYouSlug(slug: string) {
  return offers.find(
    (offer) =>
      offer.status === "active" && offer.thankYouRoute === `/thank-you/${slug}`,
  );
}

export function getActiveOffersForRoute(routeFamily: OfferRouteFamily) {
  return offers.filter(
    (offer) => offer.routeFamily === routeFamily && offer.status === "active",
  );
}
