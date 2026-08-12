import { NextRequest, NextResponse } from "next/server";
import { getOfferById } from "@/lib/offers/offers";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const pakistanPhonePattern = /^\+923\d{9}$/;
const ageRanges = new Set(["Under 18", "18–24", "25–34", "35–44", "45+"]);
const attributionKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"] as const;
const attempts = new Map<string, { count: number; resetAt: number }>();

function clean(value: unknown, max = 200) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function field(environmentName: string, value: string) {
  const id = process.env[environmentName];
  return id && value ? [{ id, field_value: value }] : [];
}

async function ghl(path: string, init: RequestInit = {}) {
  const token = process.env.GHL_PRIVATE_INTEGRATION_TOKEN;
  const response = await fetch(`https://services.leadconnectorhq.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Version: "2021-07-28",
      Accept: "application/json",
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...init.headers,
    },
    cache: "no-store",
  });
  if (!response.ok) {
    console.error("GHL request failed", { path, status: response.status });
    throw new Error("CRM request failed");
  }
  return response.json();
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    const now = Date.now();
    const hit = attempts.get(ip);
    if (hit && hit.resetAt > now && hit.count >= 8) return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
    attempts.set(ip, { count: hit && hit.resetAt > now ? hit.count + 1 : 1, resetAt: now + 900_000 });

    const input = (await request.json()) as Record<string, unknown>;
    const offer = getOfferById(clean(input.offerId, 80));
    const fullName = clean(input.fullName, 120);
    const phone = clean(input.phone, 20);
    const city = clean(input.city, 80);
    const ageRange = clean(input.ageRange, 20);
    const email = clean(input.email, 160);
    const landingPage = clean(input.landingPage, 120);
    const consent = input.consent === true;

    if (!offer || fullName.length < 2 || !pakistanPhonePattern.test(phone) || city.length < 2 || !ageRanges.has(ageRange) || (email && !emailPattern.test(email)) || !consent || landingPage !== `/workshops/${offer.slug}`) {
      return NextResponse.json({ error: "Please check your registration details." }, { status: 400 });
    }

    const locationId = process.env.GHL_LOCATION_ID;
    const pipelineId = process.env.GHL_LIVE_WORKSHOP_PIPELINE_ID;
    const stageId = process.env.GHL_LIVE_WORKSHOP_PAYMENT_PENDING_STAGE_ID;
    if (!locationId || !process.env.GHL_PRIVATE_INTEGRATION_TOKEN || !pipelineId || !stageId) {
      return NextResponse.json({ error: "Registration service is not fully configured." }, { status: 503 });
    }

    const attribution = Object.fromEntries(attributionKeys.map((key) => [key, clean(input[key], 200)]));
    const customFields = [
      ...field("GHL_WORKSHOP_SLUG_FIELD_ID", offer.slug),
      ...field("GHL_CITY_FIELD_ID", city),
      ...field("GHL_AGE_RANGE_FIELD_ID", ageRange),
      ...field("GHL_LANDING_PAGE_FIELD_ID", landingPage),
      ...field("GHL_UTM_SOURCE_FIELD_ID", attribution.utm_source),
      ...field("GHL_UTM_MEDIUM_FIELD_ID", attribution.utm_medium),
      ...field("GHL_UTM_CAMPAIGN_FIELD_ID", attribution.utm_campaign),
      ...field("GHL_UTM_CONTENT_FIELD_ID", attribution.utm_content),
      ...field("GHL_UTM_TERM_FIELD_ID", attribution.utm_term),
      ...field("GHL_FBCLID_FIELD_ID", attribution.fbclid),
    ];

    const contactData = await ghl("/contacts/upsert", {
      method: "POST",
      body: JSON.stringify({
        locationId,
        name: fullName,
        phone,
        ...(email ? { email } : {}),
        source: `Landing Page: ${offer.slug}`,
        tags: [offer.leadTag, "workshop-registration", "whatsapp-consent"],
        customFields,
      }),
    });
    const contactId = contactData?.contact?.id as string | undefined;
    if (!contactId) throw new Error("CRM contact missing");

    const search = await ghl(`/opportunities/search?location_id=${encodeURIComponent(locationId)}&contact_id=${encodeURIComponent(contactId)}&status=open`);
    const opportunityName = `${fullName} – ${offer.slug}`;
    const duplicate = search?.opportunities?.some((opportunity: { pipelineId?: string; name?: string; status?: string }) => opportunity.pipelineId === pipelineId && opportunity.status === "open" && opportunity.name?.toLowerCase() === opportunityName.toLowerCase());

    if (!duplicate) {
      await ghl("/opportunities/", {
        method: "POST",
        body: JSON.stringify({ locationId, pipelineId, pipelineStageId: stageId, contactId, name: opportunityName, status: "open", source: offer.slug }),
      });
    }

    return NextResponse.json({ ok: true, eventId: crypto.randomUUID(), duplicate: Boolean(duplicate) });
  } catch (error) {
    console.error("Workshop lead submission failed", error instanceof Error ? error.message : "unknown");
    return NextResponse.json({ error: "We could not save your registration. Please try again." }, { status: 502 });
  }
}
