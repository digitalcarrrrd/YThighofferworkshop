import type { Metadata } from "next";
import WorkshopYt6Client from "./WorkshopYt6Client";

export const metadata: Metadata = {
  title: "YouTube Empire Builders — AI Se Dollar Earning Workshop | Abrar Nadir",
  description:
    "Aapke Saath Wala ChatGPT Se Exam Cheat Kar Raha Hai. Ek Banda Wahi ChatGPT Se Dollar Kama Raha Hai. 2-Hour Practical Live Workshop with Abrar Nadir.",
  alternates: {
    canonical: "https://www.abrarnadir.com/workshops/yt-6",
  },
};

export default function Yt6WorkshopPage() {
  return <WorkshopYt6Client />;
}
