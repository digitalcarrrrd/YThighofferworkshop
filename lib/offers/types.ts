export type OfferType =
  | "workshop"
  | "cohort"
  | "program"
  | "academy"
  | "mentorship"
  | "residency"
  | "free-training"
  | "future";

export type OfferStatus = "active" | "draft" | "disabled";
export type OfferRouteFamily = "workshops" | "cohorts" | "programs";
export type OfferTemplate = "youtube-empire-builders";

export type PublicEnvironmentVariableName = `NEXT_PUBLIC_${string}`;
export type PrivateEnvironmentVariableName = `GHL_${string}`;

export type OfferSchedule = {
  frequency: "daily" | "weekly" | "cohort" | "on-demand";
  timezone: string;
  startHour?: number;
  endHour?: number;
  registrationCutoffHour?: number;
  capacity?: number;
  date?: string;
};

export type OfferHero = {
  kicker: string;
  headline: string;
  accent: string;
  body: string;
  proof: string[];
};

export type OfferCurriculumItem = {
  title: string;
  description: string;
};

export type OfferBonus = {
  title: string;
  description: string;
  statedValue?: number;
};

export type OfferFaq = {
  question: string;
  answer: string;
};

export type OfferSectionVisibility = {
  hero: boolean;
  problem: boolean;
  agenda: boolean;
  bonuses: boolean;
  pricing: boolean;
  faq: boolean;
  finalCta: boolean;
  purchaseModal: boolean;
  ghlForm: boolean;
  whatsappCta: boolean;
};

export type OfferConfig = {
  id: string;
  slug: string;
  type: OfferType;
  routeFamily: OfferRouteFamily;
  status: OfferStatus;
  template: OfferTemplate;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  currency: string;
  schedule: OfferSchedule;
  duration: string;
  audienceSegment: string;
  hero: OfferHero;
  curriculum: OfferCurriculumItem[];
  bonuses: OfferBonus[];
  faqs: OfferFaq[];
  ctaText: string;
  ghlFormEnvironmentVariable: PrivateEnvironmentVariableName;
  whatsappEnvironmentVariable: PublicEnvironmentVariableName;
  thankYouRoute: string;
  metaPixelOfferId: string;
  conversionValue: number;
  sections: OfferSectionVisibility;
};
