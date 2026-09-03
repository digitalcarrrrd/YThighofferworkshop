"use client";

import { useState } from "react";
import { WorkshopRegistrationForm } from "@/components/workshops/WorkshopRegistrationForm";
import { yt2Offer } from "@/lib/offers/offers";

export default function RegistrationSection() {
  const [step, setStep] = useState<1 | 2>(1);
  const [method, setMethod] = useState<"Bank Transfer" | "Easypaisa/JazzCash">("Bank Transfer");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(id);
    setTimeout(() => setCopyStatus(""), 2000);
  };

  const copyRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "rgba(255, 255, 255, 0.05)",
    padding: "12px 14px",
    borderRadius: "10px",
    marginBottom: "10px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  };
  const labelStyle = { display: "block", color: "#9ca3af", fontSize: "12px", marginBottom: "3px" };
  const valueStyle = { color: "#ffffff", fontWeight: 600, fontSize: "15px" };
  const copyBtnStyle = {
    padding: "6px 14px",
    background: "rgba(255, 255, 255, 0.15)",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: 700,
    color: "#ffffff",
    transition: "all 0.2s",
  };
  const copiedBtnStyle = { ...copyBtnStyle, background: "#22c55e", color: "#ffffff" };

  return (
    <section className="py-16 px-4 relative" id="register">
      <div className="relative max-w-2xl mx-auto glass-card rounded-3xl p-6 sm:p-10 border border-brand-red/30 shadow-2xl">
        <div className="text-center mb-8">
          <p className="text-brand-red font-bold tracking-wider text-sm mb-2">LIVE WORKSHOP REGISTRATION</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            {step === 1 ? "Apni Workshop Seat Lock Karein" : "Payment Receipt Submit Karein"}
          </h2>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Daily Live • 7:00 PM–9:00 PM PKT • Ticket: <strong className="text-brand-gold">PKR 1,999</strong>
          </p>
          <div className="flex gap-2 max-w-xs mx-auto mt-4">
            <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? "bg-brand-red" : "bg-white/20"}`} />
            <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? "bg-brand-red" : "bg-white/20"}`} />
          </div>
        </div>

        {step === 1 && (
          <div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Apna poora naam likhein"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-brand-red text-base"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-300 mb-1.5">WhatsApp Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+92 3XX XXXXXXX"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-brand-red text-base"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-6 mb-2">
              <label className="block font-bold text-sm text-gray-300 mb-2">Select Payment Method</label>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  type="button"
                  className={`py-3 px-4 rounded-xl font-bold text-sm border transition-all cursor-pointer ${
                    method === "Bank Transfer"
                      ? "bg-brand-red/20 border-brand-red text-white shadow-lg shadow-brand-red/20"
                      : "bg-white/5 border-white/15 text-gray-400 hover:border-white/30"
                  }`}
                  onClick={() => setMethod("Bank Transfer")}
                >
                  🏦 Meezan Bank
                </button>
                <button
                  type="button"
                  className={`py-3 px-4 rounded-xl font-bold text-sm border transition-all cursor-pointer ${
                    method === "Easypaisa/JazzCash"
                      ? "bg-brand-red/20 border-brand-red text-white shadow-lg shadow-brand-red/20"
                      : "bg-white/5 border-white/15 text-gray-400 hover:border-white/30"
                  }`}
                  onClick={() => setMethod("Easypaisa/JazzCash")}
                >
                  📱 Easypaisa / JazzCash
                </button>
              </div>

              {method === "Bank Transfer" && (
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 mb-6">
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
                    <button
                      type="button"
                      style={copyStatus === "bank-title" ? copiedBtnStyle : copyBtnStyle}
                      onClick={() => copy("Muhammad Abrar", "bank-title")}
                    >
                      {copyStatus === "bank-title" ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <div style={copyRowStyle}>
                    <div>
                      <small style={labelStyle}>Account Number</small>
                      <strong style={valueStyle}>02370103321036</strong>
                    </div>
                    <button
                      type="button"
                      style={copyStatus === "bank-acc" ? copiedBtnStyle : copyBtnStyle}
                      onClick={() => copy("02370103321036", "bank-acc")}
                    >
                      {copyStatus === "bank-acc" ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              )}

              {method === "Easypaisa/JazzCash" && (
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 mb-6">
                  <div style={copyRowStyle}>
                    <div>
                      <small style={labelStyle}>Account Title</small>
                      <strong style={valueStyle}>Muhammad Abrar Ghauri</strong>
                    </div>
                    <button
                      type="button"
                      style={copyStatus === "easy-title" ? copiedBtnStyle : copyBtnStyle}
                      onClick={() => copy("Muhammad Abrar Ghauri", "easy-title")}
                    >
                      {copyStatus === "easy-title" ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <div style={copyRowStyle}>
                    <div>
                      <small style={labelStyle}>Easypaisa / JazzCash Number</small>
                      <strong style={valueStyle}>03274532186</strong>
                    </div>
                    <button
                      type="button"
                      style={copyStatus === "easy-acc" ? copiedBtnStyle : copyBtnStyle}
                      onClick={() => copy("03274532186", "easy-acc")}
                    >
                      {copyStatus === "easy-acc" ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              disabled={!fullName.trim() || !phone.trim()}
              onClick={() => setStep(2)}
              className="w-full py-4 rounded-xl font-extrabold text-base sm:text-lg text-white cta-btn shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Payment Ho Gayi — Screenshot Submit Karein →
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="mb-4 flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10 text-xs sm:text-sm text-gray-300">
              <span>👤 {fullName} ({phone})</span>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-brand-red font-bold hover:underline cursor-pointer"
              >
                Edit / View Details ←
              </button>
            </div>
            <WorkshopRegistrationForm
              offerId={yt2Offer.id}
              offerName={yt2Offer.title}
              workshopDate="Daily, 7:00 PM–9:00 PM PKT"
              paymentMethods={[method === "Bank Transfer" ? "Meezan Bank" : "Easypaisa"]}
              hideContactFields={true}
              initialData={{ fullName, phone }}
              variant="dark"
            />
          </div>
        )}
      </div>
    </section>
  );
}
