import type { Metadata } from "next";
import { WorkshopRegistrationForm } from "@/components/workshops/WorkshopRegistrationForm";
import { yt4Offer } from "@/lib/offers/offers";

export const metadata: Metadata = {
  title: "Viral Hook Mastery | Abrar Nadir",
  description: "Learn how to hook viewers in the first 3 seconds.",
};

export default function YtEmpireBuilder4Page() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffeb3b",
        color: "#000000",
        fontFamily: "'Arial Black', Impact, sans-serif",
      }}
    >
      <div style={{ padding: "1rem", background: "#000000", color: "#ffffff", textAlign: "center", textTransform: "uppercase", letterSpacing: "2px", fontSize: "0.875rem", fontFamily: "sans-serif", fontWeight: "bold" }}>
        🚨 WARNING: THIS WORKSHOP WILL CHANGE HOW YOU CREATE VIDEOS FOREVER 🚨
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 2rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
        
        <h1 style={{ fontSize: "clamp(3rem, 9vw, 8rem)", lineHeight: "0.9", textTransform: "uppercase", textAlign: "center", margin: "2rem 0", textShadow: "6px 6px 0px #000000", color: "#ffffff" }}>
          VIRAL HOOK <br/> <span style={{ color: "#dc2626" }}>MASTERY</span>
        </h1>
        
        <p style={{ fontFamily: "sans-serif", fontSize: "1.5rem", fontWeight: "900", maxWidth: "800px", textAlign: "center", margin: "0 auto 4rem", lineHeight: "1.4", background: "#000000", color: "#ffffff", padding: "1.5rem", borderRadius: "12px", transform: "rotate(-2deg)" }}>
          The secret framework behind millions of views. Learn exactly what to say in the first 3 seconds to keep viewers glued to your content.
        </p>

        {/* Form Section */}
        <div style={{ maxWidth: "700px", width: "100%", fontFamily: "sans-serif" }}>
          <WorkshopRegistrationForm
            offerId={yt4Offer.id}
            offerName={yt4Offer.title}
            workshopDate="This Friday"
            variant="branded"
          />
        </div>
      </div>
    </main>
  );
}
