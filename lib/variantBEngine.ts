/**
 * VARIANT B: Meta Prefill & Structured Interest WhatsApp Engine
 * Standalone, completely isolated test engine for Variant B.
 * Does NOT touch Variant A ("BOOK ABRAR WORKSHOP") pipeline or listener.
 */

import crypto from 'crypto';

// Configuration
export const VARIANT_B_CONFIG = {
  LOCATION_ID: process.env.GHL_LOCATION_ID || '6MzIr7iWX12OyaxfufLw',
  TOKEN: process.env.GHL_PRIVATE_INTEGRATION_TOKEN || 'pit-4259cd3b-222c-4b57-8f88-400949576d75',
  PIPELINE_ID: '73Xf5lQ7cNAuSz3KcZ0O', // Abrar Workshop | Prefill & Interest Test
  SOURCE_KEYWORD: 'ABRAR-PREFILL-B',
  VARIANT_NAME: 'B – Meta Prefill Interest Test',
  STAGES: {
    NEW_PREFILL_LEAD: 'bbf4ae6a-c0d1-4ade-a9f2-c78467168faa',
    PROFILE_CAPTURED: '8da33b62-b282-4e8c-a12b-d9e9bd5cd56d',
    INTEREST_SELECTED: '8f36b72f-fa18-4650-9f5a-7e96191566af',
    WORKSHOP_DETAILS_SENT: '034ae465-2b32-4cc5-a90b-ab05c3bf7d9c',
    PAYMENT_PENDING: '8cbcf06a-36fb-48c2-a92e-b923aa6eb9df',
    PAYMENT_PROOF_RECEIVED: '2f8417de-e62e-4eeb-a9eb-924b546d00c0',
    PAYMENT_APPROVED: '804718d8-3cdd-4c30-a016-372ee2334171',
    WORKSHOP_LINK_SENT: '463e0d8f-1c23-404a-9a88-52b6c564c3fa',
    AI_CONVERSATION: 'fdc754ee-a34e-4aee-946e-bded03d6c6fa',
    HUMAN_HELP_REQUIRED: 'c66f05d7-7876-4a7e-b600-b47eeb19ab62',
    NOT_INTERESTED: '68f14f18-5347-46ad-8102-ee1086c7d6b5',
    TEST_COMPLETED: '3a6a529c-56aa-4f32-816e-93b8aca5efd7'
  },
  TAGS: {
    ENTRY_B: 'abrar_prefill_test_b',
    DIGITAL_SKILL: 'interest_digital_skill',
    FREELANCING: 'interest_freelancing',
    BUSINESS_GROWTH: 'interest_business_growth',
    CAREER: 'interest_career',
    DETAILS_FIRST: 'interest_details_first',
    PAYMENT_PENDING: 'payment_pending_prefill_b',
    HUMAN_HELP: 'human_help_required',
    ACCESS_SENT: 'workshop_access_sent'
  },
  CUSTOM_FIELDS: {
    EXPERIMENT_VARIANT: 'tTYA6TTJlzjfDFVtnExp',
    PRIMARY_INTEREST: 'G2LNsIBr4V4qesX7gzjK',
    CURRENT_STATUS: '4ze8WjsQG5IKQfoYQN4f',
    EXPERIENCE_LEVEL: 'OB76UYHaXUbTnOY738eZ',
    WORKSHOP_INTENT: 'KEYuQmWyz8HF73QB7Hzi',
    AI_HANDOFF_REASON: '49yZI52FbdQvJ4ASau2F',
    PAYMENT_VERIFICATION_STATUS: '5M2BJLylLyPEcOJRdPFM',
    PAID_REVENUE: 'klRD3bj8VwKNgeiBOnbS',
    META_CAMPAIGN: 'ibUMt5q97TSMRMJ606fg',
    META_AD_SET: 'lLspIPJ4eSoYC7UESF6O',
    META_AD: '8c3jxX6BEvMq1uMcea6u',
    AD_KEYWORD: 'B4NewCeLcZdWsS6G8PAB'
  },
  WORKSHOP: {
    PRICE: 1999,
    NAME: 'YouTube Empire Builder Live Masterclass',
    TIME: 'Aaj Raat 8:00 PM – 10:00 PM PKT',
    PLATFORM: 'Google Meet',
    ACCESS_LINK: 'https://meet.google.com/mfm-cmfi-bnn',
    VIDEO_URL: 'https://www.youtube.com/watch?v=ELxrjyvyiUc',
    PDF_URL: 'https://www.abrarnadir.com/workshops/yt2',
    PORTAL_URL: 'https://www.abrarnadir.com/portal',
    BANK_MEEZAN: {
      title: 'Muhammad Abrar',
      account: '02370103321036',
      iban: 'PK39MEZN0002370103321036'
    },
    EASYPAISA: {
      title: 'Muhammad Abrar Ghauri',
      number: '03274532186'
    }
  }
};

