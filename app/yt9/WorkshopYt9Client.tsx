"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Check, X, Play, ShieldCheck, 
  ArrowRight, Users, DollarSign, 
  Zap, ChevronDown, 
  TrendingUp, Home, Lock, AlertTriangle,
  MessageSquare, Monitor,
  GraduationCap, Briefcase, Heart, Smile, Gift, Flame, Clock, Calendar, Globe, Radio, Sparkles, Activity,
  Layers, BarChart3, Cpu, RefreshCw, Eye, Award, ExternalLink
} from "lucide-react";

const TEAM_WHATSAPP_NUMBER = "923296158206";

interface NicheAsset {
  id: string;
  name: string;
  category: string;
  rpm: string;
  tier1Audience: string;
  monthlyRevenue: string;
  monthlyPkr: string;
  views48h: string;
  difficulty: string;
  color: string;
  accent: string;
  graphPoints: number[];
  recentPayout: string;
  tags: string[];
}

const ASSET_NICHES: NicheAsset[] = [
  {
    id: "tech-ai",
    name: "AI & Tech Automation",
    category: "High-Growth High-RPM",
    rpm: "$24.80",
    tier1Audience: "91% (US / UK / CA)",
    monthlyRevenue: "$3,450",
    monthlyPkr: "PKR 959,100",
    views48h: "248,500 views",
    difficulty: "Zero-Camera / AI Driven",
    color: "#2FD97E",
    accent: "rgba(47,217,126,0.15)",
    graphPoints: [20, 35, 28, 45, 60, 52, 75, 88, 95, 110, 130, 148],
    recentPayout: "Google LLC → Wire Received: PKR 959,100 (Direct Bank)",
    tags: ["No Face", "ChatGPT 4o Scripted", "ElevenLabs Voice", "US CPM"]
  },
  {
    id: "finance-luxury",
    name: "Global Finance & Luxury Economy",
    category: "Highest Dollar Yield",
    rpm: "$38.50",
    tier1Audience: "94% (US / Western EU)",
    monthlyRevenue: "$4,890",
    monthlyPkr: "PKR 1,359,420",
    views48h: "185,200 views",
    difficulty: "Documentary Style",
    color: "#FFB020",
    accent: "rgba(255,176,32,0.15)",
    graphPoints: [30, 42, 50, 48, 70, 85, 80, 105, 120, 140, 165, 190],
    recentPayout: "AdSense Wire → Confirmed: PKR 1,359,420 (Export Code 9182)",
    tags: ["High Ad Demand", "Wall Street Traffic", "Zero Filming", "Compounding"]
  },
  {
    id: "faceless-history",
    name: "Faceless Geopolitics & Untold History",
    category: "Maximum Viral Potential",
    rpm: "$19.20",
    tier1Audience: "86% (Global Tier-1)",
    monthlyRevenue: "$2,640",
    monthlyPkr: "PKR 733,920",
    views48h: "420,000 views",
    difficulty: "AI Archive Montage",
    color: "#38BDF8",
    accent: "rgba(56,189,248,0.15)",
    graphPoints: [15, 25, 40, 35, 55, 70, 95, 85, 115, 145, 180, 220],
    recentPayout: "Google Ireland → Wire Received: PKR 733,920 (State Bank Reg.)",
    tags: ["Evergreen Views", "Global Audience", "B-Roll Workflow", "Passive Royalty"]
  },
  {
    id: "science-psychology",
    name: "Cognitive Science & Deep Space",
    category: "Evergreen Authority",
    rpm: "$22.40",
    tier1Audience: "89% (US / Germany / UK)",
    monthlyRevenue: "$3,120",
    monthlyPkr: "PKR 867,360",
    views48h: "310,400 views",
    difficulty: "AI Visual Synthesized",
    color: "#A855F7",
    accent: "rgba(168,85,247,0.15)",
    graphPoints: [25, 30, 45, 50, 65, 60, 80, 100, 110, 135, 150, 175],
    recentPayout: "AdSense Wire → Confirmed: PKR 867,360 (Direct Payout)",
    tags: ["Zero Competition", "Stock Footage Free", "10-Min Retention", "Scale Ready"]
  }
];

