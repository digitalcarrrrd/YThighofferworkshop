"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Check, X, Play, ShieldCheck, 
  ArrowRight, Users, DollarSign, 
  Zap, ChevronDown, 
  TrendingUp, Home, Lock, AlertTriangle,
  MessageSquare, Monitor,
  GraduationCap, Briefcase, Heart, Smile, Gift, Flame, Clock, Calendar, Globe
} from "lucide-react";

const TEAM_WHATSAPP_NUMBER = "923296158206";

const CITIES = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Gujranwala", "Sialkot", "Hyderabad", "Quetta"];

const TESTIMONIALS_1 = [
  { q: "Raat 10 baje tak mujhe nahi pata tha ke offer kaise banate hain. 17 din baad pehla client — $180.", name: "Ahmed", city: "Lahore" },
  { q: "Main housewife hoon. Raat 9 baje bachon ke sone ke baad kaam. Pehla month $220.", name: "Fatima", city: "Karachi" },
  { q: "Job nahi chhodi. Bas raat 2 ghante. Ab side income meri salary ke barabar hai.", name: "Bilal", city: "Islamabad" },
  { q: "“Scam hai” kehne wale ab puchte hain: “bhai, kaise kiya?”", name: "Sana", city: "Multan" },
];

const TESTIMONIALS_2 = [
  { q: "Roadmap PDF ab bhi mere saamne chipka hai. 30 din, 2 clients.", name: "Usman", city: "Faisalabad" },
  { q: "Bilkul zero se aaya tha — computer on karna bhi theek se nahi aata tha tools ke ilawa.", name: "Hina", city: "Rawalpindi" },
  { q: "Dollar ki value dekh kar ab dard nahi, hisaab hota hai.", name: "Daniyal", city: "Peshawar" },
  { q: "Pehle 2 tools free the. Pehla client paid. Aasan hisaab.", name: "Ayesha", city: "Quetta" }
];

