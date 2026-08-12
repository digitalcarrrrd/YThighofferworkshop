import { useState, useEffect } from 'react';
import { Zap, MessageCircle } from 'lucide-react';

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 600px
      setIsVisible(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible || isDismissed) return null;

  const handleCTA = () => {
    const el = document.getElementById('register');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Assalam o Alaikum! 🙏\nMujhe YouTube AI Workshop ki seat book karni hai! ✅`
    );
    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '923213823702';
    window.open(`https://wa.me/${number.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-gradient-to-t from-dark-bg via-dark-bg/95 to-transparent sm:hidden">
      <div className="flex gap-2">
        <button
          onClick={handleCTA}
          className="flex-1 cta-btn text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm"
        >
          <Zap className="w-4 h-4" />
          SEAT BOOK KARO ₨1,999
        </button>
        <button
          onClick={handleWhatsApp}
          className="whatsapp-btn text-white p-3.5 rounded-xl"
        >
          <MessageCircle className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
