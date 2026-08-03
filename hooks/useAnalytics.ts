"use client";

import { useCallback, useEffect } from "react";
import {
  captureUtmAttribution,
  type AnalyticsEvent,
} from "@/lib/analytics";
import type { OfferConfig } from "@/lib/offers/types";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

type AnalyticsData = Record<string, string | number | boolean | null | undefined>;

const metaEvents: Partial<Record<AnalyticsEvent, string>> = {
  payment_modal_open: "InitiateCheckout",
  registration_success: "CompleteRegistration",
};

export function useAnalytics(offer: OfferConfig) {
  useEffect(() => {
    captureUtmAttribution();
  }, []);

  const track = useCallback(
    (event: AnalyticsEvent, data: AnalyticsData = {}) => {
      const attribution = captureUtmAttribution();
      const payload = {
        offer_id: offer.metaPixelOfferId,
        offer_type: offer.type,
        offer_name: offer.title,
        audience_segment: offer.audienceSegment,
        landing_page: window.location.pathname,
        value: offer.conversionValue,
        currency: offer.currency,
        ...attribution,
        ...data,
      };

      window.dataLayer?.push({ event, ...payload });
      window.gtag?.("event", event, payload);

      const metaEvent = metaEvents[event];
      if (metaEvent) window.fbq?.("track", metaEvent, payload);

      if (process.env.NODE_ENV === "development") {
        console.info("[analytics]", event, payload);
      }
    },
    [offer],
  );

  return { track };
}
