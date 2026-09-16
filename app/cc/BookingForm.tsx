"use client";

import { useState } from "react";
import styles from "./page.module.css";

type Status = { type: "idle" | "error" | "success"; message?: string; reference?: string };

export function BookingForm() {
  const [sprint, setSprint] = useState<string>("");
  const [access, setAccess] = useState<string>("");
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const [busy, setBusy] = useState(false);

  function resolvePackageName(chosenSprint: string, chosenAccess: string): string {
    if (chosenSprint === "30 Days — Waitlist") {
      return "30-Day Deep Systemization — Waitlist";
    }
    if (chosenSprint === "10 Days") {
      return chosenAccess.includes("Local")
        ? "10-Day Fast Entry — Lahore Local Operator (PKR 60,000)"
        : "10-Day Fast Entry — Creator Residency (PKR 100,000)";
    }
    // Default 15 Days
    return chosenAccess.includes("Local")
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
          "Whitelist application received. Our admissions team reviews your build and bottleneck within 24–48 hours. Shortlisted creators are contacted on WhatsApp for a 15-minute screening alignment call.",
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
        <div className={styles.applyEyebrow}>WHITELIST APPLICATION</div>
        <h2 className={styles.applyHeading}>
          If this feels like the<br />
          missing layer,<br />
          apply.
        </h2>
        <p className={styles.applyLead}>
          No payment is required to submit the form. We first check fit, seriousness,
          dates and accommodation practicality.
        </p>

        <div className={styles.applyStepsGrid}>
          <div className={styles.applyStepCard}>
            <span className={styles.stepNum}>STEP 01</span>
            <span className={styles.stepText}>Fill the form</span>
          </div>
          <div className={styles.applyStepCard}>
            <span className={styles.stepNum}>STEP 02</span>
            <span className={styles.stepText}>Screening call</span>
          </div>
          <div className={styles.applyStepCard}>
            <span className={styles.stepNum}>STEP 03</span>
            <span className={styles.stepText}>Approval</span>
          </div>
          <div className={styles.applyStepCard}>
            <span className={styles.stepNum}>STEP 04</span>
            <span className={styles.stepText}>Payment plan + seat confirmation</span>
          </div>
        </div>

        <p className={styles.applyNote}>
          Future physical visits for Local Operators are not included and are charged separately.
        </p>
      </div>

      {/* Right Form Column */}
      <div className={styles.applyFormBox}>
        {status.type === "success" ? (
          <div className={styles.successPanel}>
            <div className={styles.successIcon}>✓</div>
            <div className={styles.eyebrow} style={{ marginBottom: "8px", color: "var(--warm)" }}>
              APPLICATION RECEIVED
            </div>
            <h3>Whitelist Application Logged</h3>
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
              Submit Another Application
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
                placeholder="Full name"
                className={styles.warmInput}
              />
              <input
                name="city"
                type="text"
                required
                placeholder="City"
                className={styles.warmInput}
              />
            </div>

            {/* Row 2: WhatsApp Phone + Email */}
            <div className={styles.formRowTwo}>
              <input
                name="phone"
                type="tel"
                required
                placeholder="WhatsApp number (+92...)"
                className={styles.warmInput}
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Email address"
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
                <option value="" disabled>Choose sprint</option>
                <option value="10 Days">10 Days</option>
                <option value="15 Days">15 Days</option>
                <option value="30 Days — Waitlist">30 Days — Waitlist</option>
              </select>

              <select
                name="access"
                required
                value={access}
                onChange={(e) => setAccess(e.target.value)}
                className={styles.warmSelect}
              >
                <option value="" disabled>Choose access</option>
                <option value="Lahore Local Operator">Lahore Local Operator</option>
                <option value="Creator Residency">Creator Residency — accommodation confirmed after call</option>
              </select>
            </div>

            {/* Row 4: What are you currently building? */}
            <input
              name="currentBuild"
              type="text"
              required
              placeholder="What are you currently building?"
              className={styles.warmInputFull}
            />

            {/* Row 5: What is your biggest current bottleneck? */}
            <textarea
              name="bottleneck"
              required
              placeholder="What is your biggest current bottleneck?"
              className={styles.warmTextarea}
            />

            {/* Row 6: Why do you feel Content Colony could be the missing layer for you? */}
            <textarea
              name="successDefinition"
              required
              placeholder="Why do you feel Content Colony could be the missing layer for you?"
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
              {busy ? "Submitting Application..." : "Submit Whitelist Application →"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
