import { Clock, CheckCircle, Gift } from 'lucide-react';

const agendaItems = [
  {
    time: '7:00 PM',
    title: 'YouTube Creator Economy 2025',
    desc: '$70B+ opportunity — Pakistan mein kaise tap karna hai',
    icon: '🌍',
  },
  {
    time: '7:20 PM',
    title: 'Profitable Niche Selection',
    desc: 'Highest RPM niches jo Pakistan se kaam karti hain — data-backed',
    icon: '🎯',
  },
  {
    time: '7:40 PM',
    title: 'AI Video Production (LIVE Demo)',
    desc: 'ChatGPT se script, AI voice, Midjourney se visuals — sab LIVE dikhaunga',
    icon: '🤖',
  },
  {
    time: '8:00 PM',
    title: 'Channel Setup & Optimization',
    desc: 'Algorithm samjho — thumbnail, title, tags jo views laate hain',
    icon: '⚙️',
  },
  {
    time: '8:20 PM',
    title: 'Monetization Strategy',
    desc: 'AdSense + sponsorships + affiliate — multiple income streams',
    icon: '💰',
  },
  {
    time: '8:40 PM',
    title: 'Q&A + Personal Roadmap',
    desc: 'Apne specific questions poocho — personalized guidance',
    icon: '🗣️',
  },
];

const bonuses = [
  { title: '100 Proven Video Ideas List', value: '₨2,999', icon: '📋' },
  { title: 'AI Tools Starter Pack', value: '₨4,999', icon: '🤖' },
  { title: 'Thumbnail Templates (50+)', value: '₨1,999', icon: '🎨' },
  { title: '30-Day Action Plan', value: '₨3,999', icon: '📅' },
  { title: 'Private WhatsApp Community', value: 'Priceless', icon: '💬' },
];

export default function WorkshopAgenda() {
  return (
    <section className="py-16 px-4 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent" />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-accent-blue text-sm font-bold uppercase tracking-wider mb-3">
            Workshop Breakdown 📋
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3">
            Aaj Raat <span className="text-accent-blue">7 PM</span> Se <span className="text-accent-blue">9 PM</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            2 ghante mein poora YouTube business blueprint — theoretical bakwas nahi, practical steps
          </p>
        </div>

        {/* Agenda Timeline */}
        <div className="relative mb-12">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent-blue via-accent-purple to-brand-green sm:left-1/2" />
          
          <div className="space-y-6">
            {agendaItems.map((item, i) => (
              <div key={i} className={`relative flex items-start gap-4 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                <div className={`flex-1 ${i % 2 === 0 ? 'sm:text-right sm:pr-8' : 'sm:text-left sm:pl-8'} pl-14 sm:pl-0`}>
                  <div className={`glass-card rounded-xl p-4 border border-white/5 hover:border-accent-blue/20 transition-all inline-block ${i % 2 === 0 ? 'sm:ml-auto' : ''}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-3.5 h-3.5 text-accent-blue" />
                      <span className="text-accent-blue text-xs font-bold">{item.time}</span>
                    </div>
                    <h3 className="font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
                
                {/* Center dot */}
                <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 w-5 h-5 rounded-full bg-dark-bg border-2 border-accent-blue flex items-center justify-center text-xs z-10">
                  {item.icon}
                </div>
                
                <div className="hidden sm:block flex-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Bonuses */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-brand-gold/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-[60px]" />
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <Gift className="w-6 h-6 text-brand-gold" />
              <h3 className="text-xl sm:text-2xl font-black text-white">
                FREE Bonuses Worth <span className="text-brand-gold">₨13,996</span>
              </h3>
            </div>

            <div className="space-y-3">
              {bonuses.map((bonus, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-dark-surface/50 border border-white/5">
                  <span className="text-xl">{bonus.icon}</span>
                  <div className="flex-1">
                    <p className="text-white font-semibold text-sm">{bonus.title}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-brand-green" />
                    <span className="text-brand-green text-xs font-bold">FREE</span>
                    <span className="text-gray-600 text-xs line-through">{bonus.value}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-brand-gold/5 border border-brand-gold/20 text-center">
              <p className="text-gray-400 text-sm">
                Total Value: <span className="text-gray-500 line-through">₨23,995</span>
              </p>
              <p className="text-2xl font-black text-brand-gold mt-1">
                Tum pay karo ge sirf ₨1,999 ✨
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