// Headers for GHL API
const headers = {
  Authorization: `Bearer ${VARIANT_B_CONFIG.TOKEN}`,
  Version: '2021-07-28',
  'Content-Type': 'application/json',
  Accept: 'application/json'
};

// ---------------------------------------------------------------------------
// GHL HELPER FUNCTIONS (ISOLATED TO VARIANT B)
// ---------------------------------------------------------------------------

export async function sendWhatsAppMessage(contactId: string, message: string) {
  try {
    const res = await fetch('https://services.leadconnectorhq.com/conversations/messages', {
      method: 'POST',
      headers,
      body: JSON.stringify({ type: 'WhatsApp', contactId, message })
    });
    const data = await res.json();
    return { ok: res.ok, status: res.status, data };
  } catch (e: any) {
    return { ok: false, error: e.message };
  }
}

export async function updateOpportunityStage(opportunityId: string, stageId: string) {
  try {
    const res = await fetch(`https://services.leadconnectorhq.com/opportunities/${opportunityId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ pipelineStageId: stageId })
    });
    return { ok: res.ok, status: res.status };
  } catch (e: any) {
    return { ok: false, error: e.message };
  }
}

export async function updateContactCustomFields(contactId: string, customFields: Array<{ id: string; key?: string; field_value: any }>) {
  try {
    const res = await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ customFields })
    });
    return { ok: res.ok, status: res.status };
  } catch (e: any) {
    return { ok: false, error: e.message };
  }
}

export async function addContactTag(contactId: string, tag: string) {
  try {
    // Get existing tags first
    const cRes = await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}`, { headers });
    const cData = await cRes.json();
    const existingTags = cData.contact?.tags || [];
    if (!existingTags.includes(tag)) {
      existingTags.push(tag);
      await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ tags: existingTags })
      });
    }
    return true;
  } catch (e: any) {
    return false;
  }
}

export async function getOrCreateVariantBOpportunity(contactId: string, contactName: string) {
  try {
    // Search for existing opportunity in Variant B pipeline only
    const searchRes = await fetch(
      `https://services.leadconnectorhq.com/opportunities/search?location_id=${VARIANT_B_CONFIG.LOCATION_ID}&contact_id=${contactId}&pipeline_id=${VARIANT_B_CONFIG.PIPELINE_ID}`,
      { headers }
    );
    const searchData = await searchRes.json();
    const existing = (searchData.opportunities || [])[0];
    if (existing) {
      return { opportunityId: existing.id, isNew: false, opportunity: existing };
    }

    // Create exactly one opportunity in Variant B pipeline
    const createRes = await fetch('https://services.leadconnectorhq.com/opportunities/upsert', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        pipelineId: VARIANT_B_CONFIG.PIPELINE_ID,
        locationId: VARIANT_B_CONFIG.LOCATION_ID,
        name: `${contactName || 'Student'} - Variant B Prefill Test`,
        pipelineStageId: VARIANT_B_CONFIG.STAGES.NEW_PREFILL_LEAD,
        status: 'open',
        contactId,
        monetaryValue: VARIANT_B_CONFIG.WORKSHOP.PRICE
      })
    });
    const createData = await createRes.json();
    const newId = createData.opportunity?.id || createData.id;
    return { opportunityId: newId, isNew: true, opportunity: createData.opportunity };
  } catch (e: any) {
    return { opportunityId: null, isNew: false, error: e.message };
  }
}

