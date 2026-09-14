const token = 'pit-4259cd3b-222c-4b57-8f88-400949576d75';
const locId = '6MzIr7iWX12OyaxfufLw';
const headers = {
  'Authorization': 'Bearer ' + token,
  'Version': '2021-07-28',
  'Accept': 'application/json'
};

async function testTemplates() {
  const endpoints = [
    `https://services.leadconnectorhq.com/locations/${locId}/templates?type=whatsapp`,
    `https://services.leadconnectorhq.com/locations/${locId}/templates?originId=whatsapp`,
    `https://services.leadconnectorhq.com/locations/${locId}/templates`,
    `https://services.leadconnectorhq.com/whatsapp/templates?locationId=${locId}`,
    `https://services.leadconnectorhq.com/conversations/templates?locationId=${locId}`,
    `https://services.leadconnectorhq.com/conversations/messages/templates?locationId=${locId}`,
    `https://services.leadconnectorhq.com/locations/${locId}/custom-templates`,
    `https://services.leadconnectorhq.com/phone-numbers/whatsapp/templates?locationId=${locId}`
  ];

  for (const url of endpoints) {
    try {
      const res = await fetch(url, { headers });
      const text = await res.text();
      let json;
      try { json = JSON.parse(text); } catch { json = null; }
      console.log('Endpoint:', url.replace('https://services.leadconnectorhq.com', ''), 'Status:', res.status);
      if (res.ok) {
        console.log('Result:', JSON.stringify(json || text, null, 2).slice(0, 1000));
      } else {
        console.log('Error snippet:', text.slice(0, 200));
      }
    } catch (e) {
      console.log('Failed to fetch:', url, e.message);
    }
  }
}

testTemplates();
