"use client";

import React, { useState } from "react";
import { audioService } from "@/lib/audioEffects";

interface QuestionStep {
  id: string;
  title: string;
  subtitle?: string;
  options: { label: string; icon: string; desc?: string }[];
}

const QUESTIONS: QuestionStep[] = [
  {
    id: "goal",
    title: "1. What's your main goal?",
    subtitle: "Select the primary outcome you want to achieve with YouTube.",
    options: [
      { label: "Side hustle income", icon: "🚀", desc: "Make extra cash alongside my job/studies" },
      { label: "Full-time freedom", icon: "🗽", desc: "Replace my active income completely" },
      { label: "Scale a business", icon: "📈", desc: "Generate organic client leads & sales" },
      { label: "Build a 100-channel portfolio", icon: "🏢", desc: "Build an automated media company" },
    ],
  },
  {
    id: "currentStage",
    title: "2. Where are you right now?",
    subtitle: "Be honest — this helps determine your starting workflow.",
    options: [
      { label: "Complete beginner", icon: "🌱", desc: "Never made or edited a video before" },
      { label: "Have a channel", icon: "📺", desc: "Channel created but struggling with views" },
      { label: "Tried before, failed", icon: "🔄", desc: "Got demonetized or stopped posting" },
      { label: "Working creator", icon: "💼", desc: "Active creator wanting higher international RPM" },
    ],
  },
  {
    id: "incomeSituation",
    title: "3. Your current income situation?",
    subtitle: "So Abrar can structure a plan that matches your cash flow.",
    options: [
      { label: "No income yet", icon: "❌", desc: "Looking to start my first earning asset" },
      { label: "Student / pocket money", icon: "🎓", desc: "Limited budget, eager to learn fast" },
      { label: "Job — money's tight", icon: "💼", desc: "Employed but living paycheck to paycheck" },
      { label: "Job — comfortable", icon: "💰", desc: "Good job, want passive media investments" },
      { label: "Own a business", icon: "🏢", desc: "Business owner ready to scale operations" },
    ],
  },
  {
    id: "pressure",
    title: "4. How much pressure are you under?",
    subtitle: "This dictates the urgency and timeline of your plan.",
    options: [
      { label: "Need income urgently", icon: "🚨", desc: "Need monetization as fast as possible" },
      { label: "Stable, want more", icon: "⚖️", desc: "Financially stable, looking to level up" },
      { label: "Building for the future", icon: "🏗️", desc: "Patiently building a long-term media empire" },
    ],
  },
  {
    id: "startBudget",
    title: "5. What can you realistically start with today?",
    subtitle: "Custom pricing is calculated around what you can actually afford.",
    options: [
      { label: "Under 5k", icon: "💵", desc: "Basic entry budget" },
      { label: "5k–15k", icon: "💵", desc: "Starter self-paced setup" },
      { label: "15k–40k", icon: "💵", desc: "Standard accelerator mentorship" },
      { label: "40k+", icon: "💵", desc: "Executive 1:1 or residency level" },
      { label: "Not sure yet", icon: "❓", desc: "Need Abrar's recommendation first" },
    ],
  },
  {
    id: "environment",
    title: "6. Your environment right now?",
    subtitle: "Your daily workspace and support system.",
    options: [
      { label: "Family supports me", icon: "👨‍👩‍👧", desc: "Safe home base with family backing" },
      { label: "On my own", icon: "🧍", desc: "Independent and making all decisions solo" },
      { label: "Juggling job or study", icon: "⏳", desc: "Working late nights and weekends" },
      { label: "I have a small team", icon: "👥", desc: "Have editors or partners helping me" },
    ],
  },
  {
    id: "timePerWeek",
    title: "7. Time you can give per week?",
    subtitle: "How many hours can you put into execution?",
    options: [
      { label: "A few hours", icon: "⏱️", desc: "3 to 5 hours / week (Light pace)" },
      { label: "Part-time", icon: "⏱️", desc: "10 to 15 hours / week (Recommended)" },
      { label: "Full-time", icon: "⏱️", desc: "30+ hours / week (Full immersion)" },
    ],
  },
  {
    id: "blocker",
    title: "8. Your biggest blocker?",
    subtitle: "What has been stopping you until now?",
    options: [
      { label: "Money", icon: "💸", desc: "Budget constraints for tools or coaching" },
      { label: "Time", icon: "⏰", desc: "Busy schedule with existing commitments" },
      { label: "Confusion", icon: "❓", desc: "Too much conflicting advice on YouTube" },
      { label: "Failed before", icon: "💔", desc: "Afraid of repeating past mistakes" },
      { label: "No tools", icon: "🛠️", desc: "Lack of PC, software, or workflow prompts" },
    ],
  },
];

