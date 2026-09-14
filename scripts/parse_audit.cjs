const fs = require('fs');
const raw = JSON.parse(fs.readFileSync('ghl_audit_raw.json', 'utf8'));

console.log('====================================');
console.log('CUSTOM FIELDS:');
console.log('====================================');
const fields = raw['Custom Fields']?.data?.customFields || [];
fields.forEach(f => {
  console.log(`- [${f.dataType}] ${f.name} (Key: ${f.fieldKey || f.id})`);
  if (f.options && f.options.length) {
    console.log(`   Options: ${JSON.stringify(f.options)}`);
  }
});

console.log('\n====================================');
console.log('PIPELINES & STAGES:');
console.log('====================================');
const pipelines = raw['Pipelines']?.data?.pipelines || [];
pipelines.forEach(p => {
  console.log(`Pipeline: "${p.name}" (ID: ${p.id})`);
  (p.stages || []).forEach((s, idx) => {
    console.log(`  ${idx + 1}. [Stage] "${s.name}" (ID: ${s.id})`);
  });
});

console.log('\n====================================');
console.log('WORKFLOWS:');
console.log('====================================');
const workflows = raw['Workflows']?.data?.workflows || [];
workflows.forEach(w => {
  console.log(`Workflow: "${w.name}" | Status: ${w.status} | ID: ${w.id} | Version: ${w.version}`);
});

console.log('\n====================================');
console.log('FORMS:');
console.log('====================================');
const forms = raw['Forms']?.data?.forms || [];
forms.forEach(f => {
  console.log(`Form: "${f.name}" (ID: ${f.id})`);
});
