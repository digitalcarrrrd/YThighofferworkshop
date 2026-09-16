import { NextRequest, NextResponse } from "next/server";

const packages = new Set([
  "10-Day Fast Entry — Creator Residency (PKR 100,000)",
  "10-Day Fast Entry — Lahore Local Operator (PKR 60,000)",
  "15-Day Best Value — Creator Residency (PKR 140,000)",
  "15-Day Best Value — Lahore Local Operator (PKR 80,000)",
  "30-Day Deep Systemization — Waitlist",
  "7-Day Sprint — PKR 100,000",
  "14-Day Build Sprint — PKR 180,000",
  "30-Day Creator Residency — PKR 300,000",
  "10-Day Builder — PKR 85,000",
  "15-Day Pro — PKR 120,000",
  "Private 30-Day — PKR 220,000",
]);
const attempts = new Map<string, { count: number; resetAt: number }>();

function clean(value: unknown, max = 1000) { return typeof value === "string" ? value.trim().slice(0, max) : ""; }
function normalizePhone(value: string) { const digits = value.replace(/\D/g, ""); if (/^923\d{9}$/.test(digits)) return `+${digits}`; if (/^03\d{9}$/.test(digits)) return `+92${digits.slice(1)}`; if (/^3\d{9}$/.test(digits)) return `+92${digits}`; return ""; }
function customField(envName: string, value: string) { const id = process.env[envName]; return id && value ? [{ id, field_value: value }] : []; }

function parsePackageAmount(pkg: string): number {
  if (pkg.includes("300,000")) return 300000;
  if (pkg.includes("250,000")) return 250000;
  if (pkg.includes("220,000")) return 220000;
  if (pkg.includes("180,000")) return 180000;
  if (pkg.includes("140,000")) return 140000;
  if (pkg.includes("120,000")) return 120000;
  if (pkg.includes("100,000")) return 100000;
  if (pkg.includes("85,000")) return 85000;
  if (pkg.includes("80,000")) return 80000;
  if (pkg.includes("60,000")) return 60000;
  return 0;
}

async function ghl(path: string, init: RequestInit = {}) {
  const token = process.env.GHL_PRIVATE_INTEGRATION_TOKEN || "pit-4259cd3b-222c-4b57-8f88-400949576d75";
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
    const errText = await response.text().catch(() => "");
    console.error("Content Colony GHL request failed", { path, status: response.status, body: errText });
    throw new Error(`CRM request failed: ${response.status}`);
  }
  return response.json();
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    const now = Date.now(); const hit = attempts.get(ip);
    if (hit && hit.resetAt > now && hit.count >= 5) return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
    attempts.set(ip, { count: hit && hit.resetAt > now ? hit.count + 1 : 1, resetAt: now + 900_000 });

    const input = await request.json() as Record<string, unknown>;
    if (clean(input.website)) return NextResponse.json({ ok: true, reference: crypto.randomUUID() });
    const fullName = clean(input.fullName, 120), phone = normalizePhone(clean(input.phone, 30)), email = clean(input.email, 160), city = clean(input.city, 80), selectedPackage = clean(input.package, 120);
    const memberStatus = clean(input.memberStatus, 80), currentBuild = clean(input.currentBuild), bottleneck = clean(input.bottleneck), successDefinition = clean(input.successDefinition), budgetReadiness = clean(input.budgetReadiness, 80), earlyParticipation = clean(input.earlyParticipation, 80);
    const ageRaw = clean(input.age, 3);
    const age = ageRaw ? Number(ageRaw) : undefined;
    if (fullName.length < 2 || !phone || !/^\S+@\S+\.\S+$/.test(email) || city.length < 2 || !packages.has(selectedPackage) || currentBuild.length < 3 || bottleneck.length < 3 || successDefinition.length < 3 || input.acknowledgement !== "accepted" || input.consent !== "accepted") return NextResponse.json({ error: "Please complete all required application fields correctly." }, { status: 400 });

    const locationId = process.env.GHL_LOCATION_ID || "6MzIr7iWX12OyaxfufLw";
    const pipelineId = process.env.GHL_CONTENT_COLONY_PIPELINE_ID || "swjd1j1hfYaPrRevKvvK";
    const stageId = process.env.GHL_CONTENT_COLONY_APPLICATION_STAGE_ID || "416d76a8-f0fc-41c4-834f-7890fb31cf9e";
    const notes = [`Package: ${selectedPackage}`, `Age: ${age}`, `Member: ${memberStatus}`, `Budget: ${budgetReadiness}`, `Early participation: ${earlyParticipation}`, `Current build: ${currentBuild}`, `Bottleneck: ${bottleneck}`, `Success: ${successDefinition}`].join("\n");
    const customFields = [...customField("GHL_CONTENT_COLONY_PACKAGE_FIELD_ID", selectedPackage), ...customField("GHL_CONTENT_COLONY_MEMBER_FIELD_ID", memberStatus), ...customField("GHL_CONTENT_COLONY_APPLICATION_FIELD_ID", notes)];
    const contactData = await ghl("/contacts/upsert", { method: "POST", body: JSON.stringify({ locationId, name: fullName, phone, email, city, source: "Content Colony Application", tags: ["content-colony", "cc-application", "application-pending", ...(memberStatus.startsWith("Yes") ? ["yt-empire-builder-member"] : [])], customFields }) });
    const contactId = contactData?.contact?.id as string | undefined;
    if (!contactId) throw new Error("Contact was not returned");
    const opportunityName = `${fullName} — Content Colony — ${selectedPackage.split(" — ")[0]}`;
    const monetaryValue = parsePackageAmount(selectedPackage);

    let duplicate = false;
    try {
      const search = await ghl(`/opportunities/search?location_id=${encodeURIComponent(locationId)}&contact_id=${encodeURIComponent(contactId)}&status=open`);
      duplicate = Boolean(search?.opportunities?.some((opportunity: { pipelineId?: string; name?: string; status?: string }) => opportunity.pipelineId === pipelineId && opportunity.status === "open" && opportunity.name === opportunityName));
    } catch (searchError) {
      console.warn("Opportunity search non-critical failure:", searchError instanceof Error ? searchError.message : "unknown");
    }

    if (!duplicate) {
      await ghl("/opportunities/", {
        method: "POST",
        body: JSON.stringify({
          locationId,
          pipelineId,
          pipelineStageId: stageId,
          contactId,
          name: opportunityName,
          status: "open",
          source: "cc-landing-page",
          monetaryValue,
        }),
      });
    }

    return NextResponse.json({ ok: true, reference: crypto.randomUUID(), duplicate });
  } catch (error) {
    console.error("Content Colony application failed", error instanceof Error ? error.message : "unknown");
    return NextResponse.json({ error: "We could not save your application. Please try again or contact our team on WhatsApp." }, { status: 502 });
  }
}
