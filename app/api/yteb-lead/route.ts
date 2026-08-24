import { NextResponse } from "next/server";
import { storeReceiptAsync } from "../receipt/route";
import { ghlClient } from "@/lib/ghlClient";

const allowedLeadTypes = new Set(["community-payment", "custom-price"]);

function clean(value: unknown, maxLength = 500) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function normalizePakPhone(phone: string) {
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

export async function POST(request: Request) {
  let input: Record<string, unknown>;

  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = clean(input.name, 100);
  const phone = clean(input.phone, 40);
  const email = clean(input.email, 160);
  const leadType = clean(input.leadType, 40) || "community-payment";
  const age = clean(input.age, 10);
  const city = clean(input.city, 100);
  const requestedOffer = clean(input.requestedOffer, 120);
  const paymentMethod = clean(input.paymentMethod, 80);
  const payableAmount = clean(input.payableAmount, 50);
  const coupon = clean(input.coupon, 50);
  const screenshotRaw = typeof input.screenshot === "string" ? input.screenshot : "";
  const screenshotFilename = clean(input.screenshotFilename, 100) || "receipt.png";

  if (name.length < 2 || phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json({ error: "Name and WhatsApp number are required." }, { status: 400 });
  }

  const normalizedPhone = normalizePakPhone(phone);
  const lmsUrl = "https://lms.abrarnadir.com";

  // Process screenshot directly (Direct CDN URL or Async Upload)
  let receiptUrl = "";
  if (screenshotRaw.startsWith("http://") || screenshotRaw.startsWith("https://")) {
    receiptUrl = screenshotRaw;
  } else if (screenshotRaw && screenshotRaw.startsWith("data:")) {
    try {
      receiptUrl = await storeReceiptAsync(screenshotRaw, screenshotFilename);
    } catch (e) {
      console.warn("Receipt store note:", e);
    }
  }

  const tags = [
    "yt-empire-builders",
    "yteb-academy",
    "lead:yt-empire-builders",
    "community-payment",
    "payment-verification-pending",
    "whatsapp-consent",
  ];

  if (city) tags.push(`city:${city.toLowerCase().replace(/[^a-z0-9]/g, "-")}`);
  if (paymentMethod) tags.push(`pay:${paymentMethod.toLowerCase().replace(/[^a-z0-9]/g, "-")}`);

  let contactId = null;
  let opportunityId = null;

  // 1. Direct GHL Contact Upsert via ghlClient
  if (ghlClient.isConfigured) {
    try {
      const contactResult = await ghlClient.upsertContact({
        firstName: name.split(" ")[0] || name,
        lastName: name.split(" ").slice(1).join(" ") || "",
        phone: normalizedPhone,
        email: email || `${normalizedPhone.replace(/[^\d]/g, "")}@whatsapp.user`,
        companyName: "YT Empire Builders",
        tags,
      });

      contactId = contactResult?.contact?.id || contactResult?.id || null;

      // 2. Add Detailed Note with Clickable Screenshot Link to Contact
      if (contactId) {
        const noteBody = `📝 YT EMPIRE BUILDERS ENROLLMENT & PAYMENT PROOF:\n• Student Name: ${name}\n• WhatsApp: ${normalizedPhone}\n• Email: ${email || "Not entered"}\n• City: ${city || "N/A"} | Age: ${age || "N/A"}\n• Enrolled Plan: ${requestedOffer || "Pay in Full"}\n• Amount Payable: PKR ${payableAmount || "30,000"}\n• Payment Method: ${paymentMethod || "Meezan Bank"}\n• Payment Screenshot Link: ${receiptUrl || "Sent via WhatsApp (+92 329 6158206)"}\n• Official LMS Link: ${lmsUrl}`;

        await ghlClient.addNote(contactId, noteBody);

        // 3. Create Opportunity in YT Empire Builders Pipeline (Guaranteed IDs)
        const pipelineId = process.env.GHL_ACADEMY_PIPELINE_ID || "CZYMTQUzq7a6faEIKdtZ";
        const stageId = process.env.GHL_ACADEMY_STAGE_FORM_FILL || process.env.GHL_ACADEMY_STAGE_ID || "e6ed9068-7d5e-49ff-ba46-5b9072545fd1";
        const numericValue = payableAmount ? Number(String(payableAmount).replace(/[^\d]/g, "")) || 30000 : 30000;

        const oppResult = await ghlClient.createOpportunity({
          contactId,
          name: `${name} — YT Empire Builders (PKR ${numericValue.toLocaleString()})`,
          pipelineId,
          pipelineStageId: stageId,
          status: "open",
          monetaryValue: numericValue,
        });

        opportunityId = oppResult?.opportunity?.id || oppResult?.id || null;

        // 4. Automated Welcome Email Dispatch with lms.abrarnadir.com
        if (email) {
          const emailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0b100c; color: #ffffff; padding: 30px; border-radius: 16px; border: 1px solid #2fd97e;">
              <h2 style="color: #2fd97e; margin-top: 0;">🎉 Welcome to YT Empire Builders!</h2>
              <p>Salam <b>${name}</b>,</p>
              <p>Aap ki payment details verification desk par successfully receive ho chuki hain.</p>
              
              <div style="background: rgba(47, 217, 126, 0.1); border: 1px solid #2fd97e; padding: 20px; border-radius: 12px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #2fd97e;">🚀 Official LMS Access:</h3>
                <p style="margin-bottom: 15px;">Aapka official learning portal active hai:</p>
                <a href="${lmsUrl}" style="display: inline-block; background: #2fd97e; color: #000000; font-weight: bold; padding: 12px 24px; border-radius: 8px; text-decoration: none;">Open LMS Portal (lms.abrarnadir.com) →</a>
              </div>

              <h4 style="color: #ffffff; margin-bottom: 8px;">What's Inside Your LMS:</h4>
              <ul style="color: #9ca3af; padding-left: 20px; line-height: 1.8;">
                <li>12 Comprehensive HD Video Modules</li>
                <li>50+ AI Prompts Swipe File (ChatGPT 4o & Claude)</li>
                <li>90-Day Content Calendar & Batch Planner</li>
                <li>YouTube Niche Validation Decision Matrix</li>
                <li>Private VIP WhatsApp Community Access</li>
              </ul>

              <p style="margin-top: 25px; font-size: 13px; color: #9ca3af;">Direct WhatsApp Support: <b style="color: #ffffff;">+92 329 6158206</b></p>
              <p style="margin-bottom: 0;">Shukriya,<br><b>Abrar Nadir</b><br>Founder, YT Empire Builders</p>
            </div>
          `;

          await ghlClient.sendEmail(
            contactId,
            email,
            "🎉 Welcome to YT Empire Builders — Your LMS Access",
            emailHtml
          ).catch((e) => console.warn("Email dispatch note:", e));
        }
      }
    } catch (apiErr) {
      console.warn("GHL API Direct Upsert note:", apiErr);
    }
  }

  // 5. Webhook Dispatch if configured
  const webhookUrl = process.env.GHL_YTEB_INBOUND_WEBHOOK_URL;
  if (webhookUrl) {
    const payload = {
      first_name: name,
      full_name: name,
      phone: normalizedPhone,
      email,
      age,
      city,
      source: "YT Empire Builders landing page",
      lead_type: leadType,
      requested_offer: requestedOffer,
      payment_method: paymentMethod,
      payment_screenshot_url: receiptUrl || "Attached in Portal / WhatsApp",
      payable_amount: payableAmount,
      coupon,
      portal_access_url: lmsUrl,
      note: clean(input.note, 1500),
      submitted_at: new Date().toISOString(),
    };

    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
      });
    } catch (err) {
      console.warn("GHL webhook dispatch note:", err);
    }
  }

  return NextResponse.json({ ok: true, lmsUrl, receiptUrl, contactId, opportunityId });
}
