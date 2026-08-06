"use client";
import { useEffect, useRef, useState } from "react";
import type { Schedule } from "@/hooks/useWorkshopSchedule";
import type { OfferConfig } from "@/lib/offers/types";
import { WorkshopRegistrationForm } from "@/components/workshops/WorkshopRegistrationForm";

export function PurchaseModal({ offer, schedule, onClose, lang = "en" }: { offer: OfferConfig; schedule: Schedule; onClose: () => void; lang?: "en" | "ur" }) {
  const ur = lang === "ur";
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState("Bank Transfer");
  
  const modal = useRef<HTMLDivElement>(null);
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
    setTimeout(() => setCopyStatus(""), 2000);
  };

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

        {step === 1 && (
          <>
            <label style={{ display: "block", marginTop: "24px", marginBottom: "8px", fontWeight: 600, fontSize: "14px" }}>Select Payment Method</label>
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
              onClick={() => { setStep(2); }}
            >
              Payment Ho Gayi — Screenshot Submit Karein →
            </button>
          </>
        )}

        {step === 2 && (
          <WorkshopRegistrationForm
            offerId={offer.id}
            offerName={offer.title}
            workshopDate={schedule.batchDateString}
            paymentMethods={[method]} // Passes the selected method from step 1
            onSuccess={() => {}}
          />
        )}
      </div>
    </div>
  );
}
