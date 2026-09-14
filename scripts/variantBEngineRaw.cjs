const VARIANT_B_CONFIG = {
  PIPELINE_ID: '73Xf5lQ7cNAuSz3KcZ0O',
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

function buildFirstInteractiveMessage(firstName) {
  return (
    `Assalam-o-Alaikum ${firstName || 'there'} 👋\n\n` +
    `Abrar Nadir Workshop mein aapka welcome hai.\n\n` +
    `Aap workshop se sab se pehle kya hasil karna chahte hain?\n\n` +
    `Neeche diye gaye number ya text reply karein:\n\n` +
    `1️⃣ *Digital Skill Seekhna*\n` +
    `2️⃣ *Freelancing Start Karna*\n` +
    `3️⃣ *Business Grow Karna*\n` +
    `4️⃣ *Career Build Karna*\n` +
    `5️⃣ *Pehle Details Dekhna*\n\n` +
    `_Bas number (1 se 5) ya apna goal reply karein._\n\n` +
    `— Team Abrar Nadir`
  );
}

function buildPersonalizedInterestResponse(interestType) {
  let acknowledgement = '';
  switch (interestType) {
    case 'digital_skill':
      acknowledgement = `Perfect 👍 Workshop mein aap practical digital aur AI skills ka roadmap dekhenge, jise beginners bhi step by step follow kar sakte hain.`;
      break;
    case 'freelancing':
      acknowledgement = `Excellent 👍 Workshop mein aapko skill selection, portfolio aur first client tak pahunchne ka practical direction milega.`;
      break;
    case 'business_growth':
      acknowledgement = `Great 👍 Workshop mein aap dekhenge ke AI aur digital systems se content, marketing aur business growth ko kaise improve kiya ja sakta hai.`;
      break;
    case 'career':
      acknowledgement = `Excellent 👍 Workshop aapko digital career options aur un skills ka clear roadmap dega jin par aap abhi kaam shuru kar sakte hain.`;
      break;
    case 'details_first':
      acknowledgement = `Bilkul 👍 Main pehle aapko complete workshop details share karta hoon, phir aap araam se decide kar sakte hain.`;
      break;
  }

  const nextMenu = (
    `\n\nAap agla step kya lena chahte hain?\n\n` +
    `*A* — 📋 Workshop Details & Outline\n` +
    `*B* — 💳 Fee & Payment Details\n` +
    `*C* — ❓ Ask a Question\n\n` +
    `_Reply A, B ya C karein._`
  );

  return acknowledgement + nextMenu;
}

function buildWorkshopDetailsBranch() {
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

function buildFeeAndPaymentBranch() {
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

function buildPaymentProofReceivedBranch(firstName) {
  return (
    `JazakAllah ${firstName || ''} 🙌\n\n` +
    `Aapka payment proof hamari team ko receive ho gaya hai.\n\n` +
    `Team abhi transaction record verify kar rahi hai. Human verification complete hote hi isi chat mein aapka private Google Meet room access link issue kar diya jayega.\n\n` +
    `Aapko dobara koi form fill karne ki zaroorat nahi hai.\n\n` +
    `— Team Abrar Nadir`
  );
}

function buildPaymentApprovedBranch(firstName) {
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

function buildHumanHandoffMessage(reason) {
  return (
    `Thank you. Aapka message hamare human operator ko assign kar diya gaya hai (${reason}).\n\n` +
    `Hamari team ka representative jald hi isi WhatsApp chat mein aapse directly baat karega taake aapko exact guidance mil sake.\n\n` +
    `— Support Desk | Abrar Nadir`
  );
}

function checkHumanHandoffTriggers(text) {
  const upper = text.toUpperCase();
  const triggers = [
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

function generateControlledAIResponse(userText) {
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

module.exports = {
  VARIANT_B_CONFIG,
  buildFirstInteractiveMessage,
  buildPersonalizedInterestResponse,
  buildWorkshopDetailsBranch,
  buildFeeAndPaymentBranch,
  buildPaymentProofReceivedBranch,
  buildPaymentApprovedBranch,
  buildHumanHandoffMessage,
  checkHumanHandoffTriggers,
  generateControlledAIResponse
};
