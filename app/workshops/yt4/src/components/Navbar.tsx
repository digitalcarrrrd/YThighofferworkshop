import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, Menu, X, Globe } from "lucide-react";
import { workshopConfig } from "../workshopConfig";
import { Language, translations } from "../translations";

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

interface NavbarProps {
  lang: Language;
  toggleLang: () => void;
  onOpenPurchaseModal: () => void;
  onOpenUrduModal?: () => void;
}

export default function Navbar({ lang, toggleLang, onOpenPurchaseModal, onOpenUrduModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.challenges, href: "#pain-section" },
    { label: t.nav.niches, href: "#niche-matrix" },
    { label: t.nav.syllabus, href: "#agenda-section" },
    { label: t.nav.bonus, href: "#bonus-stack-section" },
    { label: t.nav.faq, href: "#faq-section" },
  ];

  return (
    <header dir={t.dir} className={`sticky top-0 z-40 transition-all duration-300 ${
      scrolled 
        ? "bg-slate-950/95 backdrop-blur-xl border-b-2 border-amber-500/40 shadow-2xl shadow-amber-950/20 py-3" 
        : "bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-4"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 via-emerald-400 to-yellow-400 p-0.5 shadow-lg shadow-amber-500/30 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <YoutubeIcon className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-white text-base sm:text-lg tracking-tight leading-none group-hover:text-amber-300 transition-colors">
              {workshopConfig.brandName}
            </span>
            <span className="text-[10px] font-mono text-amber-400 font-black uppercase tracking-widest mt-1">
              {lang === 'ur' ? 'لائیو ماسٹر کلاس' : 'Live Masterclass'}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/90 border border-amber-500/30 p-1.5 rounded-full backdrop-blur-md">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="px-3.5 py-1.5 text-xs font-bold text-slate-200 hover:text-amber-300 hover:bg-slate-800/80 rounded-full transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action CTAs & Language Toggle */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Prominent Language Switcher */}
          <button
            onClick={toggleLang}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-amber-300 border-2 border-amber-400 hover:border-amber-300 text-xs font-black rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            title="Switch Language / زبان تبدیل کریں"
          >
            <Globe className="w-4 h-4 text-amber-400" />
            <span>{lang === 'en' ? '🇵🇰 اردو ویب سائٹ' : '🇬🇧 English Site'}</span>
          </button>

          <div className="hidden xl:flex flex-col items-end text-right">
            <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">
              {lang === 'ur' ? 'کورس فیس' : 'Live Pass'}
            </span>
            <span className="text-xs font-black text-white font-mono">
              PKR {workshopConfig.price.toLocaleString()}
            </span>
          </div>

          <button
            onClick={onOpenPurchaseModal}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-400 via-emerald-500 to-amber-400 hover:from-amber-300 hover:to-emerald-400 active:from-amber-500 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-1.5 border border-amber-300"
          >
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span>{t.nav.seatLock}</span>
          </button>
        </div>

        {/* Mobile menu and mobile Language button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={toggleLang}
            className="px-2.5 py-1.5 bg-slate-900 text-amber-300 border-2 border-amber-400 text-xs font-black rounded-lg cursor-pointer flex items-center gap-1 shadow-md"
          >
            <span>{lang === 'en' ? '🇵🇰 اردو' : '🇬🇧 Eng'}</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-200 hover:text-white rounded-xl bg-slate-900 border border-slate-700 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div dir={t.dir} className="md:hidden bg-slate-950 border-b border-amber-500/40 px-4 py-5 space-y-3 backdrop-blur-xl animate-fade-in">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                toggleLang();
              }}
              className="px-4 py-3 text-sm font-black text-amber-300 bg-amber-950/80 border-2 border-amber-400/80 rounded-xl flex items-center justify-between"
            >
              <span>{lang === 'en' ? '🇵🇰 اردو میں ویب سائٹ دیکھیں' : '🇬🇧 Switch to English / Roman Urdu'}</span>
              <span className="text-xs bg-amber-400 text-slate-950 px-2 py-0.5 rounded font-bold">SWITCH</span>
            </button>

            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 text-sm font-bold text-slate-200 hover:text-amber-300 hover:bg-slate-900 rounded-xl transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPurchaseModal();
              }}
              className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-emerald-400 text-slate-950 font-black text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer border border-amber-300"
            >
              <span>{t.nav.seatLock} (PKR {workshopConfig.price.toLocaleString()})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
