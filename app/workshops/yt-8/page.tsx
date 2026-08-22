import type { Metadata } from "next";
import WorkshopYt8Client from "./WorkshopYt8Client";

export const metadata: Metadata = {
  title: "Aapke Saath Wala ChatGPT Se Exam Cheat Kar Raha Hai | Abrar Nadir",
  description:
    "Ek Banda Wahi ChatGPT Se Dollar Kama Raha Hai. Dono Ek Hi Class Mein Hain. Fark Sirf Ek Raat Ka Hai. 2-Hour Live Workshop with Abrar Nadir.",
  alternates: {
    canonical: "https://www.abrarnadir.com/yt8",
  },
};

export default function Yt8WorkshopPage() {
  return <WorkshopYt8Client />;
}
