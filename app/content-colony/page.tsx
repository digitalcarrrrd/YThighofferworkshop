import type { Metadata } from "next";
import { Suspense } from "react";
import { ContentColonyClient } from "./ContentColonyClient";

export const metadata: Metadata = {
  title: "Content Colony — Creator Execution Residency | Johar Town, Lahore",
  description:
    "A residential creator execution compound in Johar Town, Lahore. Arrive with a goal. Leave with completed work. 10-Day Fast Entry, 15-Day Best Value, and 30-Day Residency.",
  openGraph: {
    title: "Content Colony — Creator Execution Residency",
    description:
      "Arrive with a goal. Leave with completed work. Real business models, data-trained AI workflows, 300 Mbps internet, and 1:1 execution reviews with Abrar Nadir.",
    url: "https://www.abrarnadir.com/content-colony",
  },
};

export default function ContentColonyPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#0c0a09" }} />}>
      <ContentColonyClient />
    </Suspense>
  );
}