export default function CustomPriceForm() {
  const [currentStep, setCurrentStep] = useState(0); // 0 to 8: questions, 8 is final contact step
  const [answers, setAnswers] = useState<Record<string, string>>({
    goal: "",
    currentStage: "",
    incomeSituation: "",
    pressure: "",
    startBudget: "",
    environment: "",
    timePerWeek: "",
    blocker: "",
  });

  const [notes, setNotes] = useState("");
  const [fullName, setFullName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const totalSteps = QUESTIONS.length + 1; // 8 questions + 1 contact step = 9 steps
  const progressPercent = Math.round(((currentStep + 1) / totalSteps) * 100);

  const handleSelectOption = (questionId: string, label: string) => {
    audioService.playDuolingoSelect();
    setAnswers((prev) => ({ ...prev, [questionId]: label }));

    // Smooth auto-advance to next question
    setTimeout(() => {
      if (currentStep < totalSteps - 1) {
        setCurrentStep((prev) => prev + 1);
      }
    }, 280);
  };

  const handleNext = () => {
    audioService.playHoverTone();
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    audioService.playHoverTone();
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !whatsapp.trim()) {
      setErrorMsg("Please enter both your name and WhatsApp number.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");
    audioService.playDuolingoSuccess();

    try {
      const res = await fetch("/api/custom-price-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          phone: whatsapp,
          answers,
          notes,
        }),
      });

      const data = await res.json();
      if (data.success && data.whatsappUrl) {
        setIsSuccess(true);
        window.open(data.whatsappUrl, "_blank");
      } else {
        setErrorMsg(data.error || "Submission failed. Please try again.");
      }
    } catch {
      const fallbackMsg = `*Custom Price Application:* Name: ${fullName}, WhatsApp: ${whatsapp}, Goal: ${answers.goal}, Budget: ${answers.startBudget}`;
      window.open(`https://wa.me/923274532186?text=${encodeURIComponent(fallbackMsg)}`, "_blank");
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isQuestionStep = currentStep < QUESTIONS.length;
  const activeQuestion = isQuestionStep ? QUESTIONS[currentStep] : null;
  const currentAnswer = activeQuestion ? answers[activeQuestion.id] : null;

  return (
    <div id="custom-price" className="w-full max-w-[680px] mx-auto my-12 px-4 sm:px-0">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-[11px] font-mono font-bold tracking-[0.25em] text-[#E5A93C] uppercase mb-3">
          NOT A CHECKOUT — A CONVERSATION
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.05]">
          Get a custom price.<br />
          <span className="text-[#60A5FA]">built around your life</span>
        </h2>

        {/* Mentor Note Box */}
        <div className="mt-5 p-4 sm:p-5 rounded-xl bg-[#0D0E12] border border-[#2B2D38] text-center max-w-[580px] mx-auto shadow-xl">
          <div className="text-xs sm:text-sm font-bold text-white mb-1">
            This isn&apos;t a fixed sticker price.
          </div>
          <p className="text-xs text-[#A2A4B0] leading-relaxed">
            Tell me your real situation, like you&apos;d tell a mentor. Abrar reviews it personally and sends back a custom price and plan that fits your budget, your time and where you are in life.
          </p>
        </div>
      </div>

      {/* Duolingo-Style Card Container */}
      <div className="rounded-2xl bg-[#0C0D11] border border-[#222228] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Top Progress Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-2">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`flex items-center gap-1 font-bold transition-all ${
                currentStep === 0
                  ? "opacity-20 cursor-not-allowed text-gray-600"
                  : "text-white hover:text-amber-400 cursor-pointer"
              }`}
            >
              ← Back
            </button>
            <span className="font-bold text-white">
              Step {currentStep + 1} of {totalSteps}
            </span>
            <span className="text-emerald-400 font-bold">{progressPercent}%</span>
          </div>

          {/* Animated Progress Bar */}
          <div className="w-full h-2.5 bg-[#1C1D24] rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-[#22C55E] to-emerald-400 rounded-full transition-all duration-300 ease-out shadow-[0_0_12px_rgba(34,197,94,0.4)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Step Content: Question Mode */}
        {isQuestionStep && activeQuestion && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {activeQuestion.title}
              </h3>
              {activeQuestion.subtitle && (
                <p className="text-xs text-gray-400 mt-1">{activeQuestion.subtitle}</p>
              )}
            </div>

            {/* Duolingo-style Tactile 3D Cards Grid */}
            <div className="grid grid-cols-1 gap-3">
              {activeQuestion.options.map((opt) => {
                const isSelected = currentAnswer === opt.label;
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => handleSelectOption(activeQuestion.id, opt.label)}
                    className={`w-full p-4 rounded-xl text-left flex items-center justify-between transition-all duration-150 transform cursor-pointer border-2 ${
                      isSelected
                        ? "bg-white text-black border-white border-b-4 border-b-emerald-500 shadow-[0_0_20px_rgba(255,255,255,0.25)] scale-[1.01]"
                        : "bg-[#141418] text-white border-[#26262D] border-b-4 border-b-[#1C1C22] hover:border-[#444450] hover:bg-[#1A1A20] active:border-b-2 active:translate-y-0.5"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="text-2xl">{opt.icon}</span>
                      <div>
                        <div className={`font-bold text-sm ${isSelected ? "text-black" : "text-white"}`}>
                          {opt.label}
                        </div>
                        {opt.desc && (
                          <div className={`text-xs mt-0.5 ${isSelected ? "text-gray-700" : "text-gray-400"}`}>
                            {opt.desc}
                          </div>
                        )}
                      </div>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                        isSelected
                          ? "bg-emerald-500 border-emerald-500 text-white"
                          : "border-gray-600 bg-transparent"
                      }`}
                    >
                      {isSelected ? "✓" : ""}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Continue Button if answered */}
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                disabled={!currentAnswer}
                className="px-6 py-3 rounded-xl bg-white text-black font-black text-xs uppercase tracking-wider hover:bg-gray-200 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* Step 9: Final Contact Details & Submission */}
        {!isQuestionStep && (
          <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
            <div>
              <div className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider mb-1">
                🎉 ALMOST DONE
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Tell Abrar how to send your custom plan
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Every submission is reviewed personally to calculate your custom price.
              </p>
            </div>

            {/* Story Notes */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-300">
                9. Anything else Abrar should know? (Optional)
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Your story in a line or two — where you are, what you've tried, what you need."
                className="w-full p-3.5 rounded-xl bg-[#121216] border border-[#282830] text-white text-xs placeholder-gray-500 focus:outline-none focus:border-white transition-all resize-y"
              />
            </div>

            {/* Contact Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ali Khan"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#121216] border border-[#282830] text-white text-xs placeholder-gray-500 focus:outline-none focus:border-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 03xx-xxxxxxx"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#121216] border border-[#282830] text-white text-xs placeholder-gray-500 focus:outline-none focus:border-white transition-all"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-950/50 border border-red-500/40 text-red-300 text-xs text-center font-bold">
                {errorMsg}
              </div>
            )}

            {isSuccess && (
              <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs text-center font-semibold space-y-1">
                <div>✓ Application Received! Opening WhatsApp...</div>
                <div className="text-[11px] text-gray-300">
                  If WhatsApp didn&apos;t open automatically,{" "}
                  <a
                    href={`https://wa.me/923274532186?text=Hi%20Abrar,%20I%20have%20submitted%20my%20situation%20for%20a%20custom%20price.%20Name:%20${encodeURIComponent(
                      fullName
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-emerald-400 font-bold"
                  >
                    click here to message Abrar directly
                  </a>.
                </div>
              </div>
            )}

            {/* Duolingo Chunky 3D Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-[#22C55E] hover:bg-[#1EA750] text-black font-black text-sm tracking-wide border-b-4 border-b-[#15803D] active:border-b-2 active:translate-y-1 shadow-lg shadow-emerald-500/25 transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting
                  ? "Submitting Your Plan..."
                  : "Send my situation — get my custom price on WhatsApp →"}
              </button>
              <div className="text-center text-[11px] text-gray-500 mt-3">
                Abrar reviews every submission personally. No spam — just a plan and a price made for you.
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
