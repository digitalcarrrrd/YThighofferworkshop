import { NextRequest, NextResponse } from "next/server";
import { ghlClient } from "@/lib/ghlClient";
import {
  dispatchCourseEmailAutomation,
  dispatchWhatsAppAutomation,
  getCourseEmailTemplate,
  getWhatsAppAutomationMessage,
  CourseEmailStep,
  WhatsAppAutomationStep,
} from "@/lib/courseAutomation";
import {
  handleNewWhatsAppLead,
  handleDetailsReceived,
  handlePaymentProofReceived,
  handlePaymentApproved,
  handlePaymentIssue,
  handleOptOut,
  getWelcomeMessage,
  getDetailsReceivedMessage,
  getPaymentProofAcknowledgement,
  getPaymentApprovedConfirmation,
  getPaymentIssueMessage,
  getPaymentFollowupMessage,
  getWorkshopReminderMessage,
  ADMISSION_PIPELINE_ID,
  ADMISSION_STAGES,
} from "@/lib/whatsappAdmissionEngine";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get("action");
  const step = searchParams.get("step") || "";
  const name = searchParams.get("name") || "Student";

  // Preview templates
  if (action === "preview-email") {
    const emailStep = (step || "welcome_onboarding") as CourseEmailStep;
    const template = getCourseEmailTemplate(emailStep, name, {
      lmsUrl: "https://lms.abrarnadir.com",
      email: "student@example.com",
    });
    return new NextResponse(template.html, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  if (action === "preview-whatsapp") {
    const waStep = (step || "payment_confirmed") as WhatsAppAutomationStep;
    const wa = getWhatsAppAutomationMessage(waStep, name);
    return NextResponse.json({ step: waStep, ...wa });
  }

  if (action === "preview-admission-message") {
    const sub = searchParams.get("sub") || "welcome";
    let message = "";
    if (sub === "welcome") message = getWelcomeMessage(name);
    else if (sub === "details") message = getDetailsReceivedMessage(name);
    else if (sub === "proof_ack") message = getPaymentProofAcknowledgement(name);
    else if (sub === "approved") message = getPaymentApprovedConfirmation(name);
    else if (sub === "issue") message = getPaymentIssueMessage(name);
    else if (sub === "followup_3h") message = getPaymentFollowupMessage("3h", name);
    else if (sub === "followup_24h") message = getPaymentFollowupMessage("24h", name);
    else if (sub === "followup_48h") message = getPaymentFollowupMessage("48h", name);
    else if (sub === "reminder_24h") message = getWorkshopReminderMessage("24h", name);
    else if (sub === "reminder_1h") message = getWorkshopReminderMessage("1h", name);
    else if (sub === "reminder_10m") message = getWorkshopReminderMessage("10m", name);
    return NextResponse.json({ sub, message });
  }

  // List GHL workflows
  if (action === "list-workflows") {
    const workflows = await ghlClient.listWorkflows();
    return NextResponse.json({ workflows });
  }

  return NextResponse.json({
    message: "Abrar Nadir Workshop Admission & Automation Engine is active",
    pipelineId: ADMISSION_PIPELINE_ID,
    admissionStages: ADMISSION_STAGES,
    availableActions: ["preview-email", "preview-whatsapp", "preview-admission-message", "list-workflows"],
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      type, // 'admission-new-lead' | 'admission-details' | 'admission-proof' | 'admission-approved' | 'admission-issue' | 'admission-opt-out' | 'email' | 'whatsapp' | 'workflow-enroll' | 'workflow-remove'
      contactId,
      email,
      phone,
      name,
      city,
      studentCategory,
      step,
      workflowId,
      opportunityId,
      transactionId,
      approvedBy,
      reason,
      leadSource,
      metaCampaign,
      metaAdSet,
      metaAd,
      adKeyword,
    } = body;

    // 1. Admission Flow: New WhatsApp Meta Lead
    if (type === "admission-new-lead") {
      const res = await handleNewWhatsAppLead({
        contactId,
        name,
        phone: phone || "+923000000000",
        email,
        leadSource: leadSource || "Meta WhatsApp Ad",
        metaCampaign,
        metaAdSet,
        metaAd,
        adKeyword: adKeyword || "WORKSHOP-A",
      });
      return NextResponse.json({ type, ...res });
    }

    // 2. Admission Flow: Details Received
    if (type === "admission-details") {
      if (!contactId) return NextResponse.json({ error: "contactId is required" }, { status: 400 });
      const res = await handleDetailsReceived(contactId, {
        fullName: name || "Student",
        city: city || "Lahore",
        studentCategory: studentCategory || "Student",
        opportunityId,
      });
      return NextResponse.json({ type, ...res });
    }

    // 3. Admission Flow: Payment Proof Received
    if (type === "admission-proof") {
      if (!contactId) return NextResponse.json({ error: "contactId is required" }, { status: 400 });
      const res = await handlePaymentProofReceived(contactId, {
        transactionId,
        opportunityId,
      });
      return NextResponse.json({ type, ...res });
    }

    // 4. Admission Flow: Payment Approved (Manual Operator Action)
    if (type === "admission-approved") {
      if (!contactId) return NextResponse.json({ error: "contactId is required" }, { status: 400 });
      const res = await handlePaymentApproved(contactId, {
        opportunityId,
        approvedBy: approvedBy || "Abrar Nadir",
      });
      return NextResponse.json({ type, ...res });
    }

    // 5. Admission Flow: Payment Issue
    if (type === "admission-issue") {
      if (!contactId) return NextResponse.json({ error: "contactId is required" }, { status: 400 });
      const res = await handlePaymentIssue(contactId, {
        opportunityId,
        reason,
      });
      return NextResponse.json({ type, ...res });
    }

    // 6. Admission Flow: Opt-Out / STOP
    if (type === "admission-opt-out") {
      if (!contactId) return NextResponse.json({ error: "contactId is required" }, { status: 400 });
      const res = await handleOptOut(contactId, { opportunityId });
      return NextResponse.json({ type, ...res });
    }

    // 7. Course Email Dispatch
    if (type === "email") {
      if (!contactId || !email) return NextResponse.json({ error: "contactId and email are required" }, { status: 400 });
      const emailStep = (step || "welcome_onboarding") as CourseEmailStep;
      const res = await dispatchCourseEmailAutomation({
        contactId,
        email,
        name: name || "Student",
      }, emailStep);
      return NextResponse.json({ success: true, type, step: emailStep, result: res });
    }

    // 8. General WhatsApp Dispatch
    if (type === "whatsapp") {
      if (!contactId) return NextResponse.json({ error: "contactId is required" }, { status: 400 });
      const waStep = (step || "payment_confirmed") as WhatsAppAutomationStep;
      const res = await dispatchWhatsAppAutomation({
        contactId,
        name: name || "Student",
      }, waStep);
      return NextResponse.json({ success: true, type, step: waStep, result: res });
    }

    // 9. Workflow Enrollment
    if (type === "workflow-enroll") {
      if (!contactId || !workflowId) return NextResponse.json({ error: "contactId and workflowId are required" }, { status: 400 });
      const res = await ghlClient.addContactToWorkflow(contactId, workflowId);
      return NextResponse.json({ success: true, type, result: res });
    }

    return NextResponse.json({ error: "Invalid type requested" }, { status: 400 });
  } catch (error) {
    console.error("Dispatch error:", error);
    return NextResponse.json({ error: "Internal dispatch error" }, { status: 500 });
  }
}