const RECENT_ALERTS = [
  { time: "Just now", city: "Lahore", text: "Claimed Niche: AI Tech Automation (Plot #78 locked)" },
  { time: "2m ago", city: "Karachi", text: "Wire Confirmed: $3,450 AdSense payout to Meezan Bank" },
  { time: "5m ago", city: "Islamabad", text: "Automated Workflow: 48h view velocity reached 180K" },
  { time: "9m ago", city: "Faisalabad", text: "Reserved Seat: Digital Zameen Batch 9 (Only 22 Left)" },
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

  // Interactive Empire Asset Terminal State
  const [selectedNiche, setSelectedNiche] = useState<NicheAsset>(ASSET_NICHES[0]);
  const [liveTickerDollar, setLiveTickerDollar] = useState<number>(3450.75);
  const [liveViews, setLiveViews] = useState<number>(248500);
  const [alertIndex, setAlertIndex] = useState<number>(0);

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

  // Live Real-Time Terminal Simulation
  useEffect(() => {
    const ticker = setInterval(() => {
      setLiveTickerDollar((prev) => +(prev + (Math.random() * 0.45 + 0.15)).toFixed(2));
      setLiveViews((prev) => prev + Math.floor(Math.random() * 14 + 3));
    }, 1800);

    const alertInterval = setInterval(() => {
      setAlertIndex((prev) => (prev + 1) % RECENT_ALERTS.length);
    }, 4000);

    return () => {
      clearInterval(ticker);
      clearInterval(alertInterval);
    };
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

      if (typeof (window as any).fbq === "function") {
        (window as any).fbq("track", "CompleteRegistration", {
          value: 2999,
          currency: "PKR",
          content_name: "Digital Zameen Workshop 9",
        });
      }

      setIsSubmitting(false);
      setModalStep(2);
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
    "Monday subah career ki ghutan aur fixed local salary ceiling",
    "Pakistani rupee devaluation ke against koi dollar safety-net nahi",
    "Skills 3 saal purani hain — AI replacement ka rozana dar",
    "Ghar walon ko woh lifestyle nahi de pa rahe jo deserve karte hain",
    "Side income shuru karni hai par zero camera / technical experience hai",
    "YouTube par random tutorials dekh kar confused aur overwhelmed hain",
    "Authentic step-by-step mentor blueprint ki talash hai",
  ];

  const faqs = [
    {
      q: "Bilkul zero technical background se start kiya ja sakta hai?",
      a: "Haan — is masterclass ka primary design hi zero-camera aur zero-coding beginners ke liye engineered hai. AI engines ki madad se scripting, voiceovers aur high-retention visual editing ka pura workflow live screen par live execute karke dikhaya jata hai.",
    },
    {
      q: "Workshop ki recording aur study resources provide kiye jayenge?",
      a: "Haan, 48 ghante tak full HD masterclass recording access, 30-Day Step-by-Step Execution PDF, aur verified High-RPM Niche Blueprints aapko deliver kiye jayenge.",
    },
    {
      q: "Full-time job ya university ke saath rozana kitna time required hai?",
      a: "Daily sirf 1 se 1.5 ghanta focused practice. Session ka time raat 8:00 PM se 10:00 PM isiliye rakha gaya hai taake aap dinner aur family commitments ke baad peacefully attend kar sakein.",
    },
    {
      q: "Pakistani banks mein dollar payouts kaise legal aur tax-free aate hain?",
      a: "Google AdSense official export code (Code 9182 / Computer Software & Export Services) ke through direct Pakistani commercial banks (Meezan, HBL, UBL, etc.) ya Payoneer mein legally 0% to reduced export tax rates par direct PKR conversion ke sath transfer karta hai.",
    },
    {
      q: "Instruction medium kya hoga?",
      a: "Roman Urdu aur crystal-clear practical English terms ka seamless mix — taake har concept effortlessly samajh aaye.",
    },
    {
      q: "Payment options aur confirmation flow kya hai?",
      a: "Meezan Bank Limited, Easypaisa aur Binance (USDT) options available hain. Proof submit karte hi 10-second verification desk ke baad automatic direct WhatsApp support access unlock hota hai.",
    },
  ];

  // Generate SVG Path for Sparkline Graph
  const generateGraphPath = (points: number[], width = 360, height = 90) => {
    const max = Math.max(...points);
    const min = Math.min(...points);
    const range = max - min || 1;
    const stepX = width / (points.length - 1);
    
    return points.map((p, i) => {
      const x = i * stepX;
      const y = height - ((p - min) / range) * (height - 18) - 9;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(" ");
  };

  const generateAreaPath = (points: number[], width = 360, height = 90) => {
    const line = generateGraphPath(points, width, height);
    return `${line} L ${width} ${height} L 0 ${height} Z`;
  };

  return (
    <div className="min-h-screen bg-[#0B100C] text-slate-100 font-sans pb-24 md:pb-0 overflow-x-hidden selection:bg-[#2FD97E] selection:text-[#04220F]">
      
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="sticky top-0 z-40 bg-gradient-to-r from-[#FFB020] via-[#FFA000] to-[#FFB020] text-[#2A1B00] text-center py-2 px-4 text-xs font-black uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 flex-wrap border-b border-black/10">
        <span className="flex items-center gap-1.5 font-extrabold">
          <Sparkles size={14} className="animate-spin text-red-950" /> Next Batch: <b>{isAfterSeven ? "Kal Raat 8:00 PM PKT" : "Aaj Raat 8:00 PM PKT"}</b>
        </span>
        <span className="opacity-40">•</span>
        <span>Registration Cutoff: <b className="font-mono">{timeLeft}</b></span>
        <span className="opacity-40">•</span>
        <span className="bg-red-950/15 px-2 py-0.5 rounded-md font-black">Sirf 22 Seats Remaining</span>
      </div>

      {/* 2. HERO SECTION — WORLD-CLASS 10/10 YOUTUBE EMPIRE COMMAND TERMINAL */}
      <header className="pt-10 md:pt-16 pb-16 px-4 md:px-6 max-w-7xl mx-auto border-b border-white/10 relative">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Premium Persuasive Copy */}
          <div className="lg:col-span-6 text-left space-y-5">
            
            <div className="inline-flex items-center gap-2 border border-[#2FD97E]/40 bg-[#2FD97E]/10 text-[#2FD97E] px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase shadow-inner">
              <span className="w-2 h-2 rounded-full bg-[#2FD97E] animate-pulse" />
              <span>Executive Masterclass • 8:00 PM PKT • 100 Seats Limit</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] uppercase tracking-tight">
              Baap Ne Zameen Di.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2FD97E] via-[#74F4B1] to-[#2FD97E] drop-shadow-[0_0_35px_rgba(47,217,126,0.4)]">
                Aap Digital Zameen Do.
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
              Pichli generation ne physical plots pakre the — <strong className="text-white">us waqt saste the, aaj unhi se khandani izzat hai.</strong> Aaj hamari generation ki sabse badi digital zameen <strong>Global YouTube Automated Assets</strong> hain. Zero camera, 100% US/UK dollar yields.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button 
                onClick={openPayModal}
                className="bg-gradient-to-r from-[#2FD97E] to-[#27BD6D] hover:from-[#52E897] hover:to-[#2FD97E] text-[#04220F] font-black text-base py-4 px-8 rounded-xl shadow-2xl shadow-[#2FD97E]/30 transition-all transform active:scale-95 flex items-center justify-center gap-2 border border-[#74F4B1]/40"
              >
                <span>Mera Seat Lock Karo</span>
                <ArrowRight size={18} />
              </button>
              <a 
                href="#agenda"
                className="bg-[#111913] hover:bg-[#18241b] border border-white/20 hover:border-[#2FD97E] text-white hover:text-[#2FD97E] font-bold text-base py-4 px-6 rounded-xl transition-all text-center"
              >
                Curriculum Dekho
              </a>
            </div>

            {/* Micro Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-2 border border-white/10 bg-white/5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300">
                <Clock size={14} className="text-[#2FD97E]" /> Live Broadcast: {isAfterSeven ? "Kal Raat 8 PM" : "Aaj Raat 8 PM"} (<span className="text-[#FFB020] font-mono font-bold">{timeLeft}</span>)
              </span>
              <span className="inline-flex items-center gap-2 border border-[#FFB020]/30 bg-[#FFB020]/10 px-3 py-1.5 rounded-lg text-xs font-bold text-[#FFB020]">
                <Users size={14} /> 78/100 Seats Filled
              </span>
            </div>

            <div className="flex gap-6 text-xs text-slate-400 font-semibold pt-1 border-t border-white/10">
              <span className="flex items-center gap-1.5"><ShieldCheck size={15} className="text-[#2FD97E]" /> <b>4.9/5</b> Verified Rating</span>
              <span><b>12,000+</b> Alumni Trained</span>
              <span>100% Full Refund Guarantee</span>
            </div>
          </div>

          {/* Right Column: 10/10 SILICON VALLEY STYLE YOUTUBE EMPIRE COMMAND HUD */}
          <div className="lg:col-span-6">
            <div className="bg-gradient-to-b from-[#111913] via-[#0D140F] to-[#070B08] border-2 border-[#2FD97E]/40 rounded-3xl p-5 sm:p-6 shadow-[0_0_50px_rgba(47,217,126,0.15)] relative overflow-hidden backdrop-blur-xl">
              
              {/* Glowing Background Grid Flare */}
              <div className="absolute -right-16 -top-16 w-48 h-48 bg-[#2FD97E]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-[#FFB020]/10 rounded-full blur-3xl pointer-events-none" />

              {/* HUD Header */}
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80 border border-green-400" />
                  <span className="text-[11px] font-mono font-bold text-slate-400 ml-2">YOUTUBE_EMPIRE_STUDIO // v4.8</span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-black text-[#2FD97E] bg-[#2FD97E]/15 border border-[#2FD97E]/40 px-2.5 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-[#2FD97E] animate-ping" /> GLOBAL ALGORITHM ACTIVE
                </span>
              </div>

              {/* Interactive Niche Selector Pill Carousel */}
              <div className="pt-3 pb-2">
                <div className="text-[10px] font-mono text-slate-400 uppercase font-bold mb-2 flex justify-between">
                  <span>⚡ Select High-RPM Digital Asset Model:</span>
                  <span className="text-[#2FD97E] font-bold">Interactive Simulator</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {ASSET_NICHES.map((niche) => {
                    const isSelected = selectedNiche.id === niche.id;
                    return (
                      <button
                        key={niche.id}
                        type="button"
                        onClick={() => setSelectedNiche(niche)}
                        className={`p-2 rounded-xl text-left border transition-all text-xs flex flex-col justify-between ${
                          isSelected
                            ? "border-[#2FD97E] bg-[#2FD97E]/15 shadow-md shadow-[#2FD97E]/20"
                            : "border-white/10 bg-[#0B100C]/70 text-slate-400 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        <span className="font-bold text-[11px] line-clamp-1" style={{ color: isSelected ? niche.color : undefined }}>
                          {niche.name.split(" ")[0]} {niche.name.split(" ")[1]}
                        </span>
                        <span className="font-mono text-[10px] font-bold text-white mt-1">
                          {niche.monthlyRevenue}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Central Real-Time Studio Dashboard Card */}
              <div className="bg-[#080D09] border border-white/10 rounded-2xl p-4 sm:p-5 mt-2 space-y-4 shadow-inner">
                
                {/* Channel Asset Title & Live Revenue */}
                <div className="flex justify-between items-start gap-2 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedNiche.color }} />
                      <h3 className="text-base sm:text-lg font-black text-white">{selectedNiche.name}</h3>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{selectedNiche.category} • {selectedNiche.difficulty}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Est. Monthly Inflow</div>
                    <div className="text-xl sm:text-2xl font-black font-mono" style={{ color: selectedNiche.color }}>
                      {selectedNiche.monthlyRevenue} <span className="text-xs text-slate-400 font-sans">/mo</span>
                    </div>
                    <div className="text-[11px] font-bold text-[#FFB020]">≈ {selectedNiche.monthlyPkr}</div>
                  </div>
                </div>

                {/* Real-time Visual Waveform / 48H Curve */}
                <div className="bg-[#050805] border border-white/5 rounded-xl p-3 relative overflow-hidden">
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mb-1.5">
                    <span className="flex items-center gap-1"><Eye size={12} className="text-[#2FD97E]" /> 48-Hour Velocity: <b className="text-white">{selectedNiche.views48h}</b></span>
                    <span className="text-[#2FD97E] font-bold">RPM: {selectedNiche.rpm}</span>
                  </div>

                  {/* SVG Chart */}
                  <div className="w-full h-20 relative">
                    <svg viewBox="0 0 360 90" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id={`grad-${selectedNiche.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={selectedNiche.color} stopOpacity="0.4" />
                          <stop offset="100%" stopColor={selectedNiche.color} stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path
                        d={generateAreaPath(selectedNiche.graphPoints, 360, 90)}
                        fill={`url(#grad-${selectedNiche.id})`}
                      />
                      <path
                        d={generateGraphPath(selectedNiche.graphPoints, 360, 90)}
                        fill="none"
                        stroke={selectedNiche.color}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  <div className="flex justify-between items-center text-[9px] font-mono text-slate-500 mt-1 border-t border-white/5 pt-1">
                    <span>Day 1 (AI Seed)</span>
                    <span>Day 15 (Algorithm Pick)</span>
                    <span className="text-[#2FD97E]">Day 30 (Monetized Cashflow)</span>
                  </div>
                </div>

                {/* Key Metric Tags */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                  <div className="bg-[#0B100C] border border-white/10 p-2 rounded-lg">
                    <span className="block text-[9px] font-mono text-slate-400 uppercase">Tier-1 Audience</span>
                    <b className="text-white text-[11px]">{selectedNiche.tier1Audience}</b>
                  </div>
                  <div className="bg-[#0B100C] border border-white/10 p-2 rounded-lg">
                    <span className="block text-[9px] font-mono text-slate-400 uppercase">Camera Needed</span>
                    <b className="text-[#2FD97E] text-[11px]">0% (Faceless)</b>
                  </div>
                  <div className="bg-[#0B100C] border border-white/10 p-2 rounded-lg">
                    <span className="block text-[9px] font-mono text-slate-400 uppercase">Production Time</span>
                    <b className="text-white text-[11px]">45 Mins / Video</b>
                  </div>
                  <div className="bg-[#0B100C] border border-white/10 p-2 rounded-lg">
                    <span className="block text-[9px] font-mono text-slate-400 uppercase">Bank Route</span>
                    <b className="text-[#FFB020] text-[11px]">Direct Wire</b>
                  </div>
                </div>

                {/* Live AdSense Wire Terminal Log */}
                <div className="bg-[#050805] border border-[#2FD97E]/30 rounded-xl p-2.5 text-[11px] font-mono text-slate-300 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-2 h-2 rounded-full bg-[#2FD97E] shrink-0" />
                    <span className="truncate text-slate-300">{selectedNiche.recentPayout}</span>
                  </div>
                  <span className="text-[#2FD97E] font-bold shrink-0 bg-[#2FD97E]/10 px-2 py-0.5 rounded border border-[#2FD97E]/30">VERIFIED</span>
                </div>

              </div>

              {/* Bottom Interactive Claim Banner */}
              <div className="mt-3 flex items-center justify-between text-xs text-slate-300 bg-[#0B100C] p-3 rounded-xl border border-white/10">
                <div className="flex items-center gap-2">
                  <Flame size={15} className="text-red-500 animate-bounce" />
                  <span><b>{RECENT_ALERTS[alertIndex].city}:</b> {RECENT_ALERTS[alertIndex].text}</span>
                </div>
                <button 
                  onClick={openPayModal}
                  className="bg-[#2FD97E] hover:bg-[#52E897] text-[#04220F] font-black px-3 py-1.5 rounded-lg text-xs tracking-wider shrink-0 transition-transform active:scale-95"
                >
                  Claim Niche →
                </button>
              </div>

            </div>
          </div>

        </div>
      </header>

      {/* 3. OPENING HOOK — ERA TABS */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-[#0E1410] border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[#2FD97E] text-xs font-black uppercase tracking-widest mb-2">History Repeats Itself</p>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase leading-tight">
              Duniya badal rahi hai.<br />
              Sawaal yeh hai — <span className="text-[#2FD97E]">aap badal rahe hain ya nahi?</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mt-3">
              Har 15–20 saal mein ek technology aati hai jo wealth distribution ko restructure karti hai. Jo early adopt karte hain, woh leaders bante hain.
            </p>
          </div>

          {/* Era Tabs */}
          <div className="grid grid-cols-3 border border-white/10 rounded-2xl overflow-hidden mb-6 bg-[#111913]">
            <button 
              onClick={() => setActiveEra("e1")}
              className={`p-4 text-left border-r border-white/10 transition-colors ${activeEra === "e1" ? "bg-[#2FD97E]/10 text-[#2FD97E]" : "text-slate-400 hover:text-white"}`}
            >
              <small className="block text-[10px] font-bold uppercase tracking-wider">1980–90s</small>
              <b className="text-sm sm:text-base font-extrabold text-white">Computer Revolution</b>
            </button>
            <button 
              onClick={() => setActiveEra("e2")}
              className={`p-4 text-left border-r border-white/10 transition-colors ${activeEra === "e2" ? "bg-[#2FD97E]/10 text-[#2FD97E]" : "text-slate-400 hover:text-white"}`}
            >
              <small className="block text-[10px] font-bold uppercase tracking-wider">2000–10s</small>
              <b className="text-sm sm:text-base font-extrabold text-white">Internet & Web</b>
            </button>
            <button 
              onClick={() => setActiveEra("e3")}
              className={`p-4 text-left transition-colors ${activeEra === "e3" ? "bg-[#2FD97E]/10 text-[#2FD97E]" : "text-slate-400 hover:text-white"}`}
            >
              <small className="block text-[10px] font-bold uppercase tracking-wider">Aaj — 2026</small>
              <b className="text-sm sm:text-base font-extrabold text-[#2FD97E]">AI & YouTube Assets</b>
            </button>
          </div>

          {/* Era Content Box */}
          <div className="bg-[#111913] border border-white/10 p-6 rounded-2xl space-y-4 text-sm text-slate-300">
            {activeEra === "e1" && (
              <div>
                <p><strong>Kya hua:</strong> Typewriter replace hua. Har bank aur corporation mein automated computing systems aa gaye.</p>
                <p className="text-[#2FD97E]"><strong>Early Adopters:</strong> Computer operators aur software engineers ne apni generation ki wealth banayi.</p>
                <p className="text-red-400"><strong>Skeptics:</strong> Jo dekhte rahe, unke paas sirf regret reh gaya.</p>
                <div className="pt-2 text-xs font-bold text-red-400">Opportunity Window: CLOSED</div>
              </div>
            )}

            {activeEra === "e2" && (
              <div>
                <p><strong>Kya hua:</strong> Internet ne geographical boundaries khatam kar di. E-commerce aur freelancing shuru hui.</p>
                <p className="text-[#2FD97E]"><strong>Early Adopters:</strong> Digital agencies aur online creators ne global dollar income generate ki.</p>
                <p className="text-red-400"><strong>Skeptics:</strong> “Online kuch nahi hota” kehne wale piche reh gaye.</p>
                <div className="pt-2 text-xs font-bold text-red-400">Opportunity Window: CLOSED</div>
              </div>
            )}

            {activeEra === "e3" && (
              <div>
                <p><strong>Kya hua:</strong> AI automation ne faceless content creation aur global distribution ko 10x fast kar diya.</p>
                <p className="text-[#2FD97E]"><strong>Early Adopters:</strong> AI workflows use karke $500–$3,000/mo automated dollar assets create kar rahe hain.</p>
                <p className="text-red-400"><strong>Skeptics:</strong> Still waiting for the &apos;perfect time&apos;.</p>
                <div className="pt-2 text-xs font-bold text-[#2FD97E]">Opportunity Window: 2–3 SAAL KA GOLDEN PERIOD (OPEN NOW)</div>
              </div>
            )}
          </div>

          {/* Group A vs Group B */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-red-500/5 border border-red-500/30 p-6 rounded-2xl space-y-3">
              <h3 className="text-lg font-black text-red-400 uppercase">Group A — The Hesitators</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                <li className="flex gap-2"><X size={16} className="text-red-400 shrink-0" /> “Baad mein dekhenge, abhi thoda busy hoon.”</li>
                <li className="flex gap-2"><X size={16} className="text-red-400 shrink-0" /> “Mujhe technical editing nahi aati.”</li>
                <li className="flex gap-2"><X size={16} className="text-red-400 shrink-0" /> “Pehle koi aur kare phir dekhte hain.”</li>
              </ul>
              <div className="text-xs font-bold text-red-300 pt-2 border-t border-red-500/20">
                Outcome: Same job pressure, rising inflation, and zero dollar diversification.
              </div>
            </div>

            <div className="bg-[#2FD97E]/5 border border-[#2FD97E]/40 p-6 rounded-2xl space-y-3">
              <h3 className="text-lg font-black text-[#2FD97E] uppercase">Group B — The Digital Asset Builders</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                <li className="flex gap-2"><Check size={16} className="text-[#2FD97E] shrink-0" /> Learn with an open mind and practical curiosity.</li>
                <li className="flex gap-2"><Check size={16} className="text-[#2FD97E] shrink-0" /> Execute AI systems without camera anxiety.</li>
                <li className="flex gap-2"><Check size={16} className="text-[#2FD97E] shrink-0" /> Seize compounding growth while entry barrier is low.</li>
              </ul>
              <div className="text-xs font-bold text-[#2FD97E] pt-2 border-t border-[#2FD97E]/20">
                Outcome: Scalable dollar income and genuine financial sovereignty.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DOLLAR CALCULATOR */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-[#0B100C] border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[#2FD97E] text-xs font-black uppercase tracking-widest mb-2">Currency Advantage</p>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase leading-tight">
              Mehnat Pakistan Ki —<br />
              <span className="text-[#2FD97E]">Kamaee Global Dollar ($) Mein.</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto mt-2">
              YouTube international advertisers (US, UK, Canada) se dollar receive karta hai aur direct Pakistani bank mein transfer karta hai.
            </p>
          </div>

          <div className="bg-[#111913] border border-white/10 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto shadow-2xl">
            <div className="flex justify-between items-baseline mb-4">
              <label className="text-xs font-black uppercase tracking-wider text-slate-300">Monthly Target</label>
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
                <small className="block text-[11px] font-bold text-slate-400 uppercase">Monthly Yield (PKR)</small>
                <b className="text-xl sm:text-2xl font-black text-white">Rs {pkrMonthly.toLocaleString()}</b>
              </div>
              <div className="bg-[#0B100C] border border-[#2FD97E]/30 p-4 rounded-xl">
                <small className="block text-[11px] font-bold text-[#2FD97E] uppercase">Yearly Asset Compounding</small>
                <b className="text-xl sm:text-2xl font-black text-[#2FD97E]">Rs {pkrYearly.toLocaleString()}</b>
              </div>
            </div>

            <div className="space-y-3 text-xs font-semibold text-slate-300">
              <div>
                <div className="flex justify-between mb-1"><span>Average Local Salary</span><b>Rs 85,000/mo</b></div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-slate-500 w-[20%]" /></div>
              </div>
              <div>
                <div className="flex justify-between mb-1 text-[#2FD97E]"><span>Digital Asset Portfolio Target</span><b>Rs {pkrMonthly.toLocaleString()}/mo</b></div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-[#2FD97E] w-[85%]" /></div>
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-4 text-center">
              $1 ≈ Rs 278 • Local average salary se <strong>~{(pkrMonthly / 85000).toFixed(1)}x greater yield</strong>, automated while you sleep.
            </p>
          </div>
        </div>
      </section>

      {/* 5. PAIN CHECKLIST */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-[#0E1410] border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[#FFB020] text-xs font-black uppercase tracking-widest mb-2">Self Diagnostic</p>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase leading-tight">
              Chupke se khud se poocho —<br />
              <span className="text-[#FFB020]">in mein se kitne challenges aap face kar rahe hain?</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">Select any that resonate with your current reality:</p>
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
                {selectedPains.length}/8 Realities Identified — This workshop was engineered for you.
              </b>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                2 ghante ka practical masterclass aapko ek clear, step-by-step 30-day roadmap dega to build reliable parallel income.
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
            <p className="text-[#2FD97E] text-xs font-black uppercase tracking-widest mb-2">Masterclass Curriculum</p>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase leading-tight">
              8:00 PM se 10:00 PM —<br /><span className="text-[#2FD97E]">Minute-by-minute practical breakdown.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#111913] border border-white/10 p-6 rounded-2xl space-y-2">
              <span className="text-xs font-mono font-bold text-[#2FD97E]">8:00 PM — 8:20 PM</span>
              <h3 className="text-base font-bold text-white">Digital Zameen Asset Formula & Blueprint</h3>
              <p className="text-xs text-slate-300">How to identify highest RPM global niches from Pakistan without showing face.</p>
            </div>
            <div className="bg-[#111913] border border-white/10 p-6 rounded-2xl space-y-2">
              <span className="text-xs font-mono font-bold text-[#2FD97E]">8:20 PM — 9:00 PM</span>
              <h3 className="text-base font-bold text-white">5 Live AI Automation Engines Demo</h3>
              <p className="text-xs text-slate-300">Topic research, scripting, AI voice synthesis, and dynamic B-roll assembly in 50 minutes.</p>
            </div>
            <div className="bg-[#111913] border border-white/10 p-6 rounded-2xl space-y-2">
              <span className="text-xs font-mono font-bold text-[#2FD97E]">9:00 PM — 9:40 PM</span>
              <h3 className="text-base font-bold text-white">High-RPM Monetization & Dollar Banking</h3>
              <p className="text-xs text-slate-300">Google AdSense + Payoneer/Wise direct Pakistani bank transfer legal framework.</p>
            </div>
            <div className="bg-[#111913] border border-white/10 p-6 rounded-2xl space-y-2">
              <span className="text-xs font-mono font-bold text-[#2FD97E]">9:40 PM — 10:00 PM</span>
              <h3 className="text-base font-bold text-white">30-Day Execution Roadmap & Live Q&A</h3>
              <p className="text-xs text-slate-300">Direct interactive answers to every student&apos;s personal questions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. VALUE STACK & SOPHISTICATED TOOLKIT */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-[#0E1410] border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[#FFB020] text-xs font-black uppercase tracking-widest mb-2">Complete Value Package</p>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase leading-tight">
              Rs 13,000+ ki Professional AI Toolkit & Asset Stack
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto mt-2">
              A comprehensive launch system providing every asset required to start compounding.
            </p>
          </div>

          <div className="bg-[#111913] border border-white/10 rounded-2xl max-w-xl mx-auto overflow-hidden shadow-2xl">
            <div className="bg-white/5 p-4 text-xs font-bold uppercase tracking-wider text-[#FFB020] border-b border-white/10">
              Executive Value Stack — Everything Included
            </div>
            <div className="p-6 space-y-3 text-xs sm:text-sm divide-y divide-white/5">
              <div className="flex justify-between pt-2"><span>Live 2-Hour Interactive Masterclass (with Live Q&A)</span><b>Rs 4,999</b></div>
              <div className="flex justify-between pt-2"><span>AI Tools Starter Kit (Curated Prompts + Toolstack)</span><b>Rs 2,999</b></div>
              <div className="flex justify-between pt-2"><span>High-RPM Niche Validation Blueprints</span><b>Rs 1,999</b></div>
              <div className="flex justify-between pt-2"><span>30-Day Step-by-Step Roadmap PDF</span><b>Rs 1,499</b></div>
              <div className="flex justify-between pt-2"><span>Private Community Mentorship Group Access</span><b>Rs 999</b></div>
              <div className="flex justify-between pt-2"><span>Full HD Workshop Recording (48 Hours Access)</span><b>Rs 1,999</b></div>
              <div className="flex justify-between pt-4 border-t-2 border-white/20 text-base font-bold"><span>Total Stack Value:</span><b className="text-[#FFB020]">Rs 13,494</b></div>
            </div>

            <div className="p-6 bg-[#0B100C] border-t border-white/10 text-center space-y-4">
              <div className="flex items-center justify-center gap-4">
                <span className="text-4xl sm:text-5xl font-black text-[#2FD97E] font-mono">Rs 2,999</span>
                <span className="text-slate-500 line-through text-lg font-bold">Rs 13,494</span>
                <span className="bg-[#FFB020]/20 text-[#FFB020] border border-[#FFB020]/40 text-xs font-black px-2.5 py-1 rounded-full">77% SAVING</span>
              </div>

              <button 
                onClick={openPayModal}
                className="w-full bg-[#2FD97E] hover:bg-[#52E897] text-[#04220F] font-black text-lg py-5 px-6 rounded-xl shadow-xl shadow-[#2FD97E]/20 transition-all active:scale-98"
              >
                Rs 2,999 — Seat Book Karo →
              </button>

              <div className="p-3 bg-green-950/40 border border-[#2FD97E]/30 rounded-xl flex items-center justify-center gap-2 text-xs text-green-300 font-bold">
                <ShieldCheck size={16} className="text-[#2FD97E] shrink-0" />
                <span>Zero-Risk Guarantee: Attend workshop, if not fully satisfied get a 100% immediate refund!</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-[#0B100C] border-b border-white/10">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <p className="text-[#2FD97E] text-xs font-black uppercase tracking-widest mb-2">Verified Student Case Studies</p>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase">Real Results from Real Students</h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {[
            { q: "Raat 10 baje tak mujhe nahi pata tha ke high-ticket offer kaise banate hain. 17 din baad pehla international client — $180.", name: "Ahmed", city: "Lahore" },
            { q: "Main housewife hoon. Raat 9 baje bachon ke sone ke baad digital asset pe kaam. Pehla month $220 dollar account mein receive hua.", name: "Fatima", city: "Karachi" },
            { q: "Job nahi chhodi. Bas raat 2 ghante. Ab YouTube asset income meri bank salary ke barabar ho chuki hai.", name: "Bilal", city: "Islamabad" },
            { q: "“Scam hai” kehne wale ab puchte hain: “Bhai, US audience ko automate kaise target kiya?”", name: "Sana", city: "Multan" }
          ].map((t, idx) => (
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
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase">Frequently Asked Questions</h2>
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
          <p className="text-[#2FD97E] text-xs font-black uppercase tracking-widest">Final Call for Registration</p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase leading-tight">
            10 saal baad aap ka bacha poochega:<br />
            <span className="text-[#2FD97E]">“Papa, jab AI aa raha tha — aap kahan the?”</span>
          </h2>
          <div className="text-4xl sm:text-6xl font-black text-[#FFB020] font-mono">{timeLeft}</div>
          <p className="text-xs uppercase tracking-widest text-slate-400">Batch Doors Closing Soon</p>
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
            Disclaimer: Results vary based on individual execution and consistency. © 2026 YouTube Empire Builders — Abrar Nadir
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
                      <Gift size={14} /> Included Free (Total Stack Value: Rs 13,494):
                    </div>
                    <div className="grid grid-cols-1 gap-1 text-[11px] text-slate-300">
                      <div className="flex justify-between"><span>🤖 AI Tools Starter Kit (tools + prompts)</span><span className="text-[#2FD97E] font-bold">FREE (Rs 2,999)</span></div>
                      <div className="flex justify-between"><span>📝 High-RPM Niche Blueprints</span><span className="text-[#2FD97E] font-bold">FREE (Rs 1,999)</span></div>
                      <div className="flex justify-between"><span>📅 30-Day Step-by-Step Roadmap PDF</span><span className="text-[#2FD97E] font-bold">FREE (Rs 1,499)</span></div>
                      <div className="flex justify-between"><span>💬 Private Community Access</span><span className="text-[#2FD97E] font-bold">FREE (Rs 999)</span></div>
                      <div className="flex justify-between"><span>📹 Full HD Workshop Recording (48 Hours)</span><span className="text-[#2FD97E] font-bold">FREE (Rs 1,999)</span></div>
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
