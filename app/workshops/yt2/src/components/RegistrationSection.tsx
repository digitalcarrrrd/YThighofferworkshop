import { useState, useRef } from 'react';
import { useCountdown, useSeatsCounter } from '../hooks/useCountdown';
import { 
  Zap, Shield, Lock, Clock, Users, ArrowRight, 
  MessageCircle, CheckCircle, Sparkles, Upload, Copy, Check,
  CreditCard, Building, Smartphone, ChevronLeft, Image, X
} from 'lucide-react';

const bankDetails = {
  jazzcash: {
    name: 'JazzCash',
    icon: <Smartphone className="w-5 h-5" />,
    color: 'from-red-500 to-red-600',
    accountTitle: 'Muhammad Ahmed Khan',
    accountNumber: '0300-1234567',
    instructions: 'JazzCash app se payment karein',
  },
  easypaisa: {
    name: 'Easypaisa',
    icon: <Smartphone className="w-5 h-5" />,
    color: 'from-green-500 to-green-600',
    accountTitle: 'Muhammad Ahmed Khan',
    accountNumber: '0345-1234567',
    instructions: 'Easypaisa app se payment karein',
  },
  bank: {
    name: 'Bank Transfer',
    icon: <Building className="w-5 h-5" />,
    color: 'from-blue-500 to-blue-600',
    accountTitle: 'Muhammad Ahmed Khan',
    accountNumber: 'PK36MEZN0099012345678901',
    bankName: 'Meezan Bank',
    instructions: 'Online banking ya branch se transfer karein',
  },
};

type PaymentMethod = 'jazzcash' | 'easypaisa' | 'bank';

