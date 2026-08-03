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
  return getActiveOffersForRoute("programs").map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const offer = getOfferByRoute("programs", slug);
  return offer ? getOfferMetadata(offer) : {};
}

export default async function ProgramPage({ params }: PageProps) {
  const { slug } = await params;
  const offer = getOfferByRoute("programs", slug);
  if (!offer) notFound();
  return <OfferLanding offer={offer} />;
}
