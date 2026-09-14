const token = 'pit-4259cd3b-222c-4b57-8f88-400949576d75';
const locId = '6MzIr7iWX12OyaxfufLw';
const headers = { 'Authorization': 'Bearer ' + token, 'Version': '2021-07-28', 'Accept': 'application/json' };

async function run() {
  // Search for WhatsApp messages
  const url = 'https://services.leadconnectorhq.com/conversations/search?locationId=' + locId + '&limit=50';
  const res = await fetch(url, { headers });
  const data = await res.json();
  const waConversations = (data.conversations || []).filter(c => 
    c.lastMessageType?.toLowerCase().includes('whatsapp') || 
    c.lastMessageType?.toLowerCase().includes('sms')
  );
  console.log('Total checked:', data.conversations?.length, 'WA/SMS conversations found:', waConversations.length);

  for (const c of waConversations.slice(0, 5)) {
    console.log('--- Conversation:', c.id, '---');
    console.log('Contact:', c.contactName, c.phone);
    console.log('Type:', c.lastMessageType, 'Direction:', c.lastMessageDirection);
    console.log('Body:', c.lastMessageBody);
  }

  // Let's also check messages endpoint of a conversation
  if (data.conversations && data.conversations.length > 0) {
    const convId = data.conversations[0].id;
    const msgRes = await fetch('https://services.leadconnectorhq.com/conversations/' + convId + '/messages', { headers });
    console.log('Messages endpoint check on conv', convId, 'status:', msgRes.status);
    const msgData = await msgRes.json();
    console.log('Message sample:', JSON.stringify(msgData?.messages?.messages?.[0] || msgData?.messages?.[0] || msgData, null, 2).slice(0, 500));
  }
}

run();
