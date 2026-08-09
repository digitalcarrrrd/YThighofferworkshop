"use client";
import { useState, useRef, useEffect } from "react";
import { plans, type PlanId } from "./content/site";
import "./booking-modal.css";

type Step = 1 | 2 | 3;

interface BookingModalProps {
  onClose: () => void;
  selectedPlanId: PlanId;
}

export default function BookingModal({ onClose, selectedPlanId }: BookingModalProps) {
  const [step, setStep] = useState<Step>(1);
  const [paymentTab, setPaymentTab] = useState<"bank" | "easypaisa" | "crypto">("bank");
  const [isCopied, setIsCopied] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [fileName, setFileName] = useState("");
  const [opportunityId, setOpportunityId] = useState<string | null>(null);

  // Get the selected plan details
  const selectedPlan = plans.find(p => p.id === selectedPlanId) || plans[1]; // fallback to lifetime

  // Parse numeric value from price string for GHL monetary value
  const getMonetaryValue = (): number => {
    if (selectedPlan.id === "monthly") return 3000;
    if (selectedPlan.id === "lifetime") return 30000;
    if (selectedPlan.id === "installments") return 33000;
    return 0;
  };

  // Form data persisted across steps
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    transactionId: "",
  });

  const fileRef = useRef<HTMLInputElement>(null);

  // Countdown + redirect on step 3
  useEffect(() => {
    if (step !== 3) return;
    if (countdown <= 0) {
      const msg = encodeURIComponent(
        `Assalam o Alaikum! 👋\n\nI just enrolled in YTEMPIRE BUILDERs Academy.\n\n📦 Plan: ${selectedPlan.name}\n💰 Amount: ${selectedPlan.price}\n📛 Name: ${formData.name}\n📧 Email: ${formData.email}\n📱 WhatsApp: ${formData.phone}\n💳 Transaction ID: ${formData.transactionId || "Attached screenshot"}\n\nPlease confirm my payment and grant LMS access. JazakAllah! 🙏`
      );
      window.open(`https://wa.me/923213823702?text=${msg}`, "_blank");
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [step, countdown, formData, selectedPlan]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(id);
    setTimeout(() => setIsCopied(""), 2000);
  };

  // ── Step 1: Capture lead → "New Lead" stage ──
  const handleStep1 = async () => {
    if (!formData.name || !formData.email || !formData.phone) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/academy-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          stage: "new-lead",
          plan: selectedPlan.id,
          monetaryValue: getMonetaryValue(),
        }),
      });
      const data = await res.json();
      if (data.opportunityId) {
        setOpportunityId(data.opportunityId);
      }
    } catch (err) {
      console.error("Lead capture failed", err);
    }
    setIsSubmitting(false);
    setStep(2);
  };

  // ── Step 2: Move to "Payment Sent" stage ──
  const handleStep2 = async () => {
    setIsSubmitting(true);
    try {
      await fetch("/api/academy-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          stage: "payment-sent",
          plan: selectedPlan.id,
          monetaryValue: getMonetaryValue(),
          opportunityId: opportunityId,
        }),
      });
    } catch (err) {
      console.error("Stage update failed", err);
    }
    setIsSubmitting(false);
    setStep(3);
    setCountdown(5);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  return (
    <div className="bm-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bm-modal">
        <button className="bm-close" onClick={onClose} aria-label="Close">×</button>

        {/* Progress Bar */}
        <div className="bm-progress">
          {[1, 2, 3].map((s) => (
            <div key={s} className="bm-progress-step">
              <div className={`bm-progress-circle ${step > s ? "completed" : step === s ? "active" : ""}`}>
                {step > s ? "✓" : s}
              </div>
              <span className={`bm-progress-label ${step >= s ? "active" : ""}`}>
                {s === 1 ? "Details" : s === 2 ? "Payment" : "Done"}
              </span>
              {s < 3 && <div className={`bm-progress-line ${step > s ? "completed" : ""}`} />}
            </div>
          ))}
        </div>

        {/* ── STEP 1: Lead Capture ── */}
        {step === 1 && (
          <div className="bm-step bm-fadeIn">
            <div className="bm-badge">{selectedPlan.name}</div>
            <h2 className="bm-step-title">Start your journey 🚀</h2>
            <p className="bm-step-subtitle">Enter your details to reserve your spot in the academy.</p>

            <div className="bm-price-display">
              <span className="bm-price-amount">{selectedPlan.price}</span>
              <span className="bm-price-label">{selectedPlan.cadence}</span>
            </div>

            <div className="bm-field">
              <label>Full Name</label>
              <input
                className="bm-input"
                type="text"
                placeholder="e.g. Ahmed Khan"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="bm-field">
              <label>Email Address</label>
              <input
                className="bm-input"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="bm-field">
              <label>WhatsApp Number</label>
              <input
                className="bm-input"
                type="tel"
                placeholder="+92 321 1234567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>

            <div className="bm-trust-row">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
              <span>Your information is secure & never shared</span>
            </div>

            <div className="bm-actions">
              <button
                className="bm-btn-primary"
                onClick={handleStep1}
                disabled={isSubmitting || !formData.name || !formData.email || !formData.phone}
              >
                {isSubmitting ? "Saving..." : "Next → Payment Details"}
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2: Payment ── */}
        {step === 2 && (
          <div className="bm-step bm-fadeIn">
            <h2 className="bm-step-title">Complete Payment 💳</h2>
            <p className="bm-step-subtitle">Send <strong>{selectedPlan.price}</strong> ({selectedPlan.cadence}) using any method below, then attach proof.</p>

            <div className="bm-payment-tabs">
              <button className={`bm-payment-tab ${paymentTab === "bank" ? "active" : ""}`} onClick={() => setPaymentTab("bank")}>🏦 Bank</button>
              <button className={`bm-payment-tab ${paymentTab === "easypaisa" ? "active" : ""}`} onClick={() => setPaymentTab("easypaisa")}>📱 JazzCash</button>
              <button className={`bm-payment-tab ${paymentTab === "crypto" ? "active" : ""}`} onClick={() => setPaymentTab("crypto")}>₿ Crypto</button>
            </div>

            <div className="bm-detail-card">
              {paymentTab === "bank" && (
                <>
                  <p className="bm-detail-label">MEEZAN Bank Limited</p>
                  <p className="bm-detail-name">Muhammad Abrar</p>
                  <div className="bm-copy-row">
                    <div>
                      <small>Account Number</small>
                      <p>02370103321036</p>
                    </div>
                    <button className={`bm-copy-btn ${isCopied === "acc" ? "copied" : ""}`} onClick={() => copyToClipboard("02370103321036", "acc")}>
                      {isCopied === "acc" ? "✓ Copied" : "Copy"}
                    </button>
                  </div>
                  <div className="bm-copy-row">
                    <div>
                      <small>IBAN</small>
                      <p>PK39MEZN0002370103321036</p>
                    </div>
                    <button className={`bm-copy-btn ${isCopied === "iban" ? "copied" : ""}`} onClick={() => copyToClipboard("PK39MEZN0002370103321036", "iban")}>
                      {isCopied === "iban" ? "✓ Copied" : "Copy"}
                    </button>
                  </div>
                </>
              )}
              {paymentTab === "easypaisa" && (
                <>
                  <p className="bm-detail-label">JazzCash / EasyPaisa</p>
                  <p className="bm-detail-name">Muhammad Abrar Ghauri</p>
                  <div className="bm-copy-row">
                    <div>
                      <small>Mobile Number</small>
                      <p>03274532186</p>
                    </div>
                    <button className={`bm-copy-btn ${isCopied === "easy" ? "copied" : ""}`} onClick={() => copyToClipboard("03274532186", "easy")}>
                      {isCopied === "easy" ? "✓ Copied" : "Copy"}
                    </button>
                  </div>
                </>
              )}
              {paymentTab === "crypto" && (
                <>
                  <p className="bm-detail-label">Binance Pay</p>
                  <p className="bm-detail-name">abrarnadircb</p>
                  <div className="bm-copy-row">
                    <div>
                      <small>Binance ID</small>
                      <p>117971802</p>
                    </div>
                    <button className={`bm-copy-btn ${isCopied === "binance" ? "copied" : ""}`} onClick={() => copyToClipboard("117971802", "binance")}>
                      {isCopied === "binance" ? "✓ Copied" : "Copy"}
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="bm-field">
              <label>Transaction ID</label>
              <input
                className="bm-input"
                type="text"
                placeholder="Enter your Transaction ID"
                value={formData.transactionId}
                onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
              />
            </div>

            <div className="bm-field">
              <label>Payment Screenshot</label>
              <div className="bm-file-upload" onClick={() => fileRef.current?.click()}>
                <input type="file" ref={fileRef} accept="image/*" onChange={handleFileChange} hidden />
                {fileName ? (
                  <p className="bm-file-name">📎 {fileName}</p>
                ) : (
                  <>
                    <span className="bm-file-icon">📤</span>
                    <p>Tap to upload screenshot</p>
                    <small>PNG, JPG up to 5MB</small>
                  </>
                )}
              </div>
            </div>

            <div className="bm-actions">
              <button className="bm-btn-back" onClick={() => setStep(1)}>← Back</button>
              <button
                className="bm-btn-primary"
                onClick={handleStep2}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Confirming..." : "Confirm Payment →"}
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: Thank You ── */}
        {step === 3 && (
          <div className="bm-step bm-fadeIn">
            <div className="bm-thank-you">
              <div className="bm-confetti-container">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className={`bm-confetti-dot dot-${i}`} />
                ))}
              </div>
              <div className="bm-check-circle">✓</div>
              <h2 className="bm-step-title">Payment Submitted! 🎉</h2>
              <p className="bm-step-subtitle">
                Thank you, <strong>{formData.name}</strong>! Your payment of <strong>{selectedPlan.price}</strong> is being verified.
              </p>
              <p className="bm-step-subtitle">
                Redirecting you to WhatsApp to confirm your payment...
              </p>
              <div className="bm-countdown">
                Redirecting in <strong>{countdown}</strong>s
              </div>
              <button
                className="bm-btn-primary bm-whatsapp-btn"
                onClick={() => {
                  const msg = encodeURIComponent(
                    `Assalam o Alaikum! 👋\n\nI just enrolled in YTEMPIRE BUILDERs Academy.\n\n📦 Plan: ${selectedPlan.name}\n💰 Amount: ${selectedPlan.price}\n📛 Name: ${formData.name}\n📧 Email: ${formData.email}\n📱 WhatsApp: ${formData.phone}\n💳 Transaction ID: ${formData.transactionId || "Attached screenshot"}\n\nPlease confirm my payment and grant LMS access. JazakAllah! 🙏`
                  );
                  window.open(`https://wa.me/923213823702?text=${msg}`, "_blank");
                }}
              >
                Open WhatsApp Now 💬
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
