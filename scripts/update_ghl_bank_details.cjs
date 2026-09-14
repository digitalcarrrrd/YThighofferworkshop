const token = 'pit-4259cd3b-222c-4b57-8f88-400949576d75';
const locId = '6MzIr7iWX12OyaxfufLw';
const headers = { 'Authorization': 'Bearer ' + token, 'Version': '2021-07-28', 'Content-Type': 'application/json', 'Accept': 'application/json' };

async function updateCustomValues() {
  // 1. Update existing account_number & account_title
  const updates = [
    {
      id: 'GMdQ1s46kFfMJmJoKuKU',
      name: 'account_title',
      value: 'Muhammad Abrar (Meezan Bank) | Muhammad Abrar Ghauri (Easypaisa)'
    },
    {
      id: '1guYeRfLcKNlyqHEg2jG',
      name: 'account_number',
      value: 'Meezan Bank: 02370103321036 (IBAN: PK39MEZN0002370103321036) | Easypaisa: 03274532186'
    }
  ];

  for (const u of updates) {
    const res = await fetch(`https://services.leadconnectorhq.com/locations/${locId}/customValues/${u.id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ name: u.name, value: u.value })
    });
    console.log(`Updated "${u.name}": status ${res.status}`);
  }

  // 2. Add specific granular custom values
  const newValues = [
    { name: 'bank_name', value: 'Meezan Bank Limited' },
    { name: 'bank_account_title', value: 'Muhammad Abrar' },
    { name: 'bank_account_number', value: '02370103321036' },
    { name: 'bank_iban', value: 'PK39MEZN0002370103321036' },
    { name: 'easypaisa_account_title', value: 'Muhammad Abrar Ghauri' },
    { name: 'easypaisa_number', value: '03274532186' },
    {
      name: 'founding_bonuses',
      value: '5 Founding Bonuses (Worth PKR 15,499): 1. 50+ AI Prompts Pack (PKR 3,000) 2. Niche Research Matrix Template (PKR 2,000) 3. 90-Day Content Calendar Planner (PKR 2,500) 4. 7-Day WhatsApp Group Support (PKR 5,000) 5. Workshop Recording (PKR 2,999)'
    }
  ];

  for (const nv of newValues) {
    const res = await fetch(`https://services.leadconnectorhq.com/locations/${locId}/customValues`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ name: nv.name, value: nv.value })
    });
    const data = await res.json();
    console.log(`Created "${nv.name}": status ${res.status}`, data.customValue?.id || data);
  }
}

updateCustomValues();
