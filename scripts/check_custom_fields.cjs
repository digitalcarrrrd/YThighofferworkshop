const fs = require('fs');
const raw = JSON.parse(fs.readFileSync('ghl_audit_raw.json', 'utf8'));
const fields = raw['Custom Fields']?.data?.customFields || [];

const targetFieldNames = [
  'Workshop Name',
  'Workshop Date',
  'Workshop Time',
  'Workshop Fee',
  'Workshop Access Link',
  'Lead Source',
  'Meta Campaign',
  'Meta Ad Set',
  'Meta Ad',
  'Ad Keyword',
  'Student Category',
  'City',
  'Payment Method',
  'Transaction ID',
  'Payment Proof Received',
  'Payment Verification Status',
  'Payment Approved By',
  'Payment Approved Date',
  'Registration Status'
];

console.log('--- Matching Custom Fields ---');
targetFieldNames.forEach(target => {
  const match = fields.find(f => f.name.toLowerCase().trim() === target.toLowerCase().trim() || f.name.toLowerCase().includes(target.toLowerCase()));
  if (match) {
    console.log(`[EXISTS] "${target}" -> matches existing: "${match.name}" (Key: ${match.fieldKey}, ID: ${match.id}, Type: ${match.dataType})`);
  } else {
    console.log(`[MISSING] "${target}"`);
  }
});
