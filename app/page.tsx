/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useEffect } from "react";
import "./consulting/styles.css";
import CustomPriceForm from "@/components/forms/CustomPriceForm";
import { audioService } from "@/lib/audioEffects";

export default function HomePage() {
  const [isAudioActive, setIsAudioActive] = useState(false);

  // Pillar 3 & Package Bank Details Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({
    title: "1:1 Executive Advisory & DFY Channels",
    subtitle: "Private Strategy, Retention Audit & Team Placement",
    pricePkr: "Rs. 45,000",
    priceUsd: "$160 USD",
  });
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Intersection Observer for scroll reveals
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el, idx) => {
      (el as HTMLElement).style.transitionDelay = `${Math.min(idx % 4, 3) * 60}ms`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const toggleSound = () => {
    const muted = audioService.toggleMute();
    setIsAudioActive(!muted);
  };

  const handleHoverSound = () => {
    audioService.playHoverTone();
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    audioService.playDuolingoSelect();
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const openPillarModal = (plan = {
    title: "1:1 Executive Advisory & DFY Channels",
    subtitle: "Private Strategy, Retention Audit & Team Placement",
    pricePkr: "Rs. 45,000",
    priceUsd: "$160 USD",
  }) => {
    audioService.playDuolingoSelect();
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
      {/* =========================================================================
          NAVBAR
          ========================================================================= */}
      <nav>
        <div className="wrap">
          <a href="#" className="logo">
            ABRAR NADIR
          </a>

          <div className="nlinks">
            <a href="#story" onMouseEnter={handleHoverSound}>Story</a>
            <a href="#results" onMouseEnter={handleHoverSound}>Results</a>
            <a href="#programs" onMouseEnter={handleHoverSound}>Programs</a>
            <a href="#custom-price" onMouseEnter={handleHoverSound}>Custom Plan</a>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Spiritual Audio Drone Switcher */}
            <button
              onClick={toggleSound}
              className={`audio-toggle ${isAudioActive ? "active" : ""}`}
              title="432Hz Healing Meditative Ambient Music"
            >
              <span>{isAudioActive ? "🔊" : "🔈"}</span>
              <span>{isAudioActive ? "432Hz Music: PLAYING" : "Play Spiritual Music"}</span>
            </button>

            <a
              href="#programs"
              className="nbtn"
              onMouseEnter={handleHoverSound}
            >
              Programs
            </a>
          </div>
        </div>
      </nav>

      {/* =========================================================================
          HERO
          ========================================================================= */}
      <header className="hero">
        <div className="wrap">
          <div className="eyebrow reveal">
            Operator · 15 years · Lahore, Pakistan
          </div>

          <h1 className="reveal">
            I build systems.<br />
            <span>Then I teach them.</span>
          </h1>

          <p className="sub reveal">
            Faceless YouTube channels, run like a business — with real formulas, real data, and real production systems. I still run my own channels. Everything I teach works in my account first.
          </p>

          <div className="heroline reveal">
            <div>
              <b>15+</b>
              <span>years online</span>
            </div>
            <div>
              <b>3,000+</b>
              <span>operators trained</span>
            </div>
            <div>
              <b>3 Cr+</b>
              <span>PKR earned by students</span>
            </div>
            <div>
              <b>1.6M</b>
              <span>the mission</span>
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================================
          KINETIC SINGLE-LINE SCREEN TAKEOVER (FEELS ALIVE ON SCROLL)
          ========================================================================= */}
      <section className="screen-takeover">
        <div className="wrap">
          <div className="eyebrow reveal" style={{ marginBottom: "18px" }}>
            The Core Realization
          </div>
          <h2 className="reveal">
            Pakistan doesn&apos;t have a skills problem.<br />
            <mark>It has a systems problem.</mark>
          </h2>
          <p className="reveal hand" style={{ marginTop: "20px", fontSize: "1.6rem" }}>
            &ldquo;Not another course seller. A system builder — with receipts.&rdquo;
          </p>
        </div>
      </section>

      {/* =========================================================================
          THE STORY (CHAPTERS 01 TO 04)
          ========================================================================= */}
      <section id="story" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <div className="eyebrow reveal">The story</div>
          <h2
            className="reveal"
            style={{
              fontSize: "clamp(1.9rem,4.6vw,3rem)",
              marginTop: "12px",
              maxWidth: "20ch",
            }}
          >
            How this actually happened.
          </h2>

          {/* Chapter 01 */}
          <div className="chapter reveal" onMouseEnter={handleHoverSound}>
            <div className="num">01</div>
            <div>
              <h3>Fifteen years of doing it the hard way.</h3>
              <p>
                I started at age 14 building channels for international clients on Upwork. No mentor, no shortcut, no system handed to me. Everything I know now came from breaking things first and understanding the algorithm through thousands of iterations.
              </p>
              <p>
                Most creators fail because they treat YouTube like art instead of a manufacturing pipeline.
              </p>
              <div className="pull">
                &ldquo;I learned it the expensive way so you don't have to.&rdquo;
              </div>
            </div>
          </div>

          {/* Chapter 02 */}
          <div className="chapter reveal" onMouseEnter={handleHoverSound}>
            <div className="num">02</div>
            <div>
              <h3>The channels came before the teaching.</h3>
              <p>
                I built and monetized private faceless media assets targeting US and European audiences before ever selling a training. I wasn&apos;t a coach who read about this. I was an operator who kept notes on every retention graph, CTR spike, and RPM delta.
              </p>
              <p>Those notes became formulas. The formulas became a system.</p>

              <div className="result">
                <div className="tag">Student result</div>
                <div className="big">11.5K views · 114.9K impressions</div>
                <p>
                  A masculine-psychology channel breaking out in its first 28 days using the repackaging formula.
                </p>
                <div className="who">Bilal K. · US Audience Niche · Verified Batch</div>
              </div>
            </div>
          </div>

          {/* Chapter 03 */}
          <div className="chapter reveal" onMouseEnter={handleHoverSound}>
            <div className="num">03</div>
            <div>
              <h3>Then three thousand people asked me how.</h3>
              <p>
                What I found: people don&apos;t fail from lack of information. They fail from lack of a system to execute it.
              </p>
              <p>
                So I stopped making lectures and started shipping working systems — prompts, workbooks, editing maps, render skills, and pre-vetted hiring pipelines. Things you run, not things you watch.
              </p>

              <div className="result">
                <div className="tag">Student result</div>
                <div className="big">Monetized in 45 days</div>
                <p>
                  From zero to YouTube Partner Program without policy issues, using the launch workbooks and free AI workflows.
                </p>
                <div className="who">Hamza S. · Tech Automation · Verified Batch</div>
              </div>
            </div>
          </div>

          {/* Chapter 04 */}
          <div className="chapter reveal" onMouseEnter={handleHoverSound}>
            <div className="num">04</div>
            <div>
              <h3>Now the goal is bigger than me.</h3>
              <p>
                Too many trainers sold recycled methods to people who couldn&apos;t afford to lose the money.
              </p>
              <p>
                I&apos;m building the opposite: real systems, updated on live data, taught to people who actually execute. That is why we built the Academy, founded the Content Colony, and mentor serious operators. The number I&apos;m chasing is 1.6 million.
              </p>
              <div className="pull">
                &ldquo;Not another course seller. A system builder — with receipts.&rdquo;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          RESULTS WALL (INVERTED WHITE CANVAS)
          ========================================================================= */}
      <section id="results" className="wall">
        <div className="wrap">
          <div className="eyebrow reveal">The receipts</div>
          <h2 className="reveal">Don&apos;t trust me. Read what they did.</h2>
          <p className="lead reveal">
            Real members, real channels, real numbers. Every one of them started exactly where you are right now.
          </p>

          <div className="rgrid">
            <div className="rc reveal" onMouseEnter={handleHoverSound}>
              <b>3 Cr+</b>
              <div className="lbl">PKR generated across the community</div>
              <div className="nm">All members combined</div>
            </div>
            <div className="rc reveal" onMouseEnter={handleHoverSound}>
              <b>45 days</b>
              <div className="lbl">Typical time to monetization</div>
              <div className="nm">Results vary by effort</div>
            </div>
            <div className="rc reveal" onMouseEnter={handleHoverSound}>
              <b>3,000+</b>
              <div className="lbl">Operators inside the community</div>
              <div className="nm">And growing weekly</div>
            </div>
            <div className="rc reveal" onMouseEnter={handleHoverSound}>
              <b>$2,840/mo</b>
              <div className="lbl">First month high-RPM yield</div>
              <div className="nm">Zain A. · US Finance Channel</div>
            </div>
            <div className="rc reveal" onMouseEnter={handleHoverSound}>
              <b>240K Views</b>
              <div className="lbl">First viral AI documentary</div>
              <div className="nm">Tariq M. · History Niche</div>
            </div>
            <div className="rc reveal" onMouseEnter={handleHoverSound}>
              <b>4 Channels</b>
              <div className="lbl">Portfolio built in 6 months</div>
              <div className="nm">Usman R. · Media Operator</div>
            </div>
          </div>

          <p className="wallnote reveal">
            Real member outcomes verified directly via YouTube Studio analytics. Specific systems beat theory every single time.
          </p>
        </div>
      </section>

      {/* =========================================================================
          PROGRAMS & 3 POWER DOORS
          ========================================================================= */}
      <section id="programs" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <div className="eyebrow reveal">Three ways to work with me</div>
          <h2
            className="reveal"
            style={{
              fontSize: "clamp(1.9rem,4.6vw,3rem)",
              marginTop: "12px",
              maxWidth: "20ch",
            }}
          >
            Start online. Grow into the room.
          </h2>
          <p
            className="reveal"
            style={{
              color: "var(--soft)",
              marginTop: "14px",
              maxWidth: "56ch",
              paddingBottom: "42px",
            }}
          >
            Everyone begins with the core systems. The Colony and 1:1 Executive Advisory are what you step into when you want hands-on scaling and direct team placement.
          </p>
        </div>
      </section>

      <div className="doors-3">
        {/* Door 01: YT Empire Builders Academy */}
        <a
          className="door reveal"
          href="/academy/ytempirebuilder"
          onMouseEnter={handleHoverSound}
        >
          <div>
            <div className="dnum">Door 01 — Open Now</div>
            <h3>YT Empire Builders</h3>
            <p className="ddesc">
              The complete system, the workbooks, the prompt architectures, and the 3,000+ creator community. Learn it, build it, own it for life.
            </p>
            <ul className="dfeatures">
              <li>✔ AI Scripting & Retention Prompts</li>
              <li>✔ High-RPM US/UK Niches ($14.50+ CPM)</li>
              <li>✔ Lifetime Access & Community Updates</li>
            </ul>
            <div className="dmeta">Online · Lifetime · Instant Access</div>
          </div>
          <span className="darrow">Enter Academy →</span>
        </a>

        {/* Door 02: Content Colony (Co-Live & Co-Work) */}
        <a
          className="door reveal"
          href="https://www.abrarnadir.com/cc/prebooking"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={handleHoverSound}
        >
          <div>
            <div className="dnum">Door 02 — IRL Compound</div>
            <h3>Content Colony</h3>
            <p className="ddesc">
              In person, in the room, building alongside me. Dedicated 4K studio bays, 1 Gbps fiber, 24/7 power backup, and masterminds for serious operators.
            </p>
            <ul className="dfeatures">
              <li>✔ Studio Bay Alpha (Podcast & 4K Cinema)</li>
              <li>✔ 100% Uninterrupted Power & 1 Gbps Net</li>
              <li>✔ Weekly Live Sprints with Abrar</li>
            </ul>
            <div className="dmeta">Residency · Limited Seats · Pre-Booking</div>
          </div>
          <span className="darrow">Pre-Book Colony →</span>
        </a>

        {/* Door 03: Pillar 3: 1:1 Executive Advisory & DFY Channels */}
        <div
          className="door reveal cursor-pointer"
          onClick={() =>
            openPillarModal({
              title: "1:1 Executive Advisory & DFY Channels",
              subtitle: "Private Strategy, Retention Audit & Team Placement",
              pricePkr: "Rs. 45,000",
              priceUsd: "$160 USD",
            })
          }
          onMouseEnter={handleHoverSound}
        >
          <div>
            <div className="dnum">Door 03 — Private Advisory</div>
            <h3>💼 Pillar 3: 1:1 Advisory & DFY</h3>
            <p className="ddesc">
              Direct 1-on-1 private strategy with Abrar. Full retention diagnosis, custom channel architecture, and placement of pre-vetted editors from my 3,000-student pool.
            </p>
            <ul className="dfeatures">
              <li>✔ 60-Min Private Strategy & Audit Session</li>
              <li>✔ Pre-Vetted Video Editor Placement</li>
              <li>✔ 30-Day Monetization Blueprint</li>
            </ul>
            <div className="dmeta">Direct Advisory · Team Placement · Retainer</div>
          </div>
          <span className="darrow">Book Advisory & Bank Details →</span>
        </div>
      </div>

      {/* =========================================================================
          DUOLINGO-STYLE INTERACTIVE CUSTOM PRICE QUESTIONNAIRE
          ========================================================================= */}
      <section className="reveal" style={{ padding: "80px 0 40px" }}>
        <CustomPriceForm />
      </section>

      {/* =========================================================================
          MISSION
          ========================================================================= */}
      <section className="mission">
        <div className="wrap">
          <div className="eyebrow reveal">The mission</div>
          <h2 className="reveal">1.6 million people, trained properly.</h2>
          <p className="reveal">
            Not with recycled theory. With systems that run on live data, taught to people who execute. If that&apos;s the kind of person you are, you already know which door to open.
          </p>
        </div>
      </section>

      {/* =========================================================================
          FOOTER WITH SOCIAL LINKS
          ========================================================================= */}
      <footer>
        <div className="wrap">
          <div className="fgrid">
            <div className="logo">ABRAR NADIR</div>

            <div className="fsoc">
              <a
                href="https://www.youtube.com/@TutorialsMakerUrduHindi0/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={handleHoverSound}
              >
                YouTube
              </a>
              <a
                href="https://x.com/strugglingabrar"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={handleHoverSound}
              >
                X (Twitter)
              </a>
              <a
                href="https://www.instagram.com/abrar.h.264"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={handleHoverSound}
              >
                Instagram
              </a>
              <a
                href="https://web.facebook.com/abrarnadir786"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={handleHoverSound}
              >
                Facebook
              </a>
              <a
                href="https://wa.me/923274532186"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={handleHoverSound}
              >
                WhatsApp
              </a>
              <a
                href="https://www.abrarnadir.com/academy/ytempirebuilder"
                onMouseEnter={handleHoverSound}
              >
                YT Empire Builders
              </a>
              <a
                href="https://www.abrarnadir.com/cc/prebooking"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={handleHoverSound}
              >
                Content Colony
              </a>
            </div>
          </div>

          <p className="fnote">
            Abrar Nadir — YouTube Systems · Lahore, Pakistan · Results shown are real member outcomes and vary by individual effort. Nothing here is a guarantee of income.
          </p>
        </div>
      </footer>

      {/* =========================================================================
          PILLAR 3 / PACKAGE POPUP MODAL (FIXED CLEAN CSS & NON-OVERLAPPING)
          ========================================================================= */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[520px] bg-[#0E0E12] border border-[#2B2B36] rounded-2xl p-6 sm:p-8 shadow-2xl relative text-left my-auto"
          >
            {/* Modal Header Row: Title & Close Button separated cleanly */}
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-[#22222A]">
              <div className="space-y-1">
                <div className="text-[10px] font-mono tracking-widest text-[#E5A93C] uppercase font-bold flex items-center gap-1.5">
                  <span>⚡</span>
                  <span>EXECUTIVE ADVISORY PORTAL</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white leading-snug">
                  {selectedPlan.title}
                </h3>
              </div>

              {/* Clean Distinct Close Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#1A1A22] hover:bg-white hover:text-black border border-[#33333E] text-gray-300 flex items-center justify-center text-sm font-bold transition-all cursor-pointer flex-shrink-0"
              >
                ✕
              </button>
            </div>

            {/* Price Badge */}
            <div className="pt-3 pb-1 flex items-center justify-between">
              <span className="text-xs text-gray-400 font-medium">{selectedPlan.subtitle}</span>
              <span className="text-xs font-mono font-bold text-[#60A5FA] bg-[#60A5FA]/10 px-2.5 py-1 rounded-md border border-[#60A5FA]/20">
                {selectedPlan.pricePkr} ({selectedPlan.priceUsd})
              </span>
            </div>

            {/* Inputs */}
            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ali Khan"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#14141A] border border-[#282834] text-white placeholder-gray-500 text-xs focus:outline-none focus:border-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+92 300 1234567"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#14141A] border border-[#282834] text-white placeholder-gray-500 text-xs focus:outline-none focus:border-white transition-all"
                />
              </div>

              {/* Instant Copy Bank Gateways */}
              <div className="p-3.5 rounded-xl bg-[#09090C] border border-[#22222A] space-y-2.5">
                <div className="text-amber-400 font-bold uppercase tracking-wider text-[10px] font-mono">
                  Direct Bank Accounts (Click to Copy)
                </div>

                {/* Easypaisa / JazzCash */}
                <div
                  onClick={() => handleCopy("03274532186", "easy")}
                  className="p-3 rounded-lg bg-[#14141A] border border-[#262632] hover:border-amber-400 flex items-center justify-between cursor-pointer transition-all"
                >
                  <div>
                    <div className="text-gray-400 text-[10px]">
                      Easypaisa / JazzCash (Muhammad Abrar)
                    </div>
                    <div className="font-mono font-bold text-white text-sm">
                      03274532186
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-400">
                    {copiedId === "easy" ? "✓ Copied!" : "📋 Copy"}
                  </span>
                </div>

                {/* Meezan Bank */}
                <div
                  onClick={() => handleCopy("02370103321036", "meezan")}
                  className="p-3 rounded-lg bg-[#14141A] border border-[#262632] hover:border-amber-400 flex items-center justify-between cursor-pointer transition-all"
                >
                  <div>
                    <div className="text-gray-400 text-[10px]">
                      Meezan Bank Ltd (Muhammad Abrar)
                    </div>
                    <div className="font-mono font-bold text-white text-sm">
                      02370103321036
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-400">
                    {copiedId === "meezan" ? "✓ Copied!" : "📋 Copy"}
                  </span>
                </div>
              </div>

              {/* Submit to WhatsApp */}
              <a
                href={`https://wa.me/923274532186?text=Hi%20Abrar,%20I%20want%20to%20book%20${encodeURIComponent(
                  selectedPlan.title
                )}.%20Name:%20${encodeURIComponent(clientName || "Client")}%20Phone:%20${encodeURIComponent(
                  clientPhone || "Provided"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3.5 rounded-xl bg-[#22C55E] hover:bg-[#1EA750] text-black font-black text-xs tracking-wide border-b-4 border-b-[#15803D] active:border-b-2 active:translate-y-1 shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
              >
                Send Details & Screenshot on WhatsApp 💬
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
