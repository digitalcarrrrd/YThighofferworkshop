'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Copy, CheckCircle2, UploadCloud, ArrowRight, Wallet, Building2, Landmark, Check } from 'lucide-react';

interface LmsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LmsModal({ isOpen, onClose }: LmsModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [fileName, setFileName] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'bank' | 'mobile' | 'crypto'>('bank');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  // Handle Step 3 Redirection Timer
  useEffect(() => {
    if (step === 3) {
      const waNumber = '923213823702';
      const message = `Hi, I have just submitted my payment for YT Empire Builder.\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}${transactionId ? `\nTransaction ID: ${transactionId}` : ''}\nHere is my payment screenshot.`;
      const encodedMessage = encodeURIComponent(message);
      const waLink = `https://wa.me/${waNumber}?text=${encodedMessage}`;
      
      const timer = setTimeout(() => {
        window.location.href = waLink;
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [step, formData, transactionId]);

  if (!isOpen) return null;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2); // Proceed to payment without submitting API yet
  };

  const handleConfirmPayment = async () => {
    setIsSubmitting(true);
    try {
      await fetch('/api/academy-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setStep(3); // Go to thank you screen
    } catch (error) {
      console.error(error);
      setStep(3); // Still proceed to thank you to not block user
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-md md:max-w-lg overflow-hidden shadow-2xl relative border border-gray-200 dark:border-gray-800 flex flex-col max-h-[95vh]">
        {/* Header */}
        {step !== 3 && (
          <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center sticky top-0 bg-white dark:bg-gray-900 z-10">
            <h2 className="text-xl font-black text-gray-900 dark:text-white">
              {step === 1 ? 'Secure Your Spot' : 'Complete Payment'}
            </h2>
            <button 
              onClick={onClose}
              className="p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        )}

        {/* Body - Scrollable */}
        <div className="p-5 overflow-y-auto">
          {step === 1 && (
            <form onSubmit={handleNext} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
                <input 
                  type="text" 
                  required 
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-sm"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">WhatsApp Number</label>
                <input 
                  type="tel" 
                  required 
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-sm"
                  placeholder="e.g. +92 300 0000000"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
                <input 
                  type="email" 
                  required 
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-sm"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-base py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                Next Step <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-xl border border-purple-100 dark:border-purple-800">
                <p className="text-xs md:text-sm text-purple-800 dark:text-purple-300 font-medium text-center">
                  Send <strong className="font-black text-sm md:text-base">20,000 PKR</strong> (or $70 USD) to any account below.
                </p>
              </div>

              {/* TABS */}
              <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                <button 
                  onClick={() => setActiveTab('bank')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs md:text-sm font-bold rounded-lg transition-all ${activeTab === 'bank' ? 'bg-white dark:bg-gray-700 shadow text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                >
                  <Landmark className="w-4 h-4" /> Bank
                </button>
                <button 
                  onClick={() => setActiveTab('mobile')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs md:text-sm font-bold rounded-lg transition-all ${activeTab === 'mobile' ? 'bg-white dark:bg-gray-700 shadow text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                >
                  <Wallet className="w-4 h-4" /> Apps
                </button>
                <button 
                  onClick={() => setActiveTab('crypto')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs md:text-sm font-bold rounded-lg transition-all ${activeTab === 'crypto' ? 'bg-white dark:bg-gray-700 shadow text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                >
                  <Building2 className="w-4 h-4" /> Crypto
                </button>
              </div>

              {/* TAB CONTENT */}
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700 min-h-[140px] flex flex-col justify-center">
                {activeTab === 'bank' && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 dark:text-gray-400 font-medium">Bank</span>
                      <span className="font-bold text-gray-900 dark:text-white text-right">MEEZAN Bank Limited</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 dark:text-gray-400 font-medium">Name</span>
                      <span className="font-bold text-gray-900 dark:text-white">Muhammad Abrar</span>
                    </div>
                    <div className="flex justify-between items-center text-sm bg-white dark:bg-gray-900 p-2 rounded-lg border border-gray-100 dark:border-gray-700">
                      <span className="font-mono font-bold text-gray-900 dark:text-white">02370103321036</span>
                      <button onClick={() => handleCopy('02370103321036', 1)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                        {copiedIndex === 1 ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
                      </button>
                    </div>
                    <div className="flex justify-between items-center text-sm bg-white dark:bg-gray-900 p-2 rounded-lg border border-gray-100 dark:border-gray-700">
                      <span className="font-mono text-xs font-bold text-gray-900 dark:text-white truncate max-w-[200px] md:max-w-none">IBAN: PK39MEZN0002370103321036</span>
                      <button onClick={() => handleCopy('PK39MEZN0002370103321036', 2)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                        {copiedIndex === 2 ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
                      </button>
                    </div>
                  </div>
                )}
                {activeTab === 'mobile' && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 dark:text-gray-400 font-medium">App</span>
                      <span className="font-bold text-gray-900 dark:text-white">Easypaisa / Jazzcash</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 dark:text-gray-400 font-medium">Name</span>
                      <span className="font-bold text-gray-900 dark:text-white">Muhammad Abrar Ghauri</span>
                    </div>
                    <div className="flex justify-between items-center text-sm bg-white dark:bg-gray-900 p-2 rounded-lg border border-gray-100 dark:border-gray-700 mt-2">
                      <span className="font-mono font-bold text-gray-900 dark:text-white text-base">03274532186</span>
                      <button onClick={() => handleCopy('03274532186', 3)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded bg-gray-50 dark:bg-gray-800">
                        {copiedIndex === 3 ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-500" />}
                      </button>
                    </div>
                  </div>
                )}
                {activeTab === 'crypto' && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 dark:text-gray-400 font-medium">Platform</span>
                      <span className="font-bold text-gray-900 dark:text-white">Binance</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 dark:text-gray-400 font-medium">Name</span>
                      <span className="font-bold text-gray-900 dark:text-white">abrarnadircb</span>
                    </div>
                    <div className="flex justify-between items-center text-sm bg-white dark:bg-gray-900 p-2 rounded-lg border border-gray-100 dark:border-gray-700 mt-2">
                      <span className="text-gray-500 dark:text-gray-400">ID:</span>
                      <span className="font-mono font-bold text-gray-900 dark:text-white text-base">117971802</span>
                      <button onClick={() => handleCopy('117971802', 4)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded bg-gray-50 dark:bg-gray-800">
                        {copiedIndex === 4 ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-500" />}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 mb-1">TID (Optional)</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                    placeholder="e.g. TID1234"
                    value={transactionId}
                    onChange={e => setTransactionId(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 mb-1">Screenshot</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2 flex items-center justify-center cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis"
                  >
                    <UploadCloud className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
                    <span className="text-xs text-gray-600 dark:text-gray-300 font-medium truncate">
                      {fileName ? fileName : 'Upload'}
                    </span>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>

              <button 
                onClick={handleConfirmPayment}
                disabled={isSubmitting}
                className="w-full mt-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-black text-base py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing...' : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Confirm Payment
                  </>
                )}
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-2 animate-bounce">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white">Thank You!</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm max-w-[250px] leading-relaxed">
                Your submission has been received. You will be automatically redirected to WhatsApp in <strong>5 seconds</strong> to send your screenshot.
              </p>
              
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-6 overflow-hidden">
                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '100%', animation: 'shrink 5s linear forwards' }}></div>
              </div>
              <style dangerouslySetInnerHTML={{__html: `
                @keyframes shrink { from { width: 100%; } to { width: 0%; } }
              `}} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