// ---------------------------------------------------------------------------
// MESSAGE CONTENT BUILDERS (YOUTUBE & AI EARNING CENTRIC SPECIFICATION)
// ---------------------------------------------------------------------------

export function buildFirstInteractiveMessage(firstName: string) {
  return (
    `Assalam-o-Alaikum ${firstName || 'there'} 👋\n\n` +
    `Abrar Nadir YouTube & AI Masterclass mein aapka welcome hai!\n\n` +
    `Aapka main goal kya hai?\n\n` +
    `1️⃣ *Faceless Channel se Dollars ($) kamana*\n` +
    `2️⃣ *Full Automation & AI Systems seekhna (No Editing)*\n` +
    `3️⃣ *US/UK High-CPM Niches par Channel Monetize karna*\n` +
    `4️⃣ *Monthly Passive Income ($500-$1,500/mo) Build karna*\n` +
    `5️⃣ *Pehle Complete Workshop Details Dekhna*\n\n` +
    `_Bas number (1 se 5) reply karein._\n\n` +
    `— Team Abrar Nadir`
  );
}

export function buildPersonalizedInterestResponse(interestType: 'faceless_dollars' | 'ai_automation' | 'high_cpm_niches' | 'monthly_income' | 'details_first') {
  let acknowledgement = '';

  switch (interestType) {
    case 'faceless_dollars':
      acknowledgement = `Zabardast 👍 Workshop mein hum dekhenge ke bina face aur camera ke AI tools se US/UK audience ke liye videos bana kar YouTube AdSense aur sponsorships se dollars kaise generate hote hain.`;
      break;
    case 'ai_automation':
      acknowledgement = `Perfect 👍 Workshop mein Abrar Nadir LIVE demo denge ke ChatGPT script, ElevenLabs voiceover aur automated b-roll se 45 minutes mein complete video bina manual video editing ke kaise banti hai.`;
      break;
    case 'high_cpm_niches':
      acknowledgement = `Excellent 👍 High-CPM niche selection sab se critical step hai. Hum top 10 niches ($15-$35 RPM) aur unka validation scorecard live share karenge.`;
      break;
    case 'monthly_income':
      acknowledgement = `Great goal 👍 1 single channel se $500/month tak ka realistic roadmap, timeline aur consistency system workshop mein step-by-step deliver hoga.`;
      break;
    case 'details_first':
      acknowledgement = `Bilkul 👍 Main pehle aapko complete 2-hour masterclass outline share karta hoon, phir aap araam se decide kar sakte hain.`;
      break;
  }

  const nextMenu = (
    `\n\nAap agla step kya lena chahte hain?\n\n` +
    `*A* — 📋 Workshop Outline & Topics\n` +
    `*B* — 💳 Pass Fee & Payment Details\n` +
    `*C* — ❓ Ask a Question\n\n` +
    `_Reply A, B ya C karein._`
  );

  return acknowledgement + nextMenu;
}

export function buildWorkshopDetailsBranch() {
  return (
    `📋 *YouTube Empire Builder — Live Masterclass Details*\n\n` +
    `Abrar Nadir practical 2-hour interactive breakdown karenge ke US/UK faceless YouTube channels ko AI systems ke sath kaise launch aur automate kiya jata hai.\n\n` +
    `🗓 *Class Time:* Aaj Raat 8:00 PM – 10:00 PM PKT\n` +
    `📍 *Platform:* Google Meet (Interactive Q&A)\n` +
    `🎟 *Investment:* Rs. 1,999 Only\n` +
    `🌐 *Complete Overview & Proofs:* ${VARIANT_B_CONFIG.WORKSHOP.PDF_URL}\n\n` +
    `🎁 *Included 5 Free Bonuses (Worth Rs. 15,499):*\n` +
    `1. 50+ High-Retention AI Prompts Pack\n` +
    `2. US/UK High-CPM Niche Matrix\n` +
    `3. 90-Day Content Planner Sheet\n` +
    `4. 7-Day Private Creator Support\n` +
    `5. 24-Hour HD Workshop Replay Access\n\n` +
    `Aap aage kya karna chahte hain?\n\n` +
    `*1* — 🎟️ Reserve My Seat\n` +
    `*2* — 💳 Fee & Payment Details\n` +
    `*3* — ❓ Ask a Question\n\n` +
    `_Reply 1, 2 ya 3 karein._\n\n` +
    `— Team Abrar Nadir`
  );
}

