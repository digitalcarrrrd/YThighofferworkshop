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
const defaultPaymentMethods = ["Meezan Bank", "Easypaisa", "JazzCash", "Binance"];

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
  successMessage = "Your payment details are saved. Please tap below to send verification on WhatsApp.",
  onSuccess,
  initialData,
  paymentMethods,
  hideContactFields = false,
}: WorkshopRegistrationFormProps) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [fullName, setFullName] = useState(initialData?.fullName || "");
  const [phone, setPhone] = useState(initialData?.phone || "");
  const [city, setCity] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods?.[0] || "Meezan Bank");
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [eventId, setEventId] = useState("");
  const [generatedScreenshotUrl, setGeneratedScreenshotUrl] = useState("");

  useEffect(() => {
    captureUtmAttribution();
    window.fbq?.("track", "ViewContent", { content_name: offerId, content_type: "workshop" });
  }, [offerId]);

  const whatsappUrl = useMemo(() => {
    const number = "923266641695";
    const todayFormatted = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }).format(new Date());

    const message = `Salam Abrar Nadir & Support Team! Main ne YouTube Live Workshop (${offerName}) ke liye payment transfer kar di hai.\n\n• Name: ${fullName || "Attendee"}\n• WhatsApp: ${phone || "N/A"}\n• Email: ${email || "N/A"}\n• Payment Method: ${paymentMethod}\n• Batch Date: ${todayFormatted}\n• Amount Paid: PKR 1,999\n\nI have attached my payment screenshot. Please verify and share the confirmed Zoom link & WhatsApp community invite. Shukriya! 😊`;

    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  }, [email, fullName, offerName, paymentMethod, phone]);

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
    let rawBase64 = "";

    // Upload screenshot to CDN
    try {
      rawBase64 = await new Promise<string>((resolve) => {
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

      if (rawBase64) {
        const cleanB64 = rawBase64.replace(/^data:[^;]+;base64,/, "");
        const fd = new FormData();
        fd.append("image", cleanB64);
        const cdnRes = await fetch("https://api.imgbb.com/1/upload?key=8e68407f1543be8e5616f73315a6bfa9", {
          method: "POST",
          body: fd,
        });
        const cdnJson = await cdnRes.json();
        if (cdnJson?.data?.url) {
          directImageUrl = cdnJson.data.url;
          setGeneratedScreenshotUrl(directImageUrl);
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
          paymentMethod,
          screenshotUrl: directImageUrl,
          screenshot: rawBase64,
          consent: true,
          landingPage: window.location.pathname,
          ...attribution,
        }),
      });
      const data = (await r.json()) as { ok?: boolean; error?: string; eventId?: string; screenshotUrl?: string };
      if (!r.ok) throw new Error(data.error || "Submission failed. Please try again.");

      const confirmedEventId = data.eventId || crypto.randomUUID();
      setPhone(normalizedPhone);
      setEventId(confirmedEventId);
      if (data.screenshotUrl) setGeneratedScreenshotUrl(data.screenshotUrl);
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
      <div className={`success-state ${theme}`} style={{ textAlign: "center", padding: "24px 16px" }}>
        <div aria-hidden="true" style={{ fontSize: 48, marginBottom: 14 }}>✅</div>
        <h2 style={{ fontSize: "22px", fontWeight: 900, marginBottom: 8 }}>Registration Saved!</h2>
        <p style={{ fontSize: "14px", opacity: .85, marginBottom: 18 }}>{successMessage}</p>
        
        {generatedScreenshotUrl && (
          <div style={{ marginBottom: 16, padding: 10, background: "rgba(47,217,126,0.1)", borderRadius: 8, border: "1px solid rgba(47,217,126,0.3)" }}>
            <span style={{ fontSize: "12px", color: "#2FD97E", fontWeight: "bold" }}>Screenshot Uploaded ✓</span>
          </div>
        )}

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="btn full whatsapp-btn"
          style={{
            display: "block",
            textAlign: "center",
            textDecoration: "none",
            background: "#25D366",
            color: "white",
            padding: "16px 20px",
            borderRadius: 10,
            fontWeight: 800,
            fontSize: "16px",
            boxShadow: "0 8px 24px rgba(37, 211, 102, 0.4)",
          }}
        >
          Open WhatsApp to Verify Seat →
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={theme}>
      {!hideContactFields && (
        <>
          <div className="field"><label htmlFor={`${offerId}-name`}>Full Name</label><input id={`${offerId}-name`} required minLength={2} autoComplete="name" value={fullName} onChange={(e) => setFullName(e.target.value)} /></div>
          <div className="field"><label htmlFor={`${offerId}-phone`}>WhatsApp Number</label><input id={`${offerId}-phone`} required inputMode="tel" placeholder="+92 3XX XXXXXXX" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
        </>
      )}
      <div className="field"><label htmlFor={`${offerId}-city`}>City</label><input id={`${offerId}-city`} required autoComplete="address-level2" value={city} onChange={(e) => setCity(e.target.value)} /></div>
      <div className="field"><label htmlFor={`${offerId}-age`}>Age Range</label><select id={`${offerId}-age`} required value={ageRange} onChange={(e) => setAgeRange(e.target.value)}><option value="">Select age range</option>{ageRanges.map((value) => <option key={value}>{value}</option>)}</select></div>
      <div className="field"><label htmlFor={`${offerId}-email`}>Email Address</label><input id={`${offerId}-email`} type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
      
      <div className="field" style={{ marginTop: 10 }}>
        <label htmlFor={`${offerId}-payment-method`} style={{ display: "block", fontWeight: 700, marginBottom: 6 }}>Payment Method Paid To</label>
        <select id={`${offerId}-payment-method`} value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} style={{ width: "100%", padding: 10, borderRadius: 8 }}>
          {(paymentMethods && paymentMethods.length > 0 ? paymentMethods : defaultPaymentMethods).map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

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
      <button type="submit" className="btn full submit-btn" disabled={busy} style={{ width: "100%", padding: 14, marginTop: 16 }}>{busy ? "Uploading proof & saving details…" : submitLabel}</button>
      <p style={{ fontSize: ".75rem", marginTop: 10, opacity: .72 }}>Your details and receipt are verified on WhatsApp.</p>
    </form>
  );
}
