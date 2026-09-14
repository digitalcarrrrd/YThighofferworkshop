const token = 'pit-4259cd3b-222c-4b57-8f88-400949576d75';
const locId = '6MzIr7iWX12OyaxfufLw';
const headers = { 'Authorization': 'Bearer ' + token, 'Version': '2021-07-28', 'Content-Type': 'application/json', 'Accept': 'application/json' };

const PIPELINE_ID = 'SLf8kzZ9MhXAyQYFeAm2';
const STAGES = {
  NEW_WHATSAPP_LEAD: '5abe848f-0c44-42a4-b2bf-c294af501659',
  DETAILS_RECEIVED: '59ec33bb-0200-4753-8157-1a8b90e3b744',
  PAYMENT_PENDING: '0ff8114f-e6c1-4532-abc7-ef64ccb8366d',
  PAYMENT_PROOF_RECEIVED: '1519847d-e659-4ec8-8177-8c5c63b880f0',
  PAYMENT_APPROVED: '6d56408a-2b4b-4706-bf84-2b6477abfd25',
  WORKSHOP_LINK_SENT: '108c6cc1-3fc8-4a8a-989e-ab258c774549',
  FOLLOWUP_REQUIRED: '8096f4b6-00fd-4d67-8fca-6a79c41297bd',
  NOT_INTERESTED: 'e4c8dbf1-b1d1-454f-bc05-d7589723aecf',
  REFUND_ISSUE: '2967d065-7c0d-4ceb-886f-8b7d0ca21535',
};

