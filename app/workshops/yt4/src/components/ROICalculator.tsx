import React, { useState } from "react";
import { DollarSign, TrendingUp, Sparkles, HelpCircle, ArrowRight } from "lucide-react";
import { workshopConfig } from "../workshopConfig";

interface ROICalculatorProps {
  onOpenPurchaseModal: () => void;
}

export default function ROICalculator({ onOpenPurchaseModal }: ROICalculatorProps) {
  const [monthlyViews, setMonthlyViews] = useState(100000); // default 100k views/month
  const [targetAudience, setTargetAudience] = useState<'US' | 'LOCAL'>('US');

  // CPM Estimates: US Dollar Audience avg $12 CPM, Local avg $0.60 CPM
  const cpm = targetAudience === 'US' ? 14 : 0.60;
  const estimatedRevenueUsd = (monthlyViews / 1000) * cpm;
  const usdToPkrRate = 280;
  const estimatedRevenuePkr = estimatedRevenueUsd * usdToPkrRate;

  // Calculate return multiple on PKR 1,999 investment
  const returnMultiple = Math.round(estimatedRevenuePkr / workshopConfig.price);

  return (
    <section id="roi-calculator" className="py-16 md:py-24 bg-slate-950 text-white border-b border-slate-800/80 relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="flex justify-center">
            <span className="text-[11px] font-mono font-black uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/30">
              SECTION 02 OF 10 • ESTIMATED REVENUE CALCULATOR
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-bold uppercase tracking-widest font-mono">
            <Sparkles className="w-4 h-4 text-emerald-400" /> Interactive ROI Estimator
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Kyun <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">US Dollar Audience</span> Target Karna Sahi Decision Hai?
          </h2>
          <p className="text-slate-200 text-base sm:text-lg mt-3 max-w-2xl mx-auto leading-relaxed font-medium">
            Local vs US CPM ka farq dekhein. Slider move karein aur dekhein ke same views par Dollar Audience kitni ziada revenue yield kar sakti hai.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl max-w-4xl mx-auto backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Sliders & Toggles */}
            <div className="lg:col-span-7 space-y-6">
              {/* Audience Type Switcher */}
              <div>
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider block mb-2 font-mono">
                  1. Audience Region Select Karein
                </label>
                <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-950 rounded-2xl border border-slate-700">
                  <button
                    onClick={() => setTargetAudience('US')}
                    className={`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      targetAudience === 'US'
                        ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-black"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    🇺🇸 US / UK Tier-1 ($14 Avg CPM)
                  </button>
                  <button
                    onClick={() => setTargetAudience('LOCAL')}
                    className={`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      targetAudience === 'LOCAL'
                        ? "bg-slate-800 text-white font-bold border border-slate-600"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    🇵🇰 Local Market ($0.60 Avg CPM)
                  </button>
                </div>
              </div>

              {/* Views Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                    2. Expected Monthly Channel Views
                  </label>
                  <span className="text-emerald-400 font-mono font-black text-base bg-slate-950 px-2.5 py-1 rounded border border-slate-700">
                    {monthlyViews.toLocaleString()} Views / Month
                  </span>
                </div>
                
                <input
                  type="range"
                  min="20000"
                  max="500000"
                  step="10000"
                  value={monthlyViews}
                  onChange={(e) => setMonthlyViews(Number(e.target.value))}
                  className="w-full h-3 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-500 border border-slate-700"
                />
                
                <div className="flex justify-between text-xs text-slate-300 font-mono mt-2 font-semibold">
                  <span>20,000 Views</span>
                  <span>250,000 Views</span>
                  <span>500,000 Views</span>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700 text-xs sm:text-sm text-slate-200 leading-relaxed flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p>
                  Workshop mein hum specifically US/UK Faceless topics aur script formulas sikhate hain taake aap local low-CPM audience ki jagah Dollar Earnings market setup kar sakein.
                </p>
              </div>
            </div>

            {/* Right Column: Calculated Output Box */}
            <div className="lg:col-span-5 bg-slate-950 rounded-2xl p-6 border border-slate-700 flex flex-col justify-between text-center space-y-5">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300">
                  Estimated Monthly Potential
                </span>
                <div className="my-3">
                  <p className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">
                    ${Math.round(estimatedRevenueUsd).toLocaleString()} <span className="text-xs text-slate-300 font-sans font-normal">/ month</span>
                  </p>
                  <p className="text-base font-bold text-slate-200 mt-1 font-mono">
                    ≈ PKR {Math.round(estimatedRevenuePkr).toLocaleString()}
                  </p>
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-extrabold font-mono">
                  {returnMultiple}x Return On Workshop Fee
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-3">
                <p className="text-xs text-slate-300">
                  Workshop Ticket: <strong className="text-white font-mono font-bold">PKR {workshopConfig.price.toLocaleString()}</strong> (One-time)
                </p>
                <button
                  onClick={onOpenPurchaseModal}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-black rounded-xl text-sm sm:text-base transition-all shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 cursor-pointer border border-emerald-400/20"
                >
                  System Seekhne Ke Liye Seat Lock Karein
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll Connector to Section 03 */}
        <div className="mt-12 text-center">
          <a 
            href="#pain-section" 
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-rose-400 bg-slate-900 border border-slate-700 px-4 py-2 rounded-full shadow-md hover:border-rose-500/50 transition-colors"
          >
            <span>Scroll Down For Section 03 (Current Challenges)</span>
            <span className="animate-bounce">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
