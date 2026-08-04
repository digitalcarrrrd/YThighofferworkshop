"use client";
import { useState } from "react";
import "./booking-modal.css";

export default function BookingModal({ onClose }: { onClose: () => void }) {
  const [paymentTab, setPaymentTab] = useState<"bank" | "easypaisa" | "crypto">("bank");
  const [isCopied, setIsCopied] = useState("");

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(id);
    setTimeout(() => setIsCopied(""), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now we just show success and open whatsapp
    // GHL integration will be added later
    window.open("https://wa.me/923213823702?text=Hi, I have completed the payment for YTEMPIRE BUILDERs.", "_blank");
  };

  return (
    <div className="booking-modal-overlay">
      <div className="booking-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Join YTEMPIRE BUILDERs</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" required placeholder="Your full name" />
          </div>
          <div className="form-group">
            <label>WhatsApp Number</label>
            <input type="tel" required placeholder="+92..." />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" required placeholder="you@example.com" />
          </div>

          <div className="payment-section">
            <h3>Payment Details</h3>
            <div className="payment-tabs">
              <button type="button" className={paymentTab === "bank" ? "active" : ""} onClick={() => setPaymentTab("bank")}>Bank</button>
              <button type="button" className={paymentTab === "easypaisa" ? "active" : ""} onClick={() => setPaymentTab("easypaisa")}>Jazzcash/Easypaisa</button>
              <button type="button" className={paymentTab === "crypto" ? "active" : ""} onClick={() => setPaymentTab("crypto")}>Crypto</button>
            </div>

            <div className="payment-details">
              {paymentTab === "bank" && (
                <div className="detail-card">
                  <p><strong>Bank Name:</strong> MEEZAN Bank Limited</p>
                  <p><strong>Name:</strong> Muhammad Abrar</p>
                  <div className="copy-group">
                    <p><strong>Account:</strong> 02370103321036</p>
                    <button type="button" onClick={() => copyToClipboard("02370103321036", "acc")}>{isCopied === "acc" ? "Copied!" : "Copy"}</button>
                  </div>
                  <div className="copy-group">
                    <p><strong>IBAN:</strong> PK39MEZN0002370103321036</p>
                    <button type="button" onClick={() => copyToClipboard("PK39MEZN0002370103321036", "iban")}>{isCopied === "iban" ? "Copied!" : "Copy"}</button>
                  </div>
                </div>
              )}
              {paymentTab === "easypaisa" && (
                <div className="detail-card">
                  <p><strong>Name:</strong> Muhammad Abrar Ghauri</p>
                  <div className="copy-group">
                    <p><strong>Easypaisa:</strong> 03274532186</p>
                    <button type="button" onClick={() => copyToClipboard("03274532186", "easy")}>{isCopied === "easy" ? "Copied!" : "Copy"}</button>
                  </div>
                </div>
              )}
              {paymentTab === "crypto" && (
                <div className="detail-card">
                  <p><strong>Name:</strong> abrarnadircb</p>
                  <div className="copy-group">
                    <p><strong>Binance ID:</strong> 117971802</p>
                    <button type="button" onClick={() => copyToClipboard("117971802", "binance")}>{isCopied === "binance" ? "Copied!" : "Copy"}</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Transaction ID (Optional)</label>
            <input type="text" placeholder="Enter Transaction ID" />
          </div>
          
          <div className="form-group">
            <label>Payment Screenshot (Optional)</label>
            <input type="file" accept="image/*" />
          </div>

          <button type="submit" className="submit-btn">Payment confirm on WhatsApp</button>
        </form>
      </div>
    </div>
  );
}
