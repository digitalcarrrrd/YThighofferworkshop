"use client";

import { useState } from "react";
import styles from "./page.module.css";

export const V3_PACKAGES = [
  {
    id: "7-Day Sprint — PKR 100,000",
    name: "7-Day Sprint",
    price: "PKR 100,000",
    rate: "PKR 14,286/day",
    badge: "Breakthrough",
    summary: "1 problem solved, 1 finished outcome, up to 7 hrs Abrar 1:1 + 1 deep content review",
  },
  {
    id: "14-Day Build Sprint — PKR 180,000",
    name: "14-Day Build Sprint",
    price: "PKR 180,000",
    rate: "PKR 12,857/day",
    badge: "Most Popular",
    popular: true,
    summary: "Build, test, feedback & improve. Save PKR 20,000. 2 content reviews + 2 build cycles",
  },
  {
    id: "30-Day Creator Residency — PKR 300,000",
    name: "30-Day Residency",
    price: "PKR 300,000",
    rate: "PKR 10,000/day",
    badge: "Best Value",
    bestValue: true,
    summary: "Full operating transformation. Save ~PKR 100,000. Up to 10 hrs Abrar + 3 review checkpoints",
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
          "Application logged. Our admissions team reviews your profile within 24–48 hours. Shortlisted creators are contacted directly on WhatsApp for an alignment interview. Do not send payment until formally accepted.",
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
          1. Team reviews your channel/system bottleneck.
          <br />
          2. Shortlisted applicants receive a WhatsApp interview (+92) to confirm dates.
          <br />
          3. Optional screening deposit (PKR 2,500) is only requested upon shortlisting and is 100% credited against your residency balance.
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
      <form onSubmit={handleSubmit}>
        <div className={styles.formHeading}>
          <span className={styles.eyebrow}>DOOR 02 — RESIDENCY RESERVATION</span>
          <h3>Apply for Content Colony</h3>
          <p>
            Choose your sprint depth, select your current build and bottleneck, and apply.
            Founding Cohort V3 is strictly capped at 10 approved residents.
          </p>
        </div>

        {/* Package Selector */}
        <div className={styles.pkgChoiceWrap}>
          <label className={styles.fieldTitle}>Choose Sprint Duration *</label>
          <div className={styles.pkgCardsGrid}>
            {V3_PACKAGES.map((pkg) => {
              const isSelected = selectedPkg === pkg.id;
              return (
                <button
                  type="button"
                  key={pkg.id}
                  onClick={() => setSelectedPkg(pkg.id)}
                  className={`${styles.pkgCardBtn} ${isSelected ? styles.pkgCardSelected : ""}`}
                >
                  <div className={styles.pkgCardTop}>
                    <span className={styles.pkgCardBadge}>{pkg.badge}</span>
                    <span className={styles.pkgCardRate}>{pkg.rate}</span>
                  </div>
                  <div className={styles.pkgCardName}>{pkg.name}</div>
                  <div className={styles.pkgCardPrice}>{pkg.price}</div>
                  <p className={styles.pkgCardDesc}>{pkg.summary}</p>
                  <div className={styles.pkgRadioRow}>
                    <span className={styles.pkgRadioIndicator} />
                    <span>{isSelected ? "Selected" : "Select"}</span>
                  </div>
                </button>
              );
            })}
          </div>
          <input type="hidden" name="package" value={selectedPkg} />
        </div>

        {/* Applicant Details */}
        <div className={styles.formGridTwo}>
          <div className={styles.formField}>
            <label className={styles.fieldTitle} htmlFor="fullName">Full Name *</label>
            <input
              id="fullName"
              name="fullName"
              required
              minLength={2}
              autoComplete="name"
              placeholder="e.g. Abrar Nadir"
              className={styles.formInput}
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.fieldTitle} htmlFor="age">Age *</label>
            <input
              id="age"
              name="age"
              required
              type="number"
              min={16}
              max={80}
              placeholder="24"
              className={styles.formInput}
            />
          </div>
        </div>

        <div className={styles.formGridTwo}>
          <div className={styles.formField}>
            <label className={styles.fieldTitle} htmlFor="phone">WhatsApp Number *</label>
            <input
              id="phone"
              name="phone"
              required
              inputMode="tel"
              placeholder="0300 1234567 or +923..."
              autoComplete="tel"
              className={styles.formInput}
            />
            <span className={styles.formHint}>We verify applications and dates via WhatsApp.</span>
          </div>

          <div className={styles.formField}>
            <label className={styles.fieldTitle} htmlFor="email">Email Address *</label>
            <input
              id="email"
              name="email"
              required
              type="email"
              placeholder="you@domain.com"
              autoComplete="email"
              className={styles.formInput}
            />
          </div>
        </div>

        <div className={styles.formGridTwo}>
          <div className={styles.formField}>
            <label className={styles.fieldTitle} htmlFor="city">City of Residence *</label>
            <input
              id="city"
              name="city"
              required
              minLength={2}
              autoComplete="address-level2"
              placeholder="Lahore, Karachi, Islamabad, Overseas..."
              className={styles.formInput}
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.fieldTitle} htmlFor="memberStatus">Are you a YT Empire Builder Member? *</label>
            <select id="memberStatus" name="memberStatus" required defaultValue="" className={styles.formSelect}>
              <option value="" disabled>Select status</option>
              <option value="Yes — paid member">Yes — Paid Empire Builder Member</option>
              <option value="Yes — workshop/community member">Yes — Attended Live Workshop</option>
              <option value="No">No — First time joining an Abrar Nadir program</option>
            </select>
          </div>
        </div>

        {/* User-friendly Dropdown Selectors */}
        <div className={styles.formField}>
          <label className={styles.fieldTitle} htmlFor="currentBuild">
            What are you currently building? *
          </label>
          <select id="currentBuild" name="currentBuild" required defaultValue="" className={styles.formSelect}>
            <option value="" disabled>Select what you are building</option>
            <option value="YouTube Faceless / Automation Channel">YouTube Faceless / Automation Channel</option>
            <option value="Personal Brand / Talking Head Channel">Personal Brand / Talking Head Channel</option>
            <option value="Content Agency / Video Production Business">Content Agency / Video Production Business</option>
            <option value="Digital Product / Education Funnel">Digital Product / Education Funnel</option>
            <option value="AI Creator / Multi-Channel Media Network">AI Creator / Multi-Channel Media Network</option>
            <option value="Other Media Business / Channel Idea">Other Digital Media Business</option>
          </select>
        </div>

        <div className={styles.formField}>
          <label className={styles.fieldTitle} htmlFor="bottleneck">
            What is your biggest execution bottleneck right now? *
          </label>
          <select id="bottleneck" name="bottleneck" required defaultValue="" className={styles.formSelect}>
            <option value="" disabled>Select your primary bottleneck</option>
            <option value="Scripting & Storytelling takes too long">Scripting &amp; Storytelling takes too long</option>
            <option value="Inconsistent uploads / Lack of routine at home">Inconsistent uploads / Lack of routine at home</option>
            <option value="Low CTR, weak thumbnails & title packaging">Low CTR, weak thumbnails &amp; title packaging</option>
            <option value="Low audience retention & algorithmic drop-off">Low audience retention &amp; algorithmic drop-off</option>
            <option value="Video editor hiring, delegation & team SOPs">Video editor hiring, delegation &amp; team SOPs</option>
            <option value="Scattered focus / Distracted home environment">Scattered focus / Distracted home environment</option>
          </select>
        </div>

        <div className={styles.formField}>
          <label className={styles.fieldTitle} htmlFor="successDefinition">
            What completed outcome would make this residency a 10/10 success? *
          </label>
          <select id="successDefinition" name="successDefinition" required defaultValue="" className={styles.formSelect}>
            <option value="" disabled>Select your desired outcome</option>
            <option value="Leave with first batch of videos fully produced & edited">Leave with first batch of videos fully produced &amp; edited</option>
            <option value="Build a repeatable AI content production pipeline">Build a repeatable AI content production pipeline</option>
            <option value="Fix channel retention leaks & CTR packaging with Abrar">Fix channel retention leaks &amp; CTR packaging with Abrar</option>
            <option value="Launch a monetization offer / funnel behind the channel">Launch a monetization offer / funnel behind the channel</option>
            <option value="Establish a disciplined daily creator operating rhythm">Establish a disciplined daily creator operating rhythm</option>
            <option value="Solve my main growth bottleneck with direct 1:1 strategy">Solve my main growth bottleneck with direct 1:1 strategy</option>
          </select>
        </div>

        <div className={styles.formGridTwo}>
          <div className={styles.formField}>
            <label className={styles.fieldTitle} htmlFor="budgetReadiness">Financial Readiness *</label>
            <select id="budgetReadiness" name="budgetReadiness" required defaultValue="" className={styles.formSelect}>
              <option value="" disabled>Select readiness</option>
              <option value="Ready if selected">I am financially prepared to pay if approved</option>
              <option value="Need the payment plan">I would like a 2-part split payment</option>
              <option value="Still planning">Still evaluating budget</option>
            </select>
          </div>

          <div className={styles.formField}>
            <label className={styles.fieldTitle} htmlFor="earlyParticipation">On-Site Arrival Window *</label>
            <select id="earlyParticipation" name="earlyParticipation" required defaultValue="" className={styles.formSelect}>
              <option value="" disabled>Select arrival window</option>
              <option value="Immediate / Next available cohort">Ready for immediate next cohort</option>
              <option value="Within 30 days">Within next 30 days</option>
              <option value="Flexible / Future month">Flexible date</option>
            </select>
          </div>
        </div>

        {/* Consent & Agreements */}
        <div className={styles.consentWrap}>
          <label className={styles.consentLabel}>
            <input name="acknowledgement" type="checkbox" value="accepted" required />
            <span>
              I understand that <strong>Content Colony is selective</strong>. Submitting this form does not charge me. I agree NOT to make any payment until formally accepted by Abrar Nadir&apos;s team.
            </span>
          </label>

          <label className={styles.consentLabel}>
            <input name="consent" type="checkbox" value="accepted" required />
            <span>
              I consent to receive application status updates and schedule confirmation via WhatsApp and email.
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
          {busy ? "Processing..." : `Apply for ${selectedPkg.split(" — ")[0]}`}
        </button>

        <p className={styles.formNote}>
          Confidential Application · Limited to 10 Residents in Cohort V3
        </p>
      </form>
    </div>
  );
}
