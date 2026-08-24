"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Check, X, Play, ShieldCheck, 
  ArrowRight, Users, DollarSign, 
  Zap, ChevronDown, 
  TrendingUp, Home, Lock, AlertTriangle,
  MessageSquare, Monitor,
  GraduationCap, Briefcase, Heart, Smile, Gift, Flame
} from "lucide-react";
import { cn } from "./utils/cn";
import "./index.css";

const TEAM_WHATSAPP_NUMBER = "15553693691";

export default function Yt5App() {
  const [dynamicDate, setDynamicDate] = useState<string>("");
  const [payModalOpen, setPayModalOpen] = useState<boolean>(false);
  const [modalStep, setModalStep] = useState<1 | 2>(1);
  const [policyModal, setPolicyModal] = useState<"refund" | "transfer" | "disclaimer" | "privacy" | null>(null);

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

  // Interactive sections state
  const [val, setVal] = useState<number>(500);
  const pkrRate = 278;
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);
  const [floatingVisible, setFloatingVisible] = useState<boolean>(false);

  // Dynamic Date (PKT)
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
  }, []);

  // Floating CTA on Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300 && !payModalOpen) setFloatingVisible(true);
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

  // Modal open / close handlers
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
    return `Salam Abrar Nadir & Support Team! Main ne Digital Zameen Live Workshop (Workshop 5) ke liye payment transfer kar di hai.\n\n*Name:* ${fullName.trim()}\n*WhatsApp:* ${whatsappNumber.trim()}${email.trim() ? `\n*Email:* ${email.trim()}` : ""}\n*Payment Method:* ${paymentMethod}${transactionId.trim() ? `\n*Transaction ID:* ${transactionId.trim()}` : ""}\n*Batch Date:* ${dynamicDate}\n*Amount Paid:* PKR 1,999\n\nI have attached my payment screenshot. Please verify and share the confirmed Zoom link & WhatsApp community invite. Shukriya! 😊`;
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

      // 1. Send to CRM backend API route
      await fetch("/api/yt5-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: whatsappNumber.trim(),
          email: email.trim(),
          paymentMethod: paymentMethod === "Meezan Bank" ? "Bank Transfer" : paymentMethod,
          transactionId: transactionId.trim() || "N/A",
          batchDate: dynamicDate,
          utm_source: params.get("utm_source") || "",
          utm_medium: params.get("utm_medium") || "",
          utm_campaign: params.get("utm_campaign") || "",
          utm_content: params.get("utm_content") || "",
          utm_term: params.get("utm_term") || "",
          fbclid: params.get("fbclid") || "",
        }),
      }).catch((err) => console.warn("CRM workflow submission note:", err));

      // 2. Track Meta Pixel Event
      if (typeof (window as any).fbq === "function") {
        (window as any).fbq("track", "CompleteRegistration", {
          value: 1999,
          currency: "PKR",
          content_name: "YouTube Digital Zameen Workshop 5",
        });
      }

      setIsSubmitting(false);
      setModalStep(2);
    } catch {
      setIsSubmitting(false);
      setModalStep(2);
    }
  };

  const openPolicy = (type: "refund" | "transfer" | "disclaimer" | "privacy") => {
    setPolicyModal(type);
    document.body.style.overflow = "hidden";
  };

  const closePolicy = () => {
    setPolicyModal(null);
    document.body.style.overflow = "";
  };

  const faqs = [
    { 
      q: "Kya face dikhana zaroori hai?", 
      a: "Bilkul nahi. Yeh masterclass specifically FACELESS channels ke liye designed hai jahan AI tools visual montage aur voiceover manage karte hain." 
    },
    { 
      q: "Kya expensive AI tools chahiye?", 
      a: "Nahi. Hum accessible aur free/low-cost AI workflows use karte hain taake aap pehle din se bina kisi heavy tool budget ke execute kar sakein." 
    },
    { 
      q: "Job ya university schedule ke sath manage hoga?", 
      a: "Isi liye session raat 8:00 PM se 10:00 PM PKT rakha gaya hai. Workshop ke baad rozana sirf 1 se 1.5 ghanta focused practice kafi hai." 
    },
    { 
      q: "Main bilkul beginner hoon — kya mere liye helpful hai?", 
      a: "Specifically beginners ke liye banaya gaya hai. Zero technical ya editing background wale bhi step-by-step follow kar sakte hain." 
    },
    { 
      q: "Kya income ya monetization ki guarantee hai?", 
      a: "Nahi. Jo guarantee deta hai woh misleading claim karta hai. YouTube ek authentic digital skill aur asset business hai jo regular execution mangta hai. Hum aapko exact system, tools aur step-by-step direction provide karte hain." 
    }
  ];

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#1A1A1A] font-sans overflow-x-hidden pb-20 md:pb-0">
      
      {/* ANNOUNCEMENT BANNER */}
      <div className="bg-[#C0392B] text-white py-2 overflow-hidden whitespace-nowrap sticky top-0 z-40 shadow-lg">
        <div className="flex animate-marquee items-center gap-8 text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                🔴 AAJ RAAT 8 PM LIVE MASTERCLASS • BATCH DATE: {dynamicDate ? dynamicDate.toUpperCase() : "TODAY"} • SIRF 100 SEATS
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* HERO SECTION */}
      <header className="pt-12 md:pt-20 pb-12 md:pb-16 px-4 md:px-6 text-center max-w-5xl mx-auto border-x border-zinc-200/50">
        <div className="inline-block bg-zinc-200/60 px-3 md:px-4 py-1 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] border border-zinc-300 mb-8 md:mb-12 font-bold text-zinc-700">
          Daily Live Masterclass • Raat 8 Se 10 Baje PKT • 100 Seats Limit
        </div>
        
        <div className="space-y-4 mb-8 md:mb-12">
          <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl font-bold leading-[1.15] tracking-tight">
            <span className="block">Baap Ne Zameen Di.</span>
            <span className="block text-[#C0392B]">Aap Digital Zameen Do.</span>
            <span className="block text-2xl sm:text-3xl md:text-4xl mt-6 md:mt-8 font-medium italic">AI Ka Daur Shuru Ho Gaya —</span>
            <span className="block text-xl sm:text-2xl md:text-3xl font-normal text-zinc-700">Pakistan Ke Har Ghar Mein</span>
            <span className="block text-xl sm:text-2xl md:text-3xl font-bold">Yeh Skill Mumkin Hai.</span>
          </h1>
        </div>

        <p className="text-zinc-600 text-base md:text-xl max-w-3xl mx-auto leading-relaxed mb-10 md:mb-16 px-2">
          YouTube channel ek aisi digital asset hai jo long-term compounding digital reach aur global audience create karti hai — <br className="hidden md:block" />
          bina camera ke, AI-assisted production workflows ke sath, ghar baith kar.
          <br /><br />
          <span className="text-[#1A1A1A] font-bold underline decoration-[#C0392B] decoration-2 underline-offset-4">
            Aaj raat 2 ghante mein seekhein: validated niche selection, AI storytelling, aur 30/90-day execution blueprint.
          </span>
        </p>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-16 px-2">
          {[
            { label: "🏠 Physical Plot", old: "PKR 50 Lakh+ Capital", new: "PKR 0 Capital Se Shuru", icon: Home, color: "red" },
            { label: "💸 Global Audience", old: "Local Low CPM", new: "US/UK Dollar Audience", icon: DollarSign, color: "green" },
            { label: "🤖 AI Production", old: "Manual Editing Days", new: "AI Guided Fast Assembly", icon: Zap, color: "blue" }
          ].map((card, idx) => (
            <div key={idx} className="bg-white p-5 md:p-6 border border-zinc-200 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden text-left rounded-xl">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <card.icon size={48} />
              </div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 mb-2 block">{card.label}</span>
              <div className="space-y-1">
                <div className="text-xs text-zinc-400 line-through font-mono uppercase">{card.old}</div>
                <div className={cn(
                  "text-lg md:text-xl font-bold",
                  card.color === 'green' ? "text-green-600" : "text-[#1A1A1A]"
                )}>{card.new}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Hero CTA */}
        <div className="max-w-xl mx-auto px-2">
          <button 
            onClick={openPayModal}
            className="w-full bg-[#C0392B] hover:bg-[#A93226] text-white py-5 md:py-6 px-6 md:px-8 text-lg md:text-2xl font-bold rounded-xl shadow-2xl active:scale-95 transition-all mb-4 border-b-4 border-black/20 group"
          >
            <span className="flex items-center justify-center gap-3">
              Apni Digital Zameen Ka Blueprint Book Karein
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </span>
            <div className="text-sm font-mono opacity-85 mt-1 font-normal">Special Pass: PKR 1,999 • All 5 Bonuses Included</div>
          </button>
          <p className="text-[11px] font-mono text-zinc-500 flex items-center justify-center gap-2 uppercase tracking-tighter">
            <Lock size={12} className="text-green-600" />
            Registration 7 PM close • WhatsApp verification (+92 329 6158206)
          </p>
        </div>
      </header>

      {/* OPENING HOOK */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-white border-y border-zinc-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6">
              Duniya Badal Rahi Hai. Sawaal Yeh Hai — Aap Badal Rahe Hain Ya Nahi?
            </h2>
            <p className="text-zinc-500 font-serif italic text-lg md:text-xl">Har daur mein ek turning point aata hai.</p>
          </div>

          <div className="space-y-8 md:space-y-12">
            <div className="grid md:grid-cols-[1fr_2fr] gap-4 md:gap-8 items-start">
              <div className="font-mono text-zinc-400 uppercase tracking-widest pt-2 text-xs md:text-sm font-bold">1990 Ka Daur</div>
              <div className="p-6 md:p-8 border-l-4 border-zinc-300 bg-zinc-50 rounded-r-xl">
                <p className="text-base md:text-lg leading-relaxed text-zinc-700">
                  Jab computers aaye — kuch logon ne seekha. Baaki ne kaha: &apos;Yeh hamare liye nahi.&apos;
                  <br /><br />
                  <strong className="text-[#1A1A1A] italic">Aaj woh seekhne wale companies chala rahe hain.</strong>
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-[1fr_2fr] gap-4 md:gap-8 items-start">
              <div className="font-mono text-zinc-400 uppercase tracking-widest pt-2 text-xs md:text-sm font-bold">2000 Ka Daur</div>
              <div className="p-6 md:p-8 border-l-4 border-zinc-300 bg-zinc-50 rounded-r-xl">
                <p className="text-base md:text-lg leading-relaxed text-zinc-700">
                  Jab internet aaya — kuch logon ne online freelancing aur agencies banayein. Baaki ne kaha: &apos;Yeh reliable nahi.&apos;
                  <br /><br />
                  <strong className="text-[#1A1A1A] italic">Aaj unhi ke paas sustainable foreign currency cashflow hai.</strong>
                </p>
              </div>
            </div>

            <div className="relative p-6 sm:p-10 md:p-12 bg-[#1A1A1A] text-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="relative z-10">
                <div className="font-mono text-[#C0392B] font-bold uppercase tracking-[0.2em] mb-4 text-xs md:text-sm">2026: AI AUR YOUTUBE AUTOMATION</div>
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 mt-6">
                  <div className="space-y-4 opacity-60">
                    <div className="text-xs font-mono uppercase border-b border-white/20 pb-2">❌ Ek group jo wait kar raha hai</div>
                    <ul className="space-y-2 italic text-sm">
                      <li>&apos;Dekhte hain. Baad mein.&apos;</li>
                      <li>&apos;Shayad yeh bhi chala jayega.&apos;</li>
                      <li>&apos;Mere liye mushkil hai.&apos;</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <div className="text-xs font-mono uppercase text-green-400 border-b border-green-400/20 pb-2">✅ Ek group jo ab action le raha hai</div>
                    <ul className="space-y-2 font-medium text-sm">
                      <li className="flex gap-2"><Check size={16} className="text-green-500 shrink-0" /> Jo digital assets create kar raha hai.</li>
                      <li className="flex gap-2"><Check size={16} className="text-green-500 shrink-0" /> Jo AI tools ko leverage kar raha hai.</li>
                      <li className="flex gap-2"><Check size={16} className="text-green-500 shrink-0" /> Jo international dollar audience ko target kar raha hai.</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-8 text-center pt-6 border-t border-white/10">
                  <p className="text-lg md:text-xl font-serif italic text-amber-400">Aap kis group mein hain — yeh aaj raat decide hoga.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROPERTY ANALOGY */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-[#F9F7F2] relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold mb-6">
              Zameen Samjhte Ho? <br />
              Toh YouTube Digital Asset Bhi Samajh Lo.
            </h2>
            <div className="max-w-2xl mx-auto text-zinc-600 space-y-2 text-sm md:text-base">
              <p>Physical zameen mein capital aur maintenance chahiye hoti hai.</p>
              <p>Digital zameen mein sirf right niche framework, AI pipeline aur consistent uploads chahiye.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 border border-zinc-200 shadow-xl mb-12 rounded-2xl overflow-hidden">
            <div className="bg-zinc-50 p-6 md:p-10">
              <div className="flex items-center gap-3 font-mono text-zinc-500 uppercase text-xs mb-6 pb-3 border-b border-zinc-200 font-bold">
                <Home size={16} /> 🏠 PHYSICAL PROPERTY
              </div>
              <ul className="space-y-4 text-zinc-600 text-sm">
                {[
                  "PKR 50 lakh+ heavy capital", "Location aur physical boundaries", "Physical repairs & tenant issues", 
                  "Slow local appreciation", "Bank loan ya wirasat required", "Physical geographic risk",
                  "PKR local rental yield", "Limited to one single city"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 md:p-10 relative">
              <div className="absolute top-4 right-4 rotate-12 bg-green-100 text-green-700 text-[10px] font-mono px-2 py-1 font-bold rounded">DIGITAL ASSET</div>
              <div className="flex items-center gap-3 font-mono text-[#C0392B] uppercase text-xs mb-6 pb-3 border-b border-zinc-100 font-bold">
                <Play size={16} /> 📺 YOUTUBE FACELESS CHANNEL
              </div>
              <ul className="space-y-4 font-bold text-sm text-zinc-900">
                {[
                  "PKR 0 camera / equipment cost", "Ghar se, kisi bhi sheher se", "AI-assisted production workflows",
                  "Global compounding audience", "Internet aur structured roadmap chahiye", "Digital asset sovereignty",
                  "US/UK Dollar monetization yield", "Entire world is your audience"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="text-green-600 shrink-0" size={16} /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button 
              onClick={openPayModal}
              className="inline-flex items-center gap-3 bg-[#1A1A1A] text-white px-6 md:px-8 py-4 font-bold text-base md:text-lg rounded-xl hover:bg-[#C0392B] transition-colors group shadow-xl"
            >
              Mujhe Digital Zameen Ka Blueprint Chahiye <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* AGENDA SECTION */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold mb-4">
              2 Ghante Mein Exactly Kya Hoga?
            </h2>
            <p className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-bold">Zero Theory. Screen-shared Live Demonstration.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 md:p-8 bg-[#F9F7F2] border border-zinc-200 rounded-2xl">
              <div className="font-mono text-[#C0392B] text-xs font-bold mb-2">HOUR 1: 8:00 PM - 9:00 PM</div>
              <h3 className="text-xl font-bold mb-4 uppercase">YouTube Empire Framework</h3>
              <ul className="space-y-3 text-sm text-zinc-600">
                <li className="flex gap-2"><Check size={16} className="text-green-500 shrink-0" /> Profitable Niche Selection Criteria</li>
                <li className="flex gap-2"><Check size={16} className="text-green-500 shrink-0" /> Tier-1 Dollar RPM & Audience Analysis</li>
                <li className="flex gap-2"><Check size={16} className="text-green-500 shrink-0" /> High-Retention Faceless Channel Formats</li>
                <li className="flex gap-2"><Check size={16} className="text-green-500 shrink-0" /> 90-Day Channel Content Roadmap</li>
              </ul>
            </div>

            <div className="p-6 md:p-8 bg-[#F9F7F2] border border-zinc-200 rounded-2xl">
              <div className="font-mono text-[#C0392B] text-xs font-bold mb-2">HOUR 2: 9:00 PM - 10:00 PM</div>
              <h3 className="text-xl font-bold mb-4 uppercase">AI Automation Live Demo</h3>
              <ul className="space-y-3 text-sm text-zinc-600">
                <li className="flex gap-2"><Check size={16} className="text-green-500 shrink-0" /> AI Topic Research & High-Click Hooks</li>
                <li className="flex gap-2"><Check size={16} className="text-green-500 shrink-0" /> AI Voiceover & Natural Cadence Synthesis</li>
                <li className="flex gap-2"><Check size={16} className="text-green-500 shrink-0" /> B-Roll Assembly & Visual Pacing</li>
                <li className="flex gap-2"><Check size={16} className="text-green-500 shrink-0" /> Direct Pakistani Bank AdSense Transfer Flow</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* BONUS STACK & VALUE CARD */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-[#1A1A1A] text-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold mb-4">5 Founding Bonuses Included (Worth PKR 15,499)</h2>
            <p className="font-mono text-xs uppercase tracking-widest text-[#F59E0B] font-bold">⚠️ Included Free with Your PKR 1,999 Pass</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {[
              { title: "🤖 AI Prompts Pack (50+ Prompts)", val: "3,000", desc: "Tested prompts for YouTube scripting and hook creation." },
              { title: "🔍 Niche Research Template", val: "2,000", desc: "High-demand low-competition validation framework." },
              { title: "📅 90-Day Content Planner", val: "2,500", desc: "Structured upload calendar to eliminate inconsistency." },
              { title: "💬 Private WhatsApp Group", val: "5,000", desc: "7 Days support & community networking access." },
              { title: "📹 Workshop HD Recording", val: "2,999", desc: "24 Hours replay access to re-watch every step." }
            ].map((b, i) => (
              <div key={i} className="p-5 bg-white/5 border border-white/10 rounded-xl">
                <div className="flex justify-between mb-1">
                  <span className="font-bold text-sm text-zinc-100">{b.title}</span>
                  <span className="font-mono text-xs text-zinc-400 line-through">PKR {b.val}</span>
                </div>
                <p className="text-xs text-zinc-400 mb-2">{b.desc}</p>
                <div className="text-[10px] text-green-400 font-bold uppercase tracking-widest">TODAY: 100% FREE</div>
              </div>
            ))}
          </div>

          <div className="max-w-xl mx-auto bg-white text-[#1A1A1A] border-2 border-[#C0392B] p-6 sm:p-8 rounded-2xl shadow-2xl text-center">
            <div className="text-xs font-mono text-zinc-500 uppercase mb-2 tracking-widest font-bold">Workshop + 5 Bonuses (Total Value: PKR 15,499)</div>
            <div className="text-4xl sm:text-6xl font-mono font-bold text-green-600 mb-6">PKR 1,999</div>
            <button 
              onClick={openPayModal}
              className="w-full bg-[#C0392B] hover:bg-[#A93226] text-white py-4 sm:py-5 text-lg sm:text-xl font-bold rounded-xl shadow-xl transition-all active:scale-95"
            >
              Aaj Raat Ki Seat Lock Karein →
            </button>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-white border-b border-zinc-200">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-zinc-200 rounded-xl overflow-hidden">
                <button 
                  onClick={() => setOpenFaqIdx(openFaqIdx === i ? null : i)}
                  className="w-full p-4 sm:p-5 text-left flex justify-between items-center hover:bg-zinc-50 transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base text-zinc-900">{faq.q}</span>
                  <ChevronDown className={cn("transition-transform duration-300 text-zinc-400", openFaqIdx === i && "rotate-180 text-green-600")} />
                </button>
                {openFaqIdx === i && (
                  <div className="p-4 sm:p-5 border-t border-zinc-100 bg-zinc-50 text-sm text-zinc-600 leading-relaxed italic">
                    &quot;{faq.a}&quot;
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-4 bg-zinc-900 text-zinc-400 text-xs text-center border-t border-zinc-800">
        <div className="max-w-4xl mx-auto space-y-3">
          <p className="text-white font-bold text-sm">YouTube Empire Builders — Digital Zameen Masterclass</p>
          <p className="text-[11px] text-zinc-500">
            Disclaimer: Educational & skill-building program. We do not make passive or guaranteed income promises. Individual results depend strictly on your consistency, content quality, niche research, and execution.
          </p>
          <div className="flex justify-center gap-6 pt-2">
            <button type="button" onClick={() => openPolicy("refund")} className="hover:text-white underline">Refund Policy</button>
            <button type="button" onClick={() => openPolicy("transfer")} className="hover:text-white underline">Transfer Policy</button>
            <button type="button" onClick={() => openPolicy("disclaimer")} className="hover:text-white underline">Disclaimer</button>
            <button type="button" onClick={() => openPolicy("privacy")} className="hover:text-white underline">Privacy Policy</button>
          </div>
        </div>
      </footer>

      {/* FLOATING MOBILE CTA */}
      <div className={cn(
        "fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-zinc-200 p-3 flex items-center justify-between gap-3 shadow-2xl transition-transform duration-300 md:hidden",
        floatingVisible ? "translate-y-0" : "translate-y-24"
      )}>
        <div className="pl-2">
          <div className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Special Pass</div>
          <div className="font-bold text-lg text-green-700 leading-tight">PKR 1,999</div>
        </div>
        <button 
          onClick={openPayModal}
          className="bg-[#C0392B] hover:bg-[#A93226] text-white font-bold text-sm py-3 px-6 rounded-xl shadow-lg active:scale-95"
        >
          Seat Lock Karein ✓
        </button>
      </div>

      {/* REGISTRATION & PAYMENT MODAL */}
      {payModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-xl rounded-t-3xl sm:rounded-3xl border-t-4 sm:border-2 border-[#C0392B] shadow-2xl max-h-[92vh] flex flex-col overflow-hidden">
            
            {/* Header */}
            <div className="bg-zinc-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-zinc-800 shrink-0">
              <div>
                <div className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">Live Masterclass Admission</div>
                <h3 className="text-base sm:text-lg font-bold">{modalStep === 1 ? "Complete Registration & Payment" : "Verification in Progress"}</h3>
              </div>
              <button 
                onClick={closePayModal}
                className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-300 hover:text-white hover:bg-red-600 flex items-center justify-center font-bold text-lg transition-colors"
              >
                &times;
              </button>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 text-zinc-900 space-y-4">
              {modalStep === 1 ? (
                <form onSubmit={handleSubmitProof} className="space-y-4">
                  
                  {/* Live FOMO Progress Bar */}
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs">
                    <div className="flex justify-between font-bold text-amber-900 mb-1.5">
                      <span className="flex items-center gap-1"><Flame size={14} className="text-red-600" /> Batch Filling Fast: 78/100 Seats</span>
                      <span className="text-red-600 font-mono">22 Left!</span>
                    </div>
                    <div className="w-full bg-zinc-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-amber-500 to-red-600 h-full w-[78%]" />
                    </div>
                  </div>

                  {/* Free Bonuses Stack Preview inside Modal */}
                  <div className="bg-green-50 border border-green-200 rounded-xl p-3.5 space-y-2">
                    <div className="text-xs font-bold text-green-900 flex items-center gap-1.5">
                      <Gift size={14} className="text-green-700" /> 5 Founding Bonuses Included (Worth PKR 15,499):
                    </div>
                    <div className="grid grid-cols-1 gap-1 text-[11px] text-zinc-700">
                      <div className="flex justify-between"><span>🤖 50+ AI Prompts Pack</span><span className="text-green-700 font-bold">FREE (PKR 3,000)</span></div>
                      <div className="flex justify-between"><span>🔍 Niche Research Matrix Template</span><span className="text-green-700 font-bold">FREE (PKR 2,000)</span></div>
                      <div className="flex justify-between"><span>📅 90-Day Content Calendar Planner</span><span className="text-green-700 font-bold">FREE (PKR 2,500)</span></div>
                      <div className="flex justify-between"><span>💬 7-Day WhatsApp Group Support</span><span className="text-green-700 font-bold">FREE (PKR 5,000)</span></div>
                      <div className="flex justify-between"><span>📹 Workshop Recording (24h Access)</span><span className="text-green-700 font-bold">FREE (PKR 2,999)</span></div>
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-800 mb-1">Poora Naam (Full Name) *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Muhammad Ahmed" 
                      value={fullName} 
                      onChange={(e) => setFullName(e.target.value)} 
                      required 
                      className="w-full p-3 border border-zinc-300 rounded-xl text-sm bg-zinc-50 focus:bg-white focus:border-green-600 outline-none"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-800 mb-1">WhatsApp Number *</label>
                    <input 
                      type="tel" 
                      placeholder="03xx-xxxxxxx" 
                      value={whatsappNumber} 
                      onChange={(e) => setWhatsappNumber(e.target.value)} 
                      required 
                      className="w-full p-3 border border-zinc-300 rounded-xl text-sm bg-zinc-50 focus:bg-white focus:border-green-600 outline-none"
                    />
                  </div>

                  {/* Email Optional */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-800 mb-1">Email <span className="text-zinc-400 font-normal">(Optional)</span></label>
                    <input 
                      type="email" 
                      placeholder="aap@email.com" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className="w-full p-3 border border-zinc-300 rounded-xl text-sm bg-zinc-50 focus:bg-white focus:border-green-600 outline-none"
                    />
                  </div>

                  {/* Payment Tabs */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-800 mb-1.5">Select Payment Method (Fee: PKR 1,999)</label>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("Meezan Bank")}
                        className={cn(
                          "py-2.5 px-2 text-xs font-bold rounded-xl border transition-all text-center",
                          paymentMethod === "Meezan Bank" ? "bg-[#1A1A1A] text-amber-400 border-[#1A1A1A]" : "bg-zinc-100 text-zinc-700 border-zinc-200"
                        )}
                      >
                        🏦 Meezan Bank
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("Easypaisa")}
                        className={cn(
                          "py-2.5 px-2 text-xs font-bold rounded-xl border transition-all text-center",
                          paymentMethod === "Easypaisa" ? "bg-[#1A1A1A] text-amber-400 border-[#1A1A1A]" : "bg-zinc-100 text-zinc-700 border-zinc-200"
                        )}
                      >
                        📱 Easypaisa
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("Binance")}
                        className={cn(
                          "py-2.5 px-2 text-xs font-bold rounded-xl border transition-all text-center",
                          paymentMethod === "Binance" ? "bg-[#1A1A1A] text-amber-400 border-[#1A1A1A]" : "bg-zinc-100 text-zinc-700 border-zinc-200"
                        )}
                      >
                        🟡 Binance UID
                      </button>
                    </div>

                    {/* Payment Details Card */}
                    <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl space-y-2">
                      {paymentMethod === "Meezan Bank" && (
                        <div>
                          <div className="flex justify-between items-center py-1.5 border-b border-zinc-200 text-xs">
                            <span className="text-zinc-500 font-medium">Bank:</span>
                            <span className="font-bold text-zinc-900">Meezan Bank Limited</span>
                          </div>
                          <div className="flex justify-between items-center py-1.5 border-b border-zinc-200 text-xs">
                            <span className="text-zinc-500 font-medium">Account Title:</span>
                            <span className="font-bold text-zinc-900 flex items-center gap-2">
                              Muhammad Abrar
                              <button type="button" onClick={() => copyToClipboard("Muhammad Abrar", "m_title")} className="bg-zinc-200 hover:bg-zinc-300 text-zinc-800 text-[10px] px-2 py-0.5 rounded font-bold">
                                {copiedKey === "m_title" ? "Copied ✓" : "Copy"}
                              </button>
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-1.5 border-b border-zinc-200 text-xs">
                            <span className="text-zinc-500 font-medium">Account Number:</span>
                            <span className="font-mono font-bold text-zinc-900 flex items-center gap-2">
                              02370103321036
                              <button type="button" onClick={() => copyToClipboard("02370103321036", "m_acc")} className="bg-zinc-200 hover:bg-zinc-300 text-zinc-800 text-[10px] px-2 py-0.5 rounded font-bold">
                                {copiedKey === "m_acc" ? "Copied ✓" : "Copy"}
                              </button>
                            </span>
                          </div>
                          <div className="flex justify-between items-center pt-1.5 text-xs">
                            <span className="text-zinc-500 font-medium">IBAN:</span>
                            <span className="font-mono font-bold text-zinc-900 flex items-center gap-2">
                              PK39MEZN0002370103321036
                              <button type="button" onClick={() => copyToClipboard("PK39MEZN0002370103321036", "m_iban")} className="bg-zinc-200 hover:bg-zinc-300 text-zinc-800 text-[10px] px-2 py-0.5 rounded font-bold">
                                {copiedKey === "m_iban" ? "Copied ✓" : "Copy"}
                              </button>
                            </span>
                          </div>
                        </div>
                      )}

                      {paymentMethod === "Easypaisa" && (
                        <div>
                          <div className="flex justify-between items-center py-1.5 border-b border-zinc-200 text-xs">
                            <span className="text-zinc-500 font-medium">Easypaisa Number:</span>
                            <span className="font-mono font-bold text-zinc-900 flex items-center gap-2">
                              03274532186
                              <button type="button" onClick={() => copyToClipboard("03274532186", "ep_num")} className="bg-zinc-200 hover:bg-zinc-300 text-zinc-800 text-[10px] px-2 py-0.5 rounded font-bold">
                                {copiedKey === "ep_num" ? "Copied ✓" : "Copy"}
                              </button>
                            </span>
                          </div>
                          <div className="flex justify-between items-center pt-1.5 text-xs">
                            <span className="text-zinc-500 font-medium">Account Title:</span>
                            <span className="font-bold text-zinc-900">Muhammad Abrar Ghauri</span>
                          </div>
                        </div>
                      )}

                      {paymentMethod === "Binance" && (
                        <div>
                          <div className="flex justify-between items-center py-1.5 border-b border-zinc-200 text-xs">
                            <span className="text-zinc-500 font-medium">Binance ID / UID:</span>
                            <span className="font-mono font-bold text-zinc-900 flex items-center gap-2">
                              117971802
                              <button type="button" onClick={() => copyToClipboard("117971802", "b_uid")} className="bg-zinc-200 hover:bg-zinc-300 text-zinc-800 text-[10px] px-2 py-0.5 rounded font-bold">
                                {copiedKey === "b_uid" ? "Copied ✓" : "Copy"}
                              </button>
                            </span>
                          </div>
                          <div className="flex justify-between items-center pt-1.5 text-xs">
                            <span className="text-zinc-500 font-medium">Binance Nickname:</span>
                            <span className="font-bold text-zinc-900">abrarnadircb</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Transaction ID Optional */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-800 mb-1">
                      Transaction ID / Reference Number <span className="text-zinc-400 font-normal">(Optional)</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="Agar available ho toh darj karein" 
                      value={transactionId} 
                      onChange={(e) => setTransactionId(e.target.value)} 
                      className="w-full p-3 border border-zinc-300 rounded-xl text-sm bg-zinc-50 focus:bg-white focus:border-green-600 outline-none"
                    />
                  </div>

                  {/* Screenshot Upload */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-800 mb-1">Attach Payment Screenshot *</label>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-zinc-300 hover:border-green-600 bg-zinc-50 hover:bg-green-50/50 p-4 rounded-xl text-center cursor-pointer transition-colors"
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
                          <span className="inline-block bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
                            Screenshot Attached ✓
                          </span>
                          <p className="text-xs text-zinc-600 mt-1 font-medium">{screenshotFilename}</p>
                        </div>
                      ) : (
                        <div>
                          <span className="text-2xl block mb-1">📸</span>
                          <p className="text-xs font-bold text-zinc-800">Tap to upload receipt image / PDF</p>
                          <p className="text-[10px] text-zinc-400">JPG, PNG, WEBP (Max: 10MB)</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {formError && (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-xs font-bold">
                      {formError}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white py-4 rounded-xl font-bold text-base shadow-xl transition-all active:scale-98 disabled:opacity-70"
                  >
                    {isSubmitting ? "Processing..." : "Verify Payment on WhatsApp →"}
                  </button>

                  <div className="bg-green-50 border border-green-200 text-green-900 p-2.5 rounded-xl text-xs font-bold text-center">
                    🛡️ 100% Risk-Free Guarantee: Attend live workshop, full refund if no value!
                  </div>
                </form>
              ) : (
                /* STEP 2: 10-SECOND COUNTDOWN & POLITE WAITING SCREEN */
                <div className="text-center py-6 px-2 space-y-4">
                  <div className="inline-block bg-green-100 text-green-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    ⏳ Verification Desk
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-900">
                    Thank You, {fullName.trim()}!
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-600 max-w-md mx-auto leading-relaxed">
                    Aap ki details aur payment receipt receive ho chuki hain. Hamari senior verification team aapki payment verify karke direct confirmed Zoom link aur WhatsApp group access provide karegi.
                  </p>

                  <div className="w-16 h-16 rounded-full bg-green-50 border-4 border-green-600 text-green-600 text-2xl font-black flex items-center justify-center mx-auto shadow-lg animate-pulse">
                    {countdown}s
                  </div>

                  <p className="text-xs text-zinc-400 font-medium">
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

      {/* POLICY MODALS */}
      {policyModal === "refund" && (
        <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full relative max-h-[80vh] overflow-y-auto">
            <button onClick={() => setPolicyModal(null)} className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-800 text-xl font-bold">
              &times;
            </button>
            <h3 className="text-lg font-bold mb-4 text-zinc-900">💰 100% Money-Back Guarantee Policy</h3>
            <div className="text-xs text-zinc-600 space-y-3 leading-relaxed">
              <p>We offer a <strong>100% money-back guarantee</strong>. If you attend the full 2-hour live masterclass and feel it did not deliver actionable value, message our support on WhatsApp (+92 329 6158206) within 72 hours for a 100% prompt refund with no questions asked.</p>
            </div>
          </div>
        </div>
      )}

      {policyModal === "transfer" && (
        <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full relative max-h-[80vh] overflow-y-auto">
            <button onClick={() => setPolicyModal(null)} className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-800 text-xl font-bold">
              &times;
            </button>
            <h3 className="text-lg font-bold mb-4 text-zinc-900">🔄 Seat Transfer Policy</h3>
            <div className="text-xs text-zinc-600 space-y-3 leading-relaxed">
              <p>If you cannot attend live, notify us at least 2 hours before the session (by 6:00 PM) on WhatsApp (+92 329 6158206) to transfer your seat to the next available batch free of charge.</p>
            </div>
          </div>
        </div>
      )}

      {policyModal === "disclaimer" && (
        <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full relative max-h-[80vh] overflow-y-auto">
            <button onClick={() => setPolicyModal(null)} className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-800 text-xl font-bold">
              &times;
            </button>
            <h3 className="text-lg font-bold mb-4 text-zinc-900">📋 Educational Disclaimer</h3>
            <div className="text-xs text-zinc-600 space-y-3 leading-relaxed">
              <p>This masterclass provides educational training, niche frameworks, and software tools workflows. We do NOT guarantee specific income or view counts. Success depends on individual dedication, research, content quality, and consistency.</p>
            </div>
          </div>
        </div>
      )}

      {policyModal === "privacy" && (
        <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full relative max-h-[80vh] overflow-y-auto">
            <button onClick={() => setPolicyModal(null)} className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-800 text-xl font-bold">
              &times;
            </button>
            <h3 className="text-lg font-bold mb-4 text-zinc-900">🔒 Privacy Policy</h3>
            <div className="text-xs text-zinc-600 space-y-3 leading-relaxed">
              <p>We respect your privacy. Contact details and payment receipts are collected strictly for registration confirmation, Zoom link delivery, and 7-day mentorship support.</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
