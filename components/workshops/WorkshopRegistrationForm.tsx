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
  successMessage = "Your payment details are saved. Our support team will confirm your seat on WhatsApp.",
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
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [eventId, setEventId] = useState("");

  useEffect(() => {
    captureUtmAttribution();
    window.fbq?.("track", "ViewContent", { content_name: offerId, content_type: "workshop" });
  }, [offerId]);

  const whatsappUrl = useMemo(() => {
    const attribution = getStoredUtmAttribution();
    const number = "15553693691";
    const campaign = attribution.utm_campaign || "direct";
    const message = `Assalamualaikum. I registered for ${offerName}.\nName: ${fullName}\nWhatsApp: ${phone}\nCampaign: ${campaign}\nReference: ${eventId || "pending"}`;
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
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

    if (!screenshotFile) {
      setError("Please attach your payment receipt screenshot to proceed.");
      setBusy(false);
      return;
    }

    let directImageUrl = "";

    // Upload screenshot to CDN
    try {
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (ev) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const maxDim = 1200;
            let w = img.width, h = img.height;
            if (w > maxDim || h > maxDim) {
              if (w > h) { h = Math.round((h * maxDim) / w); w = maxDim; }
              else { w = Math.round((w * maxDim) / h); h = maxDim; }
            }
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext("2d");
            ctx?.drawImage(img, 0, 0, w, h);
            resolve(canvas.toDataURL("image/jpeg", 0.82));
          };
          img.onerror = () => resolve(ev.target?.result as string || "");
          img.src = ev.target?.result as string || "";
        };
        reader.onerror = () => resolve("");
        reader.readAsDataURL(screenshotFile);
      });

      if (base64) {
        const rawB64 = base64.replace(/^data:[^;]+;base64,/, "");
        const fd = new FormData();
        fd.append("image", rawB64);
        const cdnRes = await fetch("https://api.imgbb.com/1/upload?key=8e68407f1543be8e5616f73315a6bfa9", {
          method: "POST",
          body: fd,
        });
        const cdnJson = await cdnRes.json();
        if (cdnJson?.data?.url) {
          directImageUrl = cdnJson.data.url;
        }
      }
    } catch (cdnErr) {
      console.warn("Workshop screenshot CDN upload note:", cdnErr);
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
          screenshotUrl: directImageUrl,
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
        <h2>Registration & Payment Proof Saved</h2>
        <p>{successMessage}</p>
        <p style={{ margin: "16px 0", fontSize: ".9rem" }}>Reference: {eventId}</p>
        <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn full whatsapp-btn" style={{ display: "block", textAlign: "center", textDecoration: "none", background: "#25D366", color: "white", padding: 14, borderRadius: 8, fontWeight: 700 }}>
          Continue on WhatsApp (+1 555-369-3691) →
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
      
      <div className="field" style={{ marginTop: 12 }}>
        <label htmlFor={`${offerId}-screenshot`} style={{ display: "block", fontWeight: 700, marginBottom: 6, fontSize: ".9rem" }}>
          Attach Payment Receipt Screenshot (Required) <span style={{ color: "#ef4444" }}>*</span>
        </label>
        <input
          id={`${offerId}-screenshot`}
          type="file"
          accept="image/*,application/pdf"
          required
          style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.05)", fontSize: "12px", color: "#9ca3af" }}
          onChange={(e) => setScreenshotFile(e.target.files?.[0] || null)}
        />
      </div>

      <label style={{ display: "flex", gap: 10, alignItems: "flex-start", marginTop: 14, fontSize: ".85rem" }}>
        <input type="checkbox" required style={{ marginTop: 3 }} />
        <span>I agree to receive workshop registration, payment and reminder messages from Abrar Nadir Workshops on WhatsApp. I can opt out at any time.</span>
      </label>
      <input type="hidden" value={workshopDate} readOnly />
      {error && <p role="alert" style={{ color: "#ef4444", margin: "12px 0" }}>{error}</p>}
      <button type="submit" className="btn full submit-btn" disabled={busy} style={{ width: "100%", padding: 14, marginTop: 16 }}>{busy ? "Uploading proof & submitting…" : submitLabel}</button>
      <p style={{ fontSize: ".75rem", marginTop: 10, opacity: .72 }}>Your details and receipt are verified on WhatsApp.</p>
    </form>
  );
}