export default function RegistrationSection() {
  const { hours, minutes, seconds } = useCountdown();
  const seats = useSeatsCounter();
  const pad = (n: number) => n.toString().padStart(2, '0');
  
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [transactionId, setTransactionId] = useState('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && phone.trim()) {
      setStep(2);
    }
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setScreenshot(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeScreenshot = () => {
    setScreenshot(null);
    setScreenshotPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFinalSubmit = () => {
    if (!selectedMethod || (!transactionId.trim() && !screenshot)) {
      alert('Please enter Transaction ID ya Screenshot upload karein');
      return;
    }

    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsComplete(true);

      // Open WhatsApp with details
      const paymentInfo = screenshot 
        ? 'Screenshot attached hai' 
        : `Transaction ID: ${transactionId}`;
      
      const message = encodeURIComponent(
        `Assalam o Alaikum! 🙏\n\n` +
        `✅ WORKSHOP SEAT BOOKING\n\n` +
        `👤 Name: ${name}\n` +
        `📱 Phone: +92${phone}\n` +
        `💳 Payment Method: ${bankDetails[selectedMethod].name}\n` +
        `🧾 ${paymentInfo}\n\n` +
        `Please confirm my seat for YouTube AI Workshop! 🎯`
      );
      
      window.open(`https://wa.me/923001234567?text=${message}`, '_blank');
    }, 1500);
  };

  const handleWhatsAppDirect = () => {
    const message = encodeURIComponent(
      `Assalam o Alaikum! 🙏\nMujhe YouTube AI Workshop ki seat book karni hai.\nAbhi register karna chahta/chahti hoon! ✅`
    );
    window.open(`https://wa.me/923001234567?text=${message}`, '_blank');
  };

  return (
    <section className="py-16 px-4 relative" id="register">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-red/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-red/3 to-transparent" />
      
      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-brand-red/10 border border-brand-red/30 rounded-full px-4 py-1.5 mb-4">
            <Sparkles className="w-4 h-4 text-brand-red" />
            <span className="text-brand-red text-sm font-semibold">Limited Seats — Abhi Register Karo</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3">
            Apni <span className="highlight-text">Seat Book Karo</span> — Aaj Hi!
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            3 simple steps mein seat confirm karo — Payment karke screenshot ya Transaction ID bhejo
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left - Form */}
          <div className="lg:col-span-3">
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-brand-red/20">
              
              {/* Progress Steps */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= 1 ? 'bg-brand-red text-white' : 'bg-dark-surface text-gray-500'
                }`}>
                  {step > 1 ? <Check className="w-4 h-4" /> : '1'}
                </div>
                <div className={`w-12 h-1 rounded ${step >= 2 ? 'bg-brand-red' : 'bg-dark-surface'}`} />
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= 2 ? 'bg-brand-red text-white' : 'bg-dark-surface text-gray-500'
                }`}>
                  {isComplete ? <Check className="w-4 h-4" /> : '2'}
                </div>
              </div>

              {/* Step 1: Name & Phone */}
              {step === 1 && (
                <form onSubmit={handleStep1Submit} className="space-y-4">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-white">Step 1: Apni Details Dein</h3>
                    <p className="text-gray-500 text-sm">Naam aur WhatsApp number enter karein</p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-300 mb-2 block">Tumhara Naam *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Apna poora naam likho..."
                      className="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:border-brand-red/50 focus:outline-none focus:ring-1 focus:ring-brand-red/30 transition-all"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-semibold text-gray-300 mb-2 block">WhatsApp Number *</label>
                    <div className="flex gap-2">
                      <div className="bg-dark-surface border border-dark-border rounded-xl px-3 py-3.5 text-gray-400 text-sm flex items-center gap-1">
                        🇵🇰 +92
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        placeholder="3XX XXXXXXX"
                        className="flex-1 bg-dark-surface border border-dark-border rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:border-brand-red/50 focus:outline-none focus:ring-1 focus:ring-brand-red/30 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full cta-btn text-white font-bold text-lg py-4 rounded-2xl flex items-center justify-center gap-3"
                  >
                    Next: Payment Details
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              )}

              {/* Step 2: Payment */}
              {step === 2 && !isComplete && (
                <div className="space-y-5">
                  <button 
                    onClick={() => setStep(1)}
                    className="flex items-center gap-1 text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </button>

                  <div className="text-center mb-2">
                    <h3 className="text-lg font-bold text-white">Step 2: Payment Karein — ₨1,999</h3>
                    <p className="text-gray-500 text-sm">Neeche se payment method select karein</p>
                  </div>

                  {/* Payment Method Selection */}
                  <div className="grid grid-cols-3 gap-2">
                    {(Object.keys(bankDetails) as PaymentMethod[]).map((method) => (
                      <button
                        key={method}
                        onClick={() => setSelectedMethod(method)}
                        className={`p-3 rounded-xl border transition-all text-center ${
                          selectedMethod === method
                            ? 'border-brand-green/50 bg-brand-green/10'
                            : 'border-dark-border bg-dark-surface hover:border-gray-600'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${bankDetails[method].color} flex items-center justify-center text-white mx-auto mb-2`}>
                          {bankDetails[method].icon}
                        </div>
                        <p className="text-xs font-semibold text-white">{bankDetails[method].name}</p>
                      </button>
                    ))}
                  </div>

                  {/* Bank Details Display */}
                  {selectedMethod && (
                    <div className="bg-dark-surface rounded-xl p-4 border border-dark-border space-y-3 animate-slide-up">
                      <div className="flex items-center gap-2 text-brand-gold text-sm font-semibold">
                        <CreditCard className="w-4 h-4" />
                        {bankDetails[selectedMethod].name} Details
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between bg-dark-bg/50 rounded-lg p-3">
                          <div>
                            <p className="text-xs text-gray-500">Account Title</p>
                            <p className="text-white font-semibold text-sm">{bankDetails[selectedMethod].accountTitle}</p>
                          </div>
                          <button 
                            onClick={() => handleCopy(bankDetails[selectedMethod].accountTitle, 'title')}
                            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                          >
                            {copied === 'title' ? <Check className="w-4 h-4 text-brand-green" /> : <Copy className="w-4 h-4 text-gray-400" />}
                          </button>
                        </div>

                        <div className="flex items-center justify-between bg-dark-bg/50 rounded-lg p-3">
                          <div>
                            <p className="text-xs text-gray-500">Account Number</p>
                            <p className="text-white font-semibold text-sm font-mono">{bankDetails[selectedMethod].accountNumber}</p>
                          </div>
                          <button 
                            onClick={() => handleCopy(bankDetails[selectedMethod].accountNumber, 'number')}
                            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                          >
                            {copied === 'number' ? <Check className="w-4 h-4 text-brand-green" /> : <Copy className="w-4 h-4 text-gray-400" />}
                          </button>
                        </div>

                        {selectedMethod === 'bank' && (
                          <div className="flex items-center justify-between bg-dark-bg/50 rounded-lg p-3">
                            <div>
                              <p className="text-xs text-gray-500">Bank Name</p>
                              <p className="text-white font-semibold text-sm">{bankDetails.bank.bankName}</p>
                            </div>
                            <button 
                              onClick={() => handleCopy(bankDetails.bank.bankName, 'bank')}
                              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                            >
                              {copied === 'bank' ? <Check className="w-4 h-4 text-brand-green" /> : <Copy className="w-4 h-4 text-gray-400" />}
                            </button>
                          </div>
                        )}

                        <div className="bg-brand-gold/10 border border-brand-gold/20 rounded-lg p-3">
                          <p className="text-brand-gold text-xs font-semibold mb-1">💡 Amount to Pay</p>
                          <p className="text-2xl font-black text-white">₨1,999</p>
                        </div>
                      </div>

                      <p className="text-gray-500 text-xs">
                        ℹ️ {bankDetails[selectedMethod].instructions}
                      </p>
                    </div>
                  )}

                  {/* Transaction ID or Screenshot */}
                  {selectedMethod && (
                    <div className="space-y-4 animate-slide-up">
                      <div className="text-center">
                        <p className="text-white font-semibold text-sm">Payment ke baad:</p>
                        <p className="text-gray-500 text-xs">Transaction ID likhein YA Screenshot upload karein</p>
                      </div>

                      {/* Transaction ID Input */}
                      <div>
                        <label className="text-sm font-semibold text-gray-300 mb-2 block">
                          Transaction ID / Reference Number
                        </label>
                        <input
                          type="text"
                          value={transactionId}
                          onChange={(e) => setTransactionId(e.target.value)}
                          placeholder="e.g., TXN123456789"
                          className="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-brand-green/50 focus:outline-none focus:ring-1 focus:ring-brand-green/30 transition-all font-mono"
                        />
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-px bg-dark-border" />
                        <span className="text-gray-600 text-xs">YA</span>
                        <div className="flex-1 h-px bg-dark-border" />
                      </div>

                      {/* Screenshot Upload */}
                      <div>
                        <label className="text-sm font-semibold text-gray-300 mb-2 block">
                          Payment Screenshot Upload Karein
                        </label>
                        
                        {!screenshotPreview ? (
                          <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-dark-border rounded-xl p-6 text-center cursor-pointer hover:border-brand-green/50 transition-colors"
                          >
                            <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                            <p className="text-gray-400 text-sm">Click to upload screenshot</p>
                            <p className="text-gray-600 text-xs mt-1">PNG, JPG up to 5MB</p>
                          </div>
                        ) : (
                          <div className="relative">
                            <img 
                              src={screenshotPreview} 
                              alt="Payment Screenshot" 
                              className="w-full h-48 object-cover rounded-xl border border-dark-border"
                            />
                            <button
                              onClick={removeScreenshot}
                              className="absolute top-2 right-2 w-8 h-8 bg-brand-red rounded-full flex items-center justify-center text-white hover:bg-brand-red-dark transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                            <div className="absolute bottom-2 left-2 bg-brand-green/90 text-white text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
                              <Image className="w-3 h-3" />
                              Screenshot ready
                            </div>
                          </div>
                        )}
                        
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        onClick={handleFinalSubmit}
                        disabled={isSubmitting || (!transactionId.trim() && !screenshot)}
                        className={`w-full font-bold text-lg py-4 rounded-2xl flex items-center justify-center gap-3 transition-all ${
                          isSubmitting || (!transactionId.trim() && !screenshot)
                            ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                            : 'cta-btn animate-pulse-glow text-white'
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Zap className="w-5 h-5" />
                            SEAT BOOK KARO
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </button>

                      <p className="text-gray-500 text-xs text-center">
                        🔒 WhatsApp pe confirm hoga — hum 5 minutes mein reply karenge
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Success State */}
              {isComplete && (
                <div className="text-center py-8 animate-slide-up">
                  <div className="w-20 h-20 bg-brand-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-brand-green" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Shukriya, {name}! 🎉</h3>
                  <p className="text-gray-400 mb-6">
                    Tumhari booking request receive ho gayi hai!<br />
                    WhatsApp pe humse baat karo — hum 5 minutes mein confirm karenge.
                  </p>
                  <button
                    onClick={handleWhatsAppDirect}
                    className="whatsapp-btn text-white font-bold px-8 py-4 rounded-xl inline-flex items-center gap-2 text-lg"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp pe Message Karo
                  </button>
                  <p className="text-gray-500 text-xs mt-4">
                    Workshop details aur joining link WhatsApp pe milay gi ✅
                  </p>
                </div>
              )}

              {/* Divider */}
              {step === 1 && (
                <>
                  <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 h-px bg-dark-border" />
                    <span className="text-gray-600 text-xs">YA SEEDHA</span>
                    <div className="flex-1 h-px bg-dark-border" />
                  </div>

                  {/* WhatsApp Direct */}
                  <button
                    onClick={handleWhatsAppDirect}
                    className="w-full whatsapp-btn text-white font-bold text-lg py-4 rounded-2xl flex items-center justify-center gap-3"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp Pe Seedha Message Karo
                  </button>
                </>
              )}

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-4 mt-6 flex-wrap">
                <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Money-Back Guarantee</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                  <Users className="w-3.5 h-3.5" />
                  <span>2,800+ Trust Karte Hain</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Summary */}
          <div className="lg:col-span-2 space-y-4">
            {/* Countdown */}
            <div className="glass-card rounded-2xl p-5 border border-brand-red/20">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-brand-red" />
                <span className="text-brand-red font-bold text-sm">Aaj ki deadline:</span>
              </div>
              <div className="flex gap-2 font-mono text-3xl font-black text-brand-red justify-center">
                <div className="bg-brand-red/10 px-3 py-2 rounded-lg">{pad(hours)}</div>
                <span className="animate-pulse self-center">:</span>
                <div className="bg-brand-red/10 px-3 py-2 rounded-lg">{pad(minutes)}</div>
                <span className="animate-pulse self-center">:</span>
                <div className="bg-brand-red/10 px-3 py-2 rounded-lg">{pad(seconds)}</div>
              </div>
              <p className="text-center text-gray-500 text-xs mt-2">7 PM PKT tak — phir next batch ka wait</p>
            </div>

            {/* Seats */}
            <div className="glass-card rounded-2xl p-5 border border-urgency-orange/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-urgency-orange font-bold text-sm">🔥 Seats Remaining</span>
                <span className="text-urgency-orange font-black text-lg animate-count-pulse">{seats}/100</span>
              </div>
              <div className="w-full bg-dark-surface rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-urgency-orange to-brand-red rounded-full transition-all duration-1000"
                  style={{ width: `${100 - seats}%` }}
                />
              </div>
              <p className="text-gray-500 text-xs mt-2">Har roz 100 seats — pehle aao pehle paao</p>
            </div>

            {/* Price breakdown */}
            <div className="glass-card rounded-2xl p-5 border border-brand-gold/20">
              <h3 className="font-bold text-white mb-3">💎 Kya mil raha hai:</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">2-Hour LIVE Workshop</span>
                  <span className="text-gray-500 line-through">₨5,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">AI Tools Pack</span>
                  <span className="text-gray-500 line-through">₨4,999</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">100 Video Ideas</span>
                  <span className="text-gray-500 line-through">₨2,999</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Thumbnail Templates</span>
                  <span className="text-gray-500 line-through">₨1,999</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">30-Day Plan</span>
                  <span className="text-gray-500 line-through">₨3,999</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">WhatsApp Community</span>
                  <span className="text-gray-500">Priceless</span>
                </div>
                <div className="border-t border-dark-border my-2" />
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Value</span>
                  <span className="text-gray-500 line-through">₨23,995</span>
                </div>
                <div className="flex justify-between items-center bg-brand-gold/10 -mx-2 px-2 py-2 rounded-xl">
                  <span className="text-white font-bold">Tum Pay Karo Ge</span>
                  <span className="text-brand-gold font-black text-2xl">₨1,999</span>
                </div>
              </div>
            </div>

            {/* Payment methods */}
            <div className="glass-card rounded-xl p-4 border border-white/5">
              <p className="text-gray-400 text-xs mb-2 font-semibold">Payment Methods:</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-dark-surface px-3 py-1 rounded-lg text-xs text-gray-300 border border-dark-border">JazzCash</span>
                <span className="bg-dark-surface px-3 py-1 rounded-lg text-xs text-gray-300 border border-dark-border">Easypaisa</span>
                <span className="bg-dark-surface px-3 py-1 rounded-lg text-xs text-gray-300 border border-dark-border">Bank Transfer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
