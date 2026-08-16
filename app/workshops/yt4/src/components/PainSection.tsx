import React from "react";
import { HelpCircle, AlertTriangle, RefreshCw, Layers, DollarSign, ArrowRight, XCircle, AlertCircle } from "lucide-react";
import { Language, translations } from "../translations";

interface PainSectionProps {
  lang: Language;
  onOpenPurchaseModal: () => void;
}

export default function PainSection({ lang, onOpenPurchaseModal }: PainSectionProps) {
  const t = translations[lang];
  const pain = t.pain;

  const painPoints = [
    {
      icon: <HelpCircle className="w-5 h-5 text-rose-500" />,
      title: pain.cards[0].title,
      desc: pain.cards[0].desc
    },
    {
      icon: <AlertTriangle className="w-5 h-5 text-rose-500" />,
      title: pain.cards[1].title,
      desc: pain.cards[1].desc
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-rose-500" />,
      title: pain.cards[2].title,
      desc: pain.cards[2].desc
    }
  ];

  return (
    <section id="pain-section" dir={t.dir} className="bg-gradient-to-b from-slate-950 via-[#0a1128] to-slate-950 text-white py-16 md:py-24 border-b border-slate-800/80 relative">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="flex justify-center">
            <span className="text-[11px] font-mono font-black uppercase tracking-widest text-amber-300 bg-amber-950/90 px-3.5 py-1.5 rounded-full border-2 border-amber-400/60 shadow-lg">
              {pain.badge}
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-500/20 border-2 border-rose-500/40 text-rose-300 text-xs sm:text-sm font-black uppercase tracking-widest font-mono">
            <AlertCircle className="w-4 h-4 text-rose-400" /> {pain.eyebrow}
          </div>
          <h2 id="pain-headline" className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {pain.headline} <span className="text-amber-300">{pain.headlineHighlight}</span>
          </h2>
          <p className="text-slate-100 text-base md:text-xl mt-4 max-w-2xl mx-auto leading-relaxed font-extrabold">
            {pain.subheadline}
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {painPoints.map((point, index) => (
            <div 
              key={index} 
              className="bg-slate-900/90 border-2 border-amber-500/30 rounded-2xl p-6 hover:border-amber-400 transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 shrink-0">
                    {point.icon}
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-300 bg-slate-950 px-2.5 py-1 rounded border border-amber-500/40 uppercase tracking-widest">
                    Problem 0{index + 1}
                  </span>
                </div>

                <h3 className="font-extrabold text-white text-lg sm:text-xl leading-snug group-hover:text-amber-300 transition-colors">
                  {point.title}
                </h3>
                <p className="text-slate-200 text-sm sm:text-base mt-3 leading-relaxed font-semibold">
                  {point.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-800 flex items-center gap-1.5 text-xs font-mono text-rose-400 font-bold">
                <XCircle className="w-4 h-4" />
                <span>Fixable via Workshop Blueprint</span>
              </div>
            </div>
          ))}
        </div>

        {/* Climax Callout Banner */}
        <div className="bg-slate-900/95 border-2 border-amber-400/60 rounded-3xl p-6 sm:p-8 text-center shadow-2xl max-w-3xl mx-auto relative overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          <p className="text-white text-base sm:text-xl leading-relaxed max-w-xl mx-auto font-extrabold">
            <strong className="text-amber-300 font-black">{pain.climaxTitle}</strong> {pain.climaxDesc}
          </p>
          
          <button
            id="pain-cta"
            onClick={onOpenPurchaseModal}
            className="mt-6 inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-400 via-emerald-500 to-amber-400 hover:from-amber-300 hover:to-emerald-400 active:from-amber-500 text-slate-950 font-black py-4 px-8 rounded-2xl transition-all cursor-pointer text-base sm:text-lg shadow-xl shadow-amber-500/20 transform hover:-translate-y-0.5 active:scale-95 border-2 border-amber-300"
          >
            <span>{pain.climaxCta}</span>
            <ArrowRight className={`w-5 h-5 ${lang === 'ur' ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Scroll Connector to Section 03 */}
        <div className="mt-12 text-center">
          <a 
            href="#niche-matrix" 
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-amber-300 bg-slate-900 border border-amber-500/40 px-4 py-2 rounded-full shadow-md hover:border-amber-400 transition-colors"
          >
            <span>{pain.scrollPrompt}</span>
            <span className="animate-bounce">↓</span>
          </a>
        </div>

      </div>
    </section>
  );
}
