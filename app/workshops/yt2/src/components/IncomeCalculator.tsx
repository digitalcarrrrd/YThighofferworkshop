import { useState } from 'react';
import { Calculator, DollarSign, TrendingUp, Zap } from 'lucide-react';

const niches = [
  { name: 'Finance / Business', rpm: 12, emoji: '💰' },
  { name: 'Technology', rpm: 8, emoji: '💻' },
  { name: 'History / Education', rpm: 6, emoji: '📚' },
  { name: 'Motivation / Self-Help', rpm: 5, emoji: '🔥' },
  { name: 'Health / Fitness', rpm: 7, emoji: '💪' },
  { name: 'Mystery / Top 10', rpm: 4, emoji: '🎭' },
];

export default function IncomeCalculator() {
  const [selectedNiche, setSelectedNiche] = useState(0);
  const [viewsPerMonth, setViewsPerMonth] = useState(50000);
  const [channels, setChannels] = useState(1);

  const rpm = niches[selectedNiche].rpm;
  const monthlyUSD = ((viewsPerMonth / 1000) * rpm * channels);
  const monthlyPKR = monthlyUSD * 278;

  const viewsOptions = [10000, 25000, 50000, 100000, 250000, 500000];

  return (
    <section className="py-16 px-4 relative" id="calculator">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-green/30 to-transparent" />
      
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/30 rounded-full px-4 py-1.5 mb-4">
            <Calculator className="w-4 h-4 text-brand-green" />
            <span className="text-brand-green text-sm font-semibold">Income Calculator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3">
            Apni <span className="highlight-text">Potential Income</span> Dekho
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Niche select karo, views estimate karo — dekho kitna kama sakte ho dollar mein 💵
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-brand-green/20">
          {/* Niche Selection */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-gray-300 mb-3 block">1️⃣ Niche select karo:</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {niches.map((niche, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedNiche(i)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    selectedNiche === i
                      ? 'bg-brand-green/20 border-brand-green/50 text-brand-green border'
                      : 'bg-dark-surface border border-dark-border text-gray-400 hover:border-gray-600'
                  }`}
                >
                  {niche.emoji} {niche.name}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">Average RPM: ${rpm}/1000 views</p>
          </div>

          {/* Views per month */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-gray-300 mb-3 block">2️⃣ Monthly views estimate:</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {viewsOptions.map((v) => (
                <button
                  key={v}
                  onClick={() => setViewsPerMonth(v)}
                  className={`px-2 py-2 rounded-xl text-xs font-medium transition-all ${
                    viewsPerMonth === v
                      ? 'bg-accent-blue/20 border-accent-blue/50 text-accent-blue border'
                      : 'bg-dark-surface border border-dark-border text-gray-400 hover:border-gray-600'
                  }`}
                >
                  {v >= 1000 ? `${v/1000}K` : v}
                </button>
              ))}
            </div>
          </div>

          {/* Number of channels */}
          <div className="mb-8">
            <label className="text-sm font-semibold text-gray-300 mb-3 block">3️⃣ Kitne channels?</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((c) => (
                <button
                  key={c}
                  onClick={() => setChannels(c)}
                  className={`w-12 h-12 rounded-xl text-sm font-bold transition-all ${
                    channels === c
                      ? 'bg-accent-purple/20 border-accent-purple/50 text-accent-purple border'
                      : 'bg-dark-surface border border-dark-border text-gray-400 hover:border-gray-600'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="bg-gradient-to-r from-brand-green/10 via-brand-gold/10 to-brand-green/10 rounded-2xl p-6 border border-brand-green/20">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-brand-gold" />
              <span className="text-brand-gold font-bold">Tumhari Estimated Monthly Income:</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="text-center p-4 bg-dark-bg/50 rounded-xl">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <DollarSign className="w-5 h-5 text-brand-green" />
                  <span className="text-gray-400 text-sm">USD Income</span>
                </div>
                <p className="text-3xl sm:text-4xl font-black text-brand-green">
                  ${monthlyUSD.toLocaleString()}
                </p>
                <p className="text-gray-500 text-xs mt-1">per month</p>
              </div>
              
              <div className="text-center p-4 bg-dark-bg/50 rounded-xl">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <TrendingUp className="w-5 h-5 text-brand-gold" />
                  <span className="text-gray-400 text-sm">PKR Income</span>
                </div>
                <p className="text-3xl sm:text-4xl font-black text-brand-gold">
                  ₨{monthlyPKR.toLocaleString()}
                </p>
                <p className="text-gray-500 text-xs mt-1">per month</p>
              </div>
            </div>

            {monthlyPKR > 45000 && (
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-400">
                  Ye <span className="text-white font-bold">
                    {Math.round(monthlyPKR / 35000)}x
                  </span> zyada hai average graduate salary se! 🚀
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
