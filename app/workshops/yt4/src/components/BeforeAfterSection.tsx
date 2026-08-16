import React from "react";
import { XCircle, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { Language, translations } from "../translations";

interface BeforeAfterSectionProps {
  lang: Language;
  onOpenPurchaseModal: () => void;
}

export default function BeforeAfterSection({ lang, onOpenPurchaseModal }: BeforeAfterSectionProps) {
  const t = translations[lang];
  const ba = t.beforeAfter;

  const points = [
    {
      before: ba.beforeItems[0],
      after: ba.afterItems[0]
    },
    {
      before: ba.beforeItems[1],
      after: ba.afterItems[1]
    },
    {
      before: ba.beforeItems[2],
      after: ba.afterItems[2]
    },
    {
      before: ba.beforeItems[3],
      after: ba.afterItems[3]
    }
  ];

  return (
    <section id="before-after-section" dir={t.dir} className="bg-gradient-to-b from-slate-950 via-[#0a1128] to-slate-950 text-white py-16 md:py-24 border-b border-amber-500/20 relative">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="flex justify-center">
            <span className="text-[11px] font-mono font-black uppercase tracking-widest text-amber-300 bg-amber-950/90 px-3.5 py-1.5 rounded-full border-2 border-amber-400/60 shadow-lg">
              {ba.badge}
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-black uppercase tracking-widest font-mono">
            <Sparkles className="w-4 h-4 text-emerald-400" /> {ba.eyebrow}
          </div>
          <h2 id="before-after-headline" className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {ba.headline} <span className="text-amber-300">{ba.vs}</span> {ba.headlineAfter}
          </h2>
          <p className="text-slate-100 text-base md:text-xl mt-4 max-w-2xl mx-auto leading-relaxed font-extrabold">
            {ba.subheadline}
          </p>
        </div>

        {/* Comparison List */}
        <div className="space-y-4 max-w-4xl mx-auto mb-12">
          {points.map((item, index) => (
            <div 
              key={index} 
              className="grid grid-cols-1 md:grid-cols-2 gap-3 p-2.5 bg-slate-900/90 border-2 border-amber-500/30 rounded-2xl shadow-xl"
            >
              {/* Before State (Red Muted) */}
              <div className="flex items-start gap-3 p-4 bg-slate-950 rounded-xl border border-rose-500/40">
                <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-widest block">{ba.beforeTitle}</span>
                  <p className="text-slate-200 text-xs sm:text-sm mt-1 leading-relaxed font-medium">{item.before}</p>
                </div>
              </div>

              {/* After State (Emerald Glowing) */}
              <div className="flex items-start gap-3 p-4 bg-emerald-950/40 border-2 border-emerald-500/60 rounded-xl shadow-inner shadow-emerald-500/20">
                <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-300 uppercase tracking-widest block">{ba.afterTitle}</span>
                  <p className="text-white text-xs sm:text-sm font-extrabold mt-1 leading-relaxed">{item.after}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button & Note */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <button
            id="before-after-cta"
            onClick={onOpenPurchaseModal}
            className="w-full sm:w-auto px-8 py-5 bg-gradient-to-r from-amber-400 via-emerald-500 to-amber-400 hover:from-amber-300 hover:to-emerald-400 active:from-amber-500 text-slate-950 font-black text-base sm:text-xl rounded-2xl shadow-xl shadow-amber-500/20 transition-all cursor-pointer inline-flex items-center justify-center gap-2.5 transform hover:-translate-y-0.5 border-2 border-amber-300"
          >
            <span>{ba.cta}</span>
            <ArrowRight className={`w-5 h-5 ${lang === 'ur' ? 'rotate-180' : ''}`} />
          </button>
          
          <p className="text-slate-200 text-xs leading-relaxed max-w-lg mx-auto italic font-sans font-bold">
            {ba.disclaimer}
          </p>
        </div>

        {/* Scroll Connector to Section 05 */}
        <div className="mt-12 text-center">
          <a 
            href="#agenda-section" 
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-amber-300 bg-slate-900 border border-amber-500/40 px-4 py-2 rounded-full shadow-md hover:border-amber-400 transition-colors"
          >
            <span>{ba.scrollPrompt}</span>
            <span className="animate-bounce">↓</span>
          </a>
        </div>

      </div>
    </section>
  );
}
