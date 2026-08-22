"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Check, X, Play, ShieldCheck, 
  ArrowRight, Users, DollarSign, 
  Zap, ChevronDown, 
  TrendingUp, Home, Lock, AlertTriangle,
  MessageSquare, Monitor,
  GraduationCap, Briefcase, Heart, Smile, Gift, Flame, ShieldAlert
} from "lucide-react";

const TEAM_WHATSAPP_NUMBER = "923296158206";

export default function WorkshopYt8Client() {
  const [dynamicDate, setDynamicDate] = useState<string>("");
  const [payModalOpen, setPayModalOpen] = useState<boolean>(false);
  const [modalStep, setModalStep] = useState<1 | 2>(1);
  const [policyModal, setPolicyModal] = useState<"refund" | "privacy" | null>(null);

  // Form State
  const [fullName, setFullName] = useState<string>("");
  const [whatsappNumber, setWhatsappNumber] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<"Meezan Bank" | "Easypaisa" | "Binance">("Meezan Bank");
  const [transactionId, setTransactionId] = useState<string>("");
  const [screenshotBase64, setScreenshotBase64] = useState<string>("");
  const [screenshotFilename, setScreenshotFilename] = useState<string>("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [formError, setFormError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // 10-second countdown
  const [countdown, setCountdown] = useState<number>(10);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Timer & interactive states
  const [timeLeft, setTimeLeft] = useState<string>("00:00:00");
  const [isAfterSeven, setIsAfterSeven] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<"new_adm" | "1st" | "2nd" | "3rd" | "4th" | "master">("new_adm");
  const [floatingVisible, setFloatingVisible] = useState<boolean>(false);

  // Dynamic Date (PKT) & Cutoff Timer
  useEffect(() => {
    try {
      const now = new Date();
      const pktOptions: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Karachi",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      setDynamicDate(now.toLocaleDateString("en-US", pktOptions));
    } catch {
      setDynamicDate(
        new Date().toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    }

    const timer = setInterval(() => {
      const now = new Date();
      const cutoff = new Date();
      cutoff.setHours(19, 0, 0, 0); // 7:00 PM PKT

      if (now.getHours() >= 19) {
        setIsAfterSeven(true);
      } else {
        setIsAfterSeven(false);
        const diff = cutoff.getTime() - now.getTime();
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        setTimeLeft(
          `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
        );
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Floating CTA on Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 280 && !payModalOpen) setFloatingVisible(true);
      else setFloatingVisible(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [payModalOpen]);

  // Countdown & WhatsApp auto-redirect
  useEffect(() => {
    if (modalStep === 2) {
      setCountdown(10);
      countdownIntervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
            triggerWhatsAppOpen();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    }
    return () => {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [modalStep]);

  const openPayModal = () => {
    setModalStep(1);
    setFormError("");
    setPayModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closePayModal = () => {
    setPayModalOpen(false);
    setModalStep(1);
    document.body.style.overflow = "";
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
  };

  const copyToClipboard = (text: string, key: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setFormError("Screenshot file size 10MB se kam honi chahiye.");
      return;
    }
    setScreenshotFilename(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      setScreenshotBase64(reader.result as string);
      setFormError("");
    };
    reader.readAsDataURL(file);
  };

  const buildWhatsAppMessage = () => {
    return `Salam Abrar Nadir & Support Team! Main ne YouTube Empire Builders (Workshop 8 - 2026 University & Degree Edition) ke liye payment transfer kar di hai.\n\n*Name:* ${fullName.trim()}\n*WhatsApp:* ${whatsappNumber.trim()}\n*Payment Method:* ${paymentMethod}${transactionId.trim() ? `\n*Transaction ID:* ${transactionId.trim()}` : ""}\n*Batch Date:* ${dynamicDate}\n*Amount Paid:* PKR 1,999\n\nI have attached my payment screenshot. Please verify and share the confirmed Zoom link & WhatsApp community invite. Shukriya! 😊`;
  };

  const triggerWhatsAppOpen = () => {
    const message = buildWhatsAppMessage();
    const waUrl = `https://wa.me/${TEAM_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.location.href = waUrl;
  };

  const handleSubmitProof = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (fullName.trim().length < 2) {
      setFormError("Apna mukammal naam (Full Name) darj karein.");
      return;
    }

    const cleanPhone = whatsappNumber.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      setFormError("Durust WhatsApp number darj karein (e.g. 03xx-xxxxxxx).");
      return;
    }

    if (!screenshotBase64) {
      setFormError("Payment receipt ya screenshot attach karna zaroori hai.");
      return;
    }

    setIsSubmitting(true);

    try {
      const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();

      // 1. Send to CRM backend API route (Connects to GHL and triggers automated workflows)
      await fetch("/api/yt8-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: whatsappNumber.trim(),
          paymentMethod: paymentMethod === "Meezan Bank" ? "Bank Transfer" : paymentMethod,
          transactionId: transactionId.trim() || "N/A",
          batchDate: dynamicDate,
          academicStatus: selectedYear,
          utm_source: params.get("utm_source") || "",
          utm_medium: params.get("utm_medium") || "",
          utm_campaign: params.get("utm_campaign") || "",
          utm_content: params.get("utm_content") || "",
          utm_term: params.get("utm_term") || "",
          fbclid: params.get("fbclid") || "",
        }),
      }).catch((err) => console.warn("CRM workflow note:", err));

      // 2. Track Meta Pixel Event
      if (typeof (window as any).fbq === "function") {
        (window as any).fbq("track", "CompleteRegistration", {
          value: 1999,
          currency: "PKR",
          content_name: "YouTube Empire Builders Workshop 8",
        });
      }

      setIsSubmitting(false);
      setModalStep(2); // 10-second redirect screen
    } catch {
      setIsSubmitting(false);
      setModalStep(2);
    }
  };

  return (
    <div className="min-h-screen bg-[#07111F] text-slate-100 font-sans pb-24 md:pb-0 overflow-x-hidden selection:bg-green-600 selection:text-white">
      
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="sticky top-0 z-40 bg-red-600 text-white text-center py-2.5 px-4 text-xs font-bold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse inline-block" />
        {isAfterSeven ? (
          <span>Aaj Ki Registration Band Ho Gayi — Kal Raat 8 PM Ka Slot Ab Open Hai</span>
        ) : (
          <span>🔴 Aaj Raat 8 PM — Live Workshop | Registration {timeLeft} Mein Band | Sirf 100 Seats</span>
        )}
      </div>

      {/* 2. HERO SECTION */}
      <header className="pt-12 md:pt-20 pb-16 px-4 md:px-6 max-w-5xl mx-auto text-center border-b border-slate-800">
        
        {/* Pill Badge - 2026 Target */}
        <div className="inline-flex items-center gap-2 border border-amber-500/50 bg-amber-500/10 text-amber-400 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-8 shadow-sm">
          <span>🎓 Pakistan Ke University & College Students, New Admissions, Bachelor&apos;s & Master&apos;s Ke Liye — 2026 Batch</span>
        </div>

        {/* Hero Title */}
        <h1 className="space-y-3 mb-8">
          <span className="block text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            Aapke Class Mein Ek Banda
          </span>
          <span className="block text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            ChatGPT Se Exam Cheat Kar Raha Hai.
          </span>
          <span className="block text-xl sm:text-3xl md:text-4xl font-black text-amber-400 mt-4 leading-tight">
            Ek Banda Wahi ChatGPT Se
          </span>
          <span className="block text-3xl sm:text-5xl md:text-6xl font-black text-green-400 leading-tight drop-shadow-[0_0_25px_rgba(74,222,128,0.3)]">
            Dollar Kama Raha Hai.
          </span>
          <span className="block text-lg sm:text-2xl md:text-3xl font-semibold text-slate-300 mt-6 leading-tight">
            Dono Ek Hi University Mein Hain.
          </span>
          <span className="block text-lg sm:text-2xl md:text-3xl font-semibold text-slate-300 leading-tight">
            Dono Ka Baap Ek Jaisi Fees Bhar Raha Hai.
          </span>
          <span className="block text-xl sm:text-3xl md:text-4xl font-extrabold text-green-400 mt-4 leading-tight">
            Fark Sirf Ek Decision Ka Hai.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-10">
          <strong className="text-white">YouTube Empire Builders —</strong> Pakistan ka pehla practical live workshop jo aapko woh AI system deta hai jo sote waqt bhi dollar kamaata rahe. Degree ke saath. Legally. Safely. Seedha aapke bank account mein.
        </p>

        {/* 3 Animated Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-10 text-left">
          <div className="bg-[#0F1D32] border border-red-500/30 p-5 rounded-2xl shadow-lg">
            <div className="text-xs font-bold text-slate-400 uppercase mb-1">4 Saal Degree Baad</div>
            <div className="text-2xl sm:text-3xl font-black text-red-400 mb-1">PKR 25,000</div>
            <div className="text-xs text-slate-400 font-medium">Average pehli salary Pakistan</div>
          </div>

          <div className="bg-[#0F1D32] border border-amber-500/30 p-5 rounded-2xl shadow-lg">
            <div className="text-xs font-bold text-slate-400 uppercase mb-1">Wahi AI. Alag Use.</div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">60 Min/Video</div>
            <div className="text-xs text-slate-400 font-medium">Script → Voice → Upload → Dollar</div>
          </div>

          <div className="bg-[#0F1D32] border border-green-500/40 p-5 rounded-2xl shadow-lg shadow-green-950/40">
            <div className="text-xs font-bold text-slate-400 uppercase mb-1">YouTube Income</div>
            <div className="text-2xl sm:text-3xl font-black text-green-400 mb-1">$500/month</div>
            <div className="text-xs text-slate-400 font-medium">= PKR 1,39,000 — Sote Waqt Bhi</div>
          </div>
        </div>

        {/* Seat Fill FOMO Bar */}
        <div className="max-w-xl mx-auto bg-[#0F1D32] border border-amber-500/40 rounded-2xl p-4 mb-6 text-left shadow-lg">
          <div className="flex justify-between items-center text-xs font-bold mb-2">
            <span className="text-amber-400 flex items-center gap-1.5">
              <Flame size={15} className="text-red-500 animate-bounce" /> 
              Live Batch Status: 78% Seats Filled
            </span>
            <span className="text-red-400 font-mono">Only 22 Seats Left!</span>
          </div>
          <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-700">
            <div className="bg-gradient-to-r from-amber-500 to-red-500 h-full rounded-full w-[78%] transition-all duration-1000 shadow-sm" />
          </div>
        </div>

        {/* Hero CTA Button */}
        <div className="max-w-xl mx-auto">
          <button 
            onClick={openPayModal}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-black text-base sm:text-lg py-5 px-6 rounded-2xl shadow-xl shadow-green-900/40 transition-all transform active:scale-95 flex items-center justify-center gap-3"
          >
            <span>Aaj Raat Ka Woh Banda Banein Jo ChatGPT Sahi Use Karta Hai — PKR 1,999</span>
            <ArrowRight size={22} className="shrink-0" />
          </button>
          
          {/* Money Back Guarantee Badge */}
          <div className="mt-4 p-3 bg-green-950/40 border border-green-500/40 rounded-xl flex items-center justify-center gap-2 text-xs text-green-300 font-bold">
            <ShieldCheck size={16} className="text-green-400 shrink-0" />
            <span>100% Money Back Guarantee — Value na mile toh full refund!</span>
          </div>

          <p className="text-xs text-slate-400 mt-2 flex items-center justify-center gap-2 font-medium">
            <Lock size={13} className="text-green-400" />
            🔒 7 PM se pehle | 100 seats per batch | Legal | Safe | Bank mein aata hai
          </p>
        </div>
      </header>

      {/* 3. SECTION 1: THE NARRATIVE (2026 University Batch) */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-[#040A12] border-b border-slate-800">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-2 italic">
              &quot;Ek Kahani Sunao. Shayad Aap Is Mein Khud Ko Dekhein.&quot;
            </h2>
          </div>

          <div className="space-y-6 text-slate-200 text-base md:text-lg leading-relaxed">
            <p>
              Lahore ki ek university. Engineering department. <strong>2026. New Admission & Semester 1.</strong><br />
              Do student. Ek hi class. Ek hi teacher. Ek hi syllabus.<br />
              Dono ke ghar se fees aa rahi hai. Dono ke abbu mehnat karte hain.
            </p>

            <div className="h-px bg-slate-800 my-6" />

            <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-2xl">
              <span className="inline-block bg-red-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md mb-3">
                Pehla banda — Bilal
              </span>
              <p className="text-sm sm:text-base text-slate-200">
                Assignment deadline aati hai. ChatGPT kholta hai. Paste. Copy. Submit.<br />
                Exam mein bhi jugaad lagata hai: <em>&apos;Pass hona zaroori hai.&apos;</em><br />
                <strong>Result:</strong> A grade. Family khush: <em>&apos;Beta chal raha hai.&apos;</em>
              </p>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 p-6 rounded-2xl">
              <span className="inline-block bg-green-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md mb-3">
                Doosra banda — Saad
              </span>
              <p className="text-sm sm:text-base text-slate-200">
                Wahi ChatGPT kholta hai. Lekin assignment mein paste nahi karta.<br />
                Woh poochta hai: <strong className="text-green-400">&apos;Yeh tool mujhe dollar kaise dila sakta hai?&apos;</strong><br />
                Raat ke 11 baje — jab Bilal so raha hota hai — Saad apne laptop par ChatGPT se script likhta hai, AI voice se voiceover banata hai, video upload karke so jaata hai.
              </p>
            </div>

            <div className="h-px bg-slate-800 my-6" />

            <p>
              <strong>Semester 4. Mid exams.</strong><br />
              <strong>Bilal:</strong> Phir ChatGPT. Phir copy. Phir grade.<br />
              <strong>Saad:</strong> Channel par 15 videos. Pehli 1,000 views. Thodi si dollar earning shuru.
            </p>

            <div className="h-px bg-slate-800 my-6" />

            <div className="bg-[#0F1D32] border border-slate-700 p-6 rounded-2xl space-y-3">
              <h3 className="text-base font-bold text-white uppercase tracking-wider">Degree Khatam Hone Ke Baad:</h3>
              <p className="text-sm sm:text-base text-red-300">
                <strong>Bilal:</strong> 200+ job applications. 13 rejections. 2 interviews. Ek offer — PKR 32,000/month. <em>&apos;Yeh toh socha nahi tha.&apos;</em>
              </p>
              <p className="text-sm sm:text-base text-green-300 font-semibold">
                <strong>Saad:</strong> YouTube channel — 2,847 subscribers. $340/month. <span className="text-green-400 font-bold">PKR 94,520 monthly.</span> Ghar baith kar. Sote waqt bhi.
              </p>
            </div>

            <p className="italic text-slate-300">
              Aur Bilal kya kar raha hai? PKR 32,000 mein se transport aur kharcha nikal kar Saad ko poochta hai: <em>&apos;Yaar yeh tu kab se kar raha tha?&apos;</em><br />
              Saad ka jawab: <strong>&apos;Bataya tha na — tune kaha tha exam pe focus kar.&apos;</strong>
            </p>

            <div className="mt-8 p-6 bg-gradient-to-r from-slate-900 to-[#0F1D32] border-2 border-green-500/50 rounded-2xl text-center">
              <p className="text-base sm:text-xl font-serif italic text-white mb-2">
                Yeh Bilal aur Saad ki kahani nahi. Yeh Pakistan ki har university ki kahani hai.
              </p>
              <p className="text-lg sm:text-2xl font-black text-green-400">
                Aap Bilal hain ya Saad — yeh aaj raat decide hoga.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION 2: SAME AI. COMPLETELY DIFFERENT USE */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-white text-slate-900 border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 mb-3">
              Wahi ChatGPT. Wahi AI Tools. Wahi Internet. Bilkul Alag Zindagi.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-red-50 border-2 border-red-200 p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-black text-red-900 mb-4 flex items-center gap-2">
                  <span>❌</span> Galat Use (Bilal Path)
                </h3>
                <ul className="space-y-4 text-sm text-slate-700">
                  <li className="flex items-start gap-2"><span className="text-red-600 font-bold">•</span><span><strong>ChatGPT se assignment copy:</strong><br />Result: Grade jo 4 saal baad kisi ko yaad nahi hoga.</span></li>
                  <li className="flex items-start gap-2"><span className="text-red-600 font-bold">•</span><span><strong>AI se exam answers:</strong><br />Result: Degree jo PKR 25K/month ki naukri dilayegi.</span></li>
                  <li className="flex items-start gap-2"><span className="text-red-600 font-bold">•</span><span><strong>AI se notes banana:</strong><br />Result: Professor khush. Future same hi rahega.</span></li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-red-200 text-xs font-bold text-red-800">
                Total return: PKR 25,000-45,000/mo (Kisi aur ke liye kaam)
              </div>
            </div>

            <div className="bg-green-50 border-2 border-green-300 p-6 sm:p-8 rounded-2xl flex flex-col justify-between shadow-lg">
              <div>
                <h3 className="text-lg font-black text-green-900 mb-4 flex items-center gap-2">
                  <span>✅</span> Sahi Use (Saad Path)
                </h3>
                <ul className="space-y-4 text-sm text-slate-800">
                  <li className="flex items-start gap-2"><span className="text-green-600 font-bold">•</span><span><strong>ChatGPT se YouTube script:</strong><br />Result: Video jo 3 saal tak views aur earning laata rahega.</span></li>
                  <li className="flex items-start gap-2"><span className="text-green-600 font-bold">•</span><span><strong>AI voice tools se voiceover:</strong><br />Result: Pro studio audio with zero mic cost.</span></li>
                  <li className="flex items-start gap-2"><span className="text-green-600 font-bold">•</span><span><strong>AI se topics & research:</strong><br />Result: Content jo algorithm khud push karta hai.</span></li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-green-200 text-xs font-bold text-green-800">
                Total return: Dollar income (Growing asset, apna boss)
              </div>
            </div>
          </div>

          <div className="text-center">
            <button 
              onClick={openPayModal}
              className="bg-green-600 hover:bg-green-700 text-white font-extrabold text-base sm:text-lg py-4 px-8 rounded-2xl shadow-xl transition-all"
            >
              Mujhe Sahi Use Seekhna Hai →
            </button>
          </div>
        </div>
      </section>

      {/* 5. SECTION 3: NUMBERS */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-[#07111F] border-b border-slate-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-2">
              Pakistan Mein 4-Year Degree Ke Baad Kya Actually Hota Hai?
            </h2>
            <p className="text-slate-400 text-sm font-mono">Numbers. Real. 2026 Batch Reality.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10 text-center">
            <div className="bg-[#0F1D32] border border-red-500/30 p-4 sm:p-5 rounded-2xl">
              <div className="text-2xl sm:text-3xl font-black text-red-400 mb-1">4,00,000+</div>
              <div className="text-xs sm:text-sm font-bold text-white">Graduates Har Saal</div>
            </div>
            <div className="bg-[#0F1D32] border border-red-500/30 p-4 sm:p-5 rounded-2xl">
              <div className="text-2xl sm:text-3xl font-black text-red-400 mb-1">30%+</div>
              <div className="text-xs sm:text-sm font-bold text-white">Unemployment Rate</div>
            </div>
            <div className="bg-[#0F1D32] border border-red-500/30 p-4 sm:p-5 rounded-2xl">
              <div className="text-2xl sm:text-3xl font-black text-red-400 mb-1">PKR 25,000</div>
              <div className="text-xs sm:text-sm font-bold text-white">Starting Salary</div>
            </div>
            <div className="bg-[#0F1D32] border border-green-500/30 p-4 sm:p-5 rounded-2xl">
              <div className="text-2xl sm:text-3xl font-black text-green-400 mb-1">$70 Billion+</div>
              <div className="text-xs sm:text-sm font-bold text-white">YouTube Payout</div>
            </div>
            <div className="bg-[#0F1D32] border border-green-500/30 p-4 sm:p-5 rounded-2xl">
              <div className="text-2xl sm:text-3xl font-black text-green-400 mb-1">$500/Month</div>
              <div className="text-xs sm:text-sm font-bold text-white">= PKR 1,39,000</div>
            </div>
            <div className="bg-[#0F1D32] border border-green-500/30 p-4 sm:p-5 rounded-2xl">
              <div className="text-2xl sm:text-3xl font-black text-green-400 mb-1">40M+</div>
              <div className="text-xs sm:text-sm font-bold text-white">Users in Pakistan</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SECTION 8: 2026 ACADEMIC SELECTOR */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-[#07111F] border-b border-slate-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-2">
              Aap 2026 Mein Kahan Khare Hain?
            </h2>
            <p className="text-slate-400 text-sm font-mono">Apna status select karein:</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              { id: "new_adm", label: "New Admission (2026)" },
              { id: "1st", label: "Bachelor's (1st/2nd Yr)" },
              { id: "3rd", label: "Bachelor's (3rd/4th Yr)" },
              { id: "master", label: "Master's Student" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedYear(tab.id as any)}
                className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                  selectedYear === tab.id 
                    ? "bg-green-600 text-white border-green-500 shadow-lg shadow-green-900/40" 
                    : "bg-[#0F1D32] text-slate-400 border-slate-700 hover:border-slate-500"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-[#0F1D32] border border-slate-700 p-6 sm:p-8 rounded-2xl max-w-3xl mx-auto text-left">
            {selectedYear === "new_adm" && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-green-400">New Admission (2026): Sabse Bada Golden Window!</h3>
                <p className="text-sm text-slate-200 leading-relaxed">
                  Agar university ke pehle din se channel start karoge, toh 2nd year tak aapki monthly dollar income university fees se zyada hogi. Graduation tak aap job mangne wale nahi, hire karne wale banoge!
                </p>
              </div>
            )}

            {selectedYear === "1st" && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-green-400">Bachelor&apos;s (1st & 2nd Year): Perfect Compounding Time</h3>
                <p className="text-sm text-slate-200 leading-relaxed">
                  Semester 2-4 mein channel build hoga. Semester 5-6 mein $100-300/mo incoming. Degree ke baad 6 mahine ka job hunt nahi karna parega.
                </p>
              </div>
            )}

            {selectedYear === "3rd" && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-amber-400">Bachelor&apos;s (3rd & 4th Year): Urgent Action Required!</h3>
                <p className="text-sm text-slate-200 leading-relaxed">
                  Real world hit karne wali hai. Shaam ke 2 ghante AI automation seekhein taake degree khatam hone par aapke paas dollar incoming alternative ho.
                </p>
              </div>
            )}

            {selectedYear === "master" && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-green-400">Master&apos;s / Post-Grad: Highest Dollar High-Ticket Opportunity</h3>
                <p className="text-sm text-slate-200 leading-relaxed">
                  Aapka academic knowledge + US/UK dollar RPM = Fast monetization. 6-12 mahine mein full-time freelancing / job replace karne ka option.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 7. SECTION 9: WHAT YOU GET & 5 BONUSES */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-[#040A12] border-b border-slate-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-2">
              Student Starter Kit Included Free
            </h2>
            <p className="text-slate-400 text-sm font-mono">5 Founding Bonuses (Worth PKR 15,499)</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {[
              { title: "🤖 AI Prompts Pack (50+ Prompts)", val: "3,000" },
              { title: "🔍 Niche Research Template", val: "2,000" },
              { title: "📅 90-Day Content Calendar", val: "2,500" },
              { title: "💬 Private WhatsApp Group (7 Days)", val: "5,000" },
              { title: "📹 Workshop Recording (24 Hours)", val: "2,999" },
            ].map((b, i) => (
              <div key={i} className="p-4 bg-[#0F1D32] border border-slate-700 rounded-xl flex justify-between items-center">
                <span className="text-sm font-bold text-slate-200">{b.title}</span>
                <span className="text-xs font-mono text-green-400 font-bold">PKR {b.val} (FREE)</span>
              </div>
            ))}
          </div>

          {/* Value Box */}
          <div className="max-w-xl mx-auto bg-gradient-to-b from-[#0F1D32] to-[#040A12] border-2 border-green-500 p-8 rounded-2xl text-center shadow-2xl">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-1">Total Value: PKR 15,499</div>
            <div className="text-4xl sm:text-5xl font-mono font-black text-green-400 mb-6">PKR 1,999</div>
            <button 
              onClick={openPayModal}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-extrabold text-lg py-5 px-6 rounded-2xl shadow-xl transition-all"
            >
              Aaj Raat Ki Seat Lock Karein →
            </button>
            
            {/* Money Back Guarantee Banner */}
            <div className="mt-4 p-3 bg-green-950/50 border border-green-500/40 rounded-xl flex items-center justify-center gap-2 text-xs text-green-300 font-bold">
              <ShieldCheck size={16} className="text-green-400 shrink-0" />
              <span>100% Full Money Back Guarantee — Attend workshop, if no value get 100% refund!</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="py-12 px-4 bg-[#040A12] text-center text-slate-500 text-xs">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="font-bold text-white text-base">YouTube Empire Builders</div>
          <div className="flex justify-center gap-6 text-slate-400 pt-2">
            <button type="button" onClick={() => setPolicyModal("refund")} className="hover:text-white underline">Refund Policy</button>
            <button type="button" onClick={() => setPolicyModal("privacy")} className="hover:text-white underline">Privacy</button>
            <a href={`https://wa.me/${TEAM_WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="hover:text-white underline">WhatsApp Support (+92 329 6158206)</a>
          </div>
          <p className="text-[11px] text-slate-600 pt-3">
            Disclaimer: YouTube is a long-term content business. Individual results vary. © 2026 YouTube Empire Builders — Abrar Nadir
          </p>
        </div>
      </footer>

      {/* 9. FLOATING MOBILE CTA */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 bg-[#07111F] border-t border-slate-700 p-3 flex items-center justify-between gap-3 shadow-2xl transition-transform duration-300 md:hidden ${floatingVisible ? "translate-y-0" : "translate-y-28"}`}>
        <div className="pl-2">
          <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Fee Today</div>
          <div className="font-black text-lg text-green-400 leading-tight">PKR 1,999</div>
        </div>
        <button 
          onClick={openPayModal}
          className="bg-green-600 hover:bg-green-500 text-white font-bold text-sm py-3 px-5 rounded-xl shadow-lg active:scale-95"
        >
          Seat Lock Karein ✓
        </button>
      </div>

      {/* 10. ALL-IN-ONE REGISTRATION & PAYMENT POPUP */}
      {payModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-[#0F1D32] text-white w-full max-w-xl rounded-t-3xl sm:rounded-3xl border-t-4 sm:border-2 border-green-500 shadow-2xl max-h-[94vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom sm:zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="bg-[#07111F] p-4 sm:p-5 flex items-center justify-between border-b border-slate-700 shrink-0">
              <div>
                <div className="text-[11px] font-mono text-green-400 font-bold uppercase tracking-wider">YouTube Empire Builders</div>
                <h3 className="text-base sm:text-lg font-bold text-white">{modalStep === 1 ? "Complete Registration & Payment" : "Verification in Progress"}</h3>
              </div>
              <button 
                onClick={closePayModal}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-red-600 flex items-center justify-center font-bold text-lg transition-colors"
              >
                &times;
              </button>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 text-slate-200 space-y-4">
              {modalStep === 1 ? (
                <form onSubmit={handleSubmitProof} className="space-y-4">
                  
                  {/* FOMO Live Seat Fill Bar */}
                  <div className="bg-[#07111F] border border-amber-500/40 rounded-xl p-3 text-xs">
                    <div className="flex justify-between font-bold text-amber-400 mb-1.5">
                      <span className="flex items-center gap-1"><Flame size={14} className="text-red-500" /> Batch Filling Fast: 78/100 Seats</span>
                      <span className="text-red-400 font-mono">22 Left!</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-amber-500 to-red-500 h-full w-[78%]" />
                    </div>
                  </div>

                  {/* FREE Bonuses List inside Modal */}
                  <div className="bg-[#07111F] border border-green-500/30 rounded-xl p-3.5 space-y-2">
                    <div className="text-xs font-bold text-green-400 flex items-center gap-1.5">
                      <Gift size={14} /> 5 Bonuses Included Free (Worth PKR 15,499):
                    </div>
                    <div className="grid grid-cols-1 gap-1 text-[11px] text-slate-300">
                      <div className="flex justify-between"><span>🤖 AI Prompts Pack (50+ Prompts)</span><span className="text-green-400 font-bold">FREE (PKR 3,000)</span></div>
                      <div className="flex justify-between"><span>🔍 Niche Research Template</span><span className="text-green-400 font-bold">FREE (PKR 2,000)</span></div>
                      <div className="flex justify-between"><span>📅 90-Day Content Calendar</span><span className="text-green-400 font-bold">FREE (PKR 2,500)</span></div>
                      <div className="flex justify-between"><span>💬 Private WhatsApp Group (7 Days)</span><span className="text-green-400 font-bold">FREE (PKR 5,000)</span></div>
                      <div className="flex justify-between"><span>📹 Workshop Recording (24 Hours)</span><span className="text-green-400 font-bold">FREE (PKR 2,999)</span></div>
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1.5">Full Name *</label>
                    <input 
                      type="text" 
                      placeholder="Apna mukammal naam likhein" 
                      value={fullName} 
                      onChange={(e) => setFullName(e.target.value)} 
                      required 
                      className="w-full p-3.5 border border-slate-600 rounded-xl text-sm bg-[#07111F] text-white placeholder-slate-500 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1.5">WhatsApp Number *</label>
                    <input 
                      type="tel" 
                      placeholder="03xx-xxxxxxx" 
                      value={whatsappNumber} 
                      onChange={(e) => setWhatsappNumber(e.target.value)} 
                      required 
                      className="w-full p-3.5 border border-slate-600 rounded-xl text-sm bg-[#07111F] text-white placeholder-slate-500 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
                    />
                  </div>

                  {/* Payment Tabs */}
                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-2">Select Payment Method (Fee: PKR 1,999)</label>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("Meezan Bank")}
                        className={`py-2.5 px-2 text-xs font-bold rounded-xl border transition-all text-center ${
                          paymentMethod === "Meezan Bank" ? "bg-green-600 text-white border-green-500 shadow-md" : "bg-[#07111F] text-slate-400 border-slate-700"
                        }`}
                      >
                        🏦 Meezan Bank
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("Easypaisa")}
                        className={`py-2.5 px-2 text-xs font-bold rounded-xl border transition-all text-center ${
                          paymentMethod === "Easypaisa" ? "bg-green-600 text-white border-green-500 shadow-md" : "bg-[#07111F] text-slate-400 border-slate-700"
                        }`}
                      >
                        📱 Easypaisa
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("Binance")}
                        className={`py-2.5 px-2 text-xs font-bold rounded-xl border transition-all text-center ${
                          paymentMethod === "Binance" ? "bg-green-600 text-white border-green-500 shadow-md" : "bg-[#07111F] text-slate-400 border-slate-700"
                        }`}
                      >
                        🟡 Binance UID
                      </button>
                    </div>

                    {/* Bank Details Card */}
                    <div className="bg-[#07111F] border border-slate-700 p-4 rounded-xl space-y-2.5 text-xs">
                      {paymentMethod === "Meezan Bank" && (
                        <div>
                          <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                            <span className="text-slate-400 font-medium">Bank Name:</span>
                            <span className="font-bold text-white">Meezan Bank Limited</span>
                          </div>
                          <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                            <span className="text-slate-400 font-medium">Account Title:</span>
                            <span className="font-bold text-white flex items-center gap-2">
                              Muhammad Abrar
                              <button type="button" onClick={() => copyToClipboard("Muhammad Abrar", "m_title")} className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-[11px] px-2 py-0.5 rounded font-bold">
                                {copiedKey === "m_title" ? "Copied ✓" : "Copy"}
                              </button>
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                            <span className="text-slate-400 font-medium">Account Number:</span>
                            <span className="font-mono font-bold text-white flex items-center gap-2">
                              02370103321036
                              <button type="button" onClick={() => copyToClipboard("02370103321036", "m_acc")} className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-[11px] px-2 py-0.5 rounded font-bold">
                                {copiedKey === "m_acc" ? "Copied ✓" : "Copy"}
                              </button>
                            </span>
                          </div>
                          <div className="flex justify-between items-center pt-1.5">
                            <span className="text-slate-400 font-medium">IBAN:</span>
                            <span className="font-mono font-bold text-white flex items-center gap-2">
                              PK39MEZN0002370103321036
                              <button type="button" onClick={() => copyToClipboard("PK39MEZN0002370103321036", "m_iban")} className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-[11px] px-2 py-0.5 rounded font-bold">
                                {copiedKey === "m_iban" ? "Copied ✓" : "Copy"}
                              </button>
                            </span>
                          </div>
                        </div>
                      )}

                      {paymentMethod === "Easypaisa" && (
                        <div>
                          <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                            <span className="text-slate-400 font-medium">Easypaisa Number:</span>
                            <span className="font-mono font-bold text-white flex items-center gap-2">
                              03274532186
                              <button type="button" onClick={() => copyToClipboard("03274532186", "ep_num")} className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-[11px] px-2 py-0.5 rounded font-bold">
                                {copiedKey === "ep_num" ? "Copied ✓" : "Copy"}
                              </button>
                            </span>
                          </div>
                          <div className="flex justify-between items-center pt-1.5">
                            <span className="text-slate-400 font-medium">Account Title:</span>
                            <span className="font-bold text-white">Muhammad Abrar Ghauri</span>
                          </div>
                        </div>
                      )}

                      {paymentMethod === "Binance" && (
                        <div>
                          <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                            <span className="text-slate-400 font-medium">Binance ID / UID:</span>
                            <span className="font-mono font-bold text-white flex items-center gap-2">
                              117971802
                              <button type="button" onClick={() => copyToClipboard("117971802", "b_uid")} className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-[11px] px-2 py-0.5 rounded font-bold">
                                {copiedKey === "b_uid" ? "Copied ✓" : "Copy"}
                              </button>
                            </span>
                          </div>
                          <div className="flex justify-between items-center pt-1.5">
                            <span className="text-slate-400 font-medium">Binance Nickname:</span>
                            <span className="font-bold text-white">abrarnadircb</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* TID Optional */}
                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1.5">
                      Transaction ID / Reference Number <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="Agar available ho toh darj karein" 
                      value={transactionId} 
                      onChange={(e) => setTransactionId(e.target.value)} 
                      className="w-full p-3.5 border border-slate-600 rounded-xl text-sm bg-[#07111F] text-white placeholder-slate-500 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
                    />
                  </div>

                  {/* Screenshot Upload */}
                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1.5">Attach Payment Screenshot *</label>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-600 hover:border-green-500 bg-[#07111F] p-4 rounded-xl text-center cursor-pointer transition-colors"
                    >
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        accept="image/jpeg,image/png,image/webp,application/pdf" 
                        style={{ display: "none" }}
                      />
                      {screenshotBase64 ? (
                        <div>
                          <span className="inline-block bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full border border-green-500/30">
                            Screenshot Attached ✓
                          </span>
                          <p className="text-xs text-slate-300 mt-1">{screenshotFilename}</p>
                        </div>
                      ) : (
                        <div>
                          <span className="text-2xl block mb-1">📸</span>
                          <p className="text-xs font-bold text-white">Tap to upload receipt image / PDF</p>
                          <p className="text-[11px] text-slate-400">JPG, PNG, WEBP (Max: 10MB)</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {formError && (
                    <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-xl text-xs font-bold">
                      {formError}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-black text-base py-4 rounded-xl shadow-xl transition-all active:scale-98 disabled:opacity-70"
                  >
                    {isSubmitting ? "Processing..." : "Verify Payment on WhatsApp →"}
                  </button>

                  {/* Trust Badge under button */}
                  <div className="p-2.5 bg-green-950/30 border border-green-500/30 rounded-xl text-center text-xs text-green-300 font-bold flex items-center justify-center gap-1.5">
                    <ShieldCheck size={15} className="text-green-400 shrink-0" />
                    <span>🛡️ 100% Risk-Free Guarantee: After workshop, full refund if you don&apos;t see value!</span>
                  </div>
                </form>
              ) : (
                /* STEP 2: 10-SECOND COUNTDOWN SCREEN */
                <div className="text-center py-6 px-2 space-y-4">
                  <div className="inline-block bg-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-green-500/30">
                    ⏳ Verification Desk
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Thank You, {fullName.trim()}!
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Aap ki details aur payment receipt receive ho chuki hain. Hamari senior verification team aapki payment verify karke direct confirmed Zoom link aur WhatsApp group access provide karegi.
                  </p>

                  <div className="w-16 h-16 rounded-full bg-green-500/10 border-4 border-green-500 text-green-400 text-2xl font-black flex items-center justify-center mx-auto shadow-lg animate-pulse">
                    {countdown}s
                  </div>

                  <p className="text-xs text-slate-400 font-medium">
                    Opening WhatsApp automatically in {countdown} seconds...
                  </p>

                  <button
                    type="button"
                    onClick={triggerWhatsAppOpen}
                    className="w-full bg-[#25D366] hover:bg-[#20BA56] text-white py-3.5 px-6 rounded-xl font-bold text-sm shadow-xl transition-all"
                  >
                    💬 Open WhatsApp Immediately (+92 329 6158206)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* POLICY MODAL */}
      {policyModal && (
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0F1D32] border border-slate-700 text-white rounded-2xl p-6 max-w-lg w-full relative max-h-[80vh] overflow-y-auto">
            <button onClick={() => setPolicyModal(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold">
              &times;
            </button>
            <h3 className="text-lg font-bold mb-4 text-white">
              {policyModal === "refund" ? "💰 100% Refund Policy" : "🔒 Privacy Policy"}
            </h3>
            <div className="text-xs text-slate-300 space-y-3 leading-relaxed">
              {policyModal === "refund" ? (
                <p>We offer a <strong>100% money-back guarantee</strong>. If you attend the workshop and feel it didn&apos;t deliver value, simply message our support WhatsApp (+92 329 6158206) within 72 hours for a full refund with no questions asked.</p>
              ) : (
                <p>We respect your privacy. Your contact details and payment proof are collected exclusively for registration confirmation, Zoom link delivery, and 7-day mentorship support.</p>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