export default function WorkshopYt9Client() {
  const [dynamicDate, setDynamicDate] = useState<string>("");
  const [payModalOpen, setPayModalOpen] = useState<boolean>(false);
  const [modalStep, setModalStep] = useState<1 | 2>(1);
  const [policyModal, setPolicyModal] = useState<"refund" | "privacy" | null>(null);

  // Form State
  const [fullName, setFullName] = useState<string>("");
  const [whatsappNumber, setWhatsappNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
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
  const [floatingVisible, setFloatingVisible] = useState<boolean>(false);
  const [activeEra, setActiveEra] = useState<"e1" | "e2" | "e3">("e3");
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  // Calculator State
  const [usdTarget, setUsdTarget] = useState<number>(1500);

  // Pain Checklist State
  const [selectedPains, setSelectedPains] = useState<number[]>([]);

  // Interactive Plot Matrix State
  const [plots, setPlots] = useState<boolean[]>([]);
  const [plotsClaimedCount, setPlotsClaimedCount] = useState<number>(37);
  const [activeCityTag, setActiveCityTag] = useState<{ city: string; idx: number } | null>(null);

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

  // Initialize Plot Matrix
  useEffect(() => {
    const initialPlots = Array.from({ length: 96 }, (_, i) => i % 3 === 0 || i % 5 === 0);
    setPlots(initialPlots);

    const interval = setInterval(() => {
      setPlots((prev) => {
        const unclaimed = prev.map((val, idx) => (!val ? idx : null)).filter((idx) => idx !== null) as number[];
        if (unclaimed.length === 0) return prev;
        const targetIdx = unclaimed[Math.floor(Math.random() * unclaimed.length)];
        const next = [...prev];
        next[targetIdx] = true;
        
        const randomCity = CITIES[Math.floor(Math.random() * CITIES.length)];
        setActiveCityTag({ city: randomCity, idx: targetIdx });
        setTimeout(() => setActiveCityTag(null), 2500);

        setPlotsClaimedCount((c) => c + 1);
        return next;
      });
    }, 5500);

    return () => clearInterval(interval);
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
    return `Salam Abrar Nadir & Support Team! Main ne Digital Zameen AI Skills Live Workshop (Workshop 9) ke liye payment transfer kar di hai.\n\n*Name:* ${fullName.trim()}\n*WhatsApp:* ${whatsappNumber.trim()}${email.trim() ? `\n*Email:* ${email.trim()}` : ""}\n*Payment Method:* ${paymentMethod}${transactionId.trim() ? `\n*Transaction ID:* ${transactionId.trim()}` : ""}\n*Target Income:* $${usdTarget}/mo (PKR ${(usdTarget * 278).toLocaleString()})\n*Batch Date:* ${dynamicDate}\n*Amount Paid:* PKR 2,999\n\nI have attached my payment screenshot. Please verify and share the confirmed Zoom link & WhatsApp community invite. Shukriya! 😊`;
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
      await fetch("/api/yt9-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: whatsappNumber.trim(),
          email: email.trim(),
          paymentMethod: paymentMethod === "Meezan Bank" ? "Bank Transfer" : paymentMethod,
          transactionId: transactionId.trim() || "N/A",
          batchDate: dynamicDate,
          monthlyTarget: `$${usdTarget}/mo`,
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
          value: 2999,
          currency: "PKR",
          content_name: "Digital Zameen Workshop 9",
        });
      }

      setIsSubmitting(false);
      setModalStep(2); // 10-second redirect screen
    } catch {
      setIsSubmitting(false);
      setModalStep(2);
    }
  };

  const togglePain = (idx: number) => {
    setSelectedPains((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const pkrMonthly = usdTarget * 278;
  const pkrYearly = pkrMonthly * 12;

  const painPoints = [
    "Mahine ka aakhir aata hai, paisa pehle",
    "Monday subah pet mein gaanth",
    "Salary barhne ka koi clear tareeqa nahi",
    "Skills 3 saal purani hain",
    "Dollar ki qeemat dekh kar dard hota hai",
    "Ghar walon ko woh cheezein nahi de pata jo dena chahta hoon",
    "Side income shuru karni hai par “kaise?” nahi pata",
    "YouTube pe 2 ghante dekh liye, kaam 0 kiya",
  ];

  const faqs = [
    {
      q: "Bilkul zero se hoon — kya chalega?",
      a: "Haan — isi ke liye design kiya gaya hai. Live demo mein har step screen pe dikhta hai, aur jo samajh na aaye, live poocho. Zero experience wale hi sab se zyada faida uthate hain, kyunke unhe kuch 'unlearn' nahi karna parta.",
    },
    {
      q: "Recording milti hai?",
      a: "Haan, 48 ghante tak. Par live aana behtar hai — Q&A sirf live mein hota hai, aur aap ke apne sawaal ke jawab wahi milte hain.",
    },
    {
      q: "Job ke saath manage ho jayega?",
      a: "Haan. Waqt raat 8–10 hi is liye rakha gaya hai — jab bachay so jayen, dinner ho chuka ho. Workshop ke baad sirf 1 ghanta roz kafi hai. Aur pehla client 30 din ke andar average hai.",
    },
    {
      q: "Zyada mehnga to nahi?",
      a: "Ek family dinner ka kharcha — uske badle 30-din ka poora rasta, tools, script aur community. Aur agar useful hi na lage to next batch free ya full refund. Risk humara hai, aap ka nahi.",
    },
    {
      q: "Medium kya hai — Urdu ya English?",
      a: "Roman Urdu + English mix — jaise aap dost se baat karte ho. Technical terms English mein, baqi sab aasaan Roman Urdu mein.",
    },
    {
      q: "Kya main guaranteed paise kama lunga?",
      a: "Imandari se: nahi — aur jo guarantee de, us se bacho. Guarantee sirf waqt, system aur support ka hai. Kamana aap ke execution se hai. Yeh workshop 'kaise' wala hissa solve karta hai.",
    },
    {
      q: "Payment ka tareeqa?",
      a: "Direct Meezan Bank, Easypaisa, aur Binance UID available hain. Submit karne par instant WhatsApp confirmation aur Zoom access milta hai.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B100C] text-slate-100 font-sans pb-24 md:pb-0 overflow-x-hidden selection:bg-[#2FD97E] selection:text-[#04220F]">
      
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="sticky top-0 z-40 bg-[#FFB020] text-[#2A1B00] text-center py-2 px-4 text-xs font-black uppercase tracking-wider shadow-md flex items-center justify-center gap-2 flex-wrap">
        <span>Next batch: <b>{isAfterSeven ? "Kal Raat 8:00 PM PKT" : "Aaj Raat 8:00 PM PKT"}</b></span>
        <span className="opacity-40">•</span>
        <span>Doors band: <b>{timeLeft}</b></span>
        <span className="opacity-40">•</span>
        <span>Sirf <b className="text-red-900 font-black">22 Seats</b> Baaki</span>
      </div>

      {/* 2. HERO SECTION */}
      <header className="pt-12 md:pt-20 pb-16 px-4 md:px-6 max-w-6xl mx-auto border-b border-white/10">
        <div className="grid md:grid-cols-12 gap-8 items-start">
          
          {/* Left Column */}
          <div className="md:col-span-7 text-left space-y-6">
            <div className="inline-flex items-center gap-2 border border-[#2FD97E]/40 bg-[#2FD97E]/10 text-[#2FD97E] px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase">
              <span>● Daily Live Workshop • Raat 8 Se 10 Baje PKT • Sirf 100 Seats</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight uppercase">
              Baap Ne Zameen Di.<br />
              <span className="text-[#2FD97E] drop-shadow-[0_0_25px_rgba(47,217,126,0.35)]">
                Aap Digital Zameen Do.
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
              Aap ke baap ne apne bachon ko zameen di — <strong className="text-white">us waqt sasti thi, aaj qeemti hai.</strong> Aaj aap ke haath mein wohi mauqa hai: AI ki digital zameen. 2 ghante, live, raat 8 baje. Zero experience chalegi.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button 
                onClick={openPayModal}
                className="bg-[#2FD97E] hover:bg-[#52E897] text-[#04220F] font-black text-base py-4 px-8 rounded-xl shadow-xl shadow-[#2FD97E]/20 transition-all transform active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Mera Seat Book Karo</span>
                <ArrowRight size={18} />
              </button>
              <a 
                href="#agenda"
                className="bg-transparent border border-white/20 hover:border-[#2FD97E] text-white hover:text-[#2FD97E] font-bold text-base py-4 px-6 rounded-xl transition-colors text-center"
              >
                Pehle Plan Dekho
              </a>
            </div>

            {/* Chips */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-2 border border-white/10 bg-white/5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300">
                <Clock size={14} className="text-[#2FD97E]" /> Agla batch: {isAfterSeven ? "Kal Raat 8 PM" : "Aaj Raat 8 PM"} — <span className="text-[#FFB020] font-mono font-bold">{timeLeft}</span>
              </span>
              <span className="inline-flex items-center gap-2 border border-[#FFB020]/30 bg-[#FFB020]/10 px-3 py-1.5 rounded-lg text-xs font-bold text-[#FFB020]">
                <Users size={14} /> Sirf 22 seats baaki — 100 mein se
              </span>
            </div>

            <div className="flex gap-6 text-xs text-slate-400 font-semibold pt-1">
              <span><b>4.9/5</b> Rating</span>
              <span><b>12,000+</b> Students Trained</span>
              <span>Live Q&A Included</span>
            </div>
          </div>

          {/* Right Column: Digital Zameen Plot Status Box */}
          <div className="md:col-span-5 bg-[#111913] border border-white/10 rounded-2xl p-5 shadow-2xl relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-200">Digital Zameen — Plot Status</h3>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-[#2FD97E] tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#2FD97E] animate-pulse" /> LIVE
              </span>
            </div>

            {/* Matrix of Plots */}
            <div className="grid grid-cols-12 gap-1 relative">
              {plots.map((claimed, idx) => (
                <div 
                  key={idx} 
                  className={`aspect-square rounded-sm border relative transition-all duration-300 ${
                    claimed 
                      ? "border-[#FFB020]/30 bg-[#FFB020]/15" 
                      : "border-[#2FD97E]/30 bg-[#2FD97E]/5"
                  }`}
                >
                  {!claimed && <div className="absolute inset-0 m-auto w-1 h-1 rounded-full bg-[#2FD97E] opacity-50" />}
                  {activeCityTag && activeCityTag.idx === idx && (
                    <span className="absolute left-1/2 -top-6 -translate-x-1/2 bg-[#1C1302] text-[#FFB020] border border-[#FFB020]/50 text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap z-20 animate-bounce shadow-md">
                      Claimed from {activeCityTag.city}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-4 text-xs text-slate-400 font-semibold border-t border-white/10 pt-3">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#2FD97E]/40 border border-[#2FD97E]" /> Available</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#FFB020]/40 border border-[#FFB020]" /> Claimed</span>
              </div>
              <span className="text-[#FFB020] font-bold">Aaj {plotsClaimedCount} plots claim ho chuke</span>
            </div>
            
            <p className="text-[11px] text-slate-400 mt-3 italic">
              Jitni der aap soch rahe hain, utne plots claim ho rahe hain. Yeh page live monitor kar raha hai.
            </p>
          </div>

        </div>
      </header>

      {/* 3. OPENING HOOK — ERA TABS */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-[#0E1410] border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[#2FD97E] text-xs font-black uppercase tracking-widest mb-2">Shuruat Ka Sawaal</p>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase leading-tight">
              Duniya badal rahi hai.<br />
              Sawaal yeh hai — <span className="text-[#2FD97E]">aap badal rahe hain ya nahi?</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mt-3">
              Har 15–20 saal mein ek technology aati hai jo ameer-gareeb ka farak dobara set karti hai. Jo waqt pe samajhte hain, woh aage nikal jaate hain.
            </p>
          </div>

          {/* Era Tabs */}
          <div className="grid grid-cols-3 border border-white/10 rounded-2xl overflow-hidden mb-6 bg-[#111913]">
            <button 
              onClick={() => setActiveEra("e1")}
              className={`p-4 text-left border-r border-white/10 transition-colors ${activeEra === "e1" ? "bg-[#2FD97E]/10 text-[#2FD97E]" : "text-slate-400 hover:text-white"}`}
            >
              <small className="block text-[10px] font-bold uppercase tracking-wider">1980–90s</small>
              <b className="text-sm sm:text-base font-extrabold text-white">Computer</b>
            </button>
            <button 
              onClick={() => setActiveEra("e2")}
              className={`p-4 text-left border-r border-white/10 transition-colors ${activeEra === "e2" ? "bg-[#2FD97E]/10 text-[#2FD97E]" : "text-slate-400 hover:text-white"}`}
            >
              <small className="block text-[10px] font-bold uppercase tracking-wider">2000–10s</small>
              <b className="text-sm sm:text-base font-extrabold text-white">Internet</b>
            </button>
            <button 
              onClick={() => setActiveEra("e3")}
              className={`p-4 text-left transition-colors ${activeEra === "e3" ? "bg-[#2FD97E]/10 text-[#2FD97E]" : "text-slate-400 hover:text-white"}`}
            >
              <small className="block text-[10px] font-bold uppercase tracking-wider">Aaj — 2026</small>
              <b className="text-sm sm:text-base font-extrabold text-[#2FD97E]">AI Era</b>
            </button>
          </div>

          {/* Era Content Box */}
          <div className="bg-[#111913] border border-white/10 p-6 rounded-2xl space-y-4 text-sm text-slate-300">
            {activeEra === "e1" && (
              <div>
                <p><strong>Kya hua:</strong> Typewriter gayab ho gaya. Har office, bank aur school mein computer aa gaya.</p>
                <p className="text-[#2FD97E]"><strong>Jo waqt pe utre:</strong> Computer operators, typing centers, software wale — nayi jobs, nayi izzat. 2000 tak apna rate khud set kar rahe the.</p>
                <p className="text-red-400"><strong>Jo dekhte rahe:</strong> “Yeh angrezi ki machine hai, hamara kya kaam?” — typewriter pe tike rahe aur positions bhar gayi.</p>
                <div className="pt-2 text-xs font-bold text-red-400">Opportunity Window: BAND HO CHUKI</div>
              </div>
            )}

            {activeEra === "e2" && (
              <div>
                <p><strong>Kya hua:</strong> Duniya ek screen mein aa gayi. Websites, email, online paisa — dukaan ke baghair dukaan.</p>
                <p className="text-[#2FD97E]"><strong>Jo waqt pe utre:</strong> 2005 se freelancing, blogging, digital agencies. Aaj passive dollar income enjoy kar rahe hain.</p>
                <p className="text-red-400"><strong>Jo dekhte rahe:</strong> “Internet pe paisa? Scam hai.” — aaj unhi ke bachay kehte hain kash pehle seekha hota.</p>
                <div className="pt-2 text-xs font-bold text-red-400">Opportunity Window: BAND HO CHUKI</div>
              </div>
            )}

            {activeEra === "e3" && (
              <div>
                <p><strong>Kya hua:</strong> AI ne likhna, banana, samajhna, bechna — sab 10x fast kar diya. Ek banda 5-log ki team ka kaam karta hai.</p>
                <p className="text-[#2FD97E]"><strong>Jo waqt pe utre:</strong> AI tools se services de rahe hain — content, automation, design — $25–75/hr, ghar baithe, bina degree ke seedha dollar mein.</p>
                <p className="text-red-400"><strong>Jo dekhte rahe:</strong> “AI jobs kha jayegi.” — Haan, un logon ka kaam jo seekhna nahi chahte.</p>
                <div className="pt-2 text-xs font-bold text-[#2FD97E]">Opportunity Window: KHULI HAI (2–3 SAAL KA GOLDEN PERIOD)</div>
              </div>
            )}
          </div>

          {/* Group A vs Group B */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-red-500/5 border border-red-500/30 p-6 rounded-2xl space-y-3">
              <h3 className="text-lg font-black text-red-400 uppercase">Group A — Intezaar Walay</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                <li className="flex gap-2"><X size={16} className="text-red-400 shrink-0" /> “Yeh temporary hai, chal jayega.”</li>
                <li className="flex gap-2"><X size={16} className="text-red-400 shrink-0" /> “Mujhe nahi aata, baad mein dekhte hain.”</li>
                <li className="flex gap-2"><X size={16} className="text-red-400 shrink-0" /> “Scam lagta hai, koi aur karega.”</li>
              </ul>
              <div className="text-xs font-bold text-red-300 pt-2 border-t border-red-500/20">
                Nateeja: Har era ke baad wahi salary, wahi shikayat, wahi “kaash.”
              </div>
            </div>

            <div className="bg-[#2FD97E]/5 border border-[#2FD97E]/40 p-6 rounded-2xl space-y-3">
              <h3 className="text-lg font-black text-[#2FD97E] uppercase">Group B — Action Walay</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                <li className="flex gap-2"><Check size={16} className="text-[#2FD97E] shrink-0" /> Seekha — bina poora samjhe, thoda thoda.</li>
                <li className="flex gap-2"><Check size={16} className="text-[#2FD97E] shrink-0" /> Shuru kiya — chhota, imperfect, par shuru.</li>
                <li className="flex gap-2"><Check size={16} className="text-[#2FD97E] shrink-0" /> Waqt nikalne se pehle pakar liya.</li>
              </ul>
              <div className="text-xs font-bold text-[#2FD97E] pt-2 border-t border-[#2FD97E]/20">
                Nateeja: Computer aur Internet era ke jeetne wale — ab AI ke bhi yahi honge.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DOLLAR CALCULATOR */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-[#0B100C] border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[#2FD97E] text-xs font-black uppercase tracking-widest mb-2">Dollar Game</p>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase leading-tight">
              Aap ki mehnat ki qeemat dollar mein hai —<br />
              <span className="text-[#2FD97E]">tankhwah PKR mein.</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto mt-2">
              Aap ka client Karachi mein nahi — California mein hai. Us ka $100 aap ke liye Rs 27,800 hai.
            </p>
          </div>

          <div className="bg-[#111913] border border-white/10 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto shadow-2xl">
            <div className="flex justify-between items-baseline mb-4">
              <label className="text-xs font-black uppercase tracking-wider text-slate-300">Monthly Dollar Target</label>
              <span className="text-3xl sm:text-4xl font-black text-[#2FD97E] font-mono">${usdTarget.toLocaleString()} <span className="text-xs text-slate-400 font-sans">/mo</span></span>
            </div>

            <input 
              type="range" 
              min={500} 
              max={5000} 
              step={100} 
              value={usdTarget} 
              onChange={(e) => setUsdTarget(Number(e.target.value))} 
              className="w-full accent-[#2FD97E] cursor-pointer mb-6"
            />

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[#0B100C] border border-white/10 p-4 rounded-xl">
                <small className="block text-[11px] font-bold text-slate-400 uppercase">Monthly Income (PKR)</small>
                <b className="text-xl sm:text-2xl font-black text-white">Rs {pkrMonthly.toLocaleString()}</b>
              </div>
              <div className="bg-[#0B100C] border border-[#2FD97E]/30 p-4 rounded-xl">
                <small className="block text-[11px] font-bold text-[#2FD97E] uppercase">Yearly Income (PKR)</small>
                <b className="text-xl sm:text-2xl font-black text-[#2FD97E]">Rs {pkrYearly.toLocaleString()}</b>
              </div>
            </div>

            <div className="space-y-3 text-xs font-semibold text-slate-300">
              <div>
                <div className="flex justify-between mb-1"><span>Average Pakistani Salary</span><b>Rs 85,000/mo</b></div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-slate-500 w-[20%]" /></div>
              </div>
              <div>
                <div className="flex justify-between mb-1 text-[#2FD97E]"><span>Aap — AI Freelance Income</span><b>Rs {pkrMonthly.toLocaleString()}/mo</b></div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-[#2FD97E] w-[85%]" /></div>
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-4 text-center">
              $1 ≈ Rs 278 • Average salary se <strong>~{(pkrMonthly / 85000).toFixed(1)} guna zyada</strong>, bina office ke.
            </p>
          </div>
        </div>
      </section>

      {/* 5. PAIN CHECKLIST */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-[#0E1410] border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[#FFB020] text-xs font-black uppercase tracking-widest mb-2">Sach Ka Test</p>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase leading-tight">
              Chupke se khud se poocho —<br />
              <span className="text-[#FFB020]">in mein se kitne sach hain?</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">Tap karke select karein jo aap par lagta hai:</p>
          </div>

          <div className="flex flex-wrap gap-2.5 justify-center max-w-3xl mx-auto mb-8">
            {painPoints.map((text, idx) => {
              const isSelected = selectedPains.includes(idx);
              return (
                <button
                  key={idx}
                  onClick={() => togglePain(idx)}
                  className={`py-3 px-4 rounded-full text-xs sm:text-sm font-semibold border transition-all text-left flex items-center gap-2 ${
                    isSelected 
                      ? "bg-red-500/20 text-white border-red-500 shadow-md shadow-red-950/50" 
                      : "bg-[#111913] text-slate-400 border-white/10 hover:border-white/30"
                  }`}
                >
                  <X size={14} className={isSelected ? "text-red-400 opacity-100" : "opacity-0"} />
                  <span>{text}</span>
                </button>
              );
            })}
          </div>

          {selectedPains.length > 0 && (
            <div className="max-w-2xl mx-auto bg-[#111913] border border-[#2FD97E]/40 p-6 rounded-2xl text-center space-y-3">
              <b className="text-lg font-black text-[#2FD97E] uppercase block">
                {selectedPains.length}/8 Sach — Aap is page pe isi liye aaye hain!
              </b>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Yeh workshop isi liye banaya gaya hai: zero se, raat 8 baje, 30-din ka roadmap. 2 ghante lagao aur agle 6 mahine ki tension khatam karo.
              </p>
              <button onClick={openPayModal} className="bg-[#2FD97E] hover:bg-[#52E897] text-[#04220F] font-black text-sm py-3 px-6 rounded-xl shadow-lg">
                Seat Book Karo →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 6. WORKSHOP AGENDA */}
      <section id="agenda" className="py-16 md:py-24 px-4 md:px-6 bg-[#0B100C] border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[#2FD97E] text-xs font-black uppercase tracking-widest mb-2">Raat Ka Plan</p>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase leading-tight">
              8 baje se 10 baje —<br /><span className="text-[#2FD97E]">har minute ka hisaab.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#111913] border border-white/10 p-6 rounded-2xl space-y-2">
              <span className="text-xs font-mono font-bold text-[#2FD97E]">8:00 PM — 8:20 PM</span>
              <h3 className="text-base font-bold text-white">Mindset Reset & Digital Zameen Formula</h3>
              <p className="text-xs text-slate-300">Group A vs Group B analysis aur aap kahan se pehla qadam uthayenge.</p>
            </div>
            <div className="bg-[#111913] border border-white/10 p-6 rounded-2xl space-y-2">
              <span className="text-xs font-mono font-bold text-[#2FD97E]">8:20 PM — 9:00 PM</span>
              <h3 className="text-base font-bold text-white">5 Live AI Tools Demo</h3>
              <p className="text-xs text-slate-300">Zero se screen share karke tools run karke dikhaye jayenge.</p>
            </div>
            <div className="bg-[#111913] border border-white/10 p-6 rounded-2xl space-y-2">
              <span className="text-xs font-mono font-bold text-[#2FD97E]">9:00 PM — 9:40 PM</span>
              <h3 className="text-base font-bold text-white">Pehla Dollar & Offer Formula</h3>
              <p className="text-xs text-slate-300">Ek service, ek price, ek script jo aap kal subah se bech sakte hain.</p>
            </div>
            <div className="bg-[#111913] border border-white/10 p-6 rounded-2xl space-y-2">
              <span className="text-xs font-mono font-bold text-[#2FD97E]">9:40 PM — 10:00 PM</span>
              <h3 className="text-base font-bold text-white">30-Din Roadmap & Live Q&A</h3>
              <p className="text-xs text-slate-300">Har student ke sawaal ka live detailed jawab diya jayega.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. VALUE STACK & BONUSES */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-[#0E1410] border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[#FFB020] text-xs font-black uppercase tracking-widest mb-2">Poora Hisaab</p>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase leading-tight">
              Alag alag kharidne pe <span className="text-[#FFB020]">Rs 13,000+ ka maal.</span>
            </h2>
          </div>

          <div className="bg-[#111913] border border-white/10 rounded-2xl max-w-xl mx-auto overflow-hidden shadow-2xl">
            <div className="bg-white/5 p-4 text-xs font-bold uppercase tracking-wider text-[#FFB020] border-b border-white/10">
              Value Stack — Sab Kuch Included
            </div>
            <div className="p-6 space-y-3 text-xs sm:text-sm divide-y divide-white/5">
              <div className="flex justify-between pt-2"><span>Live 2-hour AI workshop (Q&A ke saath)</span><b>Rs 4,999</b></div>
              <div className="flex justify-between pt-2"><span>AI Tools Starter Kit (tools + prompts)</span><b>Rs 2,999</b></div>
              <div className="flex justify-between pt-2"><span>First-Client Script (word by word)</span><b>Rs 1,999</b></div>
              <div className="flex justify-between pt-2"><span>30-Din Roadmap PDF</span><b>Rs 1,499</b></div>
              <div className="flex justify-between pt-2"><span>Community lifetime access</span><b>Rs 999</b></div>
              <div className="flex justify-between pt-2"><span>Bonus: 30-din support — sawaalon ke jawab</span><b>Rs 1,999</b></div>
              <div className="flex justify-between pt-4 border-t-2 border-white/20 text-base font-bold"><span>Total Value:</span><b className="text-[#FFB020]">Rs 13,494</b></div>
            </div>

            <div className="p-6 bg-[#0B100C] border-t border-white/10 text-center space-y-4">
              <div className="flex items-center justify-center gap-4">
                <span className="text-4xl sm:text-5xl font-black text-[#2FD97E] font-mono">Rs 2,999</span>
                <span className="text-slate-500 line-through text-lg font-bold">Rs 13,494</span>
                <span className="bg-[#FFB020]/20 text-[#FFB020] border border-[#FFB020]/40 text-xs font-black px-2.5 py-1 rounded-full">77% OFF</span>
              </div>

              <button 
                onClick={openPayModal}
                className="w-full bg-[#2FD97E] hover:bg-[#52E897] text-[#04220F] font-black text-lg py-5 px-6 rounded-xl shadow-xl shadow-[#2FD97E]/20 transition-all active:scale-98"
              >
                Rs 2,999 — Seat Book Karo →
              </button>

              <div className="p-3 bg-green-950/40 border border-[#2FD97E]/30 rounded-xl flex items-center justify-center gap-2 text-xs text-green-300 font-bold">
                <ShieldCheck size={16} className="text-[#2FD97E] shrink-0" />
                <span>Zero-Risk Guarantee: Attend workshop, if not useful get 100% full refund!</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-[#0B100C] border-b border-white/10">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <p className="text-[#2FD97E] text-xs font-black uppercase tracking-widest mb-2">Results — Unhi Ke Lafz Mein</p>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase">Pehle yeh log bhi Group A mein the</h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {[...TESTIMONIALS_1, ...TESTIMONIALS_2].slice(0, 4).map((t, idx) => (
            <div key={idx} className="bg-[#111913] border border-white/10 p-5 rounded-xl space-y-3 flex flex-col justify-between">
              <div>
                <div className="text-[#FFB020] text-xs tracking-widest mb-2">★★★★★</div>
                <p className="text-xs text-slate-300 italic leading-relaxed">“{t.q}”</p>
              </div>
              <div className="text-[11px] font-bold text-slate-400 border-t border-white/5 pt-2">
                <span className="text-[#2FD97E]">{t.name}</span> • {t.city}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-[#0E1410] border-b border-white/10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase">Seedha jawab, chhupa hua nahi</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-[#111913] border border-white/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex justify-between items-center text-sm font-bold text-white hover:bg-white/5 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown size={18} className={`transition-transform duration-300 text-[#2FD97E] ${openFaqIdx === idx ? "rotate-180" : ""}`} />
                </button>
                {openFaqIdx === idx && (
                  <div className="p-4 sm:p-5 border-t border-white/10 text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className="py-20 md:py-28 px-4 md:px-6 bg-[#0B100C] text-center border-b border-white/10">
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-[#2FD97E] text-xs font-black uppercase tracking-widest">Aakhri Baar</p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase leading-tight">
            10 saal baad aap ka bacha poochega:<br />
            <span className="text-[#2FD97E]">“Papa, jab AI aa raha tha — aap kahan the?”</span>
          </h2>
          <div className="text-4xl sm:text-6xl font-black text-[#FFB020] font-mono">{timeLeft}</div>
          <p className="text-xs uppercase tracking-widest text-slate-400">Doors band hone mein baaki</p>
          <div className="pt-4">
            <button 
              onClick={openPayModal}
              className="bg-[#2FD97E] hover:bg-[#52E897] text-[#04220F] font-black text-base sm:text-lg py-5 px-10 rounded-2xl shadow-2xl transition-all"
            >
              Haan — Mera Seat Book Karo →
            </button>
          </div>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="py-12 px-4 bg-[#040805] text-center text-slate-500 text-xs">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="font-bold text-white text-base">Digital Zameen — AI Skills Workshop</div>
          <div className="flex justify-center gap-6 text-slate-400 pt-2">
            <button type="button" onClick={() => setPolicyModal("refund")} className="hover:text-white underline">Refund Policy</button>
            <button type="button" onClick={() => setPolicyModal("privacy")} className="hover:text-white underline">Privacy</button>
            <a href={`https://wa.me/${TEAM_WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="hover:text-white underline">WhatsApp Support (+92 329 6158206)</a>
          </div>
          <p className="text-[11px] text-slate-600 pt-3">
            Disclaimer: Results vary based on execution. © 2026 YouTube Empire Builders — Abrar Nadir
          </p>
        </div>
      </footer>

      {/* 12. FLOATING MOBILE CTA */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 bg-[#0B100C] border-t border-white/15 p-3 flex items-center justify-between gap-3 shadow-2xl transition-transform duration-300 md:hidden ${floatingVisible ? "translate-y-0" : "translate-y-28"}`}>
        <div className="pl-2">
          <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Fee Today</div>
          <div className="font-black text-lg text-[#2FD97E] leading-tight">Rs 2,999</div>
        </div>
        <button 
          onClick={openPayModal}
          className="bg-[#2FD97E] hover:bg-[#52E897] text-[#04220F] font-black text-sm py-3 px-5 rounded-xl shadow-lg active:scale-95"
        >
          Seat Book Karo ✓
        </button>
      </div>

      {/* 13. ALL-IN-ONE REGISTRATION & PAYMENT POPUP */}
      {payModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-[#111913] text-white w-full max-w-xl rounded-t-3xl sm:rounded-3xl border-t-4 sm:border-2 border-[#2FD97E] shadow-2xl max-h-[94vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom sm:zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="bg-[#0B100C] p-4 sm:p-5 flex items-center justify-between border-b border-white/10 shrink-0">
              <div>
                <div className="text-[11px] font-mono text-[#2FD97E] font-bold uppercase tracking-wider">Digital Zameen Workshop</div>
                <h3 className="text-base sm:text-lg font-bold text-white">{modalStep === 1 ? "Complete Registration & Payment" : "Verification in Progress"}</h3>
              </div>
              <button 
                onClick={closePayModal}
                className="w-8 h-8 rounded-full bg-white/10 text-slate-300 hover:text-white hover:bg-red-600 flex items-center justify-center font-bold text-lg transition-colors"
              >
                &times;
              </button>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 text-slate-200 space-y-4">
              {modalStep === 1 ? (
                <form onSubmit={handleSubmitProof} className="space-y-4">
                  
                  {/* FOMO Live Seat Fill Bar */}
                  <div className="bg-[#0B100C] border border-[#FFB020]/40 rounded-xl p-3 text-xs">
                    <div className="flex justify-between font-bold text-[#FFB020] mb-1.5">
                      <span className="flex items-center gap-1"><Flame size={14} className="text-red-500" /> Batch Filling Fast: 78/100 Seats</span>
                      <span className="text-red-400 font-mono">22 Left!</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-[#FFB020] to-red-500 h-full w-[78%]" />
                    </div>
                  </div>

                  {/* FREE Bonuses List inside Modal */}
                  <div className="bg-[#0B100C] border border-[#2FD97E]/30 rounded-xl p-3.5 space-y-2">
                    <div className="text-xs font-bold text-[#2FD97E] flex items-center gap-1.5">
                      <Gift size={14} /> Included Free (Total Value: Rs 13,494):
                    </div>
                    <div className="grid grid-cols-1 gap-1 text-[11px] text-slate-300">
                      <div className="flex justify-between"><span>🤖 AI Tools Starter Kit (tools + prompts)</span><span className="text-[#2FD97E] font-bold">FREE (Rs 2,999)</span></div>
                      <div className="flex justify-between"><span>📝 First-Client Script (word by word)</span><span className="text-[#2FD97E] font-bold">FREE (Rs 1,999)</span></div>
                      <div className="flex justify-between"><span>📅 30-Din Roadmap PDF</span><span className="text-[#2FD97E] font-bold">FREE (Rs 1,499)</span></div>
                      <div className="flex justify-between"><span>💬 Private Community Access</span><span className="text-[#2FD97E] font-bold">FREE (Rs 999)</span></div>
                      <div className="flex justify-between"><span>📹 Workshop Recording (48 Hours)</span><span className="text-[#2FD97E] font-bold">FREE (Rs 1,999)</span></div>
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1.5">Poora Naam (Full Name) *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Muhammad Ahmed" 
                      value={fullName} 
                      onChange={(e) => setFullName(e.target.value)} 
                      required 
                      className="w-full p-3.5 border border-white/15 rounded-xl text-sm bg-[#0B100C] text-white placeholder-slate-500 focus:border-[#2FD97E] outline-none"
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
                      className="w-full p-3.5 border border-white/15 rounded-xl text-sm bg-[#0B100C] text-white placeholder-slate-500 focus:border-[#2FD97E] outline-none"
                    />
                  </div>

                  {/* Email Optional */}
                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1.5">Email <span className="text-slate-400 font-normal">(Optional)</span></label>
                    <input 
                      type="email" 
                      placeholder="aap@email.com" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className="w-full p-3.5 border border-white/15 rounded-xl text-sm bg-[#0B100C] text-white placeholder-slate-500 focus:border-[#2FD97E] outline-none"
                    />
                  </div>

                  {/* Payment Tabs */}
                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-2">Select Payment Method (Fee: Rs 2,999)</label>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("Meezan Bank")}
                        className={`py-2.5 px-2 text-xs font-bold rounded-xl border transition-all text-center ${
                          paymentMethod === "Meezan Bank" ? "bg-[#2FD97E] text-[#04220F] border-[#2FD97E] shadow-md" : "bg-[#0B100C] text-slate-400 border-white/15"
                        }`}
                      >
                        🏦 Meezan Bank
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("Easypaisa")}
                        className={`py-2.5 px-2 text-xs font-bold rounded-xl border transition-all text-center ${
                          paymentMethod === "Easypaisa" ? "bg-[#2FD97E] text-[#04220F] border-[#2FD97E] shadow-md" : "bg-[#0B100C] text-slate-400 border-white/15"
                        }`}
                      >
                        📱 Easypaisa
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("Binance")}
                        className={`py-2.5 px-2 text-xs font-bold rounded-xl border transition-all text-center ${
                          paymentMethod === "Binance" ? "bg-[#2FD97E] text-[#04220F] border-[#2FD97E] shadow-md" : "bg-[#0B100C] text-slate-400 border-white/15"
                        }`}
                      >
                        🟡 Binance UID
                      </button>
                    </div>

                    {/* Bank Details Card */}
                    <div className="bg-[#0B100C] border border-white/15 p-4 rounded-xl space-y-2.5 text-xs">
                      {paymentMethod === "Meezan Bank" && (
                        <div>
                          <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                            <span className="text-slate-400 font-medium">Bank Name:</span>
                            <span className="font-bold text-white">Meezan Bank Limited</span>
                          </div>
                          <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                            <span className="text-slate-400 font-medium">Account Title:</span>
                            <span className="font-bold text-white flex items-center gap-2">
                              Muhammad Abrar
                              <button type="button" onClick={() => copyToClipboard("Muhammad Abrar", "m_title")} className="bg-white/10 hover:bg-white/20 text-slate-200 text-[11px] px-2 py-0.5 rounded font-bold">
                                {copiedKey === "m_title" ? "Copied ✓" : "Copy"}
                              </button>
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                            <span className="text-slate-400 font-medium">Account Number:</span>
                            <span className="font-mono font-bold text-white flex items-center gap-2">
                              02370103321036
                              <button type="button" onClick={() => copyToClipboard("02370103321036", "m_acc")} className="bg-white/10 hover:bg-white/20 text-slate-200 text-[11px] px-2 py-0.5 rounded font-bold">
                                {copiedKey === "m_acc" ? "Copied ✓" : "Copy"}
                              </button>
                            </span>
                          </div>
                          <div className="flex justify-between items-center pt-1.5">
                            <span className="text-slate-400 font-medium">IBAN:</span>
                            <span className="font-mono font-bold text-white flex items-center gap-2">
                              PK39MEZN0002370103321036
                              <button type="button" onClick={() => copyToClipboard("PK39MEZN0002370103321036", "m_iban")} className="bg-white/10 hover:bg-white/20 text-slate-200 text-[11px] px-2 py-0.5 rounded font-bold">
                                {copiedKey === "m_iban" ? "Copied ✓" : "Copy"}
                              </button>
                            </span>
                          </div>
                        </div>
                      )}

                      {paymentMethod === "Easypaisa" && (
                        <div>
                          <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                            <span className="text-slate-400 font-medium">Easypaisa Number:</span>
                            <span className="font-mono font-bold text-white flex items-center gap-2">
                              03274532186
                              <button type="button" onClick={() => copyToClipboard("03274532186", "ep_num")} className="bg-white/10 hover:bg-white/20 text-slate-200 text-[11px] px-2 py-0.5 rounded font-bold">
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
                          <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                            <span className="text-slate-400 font-medium">Binance ID / UID:</span>
                            <span className="font-mono font-bold text-white flex items-center gap-2">
                              117971802
                              <button type="button" onClick={() => copyToClipboard("117971802", "b_uid")} className="bg-white/10 hover:bg-white/20 text-slate-200 text-[11px] px-2 py-0.5 rounded font-bold">
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
                      className="w-full p-3.5 border border-white/15 rounded-xl text-sm bg-[#0B100C] text-white placeholder-slate-500 focus:border-[#2FD97E] outline-none"
                    />
                  </div>

                  {/* Screenshot Upload */}
                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1.5">Attach Payment Screenshot *</label>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-white/20 hover:border-[#2FD97E] bg-[#0B100C] p-4 rounded-xl text-center cursor-pointer transition-colors"
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
                          <span className="inline-block bg-[#2FD97E]/20 text-[#2FD97E] text-xs font-bold px-3 py-1 rounded-full border border-[#2FD97E]/30">
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
                    className="w-full bg-[#2FD97E] hover:bg-[#52E897] text-[#04220F] font-black text-base py-4 rounded-xl shadow-xl transition-all active:scale-98 disabled:opacity-70"
                  >
                    {isSubmitting ? "Processing..." : "Verify Payment on WhatsApp →"}
                  </button>

                  <div className="p-2.5 bg-green-950/30 border border-[#2FD97E]/30 rounded-xl text-center text-xs text-green-300 font-bold flex items-center justify-center gap-1.5">
                    <ShieldCheck size={15} className="text-[#2FD97E] shrink-0" />
                    <span>🛡️ Zero-Risk Guarantee: After workshop, full refund if you don&apos;t see value!</span>
                  </div>
                </form>
              ) : (
                /* STEP 2: 10-SECOND COUNTDOWN SCREEN */
                <div className="text-center py-6 px-2 space-y-4">
                  <div className="inline-block bg-[#2FD97E]/20 text-[#2FD97E] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-[#2FD97E]/30">
                    ⏳ Verification Desk
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Thank You, {fullName.trim()}!
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Aap ki details aur payment receipt receive ho chuki hain. Hamari senior verification team aapki payment verify karke direct confirmed Zoom link aur WhatsApp group access provide karegi.
                  </p>

                  <div className="w-16 h-16 rounded-full bg-[#2FD97E]/10 border-4 border-[#2FD97E] text-[#2FD97E] text-2xl font-black flex items-center justify-center mx-auto shadow-lg animate-pulse">
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
          <div className="bg-[#111913] border border-white/10 text-white rounded-2xl p-6 max-w-lg w-full relative max-h-[80vh] overflow-y-auto">
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
                <p>We respect your privacy. Your contact details and payment proof are collected exclusively for registration confirmation, Zoom link delivery, and 30-day roadmap support.</p>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
