"use client";
import { useEffect, useRef, useState } from "react";
import type { Schedule } from "@/hooks/useWorkshopSchedule";
import { workshopConfig as c } from "@/lib/workshopConfig";
import { useAnalytics } from "@/hooks/useAnalytics";
import { getStoredUtmAttribution } from "@/lib/analytics";
import type { OfferConfig } from "@/lib/offers/types";

export function PurchaseModal({ offer, schedule, onClose, lang = "en" }: { offer: OfferConfig; schedule: Schedule; onClose: () => void; lang?: "en" | "ur" }) {
  const ur = lang === "ur";
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState("Bank Transfer");
  
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const modal = useRef<HTMLDivElement>(null);
  const { track } = useAnalytics(offer);

  const [submittedData, setSubmittedData] = useState<{ fullName: string, transactionId: string } | null>(null);
  const [copyStatus, setCopyStatus] = useState("");

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
    return () => {
      document.body.style.overflow = "";
      removeEventListener("keydown", key);
    };
  }, [onClose]);

  useEffect(() => {
    modal.current?.querySelector<HTMLElement>("button")?.focus();
  }, []);

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(id);
    track("bank_details_copied");
    setTimeout(() => setCopyStatus(""), 2000);
  };

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

  const copyRowStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f8fafc", padding: "12px", borderRadius: "8px", marginBottom: "8px" };
  const labelStyle = { display: "block", color: "#64748b", fontSize: "12px", marginBottom: "2px" };
  const valueStyle = { color: "#0f172a", fontWeight: 500 };
  const copyBtnStyle = { padding: "6px 12px", background: "#e2e8f0", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: 600, color: "#334155" };
  const copiedBtnStyle = { ...copyBtnStyle, background: "#edfff3", color: "#24a65a" };

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

        {step < 3 && (
          <form onSubmit={submit}>
            {step === 1 && (
              <>
                <div className="field">
                  <label>Full Name</label>
                  <input name="fullName" required minLength={2} autoComplete="name" value={fullName} onChange={e => setFullName(e.target.value)} />
                </div>
                <div className="field">
                  <label>WhatsApp Number</label>
                  <input name="phone" required inputMode="tel" placeholder="+92 3XX XXXXXXX" autoComplete="tel" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>

                <label style={{ display: "block", marginTop: "24px", marginBottom: "8px", fontWeight: 600, fontSize: "14px" }}>Payment Method</label>
                <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
                  <button type="button" className="method" style={{ flex: 1, borderColor: method === "Bank Transfer" ? "#0f172a" : "#cbd5e1", background: method === "Bank Transfer" ? "#f8fafc" : "white", padding: "12px", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: "pointer", border: "1px solid" }} onClick={() => setMethod("Bank Transfer")}>
                    Meezan Bank
                  </button>
                  <button type="button" className="method" style={{ flex: 1, borderColor: method === "Easypaisa/JazzCash" ? "#0f172a" : "#cbd5e1", background: method === "Easypaisa/JazzCash" ? "#f8fafc" : "white", padding: "12px", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: "pointer", border: "1px solid" }} onClick={() => setMethod("Easypaisa/JazzCash")}>
                    Easypaisa / JazzCash
                  </button>
                </div>

                {method === "Bank Transfer" && (
                  <div className="details" style={{ marginBottom: "24px" }}>
                    <div style={copyRowStyle}>
                      <div>
                        <small style={labelStyle}>Bank Name</small>
                        <strong style={valueStyle}>Meezan Bank Limited</strong>
                      </div>
                    </div>
                    <div style={copyRowStyle}>
                      <div>
                        <small style={labelStyle}>Account Title</small>
                        <strong style={valueStyle}>Muhammad Abrar</strong>
                      </div>
                      <button type="button" style={copyStatus === "bank-title" ? copiedBtnStyle : copyBtnStyle} onClick={() => copy("Muhammad Abrar", "bank-title")}>
                        {copyStatus === "bank-title" ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    <div style={copyRowStyle}>
                      <div>
                        <small style={labelStyle}>Account Number</small>
                        <strong style={valueStyle}>02370103321036</strong>
                      </div>
                      <button type="button" style={copyStatus === "bank-acc" ? copiedBtnStyle : copyBtnStyle} onClick={() => copy("02370103321036", "bank-acc")}>
                        {copyStatus === "bank-acc" ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>
                )}

                {method === "Easypaisa/JazzCash" && (
                  <div className="details" style={{ marginBottom: "24px" }}>
                    <div style={copyRowStyle}>
                      <div>
                        <small style={labelStyle}>Account Title</small>
                        <strong style={valueStyle}>Muhammad Abrar Ghauri</strong>
                      </div>
                      <button type="button" style={copyStatus === "easy-title" ? copiedBtnStyle : copyBtnStyle} onClick={() => copy("Muhammad Abrar Ghauri", "easy-title")}>
                        {copyStatus === "easy-title" ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    <div style={copyRowStyle}>
                      <div>
                        <small style={labelStyle}>Easypaisa / JazzCash Number</small>
                        <strong style={valueStyle}>03274532186</strong>
                      </div>
                      <button type="button" style={copyStatus === "easy-acc" ? copiedBtnStyle : copyBtnStyle} onClick={() => copy("03274532186", "easy-acc")}>
                        {copyStatus === "easy-acc" ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>
                )}

                <button 
                  type="button" 
                  className="btn full" 
                  disabled={!fullName || !phone}
                  onClick={() => { setStep(2); track("form_started"); }}
                >
                  Payment Ho Gayi — Screenshot Submit Karein →
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <input type="hidden" name="fullName" value={fullName} />
                <input type="hidden" name="phone" value={phone} />
                
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
                
                <div style={{ display: "flex", gap: "8px", marginTop: "24px" }}>
                  <button type="button" className="btn" style={{ background: "#e2e8f0", color: "#334155" }} onClick={() => setStep(1)}>
                    Back
                  </button>
                  <button type="submit" className="btn full" style={{ flex: 1 }} disabled={busy}>
                    {busy ? "Submit ho raha hai…" : "Registration Submit Karein →"}
                  </button>
                </div>
              </>
            )}
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
