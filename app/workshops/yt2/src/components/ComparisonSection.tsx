import { X, Check, ArrowDown } from 'lucide-react';

const withoutWorkshop = [
  'Random YouTube tutorials — months wasted',
  'Wrong niche select — low RPM, no earnings',
  'Expensive courses — ₨50,000+ wasted',
  'No community support — akele struggle',
  'Trial and error — 1-2 saal ka time waste',
  'Motivation khatam — chhod dete ho',
];

const withWorkshop = [
  'Step-by-step proven system — 2 ghante mein',
  'Data-backed niche selection — highest RPM',
  'Sirf ₨1,999 — 80% discount abhi',
  'Private WhatsApp community — 24/7 support',
  'Clear 30-day plan — seedha result pe focus',
  'Weekly follow-ups — accountability partner',
];

export default function ComparisonSection() {
  return (
    <section className="py-16 px-4 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-red/30 to-transparent" />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3">
            Workshop Ke <span className="text-brand-red">Bina</span> vs <span className="text-brand-green">Saath</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Sochne mein time lagao ge — ya seekhne mein? Faisla tumhara hai.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Without */}
          <div className="glass-card rounded-2xl p-6 border border-brand-red/20 relative">
            <div className="absolute -top-3 left-6 bg-brand-red px-4 py-1 rounded-full text-xs font-bold text-white">
              ❌ BINA Workshop
            </div>
            <div className="space-y-3 mt-4">
              {withoutWorkshop.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                  <p className="text-gray-400 text-sm">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 p-3 rounded-xl bg-brand-red/5 border border-brand-red/10 text-center">
              <p className="text-brand-red text-sm font-semibold">
                Result: 😔 Time, money, motivation — sab waste
              </p>
            </div>
          </div>

          {/* With */}
          <div className="glass-card rounded-2xl p-6 border border-brand-green/20 relative">
            <div className="absolute -top-3 left-6 bg-brand-green px-4 py-1 rounded-full text-xs font-bold text-white">
              ✅ WORKSHOP Ke Saath
            </div>
            <div className="space-y-3 mt-4">
              {withWorkshop.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                  <p className="text-gray-300 text-sm">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 p-3 rounded-xl bg-brand-green/5 border border-brand-green/10 text-center">
              <p className="text-brand-green text-sm font-semibold">
                Result: 🚀 Clear path to $500-$2000/month
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <ArrowDown className="w-8 h-8 text-brand-gold mx-auto animate-bounce" />
        </div>
      </div>
    </section>
  );
}
