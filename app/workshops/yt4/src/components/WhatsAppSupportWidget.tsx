import React from "react";
import { MessageCircle } from "lucide-react";
import { workshopConfig } from "../workshopConfig";

export default function WhatsAppSupportWidget() {
  const handleOpenWhatsApp = () => {
    const rawMsg = `Salam Abrar Nadir, mujhe YouTube Empire Builders workshop ke bare mein ek sawaal hai. Please support karein.`;
    const encodedMsg = encodeURIComponent(rawMsg);
    window.open(`https://wa.me/${workshopConfig.whatsappSupportNumber.replace(/\+/g, "")}?text=${encodedMsg}`, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-4 z-40">
      <button
        onClick={handleOpenWhatsApp}
        className="group relative flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-full shadow-2xl shadow-emerald-950/50 transition-all transform hover:scale-105 active:scale-95 cursor-pointer border border-emerald-400/30"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageCircle className="w-5 h-5 text-white" />
        <span className="hidden sm:inline">WhatsApp Support</span>
      </button>
    </div>
  );
}
