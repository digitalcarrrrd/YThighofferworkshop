import type { Metadata } from "next";
import type { OfferConfig } from "./types";

const siteUrl = "https://abrarnadir.com";

export function getOfferMetadata(offer: OfferConfig): Metadata {
  const canonical = `${siteUrl}/${offer.routeFamily}/${offer.slug}`;

  return {
    title: `${offer.title} | Abrar Nadir`,
    description: offer.description,
    alternates: { canonical },
    openGraph: {
      title: offer.title,
      description: offer.description,
      url: canonical,
      siteName: offer.title,
      locale: "en_PK",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: offer.title,
      description: offer.description,
    },
  };
}
