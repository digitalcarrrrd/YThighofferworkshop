import React, { useState } from "react";
import { Clock, Play, Check, ArrowRight, Zap, Sparkles } from "lucide-react";
import { Language, translations } from "../translations";

interface AgendaSectionProps {
  lang: Language;
  onOpenPurchaseModal: () => void;
}

export default function AgendaSection({ lang, onOpenPurchaseModal }: AgendaSectionProps) {
  const [activeHour, setActiveHour] = useState<1 | 2>(1);
  const t = translations[lang];
  const ag = t.agenda;

  const hour1Tab = lang === 'ur' ? "پہلا گھنٹہ: چینل ڈیزائن اور اسکرپٹ" : "Hour 1: Foundation & AI Scripts";
  const hour2Tab = lang === 'ur' ? "دوسرا گھنٹہ: ویژول ایڈیٹنگ اور ڈالر سی پی ایم" : "Hour 2: Visual Assembly & Dollar CPM";

  const hour1Title = lang === 'ur' ? "پہلا گھنٹہ: صحیح نیچ اور وائرل اسکرپٹ" : "Hour 1: High-CPM Niche & AI Hook System";
  const hour1Points = lang === 'ur' ? [
    "ڈالر آڈینس حاصل کرنے والی 5 خاص نیچز کا انتخاب",
    "ChatGPT سے وائرل کہانی اور ہکس بنانے کے پرامپٹس",
    "کاپی رائٹ سے پاک وائس اوور تیار کرنے کے طریقے",
    "10 منٹ میں مکمل ویڈیو اسکرپٹ کا فریم ورک"
  ] : [
    "Reverse engineering 5 high-yield sub-niches for US/UK audiences",
    "Exact ChatGPT & Claude prompts to write high-retention psychological hooks",
    "Generating realistic, copyright-safe AI voiceovers without robotic tones",
    "Structuring a complete 10-minute video script in under 15 minutes"
  ];
  const hour1Outcome = lang === 'ur' ? "نتیجہ: آپ کی ویڈیو کی مکمل اسکرپٹ اور وائس اوور تیار۔" : "Outcome: Fully formatted script with AI voiceover audio ready for visual assembly.";

  const hour2Title = lang === 'ur' ? "دوسرا گھنٹہ: فاسٹ ویژول ایڈیٹنگ اور پوسٹنگ" : "Hour 2: Fast Visual Assembly & US/UK Targeting";
  const hour2Points = lang === 'ur' ? [
    "AI ٹولز کی مدد سے 15 منٹ میں ایچ ڈی مناظر اور کلپس اکٹھا کرنا",
    "بغیر پیچیدہ سافٹ ویئر کے فاسٹ ایڈیٹنگ ورک فلو",
    "امریکہ اور برطانیہ کی آڈینس حاصل کرنے کی خاص سیٹنگز",
    "یوٹیوب چینل کو مونیٹائزیشن کے لیے درست طریقے سے سیٹ اپ کرنا"
  ] : [
    "Sourcing HD stock footage and generating custom AI visuals rapidly",
    "Fast-track video editing assembly workflow without complex software",
    "Applying US/UK Dollar Audience targeting settings before video upload",
    "Optimizing tags, titles and thumbnail CTR elements for algorithm push"
  ];
  const hour2Outcome = lang === 'ur' ? "نتیجہ: آپ کی مکمل ویڈیو پوسٹ ہونے کے لیے تیار۔" : "Outcome: Completed faceless video ready to upload with high-CPM targeting.";

  return (
    <section id="agenda-section" dir={t.dir} className="bg-gradient-to-b from-slate-950 via-[#0a1128] to-slate-950 text-white py-16 md:py-24 border-b border-amber-500/20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="flex justify-center">
            <span className="text-[11px] font-mono font-black uppercase tracking-widest text-amber-300 bg-amber-950/90 px-3.5 py-1.5 rounded-full border-2 border-amber-400/60 shadow-lg">
              {ag.badge}
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-500/20 border-2 border-cyan-500/40 text-cyan-300 text-xs sm:text-sm font-black uppercase tracking-widest font-mono">
            <Clock className="w-4 h-4 text-cyan-400" /> {ag.eyebrow}
          </div>
          <h2 id="agenda-headline" className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-snug">
            {ag.headline}
          </h2>
          <p className="text-slate-100 text-base md:text-xl mt-4 max-w-2xl mx-auto leading-relaxed font-extrabold">
            {ag.subheadline}
          </p>
        </div>

        {/* Hour Toggle Tabs for Mobile/Desktop */}
        <div className="flex items-center justify-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-2xl max-w-md mx-auto mb-10">
          <button
            onClick={() => setActiveHour(1)}
            className={`flex-1 py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeHour === 1
                ? "bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 font-black"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Clock className="w-4 h-4" /> {hour1Tab}
          </button>
          <button
            onClick={() => setActiveHour(2)}
            className={`flex-1 py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeHour === 2
                ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20 font-black"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Play className="w-4 h-4" /> {hour2Tab}
          </button>
        </div>

        {/* Main Hour Content Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Hour 1 Card */}
          <div className={`bg-slate-900/90 border-2 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
            activeHour === 1 
              ? "border-amber-400 shadow-2xl shadow-amber-500/10 ring-1 ring-amber-500/30" 
              : "border-slate-800 opacity-90 hover:opacity-100"
          }`}>
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider border border-amber-500/40">
                  {hour1Tab}
                </span>
                <Clock className="w-5 h-5 text-amber-400" />
              </div>
              
              <h3 className="text-xl sm:text-2xl font-black text-white mb-4">
                {hour1Title}
              </h3>
              
              <ul className="space-y-3.5 text-slate-200 text-xs sm:text-sm font-semibold">
                {hour1Points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-8 pt-5 border-t border-slate-800 bg-amber-950/40 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-6 rounded-b-3xl">
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest font-mono block">Hour 1 Outcome</span>
              <p className="text-slate-100 text-xs sm:text-sm font-bold mt-1">
                {hour1Outcome}
              </p>
            </div>
          </div>

          {/* Hour 2 Card */}
          <div className={`bg-slate-900/90 border-2 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
            activeHour === 2 
              ? "border-cyan-400 shadow-2xl shadow-cyan-500/10 ring-1 ring-cyan-500/30" 
              : "border-slate-800 opacity-90 hover:opacity-100"
          }`}>
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold uppercase tracking-wider border border-cyan-500/40">
                  {hour2Tab}
                </span>
                <Play className="w-5 h-5 text-cyan-400" />
              </div>
              
              <h3 className="text-xl sm:text-2xl font-black text-white mb-4">
                {hour2Title}
              </h3>
              
              <ul className="space-y-3.5 text-slate-200 text-xs sm:text-sm font-semibold">
                {hour2Points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-cyan-400 mt-1 shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-8 pt-5 border-t border-slate-800 bg-cyan-950/40 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-6 rounded-b-3xl">
              <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-widest font-mono block">Hour 2 Outcome</span>
              <p className="text-slate-100 text-xs sm:text-sm font-bold mt-1">
                {hour2Outcome}
              </p>
            </div>
          </div>

        </div>

        {/* Live Timeline Milestones */}
        <div className="bg-slate-900/90 border-2 border-amber-500/30 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto backdrop-blur-md">
          <h4 className="text-center font-bold text-amber-300 text-xs uppercase tracking-widest font-mono mb-6">
            Live Session Schedule
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
            <div className="flex flex-col items-center text-center p-3 bg-slate-950/80 rounded-xl border border-amber-500/30">
              <div className="w-9 h-9 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center font-mono text-sm shadow-lg shadow-amber-500/20">
                1
              </div>
              <p className="font-extrabold text-white text-sm mt-2.5">8:00 PM</p>
              <p className="text-[11px] text-slate-300 mt-0.5">Live Masterclass Starts</p>
            </div>

            <div className="flex flex-col items-center text-center p-3 bg-slate-950/80 rounded-xl border border-cyan-500/30">
              <div className="w-9 h-9 rounded-full bg-cyan-400 text-slate-950 font-black flex items-center justify-center font-mono text-sm shadow-lg shadow-cyan-500/20">
                2
              </div>
              <p className="font-extrabold text-white text-sm mt-2.5">9:00 PM</p>
              <p className="text-[11px] text-slate-300 mt-0.5">Live Screen-Share Demo</p>
            </div>

            <div className="flex flex-col items-center text-center p-3 bg-slate-950/80 rounded-xl border border-purple-500/30">
              <div className="w-9 h-9 rounded-full bg-purple-400 text-slate-950 font-black flex items-center justify-center font-mono text-sm shadow-lg shadow-purple-500/20">
                3
              </div>
              <p className="font-extrabold text-white text-sm mt-2.5">10:00 PM</p>
              <p className="text-[11px] text-slate-300 mt-0.5">Live Q&A & Resource Pass</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center mt-12 space-y-6">
          <button
            id="agenda-cta"
            onClick={onOpenPurchaseModal}
            className="w-full sm:w-auto px-8 py-5 bg-gradient-to-r from-amber-400 via-emerald-500 to-amber-400 hover:from-amber-300 hover:to-emerald-400 active:from-amber-500 text-slate-950 font-black text-base sm:text-xl rounded-2xl shadow-xl shadow-amber-500/20 transition-all cursor-pointer inline-flex items-center justify-center gap-2 border-2 border-amber-300"
          >
            <span>{ag.cta}</span>
            <ArrowRight className={`w-5 h-5 ${lang === 'ur' ? 'rotate-180' : ''}`} />
          </button>

          <div>
            <a 
              href="#deliverables-section" 
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-amber-300 bg-slate-900 border border-amber-500/40 px-4 py-2 rounded-full shadow-md hover:border-amber-400 transition-colors"
            >
              <span>{ag.scrollPrompt}</span>
              <span className="animate-bounce">↓</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
