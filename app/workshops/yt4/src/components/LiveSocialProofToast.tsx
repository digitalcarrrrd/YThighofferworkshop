import React, { useState, useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";

export default function LiveSocialProofToast() {
  const [currentNotification, setCurrentNotification] = useState<{
    name: string;
    city: string;
    timeAgo: string;
  } | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const notifications = [
    { name: "Usama Khan", city: "Lahore", timeAgo: "2 minutes ago" },
    { name: "Muhammad Zeeshan", city: "Karachi", timeAgo: "4 minutes ago" },
    { name: "Hamza Ahmed", city: "Islamabad", timeAgo: "7 minutes ago" },
    { name: "Bilal Farooq", city: "Faisalabad", timeAgo: "11 minutes ago" },
    { name: "Ali Raza", city: "Rawalpindi", timeAgo: "14 minutes ago" },
    { name: "Omer Tariq", city: "Multan", timeAgo: "18 minutes ago" },
    { name: "Shahzaib Shah", city: "Peshawar", timeAgo: "22 minutes ago" }
  ];

  useEffect(() => {
    if (isDismissed) return;

    // Show initial notification after 6 seconds
    const timer = setTimeout(() => {
      const randomIdx = Math.floor(Math.random() * notifications.length);
      setCurrentNotification(notifications[randomIdx]);
      setIsVisible(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, [isDismissed]);

  useEffect(() => {
    if (!isVisible || isDismissed) return;

    // Hide after 5 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);

      // Show another one after 16 seconds
      const nextTimer = setTimeout(() => {
        if (!isDismissed) {
          const randomIdx = Math.floor(Math.random() * notifications.length);
          setCurrentNotification(notifications[randomIdx]);
          setIsVisible(true);
        }
      }, 16000);

      return () => clearTimeout(nextTimer);
    }, 5000);

    return () => clearTimeout(hideTimer);
  }, [isVisible, isDismissed]);

  if (!isVisible || !currentNotification || isDismissed) return null;

  return (
    <div className="fixed bottom-20 left-4 z-40 max-w-xs sm:max-w-sm bg-slate-900/95 border border-slate-800 text-white rounded-2xl p-3.5 shadow-2xl backdrop-blur-md animate-slide-up flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <p className="text-xs font-bold text-white leading-snug">
            {currentNotification.name} <span className="text-slate-400 font-normal">from {currentNotification.city}</span>
          </p>
          <p className="text-[10px] text-emerald-400 font-mono mt-0.5">
            Locked seat for Tonight's Live Cohort • {currentNotification.timeAgo}
          </p>
        </div>
      </div>

      <button
        onClick={() => setIsDismissed(true)}
        className="text-slate-500 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
        aria-label="Close notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
