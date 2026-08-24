"use client";

import React, { useState, useEffect, useRef } from "react";
import "./yt3.css";

const TEAM_WHATSAPP_NUMBER = "15553693691";

export default function WorkshopYt3Client() {
  const [dynamicDate, setDynamicDate] = useState<string>("");
  const [payModalOpen, setPayModalOpen] = useState<boolean>(false);
  const [modalStep, setModalStep] = useState<1 | 2>(1);
  const [policyModal, setPolicyModal] = useState<"refund" | "transfer" | "disclaimer" | "privacy" | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [stickyVisible, setStickyVisible] = useState<boolean>(false);

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

  // Set Dynamic Date in Asia/Karachi Timezone
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

  // Handle Scroll for Sticky Mobile CTA
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollY > 280 && !payModalOpen) {
        setStickyVisible(true);
      } else {
        setStickyVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [payModalOpen]);

  // Handle Countdown & Auto WhatsApp Redirect
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

  // Handle Escape key to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (payModalOpen && modalStep === 1) closePayModal();
        if (policyModal) setPolicyModal(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [payModalOpen, modalStep, policyModal]);

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
    return `Salam Abrar Nadir & Support Team! Main ne YouTube Live Workshop (Workshop 3) ke liye payment transfer kar di hai.\n\n*Name:* ${fullName.trim()}\n*WhatsApp:* ${whatsappNumber.trim()}${email.trim() ? `\n*Email:* ${email.trim()}` : ""}\n*Payment Method:* ${paymentMethod}${transactionId.trim() ? `\n*Transaction ID:* ${transactionId.trim()}` : ""}\n*Batch Date:* ${dynamicDate}\n*Amount Paid:* PKR 1,999\n\nI have attached my payment screenshot. Please verify and share the confirmed Zoom link & WhatsApp community invite. Shukriya! 😊`;
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
      await fetch("/api/yt3-submit", {
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
          content_name: "YouTube Empire Builders Workshop 3",
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

  const toggleFaq = (index: number) => {
    setActiveFaq((prev) => (prev === index ? null : index));
  };

  const faqs = [
    {
      q: "Workshop recorded hoga?",
      a: "Haan, registered participants ko 24 ghante ke liye full HD recording access milayega taake aap kisi bhi point ko dobara practice kar sakein.",
    },
    {
      q: "Mujhe kya cheezein chahiye workshop attend karne ke liye?",
      a: "Ek basic laptop ya PC, stable internet connection, aur ek notebook. Kisi expensive software ya heavy camera equipment ki zaroorat nahi hai.",
    },
    {
      q: "Kya beginner bhi join kar sakta hai jise video editing nahi aati?",
      a: "Bilkul. Workshop specifically beginners ke liye design kiya gaya hai. AI engines ki madad se zero-camera scripting, voiceover aur visual montage live screen par step-by-step execute karke dikhaya jata hai.",
    },
    {
      q: "Payment verify hone mein kitna time lagta hai?",
      a: "Proof receive hote hi verification desk aapki payment verify karke direct confirmed Zoom pass aur WhatsApp group access deliver karta hai.",
    },
    {
      q: "Agar main kisi majboori se live attend na kar paoon?",
      a: "Aapko 24-ghante ki HD recording provide ki jayegi, ya aap session se 2 ghante pehle WhatsApp support (+92 329 6158206) par bata kar apni seat agle batch mein free shift karwa sakte hain.",
    },
    {
      q: "Kya workshop ke baad refund policy available hai?",
      a: "Haan! 100% No-Risk Guarantee: Agar aap live workshop attend karte hain aur aapko practical value nahi milti, toh 72 hours ke andar bina kisi hesitation ke 100% full refund claim kar sakte hain.",
    },
  ];

  return (
    <div className="yt3-body">
      {/* ANNOUNCEMENT BAR */}
      <div className="yt3-announcement-bar" role="banner">
        DAILY LIVE WORKSHOP • 8:00 PM TO 10:00 PM PKT • LIMITED 100 SEATS BATCH
      </div>

      <main>
        {/* HERO SECTION */}
        <section className="yt3-hero-section" id="top">
          <div className="yt3-container">
            <div className="yt3-hero-badge">DAILY LIVE MASTERCLASS • 8:00 PM - 10:00 PM PKT</div>
            <h1>
              Niche Se Launch Tak—Sirf <span className="highlight">2 Ghanton</span> Mein
            </h1>
            <p className="yt3-hero-subtitle">
              In a 2-hour live screen-share masterclass, choose a validated faceless YouTube channel niche and build a repeatable AI-assisted production workflow—with custom templates, a 30/90-day execution roadmap, and live Q&A.
            </p>

            <div className="yt3-info-card">
              <div className="yt3-info-grid">
                <div className="yt3-info-item">
                  <div className="yt3-info-label">Date</div>
                  <div className="yt3-info-value">{dynamicDate || "Loading..."}</div>
                </div>
                <div className="yt3-info-item">
                  <div className="yt3-info-label">Time</div>
                  <div className="yt3-info-value">8:00 – 10:00 PM PKT</div>
                </div>
                <div className="yt3-info-item">
                  <div className="yt3-info-label">Format</div>
                  <div className="yt3-info-value">Live Screen-Share</div>
                </div>
                <div className="yt3-info-item">
                  <div className="yt3-info-label">Reg Closes</div>
                  <div className="yt3-info-value">7:00 PM PKT</div>
                </div>
                <div className="yt3-info-item">
                  <div className="yt3-info-label">Batch Size</div>
                  <div className="yt3-info-value">100 Seats Limit</div>
                </div>
                <div className="yt3-info-item">
                  <div className="yt3-info-label">Special Pass</div>
                  <div className="yt3-info-value price-val">PKR 1,999</div>
                </div>
              </div>
            </div>

            <button className="yt3-cta-btn" onClick={openPayModal}>
              <span>Aaj Raat Ki Seat PKR 1,999 Mein Lock Karein</span>
              <span className="arrow">&rarr;</span>
            </button>

            <div className="yt3-trust-items">
              <div className="yt3-trust-item">
                <span className="check">✓</span> 100% Live screen-share demo
              </div>
              <div className="yt3-trust-item">
                <span className="check">✓</span> 50+ AI Creator Prompts Pack
              </div>
              <div className="yt3-trust-item">
                <span className="check">✓</span> 7-Day WhatsApp action group
              </div>
              <div className="yt3-trust-item">
                <span className="check">✓</span> 24hr HD recording access
              </div>
            </div>
          </div>
        </section>

        {/* PAIN POINTS */}
        <section className="yt3-section" id="pain-points">
          <div className="yt3-container">
            <h2 className="yt3-section-title">Kya Aap Bhi In Challenges Mein Phasse Hain?</h2>
            <p className="yt3-section-subtitle">
              Problem aapki mehnat nahi hai — problem ek connected, repeatable production pipeline ki kami hai.
            </p>
            <div className="yt3-pain-grid">
              <div className="yt3-pain-card">
                <div className="yt3-pain-icon">💻</div>
                <h3>Blank Screen Syndrome</h3>
                <p>Laptop open karte hain lekin samajh nahi aata pehla video kis topic par banayein.</p>
              </div>
              <div className="yt3-pain-card">
                <div className="yt3-pain-icon">🎯</div>
                <h3>Niche Paralysis</h3>
                <p>Hazaaron niches dekh kar confuse ho jaate hain aur koi bhi decision nahi le paate.</p>
              </div>
              <div className="yt3-pain-card">
                <div className="yt3-pain-icon">🎬</div>
                <h3>Disconnected AI Tools</h3>
                <p>ChatGPT se script milti hai lekin voiceover, b-roll aur assembly mein ghanton zaaya ho jaate hain.</p>
              </div>
              <div className="yt3-pain-card">
                <div className="yt3-pain-icon">🤖</div>
                <h3>Generic AI Scripts</h3>
                <p>Robotic sounding scripts jo audience retention ko pehle 30 seconds mein drop kar deti hain.</p>
              </div>
              <div className="yt3-pain-card">
                <div className="yt3-pain-icon">⏱️</div>
                <h3>Manual Burnout</h3>
                <p>Bina system ke har video ke liye endless research aur editing mein thak jaana.</p>
              </div>
              <div className="yt3-pain-card">
                <div className="yt3-pain-icon">🛠️</div>
                <h3>Low CPM Frustration</h3>
                <p>Local views ke peeche bhaagna jabke Dollar CPM audience targeting ka tareeqa nahi pata.</p>
              </div>
            </div>
          </div>
        </section>

        {/* BEFORE / AFTER */}
        <section className="yt3-section yt3-before-after-section" id="before-after">
          <div className="yt3-container">
            <h2 className="yt3-section-title">Workshop Ke Baad Direct Transformation</h2>
            <p className="yt3-section-subtitle">Sirf 2 ghante aapki execution methodology ko fundamentally upgrade kar sakte hain.</p>
            <div style={{ overflowX: "auto" }}>
              <table className="yt3-ba-table">
                <thead>
                  <tr>
                    <th className="before-col">Before (Guesswork & Chaos)</th>
                    <th className="yt3-ba-arrow-col"></th>
                    <th className="after-col">After (Proven Action System)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="before-col">
                      <span className="yt3-ba-icon-before">✗</span>Blank screen — &quot;Kya banayein?&quot;
                    </td>
                    <td className="yt3-ba-arrow-col">&rarr;</td>
                    <td className="after-col">
                      <span className="yt3-ba-icon-after">✓</span>Validated faceless channel blueprint ready
                    </td>
                  </tr>
                  <tr>
                    <td className="before-col">
                      <span className="yt3-ba-icon-before">✗</span>Random niche guessing
                    </td>
                    <td className="yt3-ba-arrow-col">&rarr;</td>
                    <td className="after-col">
                      <span className="yt3-ba-icon-after">✓</span>Data-backed 90-day content roadmap
                    </td>
                  </tr>
                  <tr>
                    <td className="before-col">
                      <span className="yt3-ba-icon-before">✗</span>Manual exhausting research
                    </td>
                    <td className="yt3-ba-arrow-col">&rarr;</td>
                    <td className="after-col">
                      <span className="yt3-ba-icon-after">✓</span>AI-assisted rapid scripting & hook framework
                    </td>
                  </tr>
                  <tr>
                    <td className="before-col">
                      <span className="yt3-ba-icon-before">✗</span>Camera fear & voice anxiety
                    </td>
                    <td className="yt3-ba-arrow-col">&rarr;</td>
                    <td className="after-col">
                      <span className="yt3-ba-icon-after">✓</span>100% faceless AI voice & b-roll assembly pipeline
                    </td>
                  </tr>
                  <tr>
                    <td className="before-col">
                      <span className="yt3-ba-icon-before">✗</span>Local low-CPM focus
                    </td>
                    <td className="yt3-ba-arrow-col">&rarr;</td>
                    <td className="after-col">
                      <span className="yt3-ba-icon-after">✓</span>High-yield US/UK Dollar audience targeting
                    </td>
                  </tr>
                  <tr>
                    <td className="before-col">
                      <span className="yt3-ba-icon-before">✗</span>No structured launch plan
                    </td>
                    <td className="yt3-ba-arrow-col">&rarr;</td>
                    <td className="after-col">
                      <span className="yt3-ba-icon-after">✓</span>Step-by-step 30-day upload execution checklist
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* AGENDA */}
        <section className="yt3-section" id="agenda">
          <div className="yt3-container">
            <h2 className="yt3-section-title">2 Ghanton Ka Live Screen-Share Syllabus</h2>
            <p className="yt3-section-subtitle">Zero theory — seedha computer screen share par real system build karenge.</p>
            <div className="yt3-agenda-cards">
              <div className="yt3-agenda-card">
                <h3>
                  <span className="hour-badge">HOUR 1</span>Niche Selection System + Channel Positioning
                </h3>
                <ul className="yt3-agenda-items">
                  <li><span className="dot">•</span>Profitable faceless niche validation criteria</li>
                  <li><span className="dot">•</span>Tier-1 global audience demand & search volume analysis</li>
                  <li><span className="dot">•</span>Competitor channel reverse-engineering matrix</li>
                  <li><span className="dot">•</span>Low-competition sub-niche filtering</li>
                  <li><span className="dot">•</span>High-RPM category selection (Finance, Tech, History, Science)</li>
                  <li><span className="dot">•</span>90-day content direction & topic clusters</li>
                </ul>
                <div className="yt3-agenda-outcome">
                  <strong>Hour 1 ke baad:</strong> Aapke paas ek validated, profitable channel direction ready hogi.
                </div>
              </div>
              <div className="yt3-agenda-card">
                <h3>
                  <span className="hour-badge">HOUR 2</span>AI Storytelling + Rapid Production Pipeline
                </h3>
                <ul className="yt3-agenda-items">
                  <li><span className="dot">•</span>High-retention video structure (Hook, Story, Payoff)</li>
                  <li><span className="dot">•</span>AI scripting prompts for authentic human tone</li>
                  <li><span className="dot">•</span>AI voice synthesis & natural cadence setup</li>
                  <li><span className="dot">•</span>Stock footage & B-roll visual planning in minutes</li>
                  <li><span className="dot">•</span>High-click thumbnail packaging & title frameworks</li>
                  <li><span className="dot">•</span>Direct Pakistani bank AdSense wire legal process</li>
                </ul>
                <div className="yt3-agenda-outcome">
                  <strong>Hour 2 ke baad:</strong> Aap complete content creation workflow ko live execute karte dekhenge.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DELIVERABLES */}
        <section className="yt3-section yt3-deliverables-section" id="deliverables">
          <div className="yt3-container">
            <h2 className="yt3-section-title">10 Actionable Deliverables Jo Aapko Milenge</h2>
            <p className="yt3-section-subtitle">Real assets and frameworks designed for immediate implementation.</p>
            <div className="yt3-deliverables-grid">
              <div className="yt3-deliverable-item"><div className="d-check">✓</div><span>Faceless Channel Blueprint</span></div>
              <div className="yt3-deliverable-item"><div className="d-check">✓</div><span>Niche Validation Decision Matrix</span></div>
              <div className="yt3-deliverable-item"><div className="d-check">✓</div><span>Competitor Reverse-Engineering Sheet</span></div>
              <div className="yt3-deliverable-item"><div className="d-check">✓</div><span>90-Day Content Calendar Planner</span></div>
              <div className="yt3-deliverable-item"><div className="d-check">✓</div><span>Viral Hook & Script Framework</span></div>
              <div className="yt3-deliverable-item"><div className="d-check">✓</div><span>Title & Packaging Swipe File</span></div>
              <div className="yt3-deliverable-item"><div className="d-check">✓</div><span>AI Storytelling Prompts Suite</span></div>
              <div className="yt3-deliverable-item"><div className="d-check">✓</div><span>B-Roll Visual Assembly Roadmap</span></div>
              <div className="yt3-deliverable-item"><div className="d-check">✓</div><span>Automated Toolstack Master List</span></div>
              <div className="yt3-deliverable-item"><div className="d-check">✓</div><span>30-Day Step-by-Step Execution Plan</span></div>
            </div>
          </div>
        </section>

        {/* BONUS STACK */}
        <section className="yt3-section yt3-bonus-section" id="bonuses">
          <div className="yt3-container">
            <h2 className="yt3-section-title">5 Founding Bonuses Included (Total Value: PKR 15,499)</h2>
            <div style={{ textAlign: "center" }}>
              <span className="yt3-bonus-badge">Included Free with Your PKR 1,999 Admission</span>
            </div>

            <div className="yt3-bonus-grid">
              <div className="yt3-bonus-card">
                <div className="b-icon">🤖</div>
                <h3>AI Prompts Pack (50+ Custom Prompts)</h3>
                <p>Niche research, scriptwriting, aur title generation ke liye super-optimized prompts.</p>
                <div className="b-val">PKR 3,000 <span className="free">(FREE)</span></div>
              </div>

              <div className="yt3-bonus-card">
                <div className="b-icon">🔍</div>
                <h3>YouTube Niche Research Matrix Template</h3>
                <p>High-demand aur low-competition niches validate karne ka structured decision sheet.</p>
                <div className="b-val">PKR 2,000 <span className="free">(FREE)</span></div>
              </div>

              <div className="yt3-bonus-card">
                <div className="b-icon">📅</div>
                <h3>90-Day Content Calendar & Planner</h3>
                <p>Aapke pehle 3 mahine ke uploads ko organize aur consistent rakhne ka custom planner.</p>
                <div className="b-val">PKR 2,500 <span className="free">(FREE)</span></div>
              </div>

              <div className="yt3-bonus-card">
                <div className="b-icon">💬</div>
                <h3>Private WhatsApp Group (7 Days Support)</h3>
                <p>Direct Q&A support aur doosre action-taking creators ke sath private networking community.</p>
                <div className="b-val">PKR 5,000 <span className="free">(FREE)</span></div>
              </div>

              <div className="yt3-bonus-card">
                <div className="b-icon">📹</div>
                <h3>Workshop Full HD Recording (24 Hours Access)</h3>
                <p>Pure session ki high-quality recording taake aap har step ko dobara practice kar sakein.</p>
                <div className="b-val">PKR 2,999 <span className="free">(FREE)</span></div>
              </div>
            </div>

            {/* Quick Bank Transfer Card */}
            <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "24px", maxWidth: "600px", margin: "36px auto 0", boxShadow: "0 10px 30px rgba(0,0,0,0.06)" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#0F172A", margin: "0 0 14px", textAlign: "center", textTransform: "uppercase" }}>Direct Instant Bank Details</h3>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#F8FAFC", padding: "10px 14px", borderRadius: "10px", border: "1px solid #E2E8F0", marginBottom: "8px" }}>
                <div>
                  <p style={{ fontSize: "11px", color: "#94A3B8", margin: 0, fontWeight: 700 }}>🏦 Meezan Bank Limited (Muhammad Abrar)</p>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "#0F172A", margin: "2px 0 0", fontFamily: "monospace" }}>02370103321036</p>
                </div>
                <button onClick={() => copyToClipboard("02370103321036", "m_acc_body")} className={`yt3-copy-btn ${copiedKey === "m_acc_body" ? "copied" : ""}`}>{copiedKey === "m_acc_body" ? "Copied ✓" : "Copy"}</button>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#F8FAFC", padding: "10px 14px", borderRadius: "10px", border: "1px solid #E2E8F0", marginBottom: "8px" }}>
                <div>
                  <p style={{ fontSize: "11px", color: "#94A3B8", margin: 0, fontWeight: 700 }}>📱 Easypaisa (Muhammad Abrar Ghauri)</p>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "#0F172A", margin: "2px 0 0", fontFamily: "monospace" }}>03274532186</p>
                </div>
                <button onClick={() => copyToClipboard("03274532186", "ep_num_body")} className={`yt3-copy-btn ${copiedKey === "ep_num_body" ? "copied" : ""}`}>{copiedKey === "ep_num_body" ? "Copied ✓" : "Copy"}</button>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#F8FAFC", padding: "10px 14px", borderRadius: "10px", border: "1px solid #E2E8F0" }}>
                <div>
                  <p style={{ fontSize: "11px", color: "#94A3B8", margin: 0, fontWeight: 700 }}>🟡 Binance Pay UID (abrarnadircb)</p>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "#0F172A", margin: "2px 0 0", fontFamily: "monospace" }}>117971802</p>
                </div>
                <button onClick={() => copyToClipboard("117971802", "binance_id_body")} className={`yt3-copy-btn ${copiedKey === "binance_id_body" ? "copied" : ""}`}>{copiedKey === "binance_id_body" ? "Copied ✓" : "Copy"}</button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="yt3-section" id="faq">
          <div className="yt3-container">
            <h2 className="yt3-section-title">Frequently Asked Questions</h2>
            <p className="yt3-section-subtitle">Aapke har sawal ka clear aur authentic jawab.</p>
            <div className="yt3-faq-list">
              {faqs.map((faq, index) => {
                const isActive = activeFaq === index;
                return (
                  <div key={index} className={`yt3-faq-item ${isActive ? "active" : ""}`}>
                    <button
                      className="yt3-faq-question"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isActive}
                    >
                      <span>{faq.q}</span>
                      <span className="yt3-faq-toggle">+</span>
                    </button>
                    {isActive && (
                      <div className="yt3-faq-answer">
                        <div>{faq.a}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="yt3-final-cta-section" id="final-cta">
          <div className="yt3-container">
            <h2>Aaj Raat 8 Baje Apna Faceless YouTube System Ready Karein</h2>
            <p className="subtitle">Sirf 2 ghanton mein complete channel blueprint — 100% LIVE screen-share demo ke saath.</p>
            <div className="yt3-final-price">
              <span className="currency">PKR</span> 1,999
            </div>
            <button className="yt3-cta-btn" onClick={openPayModal}>
              <span>Aaj Raat Ki Seat Lock Karein</span>
              <span className="arrow">&rarr;</span>
            </button>
            <p className="fine-print">Registration 7:00 PM PKT pe close. Live workshop 8:00 – 10:00 PM PKT. 100% Money-back guarantee included.</p>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="yt3-footer">
        <div className="yt3-container">
          <p>&copy; 2026 YouTube Empire Builders — Abrar Nadir. All rights reserved.</p>
          <p style={{ marginTop: "6px", fontSize: "12px", color: "#94A3B8" }}>
            Disclaimer: Educational & practical skill-building program. Individual results vary based on personal effort, niche selection, content quality, and consistency. We do not make passive or guaranteed income promises.
          </p>
          <div style={{ marginTop: "14px", display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}>
            <button type="button" onClick={() => openPolicy("refund")} style={{ background: "none", border: "none", color: "#94A3B8", fontSize: "12px", cursor: "pointer", textDecoration: "underline" }}>
              Refund Policy
            </button>
            <button type="button" onClick={() => openPolicy("transfer")} style={{ background: "none", border: "none", color: "#94A3B8", fontSize: "12px", cursor: "pointer", textDecoration: "underline" }}>
              Transfer Policy
            </button>
            <button type="button" onClick={() => openPolicy("disclaimer")} style={{ background: "none", border: "none", color: "#94A3B8", fontSize: "12px", cursor: "pointer", textDecoration: "underline" }}>
              Disclaimer
            </button>
            <button type="button" onClick={() => openPolicy("privacy")} style={{ background: "none", border: "none", color: "#94A3B8", fontSize: "12px", cursor: "pointer", textDecoration: "underline" }}>
              Privacy Policy
            </button>
          </div>
        </div>
      </footer>

      {/* STICKY MOBILE CTA */}
      <div className={`yt3-sticky-mobile-cta ${stickyVisible ? "visible" : ""}`} id="stickyCta">
        <div className="yt3-sticky-price">
          <span className="amount">PKR 1,999</span>
          Limited 100 Seats
        </div>
        <button className="sticky-btn" onClick={openPayModal}>
          Seat Lock Karein &rarr;
        </button>
      </div>

      {/* MOBILE-FIRST BEAUTIFUL ALL-IN-ONE REGISTRATION & PAYMENT POPUP */}
      {payModalOpen && (
        <div className="yt3-paymodal-overlay" onClick={closePayModal} role="dialog" aria-modal="true">
          <div className="yt3-paybox" onClick={(e) => e.stopPropagation()}>
            
            {/* Header */}
            <div className="yt3-paybox-header">
              <div>
                <div className="yt3-paybox-header-title">Live Masterclass Admission</div>
                <h3>{modalStep === 1 ? "Complete Registration & Payment" : "Verification in Progress"}</h3>
              </div>
              <button className="yt3-paybox-close" onClick={closePayModal} aria-label="Close modal">
                &times;
              </button>
            </div>

            {/* Body */}
            <div className="yt3-paybox-body">
              {modalStep === 1 ? (
                <form onSubmit={handleSubmitProof}>
                  
                  {/* FOMO Live Seat Fill Bar */}
                  <div style={{ background: "#FFFBEB", border: "1px solid #FCD34D", borderRadius: "12px", padding: "10px 14px", marginBottom: "14px", fontSize: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, color: "#B45309", marginBottom: "6px" }}>
                      <span>🔥 Batch Filling Fast: 78/100 Seats</span>
                      <span style={{ color: "#DC2626" }}>Only 22 Left!</span>
                    </div>
                    <div style={{ width: "100%", background: "#E2E8F0", height: "8px", borderRadius: "9999px", overflow: "hidden" }}>
                      <div style={{ background: "linear-gradient(90deg, #F59E0B, #EF4444)", height: "100%", width: "78%" }} />
                    </div>
                  </div>

                  {/* Free Bonus Stack inside Modal */}
                  <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: "12px", padding: "12px 14px", marginBottom: "14px", fontSize: "11.5px", color: "#166534" }}>
                    <div style={{ fontWeight: 800, marginBottom: "4px" }}>🎁 5 Founding Bonuses Included (Worth PKR 15,499):</div>
                    <div style={{ display: "grid", gap: "3px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}><span>🤖 50+ AI Prompts Pack</span><b>FREE (PKR 3,000)</b></div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}><span>🔍 Niche Research Matrix Template</span><b>FREE (PKR 2,000)</b></div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}><span>📅 90-Day Content Calendar Planner</span><b>FREE (PKR 2,500)</b></div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}><span>💬 7-Day WhatsApp Group Support</span><b>FREE (PKR 5,000)</b></div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}><span>📹 Full HD Workshop Recording (24h)</span><b>FREE (PKR 2,999)</b></div>
                    </div>
                  </div>

                  {/* User details */}
                  <div className="yt3-form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      className="yt3-form-input"
                      placeholder="e.g. Muhammad Ahmed"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="yt3-form-group">
                    <label>WhatsApp Number *</label>
                    <input
                      type="tel"
                      className="yt3-form-input"
                      placeholder="03xx-xxxxxxx"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      required
                    />
                  </div>

                  <div className="yt3-form-group">
                    <label>Email Address <span style={{ color: "#94A3B8", fontWeight: "normal", fontSize: "11.5px" }}>(Optional)</span></label>
                    <input
                      type="email"
                      className="yt3-form-input"
                      placeholder="aap@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  {/* Payment Method Selector */}
                  <div className="yt3-form-group">
                    <label>Select Payment Method (Fee: PKR 1,999)</label>
                    <div className="yt3-pay-tabs">
                      <button
                        type="button"
                        className={`yt3-pay-tab-btn ${paymentMethod === "Meezan Bank" ? "active" : ""}`}
                        onClick={() => setPaymentMethod("Meezan Bank")}
                      >
                        🏦 Meezan Bank
                      </button>
                      <button
                        type="button"
                        className={`yt3-pay-tab-btn ${paymentMethod === "Easypaisa" ? "active" : ""}`}
                        onClick={() => setPaymentMethod("Easypaisa")}
                      >
                        📱 Easypaisa
                      </button>
                      <button
                        type="button"
                        className={`yt3-pay-tab-btn ${paymentMethod === "Binance" ? "active" : ""}`}
                        onClick={() => setPaymentMethod("Binance")}
                      >
                        🟡 Binance UID
                      </button>
                    </div>

                    {/* Payment Details Card */}
                    <div className="yt3-pay-details-card">
                      {paymentMethod === "Meezan Bank" && (
                        <div>
                          <div className="yt3-pay-row">
                            <span className="yt3-pay-row-label">Bank Name:</span>
                            <span className="yt3-pay-row-val">Meezan Bank Limited</span>
                          </div>
                          <div className="yt3-pay-row">
                            <span className="yt3-pay-row-label">Account Title:</span>
                            <span className="yt3-pay-row-val">
                              Muhammad Abrar
                              <button type="button" onClick={() => copyToClipboard("Muhammad Abrar", "m_title")} className={`yt3-copy-btn ${copiedKey === "m_title" ? "copied" : ""}`}>
                                {copiedKey === "m_title" ? "Copied ✓" : "Copy"}
                              </button>
                            </span>
                          </div>
                          <div className="yt3-pay-row">
                            <span className="yt3-pay-row-label">Account Number:</span>
                            <span className="yt3-pay-row-val">
                              02370103321036
                              <button type="button" onClick={() => copyToClipboard("02370103321036", "m_acc")} className={`yt3-copy-btn ${copiedKey === "m_acc" ? "copied" : ""}`}>
                                {copiedKey === "m_acc" ? "Copied ✓" : "Copy"}
                              </button>
                            </span>
                          </div>
                          <div className="yt3-pay-row">
                            <span className="yt3-pay-row-label">IBAN:</span>
                            <span className="yt3-pay-row-val">
                              PK39MEZN0002370103321036
                              <button type="button" onClick={() => copyToClipboard("PK39MEZN0002370103321036", "m_iban")} className={`yt3-copy-btn ${copiedKey === "m_iban" ? "copied" : ""}`}>
                                {copiedKey === "m_iban" ? "Copied ✓" : "Copy"}
                              </button>
                            </span>
                          </div>
                        </div>
                      )}

                      {paymentMethod === "Easypaisa" && (
                        <div>
                          <div className="yt3-pay-row">
                            <span className="yt3-pay-row-label">Easypaisa Number:</span>
                            <span className="yt3-pay-row-val">
                              03274532186
                              <button type="button" onClick={() => copyToClipboard("03274532186", "ep_num")} className={`yt3-copy-btn ${copiedKey === "ep_num" ? "copied" : ""}`}>
                                {copiedKey === "ep_num" ? "Copied ✓" : "Copy"}
                              </button>
                            </span>
                          </div>
                          <div className="yt3-pay-row">
                            <span className="yt3-pay-row-label">Account Title:</span>
                            <span className="yt3-pay-row-val">Muhammad Abrar Ghauri</span>
                          </div>
                        </div>
                      )}

                      {paymentMethod === "Binance" && (
                        <div>
                          <div className="yt3-pay-row">
                            <span className="yt3-pay-row-label">Binance ID / UID:</span>
                            <span className="yt3-pay-row-val">
                              117971802
                              <button type="button" onClick={() => copyToClipboard("117971802", "b_uid")} className={`yt3-copy-btn ${copiedKey === "b_uid" ? "copied" : ""}`}>
                                {copiedKey === "b_uid" ? "Copied ✓" : "Copy"}
                              </button>
                            </span>
                          </div>
                          <div className="yt3-pay-row">
                            <span className="yt3-pay-row-label">Binance Nickname:</span>
                            <span className="yt3-pay-row-val">abrarnadircb</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Transaction ID optional */}
                  <div className="yt3-form-group">
                    <label>Transaction ID / Reference Number <span style={{ color: "#94A3B8", fontWeight: "normal", fontSize: "11.5px" }}>(Optional)</span></label>
                    <input
                      type="text"
                      className="yt3-form-input"
                      placeholder="Agar available ho toh darj karein"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                    />
                  </div>

                  {/* Upload Screenshot */}
                  <div className="yt3-form-group">
                    <label>Payment Screenshot / Receipt *</label>
                    <div className="yt3-upload-zone" onClick={() => fileInputRef.current?.click()}>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/jpeg,image/png,image/webp,application/pdf"
                        style={{ display: "none" }}
                      />
                      {screenshotBase64 ? (
                        <div>
                          <span style={{ display: "inline-block", background: "#DCFCE7", color: "#166534", fontSize: "12px", fontWeight: 800, padding: "3px 10px", borderRadius: "9999px" }}>
                            Screenshot Attached ✓
                          </span>
                          <p style={{ fontSize: "12px", color: "#475569", marginTop: "4px", fontWeight: 600 }}>{screenshotFilename}</p>
                        </div>
                      ) : (
                        <div>
                          <span style={{ fontSize: "24px", display: "block", marginBottom: "2px" }}>📸</span>
                          <p style={{ fontSize: "13px", fontWeight: 800, color: "#1E293B" }}>Attach Payment Screenshot</p>
                          <p style={{ fontSize: "11px", color: "#64748B" }}>Tap to upload from mobile or gallery</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {formError && (
                    <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", color: "#DC2626", padding: "10px 14px", borderRadius: "10px", fontSize: "13px", fontWeight: 700, marginBottom: "14px" }}>
                      {formError}
                    </div>
                  )}

                  {/* CTA Button */}
                  <button type="submit" className="yt3-verify-btn" disabled={isSubmitting}>
                    {isSubmitting ? "Processing Verification..." : "Verify Payment on WhatsApp →"}
                  </button>

                  <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", color: "#166534", padding: "10px", borderRadius: "10px", fontSize: "12px", fontWeight: 700, textAlign: "center", marginTop: "10px" }}>
                    🛡️ 100% Risk-Free Guarantee: Attend workshop, full refund if no value!
                  </div>
                </form>
              ) : (
                /* STEP 2: 10-SECOND COUNTDOWN & POLITE WAITING MESSAGE */
                <div className="yt3-redirect-screen">
                  <div className="yt3-redirect-badge">
                    <span>⏳ Verification Desk</span>
                  </div>

                  <h3 className="yt3-redirect-title">
                    Thank You, {fullName.trim()}!
                  </h3>

                  <p className="yt3-redirect-msg">
                    Aap ki details aur payment receipt receive ho chuki hain. Hamari senior verification team aapki payment verify karke direct confirmed Zoom link aur WhatsApp group access provide karegi.
                  </p>

                  <div className="yt3-countdown-circle">
                    {countdown}s
                  </div>

                  <p style={{ fontSize: "12px", color: "#64748B", marginBottom: "16px", fontWeight: 600 }}>
                    Connecting you with the manager in {countdown} seconds...
                  </p>

                  <button
                    type="button"
                    className="yt3-manual-wa-btn"
                    onClick={triggerWhatsAppOpen}
                  >
                    <span>💬 Open WhatsApp Immediately (+92 329 6158206)</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* POLICY MODALS */}
      {policyModal === "refund" && (
        <div className="yt3-policy-modal-overlay" onClick={closePolicy} role="dialog" aria-modal="true">
          <div className="yt3-policy-modal" onClick={(e) => e.stopPropagation()}>
            <button className="yt3-policy-modal-close" onClick={closePolicy} aria-label="Close">&times;</button>
            <div className="yt3-policy-modal-header">
              <h2>💰 100% Money-Back Guarantee Policy</h2>
            </div>
            <div className="yt3-policy-modal-body">
              <p>We stand behind the practical quality of our live masterclass with a <strong>100% money-back guarantee</strong>.</p>
              <p><strong>Refund Eligibility & Terms:</strong></p>
              <ul>
                <li>Attend the full 2-hour live session. If you feel you did not receive practical, actionable value, you can request a 100% refund.</li>
                <li>Refund request must be sent via WhatsApp to our support desk: <strong>+92 329 6158206</strong> within <strong>72 hours</strong> of workshop completion.</li>
                <li>No long interrogation or complicated paperwork required. Refund is processed promptly.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {policyModal === "transfer" && (
        <div className="yt3-policy-modal-overlay" onClick={closePolicy} role="dialog" aria-modal="true">
          <div className="yt3-policy-modal" onClick={(e) => e.stopPropagation()}>
            <button className="yt3-policy-modal-close" onClick={closePolicy} aria-label="Close">&times;</button>
            <div className="yt3-policy-modal-header">
              <h2>🔄 Free Seat Transfer Policy</h2>
            </div>
            <div className="yt3-policy-modal-body">
              <p>If an emergency arises and you cannot attend live, you can transfer your seat to the upcoming cohort at zero additional cost by notifying our WhatsApp support (+92 329 6158206) at least <strong>2 hours prior</strong> to the 8:00 PM session start.</p>
            </div>
          </div>
        </div>
      )}

      {policyModal === "disclaimer" && (
        <div className="yt3-policy-modal-overlay" onClick={closePolicy} role="dialog" aria-modal="true">
          <div className="yt3-policy-modal" onClick={(e) => e.stopPropagation()}>
            <button className="yt3-policy-modal-close" onClick={closePolicy} aria-label="Close">&times;</button>
            <div className="yt3-policy-modal-header">
              <h2>📋 Meta & Platform Compliance Disclaimer</h2>
            </div>
            <div className="yt3-policy-modal-body">
              <p>This masterclass is designed strictly for educational and skill-building purposes. We teach workflows, niche research methodologies, and content creation tools.</p>
              <p>We do NOT make guarantees of specific earnings, views, or algorithmic outcomes. Any monetization examples are illustrative. Success in content creation depends entirely on individual dedication, execution, niche competition, and ongoing content uploads.</p>
            </div>
          </div>
        </div>
      )}

      {policyModal === "privacy" && (
        <div className="yt3-policy-modal-overlay" onClick={closePolicy} role="dialog" aria-modal="true">
          <div className="yt3-policy-modal" onClick={(e) => e.stopPropagation()}>
            <button className="yt3-policy-modal-close" onClick={closePolicy} aria-label="Close">&times;</button>
            <div className="yt3-policy-modal-header">
              <h2>🔒 Privacy Policy</h2>
            </div>
            <div className="yt3-policy-modal-body">
              <p>We respect your personal privacy. Your contact details and payment confirmation screenshots are collected exclusively for registration verification, Zoom link delivery, and 7-day community access.</p>
              <p>Your details are never sold or shared with any third party.</p>
              <p><strong>Support Desk:</strong> WhatsApp +92 329 6158206.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
