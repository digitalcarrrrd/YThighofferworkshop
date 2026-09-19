import { ghlClient } from "./ghlClient";

// ---------------------------------------------------------------------------
// CONFIGURATION CONSTANTS & GHL ASSET MAPPINGS
// ---------------------------------------------------------------------------

export const ADMISSION_PIPELINE_ID = "SLf8kzZ9MhXAyQYFeAm2";

export const ADMISSION_STAGES = {
  NEW_WHATSAPP_LEAD: "5abe848f-0c44-42a4-b2bf-c294af501659",
  DETAILS_RECEIVED: "59ec33bb-0200-4753-8157-1a8b90e3b744",
  PAYMENT_PENDING: "0ff8114f-e6c1-4532-abc7-ef64ccb8366d",
  PAYMENT_PROOF_RECEIVED: "1519847d-e659-4ec8-8177-8c5c63b880f0",
  PAYMENT_APPROVED: "6d56408a-2b4b-4706-bf84-2b6477abfd25",
  WORKSHOP_LINK_SENT: "108c6cc1-3fc8-4a8a-989e-ab258c774549",
  FOLLOWUP_REQUIRED: "8096f4b6-00fd-4d67-8fca-6a79c41297bd",
  NOT_INTERESTED: "e4c8dbf1-b1d1-454f-bc05-d7589723aecf",
  REFUND_ISSUE: "2967d065-7c0d-4ceb-886f-8b7d0ca21535",
};

export const CUSTOM_FIELD_IDS = {
  WORKSHOP_NAME: "q2y650N3LgqMeZS9Zvhb",
  WORKSHOP_DATE: "WQnkFmrLwXB6CgqGPv9S",
  WORKSHOP_TIME: "GGxAsbphZpEOSUtGhWiu",
  WORKSHOP_FEE: "FLZl9ZiczMKWTIpCxduw",
  WORKSHOP_ACCESS_LINK: "o0uZit54i0pfHjMlST5Q",
  LEAD_SOURCE: "1U1lFFOfqlwekhVR4Tp0",
  META_CAMPAIGN: "ibUMt5q97TSMRMJ606fg",
  META_AD_SET: "lLspIPJ4eSoYC7UESF6O",
  META_AD: "8c3jxX6BEvMq1uMcea6u",
  AD_KEYWORD: "B4NewCeLcZdWsS6G8PAB",
  STUDENT_CATEGORY: "stsMG2vk42LfJqf4FcZC",
  TRANSACTION_ID: "3GpFom0PmKzFe9dcSE6g",
  PAYMENT_PROOF_RECEIVED: "yA2sZ9ev0qWwa1G0PTMJ",
  PAYMENT_VERIFICATION_STATUS: "5M2BJLylLyPEcOJRdPFM",
  PAYMENT_APPROVED_BY: "GBxkozwT79sxurHtBPxe",
  PAYMENT_APPROVED_DATE: "rU9rlCgQzQWZUZ5SMWRJ",
  REGISTRATION_STATUS: "SgPzOF1mPW8xg9s7VLeC",
};

export const OPERATOR_IDS = {
  ABRAR_NADIR: "Tz7efx2BN2YxAkwIDIFU",
  MEHRU_NISA: "tYvUGk4ePQ8L4oKH5aQE",
};

export const WORKSHOP_DETAILS = {
  NAME: "YTEmpireBuilder YouTube Masterclass",
  FEE: "1999",
  TIME: "Daily 8:00 PM - 10:00 PM PKT",
  DATE: "Daily Live Batch (8:00 PM - 10:00 PM PKT)",
  ACCESS_LINK: process.env.WORKSHOP_MEET_LINK || "https://meet.google.com/mfm-cmfi-bnn",
  LANDING_PAGE_LINK: "https://www.abrarnadir.com/workshops/yt2",
  PDF_LINK: "https://www.abrarnadir.com/workshops/yt2",
  BANK_NAME: "Meezan Bank Limited",
  BANK_ACCOUNT_TITLE: "Muhammad Abrar",
  BANK_ACCOUNT_NUMBER: "02370103321036",
  BANK_IBAN: "PK39MEZN0002370103321036",
  EASYPAISA_TITLE: "Muhammad Abrar Ghauri",
  EASYPAISA_NUMBER: "03274532186",
  SUPPORT_PHONE: "+92 326 6641695",
  BONUSES_TOTAL_VALUE: "PKR 15,499",
  WHATSAPP_GROUP_LINK: "https://chat.whatsapp.com/F2zfUCa3hxlHraRz77wj0j?s=cl&p=i&mlu=4&ilr=4",
};

