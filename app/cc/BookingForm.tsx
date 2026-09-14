"use client";

import { useState } from "react";
import styles from "./page.module.css";

export const V3_PACKAGES = [
  {
    id: "7-Day Sprint — PKR 100,000",
    name: "7-Day Sprint",
    price: "PKR 100,000",
    rate: "PKR 14,286/day",
    duration: "7 nights / 8 days",
    badge: "Fast Breakthrough",
    summary: "1 problem solved, 1 finished outcome, up to 7 hrs Abrar 1:1 + 1 Zahid review",
  },
  {
    id: "14-Day Build Sprint — PKR 180,000",
    name: "14-Day Build Sprint",
    price: "PKR 180,000",
    rate: "PKR 12,857/day",
    duration: "14 nights / 15 days",
    badge: "MOST POPULAR",
    popular: true,
    summary: "Build, test, feedback & improve. Save PKR 20K. 2 Zahid reviews + 2 execution cycles",
  },
  {
    id: "30-Day Creator Residency — PKR 300,000",
    name: "30-Day Creator Residency",
    price: "PKR 300,000",
    rate: "PKR 10,000/day",
    duration: "30 nights / 31 days",
    badge: "BEST VALUE",
    bestValue: true,
    summary: "Full operating transformation. Save ~PKR 100K. Up to 10 hrs Abrar + 3 Zahid reviews",
  },
];

type Status = { type: "idle" | "error" | "success"; message?: string; reference?: string };

interface BookingFormProps {
  initialPackage?: string;
}

