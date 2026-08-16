import React from "react";
import { Check, X, CheckSquare, AlertTriangle, ShieldCheck } from "lucide-react";
import { Language, translations } from "../translations";

interface AudienceFitSectionProps {
  lang: Language;
}

export default function AudienceFitSection({ lang }: AudienceFitSectionProps) {
  const t = translations[lang];
  const fit = t.audienceFit;

  const forYouList = [
    "Aap hazaar videos dekh chuke hain lekin final solid niche nahi select kar paaye.",
    "Aap apna face ya voice show kiye baghair content create karna chahte hain.",
    "Aap AI tools (ChatGPT, Midjourney etc.) use karte hain par professional script-to-video workflow nahi maloom.",
    "Aapka pehle se channel hai par views/subscribers stagnation par ruke hue hain.",
    "Aap international high-CPM audience ko target kar ke Dollar earnings framework seekhna chahte hain.",
    "Aapko reusable high-value prompt templates aur spreadsheets chahiye taake manual kaam kam ho sake."
  ];

  const notForYouList = [
    "Aap samajhte hain ke YouTube par click karte hi agle din se lakhon ki earning shuru ho jayegi (overnight rich scheme).",
    "Aap 2-hour pure concentration se live session attend karne aur mehnat par tayyar nahi hain.",
    "Aap copy-paste ya policy-violating short content banana chahte hain jo long-term monetize na ho.",
    "Aap sirf courses aur templates collect karte hain aur unhein practical launch par implement nahi karte.",
    "Aapka khayal hai ke aik click se koi robot khud hi poora channel run kar ke de dega."
  ];

  return (
    <section id="audience-fit-section" dir={t.dir} className="bg-gradient-to-b from-slate-950 via-[#0a1128] to-slate-950 text-white py-16 md:py-24 border-b border-amber-500/20 relative">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="flex justify-center">
            <span className="text-[11px] font-mono font-black uppercase tracking-widest text-amber-300 bg-amber-950/90 px-3.5 py-1.5 rounded-full border-2 border-amber-400/60 shadow-lg">
              {fit.badge}
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-500/20 border-2 border-blue-500/40 text-blue-300 text-xs sm:text-sm font-black uppercase tracking-widest font-mono">
            <ShieldCheck className="w-4 h-4 text-blue-400" /> {fit.eyebrow}
          </div>
          <h2 id="audience-fit-headline" className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-snug">
            {fit.headline}
          </h2>
          <p className="text-slate-100 text-base md:text-xl mt-4 leading-relaxed font-extrabold">
            {fit.subheadline}
          </p>
        </div>

        {/* Fit Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* For You Card */}
          <div className="bg-slate-900/90 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden backdrop-blur-md">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
              <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/40">
                <CheckSquare className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-white text-xl">{fit.forTitle}</h3>
            </div>

            <ul className="space-y-4">
              {forYouList.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-amber-500/30 text-amber-300 shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-semibold">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* NOT For You Card */}
          <div className="bg-slate-900/90 border-2 border-rose-500/40 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden backdrop-blur-md">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
              <div className="p-2.5 rounded-2xl bg-rose-500/20 text-rose-300 border border-rose-500/30">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-white text-xl">{fit.notForTitle}</h3>
            </div>

            <ul className="space-y-4">
              {notForYouList.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-rose-500/30 text-rose-300 shrink-0 mt-0.5">
                    <X className="w-4 h-4" />
                  </div>
                  <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-semibold">{item}</p>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Scroll Connector to FAQs */}
        <div className="mt-12 text-center">
          <a 
            href="#faq-section" 
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-amber-300 bg-slate-900 border border-amber-500/40 px-4 py-2 rounded-full shadow-md hover:border-amber-400 transition-colors"
          >
            <span>{lang === 'ur' ? "سوالات کے سیکشن پر جائیں" : "Scroll Down For FAQ Section"}</span>
            <span className="animate-bounce">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
