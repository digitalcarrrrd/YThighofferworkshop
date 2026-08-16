import React, { useState, useEffect } from "react";
import { Video, Shield, CheckCircle2, ArrowRight, Play, Sparkles, TrendingUp, DollarSign, Users, Award } from "lucide-react";
import { getWorkshopStatus } from "../utils/dateUtils";
import { workshopConfig } from "../workshopConfig";
import { Language, translations } from "../translations";

interface HeroSectionProps {
  lang: Language;
  onOpenPurchaseModal: () => void;
}

export default function HeroSection({ lang, onOpenPurchaseModal }: HeroSectionProps) {
  const [status, setStatus] = useState(() => getWorkshopStatus());
  const t = translations[lang];
  const hero = t.hero;

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getWorkshopStatus());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero-section" dir={t.dir} className="relative bg-gradient-to-b from-slate-950 via-[#0a1128] to-slate-950 text-white overflow-hidden py-16 lg:py-24 border-b border-amber-500/20">
      {/* Background Radial Light Flares - Vibrant golden & emerald glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-amber-500/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[550px] h-[550px] bg-emerald-500/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[450px] h-[450px] bg-indigo-600/20 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Subtle Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Hero Content Wrapper */}
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center space-y-6">
          
          {/* Live Masterclass Badge */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-black uppercase tracking-widest text-amber-300 bg-amber-950/90 px-3.5 py-1.5 rounded-full border-2 border-amber-400/60 shadow-lg">
              {hero.badge}
            </span>
          </div>

          <div 
            id="hero-eyebrow"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/90 border-2 border-emerald-400/60 text-emerald-300 text-xs sm:text-sm font-black uppercase tracking-widest font-mono shadow-xl shadow-emerald-500/20"
          >
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            <span>{hero.subbadge}</span>
          </div>

          {/* Main Headline */}
          <h1 
            id="hero-headline"
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.12] text-white"
          >
            {hero.headline}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-300 to-emerald-400 drop-shadow-sm">
              {hero.headlineHighlight}
            </span>
          </h1>

          {/* Subheadline */}
          <p 
            id="hero-subheadline"
            className="text-slate-100 text-lg sm:text-2xl lg:text-3xl leading-relaxed max-w-3xl font-sans font-extrabold"
          >
            {hero.subheadline}
          </p>

          {/* Dynamic Date & Entry Ticket Box */}
          <div className="w-full max-w-xl bg-slate-900/95 border-2 border-amber-400/60 rounded-3xl p-5 sm:p-6 grid grid-cols-2 gap-4 items-center shadow-2xl shadow-amber-500/10 my-2 backdrop-blur-md">
            <div className="text-left border-r border-slate-700 pr-4">
              <span className="text-amber-300 text-xs uppercase font-mono font-black tracking-wider block">{hero.upcomingCohort}</span>
              <p id="hero-dynamic-date" className="text-amber-400 font-black text-base sm:text-xl mt-1 font-sans flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                {status.displayDate}
              </p>
            </div>
            <div className="text-left pl-2">
              <span className="text-emerald-400 text-xs uppercase font-mono font-black tracking-wider block">{hero.specialPass}</span>
              <p className="text-white font-black text-2xl sm:text-3xl mt-0.5 font-mono">
                PKR {workshopConfig.price.toLocaleString()} <span className="text-slate-400 text-xs sm:text-sm line-through font-normal ml-1">PKR 15,499</span>
              </p>
            </div>
          </div>

          {/* CTA Button Block */}
          <div className="w-full max-w-xl flex flex-col items-center space-y-3">
            <button
              id="hero-primary-cta"
              onClick={onOpenPurchaseModal}
              className="w-full px-8 py-5 bg-gradient-to-r from-amber-400 via-emerald-500 to-amber-400 hover:from-amber-300 hover:to-emerald-400 active:from-amber-500 text-slate-950 font-black text-lg sm:text-2xl rounded-2xl shadow-2xl shadow-amber-500/30 transition-all duration-200 transform hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer border-2 border-amber-300"
            >
              <span>{status.isClosedForToday ? hero.primaryCtaClosed : hero.primaryCta}</span>
              <ArrowRight className={`w-7 h-7 ${lang === 'ur' ? 'rotate-180' : ''}`} />
            </button>
            
            <p id="hero-cta-subtext" className="text-slate-200 text-xs sm:text-sm flex items-center gap-2 justify-center font-bold">
              <Shield className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{hero.ctaSubtext}</span>
            </p>
          </div>

          {/* Trust Indicators Pill Grid */}
          <div id="hero-trust-indicators" className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-slate-800/80 w-full text-slate-100 text-xs sm:text-sm font-extrabold">
            <div className="bg-slate-900/90 border border-amber-500/30 p-3.5 rounded-xl flex items-center justify-center gap-2 text-center shadow-md">
              <CheckCircle2 className="w-4.5 h-4.5 text-amber-400 shrink-0" />
              <span>{hero.trust1}</span>
            </div>
            <div className="bg-slate-900/90 border border-amber-500/30 p-3.5 rounded-xl flex items-center justify-center gap-2 text-center shadow-md">
              <CheckCircle2 className="w-4.5 h-4.5 text-amber-400 shrink-0" />
              <span>{hero.trust2}</span>
            </div>
            <div className="bg-slate-900/90 border border-amber-500/30 p-3.5 rounded-xl flex items-center justify-center gap-2 text-center shadow-md">
              <CheckCircle2 className="w-4.5 h-4.5 text-amber-400 shrink-0" />
              <span>{hero.trust3}</span>
            </div>
            <div className="bg-slate-900/90 border border-amber-500/30 p-3.5 rounded-xl flex items-center justify-center gap-2 text-center shadow-md">
              <CheckCircle2 className="w-4.5 h-4.5 text-amber-400 shrink-0" />
              <span>{hero.trust4}</span>
            </div>
          </div>

          {/* Scroll Down Prompt Indicator */}
          <a 
            href="#pain-section" 
            className="pt-6 flex flex-col items-center gap-1.5 text-slate-200 hover:text-amber-300 transition-colors cursor-pointer group"
          >
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-300 bg-slate-900 border border-amber-500/40 px-4 py-2 rounded-full shadow-md flex items-center gap-1.5">
              <span>{hero.scrollPrompt}</span>
              <span className="animate-bounce">↓</span>
            </span>
          </a>

        </div>
      </div>
    </section>
  );
}