/**
 * Calculates whether student gets assigned to Today's or Tomorrow's 8:00 PM batch
 * Rule: Verified before 7:00 PM PKT -> Today's 8:00 PM batch
 *       Verified at/after 7:00 PM PKT -> Tomorrow's 8:00 PM batch
 */
export function getAssignedBatchInfo(referenceDate: Date = new Date()) {
  try {
    const pktDateStr = referenceDate.toLocaleString("en-US", { timeZone: "Asia/Karachi" });
    const pktDate = new Date(pktDateStr);
    const hour = pktDate.getHours();

    const targetDate = new Date(pktDate);
    let isToday = false;

    if (hour < 19) {
      isToday = true;
    } else {
      targetDate.setDate(targetDate.getDate() + 1);
      isToday = false;
    }

    const options: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "short" };
    const dateFormatted = targetDate.toLocaleDateString("en-US", options);

    return {
      isToday,
      batchLabel: isToday ? `Aaj Raat (${dateFormatted})` : `Kal Raat (${dateFormatted})`,
      timeString: "8:00 PM - 10:00 PM PKT",
      fullSchedule: `${isToday ? "Aaj Raat" : "Kal Raat"} (${dateFormatted}) • 8:00 PM - 10:00 PM PKT`,
    };
  } catch (e) {
    return {
      isToday: true,
      batchLabel: "Aaj Raat",
      timeString: "8:00 PM - 10:00 PM PKT",
      fullSchedule: "Daily 8:00 PM - 10:00 PM PKT",
    };
  }
}

// ---------------------------------------------------------------------------
// MESSAGE COPY GENERATORS (EXACT SPECIFICATION MATCH)
// ---------------------------------------------------------------------------

export const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/F2zfUCa3hxlHraRz77wj0j?s=cl&p=i&mlu=4&ilr=4";

export function getWelcomeMessage(firstName?: string) {
  const nameStr = firstName && firstName !== "there" && firstName !== "Student" && firstName !== "Learner" ? ` ${firstName}` : "";
  return (
    `Hello${nameStr} 👋\n\n` +
    `YouTube Automation & AI Masterclass mein welcome!\n\n` +
    `Live class ki tamam updates aur announcements ke liye hamara official WhatsApp group join karein:\n\n` +
    `👉 *Join WhatsApp Group:*\n` +
    `${WHATSAPP_GROUP_URL}\n\n` +
    `Is group mein aapko live session ka link, class timings aur important announcements milengi.\n\n` +
    `— Team Abrar Nadir`
  );
}

export function getDetailsReceivedMessage(firstName: string) {
  return (
    `Perfect, ${firstName} ✅\n\n` +
    `Aapki details receive ho gayi hain.\n\n` +
    `🎟️ *Workshop Pass:* Rs. 1,999 Only\n` +
    `⏰ *Session:* Aaj Raat 8:00 PM – 10:00 PM PKT (Google Meet)\n` +
    `📹 *Curriculum & Case Studies:* https://www.youtube.com/watch?v=ELxrjyvyiUc\n\n` +
    `💳 *Payment Accounts (Rs. 1,999):*\n\n` +
    `🏦 *Meezan Bank*\n` +
    `• Title: Muhammad Abrar\n` +
    `• Acc: 02370103321036\n` +
    `• IBAN: PK39MEZN0002370103321036\n\n` +
    `📱 *Easypaisa*\n` +
    `• Title: Muhammad Abrar Ghauri\n` +
    `• Number: 03274532186\n\n` +
    `Transfer ke baad *screenshot / Transaction ID* isi chat mein bhej dein taake aapka Meet pass activate ho sake.\n\n` +
    `— Team Abrar Nadir`
  );
}

