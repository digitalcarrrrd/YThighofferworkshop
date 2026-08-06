import { AlertTriangle, TrendingDown, GraduationCap, Frown, X } from 'lucide-react';

const painPoints = [
  {
    icon: <TrendingDown className="w-6 h-6 text-brand-red" />,
    emoji: '📉',
    title: 'Dollar ₹278+ ho gaya',
    desc: 'Tumhari savings ki value 60% gir gayi hai 3 saal mein. Mehnat wahi, paisa aadha.',
  },
  {
    icon: <GraduationCap className="w-6 h-6 text-brand-red" />,
    emoji: '🎓',
    title: 'Degree ke baad bhi berozgaar',
    desc: '30%+ graduates ko job nahi milti. 4 saal padhai, phir bhi ₨25,000 ki naukri.',
  },
  {
    icon: <Frown className="w-6 h-6 text-brand-red" />,
    emoji: '😔',
    title: 'Ghar walon ka pressure',
    desc: '"Beta, kuch karo" — ye sun sun ke thak gaye ho. Freelancing try ki, kuch hua nahi.',
  },
  {
    icon: <AlertTriangle className="w-6 h-6 text-brand-red" />,
    emoji: '💸',
    title: 'Mehangai kha gayi sab',
    desc: 'Inflation 20-30%... Salary increase? 5-10% agar nasib ho. Har mahine short.',
  },
];

export default function PainSection() {
  return (
    <section className="py-16 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-red/3 to-transparent" />
      
      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-brand-red text-sm font-bold uppercase tracking-wider mb-3">Yeh tumhari kahani hai na? 👇</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
            Pakistan Mein <span className="text-brand-red">Survive Karna</span> Mushkil Ho Gaya Hai
          </h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">
            Yeh facts hain, feelings nahi. Aur tum akele nahi ho — 70 million+ Pakistanis same problem face kar rahe hain.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {painPoints.map((point, i) => (
            <div 
              key={i} 
              className="glass-card rounded-2xl p-6 border border-brand-red/10 hover:border-brand-red/30 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">{point.emoji}</div>
                <div>
                  <h3 className="font-bold text-white text-lg group-hover:text-brand-red transition-colors">
                    {point.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1 leading-relaxed">{point.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* The Bridge */}
        <div className="mt-12 text-center glass-card rounded-2xl p-8 border border-brand-gold/20">
          <div className="flex items-center justify-center gap-2 mb-3">
            <X className="w-6 h-6 text-brand-red" />
            <span className="text-brand-red font-bold text-lg line-through">Purana Raasta</span>
          </div>
          <p className="text-gray-400 mb-4">
            9-5 naukri, freelancing competition, traditional business — sab mushkil. Lekin...
          </p>
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-brand-green font-bold text-xl">✅ Naya Raasta — YouTube Creator Economy</span>
          </div>
          <p className="text-white font-semibold text-lg">
            YouTube ne last 3 years mein creators ko <span className="highlight-text">$70 BILLION</span> diye hain.
            <br />
            <span className="text-gray-400 text-base font-normal">Tumhara hissa kahan hai?</span>
          </p>
        </div>
      </div>
    </section>
  );
}
