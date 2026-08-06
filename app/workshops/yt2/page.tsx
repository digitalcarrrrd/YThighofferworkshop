import type { Metadata } from "next";
import { WorkshopRegistrationForm } from "@/components/workshops/WorkshopRegistrationForm";
import { yt2Offer } from "@/lib/offers/offers";

export const metadata: Metadata = {
  title: "Advanced AI Video Automation | Abrar Nadir",
  description: "Learn how to automate your video production with cutting-edge AI.",
};

export default function YtEmpireBuilder2Page() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#050505",
        color: "#ffffff",
        fontFamily: "Inter, system-ui, sans-serif",
        backgroundImage: "radial-gradient(circle at top right, rgba(59,130,246,0.15), transparent 40%), radial-gradient(circle at bottom left, rgba(236,72,153,0.15), transparent 40%)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
        
        {/* Left Copy Section */}
        <div style={{ paddingRight: "2rem" }}>
          <div style={{ display: "inline-block", padding: "0.5rem 1rem", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.3)", borderRadius: "99px", color: "#3b82f6", fontWeight: "bold", fontSize: "0.875rem", marginBottom: "2rem", letterSpacing: "1px", textTransform: "uppercase" }}>
            Workshop 02 — Cyberpunk Edition
          </div>
          
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: "900", lineHeight: "1.1", marginBottom: "1.5rem", letterSpacing: "-0.04em" }}>
            Advanced <span style={{ color: "transparent", WebkitTextStroke: "1px #ec4899", backgroundImage: "linear-gradient(to right, #3b82f6, #ec4899)", WebkitBackgroundClip: "text" }}>AI Video</span> Automation.
          </h1>
          
          <p style={{ fontSize: "1.25rem", color: "#9ca3af", lineHeight: "1.7", marginBottom: "2.5rem" }}>
            Stop spending 40 hours a week editing. Learn the exact AI workflows and autonomous agents I use to script, edit, and publish faceless channels on autopilot.
          </p>
          
          <div style={{ display: "flex", gap: "2rem", marginBottom: "3rem", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#ffffff" }}>10x</div>
              <div style={{ color: "#6b7280", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "1px" }}>Faster Production</div>
            </div>
            <div>
              <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#ffffff" }}>0</div>
              <div style={{ color: "#6b7280", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "1px" }}>Editing Skills Needed</div>
            </div>
          </div>
        </div>

        {/* Right Form Section */}
        <div style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "24px", padding: "3rem", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>Secure Your Seat</h2>
          <p style={{ color: "#9ca3af", marginBottom: "2rem" }}>Enter your details below to register and receive the payment instructions.</p>
          
          <WorkshopRegistrationForm
            offerId={yt2Offer.id}
            offerName={yt2Offer.title}
            workshopDate="Upcoming Weekend"
            variant="dark"
          />
        </div>

      </div>
    </main>
  );
}
