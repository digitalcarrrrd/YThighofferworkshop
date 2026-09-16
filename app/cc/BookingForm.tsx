"use client";

import { useState } from "react";
import styles from "./page.module.css";

export const V4_PACKAGES = [
  {
    id: "10-Day Fast Entry — Creator Residency (PKR 100,000)",
    sprint: "10 Days",
    tier: "Creator Residency",
    name: "10-Day Creator Residency",
    price: "PKR 100,000",
    rate: "PKR 10,000/day",
    badge: "Fast Entry",
    summary: "Stay + Food + Housekeeping + 5 execution calls in 90 days",
  },
  {
    id: "10-Day Fast Entry — Lahore Local Operator (PKR 60,000)",
    sprint: "10 Days",
    tier: "Lahore Local Operator",
    name: "10-Day Local Operator",
    price: "PKR 60,000",
    rate: "PKR 6,000/day",
    badge: "Local Pass",
    summary: "Day access only (no stay/meals) + 1 execution call/month",
  },
  {
    id: "15-Day Best Value — Creator Residency (PKR 140,000)",
    sprint: "15 Days",
    tier: "Creator Residency",
    name: "15-Day Creator Residency",
    price: "PKR 140,000",
    rate: "≈ PKR 9,333/day",
    badge: "Most Popular",
    popular: true,
    summary: "Best value: Multiple build/review cycles + 7 execution calls in 90 days",
  },
  {
    id: "15-Day Best Value — Lahore Local Operator (PKR 80,000)",
    sprint: "15 Days",
    tier: "Lahore Local Operator",
    name: "15-Day Local Operator",
    price: "PKR 80,000",
    rate: "≈ PKR 5,333/day",
    badge: "Local Value",
    summary: "Extended day access + sprint repetitions + 1 execution call/month",
  },
  {
    id: "30-Day Deep Systemization — Waitlist",
    sprint: "30 Days",
    tier: "Creator Residency",
    name: "30-Day Residency (Waitlist)",
    price: "Waitlist Only",
    rate: "Currently Capped",
    badge: "Waitlist",
    summary: "Maximum data-training cycles + 10 execution calls in 90 days",
  },
];

type Status = { type: "idle" | "error" | "success"; message?: string; reference?: string };

interface BookingFormProps {
  initialPackage?: string;
}

