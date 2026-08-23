import { NextResponse } from "next/server";

const allowedLeadTypes = new Set(["community-payment", "custom-price"]);

function clean(value: unknown, maxLength = 500) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
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
  const leadType = clean(input.leadType, 40);
  const age = clean(input.age, 3);
  const city = clean(input.city, 100);
  const requestedOffer = clean(input.requestedOffer, 120);
  const paymentMethod = clean(input.paymentMethod, 80);
  const payableAmount = clean(input.payableAmount, 50);
  const coupon = clean(input.coupon, 50);

  if (
    name.length < 2 ||
    phone.replace(/\D/g, "").length < 10 ||
    !allowedLeadTypes.has(leadType)
  ) {
    return NextResponse.json({ error: "Name, WhatsApp and lead type are required." }, { status: 400 });
  }

  const normalizedPhone = normalizePakPhone(phone);
  const portalUrl = `/portal?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&plan=${encodeURIComponent(requestedOffer)}`;

  const token = process.env.GHL_PRIVATE_INTEGRATION_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  const webhookUrl = process.env.GHL_YTEB_INBOUND_WEBHOOK_URL;

  const tags = [
    "yt-empire-builders",
    "yteb-academy",
    "lead:yt-empire-builders",
    "community-payment",
    "portal-active",
    "payment-verification-pending",
    "whatsapp-consent",
  ];

  // 1. Direct GHL Contact Upsert via API
  if (token && locationId) {
    try {
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
          name: name,
          phone: normalizedPhone,
          ...(email ? { email } : {}),
          ...(city ? { city } : {}),
          source: "Landing Page: /ytempirebuilder",
          tags,
          customFields: [
            ...(requestedOffer ? [{ key: "requested_offer", field_value: requestedOffer }] : []),
            ...(paymentMethod ? [{ key: "payment_method", field_value: paymentMethod }] : []),
            ...(age ? [{ key: "age", field_value: age }] : []),
            { key: "portal_access_url", field_value: `https://www.abrarnadir.com${portalUrl}` },
          ],
        }),
      });

      const contactData = await ghlRes.json();
      const contactId = contactData?.contact?.id;

      // 2. Create Opportunity in GHL
      const pipelineId = process.env.GHL_PIPELINE_ID;
      const stageId = process.env.GHL_PIPELINE_STAGE_ID;

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
            name: `${name} – YT Empire Builders (${payableAmount ? `PKR ${payableAmount}` : "Full Program"})`,
            stageId,
            status: "open",
            monetaryValue: payableAmount ? Number(payableAmount) : 30000,
          }),
        }).catch((err) => console.warn("YTEB Opportunity creation note:", err));
      }
    } catch (apiErr) {
      console.warn("GHL API Direct Upsert note:", apiErr);
    }
  }

  // 3. Webhook Dispatch if configured
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
      payment_screenshot_status: clean(input.screenshot, 100) || "Uploaded via Portal / WhatsApp",
      payable_amount: payableAmount,
      coupon,
      portal_access_url: `https://www.abrarnadir.com${portalUrl}`,
      goal: clean(input.goal),
      current_stage: clean(input.stage),
      income_situation: clean(input.income),
      pressure: clean(input.pressure),
      available_budget: clean(input.budget),
      environment: clean(input.environment),
      available_time: clean(input.time),
      biggest_blocker: clean(input.blocker),
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

  return NextResponse.json({ ok: true, portalUrl });
}
