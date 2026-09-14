const token = 'pit-4259cd3b-222c-4b57-8f88-400949576d75';
const locId = '6MzIr7iWX12OyaxfufLw';
const headers = {
  'Authorization': 'Bearer ' + token,
  'Version': '2021-07-28',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

async function createTags() {
  const tags = [
    'abrarnadir_workshop_lead',
    'meta_whatsapp_ad',
    'details_received',
    'payment_pending',
    'payment_proof_received',
    'payment_approved',
    'payment_rejected',
    'workshop_access_sent',
    'followup_required',
    'not_interested',
    'operator_attention_required'
  ];

  for (const t of tags) {
    try {
      const res = await fetch('https://services.leadconnectorhq.com/locations/' + locId + '/tags', {
        method: 'POST',
        headers,
        body: JSON.stringify({ name: t })
      });
      const data = await res.json();
      console.log(`Tag "${t}": status ${res.status}`, data.tag?.id ? `ID: ${data.tag.id}` : data);
    } catch (e) {
      console.error(`Tag "${t}" error:`, e.message);
    }
  }
}

createTags();
