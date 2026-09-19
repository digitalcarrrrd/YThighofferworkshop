import { NextRequest, NextResponse } from "next/server";
import { ghlClient } from "@/lib/ghlClient";
import {
  dispatchCourseEmailAutomation,
  dispatchWhatsAppAutomation,
  CourseEmailStep,
} from "@/lib/courseAutomation";
import {
  handleNewWhatsAppLead,
  handleDetailsReceived,
  handlePaymentProofReceived,
  handlePaymentApproved,
  handlePaymentIssue,
  handleOptOut,
  getWelcomeMessage,
  ADMISSION_STAGES,
} from "@/lib/whatsappAdmissionEngine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("GHL Webhook Payload received:", JSON.stringify(body));

    // Extract Contact & Opportunity details from various GHL payload structures
    const contactId = body.contact_id || body.contactId || body.contact?.id || body.id;
    const email = body.email || body.contact?.email || body.contact_email;
    const name = body.first_name || body.name || body.contact?.first_name || body.contact?.name || body.full_name || "Student";
    const phone = body.phone || body.contact?.phone;
    const rawStage = (body.stage_name || body.stage || body.pipeline_stage || body.pipelineStageName || body.status || "").toLowerCase();
    const pipelineStageId = body.pipelineStageId || body.pipeline_stage_id || "";
    const actionParam = (body.action || body.step || body.template || body.type || "").toLowerCase();
    const opportunityId = body.opportunity_id || body.opportunityId || body.opportunity?.id || "";

    if (!contactId && !email && !phone) {
      return NextResponse.json({ success: false, error: "Missing contact identifier" }, { status: 400 });
    }

    const workshopName = body.workshop_name || body.workshop || "YTEmpireBuilder YouTube Masterclass";
    const zoomLink = body.zoom_link || "https://lms.abrarnadir.com";
    const customFee = body.custom_fee || body.fee || "PKR 1,999";

    const recipient = {
      contactId: contactId || "",
      email: email || "",
      phone: phone || "",
      name,
      workshopName,
      zoomLink,
      customFee,
    };

    const incomingText = String(body.message || body.body || body.messageBody || body.message_body || body.text || "").trim();
    const upperText = incomingText.toUpperCase();

    // -----------------------------------------------------------------------
    // 1. SPECIFIC ADMISSION WORKFLOW ACTION ROUTING
    // -----------------------------------------------------------------------

    // A. STOP / OPT-OUT
    if (actionParam === "stop" || actionParam === "opt_out" || actionParam === "unsubscribe" || upperText === "STOP" || upperText === "UNSUBSCRIBE") {
      if (contactId) {
        await handleOptOut(contactId, { opportunityId });
        return NextResponse.json({ success: true, type: "opt_out_processed" });
      }
    }

    // B. META INSTANT LEAD FORM SUBMISSION (Contains pre-filled form answers)
    const isMetaLeadFormMsg =
      incomingText.includes("filled in your form") ||
      incomingText.includes("filled out your form") ||
      incomingText.includes("Monthly Passive Income");

    if (isMetaLeadFormMsg && contactId) {
      // Extract Full Name & City from message if present
      const nameMatch = incomingText.match(/Full name:\s*([^\n\r]+)/i);
      const cityMatch = incomingText.match(/City:\s*([^\n\r]+)/i);
      const extractedName = nameMatch?.[1]?.trim() || name;
      const extractedCity = cityMatch?.[1]?.trim() || "Pakistan";

      const res = await handleDetailsReceived(contactId, {
        fullName: extractedName,
        city: extractedCity,
        studentCategory: "Student",
        opportunityId,
      });

      // Send the first welcome message with WhatsApp announcement group invite link
      const welcomeMsg = getWelcomeMessage(extractedName);
      await ghlClient.sendWhatsApp(contactId, welcomeMsg);

      return NextResponse.json({ type: "meta_lead_form_processed", ...res });
    }

    // C. NEW META WHATSAPP LEAD INQUIRY (Triggered by CTWA Ad or keyword)
    const isKeywordTrigger =
      upperText.includes("BOOK ABRAR WORKSHOP") ||
      actionParam === "book_abrar_workshop" ||
      incomingText.includes("Chat with us") ||
      incomingText.includes("fb.me") ||
      incomingText.includes("Can I get more info");

    if (actionParam === "new_meta_lead" || actionParam === "new_whatsapp_lead" || isKeywordTrigger) {
      const res = await handleNewWhatsAppLead({
        contactId,
        name,
        phone: phone || "",
        email,
        leadSource: body.lead_source || "Meta WhatsApp Ad",
        metaCampaign: body.meta_campaign,
        metaAdSet: body.meta_ad_set,
        metaAd: body.meta_ad,
        adKeyword: body.ad_keyword || (isKeywordTrigger ? "META_AD_INQUIRY" : "BOOK ABRAR WORKSHOP"),
      });
      return NextResponse.json({ type: "new_meta_lead_processed", keyword: "META_AD_INQUIRY", ...res });
    }

    // C. DETAILS RECEIVED
    if (actionParam === "details_received" || rawStage.includes("details received") || pipelineStageId === ADMISSION_STAGES.DETAILS_RECEIVED) {
      if (contactId) {
        const res = await handleDetailsReceived(contactId, {
          fullName: name,
          city: body.city || "Pakistan",
          studentCategory: body.student_category || "Student",
          opportunityId,
        });
        return NextResponse.json({ type: "details_received_processed", ...res });
      }
    }

    // D. PAYMENT PROOF RECEIVED
    if (actionParam === "payment_proof_received" || actionParam === "proof_review" || rawStage.includes("proof received") || pipelineStageId === ADMISSION_STAGES.PAYMENT_PROOF_RECEIVED) {
      if (contactId) {
        const res = await handlePaymentProofReceived(contactId, {
          transactionId: body.transaction_id || body.transuction_ref_number,
          opportunityId,
          screenshotUrl: body.screenshot_url || body.payment_proof,
        });
        return NextResponse.json({ type: "payment_proof_received_processed", ...res });
      }
    }

    // E. PAYMENT APPROVED (MANUAL OPERATOR APPROVAL)
    const isPaymentApprovedAction =
      actionParam === "payment_approved" ||
      actionParam === "approved" ||
      rawStage === "payment approved" ||
      pipelineStageId === ADMISSION_STAGES.PAYMENT_APPROVED;

    if (isPaymentApprovedAction && contactId) {
      const res = await handlePaymentApproved(contactId, {
        opportunityId,
        approvedBy: body.approved_by || "Abrar Nadir",
      });
      return NextResponse.json({ type: "payment_approved_processed", ...res });
    }

    // F. PAYMENT ISSUE / REJECTED
    if (actionParam === "payment_rejected" || actionParam === "payment_issue" || rawStage.includes("refund") || pipelineStageId === ADMISSION_STAGES.REFUND_ISSUE) {
      if (contactId) {
        const res = await handlePaymentIssue(contactId, {
          opportunityId,
          reason: body.reason,
        });
        return NextResponse.json({ type: "payment_issue_processed", ...res });
      }
    }

    // -----------------------------------------------------------------------
    // 2. COURSE EMAIL FOLLOW-UP ACTIONS
    // -----------------------------------------------------------------------
    const isCourseEmailAction =
      actionParam.includes("course_") ||
      actionParam.includes("email_") ||
      actionParam === "welcome_onboarding" ||
      actionParam === "day1_niche_mastery" ||
      actionParam === "day3_content_system" ||
      actionParam === "day5_monetization_playbook" ||
      actionParam === "day7_vip_accelerator";

    if (isCourseEmailAction && contactId && email) {
      let emailStep: CourseEmailStep = "welcome_onboarding";
      if (actionParam.includes("day1") || actionParam.includes("niche")) emailStep = "day1_niche_mastery";
      else if (actionParam.includes("day3") || actionParam.includes("content") || actionParam.includes("system")) emailStep = "day3_content_system";
      else if (actionParam.includes("day5") || actionParam.includes("monetization")) emailStep = "day5_monetization_playbook";
      else if (actionParam.includes("day7") || actionParam.includes("accelerator") || actionParam.includes("vip")) emailStep = "day7_vip_accelerator";

      const dispatchResult = await dispatchCourseEmailAutomation(recipient, emailStep);
      return NextResponse.json({
        success: true,
        type: "course_email_automation",
        step: emailStep,
        result: dispatchResult,
      });
    }

    // -----------------------------------------------------------------------
    // 3. GENERAL STAGE & REMINDER TRIGGERS (LEGACY / WORKSHOP COMPATIBILITY)
    // -----------------------------------------------------------------------
    const isPaymentConfirmed =
      rawStage.includes("confirmed") ||
      rawStage.includes("verified") ||
      pipelineStageId === "0ad7cb14-6f9c-4a9c-ba9a-2b3a015cfeee" || // Yt Workshop Payment Confirmed
      pipelineStageId === "9249624d-5d6e-457c-b0f5-589ea54f36dd";  // Custom package Payment Confirmed

    if (isPaymentConfirmed && contactId) {
      await dispatchWhatsAppAutomation(recipient, "payment_confirmed").catch(console.warn);
      if (email && !email.includes("@whatsapp.user")) {
        await dispatchCourseEmailAutomation(recipient, "welcome_onboarding").catch(console.warn);
      }
      return NextResponse.json({
        success: true,
        type: "payment_confirmed_automation",
        message: "Payment verified: WhatsApp confirmation and LMS onboarding email dispatched.",
      });
    }

    // Payment Pending Fallback
    if (
      actionParam.includes("pending") ||
      actionParam.includes("interest") ||
      actionParam.includes("reserve") ||
      rawStage.includes("pending")
    ) {
      if (contactId) {
        await dispatchWhatsAppAutomation(recipient, "payment_pending").catch(console.warn);
      }
      return NextResponse.json({
        success: true,
        type: "payment_pending_automation",
        message: "WhatsApp payment instructions dispatched.",
      });
    }

    // 24h & 15m Reminders
    if (actionParam.includes("24h") || actionParam.includes("tomorrow")) {
      if (contactId) await dispatchWhatsAppAutomation(recipient, "workshop_24h_reminder").catch(console.warn);
      return NextResponse.json({ success: true, type: "workshop_24h_reminder" });
    }

    if (actionParam.includes("15min") || actionParam.includes("reminder") || actionParam.includes("class")) {
      if (contactId) await dispatchWhatsAppAutomation(recipient, "workshop_15m_reminder").catch(console.warn);
      return NextResponse.json({ success: true, type: "workshop_15m_reminder" });
    }

    return NextResponse.json({
      success: true,
      message: "Webhook processed (no specific condition matched)",
      received: { rawStage, actionParam, contactId },
    });
  } catch (error) {
    console.error("GHL Webhook processing error:", error);
    return NextResponse.json({ success: false, error: "Internal webhook processing error" }, { status: 500 });
  }
}
