import { NextResponse } from "next/server";
import { ghlClient } from "@/lib/ghlClient";
import { getOfferById } from "@/lib/offers/offers";

function normalizePhone(phone?: string) {
  if (!phone) return undefined;
  // Basic normalization: keep only + and digits
  return phone.replace(/[^\d+]/g, "");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      offerId,
      offerName,
      offerType,
      landingPage,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
    } = body;

    // 1. Validate required fields
    if (!firstName || !email) {
      return NextResponse.json(
        { success: false, message: "Missing required fields (firstName, email)" },
        { status: 400 }
      );
    }

    // 2. Normalize data
    const normalizedEmail = email.toLowerCase().trim();
    const normalizedPhone = normalizePhone(phone);
    const normalizedFirstName = firstName.trim();
    const normalizedLastName = lastName?.trim();

    // 3. Find offer tag
    const tags: string[] = [];
    if (offerId) {
      const offer = getOfferById(offerId);
      if (offer && offer.audienceSegment) {
        tags.push(offer.audienceSegment);
      } else {
        // Fallback if offerId provided but not in registry
        tags.push(`offer-${offerId}`);
      }
    }

    // 4. Send to GoHighLevel
    if (ghlClient.isConfigured) {
      await ghlClient.upsertContact({
        firstName: normalizedFirstName,
        lastName: normalizedLastName,
        email: normalizedEmail,
        phone: normalizedPhone,
        tags: tags,
        // We could map UTMs and other fields to customFields if we had the field IDs,
        // but since we only have the raw UTM data and no specific GHL custom field IDs provided,
        // we omit them from the payload for now, or you can add them later.
      });
    } else {
      console.warn("GHL Integration is not configured. Skipping GHL contact creation.");
    }

    // 5. Safe success response
    return NextResponse.json({
      success: true,
      message: "Lead processed successfully",
    });
  } catch (error) {
    // 6. Safe error response, no internal details exposed
    console.error("Error processing lead in /api/leads");
    return NextResponse.json(
      { success: false, message: "An error occurred while processing the lead" },
      { status: 500 }
    );
  }
}
