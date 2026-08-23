import type { Metadata } from "next";
import WorkshopYt3Client from "./WorkshopYt3Client";

export const metadata: Metadata = {
  title: "YouTube Empire Builders Live Workshop | Abrar Nadir",
  description:
    "Join Abrar Nadir's daily live workshop and build your faceless YouTube channel from scratch in just 2 hours. Live demo, templates, and 7-day WhatsApp support included.",
  alternates: {
    canonical: "https://www.abrarnadir.com/workshops/yt3",
  },
};

export default function Yt3WorkshopPage() {
  return <WorkshopYt3Client />;
}

