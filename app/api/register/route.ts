import { NextRequest, NextResponse } from "next/server";
import { utmKeys } from "@/lib/analytics";
import { getOfferById, youtubeEmpireBuildersOffer } from "@/lib/offers/offers";

const attempts = new Map<string, { count: number; reset: number }>();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function textField(form: FormData, key: string, maxLength = 200) {
  return String(form.get(key) || "").trim().slice(0, maxLength);
}

function mappedCustomField(environmentName: string, value: string) {
  const key = process.env[environmentName];
  return key && value ? [{ key, field_value: value }] : [];
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "local";
    const now = Date.now();
    const hit = attempts.get(ip);

    if (hit && hit.reset > now && hit.count >= 5) {
      return NextResponse.json(
        { error: "Zyada attempts. 15 minutes baad dobara try karein." },
        { status: 429 },
      );
    }

    attempts.set(ip, {
      count: hit && hit.reset > now ? hit.count + 1 : 1,
      reset: now + 900_000,
    });

    const form = await req.formData();
    const fullName = textField(form, "fullName", 120);
    const phone = textField(form, "phone", 40);
    const email = textField(form, "email", 160);
    const transactionId = textField(form, "transactionId", 100);
    const batchDate = textField(form, "batchDate", 10);
    const paymentMethod = textField(form, "paymentMethod", 40);
    const offerId = textField(form, "offerId", 100) || youtubeEmpireBuildersOffer.id;
    const offer = getOfferById(offerId);
    const proof = form.get("paymentProof");

    if (
      !offer ||
      fullName.length < 2 ||
      !emailPattern.test(email) ||
      phone.replace(/\D/g, "").length < 10 ||
      (transactionId.length > 0 && transactionId.length < 4) ||
      !/^\d{4}-\d{2}-\d{2}$/.test(batchDate) ||
      !["Bank Transfer", "Easypaisa", "JazzCash"].includes(paymentMethod) ||
      !(proof instanceof File) ||
      proof.size > 5_000_000 ||
      !["image/jpeg", "image/png", "image/webp"].includes(proof.type)
    ) {
      return NextResponse.json(
        { error: "Form details check karein. Screenshot JPG/PNG/WebP aur 5MB se chhota ho." },
        { status: 400 },
      );
    }

    const token = process.env.GHL_PRIVATE_INTEGRATION_TOKEN;
    const locationId = process.env.GHL_LOCATION_ID;

    if (!token || !locationId) {
      if (process.env.NODE_ENV === "development") {
        return NextResponse.json({ ok: true, mode: "local-test" });
      }
      return NextResponse.json(
        { error: "Registration service abhi configure nahi hui. Support se rabta karein." },
        { status: 503 },
      );
    }

    const landingPageInput = textField(form, "landingPage", 200);
    const landingPage = landingPageInput.startsWith("/") ? landingPageInput : "/";
    const offerVersion = textField(form, "offerVersion", 100) || offer.metaPixelOfferId;
    const formId = process.env[offer.ghlFormEnvironmentVariable] || "";
    const attribution = Object.fromEntries(
      utmKeys.map((key) => [key, textField(form, key, 200)]),
    );

    const customFields = [
      ...mappedCustomField("GHL_BATCH_DATE_FIELD_KEY", batchDate),
      ...mappedCustomField("GHL_TRANSACTION_ID_FIELD_KEY", transactionId),
      ...mappedCustomField("GHL_PAYMENT_METHOD_FIELD_KEY", paymentMethod),
      ...mappedCustomField("GHL_OFFER_VERSION_FIELD_KEY", offerVersion),
      ...mappedCustomField("GHL_OFFER_ID_FIELD_KEY", offer.id),
      ...mappedCustomField("GHL_OFFER_TYPE_FIELD_KEY", offer.type),
      ...mappedCustomField("GHL_AUDIENCE_SEGMENT_FIELD_KEY", offer.audienceSegment),
      ...mappedCustomField("GHL_LANDING_PAGE_FIELD_KEY", landingPage),
      ...mappedCustomField("GHL_FORM_ID_FIELD_KEY", formId),
      ...mappedCustomField("GHL_UTM_SOURCE_FIELD_KEY", attribution.utm_source),
      ...mappedCustomField("GHL_UTM_MEDIUM_FIELD_KEY", attribution.utm_medium),
      ...mappedCustomField("GHL_UTM_CAMPAIGN_FIELD_KEY", attribution.utm_campaign),
      ...mappedCustomField("GHL_UTM_CONTENT_FIELD_KEY", attribution.utm_content),
      ...mappedCustomField("GHL_UTM_TERM_FIELD_KEY", attribution.utm_term),
    ];

    const ghl = await fetch("https://services.leadconnectorhq.com/contacts/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Version: "2021-07-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        locationId,
        name: fullName,
        email,
        phone,
        source: "YouTube Workshop Landing Page",
        tags: [
          "workshop:registered",
          "workshop:new-registration",
          "status:pending-verification",
          `workshop:${offer.slug || "youtube-empire-builders"}`,
          "payment-pending",
          "whatsapp-consent"
        ],
        customFields,
      }),
    });

    if (!ghl.ok) {
      console.error("GHL error", ghl.status);
      return NextResponse.json(
        { error: "Registration save nahi hui. Dobara try karein." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Server error. Dobara try karein." },
      { status: 500 },
    );
  }
}
