"use client";
import { useEffect,useRef,useState } from "react";
import type { Schedule } from "@/hooks/useWorkshopSchedule";
import { workshopConfig as c } from "@/lib/workshopConfig";
import { useAnalytics } from "@/hooks/useAnalytics";
import { getStoredUtmAttribution } from "@/lib/analytics";
import type { OfferConfig } from "@/lib/offers/types";
export function PurchaseModal({offer,schedule,onClose,lang="en"}:{offer:OfferConfig;schedule:Schedule;onClose:()=>void;lang?:"en"|"ur"}){
 const ur=lang==="ur";
  const [step, setStep] = useState(1);
  const [method] = useState("Bank Transfer");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const modal = useRef<HTMLDivElement>(null);
  const { track } = useAnalytics(offer);
  
  const [submittedData, setSubmittedData] = useState<{fullName: string, transactionId: string} | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const els = modal.current?.querySelectorAll<HTMLElement>("button,input,select");
        if (!els?.length) return;
        const first = els[0], last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    addEventListener("keydown", key);
    modal.current?.querySelector<HTMLElement>("button")?.focus();
    return () => {
      document.body.style.overflow = "";
      removeEventListener("keydown", key);
    };
  }, [onClose]);


// Wait, the prompt said "Name: Muhammad Abrar Ghauri" for the Easypaisa
// Let's hardcode it as requested:
  const paymentTextToCopy = `Bank: Meezan Bank Limited
Account Title: Muhammad Abrar
Account Number: 02370103321036
IBAN: PK39MEZN0002370103321036

Easypaisa/JazzCash: 03274532186
Name: Muhammad Abrar Ghauri`;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    track("registration_submitted");
    try {
      const body = new FormData(e.currentTarget);
      body.set("paymentMethod", method);
      body.set("batchDate", schedule.batchDateString);
      body.set("offerVersion", c.offerVersion);
      body.set("offerId", offer.id);
      body.set("landingPage", window.location.pathname);
      Object.entries(getStoredUtmAttribution()).forEach(([key, value]) => body.set(key, value));
      
      const r = await fetch("/api/register", { method: "POST", body });
      const data = await r.json() as { ok?: boolean; error?: string };
      if (!r.ok) throw new Error(data.error || "Submission failed");
      
      setSubmittedData({
        fullName: body.get("fullName") as string,
        transactionId: body.get("transactionId") as string
      });
      track("registration_success");
      setStep(3);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Dobara try karein");
      track("registration_error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="overlay" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="purchase-title" ref={modal}>
        <button className="close" aria-label="Close" onClick={onClose}>×</button>
        {step < 3 && (
          <>
            <h2 id="purchase-title">{ur ? "اپنی ورکشاپ سیٹ لاک کریں" : "Lock Your Workshop Seat"}</h2>
            <p className="muted">{schedule.batchDateDisplay} • 8:00 PM PKT</p>
            <div className="steps"><span className="on" /><span className={step >= 2 ? "on" : ""} /><span /></div>
          </>
        )}
        
        {step === 1 && (
          <>
            <h3>1. Payment Instructions</h3>
            <div className="details">
              <p style={{ whiteSpace: "pre-line", marginBottom: "16px", lineHeight: 1.6 }}>{paymentTextToCopy}</p>
              <button 
                className="method" 
                style={{ width: "100%", background: copied ? "#edfff3" : "white", borderColor: copied ? "#24a65a" : "#cbd5e1" }}
                onClick={() => {
                  navigator.clipboard.writeText(paymentTextToCopy);
                  setCopied(true);
                  track("bank_details_copied");
                  setTimeout(() => setCopied(false), 2000);
                }}
              >
                {copied ? "✅ Copied!" : "Copy Payment Details"}
              </button>
            </div>
            <button className="btn full" onClick={() => { setStep(2); track("form_started"); }}>
              Payment Ho Gayi — Details Submit Karein →
            </button>
          </>
        )}
        
        {step === 2 && (
          <form onSubmit={submit}>
            <div className="field">
              <label>Full Name</label>
              <input name="fullName" required minLength={2} autoComplete="name" />
            </div>
            <div className="field">
              <label>WhatsApp Number</label>
              <input name="phone" required inputMode="tel" placeholder="+92 3XX XXXXXXX" autoComplete="tel" />
            </div>
            <div className="field">
              <label>Email Address</label>
              <input name="email" type="email" required autoComplete="email" />
            </div>
            <div className="field">
              <label>Transaction ID (Optional)</label>
              <input name="transactionId" />
            </div>
            <div className="field">
              <label>Payment Screenshot (JPG, PNG or WebP — max 5MB)</label>
              <input name="paymentProof" type="file" required accept="image/jpeg,image/png,image/webp" capture="environment" onChange={() => track("payment_proof_uploaded")} />
            </div>
            <input type="hidden" name="batchDate" value={schedule.batchDateString} />
            {error && <p className="error">{error}</p>}
            <button className="btn full" disabled={busy}>
              {busy ? "Submit ho raha hai…" : "Registration Submit Karein →"}
            </button>
          </form>
        )}
        
        {step === 3 && (
          <div className="success">
            <div className="check">✅</div>
            <h2>{ur ? "رجسٹریشن موصول ہو گئی!" : "Registration received!"}</h2>
            <p>{ur ? "ادائیگی کی تصدیق کے بعد ورکشاپ کا لنک واٹس ایپ پر بھیجا جائے گا۔" : "After payment verification, the workshop link will be sent on WhatsApp."}</p>
            <p style={{ marginTop: "16px", marginBottom: "16px", fontSize: "0.9rem", color: "#64748b" }}>
              Please click the button below to send your confirmation on WhatsApp.
            </p>
            <a 
              href={`https://wa.me/923213823702?text=${encodeURIComponent(`Assalamualaikum, I have completed payment for YouTube Empire Builders Workshop.\n\nName: ${submittedData?.fullName}\nTransaction ID: ${submittedData?.transactionId || 'Not provided'}\nPayment screenshot attached.`)}`}
              target="_blank"
              rel="noreferrer"
              className="btn full"
              style={{ display: "block", textAlign: "center", textDecoration: "none" }}
              onClick={onClose}
            >
              WhatsApp Confirmation →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