export function getPaymentProofAcknowledgement(firstName: string) {
  return (
    `JazakAllah ${firstName} 🙌\n\n` +
    `Aapka payment proof receive ho gaya hai.\n\n` +
    `Team transaction verify kar rahi hai. Verify hote hi aapko *private Google Meet access link* isi chat mein mil jayega.\n\n` +
    `— Team Abrar Nadir`
  );
}

export function getPaymentApprovedConfirmation(firstName: string) {
  return (
    `${firstName}, your seat is officially confirmed 🎟️\n\n` +
    `🔴 *Live Google Meet Link:*\n` +
    `https://meet.google.com/mfm-cmfi-bnn\n\n` +
    `⏰ *Time:* Aaj Raat 8:00 PM – 10:00 PM PKT\n\n` +
    `Class se 10 min pehle link check kar lein aur notes app ready rakhein.\n\n` +
    `See you live inside! 🚀\n\n` +
    `— Abrar Nadir & Team`
  );
}

export function getPaymentIssueMessage(firstName: string) {
  return (
    `Hi ${firstName}, payment proof check karte waqt humein transaction verify nahi ho saki.\n\n` +
    `Please clear screenshot, transaction ID aur payment sender ka naam dobara send kar dein taake aapki seat confirm ki ja sake.\n\n` +
    `Agar aapko koi issue aa raha hai to isi chat mein reply karein.\n\n` +
    `— Team Abrar Nadir`
  );
}

export function getPaymentFollowupMessage(step: "3h" | "24h" | "48h", firstName: string) {
  if (step === "3h") {
    return `Hi ${firstName}, kya aap workshop details check kar sake? Agar registration ya payment mein koi confusion hai to isi message ka reply kar dein.`;
  }
  if (step === "24h") {
    return `Aapki workshop registration abhi incomplete hai, ${firstName}. Agar aap apni seat confirm karna chahte hain to payment screenshot aur transaction ID send kar dein.`;
  }
  return `Agar aap Abrar Nadir Workshop join karna chahte hain to "SEAT" reply karein. Hamari team aapki registration complete karne mein help karegi.`;
}

export function getWorkshopReminderMessage(step: "24h" | "1h" | "10m", firstName: string) {
  if (step === "24h") {
    return (
      `⏳ Hi ${firstName}, reminder!\n\n` +
      `*${WORKSHOP_DETAILS.NAME}* starts in exactly 24 HOURS.\n\n` +
      `📌 *Checklist:*\n` +
      `1. Ensure Zoom app is installed on your laptop/mobile\n` +
      `2. Have your notebook ready for our high-CPM niche blueprint\n` +
      `3. Portal access: ${WORKSHOP_DETAILS.ACCESS_LINK}\n\n` +
      `See you live tomorrow at ${WORKSHOP_DETAILS.TIME}!`
    );
  }
  if (step === "1h") {
    return (
      `🔔 Starting in 1 Hour, ${firstName}!\n\n` +
      `The live session of *${WORKSHOP_DETAILS.NAME}* starts in 60 minutes.\n\n` +
      `Access Room: ${WORKSHOP_DETAILS.ACCESS_LINK}\n` +
      `Support: ${WORKSHOP_DETAILS.SUPPORT_PHONE}`
    );
  }
  return (
    `🔴 URGENT: Class starts in 10 minutes, ${firstName}!\n\n` +
    `The live room is open right now. Click below to enter immediately:\n` +
    `${WORKSHOP_DETAILS.ACCESS_LINK}\n\n` +
    `Please join now so you don't miss the opening niche framework!`
  );
}

// ---------------------------------------------------------------------------
// WORKFLOW EXECUTION ENGINES
// ---------------------------------------------------------------------------

export interface AdmissionLeadInput {
  contactId?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  phone: string;
  email?: string;
  city?: string;
  studentCategory?: "Student" | "Freelancer" | "Business Owner" | "Job Holder" | "Other";
  leadSource?: string;
  metaCampaign?: string;
  metaAdSet?: string;
  metaAd?: string;
  adKeyword?: string;
  transactionId?: string;
}

/**
 * Phase 6: Handle New WhatsApp Meta Lead
 */
