const token = 'pit-4259cd3b-222c-4b57-8f88-400949576d75';
const locId = '6MzIr7iWX12OyaxfufLw';
const headers = { 'Authorization': 'Bearer ' + token, 'Version': '2021-07-28', 'Accept': 'application/json' };

async function run() {
  const url = 'https://services.leadconnectorhq.com/conversations/search?locationId=' + locId + '&limit=10';
  const res = await fetch(url, { headers });
  const data = await res.json();
  console.log('Status:', res.status);
  console.log('Conversations total:', data.total || data.conversations?.length);
  if (data.conversations && data.conversations.length) {
    for (const c of data.conversations.slice(0, 5)) {
      console.log('--- Conversation ID:', c.id, '---');
      console.log('Contact ID:', c.contactId);
      console.log('Contact Name:', c.contactName);
      console.log('Contact Phone:', c.phone);
      console.log('Last Message Type:', c.lastMessageType);
      console.log('Last Message Direction:', c.lastMessageDirection);
      console.log('Last Message Body:', c.lastMessageBody);
      console.log('Date:', c.dateUpdated || c.lastMessageDate);
    }
  } else {
    console.log('No conversations found or response:', data);
  }
}

run();
