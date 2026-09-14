const token = 'pit-4259cd3b-222c-4b57-8f88-400949576d75';
const locId = '6MzIr7iWX12OyaxfufLw';
const headers = { 'Authorization': 'Bearer ' + token, 'Version': '2021-07-28', 'Accept': 'application/json' };

async function getTemplates() {
  const r = await fetch('https://services.leadconnectorhq.com/locations/' + locId + '/templates', { headers });
  const data = await r.json();
  console.log('Total templates found:', data.templates?.length);
  (data.templates || []).forEach(t => {
    console.log('--- Template ID:', t.id, '---');
    console.log('Name:', t.name);
    console.log('Type:', t.type);
    console.log('Body:', JSON.stringify(t.template?.body || t.template));
    console.log('Attachments:', t.template?.attachments);
  });
}

getTemplates();