export async function handleNewWhatsAppLead(input: AdmissionLeadInput) {
  const locId = process.env.GHL_LOCATION_ID || "6MzIr7iWX12OyaxfufLw";
  const token = process.env.GHL_PRIVATE_INTEGRATION_TOKEN || "";

  // 1. Upsert Contact with tags and custom fields
  const tags = [
    "abrarnadir_workshop_lead",
    "meta_whatsapp_ad",
    "source:website"
  ];
  if (input.phone.includes("923000000000")) tags.push("test-lead");

  const customFields: Array<{ id: string; key?: string; field_value: string }> = [
    { id: CUSTOM_FIELD_IDS.WORKSHOP_NAME, field_value: WORKSHOP_DETAILS.NAME },
    { id: CUSTOM_FIELD_IDS.WORKSHOP_FEE, field_value: WORKSHOP_DETAILS.FEE },
    { id: CUSTOM_FIELD_IDS.WORKSHOP_TIME, field_value: WORKSHOP_DETAILS.TIME },
    { id: CUSTOM_FIELD_IDS.LEAD_SOURCE, field_value: input.leadSource || "Meta WhatsApp Ad" },
    { id: CUSTOM_FIELD_IDS.REGISTRATION_STATUS, field_value: "New" },
  ];

  if (input.metaCampaign) customFields.push({ id: CUSTOM_FIELD_IDS.META_CAMPAIGN, field_value: input.metaCampaign });
  if (input.metaAdSet) customFields.push({ id: CUSTOM_FIELD_IDS.META_AD_SET, field_value: input.metaAdSet });
  if (input.metaAd) customFields.push({ id: CUSTOM_FIELD_IDS.META_AD, field_value: input.metaAd });
  if (input.adKeyword) customFields.push({ id: CUSTOM_FIELD_IDS.AD_KEYWORD, field_value: input.adKeyword });

  const contactRes = await ghlClient.upsertContact({
    firstName: input.firstName || input.name?.split(" ")[0] || "Student",
    lastName: input.lastName || input.name?.split(" ").slice(1).join(" ") || "",
    phone: input.phone,
    email: input.email || `${input.phone.replace(/\D/g, "")}@whatsapp.user`,
    tags,
    customFields,
  });

  const contactId = contactRes?.contact?.id || input.contactId;
  if (!contactId) throw new Error("Failed to create or resolve GHL contact");

  // 2. Create Opportunity in 'Abrar Nadir Workshop Admissions' -> 'New WhatsApp Lead'
  const opp = await ghlClient.createOpportunity({
    contactId,
    name: `${input.name || input.firstName || "Student"} - ${WORKSHOP_DETAILS.NAME}`,
    pipelineId: ADMISSION_PIPELINE_ID,
    pipelineStageId: ADMISSION_STAGES.NEW_WHATSAPP_LEAD,
    status: "open",
    monetaryValue: 1999,
  });

  // 3. Send Welcome Message
  const welcomeMsg = getWelcomeMessage(input.firstName || input.name);
  await ghlClient.sendWhatsApp(contactId, welcomeMsg);

  // 4. Audit Note
  await ghlClient.addNote(
    contactId,
    `📥 [PHASE 6] NEW WHATSAPP LEAD:\n• Pipeline: Abrar Nadir Workshop Admissions\n• Stage: New WhatsApp Lead\n• Source: ${input.leadSource || "Meta WhatsApp Ad"}\n• Keyword: ${input.adKeyword || "WORKSHOP-A"}\n• Assigned Operator: Abrar Nadir\n• Welcome message dispatched.`
  );

  return { success: true, contactId, opportunityId: opp?.opportunity?.id || opp?.id };
}

/**
 * Phase 7: Details Received -> Send Details/PDF & Payment Instructions -> Payment Pending
 */
