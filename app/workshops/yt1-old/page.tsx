import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Abrar Nadir | Workshop Coming Soon",
  robots: { index: false, follow: false },
};

export default function YtEmpireBuilder1Page() {
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
        color: "#ffffff",
        backgroundColor: "#000000",
        textAlign: "center",
      }}
    >
      <div style={{ padding: "3rem", border: "1px solid #333", borderRadius: "12px", background: "#0a0a0a", maxWidth: "600px", width: "100%" }}>
        <div style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.5rem", letterSpacing: "1px" }}>
          ABRAR NADIR
        </div>
        <div style={{ width: "40px", height: "4px", backgroundColor: "#ff0000", margin: "0 auto 2rem auto" }}></div>
        
        <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", marginBottom: "1rem", fontWeight: "600" }}>
          Workshop Landing Page Coming Soon
        </h1>
        
        <p style={{ fontSize: "1.125rem", color: "#a0a0a0", lineHeight: "1.6", marginBottom: "2rem" }}>
          This workshop page is currently under construction. Please check back later for full details and access.
        </p>
        
        <p
          style={{
            fontSize: "0.875rem",
            color: "#555",
            fontFamily: "monospace",
            marginTop: "1rem"
          }}
        >
          /workshops/ytempirebuilder1
        </p>
      </div>
    </main>
  );
}
