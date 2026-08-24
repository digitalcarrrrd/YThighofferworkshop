"use client";

import { useEffect, useMemo, useState } from "react";
import { captureUtmAttribution, getStoredUtmAttribution } from "@/lib/analytics";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export type WorkshopRegistrationFormProps = {
  offerId: string;
  offerName: string;
  workshopDate: string;
  submitLabel?: string;
  variant?: "dark" | "light" | "minimal" | "branded";
  className?: string;
  successMessage?: string;
  onSuccess?: () => void;
  initialData?: { fullName?: string; phone?: string };
  paymentMethods?: string[];
  hideContactFields?: boolean;
};

const ageRanges = ["Under 18", "18–24", "25–34", "35–44", "45+"];

function normalizePakistanPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (/^923\d{9}$/.test(digits)) return `+${digits}`;
  if (/^03\d{9}$/.test(digits)) return `+92${digits.slice(1)}`;
  if (/^3\d{9}$/.test(digits)) return `+92${digits}`;
  return null;
}

export function WorkshopRegistrationForm({
  offerId,
  offerName,
  workshopDate,
  submitLabel = "Reserve My Seat",
  variant = "light",
  className = "",
  successMessage = "Your request is saved. Our support team will confirm your seat on WhatsApp.",
  onSuccess,
  initialData,
}: WorkshopRegistrationFormProps) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [fullName, setFullName] = useState(initialData?.fullName || "");
  const [phone, setPhone] = useState(initialData?.phone || "");
  const [city, setCity] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [email, setEmail] = useState("");
  const [eventId, setEventId] = useState("");

  useEffect(() => {
    captureUtmAttribution();
    window.fbq?.("track", "ViewContent", { content_name: offerId, content_type: "workshop" });
  }, [offerId]);

  const whatsappUrl = useMemo(() => {
    const attribution = getStoredUtmAttribution();
    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "15553693691";
    const campaign = attribution.utm_campaign || "direct";
    const message = `Assalamualaikum. I registered for ${offerName}.\nName: ${fullName}\nWhatsApp: ${phone}\nCampaign: ${campaign}\nReference: ${eventId || "pending"}`;
    return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
  }, [eventId, fullName, offerName, phone]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");

    const normalizedPhone = normalizePakistanPhone(phone);
    if (!normalizedPhone) {
      setError("Enter a valid Pakistan WhatsApp number, for example +923001234567.");
      setBusy(false);
      return;
    }

    try {
      const attribution = getStoredUtmAttribution();
      const r = await fetch("/api/workshop-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          offerId,
          fullName,
          phone: normalizedPhone,
          city,
          ageRange,
          email,
          consent: true,
          landingPage: window.location.pathname,
          ...attribution,
        }),
      });
      const data = (await r.json()) as { ok?: boolean; error?: string; eventId?: string };
      if (!r.ok) throw new Error(data.error || "Submission failed. Please try again.");

      const confirmedEventId = data.eventId || crypto.randomUUID();
      setPhone(normalizedPhone);
      setEventId(confirmedEventId);
      setSuccess(true);
      window.fbq?.("track", "Lead", { content_name: offerId }, { eventID: confirmedEventId });
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const theme = `workshop-form theme-${variant} ${className}`;
  if (success) {
    return (
      <div className={`success-state ${theme}`}>
        <div aria-hidden="true" style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
        <h2>Registration received</h2>
        <p>{successMessage}</p>
        <p style={{ margin: "16px 0", fontSize: ".9rem" }}>Reference: {eventId}</p>
        <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn full whatsapp-btn" style={{ display: "block", textAlign: "center", textDecoration: "none", background: "#25D366", color: "white", padding: 14, borderRadius: 8, fontWeight: 700 }}>
          Continue on WhatsApp →
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={theme}>
      <div className="field"><label htmlFor={`${offerId}-name`}>Full Name</label><input id={`${offerId}-name`} required minLength={2} autoComplete="name" value={fullName} onChange={(e) => setFullName(e.target.value)} /></div>
      <div className="field"><label htmlFor={`${offerId}-phone`}>WhatsApp Number</label><input id={`${offerId}-phone`} required inputMode="tel" placeholder="+92 3XX XXXXXXX" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
      <div className="field"><label htmlFor={`${offerId}-city`}>City</label><input id={`${offerId}-city`} required autoComplete="address-level2" value={city} onChange={(e) => setCity(e.target.value)} /></div>
      <div className="field"><label htmlFor={`${offerId}-age`}>Age Range</label><select id={`${offerId}-age`} required value={ageRange} onChange={(e) => setAgeRange(e.target.value)}><option value="">Select age range</option>{ageRanges.map((value) => <option key={value}>{value}</option>)}</select></div>
      <div className="field"><label htmlFor={`${offerId}-email`}>Email Address (optional)</label><input id={`${offerId}-email`} type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
      <label style={{ display: "flex", gap: 10, alignItems: "flex-start", marginTop: 12, fontSize: ".85rem" }}><input type="checkbox" required style={{ marginTop: 3 }} /><span>I agree to receive workshop registration, payment and reminder messages from Abrar Nadir Workshops on WhatsApp. I can opt out at any time.</span></label>
      <input type="hidden" value={workshopDate} readOnly />
      {error && <p role="alert" style={{ color: "#ef4444", margin: "12px 0" }}>{error}</p>}
      <button type="submit" className="btn full submit-btn" disabled={busy} style={{ width: "100%", padding: 14, marginTop: 16 }}>{busy ? "Submitting…" : submitLabel}</button>
      <p style={{ fontSize: ".75rem", marginTop: 10, opacity: .72 }}>Your details are used for registration, attribution and WhatsApp follow-up.</p>
    </form>
  );
}
