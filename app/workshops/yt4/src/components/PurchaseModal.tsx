import React, { useState, useEffect, useRef } from "react";
import { X, Copy, Check, Upload, CheckCircle2, Loader2, ArrowLeft, ArrowRight, Smartphone, Building, ShieldCheck, Mail, User, Phone, FileText, MessageCircle } from "lucide-react";
import { getWorkshopStatus } from "../utils/dateUtils";
import { workshopConfig } from "../workshopConfig";
import { RegistrationFormData } from "../types";
import { Language, translations } from "../translations";

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: Language;
}

export default function PurchaseModal({ isOpen, onClose, lang = 'en' }: PurchaseModalProps) {
  // Step 1: Contact Details (Lead Capture for GHL Cart Recovery)
  // Step 2: Payment Details & Proof Upload
  // Step 3: Success & WhatsApp Direct Landing
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [status, setStatus] = useState(() => getWorkshopStatus());
  const [activeTab, setActiveTab] = useState<'Bank' | 'EasyPaisa' | 'JazzCash'>('Bank');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const t = translations[lang];
  
  // Form State
  const [fullName, setFullName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [email, setEmail] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [paymentScreenshotBase64, setPaymentScreenshotBase64] = useState("");
  const [screenshotFilename, setScreenshotFilename] = useState("");
  const [screenshotError, setScreenshotError] = useState("");
  const [consent, setConsent] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Parse UTM parameters from URL on mount
  const utmParams = useRef<Record<string, string>>({});
  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      utmParams.current = {
        utmSource: searchParams.get("utm_source") || "",
        utmMedium: searchParams.get("utm_medium") || "",
        utmCampaign: searchParams.get("utm_campaign") || "",
        utmContent: searchParams.get("utm_content") || "",
        utmTerm: searchParams.get("utm_term") || "",
        referrer: document.referrer || ""
      };
    }
  }, []);

  // Update status & prevent body scroll
  useEffect(() => {
    if (isOpen) {
      setStatus(getWorkshopStatus());
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle Escape Key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen) return null;

  // Copy helper
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(label);
      setTimeout(() => setCopiedField(null), 2000);
      
      if (typeof (window as any).fbq === "function") {
        (window as any).fbq("trackCustom", "BankDetailsCopied", { label });
      }
    });
  };

  // Handle Screenshot file select
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setScreenshotError("");
    if (!file) return;

    const maxBytes = 10 * 1024 * 1024; // 10 MB
    if (file.size > maxBytes) {
      setScreenshotError("File size 10 MB se kam honi chahiye.");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      setScreenshotError("File JPG, PNG, WEBP ya PDF format mein honi chahiye.");
      return;
    }

    setScreenshotFilename(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      setPaymentScreenshotBase64(reader.result as string);
    };
    reader.onerror = () => {
      setScreenshotError("File read karne mein error pesh aya.");
    };
    reader.readAsDataURL(file);
  };

  // Step 1 Submission Handler: Capture Lead & Push to GHL with tag "workshop cart recovery"
  const handleNextStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (fullName.trim().length < 2) {
      setFormError("Apna poora naam enter karein (kam se kam 2 characters).");
      return;
    }

    const cleanPhone = whatsappNumber.replace(/\D/g, "");
    if (cleanPhone.length < 9) {
      setFormError("Valid WhatsApp number enter karein (E.g. 03001234567).");
      return;
    }

    setIsSubmitting(true);

    try {
      // Send lead to backend to collect in GHL with tag "workshop cart recovery"
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          whatsappNumber,
          email,
          batchDate: status.batchDate,
          tag: "workshop cart recovery"
        })
      });

      // Track Meta Pixel Lead event
      if (typeof (window as any).fbq === "function") {
        (window as any).fbq("track", "Lead", {
          content_name: workshopConfig.brandName
        });
      }

      setStep(2); // Advance to Payment Details
    } catch (err) {
      console.error("Lead capture failed:", err);
      setStep(2); // Still proceed to payment step so user isn't blocked
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 2 Submission Handler: Save Payment Proof & Redirect to WhatsApp
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!transactionId.trim()) {
      setFormError("Transaction ID / Reference Number enter karna zaroori hai.");
      return;
    }

    if (!paymentScreenshotBase64) {
      setFormError("Payment screenshot attach karein.");
      return;
    }

    setIsSubmitting(true);

    const formattedWhatsapp = whatsappNumber.startsWith("+") 
      ? whatsappNumber 
      : `+92${whatsappNumber.replace(/^0+/, "")}`;

    const payload: RegistrationFormData = {
      fullName,
      whatsappNumber: formattedWhatsapp,
      email,
      paymentMethod: activeTab === 'Bank' ? 'Bank Transfer' : activeTab,
      transactionId,
      paymentScreenshot: paymentScreenshotBase64,
      consent,
      batchDate: status.batchDate,
      batchDisplayDate: status.displayDate,
      ...utmParams.current,
      deviceCategory: typeof window !== "undefined" && window.innerWidth < 640 ? "mobile" : "desktop",
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        if (typeof (window as any).fbq === "function") {
          (window as any).fbq("track", "CompleteRegistration", {
            value: workshopConfig.price,
            currency: "PKR",
            content_name: workshopConfig.brandName,
            status: "Pending Verification"
          });
        }

        // Auto open WhatsApp link so WhatsApp CRM flow takes care of the rest
        handleOpenWhatsAppCRM();

        setStep(3); // Go to Success Step
      } else {
        setFormError(resData.error || "Submission fail ho gayi. Dobara koshish karein.");
      }
    } catch (err) {
      console.error(err);
      setFormError("Network issue hai. Internet check karke phir try karein.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // WhatsApp Redirect Helper for CRM flow
  const handleOpenWhatsAppCRM = () => {
    const rawMsg = `Salam Abrar Nadir, main ne workshop ke liye payment proof submit kar diya hai.\n\n*Name:* ${fullName}\n*WhatsApp:* ${whatsappNumber}\n*Transaction ID:* ${transactionId}\n*Batch Date:* ${status.displayDate}\n\nJaldi verify karke live link bhej dein. Shukriya!`;
    const encodedMsg = encodeURIComponent(rawMsg);
    window.open(`https://wa.me/${workshopConfig.whatsappSupportNumber.replace(/\+/g, "")}?text=${encodedMsg}`, "_blank");
  };

  return (
    <div 
      id="purchase-modal-overlay"
      dir={t.dir}
      className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-0 sm:p-4 overflow-y-auto animate-fade-in"
    >
      <div 
        id="purchase-modal-card"
        className="bg-white text-slate-900 w-full max-w-2xl sm:rounded-3xl shadow-2xl relative flex flex-col max-h-screen sm:max-h-[92vh] overflow-hidden border-2 border-amber-400 animate-zoom-in"
      >
        {/* Header Bar */}
        <div className="bg-slate-950 text-white p-5 flex items-center justify-between border-b border-amber-500/30">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <div>
              <p className="text-[10px] font-mono tracking-widest text-amber-300 font-bold uppercase leading-none">
                Live Masterclass Registration
              </p>
              <h3 className="text-sm font-extrabold text-white mt-1 leading-none">{workshopConfig.brandName}</h3>
            </div>
          </div>
          
          {!isSubmitting && (
            <button 
              id="modal-close-btn"
              onClick={onClose} 
              className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal Main Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7">
          
          {/* STEP 1: CONTACT DETAILS (GHL CART RECOVERY LEAD CAPTURE) */}
          {step === 1 && (
            <form id="step-1-form" onSubmit={handleNextStep1} className="space-y-6">
              
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-300">
                  Step 1 of 2: Contact Details
                </span>
                <span className="text-xs text-slate-500 font-bold">
                  Batch: <strong className="text-slate-900">{status.displayDate}</strong>
                </span>
              </div>

              <div className="text-center sm:text-left space-y-1">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                  Apni Seat Lock Karein
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm font-medium">
                  Naam aur WhatsApp number enter karein taake aapki seat hold ho sake:
                </p>
              </div>

              {/* Error Box */}
              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-xl text-xs sm:text-sm font-semibold">
                  {formError}
                </div>
              )}

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="text-xs font-extrabold text-slate-700 block mb-1.5 flex items-center gap-1.5">
                    <User className="w-4 h-4 text-amber-600" />
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    id="step1-full-name"
                    type="text"
                    required
                    placeholder="Apna poora naam enter karein"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3.5 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-base outline-none transition-all font-sans font-bold text-slate-900"
                  />
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="text-xs font-extrabold text-slate-700 block mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-amber-600" />
                    WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base font-bold text-slate-500 font-mono">+92</span>
                    <input 
                      id="step1-whatsapp"
                      type="tel"
                      required
                      placeholder="3001234567"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      className="w-full pl-14 pr-4 py-3.5 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-base outline-none font-mono font-bold text-slate-900 transition-all"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 font-semibold mt-1">E.g., 03001234567 ya simple 3001234567 likhein.</p>
                </div>

                {/* Email (Optional) */}
                <div>
                  <label className="text-xs font-extrabold text-slate-700 block mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-slate-400" />
                    Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input 
                    id="step1-email"
                    type="email"
                    placeholder="Apni email address enter karein"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3.5 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-base outline-none transition-all font-sans font-bold text-slate-900"
                  />
                </div>
              </div>

              {/* Progress Button */}
              <button
                id="step1-next-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4.5 bg-gradient-to-r from-amber-400 via-emerald-500 to-amber-400 hover:from-amber-300 hover:to-emerald-400 text-slate-950 font-black rounded-xl shadow-xl shadow-amber-500/20 transition-all cursor-pointer text-base sm:text-lg flex items-center justify-center gap-2 border-2 border-amber-300 disabled:opacity-80"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Next — Payment Details Dekhein</span>
                    <ArrowRight className={`w-5 h-5 ${lang === 'ur' ? 'rotate-180' : ''}`} />
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 2: PAYMENT METHOD DETAILS & PROOF SUBMISSION */}
          {step === 2 && (
            <div id="step-2-content" className="space-y-6">
              
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <button 
                  onClick={() => setStep(1)} 
                  className="text-slate-600 hover:text-slate-900 text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className={`w-4 h-4 ${lang === 'ur' ? 'rotate-180' : ''}`} /> Back to Contact Details
                </button>
                <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-300">
                  Step 2 of 2: Payment Details
                </span>
              </div>

              <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                  Payment Karke Screenshot Attach Karein
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm mt-1 font-semibold">
                  Ticket Fee: <strong className="text-emerald-700 text-base font-extrabold font-mono">PKR {workshopConfig.price.toLocaleString()}</strong> • Batch: <strong className="text-slate-900">{status.displayDate}</strong>
                </p>
              </div>

              {/* Form Error Message */}
              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-xl text-xs sm:text-sm font-semibold">
                  {formError}
                </div>
              )}

              {/* Payment Selection Tabs */}
              <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  id="tab-bank"
                  type="button"
                  onClick={() => setActiveTab('Bank')}
                  className={`py-2 text-xs sm:text-sm font-black rounded-lg transition-all cursor-pointer ${
                    activeTab === 'Bank' 
                      ? "bg-slate-900 text-amber-300 shadow-md" 
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Bank Transfer
                </button>
                <button
                  id="tab-easypaisa"
                  type="button"
                  onClick={() => setActiveTab('EasyPaisa')}
                  className={`py-2 text-xs sm:text-sm font-black rounded-lg transition-all cursor-pointer ${
                    activeTab === 'EasyPaisa' 
                      ? "bg-emerald-600 text-white shadow-md" 
                      : "text-slate-600 hover:text-slate-950"
                  }`}
                >
                  EasyPaisa
                </button>
                <button
                  id="tab-jazzcash"
                  type="button"
                  onClick={() => setActiveTab('JazzCash')}
                  className={`py-2 text-xs sm:text-sm font-black rounded-lg transition-all cursor-pointer ${
                    activeTab === 'JazzCash' 
                      ? "bg-amber-400 text-slate-950 shadow-md" 
                      : "text-slate-600 hover:text-slate-950"
                  }`}
                >
                  JazzCash
                </button>
              </div>

              {/* Bank / EasyPaisa / JazzCash Account Cards */}
              <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
                {activeTab === 'Bank' && (
                  <div className="space-y-3 animate-fade-in">
                    <div className="flex items-center gap-2 text-xs text-slate-700 uppercase tracking-widest font-black">
                      <Building className="w-4 h-4 text-amber-600" />
                      Meezan Bank Account Details
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-white p-3 rounded-xl border border-slate-200 flex justify-between items-center">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-bold uppercase">Bank Name</span>
                          <span className="text-sm font-extrabold text-slate-900">{workshopConfig.paymentDetails.bankName}</span>
                        </div>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-200 flex justify-between items-center">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-bold uppercase">Account Title</span>
                          <span className="text-sm font-extrabold text-slate-900">{workshopConfig.paymentDetails.accountTitle}</span>
                        </div>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-200 flex justify-between items-center sm:col-span-2">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-bold uppercase">Account Number</span>
                          <span className="text-base font-extrabold font-mono text-slate-900">{workshopConfig.paymentDetails.accountNumber}</span>
                        </div>
                        <button 
                          type="button"
                          onClick={() => copyToClipboard(workshopConfig.paymentDetails.accountNumber, 'AccountNumber')}
                          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-amber-300 rounded-lg text-xs font-black flex items-center gap-1 cursor-pointer"
                        >
                          {copiedField === 'AccountNumber' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedField === 'AccountNumber' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-200 flex justify-between items-center sm:col-span-2">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-bold uppercase">IBAN</span>
                          <span className="text-xs font-extrabold font-mono text-slate-900 break-all">{workshopConfig.paymentDetails.iban}</span>
                        </div>
                        <button 
                          type="button"
                          onClick={() => copyToClipboard(workshopConfig.paymentDetails.iban, 'IBAN')}
                          className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-900 shrink-0 cursor-pointer"
                        >
                          {copiedField === 'IBAN' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'EasyPaisa' && (
                  <div className="space-y-3 animate-fade-in">
                    <div className="flex items-center gap-2 text-xs text-emerald-700 uppercase tracking-widest font-black">
                      <Smartphone className="w-4 h-4" />
                      EasyPaisa Account Details
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      <div className="bg-white p-3 rounded-xl border border-slate-200 flex justify-between items-center">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-bold uppercase">Account Name</span>
                          <span className="text-sm font-extrabold text-slate-900">{workshopConfig.paymentDetails.easypaisaTitle}</span>
                        </div>
                      </div>

                      <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex justify-between items-center bg-gradient-to-r from-emerald-50/50 to-white">
                        <div>
                          <span className="text-[10px] text-emerald-700 block font-bold uppercase">EasyPaisa Mobile Number</span>
                          <span className="text-lg font-black font-mono text-emerald-800">{workshopConfig.paymentDetails.easypaisaNumber}</span>
                        </div>
                        <button 
                          type="button"
                          onClick={() => copyToClipboard(workshopConfig.paymentDetails.easypaisaNumber, 'EasypaisaNumber')}
                          className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                        >
                          {copiedField === 'EasypaisaNumber' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedField === 'EasypaisaNumber' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'JazzCash' && (
                  <div className="space-y-3 animate-fade-in">
                    <div className="flex items-center gap-2 text-xs text-amber-800 uppercase tracking-widest font-black">
                      <Smartphone className="w-4 h-4" />
                      JazzCash Account Details
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      <div className="bg-white p-3 rounded-xl border border-slate-200 flex justify-between items-center">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-bold uppercase">Account Name</span>
                          <span className="text-sm font-extrabold text-slate-900">{workshopConfig.paymentDetails.jazzcashTitle}</span>
                        </div>
                      </div>

                      <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex justify-between items-center bg-gradient-to-r from-amber-50/50 to-white">
                        <div>
                          <span className="text-[10px] text-amber-800 block font-bold uppercase">JazzCash Mobile Number</span>
                          <span className="text-lg font-black font-mono text-amber-800">{workshopConfig.paymentDetails.jazzcashNumber}</span>
                        </div>
                        <button 
                          type="button"
                          onClick={() => copyToClipboard(workshopConfig.paymentDetails.jazzcashNumber, 'JazzcashNumber')}
                          className="px-3 py-2 bg-amber-400 text-slate-950 hover:bg-amber-300 rounded-lg text-xs font-black flex items-center gap-1 cursor-pointer"
                        >
                          {copiedField === 'JazzcashNumber' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedField === 'JazzcashNumber' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Form Inputs for Proof */}
              <form id="payment-proof-form" onSubmit={handleFormSubmit} className="space-y-4 pt-2">
                
                {/* Transaction ID */}
                <div>
                  <label className="text-xs font-extrabold text-slate-700 block mb-1.5 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-amber-600" />
                    Transaction ID / Reference Number <span className="text-red-500">*</span>
                  </label>
                  <input 
                    id="form-transaction-id"
                    type="text"
                    required
                    placeholder="EasyPaisa/JazzCash message ya Bank slip TID"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="w-full px-4 py-3.5 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-base font-mono font-bold text-slate-900 outline-none transition-all"
                  />
                </div>

                {/* File Upload screenshot */}
                <div>
                  <label className="text-xs font-extrabold text-slate-700 block mb-1.5 flex items-center gap-1.5">
                    <Upload className="w-4 h-4 text-amber-600" />
                    Payment Screenshot Attach Karein <span className="text-red-500">*</span>
                  </label>
                  
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-2xl p-4 text-center cursor-pointer transition-all bg-slate-50 hover:bg-slate-100/50"
                  >
                    <input 
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/jpeg,image/png,image/webp,application/pdf"
                      className="hidden"
                    />
                    
                    {paymentScreenshotBase64 ? (
                      <div className="space-y-2">
                        <span className="inline-block bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-bold">
                          Screenshot Uploaded ✓
                        </span>
                        <p className="text-xs font-bold text-slate-700 font-mono truncate max-w-xs mx-auto">
                          {screenshotFilename}
                        </p>
                        {paymentScreenshotBase64.startsWith("data:image/") && (
                          <img 
                            src={paymentScreenshotBase64} 
                            alt="Payment receipt preview" 
                            className="h-16 object-contain mx-auto rounded border shadow-sm mt-1"
                            referrerPolicy="no-referrer"
                          />
                        )}
                      </div>
                    ) : (
                      <div className="space-y-1 text-slate-500 py-1">
                        <Upload className="w-6 h-6 mx-auto text-amber-600" />
                        <p className="text-xs sm:text-sm font-black text-slate-800">Click to upload payment receipt</p>
                        <p className="text-[10px] font-semibold">JPG, PNG, WEBP ya PDF (Max: 10MB)</p>
                      </div>
                    )}
                  </div>
                  
                  {screenshotError && (
                    <p className="text-red-600 text-xs font-bold mt-1">{screenshotError}</p>
                  )}
                </div>

                {/* Submission CTA */}
                <button
                  id="submit-payment-proof-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4.5 bg-gradient-to-r from-amber-400 via-emerald-500 to-amber-400 hover:from-amber-300 hover:to-emerald-400 text-slate-950 font-black rounded-xl shadow-xl shadow-amber-500/20 transition-all cursor-pointer text-base sm:text-lg flex items-center justify-center gap-2.5 border-2 border-amber-300 disabled:opacity-85"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting Payment Proof...</span>
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-5 h-5 fill-slate-950/20" />
                      <span>Payment Done — Land on WhatsApp</span>
                      <ArrowRight className={`w-5 h-5 ${lang === 'ur' ? 'rotate-180' : ''}`} />
                    </>
                  )}
                </button>
              </form>

            </div>
          )}

          {/* STEP 3: REGISTRATION SUCCESS & WHATSAPP LANDING */}
          {step === 3 && (
            <div id="step-3-content" className="text-center py-6 space-y-6 animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-1">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  Payment Proof Submitted!
                </h2>
                <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed font-semibold">
                  Shukriya, <strong className="text-slate-900">{fullName}</strong>! Aap ki registration aur payment proof hamare WhatsApp CRM ko send kar di gayi hai.
                </p>
              </div>

              {/* Status card */}
              <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-5 text-left max-w-md mx-auto space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2 text-xs text-slate-500 uppercase tracking-widest font-bold font-mono">
                  <span>Batch Pass Details</span>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                    Proof Sent
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Name</span>
                    <span className="font-bold text-slate-800">{fullName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">WhatsApp</span>
                    <span className="font-bold text-slate-800">{whatsappNumber}</span>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-slate-100">
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Transaction Reference</span>
                    <span className="font-mono font-extrabold text-slate-900">{transactionId}</span>
                  </div>
                </div>
              </div>

              {/* High visibility WhatsApp Button */}
              <div className="space-y-3 max-w-md mx-auto pt-2">
                <button
                  id="land-on-whatsapp-btn"
                  onClick={handleOpenWhatsAppCRM}
                  className="w-full py-4.5 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500 hover:from-emerald-400 hover:to-amber-300 text-slate-950 font-black text-lg rounded-2xl shadow-xl shadow-emerald-500/30 transition-all cursor-pointer flex items-center justify-center gap-2.5 transform hover:-translate-y-0.5 border-2 border-emerald-300"
                >
                  <MessageCircle className="w-6 h-6 fill-slate-950/20" />
                  <span>Open WhatsApp for Live Link & Confirmation</span>
                </button>

                <button
                  id="success-close-btn"
                  onClick={onClose}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 underline cursor-pointer"
                >
                  Close Window
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
