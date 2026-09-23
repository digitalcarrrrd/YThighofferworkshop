"use client";

import { useState } from "react";
import styles from "./page.module.css";
import type { CCLanguage } from "./translations";

type Status = { type: "idle" | "error" | "success"; message?: string; reference?: string };

interface BookingFormProps {
  lang?: CCLanguage;
}

const bookingContent = {
  en: {
    eyebrow: "WHITELIST APPLICATION",
    headingLine1: "If this feels like the",
    headingLine2: "missing layer,",
    headingLine3: "apply.",
    lead: "No payment is required to submit the form. We first check fit, seriousness, dates and accommodation practicality.",
    step1: "Fill the form",
    step2: "Screening call",
    step3: "Approval",
    step4: "Payment plan + seat confirmation",
    note: "Future physical visits for Local Operators are not included and are charged separately.",
    namePlaceholder: "Full name",
    cityPlaceholder: "City",
    phonePlaceholder: "WhatsApp number (+92...)",
    emailPlaceholder: "Email address",
    chooseSprint: "Choose sprint",
    sprint10: "10 Days",
    sprint15: "15 Days",
    sprint30: "30 Days — Waitlist",
    chooseAccess: "Choose access",
    accessLocal: "Lahore Local Operator",
    accessRes: "Creator Residency — accommodation confirmed after call",
    buildPlaceholder: "What are you currently building?",
    bottleneckPlaceholder: "What is your biggest current bottleneck?",
    whyPlaceholder: "Why do you feel Content Colony could be the missing layer for you?",
    submitBtn: "Submit Whitelist Application →",
    submitting: "Submitting Application...",
    successEyebrow: "APPLICATION RECEIVED",
    successHeading: "Whitelist Application Logged",
    successAgain: "Submit Another Application",
  },
  roman: {
    eyebrow: "WHITELIST APPLICATION",
    headingLine1: "Agar lagta hai yahi",
    headingLine2: "missing layer hai,",
    headingLine3: "toh apply karein.",
    lead: "Form submit karne ke koi charges nahi hain. Pehle match, seriousness, dates aur accommodation practicalities check ki jaati hain.",
    step1: "Form bharein",
    step2: "Screening call",
    step3: "Approval",
    step4: "Fees plan + seat confirmation",
    note: "Local Operators ke liye baad ke physical visits alag se charge kiye jaate hain.",
    namePlaceholder: "Aapka poora naam",
    cityPlaceholder: "Shehar ka naam (e.g. Lahore, Karachi)",
    phonePlaceholder: "WhatsApp number (+92...)",
    emailPlaceholder: "Email address",
    chooseSprint: "Sprint muntakhib karein",
    sprint10: "10 Days",
    sprint15: "15 Days",
    sprint30: "30 Days — Waitlist",
    chooseAccess: "Access type choose karein",
    accessLocal: "Lahore Local Operator (Day Pass)",
    accessRes: "Creator Residency (Rehaish & Khana Shamil)",
    buildPlaceholder: "Aap is waqt kya build ya create kar rahe hain?",
    bottleneckPlaceholder: "Aapka sab se bara bottleneck ya masla kya hai?",
    whyPlaceholder: "Aapko kyun lagta hai ke Content Colony aapke liye zaroori step hai?",
    submitBtn: "Whitelist Application Bhein →",
    submitting: "Application Bheji Ja Rahi Hai...",
    successEyebrow: "APPLICATION RECEIVED",
    successHeading: "Application Moosool Ho Gayi",
    successAgain: "Doosri Application Bhein",
  },
  ur: {
    eyebrow: "وائٹ لسٹ درخواست",
    headingLine1: "اگر آپ کو لگتا ہے کہ",
    headingLine2: "یہی مطلوبہ اگلا قدم ہے،",
    headingLine3: "تو ابھی درخواست دیں۔",
    lead: "فارم جمع کروانے کے لیے کوئی فیس درکار نہیں۔ ہم پہلے مطابقت، سنجیدگی، تاریخیں اور رہائشی سہولیات کی تصدیق کرتے ہیں۔",
    step1: "فارم پر کریں",
    step2: "اسکریننگ کال",
    step3: "منظوری",
    step4: "فیس پلان اور نشست کی تصدیق",
    note: "لوکل آپریٹرز کے لیے بعد کے فزیکل وزٹس الگ سے چارج کیے جائیں گے۔",
    namePlaceholder: "پورا نام",
    cityPlaceholder: "شہر کا نام (مثلاً لاہور، کراچی)",
    phonePlaceholder: "واٹس ایپ نمبر (+92...)",
    emailPlaceholder: "ای میل ایڈریس",
    chooseSprint: "سپرنٹ کا انتخاب کریں",
    sprint10: "10 روزہ سپرنٹ",
    sprint15: "15 روزہ سپرنٹ",
    sprint30: "30 روزہ — ویٹ لسٹ",
    chooseAccess: "رسائی کی نوعیت منتخب کریں",
    accessLocal: "لاہور لوکل آپریٹر (ڈے پاس)",
    accessRes: "کریئیٹر ریزیڈنسی (رہائش اور کھانا شامل)",
    buildPlaceholder: "آپ اس وقت کس پروجیکٹ یا چینل پر کام کر رہے ہیں؟",
    bottleneckPlaceholder: "اس وقت آپ کی پروڈکشن یا بزنس کی سب سے بڑی رکاوٹ کیا ہے؟",
    whyPlaceholder: "آپ کے خیال میں کنٹینٹ کالونی آپ کی گروتھ کے لیے کیوں ضروری ہے؟",
    submitBtn: "وائٹ لسٹ درخواست جمع کروائیں ←",
    submitting: "درخواست جمع ہو رہی ہے...",
    successEyebrow: "درخواست موصول ہو گئی",
    successHeading: "وائٹ لسٹ درخواست درج کر لی گئی",
    successAgain: "ایک اور درخواست جمع کروائیں",
  },
};

