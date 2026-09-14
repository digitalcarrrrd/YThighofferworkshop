const token = 'pit-4259cd3b-222c-4b57-8f88-400949576d75';
const locId = '6MzIr7iWX12OyaxfufLw';
const headers = { 'Authorization': 'Bearer ' + token, 'Version': '2021-07-28', 'Accept': 'application/json' };

async function probe() {
  const urls = [
    'https://services.leadconnectorhq.com/conversations/messages/whatsapp/templates?locationId=' + locId,
    'https://services.leadconnectorhq.com/locations/' + locId + '/customFields',
    'https://services.leadconnectorhq.com/locations/' + locId + '/customValues',
    'https://services.leadconnectorhq.com/locations/' + locId + '/tags',
    'https://services.leadconnectorhq.com/medias/files?locationId=' + locId,
    'https://services.leadconnectorhq.com/locations/' + locId + '/integrations',
    'https://services.leadconnectorhq.com/locations/' + locId + '/templates'
  ];

  for (const url of urls) {
    try {
      const r = await fetch(url, { headers });
      const text = await r.text();
      console.log(url.split('.com')[1], 'Status:', r.status);
      if (r.ok) {
        console.log(' -> Data:', text.slice(0, 300));
      } else {
        console.log(' -> Response:', text.slice(0, 200));
      }
    } catch (e) {
      console.log(url, 'Error:', e.message);
    }
  }
}

probe();
