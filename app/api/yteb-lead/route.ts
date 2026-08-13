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

  const webhookUrl = process.env.GHL_YTEB_INBOUND_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ error: "Lead capture is not configured." }, { status: 503 });
  }

  const payload = {
    first_name: name,
    full_name: name,
    phone,
    source: "YT Empire Builders landing page",
    lead_type: leadType,
    requested_offer: clean(input.requestedOffer, 120),
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
      return NextResponse.json({ error: "GHL rejected the submission." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to reach GHL." }, { status: 502 });
  }
}
