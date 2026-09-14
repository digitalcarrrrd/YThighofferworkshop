const token = 'pit-4259cd3b-222c-4b57-8f88-400949576d75';
const headers = { 'Authorization': 'Bearer ' + token, 'Version': '2021-07-28', 'Content-Type': 'application/json', 'Accept': 'application/json' };

const testContactId = '879FgsUEsDP9Vxc1gnr9'; // [INTERNAL TEST] Abrar Workshop Tester

const templatesToTest = [
  'yt_interest_payment_pending',
  'yt_payment_verified_details',
  'yt_15min_class_reminder',
  'yt_workshop_vip_upsell',
  'yt_24h_workshop_reminder',
  'yt_workshop_confirmation'
];

async function testTemplateDispatch() {
  for (const tName of templatesToTest) {
    const payload = {
      type: 'WhatsApp',
      contactId: testContactId,
      message: 'Test message body for template ' + tName,
      template: {
        name: tName,
        language: { code: 'en_US' }
      }
    };

    const res = await fetch('https://services.leadconnectorhq.com/conversations/messages', {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });

    const data = await res.json().catch(() => null);
    console.log(`Template: "${tName}" -> Status: ${res.status}`, data);
  }
}

testTemplateDispatch();