export function buildFeeAndPaymentBranch() {
  return (
    `💳 *Workshop Pass & Official Payment Accounts*\n\n` +
    `Pass Fee: *PKR 1,999* (One-time, all 5 bonuses included)\n\n` +
    `🏦 *Meezan Bank Limited*\n` +
    `• Account Title: ${VARIANT_B_CONFIG.WORKSHOP.BANK_MEEZAN.title}\n` +
    `• Account Number: ${VARIANT_B_CONFIG.WORKSHOP.BANK_MEEZAN.account}\n` +
    `• IBAN: ${VARIANT_B_CONFIG.WORKSHOP.BANK_MEEZAN.iban}\n\n` +
    `📱 *Easypaisa*\n` +
    `• Account Title: ${VARIANT_B_CONFIG.WORKSHOP.EASYPAISA.title}\n` +
    `• Number: ${VARIANT_B_CONFIG.WORKSHOP.EASYPAISA.number}\n\n` +
    `Payment transfer ke baad:\n\n` +
    `*A* — ✅ I Have Paid (Screenshot send karein)\n` +
    `*B* — 🆘 Need Payment Help\n` +
    `*C* — ❓ Ask a Question\n\n` +
    `_Transfer complete karne ke baad screenshot ya TID isi chat mein reply karein._\n\n` +
    `— Team Abrar Nadir`
  );
}

export function buildPaymentProofReceivedBranch(firstName: string) {
  return (
    `JazakAllah ${firstName || ''} 🙌\n\n` +
    `Aapka payment proof hamari team ko receive ho gaya hai.\n\n` +
    `Team abhi transaction record verify kar rahi hai. Human verification complete hote hi isi chat mein aapka private Google Meet room access link issue kar diya jayega.\n\n` +
    `Aapko dobara koi form fill karne ki zaroorat nahi hai.\n\n` +
    `— Team Abrar Nadir`
  );
}

export function buildPaymentApprovedBranch(firstName: string) {
  return (
    `${firstName || 'Student'}, your workshop seat is verified & confirmed 🎟️\n\n` +
    `Aapki payment officially approve ho chuki hai.\n\n` +
    `🔴 *Live Google Meet Access Room:*\n` +
    `${VARIANT_B_CONFIG.WORKSHOP.ACCESS_LINK}\n\n` +
    `⏰ *Timing:* Aaj Raat 8:00 PM – 10:00 PM PKT\n\n` +
    `Class start hone se 10 minute pehle link open karke audio check kar lein. Notebook ready rakhein.\n\n` +
    `See you live inside!\n\n` +
    `— Abrar Nadir & Team`
  );
}

export function buildHumanHandoffMessage(reason: string) {
  return (
    `Thank you. Aapka message hamare human operator ko assign kar diya gaya hai (${reason}).\n\n` +
    `Hamari team ka representative jald hi isi WhatsApp chat mein aapse directly baat karega taake aapko exact guidance mil sake.\n\n` +
    `— Support Desk | Abrar Nadir`
  );
}

// ---------------------------------------------------------------------------
// AI AGENT FALLBACK KNOWLEDGE & RESTRICTIONS (PHASE 6)
// ---------------------------------------------------------------------------

export const AI_KNOWLEDGE_BASE = {
  topics: 'US/UK High-CPM YouTube automation, faceless channel architecture, AI scripting with ChatGPT/Claude, voiceovers, video production, monetization without showing face.',
  date_timing: 'Daily live batches, 8:00 PM to 10:00 PM PKT on Google Meet.',
  pricing: 'PKR 1,999 one-time investment. Strictly includes 5 bonuses (worth PKR 15,499) and 24-hour recording replay.',
  prerequisites: 'No expensive camera or mic required. Only a laptop/computer or mobile phone with internet connection.',
  guarantee_policy: 'Real education and systems. Practical roadmap provided. No magic button; consistency required.',
  recording: 'Yes, full 24-hour HD recording replay is provided via student portal (abrarnadir.com/portal) after the session.',
  payments: 'Meezan Bank (Muhammad Abrar, 02370103321036) and Easypaisa (Muhammad Abrar Ghauri, 03274532186).'
};

