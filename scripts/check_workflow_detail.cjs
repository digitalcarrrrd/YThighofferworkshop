const token = 'pit-4259cd3b-222c-4b57-8f88-400949576d75';
const locId = '6MzIr7iWX12OyaxfufLw';
const headers = { 'Authorization': 'Bearer ' + token, 'Version': '2021-07-28', 'Accept': 'application/json' };

async function checkWorkflow(id) {
  const r = await fetch('https://services.leadconnectorhq.com/workflows/' + id, { headers });
  console.log('Workflow', id, 'Status:', r.status);
  const text = await r.text();
  console.log('Response:', text.slice(0, 500));
}

checkWorkflow('8c73d915-30dc-4f5f-9fbe-0db027ca6f32');
