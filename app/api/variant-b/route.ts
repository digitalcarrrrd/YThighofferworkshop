import { NextRequest, NextResponse } from "next/server";
import {
  VARIANT_B_CONFIG,
  sendWhatsAppMessage,
  updateOpportunityStage,
  updateContactCustomFields,
  addContactTag,
  getOrCreateVariantBOpportunity,
  buildFirstInteractiveMessage,
  buildPersonalizedInterestResponse,
  buildWorkshopDetailsBranch,
  buildFeeAndPaymentBranch,
  buildPaymentProofReceivedBranch,
  buildPaymentApprovedBranch,
  buildHumanHandoffMessage,
  checkHumanHandoffTriggers,
  generateControlledAIResponse
} from "@/lib/variantBEngine";

/**
 * PHASE 4 & 5 & 6: Standalone Endpoint for Variant B Workflow
 * Receives webhook from GHL or inbound WhatsApp message when keyword contains ABRAR-PREFILL-B
 * Strictly isolated to Variant B pipeline ("Abrar Workshop | Prefill & Interest Test")
 */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("[VARIANT B INBOUND]", JSON.stringify(body));

    const contactId = body.contactId || body.contact_id || body.contact?.id || body.id;
    const incomingText = String(body.message || body.body || body.text || "").trim();
    const upperText = incomingText.toUpperCase();
    const contactName = body.contactName || body.name || body.first_name || body.contact?.first_name || "Creator";
    const firstName = contactName.split(" ")[0] || "there";

    if (!contactId) {
      return NextResponse.json({ success: false, error: "Missing contactId" }, { status: 400 });
    }

    // 1. Check if customer requested STOP/DND (Phase 8 Compliance)
    if (upperText === "STOP" || upperText === "UNSUBSCRIBE" || upperText === "CANCEL") {
      await addContactTag(contactId, "dnd_whatsapp");
      return NextResponse.json({ success: true, action: "dnd_applied" });
    }

    // 2. Fetch or create single opportunity in Variant B pipeline
    const oppResult = await getOrCreateVariantBOpportunity(contactId, contactName);
    const opportunityId = oppResult.opportunityId;
    const currentStageId = oppResult.opportunity?.pipelineStageId || VARIANT_B_CONFIG.STAGES.NEW_PREFILL_LEAD;

    // 3. PRIORITY 1: Check Human Operator Active or Hand-off Required (Phase 8)
    const handoff = checkHumanHandoffTriggers(incomingText);
    if (handoff.isHandoff) {
      if (opportunityId) {
        await updateOpportunityStage(opportunityId, VARIANT_B_CONFIG.STAGES.HUMAN_HELP_REQUIRED);
      }
      await addContactTag(contactId, VARIANT_B_CONFIG.TAGS.HUMAN_HELP);
      await updateContactCustomFields(contactId, [
        { id: VARIANT_B_CONFIG.CUSTOM_FIELDS.AI_HANDOFF_REASON, field_value: handoff.reason || "Keyword Trigger" }
      ]);
      await sendWhatsAppMessage(contactId, buildHumanHandoffMessage(handoff.reason || "Human review requested"));
      return NextResponse.json({ success: true, action: "human_handoff", reason: handoff.reason });
    }

    // 4. CHECK ENTRY TRIGGER: CLAIM VIP MASTERCLASS SEAT (or legacy ABRAR-PREFILL-B)
    const isEntryKeyword = upperText.includes("CLAIM VIP MASTERCLASS SEAT") || 
                           upperText.includes("VIP MASTERCLASS") || 
                           upperText.includes("CLAIM VIP SEAT") ||
                           upperText.includes(VARIANT_B_CONFIG.LEGACY_SOURCE_KEYWORD);

    if (isEntryKeyword || oppResult.isNew) {
      // Apply initial tag & metadata
      await addContactTag(contactId, VARIANT_B_CONFIG.TAGS.ENTRY_B);
      await updateContactCustomFields(contactId, [
        { id: VARIANT_B_CONFIG.CUSTOM_FIELDS.EXPERIMENT_VARIANT, field_value: VARIANT_B_CONFIG.VARIANT_NAME },
        { id: VARIANT_B_CONFIG.CUSTOM_FIELDS.AD_KEYWORD, field_value: "CLAIM VIP MASTERCLASS SEAT" }
      ]);

      // If prefill payload contains submitted profile answers, save them
      const customUpdates: any[] = [];
      if (body.current_status || body.status) {
        customUpdates.push({ id: VARIANT_B_CONFIG.CUSTOM_FIELDS.CURRENT_STATUS, field_value: body.current_status || body.status });
      }
      if (body.experience_level) {
        customUpdates.push({ id: VARIANT_B_CONFIG.CUSTOM_FIELDS.EXPERIENCE_LEVEL, field_value: body.experience_level });
      }
      if (body.workshop_intent || body.goal) {
        customUpdates.push({ id: VARIANT_B_CONFIG.CUSTOM_FIELDS.WORKSHOP_INTENT, field_value: body.workshop_intent || body.goal });
      }
      if (customUpdates.length > 0) {
        await updateContactCustomFields(contactId, customUpdates);
        if (opportunityId) {
          await updateOpportunityStage(opportunityId, VARIANT_B_CONFIG.STAGES.PROFILE_CAPTURED);
        }
      }

      // Send First Interactive List/Number Message (Phase 5)
      await sendWhatsAppMessage(contactId, buildFirstInteractiveMessage(firstName));
      return NextResponse.json({ success: true, action: "entry_message_sent" });
    }

    // 5. INTEREST SELECTION BRANCHING (YOUTUBE & AI EARNING CENTRIC)
    let selectedInterest: 'faceless_dollars' | 'ai_automation' | 'high_cpm_niches' | 'monthly_income' | 'details_first' | null = null;
    let interestTag = '';
    let interestLabel = '';

    if (upperText === "1" || upperText.includes("FACELESS") || upperText.includes("DOLLAR") || upperText.includes("DOLLARS")) {
      selectedInterest = 'faceless_dollars';
      interestTag = 'interest_faceless_dollars';
      interestLabel = 'Faceless Channel se Dollars kamana';
    } else if (upperText === "2" || upperText.includes("AUTOMATION") || upperText.includes("AI SYSTEMS") || upperText.includes("EDITING")) {
      selectedInterest = 'ai_automation';
      interestTag = 'interest_ai_automation';
      interestLabel = 'Full Automation & AI Systems seekhna';
    } else if (upperText === "3" || upperText.includes("CPM") || upperText.includes("NICHE") || upperText.includes("US/UK") || upperText.includes("MONETIZE")) {
      selectedInterest = 'high_cpm_niches';
      interestTag = 'interest_high_cpm_niches';
      interestLabel = 'US/UK High-CPM Niches par Channel Monetize';
    } else if (upperText === "4" || upperText.includes("PASSIVE") || upperText.includes("MONTHLY") || upperText.includes("500") || upperText.includes("INCOME")) {
      selectedInterest = 'monthly_income';
      interestTag = 'interest_monthly_income';
      interestLabel = 'Monthly Passive Income ($500-$1,500/mo)';
    } else if (upperText === "5" || upperText.includes("PEHLE DETAILS") || upperText.includes("DETAILS DEKHNA") || upperText.includes("OUTLINE")) {
      selectedInterest = 'details_first';
      interestTag = VARIANT_B_CONFIG.TAGS.DETAILS_FIRST;
      interestLabel = 'Pehle Details Dekhna';
    }

    if (selectedInterest) {
      await addContactTag(contactId, interestTag);
      await updateContactCustomFields(contactId, [
        { id: VARIANT_B_CONFIG.CUSTOM_FIELDS.PRIMARY_INTEREST, field_value: interestLabel }
      ]);
      if (opportunityId) {
        await updateOpportunityStage(opportunityId, VARIANT_B_CONFIG.STAGES.INTEREST_SELECTED);
      }
      await sendWhatsAppMessage(contactId, buildPersonalizedInterestResponse(selectedInterest));
      return NextResponse.json({ success: true, action: "interest_processed", interest: interestLabel });
    }

    // 6. SUB-BRANCH: WORKSHOP DETAILS (Option A or 1)
    if (upperText === "A" || upperText.includes("WORKSHOP DETAILS") || upperText.includes("OUTLINE")) {
      if (opportunityId) {
        await updateOpportunityStage(opportunityId, VARIANT_B_CONFIG.STAGES.WORKSHOP_DETAILS_SENT);
      }
      await sendWhatsAppMessage(contactId, buildWorkshopDetailsBranch());
      return NextResponse.json({ success: true, action: "workshop_details_sent" });
    }

    // 7. SUB-BRANCH: FEE & PAYMENT / RESERVE MY SEAT (Option B or 2)
    if (upperText === "B" || upperText === "2" || upperText.includes("FEE") || upperText.includes("PAYMENT") || upperText.includes("RESERVE")) {
      if (opportunityId) {
        await updateOpportunityStage(opportunityId, VARIANT_B_CONFIG.STAGES.PAYMENT_PENDING);
      }
      await addContactTag(contactId, VARIANT_B_CONFIG.TAGS.PAYMENT_PENDING);
      await sendWhatsAppMessage(contactId, buildFeeAndPaymentBranch());
      return NextResponse.json({ success: true, action: "payment_pending_sent" });
    }

    // 8. SUB-BRANCH: I HAVE PAID / SCREENSHOT PROOF SUBMITTED
    const hasImage = Boolean(body.attachments && body.attachments.length > 0);
    const hasPaidKeyword = upperText.includes("PAID") || upperText.includes("TRANSFER") || upperText.includes("TID") || upperText.includes("TXID") || upperText.includes("BHEJ DIYA");

    if (hasImage || hasPaidKeyword) {
      if (opportunityId) {
        await updateOpportunityStage(opportunityId, VARIANT_B_CONFIG.STAGES.PAYMENT_PROOF_RECEIVED);
      }
      await sendWhatsAppMessage(contactId, buildPaymentProofReceivedBranch(firstName));
      return NextResponse.json({ success: true, action: "payment_proof_received" });
    }

    // 9. SUB-BRANCH: NEED PAYMENT HELP
    if (upperText.includes("HELP") || upperText.includes("MADAD") || upperText.includes("PAYMENT HELP")) {
      if (opportunityId) {
        await updateOpportunityStage(opportunityId, VARIANT_B_CONFIG.STAGES.HUMAN_HELP_REQUIRED);
      }
      await addContactTag(contactId, VARIANT_B_CONFIG.TAGS.HUMAN_HELP);
      await updateContactCustomFields(contactId, [
        { id: VARIANT_B_CONFIG.CUSTOM_FIELDS.AI_HANDOFF_REASON, field_value: "Payment assistance requested" }
      ]);
      await sendWhatsAppMessage(contactId, buildHumanHandoffMessage("Payment assistance requested"));
      return NextResponse.json({ success: true, action: "payment_help_handoff" });
    }

    // 10. CONTROLLED AI AGENT FALLBACK (Phase 6)
    const aiResult = generateControlledAIResponse(incomingText);
    if (aiResult.canAnswer) {
      if (opportunityId) {
        await updateOpportunityStage(opportunityId, VARIANT_B_CONFIG.STAGES.AI_CONVERSATION);
      }
      await sendWhatsAppMessage(contactId, aiResult.reply);
      return NextResponse.json({ success: true, action: "ai_answered", answer: aiResult.reply });
    } else {
      // Unknown question -> Safe handoff to human
      if (opportunityId) {
        await updateOpportunityStage(opportunityId, VARIANT_B_CONFIG.STAGES.HUMAN_HELP_REQUIRED);
      }
      await addContactTag(contactId, VARIANT_B_CONFIG.TAGS.HUMAN_HELP);
      await updateContactCustomFields(contactId, [
        { id: VARIANT_B_CONFIG.CUSTOM_FIELDS.AI_HANDOFF_REASON, field_value: "Complex / unverified question" }
      ]);
      await sendWhatsAppMessage(contactId, aiResult.reply);
      return NextResponse.json({ success: true, action: "unknown_question_handoff" });
    }

  } catch (error: any) {
    console.error("[VARIANT B ERROR]", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
