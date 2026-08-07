import { Star, Quote, BadgeCheck, TrendingUp } from 'lucide-react';

interface Testimonial {
  name: string;
  city: string;
  avatar: string;
  quote: string;
  earning: string;
  duration: string;
  verified: boolean;
}

const testimonials: Testimonial[] = [
  {
    name: 'Ahmed Raza',
    city: 'Lahore',
    avatar: 'A',
    quote: 'Main graduate hoon CS ka, job nahi mil rahi thi. Workshop attend ki, 4 months mein faceless history channel se $380/month aa rahe hain. Family ko ab bata sakta hoon ke "kuch kar raha hoon".',
    earning: '$380/month',
    duration: '4 months mein',
    verified: true,
  },
  {
    name: 'Sana Fatima',
    city: 'Karachi',
    avatar: 'S',
    quote: 'Ghar baith ke kaam karna chahti thi. AI tools se motivation channel banaya. Alhamdulillah 6 months mein monetize ho gaya. Ab $620/month aate hain without showing face.',
    earning: '$620/month',
    duration: '6 months mein',
    verified: true,
  },
  {
    name: 'Usman Sheikh',
    city: 'Islamabad',
    avatar: 'U',
    quote: 'Freelancing mein competition bahut thi. YouTube try kiya — finance niche. RPM $8-12 milta hai. 3 channels chala raha hoon, total $1,800/month. Best decision ever.',
    earning: '$1,800/month',
    duration: '8 months mein',
    verified: true,
  },
  {
    name: 'Hira Khan',
    city: 'Faisalabad',
    avatar: 'H',
    quote: 'Pehle sochti thi ke YouTube sirf vloggers ke liye hai. Workshop ne perspective badal diya. Ab AI se videos banati hoon, 2-3 ghante daily. ₨85,000 extra income.',
    earning: '₨85,000+/month',
    duration: '5 months mein',
    verified: true,
  },
  {
    name: 'Bilal Ahmed',
    city: 'Rawalpindi',
    avatar: 'B',
    quote: 'Job chhodni ki zaroorat nahi padi. 9-5 ke baad 2 ghante deta hoon. Weekend pe videos batch karta hoon. $450/month extra. PKR mein bahut kuch hai ye.',
    earning: '$450/month',
    duration: '7 months mein',
    verified: true,
  },
  {
    name: 'Mahnoor Ali',
    city: 'Multan',
    avatar: 'M',
    quote: 'Meri friend ne workshop attend ki, usse dekh ke main ne bhi kiya. 2 months mein channel monetize hua. Now we both earn in dollars. Life changing investment thi ₨1,999.',
    earning: '$290/month',
    duration: '5 months mein',
    verified: true,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 px-4 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
      
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-brand-gold text-sm font-bold uppercase tracking-wider mb-3">
            Real Students, Real Results 🏆
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3">
            Inke Liye <span className="highlight-text">Kaam Kar Raha Hai</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Ye log bhi tumhari tarah confused the — ab dollar mein kama rahe hain. 
            &quot;Mera bhai/dost kar raha hai&quot; — ab tum bhi karo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <div 
              key={i} 
              className="glass-card rounded-2xl p-6 border border-white/5 hover:border-brand-gold/20 transition-all duration-300 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-gold to-orange-600 flex items-center justify-center text-white font-bold text-sm">
                  {t.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-white text-sm">{t.name}</span>
                    {t.verified && <BadgeCheck className="w-4 h-4 text-accent-blue" />}
                  </div>
                  <span className="text-gray-500 text-xs">{t.city}</span>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 text-brand-gold fill-brand-gold" />
                ))}
              </div>

              {/* Quote */}
              <div className="relative flex-1">
                <Quote className="w-4 h-4 text-gray-700 absolute -top-1 -left-1" />
                <p className="text-gray-300 text-sm leading-relaxed pl-4">
                  {t.quote}
                </p>
              </div>

              {/* Earning badge */}
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-brand-green" />
                  <span className="text-brand-green font-bold text-sm">{t.earning}</span>
                </div>
                <span className="text-gray-500 text-xs">{t.duration}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Aggregate social proof */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            <span className="text-white font-bold">2,800+</span> students ne workshop attend ki hai —{' '}
            <span className="text-brand-green font-bold">87% ne 6 months mein earn karna start kiya</span>
          </p>
        </div>
      </div>
    </section>
  );
}
