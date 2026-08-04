/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable react/no-unescaped-entities */
"use client";
import React from 'react';
import './consulting/styles.css';

export default function HomePage() {
  const [language, setLanguage] = React.useState('en');
  const [selectedRPM, setSelectedRPM] = React.useState(14.50);
  const [views, setViews] = React.useState(100000);
  const [currency, setCurrency] = React.useState('PKR');
  const [quizStep, setQuizStep] = React.useState(1);
  const [quizAnswers, setQuizAnswers] = React.useState({ step1: '', step2: '' });
  const [isBookingModalOpen, setIsBookingModalOpen] = React.useState(false);
  const [bookingServiceTitle, setBookingServiceTitle] = React.useState('');
  const [buyerName, setBuyerName] = React.useState('');
  const [buyerWhatsapp, setBuyerWhatsapp] = React.useState('');
  
  const [toastIndex, setToastIndex] = React.useState(0);
  const [isToastVisible, setIsToastVisible] = React.useState(false);
  const [copiedId, setCopiedId] = React.useState(null);

  const pricingData = {
    PKR: { tier1: 'Rs. 15,000', tier2: 'Rs. 45,000', tier3: 'Rs. 120,000' },
    USD: { tier1: '$60 USD', tier2: '$160 USD', tier3: '$450 USD' }
  };

  const toastMessages = [
    "🔥 Usman from Lahore just booked a 1:1 Strategy Call",
    "⭐ Saima from Karachi joined the 30-Day Accelerator Program",
    "⚡ Hamza from Islamabad hired an editor from the Ecosystem",
    "🎯 Business client booked consulting package",
    "💰 Student Milestone: Bilal earned $1,450 from a Finance channel"
  ];

  React.useEffect(() => {
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setToastIndex(prev => (prev + 1) % 5);
      setIsToastVisible(true);
      setTimeout(() => setIsToastVisible(false), 4500);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  const toggleLanguage = (e) => {
    e.preventDefault();
    setLanguage(prev => prev === 'en' ? 'ur' : 'en');
  };

  const copyTextToClipboard = (text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const pkPayout = Math.round((views / 1000) * 0.35);
  const globalPayout = Math.round((views / 1000) * selectedRPM);
  const diff = globalPayout - pkPayout;

  const selectQuizStep = (step, value) => {
    if (step === 1) {
      setQuizAnswers(prev => ({ ...prev, step1: value }));
      setQuizStep(2);
    } else if (step === 2) {
      setQuizAnswers(prev => ({ ...prev, step2: value }));
      setQuizStep(3);
    }
  };

  const generateQuizRecommendation = () => {
    if (quizAnswers.step1 === 'beginner' || quizAnswers.step2 === 'income') {
      return language === 'en' 
        ? "🎯 Perfect Match: 30-Day Creator Accelerator Mentorship. Learn CapCut video editing, Canva thumbnail design, and build your automated YouTube ecosystem step-by-step."
        : "🎯 بہترین انتخاب: 30 دن کی اسسٹنٹ مینٹورشپ۔ کیپ کٹ ایڈیٹنگ، کینوا تھمب نیل ڈیزائن، اور مرحلہ وار خودکار یوٹیوب سسٹم بنانا سیکھیں۔";
    } else if (quizAnswers.step1 === 'business') {
      return language === 'en'
        ? "🏢 Recommended Path: Business Growth Consulting. Abrar will train your team, build your organic video funnel, and scale brand revenue via YouTube automation."
        : "🏢 تجویز کردہ راستہ: بزنس گروتھ کنسلٹنگ۔ ابرار آپ کی ٹیم کی تربیت کریں گے، نامیاتی فینل تیار کریں گے، اور آمدنی میں اضافہ کریں گے۔";
    }
    return language === 'en'
      ? "Based on your inputs, we recommend starting with Abrar Nadir's 1:1 Power Strategy Call to audit your tools and launch your first channel."
      : "آپ کے جوابات کی روشنی میں، ہم تجویز کرتے ہیں کہ آپ ابرار نادر کے ساتھ 1:1 پاور اسٹریٹجی سیشن بک کریں تاکہ آپ کے چینل کا سفر شروع ہو سکے۔";
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const ghlWebhookUrl = "https://services.leadconnectorhq.com/hooks/abrarnadir_webhook_placeholder";
    fetch(ghlWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: buyerName, whatsapp: buyerWhatsapp, service: bookingServiceTitle, timestamp: new Date().toISOString() })
    }).catch(() => console.log("GHL Webhook executed"));
    
    const whatsappText = `Hi Abrar's Manager, I just booked: ${bookingServiceTitle}.\nName: ${buyerName}\nWhatsApp: ${buyerWhatsapp}\nHere is my payment screenshot for confirmation.`;
    const whatsappLink = `https://wa.me/923007654321?text=${encodeURIComponent(whatsappText)}`;
    
    alert(`🎉 Thank you, ${buyerName}! Your booking request is being automated via GoHighLevel (GHL). We are now opening WhatsApp...`);
    setIsBookingModalOpen(false);
    window.open(whatsappLink, '_blank');
  };

return (
    <div className="consulting-page">
      

  {/*  Navigation Bar  */}
  <nav className="navbar">
    <div className="container nav-container">
      <a href="#" className="brand-logo">
        <div className="logo-avatar">AN</div>
        <div className="brand-name">Abrar <span>Nadir</span></div>
      </a>

      <ul className="nav-links">
        <li><a href="#motivation" data-en="The $70B Opportunity" data-ur="70B کا موقع">{language === 'en' ? "The $70B Opportunity" : "70B کا موقع"}</a></li>
        <li><a href="#calculator" data-en="Niche Calculator" data-ur="آمدنی کیلکولیٹر">{language === 'en' ? "Niche Calculator" : "آمدنی کیلکولیٹر"}</a></li>
        <li><a href="#ai-gap" data-en="AI Language Gap" data-ur="اے آئی کا کردار">{language === 'en' ? "AI Language Gap" : "اے آئی کا کردار"}</a></li>
        <li><a href="#about" data-en="Abrar's Story" data-ur="ابرار کی کہانی">{language === 'en' ? "Abrar's Story" : "ابرار کی کہانی"}</a></li>
        <li><a href="#empire" data-en="YT Empire" data-ur="یوٹیوب ایمپائر">{language === 'en' ? "YT Empire" : "یوٹیوب ایمپائر"}</a></li>
        <li><a href="#pricing" data-en="1:1 Services" data-ur="سروسز اور فیس">{language === 'en' ? "1:1 Services" : "سروسز اور فیس"}</a></li>
      </ul>

      <div className="nav-actions">
        <button className="lang-toggle" onClick={(e) => { e.preventDefault(); toggleLanguage(e); }} id="lang-btn">{language === "en" ? "اردو" : "English"}</button>
        <a href="#pricing" className="btn btn-primary" data-en="Book 1:1 Call ⚡" data-ur="کال بک کریں ⚡">{language === 'en' ? "Book 1:1 Call ⚡" : "کال بک کریں ⚡"}</a>
      </div>
    </div>
  </nav>

  {/*  Hero Section  */}
  <section className="hero">
    <div className="container hero-grid">
      <div className="hero-content">
        <div className="section-tag" data-en="🚀 YouTube Automation & Passive Income" data-ur="🚀 یوٹیوب آٹومیشن اور غیر فعال آمدنی">{language === 'en' ? "🚀 YouTube Automation & Passive Income" : "🚀 یوٹیوب آٹومیشن اور غیر فعال آمدنی"}</div>
        <h1 data-en="Build Your Own Cash-Flowing YouTube Empire" data-ur="اپنا خود کا یوٹیوب آمدنی کا ایمپائر کھڑا کریں">{language === 'en' ? "Build Your Own Cash-Flowing YouTube Empire" : "اپنا خود کا یوٹیوب آمدنی کا ایمپائر کھڑا کریں"}</h1>
        <p className="hero-subtitle" data-en="Stop trading hours for pennies. Learn how to launch faceless YouTube channels targeting high-paying international audiences using free tools and AI workflows." data-ur="پیسوں کے لیے وقت بیچنا بند کریں۔ سیکھیں کہ کس طرح مفت ٹولز اور AI کے ذریعے دنیا بھر کے امیر ترین ممالک کو ہدف بنانے والے فیس لیس چینلز شروع کیے جائیں۔">
          Stop trading hours for pennies. Learn how to launch faceless YouTube channels targeting high-paying international audiences using free tools and AI workflows.
        </p>

        <div className="hero-badges">
          <div className="hero-badge-item" data-en="📹 3,000+ Students Trained" data-ur="📹 3000 سے زائد طلباء">{language === 'en' ? "📹 3,000+ Students Trained" : "📹 3000 سے زائد طلباء"}</div>
          <div className="hero-badge-item" data-en="🌍 $70B Creator Payouts" data-ur="🌍 70 ارب ڈالر تقسیم">{language === 'en' ? "🌍 $70B Creator Payouts" : "🌍 70 ارب ڈالر تقسیم"}</div>
          <div className="hero-badge-item" data-en="💻 AI-Powered Workflows" data-ur="💻 آرٹیفیشل انٹیلیجنس سسٹمز">{language === 'en' ? "💻 AI-Powered Workflows" : "💻 آرٹیفیشل انٹیلیجنس سسٹمز"}</div>
        </div>

        <div className="hero-actions">
          <a href="#pricing" className="btn btn-primary" data-en="Start Building Today 🚀" data-ur="آج ہی شروع کریں 🚀">{language === 'en' ? "Start Building Today 🚀" : "آج ہی شروع کریں 🚀"}</a>
          <a href="#calculator" className="btn btn-secondary" data-en="Compare Niche RPMs 🧮" data-ur="نیش کیلکولیٹر 🧮">{language === 'en' ? "Compare Niche RPMs 🧮" : "نیش کیلکولیٹر 🧮"}</a>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-card">
          <div className="profile-header">
            <div className="profile-avatar-lg">AN</div>
            <div className="profile-info">
              <h3>Abrar Nadir</h3>
              <p data-en="YouTube Automation Pioneer" data-ur="یوٹیوب آٹومیشن ایکسپرٹ">{language === 'en' ? "YouTube Automation Pioneer" : "یوٹیوب آٹومیشن ایکسپرٹ"}</p>
            </div>
          </div>

          <div className="hero-stats-grid">
            <div className="stat-box">
              <div className="stat-number gradient-text-red" data-en="100K+" data-ur="100K+">{language === 'en' ? "100K+" : "100K+"}</div>
              <div className="stat-label" data-en="Social Fan Base" data-ur="سوشل فین بیس (اتھارٹی)">{language === 'en' ? "Social Fan Base" : "سوشل فین بیس (اتھارٹی)"}</div>
            </div>
            <div className="stat-box">
              <div className="stat-number gradient-text-gold" data-en="$50K+" data-ur="$50K+">{language === 'en' ? "$50K+" : "$50K+"}</div>
              <div className="stat-label" data-en="YT Empire Revenue" data-ur="ایمپائر بلڈر ریونیو">{language === 'en' ? "YT Empire Revenue" : "ایمپائر بلڈر ریونیو"}</div>
            </div>
            <div className="stat-box">
              <div className="stat-number" data-en="500+" data-ur="500+">{language === 'en' ? "500+" : "500+"}</div>
              <div className="stat-label" data-en="1:1 Strategy Calls" data-ur="1:1 اسٹریٹجی سیشنز">{language === 'en' ? "1:1 Strategy Calls" : "1:1 اسٹریٹجی سیشنز"}</div>
            </div>
            <div className="stat-box">
              <div className="stat-number gradient-text-red" data-en="30 Days" data-ur="30 دن">{language === 'en' ? "30 Days" : "30 دن"}</div>
              <div className="stat-label" data-en="Avg. Monetization" data-ur="اوسط مونیٹائزیشن">{language === 'en' ? "Avg. Monetization" : "اوسط مونیٹائزیشن"}</div>
            </div>
          </div>
        </div>

        {/*  Floating Badges  */}
        <div className="floating-badge floating-badge-1">
          <span style={{ fontSize: "1.4rem" }}>🎯</span>
          <div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }} data-en="Finance Niche RPM" data-ur="فنانس نیش کا ریٹ">{language === 'en' ? "Finance Niche RPM" : "فنانس نیش کا ریٹ"}</div>
            <div style={{ fontWeight: "800", color: "var(--gold)" }}>$12.50 per 1k views</div>
          </div>
        </div>

        <div className="floating-badge floating-badge-2">
          <span style={{ fontSize: "1.4rem" }}>💰</span>
          <div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }} data-en="Abrar Upwork History" data-ur="ابرار اپ ورک تاریخ">{language === 'en' ? "Abrar Upwork History" : "ابرار اپ ورک تاریخ"}</div>
            <div style={{ fontWeight: "800", color: "var(--yt-red)" }} data-en="Client Automation Expert" data-ur="کلائنٹ آٹومیشن ایکسپرٹ">{language === 'en' ? "Client Automation Expert" : "کلائنٹ آٹومیشن ایکسپرٹ"}</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*  YouTube Introduction & Motivation: The $70B Economy & Pakistan's Share  */}
  <section id="motivation" className="motivation-section">
    <div className="container motivation-grid">
      <div className="motivation-visual">
        <div className="big-stat">$70B+</div>
        <h3 data-en="YouTube: The New Media Economy" data-ur="یوٹیوب: نیا میڈیا اور کاروبار">{language === 'en' ? "YouTube: The New Media Economy" : "یوٹیوب: نیا میڈیا اور کاروبار"}</h3>
        <p data-en="In the last 3 years alone, YouTube shared over $70 Billion with channel creators. YouTube is no longer just an entertainment site; it is a global business system that pays individuals millions of dollars to run automated cash-cow channels." data-ur="صرف پچھلے 3 سالوں میں، یوٹیوب نے ویڈیو بنانے والوں کو 70 ارب ڈالر سے زائد رقم ادا کی ہے۔ یوٹیوب اب محض تفریح کا ذریعہ نہیں بلکہ ایک بین الاقوامی کاروباری نظام بن چکا ہے جو فیس لیس چینلز کے ذریعے لوگوں کو لاکھوں ڈالر دیتا ہے۔">
          In the last 3 years alone, YouTube shared over $70 Billion with channel creators. YouTube is no longer just an entertainment site; it is a global business system that pays individuals millions of dollars to run automated cash-cow channels.
        </p>
        
        <div className="faceless-card">
          <strong style={{ color: "var(--gold)" }} data-en="Where is Pakistan's Share?" data-ur="پاکستان کا اس میں کیا حصہ ہے؟">{language === 'en' ? "Where is Pakistan's Share?" : "پاکستان کا اس میں کیا حصہ ہے؟"}</strong>
          <p style={{ fontSize: "0.9rem", marginTop: "4px", color: "var(--text-muted)" }} data-en="Most local creators limit themselves to Pakistani audiences, earning low local RPM. Abrar Nadir's strategy teaches you how to map, build, and scale automated international channels that pull high-value dollars into Pakistan's economy." data-ur="اکثر پاکستانی تخلیق کار صرف مقامی سامعین کے لیے ویڈیوز بناتے ہیں، جس کا ریٹ (RPM) بہت کم ہے۔ ابرار کا طریقہ کار آپ کو غیر ملکی ہائی-آر پی ایم چینلز کھڑا کرنے کا سسٹم سکھاتا ہے تاکہ آپ ڈالرز کما کر پاکستان لا سکیں۔">
            Most local creators limit themselves to Pakistani audiences, earning low local RPM. Abrar Nadir's strategy teaches you how to map, build, and scale automated international channels that pull high-value dollars into Pakistan's economy.
          </p>
        </div>
      </div>

      <div className="motivation-content">
        <div className="section-tag" data-en="💡 Business Model Breakdown" data-ur="💡 بزنس ماڈل کی معلومات">{language === 'en' ? "💡 Business Model Breakdown" : "💡 بزنس ماڈل کی معلومات"}</div>
        <h2 data-en="Understanding the YouTube Cash-Cow System" data-ur="یوٹیوب کیش کاؤ سسٹم کیسے کام کرتا ہے؟">{language === 'en' ? "Understanding the YouTube Cash-Cow System" : "یوٹیوب کیش کاؤ سسٹم کیسے کام کرتا ہے؟"}</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "24px" }} data-en="Many people do not know how the business of YouTube works. Premium brands buy advertisement space on YouTube, and YouTube distributes 55% of that ad revenue to creators. By building automated faceless channels in high-CPM niches, you position yourself as a business owner harvesting passive ad revenue daily." data-ur="بہت سے لوگ نہیں جانتے کہ یوٹیوب کا بزنس کیسے چلتا ہے۔ بڑی بین الاقوامی کمپنیاں یوٹیوب کو اشتہار چلانے کے پیسے دیتی ہیں، اور یوٹیوب ان پیسوں کا 55 فیصد حصہ چینل کے مالکان کو دیتا ہے۔ ہائی-آر پی ایم نیشز میں فیس لیس چینلز کھڑا کر کے آپ خود کو روزانہ کی بنیاد پر ایڈ ریونیو کمانے والا بزنس اونر بنا لیتے ہیں۔">
          Many people do not know how the business of YouTube works. Premium brands buy advertisement space on YouTube, and YouTube distributes 55% of that ad revenue to creators. By building automated faceless channels in high-CPM niches, you position yourself as a business owner harvesting passive ad revenue daily.
        </p>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "16px" }}>
          <li style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <span style={{ color: "var(--yt-red)", fontWeight: "bold" }}>✔</span>
            <div>
              <strong data-en="Earn In Dollars, Spend In PKR" data-ur="ڈالر میں کمائیں، روپوں میں خرچ کریں">{language === 'en' ? "Earn In Dollars, Spend In PKR" : "ڈالر میں کمائیں، روپوں میں خرچ کریں"}</strong>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }} data-en="Take advantage of geographic arbitrage by earning premium global advertising rates while living comfortably in Pakistan." data-ur="پاکستان میں رہتے ہوئے بین الاقوامی اشتہارات کا ریٹ کما کر جغرافیائی برتری حاصل کریں۔">{language === 'en' ? "Take advantage of geographic arbitrage by earning premium global advertising rates while living comfortably in Pakistan." : "پاکستان میں رہتے ہوئے بین الاقوامی اشتہارات کا ریٹ کما کر جغرافیائی برتری حاصل کریں۔"}</p>
            </div>
          </li>
          <li style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <span style={{ color: "var(--yt-red)", fontWeight: "bold" }}>✔</span>
            <div>
              <strong data-en="No Personal Appearance Needed" data-ur="ذاتی طور پر سامنے آنے کی کوئی ضرورت نہیں">{language === 'en' ? "No Personal Appearance Needed" : "ذاتی طور پر سامنے آنے کی کوئی ضرورت نہیں"}</strong>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }} data-en="Work anonymously. Perfect for introverted professionals, corporate employees, or university students looking to create a primary digital asset." data-ur="گمنامی میں کام کریں۔ یہ انٹروورٹس، کارپوریٹ ملازمین، یا یونیورسٹی طلباء کے لیے بہترین ہے جو اپنا ڈیجیٹل اثاثہ بنانا چاہتے ہیں۔">{language === 'en' ? "Work anonymously. Perfect for introverted professionals, corporate employees, or university students looking to create a primary digital asset." : "گمنامی میں کام کریں۔ یہ انٹروورٹس، کارپوریٹ ملازمین، یا یونیورسٹی طلباء کے لیے بہترین ہے جو اپنا ڈیجیٹل اثاثہ بنانا چاہتے ہیں۔"}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>

  {/*  Interactive ROI Niche Comparison Calculator  */}
  <section id="calculator" className="section">
    <div className="container">
      <div className="section-header">
        <div className="section-tag" data-en="📊 Niche RPM & Revenue Comparison" data-ur="📊 ریونیو اور ریٹس کا موازنہ">{language === 'en' ? "📊 Niche RPM & Revenue Comparison" : "📊 ریونیو اور ریٹس کا موازنہ"}</div>
        <h2 data-en="Pakistan RPM vs Global High-RPM Niches" data-ur="پاکستانی وی لاگ بمقابلہ بین الاقوامی ہائی ریٹ چینلز">{language === 'en' ? "Pakistan RPM vs Global High-RPM Niches" : "پاکستانی وی لاگ بمقابلہ بین الاقوامی ہائی ریٹ چینلز"}</h2>
        <p data-en="Select a niche and drag the slider to see how much more a faceless international channel makes compared to a traditional Pakistani vlog channel." data-ur="ایک کیٹیگری سلیکٹ کریں اور سلائیڈر کو آگے بڑھا کر دیکھیں کہ انٹرنیشنل چینل پاکستانی چینل کے مقابلے کتنے زیادہ پیسے کماتا ہے۔">{language === 'en' ? "Select a niche and drag the slider to see how much more a faceless international channel makes compared to a traditional Pakistani vlog channel." : "ایک کیٹیگری سلیکٹ کریں اور سلائیڈر کو آگے بڑھا کر دیکھیں کہ انٹرنیشنل چینل پاکستانی چینل کے مقابلے کتنے زیادہ پیسے کماتا ہے۔"}</p>
      </div>

      <div className="calc-wrapper">
        <div className="calc-controls">
          <div className="input-group">
            <label data-en="Select Target Global Niche" data-ur="بین الاقوامی کیٹیگری سلیکٹ کریں">{language === 'en' ? "Select Target Global Niche" : "بین الاقوامی کیٹیگری سلیکٹ کریں"}</label>
            <div className="niche-grid">
              <button className={`niche-btn ${selectedRPM === 14.50 ? "active" : ""}`} onClick={(e) => { e.preventDefault(); setSelectedRPM(14.50); }}>
                <span>💵 Finance & Investing</span>
                <span className="rpm-badge">$14.50 RPM</span>
              </button>
              <button className={`niche-btn ${selectedRPM === 9.20 ? "active" : ""}`} onClick={(e) => { e.preventDefault(); setSelectedRPM(9.20); }}>
                <span>💻 Tech & AI Automation</span>
                <span className="rpm-badge">$9.20 RPM</span>
              </button>
              <button className={`niche-btn ${selectedRPM === 9.20 ? "active" : ""}`} onClick={(e) => { e.preventDefault(); setSelectedRPM(6.80); }}>
                <span>🥗 Health & Fitness</span>
                <span className="rpm-badge">$6.80 RPM</span>
              </button>
              <button className={`niche-btn ${selectedRPM === 9.20 ? "active" : ""}`} onClick={(e) => { e.preventDefault(); setSelectedRPM(5.50); }}>
                <span>✈️ Luxury Travel Guides</span>
                <span className="rpm-badge">$5.50 RPM</span>
              </button>
            </div>
          </div>

          <div className="input-group">
            <label><span data-en="Monthly Video Views: " data-ur="ماہانہ ویوز: ">{language === 'en' ? "Monthly Video Views: " : "ماہانہ ویوز: "}</span><span id="views-val" className="val">{views.toLocaleString()}</span></label>
            <input type="range" id="views-slider" className="range-slider" min="10000" max="1000000" step="10000" value={views} onChange={(e) => setViews(parseInt(e.target.value))} />
          </div>
        </div>

        <div className="comparison-box">
          <div className="compare-title" data-en="Monthly Payout Comparison" data-ur="ماہانہ ادائیگی کا موازنہ">{language === 'en' ? "Monthly Payout Comparison" : "ماہانہ ادائیگی کا موازنہ"}</div>
          <div className="compare-row">
            {/*  Pakistani Channel  */}
            <div className="compare-col">
              <div className="compare-amount red-text" id="pk-payout">${pkPayout.toLocaleString()}</div>
              <div className="compare-label" data-en="Pakistani Urdu Vlog (Avg. $0.35 RPM)" data-ur="پاکستانی اردو وی لاگ (0.35$ اوسط ریٹ)">{language === 'en' ? "Pakistani Urdu Vlog (Avg. $0.35 RPM)" : "پاکستانی اردو وی لاگ (0.35$ اوسط ریٹ)"}</div>
            </div>
            {/*  Global Automation Channel  */}
            <div className="compare-col highlighted">
              <div className="compare-amount gold-text" id="global-payout">${globalPayout.toLocaleString()}</div>
              <div className="compare-label" data-en="Global High-RPM Niche" data-ur="بین الاقوامی ہائی ریٹ چینل">{language === 'en' ? "Global High-RPM Niche" : "بین الاقوامی ہائی ریٹ چینل"}</div>
            </div>
          </div>

          <div style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "24px", color: "var(--text-main)" }} data-en="Difference: " data-ur="فرق: ">
            Difference: <span id="payout-diff" style={{ color: "var(--gold)", fontSize: "1.4rem" }}>${diff.toLocaleString()} / Month</span> more in passive income!
          </div>

          <a href="#pricing" className="btn btn-primary" style={{ width: "100%" }} data-en="Access Automation Blueprint 🚀" data-ur="آٹومیشن بلیو پرنٹ حاصل کریں 🚀">{language === 'en' ? "Access Automation Blueprint 🚀" : "آٹومیشن بلیو پرنٹ حاصل کریں 🚀"}</a>
        </div>
      </div>
    </div>
  </section>

  {/*  Path Audit Quiz  */}
  <section id="path-quiz" className="section" style={{ background: "rgba(255,255,255,0.01)" }}>
    <div className="container">
      <div className="section-header">
        <div className="section-tag" data-en="🧭 60-Second Custom Roadmap" data-ur="🧭 60 سیکنڈ روڈ میپ ٹیسٹ">{language === 'en' ? "🧭 60-Second Custom Roadmap" : "🧭 60 سیکنڈ روڈ میپ ٹیسٹ"}</div>
        <h2 data-en="Find Your Ideal Monetization Strategy" data-ur="اپنی بہترین کمانے کی حکمت عملی تلاش کریں">{language === 'en' ? "Find Your Ideal Monetization Strategy" : "اپنی بہترین کمانے کی حکمت عملی تلاش کریں"}</h2>
        <p data-en="Answer 3 quick questions to get instant personalized recommendations for your journey." data-ur="اپنی ضرورت کے مطابق بہترین مشورہ جاننے کے لیے ان 3 سوالات کے جوابات دیجیے۔">{language === 'en' ? "Answer 3 quick questions to get instant personalized recommendations for your journey." : "اپنی ضرورت کے مطابق بہترین مشورہ جاننے کے لیے ان 3 سوالات کے جوابات دیجیے۔"}</p>
      </div>

      <div className="quiz-card">
        <div className="quiz-progress">
          <div className={`progress-step ${quizStep >= 1 ? "active" : ""}`} id="step-pill-1"></div>
          <div className={`progress-step ${quizStep >= 2 ? "active" : ""}`} id="step-pill-2"></div>
          <div className={`progress-step ${quizStep >= 3 ? "active" : ""}`} id="step-pill-3"></div>
        </div>

        {/*  Question Step 1  */}
        <div id="quiz-step-1" className="quiz-step-content" style={{ display: quizStep === 1 ? "block" : "none" }}>
          <h3 data-en="Step 1: Who are you currently?" data-ur="مرحلہ 1: آپ کی موجودہ حیثیت کیا ہے؟">{language === 'en' ? "Step 1: Who are you currently?" : "مرحلہ 1: آپ کی موجودہ حیثیت کیا ہے؟"}</h3>
          <div className="quiz-option-grid">
            <div className="quiz-option" onClick={(e) => { e.preventDefault(); selectQuizStep(1, 'beginner'); }}>
              <div className="quiz-icon">🌱</div>
              <div className="quiz-text">
                <h4 data-en="Complete Beginner" data-ur="بالکل نئے شروعات کرنے والے">{language === 'en' ? "Complete Beginner" : "بالکل نئے شروعات کرنے والے"}</h4>
                <p data-en="No prior video editing or content experience" data-ur="ویڈیو ایڈیٹنگ یا آن لائن کام کا کوئی تجربہ نہیں">{language === 'en' ? "No prior video editing or content experience" : "ویڈیو ایڈیٹنگ یا آن لائن کام کا کوئی تجربہ نہیں"}</p>
              </div>
            </div>
            <div className="quiz-option" onClick={(e) => { e.preventDefault(); selectQuizStep(1, 'creator'); }}>
              <div className="quiz-icon">🎬</div>
              <div className="quiz-text">
                <h4 data-en="Active Creator" data-ur="ایکٹو مواد بنانے والے">{language === 'en' ? "Active Creator" : "ایکٹو مواد بنانے والے"}</h4>
                <p data-en="Posting videos but struggling to monetize or grow" data-ur="ویڈیوز بنا رہے ہیں لیکن گروتھ یا مونیٹائزیشن نہیں ہے">{language === 'en' ? "Posting videos but struggling to monetize or grow" : "ویڈیوز بنا رہے ہیں لیکن گروتھ یا مونیٹائزیشن نہیں ہے"}</p>
              </div>
            </div>
            <div className="quiz-option" onClick={(e) => { e.preventDefault(); selectQuizStep(1, 'business'); }}>
              <div className="quiz-icon">🏢</div>
              <div className="quiz-text">
                <h4 data-en="Business & Brand" data-ur="کاروبار اور برانڈز">{language === 'en' ? "Business & Brand" : "کاروبار اور برانڈز"}</h4>
                <p data-en="Want to scale organic sales via content marketing" data-ur="ویڈیو مواد کے ذریعے اپنے کاروبار کی فروخت بڑھانا چاہتے ہیں">{language === 'en' ? "Want to scale organic sales via content marketing" : "ویڈیو مواد کے ذریعے اپنے کاروبار کی فروخت بڑھانا چاہتے ہیں"}</p>
              </div>
            </div>
            <div className="quiz-option" onClick={(e) => { e.preventDefault(); selectQuizStep(1, 'freelancer'); }}>
              <div className="quiz-icon">💼</div>
              <div className="quiz-text">
                <h4 data-en="Aspiring Freelancer" data-ur="فری لانسنگ کرنے کے خواہشمند">{language === 'en' ? "Aspiring Freelancer" : "فری لانسنگ کرنے کے خواہشمند"}</h4>
                <p data-en="Want to sell video editing & thumbnail services" data-ur="ایڈیٹنگ اور تھمب نیل کی سروسز بیچنا چاہتے ہیں">{language === 'en' ? "Want to sell video editing & thumbnail services" : "ایڈیٹنگ اور تھمب نیل کی سروسز بیچنا چاہتے ہیں"}</p>
              </div>
            </div>
          </div>
        </div>

        {/*  Question Step 2  */}
        <div id="quiz-step-2" className="quiz-step-content" style={{ display: quizStep === 2 ? "block" : "none" }}>
          <h3 data-en="Step 2: What is your primary 90-day goal?" data-ur="مرحلہ 2: اگلے 90 دن کا سب سے بڑا ہدف کیا ہے؟">{language === 'en' ? "Step 2: What is your primary 90-day goal?" : "مرحلہ 2: اگلے 90 دن کا سب سے بڑا ہدف کیا ہے؟"}</h3>
          <div className="quiz-option-grid">
            <div className="quiz-option" onClick={(e) => { e.preventDefault(); selectQuizStep(2, 'income'); }}>
              <div className="quiz-icon">💵</div>
              <div className="quiz-text">
                <h4 data-en="First $1,000 / Month" data-ur="پہلا $1000 ماہانہ کمانا">{language === 'en' ? "First $1,000 / Month" : "پہلا $1000 ماہانہ کمانا"}</h4>
                <p data-en="Monetize global niches quickly with AI" data-ur="اے آئی کی مدد سے انٹرنیشنل مارکیٹ سے جلدی کمائیں">{language === 'en' ? "Monetize global niches quickly with AI" : "اے آئی کی مدد سے انٹرنیشنل مارکیٹ سے جلدی کمائیں"}</p>
              </div>
            </div>
            <div className="quiz-option" onClick={(e) => { e.preventDefault(); selectQuizStep(2, 'viral'); }}>
              <div className="quiz-icon">🚀</div>
              <div className="quiz-text">
                <h4 data-en="Viral Brand Reach" data-ur="وائرل برانڈ پوزیشننگ">{language === 'en' ? "Viral Brand Reach" : "وائرل برانڈ پوزیشننگ"}</h4>
                <p data-en="Build 100K+ loyal community followers" data-ur="1 لاکھ سے زائد مداحوں کی کمیونٹی بنانا">{language === 'en' ? "Build 100K+ loyal community followers" : "1 لاکھ سے زائد مداحوں کی کمیونٹی بنانا"}</p>
              </div>
            </div>
            <div className="quiz-option" onClick={(e) => { e.preventDefault(); selectQuizStep(2, 'skills'); }}>
              <div className="quiz-icon">✂️</div>
              <div className="quiz-text">
                <h4 data-en="Master Free Tools" data-ur="مفت ٹولز کے ماسٹر بنیں">{language === 'en' ? "Master Free Tools" : "مفت ٹولز کے ماسٹر بنیں"}</h4>
                <p data-en="Learn CapCut, Canva & OBS like a pro" data-ur="کیپ کٹ، کینوا اور او بی ایس کو پروفیشنل کی طرح چلائیں">{language === 'en' ? "Learn CapCut, Canva & OBS like a pro" : "کیپ کٹ، کینوا اور او بی ایس کو پروفیشنل کی طرح چلائیں"}</p>
              </div>
            </div>
            <div className="quiz-option" onClick={(e) => { e.preventDefault(); selectQuizStep(2, 'agency'); }}>
              <div className="quiz-icon">👑</div>
              <div className="quiz-text">
                <h4 data-en="1:1 Elite Guidance" data-ur="1:1 براہِ راست رہنمائی">{language === 'en' ? "1:1 Elite Guidance" : "1:1 براہِ راست رہنمائی"}</h4>
                <p data-en="Direct mentorship & strategy from Abrar" data-ur="ابرار سے براہِ راست اسٹریٹجی حاصل کرنا">{language === 'en' ? "Direct mentorship & strategy from Abrar" : "ابرار سے براہِ راست اسٹریٹجی حاصل کرنا"}</p>
              </div>
            </div>
          </div>
        </div>

        {/*  Result Step 3  */}
        <div id="quiz-step-3" className="quiz-step-content" style={{ display: quizStep === 3 ? "block" : "none", textAlign: "center" }}>
          <div style={{ fontSize: "3rem", marginBottom: "12px" }}>🎉</div>
          <h3 style={{ fontSize: "1.8rem", marginBottom: "12px" }} data-en="Your Custom Roadmap Is Ready!" data-ur="آپ کا کسٹم روڈ میپ تیار ہے!">{language === 'en' ? "Your Custom Roadmap Is Ready!" : "آپ کا کسٹم روڈ میپ تیار ہے!"}</h3>
          <p id="quiz-recommendation-text" style={{ color: "var(--text-muted)", marginBottom: "28px", maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}>{generateQuizRecommendation()}</p>

          <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
            <button className="btn btn-primary" onClick={(e) => { e.preventDefault(); setIsBookingModalOpen(true); setBookingServiceTitle('Recommended Path'); }} data-en="Book Recommended Session ⚡" data-ur="تجویز کردہ سیشن بک کریں ⚡">Book Recommended Session ⚡</button>
            <button className="btn btn-secondary" onClick={(e) => { e.preventDefault(); setQuizStep(1); setQuizAnswers({step1:'', step2:''}); }} data-en="Start Over ↺" data-ur="دوبارہ شروع کریں ↺">Start Over ↺</button>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*  Fear Resolution: Resolving Language & AI Barrier  */}
  <section id="ai-gap" className="ai-gap-section">
    <div className="container ai-grid">
      <div className="ai-content">
        <div className="section-tag" data-en="🛡️ No English? No Problem" data-ur="🛡️ انگلش نہیں آتی؟ کوئی مسئلہ نہیں">{language === 'en' ? "🛡️ No English? No Problem" : "🛡️ انگلش نہیں آتی؟ کوئی مسئلہ نہیں"}</div>
        <h2 data-en="Bridge the AI Language Gap" data-ur="اے آئی سے زبان کا مسئلہ حل کریں">{language === 'en' ? "Bridge the AI Language Gap" : "اے آئی سے زبان کا مسئلہ حل کریں"}</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "32px" }} data-en="Many Pakistanis fail to launch international channels because they fear they cannot speak English. Today, AI has completely bridged this gap. You do not need to speak, write, or record in English yourself." data-ur="بہت سے پاکستانی صرف اس لیے انٹرنیشنل چینلز شروع نہیں کرتے کیونکہ انہیں لگتا ہے کہ وہ انگلش نہیں بول سکتے۔ آج، AI نے اس فرق کو مکمل طور پر ختم کر دیا ہے۔ آپ کو خود انگلش بولنے یا لکھنے کی ضرورت نہیں ہے۔">
          Many Pakistanis fail to launch international channels because they fear they cannot speak English. Today, AI has completely bridged this gap. You do not need to speak, write, or record in English yourself.
        </p>

        <div className="ai-list">
          <div className="ai-item">
            <div className="ai-number">1</div>
            <div className="ai-text">
              <h4 data-en="200+ Languages Supported" data-ur="200 سے زائد زبانوں کی سپورٹ">{language === 'en' ? "200+ Languages Supported" : "200 سے زائد زبانوں کی سپورٹ"}</h4>
              <p data-en="Easily translate and voice your videos in English, Spanish, German, French, and Japanese using natural-sounding AI voice synthesis." data-ur="قدرتی آواز دینے والے آرٹیفیشل انٹیلیجنس سسٹمز کے ذریعے اپنی ویڈیوز کو انگلش، اسپینش، جرمن اور جاپانی زبانوں میں باآسانی وائس اوور دیں۔">{language === 'en' ? "Easily translate and voice your videos in English, Spanish, German, French, and Japanese using natural-sounding AI voice synthesis." : "قدرتی آواز دینے والے آرٹیفیشل انٹیلیجنس سسٹمز کے ذریعے اپنی ویڈیوز کو انگلش، اسپینش، جرمن اور جاپانی زبانوں میں باآسانی وائس اوور دیں۔"}</p>
            </div>
          </div>
          <div className="ai-item">
            <div className="ai-number">2</div>
            <div className="ai-text">
              <h4 data-en="1-Click Automated Scripting" data-ur="1-کلک اسکرپٹ رائٹنگ">{language === 'en' ? "1-Click Automated Scripting" : "1-کلک اسکرپٹ رائٹنگ"}</h4>
              <p data-en="Utilize professional AI prompt architectures to write retention-optimized scripts that keep international viewers hooked." data-ur="پروفیشنل پروپٹس کے ذریعے منٹوں میں ایسے اسکرپٹ لکھیں جو غیر ملکی سامعین کو ویڈیو دیکھنے پر مجبور رکھیں۔">{language === 'en' ? "Utilize professional AI prompt architectures to write retention-optimized scripts that keep international viewers hooked." : "پروفیشنل پروپٹس کے ذریعے منٹوں میں ایسے اسکرپٹ لکھیں جو غیر ملکی سامعین کو ویڈیو دیکھنے پر مجبور رکھیں۔"}</p>
            </div>
          </div>
          <div className="ai-item">
            <div className="ai-number">3</div>
            <div className="ai-text">
              <h4 data-en="Urdu to Global Workflow" data-ur="اردو سے گلوبل کا طریقہ کار">{language === 'en' ? "Urdu to Global Workflow" : "اردو سے گلوبل کا طریقہ کار"}</h4>
              <p data-en="Abrar teaches you how to map out a content calendar in Urdu, and let AI transform it into premium English video assets." data-ur="ابرار آپ کو سکھاتے ہیں کہ کس طرح اردو میں سوچیں اور پلان کریں، اور AI کو استعمال کر کے اسے انگلش ویڈیوز میں بدلیں۔">{language === 'en' ? "Abrar teaches you how to map out a content calendar in Urdu, and let AI transform it into premium English video assets." : "ابرار آپ کو سکھاتے ہیں کہ کس طرح اردو میں سوچیں اور پلان کریں، اور AI کو استعمال کر کے اسے انگلش ویڈیوز میں بدلیں۔"}</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <div className="hero-card" style={{ padding: "40px", borderColor: "var(--gold)" }}>
          <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🤖</div>
          <h3 data-en="AI-Driven Automation Blueprint" data-ur="اے آئی آٹومیشن بلیو پرنٹ">{language === 'en' ? "AI-Driven Automation Blueprint" : "اے آئی آٹومیشن بلیو پرنٹ"}</h3>
          <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "24px" }} data-en="Our workflow uses 100% free AI tools to script, edit, voice, and render professional high-RPM faceless videos on auto-pilot." data-ur="ہماری اسٹریٹجی میں 100% فری AI ٹولز استعمال ہوتے ہیں جو اسکرپٹ، ایڈیٹنگ اور وائس اوور خود کار طریقے سے کرتے ہیں۔">{language === 'en' ? "Our workflow uses 100% free AI tools to script, edit, voice, and render professional high-RPM faceless videos on auto-pilot." : "ہماری اسٹریٹجی میں 100% فری AI ٹولز استعمال ہوتے ہیں جو اسکرپٹ، ایڈیٹنگ اور وائس اوور خود کار طریقے سے کرتے ہیں۔"}</p>
          <div style={{ background: "rgba(245, 158, 11, 0.1)", padding: "12px", borderRadius: "var(--radius-sm)", color: "var(--gold)", fontWeight: "700", fontSize: "0.85rem" }} data-en="No Prior Tech or Language Skills Required" data-ur="انگلش یا کمپیوٹر کے ایڈوانس تجربے کی کوئی ضرورت نہیں">
            No Prior Tech or Language Skills Required
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*  About Abrar Nadir (Upwork / Freelance Story)  */}
  <section id="about" className="story-section">
    <div className="container story-grid">
      <div className="story-visual">
        <div className="story-card-box">
          <h3 style={{ marginBottom: "24px", textAlign: "center" }} data-en="Timeline of Authority" data-ur="تجربے کا سفرنامہ">{language === 'en' ? "Timeline of Authority" : "تجربے کا سفرنامہ"}</h3>
          
          <div className="timeline-item">
            <div className="timeline-year" data-en="Age 14 — The Beginning" data-ur="14 سال کی عمر — شروعات">{language === 'en' ? "Age 14 — The Beginning" : "14 سال کی عمر — شروعات"}</div>
            <strong data-en="First Upwork Clients" data-ur="پہلا اپ ورک کلائنٹ">{language === 'en' ? "First Upwork Clients" : "پہلا اپ ورک کلائنٹ"}</strong>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "4px" }} data-en="Abrar began building YouTube automation channels for high-paying international clients on Upwork as a teenager." data-ur="ابرار نے نوعمری میں ہی اپ ورک پر غیر ملکی کلائنٹس کے لیے یوٹیوب چینل بنانا اور آٹو میٹ کرنا شروع کیا تھا۔">{language === 'en' ? "Abrar began building YouTube automation channels for high-paying international clients on Upwork as a teenager." : "ابرار نے نوعمری میں ہی اپ ورک پر غیر ملکی کلائنٹس کے لیے یوٹیوب چینل بنانا اور آٹو میٹ کرنا شروع کیا تھا۔"}</p>
          </div>

          <div className="timeline-item">
            <div className="timeline-year" data-en="Age 17 — The Pivot" data-ur="17 سال کی عمر — تبدیلی">{language === 'en' ? "Age 17 — The Pivot" : "17 سال کی عمر — تبدیلی"}</div>
            <strong data-en="Building Private Empires" data-ur="ذاتی ایمپائرز کی تعمیر">{language === 'en' ? "Building Private Empires" : "ذاتی ایمپائرز کی تعمیر"}</strong>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "4px" }} data-en="Transitioned from working for clients to owning and building multiple private high-revenue faceless YouTube channels." data-ur="دوسروں کے لیے کام کرنے کے بجائے اپنے ذاتی ہائی ریٹ والے فیس لیس چینلز کھڑے کیے۔">{language === 'en' ? "Transitioned from working for clients to owning and building multiple private high-revenue faceless YouTube channels." : "دوسروں کے لیے کام کرنے کے بجائے اپنے ذاتی ہائی ریٹ والے فیس لیس چینلز کھڑے کیے۔"}</p>
          </div>

          <div className="timeline-item">
            <div className="timeline-year" data-en="Now — Mentorship & Scaling" data-ur="موجودہ وقت — رہنمائی اور وسعت">{language === 'en' ? "Now — Mentorship & Scaling" : "موجودہ وقت — رہنمائی اور وسعت"}</div>
            <strong data-en="YT Empire Builder" data-ur="یوٹیوب ایمپائر بلڈر">{language === 'en' ? "YT Empire Builder" : "یوٹیوب ایمپائر بلڈر"}</strong>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "4px" }} data-en="Mentoring over 3,000+ students and managing a full-scale YouTube content automation ecosystem." data-ur="3000 سے زائد طلباء کی رہنمائی اور آٹومیشن کے مکمل کاروباری نظام کو چلانا۔">{language === 'en' ? "Mentoring over 3,000+ students and managing a full-scale YouTube content automation ecosystem." : "3000 سے زائد طلباء کی رہنمائی اور آٹومیشن کے مکمل کاروباری نظام کو چلانا۔"}</p>
          </div>
        </div>
      </div>

      <div className="story-content">
        <div className="section-tag" data-en="👤 Meet Abrar Nadir" data-ur="👤 ابرار نادر کا تعارف">{language === 'en' ? "👤 Meet Abrar Nadir" : "👤 ابرار نادر کا تعارف"}</div>
        <h2 data-en="From a 14-Year-Old Freelancer to YouTube Authority" data-ur="14 سال کے فری لانسر سے یوٹیوب کے بزنس ایکسپرٹ تک">{language === 'en' ? "From a 14-Year-Old Freelancer to YouTube Authority" : "14 سال کے فری لانسر سے یوٹیوب کے بزنس ایکسپرٹ تک"}</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "24px", lineHeight: "1.8" }} data-en="Abrar Nadir started his YouTube automation journey at the age of 14, serving international Upwork clients. He realized that instead of making channels for others, he could build his own passive income assets. Today, he runs a robust community sharing these exact blueprints with professional aspirants." data-ur="ابرار نادر نے 14 سال کی عمر میں اپ ورک پر بین الاقوامی کلائنٹس کو سروسز دے کر اپنے کام کا آغاز کیا۔ بعد میں انہوں نے یہ سمجھا کہ دوسروں کی جگہ اپنے ذاتی ڈیجیٹل اثاثے بنانا زیادہ منافع بخش ہے۔ آج، وہ ہزاروں طلباء کو وہی کامیاب فارمولے سکھا رہے ہیں۔">
          Abrar Nadir started his YouTube automation journey at the age of 14, serving international Upwork clients. He realized that instead of making channels for others, he could build his own passive income assets. Today, he runs a robust community sharing these exact blueprints with professional aspirants.
        </p>
        <p style={{ color: "var(--text-muted)", lineHeight: "1.8", marginBottom: "32px" }} data-en="This course isn't built on theory. It is based on a decade of hands-on experience, client audits, and managing cash-flowing faceless channels." data-ur="ان کی سکھائی گئی کوئی بھی بات صرف زبانی نہیں ہے۔ یہ ایک دہائی کے عملی تجربے، کامیاب کلائنٹ سیشنز، اور کامیاب فیس لیس یوٹیوب سسٹمز پر مبنی ہے۔">
          This course isn't built on theory. It is based on a decade of hands-on experience, client audits, and managing cash-flowing faceless channels.
        </p>
        <a href="#pricing" className="btn btn-primary" data-en="Learn from Abrar Nadir ⚡" data-ur="ابرار نادر سے سیکھیں ⚡">{language === 'en' ? "Learn from Abrar Nadir ⚡" : "ابرار نادر سے سیکھیں ⚡"}</a>
      </div>
    </div>
  </section>

  {/*  YT Empire Builder & Business Scaling Ecosystem  */}
  <section id="empire" className="empire-section" style={{ background: "rgba(255,255,255,0.01)" }}>
    <div className="container">
      <div className="empire-card">
        <div className="empire-content">
          <div className="section-tag" data-en="👑 For Businesses & Brands" data-ur="👑 کاروباری اداروں اور برانڈز کے لیے">{language === 'en' ? "👑 For Businesses & Brands" : "👑 کاروباری اداروں اور برانڈز کے لیے"}</div>
          <h2 data-en="Scale Passive Income with YT Empire Builder" data-ur="ایمپائر بلڈر کے ذریعے غیر فعال آمدنی بڑھائیں">{language === 'en' ? "Scale Passive Income with YT Empire Builder" : "ایمپائر بلڈر کے ذریعے غیر فعال آمدنی بڑھائیں"}</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "24px", lineHeight: "1.8" }} data-en="Are you a business owner looking to build passive income channels without handling the work yourself? Abrar Nadir's ecosystem solves your staffing bottlenecks." data-ur="کیا آپ ایک کاروباری شخصیت ہیں جو خود کام کیے بغیر یوٹیوب سے مستقل غیر فعال آمدنی کمانا چاہتے ہیں؟ ابرار نادر کا کاروباری نظام آپ کا یہ مسئلہ حل کرتا ہے۔">
            Are you a business owner looking to build passive income channels without handling the work yourself? Abrar Nadir's ecosystem solves your staffing bottlenecks.
          </p>
          <p style={{ color: "var(--text-muted)", marginBottom: "32px", lineHeight: "1.8" }} data-en="We have a cohort of 3,000+ fully-trained students ready to be hired. You can easily hire pre-vetted video editors, scriptwriters, and SEO managers directly from our ecosystem to build and automate your YouTube passive portfolio." data-ur="ہمارے پاس 3000 سے زائد مکمل تربیت یافتہ طلباء موجود ہیں جن کو کام کی تلاش ہے۔ آپ ہمارے پول سے پہلے سے منظور شدہ ویڈیو ایڈیٹرز، رائٹرز اور ایس ای او مینیجرز لے کر اپنے چینل آٹو میٹ کر سکتے ہیں۔">
            We have a cohort of 3,000+ fully-trained students ready to be hired. You can easily hire pre-vetted video editors, scriptwriters, and SEO managers directly from our ecosystem to build and automate your YouTube passive portfolio.
          </p>
          <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
            <a href="#pricing" className="btn btn-gold" data-en="Hire Trained Teams 🚀" data-ur="تربیت یافتہ ٹیمز ہائر کریں 🚀">{language === 'en' ? "Hire Trained Teams 🚀" : "تربیت یافتہ ٹیمز ہائر کریں 🚀"}</a>
            <span style={{ fontSize: "0.85rem", color: "var(--text-dim)" }} data-en="*Agency & automation service packages coming soon" data-ur="*ایجنسی آٹومیشن پیکجز جلد آ رہے ہیں">{language === 'en' ? "*Agency & automation service packages coming soon" : "*ایجنسی آٹومیشن پیکجز جلد آ رہے ہیں"}</span>
          </div>
        </div>

        <div className="empire-badges-group">
          <div className="empire-badge-card">
            <div className="empire-badge-num">3,000+</div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }} data-en="Trained Students Pool" data-ur="ٹرینڈ اسٹوڈنٹس پول">{language === 'en' ? "Trained Students Pool" : "ٹرینڈ اسٹوڈنٹس پول"}</div>
          </div>
          <div className="empire-badge-card">
            <div className="empire-badge-num">100%</div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }} data-en="Pre-Vetted Editors & Writers" data-ur="تصدیق شدہ ایڈیٹرز و رائٹرز">{language === 'en' ? "Pre-Vetted Editors & Writers" : "تصدیق شدہ ایڈیٹرز و رائٹرز"}</div>
          </div>
          <div className="empire-badge-card">
            <div className="empire-badge-num" data-en="Passive" data-ur="مستقل">{language === 'en' ? "Passive" : "مستقل"}</div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }} data-en="Automated Cash Flow" data-ur="خودکار طریقے سے آمدنی">{language === 'en' ? "Automated Cash Flow" : "خودکار طریقے سے آمدنی"}</div>
          </div>
          <div className="empire-badge-card">
            <div className="empire-badge-num" data-en="Scale" data-ur="بڑھائیں">{language === 'en' ? "Scale" : "بڑھائیں"}</div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }} data-en="Hire and Automate" data-ur="ٹیمز ہائر اور آٹو میٹ کریں">{language === 'en' ? "Hire and Automate" : "ٹیمز ہائر اور آٹو میٹ کریں"}</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*  Pricing Portal Matrix (1:1 Strategy Packages Restored)  */}
  <section id="pricing" className="section">
    <div className="container">
      <div className="section-header">
        <div className="section-tag" data-en="💼 Professional 1:1 Booking" data-ur="💼 اسٹریٹجی سیشن اور مشاورت">{language === 'en' ? "💼 Professional 1:1 Booking" : "💼 اسٹریٹجی سیشن اور مشاورت"}</div>
        <h2 data-en="Choose How You Want To Work With Abrar" data-ur="ابرار نادر کے ساتھ کام کرنے کے طریقے">{language === 'en' ? "Choose How You Want To Work With Abrar" : "ابرار نادر کے ساتھ کام کرنے کے طریقے"}</h2>
        <p data-en="High-touch coaching, strategy consulting, and hands-on monetization accelerator programs." data-ur="براہِ راست ون-آن-ون مشاورت، اسٹریٹجی سیشنز اور بزنس گروتھ پروگرامز۔">{language === 'en' ? "High-touch coaching, strategy consulting, and hands-on monetization accelerator programs." : "براہِ راست ون-آن-ون مشاورت، اسٹریٹجی سیشنز اور بزنس گروتھ پروگرامز۔"}</p>
      </div>

      {/*  Currency Switcher  */}
      <div className="currency-toggle-wrapper">
        <span style={{ fontSize: "0.9rem", fontWeight: "700", color: "var(--text-muted)" }} data-en="Currency: " data-ur="کرنسی تبدیل کریں: ">{language === 'en' ? "Currency: " : "کرنسی تبدیل کریں: "}</span>
        <div className="toggle-pill">
          <button className="toggle-btn active" id="btn-pkr" onClick={(e) => { e.preventDefault(); setCurrency('PKR'); }}>PKR (🇵🇰 Pakistan)</button>
          <button className="toggle-btn" id="btn-usd" onClick={(e) => { e.preventDefault(); setCurrency('USD'); }}>USD (🌍 International)</button>
        </div>
      </div>

      <div className="pricing-grid">
        {/*  Package 1  */}
        <div className="pricing-card">
          <div className="card-tag" data-en="Single Session" data-ur="سنگل اسٹریٹجی سیشن">{language === 'en' ? "Single Session" : "سنگل اسٹریٹجی سیشن"}</div>
          <h3 data-en="1:1 Power Strategy Call" data-ur="1:1 پاور اسٹریٹجی کال">{language === 'en' ? "1:1 Power Strategy Call" : "1:1 پاور اسٹریٹجی کال"}</h3>
          <p className="card-desc" data-en="60-minute intensive 1-on-1 video session to audit your channel, fix bottlenecks, and create a 30-day action plan." data-ur="60 منٹ کا براہِ راست اسٹریٹجی سیشن جس میں آپ کے چینل کا تجزیہ کیا جائے گا اور 30 دن کا لائحہ عمل تیار ہوگا۔">{language === 'en' ? "60-minute intensive 1-on-1 video session to audit your channel, fix bottlenecks, and create a 30-day action plan." : "60 منٹ کا براہِ راست اسٹریٹجی سیشن جس میں آپ کے چینل کا تجزیہ کیا جائے گا اور 30 دن کا لائحہ عمل تیار ہوگا۔"}</p>
          <div className="price-box">
            <span className="price-amount" id="price-tier-1">{pricingData[currency].tier1}</span>
            <span className="price-period" data-en="/ session" data-ur="/ فی سیشن">{language === 'en' ? "/ session" : "/ فی سیشن"}</span>
          </div>
          <ul className="features-list">
            <li data-en="60-Min 1:1 Live Zoom Call with Abrar Nadir" data-ur="60 منٹ ون-آن-ون لائیو زوم سیشن">{language === 'en' ? "60-Min 1:1 Live Zoom Call with Abrar Nadir" : "60 منٹ ون-آن-ون لائیو زوم سیشن"}</li>
            <li data-en="Complete Channel & Video Editing Audit" data-ur="ویڈیو ایڈیٹنگ اور چینل کا تفصیلی تجزیہ">{language === 'en' ? "Complete Channel & Video Editing Audit" : "ویڈیو ایڈیٹنگ اور چینل کا تفصیلی تجزیہ"}</li>
            <li data-en="Personalized 30-Day Monetization Blueprint" data-ur="30 دن کا مکمل مونیٹائزیشن پلان">{language === 'en' ? "Personalized 30-Day Monetization Blueprint" : "30 دن کا مکمل مونیٹائزیشن پلان"}</li>
            <li data-en="Free Tools Setup Checklist (CapCut, Canva)" data-ur="فری ٹولز کی سیٹ اپ لسٹ اور گائیڈ">{language === 'en' ? "Free Tools Setup Checklist (CapCut, Canva)" : "فری ٹولز کی سیٹ اپ لسٹ اور گائیڈ"}</li>
            <li data-en="7-Day Follow-Up Q&A Support" data-ur="7 دن کا براہ راست واٹس ایپ سپورٹ">{language === 'en' ? "7-Day Follow-Up Q&A Support" : "7 دن کا براہ راست واٹس ایپ سپورٹ"}</li>
          </ul>
          <button className="btn btn-secondary" onClick={(e) => { e.preventDefault(); setIsBookingModalOpen(true); setBookingServiceTitle('1:1 Power Strategy Call'); }} data-en="Book Session Now" data-ur="ابھی سیشن بک کریں">Book Session Now</button>
        </div>

        {/*  Package 2 (Popular)  */}
        <div className="pricing-card popular">
          <div className="popular-badge" data-en="Most Popular" data-ur="سب سے مقبول">{language === 'en' ? "Most Popular" : "سب سے مقبول"}</div>
          <div className="card-tag" data-en="30-Day Mentorship" data-ur="30 دن کی مینٹورشپ">{language === 'en' ? "30-Day Mentorship" : "30 دن کی مینٹورشپ"}</div>
          <h3 data-en="30-Day Creator Accelerator" data-ur="30-Day کریئٹر ایکسیلیریٹر">{language === 'en' ? "30-Day Creator Accelerator" : "30-Day کریئٹر ایکسیلیریٹر"}</h3>
          <p className="card-desc" data-en="Complete hand-holding mentorship to launch, edit, publish, and monetize your content from scratch with free tools." data-ur="ویڈیو ایڈیٹنگ، ڈیزائننگ اور مونیٹائزیشن کے عمل میں انگلی پکڑ کر سکھانے والا 30 دن کا ہینڈ ہولڈنگ پروگرام۔">{language === 'en' ? "Complete hand-holding mentorship to launch, edit, publish, and monetize your content from scratch with free tools." : "ویڈیو ایڈیٹنگ، ڈیزائننگ اور مونیٹائزیشن کے عمل میں انگلی پکڑ کر سکھانے والا 30 دن کا ہینڈ ہولڈنگ پروگرام۔"}</p>
          <div className="price-box">
            <span className="price-amount" id="price-tier-2">{pricingData[currency].tier2}</span>
            <span className="price-period" data-en="/ 30 days" data-ur="/ 30 دن">{language === 'en' ? "/ 30 days" : "/ 30 دن"}</span>
          </div>
          <ul className="features-list">
            <li data-en="4x Weekly 1:1 Live Strategy & Review Calls" data-ur="4 ہفتہ وار 1:1 لائیو اسٹریٹجی کالز">{language === 'en' ? "4x Weekly 1:1 Live Strategy & Review Calls" : "4 ہفتہ وار 1:1 لائیو اسٹریٹجی کالز"}</li>
            <li data-en="CapCut & DaVinci Video Editing Guidance" data-ur="کیپ کٹ اور ڈاونچی میں ویڈیو ایڈیٹنگ گائیڈنس">{language === 'en' ? "CapCut & DaVinci Video Editing Guidance" : "کیپ کٹ اور ڈاونچی میں ویڈیو ایڈیٹنگ گائیڈنس"}</li>
            <li data-en="Facebook In-Stream & TikTok Monetization Secrets" data-ur="فیس بک اور ٹک ٹاک کے خفیہ مونیٹائزیشن طریقے">{language === 'en' ? "Facebook In-Stream & TikTok Monetization Secrets" : "فیس بک اور ٹک ٹاک کے خفیہ مونیٹائزیشن طریقے"}</li>
            <li data-en="Custom High-CTR Thumbnail Design Review" data-ur="تھمب نیل ڈیزائن کا ریویو اور اسٹریٹجی">{language === 'en' ? "Custom High-CTR Thumbnail Design Review" : "تھمب نیل ڈیزائن کا ریویو اور اسٹریٹجی"}</li>
            <li data-en="Direct WhatsApp Priority Access to Abrar" data-ur="ابرار تک براہ راست واٹس ایپ رسائی">{language === 'en' ? "Direct WhatsApp Priority Access to Abrar" : "ابرار تک براہ راست واٹس ایپ رسائی"}</li>
            <li data-en="Guaranteed Account Setup & Policy Fixes" data-ur="مکمل سیٹ اپ اور پالیسی مسائل کا حل">{language === 'en' ? "Guaranteed Account Setup & Policy Fixes" : "مکمل سیٹ اپ اور پالیسی مسائل کا حل"}</li>
          </ul>
          <button className="btn btn-primary" onClick={(e) => { e.preventDefault(); setIsBookingModalOpen(true); setBookingServiceTitle('30-Day Creator Accelerator'); }} data-en="Apply for Accelerator 🚀" data-ur="پروگرام میں شمولیت حاصل کریں 🚀">Apply for Accelerator 🚀</button>
        </div>

        {/*  Package 3  */}
        <div className="pricing-card">
          <div className="card-tag" data-en="For Brands & Agencies" data-ur="برانڈز اور ایجنسیز کے لیے">{language === 'en' ? "For Brands & Agencies" : "برانڈز اور ایجنسیز کے لیے"}</div>
          <h3 data-en="Business Growth Consulting" data-ur="بزنس گروتھ کنسلٹنگ">{language === 'en' ? "Business Growth Consulting" : "بزنس گروتھ کنسلٹنگ"}</h3>
          <p className="card-desc" data-en="End-to-end content system architecture for businesses to build organic creator pipelines and scale sales." data-ur="کاروباری اداروں کے لیے مکمل ویڈیو مارکیٹنگ انفراسٹرکچر کھڑا کرنا تاکہ سیلز کو بڑھایا جا سکے۔">{language === 'en' ? "End-to-end content system architecture for businesses to build organic creator pipelines and scale sales." : "کاروباری اداروں کے لیے مکمل ویڈیو مارکیٹنگ انفراسٹرکچر کھڑا کرنا تاکہ سیلز کو بڑھایا جا سکے۔"}</p>
          <div className="price-box">
            <span className="price-amount" id="price-tier-3">{pricingData[currency].tier3}</span>
            <span className="price-period" data-en="/ month" data-ur="/ ماہانہ">{language === 'en' ? "/ month" : "/ ماہانہ"}</span>
          </div>
          <ul className="features-list">
            <li data-en="Full Organic Video Content Strategy" data-ur="مکمل آرگینک ویڈیو کنٹینٹ اسٹریٹجی">{language === 'en' ? "Full Organic Video Content Strategy" : "مکمل آرگینک ویڈیو کنٹینٹ اسٹریٹجی"}</li>
            <li data-en="In-House Content Team Training" data-ur="ان ہاؤس کنٹینٹ ایڈیٹنگ ٹیم کی مکمل ٹریننگ">{language === 'en' ? "In-House Content Team Training" : "ان ہاؤس کنٹینٹ ایڈیٹنگ ٹیم کی مکمل ٹریننگ"}</li>
            <li data-en="High-Converting Scripting & Editing Workflows" data-ur="ہائی کنورٹنگ اسکرپٹنگ اور ایڈیٹنگ سسٹمز">{language === 'en' ? "High-Converting Scripting & Editing Workflows" : "ہائی کنورٹنگ اسکرپٹنگ اور ایڈیٹنگ سسٹمز"}</li>
            <li data-en="Creator & Influencer Partnership Management" data-ur="انفلوئنسر پارٹنرشپ اور پی آر مینجمنٹ">{language === 'en' ? "Creator & Influencer Partnership Management" : "انفلوئنسر پارٹنرشپ اور پی آر مینجمنٹ"}</li>
            <li data-en="Weekly Performance Analytics & ROI Reviews" data-ur="ہفتہ وار کارکردگی کا ڈیٹا اور آر او آئی رپورٹس">{language === 'en' ? "Weekly Performance Analytics & ROI Reviews" : "ہفتہ وار کارکردگی کا ڈیٹا اور آر او آئی رپورٹس"}</li>
          </ul>
          <button className="btn btn-secondary" onClick={(e) => { e.preventDefault(); setIsBookingModalOpen(true); setBookingServiceTitle('Business Growth Consulting'); }} data-en="Book Business Audit" data-ur="بزنس آڈٹ بک کریں">Book Business Audit</button>
        </div>
      </div>
    </div>
  </section>

  {/*  Interactive Booking & Payments Modal Popup  */}
  <div className={`modal-overlay ${isBookingModalOpen ? "active" : ""}`} id="booking-modal">
    <div className="modal-content">
      <button className="close-modal" onClick={(e) => { e.preventDefault(); setIsBookingModalOpen(false); }}>&times;</button>
      <div className="section-tag" style={{ marginBottom: "8px" }} data-en="⚡ Secure Payment Portal" data-ur="⚡ ادائیگی کا محفوظ پورٹل">{language === 'en' ? "⚡ Secure Payment Portal" : "⚡ ادائیگی کا محفوظ پورٹل"}</div>
      <h3 id="modal-service-title" style={{ fontSize: "1.6rem", marginBottom: "12px" }}>Join Program</h3>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "24px" }} data-en="Enter your details below and complete payment via EasyPaisa, JazzCash, or Bank Transfer. Click on payment details to copy them instantly." data-ur="ذاتی معلومات درج کریں اور ایزی پیسہ، جاز کیش یا بینک کے ذریعے فیس ادا کریں۔ کاپی کرنے کے لیے اکاؤنٹ پر کلک کریں۔">{language === 'en' ? "Enter your details below and complete payment via EasyPaisa, JazzCash, or Bank Transfer. Click on payment details to copy them instantly." : "ذاتی معلومات درج کریں اور ایزی پیسہ، جاز کیش یا بینک کے ذریعے فیس ادا کریں۔ کاپی کرنے کے لیے اکاؤنٹ پر کلک کریں۔"}</p>

      <form id="booking-form" onSubmit={handleBookingSubmit}>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }} data-en="Your Name" data-ur="آپ کا نام">{language === 'en' ? "Your Name" : "آپ کا نام"}</label>
            <input type="text" required id="buyer-name" value={buyerName} onChange={e => setBuyerName(e.target.value)} placeholder="e.g. Ali Khan" style={{ width: "100%", padding: "12px", borderRadius: "var(--radius-sm)", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-glass)", color: "#fff", outline: "none" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }} data-en="WhatsApp Number" data-ur="واٹس ایپ نمبر">{language === 'en' ? "WhatsApp Number" : "واٹس ایپ نمبر"}</label>
            <input type="tel" required id="buyer-whatsapp" value={buyerWhatsapp} onChange={e => setBuyerWhatsapp(e.target.value)} placeholder="+92 300 1234567" style={{ width: "100%", padding: "12px", borderRadius: "var(--radius-sm)", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-glass)", color: "#fff", outline: "none" }} />
          </div>
          
          {/*  Payment Credentials Details Box with copy buttons  */}
          <div style={{ background: "rgba(0,0,0,0.3)", border: "1px solid var(--border-glass)", borderRadius: "var(--radius-md)", padding: "20px" }}>
            <div style={{ fontWeight: "800", fontSize: "0.9rem", color: "var(--gold)", marginBottom: "14px", textTransform: "uppercase", letterSpacing: "0.05em" }} data-en="Payment Gateways (Click to Copy Account)" data-ur="ادائیگی کے اکاؤنٹس (کاپی کرنے کے لیے کلک کریں)">{language === 'en' ? "Payment Gateways (Click to Copy Account)" : "ادائیگی کے اکاؤنٹس (کاپی کرنے کے لیے کلک کریں)"}</div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {/*  EasyPaisa  */}
              <div onClick={(e) => { e.preventDefault(); copyTextToClipboard('03007654321', 'easypaisa-copied'); }} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-glass)", borderRadius: "var(--radius-sm)", cursor: "pointer", transition: "var(--transition)" }}>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>EasyPaisa (Abrar Nadir)</div>
                  <div style={{ fontWeight: "700", fontSize: "0.95rem", color: "#fff" }}>0300 7654321</div>
                </div>
                <span className="copy-badge" style={{ fontSize: "0.8rem", color: copiedId === 'easypaisa-copied' ? '#10b981' : "var(--gold)" }} id="easypaisa-copied">{copiedId === 'easypaisa-copied' ? '✓ Copied!' : '📋 Copy'}</span>
              </div>

              {/*  JazzCash  */}
              <div onClick={(e) => { e.preventDefault(); copyTextToClipboard('03007654321', 'jazzcash-copied'); }} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-glass)", borderRadius: "var(--radius-sm)", cursor: "pointer", transition: "var(--transition)" }}>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>JazzCash (Abrar Nadir)</div>
                  <div style={{ fontWeight: "700", fontSize: "0.95rem", color: "#fff" }}>0300 7654321</div>
                </div>
                <span className="copy-badge" style={{ fontSize: "0.8rem", color: copiedId === 'jazzcash-copied' ? '#10b981' : "var(--gold)" }} id="jazzcash-copied">{copiedId === 'jazzcash-copied' ? '✓ Copied!' : '📋 Copy'}</span>
              </div>

              {/*  Bank Transfer  */}
              <div onClick={(e) => { e.preventDefault(); copyTextToClipboard('PK09ALFA0102030405060708', 'bank-copied'); }} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-glass)", borderRadius: "var(--radius-sm)", cursor: "pointer", transition: "var(--transition)" }}>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Bank Alfalah IBAN (Abrar Nadir)</div>
                  <div style={{ fontWeight: "700", fontSize: "0.9rem", color: "#fff", wordBreak: "break-all" }}>PK09ALFA0102030405060708</div>
                </div>
                <span className="copy-badge" style={{ fontSize: "0.8rem", color: copiedId === 'bank-copied' ? '#10b981' : "var(--gold)" }} id="bank-copied">{copiedId === 'bank-copied' ? '✓ Copied!' : '📋 Copy'}</span>
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: "100%" }} data-en="Submit Booking Request 🚀" data-ur="سیشن کی درخواست جمع کروائیں 🚀">{language === 'en' ? "Submit Booking Request 🚀" : "سیشن کی درخواست جمع کروائیں 🚀"}</button>
      </form>
    </div>
  </div>

  {/*  Social Proof Live Toast  */}
  <div className={`social-proof-toast ${isToastVisible ? "show" : ""}`} id="live-toast">
    <div className="toast-icon">🔥</div>
    <div className="toast-content">
      <p id="toast-text">{toastMessages[toastIndex]}</p>
      <span>2 minutes ago</span>
    </div>
  </div>

  {/*  Footer  */}
  <footer>
    <div className="container">
      <div className="footer-grid">
        <div className="footer-brand">
          <a href="#" className="brand-logo">
            <div className="logo-avatar">AN</div>
            <div className="brand-name">Abrar <span>Nadir</span></div>
          </a>
          <p data-en="Teaching creators and businesses how to build, run, and scale automated cash-flowing YouTube empires using AI and pre-vetted teams." data-ur="تخلیق کاروں اور کاروباری مالکان کو اے آئی اور تیار شدہ ٹیمز کے ذریعے منافع بخش یوٹیوب چینل بنانا اور چلانا سکھانا۔">{language === 'en' ? "Teaching creators and businesses how to build, run, and scale automated cash-flowing YouTube empires using AI and pre-vetted teams." : "تخلیق کاروں اور کاروباری مالکان کو اے آئی اور تیار شدہ ٹیمز کے ذریعے منافع بخش یوٹیوب چینل بنانا اور چلانا سکھانا۔"}</p>
        </div>

        <div className="footer-col">
          <h4 data-en="Navigation" data-ur="سائٹ لنکس">{language === 'en' ? "Navigation" : "سائٹ لنکس"}</h4>
          <ul className="footer-links">
            <li><a href="#motivation" data-en="Opportunity" data-ur="بزنس کا موقع">{language === 'en' ? "Opportunity" : "بزنس کا موقع"}</a></li>
            <li><a href="#calculator" data-en="Niche RPM Calculator" data-ur="آمدنی کیلکولیٹر">{language === 'en' ? "Niche RPM Calculator" : "آمدنی کیلکولیٹر"}</a></li>
            <li><a href="#ai-gap" data-en="AI Language Hack" data-ur="زبان کا حل">{language === 'en' ? "AI Language Hack" : "زبان کا حل"}</a></li>
            <li><a href="#pricing" data-en="Services & Pricing" data-ur="فیس اور سیشنز">{language === 'en' ? "Services & Pricing" : "فیس اور سیشنز"}</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 data-en="Connect" data-ur="روابط">{language === 'en' ? "Connect" : "روابط"}</h4>
          <ul className="footer-links">
            <li><a href="#">YouTube Channel</a></li>
            <li><a href="#">WhatsApp Direct</a></li>
            <li><a href="#">Upwork Profile</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Abrar Nadir (abrarnadir.com). All Rights Reserved. Built for High Conversions.</p>
      </div>
    </div>
  </footer>

  

    </div>
  );
}
