import type { Metadata } from "next";
import Yt5App from "./src/App";

export const metadata: Metadata = {
  title: "Digital Zameen — YouTube Live Workshop | Abrar Nadir",
  description:
    "Daily live YouTube automation & Digital Zameen workshop with Abrar Nadir. 2-Hour practical live demo, templates, and 7-day WhatsApp support included.",
  alternates: {
    canonical: "https://www.abrarnadir.com/workshops/yt5",
  },
};

export default function YtEmpireBuilder5Page() {
  return <Yt5App />;
}