export function BookingForm({ initialPackage = "14-Day Build Sprint — PKR 180,000" }: BookingFormProps) {
  const [selectedPkg, setSelectedPkg] = useState<string>(initialPackage);
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setStatus({ type: "idle" });

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    // Ensure selected package is included
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
          "Application received! Our admissions team will review your profile within 24–48 hours. Selected candidates are contacted directly on WhatsApp for a short alignment interview. Please DO NOT send any payment until your application is formally accepted.",
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
      <div className={styles.successBox}>
        <div className={styles.successIcon}>✓</div>
        <div className={styles.successBadge}>APPLICATION LOGGED</div>
        <h3 className={styles.successTitle}>Your Application is in Review</h3>
        <p className={styles.successDesc}>{status.message}</p>
        <div className={styles.refTag}>
          <span>Reference ID:</span> <strong>{status.reference}</strong>
        </div>
        <div className={styles.successNotice}>
          <p>
            <strong>What happens next:</strong>
            <br />
            1. We evaluate your current channel/system bottleneck.
            <br />
            2. If shortlisted, Abrar&apos;s team will reach out via WhatsApp (+92) to confirm dates and seat availability.
            <br />
            3. Any optional screening deposit (PKR 2,500) is only requested upon shortlisting and is 100% credited against your residency balance.
          </p>
        </div>
        <button
          type="button"
          className={styles.resetBtn}
          onClick={() => setStatus({ type: "idle" })}
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <form className={styles.bookingForm} onSubmit={handleSubmit}>
      <div className={styles.formHeader}>
        <span className={styles.formTag}>FOUNDING COHORT APPLICATION</span>
        <h3>Reserve Your Execution Residency</h3>
        <p>
          Select your sprint duration, outline your current bottleneck, and apply.
          Seats are strictly limited to maintain 1:1 expert density.
        </p>
      </div>

      {/* Package Selector */}
      <div className={styles.packageSelectorWrap}>
        <label className={styles.fieldLabel}>Choose Your Residency Commitment *</label>
        <div className={styles.packageOptionsGrid}>
          {V3_PACKAGES.map((pkg) => {
            const isSelected = selectedPkg === pkg.id;
            return (
              <button
                type="button"
                key={pkg.id}
                onClick={() => setSelectedPkg(pkg.id)}
                className={`${styles.packageOptionCard} ${isSelected ? styles.selectedOption : ""}`}
              >
                <div className={styles.optionTop}>
                  <span className={`${styles.optionBadge} ${pkg.popular ? styles.badgePopular : pkg.bestValue ? styles.badgeBest : ""}`}>
                    {pkg.badge}
                  </span>
                  <span className={styles.optionRate}>{pkg.rate}</span>
                </div>
                <div className={styles.optionName}>{pkg.name}</div>
                <div className={styles.optionPrice}>{pkg.price}</div>
                <p className={styles.optionSummary}>{pkg.summary}</p>
                <div className={styles.optionRadio}>
                  <span className={isSelected ? styles.radioChecked : styles.radioUnchecked} />
                  <span>{isSelected ? "Selected" : "Select Tier"}</span>
                </div>
              </button>
            );
          })}
        </div>
        <input type="hidden" name="package" value={selectedPkg} />
      </div>

      {/* Applicant Details */}
      <div className={styles.formGridTwo}>
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="fullName">Full Name *</label>
          <input
            id="fullName"
            name="fullName"
            required
            minLength={2}
            autoComplete="name"
            placeholder="Abrar Nadir"
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="age">Age *</label>
          <input
            id="age"
            name="age"
            required
            type="number"
            min={16}
            max={80}
            placeholder="24"
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.formGridTwo}>
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="phone">WhatsApp Number *</label>
          <input
            id="phone"
            name="phone"
            required
            inputMode="tel"
            placeholder="0300 1234567 or +923..."
            autoComplete="tel"
            className={styles.input}
          />
          <span className={styles.inputHint}>We will contact you here for approval & dates.</span>
        </div>

        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="email">Email Address *</label>
          <input
            id="email"
            name="email"
            required
            type="email"
            placeholder="you@domain.com"
            autoComplete="email"
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.formGridTwo}>
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="city">City of Residence *</label>
          <input
            id="city"
            name="city"
            required
            minLength={2}
            autoComplete="address-level2"
            placeholder="Lahore, Karachi, Islamabad, Overseas..."
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="memberStatus">Are you a YT Empire Builder Member? *</label>
          <select id="memberStatus" name="memberStatus" required defaultValue="" className={styles.select}>
            <option value="" disabled>Select status</option>
            <option value="Yes — paid member">Yes — Paid Empire Builder Member</option>
            <option value="Yes — workshop/community member">Yes — Attended Live Workshop</option>
            <option value="No">No — First time joining an Abrar Nadir program</option>
          </select>
        </div>
      </div>

      {/* Deep Qualifying Questions */}
      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor="currentBuild">
          What are you currently building? *
        </label>
        <textarea
          id="currentBuild"
          name="currentBuild"
          required
          minLength={20}
          rows={3}
          placeholder="Describe your YouTube channel, agency, content system, niche, or business model you want to develop during your residency..."
          className={styles.textarea}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor="bottleneck">
          What is your single biggest execution bottleneck right now? *
        </label>
        <textarea
          id="bottleneck"
          name="bottleneck"
          required
          minLength={20}
          rows={3}
          placeholder="e.g., Scripting takes too long, inconsistent uploads, low CTR/retention, no repeatable team SOPs, scattered focus at home..."
          className={styles.textarea}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor="successDefinition">
          What specific completed outcome would make this residency a 10/10 success? *
        </label>
        <textarea
          id="successDefinition"
          name="successDefinition"
          required
          minLength={20}
          rows={3}
          placeholder="e.g., Leave with first 8 videos fully recorded and edited, launch repeatable AI scripting workflow, finalize channel packaging and offer..."
          className={styles.textarea}
        />
      </div>

      <div className={styles.formGridTwo}>
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="budgetReadiness">Financial Readiness *</label>
          <select id="budgetReadiness" name="budgetReadiness" required defaultValue="" className={styles.select}>
            <option value="" disabled>Select readiness</option>
            <option value="Ready if selected">I am financially ready to pay if approved</option>
            <option value="Need the payment plan">I would like a 2-part split payment</option>
            <option value="Still planning">Still evaluating budget</option>
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="earlyParticipation">On-Site Coworking Availability *</label>
          <select id="earlyParticipation" name="earlyParticipation" required defaultValue="" className={styles.select}>
            <option value="" disabled>Select arrival window</option>
            <option value="Immediate / Next available cohort">Ready for next immediate cohort</option>
            <option value="Within 30 days">Within next 30 days</option>
            <option value="Flexible / Future month">Flexible date</option>
          </select>
        </div>
      </div>

      {/* Acknowledgements */}
      <div className={styles.checkboxGroup}>
        <label className={styles.checkboxLabel}>
          <input name="acknowledgement" type="checkbox" value="accepted" required />
          <span>
            I understand that <strong>Content Colony is selective</strong>. Submitting this form does not charge me. I agree NOT to make any payment until formally accepted by Abrar Nadir&apos;s team.
          </span>
        </label>

        <label className={styles.checkboxLabel}>
          <input name="consent" type="checkbox" value="accepted" required />
          <span>
            I consent to receive application review status and schedule confirmation via WhatsApp and email.
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

      <button disabled={busy} type="submit" className={styles.submitBtn}>
        {busy ? "Processing Application..." : `Apply for ${selectedPkg.split(" — ")[0]}`}
      </button>

      <p className={styles.formSecurityNote}>
        🔒 Your data is private. Founding Cohort V3 is capped at 10 approved residents.
      </p>
    </form>
  );
}
