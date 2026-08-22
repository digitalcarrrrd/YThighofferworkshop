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
import "./yt7.css";

const TEAM_WHATSAPP_NUMBER = "923296158206";

export default function WorkshopYt7Client() {
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
  const [selectedYear, setSelectedYear] = useState<"1st" | "2nd" | "3rd" | "4th" | "grad1" | "grad2">("1st");
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);
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
    return `Salam Abrar Nadir & Support Team! Main ne YouTube Empire Builders (4 Saal Ki Degree vs Dollar) Live Workshop ke liye payment transfer kar di hai.\n\n*Name:* ${fullName.trim()}\n*WhatsApp:* ${whatsappNumber.trim()}\n*Payment Method:* ${paymentMethod}${transactionId.trim() ? `\n*Transaction ID:* ${transactionId.trim()}` : ""}\n*Batch Date:* ${dynamicDate}\n*Amount Paid:* PKR 1,999\n\nI have attached my payment screenshot. Please verify and share the confirmed Zoom link & WhatsApp community invite. Shukriya! 😊`;
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
      await fetch("/api/yt7-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: whatsappNumber.trim(),
          paymentMethod: paymentMethod === "Meezan Bank" ? "Bank Transfer" : paymentMethod,
          transactionId: transactionId.trim() || "N/A",
          batchDate: dynamicDate,
          academicYear: selectedYear,
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
          content_name: "YouTube Empire Builders Workshop 7",
        });
      }

      setIsSubmitting(false);
      setModalStep(2); // 10-second redirect screen
    } catch {
      setIsSubmitting(false);
      setModalStep(2);
    }
  };

  const faqs = [
    { q: "Kya degree ke saath waqt milega?", a: "2 ghante roz. Woh waqt aaj bhi hai — scroll mein ja raha hai. Sirf redirect karna hai." },
    { q: "Kya mujhe degree chhodni hogi?", a: "Bilkul nahi. Parallel build karo. Degree + YouTube = Best combination." },
    { q: "Exam period mein channel kaise chalega?", a: "Scheduling tools hain. Pehle se content banao. Auto-publish hota rahega." },
    { q: "Kya parents maan jayenge?", a: "Jab pehli earning aayegi — woh khud maan jayenge. Tab tak — quietly build karo." },
    { q: "Kya face dikhana hoga?", a: "Nahi. Faceless channels. Koi nahi jaanta. Koi nahi dekhta." },
    { q: "Meri niche kya hogi — degree related?", a: "Zaroor nahi. Jis niche mein dollar RPM zyada ho woh choose karni hai. Degree field optional hai." },
    { q: "Kitne waqt mein pehli earning?", a: "Realistic: 6-12 mahine. Koi guarantee nahi. Lekin jo consistent rahe — result aata hai." },
    { q: "PKR 1,999 afford nahi hota.", a: "Seedha jawab: Ek din ki outing ka kharcha hai yeh. Ya do teen chai ke paise. Agar yeh afford nahi hota — toh income build karna aur bhi zaruri hai." }
  ];

  return (
    <div className="yt7-body">
      
      {/* ANNOUNCEMENT BAR */}
      <div className="yt7-announcement-bar">
        {isAfterSeven ? (
          <span>Aaj Ki Registration Band Ho Gayi — Kal Raat 8 PM Ka Slot Ab Open Hai</span>
        ) : (
          <span>🔴 Aaj Raat 8 PM Live — Registration {timeLeft} Mein Band — Sirf 100 Seats — Degree Students Ke Liye Special Batch</span>
        )}
      </div>

      {/* HERO SECTION */}
      <header className="yt7-hero-section">
        <div className="yt7-container">
          <div className="yt7-pill-badge">
            Pakistan Ke University Students, Graduates Aur Woh Jinhon Ne Degree Le Li — Lekin Zindagi Abhi Shuru Nahi Hui
          </div>

          <div className="yt7-hero-title">
            <span className="yt7-hero-line-white">4 Saal.</span>
            <span className="yt7-hero-line-white">Lakhon Rupay.</span>
            <span className="yt7-hero-line-red">Aur Pehli Job PKR 25,000.</span>
            
            <span className="yt7-hero-line-white mt-4 block">Yeh System Ne Kiya.</span>
            <span className="yt7-hero-line-white block">Aap Ne Nahi.</span>
            
            <span className="yt7-hero-line-green">Ab Aapki Baari Hai.</span>
          </div>

          <p className="yt7-hero-subtitle">
            Degree ke saath — ya degree ke baad — YouTube automation se ek aisi income build karo jo semester mein bhi chalti rahe, exams mein bhi chalti rahe, aur graduation par already waiting ho.<br />
            <strong>Aaj raat 2 ghante. Poora system. Live. Screen-share ke saath.</strong>
          </p>

          {/* 3 Floating Stat Cards */}
          <div className="yt7-stats-grid">
            <div className="yt7-stat-card card-red">
              <div className="yt7-stat-top">Aapki Degree Ki Total Cost</div>
              <div className="yt7-stat-num">PKR 4–25 Lakh</div>
              <div className="yt7-stat-bot">4 Saal Invest</div>
            </div>

            <div className="yt7-stat-card card-amber">
              <div className="yt7-stat-top">Pehli Job Ki Average Salary</div>
              <div className="yt7-stat-num">PKR 25,000/Mo</div>
              <div className="yt7-stat-bot">= PKR 833/Din</div>
            </div>

            <div className="yt7-stat-card card-green">
              <div className="yt7-stat-top">YouTube $500/Month</div>
              <div className="yt7-stat-num">PKR 1,39,000</div>
              <div className="yt7-stat-bot">= Dollar Income. Automatically.</div>
            </div>
          </div>

          {/* Hero CTA */}
          <div className="max-w-xl mx-auto">
            <button onClick={openPayModal} className="yt7-cta-btn">
              <span>Degree Ke Saath Apna YouTube Empire Shuru Karein — PKR 1,999</span>
              <ArrowRight size={20} />
            </button>
            <p className="text-[11px] text-zinc-400 mt-3 flex items-center justify-center gap-2">
              <Lock size={12} className="text-green-500" />
              🔒 Aaj Raat 7 PM Se Pehle | 100 Seats Only | 2 Ghante Ka Complete System
            </p>
          </div>
        </div>
      </header>

      {/* SECTION 1: THE BRUTAL OPENING */}
      <section className="yt7-section-black">
        <div className="yt7-container">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-2 italic">
              &quot;Seedha Poochta Hoon: Aapne 4 Saal Kyun Lagaye?&quot;
            </h2>
          </div>

          <div className="yt7-story-box">
            <p>
              Sach batao. Final answer kya tha jab admission form bhara tha?<br />
              <em>&apos;Degree ke baad achhi job milegi.&apos;</em> • <em>&apos;Life set ho jayegi.&apos;</em> • <em>&apos;Parents ka sapna poora karoonga.&apos;</em> • <em>&apos;Secure future ban jayega.&apos;</em>
            </p>

            <div className="yt7-divider" />

            <p>
              Aur ab — ya toh aap fourth year mein hain aur sach dikhna shuru ho gaya hai. Ya aap graduate ho chuke hain aur sach dikhna shuru ho gaya hai. Ya aap pehle ya doosre year mein hain aur seniors ka haal dekh kar andar se dar lag raha hai.
            </p>

            <div className="yt7-divider" />

            <div className="p-6 bg-[#0F1D32] border border-red-500/30 rounded-xl space-y-2 text-zinc-200">
              <h3 className="text-red-400 font-bold text-base uppercase">Woh Sach Yeh Hai:</h3>
              <p className="text-sm leading-relaxed mb-0">
                • Pakistan mein har saal 4 lakh se zyada graduates nikalte hain.<br />
                • Companies utni jobs nahi deti.<br />
                • Jo job milti hai — PKR 25,000 se 45,000 hai.<br />
                • Mehangai 20%+ per saal hai aur PKR ki value gir rahi hai.
              </p>
            </div>

            <div className="yt7-divider" />

            <p className="italic text-zinc-300">
              Aur sabse bura sach? Jo banda aapke saath padhta tha — jisne parallel YouTube channel banaya tha degree ke saath saath — woh aaj dollar mein kama raha hai. Aap abhi bhi CV bhej rahe hain.<br /><br />
              <strong className="text-white">Mujhe aapse baat karni hai. Kyunki koi aur nahi karta.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE MATH THEY NEVER SHOWED YOU */}
      <section className="yt7-section-dark">
        <div className="yt7-container">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2">
              Woh Hisab Jo Kisi Ne Nahi Bataya
            </h2>
            <p className="text-zinc-400 text-sm font-mono">University ne finance padhai lekin personal math nahi sikhaya.</p>
          </div>

          <div className="yt7-table-wrap mb-10">
            <table className="yt7-table">
              <thead>
                <tr>
                  <th className="text-red-400">DEGREE PATH</th>
                  <th className="text-green-400">YOUTUBE PATH</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                <tr><td>PKR 4-25 lakh cost</td><td className="text-green-400 font-bold">PKR 0 start cost</td></tr>
                <tr><td>4 saal waqt</td><td className="text-green-400 font-bold">6-12 mahine</td></tr>
                <tr><td>1 employer pe depend</td><td className="text-green-400 font-bold">Global audience</td></tr>
                <tr><td>PKR 25K start salary</td><td className="text-green-400 font-bold">Dollar ($) mein earning</td></tr>
                <tr><td>Ceiling: PKR 80K avg</td><td className="text-green-400 font-bold">Ceiling: Unlimited</td></tr>
                <tr><td>9-6 office schedule</td><td className="text-green-400 font-bold">Ghar se, kahin bhi</td></tr>
                <tr><td>Boss decide karta hai</td><td className="text-green-400 font-bold">Aap decide karte hain</td></tr>
                <tr><td>Inflation salary khata hai</td><td className="text-green-400 font-bold">Dollar value protect karta hai</td></tr>
                <tr><td>Retire = income zero</td><td className="text-green-400 font-bold">Channel chalti rahe</td></tr>
              </tbody>
            </table>
          </div>

          <div className="text-center">
            <button onClick={openPayModal} className="yt7-cta-btn">
              <span>Mujhe Dollar Income Blueprint Chahiye →</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 3: THREE TYPES OF STUDENTS */}
      <section className="yt7-section-black">
        <div className="yt7-container">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2">
              Pakistan Ke Teen Qisam Ke Students. Aap Konse Hain?
            </h2>
          </div>

          <div className="yt7-types-grid mb-10">
            {/* Type 1 */}
            <div className="yt7-type-card type-waiter">
              <div className="yt7-type-title">TYPE 1: &quot;THE WAITER&quot; 😶</div>
              <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                <strong>Story:</strong> Degree chal rahi hai ya ho gayi. <em>&apos;Baad mein dekhein ge. Abhi exams hain. Pehle job lagao.&apos;</em><br />
                <strong>Reality:</strong> &apos;Baad mein&apos; kabhi nahi aata. 2-3 saal baad bhi CV bhej rahe hote hain jab saath wale aage nikal chuke hote hain.
              </p>
              <div className="text-[11px] font-bold text-red-400">1 Saal Baad: Abhi bhi CV bhej rahe honge.</div>
            </div>

            {/* Type 2 */}
            <div className="yt7-type-card type-builder">
              <div className="yt7-type-title">TYPE 2: &quot;PARALLEL BUILDER&quot; ⚡</div>
              <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                <strong>Story:</strong> Degree bhi kar rahe hain aur YouTube channel bhi. Raat ko 2-3 ghante consistent lagate hain.<br />
                <strong>Reality:</strong> Semester 4 mein pehla monetization. Semester 6 mein PKR 50,000+/mo. Graduation par already financially independent.
              </p>
              <div className="text-[11px] font-bold text-green-400">1 Saal Baad: Dollar mein kama rahe honge.</div>
            </div>

            {/* Type 3 */}
            <div className="yt7-type-card type-regretter">
              <div className="yt7-type-title">TYPE 3: &quot;THE REGRETTER&quot; 😔</div>
              <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                <strong>Story:</strong> Degree ho gayi. Pehli job PKR 30,000. <em>&apos;Kya ab bhi ho sakta hai? Kya der ho gayi?&apos;</em><br />
                <strong>Reality:</strong> Der nahi hui lekin har din ki delay competition ko 2x aage le jaati hai.
              </p>
              <div className="text-[11px] font-bold text-amber-400">1 Saal Baad: Action lenge toh growing asset hoga.</div>
            </div>
          </div>

          <div className="p-6 bg-[#0F1D32] border border-white/10 rounded-2xl text-center max-w-2xl mx-auto">
            <p className="text-sm font-serif italic text-zinc-200 mb-0">
              Is workshop ke baad — chahe aap waiter hain, parallel builder banna chahte hain, ya regretter hain — aap ek cheez clear karke niklen ge: <strong>Exactly kaise shuru karna hai aaj raat se.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE CLASSMATE STORY */}
      <section className="yt7-section-dark">
        <div className="yt7-container">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2">
              Woh Banda Jo Aapke Saath Padhta Tha
            </h2>
          </div>

          <div className="yt7-story-box">
            <p>
              Har university mein ek banda ya bandi hoti hai jise log serious nahi lete: <em>&apos;Yeh YouTube waali cheezein karta hai. Practical nahi hai.&apos;</em>
            </p>
            <div className="yt7-divider" />
            <p>
              <strong>Year 2 mein:</strong> Woh quietly channel banata hai. Koi nahi jaanta. Results zero hain lekin rukta nahi.<br />
              <strong>Year 3 mein:</strong> Views aana shuru hote hain. Thodi si dollar earning start.<br />
              <strong>Year 4 mein:</strong> Graduation se 3 mahine pehle — PKR 80,000-1,20,000/month. Dollar mein aa raha hai.<br />
              <strong>Convocation pe:</strong> Woh same degree leke nikla lekin pehle din se financially independent!
            </p>
            <div className="yt7-divider" />
            <p className="italic text-zinc-300">
              Woh conference mein nahi gaya. Koi secret wasta nahi tha. Bas ek cheez thi: <strong>Sahi system sahi waqt par aur 2-3 ghante roz ki consistency.</strong><br /><br />
              Good news: Woh student abhi bhi aage hai — lekin gap abhi bhi close ho sakta hai agar aap aaj shuru karein.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: PARENTS KA PAISA */}
      <section className="yt7-section-black">
        <div className="yt7-container">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2">
              Aapke Parents Ne Lakhon Lagaye. Unhe Wapas Karna Aapki Zimmedari Hai.
            </h2>
            <p className="text-zinc-400 text-sm font-mono">Lekin sirf 25k naukri se yeh possible nahi.</p>
          </div>

          <div className="yt7-story-box">
            <div className="p-6 bg-[#0F1D32] border border-white/10 rounded-2xl space-y-4">
              <p className="text-sm text-zinc-300 leading-relaxed mb-0">
                Aapke Ammi Abbu ne sirf fees nahi di. Unhon ne di apni savings, apna waqt, aur apna trust: <em>&apos;Mera bachcha settle ho jayega.&apos;</em>
              </p>
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-200">
                  <strong>PKR 30,000 Naukri:</strong><br />
                  Ghar ka kharcha + transport = Savings ZERO. Parents ko return karna impossible.
                </div>
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-xs text-green-200">
                  <strong>YouTube $500/Month (PKR 1,39,000):</strong><br />
                  Ghar kharcha ✅ + Parents ko dena ✅ + Real savings start ✅.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: DEGREE + YOUTUBE — BOTH TOGETHER */}
      <section className="yt7-section-dark">
        <div className="yt7-container">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2">
              Degree Chhodni Nahi. Degree Ke Saath YouTube Banana Hai.
            </h2>
          </div>

          <div className="yt7-story-box">
            <div className="p-6 bg-[#0F1D32] border border-white/10 rounded-2xl space-y-3 text-sm text-zinc-300">
              <div className="font-mono text-xs text-amber-400 font-bold uppercase">Practical 24-Hour Student Schedule:</div>
              <div>📚 Class: 4-5 ghante &nbsp;|&nbsp; 📖 Study: 2-3 ghante &nbsp;|&nbsp; 😴 Sleep: 7-8 ghante &nbsp;|&nbsp; 🍽️ Routine: 2-3 ghante</div>
              <div className="text-green-400 font-bold">Bacha: 2-4 ghante jo abhi reels aur scrolling mein jaate hain.</div>
              <p className="pt-2 mb-0">
                Agar woh 2 ghante YouTube ko dein toh graduation ke din degree bhi haath mein hogi aur income already chal rahi hogi!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: THE 4-YEAR CLOCK — INTERACTIVE SELECTOR */}
      <section className="yt7-section-black">
        <div className="yt7-container">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2">
              4 Saal Ka Clock Chal Raha Hai. Aap Abhi Kahan Hain?
            </h2>
          </div>

          <div className="yt7-year-tabs">
            {[
              { id: "1st", label: "First Year" },
              { id: "2nd", label: "Second Year" },
              { id: "3rd", label: "Third Year" },
              { id: "4th", label: "Fourth Year" },
              { id: "grad1", label: "Graduate (1 yr out)" },
              { id: "grad2", label: "Graduate (2+ yrs out)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedYear(tab.id as any)}
                className={`yt7-year-btn ${selectedYear === tab.id ? "active" : ""}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="yt7-year-content-box">
            {selectedYear === "1st" && (
              <div className="space-y-3">
                <h3 className="text-base font-bold text-green-400">First Year: Sabse Zyada Waqt. Sabse Bada Moka.</h3>
                <p className="text-xs sm:text-sm text-zinc-300">
                  Year 1 mein setup • Year 2 mein first monetization • Year 4 graduation par $500-1,500/month (PKR 1,39,000-4,17,000/mo). Job ki zaroorat nahi hogi — choice hogi!
                </p>
              </div>
            )}

            {selectedYear === "2nd" && (
              <div className="space-y-3">
                <h3 className="text-base font-bold text-green-400">Second Year: 2.5 Saal Baaki Hain.</h3>
                <p className="text-xs sm:text-sm text-zinc-300">
                  Semester 5-6 first income • Semester 7-8 growing asset • Graduation par already earning. 6 mahine aur wait kiya toh compounding growth miss hogi.
                </p>
              </div>
            )}

            {selectedYear === "3rd" && (
              <div className="space-y-3">
                <h3 className="text-base font-bold text-green-400">Third Year: 1.5 Saal Baaki Hain. Tight Lekin Possible.</h3>
                <p className="text-xs sm:text-sm text-zinc-300">
                  Aaj start karenge toh graduation tak 2 options honge. Wait karenge toh graduation par sirf 1 option hoga: naukri ka intezar.
                </p>
              </div>
            )}

            {selectedYear === "4th" && (
              <div className="space-y-3">
                <h3 className="text-base font-bold text-amber-400">Fourth Year: 6-8 Mahine Baaki. Sabse Urgent.</h3>
                <p className="text-xs sm:text-sm text-zinc-300">
                  Semester end tak 50+ videos ready hongi. Post-grad 6 months mein monetization start. Warna PKR 25k job ke baad thak kar kabhi start nahi hoga.
                </p>
              </div>
            )}

            {selectedYear === "grad1" && (
              <div className="space-y-3">
                <h3 className="text-base font-bold text-green-400">Graduate (1 Year Out): Der Nahi Hui.</h3>
                <p className="text-xs sm:text-sm text-zinc-300">
                  Job mili hai ya nahi — shaam ke 2 ghante YouTube asset ko dein. 1 saal baad aap doosron ko mentorship de rahe honge.
                </p>
              </div>
            )}

            {selectedYear === "grad2" && (
              <div className="space-y-3">
                <h3 className="text-base font-bold text-green-400">Graduate (2+ Years Out): Best Time Is Today.</h3>
                <p className="text-xs sm:text-sm text-zinc-300">
                  2 saal pehle start karte toh behtar tha lekin aaj ka din bhi best available opportunity hai. Start today.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 8: AI WORKFLOW (50-60 MIN) */}
      <section className="yt7-section-dark">
        <div className="yt7-container">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2">
              AI Ne Student Life Ka Biggest Advantage De Diya Hai
            </h2>
            <p className="text-zinc-400 text-sm font-mono">50–60 Minute Per Video Fast Workflow</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto mb-8 text-center text-xs">
            <div className="p-3 bg-[#0F1D32] border border-white/10 rounded-xl">💡 Topic Research: 10 Min</div>
            <div className="p-3 bg-[#0F1D32] border border-white/10 rounded-xl">📝 ChatGPT Script: 10 Min</div>
            <div className="p-3 bg-[#0F1D32] border border-white/10 rounded-xl">🎙️ AI Voiceover: 5 Min</div>
            <div className="p-3 bg-[#0F1D32] border border-white/10 rounded-xl">🎬 Fast Editing: 15 Min</div>
          </div>
        </div>
      </section>

      {/* SECTION 9: WHAT HAPPENS IN 2 HOURS */}
      <section className="yt7-section-black">
        <div className="yt7-container">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2">
              2 Ghante Mein Exactly Kya Hoga?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="p-6 bg-[#0F1D32] border border-white/10 rounded-2xl">
              <div className="text-xs font-mono font-bold text-green-400 mb-1">HOUR 1 (8:00 PM - 9:00 PM)</div>
              <h3 className="text-lg font-bold text-white mb-3">YouTube Empire Framework</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                <li className="flex gap-2"><Check size={16} className="text-green-500 shrink-0" /> Profitable niche selection (High Dollar RPM)</li>
                <li className="flex gap-2"><Check size={16} className="text-green-500 shrink-0" /> Student-friendly faceless formats</li>
                <li className="flex gap-2"><Check size={16} className="text-green-500 shrink-0" /> 90-day semester content calendar</li>
              </ul>
            </div>

            <div className="p-6 bg-[#0F1D32] border border-white/10 rounded-2xl">
              <div className="text-xs font-mono font-bold text-green-400 mb-1">HOUR 2 (9:00 PM - 10:00 PM)</div>
              <h3 className="text-lg font-bold text-white mb-3">AI Automation Live Demo</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                <li className="flex gap-2"><Check size={16} className="text-green-500 shrink-0" /> AI Topic & Script generation live</li>
                <li className="flex gap-2"><Check size={16} className="text-green-500 shrink-0" /> Studio-grade AI voiceovers without mic</li>
                <li className="flex gap-2"><Check size={16} className="text-green-500 shrink-0" /> Fast editing & monetization roadmap</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: BONUS STACK */}
      <section className="yt7-section-dark">
        <div className="yt7-container">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2">
              Student Starter Kit Included Free
            </h2>
            <p className="text-zinc-400 text-sm font-mono">5 Founding Bonuses (Worth PKR 15,499)</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto mb-10">
            {[
              { title: "🤖 AI Prompts Pack (50+ Prompts)", val: "3,000" },
              { title: "🔍 Niche Research Template", val: "2,000" },
              { title: "📅 90-Day Content Calendar", val: "2,500" },
              { title: "💬 Private WhatsApp Group (7 Days)", val: "5,000" },
              { title: "📹 Workshop Recording (24 Hours)", val: "2,999" },
            ].map((b, i) => (
              <div key={i} className="p-4 bg-[#0F1D32] border border-white/10 rounded-xl flex justify-between items-center">
                <span className="text-sm font-bold text-zinc-200">{b.title}</span>
                <span className="text-xs font-mono text-green-400 font-bold">PKR {b.val} (FREE)</span>
              </div>
            ))}
          </div>

          {/* Final Value Box */}
          <div className="max-w-xl mx-auto bg-gradient-to-b from-[#0F1D32] to-[#040A12] border-2 border-green-500 p-8 rounded-2xl text-center shadow-2xl">
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1">Fee: PKR 1,999 Only</div>
            <div className="text-4xl sm:text-5xl font-mono font-black text-green-400 mb-6">PKR 1,999</div>
            <button onClick={openPayModal} className="yt7-cta-btn w-full">
              <span>Degree Ke Saath YouTube Shuru Karein →</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 13: FAQ */}
      <section className="yt7-section-black">
        <div className="yt7-container max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2">Student Specific FAQs</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-white/10 rounded-xl overflow-hidden bg-[#0F1D32]">
                <button 
                  onClick={() => setOpenFaqIdx(openFaqIdx === i ? null : i)}
                  className="w-full p-4 sm:p-5 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base text-zinc-100">{faq.q}</span>
                  <ChevronDown className={`transition-transform duration-300 text-zinc-400 ${openFaqIdx === i ? "rotate-180 text-green-400" : ""}`} />
                </button>
                {openFaqIdx === i && (
                  <div className="p-4 sm:p-5 border-t border-white/10 text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                    &quot;{faq.a}&quot;
                  </div>
                )}
              </div>
            ))}
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
            Earnings Disclaimer: Results vary based on execution and consistency. © 2026 YouTube Empire Builders — Abrar Nadir
          </p>
        </div>
      </footer>

      {/* FLOATING MOBILE CTA */}
      <div className={`yt7-sticky-mobile-cta ${floatingVisible ? "visible" : ""}`}>
        <div className="yt7-sticky-price">
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
