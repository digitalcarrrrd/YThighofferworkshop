import { NextRequest, NextResponse } from "next/server";
import { getWelcomeMessage, ADMISSION_PIPELINE_ID, ADMISSION_STAGES } from "@/lib/whatsappAdmissionEngine";

const LOCATION_ID = process.env.GHL_LOCATION_ID || "6MzIr7iWX12OyaxfufLw";
const GHL_TOKEN = process.env.GHL_PRIVATE_INTEGRATION_TOKEN || "pit-4259cd3b-222c-4b57-8f88-400949576d75";
const BASE_URL = "https://services.leadconnectorhq.com";

interface GhlConversation {
  id: string;
  contactId: string;
  fullName?: string;
  contactName?: string;
  phone?: string;
  lastMessageType?: string;
  lastMessageDirection?: string;
  unreadCount?: number;
  tags?: string[];
}

export async function GET(req: NextRequest) {
  // Verify cron secret if set
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const res = await fetch(`${BASE_URL}/conversations/search?locationId=${LOCATION_ID}&limit=25`, {
      headers: {
        Authorization: `Bearer ${GHL_TOKEN}`,
        Version: "2021-07-28",
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to search conversations" }, { status: 500 });
    }

    const data = await res.json();
    const conversations: GhlConversation[] = data.conversations || [];
    const processed: Array<{ contactId: string; name: string }> = [];

    for (const conv of conversations) {
      // Must be an unread inbound WhatsApp message
      if (
        conv.lastMessageType !== "TYPE_WHATSAPP" ||
        conv.lastMessageDirection !== "inbound" ||
        !conv.unreadCount ||
        conv.unreadCount <= 0 ||
        !conv.contactId
      ) {
        continue;
      }

      // Check contact tags to ensure we haven't already greeted them
      const contactRes = await fetch(`${BASE_URL}/contacts/${conv.contactId}`, {
        headers: { Authorization: `Bearer ${GHL_TOKEN}`, Version: "2021-07-28" },
      });
      if (!contactRes.ok) continue;

      const contactData = await contactRes.json();
      const existingTags: string[] = contactData.contact?.tags || [];

      // If already greeted or advanced, skip
      if (
        existingTags.includes("new_whatsapp_lead") ||
        existingTags.includes("details_received") ||
        existingTags.includes("payment_pending") ||
        existingTags.includes("payment_proof_received")
      ) {
        continue;
      }

      const name = conv.fullName || conv.contactName || contactData.contact?.firstName || "Learner";
      const welcomeMsg = getWelcomeMessage(name);

      // 1. Send WhatsApp Welcome Message
      const sendRes = await fetch(`${BASE_URL}/conversations/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GHL_TOKEN}`,
          Version: "2021-07-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "WhatsApp",
          contactId: conv.contactId,
          message: welcomeMsg,
        }),
      });

      if (!sendRes.ok) {
        console.warn("Failed to auto-send WhatsApp for contact", conv.contactId);
        continue;
      }

      // 2. Add tag
      const updatedTags = Array.from(new Set([...existingTags, "new_whatsapp_lead", "meta_ctwa_lead"]));
      await fetch(`${BASE_URL}/contacts/${conv.contactId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${GHL_TOKEN}`,
          Version: "2021-07-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tags: updatedTags }),
      });

      // 3. Create or update Opportunity
      const oppPayload = {
        pipelineId: ADMISSION_PIPELINE_ID,
        locationId: LOCATION_ID,
        contactId: conv.contactId,
        name: `${name} – YouTube Masterclass (Rs. 1,999)`,
        pipelineStageId: ADMISSION_STAGES.NEW_WHATSAPP_LEAD,
        status: "open",
        monetaryValue: 1999,
      };

      const oppRes = await fetch(`${BASE_URL}/opportunities/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GHL_TOKEN}`,
          Version: "2021-07-28",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(oppPayload),
      });

      if (!oppRes.ok) {
        const err = await oppRes.json().catch(() => null);
        if (err?.code === "OPPORTUNITY_NO_DUPLICATE" && err?.meta?.existingId) {
          await fetch(`${BASE_URL}/opportunities/${err.meta.existingId}`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${GHL_TOKEN}`,
              Version: "2021-07-28",
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              pipelineId: ADMISSION_PIPELINE_ID,
              pipelineStageId: ADMISSION_STAGES.NEW_WHATSAPP_LEAD,
              status: "open",
              monetaryValue: 1999,
            }),
          });
        }
      }

      // 4. Audit Note
      await fetch(`${BASE_URL}/contacts/${conv.contactId}/notes`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GHL_TOKEN}`,
          Version: "2021-07-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: `🤖 [AUTO-RESPONDER] New Meta WhatsApp lead detected. Welcome message dispatched and Opportunity created in Admissions Pipeline.`,
        }),
      });

      processed.push({ contactId: conv.contactId, name });
    }

    return NextResponse.json({ ok: true, processedCount: processed.length, processed });
  } catch (error) {
    console.error("Auto-responder error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Internal error" }, { status: 500 });
  }
}
