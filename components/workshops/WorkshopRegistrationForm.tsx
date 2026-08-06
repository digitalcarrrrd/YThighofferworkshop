"use client";

import { useState } from "react";
import { getStoredUtmAttribution } from "@/lib/analytics";

export type WorkshopRegistrationFormProps = {
  offerId: string;
  offerName: string;
  workshopDate: string;
  submitLabel?: string;
  variant?: "dark" | "light" | "minimal" | "branded";
  className?: string;
  paymentMethods?: string[];
  successMessage?: string;
  onSuccess?: () => void;
};

export function WorkshopRegistrationForm({
  offerId,
  offerName,
  workshopDate,
  submitLabel = "Submit Registration",
  variant = "light",
  className = "",
  paymentMethods = ["Bank Transfer", "Easypaisa/JazzCash"],
  successMessage = "After payment verification, the workshop link will be sent on WhatsApp.",
  onSuccess,
}: WorkshopRegistrationFormProps) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0] || "Bank Transfer");
  
  const baseClasses = "workshop-form";
  const variantClasses = {
    dark: "theme-dark",
    light: "theme-light",
    minimal: "theme-minimal",
    branded: "theme-branded",
  };

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");

    try {
      const formElement = e.currentTarget;
      const fileInput = formElement.querySelector<HTMLInputElement>('input[type="file"]');
      const proof = fileInput?.files?.[0];

      if (proof) {
        if (!["image/jpeg", "image/png", "image/webp"].includes(proof.type)) {
          throw new Error("Invalid screenshot type. Only JPG, PNG, and WebP are allowed.");
        }
        if (proof.size > 5_000_000) {
          throw new Error("Screenshot must be smaller than 5MB.");
        }
      }

      const body = new FormData(formElement);
      body.set("offerId", offerId);
      body.set("offerName", offerName);
      body.set("batchDate", workshopDate);
      body.set("paymentMethod", paymentMethod);
      body.set("landingPage", window.location.pathname);
      Object.entries(getStoredUtmAttribution()).forEach(([key, value]) => body.set(key, value));

      const r = await fetch("/api/workshop-registration", { method: "POST", body });
      const data = await r.json() as { ok?: boolean; error?: string };
      
      if (!r.ok) {
        throw new Error(data.error || "Submission failed. Please try again.");
      }

      setSuccess(true);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (success) {
    const waText = `Assalamualaikum.

I have submitted my workshop registration.

Name: ${fullName}
Email: ${email}
WhatsApp: ${phone}
Offer: ${offerName}
Transaction ID: ${transactionId || "Not provided"}
Status: Payment Pending Verification

Please verify my payment and confirm my seat.`;

    return (
      <div className={`success-state ${baseClasses} ${variantClasses[variant]} ${className}`}>
        <div className="check" style={{ fontSize: "40px", marginBottom: "16px" }}>✅</div>
        <h2>Registration received!</h2>
        <p>{successMessage}</p>
        <p style={{ marginTop: "16px", marginBottom: "16px", fontSize: "0.9rem", color: "#64748b" }}>
          Please click the button below to send your confirmation on WhatsApp.
        </p>
        <a
          href={`https://wa.me/923213823702?text=${encodeURIComponent(waText)}`}
          target="_blank"
          rel="noreferrer"
          className="btn full whatsapp-btn"
          style={{ display: "block", textAlign: "center", textDecoration: "none", background: "#25D366", color: "white", padding: "12px", borderRadius: "8px", fontWeight: "bold" }}
        >
          Confirm Payment on WhatsApp →
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      <div className="field">
        <label>Full Name</label>
        <input name="fullName" required minLength={2} autoComplete="name" value={fullName} onChange={e => setFullName(e.target.value)} />
      </div>
      <div className="field">
        <label>WhatsApp Number</label>
        <input name="phone" required inputMode="tel" placeholder="+92 3XX XXXXXXX" autoComplete="tel" value={phone} onChange={e => setPhone(e.target.value)} />
      </div>
      <div className="field">
        <label>Email Address</label>
        <input name="email" type="email" required autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} />
      </div>

      {paymentMethods.length > 0 && (
        <div className="field">
          <label>Payment Method</label>
          <select name="paymentMethod" value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} required>
            {paymentMethods.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
      )}

      <div className="field">
        <label>Transaction ID (Optional)</label>
        <input name="transactionId" value={transactionId} onChange={e => setTransactionId(e.target.value)} />
      </div>
      <div className="field">
        <label>Payment Screenshot (JPG, PNG or WebP — max 5MB)</label>
        <input name="paymentProof" type="file" required accept="image/jpeg,image/png,image/webp" capture="environment" />
      </div>
      
      {error && <p className="error" style={{ color: "#ef4444", marginTop: "8px", marginBottom: "16px" }}>{error}</p>}
      
      <button type="submit" className="btn full submit-btn" disabled={busy} style={{ width: "100%", padding: "12px", marginTop: "16px" }}>
        {busy ? "Submitting…" : submitLabel}
      </button>
    </form>
  );
}
