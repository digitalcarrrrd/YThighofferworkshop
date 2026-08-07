import { NextRequest, NextResponse } from "next/server";
import { utmKeys } from "@/lib/analytics";
import { getOfferById } from "@/lib/offers/offers";

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
        { error: "Too many attempts. Try again in 15 minutes." },
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
    const offerId = textField(form, "offerId", 100);
    const offer = getOfferById(offerId);
    const proof = form.get("paymentProof");

    if (
      !offer ||
      fullName.length < 2 ||
      !emailPattern.test(email) ||
      phone.replace(/\D/g, "").length < 10 ||
      (transactionId.length > 0 && transactionId.length < 4) ||
      !["Bank Transfer", "Easypaisa/JazzCash", "Easypaisa", "JazzCash"].includes(paymentMethod) ||
      !(proof instanceof File) ||
      proof.size > 5_000_000 ||
      !["image/jpeg", "image/png", "image/webp"].includes(proof.type)
    ) {
      return NextResponse.json(
        { error: "Please check your form details. Screenshot must be JPG/PNG/WebP and under 5MB." },
        { status: 400 },
      );
    }

    const token = process.env.GHL_PRIVATE_INTEGRATION_TOKEN;
    const locationId = process.env.GHL_LOCATION_ID;
    const testMode = process.env.GHL_TEST_MODE === "true";

    if (!token || !locationId) {
      if (process.env.NODE_ENV === "development") {
        return NextResponse.json({ ok: true, mode: "local-test" });
      }
      return NextResponse.json(
        { error: "Registration service is not configured. Please contact support." },
        { status: 503 },
      );
    }

    const landingPageInput = textField(form, "landingPage", 200);
    const landingPage = landingPageInput.startsWith("/") ? landingPageInput : "/";
    const attribution = Object.fromEntries(
      utmKeys.map((key) => [key, textField(form, key, 200)]),
    );

    // 1. Storage Upload
    let paymentProofUrl = "Pending Upload (No storage configured)";
    let storageError = "";

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const bucket = process.env.SUPABASE_STORAGE_BUCKET || "payment-proofs";
    
    if (supabaseUrl && supabaseKey) {
      try {
        const fileExt = proof.name.split('.').pop() || "jpg";
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const uploadRes = await fetch(`${supabaseUrl}/storage/v1/object/${bucket}/${fileName}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': proof.type
          },
          body: await proof.arrayBuffer()
        });
        
        if (uploadRes.ok) {
          paymentProofUrl = `${supabaseUrl}/storage/v1/object/public/${bucket}/${fileName}`;
        } else {
          storageError = "Supabase upload failed.";
        }
      } catch (err) {
        storageError = "Supabase upload error.";
      }
    } else if (process.env.AWS_S3_BUCKET || process.env.CLOUDINARY_CLOUD_NAME) {
      storageError = "Storage SDKs for AWS/Cloudinary are not installed.";
    } else {
      storageError = "No secure production storage is configured.";
    }

    // 2. Map GHL custom fields
    const customFields = [
      ...mappedCustomField("GHL_BATCH_DATE_FIELD_KEY", batchDate),
      ...mappedCustomField("GHL_TRANSACTION_ID_FIELD_KEY", transactionId),
      ...mappedCustomField("GHL_PAYMENT_METHOD_FIELD_KEY", paymentMethod),
      ...mappedCustomField("GHL_PAYMENT_PROOF_FIELD_KEY", paymentProofUrl),
      ...mappedCustomField("GHL_OFFER_ID_FIELD_KEY", offer.id),
      ...mappedCustomField("GHL_OFFER_TYPE_FIELD_KEY", offer.type),
      ...mappedCustomField("GHL_AUDIENCE_SEGMENT_FIELD_KEY", offer.audienceSegment),
      ...mappedCustomField("GHL_LANDING_PAGE_FIELD_KEY", landingPage),
      ...mappedCustomField("GHL_UTM_SOURCE_FIELD_KEY", attribution.utm_source),
      ...mappedCustomField("GHL_UTM_MEDIUM_FIELD_KEY", attribution.utm_medium),
      ...mappedCustomField("GHL_UTM_CAMPAIGN_FIELD_KEY", attribution.utm_campaign),
      ...mappedCustomField("GHL_UTM_CONTENT_FIELD_KEY", attribution.utm_content),
      ...mappedCustomField("GHL_UTM_TERM_FIELD_KEY", attribution.utm_term),
    ];

    const tags = ["source:website"];
    if (offer.leadTag) tags.push(offer.leadTag);
    if (offer.paymentPendingTag) tags.push(offer.paymentPendingTag);
    if (testMode) tags.push("test-lead");

    // 3. Create or Update Contact (Upsert)
    const contactRes = await fetch("https://services.leadconnectorhq.com/contacts/upsert", {
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
        source: "Website Registration",
        tags,
        customFields,
        ...(testMode && {
          dnd: true,
          dndSettings: {
            Call: { status: "active", message: "Test mode" },
            Email: { status: "active", message: "Test mode" },
            SMS: { status: "active", message: "Test mode" },
            WhatsApp: { status: "active", message: "Test mode" },
            GMB: { status: "active", message: "Test mode" },
            FB: { status: "active", message: "Test mode" }
          }
        }),
      }),
    });

    if (!contactRes.ok) {
      console.error("GHL Contact Error", contactRes.status, await contactRes.text());
      return NextResponse.json({ error: "Failed to create contact." }, { status: 502 });
    }

    const contactData = await contactRes.json();
    const contactId = contactData?.contact?.id;

    // 4. Create Opportunity
    if (contactId && offer.pipelineEnvironmentVariable && offer.stageEnvironmentVariable) {
      const pipelineId = process.env[offer.pipelineEnvironmentVariable];
      const stageId = process.env[offer.stageEnvironmentVariable];

      if (pipelineId && stageId) {
        // Find existing opportunity to prevent duplicates
        const searchRes = await fetch(`https://services.leadconnectorhq.com/opportunities/search?location_id=${locationId}&contact_id=${contactId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Version: "2021-07-28",
          }
        });
        
        let shouldCreate = true;
        if (searchRes.ok) {
          const searchData = await searchRes.json();
          const existing = searchData?.opportunities?.find((o: { pipelineId: string, status: string }) => o.pipelineId === pipelineId && o.status === "open");
          if (existing) shouldCreate = false;
        }

        if (shouldCreate) {
          await fetch("https://services.leadconnectorhq.com/opportunities/", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              Version: "2021-07-28",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              pipelineId,
              locationId,
              name: `${fullName} - ${offer.title}${testMode ? " [TEST]" : ""}`,
              pipelineStageId: stageId,
              status: "open",
              contactId: contactId,
              monetaryValue: offer.conversionValue || 0,
            }),
          });
        }
      }
    }

    return NextResponse.json({ 
      ok: true, 
      storageWarning: storageError || undefined 
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Server error. Please try again." },
      { status: 500 },
    );
  }
}