export function BookingForm({ initialPackage = "15-Day Best Value — Creator Residency (PKR 140,000)" }: BookingFormProps) {
  const [selectedPkg, setSelectedPkg] = useState<string>(initialPackage);
  const [sprintChoice, setSprintChoice] = useState<string>("15 Days");
  const [accessChoice, setAccessChoice] = useState<string>("Creator Residency");
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const [busy, setBusy] = useState(false);

  // Sync sprint and access changes to selectedPkg
  function handleSprintChange(sprint: string) {
    setSprintChoice(sprint);
    if (sprint === "30 Days — Waitlist") {
      setSelectedPkg("30-Day Deep Systemization — Waitlist");
      return;
    }
    const match = V4_PACKAGES.find(
      (p) => p.sprint === sprint && p.tier === accessChoice
    );
    if (match) setSelectedPkg(match.id);
  }

  function handleAccessChange(access: string) {
    setAccessChoice(access);
    if (sprintChoice === "30 Days — Waitlist") {
      setSelectedPkg("30-Day Deep Systemization — Waitlist");
      return;
    }
    const match = V4_PACKAGES.find(
      (p) => p.sprint === sprintChoice && p.tier === access
    );
    if (match) setSelectedPkg(match.id);
  }

  function selectDirectPackage(pkgId: string) {
    setSelectedPkg(pkgId);
    const found = V4_PACKAGES.find((p) => p.id === pkgId);
    if (found) {
      setSprintChoice(found.sprint === "30 Days" ? "30 Days — Waitlist" : found.sprint);
      setAccessChoice(found.tier);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setStatus({ type: "idle" });

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    payload.package = selectedPkg;

    try {
      const response = await fetch("/api/content-colony-prebooking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { ok?: boolean; error?: string; reference?: string };

      if (!response.ok) {
        throw new Error(data.error || "Your application could not be submitted. Please verify all fields.");
      }

      setStatus({
        type: "success",
        message:
          "Whitelist application logged. Our team reviews your build and bottleneck within 24–48 hours. Shortlisted creators will receive a WhatsApp screening call to confirm dates and fit. No payment is required until formally approved.",
        reference: data.reference || `CC-${Date.now().toString().slice(-6)}`,
      });
      form.reset();
    } catch (err) {
      setStatus({
        type: "error",
        message: err instanceof Error ? err.message : "Something went wrong. Please check your connection or contact us.",
      });
    } finally {
      setBusy(false);
    }
  }

  if (status.type === "success") {
    return (
      <div className={styles.successPanel}>
        <div className={styles.successIcon}>✓</div>
        <div className={styles.eyebrow} style={{ marginBottom: "8px" }}>APPLICATION LOGGED</div>
        <h3>Your Profile is in Review</h3>
        <p className={styles.successDesc}>{status.message}</p>
        <div className={styles.successRef}>
          REFERENCE ID: <strong>{status.reference}</strong>
        </div>
        <div className={styles.successGuide}>
          <strong>Next Steps:</strong>
          <br />
          1. <strong>Review:</strong> Team reviews your channel/system bottleneck.
          <br />
          2. <strong>Screening Call:</strong> Shortlisted applicants receive a WhatsApp interview (+92) to confirm dates &amp; living arrangements.
          <br />
          3. <strong>Approval &amp; Confirmation:</strong> Payment is only processed after formal seat approval.
        </div>
        <button
          type="button"
          className={styles.btnSecondary}
          onClick={() => setStatus({ type: "idle" })}
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <div className={styles.bookingWrap}>
      <form onSubmit={handleSubmit} className={styles.applyForm}>
        <div className={styles.formHeading}>
          <span className={styles.eyebrow}>DOOR 02 — WHITELIST RESERVATION</span>
          <h3>Apply for Content Colony</h3>
          <p>
            No payment is required to submit. We first check fit, seriousness, dates,
            and accommodation availability. Cohort is strictly capped at 15 active operators.
          </p>
        </div>

        {/* 4-Step Flow Indicator */}
        <div className={styles.applyFlow}>
          <div className={styles.applyStep}>
            <b>STEP 01</b>
            <span>Fill the Form</span>
          </div>
          <div className={styles.applyStep}>
            <b>STEP 02</b>
            <span>Screening Call</span>
          </div>
          <div className={styles.applyStep}>
            <b>STEP 03</b>
            <span>Approval</span>
          </div>
          <div className={styles.applyStep}>
            <b>STEP 04</b>
            <span>Seat Confirmed</span>
          </div>
        </div>

        {/* Package Selector Cards */}
        <div className={styles.pkgChoiceWrap}>
          <label className={styles.fieldTitle}>Select Sprint &amp; Access Tier *</label>
          <div className={styles.pkgCardsGrid}>
            {V4_PACKAGES.map((pkg) => {
              const isSelected = selectedPkg === pkg.id;
              return (
                <button
                  type="button"
                  key={pkg.id}
                  onClick={() => selectDirectPackage(pkg.id)}
                  className={`${styles.pkgCardBtn} ${isSelected ? styles.pkgCardSelected : ""}`}
                >
                  <div className={styles.pkgCardTop}>
                    <span className={styles.pkgBadge}>{pkg.badge}</span>
                    <span className={styles.pkgRate}>{pkg.rate}</span>
                  </div>
                  <div className={styles.pkgName}>{pkg.name}</div>
                  <div className={styles.pkgPrice}>{pkg.price}</div>
                  <div className={styles.pkgSummary}>{pkg.summary}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Core Applicant Info */}
        <div className={styles.formGrid}>
          <div className={styles.formField}>
            <label className={styles.fieldTitle} htmlFor="fullName">Full Name *</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              placeholder="e.g. Hamza Tariq"
              className={styles.formInput}
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.fieldTitle} htmlFor="city">City / Location *</label>
            <input
              id="city"
              name="city"
              type="text"
              required
              placeholder="e.g. Lahore, Karachi, Islamabad"
              className={styles.formInput}
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.fieldTitle} htmlFor="phone">WhatsApp Phone Number *</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="0300 1234567 or +923001234567"
              className={styles.formInput}
            />
            <span className={styles.fieldHint}>Used for screening call alignment</span>
          </div>

          <div className={styles.formField}>
            <label className={styles.fieldTitle} htmlFor="email">Email Address *</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@domain.com"
              className={styles.formInput}
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.fieldTitle} htmlFor="sprintChoice">Sprint Duration *</label>
            <select
              id="sprintChoice"
              value={sprintChoice}
              onChange={(e) => handleSprintChange(e.target.value)}
              className={styles.formSelect}
            >
              <option value="10 Days">10 Days — Fast Entry</option>
              <option value="15 Days">15 Days — Best Value (Featured)</option>
              <option value="30 Days — Waitlist">30 Days — Deep Systemization (Waitlist)</option>
            </select>
          </div>

          <div className={styles.formField}>
            <label className={styles.fieldTitle} htmlFor="accessChoice">Access Type *</label>
            <select
              id="accessChoice"
              value={accessChoice}
              onChange={(e) => handleAccessChange(e.target.value)}
              className={styles.formSelect}
            >
              <option value="Creator Residency">Creator Residency (Stay + Food + Housekeeping + Coffee)</option>
              <option value="Lahore Local Operator">Lahore Local Operator (Day-Pass Only · No Stay/Food)</option>
            </select>
          </div>
        </div>

        {/* Selective Deep-Dive Questions */}
        <div className={styles.formSectionTitle}>
          <span>OPERATING DIAGNOSIS</span>
          <h4>Tell Us About Your Work</h4>
        </div>

        <div className={styles.formStacked}>
          <div className={styles.formField}>
            <label className={styles.fieldTitle} htmlFor="currentBuild">What are you currently building? *</label>
            <select
              id="currentBuild"
              name="currentBuild"
              required
              defaultValue=""
              className={styles.formSelect}
            >
              <option value="" disabled>Select your current primary build</option>
              <option value="YouTube Faceless / Automation System">YouTube Faceless / Automation Channels</option>
              <option value="Personal Brand & Authority YouTube Channel">Personal Brand &amp; Authority YouTube Channel</option>
              <option value="AI Content Agency / Production House">AI Content Agency / Production House</option>
              <option value="AI Agents & Automated Scraping/Research Systems">AI Agents &amp; Automated Scraping/Research Systems</option>
              <option value="Digital Products / Software / Education Funnels">Digital Products / Software / Education Funnels</option>
              <option value="Other High-Output Content Business">Other High-Output Media Business</option>
            </select>
          </div>

          <div className={styles.formField}>
            <label className={styles.fieldTitle} htmlFor="bottleneck">What is your biggest current bottleneck? *</label>
            <select
              id="bottleneck"
              name="bottleneck"
              required
              defaultValue=""
              className={styles.formSelect}
            >
              <option value="" disabled>Select primary bottleneck</option>
              <option value="Every video feels like a fresh project instead of a repeatable system">Every video feels like a fresh project instead of a repeatable system</option>
              <option value="Too many AI tools and prompts, not enough operating logic">Too many AI tools and prompts, not enough operating logic</option>
              <option value="Working alone — execution energy dies without live momentum">Working alone — execution energy dies without live momentum</option>
              <option value="Packaging & retention leaks (Low CTR or watch time drop-off)">Packaging &amp; retention leaks (Low CTR or watch time drop-off)</option>
              <option value="Editor/team delegation and QA breakdowns">Editor/team delegation and QA breakdowns</option>
              <option value="Scattered focus across too many models without finishing one">Scattered focus across too many models without finishing one</option>
            </select>
          </div>

          <div className={styles.formField}>
            <label className={styles.fieldTitle} htmlFor="successDefinition">Why do you feel Content Colony could be the missing layer for you? *</label>
            <select
              id="successDefinition"
              name="successDefinition"
              required
              defaultValue=""
              className={styles.formSelect}
            >
              <option value="" disabled>Select your core expectation</option>
              <option value="Need a live environment that forces daily execution momentum">Need a live environment that forces daily execution momentum</option>
              <option value="Want to build a data-trained AI agent pipeline for my specific niche">Want to build a data-trained AI agent pipeline for my specific niche</option>
              <option value="Need direct expert reviews from Abrar on business model & algorithms">Need direct expert reviews from Abrar on business model &amp; algorithms</option>
              <option value="Want to leave with batch-produced assets and proven operating SOPs">Want to leave with batch-produced assets and proven operating SOPs</option>
              <option value="Need post-sprint accountability calls so the system survives after leaving">Need post-sprint accountability calls so the system survives after leaving</option>
            </select>
          </div>
        </div>

        {/* Agreements & Consent */}
        <div className={styles.consentWrap}>
          <label className={styles.consentLabel}>
            <input name="acknowledgement" type="checkbox" value="accepted" defaultChecked required />
            <span>
              I understand that <strong>Content Colony is application-only</strong>. Submitting this form does not charge me. I agree not to send payment until formally approved after the screening call.
            </span>
          </label>

          <label className={styles.consentLabel}>
            <input name="consent" type="checkbox" value="accepted" defaultChecked required />
            <span>
              I consent to receive screening call scheduling and application status updates via WhatsApp and email.
            </span>
          </label>
        </div>

        {/* Anti-spam honeypot */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className={styles.honeypot} aria-hidden="true" />

        {status.type === "error" && (
          <div className={styles.formError} role="alert">
            {status.message}
          </div>
        )}

        <button disabled={busy} type="submit" className={styles.formSubmitBtn}>
          {busy ? "Processing Application..." : "Submit Whitelist Application →"}
        </button>

        <p className={styles.formNote}>
          15 Active Operators Max · 10 Residential + 5 Local · Johar Town, Lahore
        </p>
      </form>
    </div>
  );
}
