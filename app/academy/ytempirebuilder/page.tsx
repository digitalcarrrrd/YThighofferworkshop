import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YT Empire Builders — Build a Faceless YouTube Channel",
  description:
    "Build and scale a faceless YouTube channel with AI systems, 12 in-depth modules, practical workbooks, and lifetime LMS community support.",
  alternates: {
    canonical: "https://www.abrarnadir.com/academy/ytempirebuilder",
  },
};

export default function YtEmpireBuildersPage() {
  return (
    <main
      style={{
        width: "100%",
        minHeight: "100dvh",
        background: "#0d0e13",
        overflow: "hidden",
      }}
    >
      <iframe
        src="/yt-empire-builders-v2.html?v=20260821-lms"
        title="YT Empire Builders"
        style={{
          display: "block",
          width: "100%",
          height: "100dvh",
          border: 0,
          background: "#0d0e13",
        }}
      />
    </main>
  );
}
