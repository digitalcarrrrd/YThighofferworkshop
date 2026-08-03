import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Abrar Nadir Learning Platform",
  robots: { index: false, follow: false },
};

export default function LearnPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        fontFamily: "system-ui, -apple-system, sans-serif",
        color: "#e0e0e0",
        backgroundColor: "#0a0a0a",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", marginBottom: "1rem" }}>
        Abrar Nadir Learning Platform
      </h1>
      <p style={{ fontSize: "1.125rem", color: "#888", maxWidth: "32rem" }}>
        LMS offer page content will be added here.
      </p>
    </main>
  );
}
