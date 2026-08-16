import React, { useState } from "react";
import { Gift, ArrowRight, Sparkles, X, ChevronRight, Check } from "lucide-react";
import { workshopConfig } from "../workshopConfig";
import { Language, translations } from "../translations";

interface BonusStackProps {
  lang: Language;
  onOpenPurchaseModal: () => void;
}

export default function BonusStack({ lang, onOpenPurchaseModal }: BonusStackProps) {
  const [selectedBonus, setSelectedBonus] = useState<number | null>(null);
  const t = translations[lang];
  const bonus = t.bonus;

  const bonusDetails = [
    {
      title: lang === 'ur' ? "بونس #1: 50+ تیار AI پرامپٹس کا مجموعہ" : "Bonus #1: 50+ High-Retention AI Scripting Prompts",
      description: lang === 'ur' ? "کہانی کو دلچسپ بنانے اور وائرل ہکس تیار کرنے کے لیے تمام پرامپٹس۔" : "Complete prompt stack for ChatGPT, Claude & Gemini to craft viral psychological hooks.",
      value: 3000,
      preview: "Sample Prompt #1: 'Act as a YouTube retention specialist. Analyse this topic [Insert Topic] and generate 5 psychological hooks for the first 15 seconds...'"
    },
    {
      title: lang === 'ur' ? "بونس #2: ہائی سی پی ایم ڈالر نیچ کیٹلاگ" : "Bonus #2: High-CPM Dollar Niche Selection Sheet",
      description: lang === 'ur' ? "امریکہ اور یورپ کی آڈینس کے لیے بہترین اور آسان فیس لیس نیچز۔" : "Exhaustive breakdown of 20+ low-competition, high-CPM sub-niches for US/UK targeting.",
      value: 2000,
      preview: "Features: Automatic CPM calculator, competition difficulty rating system, and audience geography filter."
    },
    {
      title: lang === 'ur' ? "بونس #3: باقاعدہ کنٹینٹ اور ویڈیوز کا پلانر" : "Bonus #3: Consistent Production Calendar & Workflow Tracker",
      description: lang === 'ur' ? "ہر ویڈیو کو وقت پر مکمل کرنے کے لیے آسان اور منظم اسپرڈ شیٹ۔" : "Notion & Google Sheets template to manage script generation, voiceovers, and edit queues.",
      value: 2500,
      preview: "Includes: Upload schedule tracker, video status pipeline, thumbnail checklist, and performance logging."
    },
    {
      title: lang === 'ur' ? "بونس #4: 7 دن کی واٹس ایپ کمیونٹی سپورٹ" : "Bonus #4: 7-Day Private WhatsApp Group Support",
      description: lang === 'ur' ? "کلاس کے بعد سوالات کے فوری جوابات اور رہنمائی کے لیے۔" : "Direct access to Abrar Nadir & team for doubt clearance after the live workshop.",
      value: 5000,
      preview: "Features: Daily Q&A resolution window, channel feedback, and instant updates directly from Abrar Nadir."
    }
  ];

  return (
    <section id="bonus-stack-section" dir={t.dir} className="bg-gradient-to-b from-slate-950 via-[#0a1128] to-slate-950 text-white py-16 md:py-24 border-b border-amber-500/20 relative">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="flex justify-center">
            <span className="text-[11px] font-mono font-black uppercase tracking-widest text-amber-300 bg-amber-950/90 px-3.5 py-1.5 rounded-full border-2 border-amber-400/60 shadow-lg">
              {bonus.badge}
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border-2 border-amber-400/50 text-xs sm:text-sm px-4 py-2 rounded-full font-black uppercase tracking-widest font-mono shadow-md">
            <Gift className="w-4 h-4 text-amber-400" /> {bonus.eyebrow}
          </div>
          <h2 id="bonus-stack-headline" className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-snug">
            {bonus.headline}
          </h2>
          <p className="text-slate-100 text-base md:text-xl mt-4 max-w-2xl mx-auto leading-relaxed font-extrabold">
            {bonus.subheadline}
          </p>
        </div>

        {/* Bonus Stack Cards Grid */}
        <div className="space-y-4 mb-12 max-w-4xl mx-auto">
          {bonusDetails.map((bItem, index) => (
            <div 
              key={index}
              onClick={() => setSelectedBonus(index)}
              className="bg-slate-900/90 border-2 border-amber-500/30 hover:border-amber-400 rounded-2xl p-5 sm:p-6 shadow-xl transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono font-black text-sm flex items-center justify-center shrink-0">
                  +{index + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-amber-300 uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      Included Bonus
                    </span>
                  </div>
                  <h3 className="font-extrabold text-white text-base sm:text-lg mt-1.5 group-hover:text-amber-300 transition-colors">
                    {bItem.title}
                  </h3>
                  <p className="text-slate-200 text-xs sm:text-sm mt-1 leading-relaxed font-semibold">{bItem.description}</p>
                </div>
              </div>

              <div className="sm:text-right shrink-0 self-start sm:self-center border-t border-slate-800/60 sm:border-0 pt-3 sm:pt-0 w-full sm:w-auto flex items-center sm:block justify-between">
                <span className="text-xs text-slate-400 block">Value:</span>
                <span className="text-sm font-extrabold text-amber-300 font-mono">PKR {bItem.value.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Price Anchoring Box */}
        <div className="bg-slate-900/95 border-2 border-amber-400/60 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden max-w-4xl mx-auto backdrop-blur-md">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="text-center md:text-left space-y-2">
              <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-widest">Total Value Stack</span>
              <p className="text-2xl sm:text-3xl text-slate-500 line-through font-extrabold font-mono leading-none">
                PKR {workshopConfig.totalValue.toLocaleString()}
              </p>
              <p className="text-sm text-slate-200 leading-relaxed max-w-md font-bold">
                Aaj join karne par aapko yeh tamam bonuses, 2-ghante ka live session aur direct resource templates milenge.
              </p>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-amber-500/40 text-center w-full md:w-auto md:min-w-[300px]">
              <span className="text-[10px] font-mono font-bold text-amber-300 uppercase tracking-widest bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/40">
                Special Launch Entry Ticket
              </span>
              
              <div className="my-4">
                <span className="text-3xl sm:text-4xl font-black text-amber-300 font-mono">
                  PKR {workshopConfig.price.toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-300 block mt-1 font-bold">Single-payment • Lifetime updates for this cohort</span>
              </div>

              <button
                id="bonus-stack-cta"
                onClick={onOpenPurchaseModal}
                className="w-full px-6 py-4 bg-gradient-to-r from-amber-400 via-emerald-500 to-amber-400 hover:from-amber-300 hover:to-emerald-400 active:from-amber-500 text-slate-950 font-black rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-500/20 text-sm sm:text-base flex items-center justify-center gap-2 border-2 border-amber-300"
              >
                <span>{bonus.cta}</span>
                <ArrowRight className={`w-4 h-4 ${lang === 'ur' ? 'rotate-180' : ''}`} />
              </button>

              <span className="text-[10px] text-slate-300 block mt-3 font-mono font-bold">
                *Pehle 500 registrations complete hone ke baad price revise ho sakta hai.
              </span>
            </div>
          </div>
        </div>

        {/* Scroll Connector to Section 08 */}
        <div className="mt-12 text-center">
          <a 
            href="#credibility-section" 
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-amber-300 bg-slate-900 border border-amber-500/40 px-4 py-2 rounded-full shadow-md hover:border-amber-400 transition-colors"
          >
            <span>{bonus.scrollPrompt}</span>
            <span className="animate-bounce">↓</span>
          </a>
        </div>

      </div>

      {/* Bonus Preview Drawer Modal */}
      {selectedBonus !== null && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-amber-400 rounded-3xl p-6 max-w-lg w-full text-white space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-bold text-amber-300 uppercase">
                Bonus #{selectedBonus + 1} Preview
              </span>
              <button 
                onClick={() => setSelectedBonus(null)} 
                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h3 className="font-extrabold text-lg text-white">{bonusDetails[selectedBonus].title}</h3>
              <p className="text-xs text-slate-300 mt-1 font-semibold">{bonusDetails[selectedBonus].description}</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Resource Preview Snippet</span>
              <p className="text-xs text-slate-200 font-mono italic leading-relaxed">
                {bonusDetails[selectedBonus].preview}
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  setSelectedBonus(null);
                  onOpenPurchaseModal();
                }}
                className="w-full py-3 bg-amber-400 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-amber-300"
              >
                Lock Seat & Get Bonus <ArrowRight className={`w-4 h-4 ${lang === 'ur' ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
