import type { Metadata } from "next";
import { WorkshopRegistrationForm } from "@/components/workshops/WorkshopRegistrationForm";
import { yt5Offer } from "@/lib/offers/offers";

export const metadata: Metadata = {
  title: "YouTube Monetization Secrets | Abrar Nadir",
  description: "Next-gen strategies for digital monetization.",
};

export default function YtEmpireBuilder5Page() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        color: "#0f172a",
        fontFamily: "Inter, system-ui, sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background gradients */}
      <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "50vw", height: "50vw", background: "linear-gradient(135deg, #c084fc, #818cf8)", filter: "blur(100px)", opacity: "0.4", borderRadius: "50%", zIndex: 0 }}></div>
      <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "40vw", height: "40vw", background: "linear-gradient(135deg, #f472b6, #fb923c)", filter: "blur(100px)", opacity: "0.3", borderRadius: "50%", zIndex: 0 }}></div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", padding: "4rem 2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center", minHeight: "100vh" }}>
        
        {/* Left Copy Section */}
        <div style={{ paddingRight: "2rem" }}>
          
          <h1 style={{ fontSize: "clamp(3rem, 5vw, 4.5rem)", fontWeight: "900", lineHeight: "1.1", marginBottom: "1.5rem", letterSpacing: "-0.04em" }}>
            The New Rules of <br/>
            <span style={{ backgroundImage: "linear-gradient(135deg, #c084fc, #f472b6)", WebkitBackgroundClip: "text", color: "transparent" }}>Monetization.</span>
          </h1>
          
          <p style={{ fontSize: "1.25rem", color: "#475569", lineHeight: "1.7", marginBottom: "2.5rem" }}>
            AdSense is dead. Learn how top creators are leveraging SaaS models, digital products, and high-ticket communities to generate 6-figure months from small audiences.
          </p>
          
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2rem" }}>
            <div style={{ background: "#ffffff", padding: "1rem 1.5rem", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#f3e8ff", color: "#a855f7", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>1</div>
              <div>
                <div style={{ fontWeight: "bold", fontSize: "0.875rem" }}>SaaS Creation</div>
                <div style={{ color: "#64748b", fontSize: "0.75rem" }}>No-code tools</div>
              </div>
            </div>
            <div style={{ background: "#ffffff", padding: "1rem 1.5rem", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#fce7f3", color: "#ec4899", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>2</div>
              <div>
                <div style={{ fontWeight: "bold", fontSize: "0.875rem" }}>High-Ticket</div>
                <div style={{ color: "#64748b", fontSize: "0.75rem" }}>Closing strategies</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Section */}
        <div style={{ zIndex: 2 }}>
          <WorkshopRegistrationForm
            offerId={yt5Offer.id}
            offerName={yt5Offer.title}
            workshopDate="Upcoming Weekend"
            variant="light"
          />
        </div>

      </div>
    </main>
  );
}
