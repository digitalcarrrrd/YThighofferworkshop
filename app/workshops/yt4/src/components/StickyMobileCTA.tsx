import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { getWorkshopStatus } from "../utils/dateUtils";
import { workshopConfig } from "../workshopConfig";
import { Language, translations } from "../translations";

interface StickyMobileCTAProps {
  lang: Language;
  onOpenPurchaseModal: () => void;
  isModalOpen: boolean;
}

export default function StickyMobileCTA({ lang, onOpenPurchaseModal, isModalOpen }: StickyMobileCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [status, setStatus] = useState(() => getWorkshopStatus());
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getWorkshopStatus());
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible || isModalOpen) {
    return null;
  }

  return (
    <div 
      id="sticky-mobile-cta"
      dir={t.dir}
      className="fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-md border-t-2 border-amber-400 py-3 px-4 z-40 sm:hidden flex items-center justify-between shadow-2xl animate-slide-up"
    >
      <div className="flex flex-col items-start">
        <span className="text-[10px] font-black text-amber-300 uppercase tracking-widest leading-none font-mono">
          {status.isClosedForToday ? "Tomorrow's Entry" : "Live Batch Price"}
        </span>
        <div className="flex items-baseline gap-1.5 mt-1 leading-none">
          <span className="text-xl font-black text-amber-300 font-mono">
            PKR {workshopConfig.price.toLocaleString()}
          </span>
          <span className="text-[10px] text-slate-400 line-through font-bold">15,499</span>
        </div>
      </div>

      <button
        id="sticky-mobile-cta-btn"
        onClick={onOpenPurchaseModal}
        className="px-5 py-2.5 bg-gradient-to-r from-amber-400 via-emerald-500 to-amber-400 text-slate-950 font-black text-xs rounded-xl flex items-center gap-1.5 shadow-lg shadow-amber-500/30 cursor-pointer border-2 border-amber-300"
      >
        <span>{lang === 'ur' ? 'سیٹ بلاک کریں' : 'Seat Lock Karein'}</span>
        <ArrowRight className={`w-4 h-4 ${lang === 'ur' ? 'rotate-180' : ''}`} />
      </button>
    </div>
  );
}