export async function handleDetailsReceived(contactId: string, details: {
  fullName: string;
  city: string;
  studentCategory: "Student" | "Freelancer" | "Business Owner" | "Job Holder" | "Other";
  opportunityId?: string;
}) {
  const firstName = details.fullName.split(" ")[0] || "Student";
  const lastName = details.fullName.split(" ").slice(1).join(" ") || "";

  // 1. Update contact fields and tags
  const token = process.env.GHL_PRIVATE_INTEGRATION_TOKEN;
  const baseUrl = "https://services.leadconnectorhq.com";

  await fetch(`${baseUrl}/contacts/${contactId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      firstName,
      lastName,
      name: details.fullName,
      city: details.city,
      customFields: [
        { id: CUSTOM_FIELD_IDS.STUDENT_CATEGORY, field_value: details.studentCategory },
        { id: CUSTOM_FIELD_IDS.REGISTRATION_STATUS, field_value: "Qualified" },
        { id: CUSTOM_FIELD_IDS.PAYMENT_VERIFICATION_STATUS, field_value: "Not Submitted" },
      ],
    }),
  });

  // Apply tags: details_received, payment_pending
  const contactRes = await fetch(`${baseUrl}/contacts/${contactId}`, {
    headers: { Authorization: `Bearer ${token}`, Version: "2021-07-28" },
  });
  const contactData = await contactRes.json();
  const existingTags = contactData.contact?.tags || [];
  const updatedTags = Array.from(new Set([...existingTags, "details_received", "payment_pending"]));

  await fetch(`${baseUrl}/contacts/${contactId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tags: updatedTags }),
  });

  // 2. Move Opportunity to Details Received -> Payment Pending
  if (details.opportunityId) {
    await ghlClient.updateOpportunityStage(details.opportunityId, ADMISSION_STAGES.PAYMENT_PENDING);
  }

  // 3. Automated payment message removed per user instruction.
  // Contact and tags are recorded, but we do not spam bank accounts automatically.
  // const detailsMsg = getDetailsReceivedMessage(firstName);
  // await ghlClient.sendWhatsApp(contactId, detailsMsg);

  // 4. Audit Note
  await ghlClient.addNote(
    contactId,
    `📋 [PHASE 7] DETAILS RECEIVED & QUALIFIED:\n• Name: ${details.fullName}\n• City: ${details.city}\n• Category: ${details.studentCategory}\n• Stage: Payment Pending\n• Fee: Rs. 1,999\n• Lead tagged and qualified.`
  );

  return { success: true, contactId };
}

/**
 * Phase 8: Payment Proof Review (Screenshot / Transaction ID submitted)
 */
