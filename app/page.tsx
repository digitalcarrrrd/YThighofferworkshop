import { OfferLanding } from "@/components/offers/OfferLanding";
import { youtubeEmpireBuildersOffer } from "@/lib/offers/offers";

export default function Home() {
  return <OfferLanding offer={youtubeEmpireBuildersOffer} />;
}
