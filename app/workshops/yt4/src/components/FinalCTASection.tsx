import React, { useState, useEffect } from "react";
import { ShieldAlert, ArrowRight, Video, Calendar, ShieldCheck, Sparkles } from "lucide-react";
import { getWorkshopStatus } from "../utils/dateUtils";
import { workshopConfig } from "../workshopConfig";
import { Language, translations } from "../translations";

interface FinalCTASectionProps {
  lang: Language;
  onOpenPurchaseModal: () => void;
}

export default function FinalCTASection({ lang, onOpenPurchaseModal }: FinalCTASectionProps) {
  const [status, setStatus] = useState(() => getWorkshopStatus());
  const t = translations[lang];
  const cta = t.finalCta;

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getWorkshopStatus());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="final-cta-section" dir={t.dir} className="bg-gradient-to-b from-slate-950 via-[#0a1128] to-slate-950 text-white py-20 relative overflow-hidden border-t border-amber-500/20">
      {/* Glow Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        
        {/* Core Tag */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-[11px] font-mono font-black uppercase tracking-widest text-amber-300 bg-amber-950/90 px-3.5 py-1.5 rounded-full border-2 border-amber-400/60 shadow-lg">
            {cta.badge}
          </span>
          <span className="text-xs font-black uppercase tracking-widest text-amber-300 font-mono bg-amber-950/80 border border-amber-400/50 px-4 py-2 rounded-full inline-flex items-center gap-1.5 shadow-inner mt-1">
            <Sparkles className="w-4 h-4 text-amber-400" /> {cta.eyebrow}
          </span>
        </div>

        {/* Big headline */}
        <h2 id="final-cta-headline" className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mt-6 max-w-3xl mx-auto text-white">
          {cta.headline}
        </h2>

        {/* Dynamic Details Box */}
        <div className="bg-slate-900/95 border-2 border-amber-400/80 rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto my-10 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left shadow-2xl shadow-amber-500/20 backdrop-blur-md">
          <div className="space-y-3">
            <h4 className="text-xs font-black text-amber-300 uppercase tracking-widest font-mono">Dynamic Batch Details</h4>
            
            <div className="flex items-center gap-2.5 text-slate-100 text-sm sm:text-base font-extrabold">
              <Calendar className="w-4.5 h-4.5 text-amber-400 shrink-0" />
              <span>Date: <strong className="text-amber-400 font-black">{status.displayDate}</strong></span>
            </div>

            <div className="flex items-center gap-2.5 text-slate-100 text-sm sm:text-base font-extrabold">
              <Video className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
              <span>Time: <strong className="text-white font-black">8:00 PM - 10:00 PM PKT</strong></span>
            </div>

            <div className="flex items-center gap-2.5 text-slate-100 text-sm sm:text-base font-extrabold">
              <ShieldAlert className="w-4.5 h-4.5 text-rose-400 shrink-0" />
              <span>Registration Cutoff: <strong className="text-rose-400 font-mono font-black">7:00 PM Sharp</strong></span>
            </div>
          </div>

          <div className="sm:border-l sm:border-slate-800 sm:pl-6 space-y-3 flex flex-col justify-between border-t border-slate-800 sm:border-t-0 pt-4 sm:pt-0">
            <div>
              <h4 className="text-xs font-black text-amber-300 uppercase tracking-widest font-mono">Price & Capacity</h4>
              <p className="text-3xl sm:text-4xl font-black text-amber-300 font-mono mt-1">
                PKR {workshopConfig.price.toLocaleString()}
              </p>
              <span className="text-slate-400 text-xs sm:text-sm font-normal line-through">PKR 15,499 Value</span>
            </div>
            
            <div className="bg-amber-950/80 border border-amber-500/40 rounded-xl py-2 px-3 text-xs text-amber-300 inline-block text-center font-black font-mono">
              Max 100 participants per live cohort
            </div>
          </div>
        </div>

        {/* Big CTA */}
        <div className="space-y-4 max-w-md mx-auto">
          <button
            id="final-cta-btn"
            onClick={onOpenPurchaseModal}
            className="w-full py-5 px-8 bg-gradient-to-r from-amber-400 via-emerald-500 to-amber-400 hover:from-amber-300 hover:to-emerald-400 active:from-amber-500 text-slate-950 font-black text-lg sm:text-xl rounded-2xl shadow-2xl shadow-amber-500/30 transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-3 border-2 border-amber-300"
          >
            <span>{status.isClosedForToday ? cta.ctaClosed : cta.cta}</span>
            <ArrowRight className={`w-6 h-6 ${lang === 'ur' ? 'rotate-180' : ''}`} />
          </button>
          
          <p className="text-slate-200 text-xs sm:text-sm font-extrabold leading-relaxed flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{cta.guarantee}</span>
          </p>
        </div>

        {/* Distinctive Mobile End-of-Page Visual Marker */}
        <div className="mt-16 pt-10 border-t border-slate-800 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-950/60 border border-amber-400/50 text-amber-300 text-xs font-mono font-bold uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{lang === 'ur' ? "صفحہ کا اختتام — تمام معلومات مکمل ہیں" : "End of Landing Page — All Information Reviewed"}</span>
          </div>

          <p className="text-slate-200 text-xs sm:text-sm max-w-md mx-auto leading-relaxed font-bold">
            {lang === 'ur' ? "آپ نے تمام ورکشاپ کی معلومات کا جائزہ لے لیا ہے۔ سیٹ بک کرنے کے لیے اوپر دیے گئے بٹن پر کلک کریں۔" : "You have reached the end of the page. Secure your seat above to join tonight's live cohort."}
          </p>
        </div>

        {/* Footnote Disclaimers */}
        <div className="max-w-2xl mx-auto pt-8 text-slate-400 text-xs leading-relaxed text-center space-y-2 font-sans font-normal">
          <p>
            Disclaimer: YouTube ek professional and long-term content business hai. Views, viral growth, instant monetization, sub count, ya specific dollar earnings ki koi legal ya financial guarantee nahi di jati. Results individual ki mehnat, topics quality, aur execution system par depend karte hain.
          </p>
          <p className="font-mono text-slate-400 pt-2 text-[11px] font-bold">
            © {new Date().getFullYear()} {workshopConfig.brandName}. Designed specifically for Pakistani Action-Takers.
          </p>
        </div>
      </div>
    </section>
  );
}
