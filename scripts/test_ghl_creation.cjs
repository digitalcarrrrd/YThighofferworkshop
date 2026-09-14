const token = 'pit-4259cd3b-222c-4b57-8f88-400949576d75';
const locId = '6MzIr7iWX12OyaxfufLw';
const headers = { 'Authorization': 'Bearer ' + token, 'Version': '2021-07-28', 'Content-Type': 'application/json', 'Accept': 'application/json' };

async function testEndpoints() {
  // Test Tag creation endpoint with a dry/test check
  console.log('--- Testing Tag Endpoint ---');
  const tagRes = await fetch('https://services.leadconnectorhq.com/locations/' + locId + '/tags', {
    method: 'POST',
    headers,
    body: JSON.stringify({ name: 'test_audit_tag' })
  });
  console.log('Tag POST Status:', tagRes.status);
  const tagData = await tagRes.json();
  console.log('Tag POST Result:', tagData);
  if (tagRes.ok && tagData.tag?.id) {
    // Delete test tag to keep clean
    await fetch('https://services.leadconnectorhq.com/locations/' + locId + '/tags/' + tagData.tag.id, {
      method: 'DELETE',
      headers
    });
    console.log('Deleted test tag successfully');
  }

  // Test Custom Value creation endpoint
  console.log('\n--- Testing Custom Value Endpoint ---');
  const cvRes = await fetch('https://services.leadconnectorhq.com/locations/' + locId + '/customValues', {
    method: 'POST',
    headers,
    body: JSON.stringify({ name: 'test_audit_val', value: 'test' })
  });
  console.log('Custom Value POST Status:', cvRes.status);
  const cvData = await cvRes.json();
  console.log('Custom Value POST Result:', cvData);
  if (cvRes.ok && cvData.customValue?.id) {
    await fetch('https://services.leadconnectorhq.com/locations/' + locId + '/customValues/' + cvData.customValue.id, {
      method: 'DELETE',
      headers
    });
    console.log('Deleted test custom value successfully');
  }

  // Test Custom Field creation endpoint
  console.log('\n--- Testing Custom Field Endpoint ---');
  const cfRes = await fetch('https://services.leadconnectorhq.com/locations/' + locId + '/customFields', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      name: 'test_audit_field',
      dataType: 'TEXT',
      model: 'contact'
    })
  });
  console.log('Custom Field POST Status:', cfRes.status);
  const cfData = await cfRes.json();
  console.log('Custom Field POST Result:', cfData);
  if (cfRes.ok && cfData.customField?.id) {
    await fetch('https://services.leadconnectorhq.com/locations/' + locId + '/customFields/' + cfData.customField.id, {
      method: 'DELETE',
      headers
    });
    console.log('Deleted test custom field successfully');
  }

  // Test Pipeline creation endpoint
  console.log('\n--- Testing Pipeline Endpoint ---');
  const pipeRes = await fetch('https://services.leadconnectorhq.com/opportunities/pipelines?locationId=' + locId, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      name: 'test_audit_pipeline',
      stages: [{ name: 'Stage 1' }]
    })
  });
  console.log('Pipeline POST Status:', pipeRes.status);
  const pipeData = await pipeRes.json();
  console.log('Pipeline POST Result:', pipeData);
  if (pipeRes.ok && pipeData.pipeline?.id) {
    await fetch('https://services.leadconnectorhq.com/opportunities/pipelines/' + pipeData.pipeline.id + '?locationId=' + locId, {
      method: 'DELETE',
      headers
    });
    console.log('Deleted test pipeline successfully');
  }
}

testEndpoints();
