const token = 'pit-4259cd3b-222c-4b57-8f88-400949576d75';
const locId = '6MzIr7iWX12OyaxfufLw';
const headers = {
  'Authorization': 'Bearer ' + token,
  'Version': '2021-07-28',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

async function createPipeline() {
  const stages = [
    { name: 'New WhatsApp Lead', position: 0 },
    { name: 'Details Received', position: 1 },
    { name: 'Payment Pending', position: 2 },
    { name: 'Payment Proof Received', position: 3 },
    { name: 'Payment Approved', position: 4 },
    { name: 'Workshop Link Sent', position: 5 },
    { name: 'Follow-up Required', position: 6 },
    { name: 'Not Interested', position: 7 },
    { name: 'Refund/Issue', position: 8 }
  ];

  const payload = {
    locationId: locId,
    name: 'Abrar Nadir Workshop Admissions',
    stages: stages
  };

  const res = await fetch('https://services.leadconnectorhq.com/opportunities/pipelines', {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  });

  console.log('Pipeline Creation Status:', res.status);
  const data = await res.json();
  console.log('Pipeline Creation Result:', JSON.stringify(data, null, 2));
}

createPipeline();
