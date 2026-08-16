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
  const [currentStep, setCurrentStep] = useState(0);
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

  const totalSteps = QUESTIONS.length + 1; // 8 questions + 1 contact step = 9
  const progressPercent = Math.round(((currentStep + 1) / totalSteps) * 100);

  const handleSelectOption = (questionId: string, label: string) => {
    audioService.playDuolingoSelect();
    setAnswers((prev) => ({ ...prev, [questionId]: label }));

    setTimeout(() => {
      if (currentStep < totalSteps - 1) {
        setCurrentStep((prev) => prev + 1);
      }
    }, 250);
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
    <div id="custom-price" style={{ width: "100%", maxWidth: "720px", margin: "60px auto 40px", padding: "0 20px" }}>
      {/* Header Section */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <div style={{ fontSize: "12px", fontFamily: "monospace", fontWeight: 800, letterSpacing: "0.28em", color: "#F59E0B", textTransform: "uppercase", marginBottom: "12px" }}>
          NOT A CHECKOUT — A CONVERSATION
        </div>

        <h2 style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 900, color: "#FFFFFF", lineHeight: 1.08, letterSpacing: "-0.02em" }}>
          Get a custom price.<br />
          <span style={{ color: "#60A5FA" }}>built around your life</span>
        </h2>

        {/* Highlighted Mentor Note Box */}
        <div style={{ marginTop: "24px", padding: "20px 24px", borderRadius: "14px", background: "#111116", border: "1px solid #2C2C38", maxWidth: "600px", margin: "24px auto 0", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
          <div style={{ fontSize: "14px", fontWeight: 800, color: "#FFFFFF", marginBottom: "6px" }}>
            This isn&apos;t a fixed sticker price.
          </div>
          <p style={{ fontSize: "13px", color: "#B0B0BC", lineHeight: 1.6, margin: 0 }}>
            Tell me your real situation, like you&apos;d tell a mentor. Abrar reviews it personally and sends back a custom price and plan that fits your budget, your time and where you are in life.
          </p>
        </div>
      </div>

      {/* Main Duolingo Questionnaire Card */}
      <div style={{ background: "#0D0D12", border: "1px solid #262632", borderRadius: "20px", padding: "32px 28px", boxShadow: "0 20px 50px rgba(0,0,0,0.8)", position: "relative" }}>
        {/* Top Progress & Navigation Header */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "13px", fontFamily: "monospace", color: "#9CA3AF", marginBottom: "12px" }}>
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 0}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontWeight: 800,
                background: "transparent",
                border: "none",
                color: currentStep === 0 ? "#4B5563" : "#FFFFFF",
                cursor: currentStep === 0 ? "not-allowed" : "pointer",
                transition: "color 0.15s ease",
              }}
            >
              ← Back
            </button>

            <span style={{ fontWeight: 800, color: "#F3F4F6", fontSize: "14px" }}>
              Step {currentStep + 1} of {totalSteps}
            </span>

            <span style={{ color: "#10B981", fontWeight: 800 }}>{progressPercent}%</span>
          </div>

          {/* Animated Progress Bar */}
          <div style={{ width: "100%", height: "10px", background: "#1F1F2A", borderRadius: "9999px", overflow: "hidden", padding: "2px" }}>
            <div
              style={{
                width: `${progressPercent}%`,
                height: "100%",
                background: "linear-gradient(90deg, #10B981 0%, #22C55E 100%)",
                borderRadius: "9999px",
                transition: "width 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "0 0 12px rgba(34, 197, 94, 0.5)",
              }}
            />
          </div>
        </div>

        {/* Step Content: Question Mode */}
        {isQuestionStep && activeQuestion && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ marginBottom: "6px" }}>
              <h3 style={{ fontSize: "clamp(1.4rem, 3vw, 1.85rem)", fontWeight: 900, color: "#FFFFFF", lineHeight: 1.2, margin: 0 }}>
                {activeQuestion.title}
              </h3>
              {activeQuestion.subtitle && (
                <p style={{ fontSize: "13px", color: "#9CA3AF", marginTop: "6px", lineHeight: 1.5, margin: "6px 0 0" }}>
                  {activeQuestion.subtitle}
                </p>
              )}
            </div>

            {/* Tactile Option Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {activeQuestion.options.map((opt) => {
                const isSelected = currentAnswer === opt.label;
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => handleSelectOption(activeQuestion.id, opt.label)}
                    style={{
                      width: "100%",
                      padding: "16px 20px",
                      borderRadius: "14px",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                      border: isSelected ? "2px solid #FFFFFF" : "2px solid #2E2E3C",
                      borderBottomWidth: isSelected ? "4px" : "4px",
                      borderBottomColor: isSelected ? "#22C55E" : "#1E1E28",
                      background: isSelected ? "#FFFFFF" : "#14141B",
                      color: isSelected ? "#000000" : "#FFFFFF",
                      transform: isSelected ? "scale(1.01)" : "none",
                      boxShadow: isSelected ? "0 10px 25px rgba(255,255,255,0.15)" : "none",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <span style={{ fontSize: "28px", lineHeight: 1 }}>{opt.icon}</span>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: "15px", color: isSelected ? "#000000" : "#FFFFFF" }}>
                          {opt.label}
                        </div>
                        {opt.desc && (
                          <div style={{ fontSize: "12px", marginTop: "3px", color: isSelected ? "#4B5563" : "#9CA3AF" }}>
                            {opt.desc}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Circular Check Indicator */}
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        border: isSelected ? "2px solid #22C55E" : "2px solid #4B5563",
                        background: isSelected ? "#22C55E" : "transparent",
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        fontWeight: 900,
                        flexShrink: 0,
                      }}
                    >
                      {isSelected ? "✓" : ""}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Continue Button */}
            <div style={{ paddingTop: "12px", display: "flex", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={handleNext}
                disabled={!currentAnswer}
                style={{
                  padding: "12px 24px",
                  borderRadius: "12px",
                  background: "#FFFFFF",
                  color: "#000000",
                  fontWeight: 900,
                  fontSize: "13px",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  border: "none",
                  cursor: currentAnswer ? "pointer" : "not-allowed",
                  opacity: currentAnswer ? 1 : 0.35,
                  transition: "opacity 0.2s ease, transform 0.15s ease",
                }}
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* Step 9: Final Contact Submission Step */}
        {!isQuestionStep && (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <div style={{ fontSize: "12px", fontFamily: "monospace", color: "#10B981", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "4px" }}>
                🎉 ALMOST DONE
              </div>
              <h3 style={{ fontSize: "clamp(1.4rem, 3vw, 1.85rem)", fontWeight: 900, color: "#FFFFFF", lineHeight: 1.2, margin: 0 }}>
                Tell Abrar how to send your custom plan
              </h3>
              <p style={{ fontSize: "13px", color: "#9CA3AF", marginTop: "6px", lineHeight: 1.5, margin: "6px 0 0" }}>
                Every submission is reviewed personally to calculate your custom price.
              </p>
            </div>

            {/* Story Notes Input */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: 700, color: "#E5E7EB" }}>
                9. Anything else Abrar should know? (Optional)
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Your story in a line or two — where you are, what you've tried, what you need."
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  background: "#14141B",
                  border: "1px solid #2E2E3C",
                  color: "#FFFFFF",
                  fontSize: "13px",
                  lineHeight: 1.5,
                  outline: "none",
                  resize: "vertical",
                }}
              />
            </div>

            {/* Contact Inputs Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "13px", fontWeight: 700, color: "#E5E7EB" }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ali Khan"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: "12px",
                    background: "#14141B",
                    border: "1px solid #2E2E3C",
                    color: "#FFFFFF",
                    fontSize: "13px",
                    outline: "none",
                  }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "13px", fontWeight: 700, color: "#E5E7EB" }}>
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 03xx-xxxxxxx"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: "12px",
                    background: "#14141B",
                    border: "1px solid #2E2E3C",
                    color: "#FFFFFF",
                    fontSize: "13px",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            {errorMsg && (
              <div style={{ padding: "12px 16px", borderRadius: "10px", background: "rgba(185, 28, 28, 0.25)", border: "1px solid #EF4444", color: "#FCA5A5", fontSize: "13px", textAlign: "center", fontWeight: 700 }}>
                {errorMsg}
              </div>
            )}

            {isSuccess && (
              <div style={{ padding: "16px 20px", borderRadius: "12px", background: "rgba(16, 185, 129, 0.2)", border: "1px solid #10B981", color: "#6EE7B7", fontSize: "13px", textAlign: "center", fontWeight: 600 }}>
                <div>✓ Application Received! Opening WhatsApp...</div>
                <div style={{ fontSize: "12px", color: "#D1D5DB", marginTop: "4px" }}>
                  If WhatsApp didn&apos;t open,{" "}
                  <a
                    href={`https://wa.me/923274532186?text=Hi%20Abrar,%20I%20have%20submitted%20my%20situation%20for%20a%20custom%20price.%20Name:%20${encodeURIComponent(fullName)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "underline", color: "#34D399", fontWeight: 800 }}
                  >
                    click here to message Abrar
                  </a>.
                </div>
              </div>
            )}

            {/* Chunky 3D Submit Button */}
            <div style={{ paddingTop: "6px" }}>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: "100%",
                  padding: "18px 24px",
                  borderRadius: "14px",
                  background: "#22C55E",
                  color: "#000000",
                  fontWeight: 900,
                  fontSize: "15px",
                  letterSpacing: "0.02em",
                  border: "none",
                  borderBottom: "4px solid #15803D",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  boxShadow: "0 10px 30px rgba(34, 197, 94, 0.35)",
                  transition: "all 0.15s ease",
                  opacity: isSubmitting ? 0.6 : 1,
                }}
              >
                {isSubmitting
                  ? "Submitting Your Plan..."
                  : "Send my situation — get my custom price on WhatsApp →"}
              </button>
              <div style={{ textAlign: "center", fontSize: "12px", color: "#6B7280", marginTop: "12px" }}>
                Abrar reviews every submission personally. No spam — just a plan and a price made for you.
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
