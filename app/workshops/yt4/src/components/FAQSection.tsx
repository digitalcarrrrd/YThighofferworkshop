import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, Search } from "lucide-react";
import { workshopConfig } from "../workshopConfig";
import { Language, translations } from "../translations";

interface FAQSectionProps {
  lang: Language;
}

export default function FAQSection({ lang }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const t = translations[lang];
  const faqData = t.faq;

  const faqs = [
    {
      q: "Kya yeh complete beginners ke liye hai?",
      a: "Haan! Workshop ko is tarah se design kiya gaya hai ke agar aapne pehle kabhi YouTube channel nahi banaya ya technical AI tools use nahi kiye, tab bhi aap shuru se easily seekh sakte hain."
    },
    {
      q: "Kya face dikhana ya own voice-over karna zaroori hai?",
      a: "Nahi, bilkul zaroori nahi. Humara focus hi 'Faceless YouTube Automation' par hai jahan face dikhaye baghair aur advanced AI voiceovers/visual structures ke sath content ready kiya jata hai."
    },
    {
      q: "Kya expensive AI tools khareedna zaroori hoga?",
      a: "Nahi, hum shuruati stage mein purely free tools aur open-source AI workflows sikhate hain taake aapka starting cost zero ho. Jab aap earn karne lagein, tab paid tools par switch kar sakte hain."
    },
    {
      q: "Kya workshop daily live hoti hai?",
      a: "Haan, hum har roz raat 8:00 PM se 10:00 PM tak live online call par class conduct karte hain jismein direct live screenshare demonstration hoti hai."
    },
    {
      q: "Aaj ki registration kab close hogi?",
      a: "Har roz exact 7:00 PM Pakistan Standard Time (PKT) par registration cutoff hoti hai taake humari team seats limit check kar sake aur user verification complete kar sake. 7 PM ke baad seats agle din ke batch mein shift ho jati hain."
    },
    {
      q: "Payment ke baad agla step kya hoga?",
      a: "Aap transfer ke baad screenshot submit karenge. Hamari team detail check karke within 30-120 minutes aapke WhatsApp number par welcome text, Zoom link aur private WhatsApp group ka invite share kar degi."
    },
    {
      q: "Class ki recording kitni der tak available rahegi?",
      a: "Live class khatam hone ke baad, aapko next 24 Hours ke liye private HD recording ka link diya jayega taake aap doosri baar dekh kar easily saare blueprints implement kar sakein."
    },
    {
      q: "WhatsApp Group access kitne din ka hoga?",
      a: "Aapko exclusive support group mein 7 Days ka continuous access milega jahan aap direct questions pooch sakte hain aur apne niche-setup validation par feedback le sakte hain."
    },
    {
      q: "Kya earning ya monetization ki koi guarantee hai?",
      a: "Nahi! YouTube ek real aur professional content business hai jo consistent mehnat, topic selection aur video quality par depend karta hai. Hum system aur correct metrics ki guarantee dete hain, fixed revenue ya views ki nahi."
    },
    {
      q: "Refund ya seat-transfer policy kya hai?",
      a: `${workshopConfig.refundPolicy} ${workshopConfig.transferPolicy}`
    }
  ];

  const filteredFaqs = faqs.filter(
    (item) =>
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-section" dir={t.dir} className="bg-gradient-to-b from-slate-950 via-[#0a1128] to-slate-950 text-white py-16 md:py-24 border-b border-amber-500/20 relative">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/20 border-2 border-amber-400/50 text-amber-300 text-xs sm:text-sm font-black uppercase tracking-widest font-mono">
            <HelpCircle className="w-4 h-4 text-amber-400" /> {faqData.badge}
          </div>
          <h2 id="faq-headline" className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-snug">
            {faqData.headline}
          </h2>
          <p className="text-slate-100 text-base md:text-lg mt-3 font-extrabold">
            {lang === 'ur' ? "تمام اہم سوالات کے جوابات نیچے دیے گئے ہیں:" : "Got questions before locking your seat? We've got answers:"}
          </p>
        </div>

        {/* Search Input Filter */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="w-5 h-5 text-amber-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Sawaal search karein..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-slate-900 border-2 border-amber-500/30 rounded-2xl text-sm sm:text-base text-white focus:outline-none focus:border-amber-400 transition-colors font-sans placeholder-slate-400"
          />
        </div>

        {/* FAQs List */}
        <div className="space-y-3.5 max-w-3xl mx-auto">
          {filteredFaqs.length === 0 ? (
            <p className="text-center text-slate-300 text-sm font-mono py-8">
              Koi matching sawaal nahi mila. Direct WhatsApp par pucho!
            </p>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index}
                  className={`border-2 rounded-2xl transition-all duration-200 overflow-hidden ${
                    isOpen 
                      ? "bg-slate-900 border-amber-400 shadow-lg shadow-amber-500/20" 
                      : "bg-slate-900/90 border-amber-500/30 hover:border-amber-400"
                  }`}
                >
                  <button
                    id={`faq-toggle-${index}`}
                    aria-expanded={isOpen}
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left py-4.5 px-5 sm:py-5 sm:px-6 flex items-center justify-between gap-4 font-extrabold text-white text-base sm:text-lg cursor-pointer focus:outline-none"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle className={`w-5 h-5 shrink-0 transition-colors ${isOpen ? "text-amber-300" : "text-amber-400/60"}`} />
                      <span>{faq.q}</span>
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-amber-300 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>
                  
                  {isOpen && (
                    <div 
                      id={`faq-content-${index}`}
                      className="pb-5 px-5 sm:pb-6 sm:px-6 text-slate-200 text-sm sm:text-base leading-relaxed border-t border-slate-800 pt-3.5 font-semibold animate-fade-in"
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Scroll Connector to Final CTA */}
        <div className="mt-12 text-center">
          <a 
            href="#final-cta-section" 
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-amber-300 bg-slate-900 border border-amber-500/40 px-4 py-2 rounded-full shadow-md hover:border-amber-400 transition-colors"
          >
            <span>{lang === 'ur' ? "آخری سیکشن پر جائیں" : "Scroll Down For Final Section"}</span>
            <span className="animate-bounce">↓</span>
          </a>
        </div>

      </div>
    </section>
  );
}
