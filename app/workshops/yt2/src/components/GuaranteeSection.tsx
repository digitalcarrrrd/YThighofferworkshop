import { Shield, CheckCircle } from 'lucide-react';

export default function GuaranteeSection() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-brand-green/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-brand-green/5 rounded-full blur-[80px]" />
          
          <div className="relative text-center">
            <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-brand-green" />
            </div>
            
            <h3 className="text-xl sm:text-2xl font-black text-white mb-3">
              100% Money-Back Guarantee 🛡️
            </h3>
            
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Agar workshop attend karke tumhe laga ke ye tumhare kaam ki nahi thi — 
              to <span className="text-white font-semibold">full refund</span>. Koi sawaal nahi, koi drama nahi.
              WhatsApp pe bolo, paise wapis.
            </p>

            <div className="space-y-2 text-left max-w-sm mx-auto">
              {[
                'Full workshop attend karo',
                'Agar value nahi mili — refund lo',
                'Koi questions nahi poochenge',
                '24 hours mein refund process',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-green flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{item}</span>
                </div>
              ))}
            </div>

            <p className="text-brand-green text-sm font-semibold mt-4">
              Risk ZERO hai — reward UNLIMITED! 🚀
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
