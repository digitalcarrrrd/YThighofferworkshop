"use client";

import React, { useState } from "react";
import TiltCard3D from "../3d/TiltCard3D";

interface RPMSimulatorProps {
  onUnlockClick: () => void;
  language?: string;
}

export default function RPMSimulator3D({ onUnlockClick, language = "en" }: RPMSimulatorProps) {
  const niches = [
    {
      nameEn: "Finance & Wealth Systems",
      nameUr: "فنانس اور دولت کی ویڈیوز",
      icon: "💵",
      rpm: 16.5,
      badge: "Highest CPM",
    },
    {
      nameEn: "AI Tools & Automation",
      nameUr: "اے آئی ٹولز اور آٹومیشن",
      icon: "💻",
      rpm: 12.8,
      badge: "Fastest Growing",
    },
    {
      nameEn: "Luxury & Global Living",
      nameUr: "لگژری اور ریئل اسٹیٹ",
      icon: "✈️",
      rpm: 8.9,
      badge: "High Retention",
    },
    {
      nameEn: "Health, Biohacking & Longevity",
      nameUr: "ہیلتھ اور میڈیکل ریسرچ",
      icon: "🥗",
      rpm: 7.6,
      badge: "Evergreen Views",
    },
    {
      nameEn: "Documentaries & Deep Dives",
      nameUr: "ڈاکیومینٹریز اور تجزیے",
      icon: "🎬",
      rpm: 6.4,
      badge: "Massive Volume",
    },
  ];

  const [selectedNiche, setSelectedNiche] = useState(0);
  const [views, setViews] = useState(150000);

  const active = niches[selectedNiche];
  const pkRpm = 0.35; // average Pakistani local RPM in USD

  const pkEarnings = Math.round((views / 1000) * pkRpm);
  const globalEarnings = Math.round((views / 1000) * active.rpm);
  const monthlyDifference = globalEarnings - pkEarnings;
  const annualDifference = monthlyDifference * 12;

  // Approximate PKR exchange rate for reference
  const pkrRate = 278;
  const monthlyPkr = (monthlyDifference * pkrRate).toLocaleString();

  return (
    <div className="w-full">
      <TiltCard3D glowColor="gold" className="border-amber-500/20 bg-black/60">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-mono tracking-wider text-amber-300 uppercase">
                {language === "ur" ? "ریئل ٹائم مونیٹائزیشن انجن" : "3D Real-Time Yield Engine"}
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-extrabold text-white">
              {language === "ur"
                ? "اپنی ہدف بین الاقوامی کیٹیگری منتخب کریں"
                : "Select Global Niche & Monthly Volume"}
            </h3>

            {/* Niche Selector Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {niches.map((niche, idx) => {
                const isSelected = selectedNiche === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedNiche(idx)}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all duration-200 ${
                      isSelected
                        ? "bg-amber-500/20 border-amber-400 text-white shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                        : "bg-white/[0.03] border-white/10 text-gray-300 hover:border-white/20 hover:bg-white/[0.06]"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-lg">{niche.icon}</span>
                      <span className="text-xs font-bold truncate">
                        {language === "ur" ? niche.nameUr : niche.nameEn}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono font-extrabold text-amber-400 whitespace-nowrap pl-2">
                      ${niche.rpm}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Slider Control */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-gray-300">
                  {language === "ur" ? "ماہانہ تخمینہ ویوز:" : "Monthly Video Views:"}
                </span>
                <span className="text-lg font-mono font-extrabold text-amber-400 bg-amber-500/10 px-3 py-0.5 rounded-lg border border-amber-500/20">
                  {views.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={10000}
                max={1500000}
                step={10000}
                value={views}
                onChange={(e) => setViews(Number(e.target.value))}
                className="w-full h-2.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[11px] font-mono text-gray-500">
                <span>10K Views</span>
                <span>500K</span>
                <span>1.5M+ Views</span>
              </div>
            </div>
          </div>

          {/* Revenue Hologram Terminal (Right Column) */}
          <div className="lg:col-span-6 relative p-6 rounded-2xl bg-gradient-to-b from-black/90 to-black/60 border border-white/10 overflow-hidden space-y-5">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <span className="text-xs font-mono text-gray-400 uppercase">
                {language === "ur" ? "ماہانہ ادائیگی کا تقابل" : "Revenue Comparison (Monthly)"}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Active Benchmark
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Local Pakistan Earnings */}
              <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20 text-left">
                <div className="text-[11px] font-mono text-red-400 mb-1">
                  🇵🇰 Urdu / Local Vlog
                </div>
                <div className="text-2xl font-extrabold text-red-300 font-mono">
                  ${pkEarnings.toLocaleString()}
                </div>
                <div className="text-[10px] text-gray-400 mt-1">Avg. $0.35 RPM rate</div>
              </div>

              {/* Global High-RPM Earnings */}
              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-left relative overflow-hidden shadow-[0_0_20px_rgba(245,158,11,0.15)]">
                <span className="absolute top-0 right-0 w-2 h-2 rounded-bl bg-amber-400" />
                <div className="text-[11px] font-mono text-amber-300 mb-1">
                  🌍 Global High-RPM Asset
                </div>
                <div className="text-2xl font-extrabold text-amber-300 font-mono">
                  ${globalEarnings.toLocaleString()}
                </div>
                <div className="text-[10px] text-amber-400/80 mt-1">
                  ${active.rpm} RPM ({active.badge})
                </div>
              </div>
            </div>

            {/* Difference Callout */}
            <div className="p-4 rounded-xl bg-white/[0.04] border border-amber-500/30 text-center space-y-1">
              <div className="text-xs font-medium text-gray-300">
                {language === "ur" ? "اضافی ماہانہ خالص آمدنی:" : "Net Monthly Difference (Passive Cash Flow):"}
              </div>
              <div className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-200 font-mono">
                +${monthlyDifference.toLocaleString()} <span className="text-sm text-gray-400 font-normal">/ mo</span>
              </div>
              <div className="text-xs font-mono text-emerald-400 font-bold">
                ≈ Rs. {monthlyPkr} PKR / month
              </div>
              <div className="text-[11px] text-gray-400 pt-1">
                Annual Asset Yield: <span className="text-white font-bold font-mono">${annualDifference.toLocaleString()} USD</span>
              </div>
            </div>

            <button
              onClick={onUnlockClick}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-amber-500 to-amber-600 hover:opacity-95 text-white font-extrabold text-sm tracking-wide shadow-lg shadow-red-500/20 transition-all transform hover:scale-[1.02] active:scale-98"
            >
              {language === "ur" ? "اس ماڈل کو لانچ کرنے کا روڈ میپ لیں 🚀" : "Unlock the High-RPM Blueprint 🚀"}
            </button>
          </div>
        </div>
      </TiltCard3D>
    </div>
  );
}
