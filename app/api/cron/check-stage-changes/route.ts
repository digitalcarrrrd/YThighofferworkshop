import { NextRequest, NextResponse } from "next/server";
import { ghlClient } from "@/lib/ghlClient";
import {
  dispatchCourseEmailAutomation,
  dispatchWhatsAppAutomation,
} from "@/lib/courseAutomation";

/**
 * Vercel Cron Job — runs every minute.
 * Polls GHL opportunities in "Yt Workshop" pipeline.
 * When an opportunity is in "Payment Confirmed" stage and hasn't been
 * notified yet, sends WhatsApp + Email confirmation and adds a note.
 */

const PIPELINE_ID = "ovEvVaJTioeijjOyBw34";
const PAYMENT_CONFIRMED_STAGE_ID = "0ad7cb14-6f9c-4a9c-ba9a-2b3a015cfeee";
const LOCATION_ID = process.env.GHL_LOCATION_ID || "6MzIr7iWX12OyaxfufLw";
const GHL_TOKEN = process.env.GHL_PRIVATE_INTEGRATION_TOKEN || "pit-4259cd3b-222c-4b57-8f88-400949576d75";
const BASE_URL = "https://services.leadconnectorhq.com";

// In-memory set of already-notified opportunity IDs (persists across warm invocations)
const notifiedOpportunities = new Set<string>();

async function ghlFetch(path: string, options?: RequestInit) {
  return fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${GHL_TOKEN}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(options?.headers || {}),
    },
  });
}

export async function GET(req: NextRequest) {
  // Verify cron secret if set (Vercel sends this header for cron jobs)
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch all opportunities in the Yt Workshop pipeline
    const oppsRes = await ghlFetch(
      `/opportunities/search?location_id=${LOCATION_ID}&pipeline_id=${PIPELINE_ID}`
    );

    if (!oppsRes.ok) {
      console.error("Failed to fetch opportunities:", oppsRes.status);
      return NextResponse.json({ error: "Failed to fetch opportunities" }, { status: 500 });
    }

    const oppsData = await oppsRes.json();
    const opportunities = oppsData.opportunities || [];

    const results: Array<{ opportunityId: string; contactName: string; action: string }> = [];

    for (const opp of opportunities) {
      // Only process opportunities in "Payment Confirmed" stage
      if (opp.pipelineStageId !== PAYMENT_CONFIRMED_STAGE_ID) continue;

      // Skip if already notified
      if (notifiedOpportunities.has(opp.id)) continue;

      const contactId = opp.contact?.id;
      const contactName = opp.contact?.name || opp.contact?.firstName || "Student";
      const contactEmail = opp.contact?.email;
      const contactPhone = opp.contact?.phone;

      if (!contactId) continue;

      // Double-check: fetch notes to see if we already sent confirmation
      try {
        const notesRes = await ghlFetch(`/contacts/${contactId}/notes`);
        if (notesRes.ok) {
          const notesData = await notesRes.json();
          const notes = notesData.notes || [];
          const alreadySent = notes.some(
            (n: { body: string }) =>
              n.body && n.body.includes("AUTOMATED CONFIRMATION DISPATCHED")
          );
          if (alreadySent) {
            notifiedOpportunities.add(opp.id);
            results.push({ opportunityId: opp.id, contactName, action: "already_notified" });
            continue;
          }
        }
      } catch {
        // If notes check fails, proceed anyway to avoid missing notifications
      }

      const workshopName = "YouTube Empire Builders Live Workshop";
      const lmsUrl = "https://lms.abrarnadir.com";

      const recipient = {
        contactId,
        name: contactName,
        email: contactEmail,
        phone: contactPhone,
        workshopName,
      };

      // --- Send WhatsApp confirmation ---
      await dispatchWhatsAppAutomation(recipient, "payment_confirmed").catch((e) =>
        console.warn("WhatsApp send failed for", contactId, e)
      );

      // --- Send Email confirmation ---
      if (contactEmail && !contactEmail.includes("@whatsapp.user")) {
        await dispatchCourseEmailAutomation(recipient, "welcome_onboarding").catch((e) =>
          console.warn("Email send failed for", contactId, e)
        );
      }

      // --- Enroll in GHL Workflow ---
      const workflowId = process.env.GHL_WORKSHOP_WORKFLOW_ID || "8c73d915-30dc-4f5f-9fbe-0db027ca6f32";
      ghlClient.addContactToWorkflow(contactId, workflowId).catch((e) =>
        console.warn("Workflow enrollment failed for", contactId, e)
      );

      // --- Update tags ---
      try {
        const contactRes = await ghlFetch(`/contacts/${contactId}`);
        if (contactRes.ok) {
          const contactData = await contactRes.json();
          const existingTags: string[] = contactData.contact?.tags || [];
          const newTags = [
            ...existingTags.filter(
              (t: string) => t !== "status:pending-verification"
            ),
            "status:payment-confirmed",
            "workshop:payment-verified",
          ];
          // Deduplicate
          const uniqueTags = [...new Set(newTags)];
          await ghlFetch(`/contacts/${contactId}`, {
            method: "PUT",
            body: JSON.stringify({ tags: uniqueTags }),
          });
        }
      } catch (e) {
        console.warn("Tag update failed for", contactId, e);
      }

      // --- Add confirmation note ---
      try {
        await ghlClient.addNote(
          contactId,
          `✅ AUTOMATED CONFIRMATION DISPATCHED:\n• WhatsApp Template: yt_payment_verified_details\n• Email sent to: ${contactEmail || "N/A"}\n• Triggered by: Stage moved to Payment Confirmed\n• Dispatched At: ${new Date().toISOString()}`
        );
      } catch (e) {
        console.warn("Note add failed for", contactId, e);
      }

      notifiedOpportunities.add(opp.id);
      results.push({ opportunityId: opp.id, contactName, action: "confirmed_sent" });
    }

    return NextResponse.json({
      success: true,
      processed: results.length,
      results,
      totalOpportunities: opportunities.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Cron check-stage-changes error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
