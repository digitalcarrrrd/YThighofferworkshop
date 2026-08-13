"use client";

import { useState } from "react";
import styles from "./page.module.css";

type Status = { type: "idle" | "error" | "success"; message?: string; reference?: string };

export function PrebookingForm() {
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setStatus({ type: "idle" });
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/content-colony-prebooking", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json() as { ok?: boolean; error?: string; reference?: string };
      if (!response.ok) throw new Error(data.error || "Your application could not be submitted.");
      setStatus({ type: "success", message: "Application received. Do not make a payment unless our team instructs you. We will contact selected applicants directly on WhatsApp.", reference: data.reference });
      form.reset();
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "Please try again." });
    } finally { setBusy(false); }
  }

  if (status.type === "success") return <div className={styles.success}><span>✓</span><h3>Application received</h3><p>{status.message}</p><small>Reference: {status.reference}</small></div>;

  return (
    <form className={styles.form} onSubmit={submit}>
      <div className={styles.row}><label>Full name<input name="fullName" required minLength={2} autoComplete="name" /></label><label>Age<input name="age" required type="number" min={16} max={80} /></label></div>
      <div className={styles.row}><label>WhatsApp number<input name="phone" required inputMode="tel" placeholder="03XX XXXXXXX" autoComplete="tel" /></label><label>Email<input name="email" required type="email" autoComplete="email" /></label></div>
      <label>City<input name="city" required minLength={2} autoComplete="address-level2" /></label>
      <label>Which option are you applying for?<select name="package" required defaultValue=""><option value="" disabled>Select a residency</option><option>10-Day Builder — PKR 85,000</option><option>15-Day Pro — PKR 120,000</option><option>Private 30-Day — PKR 220,000</option></select></label>
      <label>Are you a YT Empire Builder member?<select name="memberStatus" required defaultValue=""><option value="" disabled>Select one</option><option>Yes — paid member</option><option>Yes — workshop/community member</option><option>No</option></select></label>
      <label>What are you currently building?<textarea name="currentBuild" required minLength={20} rows={3} placeholder="Channel, agency, content system or current project…" /></label>
      <label>What is your biggest execution bottleneck?<textarea name="bottleneck" required minLength={20} rows={3} /></label>
      <label>What result would make this residency successful for you?<textarea name="successDefinition" required minLength={20} rows={3} /></label>
      <div className={styles.row}><label>Budget readiness<select name="budgetReadiness" required defaultValue=""><option value="" disabled>Select one</option><option>Ready if selected</option><option>Need the payment plan</option><option>Still planning</option></select></label><label>Early participation<select name="earlyParticipation" required defaultValue=""><option value="" disabled>Select one</option><option>Yes, invite me</option><option>Residency only</option></select></label></div>
      <label className={styles.check}><input name="acknowledgement" type="checkbox" value="accepted" required /><span>I understand this is an application, selection is not guaranteed, and I should not pay until instructed.</span></label>
      <label className={styles.check}><input name="consent" type="checkbox" value="accepted" required /><span>I agree to receive application and payment follow-up on WhatsApp and email.</span></label>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className={styles.honeypot} aria-hidden="true" />
      {status.type === "error" && <p className={styles.error} role="alert">{status.message}</p>}
      <button disabled={busy} type="submit">{busy ? "Submitting…" : "Apply to prebook my Azadi seat"}</button>
    </form>
  );
}
