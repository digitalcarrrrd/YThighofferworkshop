"use client";

import React, { useState, useEffect, useRef } from "react";
import "./yt3.css";

const TEAM_WHATSAPP_NUMBER = "923296158206";

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
      if (scrollY > 500 && !payModalOpen) {
        setStickyVisible(true);
      } else {
        setStickyVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
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
    navigator.clipboard.writeText(text);
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
    return `Salam Abrar Nadir & Support Team! Main ne YouTube Live Workshop ke liye payment transfer kar di hai.\n\n*Name:* ${fullName.trim()}\n*WhatsApp:* ${whatsappNumber.trim()}\n*Payment Method:* ${paymentMethod}${transactionId.trim() ? `\n*Transaction ID:* ${transactionId.trim()}` : ""}\n*Batch Date:* ${dynamicDate}\n*Amount Paid:* PKR 1,999\n\nI have attached my payment screenshot. Please verify and share the confirmed Zoom link & WhatsApp community invite. Shukriya! 😊`;
  };

  const triggerWhatsAppOpen = () => {
    const message = buildWhatsAppMessage();
    const waUrl = `https://wa.me/${TEAM_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
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
      // Send Lead to API in background
      await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          whatsappNumber: whatsappNumber.trim(),
          email: "",
          paymentMethod: paymentMethod === "Meezan Bank" ? "Bank Transfer" : paymentMethod,
          transactionId: transactionId.trim() || "N/A (Screenshot Attached)",
          paymentScreenshot: screenshotBase64,
          consent: true,
          batchDate: new Date().toISOString().split("T")[0],
          batchDisplayDate: dynamicDate,
          deviceCategory: typeof window !== "undefined" && window.innerWidth < 640 ? "mobile" : "desktop",
          timestamp: new Date().toISOString(),
        }),
      }).catch((err) => console.warn("Lead save error:", err));

      // Track Pixel if active
      if (typeof (window as any).fbq === "function") {
        (window as any).fbq("track", "CompleteRegistration", {
          value: 1999,
          currency: "PKR",
          content_name: "YouTube Empire Builders Workshop",
        });
      }

      setIsSubmitting(false);
      setModalStep(2); // Show 10s countdown redirect
    } catch {
      setIsSubmitting(false);
      setModalStep(2); // Proceed to WhatsApp regardless so user is never blocked
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
      a: "Haan, workshop recorded hoga. Registered participants ko 24 ghante ke liye recording access milayega.",
    },
    {
      q: "Mujhe kya cheezein chahiye workshop ke liye?",
      a: "Ek laptop ya PC, stable internet connection, aur ek notebook. Koi special software install karne ki zaroorat nahi hai.",
    },
    {
      q: "Kya beginner bhi join kar sakta hai?",
      a: "Bilkul. Workshop specifically un logon ke liye designed hai jo abhi start kar rahe hain ya confuse hain.",
    },
    {
      q: "Payment verify hone mein kitna time lagta hai?",
      a: "Verification team Payment proof receive karne ke baad foran verification karegi. Confirmation WhatsApp (+92 329 6158206) par foran deliver hogi.",
    },
    {
      q: "Kya recording share karni allowed hai?",
      a: "Nahi, workshop recording sirf registered participants ke liye hai. Sharing strictly prohibited hai.",
    },
    {
      q: "Agar main attend nahi kar paya toh?",
      a: "Agar aap live attend nahi kar paaye, toh 24-ghante ki recording access milayegi. Lekin live interaction ka fayda nahi milega.",
    },
  ];

  return (
    <div className="yt3-body">
      {/* ANNOUNCEMENT BAR */}
      <div className="yt3-announcement-bar" role="banner">
        DAILY LIVE WORKSHOP • 8 PM TO 10 PM PKT
      </div>

      <main>
        {/* HERO SECTION */}
        <section className="yt3-hero-section" id="top">
          <div className="yt3-container">
            <div className="yt3-hero-badge">DAILY LIVE WORKSHOP • 8 PM TO 10 PM PKT</div>
            <h1>
              Niche Se Launch Tak—Sirf <span className="highlight">2 Ghanton</span> Mein
            </h1>
            <p className="yt3-hero-subtitle">
              Sirf 2 Ghanton Mein Apne Faceless YouTube Channel Ka Complete Blueprint Ready Karein
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
                  <div className="yt3-info-value">Live Online</div>
                </div>
                <div className="yt3-info-item">
                  <div className="yt3-info-label">Reg Closes</div>
                  <div className="yt3-info-value">7:00 PM PKT</div>
                </div>
                <div className="yt3-info-item">
                  <div className="yt3-info-label">Max Participants</div>
                  <div className="yt3-info-value">100</div>
                </div>
                <div className="yt3-info-item">
                  <div className="yt3-info-label">Price</div>
                  <div className="yt3-info-value price-val">PKR 1,999</div>
                </div>
              </div>
            </div>

            <button className="yt3-cta-btn" onClick={openPayModal}>
              Aaj Raat Ki Seat PKR 1,999 Mein Lock Karein
              <span className="arrow">&rarr;</span>
            </button>

            <div className="yt3-trust-items">
              <div className="yt3-trust-item">
                <span className="check">✓</span> Live screen-share demo
              </div>
              <div className="yt3-trust-item">
                <span className="check">✓</span> Practical templates
              </div>
              <div className="yt3-trust-item">
                <span className="check">✓</span> 7-day WhatsApp support
              </div>
              <div className="yt3-trust-item">
                <span className="check">✓</span> 24hr recording access
              </div>
            </div>
          </div>
        </section>

        {/* PAIN POINTS */}
        <section className="yt3-section" id="pain-points">
          <div className="yt3-container">
            <h2 className="yt3-section-title">Kya Aap Bhi In Problems Mein Phasse Hain?</h2>
            <p className="yt3-section-subtitle">
              Agar in mein se koi bhi aapki situation hai — toh yeh workshop specifically aapke liye hai.
            </p>
            <div className="yt3-pain-grid">
              <div className="yt3-pain-card">
                <div className="yt3-pain-icon">💻</div>
                <h3>Blank Screen Syndrome</h3>
                <p>Laptop open karte hain lekin samajh nahi aata kahan se shuru karein</p>
              </div>
              <div className="yt3-pain-card">
                <div className="yt3-pain-icon">🎯</div>
                <h3>Niche Confusion</h3>
                <p>Bahut niches dekhi lekin koi bhi finalize nahi ho rahi</p>
              </div>
              <div className="yt3-pain-card">
                <div className="yt3-pain-icon">🎬</div>
                <h3>Random Tutorials</h3>
                <p>YouTube par 50+ videos dekhi, lekin connected system nahi mila</p>
              </div>
              <div className="yt3-pain-card">
                <div className="yt3-pain-icon">🤖</div>
                <h3>Weak AI Scripts</h3>
                <p>ChatGPT se script li lekin woh robotic aur generic lagti hai</p>
              </div>
              <div className="yt3-pain-card">
                <div className="yt3-pain-icon">⏱️</div>
                <h3>Manual Workload</h3>
                <p>Har video ke liye ghanton research, scripting aur editing</p>
              </div>
              <div className="yt3-pain-card">
                <div className="yt3-pain-icon">🛠️</div>
                <h3>Unclear Tools</h3>
                <p>Kaunsa tool use karein, kis order mein — koi clarity nahi</p>
              </div>
            </div>
          </div>
        </section>

        {/* BEFORE / AFTER */}
        <section className="yt3-section yt3-before-after-section" id="before-after">
          <div className="yt3-container">
            <h2 className="yt3-section-title">Workshop Ke Baad Aapka Kya Hoga?</h2>
            <p className="yt3-section-subtitle">Yeh transformation sirf 2 ghanton mein mumkin hai.</p>
            <div style={{ overflowX: "auto" }}>
              <table className="yt3-ba-table">
                <thead>
                  <tr>
                    <th className="before-col">Before</th>
                    <th className="yt3-ba-arrow-col"></th>
                    <th className="after-col">After</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="before-col">
                      <span className="yt3-ba-icon-before">✗</span>Blank screen — &quot;Kya banayein?&quot;
                    </td>
                    <td className="yt3-ba-arrow-col">&rarr;</td>
                    <td className="after-col">
                      <span className="yt3-ba-icon-after">✓</span>Channel blueprint ready
                    </td>
                  </tr>
                  <tr>
                    <td className="before-col">
                      <span className="yt3-ba-icon-before">✗</span>Random niche selection
                    </td>
                    <td className="yt3-ba-arrow-col">&rarr;</td>
                    <td className="after-col">
                      <span className="yt3-ba-icon-after">✓</span>90-day content direction
                    </td>
                  </tr>
                  <tr>
                    <td className="before-col">
                      <span className="yt3-ba-icon-before">✗</span>Manual kaam
                    </td>
                    <td className="yt3-ba-arrow-col">&rarr;</td>
                    <td className="after-col">
                      <span className="yt3-ba-icon-after">✓</span>Niche-selection framework
                    </td>
                  </tr>
                  <tr>
                    <td className="before-col">
                      <span className="yt3-ba-icon-before">✗</span>Disconnected AI tools
                    </td>
                    <td className="yt3-ba-arrow-col">&rarr;</td>
                    <td className="after-col">
                      <span className="yt3-ba-icon-after">✓</span>AI tools ka organized setup
                    </td>
                  </tr>
                  <tr>
                    <td className="before-col">
                      <span className="yt3-ba-icon-before">✗</span>PKR income mindset
                    </td>
                    <td className="yt3-ba-arrow-col">&rarr;</td>
                    <td className="after-col">
                      <span className="yt3-ba-icon-after">✓</span>Dollar-targeted audience framework
                    </td>
                  </tr>
                  <tr>
                    <td className="before-col">
                      <span className="yt3-ba-icon-before">✗</span>No clear action plan
                    </td>
                    <td className="yt3-ba-arrow-col">&rarr;</td>
                    <td className="after-col">
                      <span className="yt3-ba-icon-after">✓</span>Step-by-step production process
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
            <h2 className="yt3-section-title">2 Ghanton Ka Detailed Agenda</h2>
            <p className="yt3-section-subtitle">Har minute planned hai. Koi time waste nahi hoga.</p>
            <div className="yt3-agenda-cards">
              <div className="yt3-agenda-card">
                <h3>
                  <span className="hour-badge">HOUR 1</span>YouTube Empire Framework + Niche Selection System
                </h3>
                <ul className="yt3-agenda-items">
                  <li><span className="dot">•</span>Profitable niche evaluation</li>
                  <li><span className="dot">•</span>Audience demand analysis</li>
                  <li><span className="dot">•</span>Competitor analysis framework</li>
                  <li><span className="dot">•</span>Faceless-friendly formats</li>
                  <li><span className="dot">•</span>Channel positioning strategy</li>
                  <li><span className="dot">•</span>Content depth planning</li>
                  <li><span className="dot">•</span>90-day channel direction</li>
                </ul>
                <div className="yt3-agenda-outcome">
                  <strong>Hour 1 ke baad:</strong> Aapko clear hoga ke kya banana hai, kis audience ke liye banana hai aur kyun.
                </div>
              </div>
              <div className="yt3-agenda-card">
                <h3>
                  <span className="hour-badge">HOUR 2</span>AI Storytelling + Automation Tools Live Demo
                </h3>
                <ul className="yt3-agenda-items">
                  <li><span className="dot">•</span>Competitor research tools</li>
                  <li><span className="dot">•</span>Topic generation system</li>
                  <li><span className="dot">•</span>High-click title frameworks</li>
                  <li><span className="dot">•</span>Hooks and script writing</li>
                  <li><span className="dot">•</span>Visual planning process</li>
                  <li><span className="dot">•</span>Voiceover production</li>
                  <li><span className="dot">•</span>Editing workflow</li>
                  <li><span className="dot">•</span>Automation tool stack</li>
                  <li><span className="dot">•</span>Live production demonstration</li>
                </ul>
                <div className="yt3-agenda-outcome">
                  <strong>Hour 2 ke baad:</strong> Aap complete content-production workflow ko live kaam karte dekhein ge.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DELIVERABLES */}
        <section className="yt3-section yt3-deliverables-section" id="deliverables">
          <div className="yt3-container">
            <h2 className="yt3-section-title">Workshop Ke Baad Aapke Paas Kya Hoga?</h2>
            <p className="yt3-section-subtitle">10 practical deliverables jo aap channel launch ke liye use kar sakte hain.</p>
            <div className="yt3-deliverables-grid">
              <div className="yt3-deliverable-item">
                <div className="d-check">✓</div>
                <span>Faceless channel blueprint</span>
              </div>
              <div className="yt3-deliverable-item">
                <div className="d-check">✓</div>
                <span>Niche validation framework</span>
              </div>
              <div className="yt3-deliverable-item">
                <div className="d-check">✓</div>
                <span>Competitor research process</span>
              </div>
              <div className="yt3-deliverable-item">
                <div className="d-check">✓</div>
                <span>90-day content calendar</span>
              </div>
              <div className="yt3-deliverable-item">
                <div className="d-check">✓</div>
                <span>Topic-generation workflow</span>
              </div>
              <div className="yt3-deliverable-item">
                <div className="d-check">✓</div>
                <span>Title and packaging framework</span>
              </div>
              <div className="yt3-deliverable-item">
                <div className="d-check">✓</div>
                <span>AI storytelling process</span>
              </div>
              <div className="yt3-deliverable-item">
                <div className="d-check">✓</div>
                <span>Script and visual planning system</span>
              </div>
              <div className="yt3-deliverable-item">
                <div className="d-check">✓</div>
                <span>Automation tools stack</span>
              </div>
              <div className="yt3-deliverable-item">
                <div className="d-check">✓</div>
                <span>30-day action direction</span>
              </div>
            </div>
          </div>
        </section>

        {/* BONUS STACK */}
        <section className="yt3-section yt3-bonus-section" id="bonuses">
          <div className="yt3-container">
            <h2 className="yt3-section-title">Sirf Workshop Nahi — Complete Implementation Resource Stack</h2>
            <div style={{ textAlign: "center" }}>
              <span className="yt3-bonus-badge">First 500 Founding Registrations</span>
            </div>
            <div className="yt3-bonus-rows">
              <div className="yt3-bonus-row">
                <div className="yt3-bonus-row-left">
                  <span className="gift">🎁</span>
                  <span className="bonus-title">AI Prompts Pack — 50+ Prompts</span>
                </div>
                <span className="bonus-value">PKR 3,000</span>
              </div>
              <div className="yt3-bonus-row">
                <div className="yt3-bonus-row-left">
                  <span className="gift">🎁</span>
                  <span className="bonus-title">Niche Research Template</span>
                </div>
                <span className="bonus-value">PKR 2,000</span>
              </div>
              <div className="yt3-bonus-row">
                <div className="yt3-bonus-row-left">
                  <span className="gift">🎁</span>
                  <span className="bonus-title">90-Day Content Calendar</span>
                </div>
                <span className="bonus-value">PKR 2,500</span>
              </div>
              <div className="yt3-bonus-row">
                <div className="yt3-bonus-row-left">
                  <span className="gift">🎁</span>
                  <span className="bonus-title">Private WhatsApp Group — 7 Days</span>
                </div>
                <span className="bonus-value">PKR 5,000</span>
              </div>
              <div className="yt3-bonus-row">
                <div className="yt3-bonus-row-left">
                  <span className="gift">🎁</span>
                  <span className="bonus-title">Workshop Recording — 24 Hours</span>
                </div>
                <span className="bonus-value">PKR 2,999</span>
              </div>
            </div>
            <div className="yt3-price-anchor">
              <span className="old-price">PKR 15,499</span>
              <span className="new-price">PKR 1,999</span>
            </div>
            <div className="yt3-bonus-cta-wrap">
              <button className="yt3-cta-btn" onClick={openPayModal}>
                Abhi Seat Lock Karein — PKR 1,999
                <span className="arrow">&rarr;</span>
              </button>
            </div>
          </div>
        </section>

        {/* CREDIBILITY */}
        <section className="yt3-section" id="credibility">
          <div className="yt3-container">
            <h2 className="yt3-section-title">Abrar Nadir Ka Experience</h2>
            <p className="yt3-section-subtitle">Practical experience jo workshop mein aayega.</p>
            <div className="yt3-credibility-list">
              <div className="yt3-credibility-item">
                <div className="c-icon">🌐</div>
                <span>International-client experience</span>
              </div>
              <div className="yt3-credibility-item">
                <div className="c-icon">⚡</div>
                <span>YouTube automation workflows</span>
              </div>
              <div className="yt3-credibility-item">
                <div className="c-icon">🎬</div>
                <span>Faceless content systems</span>
              </div>
              <div className="yt3-credibility-item">
                <div className="c-icon">🤖</div>
                <span>AI production processes</span>
              </div>
              <div className="yt3-credibility-item">
                <div className="c-icon">👥</div>
                <span>Team and editor workflows</span>
              </div>
              <div className="yt3-credibility-item">
                <div className="c-icon">🎥</div>
                <span>Practical live demonstrations</span>
              </div>
            </div>
          </div>
        </section>

        {/* AUDIENCE FIT */}
        <section className="yt3-section yt3-audience-section" id="audience-fit">
          <div className="yt3-container">
            <h2 className="yt3-section-title">Kya Yeh Workshop Aapke Liye Hai?</h2>
            <p className="yt3-section-subtitle">Brutal honesty — dekhein kiski fit hai aur kiski nahi.</p>
            <div className="yt3-audience-grid">
              <div className="yt3-audience-card fit-yes">
                <h3>✓ Yeh Workshop Aapke Liye Hai Agar:</h3>
                <ul>
                  <li><span className="icon">✓</span>Aap faceless YouTube channel start karna chahte hain</li>
                  <li><span className="icon">✓</span>Aapko niche selection mein confusion hai</li>
                  <li><span className="icon">✓</span>Aap AI tools use karna chahte hain lekin nahi aata</li>
                  <li><span className="icon">✓</span>Aap chahte hain dollar audience target karein</li>
                  <li><span className="icon">✓</span>Aapke paas system nahi hai — sirf random ideas hain</li>
                  <li><span className="icon">✓</span>Aap practical demo dekh kar seekhna chahte hain</li>
                  <li><span className="icon">✓</span>Aap ready hain 2 ghante serious focus karne ke liye</li>
                </ul>
              </div>
              <div className="yt3-audience-card fit-no">
                <h3>✗ Yeh Workshop Aapke Liye Nahi Hai Agar:</h3>
                <ul>
                  <li><span className="icon">✗</span>Aapko lagta hai bina mehnat ke results aayenge</li>
                  <li><span className="icon">✗</span>Aap already ek successful faceless channel chala rahe hain</li>
                  <li><span className="icon">✗</span>Aap live workshops attend nahi karna chahte</li>
                  <li><span className="icon">✗</span>Aapko sirf &quot;get rich quick&quot; tips chahiye</li>
                  <li><span className="icon">✗</span>Aap practical implementation nahi karna chahte</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* PAYMENT DETAILS */}
        <section className="yt3-section yt3-payment-section" id="payment">
          <div className="yt3-container" style={{ maxWidth: "700px" }}>
            <h2 className="yt3-section-title">Direct Payment Details</h2>
            <p className="yt3-section-subtitle">Kisi bhi payment method se PKR 1,999 transfer karein.</p>
            
            {/* Bank */}
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#0F172A", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
                🏦 Meezan Bank Limited
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#F8FAFC", padding: "10px 14px", borderRadius: "8px" }}>
                  <div><p style={{ fontSize: "11px", color: "#94A3B8", margin: 0 }}>Account Title</p><p style={{ fontSize: "14px", fontWeight: 600, color: "#0F172A", margin: "2px 0 0" }}>Muhammad Abrar</p></div>
                  <button onClick={() => copyToClipboard("Muhammad Abrar", "title")} className={`yt3-copy-btn ${copiedKey === "title" ? "copied" : ""}`}>{copiedKey === "title" ? "Copied ✓" : "Copy"}</button>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#F8FAFC", padding: "10px 14px", borderRadius: "8px" }}>
                  <div><p style={{ fontSize: "11px", color: "#94A3B8", margin: 0 }}>Account Number</p><p style={{ fontSize: "14px", fontWeight: 600, color: "#0F172A", margin: "2px 0 0" }}>02370103321036</p></div>
                  <button onClick={() => copyToClipboard("02370103321036", "acc")} className={`yt3-copy-btn ${copiedKey === "acc" ? "copied" : ""}`}>{copiedKey === "acc" ? "Copied ✓" : "Copy"}</button>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#F8FAFC", padding: "10px 14px", borderRadius: "8px" }}>
                  <div><p style={{ fontSize: "11px", color: "#94A3B8", margin: 0 }}>IBAN</p><p style={{ fontSize: "14px", fontWeight: 600, color: "#0F172A", margin: "2px 0 0" }}>PK39MEZN0002370103321036</p></div>
                  <button onClick={() => copyToClipboard("PK39MEZN0002370103321036", "iban")} className={`yt3-copy-btn ${copiedKey === "iban" ? "copied" : ""}`}>{copiedKey === "iban" ? "Copied ✓" : "Copy"}</button>
                </div>
              </div>
            </div>

            {/* EasyPaisa & Binance */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#0F172A", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
                  📱 EasyPaisa
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#F8FAFC", padding: "10px 14px", borderRadius: "8px" }}>
                    <div>
                      <p style={{ fontSize: "11px", color: "#94A3B8", margin: 0 }}>Number</p>
                      <p style={{ fontSize: "14px", fontWeight: 600, color: "#0F172A", margin: "2px 0 0" }}>03274532186</p>
                    </div>
                    <button onClick={() => copyToClipboard("03274532186", "ep_num")} className={`yt3-copy-btn ${copiedKey === "ep_num" ? "copied" : ""}`}>{copiedKey === "ep_num" ? "Copied ✓" : "Copy"}</button>
                  </div>
                  <div style={{ background: "#F8FAFC", padding: "10px 14px", borderRadius: "8px" }}>
                    <p style={{ fontSize: "11px", color: "#94A3B8", margin: 0 }}>Name</p>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#0F172A", margin: "2px 0 0" }}>Muhammad Abrar Ghauri</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#0F172A", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
                  🟡 Binance (Crypto / USDT)
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#F8FAFC", padding: "10px 14px", borderRadius: "8px" }}>
                    <div>
                      <p style={{ fontSize: "11px", color: "#94A3B8", margin: 0 }}>Binance ID / UID</p>
                      <p style={{ fontSize: "14px", fontWeight: 600, color: "#0F172A", margin: "2px 0 0" }}>117971802</p>
                    </div>
                    <button onClick={() => copyToClipboard("117971802", "binance_id")} className={`yt3-copy-btn ${copiedKey === "binance_id" ? "copied" : ""}`}>{copiedKey === "binance_id" ? "Copied ✓" : "Copy"}</button>
                  </div>
                  <div style={{ background: "#F8FAFC", padding: "10px 14px", borderRadius: "8px" }}>
                    <p style={{ fontSize: "11px", color: "#94A3B8", margin: 0 }}>Name</p>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#0F172A", margin: "2px 0 0" }}>abrarnadircb</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="yt3-section" id="faq">
          <div className="yt3-container">
            <h2 className="yt3-section-title">Frequently Asked Questions</h2>
            <p className="yt3-section-subtitle">Aapke dil mein jo bhi sawal hai — yahan mil jayega.</p>
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
                      {faq.q}
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
            <h2>Aaj Raat 8 Baje Apna YouTube System Ready Karein</h2>
            <p className="subtitle">Sirf 2 ghanton mein faceless YouTube channel ka complete blueprint — LIVE demo ke saath.</p>
            <div className="yt3-final-price">
              <span className="currency">PKR</span> 1,999
            </div>
            <button className="yt3-cta-btn" onClick={openPayModal}>
              Aaj Raat Ki Seat Lock Karein
              <span className="arrow">&rarr;</span>
            </button>
            <p className="fine-print">Registration 7:00 PM PKT pe close. Live workshop 8:00 – 10:00 PM PKT. Recording 24 ghante available.</p>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="yt3-footer">
        <div className="yt3-container">
          <p>&copy; 2026 Abrar Nadir. All rights reserved.</p>
          <p style={{ marginTop: "6px" }}>
            Results may vary. Workshop provides education and frameworks — success depends on individual execution.
          </p>
          <div style={{ marginTop: "12px", display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}>
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
          Limited Seats
        </div>
        <button className="sticky-btn" onClick={openPayModal}>
          Seat Lock Karein &rarr;
        </button>
      </div>

      {/* BEAUTIFUL ALL-IN-ONE REGISTRATION & PAYMENT POPUP */}
      {payModalOpen && (
        <div className="yt3-paymodal-overlay" onClick={closePayModal} role="dialog" aria-modal="true">
          <div className="yt3-paybox" onClick={(e) => e.stopPropagation()}>
            
            {/* Header */}
            <div className="yt3-paybox-header">
              <div>
                <div className="yt3-paybox-header-title">Live Workshop Registration</div>
                <h3>{modalStep === 1 ? "Complete Your Registration & Payment" : "Verification in Progress"}</h3>
              </div>
              <button className="yt3-paybox-close" onClick={closePayModal} aria-label="Close modal">
                &times;
              </button>
            </div>

            {/* Body */}
            <div className="yt3-paybox-body">
              {modalStep === 1 ? (
                <form onSubmit={handleSubmitProof}>
                  
                  {/* Step 1: User details */}
                  <div className="yt3-form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      className="yt3-form-input"
                      placeholder="Apna mukammal naam likhein"
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
                    <label>Transaction ID / TID <span style={{ color: "#94A3B8", fontWeight: "normal", fontSize: "12px" }}>(Optional)</span></label>
                    <input
                      type="text"
                      className="yt3-form-input"
                      placeholder="Agar available ho toh likhein"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                    />
                  </div>

                  {/* Upload Screenshot */}
                  <div className="yt3-form-group">
                    <label>Attach Payment Screenshot *</label>
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
                          <span style={{ display: "inline-block", background: "#DCFCE7", color: "#166534", fontSize: "12px", fontWeight: 700, padding: "3px 10px", borderRadius: "9999px" }}>
                            Screenshot Uploaded ✓
                          </span>
                          <p style={{ fontSize: "12px", color: "#475569", marginTop: "4px", fontWeight: 600 }}>{screenshotFilename}</p>
                        </div>
                      ) : (
                        <div>
                          <span style={{ fontSize: "24px", display: "block", marginBottom: "4px" }}>📸</span>
                          <p style={{ fontSize: "13px", fontWeight: 700, color: "#1E293B" }}>Click to upload payment screenshot</p>
                          <p style={{ fontSize: "11px", color: "#64748B" }}>JPG, PNG, WEBP ya PDF (Max: 10MB)</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {formError && (
                    <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", color: "#DC2626", padding: "10px 14px", borderRadius: "10px", fontSize: "13px", fontWeight: 600, marginBottom: "14px" }}>
                      {formError}
                    </div>
                  )}

                  {/* CTA Button */}
                  <button type="submit" className="yt3-verify-btn" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Verify Payment on WhatsApp →"}
                  </button>
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
                    Opening WhatsApp automatically in {countdown} seconds...
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
              <h2>💰 100% Refund Guarantee — No Questions Asked</h2>
            </div>
            <div className="yt3-policy-modal-body">
              <p>We are confident in the value of this workshop. That&apos;s why we offer a <strong>100% money-back guarantee</strong>. If you feel the workshop didn&apos;t meet your expectations, you can request a full 100% refund within 72 hours of the workshop&apos;s scheduled end time.</p>
              <p><strong>Refund Eligibility:</strong></p>
              <ul>
                <li>Full 100% refund request must be submitted within <strong>72 hours</strong> of the workshop&apos;s scheduled end time.</li>
                <li>Requests must be sent via WhatsApp to our support number: <strong>+92 329 6158206</strong>.</li>
                <li>No explanation or justification is required — simply state your request.</li>
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
              <h2>🔄 Seat Transfer Policy</h2>
            </div>
            <div className="yt3-policy-modal-body">
              <p>If you are unable to attend the workshop, you may transfer your seat to another person under the following conditions:</p>
              <ul>
                <li>Transfer requests must be submitted at least <strong>2 hours before</strong> the workshop starts.</li>
                <li>The transferee must register via WhatsApp with their own details.</li>
                <li>Only one transfer per registration is allowed.</li>
              </ul>
              <p>To request a transfer, contact us via WhatsApp (+92 329 6158206) with your registration details.</p>
            </div>
          </div>
        </div>
      )}

      {policyModal === "disclaimer" && (
        <div className="yt3-policy-modal-overlay" onClick={closePolicy} role="dialog" aria-modal="true">
          <div className="yt3-policy-modal" onClick={(e) => e.stopPropagation()}>
            <button className="yt3-policy-modal-close" onClick={closePolicy} aria-label="Close">&times;</button>
            <div className="yt3-policy-modal-header">
              <h2>📋 Disclaimer</h2>
            </div>
            <div className="yt3-policy-modal-body">
              <p><strong>General Disclaimer</strong></p>
              <p>This workshop is designed for educational and informational purposes only. The content, strategies, and techniques shared during the workshop are based on the presenter&apos;s personal experience and research.</p>
              <p><strong>No Guaranteed Income:</strong></p>
              <ul>
                <li>This workshop does not guarantee any specific income level, subscriber count, or business outcome.</li>
                <li>Success in YouTube content creation requires consistent effort, quality content, and market understanding.</li>
              </ul>
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
              <p><strong>Privacy Policy — How We Handle Your Data</strong></p>
              <p>Your privacy is important to us. We collect your Full Name and WhatsApp Number solely for workshop communication, registration verification, and 7-day community access.</p>
              <p><strong>Contact:</strong> For any privacy-related questions, reach out via WhatsApp at <strong>+92 329 6158206</strong>.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
