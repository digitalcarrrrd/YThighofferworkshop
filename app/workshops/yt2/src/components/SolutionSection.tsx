import { Bot, DollarSign, Clock, Eye, BarChart3, Layers, Sparkles } from 'lucide-react';

const features = [
  {
    icon: <Bot className="w-7 h-7" />,
    title: 'AI Se Videos Banao',
    desc: 'ChatGPT, Midjourney, ElevenLabs — AI tumhara kaam 80% kam kar deta hai',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    icon: <Eye className="w-7 h-7" />,
    title: 'Bina Face Dikhaye',
    desc: 'Faceless channels: finance, history, motivation — highest RPM niches',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    icon: <DollarSign className="w-7 h-7" />,
    title: 'Dollar Mein Kamai',
    desc: '$1 = PKR 278+. Sirf $500/month = PKR 139,000. Graduate salary ka 4x!',
    color: 'from-green-500 to-emerald-600',
  },
  {
    icon: <Layers className="w-7 h-7" />,
    title: '3-5 Channels Chala Sako',
    desc: 'Ek insaan, multiple channels. Automation se sab possible hai',
    color: 'from-orange-500 to-red-600',
  },
  {
    icon: <Clock className="w-7 h-7" />,
    title: '2-3 Ghante Daily Bas',
    desc: 'Full-time job ya padhai ke saath bhi possible. Weekend warriors welcome',
    color: 'from-pink-500 to-rose-600',
  },
  {
    icon: <BarChart3 className="w-7 h-7" />,
    title: '3-12 Months Mein Result',
    desc: 'Consistent effort se monetization. Realistic timeline, fake promises nahi',
    color: 'from-yellow-500 to-orange-600',
  },
];

export default function SolutionSection() {
  return (
    <section className="py-16 px-4 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-purple/30 to-transparent" />
      
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent-purple/10 border border-accent-purple/30 rounded-full px-4 py-1.5 mb-4">
            <Sparkles className="w-4 h-4 text-accent-purple" />
            <span className="text-accent-purple text-sm font-semibold">AI-Powered YouTube Strategy</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3">
            Workshop Mein <span className="highlight-text">Kya Seekho Ge?</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Ye theoretical lecture nahi hai — practical, step-by-step system jo 
            already 2,800+ students use kar rahe hain
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className="glass-card rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 group cursor-pointer border border-white/5 hover:border-white/10"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="font-bold text-white text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* YouTube Stats Banner */}
        <div className="mt-12 glass-card rounded-2xl p-6 sm:p-8 border border-accent-blue/20">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-2xl sm:text-3xl font-black text-accent-blue">$70B+</p>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">YouTube ne creators ko diye</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-brand-green">40M+</p>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">Pakistani YouTube users</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-brand-gold">80%</p>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">AI se kaam kam</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-urgency-orange">278x</p>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">Dollar purchasing power</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
