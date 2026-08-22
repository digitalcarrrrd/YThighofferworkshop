import type { Metadata } from "next";
import WorkshopYt7Client from "./WorkshopYt7Client";

export const metadata: Metadata = {
  title: "4 Saal Ki Degree. Pehla Din Ka Dollar. | Abrar Nadir",
  description:
    "Pakistan Ke Bachelor's Students Ke Liye: Degree Ke Saath YouTube Automation Se Dollar Income Build Karein. 2-Hour Practical Live Workshop with Abrar Nadir.",
  alternates: {
    canonical: "https://www.abrarnadir.com/yt-7",
  },
};

export default function Yt7WorkshopPage() {
  return <WorkshopYt7Client />;
}
