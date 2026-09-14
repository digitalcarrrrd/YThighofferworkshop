const token = 'pit-4259cd3b-222c-4b57-8f88-400949576d75';
const locId = '6MzIr7iWX12OyaxfufLw';
const headers = {
  'Authorization': 'Bearer ' + token,
  'Version': '2021-07-28',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

async function createCustomValues() {
  const values = [
    { name: 'workshop_name', value: 'YTEmpireBuilder YouTube Masterclass' },
    { name: 'workshop_date', value: '[WORKSHOP DATE REQUIRED]' },
    { name: 'workshop_time', value: 'Daily 8:00 PM - 10:00 PM PKT' },
    { name: 'workshop_fee', value: '1999' },
    { name: 'workshop_pdf_link', value: '[WORKSHOP PDF LINK REQUIRED]' },
    { name: 'workshop_access_link', value: 'https://lms.abrarnadir.com' },
    { name: 'payment_method', value: 'Meezan Bank & Easypaisa' },
    { name: 'account_title', value: 'Muhammad Abrar / Muhammad Abrar Ghauri' },
    { name: 'account_number', value: 'Meezan: 02370103321036 | Easypaisa: 03274532186' },
    { name: 'support_contact', value: '+92 326 6641695' }
  ];

  for (const v of values) {
    try {
      const res = await fetch('https://services.leadconnectorhq.com/locations/' + locId + '/customValues', {
        method: 'POST',
        headers,
        body: JSON.stringify({ name: v.name, value: v.value })
      });
      const data = await res.json();
      console.log(`Custom Value "${v.name}": status ${res.status}`, data.customValue?.id ? `ID: ${data.customValue.id}` : data);
    } catch (e) {
      console.error(`Custom Value "${v.name}" error:`, e.message);
    }
  }
}

createCustomValues();
