'use client';

import React, { useState, useRef } from 'react';
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('/api/lms-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      // Proceed to next step regardless of success for better UX in case GHL is down
      setStep(2);
    } catch (error) {
      console.error(error);
      setStep(2);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmPayment = () => {
    const defaultWhatsapp = '923000000000'; // Placeholder
    const message = `Hi, I want to confirm my payment for the LMS.\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}${transactionId ? `\nTransaction ID: ${transactionId}` : ''}\nPlease find my payment screenshot attached (I will send it now).`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${defaultWhatsapp}?text=${encodedMessage}`, '_blank');
    onClose();
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

  const paymentMethods = [
    { name: 'Bank Transfer (Meezan Bank)', accountName: 'Abrar Nadir', accountNumber: '01234567891234', icon: <Landmark className="w-5 h-5" /> },
    { name: 'JazzCash', accountName: 'Abrar Nadir', accountNumber: '03001234567', icon: <Wallet className="w-5 h-5 text-red-500" /> },
    { name: 'Easypaisa', accountName: 'Abrar Nadir', accountNumber: '03451234567', icon: <Wallet className="w-5 h-5 text-green-500" /> },
    { name: 'Crypto (USDT TRC20)', accountName: 'Binance', accountNumber: 'Txxxxxxxxxxxxxxxxxxxxxxxxx', icon: <Building2 className="w-5 h-5 text-yellow-500" /> },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative border border-gray-200 dark:border-gray-800 flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center sticky top-0 bg-white dark:bg-gray-900 z-10">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">
            {step === 1 ? 'Secure Your Spot' : 'Complete Payment'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Body - Scrollable */}
        <div className="p-6 overflow-y-auto">
          {step === 1 && (
            <form onSubmit={handleNext} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                <input 
                  type="text" 
                  required 
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">WhatsApp Number</label>
                <input 
                  type="tel" 
                  required 
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  placeholder="e.g. +92 300 0000000"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                <input 
                  type="email" 
                  required 
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-lg py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing...' : 'Next Step'}
                {!isSubmitting && <ArrowRight className="w-5 h-5" />}
              </button>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-100 dark:border-purple-800">
                <p className="text-sm text-purple-800 dark:text-purple-300 font-medium">
                  Please send the payment of <strong className="font-black text-lg">20,000 PKR</strong> (or $70 USD) to any of the accounts below, then upload the screenshot.
                </p>
              </div>

              <div className="space-y-3">
                {paymentMethods.map((method, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-2">
                      {method.icon}
                      <span className="font-bold text-gray-900 dark:text-white">{method.name}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Account Name</div>
                        <div className="font-semibold text-gray-800 dark:text-gray-200">{method.accountName}</div>
                      </div>
                      <div className="flex items-center gap-2 bg-white dark:bg-gray-900 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700">
                        <span className="font-mono text-sm font-bold text-gray-900 dark:text-white">{method.accountNumber}</span>
                        <button 
                          onClick={() => handleCopy(method.accountNumber, index)}
                          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                          title="Copy Number"
                        >
                          {copiedIndex === index ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-500" />}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Transaction ID (Optional)</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                    placeholder="e.g. TID12345678"
                    value={transactionId}
                    onChange={e => setTransactionId(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Payment Screenshot</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-500 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors"
                  >
                    <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                      {fileName ? fileName : 'Click to upload screenshot'}
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
                className="w-full mt-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-black text-lg py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                Confirm Payment via WhatsApp
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