export async function handlePaymentProofReceived(contactId: string, proof: {
  transactionId?: string;
  opportunityId?: string;
  screenshotUrl?: string;
}) {
  const token = process.env.GHL_PRIVATE_INTEGRATION_TOKEN;
  const baseUrl = "https://services.leadconnectorhq.com";

  // 1. Update contact fields: Payment Proof Received = Yes, Status = Pending Review, Transaction ID
  const customFields: Array<{ id: string; field_value: string }> = [
    { id: CUSTOM_FIELD_IDS.PAYMENT_PROOF_RECEIVED, field_value: "Yes" },
    { id: CUSTOM_FIELD_IDS.PAYMENT_VERIFICATION_STATUS, field_value: "Pending Review" },
  ];
  if (proof.transactionId) {
    customFields.push({ id: CUSTOM_FIELD_IDS.TRANSACTION_ID, field_value: proof.transactionId });
  }

  // Update contact tags: add payment_proof_received, operator_attention_required (keep payment_pending until approved)
  const contactRes = await fetch(`${baseUrl}/contacts/${contactId}`, {
    headers: { Authorization: `Bearer ${token}`, Version: "2021-07-28" },
  });
  const contactData = await contactRes.json();
  const existingTags = contactData.contact?.tags || [];
  const updatedTags = Array.from(new Set([
    ...existingTags,
    "payment_proof_received",
    "operator_attention_required"
  ]));

  await fetch(`${baseUrl}/contacts/${contactId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tags: updatedTags,
      customFields,
    }),
  });

  // 2. Move Opportunity to 'Payment Proof Received'
  if (proof.opportunityId) {
    await ghlClient.updateOpportunityStage(proof.opportunityId, ADMISSION_STAGES.PAYMENT_PROOF_RECEIVED);
  }

  // 3. Send Student Acknowledgement
  const studentName = contactData.contact?.firstName || "Student";
  const ackMsg = getPaymentProofAcknowledgement(studentName);
  await ghlClient.sendWhatsApp(contactId, ackMsg);

  // 4. Internal Notification / Alert for Human Operator
  const operatorAlert =
    `🔔 [OPERATOR ACTION REQUIRED] PAYMENT PROOF VERIFICATION:\n` +
    `• Student: ${contactData.contact?.name || studentName}\n` +
    `• Phone: ${contactData.contact?.phone}\n` +
    `• City: ${contactData.contact?.city || "N/A"}\n` +
    `• Transaction ID: ${proof.transactionId || "Attached in Screenshot"}\n` +
    `• Proof Screenshot: ${proof.screenshotUrl || "Submitted via WhatsApp"}\n` +
    `• Action: Please verify Meezan / Easypaisa statement.\n` +
    `  - If Valid: Move opportunity to 'Payment Approved'\n` +
    `  - If Invalid/Unclear: Set Verification Status to 'Rejected' or 'Needs Clarification'\n` +
    `⚠️ AUTOMATIC APPROVAL IS DISABLED. Human verification is strictly required.`;

  await ghlClient.addNote(contactId, operatorAlert);

  return { success: true, contactId };
}

/**
 * Phase 9: Manual Operator Payment Approval -> Access Delivery
 */
export async function handlePaymentApproved(contactId: string, options?: {
  opportunityId?: string;
  approvedBy?: string;
}) {
  const token = process.env.GHL_PRIVATE_INTEGRATION_TOKEN;
  const baseUrl = "https://services.leadconnectorhq.com";
  const approvedBy = options?.approvedBy || "Abrar Nadir";
  const approvedDate = new Date().toISOString().split("T")[0];

  // 1. Remove pending tags and apply approval tags
  const contactRes = await fetch(`${baseUrl}/contacts/${contactId}`, {
    headers: { Authorization: `Bearer ${token}`, Version: "2021-07-28" },
  });
  const contactData = await contactRes.json();
  const existingTags: string[] = contactData.contact?.tags || [];

  const cleanedTags = existingTags.filter(
    (t) =>
      t !== "payment_pending" &&
      t !== "payment_proof_received" &&
      t !== "operator_attention_required" &&
      t !== "payment pending"
  );
  const updatedTags = Array.from(new Set([
    ...cleanedTags,
    "payment_approved",
    "workshop_access_sent"
  ]));

  // Update contact fields
  await fetch(`${baseUrl}/contacts/${contactId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tags: updatedTags,
      customFields: [
        { id: CUSTOM_FIELD_IDS.PAYMENT_VERIFICATION_STATUS, field_value: "Approved" },
        { id: CUSTOM_FIELD_IDS.REGISTRATION_STATUS, field_value: "Paid" },
        { id: CUSTOM_FIELD_IDS.PAYMENT_APPROVED_BY, field_value: approvedBy },
        { id: CUSTOM_FIELD_IDS.PAYMENT_APPROVED_DATE, field_value: approvedDate },
        { id: CUSTOM_FIELD_IDS.WORKSHOP_ACCESS_LINK, field_value: WORKSHOP_DETAILS.ACCESS_LINK },
      ],
    }),
  });

  // 2. Move Opportunity to 'Payment Approved' then 'Workshop Link Sent'
  if (options?.opportunityId) {
    await ghlClient.updateOpportunityStage(options.opportunityId, ADMISSION_STAGES.WORKSHOP_LINK_SENT);
  }

  // 3. Send Official Confirmation with Access Link
  const studentName = contactData.contact?.firstName || "Student";
  const approvalMsg = getPaymentApprovedConfirmation(studentName);
  await ghlClient.sendWhatsApp(contactId, approvalMsg);

  // 4. Also enroll in GHL Workshop Workflow
  const ghlWorkflowId = process.env.GHL_WORKSHOP_WORKFLOW_ID || "8c73d915-30dc-4f5f-9fbe-0db027ca6f32";
  ghlClient.addContactToWorkflow(contactId, ghlWorkflowId).catch(console.warn);

  // 5. Audit Note
  await ghlClient.addNote(
    contactId,
    `🎉 [PHASE 9] PAYMENT APPROVED & ACCESS GRANTED:\n• Verified & Approved By: ${approvedBy}\n• Approval Date: ${approvedDate}\n• Status: Paid -> Access Sent\n• Stage: Workshop Link Sent\n• Access Link: ${WORKSHOP_DETAILS.ACCESS_LINK}\n• Tags Cleaned: payment_pending & operator_attention_required removed.`
  );

  return { success: true, contactId };
}

