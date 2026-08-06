import { useCountdown, useSeatsCounter } from '../hooks/useCountdown';
import { Play, TrendingUp, DollarSign, Zap, ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const { hours, minutes, seconds } = useCountdown();
  const seats = useSeatsCounter();
  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <section className="relative overflow-hidden pt-4 pb-12 px-4">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-red/5 via-transparent to-transparent" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-red/5 rounded-full blur-[120px]" />
      <div className="absolute top-40 right-0 w-[300px] h-[300px] bg-accent-purple/10 rounded-full blur-[100px]" />
      
      <div className="relative max-w-4xl mx-auto text-center">
        {/* Live badge */}
        <div className="inline-flex items-center gap-2 bg-brand-red/10 border border-brand-red/30 rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse" />
          <span className="text-brand-red text-xs sm:text-sm font-semibold tracking-wide uppercase">
            🔴 LIVE Workshop — Aaj Raat 7 PM
          </span>
        </div>

        {/* Main headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4">
          <span className="text-white">YouTube Se </span>
          <span className="highlight-text">Monthly $1,000+</span>
          <br />
          <span className="text-white">Kamana Seekho —</span>
          <br />
          <span className="text-brand-red">Bina Face Dikhaye! 🎭</span>
        </h1>

        {/* Sub headline */}
        <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-6 leading-relaxed">
          AI tools se <span className="text-white font-semibold">faceless YouTube channels</span> banao, 
          <span className="text-brand-gold font-semibold"> dollar mein kamao</span>, 
          aur apni family ki life change karo. 
          <span className="text-brand-green font-semibold"> 3-6 months mein result.</span>
        </p>

        {/* Dollar conversion highlight */}
        <div className="glass-card rounded-xl p-4 max-w-lg mx-auto mb-8 border border-brand-gold/20">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <DollarSign className="w-6 h-6 text-brand-gold" />
            <div className="text-center">
              <p className="text-sm text-gray-400">YouTube $1 RPM =</p>
              <p className="text-2xl sm:text-3xl font-black text-brand-gold">PKR 278+</p>
            </div>
            <TrendingUp className="w-6 h-6 text-brand-green" />
            <div className="text-center">
              <p className="text-sm text-gray-400">10K views/month =</p>
              <p className="text-2xl sm:text-3xl font-black text-brand-green">PKR 27,800+</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="space-y-4 mb-8">
          <a 
            href="#register" 
            className="cta-btn animate-pulse-glow inline-flex items-center gap-3 text-white font-bold text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-5 rounded-2xl shadow-2xl"
          >
            <Zap className="w-6 h-6" />
            APNI SEAT ABHI BOOK KARO — ₨1,999
            <ArrowRight className="w-6 h-6" />
          </a>
          
          <div className="flex flex-col items-center gap-2">
            <p className="text-gray-400 text-sm">
              <span className="line-through text-gray-600">₨9,999</span>
              {' '}
              <span className="text-brand-red font-bold text-lg">₨1,999</span>
              {' '}
              <span className="bg-brand-red/20 text-brand-red text-xs font-bold px-2 py-0.5 rounded">80% OFF</span>
            </p>
          </div>
        </div>

        {/* Countdown + Seats */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <div className="glass-card rounded-xl px-5 py-3 border border-brand-red/20">
            <p className="text-xs text-gray-400 mb-1">⏰ Aaj ki deadline:</p>
            <div className="flex gap-2 font-mono text-2xl font-black text-brand-red">
              <span className="bg-brand-red/10 px-2 rounded">{pad(hours)}</span>
              <span className="animate-pulse">:</span>
              <span className="bg-brand-red/10 px-2 rounded">{pad(minutes)}</span>
              <span className="animate-pulse">:</span>
              <span className="bg-brand-red/10 px-2 rounded">{pad(seconds)}</span>
            </div>
          </div>
          
          <div className="glass-card rounded-xl px-5 py-3 border border-urgency-orange/20">
            <p className="text-xs text-gray-400 mb-1">🔥 Seats remaining:</p>
            <p className="text-2xl font-black text-urgency-orange animate-count-pulse">
              Sirf {seats} / 100
            </p>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-8 flex-wrap">
          <div className="flex items-center gap-1.5 text-gray-400 text-xs sm:text-sm">
            <Play className="w-4 h-4 text-brand-red" />
            <span>2,800+ students trained</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400 text-xs sm:text-sm">
            <span className="text-brand-gold">⭐⭐⭐⭐⭐</span>
            <span>4.9/5 rating</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400 text-xs sm:text-sm">
            <span>🇵🇰</span>
            <span>Pakistan #1 Creator Workshop</span>
          </div>
        </div>
      </div>
    </section>
  );
}
