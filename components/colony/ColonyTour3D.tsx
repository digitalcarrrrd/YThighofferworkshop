"use client";

import React, { useState } from "react";
import TiltCard3D from "../3d/TiltCard3D";

interface ColonyTourProps {
  onApplyClick: () => void;
  language?: string;
}

export default function ColonyTour3D({ onApplyClick, language = "en" }: ColonyTourProps) {
  const [activeZone, setActiveZone] = useState<number>(0);

  const zones = [
    {
      id: "studios",
      titleEn: "Studio Bay Alpha & Beta",
      titleUr: "اسٹوڈیو بے الفا اور بیٹا",
      tagEn: "🎙️ 4K Production & Podcasting",
      tagUr: "🎙️ فور کے پروڈکشن اور پاڈکاسٹ",
      descEn:
        "Fully acoustically treated audio/video suites equipped with Sony FX cinema rigs, Shure SM7B microphones, motorized teleprompters, and custom RGB lighting setups ready for instant recording.",
      descUr:
        "ساؤنڈ پروف آڈیو اور ویڈیو اسٹوڈیوز جو سونی 4K کیمروں، شور مائکس، اور موٹرائزڈ ٹیلی پرامپٹرز سے لیس ہیں تاکہ آپ بغیر کسی رکاوٹ کے ریکارڈنگ کر سکیں۔",
      specs: [
        { labelEn: "Acoustics", labelUr: "ساؤنڈ پروفنگ", val: "Studio Grade A+" },
        { labelEn: "Camera Rigs", labelUr: "کیمرہ سیٹ اپ", val: "4K Sony Cinema" },
        { labelEn: "Lighting", labelUr: "لائٹنگ", val: "Aputure & RGB Tubes" },
        { labelEn: "Audio", labelUr: "آڈیو سسٹمز", val: "Shure SM7B Broadcast" },
      ],
      badge: "Production Ready",
      color: "red" as const,
    },
    {
      id: "cowork",
      titleEn: "Creator Co-Working Floor",
      titleUr: "کریئٹرز کو-ورکنگ فلور",
      tagEn: "⚡ 1 Gbps Fiber & Render Rigs",
      tagUr: "⚡ 1 جی بی پی ایس فائبر انٹرنیٹ",
      descEn:
        "Ergonomic creator workstations with dedicated ultra-wide monitors, 1000 Mbps dual-redundant fiber optic lines, and shared RTX 4090 batch rendering nodes for fast video exports.",
      descUr:
        "آرام دہ ورک سٹیشنز، 1000 ایم بی پی ایس ڈوئل فائبر انٹرنیٹ، اور RTX 4090 رینڈر سسٹمز تاکہ گھنٹوں کا کام منٹوں میں مکمل ہو۔",
      specs: [
        { labelEn: "Internet", labelUr: "انٹرنیٹ اسپیڈ", val: "1 Gbps Redundant" },
        { labelEn: "Power Backup", labelUr: "بجلی بیک اپ", val: "100% 24/7 Solar+Gen" },
        { labelEn: "Render Node", labelUr: "رینڈر نوڈ", val: "RTX 4090 Batch Server" },
        { labelEn: "Desks", labelUr: "ڈیسکس", val: "Ergo Standing Desks" },
      ],
      badge: "High Throughput",
      color: "gold" as const,
    },
    {
      id: "residency",
      titleEn: "Private Residency Suites",
      titleUr: "پرائیویٹ کو-لیونگ رہائش",
      tagEn: "🛌 Co-Living & Creator Retreat",
      tagUr: "🛌 رہائشی کمرے اور سہولیات",
      descEn:
        "Luxury private and shared suites with hotel-grade comfort, daily housekeeping, 24/7 chef-curated meals, and high-vibe communal lounge areas for effortless living.",
      descUr:
        "ہوٹل کے معیار کی رہائش، روزانہ صفائی، 24 گھنٹے تازہ کھانے، اور پُرسکون لاؤنج تاکہ آپ اپنی پوری توجہ صرف کریئشن پر مرکوز رکھ سکیں۔",
      specs: [
        { labelEn: "Occupancy", labelUr: "رہائش", val: "Private & Duo Suites" },
        { labelEn: "Meals", labelUr: "کھانا", val: "3x Chef Curated Daily" },
        { labelEn: "Housekeeping", labelUr: "صفائی ستھرائی", val: "Daily Full Service" },
        { labelEn: "Access", labelUr: "رسائی", val: "Keyless Biometric 24/7" },
      ],
      badge: "All-Inclusive Living",
      color: "cyan" as const,
    },
    {
      id: "mastermind",
      titleEn: "Mastermind War Room",
      titleUr: "ماسٹر مائنڈ وار روم",
      tagEn: "🧠 Weekly Scaling Sprints with Abrar",
      tagUr: "🧠 ابرار کے ساتھ ہفتہ وار سیشنز",
      descEn:
        "The command center where residents break down 7-figure YouTube channel strategies, test AI thumbnail CTR models, audit Retention graphs, and launch new media properties together.",
      descUr:
        "وہ مرکزی ہال جہاں ابرار نادر کے ساتھ مل کر یوٹیوب چینلز کی مکمل اسٹریٹجی، وائرل تھمب نیلز اور الگورتھم ٹیسٹنگ کی جاتی ہے۔",
      specs: [
        { labelEn: "Sessions", labelUr: "سیشنز", val: "Weekly In-Person" },
        { labelEn: "Audits", labelUr: "تجزیہ", val: "Live Retention Analytics" },
        { labelEn: "Network", labelUr: "نیٹ ورک", val: "Top 1% Media Operators" },
        { labelEn: "Mentorship", labelUr: "رہنمائی", val: "Direct with Abrar" },
      ],
      badge: "High Synergy",
      color: "emerald" as const,
    },
  ];

  const current = zones[activeZone];

  return (
    <div className="w-full">
      {/* Zone Switcher Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {zones.map((zone, idx) => {
          const isActive = activeZone === idx;
          return (
            <button
              key={zone.id}
              onClick={() => setActiveZone(idx)}
              className={`p-4 rounded-xl border text-left transition-all duration-300 relative overflow-hidden ${
                isActive
                  ? "bg-gradient-to-br from-white/[0.12] to-white/[0.04] border-amber-400/80 shadow-[0_0_25px_rgba(245,158,11,0.25)] scale-[1.02]"
                  : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.05]"
              }`}
            >
              {isActive && (
                <span className="absolute top-0 right-0 w-2 h-2 rounded-bl-lg bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
              )}
              <div className="text-xs font-mono text-amber-400 mb-1">ZONE 0{idx + 1}</div>
              <div className="text-sm font-bold text-white leading-snug">
                {language === "ur" ? zone.titleUr : zone.titleEn}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Display Box */}
      <TiltCard3D glowColor={current.color} className="border-white/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.07] border border-white/15 text-xs font-semibold text-amber-300">
              <span>{language === "ur" ? current.tagUr : current.tagEn}</span>
              <span className="w-1 h-1 rounded-full bg-amber-400" />
              <span className="text-white/60">{current.badge}</span>
            </div>

            <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {language === "ur" ? current.titleUr : current.titleEn}
            </h3>

            <p className="text-sm md:text-base text-gray-300 leading-relaxed">
              {language === "ur" ? current.descUr : current.descEn}
            </p>

            {/* Hardware / Facility Specifications Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {current.specs.map((spec, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg bg-black/40 border border-white/5 flex flex-col"
                >
                  <span className="text-[11px] font-mono text-gray-400 uppercase">
                    {language === "ur" ? spec.labelUr : spec.labelEn}
                  </span>
                  <span className="text-sm font-bold text-white mt-0.5">{spec.val}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <button
                onClick={onApplyClick}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-sm tracking-wide shadow-lg shadow-amber-500/25 transition-all transform hover:scale-105 active:scale-95"
              >
                {language === "ur" ? "ریذیڈنسی کے لیے اپلائی کریں ⚡" : "Apply for Residency / Tour ⚡"}
              </button>
              <div className="text-xs text-gray-400 flex items-center gap-1.5 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Next Residency Cohort Open (Limited Slots)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Holographic Cyber Diagram / Amenities Showcase */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center p-6 rounded-xl bg-gradient-to-b from-black/80 to-black/40 border border-white/10 overflow-hidden">
            {/* Cyber HUD Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="relative z-10 w-full text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-amber-500/20 to-red-500/20 border border-amber-500/40 flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                {activeZone === 0 ? "🎙️" : activeZone === 1 ? "⚡" : activeZone === 2 ? "🛌" : "🧠"}
              </div>

              <div className="font-mono text-xs text-amber-400 tracking-widest uppercase">
                CONTENT COLONY • LIVE RESIDENCY
              </div>

              <div className="p-4 rounded-lg bg-white/[0.04] border border-white/10 text-left space-y-2 text-xs">
                <div className="flex justify-between items-center text-gray-300">
                  <span>⚡ 24/7 Power Continuity:</span>
                  <span className="text-emerald-400 font-bold">100% Guaranteed</span>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <span>🚀 Dedicated Fiber:</span>
                  <span className="text-emerald-400 font-bold">1 Gbps Dual ISP</span>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <span>☕ Living & Food:</span>
                  <span className="text-amber-300 font-bold">Chef Prepared</span>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <span>👥 Peer Network:</span>
                  <span className="text-amber-300 font-bold">Full-Time Creators</span>
                </div>
              </div>

              <div className="text-[11px] text-gray-400 italic">
                &ldquo;Where Pakistan&apos;s most ambitious creators live, shoot, and scale high-RPM channels together.&rdquo;
              </div>
            </div>
          </div>
        </div>
      </TiltCard3D>
    </div>
  );
}
