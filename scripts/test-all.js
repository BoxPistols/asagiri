#!/usr/bin/env node
/**
 * Run all validation tests
 */

const { execSync } = require('child_process');

const tests = [
  { name: 'CSS Path Validation', script: 'node scripts/validate-styles.js' },
  { name: 'Link Checking', script: 'node scripts/check-links.js' },
];

console.log('🚀 Running comprehensive validation tests...\n');

let failedTests = [];

tests.forEach(({ name, script }) => {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📋 Running: ${name}`);
  console.log('='.repeat(60) + '\n');

  try {
    execSync(script, { stdio: 'inherit' });
    console.log(`\n✅ ${name} passed\n`);
  } catch (error) {
    console.error(`\n❌ ${name} failed\n`);
    failedTests.push(name);
  }
});

console.log('\n' + '='.repeat(60));
console.log('📊 Test Summary');
console.log('='.repeat(60));
console.log(`Total tests: ${tests.length}`);
console.log(`Passed: ${tests.length - failedTests.length}`);
console.log(`Failed: ${failedTests.length}`);

if (failedTests.length > 0) {
  console.error('\n❌ Failed tests:');
  failedTests.forEach((test) => console.error(`   - ${test}`));
  console.log('');
  process.exit(1);
} else {
  console.log('\n✅ All validation tests passed!\n');
  process.exit(0);
}
