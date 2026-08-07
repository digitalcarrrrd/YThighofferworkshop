'use client';

import React, { useState, useEffect } from 'react';
import LmsModal from './LmsModal';
import { PlayCircle, CheckCircle, ShieldCheck, CreditCard, Lock } from 'lucide-react';

export default function LmsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeReveals, setActiveReveals] = useState<number[]>([]);
  
  // Modules Data
  const modules = [
    { id: 1, title: "Quick Wins & Real Results", days: "Days 1-3", what: ["Myth-Busting: Why 99% Fail", "Case Study: $1,200/month in 1 hr/day", "Passive Income Timeline Creation", "10 Ready-made script prompts", "AI Agents setup for your workflow"], bonus: ["Copy & Paste Method for first $500"], result: "Fast wins build your confidence and prove the system works from day one." },
    { id: 2, title: "🛑 Busting YouTube Myths", days: "Days 4-6", what: ["IP Safety & Multiple Channels", "AdSense Mastery & Payment Fixes", "Monetization Blueprint for Pakistan", "Copyright & Guidelines Shield", "Traditional vs Automation Strategy"], result: "Shift your mindset from overwhelmed to laser-focused with a safe, legal plan." },
    { id: 3, title: "Finding the Best Niche", days: "Days 7-10", what: ["AI-Finalized Profitable Niches", "Research & Analyze any Niche", "Secret 'Niche Template' understanding", "2 Strategies for Unlimited Ideas", "Mastering CTR, AVD & RPM stats"], bonus: ["100+ Profitable Niche List"], result: "Select a high-paying niche that is guaranteed to grow sustainably." },
    { id: 4, title: "Channel Setup & Launch", days: "Day 11-12", what: ["AI-powered Secret Optimization", "Secret 'Orgasm' Setup method", "Skip detection before channel creation", "100+ Insane AI Tools & Extensions", "50+ Creative Secret Sites"], bonus: ["Viral Success Checklist"], result: "Your channel will be live and optimized for viral growth from the start." },
    { id: 5, title: "Algorithm Hijack Hacks", days: "Days 12-14", what: ["Fixing view drops instantly", "Reviving old channels method", "Packaging videos correctly", "Hacking the Recommendation engine", "First 24-hour success boost"], result: "Ensure every video you upload has the highest chance to go viral." },
    { id: 6, title: "Hercules of Prompt Engineering", days: "Days 15-17", what: ["Viral Hooks discovery via AI", "AI Agent high-quality scripting", "Natural AI Narration (5 free tools)", "Long Script Writing (3hr formats)", "AI-Generated Thumbnail Artistry", "The Secret 60% AVD Rule"], bonus: ["Personal Custom Script Bot"], result: "Save 100s of hours. Let AI do the hard work while you keep the profit." },
    { id: 7, title: "The Translation Method", days: "Days 17-20", what: ["100+ Language Translation for free", "AI Subtitles & Localized Voices", "Turn 1 video into 10 global assets", "Legal reuse of global content"], result: "Reach a massive global audience and 10x your earnings instantly." },
    { id: 8, title: "Copy & Clipping Method", days: "Days 21-24", what: ["Copyright-Free content secrets", "Picking viral clips efficiently", "AI Editing using ChatGPT", "5 AI tools for 100% uniqueness"], bonus: ["$500 Video Graphics Pack"], result: "Create high-quality videos without creating raw footage from scratch." },
    { id: 9, title: "Pro Video Editing & Tools", days: "Days 25-27", what: ["Capcut King: Mastery in 1 Hour", "Steal Viral Formats method", "Sourcing & Researching content", "Premiere Pro Template hacks", "Building your own Media Library"], bonus: ["10 Capcut Premade Templates"], result: "Professional edits keep viewers hooked and watch time high." },
    { id: 10, title: "Monetization & Scaling", days: "Days 28-29", what: ["Ads, Sponsorships & Affiliates", "Maximize Revenue with Extensions", "Ninja Method to hijack views", "Low Views = High Earnings strategy"], bonus: ["1000+ Company Sponsorship List"], result: "Build multiple income streams beyond just YouTube AdSense." },
    { id: 11, title: "Managing Your Empire", days: "Day 30", what: ["6-Figure business scaling", "Managing teams with free tools", "Multiple channel automation", "Content calendars & systems"], result: "Step away from the work and run your channel like a true business owner." },
    { id: 12, title: "Hacker: Payment Hacks", days: "Special Access", what: ["Daily Payment Hack (No 40-day wait)", "Access 4 months future earnings", "Withdraw money not yet made secrets", "Boost cashflow instantly"], result: "Unlock the financial potential of your channel with advanced money hacks.", isSpecial: true }
  ];

  const reviews = [
    { name: "Rizwan Abbas Samtia", date: "20 November", text: "This was an absolutely phenomenal live session! Abrar Nadir is clearly a true expert in the field. His confidence and ability to articulate complex concepts made the content incredibly engaging and easy to follow. Specifically, the deep dive into advanced prompt engineering techniques was eye-opening—it immediately gives me ideas on how to significantly improve the quality of my scripts and content generation. Huge value delivered!" },
    { name: "Ziya Hasnai", date: "16 November", text: "Truly one of the best minds in prompting I've come across. I've worked with several people in Pakistan who claim to be YouTube gurus, but he is the only one who genuinely taught me something valuable. I'm inspired by his work and definitely see long-term collaboration ahead." },
    { name: "Usman Elahi Malik", date: "11 August", text: "Alhumdulilah Abrar Nadir Bhai sy session liya hai Kafi new cheezein discover ki hein Jo loug Youtube Automation ko ly kr serious hein woh aik dafa Zaroor Session lein" },
    { name: "Razi Haider Khan", date: "4 August", text: "Finally had a one to one session with Abrar Nadir didnt know i was missing out too much important things for the automation. I am really happy that i made this decision not to soon but still not too late, the way you explained eqxh and everything while being this polite no one can tell you these things too easily like you explained." },
    { name: "Mubashira S", date: "4 August", text: "I've watched so many videos on YouTube, but I still haven't found anyone who teaches the way Sir Abrar does 🤯. There's something different about him, the way he breaks things down, the way he explains concepts so clearly that you can actually apply them 🔍✨" }
  ];

  const faqs = [
    { q: "1. How do I access the course?", a: "Immediately after payment, you will receive an email with your login details for our Learning Management System (LMS). You can log in from your mobile or laptop and start watching immediately." },
    { q: "2. What will happen if I will not succeed?", a: "Success is the default here. Our students inside LMS already generated more then $50k+ collectively. If you rareley fail to succeed, we will give you custom help and guidance or we will give you other benefits without any cost." },
    { q: "3. Why this Course/LMS is different?", a: "It's different because it's attached with Sir Abrar's Vision to train 1.6 million people. You are not just learning from recorded videos but within systems and communities that force you to take action from day 1." },
    { q: "4. Will you guys teach on Long Form Content/Shorts?", a: "We train you to be a King of AI Content Creation. You will learn to produce any type of content using AI—scripts, research, editing, and growth. That's how you master the WHOLE YT game." }
  ];

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({ hours: 11, minutes: 54, seconds: 32 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          if (minutes > 0) { minutes--; seconds = 59; }
          else {
            if (hours > 0) { hours--; minutes = 59; seconds = 59; }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-indigo-950 text-slate-100 font-sans selection:bg-fuchsia-500 selection:text-white">
      <style dangerouslySetInnerHTML={{__html: `
        .reveal { opacity: 0; transform: translateY(3rem); transition: all 1s ease-out; }
        .reveal.active { opacity: 1; transform: translateY(0); }
        .pulse-amber { animation: pulse-amber 2s infinite; }
        @keyframes pulse-amber {
          0%, 100% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.7); }
          50% { box-shadow: 0 0 0 15px rgba(251, 191, 36, 0); }
        }
      `}} />

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-indigo-950/90 backdrop-blur-xl border-b border-fuchsia-500/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-fuchsia-600 to-purple-600 w-10 h-10 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-fuchsia-500/30">YT</div>
            <span className="font-black text-xl tracking-tight text-white uppercase italic">Empire Builder</span>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-indigo-950 font-black py-2.5 px-6 rounded-full transition-all text-sm uppercase shadow-[0_0_20px_rgba(251,191,36,0.4)] transform hover:scale-105">
            Get Access
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-fuchsia-600/20 blur-[120px] -z-10 rounded-full"></div>
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-900/60 border border-fuchsia-500/40 rounded-full px-5 py-2 mb-8 shadow-lg shadow-fuchsia-500/10 backdrop-blur-md">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
            <span className="text-sm font-bold text-fuchsia-300 tracking-wide uppercase">New Strategy For 2026</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-8 drop-shadow-xl">
            Get Started With YouTube Automation in 2026 <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-pink-400 to-amber-400">Via A Plug & Play System</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
            Stop trading time for money. Build a "Digital Real Estate" asset that pays you while you sleep. No filming. No showing your face. Just smart AI systems.
          </p>
          <div className="flex flex-col items-center gap-6">
            <button onClick={() => setIsModalOpen(true)} className="group relative bg-gradient-to-b from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-indigo-950 text-xl md:text-3xl font-black py-6 px-16 rounded-2xl shadow-[0_15px_40px_rgba(251,191,36,0.3)] transition-all pulse-amber transform hover:-translate-y-1">
              START MY CHANNEL TODAY
              <div className="absolute inset-0 rounded-2xl border-4 border-white/30 animate-ping pointer-events-none"></div>
            </button>
            <p className="text-fuchsia-200 text-sm flex items-center justify-center gap-3 font-bold bg-indigo-900/40 px-6 py-2 rounded-full border border-fuchsia-500/20">
              <span className="text-amber-400 flex items-center gap-1"><CheckCircle className="w-4 h-4"/> No Camera Needed</span>
              <span className="text-amber-400 flex items-center gap-1"><CheckCircle className="w-4 h-4"/> No English Fluency Required</span>
            </p>
          </div>
        </div>
      </section>

      {/* VIDEO SHOWCASE */}
      <section className="py-24 bg-indigo-900/30 border-y border-fuchsia-500/20 relative overflow-hidden backdrop-blur-sm">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full -z-10"></div>
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter italic text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">Watch The System In Action</h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
              See exactly how our proprietary AI agents research, script, and edit viral content while you focus on scaling your earnings.
            </p>
          </div>
          <div className="relative aspect-video rounded-[32px] md:rounded-[48px] overflow-hidden border-8 border-fuchsia-500/20 shadow-[0_0_80px_rgba(217,70,239,0.3)] bg-indigo-950 group">
            <iframe 
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/38KKnI16Y1k?rel=0&modestbranding=1" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen 
              title="YouTube Empire Automation"
            ></iframe>
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section className="py-24 bg-indigo-950 relative z-10">
        <div className="absolute -left-[200px] top-[20%] w-[600px] h-[600px] bg-pink-600/10 blur-[150px] rounded-full -z-10"></div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight italic uppercase drop-shadow-lg">30-Day Path to Empire</h2>
            <p className="text-fuchsia-200 max-w-2xl mx-auto text-lg font-medium">Detailed blueprint covering every technical and creative aspect of YouTube growth.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map(m => (
              <div key={m.id} className="h-full">
                <div className={`h-full p-8 rounded-3xl border transition-all duration-300 flex flex-col hover:-translate-y-2 hover:shadow-2xl ${m.isSpecial ? 'border-amber-400 bg-gradient-to-b from-amber-500/10 to-indigo-900/50 shadow-[0_0_30px_rgba(251,191,36,0.15)]' : 'border-fuchsia-500/20 bg-indigo-900/40 hover:border-fuchsia-400/50 hover:bg-indigo-800/50 backdrop-blur-md'}`}>
                  <div className="flex justify-between items-center mb-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${m.isSpecial ? 'bg-amber-400 text-indigo-950' : 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30'}`}>Module {m.id}</span>
                    <span className="text-xs text-amber-300 font-bold">{m.days}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-tight leading-tight">{m.title}</h3>
                  <div className="flex-grow">
                    <ul className="space-y-3 mb-6">
                      {m.what.map((p, i) => (
                        <li key={i} className="text-sm text-slate-300 flex gap-3 font-medium"><span className="text-amber-400 font-bold">✓</span> {p}</li>
                      ))}
                    </ul>
                    {m.bonus && (
                      <div className="p-4 bg-fuchsia-900/30 border border-fuchsia-500/30 rounded-2xl mb-6 shadow-inner">
                        <span className="text-[10px] font-black text-fuchsia-400 uppercase block mb-1">Bonus Access</span>
                        <p className="text-xs text-white italic font-medium">{m.bonus.join(', ')}</p>
                      </div>
                    )}
                  </div>
                  <div className="mt-auto pt-6 border-t border-white/10">
                    <p className="text-[11px] italic leading-relaxed text-slate-400">
                      <span className="font-bold text-fuchsia-400 uppercase tracking-widest mr-1">Result:</span> {m.result}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING OFFER */}
      <section id="offer" className="py-24 bg-indigo-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-fuchsia-600/20 blur-[150px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="bg-indigo-900/80 border-2 border-fuchsia-500 rounded-[40px] overflow-hidden shadow-[0_0_80px_rgba(217,70,239,0.2)] backdrop-blur-xl">
            
            <div className="bg-gradient-to-r from-rose-600 to-pink-600 animate-pulse py-4 text-center shadow-lg">
              <p className="text-white font-black text-sm md:text-xl uppercase tracking-widest flex items-center justify-center gap-3 drop-shadow-md">
                <PlayCircle className="w-6 h-6" />
                New Year Offer !
              </p>
            </div>

            <div className="p-8 md:p-16 text-center">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-2 uppercase tracking-tighter italic drop-shadow-lg">Join The Empire</h2>
              <p className="text-amber-400 text-lg mb-8 uppercase tracking-widest font-bold">Life Time Access</p>

              {/* Countdown */}
              <div className="flex justify-center gap-3 md:gap-6 my-8">
                {['hours', 'minutes', 'seconds'].map((unit, i) => {
                  const val = i === 0 ? timeLeft.hours : i === 1 ? timeLeft.minutes : timeLeft.seconds;
                  return (
                    <div key={unit} className="flex flex-col items-center">
                      <div className="bg-indigo-950/80 border border-fuchsia-500/50 w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center text-3xl md:text-5xl font-black text-white shadow-[0_0_30px_rgba(217,70,239,0.3)]">
                        {val.toString().padStart(2, '0')}
                      </div>
                      <span className="text-[10px] md:text-xs font-bold text-fuchsia-300 mt-3 tracking-[0.2em] uppercase">{unit.substring(0,3)}</span>
                    </div>
                  );
                })}
              </div>

              <div className="text-left space-y-4 mb-12 bg-white/5 p-8 rounded-3xl border border-white/10 shadow-inner">
                {[
                  ['12 Module Automation Course', '$997'],
                  ['Execution Blueprints & Roadmaps', '$200'],
                  ['3 Plug & Play Execution Systems', '$1500'],
                  ['400+ Niches & Prompts', 'Included'],
                  ['Lifetime LMS Access', 'Lifetime'],
                  ['Weekly Live Sessions', 'Weekly'],
                  ['Money Back Guaranteed', 'Secure']
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-sm md:text-base border-b border-white/5 pb-3 last:border-0 last:pb-0">
                    <span className="text-slate-200 font-medium flex items-center gap-3"><CheckCircle className="w-4 h-4 text-amber-400" /> {item[0]}</span>
                    <span className="text-fuchsia-300 font-bold ml-4">{item[1]}</span>
                  </div>
                ))}
                <div className="pt-4 mt-4 border-t border-fuchsia-500/30 flex justify-between items-center font-black">
                  <span className="text-slate-300 uppercase text-sm">Total Est. Value</span>
                  <span className="text-rose-400 line-through text-xl">$3,194+</span>
                </div>
              </div>

              <div className="mb-10">
                <div className="text-fuchsia-300 text-sm uppercase font-black tracking-widest mb-4">Limited Enrollment Price</div>
                <div className="flex flex-col items-center">
                  <div className="text-7xl md:text-9xl font-black text-white leading-none tracking-tighter drop-shadow-2xl">$70<span className="text-2xl md:text-4xl text-slate-400 font-bold ml-2">USD</span></div>
                  <div className="text-amber-400 font-black text-xl md:text-2xl mt-6 animate-bounce bg-amber-400/10 px-6 py-2 rounded-full border border-amber-400/30">~ 20,000 PKR ONE-TIME</div>
                </div>
              </div>

              <button onClick={() => setIsModalOpen(true)} className="block w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-indigo-950 text-xl md:text-3xl font-black py-7 rounded-3xl shadow-[0_15px_40px_rgba(251,191,36,0.4)] transition-all transform hover:scale-[1.02] active:scale-95 mb-8 text-center uppercase">
                CLAIM MY SPOT NOW
              </button>

              <div className="flex items-center justify-center gap-8">
                <div className="flex flex-col items-center text-slate-400">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-amber-400 mb-2 border border-white/10"><ShieldCheck className="w-6 h-6"/></div>
                  <span className="text-[10px] font-bold">SECURE SSL</span>
                </div>
                <div className="flex flex-col items-center text-slate-400">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-amber-400 mb-2 border border-white/10"><CreditCard className="w-6 h-6"/></div>
                  <span className="text-[10px] font-bold">SAFE PAY</span>
                </div>
                <div className="flex flex-col items-center text-slate-400">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-amber-400 mb-2 border border-white/10"><Lock className="w-6 h-6"/></div>
                  <span className="text-[10px] font-bold">7-DAY REFUND</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 py-20 border-t border-fuchsia-500/20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="bg-gradient-to-br from-fuchsia-600 to-purple-600 w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-xs">YT</div>
            <span className="font-black text-lg tracking-tight text-white uppercase italic">Empire Builder</span>
          </div>
          <p className="text-slate-500 text-xs mb-6 max-w-2xl mx-auto leading-loose">
            Disclaimer: This site is not a part of the YouTube website or Google Inc. Additionally, This site is NOT endorsed by YouTube in any way. YOUTUBE is a trademark of GOOGLE, Inc.
          </p>
          <div className="flex justify-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8">
            <a href="#" className="hover:text-fuchsia-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-fuchsia-400 transition">Terms of Service</a>
            <a href="#" className="hover:text-fuchsia-400 transition">Support</a>
          </div>
          <p className="text-slate-600 text-[10px] font-bold">&copy; 2026 YT Empire Builder. Designed for Excellence.</p>
        </div>
      </footer>

      {/* POPUP MODAL */}
      <LmsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
