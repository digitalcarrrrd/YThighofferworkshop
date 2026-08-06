import { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';

const faqs = [
  {
    q: 'Kya mujhe camera ya expensive setup chahiye?',
    a: 'Bilkul nahi! Ye faceless YouTube channels hain — tumhe sirf laptop/phone aur internet chahiye. AI tools sab handle karenge. Camera, mic, studio — kuch nahi chahiye.',
  },
  {
    q: 'Main student hoon, time kaise milay ga?',
    a: 'Ye system 2-3 ghante daily mein kaam karta hai. Weekend pe videos batch kar sakte ho. Bahut se students padhai ke saath kar rahe hain — aur unki pocket money se zyada kama rahe hain.',
  },
  {
    q: 'Kya guarantee hai ke main kama lunga?',
    a: 'Honest answer: koi 100% guarantee nahi de sakta. Lekin 87% students jo consistent rahe, unhone 6 months mein earn karna start kiya. Ye business hai — effort chahiye. Hum system aur support dete hain.',
  },
  {
    q: 'PKR 1,999 bahut hain mere liye...',
    a: 'Samajhte hain. Lekin socho: ye 2 din ki food cost hai. Aur agar ye ₨1,999 tumhe ₨50,000-100,000/month kamana sikha de? Worst case: 2 ghante ka best YouTube education. Best case: life change.',
  },
  {
    q: 'Pehle bhi course liya tha, kuch nahi hua...',
    a: 'Bahut logo ke saath hua hai ye. Isliye hamara approach different hai: LIVE workshop (recorded nahi), community support, weekly follow-ups, aur 30-day action plan. Akele nahi chhortay hum.',
  },
  {
    q: 'English mein content banana paray ga?',
    a: 'English channels ka RPM zyada hota hai — lekin Urdu/Hindi channels bhi kaam karti hain. Workshop mein dono strategies cover hoti hain. Faceless channels mein AI voice use hoti hai.',
  },
  {
    q: 'Recording milay gi workshop ki?',
    a: 'Haan! Workshop attend karne walon ko recording + notes + resources — sab milay ga WhatsApp group mein. Lekin LIVE attend karna highly recommended hai Q&A ke liye.',
  },
  {
    q: 'Payment kaise karoon?',
    a: 'JazzCash, Easypaisa, Bank Transfer — sab accept hain. WhatsApp pe contact karo, hum guide kar denge. Simple aur fast process hai.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 px-4 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-4">
            <MessageCircle className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-semibold">Tumhare Sawaal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3">
            Har Sawal Ka <span className="highlight-text">Jawab</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="glass-card rounded-xl border border-white/5 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-semibold text-white text-sm sm:text-base pr-4">{faq.q}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-5 pb-5 pt-0">
                  <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
