import React, { useState, useEffect } from "react";
import { Clock, AlertCircle } from "lucide-react";
import { getWorkshopStatus, getCountdownFields } from "../utils/dateUtils";
import { Language, translations } from "../translations";

interface AnnouncementBarProps {
  lang: Language;
  toggleLang: () => void;
  onOpenUrduModal?: () => void;
}

export default function AnnouncementBar({ lang, toggleLang, onOpenUrduModal }: AnnouncementBarProps) {
  const [status, setStatus] = useState(() => getWorkshopStatus());
  const [countdown, setCountdown] = useState({ hours: "00", minutes: "00", seconds: "00", completed: false });
  const t = translations[lang];

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentStatus = getWorkshopStatus(now);
      setStatus(currentStatus);
      
      const fields = getCountdownFields(currentStatus.cutoffTime, now);
      setCountdown(fields);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      id="announcement-bar"
      dir={t.dir}
      className={`w-full py-2.5 px-4 text-center text-xs sm:text-sm font-extrabold transition-colors duration-300 flex flex-wrap items-center justify-center gap-2 sm:gap-4 z-50 relative border-b shadow-md ${
        status.isClosedForToday 
          ? "bg-slate-900 text-amber-300 border-amber-500/40" 
          : "bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 border-amber-300"
      }`}
    >
      <div className="flex items-center gap-2 justify-center">
        {status.isClosedForToday ? (
          <AlertCircle id="icon-announcement-alert" className="w-4 h-4 text-amber-400 shrink-0" />
        ) : (
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-950"></span>
          </span>
        )}
        
        <span id="announcement-text" className="tracking-tight font-black uppercase text-xs sm:text-sm">
          {status.isClosedForToday ? t.announcementClosed : t.announcement}
        </span>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-1.5 justify-center font-mono text-xs font-black bg-slate-950 text-amber-400 px-3 py-1 rounded-full border border-amber-400/50 shadow-inner">
          <Clock id="icon-announcement-clock" className="w-3.5 h-3.5 text-amber-400" />
          <span id="announcement-timer">
            {status.isClosedForToday ? (lang === 'ur' ? "اگلی رجسٹریشن:" : "Next Cutoff:") : (lang === 'ur' ? "ٹائم:" : "Cutoff:")} {countdown.hours}:{countdown.minutes}:{countdown.seconds}
          </span>
        </div>

        <button
          onClick={toggleLang}
          className="bg-slate-950 hover:bg-slate-900 text-amber-300 border-2 border-amber-400 px-3 py-1 rounded-full text-xs font-black cursor-pointer flex items-center gap-1.5 hover:scale-105 transition-all shadow-md"
          title="Switch Language / زبان تبدیل کریں"
        >
          <span>{lang === 'en' ? '🇵🇰' : '🇬🇧'}</span>
          <span>{lang === 'en' ? t.urduBtnLabel : t.englishBtnLabel}</span>
        </button>
      </div>
    </div>
  );
}
