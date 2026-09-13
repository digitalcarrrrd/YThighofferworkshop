import { NextRequest, NextResponse } from "next/server";

async function uploadToGhlMedia(base64Data: string, filename: string, token: string): Promise<string | null> {
  try {
    const cleanB64 = base64Data.replace(/^data:[^;]+;base64,/, "");
    const mimeMatch = base64Data.match(/^data:(image\/[a-zA-Z+]+|application\/pdf);base64,/);
    const mimeType = mimeMatch ? mimeMatch[1] : "image/jpeg";
    const buffer = Buffer.from(cleanB64, "base64");

    const formData = new FormData();
    formData.append("file", new Blob([buffer], { type: mimeType }), filename || "receipt.jpg");

    const res = await fetch("https://services.leadconnectorhq.com/medias/upload-file", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Version: "2021-07-28",
      },
      body: formData,
    });

    if (!res.ok) {
      console.warn("GHL Media upload failed:", res.status);
      return null;
    }

    const data = await res.json();
    return data?.url || null;
  } catch (err) {
    console.warn("GHL Media upload error:", err);
    return null;
  }
}

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
      email,
      paymentMethod,
      transactionId,
      screenshotBase64,
      screenshotFilename,
      batchDate,
      academicStatus,
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
    const token = process.env.GHL_PRIVATE_INTEGRATION_TOKEN || "pit-4259cd3b-222c-4b57-8f88-400949576d75";
    const locationId = process.env.GHL_LOCATION_ID || "6MzIr7iWX12OyaxfufLw";

    // 1. Store payment screenshot to native GHL CDN if provided
    let receiptUrl = "";
    if (screenshotBase64 && typeof screenshotBase64 === "string" && screenshotBase64.length > 50 && token) {
      try {
        const uploaded = await uploadToGhlMedia(
          screenshotBase64,
          screenshotFilename || `yt6_receipt_${Date.now()}.jpg`,
          token
        );
        if (uploaded) {
          receiptUrl = uploaded;
          console.log("[YT6 SUBMIT] Stored receipt to GHL Media CDN:", receiptUrl);
        }
      } catch (e) {
        console.warn("[YT6 SUBMIT] Receipt storage error:", e);
      }
    }

    const tags = [
      "workshop-yt6",
      "chatgpt-dollar-student",
      "payment-verification-pending",
      "youtube-empire-builders",
      "lead:workshop-6",
      "live-workshop-registration",
      "whatsapp-consent",
    ];

    if (token && locationId) {
      try {
        // 2. Upsert Contact to GHL (including email and firstName)
        const contactPayload: any = {
          locationId,
          name: fullName.trim(),
          firstName: fullName.trim().split(" ")[0],
          phone: normalizedPhone,
          source: "Landing Page: /workshops/yt-6",
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
              ? [{ key: process.env.GHL_LANDING_PAGE_FIELD_KEY, field_value: "/workshops/yt-6" }]
              : []),
            ...(process.env.GHL_PAYMENT_PROOF_FIELD_KEY && receiptUrl
              ? [{ key: process.env.GHL_PAYMENT_PROOF_FIELD_KEY, field_value: receiptUrl }]
              : []),
          ],
        };

        if (email && email.trim().includes("@")) {
          contactPayload.email = email.trim().toLowerCase();
        }

        const ghlRes = await fetch("https://services.leadconnectorhq.com/contacts/upsert", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Version: "2021-07-28",
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(contactPayload),
        });

        const contactData = await ghlRes.json();
        const contactId = contactData?.contact?.id;

        // 3. Add a detailed note with the clickable screenshot link
        if (contactId) {
          const noteLines = [
            `📸 [PAYMENT SCREENSHOT ATTACHED VIA WEBSITE FORM - WORKSHOP 6]`,
            `• Student: ${fullName.trim()}`,
            `• Phone: ${normalizedPhone}`,
            email ? `• Email: ${email.trim()}` : "",
            `• Payment Method: ${paymentMethod}`,
            `• Transaction ID: ${transactionId || "N/A"}`,
            `• Batch: ${batchDate || "Today"}`,
            `• Amount: PKR 1,999`,
            receiptUrl ? `\n👉 View Payment Screenshot:\n${receiptUrl}` : "\n💬 Slip Delivery: Student sending payment receipt via WhatsApp chat.",
          ].filter(Boolean).join("\n");

          await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              Version: "2021-07-28",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ body: noteLines }),
          }).catch((err) => console.warn("Note creation warning:", err));
        }

        // 4. Create Opportunity in active GHL pipeline (Abrar Nadir Workshop Admissions)
        const pipelineId = process.env.GHL_LIVE_WORKSHOP_PIPELINE_ID || "SLf8kzZ9MhXAyQYFeAm2";
        const stageId = process.env.GHL_LIVE_WORKSHOP_PAYMENT_PENDING_STAGE_ID || "1519847d-e659-4ec8-8177-8c5c63b880f0";

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
              name: `${fullName.trim()} - YTEmpireBuilder YouTube Masterclass`,
              pipelineStageId: stageId,
              status: "open",
              monetaryValue: 1999,
            }),
          }).catch((err) => console.warn("Opportunity creation warning:", err));
        }
      } catch (ghlErr) {
        console.error("GHL integration error:", ghlErr);
      }
    }

    return NextResponse.json({
      success: true,
      receiptUrl: receiptUrl || null,
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
