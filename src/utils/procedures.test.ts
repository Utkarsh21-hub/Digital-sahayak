import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateSavings,
  filterProcedures,
  getChecklistReadyCount,
  generateWhatsAppSummary,
  PROCEDURES_DATA,
} from './procedures';

test('calculateSavings correctly subtracts officialFee from cyberCafeCharge', () => {
  assert.equal(calculateSavings(1700, 2100), 400);
  assert.equal(calculateSavings(200, 1000), 800);
  assert.equal(calculateSavings(0, 300), 300);
  assert.equal(calculateSavings(500, 200), 0);
});

test('filterProcedures filters by category properly', () => {
  const easyOnly = filterProcedures(PROCEDURES_DATA, '', 'easy');
  assert.ok(easyOnly.length > 0);
  easyOnly.forEach((p) => assert.equal(p.category, 'easy'));

  const hardOnly = filterProcedures(PROCEDURES_DATA, '', 'hard');
  assert.ok(hardOnly.length > 0);
  hardOnly.forEach((p) => assert.equal(p.category, 'hard'));
});

test('filterProcedures matches keywords across title, portal and tags', () => {
  const neetResults = filterProcedures(PROCEDURES_DATA, 'NEET', 'all');
  assert.equal(neetResults.length, 1);
  assert.equal(neetResults[0].id, 'neet-ug-2025');

  const aadhaarResults = filterProcedures(PROCEDURES_DATA, 'Aadhaar', 'all');
  assert.ok(aadhaarResults.length >= 2);

  const nonExistent = filterProcedures(PROCEDURES_DATA, 'xyzrandom999', 'all');
  assert.equal(nonExistent.length, 0);
});

test('getChecklistReadyCount computes ready count and percentage accurately', () => {
  const items = [
    { checked: true },
    { checked: true },
    { checked: false },
    { checked: false },
  ];
  const stats = getChecklistReadyCount(items);
  assert.equal(stats.ready, 2);
  assert.equal(stats.total, 4);
  assert.equal(stats.percent, 50);

  const emptyStats = getChecklistReadyCount([]);
  assert.equal(emptyStats.percent, 100);
});

test('generateWhatsAppSummary builds structured text containing crucial security warnings and ref', () => {
  const neet = PROCEDURES_DATA[0];
  const summary = generateWhatsAppSummary(neet, 1, 'NTA-NEET-2025-APP-88492');
  assert.ok(summary.includes('Digital Sahayak'));
  assert.ok(summary.includes('NTA-NEET-2025-APP-88492'));
  assert.ok(summary.includes('Step 2 of 6'));
  assert.ok(summary.includes('Never share OTP'));
});
