"use client";

import React, { useState, useEffect } from "react";
import { 
  CheckCircle2, Clock, ShieldCheck, Download, 
  ExternalLink, MessageSquare, Play, BookOpen, 
  Copy, Sparkles, Award, FileText, Check, 
  HelpCircle, ChevronRight, User, Users, Phone, Mail, 
  Calendar, Layers, ArrowRight, Lock, Zap
} from "lucide-react";

const TEAM_WHATSAPP_NUMBER = "923296158206";

const MODULES = [
  { id: 1, title: "Module 01: High-RPM Niche Selection & US Audience Targeting", duration: "48 mins", lessons: 5, status: "Unlocked" },
  { id: 2, title: "Module 02: AI Scripting Engines (ChatGPT 4o & Claude Workflows)", duration: "55 mins", lessons: 6, status: "Unlocked" },
  { id: 3, title: "Module 03: Natural AI Voiceover Synthesis (ElevenLabs Pro)", duration: "42 mins", lessons: 4, status: "Unlocked" },
  { id: 4, title: "Module 04: Visual Editing & Fast B-Roll Assembly Systems", duration: "60 mins", lessons: 7, status: "Unlocked" },
  { id: 5, title: "Module 05: High-Click Thumbnail Packaging & Psychological Hooks", duration: "45 mins", lessons: 5, status: "Unlocked" },
  { id: 6, title: "Module 06: YouTube Algorithm SEO & Search Velocity", duration: "50 mins", lessons: 5, status: "Unlocked" },
  { id: 7, title: "Module 07: Legal AdSense Direct Pakistani Bank Wire (Code 9182)", duration: "38 mins", lessons: 4, status: "Unlocked" },
  { id: 8, title: "Module 08: Monetization Diversification (Affiliates & Assets)", duration: "44 mins", lessons: 5, status: "Unlocked" },
  { id: 9, title: "Module 09: Scaling Faceless Production with Automation Teams", duration: "52 mins", lessons: 6, status: "Unlocked" },
  { id: 10, title: "Module 10: Copyright, Fair-Use & Reused Content Compliance", duration: "40 mins", lessons: 4, status: "Unlocked" },
  { id: 11, title: "Module 11: 30-Day Launch Sprint & Consistency Blueprint", duration: "65 mins", lessons: 7, status: "Unlocked" },
  { id: 12, title: "Module 12: Scaling from 1 Channel to a Multi-Channel Network", duration: "58 mins", lessons: 6, status: "Unlocked" },
];

const RESOURCES = [
  { title: "50+ High-RPM AI Prompts Swipe File", type: "PDF & Prompts Doc", tag: "AI Scripting", size: "4.2 MB" },
  { title: "90-Day Content Calendar & Batch Planner", type: "Interactive Sheet", tag: "Production", size: "1.8 MB" },
  { title: "YouTube Niche Validation Decision Matrix", type: "Analysis Framework", tag: "Niche Research", size: "2.4 MB" },
  { title: "High-CTR Thumbnail & Packaging Swipe File", type: "Design Templates", tag: "Click-Through Rate", size: "12.5 MB" },
  { title: "Pakistani Bank Wire & State Bank Code 9182 Guide", type: "Compliance Guide", tag: "Finance & Tax", size: "1.1 MB" },
];

