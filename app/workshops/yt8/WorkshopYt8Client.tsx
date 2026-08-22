"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Check, X, Play, ShieldCheck, 
  ArrowRight, Users, DollarSign, 
  Zap, ChevronDown, 
  TrendingUp, Home, Lock, AlertTriangle,
  MessageSquare, Monitor,
  GraduationCap, Briefcase, Heart, Smile
} from "lucide-react";
import "./yt8.css";

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
  const [selectedYear, setSelectedYear] = useState<"1st" | "2nd" | "3rd" | "4th" | "grad" | "working">("1st");
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
    return `Salam Abrar Nadir & Support Team! Main ne YouTube Empire Builders (Workshop 8 - ChatGPT Se Dollar Earning) ke liye payment transfer kar di hai.\n\n*Name:* ${fullName.trim()}\n*WhatsApp:* ${whatsappNumber.trim()}\n*Payment Method:* ${paymentMethod}${transactionId.trim() ? `\n*Transaction ID:* ${transactionId.trim()}` : ""}\n*Batch Date:* ${dynamicDate}\n*Amount Paid:* PKR 1,999\n\nI have attached my payment screenshot. Please verify and share the confirmed Zoom link & WhatsApp community invite. Shukriya! 😊`;
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
    <div className="yt8-body">
      
      {/* ANNOUNCEMENT BAR */}
      <div className="yt8-announcement-bar">
        {isAfterSeven ? (
          <span>Aaj Ki Registration Band Ho Gayi — Kal Raat 8 PM Ka Slot Ab Open Hai</span>
        ) : (
          <span>🔴 Aaj Raat 8 PM — Live Workshop | Registration {timeLeft} Mein Band | Sirf 100 Seats</span>
        )}
      </div>

      {/* HERO SECTION */}
      <header className="yt8-hero-section">
        <div className="yt8-container">
          <div className="yt8-pill-badge">
            Pakistan Ke 4-Year Bachelor&apos;s Students Ke Liye — Past. Present. Future.
          </div>

          <div className="yt8-hero-title">
            <span className="yt8-hero-line-white">Aapke Class Mein Ek Banda</span>
            <span className="yt8-hero-line-white">ChatGPT Se Exam Cheat Kar Raha Hai.</span>
            
            <span className="yt8-hero-line-amber">Ek Banda Wahi ChatGPT Se</span>
            <span className="yt8-hero-line-green">Dollar Kama Raha Hai.</span>
            
            <span className="yt8-hero-line-subwhite">Dono Ek Hi University Mein Hain.</span>
            <span className="yt8-hero-line-subwhite">Dono Ka Baap Ek Jaisi Fees Bhar Raha Hai.</span>
            
            <span className="yt8-hero-line-subgreen">Fark Sirf Ek Decision Ka Hai.</span>
          </div>

          <p className="yt8-hero-subtitle">
            <strong>YouTube Empire Builders —</strong> Pakistan ka pehla practical live workshop jo aapko woh AI system deta hai jo sote waqt bhi dollar kamaata rahe. Degree ke saath. Legally. Safely. Seedha aapke bank account mein.
          </p>

          {/* 3 Animated Stat Cards */}
          <div className="yt8-stats-grid">
            <div className="yt8-stat-card card-red">
              <div className="yt8-stat-label">4 Saal Degree Baad</div>
              <div className="yt8-stat-val">PKR 25,000</div>
              <div className="yt8-stat-sub">Average pehli salary Pakistan</div>
            </div>

            <div className="yt8-stat-card card-amber">
              <div className="yt8-stat-label">Wahi AI. Alag Use.</div>
              <div className="yt8-stat-val">60 Min/Video</div>
              <div className="yt8-stat-sub">Script → Voice → Upload → Dollar</div>
            </div>

            <div className="yt8-stat-card card-green">
              <div className="yt8-stat-label">YouTube Income</div>
              <div className="yt8-stat-val">$500/month</div>
              <div className="yt8-stat-sub">= PKR 1,39,000 — Sote Waqt Bhi</div>
            </div>
          </div>

          {/* Hero CTA */}
          <div className="max-w-xl mx-auto">
            <button onClick={openPayModal} className="yt8-cta-btn">
              <span>Aaj Raat Ka Woh Banda Banein Jo ChatGPT Sahi Use Karta Hai — PKR 1,999</span>
              <ArrowRight size={20} />
            </button>
            <p className="text-[11px] text-zinc-400 mt-3 flex items-center justify-center gap-2">
              <Lock size={12} className="text-green-500" />
              🔒 7 PM se pehle | 100 seats per batch | Legal | Safe | Bank mein aata hai
            </p>
          </div>
        </div>
      </header>

      {/* SECTION 1: THE NARRATIVE — THE TWO STUDENTS */}
      <section className="yt8-section-black">
        <div className="yt8-container">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-2 italic">
              &quot;Ek Kahani Sunao. Shayad Aap Is Mein Khud Ko Dekhein.&quot;
            </h2>
          </div>

          <div className="yt8-story-box">
            <p>
              Lahore ki ek university. Engineering department. 2022. Semester 5.<br />
              Do student. Ek hi class. Ek hi teacher. Ek hi syllabus.<br />
              Dono ke ghar se fees aa rahi hai. Dono ke abbu mehnat karte hain.
            </p>

            <div className="yt8-divider" />

            <div className="yt8-story-tag tag-bilal">Pehla banda — Bilal</div>
            <p>
              Assignment deadline aati hai. ChatGPT kholta hai. Paste. Copy. Submit.<br />
              Exam mein bhi kuch jugaad lagata hai. <em>&apos;Pass hona zaroori hai.&apos;</em><br />
              <strong>Result:</strong> A grade. Family khush. <em>&apos;Beta chal raha hai.&apos;</em>
            </p>

            <div className="yt8-divider" />

            <div className="yt8-story-tag tag-saad">Doosra banda — Saad</div>
            <p>
              Wahi ChatGPT kholta hai. Lekin woh paste nahi karta assignment mein.<br />
              Woh poochta hai: <strong>&apos;Yeh tool mujhe dollar kaise dila sakta hai?&apos;</strong><br />
              Raat ke 11 baje — jab Bilal so raha hota hai — Saad apne laptop par hota hai.<br />
              ChatGPT se YouTube script likhta hai. AI voice tool se voiceover banata hai. Free editing tool se video complete karta hai. Upload karta hai. So jaata hai.
            </p>

            <div className="yt8-divider" />

            <p>
              <strong>Semester 6. Final exams.</strong><br />
              <strong>Bilal:</strong> Phir ChatGPT. Phir copy. Phir grade.<br />
              <strong>Saad:</strong> Channel par 15 videos. Pehli 1,000 views. Thodi si earning shuru.
            </p>

            <div className="yt8-divider" />

            <p>
              <strong>Graduation day.</strong><br />
              Dono stage par aate hain. Dono degree lete hain. Dono families khush hain. Photos khinchti hain.
            </p>

            <div className="yt8-divider" />

            <p>
              <strong>6 mahine baad graduation ke:</strong><br />
              <span className="text-red-400 font-bold">Bilal:</span> 200+ job applications. 13 rejections. 2 interviews. Ek offer — PKR 32,000/month. <em>&apos;Yeh toh socha nahi tha.&apos;</em><br /><br />
              <span className="text-green-400 font-bold">Saad:</span> YouTube channel — 2,847 subscribers. $340/month. <strong>PKR 94,520 monthly.</strong> Ghar baith kar. Laptop se. Sote waqt bhi.
            </p>

            <div className="yt8-divider" />

            <p className="italic text-zinc-300">
              Aur Bilal kya kar raha hai? PKR 32,000 mein se ghar ka kharcha, transport, lunch.<br />
              Saad ko message karta hai: <em>&apos;Yaar — yeh tu kab se kar raha tha? Mujhe kyun nahi bataya?&apos;</em><br />
              Saad ka jawab: <strong>&apos;Bataya tha na — tune kaha tha: yaar exam pe focus kar.&apos;</strong>
            </p>

            <div className="mt-8 p-6 bg-[#0F1D32] border border-green-500/30 rounded-xl text-center">
              <p className="text-lg font-serif italic text-white mb-0">
                Yeh Bilal aur Saad ki kahani nahi. Yeh Pakistan ki har university ki kahani hai. Aaj bhi. Is waqt bhi.<br />
                <span className="text-[#22C55E] font-bold text-xl block mt-2">Aap Bilal hain ya Saad — yeh aaj raat decide hoga.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: SAME AI. COMPLETELY DIFFERENT USE */}
      <section className="yt8-section-light">
        <div className="yt8-container">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-bold text-[#0F172A] mb-2">
              Wahi ChatGPT. Wahi AI Tools. Wahi Internet. Bilkul Alag Zindagi.
            </h2>
          </div>

          <div className="yt8-compare-grid">
            {/* Left Column (Galat Use) */}
            <div className="yt8-compare-col col-wrong">
              <h3>❌ Galat Use (Bilal Path)</h3>
              <ul className="yt8-compare-list">
                <li className="yt8-compare-item">
                  <strong>ChatGPT se assignment copy:</strong><br />
                  Result: Grade jo 4 saal baad kisi ko yaad nahi hoga.
                </li>
                <li className="yt8-compare-item">
                  <strong>AI se exam answers:</strong><br />
                  Result: Degree jo PKR 25K/month ki naukri dilayegi.
                </li>
                <li className="yt8-compare-item">
                  <strong>AI se notes banana:</strong><br />
                  Result: Professor khush. Future — same hi rehega.
                </li>
                <li className="yt8-compare-item">
                  <strong>4 saal AI tools use kiye:</strong><br />
                  Result: Ek CV. Ek job. Ek salary. Ek boss. Ek schedule.
                </li>
              </ul>
              <div className="yt8-compare-footer text-red-700">
                Total investment: 4 saal + lakhon rupay<br />
                Total return: PKR 25,000-45,000/month (Kisi aur ke liye kaam karna)
              </div>
            </div>

            {/* Right Column (Sahi Use) */}
            <div className="yt8-compare-col col-right">
              <h3>✅ Sahi Use (Saad Path)</h3>
              <ul className="yt8-compare-list">
                <li className="yt8-compare-item">
                  <strong>ChatGPT se YouTube script:</strong><br />
                  Result: Video jo 3 saal tak views laata rahega.
                </li>
                <li className="yt8-compare-item">
                  <strong>AI voice tools se voiceover:</strong><br />
                  Result: Professional quality audio. Zero cost. Zero studio.
                </li>
                <li className="yt8-compare-item">
                  <strong>AI se research aur topics:</strong><br />
                  Result: Content jo algorithm push karta hai.
                </li>
                <li className="yt8-compare-item">
                  <strong>AI se thumbnail ideas:</strong><br />
                  Result: High click-through rate. Zyada views. Zyada dollar.
                </li>
              </ul>
              <div className="yt8-compare-footer text-green-700">
                Total investment: 2-3 ghante daily<br />
                Total return: Dollar income — growing (Apne liye kaam karna. Khud ka owner)
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <p className="font-mono text-sm font-bold uppercase text-zinc-600 mb-4">
              SAME TOOL • SAME STUDENT AGE • SAME PAKISTAN<br />
              <span className="text-[#0F172A]">EK RESULT: Kisi Ka Naukr • DOOSRA RESULT: Apna Boss</span>
            </p>
            <button onClick={openPayModal} className="yt8-cta-btn">
              <span>Mujhe Sahi Use Seekhna Hai →</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE GLIMPSE — 4-YEAR DEGREE HOLDERS KA HAAL */}
      <section className="yt8-section-dark">
        <div className="yt8-container">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2">
              Pakistan Mein 4-Year Degree Ke Baad Kya Actually Hota Hai?
            </h2>
            <p className="text-zinc-400 text-sm font-mono">Numbers. Real. 2025-2026.</p>
          </div>

          {/* Degree stats */}
          <div className="yt8-numbers-grid">
            <div className="yt8-number-card">
              <div className="yt8-number-val val-red">4,00,000+</div>
              <div className="yt8-number-title">Graduates Har Saal</div>
              <div className="yt8-number-sub">Har saal. Ek hi market mein.</div>
            </div>
            <div className="yt8-number-card">
              <div className="yt8-number-val val-red">30%+</div>
              <div className="yt8-number-title">Graduate Unemployment</div>
              <div className="yt8-number-sub">Official figure. Real shayad zyada.</div>
            </div>
            <div className="yt8-number-card">
              <div className="yt8-number-val val-red">PKR 25,000</div>
              <div className="yt8-number-title">Average Starting Salary</div>
              <div className="yt8-number-sub">4 saal baad. Lakhon invest karke.</div>
            </div>
            <div className="yt8-number-card">
              <div className="yt8-number-val val-amber">6-8 Mahine</div>
              <div className="yt8-number-title">Job Hunt Duration</div>
              <div className="yt8-number-sub">CV bhejne se pehli job tak.</div>
            </div>
            <div className="yt8-number-card">
              <div className="yt8-number-val val-amber">20%+</div>
              <div className="yt8-number-title">Annual Inflation</div>
              <div className="yt8-number-sub">Aapki salary is se tez nahi badhti.</div>
            </div>
            <div className="yt8-number-card">
              <div className="yt8-number-val val-red">PKR 833</div>
              <div className="yt8-number-title">Per Din ROI</div>
              <div className="yt8-number-sub">PKR 25K/30 days degree daily return.</div>
            </div>
          </div>

          {/* YouTube Income Stats */}
          <div className="text-center my-6">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">─────── Aur Doosri Taraf ───────</span>
          </div>

          <div className="yt8-numbers-grid">
            <div className="yt8-number-card">
              <div className="yt8-number-val val-green">$70 Billion+</div>
              <div className="yt8-number-title">YouTube Creators Payout</div>
              <div className="yt8-number-sub">Pakistan ka hissa abhi bhi available hai.</div>
            </div>
            <div className="yt8-number-card">
              <div className="yt8-number-val val-green">$500/Month</div>
              <div className="yt8-number-title">= PKR 1,39,000</div>
              <div className="yt8-number-sub">Ek average channel. Sote waqt.</div>
            </div>
            <div className="yt8-number-card">
              <div className="yt8-number-val val-green">40M+</div>
              <div className="yt8-number-title">YouTube Users Pakistan</div>
              <div className="yt8-number-sub">Audience exist karti hai. Creator kahan hai?</div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="yt8-table-wrap">
            <table className="yt8-table">
              <thead>
                <tr>
                  <th className="text-red-400">DEGREE PATH</th>
                  <th className="text-green-400">YOUTUBE PATH</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                <tr><td>4 saal invest</td><td className="text-green-400 font-bold">6-12 mahine</td></tr>
                <tr><td>PKR 4-25 lakh kharcha</td><td className="text-green-400 font-bold">PKR 0 start</td></tr>
                <tr><td>PKR 25K/month</td><td className="text-green-400 font-bold">$500+/month possible</td></tr>
                <tr><td>Ek employer</td><td className="text-green-400 font-bold">Duniya ki audience</td></tr>
                <tr><td>9-6 schedule</td><td className="text-green-400 font-bold">Apna waqt</td></tr>
                <tr><td>Boss ki marzi</td><td className="text-green-400 font-bold">Apni marzi</td></tr>
                <tr><td>PKR girtaa rahega</td><td className="text-green-400 font-bold">Dollar badhta rahega</td></tr>
                <tr><td>Retire = income zero</td><td className="text-green-400 font-bold">Channel chalti rahe</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHAT YOU BUILD WHILE THEY SLEEP */}
      <section className="yt8-section-black">
        <div className="yt8-container">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2">
              Woh So Rahe Hain. Aap Apna Future Build Kar Rahe Hain. Channel Kaam Kar Raha Hai.
            </h2>
          </div>

          <div className="yt8-story-box">
            <div className="p-6 bg-[#0F1D32] border border-white/10 rounded-2xl space-y-6">
              <div>
                <div className="text-amber-400 font-mono font-bold text-xs">RAAT 11 PM:</div>
                <p className="text-sm text-zinc-300 mt-1 mb-0">
                  <strong>Bilal:</strong> Mobile scroll. TikTok. Instagram. So gaya.<br />
                  <strong>Aap:</strong> ChatGPT se script complete ki. AI voice se voiceover banaya. Video upload kar diya. So gaye.
                </p>
              </div>

              <div>
                <div className="text-amber-400 font-mono font-bold text-xs">RAAT 2 AM:</div>
                <p className="text-sm text-zinc-300 mt-1 mb-0">
                  <strong>Bilal:</strong> Neend mein hai.<br />
                  <strong>Aapka video:</strong> Views aa rahe hain. Algorithm push kar raha hai. Watch time build ho raha hai.
                </p>
              </div>

              <div>
                <div className="text-green-400 font-mono font-bold text-xs">SUBAH 7 AM:</div>
                <p className="text-sm text-zinc-300 mt-1 mb-0">
                  <strong>Bilal:</strong> Uthega. University jayega. Class mein baithega.<br />
                  <strong>Aap uthein ge:</strong> YouTube Studio khulega. Views: +847 last night. Estimated earnings: +$2.40. <em>&apos;Neend mein dollar aaya.&apos;</em>
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-zinc-300 text-sm mb-4">
                Month 1: 1 video → 200 views/day &nbsp;|&nbsp; Month 6: 45 videos → 2,500 views/day &nbsp;|&nbsp; Month 12: 100 videos → 8,000 views/day
              </p>
              <button onClick={openPayModal} className="yt8-cta-btn">
                <span>Mujhe Yeh Asset Banana Hai — Aaj Raat Se →</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: YOUTUBE EMPIRE BUILDERS — KYA MILTA HAI */}
      <section className="yt8-section-dark">
        <div className="yt8-container">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2">
              YouTube Empire Builders: Woh System Jo Saad Ke Paas Tha.
            </h2>
            <p className="text-zinc-400 text-sm font-mono">2-Hour Practical Live Workshop Breakdown</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Hour 1 */}
            <div className="p-6 bg-[#0F1D32] border border-white/10 rounded-2xl">
              <div className="text-xs font-mono font-bold text-green-400 mb-1">HOUR 1 — 8:00 PM to 9:00 PM</div>
              <h3 className="text-lg font-bold text-white mb-3">Digital Zameen Ka Plot Select Karo</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                <li className="flex gap-2"><Check size={16} className="text-green-500 shrink-0" /> Pakistan se HIGHEST dollar RPM niches (Finance, Tech, Health)</li>
                <li className="flex gap-2"><Check size={16} className="text-green-500 shrink-0" /> Faceless channel setup — zero camera, zero face</li>
                <li className="flex gap-2"><Check size={16} className="text-green-500 shrink-0" /> Competitor research live workflow</li>
                <li className="flex gap-2"><Check size={16} className="text-green-500 shrink-0" /> 90-day content calendar for students</li>
              </ul>
              <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-xs text-green-400 font-bold">
                OUTCOME: Niche & channel direction clear
              </div>
            </div>

            {/* Hour 2 */}
            <div className="p-6 bg-[#0F1D32] border border-white/10 rounded-2xl">
              <div className="text-xs font-mono font-bold text-green-400 mb-1">HOUR 2 — 9:00 PM to 10:00 PM</div>
              <h3 className="text-lg font-bold text-white mb-3">AI Ko Apna Kaamgar Banao — Live Demo</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                <li className="flex gap-2"><Check size={16} className="text-green-500 shrink-0" /> Topic research AI se (10 min)</li>
                <li className="flex gap-2"><Check size={16} className="text-green-500 shrink-0" /> Scripting ChatGPT se (10 min)</li>
                <li className="flex gap-2"><Check size={16} className="text-green-500 shrink-0" /> Pro AI Voiceover (5 min)</li>
                <li className="flex gap-2"><Check size={16} className="text-green-500 shrink-0" /> Fast editing & monetization roadmap (15 min)</li>
              </ul>
              <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-xs text-green-400 font-bold">
                OUTCOME: Complete publish-ready process live
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: THE LEGAL + SAFE + BANK MEIN — FULL CLARITY */}
      <section className="yt8-section-light">
        <div className="yt8-container">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-bold text-[#0F172A] mb-2">
              Ruko. Ek Zaroori Sawaal: Dollar Bank Mein Kaise Aata Hai?
            </h2>
            <p className="text-zinc-600 text-sm max-w-2xl mx-auto">
              Pakistan mein online earning ke naam par frauds se bachein. YouTube Google ka 100% legal platform hai. Yeh exact 7-step process hai:
            </p>
          </div>

          <div className="yt8-steps-grid">
            <div className="yt8-step-card">
              <div className="yt8-step-num">1</div>
              <div className="yt8-step-content">
                <h4>YouTube Channel</h4>
                <p>Faceless channel banate hain Pakistan se. YouTube Google ki free company hai.</p>
              </div>
            </div>

            <div className="yt8-step-card">
              <div className="yt8-step-num">2</div>
              <div className="yt8-step-content">
                <h4>Content Upload</h4>
                <p>AI se high-RPM content banakar upload karte hain.</p>
              </div>
            </div>

            <div className="yt8-step-card">
              <div className="yt8-step-num">3</div>
              <div className="yt8-step-content">
                <h4>YouTube Partner Program (YPP)</h4>
                <p>1,000 subs + 4,000 watch hours ke baad direct Google official monetization activate hoti hai.</p>
              </div>
            </div>

            <div className="yt8-step-card">
              <div className="yt8-step-num">4</div>
              <div className="yt8-step-content">
                <h4>Google AdSense</h4>
                <p>International advertisers (US/UK) dollar mein Google ko pay karte hain.</p>
              </div>
            </div>

            <div className="yt8-step-card">
              <div className="yt8-step-num">5</div>
              <div className="yt8-step-content">
                <h4>Payment Transfer (Payoneer / Wire)</h4>
                <p>Google se dollar direct Payoneer ya direct Pakistani Bank transfer hota hai.</p>
              </div>
            </div>

            <div className="yt8-step-card">
              <div className="yt8-step-num">6</div>
              <div className="yt8-step-content">
                <h4>Pakistani Bank Account Mein Deposit</h4>
                <p>Meezan Bank, HBL, UBL, Alfalah mein direct PKR convert hokar monthly receive hota hai.</p>
              </div>
            </div>

            <div className="yt8-step-card">
              <div className="yt8-step-num">7</div>
              <div className="yt8-step-content">
                <h4>Legal SBP & FBR Compliance</h4>
                <p>State Bank of Pakistan digital income recognize karti hai aur tax rebate deti hai.</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <button onClick={openPayModal} className="yt8-cta-btn">
              <span>Haan — Mujhe Yeh Legal System Chahiye →</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 8: THE 4-YEAR CLOCK — INTERACTIVE CALCULATOR */}
      <section className="yt8-section-dark">
        <div className="yt8-container">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2">
              Aap Abhi Kahan Hain? Aur Agar Aaj Shuru Karein — Kahan Honge?
            </h2>
            <p className="text-zinc-400 text-sm font-mono">Apna academic status select karein:</p>
          </div>

          {/* Year selector buttons */}
          <div className="yt8-year-tabs">
            {[
              { id: "1st", label: "1st Year" },
              { id: "2nd", label: "2nd Year" },
              { id: "3rd", label: "3rd Year" },
              { id: "4th", label: "4th Year" },
              { id: "grad", label: "Graduate" },
              { id: "working", label: "Working / Job" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedYear(tab.id as any)}
                className={`yt8-year-btn ${selectedYear === tab.id ? "active" : ""}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Dynamic Content */}
          <div className="yt8-year-content-box">
            {selectedYear === "1st" && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-green-400">Sabse Zyada Waqt. Sabse Bada Moka.</h3>
                <p className="text-sm text-zinc-300">
                  <strong>Year 1 End:</strong> Channel setup complete • 30-50 videos • First monetization nazar aa rahi hai.<br />
                  <strong>Year 2:</strong> Monetized channel • $100-300/month (PKR 28K-83K apna kharcha khud).<br />
                  <strong>Year 4 + Graduation:</strong> Degree haath mein + $500-1,500/month (PKR 1,39,000-4,17,000/month). Job ki zaroorat nahi — choice hai!
                </p>
              </div>
            )}

            {selectedYear === "2nd" && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-green-400">2.5 Saal Baaki. Abhi Bhi Excellent Time.</h3>
                <p className="text-sm text-zinc-300">
                  <strong>Semester 3-4:</strong> Learning + Setup • First 20-30 videos.<br />
                  <strong>Semester 5-6:</strong> First monetization • $50-200/month.<br />
                  <strong>Graduation:</strong> Channel earning while classmates hunt for CV templates.
                </p>
              </div>
            )}

            {selectedYear === "3rd" && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-green-400">1.5 Saal. Tight Hai — Lekin Possible.</h3>
                <p className="text-sm text-zinc-300">
                  3rd year shuru karna mushkil hai lekin &apos;perfect time&apos; kabhi nahi aata. Next 8-10 months mein channel ready hojayega aur graduation pe second income stream hogi.
                </p>
              </div>
            )}

            {selectedYear === "4th" && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-amber-400">Last Chance Before The Real World Hits.</h3>
                <p className="text-sm text-zinc-300">
                  4th year end pe 50+ videos hongi. 6 months post-grad pe $50-150/month monetization possible. Warna PKR 25K job ke baad thak kar kabhi start nahi kar payenge.
                </p>
              </div>
            )}

            {selectedYear === "grad" && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-green-400">Degree Ho Gayi. Kya Bahut Der Ho Gayi?</h3>
                <p className="text-sm text-zinc-300">
                  Jawab: Nahi. Month 1-6 learning, Month 6-12 first earning, Month 12-18 $200-500/month realistic. 2 saal baad pachtane se behtar hai aaj start karein.
                </p>
              </div>
            )}

            {selectedYear === "working" && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-green-400">Naukri Chal Rahi Hai. Lekin Kuch Aur Chahiye.</h3>
                <p className="text-sm text-zinc-300">
                  PKR 30-45K salary vs 20%+ inflation. Shaam ke 2 ghante YouTube ko dein. 12 mahine baad naukri quit karne ka option aapke haath mein hoga.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 9: WHAT YOU GET (DELIVERABLES & BONUSES) */}
      <section className="yt8-section-black">
        <div className="yt8-container">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2">
              Workshop Ke Baad Aapke Paas Kya Hoga
            </h2>
            <p className="text-zinc-400 text-sm font-mono">10 Practical Deliverables + 5 Founding Bonuses</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto mb-10">
            {[
              { title: "🤖 AI Prompts Pack (50+ prompts)", val: "3,000" },
              { title: "🔍 Niche Research Template", val: "2,000" },
              { title: "📅 90-Day Content Calendar", val: "2,500" },
              { title: "💬 Private WhatsApp Group 7 Days", val: "5,000" },
              { title: "📹 Workshop Recording 24 Hours", val: "2,999" },
            ].map((b, i) => (
              <div key={i} className="p-4 bg-[#0F1D32] border border-white/10 rounded-xl flex justify-between items-center">
                <span className="text-sm font-bold text-zinc-200">{b.title}</span>
                <span className="text-xs font-mono text-green-400 font-bold">PKR {b.val} (FREE)</span>
              </div>
            ))}
          </div>

          {/* Final Value Box */}
          <div className="max-w-xl mx-auto bg-gradient-to-b from-[#0F1D32] to-[#040A12] border-2 border-green-500 p-8 rounded-2xl text-center shadow-2xl">
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1">Total Value: PKR 15,499</div>
            <div className="text-4xl sm:text-5xl font-mono font-black text-green-400 mb-6">PKR 1,999</div>
            <button onClick={openPayModal} className="yt8-cta-btn w-full">
              <span>Aaj Raat Ki Seat Lock Karein →</span>
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-4 bg-[#040A12] border-t border-white/10 text-center text-zinc-500 text-xs">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="font-bold text-white text-base">YouTube Empire Builders</div>
          <div className="flex justify-center gap-6 text-zinc-400 pt-2">
            <button type="button" onClick={() => setPolicyModal("refund")} className="hover:text-white underline">Refund Policy</button>
            <button type="button" onClick={() => setPolicyModal("privacy")} className="hover:text-white underline">Privacy</button>
            <a href={`https://wa.me/${TEAM_WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="hover:text-white underline">WhatsApp Support (+92 329 6158206)</a>
          </div>
          <p className="text-[11px] text-zinc-600 pt-3">
            Disclaimer: YouTube is a long-term content business. Individual results vary. © 2026 YouTube Empire Builders — Abrar Nadir
          </p>
        </div>
      </footer>

      {/* FLOATING MOBILE CTA */}
      <div className={`yt8-sticky-mobile-cta ${floatingVisible ? "visible" : ""}`}>
        <div className="yt8-sticky-price">
          <span>Fee: <strong className="amount">PKR 1,999</strong></span>
          <span>100 Seats Max</span>
        </div>
        <button onClick={openPayModal} className="sticky-btn">
          Seat Lock Karein ✓
        </button>
      </div>

      {/* ALL-IN-ONE REGISTRATION & PAYMENT POPUP */}
      {payModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-[#0F1D32] text-white w-full max-w-xl rounded-t-3xl sm:rounded-3xl border-t-4 sm:border-2 border-green-500 shadow-2xl max-h-[94vh] flex flex-col overflow-hidden">
            
            {/* Header */}
            <div className="bg-[#07111F] p-4 sm:p-5 flex items-center justify-between border-b border-white/10">
              <div>
                <div className="text-[11px] font-mono text-green-400 font-bold uppercase">YouTube Empire Builders</div>
                <h3 className="text-base sm:text-lg font-bold">{modalStep === 1 ? "Complete Registration & Payment" : "Verification in Progress"}</h3>
              </div>
              <button onClick={closePayModal} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-red-600">
                &times;
              </button>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 text-zinc-200">
              {modalStep === 1 ? (
                <form onSubmit={handleSubmitProof} className="space-y-4">
                  
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold mb-1">Full Name *</label>
                    <input 
                      type="text" 
                      placeholder="Apna mukammal naam likhein" 
                      value={fullName} 
                      onChange={(e) => setFullName(e.target.value)} 
                      required 
                      className="w-full p-3 border border-white/10 rounded-xl text-sm bg-[#07111F] text-white focus:border-green-500 outline-none"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold mb-1">WhatsApp Number *</label>
                    <input 
                      type="tel" 
                      placeholder="03xx-xxxxxxx" 
                      value={whatsappNumber} 
                      onChange={(e) => setWhatsappNumber(e.target.value)} 
                      required 
                      className="w-full p-3 border border-white/10 rounded-xl text-sm bg-[#07111F] text-white focus:border-green-500 outline-none"
                    />
                  </div>

                  {/* Payment Tabs */}
                  <div>
                    <label className="block text-xs font-bold mb-1">Select Payment Method (Fee: PKR 1,999)</label>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("Meezan Bank")}
                        className={`py-2.5 px-2 text-xs font-bold rounded-xl border transition-all ${paymentMethod === "Meezan Bank" ? "bg-green-600 text-white border-green-500" : "bg-[#07111F] text-zinc-400 border-white/10"}`}
                      >
                        🏦 Meezan Bank
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("Easypaisa")}
                        className={`py-2.5 px-2 text-xs font-bold rounded-xl border transition-all ${paymentMethod === "Easypaisa" ? "bg-green-600 text-white border-green-500" : "bg-[#07111F] text-zinc-400 border-white/10"}`}
                      >
                        📱 Easypaisa
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("Binance")}
                        className={`py-2.5 px-2 text-xs font-bold rounded-xl border transition-all ${paymentMethod === "Binance" ? "bg-green-600 text-white border-green-500" : "bg-[#07111F] text-zinc-400 border-white/10"}`}
                      >
                        🟡 Binance UID
                      </button>
                    </div>

                    {/* Payment Details Card */}
                    <div className="bg-[#07111F] border border-white/10 p-4 rounded-xl space-y-2">
                      {paymentMethod === "Meezan Bank" && (
                        <div>
                          <div className="flex justify-between items-center py-1.5 border-b border-white/10 text-xs">
                            <span className="text-zinc-400">Bank:</span>
                            <span className="font-bold text-white">Meezan Bank Limited</span>
                          </div>
                          <div className="flex justify-between items-center py-1.5 border-b border-white/10 text-xs">
                            <span className="text-zinc-400">Account Title:</span>
                            <span className="font-bold text-white flex items-center gap-2">
                              Muhammad Abrar
                              <button type="button" onClick={() => copyToClipboard("Muhammad Abrar", "m_title")} className="bg-white/10 hover:bg-white/20 text-xs px-2 py-0.5 rounded font-bold">
                                {copiedKey === "m_title" ? "Copied ✓" : "Copy"}
                              </button>
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-1.5 border-b border-white/10 text-xs">
                            <span className="text-zinc-400">Account Number:</span>
                            <span className="font-mono font-bold text-white flex items-center gap-2">
                              02370103321036
                              <button type="button" onClick={() => copyToClipboard("02370103321036", "m_acc")} className="bg-white/10 hover:bg-white/20 text-xs px-2 py-0.5 rounded font-bold">
                                {copiedKey === "m_acc" ? "Copied ✓" : "Copy"}
                              </button>
                            </span>
                          </div>
                          <div className="flex justify-between items-center pt-1.5 text-xs">
                            <span className="text-zinc-400">IBAN:</span>
                            <span className="font-mono font-bold text-white flex items-center gap-2">
                              PK39MEZN0002370103321036
                              <button type="button" onClick={() => copyToClipboard("PK39MEZN0002370103321036", "m_iban")} className="bg-white/10 hover:bg-white/20 text-xs px-2 py-0.5 rounded font-bold">
                                {copiedKey === "m_iban" ? "Copied ✓" : "Copy"}
                              </button>
                            </span>
                          </div>
                        </div>
                      )}

                      {paymentMethod === "Easypaisa" && (
                        <div>
                          <div className="flex justify-between items-center py-1.5 border-b border-white/10 text-xs">
                            <span className="text-zinc-400">Easypaisa Number:</span>
                            <span className="font-mono font-bold text-white flex items-center gap-2">
                              03274532186
                              <button type="button" onClick={() => copyToClipboard("03274532186", "ep_num")} className="bg-white/10 hover:bg-white/20 text-xs px-2 py-0.5 rounded font-bold">
                                {copiedKey === "ep_num" ? "Copied ✓" : "Copy"}
                              </button>
                            </span>
                          </div>
                          <div className="flex justify-between items-center pt-1.5 text-xs">
                            <span className="text-zinc-400">Account Title:</span>
                            <span className="font-bold text-white">Muhammad Abrar Ghauri</span>
                          </div>
                        </div>
                      )}

                      {paymentMethod === "Binance" && (
                        <div>
                          <div className="flex justify-between items-center py-1.5 border-b border-white/10 text-xs">
                            <span className="text-zinc-400">Binance ID / UID:</span>
                            <span className="font-mono font-bold text-white flex items-center gap-2">
                              117971802
                              <button type="button" onClick={() => copyToClipboard("117971802", "b_uid")} className="bg-white/10 hover:bg-white/20 text-xs px-2 py-0.5 rounded font-bold">
                                {copiedKey === "b_uid" ? "Copied ✓" : "Copy"}
                              </button>
                            </span>
                          </div>
                          <div className="flex justify-between items-center pt-1.5 text-xs">
                            <span className="text-zinc-400">Binance Nickname:</span>
                            <span className="font-bold text-white">abrarnadircb</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* TID Optional */}
                  <div>
                    <label className="block text-xs font-bold mb-1">
                      Transaction ID / Reference Number <span className="text-zinc-400 font-normal">(Optional)</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="Agar available ho toh darj karein" 
                      value={transactionId} 
                      onChange={(e) => setTransactionId(e.target.value)} 
                      className="w-full p-3 border border-white/10 rounded-xl text-sm bg-[#07111F] text-white focus:border-green-500 outline-none"
                    />
                  </div>

                  {/* Screenshot Upload */}
                  <div>
                    <label className="block text-xs font-bold mb-1">Attach Payment Screenshot *</label>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-white/20 hover:border-green-500 bg-[#07111F] p-4 rounded-xl text-center cursor-pointer transition-colors"
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
                          <p className="text-xs text-zinc-300 mt-1">{screenshotFilename}</p>
                        </div>
                      ) : (
                        <div>
                          <span className="text-2xl block mb-1">📸</span>
                          <p className="text-xs font-bold text-white">Tap to upload receipt image / PDF</p>
                          <p className="text-[10px] text-zinc-400">JPG, PNG, WEBP (Max: 10MB)</p>
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
                    className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white py-4 rounded-xl font-bold text-base shadow-xl transition-all disabled:opacity-70"
                  >
                    {isSubmitting ? "Processing..." : "Verify Payment on WhatsApp →"}
                  </button>
                </form>
              ) : (
                /* STEP 2: 10-SECOND COUNTDOWN & POLITE WAITING SCREEN */
                <div className="text-center py-6 px-2 space-y-4">
                  <div className="inline-block bg-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-green-500/30">
                    ⏳ Verification Desk
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Thank You, {fullName.trim()}!
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                    Aap ki details aur payment receipt receive ho chuki hain. Hamari senior verification team aapki payment verify karke direct confirmed Zoom link aur WhatsApp group access provide karegi.
                  </p>

                  <div className="w-16 h-16 rounded-full bg-green-500/10 border-4 border-green-500 text-green-400 text-2xl font-black flex items-center justify-center mx-auto shadow-lg animate-pulse">
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

      {/* POLICY MODAL */}
      {policyModal && (
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0F1D32] border border-white/10 text-white rounded-2xl p-6 max-w-lg w-full relative max-h-[80vh] overflow-y-auto">
            <button onClick={() => setPolicyModal(null)} className="absolute top-4 right-4 text-zinc-400 hover:text-white text-xl font-bold">
              &times;
            </button>
            <h3 className="text-lg font-bold mb-4 text-white">
              {policyModal === "refund" ? "💰 100% Refund Policy" : "🔒 Privacy Policy"}
            </h3>
            <div className="text-xs text-zinc-300 space-y-3 leading-relaxed">
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
