import { useCountdown, useSeatsCounter } from '../hooks/useCountdown';
import { Zap, Clock, AlertTriangle, ArrowRight, MessageCircle } from 'lucide-react';

export default function FinalUrgency() {
  const { hours, minutes, seconds } = useCountdown();
  const seats = useSeatsCounter();
  const pad = (n: number) => n.toString().padStart(2, '0');

  const handleCTA = () => {
    const el = document.getElementById('register');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Assalam o Alaikum! 🙏\nMujhe YouTube AI Workshop ki seat abhi book karni hai! ✅\nPayment ready hai.`
    );
    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '923213823702';
    window.open(`https://wa.me/${number.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  return (
    <section className="py-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-red/5 via-brand-red/10 to-brand-red/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-red/10 rounded-full blur-[150px]" />
      
      <div className="relative max-w-3xl mx-auto text-center">
        {/* Warning */}
        <div className="inline-flex items-center gap-2 bg-urgency-orange/10 border border-urgency-orange/30 rounded-full px-5 py-2 mb-6">
          <AlertTriangle className="w-4 h-4 text-urgency-orange" />
          <span className="text-urgency-orange text-sm font-bold">⚠️ LAST WARNING — Seats Almost Gone!</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
          Abhi Decide Karo:<br />
          <span className="text-brand-red">Dekhte Raho ge</span> Ya <span className="highlight-text">Kuch Karo ge?</span>
        </h2>

        <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto mb-6 leading-relaxed">
          Log aage nikal rahe hain. Tumhare batch-mates, dost, cousins — koi na koi YouTube se kama raha hai.
          <span className="text-white font-semibold"> Kab tak sochte raho ge?</span>
        </p>

        {/* Countdown */}
        <div className="inline-flex items-center gap-3 glass-card rounded-xl px-6 py-4 border border-brand-red/20 mb-6">
          <Clock className="w-5 h-5 text-brand-red" />
          <span className="text-gray-400 text-sm">Time Left:</span>
          <div className="flex gap-1.5 font-mono text-2xl font-black text-brand-red">
            <span className="bg-brand-red/10 px-2 rounded">{pad(hours)}</span>
            <span className="animate-pulse">:</span>
            <span className="bg-brand-red/10 px-2 rounded">{pad(minutes)}</span>
            <span className="animate-pulse">:</span>
            <span className="bg-brand-red/10 px-2 rounded">{pad(seconds)}</span>
          </div>
          <span className="text-urgency-orange font-bold text-sm">| {seats} seats</span>
        </div>

        <div className="space-y-3">
          {/* Main CTA */}
          <button
            onClick={handleCTA}
            className="cta-btn animate-pulse-glow inline-flex items-center gap-3 text-white font-bold text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-5 rounded-2xl shadow-2xl"
          >
            <Zap className="w-6 h-6" />
            HAAN — MUJHE SEAT CHAHIYE! ₨1,999
            <ArrowRight className="w-6 h-6" />
          </button>

          {/* WhatsApp CTA */}
          <div>
            <button
              onClick={handleWhatsApp}
              className="whatsapp-btn text-white font-bold text-base px-8 py-3.5 rounded-2xl inline-flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Ya WhatsApp Pe Seedha Message Karo
            </button>
          </div>
        </div>

        {/* Final push */}
        <div className="mt-8 glass-card rounded-xl p-5 border border-white/5 max-w-md mx-auto">
          <p className="text-gray-300 text-sm leading-relaxed">
            <span className="text-brand-gold font-bold">"2 din ki food cost"</span> — ye investment hai tumhari future mein. 
            Agar kaam nahi aaya to <span className="text-white font-semibold">money-back guarantee</span> hai. 
            Lekin agar kaam aa gaya — to <span className="text-brand-green font-semibold">life change ho jayegi</span>. 
            Risk kahan hai? 🤔
          </p>
        </div>
      </div>
    </section>
  );
}