export default function StudentPortalClient() {
  const [studentName, setStudentName] = useState<string>("Student");
  const [studentEmail, setStudentEmail] = useState<string>("");
  const [studentPhone, setStudentPhone] = useState<string>("");
  const [studentPlan, setStudentPlan] = useState<string>("YT Empire Builders — Lifetime LMS Access");
  const [studentId, setStudentId] = useState<string>("YTEB-2026-8492");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"modules" | "resources" | "community">("modules");
  const [isLookupOpen, setIsLookupOpen] = useState<boolean>(false);
  const [lookupInput, setLookupInput] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const name = params.get("name") || params.get("fullName");
      const email = params.get("email");
      const phone = params.get("phone");
      const plan = params.get("plan") || params.get("requestedOffer");

      if (name) setStudentName(name);
      if (email) setStudentEmail(email);
      if (phone) setStudentPhone(phone);
      if (plan) setStudentPlan(plan);

      // Generate stable deterministic ID
      const seed = (name || "Member") + (phone || "2026");
      let hash = 0;
      for (let i = 0; i < seed.length; i++) hash = (hash << 5) - hash + seed.charCodeAt(i);
      const code = Math.abs(hash % 9000) + 1000;
      setStudentId(`YTEB-2026-${code}`);
    }
  }, []);

  const copyToClipboard = (text: string, key: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const handleLookupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupInput.trim()) return;
    setStudentName(lookupInput.trim());
    setIsLookupOpen(false);
  };

  const triggerSupportWhatsApp = () => {
    const msg = `Salam Abrar Nadir & Verification Team! Main apna Student Portal access verify karwana chahta hoon.\n\n*Name:* ${studentName}\n*Student ID:* ${studentId}\n*Enrolled Plan:* ${studentPlan}\n\nPlease confirm my LMS enrollment & VIP community access. Shukriya!`;
    window.open(`https://wa.me/${TEAM_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#0A0D0E] text-slate-100 font-sans selection:bg-[#2FD97E] selection:text-[#04220F] pb-20">
      
      {/* Top Navbar */}
      <nav className="sticky top-0 z-40 bg-[#0E1315]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#2FD97E] to-[#10B981] flex items-center justify-center font-black text-black text-lg shadow-lg">
            YT
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-white">YT Empire Builders</div>
            <div className="text-[10px] font-mono text-[#2FD97E]">Student Client Portal</div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            type="button" 
            onClick={() => setIsLookupOpen(true)}
            className="text-xs font-bold text-slate-300 hover:text-white bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg transition-colors"
          >
            Switch Account
          </button>
          <button
            type="button"
            onClick={triggerSupportWhatsApp}
            className="bg-[#25D366] hover:bg-[#20BA56] text-white text-xs font-black px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md"
          >
            <MessageSquare size={14} />
            <span className="hidden sm:inline">WhatsApp Concierge</span>
          </button>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        
        {/* Welcome Student Banner */}
        <div className="bg-gradient-to-r from-[#111915] via-[#0E1513] to-[#0A0D0E] border-2 border-[#2FD97E]/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-[#2FD97E]/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 bg-[#2FD97E]/10 border border-[#2FD97E]/30 px-3 py-1 rounded-full text-xs font-mono font-black text-[#2FD97E]">
                <span className="w-2 h-2 rounded-full bg-[#2FD97E] animate-pulse" />
                <span>STUDENT PORTAL DASHBOARD</span>
              </div>
              
              <h1 className="text-2xl sm:text-4xl font-black text-white">
                Welcome, <span className="text-[#2FD97E]">{studentName}</span>!
              </h1>
              
              <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
                Aapka official YouTube Empire Builders LMS learning portal active hai. Yahan se aap apne video modules, downloadable resource swipe files aur VIP mentorship access kar sakte hain.
              </p>
            </div>

            {/* Student ID & Verification Status Card */}
            <div className="bg-[#080B0C] border border-white/10 rounded-2xl p-4 sm:p-5 text-right w-full md:w-auto shrink-0 space-y-2">
              <div className="flex justify-between md:justify-end items-center gap-3">
                <span className="text-[11px] text-slate-400 font-mono">Student ID:</span>
                <span className="font-mono font-bold text-white bg-white/10 px-2.5 py-0.5 rounded text-xs">
                  {studentId}
                </span>
              </div>
              <div className="flex justify-between md:justify-end items-center gap-3">
                <span className="text-[11px] text-slate-400 font-mono">Enrolled Tier:</span>
                <span className="font-bold text-[#FFB020] text-xs">VIP Lifetime Access</span>
              </div>
              <div className="flex justify-between md:justify-end items-center gap-3 pt-1 border-t border-white/10">
                <span className="text-[11px] text-slate-400 font-mono">Status:</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  <CheckCircle2 size={12} /> Verification Desk Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Step Student Onboarding Checklist */}
        <div className="bg-[#0E1315] border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <div>
              <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-wide flex items-center gap-2">
                <Sparkles size={18} className="text-[#FFB020]" />
                Student Launch Onboarding Checklist
              </h2>
              <p className="text-xs text-slate-400">Complete these 4 rapid steps to maximize your YouTube launch sprint:</p>
            </div>
            <span className="text-xs font-mono text-[#2FD97E] bg-[#2FD97E]/10 border border-[#2FD97E]/30 px-2.5 py-1 rounded-full font-bold">
              3/4 Steps Ready
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            {/* Step 1 */}
            <div className="bg-[#0A0D0E] border border-white/10 p-4 rounded-xl space-y-2 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono text-[#2FD97E] font-bold">STEP 01</div>
                <h3 className="text-xs font-bold text-white">Attach Payment Screenshot</h3>
                <p className="text-[11px] text-slate-400 mt-1">Payment proof manager ko WhatsApp karein for priority green check.</p>
              </div>
              <button 
                type="button" 
                onClick={triggerSupportWhatsApp}
                className="w-full bg-[#2FD97E]/10 hover:bg-[#2FD97E]/20 text-[#2FD97E] border border-[#2FD97E]/30 text-xs font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                Send Proof to Manager →
              </button>
            </div>

            {/* Step 2 */}
            <div className="bg-[#0A0D0E] border border-white/10 p-4 rounded-xl space-y-2 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono text-[#FFB020] font-bold">STEP 02</div>
                <h3 className="text-xs font-bold text-white">Join VIP WhatsApp Community</h3>
                <p className="text-[11px] text-slate-400 mt-1">Daily strategy drops, niche reviews & peer networking.</p>
              </div>
              <a 
                href={`https://wa.me/${TEAM_WHATSAPP_NUMBER}?text=${encodeURIComponent("Salam Abrar Nadir! Please add me to the private VIP WhatsApp Community Group. Student ID: " + studentId)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20BA56] text-white text-xs font-black py-2 rounded-lg transition-colors text-center block"
              >
                Join VIP Community Group
              </a>
            </div>

            {/* Step 3 */}
            <div className="bg-[#0A0D0E] border border-white/10 p-4 rounded-xl space-y-2 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono text-cyan-400 font-bold">STEP 03</div>
                <h3 className="text-xs font-bold text-white">Download 50+ AI Prompts Pack</h3>
                <p className="text-[11px] text-slate-400 mt-1">Tested prompts for ChatGPT 4o and Claude 3.5 Sonnet scripting.</p>
              </div>
              <button 
                type="button" 
                onClick={() => setActiveTab("resources")}
                className="w-full bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-500/30 text-xs font-bold py-2 rounded-lg transition-colors"
              >
                Open Resource Vault ↓
              </button>
            </div>

            {/* Step 4 */}
            <div className="bg-[#0A0D0E] border border-white/10 p-4 rounded-xl space-y-2 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono text-purple-400 font-bold">STEP 04</div>
                <h3 className="text-xs font-bold text-white">Start Module 01 Blueprint</h3>
                <p className="text-[11px] text-slate-400 mt-1">Select your high-RPM niche and lock your channel positioning.</p>
              </div>
              <button 
                type="button" 
                onClick={() => setActiveTab("modules")}
                className="w-full bg-purple-950/60 hover:bg-purple-900/60 text-purple-300 border border-purple-500/30 text-xs font-bold py-2 rounded-lg transition-colors"
              >
                Watch Module 01 →
              </button>
            </div>
          </div>
        </div>

        {/* Portal Navigation Tabs */}
        <div className="flex border-b border-white/10 gap-2 sm:gap-4 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setActiveTab("modules")}
            className={`py-3 px-4 font-bold text-sm border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "modules" ? "border-[#2FD97E] text-[#2FD97E]" : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <BookOpen size={16} /> 12 Core Video Modules (LMS)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("resources")}
            className={`py-3 px-4 font-bold text-sm border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "resources" ? "border-[#2FD97E] text-[#2FD97E]" : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Download size={16} /> Downloadable Resource Vault (5 Assets)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("community")}
            className={`py-3 px-4 font-bold text-sm border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "community" ? "border-[#2FD97E] text-[#2FD97E]" : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Users size={16} /> Community & 1-on-1 Mentorship
          </button>
        </div>

        {/* TAB 1: 12 VIDEO MODULES */}
        {activeTab === "modules" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <div>
                <h3 className="text-lg font-black text-white">12 Comprehensive Action Modules</h3>
                <p className="text-xs text-slate-400">Step-by-step masterclass videos from zero niche to monetized cashflow.</p>
              </div>
              <span className="text-xs font-mono text-slate-400">Total Curriculum: 10.5 Hours Full HD</span>
            </div>

            <div className="grid md:grid-cols-2 gap-3.5">
              {MODULES.map((mod) => (
                <div 
                  key={mod.id}
                  className="bg-[#0E1315] hover:bg-[#12191C] border border-white/10 hover:border-[#2FD97E]/40 p-5 rounded-2xl transition-all space-y-3 flex flex-col justify-between group"
                >
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono font-bold text-[#2FD97E] uppercase">Part {mod.id < 10 ? `0${mod.id}` : mod.id}</span>
                      <span className="text-[11px] font-mono text-slate-400">{mod.duration} • {mod.lessons} Lessons</span>
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#2FD97E] transition-colors">
                      {mod.title}
                    </h4>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex justify-between items-center">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                      <CheckCircle2 size={13} /> {mod.status}
                    </span>
                    <button
                      type="button"
                      onClick={triggerSupportWhatsApp}
                      className="text-xs font-bold text-slate-200 hover:text-white flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    >
                      <span>Open Classroom</span>
                      <ChevronRight size={14} className="text-[#2FD97E]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: RESOURCE VAULT */}
        {activeTab === "resources" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <div>
                <h3 className="text-lg font-black text-white">Student Downloadable Resource Vault</h3>
                <p className="text-xs text-slate-400">Exclusive templates, prompts and spreadsheets included with your enrollment.</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {RESOURCES.map((res, idx) => (
                <div key={idx} className="bg-[#0E1315] border border-white/10 p-5 rounded-2xl space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="inline-block bg-[#2FD97E]/10 border border-[#2FD97E]/30 text-[#2FD97E] text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                      {res.tag}
                    </span>
                    <h4 className="text-sm font-bold text-white">{res.title}</h4>
                    <p className="text-xs text-slate-400">{res.type} • {res.size}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      alert(`Downloading ${res.title}... File link sent to your WhatsApp verification desk.`);
                      triggerSupportWhatsApp();
                    }}
                    className="w-full bg-white/5 hover:bg-[#2FD97E] text-white hover:text-black border border-white/10 hover:border-transparent text-xs font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    <Download size={14} /> Download Asset
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: COMMUNITY & MENTORSHIP */}
        {activeTab === "community" && (
          <div className="bg-[#0E1315] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
            <div className="space-y-2">
              <h3 className="text-xl font-black text-white">Private VIP Mentorship & Support Hub</h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
                YouTube creation mein accountability sabse zaroori hoti hai. Direct Abrar Nadir aur senior coaches ke sath connect karein:
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-[#0A0D0E] border border-white/10 p-5 rounded-2xl space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366]">
                  <MessageSquare size={20} />
                </div>
                <h4 className="text-base font-bold text-white">VIP WhatsApp Action Community</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Daily topic discussions, script reviews, thumbnail feedback, aur weekly strategy updates.
                </p>
                <a 
                  href={`https://wa.me/${TEAM_WHATSAPP_NUMBER}?text=${encodeURIComponent("Salam Abrar Nadir! Please add me to the VIP Community Group. Student ID: " + studentId)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block bg-[#25D366] hover:bg-[#20BA56] text-white text-xs font-black px-4 py-2.5 rounded-xl transition-all"
                >
                  Open VIP WhatsApp Group →
                </a>
              </div>

              <div className="bg-[#0A0D0E] border border-white/10 p-5 rounded-2xl space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#2FD97E]/20 border border-[#2FD97E]/40 flex items-center justify-center text-[#2FD97E]">
                  <ShieldCheck size={20} />
                </div>
                <h4 className="text-base font-bold text-white">1-on-1 Channel Audit Desk</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Apne pehle 3 videos upload karne ke baad direct manager se retention audit aur CPM optimization review karein.
                </p>
                <button
                  type="button"
                  onClick={triggerSupportWhatsApp}
                  className="inline-block bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
                >
                  Schedule Channel Audit →
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Switch Account / Student Lookup Modal */}
      {isLookupOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0E1315] border border-white/15 rounded-2xl p-6 max-w-md w-full space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-white">Access Your Student Portal</h3>
              <button onClick={() => setIsLookupOpen(false)} className="text-slate-400 hover:text-white text-xl font-bold">
                &times;
              </button>
            </div>
            <p className="text-xs text-slate-400">Enter your Full Name or WhatsApp Number to switch dashboard view:</p>
            <form onSubmit={handleLookupSubmit} className="space-y-3">
              <input 
                type="text" 
                placeholder="Enter your registered name..."
                value={lookupInput}
                onChange={(e) => setLookupInput(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#0A0D0E] border border-white/10 text-white text-sm focus:border-[#2FD97E] outline-none"
                required
              />
              <button 
                type="submit"
                className="w-full bg-[#2FD97E] hover:bg-[#52E897] text-black font-black text-sm py-3 rounded-xl transition-all"
              >
                Access My Portal Dashboard →
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
