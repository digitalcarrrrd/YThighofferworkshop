const token = 'pit-4259cd3b-222c-4b57-8f88-400949576d75';
const locId = '6MzIr7iWX12OyaxfufLw';
const headers = { 'Authorization': 'Bearer ' + token, 'Version': '2021-07-28', 'Accept': 'application/json' };

async function getMedia() {
  const types = ['file', 'image', 'video', 'document', 'all', 'media'];
  for (const t of types) {
    const url = 'https://services.leadconnectorhq.com/medias/files?locationId=' + locId + '&type=' + t;
    const r = await fetch(url, { headers });
    console.log('type=' + t, 'status:', r.status);
    if (r.ok) {
      const data = await r.json();
      console.log('Found files:', data.files?.length || data);
      if (data.files && data.files.length) {
        data.files.slice(0, 5).forEach(f => console.log(' -', f.name, f.url));
      }
      break;
    }
  }
}

getMedia();
