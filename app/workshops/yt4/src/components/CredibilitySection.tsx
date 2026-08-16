import React from "react";
import { User, CheckCircle2, ShieldCheck, Award, Star } from "lucide-react";
import { workshopConfig } from "../workshopConfig";
import { Language, translations } from "../translations";

interface CredibilitySectionProps {
  lang: Language;
}

export default function CredibilitySection({ lang }: CredibilitySectionProps) {
  const t = translations[lang];
  const cred = t.credibility;

  const credentials = [
    {
      title: "International Market Experience",
      desc: "US, UK, aur European niche accounts ke liye channels establish aur run kiye hain."
    },
    {
      title: "Cohesive YouTube Workflows",
      desc: "Niche selection se lekar daily rendering aur thumbnail publishing tak ka completely organized blueprint."
    },
    {
      title: "Faceless Automation Pipeline",
      desc: "Kam se kam waqt mein high-retention long-form videos create karne ke liye custom script prompts."
    },
    {
      title: "Live Production Screen-Share",
      desc: "Koi theoretical slides nahi. Session mein direct live computer screen par automated editing aur scripting hogi."
    }
  ];

  return (
    <section id="credibility-section" dir={t.dir} className="bg-gradient-to-b from-slate-950 via-[#0a1128] to-slate-950 text-white py-16 md:py-24 border-b border-amber-500/20 relative">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="flex justify-center">
            <span className="text-[11px] font-mono font-black uppercase tracking-widest text-amber-300 bg-amber-950/90 px-3.5 py-1.5 rounded-full border-2 border-amber-400/60 shadow-lg">
              {cred.badge}
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-black uppercase tracking-widest font-mono">
            <Award className="w-4 h-4 text-emerald-400" /> {cred.eyebrow}
          </div>
          <h2 id="credibility-headline" className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-snug">
            {cred.headline}
          </h2>
          <p className="text-slate-100 text-base md:text-xl mt-4 leading-relaxed font-extrabold">
            {cred.subheadline}
          </p>
        </div>

        {/* Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-4xl mx-auto">
          
          {/* Presenter Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative bg-slate-900/90 border-2 border-amber-400/50 text-slate-100 rounded-3xl p-6 shadow-2xl w-full max-w-sm overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 to-emerald-400" />
              
              <div className="flex flex-col items-center text-center space-y-4 pt-4">
                <div className="w-24 h-24 rounded-full bg-slate-950 border-4 border-amber-400/60 flex items-center justify-center relative">
                  <User className="w-10 h-10 text-amber-300" />
                  <div className="absolute bottom-1 right-1 w-6 h-6 bg-amber-400 rounded-full border-2 border-slate-900 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-slate-950" />
                  </div>
                </div>

                <div>
                  <h4 className="font-black text-white text-xl">{workshopConfig.presenterName}</h4>
                  <p className="text-xs text-amber-300 mt-0.5 font-mono font-bold">YouTube System Architect & Lead Creator</p>
                </div>

                <div className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-left space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>Performance Rating</span>
                    <span className="text-amber-400 font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> 4.9 / 5.0
                    </span>
                  </div>
                  <p className="text-sm font-extrabold text-white">Top Rated YouTube Automation Specialist</p>
                  <p className="text-[10px] text-slate-400 font-mono italic">
                    *Verified live screen presentation system.
                  </p>
                </div>
                
                <div className="text-[11px] text-amber-300 flex items-center gap-1.5 font-mono font-bold">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>VERIFIED LIVE PRESENTATION SYSTEM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Credentials Column */}
          <div className="lg:col-span-7 space-y-4">
            {credentials.map((crItem, index) => (
              <div 
                key={index} 
                className="bg-slate-900/90 border-2 border-amber-500/30 p-5 sm:p-6 rounded-2xl transition-all flex gap-4 shadow-lg"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center shrink-0 font-mono font-black text-sm">
                  0{index + 1}
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-base sm:text-lg leading-snug">{crItem.title}</h3>
                  <p className="text-slate-200 text-xs sm:text-sm mt-1 leading-relaxed font-semibold">{crItem.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Scroll Connector to Section 09 */}
        <div className="mt-12 text-center">
          <a 
            href="#audience-fit-section" 
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-amber-300 bg-slate-900 border border-amber-500/40 px-4 py-2 rounded-full shadow-md hover:border-amber-400 transition-colors"
          >
            <span>{cred.scrollPrompt}</span>
            <span className="animate-bounce">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
