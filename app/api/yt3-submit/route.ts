import { NextRequest, NextResponse } from "next/server";
import { ghlClient } from "@/lib/ghlClient";

function normalizePakPhone(phone: string) {
  let cleaned = phone.replace(/[^\d+]/g, "");
  if (cleaned.startsWith("03")) {
    cleaned = "+92" + cleaned.slice(1);
  } else if (cleaned.startsWith("3")) {
    cleaned = "+92" + cleaned;
  } else if (cleaned.startsWith("923")) {
    cleaned = "+" + cleaned;
  }
  return cleaned;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      phone,
      paymentMethod,
      transactionId,
      batchDate,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
      fbclid,
    } = body;

    if (!fullName || !phone) {
      return NextResponse.json(
        { success: false, error: "Name and Phone number are required." },
        { status: 400 }
      );
    }

    const normalizedPhone = normalizePakPhone(phone);
    const token = process.env.GHL_PRIVATE_INTEGRATION_TOKEN;
    const locationId = process.env.GHL_LOCATION_ID;

    const tags = [
      "workshop-yt3",
      "payment-verification-pending",
      "youtube-empire-builders",
      "lead:workshop-3",
      "live-workshop-registration",
      "whatsapp-consent",
    ];

    if (token && locationId) {
      try {
        // 1. Upsert Contact to GHL
        const ghlRes = await fetch("https://services.leadconnectorhq.com/contacts/upsert", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Version: "2021-07-28",
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            locationId,
            name: fullName.trim(),
            phone: normalizedPhone,
            source: "Landing Page: /workshops/yt3",
            tags,
            customFields: [
              ...(process.env.GHL_BATCH_DATE_FIELD_KEY && batchDate
                ? [{ key: process.env.GHL_BATCH_DATE_FIELD_KEY, field_value: batchDate }]
                : []),
              ...(process.env.GHL_TRANSACTION_ID_FIELD_KEY && transactionId
                ? [{ key: process.env.GHL_TRANSACTION_ID_FIELD_KEY, field_value: transactionId }]
                : []),
              ...(process.env.GHL_PAYMENT_METHOD_FIELD_KEY && paymentMethod
                ? [{ key: process.env.GHL_PAYMENT_METHOD_FIELD_KEY, field_value: paymentMethod }]
                : []),
              ...(process.env.GHL_LANDING_PAGE_FIELD_KEY
                ? [{ key: process.env.GHL_LANDING_PAGE_FIELD_KEY, field_value: "/workshops/yt3" }]
                : []),
            ],
          }),
        });

        const contactData = await ghlRes.json();
        const contactId = contactData?.contact?.id;

        // 2. Create Opportunity in GHL pipeline to trigger backend workflows
        const pipelineId = process.env.GHL_LIVE_WORKSHOP_PIPELINE_ID || process.env.GHL_PIPELINE_ID;
        const stageId = process.env.GHL_LIVE_WORKSHOP_PAYMENT_PENDING_STAGE_ID || process.env.GHL_PIPELINE_STAGE_ID;

        if (contactId && pipelineId && stageId) {
          await fetch("https://services.leadconnectorhq.com/opportunities", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              Version: "2021-07-28",
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              pipelineId,
              locationId,
              contactId,
              name: `${fullName.trim()} – YouTube Live Workshop (PKR 1,999)`,
              stageId,
              status: "open",
              monetaryValue: 1999,
            }),
          }).catch((err) => console.warn("Opportunity creation warning:", err));
        }
      } catch (ghlErr) {
        console.error("GHL integration error:", ghlErr);
      }
    } else {
      console.warn("GHL credentials missing, lead registered locally.");
    }

    return NextResponse.json({
      success: true,
      message: "Lead received and GHL automated workflow triggered.",
    });
  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json(
      { success: false, error: "Submission failed" },
      { status: 500 }
    );
  }
}
