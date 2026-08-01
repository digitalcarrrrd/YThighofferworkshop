import { ClientLanding } from "@/components/ClientLanding";
import type { OfferConfig } from "@/lib/offers/types";

export function OfferLanding({ offer }: { offer: OfferConfig }) {
  switch (offer.template) {
    case "youtube-empire-builders":
      return <ClientLanding offer={offer} />;
  }
}
