import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OfferLanding } from "@/components/offers/OfferLanding";
import {
  getActiveOffersForRoute,
  getOfferByRoute,
} from "@/lib/offers/offers";
import { getOfferMetadata } from "@/lib/offers/metadata";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getActiveOffersForRoute("cohorts").map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const offer = getOfferByRoute("cohorts", slug);
  return offer ? getOfferMetadata(offer) : {};
}

export default async function CohortPage({ params }: PageProps) {
  const { slug } = await params;
  const offer = getOfferByRoute("cohorts", slug);
  if (!offer) notFound();
  return <OfferLanding offer={offer} />;
}
