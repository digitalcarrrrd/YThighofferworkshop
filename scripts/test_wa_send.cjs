const token = 'pit-4259cd3b-222c-4b57-8f88-400949576d75';
const locId = '6MzIr7iWX12OyaxfufLw';
const headers = { 'Authorization': 'Bearer ' + token, 'Version': '2021-07-28', 'Content-Type': 'application/json', 'Accept': 'application/json' };

async function testWa() {
  // Let's test with contact Zg45zfNC4o0XvOW9ikx8 (True Tester)
  const payload = {
    type: 'WhatsApp',
    contactId: 'Zg45zfNC4o0XvOW9ikx8',
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

testWa();
