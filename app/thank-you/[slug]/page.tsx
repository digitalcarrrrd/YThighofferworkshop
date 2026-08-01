import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getOfferByThankYouSlug, offers } from "@/lib/offers/offers";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return offers
    .filter((offer) => offer.status === "active")
    .map((offer) => ({ slug: offer.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const offer = getOfferByThankYouSlug(slug);
  return {
    title: offer ? `Registration Received | ${offer.title}` : "Registration Received",
    robots: { index: false, follow: false },
  };
}

export default async function ThankYouPage({ params }: PageProps) {
  const { slug } = await params;
  const offer = getOfferByThankYouSlug(slug);
  if (!offer) notFound();

  return (
    <main className="thank-you-page">
      <section className="thank-you-panel">
        <span className="thank-you-check" aria-hidden="true">OK</span>
        <p className="section-code">REGISTRATION RECEIVED</p>
        <h1>Thank you. Your details are with our team.</h1>
        <p>
          Payment proof is reviewed manually. After verification, your workshop
          joining details will be sent on WhatsApp.
        </p>
        <Link className="sales-btn" href={`/${offer.routeFamily}/${offer.slug}`}>
          Return to workshop
        </Link>
      </section>
    </main>
  );
}