// Returns true if message contains trigger words that MUST be handed off to a human
export function checkHumanHandoffTriggers(text: string): { isHandoff: boolean; reason?: string } {
  const upper = text.toUpperCase();

  const triggers: Array<{ match: string; reason: string }> = [
    { match: 'PAYMENT SENT', reason: 'Payment claims review' },
    { match: 'SCREENSHOT', reason: 'Payment screenshot verification' },
    { match: 'TRANSACTION FAILED', reason: 'Payment failure report' },
    { match: 'MONEY DEDUCTED', reason: 'Deduction without confirmation' },
    { match: 'WRONG ACCOUNT', reason: 'Wrong account transfer' },
    { match: 'REFUND', reason: 'Refund request' },
    { match: 'COMPLAINT', reason: 'Customer complaint' },
    { match: 'DISCOUNT', reason: 'Special discount request' },
    { match: 'CALL ME', reason: 'Customer requested phone call' },
    { match: 'TALK TO A PERSON', reason: 'Customer requested human agent' },
    { match: 'HUMAN AGENT', reason: 'Customer requested human agent' },
    { match: 'REPRESENTATIVE', reason: 'Customer requested human agent' },
    { match: 'INSAN', reason: 'Urdu human request' },
    { match: 'BAAT KARNI HAI', reason: 'Direct conversation request' }
  ];

  for (const t of triggers) {
    if (upper.includes(t.match)) {
      return { isHandoff: true, reason: t.reason };
    }
  }

  return { isHandoff: false };
}

// Controlled fallback AI response generator from verified knowledge
export function generateControlledAIResponse(userText: string): { reply: string; canAnswer: boolean } {
  const upper = userText.toUpperCase();

  if (upper.includes('TIME') || upper.includes('TIMING') || upper.includes('KAB') || upper.includes('WHEN')) {
    return {
      canAnswer: true,
      reply: `Workshop aaj raat 8:00 PM se 10:00 PM PKT tak live Google Meet par hogi. Aap interactive Q&A mein sawal bhi pooch sakte hain.`
    };
  }

  if (upper.includes('FEE') || upper.includes('PRICE') || upper.includes('KITNE') || upper.includes('COST')) {
    return {
      canAnswer: true,
      reply: `Workshop pass fee sirf PKR 1,999 hai (one-time investment). Isme live 2-hour Google Meet session, 5 masterclass bonuses aur 24-hour recording replay access shamil hai.`
    };
  }

  if (upper.includes('RECORDING') || upper.includes('REPLAY') || upper.includes('MISS')) {
    return {
      canAnswer: true,
      reply: `Ji bilkul! Session complete hone ke baad sabhi registered participants ko 24-hour HD recording replay aur resources student portal par milte hain.`
    };
  }

  if (upper.includes('CAMERA') || upper.includes('MIC') || upper.includes('FACE') || upper.includes('LAPTOP')) {
    return {
      canAnswer: true,
      reply: `Bilkul nahi! Ye faceless YouTube automation system hai. Aapko camera ke samne aane ya expensive equipment ki zaroorat nahi hoti. Sirf laptop ya phone aur internet chahiye.`
    };
  }

  if (upper.includes('TOPIC') || upper.includes('SYLLABUS') || upper.includes('CURRICULUM') || upper.includes('KAYA SIKHAYEN')) {
    return {
      canAnswer: true,
      reply: `Workshop mein cover hoga: US/UK High-CPM niche selection ($10-$25 RPM), AI video assembly workflow, automated scripting, bina face channel scaling, aur monetization policies se 100% safety.`
    };
  }

  return {
    canAnswer: false,
    reply: `Aapke sawal ka exact jawab confirm karne ke liye main hamare team operator ko assign kar raha hoon. Representative jald hi reply karega.`
  };
}
