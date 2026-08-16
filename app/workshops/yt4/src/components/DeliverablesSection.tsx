import React from "react";
import { Check, ClipboardList, Download, Sparkles } from "lucide-react";
import { Language, translations } from "../translations";

interface DeliverablesSectionProps {
  lang: Language;
}

export default function DeliverablesSection({ lang }: DeliverablesSectionProps) {
  const t = translations[lang];
  const deliv = t.deliverables;

  const items = [
    { 
      title: lang === 'ur' ? "1. یوٹیوب ماسٹر ورک فلو ڈایاگرام" : "1. YouTube Master Workflow Diagram", 
      detail: lang === 'ur' ? "مکمل ویژول فلُو چارٹ اور روڈ میپ (PDF & Map)" : "Visual flowchart & system roadmap (PDF & Map)" 
    },
    { 
      title: lang === 'ur' ? "2. ہائی ڈالر سی پی ایم کیٹلاگ" : "2. High Dollar CPM Niche Sheet", 
      detail: lang === 'ur' ? "ڈالر آڈینس حاصل کرنے کے لیے بہترین نیچز کی فہرست" : "Dollar CPM matrix for high yield selection" 
    },
    { 
      title: lang === 'ur' ? "3. 10 سیکنڈ ریٹینشن ہک گائیڈ" : "3. 10-Second Retention Hook Guide", 
      detail: lang === 'ur' ? "10 منٹ میں وائرل ہکس بنانے کا طریقہ" : "Identify viral retention hooks in 10 mins" 
    },
    { 
      title: lang === 'ur' ? "4. 3 ماہ کا باقاعدہ کنٹینٹ پلانر" : "4. 3-Month Consistent Content Calendar", 
      detail: lang === 'ur' ? "پہلے 3 ماہ کی باقاعدہ ویڈیوز کی منصوبہ بندی" : "Organize first 3 months of consistent uploads" 
    },
    { 
      title: lang === 'ur' ? "5. 50+ تیار AI پرامپٹس پیکیج" : "5. 50+ Ready AI Prompt Templates", 
      detail: lang === 'ur' ? "لامحدود نایاب آئیڈیاز بنانے کے پرامپٹس" : "Free AI prompt templates for endless ideas" 
    },
    { 
      title: lang === 'ur' ? "6. ہائی سی ٹی آر تھمب نیل فارمولا" : "6. High CTR Packaging & Thumbnail Sheet", 
      detail: lang === 'ur' ? "زیادہ کلکس حاصل کرنے کا ڈیزائن فریم ورک" : "High CTR packaging framework sheet" 
    }
  ];

  return (
    <section id="deliverables-section" dir={t.dir} className="bg-gradient-to-b from-slate-950 via-[#0a1128] to-slate-950 text-white py-16 md:py-24 border-b border-amber-500/20 relative">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="flex justify-center">
            <span className="text-[11px] font-mono font-black uppercase tracking-widest text-amber-300 bg-amber-950/90 px-3.5 py-1.5 rounded-full border-2 border-amber-400/60 shadow-lg">
              {deliv.badge}
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-black uppercase tracking-widest font-mono">
            <Download className="w-4 h-4 text-emerald-400" /> {deliv.eyebrow}
          </div>
          <h2 id="deliverables-headline" className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-snug">
            {deliv.headline}
          </h2>
          <p className="text-slate-100 text-base md:text-xl mt-4 max-w-2xl mx-auto leading-relaxed font-extrabold">
            {deliv.subheadline}
          </p>
        </div>

        {/* Deliverables Grid */}
        <div className="bg-slate-900/90 border-2 border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-3.5 mb-8 pb-5 border-b border-slate-800">
            <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/40">
              <ClipboardList className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-xl sm:text-2xl">Your Automation Toolkit Package</h3>
              <p className="text-xs sm:text-sm text-amber-300 mt-0.5 font-bold">Direct download links & templates shared inside the live session</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item, index) => (
              <div 
                key={index}
                className="flex items-start gap-3.5 bg-slate-950/80 p-4 sm:p-5 rounded-2xl border border-amber-500/30 hover:border-amber-400 transition-all group shadow-md"
              >
                <div className="p-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 shrink-0 mt-0.5">
                  <Check className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-white font-extrabold text-sm sm:text-base leading-snug group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-slate-200 text-xs sm:text-sm mt-1 leading-relaxed font-semibold">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Connector to Section 07 */}
        <div className="mt-12 text-center">
          <a 
            href="#bonus-stack-section" 
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-amber-300 bg-slate-900 border border-amber-500/40 px-4 py-2 rounded-full shadow-md hover:border-amber-400 transition-colors"
          >
            <span>{deliv.scrollPrompt}</span>
            <span className="animate-bounce">↓</span>
          </a>
        </div>

      </div>
    </section>
  );
}
