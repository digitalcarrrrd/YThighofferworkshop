'use client';

import React, { useState, useEffect } from 'react';
import LmsModal from './LmsModal';
import { PlayCircle, CheckCircle, ShieldCheck, CreditCard, Lock, XCircle, Users, Zap, Trophy, Handshake } from 'lucide-react';

export default function LmsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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
    { name: "Mubashira S", date: "4 August", text: "I've watched so many videos on YouTube, but I still haven't found anyone who teaches the way Sir Abrar does 🤯. There's something different about him, the way he breaks things down, the way he explains concepts so clearly that you can actually apply them 🔍✨\n\nSince I started following him, I've genuinely felt a shift, not just in knowledge, but in direction. I've learned more practical, real strategies from him than I ever got from anywhere else." },
    { name: "Danish Shafi", date: "3 August", text: "Great experience to interact with such an intelligent and humble young man." },
    { name: "Junaid Ahmed Gondal", date: "3 August", text: "A pure gem in the field who provide and consume its maximum daily energy for providing a quality content for community." },
    { name: "Wajiha Naeem", date: "2 August", text: "The only person out there who not only guides you but motivates you.. gives you a road map and genuinely wants all of us to succeed!!! He is not here to sell big courses! He gives you the confidence and knowledge like nobody else! 💯💯💯 recommended! Follow him do as he says and we all be printing 🤑🤑" },
    { name: "Shahzaib Khan", date: "3 August", text: "One of the best Teacher I have found for YouTube Automation truly appreciate your work sir! 🫡❤️" },
    { name: "Mustafa Khan", date: "3 August", text: "This is my honest review. I've only watched two sessions of Abrar Sir so far, but I was genuinely surprised. What he teaches is something you won't find even in most paid courses. He's funny too 😂" }
  ];

  const faqs = [
    { q: "1. How do I access the course?", a: "Immediately after payment, you will receive an email with your login details for our Learning Management System (LMS). You can log in from your mobile or laptop and start watching immediately." },
    { q: "2. What will happen if I will not succeed?", a: "Success is the default here. Our students inside LMS already generated more then $50k+ collectively. If you rareley fail to succeed, we will give you custom help and guidance or we will give you other benefits without any cost." },
    { q: "3. Why this Course/LMS is different?", a: "It's different because it's attached with Sir Abrar's Vision to train 1.6 million people. You are not just learning from recorded videos but within systems and communities that force you to take action from day 1." },
    { q: "4. Will you guys teach on Long Form Content/Shorts?", a: "We train you to be a King of AI Content Creation. You will learn to produce any type of content using AI—scripts, research, editing, and growth. That's how you master the WHOLE YT game." },
    { q: "5. Is this practical lessons or theoretical?", a: "80% practical. It comes with strategies and step-by-step processes so you can just follow and watch everything happen magically." },
    { q: "6. But our channels don't get views so why join?", a: "Exactly that's what sir abrar especially focus on, getting views is all about target specific audience, understand viral formats, create strategies and scaling at the same time, Sir abrar revealed all views hijack strategies that you never heard before." },
    { q: "7. Will you provide any course completion certification?", a: "Yes indeed, we provide official certification which unlocks even more future career opportunities for you." }
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
            <span className="font-black text-xl tracking-tight text-white uppercase italic hidden sm:inline">Empire Builder</span>
          </div>
          <button onClick={() => document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' })} className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-indigo-950 font-black py-2.5 px-6 rounded-full transition-all text-sm uppercase shadow-[0_0_20px_rgba(251,191,36,0.4)] transform hover:scale-105">
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
            <button onClick={() => document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' })} className="group relative bg-gradient-to-b from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-indigo-950 text-xl md:text-3xl font-black py-6 px-16 rounded-2xl shadow-[0_15px_40px_rgba(251,191,36,0.3)] transition-all pulse-amber transform hover:-translate-y-1">
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

      {/* COMPARISON SECTION */}
      <section className="py-24 bg-indigo-950 border-b border-fuchsia-500/20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-white uppercase tracking-tight">
            Why The "Old Way" Is Dead <br className="hidden md:block"/><span className="text-slate-400 font-normal text-2xl md:text-3xl">(And Why You Need Automation)</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-indigo-900/30 border border-rose-900/50 rounded-3xl p-8 relative opacity-80 hover:opacity-100 transition duration-300 flex flex-col">
              <div className="absolute top-0 left-0 w-full h-2 bg-rose-600 rounded-t-3xl"></div>
              <h3 className="text-2xl font-bold mb-6 text-slate-300 flex items-center gap-2"><XCircle className="w-6 h-6 text-rose-500" /> Traditional Youtuber</h3>
              <ul className="space-y-4 text-slate-400">
                <li className="flex gap-3"><span className="text-rose-500 font-bold text-xl">✖</span> Buying $2,000+ Camera Gear</li>
                <li className="flex gap-3"><span className="text-rose-500 font-bold text-xl">✖</span> Nervous & Awkward on Camera</li>
                <li className="flex gap-3"><span className="text-rose-500 font-bold text-xl">✖</span> 8 Hours of Boring Editing per Video</li>
                <li className="flex gap-3"><span className="text-rose-500 font-bold text-xl">✖</span> Relying on "Luck" to go viral</li>
              </ul>
            </div>

            <div className="bg-indigo-900/60 border-2 border-amber-400/50 rounded-3xl p-8 relative shadow-[0_0_40px_rgba(251,191,36,0.15)] transform md:-translate-y-4 flex flex-col">
              <div className="absolute top-0 right-0 bg-amber-400 text-indigo-950 font-bold px-4 py-1 rounded-bl-xl text-xs uppercase tracking-wider">Recommended</div>
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-2"><CheckCircle className="w-6 h-6 text-amber-400" /> Yt Empire Automation</h3>
              <ul className="space-y-4 text-white font-medium">
                <li className="flex gap-3 items-center font-bold italic"><span className="text-amber-400 font-bold text-xl">✓</span> Laptop Only (No Expensive Gear)</li>
                <li className="flex gap-3 items-center font-bold italic"><span className="text-amber-400 font-bold text-xl">✓</span> 100% Anonymous (Privacy Protected)</li>
                <li className="flex gap-3 items-center font-bold italic"><span className="text-amber-400 font-bold text-xl">✓</span> AI Does The Heavy Lifting (Scripts/Voice)</li>
                <li className="flex gap-3 items-center font-bold italic"><span className="text-amber-400 font-bold text-xl">✓</span> Predictable Growth System</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY BENEFITS */}
      <section className="py-24 bg-indigo-900/30 relative overflow-hidden border-y border-fuchsia-500/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">The Power of the 1000+ Member Community</h2>
            <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
              In Pakistan, the digital game is often played alone, and that's why most people stay stuck. 
              When you join the Empire, you aren't just buying a course—you are gaining a <span className="text-fuchsia-400 font-bold">Brotherhood of Digital Assets</span>.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-indigo-950/80 p-8 rounded-3xl border border-fuchsia-500/20 hover:border-fuchsia-400/50 transition-all duration-300 h-full flex flex-col items-center text-center shadow-lg">
              <div className="w-16 h-16 bg-fuchsia-500/20 rounded-full flex items-center justify-center text-fuchsia-400 mb-6"><Zap className="w-8 h-8" /></div>
              <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight">Stop Being Stuck</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Don't spend days Googling technical issues. Ask the group and get an answer from someone who has already solved it in 5 minutes.</p>
            </div>
            <div className="bg-indigo-950/80 p-8 rounded-3xl border border-fuchsia-500/20 hover:border-fuchsia-400/50 transition-all duration-300 h-full flex flex-col items-center text-center shadow-lg">
              <div className="w-16 h-16 bg-fuchsia-500/20 rounded-full flex items-center justify-center text-fuchsia-400 mb-6"><Trophy className="w-8 h-8" /></div>
              <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight">Winning Environment</h3>
              <p className="text-slate-400 text-sm leading-relaxed">When you see others in Pakistan making $1,000+ per month, your 'impossible' goals become your 'next month' targets.</p>
            </div>
            <div className="bg-indigo-950/80 p-8 rounded-3xl border border-fuchsia-500/20 hover:border-fuchsia-400/50 transition-all duration-300 h-full flex flex-col items-center text-center shadow-lg">
              <div className="w-16 h-16 bg-fuchsia-500/20 rounded-full flex items-center justify-center text-fuchsia-400 mb-6"><PlayCircle className="w-8 h-8" /></div>
              <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight">Algorithm Alerts</h3>
              <p className="text-slate-400 text-sm leading-relaxed">YouTube changes daily. Our community shares what's working right now so you never waste time on dead strategies.</p>
            </div>
            <div className="bg-indigo-950/80 p-8 rounded-3xl border border-fuchsia-500/20 hover:border-fuchsia-400/50 transition-all duration-300 h-full flex flex-col items-center text-center shadow-lg">
              <div className="w-16 h-16 bg-fuchsia-500/20 rounded-full flex items-center justify-center text-fuchsia-400 mb-6"><Handshake className="w-8 h-8" /></div>
              <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight">Collaborative Scaling</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Find partners, share high-CPM niches, and swap thumbnail ideas. A 1,000+ head team is stronger than one person.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section className="py-24 bg-indigo-950 relative z-10">
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

      {/* REVIEWS */}
      <section className="py-24 bg-indigo-900/30 border-y border-fuchsia-500/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter italic">Student Recommendations</h2>
            <p className="text-slate-400 mt-4">Real results and feedback from our Pakistani Facebook community.</p>
          </div>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {reviews.map((r, i) => (
              <div key={i} className="break-inside-avoid">
                <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 text-gray-900">
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 overflow-hidden text-lg">
                          {r.name[0]}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-1">
                            <span className="font-bold text-[15px]">{r.name}</span>
                            <span className="text-gray-500 text-[15px] flex items-center gap-1">
                              <span className="bg-rose-500 text-white rounded-full p-0.5"><CheckCircle className="w-3 h-3" /></span>
                              recommends <span className="font-bold">Abrar</span>.
                            </span>
                          </div>
                          <div className="text-[13px] text-gray-500 flex items-center gap-1">
                            {r.date} • <Users className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-[15px] leading-tight text-gray-800 whitespace-pre-line">{r.text}</p>
                  </div>
                  <div className="px-4 py-2 border-t border-gray-100 flex justify-between items-center text-gray-500 font-bold text-sm">
                    <div className="flex gap-4">
                      <span className="cursor-pointer">Like</span>
                      <span className="cursor-pointer">Comment</span>
                    </div>
                    <span className="cursor-pointer">Share</span>
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
            
                        <div className="p-8 md:p-16 text-center">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-2 uppercase tracking-tighter italic drop-shadow-lg">Join The Empire</h2>
              <p className="text-amber-400 text-lg mb-8 uppercase tracking-widest font-bold">Life Time Access</p>


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
                    <span className="text-fuchsia-300 font-bold ml-4 text-right">{item[1]}</span>
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
                  <div className="text-7xl md:text-9xl font-black text-white leading-none tracking-tighter drop-shadow-2xl">$109<span className="text-2xl md:text-4xl text-slate-400 font-bold ml-2">USD</span></div>
                  <div className="text-amber-400 font-black text-xl md:text-2xl mt-6 animate-bounce bg-amber-400/10 px-6 py-2 rounded-full border border-amber-400/30">~ 30,000 PKR ONE-TIME</div>
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

      {/* FAQ */}
      <section className="py-24 bg-indigo-900/30 border-t border-fuchsia-500/20 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white">Your Questions Answered</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="bg-indigo-950/80 border border-fuchsia-500/20 rounded-2xl overflow-hidden cursor-pointer" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="p-6 md:p-8 flex justify-between items-center font-bold text-white select-none">
                  <span className="text-sm md:text-lg">{f.q}</span>
                  <span className={`transition-transform duration-300 text-fuchsia-400 ${openFaq === i ? 'rotate-180' : ''}`}>▼</span>
                </div>
                {openFaq === i && (
                  <div className="px-6 md:px-8 pb-8 text-slate-300 leading-relaxed text-sm md:text-base border-t border-fuchsia-500/20 pt-6">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
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
