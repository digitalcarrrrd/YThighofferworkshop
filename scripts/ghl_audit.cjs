const fs = require('fs');

const token = process.env.GHL_PRIVATE_INTEGRATION_TOKEN || 'pit-4259cd3b-222c-4b57-8f88-400949576d75';
const locId = process.env.GHL_LOCATION_ID || '6MzIr7iWX12OyaxfufLw';
const headers = {
  'Authorization': 'Bearer ' + token,
  'Version': '2021-07-28',
  'Accept': 'application/json'
};

async function checkEndpoint(name, url) {
  try {
    const res = await fetch(url, { headers });
    const text = await res.text();
    let data;
    try { data = JSON.parse(text); } catch { data = text; }
    return { name, status: res.status, ok: res.ok, data };
  } catch (e) {
    return { name, error: e.message };
  }
}

async function run() {
  const endpoints = [
    { name: 'Location Details', url: `https://services.leadconnectorhq.com/locations/${locId}` },
    { name: 'Custom Fields', url: `https://services.leadconnectorhq.com/locations/${locId}/customFields` },
    { name: 'Custom Values', url: `https://services.leadconnectorhq.com/locations/${locId}/customValues` },
    { name: 'Tags', url: `https://services.leadconnectorhq.com/locations/${locId}/tags` },
    { name: 'Pipelines', url: `https://services.leadconnectorhq.com/opportunities/pipelines?locationId=${locId}` },
    { name: 'Workflows', url: `https://services.leadconnectorhq.com/workflows/?locationId=${locId}` },
    { name: 'Phone Numbers', url: `https://services.leadconnectorhq.com/phone-numbers/?locationId=${locId}` },
    { name: 'WhatsApp Templates', url: `https://services.leadconnectorhq.com/conversations/templates?locationId=${locId}` },
    { name: 'Forms', url: `https://services.leadconnectorhq.com/forms/?locationId=${locId}` },
    { name: 'Funnels', url: `https://services.leadconnectorhq.com/funnels/funnel/list?locationId=${locId}` },
    { name: 'Users', url: `https://services.leadconnectorhq.com/users/?locationId=${locId}` },
    { name: 'Conversations Channels', url: `https://services.leadconnectorhq.com/conversations/providers?locationId=${locId}` },
    { name: 'Installed Apps / Integrations', url: `https://services.leadconnectorhq.com/integrations/locations/${locId}` }
  ];

  const results = {};
  for (const ep of endpoints) {
    console.log(`Checking ${ep.name}...`);
    const r = await checkEndpoint(ep.name, ep.url);
    results[ep.name] = r;
    console.log(` -> Status: ${r.status || 'Error'}`);
  }

  fs.writeFileSync('ghl_audit_raw.json', JSON.stringify(results, null, 2), 'utf8');
  console.log('Saved audit results to ghl_audit_raw.json');
}

run();