/**
 * Phase 10: Payment Issue / Rejection
 */
export async function handlePaymentIssue(contactId: string, options?: {
  opportunityId?: string;
  reason?: string;
}) {
  const token = process.env.GHL_PRIVATE_INTEGRATION_TOKEN;
  const baseUrl = "https://services.leadconnectorhq.com";

  // 1. Apply payment_rejected tag and update status
  const contactRes = await fetch(`${baseUrl}/contacts/${contactId}`, {
    headers: { Authorization: `Bearer ${token}`, Version: "2021-07-28" },
  });
  const contactData = await contactRes.json();
  const existingTags = contactData.contact?.tags || [];
  const updatedTags = Array.from(new Set([...existingTags, "payment_rejected", "followup_required"]));

  await fetch(`${baseUrl}/contacts/${contactId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tags: updatedTags,
      customFields: [
        { id: CUSTOM_FIELD_IDS.PAYMENT_VERIFICATION_STATUS, field_value: "Rejected" },
      ],
    }),
  });

  // 2. Move Opportunity to 'Follow-up Required'
  if (options?.opportunityId) {
    await ghlClient.updateOpportunityStage(options.opportunityId, ADMISSION_STAGES.FOLLOWUP_REQUIRED);
  }

  // 3. Send Polite Issue Clarification Message
  const studentName = contactData.contact?.firstName || "Student";
  const issueMsg = getPaymentIssueMessage(studentName);
  await ghlClient.sendWhatsApp(contactId, issueMsg);

  // 4. Audit Note
  await ghlClient.addNote(
    contactId,
    `⚠️ [PHASE 10] PAYMENT VERIFICATION ISSUE:\n• Stage: Follow-up Required\n• Status: Rejected / Needs Clarification\n• Reason: ${options?.reason || "Could not verify transaction in bank statement"}\n• Sent clarification request to student via WhatsApp.`
  );

  return { success: true, contactId };
}

/**
 * Phase 13: STOP / Opt-Out Handler
 */
export async function handleOptOut(contactId: string, options?: { opportunityId?: string }) {
  const token = process.env.GHL_PRIVATE_INTEGRATION_TOKEN;
  const baseUrl = "https://services.leadconnectorhq.com";

  // 1. Set DND on WhatsApp & Promotional Channels
  await fetch(`${baseUrl}/contacts/${contactId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      dnd: true,
      dndSettings: {
        WhatsApp: { status: "active", message: "User requested STOP" },
        SMS: { status: "active", message: "User requested STOP" },
        Email: { status: "active", message: "User requested STOP" },
      },
      customFields: [
        { id: CUSTOM_FIELD_IDS.REGISTRATION_STATUS, field_value: "Not Interested" },
      ],
    }),
  });

  // 2. Apply tag not_interested
  const contactRes = await fetch(`${baseUrl}/contacts/${contactId}`, {
    headers: { Authorization: `Bearer ${token}`, Version: "2021-07-28" },
  });
  const contactData = await contactRes.json();
  const existingTags = contactData.contact?.tags || [];
  const updatedTags = Array.from(new Set([...existingTags, "not_interested"]));

  await fetch(`${baseUrl}/contacts/${contactId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tags: updatedTags }),
  });

  // 3. Move Opportunity to 'Not Interested'
  if (options?.opportunityId) {
    await ghlClient.updateOpportunityStage(options.opportunityId, ADMISSION_STAGES.NOT_INTERESTED);
  }

  // 4. Audit Note
  await ghlClient.addNote(
    contactId,
    `🛑 [PHASE 13] STOP / OPT-OUT PROCESSED:\n• DND Activated for WhatsApp, SMS, Email\n• Tag: not_interested applied\n• Opportunity Stage: Not Interested\n• All scheduled promotional follow-ups terminated.`
  );

  return { success: true, contactId };
}
