export const analyticsEvents = [
  "page_view",
  "hero_cta_click",
  "sticky_cta_click",
  "bonus_cta_click",
  "final_cta_click",
  "payment_modal_open",
  "payment_method_selected",
  "bank_details_copied",
  "form_started",
  "payment_proof_uploaded",
  "registration_submitted",
  "registration_success",
  "registration_error",
  "whatsapp_support_click",
] as const;

export type AnalyticsEvent = (typeof analyticsEvents)[number];

export const utmKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type UtmKey = (typeof utmKeys)[number];
export type UtmAttribution = Record<UtmKey, string>;

const attributionStorageKey = "abrarnadir_offer_attribution";
const emptyAttribution = (): UtmAttribution => ({
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_content: "",
  utm_term: "",
});

function readStoredAttribution(): UtmAttribution {
  if (typeof window === "undefined") return emptyAttribution();

  try {
    const value = window.sessionStorage.getItem(attributionStorageKey);
    if (!value) return emptyAttribution();
    const parsed = JSON.parse(value) as Partial<UtmAttribution>;
    return Object.fromEntries(
      utmKeys.map((key) => [key, String(parsed[key] || "").slice(0, 200)]),
    ) as UtmAttribution;
  } catch {
    return emptyAttribution();
  }
}

export function captureUtmAttribution(): UtmAttribution {
  if (typeof window === "undefined") return emptyAttribution();

  const stored = readStoredAttribution();
  const params = new URLSearchParams(window.location.search);
  const current = Object.fromEntries(
    utmKeys.map((key) => [key, String(params.get(key) || "").slice(0, 200)]),
  ) as UtmAttribution;
  const hasCurrentUtm = utmKeys.some((key) => current[key]);
  const attribution = hasCurrentUtm ? current : stored;

  try {
    window.sessionStorage.setItem(attributionStorageKey, JSON.stringify(attribution));
  } catch {
    // Tracking must never interrupt the registration experience.
  }

  return attribution;
}

export function getStoredUtmAttribution() {
  return readStoredAttribution();
}