export function BookingForm({ lang = "en" }: BookingFormProps) {
  const [sprint, setSprint] = useState<string>("");
  const [access, setAccess] = useState<string>("");
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const [busy, setBusy] = useState(false);
  const t = bookingContent[lang] || bookingContent.en;

  function resolvePackageName(chosenSprint: string, chosenAccess: string): string {
    if (chosenSprint === "30 Days — Waitlist" || chosenSprint === "30 روزہ — ویٹ لسٹ") {
      return "30-Day Deep Systemization — Waitlist";
    }
    if (chosenSprint === "10 Days" || chosenSprint === "10 روزہ سپرنٹ") {
      return chosenAccess.includes("Local") || chosenAccess.includes("لوکل")
        ? "10-Day Fast Entry — Lahore Local Operator (PKR 60,000)"
        : "10-Day Fast Entry — Creator Residency (PKR 100,000)";
    }
    // Default 15 Days
    return chosenAccess.includes("Local") || chosenAccess.includes("لوکل")
      ? "15-Day Best Value — Lahore Local Operator (PKR 80,000)"
      : "15-Day Best Value — Creator Residency (PKR 140,000)";
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setStatus({ type: "idle" });

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    const selectedPkg = resolvePackageName(
      (payload.sprint as string) || sprint || "15 Days",
      (payload.access as string) || access || "Creator Residency"
    );

    payload.package = selectedPkg;
    payload.acknowledgement = "accepted";
    payload.consent = "accepted";

    try {
      const response = await fetch("/api/content-colony-prebooking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { ok?: boolean; error?: string; reference?: string };

      if (!response.ok) {
        throw new Error(data.error || "Please verify that all application fields are filled correctly.");
      }

      setStatus({
        type: "success",
        message:
          lang === "roman"
            ? "Whitelist application moosool ho gayi hai. Hamari team 24-48 ghanton ke andar review karti hai aur shortlisted creators se WhatsApp par 15-minute alignment call schedule ki jaati hai."
            : lang === "ur"
            ? "آپ کی وائٹ لسٹ درخواست موصول ہو چکی ہے۔ ہماری ٹیم 24 سے 48 گھنٹوں میں جائزہ لے گی اور منتخب افراد سے واٹس ایپ پر رابطہ کیا جائے گا۔"
            : "Whitelist application received. Our admissions team reviews your build and bottleneck within 24–48 hours. Shortlisted creators are contacted on WhatsApp for a 15-minute screening alignment call.",
        reference: data.reference || `CC-${Date.now().toString().slice(-6)}`,
      });
      form.reset();
      setSprint("");
      setAccess("");
    } catch (err) {
      setStatus({
        type: "error",
        message: err instanceof Error ? err.message : "Submission error. Please check your network and try again.",
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={styles.applyGrid}>
      {/* Left Info Column */}
      <div className={styles.applyInfo}>
        <div className={styles.applyEyebrow}>{t.eyebrow}</div>
        <h2 className={styles.applyHeading}>
          {t.headingLine1}<br />
          {t.headingLine2}<br />
          {t.headingLine3}
        </h2>
        <p className={styles.applyLead}>
          {t.lead}
        </p>

        <div className={styles.applyStepsGrid}>
          <div className={styles.applyStepCard}>
            <span className={styles.stepNum}>STEP 01</span>
            <span className={styles.stepText}>{t.step1}</span>
          </div>
          <div className={styles.applyStepCard}>
            <span className={styles.stepNum}>STEP 02</span>
            <span className={styles.stepText}>{t.step2}</span>
          </div>
          <div className={styles.applyStepCard}>
            <span className={styles.stepNum}>STEP 03</span>
            <span className={styles.stepText}>{t.step3}</span>
          </div>
          <div className={styles.applyStepCard}>
            <span className={styles.stepNum}>STEP 04</span>
            <span className={styles.stepText}>{t.step4}</span>
          </div>
        </div>

        <p className={styles.applyNote}>
          {t.note}
        </p>
      </div>

      {/* Right Form Column */}
      <div className={styles.applyFormBox}>
        {status.type === "success" ? (
          <div className={styles.successPanel}>
            <div className={styles.successIcon}>✓</div>
            <div className={styles.eyebrow} style={{ marginBottom: "8px", color: "var(--warm)" }}>
              {t.successEyebrow}
            </div>
            <h3>{t.successHeading}</h3>
            <p className={styles.successDesc}>{status.message}</p>
            <div className={styles.successRef}>
              REFERENCE ID: <strong>{status.reference}</strong>
            </div>
            <div className={styles.successGuide}>
              <strong>Next Steps:</strong>
              <br />
              1. Profile &amp; channel bottleneck audit by Abrar Nadir&apos;s team.
              <br />
              2. Shortlisted creators receive a WhatsApp screening message to coordinate interview timing.
              <br />
              3. Seat confirmation and payment plan are finalized only after mutual approval.
            </div>
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={() => setStatus({ type: "idle" })}
              style={{ width: "100%", marginTop: "14px" }}
            >
              {t.successAgain}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.compactForm}>
            {/* Row 1: Full name + City */}
            <div className={styles.formRowTwo}>
              <input
                name="fullName"
                type="text"
                required
                placeholder={t.namePlaceholder}
                className={styles.warmInput}
              />
              <input
                name="city"
                type="text"
                required
                placeholder={t.cityPlaceholder}
                className={styles.warmInput}
              />
            </div>

            {/* Row 2: WhatsApp Phone + Email */}
            <div className={styles.formRowTwo}>
              <input
                name="phone"
                type="tel"
                required
                placeholder={t.phonePlaceholder}
                className={styles.warmInput}
              />
              <input
                name="email"
                type="email"
                required
                placeholder={t.emailPlaceholder}
                className={styles.warmInput}
              />
            </div>

            {/* Row 3: Choose sprint + Choose access */}
            <div className={styles.formRowTwo}>
              <select
                name="sprint"
                required
                value={sprint}
                onChange={(e) => setSprint(e.target.value)}
                className={styles.warmSelect}
              >
                <option value="" disabled>{t.chooseSprint}</option>
                <option value="10 Days">{t.sprint10}</option>
                <option value="15 Days">{t.sprint15}</option>
                <option value="30 Days — Waitlist">{t.sprint30}</option>
              </select>

              <select
                name="access"
                required
                value={access}
                onChange={(e) => setAccess(e.target.value)}
                className={styles.warmSelect}
              >
                <option value="" disabled>{t.chooseAccess}</option>
                <option value="Lahore Local Operator">{t.accessLocal}</option>
                <option value="Creator Residency">{t.accessRes}</option>
              </select>
            </div>

            {/* Row 4: What are you currently building? */}
            <input
              name="currentBuild"
              type="text"
              required
              placeholder={t.buildPlaceholder}
              className={styles.warmInputFull}
            />

            {/* Row 5: What is your biggest current bottleneck? */}
            <textarea
              name="bottleneck"
              required
              placeholder={t.bottleneckPlaceholder}
              className={styles.warmTextarea}
            />

            {/* Row 6: Why do you feel Content Colony could be the missing layer for you? */}
            <textarea
              name="successDefinition"
              required
              placeholder={t.whyPlaceholder}
              className={styles.warmTextarea}
            />

            {/* Honeypot */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className={styles.honeypot}
              aria-hidden="true"
            />

            {status.type === "error" && (
              <div className={styles.formError} role="alert">
                {status.message}
              </div>
            )}

            {/* Submit Button */}
            <button
              disabled={busy}
              type="submit"
              className={styles.warmSubmitBtn}
            >
              {busy ? t.submitting : t.submitBtn}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
