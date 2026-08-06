import type { Metadata } from "next";
import { WorkshopRegistrationForm } from "@/components/workshops/WorkshopRegistrationForm";
import { yt3Offer } from "@/lib/offers/offers";

export const metadata: Metadata = {
  title: "The Faceless Creator Blueprint | Abrar Nadir",
  description: "An elegant, high-end editorial approach to building faceless empires.",
};

export default function YtEmpireBuilder3Page() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
        color: "#111827",
        fontFamily: "'Times New Roman', Times, serif",
      }}
    >
      {/* Editorial Header */}
      <header style={{ padding: "3rem", borderBottom: "1px solid #d1d5db", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: "1.25rem", letterSpacing: "4px", textTransform: "uppercase", fontWeight: "300" }}>Abrar Nadir</div>
        <div style={{ fontSize: "0.875rem", fontFamily: "system-ui, sans-serif", letterSpacing: "1px", textTransform: "uppercase" }}>Vol. III — Workshop</div>
      </header>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "6rem 2rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(3rem, 7vw, 6rem)", fontWeight: "400", lineHeight: "1", margin: "0 auto 2rem", fontStyle: "italic" }}>
          The Faceless <br/> Creator Blueprint.
        </h1>
        
        <p style={{ fontFamily: "system-ui, sans-serif", fontSize: "1.125rem", color: "#4b5563", lineHeight: "1.8", maxWidth: "600px", margin: "0 auto 4rem", fontWeight: "300" }}>
          A masterclass on building highly profitable YouTube assets without ever stepping in front of a camera. Discover the art of storytelling, elite voiceovers, and premium packaging.
        </p>
      </div>

      {/* Form Section */}
      <div style={{ maxWidth: "600px", margin: "0 auto 8rem", fontFamily: "system-ui, sans-serif" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "3px", fontWeight: "bold" }}>Request Access</h2>
        </div>
        
        <WorkshopRegistrationForm
          offerId={yt3Offer.id}
          offerName={yt3Offer.title}
          workshopDate="Invitation Only"
          variant="minimal"
        />
      </div>
      
      <footer style={{ borderTop: "1px solid #d1d5db", padding: "2rem", textAlign: "center", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "2px", color: "#6b7280" }}>
        © 2026 Digital Carrrrd. All Rights Reserved.
      </footer>
    </main>
  );
}
