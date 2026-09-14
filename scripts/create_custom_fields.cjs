const token = 'pit-4259cd3b-222c-4b57-8f88-400949576d75';
const locId = '6MzIr7iWX12OyaxfufLw';
const headers = {
  'Authorization': 'Bearer ' + token,
  'Version': '2021-07-28',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

async function createField(fieldDef) {
  const payload = {
    name: fieldDef.name,
    dataType: fieldDef.dataType,
    model: 'contact'
  };

  if (fieldDef.options) {
    payload.options = fieldDef.options;
  }

  try {
    const res = await fetch('https://services.leadconnectorhq.com/locations/' + locId + '/customFields', {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    console.log(`Field "${fieldDef.name}": status ${res.status}`, data.customField?.id ? `ID: ${data.customField.id}` : data);
    return data.customField;
  } catch (e) {
    console.error(`Field "${fieldDef.name}" error:`, e.message);
    return null;
  }
}

async function run() {
  const fieldsToCreate = [
    { name: 'Workshop Name', dataType: 'TEXT' },
    { name: 'Workshop Date', dataType: 'DATE' },
    { name: 'Workshop Time', dataType: 'TEXT' },
    { name: 'Workshop Fee', dataType: 'TEXT' },
    { name: 'Workshop Access Link', dataType: 'TEXT' },
    { name: 'Lead Source', dataType: 'TEXT' },
    { name: 'Meta Campaign', dataType: 'TEXT' },
    { name: 'Meta Ad Set', dataType: 'TEXT' },
    { name: 'Meta Ad', dataType: 'TEXT' },
    { name: 'Ad Keyword', dataType: 'TEXT' },
    {
      name: 'Student Category',
      dataType: 'SINGLE_OPTIONS',
      options: ['Student', 'Freelancer', 'Business Owner', 'Job Holder', 'Other']
    },
    { name: 'Transaction ID', dataType: 'TEXT' },
    {
      name: 'Payment Proof Received',
      dataType: 'SINGLE_OPTIONS',
      options: ['Yes', 'No']
    },
    {
      name: 'Payment Verification Status',
      dataType: 'SINGLE_OPTIONS',
      options: ['Not Submitted', 'Pending Review', 'Approved', 'Rejected', 'Needs Clarification']
    },
    { name: 'Payment Approved By', dataType: 'TEXT' },
    { name: 'Payment Approved Date', dataType: 'DATE' },
    {
      name: 'Registration Status',
      dataType: 'SINGLE_OPTIONS',
      options: ['New', 'Qualified', 'Payment Pending', 'Paid', 'Access Sent', 'Not Interested']
    }
  ];

  for (const f of fieldsToCreate) {
    await createField(f);
  }
}

run();
