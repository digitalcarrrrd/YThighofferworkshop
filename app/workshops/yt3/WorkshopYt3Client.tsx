"use client";

import React, { useState, useEffect } from "react";
import "./yt3.css";

const GHL_URL = "https://api.leadconnectorhq.com/widget/form/DTVg8ZfDsUkx9XYsvYc7";

export default function WorkshopYt3Client() {
  const [dynamicDate, setDynamicDate] = useState<string>("");
  const [ghlModalOpen, setGhlModalOpen] = useState<boolean>(false);
  const [ghlIframeLoading, setGhlIframeLoading] = useState<boolean>(true);
  const [policyModal, setPolicyModal] = useState<"refund" | "transfer" | "disclaimer" | "privacy" | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [stickyVisible, setStickyVisible] = useState<boolean>(false);

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
      if (scrollY > 500 && !ghlModalOpen) {
        setStickyVisible(true);
      } else {
        setStickyVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ghlModalOpen]);

  // Handle Escape key to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (ghlModalOpen) closeGHLModal();
        if (policyModal) setPolicyModal(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [ghlModalOpen, policyModal]);

  const openGHLModal = () => {
    setGhlIframeLoading(true);
    setGhlModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeGHLModal = () => {
    setGhlModalOpen(false);
    document.body.style.overflow = "";
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
      a: "Verification team Payment proof receive karne ke baad jaldi verification karegi. Confirmation WhatsApp par aayegi.",
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

            <button className="yt3-cta-btn" onClick={openGHLModal}>
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
              <button className="yt3-cta-btn" onClick={openGHLModal}>
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
            <h2 className="yt3-section-title">Payment Details</h2>
            <p className="yt3-section-subtitle">Kisi bhi method se PKR 1,999 transfer karein.</p>
            
            {/* Bank */}
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#0F172A", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
                🏦 Meezan Bank Limited
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#F8FAFC", padding: "10px 14px", borderRadius: "8px" }}>
                  <div><p style={{ fontSize: "11px", color: "#94A3B8", margin: 0 }}>Account Title</p><p style={{ fontSize: "14px", fontWeight: 600, color: "#0F172A", margin: "2px 0 0" }}>Muhammad Abrar</p></div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#F8FAFC", padding: "10px 14px", borderRadius: "8px" }}>
                  <div><p style={{ fontSize: "11px", color: "#94A3B8", margin: 0 }}>Account Number</p><p style={{ fontSize: "14px", fontWeight: 600, color: "#0F172A", margin: "2px 0 0" }}>02370103321036</p></div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#F8FAFC", padding: "10px 14px", borderRadius: "8px" }}>
                  <div><p style={{ fontSize: "11px", color: "#94A3B8", margin: 0 }}>IBAN</p><p style={{ fontSize: "14px", fontWeight: 600, color: "#0F172A", margin: "2px 0 0" }}>PK39MEZN0002370103321036</p></div>
                </div>
              </div>
            </div>

            {/* EasyPaisa & JazzCash */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#0F172A", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
                  📱 EasyPaisa
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div style={{ background: "#F8FAFC", padding: "10px 14px", borderRadius: "8px" }}>
                    <p style={{ fontSize: "11px", color: "#94A3B8", margin: 0 }}>Number</p>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#0F172A", margin: "2px 0 0" }}>03296158206</p>
                  </div>
                  <div style={{ background: "#F8FAFC", padding: "10px 14px", borderRadius: "8px" }}>
                    <p style={{ fontSize: "11px", color: "#94A3B8", margin: 0 }}>Name</p>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#0F172A", margin: "2px 0 0" }}>Abrar Nadir Support</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#0F172A", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
                  📱 JazzCash
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div style={{ background: "#F8FAFC", padding: "10px 14px", borderRadius: "8px" }}>
                    <p style={{ fontSize: "11px", color: "#94A3B8", margin: 0 }}>Number</p>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#0F172A", margin: "2px 0 0" }}>03296158206</p>
                  </div>
                  <div style={{ background: "#F8FAFC", padding: "10px 14px", borderRadius: "8px" }}>
                    <p style={{ fontSize: "11px", color: "#94A3B8", margin: 0 }}>Name</p>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#0F172A", margin: "2px 0 0" }}>Abrar Nadir Support</p>
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
            <button className="yt3-cta-btn" onClick={openGHLModal}>
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
        <button className="sticky-btn" onClick={openGHLModal}>
          Seat Lock Karein &rarr;
        </button>
      </div>

      {/* GHL FORM MODAL */}
      {ghlModalOpen && (
        <div className="yt3-ghl-modal-overlay" onClick={closeGHLModal} role="dialog" aria-modal="true" aria-label="Registration Form">
          <div className="yt3-ghl-modal" onClick={(e) => e.stopPropagation()}>
            <button className="yt3-ghl-modal-close" onClick={closeGHLModal} aria-label="Close form">
              &times;
            </button>
            {ghlIframeLoading && (
              <div className="yt3-ghl-modal-loading">
                <div className="yt3-spinner"></div>
                <span>Form load ho raha hai...</span>
              </div>
            )}
            <iframe
              src={GHL_URL}
              title="Registration Form"
              onLoad={() => setGhlIframeLoading(false)}
            />
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
                <li>Requests must be sent via WhatsApp to the support number.</li>
                <li>No explanation or justification is required — simply state your request.</li>
              </ul>
              <p><strong>Refund Process:</strong></p>
              <ul>
                <li>Refunds are processed within 3–5 business days via the original payment method.</li>
                <li>You will receive confirmation once the 100% refund has been initiated.</li>
                <li>No questions will be asked — we honor every valid request.</li>
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
                <li>The transferee must register via the provided form with their own details.</li>
                <li>Only one transfer per registration is allowed.</li>
              </ul>
              <p>To request a transfer, contact us via WhatsApp with your registration details.</p>
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
              <p>This workshop is designed for educational and informational purposes only. The content, strategies, and techniques shared during the workshop are based on the presenter&apos;s personal experience and research. Individual results may vary significantly depending on factors including but not limited to: effort, market conditions, prior experience, niche selection, and consistency of execution.</p>
              <p><strong>No Guaranteed Income:</strong></p>
              <ul>
                <li>This workshop does not guarantee any specific income level, subscriber count, or business outcome.</li>
                <li>Success in YouTube content creation requires consistent effort, quality content, and market understanding beyond what any single workshop can provide.</li>
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
              <p>Your privacy is important to us. This policy explains how we collect, use, and protect your personal information when you register for our workshop.</p>
              <p><strong>Information We Collect:</strong></p>
              <ul>
                <li><strong>Full Name</strong> — To identify your registration and personalize communication.</li>
                <li><strong>WhatsApp Number</strong> — To send workshop updates, confirmation, and support.</li>
                <li><strong>Email Address</strong> — For backup communication and delivery of digital materials.</li>
              </ul>
              <p><strong>Contact:</strong> For any privacy-related questions, reach out via WhatsApp at +92 329 6158206.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
