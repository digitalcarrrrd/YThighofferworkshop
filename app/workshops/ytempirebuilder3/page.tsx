import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workshop Landing Page 3",
  robots: { index: false, follow: false },
};

export default function YtEmpireBuilder3Page() {
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
        Workshop Landing Page 3
      </h1>
      <p style={{ fontSize: "1.125rem", color: "#888", maxWidth: "32rem" }}>
        Landing page content will be added here.
      </p>
      <p
        style={{
          marginTop: "2rem",
          fontSize: "0.875rem",
          color: "#555",
          fontFamily: "monospace",
        }}
      >
        /workshops/ytempirebuilder3
      </p>
    </main>
  );
}
