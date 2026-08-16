import React from "react";
import { X, CheckCircle2, ArrowRight, Sparkles, Globe, Volume2, ShieldCheck } from "lucide-react";
import { workshopConfig } from "../workshopConfig";

interface UrduModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPurchaseModal: () => void;
}

export default function UrduModal({ isOpen, onClose, onOpenPurchaseModal }: UrduModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="bg-slate-900 border-2 border-amber-400 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-amber-500/20 p-6 sm:p-8 relative text-right font-sans"
        dir="rtl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badge Header */}
        <div className="flex items-center justify-end gap-2 mb-4">
          <span className="bg-amber-400 text-slate-950 px-3.5 py-1 rounded-full text-xs font-black font-mono tracking-wider flex items-center gap-1.5 shadow-md">
            <Globe className="w-4 h-4" /> مکمل اردو معلومات
          </span>
        </div>

        {/* Urdu Main Title */}
        <h2 className="text-2xl sm:text-3xl font-black text-white leading-relaxed mb-3">
          یوٹیوب فیس لیس ماسٹر کلاس — مکمل اردو گائیڈ
        </h2>

        <p className="text-amber-300 text-base sm:text-lg font-extrabold leading-relaxed mb-6 bg-amber-950/60 p-4 rounded-2xl border border-amber-500/40">
          بغیر چہرہ دکھائے (Faceless) ڈالر کمانے والا یوٹیوب چینل کیسے قائم کریں؟ صرف 2 گھنٹے کی لائیو پریکٹیکل کلاس!
        </p>

        {/* Key Highlights List in Urdu Script */}
        <div className="space-y-4 mb-8 text-slate-100 text-sm sm:text-base leading-loose">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-700 flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
            <div>
              <strong className="text-emerald-400 font-extrabold text-lg block">1. 100% لائیو اسکرین شیئرنگ</strong>
              <p className="text-slate-200 mt-1">
                کوئی ریکارڈ شدہ یا پرانی تھیوری نہیں! ماسٹر کلاس بالکل لائیو ہو گی جس میں پریکٹیکل اسکرین شیئر کر کے AI ٹولز سے ویڈیوز بنانا سکھایا جائے گا۔
              </p>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-700 flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
            <div>
              <strong className="text-amber-300 font-extrabold text-lg block">2. امریکی (US/UK) ڈالر آڈینس ٹارگٹ</strong>
              <p className="text-slate-200 mt-1">
                مقامی سستی آڈینس کی بجائے ہائی سی پی ایم (High CPM) ڈالر آڈینس کے لیے کنٹینٹ اور اسکرپٹ تیار کرنے کا فارمولا سکھایا جائے گا۔
              </p>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-700 flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
            <div>
              <strong className="text-emerald-400 font-extrabold text-lg block">3. 50+ مفت AI پرامپٹس اور ٹیمپلیٹس</strong>
              <p className="text-slate-200 mt-1">
                ورکشاپ میں شرکت پر آپ کو 50 سے زائد تیار AI پرامپٹس، اسکرپٹ ٹیمپلیٹس اور وائس اوور ورک فلوز کا تحفہ دیا جائے گا۔
              </p>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-700 flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
            <div>
              <strong className="text-amber-300 font-extrabold text-lg block">4. 7 دن کا پرائیویٹ واٹس ایپ گروپ</strong>
              <p className="text-slate-200 mt-1">
                کلاس کے بعد بھی آپ کی مکمل رہنمائی کے لیے 7 دن تک واٹس ایپ پر ڈائریکٹ سپورٹ دستیاب ہو گی۔
              </p>
            </div>
          </div>
        </div>

        {/* Pricing & Timing Banner in Urdu */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500 p-0.5 rounded-2xl mb-6 shadow-xl">
          <div className="bg-slate-950 p-5 rounded-[15px] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
            <div>
              <span className="text-slate-300 text-xs font-bold block">ورکشاپ فیس (One-Time Pass)</span>
              <span className="text-3xl font-black text-amber-300 font-mono">PKR {workshopConfig.price.toLocaleString()}</span>
              <span className="text-slate-400 text-xs line-through mr-2">PKR 15,499</span>
            </div>

            <div className="text-right">
              <span className="text-slate-300 text-xs font-bold block">کلاس کا وقت</span>
              <span className="text-white font-extrabold text-base">روزانہ رات 8:00 بجے سے 10:00 بجے تک</span>
            </div>
          </div>
        </div>

        {/* CTA Button in Urdu */}
        <div className="space-y-3">
          <button
            onClick={() => {
              onClose();
              onOpenPurchaseModal();
            }}
            className="w-full py-4 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 font-black text-lg sm:text-xl rounded-2xl shadow-xl shadow-amber-500/20 transition-all cursor-pointer flex items-center justify-center gap-2 border-2 border-amber-300"
          >
            <span>ابھی اپنی سیٹ بک کریں (PKR {workshopConfig.price.toLocaleString()})</span>
            <ArrowRight className="w-6 h-6 rotate-180" />
          </button>

          <p className="text-slate-400 text-xs text-center flex items-center justify-center gap-1.5 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>پیمنٹ پروف بھیجنے کے 30 منٹ کے اندر واٹس ایپ کنفرمیشن مل جائے گی۔</span>
          </p>
        </div>

      </div>
    </div>
  );
}
