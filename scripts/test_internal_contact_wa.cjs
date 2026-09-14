const token = 'pit-4259cd3b-222c-4b57-8f88-400949576d75';
const locId = '6MzIr7iWX12OyaxfufLw';
const headers = { 'Authorization': 'Bearer ' + token, 'Version': '2021-07-28', 'Content-Type': 'application/json', 'Accept': 'application/json' };

async function testWithPhone() {
  // 1. Create or find internal test contact
  const searchRes = await fetch('https://services.leadconnectorhq.com/contacts/search?locationId=' + locId + '&query=internaltest@abrarnadir.com', { headers });
  const searchData = await searchRes.json();
  let testContact = searchData.contacts?.[0];

  if (!testContact) {
    const createRes = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        locationId: locId,
        firstName: '[INTERNAL TEST]',
        lastName: 'Abrar Workshop Tester',
        name: '[INTERNAL TEST] Abrar Workshop Tester',
        email: 'internaltest@abrarnadir.com',
        phone: '+923000000000',
        tags: ['test-lead']
      })
    });
    const createData = await createRes.json();
    testContact = createData.contact;
  }

  console.log('Internal Test Contact ID:', testContact?.id, testContact?.name, testContact?.phone);

  // 2. Test WhatsApp dispatch
  if (testContact?.id) {
    const payload = {
      type: 'WhatsApp',
      contactId: testContact.id,
      message: 'Test audit message'
    };

    const res = await fetch('https://services.leadconnectorhq.com/conversations/messages', {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });

    console.log('WhatsApp send test status:', res.status);
    const data = await res.json().catch(() => null);
    console.log('WhatsApp send test result:', data);
  }
}

testWithPhone();
