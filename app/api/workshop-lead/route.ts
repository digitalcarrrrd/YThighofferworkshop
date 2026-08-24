import { NextRequest, NextResponse } from "next/server";
import { getOfferById } from "@/lib/offers/offers";
import { ghlClient } from "@/lib/ghlClient";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const attempts = new Map<string, { count: number; resetAt: number }>();

function clean(value: unknown, max = 200) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function normalizePakistanPhone(phone: string) {
  let cleaned = phone.replace(/[^\d+]/g, "");
  if (cleaned.startsWith("03")) {
    cleaned = "+92" + cleaned.slice(1);
  } else if (cleaned.startsWith("3") && cleaned.length === 10) {
    cleaned = "+92" + cleaned;
  } else if (cleaned.startsWith("923")) {
    cleaned = "+" + cleaned;
  }
  return cleaned;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    const now = Date.now();
    const hit = attempts.get(ip);
    if (hit && hit.resetAt > now && hit.count >= 15) {
      return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
    }
    attempts.set(ip, { count: hit && hit.resetAt > now ? hit.count + 1 : 1, resetAt: now + 900_000 });

    const input = (await request.json()) as Record<string, unknown>;
    const offerIdOrSlug = clean(input.offerId, 80);
    const offer = getOfferById(offerIdOrSlug);

    const fullName = clean(input.fullName, 120);
    const phone = clean(input.phone, 30);
    const city = clean(input.city, 80);
    const ageRange = clean(input.ageRange, 20);
    const email = clean(input.email, 160);
    const landingPage = clean(input.landingPage, 120) || "/workshops/yt1";
    const utmSource = clean(input.utm_source, 100);
    const utmCampaign = clean(input.utm_campaign, 100);

    const normalizedPhone = normalizePakistanPhone(phone);

    if (fullName.length < 2 || normalizedPhone.replace(/\D/g, "").length < 10) {
      return NextResponse.json({ error: "Please enter your valid name and WhatsApp number." }, { status: 400 });
    }

    const offerSlug = offer?.slug || "youtube-empire-builders-workshop";
    const offerTitle = offer?.title || "YouTube Empire Builders Live Workshop";
    const offerPrice = offer?.price || 1999;

    const tags = [
      "lead:workshop-registration",
      `workshop:${offerSlug}`,
      "whatsapp-consent",
      "yt-workshop-lead",
    ];
    if (city) tags.push(`city:${city.toLowerCase().replace(/[^a-z0-9]/g, "-")}`);
    if (utmCampaign) tags.push(`ad:${utmCampaign.toLowerCase().replace(/[^a-z0-9]/g, "-")}`);

    let contactId = null;
    let opportunityId = null;

    if (ghlClient.isConfigured) {
      try {
        const contactResult = await ghlClient.upsertContact({
          firstName: fullName.split(" ")[0] || fullName,
          lastName: fullName.split(" ").slice(1).join(" ") || "",
          phone: normalizedPhone,
          email: email || `${normalizedPhone.replace(/[^\d]/g, "")}@whatsapp.user`,
          companyName: "YT Empire Builders Workshop",
          tags,
        });

        contactId = contactResult?.contact?.id || contactResult?.id || null;

        if (contactId) {
          const noteBody = `📝 LIVE WORKSHOP REGISTRATION:\n• Attendee: ${fullName}\n• WhatsApp: ${normalizedPhone}\n• Email: ${email || "N/A"}\n• City: ${city || "N/A"} | Age: ${ageRange || "N/A"}\n• Workshop: ${offerTitle}\n• Fee: PKR ${offerPrice.toLocaleString()}\n• Landing Page: ${landingPage}\n• Ad Campaign: ${utmCampaign || utmSource || "Direct"}`;

          await ghlClient.addNote(contactId, noteBody);

          const pipelineId = process.env.GHL_LIVE_WORKSHOP_PIPELINE_ID || process.env.GHL_ACADEMY_PIPELINE_ID || "CZYMTQUzq7a6faEIKdtZ";
          const stageId = process.env.GHL_LIVE_WORKSHOP_PAYMENT_PENDING_STAGE_ID || process.env.GHL_ACADEMY_STAGE_FORM_FILL || "e6ed9068-7d5e-49ff-ba46-5b9072545fd1";

          const oppResult = await ghlClient.createOpportunity({
            contactId,
            name: `${fullName} — ${offerTitle} (PKR ${offerPrice.toLocaleString()})`,
            pipelineId,
            pipelineStageId: stageId,
            status: "open",
            monetaryValue: offerPrice,
          });

          opportunityId = oppResult?.opportunity?.id || oppResult?.id || null;
        }
      } catch (ghlErr) {
        console.warn("GHL Workshop Lead submission warning:", ghlErr);
      }
    }

    const eventId = crypto.randomUUID();
    return NextResponse.json({ ok: true, eventId, contactId, opportunityId });
  } catch (error) {
    console.error("Workshop lead submission failed", error instanceof Error ? error.message : "unknown");
    return NextResponse.json({ error: "We could not save your registration. Please try again." }, { status: 502 });
  }
}
