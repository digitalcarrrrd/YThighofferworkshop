import React, { useState } from "react";
import { Sparkles, Layers, Cpu, Landmark, Film, Compass, Check, ArrowRight } from "lucide-react";
import { Language, translations } from "../translations";

interface NichePreviewMatrixProps {
  lang: Language;
  onOpenPurchaseModal: () => void;
}

export default function NichePreviewMatrix({ lang, onOpenPurchaseModal }: NichePreviewMatrixProps) {
  const [selectedNiche, setSelectedNiche] = useState(0);
  const t = translations[lang];
  const niche = t.niche;

  const niches = [
    {
      id: "ai-tech",
      name: lang === 'ur' ? "اے آئی اور جدید ٹیکنالوجی" : "AI & Future Tech",
      icon: <Cpu className="w-4 h-4 text-cyan-400" />,
      cpm: "$16.50 - $24.00",
      cpmColor: "text-cyan-400",
      difficulty: lang === 'ur' ? "آسان (AI اسسٹڈ)" : "Low-Medium (AI Assisted)",
      audience: "US / Europe / Tech Enthusiasts",
      hookPreview: "In 2026, OpenAI secretly released an AI model that changed medicine forever...",
      samplePrompt: "Act as a documentary storyteller. Write a 60-second high-retention hook about quantum computing for a faceless YouTube video...",
      visualFormat: "Stock 4K clips + Cyberpunk overlay transitions + ElevenLabs Adam Voice"
    },
    {
      id: "finance-crime",
      name: lang === 'ur' ? "کرائم اور بزنس اسکینڈلز" : "Financial Crime & Business",
      icon: <Landmark className="w-4 h-4 text-emerald-400" />,
      cpm: "$18.00 - $32.00",
      cpmColor: "text-emerald-400",
      difficulty: lang === 'ur' ? "میڈیم (ریسرچ بیسڈ)" : "Medium (Research Based)",
      audience: "US & UK Wealth Seekers",
      hookPreview: "How a 24-year-old trader tricked Wall Street out of $400 Million without leaving his bedroom...",
      samplePrompt: "Generate a suspenseful narrative script outline analyzing the collapse of Lehman Brothers using the 'Inverted Pyramid' storytelling structure...",
      visualFormat: "B&W historical archival footage + Motion graphics charts + Deep cinematic voiceover"
    },
    {
      id: "history-mystery",
      name: lang === 'ur' ? "قدیم تاریخ اور پرسرار حقائق" : "Unsolved History & Mysteries",
      icon: <Film className="w-4 h-4 text-amber-400" />,
      cpm: "$12.00 - $18.50",
      cpmColor: "text-amber-400",
      difficulty: lang === 'ur' ? "انتہائی آسان" : "Low (High AI Visual Support)",
      audience: "Global History Buffs",
      hookPreview: "Scientists just unlocked a sealed room inside the Great Pyramid that wasn't opened for 4,000 years...",
      samplePrompt: "Write a high-curiosity video intro about ancient Roman secrets using Midjourney image prompts integrated directly into the script cues...",
      visualFormat: "Midjourney/Leonardo generated 4K art + Zoom parallax animations + Ambient atmospheric music"
    },
    {
      id: "health-longevity",
      name: lang === 'ur' ? "صحت اور سائنسی حقائق" : "Science & Health Myths",
      icon: <Compass className="w-4 h-4 text-purple-400" />,
      cpm: "$14.00 - $22.00",
      cpmColor: "text-purple-400",
      difficulty: lang === 'ur' ? "آسان (ٹیمپلیٹ فرینڈلی)" : "Low (Template Friendly)",
      audience: "US / Canada Fitness & Wellness",
      hookPreview: "What actually happens to your brain when you drink coffee on an empty stomach at 7 AM...",
      samplePrompt: "Create a 3-point scientific breakdown script about sleep optimization with clear 10-second retention markers...",
      visualFormat: "Medical 3D animation clips + Pexels 4K stock + Dynamic subtitle highlights"
    }
  ];

  const current = niches[selectedNiche];

  return (
    <section id="niche-matrix" dir={t.dir} className="py-16 md:py-24 bg-gradient-to-b from-slate-950 via-[#0a1128] to-slate-950 text-white border-b border-amber-500/20 relative">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="flex justify-center">
            <span className="text-[11px] font-mono font-black uppercase tracking-widest text-amber-300 bg-amber-950/90 px-3.5 py-1.5 rounded-full border-2 border-amber-400/60 shadow-lg">
              {niche.badge}
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-500/20 border-2 border-blue-500/40 text-blue-300 text-xs sm:text-sm font-black uppercase tracking-widest font-mono">
            <Layers className="w-4 h-4 text-blue-400" /> {niche.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {niche.headline}
          </h2>
          <p className="text-slate-100 text-base sm:text-lg mt-3 max-w-2xl mx-auto leading-relaxed font-extrabold">
            {niche.subheadline}
          </p>
        </div>

        {/* Niche Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {niches.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setSelectedNiche(idx)}
              className={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer border ${
                selectedNiche === idx
                  ? "bg-slate-800 text-amber-300 border-2 border-amber-400 shadow-lg shadow-amber-500/20"
                  : "bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500 hover:text-white"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </div>

        {/* Active Niche Showcase Card */}
        <div className="bg-slate-900/90 border-2 border-amber-400/50 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-4xl mx-auto relative overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Specs Column */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="p-2.5 rounded-xl bg-slate-950 border border-slate-700 shrink-0">
                  {current.icon}
                </span>
                <div>
                  <h3 className="font-extrabold text-xl text-white">{current.name}</h3>
                  <p className="text-xs text-amber-300 font-medium">{current.audience}</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="bg-slate-950 p-3.5 rounded-xl border border-amber-500/30">
                  <span className="text-xs text-slate-400 uppercase font-mono font-bold block">Estimated CPM</span>
                  <p className={`text-2xl font-black font-mono mt-0.5 ${current.cpmColor}`}>
                    {current.cpm}
                  </p>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-amber-500/30">
                  <span className="text-xs text-slate-400 uppercase font-mono font-bold block">Production Difficulty</span>
                  <p className="text-sm sm:text-base font-bold text-white mt-0.5">{current.difficulty}</p>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-amber-500/30">
                  <span className="text-xs text-slate-400 uppercase font-mono font-bold block">Visual Production Setup</span>
                  <p className="text-xs sm:text-sm text-slate-200 mt-0.5 leading-relaxed font-normal">{current.visualFormat}</p>
                </div>
              </div>
            </div>

            {/* Script & Prompt Hook Column */}
            <div className="md:col-span-7 bg-slate-950 border border-amber-500/30 rounded-2xl p-5 sm:p-6 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                    <Sparkles className="w-4 h-4" /> Live Hook Script Sample
                  </span>
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded font-mono font-bold border border-emerald-500/30">
                    High Retention Pattern
                  </span>
                </div>

                <p className="text-sm sm:text-base italic font-serif text-white bg-slate-900 p-4 rounded-xl border border-slate-700 leading-relaxed mb-4">
                  "{current.hookPreview}"
                </p>

                <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest block mb-1">
                  Custom AI Prompt Formula (Included in Workshop)
                </span>
                <div className="bg-slate-900 font-mono text-xs sm:text-sm text-slate-200 p-3.5 rounded-xl border border-slate-700 leading-relaxed">
                  <code>{current.samplePrompt}</code>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                <span className="text-xs sm:text-sm text-slate-100 font-extrabold">
                  Complete Matrix Provided in <strong className="text-amber-300">Bonus #2</strong>
                </span>
                <button
                  onClick={onOpenPurchaseModal}
                  className="px-4 py-2.5 bg-gradient-to-r from-amber-400 via-emerald-500 to-amber-400 hover:from-amber-300 hover:to-emerald-400 active:from-amber-500 text-slate-950 text-xs sm:text-sm font-black rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shrink-0 border border-amber-300 shadow-lg shadow-amber-500/20"
                >
                  {niche.unlockBtn} <ArrowRight className={`w-4 h-4 ${lang === 'ur' ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll Connector to Section 04 */}
        <div className="mt-12 text-center">
          <a 
            href="#before-after-section" 
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-amber-300 bg-slate-900 border border-amber-500/40 px-4 py-2 rounded-full shadow-md hover:border-amber-400 transition-colors"
          >
            <span>{niche.scrollPrompt}</span>
            <span className="animate-bounce">↓</span>
          </a>
        </div>

      </div>
    </section>
  );
}
