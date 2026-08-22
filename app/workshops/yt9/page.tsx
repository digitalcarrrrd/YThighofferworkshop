import type { Metadata } from "next";
import WorkshopYt9Client from "./WorkshopYt9Client";

export const metadata: Metadata = {
  title: "Digital Zameen — AI Skills Workshop | Abrar Nadir",
  description:
    "Baap ne zameen di. Aap digital zameen do. 2-ghante ka live AI skills workshop — raat 8 se 10 baje PKT. Sirf 100 seats per batch.",
  alternates: {
    canonical: "https://www.abrarnadir.com/yt9",
  },
};

export default function Yt9WorkshopPage() {
  return <WorkshopYt9Client />;
}
