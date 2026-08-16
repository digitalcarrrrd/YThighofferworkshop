import React, { useState, useEffect } from "react";
import AnnouncementBar from "./components/AnnouncementBar";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import PainSection from "./components/PainSection";
import NichePreviewMatrix from "./components/NichePreviewMatrix";
import BeforeAfterSection from "./components/BeforeAfterSection";
import AgendaSection from "./components/AgendaSection";
import DeliverablesSection from "./components/DeliverablesSection";
import BonusStack from "./components/BonusStack";
import CredibilitySection from "./components/CredibilitySection";
import AudienceFitSection from "./components/AudienceFitSection";
import FAQSection from "./components/FAQSection";
import FinalCTASection from "./components/FinalCTASection";
import StickyMobileCTA from "./components/StickyMobileCTA";
import LiveSocialProofToast from "./components/LiveSocialProofToast";
import WhatsAppSupportWidget from "./components/WhatsAppSupportWidget";
import PurchaseModal from "./components/PurchaseModal";
import UrduModal from "./components/UrduModal";
import { Language } from "./translations";

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUrduModalOpen, setIsUrduModalOpen] = useState(false);

  const toggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'ur' : 'en'));
  };

  const openPurchaseModal = () => {
    setIsModalOpen(true);
    
    // Track Meta Pixel InitiateCheckout event
    if (typeof (window as any).fbq === "function") {
      (window as any).fbq("track", "InitiateCheckout");
    }
  };

  const closePurchaseModal = () => {
    setIsModalOpen(false);
  };

  // Initialize Analytics & Tracking if IDs are supplied
  useEffect(() => {
    // 1. Meta Pixel Setup
    const pixelId = (import.meta as any).env.VITE_META_PIXEL_ID || "";
    if (pixelId && typeof window !== "undefined") {
      (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
        if (f.fbq) return;
        n = f.fbq = function() {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
      
      (window as any).fbq("init", pixelId);
      (window as any).fbq("track", "PageView");
    }

    // 2. Google Analytics Setup
    const gaId = (import.meta as any).env.VITE_GA_ID || "";
    if (gaId && typeof window !== "undefined") {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script);

      (window as any).dataLayer = (window as any).dataLayer || [];
      function gtag(...args: any[]) {
        (window as any).dataLayer.push(args);
      }
      (window as any).gtag = gtag;
      gtag("js", new Date());
      gtag("config", gaId);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-[#0a1128] to-slate-950 font-sans antialiased text-white selection:bg-amber-500/30 selection:text-amber-300 pb-16 sm:pb-0">
      {/* SECTION 1: URGENCY ANNOUNCEMENT BAR */}
      <AnnouncementBar 
        lang={lang} 
        toggleLang={toggleLang} 
        onOpenUrduModal={() => setIsUrduModalOpen(true)} 
      />

      {/* HEADER NAVBAR */}
      <Navbar 
        lang={lang}
        toggleLang={toggleLang}
        onOpenPurchaseModal={openPurchaseModal} 
        onOpenUrduModal={() => setIsUrduModalOpen(true)} 
      />

      {/* SECTION 2: HERO SECTION */}
      <HeroSection lang={lang} onOpenPurchaseModal={openPurchaseModal} />

      {/* SECTION 3: PROBLEM AND EMPATHY */}
      <PainSection lang={lang} onOpenPurchaseModal={openPurchaseModal} />

      {/* SECTION 4: HIGH-CPM NICHE PREVIEW MATRIX */}
      <NichePreviewMatrix lang={lang} onOpenPurchaseModal={openPurchaseModal} />

      {/* SECTION 5: BEFORE AND AFTER TRANSFORMATION */}
      <BeforeAfterSection lang={lang} onOpenPurchaseModal={openPurchaseModal} />

      {/* SECTION 6: TWO-HOUR WORKSHOP AGENDA */}
      <AgendaSection lang={lang} onOpenPurchaseModal={openPurchaseModal} />

      {/* SECTION 7: DELIVERABLES */}
      <DeliverablesSection lang={lang} />

      {/* SECTION 8: BONUS VALUE STACK */}
      <BonusStack lang={lang} onOpenPurchaseModal={openPurchaseModal} />

      {/* SECTION 9: CREDIBILITY */}
      <CredibilitySection lang={lang} />

      {/* SECTION 10: WHO THIS IS FOR */}
      <AudienceFitSection lang={lang} />

      {/* SECTION 11: FREQUENTLY ASKED QUESTIONS */}
      <FAQSection lang={lang} />

      {/* SECTION 12: FINAL CTA */}
      <FinalCTASection lang={lang} onOpenPurchaseModal={openPurchaseModal} />

      {/* STICKY BOTTOM MOBILE PURCHASE BAR */}
      <StickyMobileCTA lang={lang} onOpenPurchaseModal={openPurchaseModal} isModalOpen={isModalOpen} />

      {/* DYNAMIC SOCIAL PROOF NOTIFICATION TOAST */}
      <LiveSocialProofToast />

      {/* FLOATING WHATSAPP SUPPORT WIDGET */}
      <WhatsAppSupportWidget />

      {/* URDU INFORMATION MODAL */}
      <UrduModal 
        isOpen={isUrduModalOpen} 
        onClose={() => setIsUrduModalOpen(false)} 
        onOpenPurchaseModal={openPurchaseModal} 
      />

      {/* TWO-STEP PAYMENT & REGISTRATION POPUP */}
      <PurchaseModal isOpen={isModalOpen} onClose={closePurchaseModal} lang={lang} />
    </div>
  );
}
