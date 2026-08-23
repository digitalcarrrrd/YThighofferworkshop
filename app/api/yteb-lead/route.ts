import { NextResponse } from "next/server";

const allowedLeadTypes = new Set(["community-payment", "custom-price"]);

function clean(value: unknown, maxLength = 500) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
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
  const leadType = clean(input.leadType, 40);

  if (
    name.length < 2 ||
    phone.replace(/\D/g, "").length < 10 ||
    !allowedLeadTypes.has(leadType)
  ) {
    return NextResponse.json({ error: "Name, WhatsApp and lead type are required." }, { status: 400 });
  }

  const portalUrl = `/portal?name=${encodeURIComponent(name)}&email=${encodeURIComponent(clean(input.email, 160))}&phone=${encodeURIComponent(phone)}&plan=${encodeURIComponent(clean(input.requestedOffer, 120))}`;

  const webhookUrl = process.env.GHL_YTEB_INBOUND_WEBHOOK_URL;
  if (!webhookUrl) {
    // Return success with portalUrl even if webhook is pending config
    return NextResponse.json({ ok: true, portalUrl, note: "Webhook pending configuration" });
  }

  const payload = {
    first_name: name,
    full_name: name,
    phone,
    email: clean(input.email, 160),
    age: clean(input.age, 3),
    city: clean(input.city, 100),
    source: "YT Empire Builders landing page",
    lead_type: leadType,
    requested_offer: clean(input.requestedOffer, 120),
    payment_method: clean(input.paymentMethod, 80),
    payment_screenshot_status: clean(input.screenshot, 100) || "Uploaded via Portal / WhatsApp",
    payable_amount: clean(input.payableAmount, 50),
    coupon: clean(input.coupon, 50),
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
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!response.ok) {
      console.warn("GHL webhook returned non-200, continuing with portal access.");
    }

    return NextResponse.json({ ok: true, portalUrl });
  } catch (err) {
    console.warn("GHL webhook dispatch error:", err);
    return NextResponse.json({ ok: true, portalUrl });
  }
}