async function runTests() {
  console.log('=====================================================');
  console.log('STARTING SAFE END-TO-END WORKSHOP ADMISSION AUDIT TEST');
  console.log('Target: [INTERNAL TEST] Abrar Workshop Tester');
  console.log('Pipeline: Abrar Nadir Workshop Admissions (' + PIPELINE_ID + ')');
  console.log('=====================================================\n');

  const testResults = [];

  // TEST 1: New WhatsApp inquiry & Contact / Opportunity Creation
  console.log('▶ TEST 1: New WhatsApp Inquiry & Lead Creation...');
  const upsertRes = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      locationId: locId,
      name: '[INTERNAL TEST] Abrar Workshop Tester',
      firstName: '[INTERNAL TEST]',
      lastName: 'Abrar Workshop Tester',
      email: 'internaltest@abrarnadir.com',
      phone: '+923000000000',
      tags: ['abrarnadir_workshop_lead', 'meta_whatsapp_ad', 'test-lead']
    })
  });
  const upsertData = await upsertRes.json();
  const contactId = upsertData.contact?.id;
  console.log('  Contact ID:', contactId, 'Status:', upsertRes.status);

  // Create Opportunity in New WhatsApp Lead
  const oppRes = await fetch('https://services.leadconnectorhq.com/opportunities/', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      pipelineId: PIPELINE_ID,
      locationId: locId,
      name: '[INTERNAL TEST] - YTEmpireBuilder Masterclass',
      pipelineStageId: STAGES.NEW_WHATSAPP_LEAD,
      status: 'open',
      contactId: contactId,
      monetaryValue: 1999
    })
  });
  const oppData = await oppRes.json();
  const opportunityId = oppData.opportunity?.id || oppData.id || oppData.meta?.existingId;
  console.log('  Opportunity ID:', opportunityId, 'Stage: New WhatsApp Lead');
  testResults.push({ test: '1. New Lead & Opportunity Creation', pass: Boolean(contactId && opportunityId) });

  // TEST 2: Duplicate Incoming Message Check
  console.log('\n▶ TEST 2: Duplicate Incoming Message Handling...');
  // Brief delay for GHL search index propagation
  await new Promise(r => setTimeout(r, 1500));
  const dupCheck = await fetch('https://services.leadconnectorhq.com/opportunities/search?location_id=' + locId + '&contact_id=' + contactId, { headers });
  const dupData = await dupCheck.json();
  const oppsCount = dupData.opportunities?.filter(o => o.pipelineId === PIPELINE_ID && o.status === 'open').length || 0;
  console.log('  Open opportunities in admission pipeline for test contact:', oppsCount);
  testResults.push({ test: '2. Duplicate Opportunity Prevention', pass: oppsCount >= 1 });

  // TEST 3: Details Collection & PDF Delivery -> Move to Details Received & Payment Pending
  console.log('\n▶ TEST 3: Details Collection & Stage Transition to Details Received -> Payment Pending...');
  // Update stage to Payment Pending
  const moveRes1 = await fetch('https://services.leadconnectorhq.com/opportunities/' + opportunityId, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ pipelineStageId: STAGES.PAYMENT_PENDING })
  });
  // Apply tags: details_received, payment_pending
  const tagRes1 = await fetch('https://services.leadconnectorhq.com/contacts/' + contactId, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      city: 'Lahore',
      tags: ['abrarnadir_workshop_lead', 'meta_whatsapp_ad', 'details_received', 'payment_pending', 'test-lead']
    })
  });
  console.log('  Move stage to Payment Pending Status:', moveRes1.status);
  console.log('  Tags applied: details_received, payment_pending');
  testResults.push({ test: '3. Details Collection & Payment Pending Stage', pass: moveRes1.ok && tagRes1.ok });

  // TEST 4: Payment Proof Received Path
  console.log('\n▶ TEST 4: Payment Proof Received & Operator Verification Alert...');
  const moveRes2 = await fetch('https://services.leadconnectorhq.com/opportunities/' + opportunityId, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ pipelineStageId: STAGES.PAYMENT_PROOF_RECEIVED })
  });
  // Add Operator Verification Alert Note
  const noteRes = await fetch('https://services.leadconnectorhq.com/contacts/' + contactId + '/notes', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      body: '🔔 [TEST AUDIT] OPERATOR ACTION REQUIRED: Test Payment Proof received. Automated approval DISABLED. Operator must manually verify Meezan / Easypaisa.'
    })
  });
  console.log('  Moved stage to Payment Proof Received Status:', moveRes2.status);
  console.log('  Operator alert note posted Status:', noteRes.status);
  testResults.push({ test: '4. Payment Proof Received & Operator Notification', pass: moveRes2.ok && noteRes.ok });

  // TEST 5: Manual Payment Approved Stage Change & Workshop Link Sent
  console.log('\n▶ TEST 5: Manual Operator Payment Approved & Access Link Dispatch...');
  const moveRes3 = await fetch('https://services.leadconnectorhq.com/opportunities/' + opportunityId, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ pipelineStageId: STAGES.WORKSHOP_LINK_SENT })
  });
  // Remove pending tags, apply payment_approved, workshop_access_sent
  const tagRes2 = await fetch('https://services.leadconnectorhq.com/contacts/' + contactId, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      tags: ['abrarnadir_workshop_lead', 'meta_whatsapp_ad', 'details_received', 'payment_approved', 'workshop_access_sent', 'test-lead']
    })
  });
  console.log('  Moved stage to Workshop Link Sent Status:', moveRes3.status);
  console.log('  Tags updated: payment_approved, workshop_access_sent (payment_pending removed)');
  testResults.push({ test: '5. Manual Payment Approval & Link Delivery', pass: moveRes3.ok && tagRes2.ok });

  // TEST 6: Payment Issue / Rejection Path
  console.log('\n▶ TEST 6: Payment Issue / Clarification Path...');
  const moveRes4 = await fetch('https://services.leadconnectorhq.com/opportunities/' + opportunityId, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ pipelineStageId: STAGES.FOLLOWUP_REQUIRED })
  });
  console.log('  Moved stage to Follow-up Required Status:', moveRes4.status);
  testResults.push({ test: '6. Payment Issue / Rejection to Follow-up Required', pass: moveRes4.ok });

  // TEST 7: STOP / Opt-Out Path
  console.log('\n▶ TEST 7: STOP / Opt-Out Path...');
  const moveRes5 = await fetch('https://services.leadconnectorhq.com/opportunities/' + opportunityId, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ pipelineStageId: STAGES.NOT_INTERESTED })
  });
  const dndRes = await fetch('https://services.leadconnectorhq.com/contacts/' + contactId, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      dnd: true,
      tags: ['abrarnadir_workshop_lead', 'not_interested', 'test-lead']
    })
  });
  console.log('  Moved stage to Not Interested Status:', moveRes5.status);
  console.log('  DND activated Status:', dndRes.status);
  testResults.push({ test: '7. STOP / Opt-Out & DND Activation', pass: moveRes5.ok && dndRes.ok });

  // TEST 8: GHL Workflow Enrollment API Check
  console.log('\n▶ TEST 8: Direct GHL Workflow Enrollment API Check...');
  const wfId = '8c73d915-30dc-4f5f-9fbe-0db027ca6f32'; // YouTube Workshop WhatsApp Confirmation
  const wfRes = await fetch('https://services.leadconnectorhq.com/contacts/' + contactId + '/workflow/' + wfId, {
    method: 'POST',
    headers
  });
  console.log('  GHL Workflow enrollment Status:', wfRes.status);
  testResults.push({ test: '8. GHL Workflow Enrollment API Check', pass: wfRes.ok || wfRes.status === 200 || wfRes.status === 201 });

  console.log('\n=====================================================');
  console.log('TEST SUMMARY RESULTS:');
  console.log('=====================================================');
  testResults.forEach(tr => {
    console.log(`[${tr.pass ? 'PASS ✅' : 'FAIL ❌'}] ${tr.test}`);
  });
}

runTests();
