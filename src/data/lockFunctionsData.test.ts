import test from 'node:test';
import assert from 'node:assert/strict';
import { LOCK_FUNCTIONS_DATA } from './lockFunctionsData.js';
import { LockFunctionKey } from '../types/index.js';

test('lockFunctionsData defines all 6 standard models correctly', () => {
  const expectedKeys: LockFunctionKey[] = ['passage', 'intimite', 'bureau', 'classe', 'depot', 'factice'];
  assert.equal(Object.keys(LOCK_FUNCTIONS_DATA).length, 6);

  for (const key of expectedKeys) {
    assert.ok(LOCK_FUNCTIONS_DATA[key], `Missing lock function ${key}`);
    assert.ok(LOCK_FUNCTIONS_DATA[key].seriesCode.startsWith('EM10'), `Invalid seriesCode for ${key}`);
  }

  // Check specific required codes
  assert.equal(LOCK_FUNCTIONS_DATA.passage.seriesCode, 'EM1010');
  assert.equal(LOCK_FUNCTIONS_DATA.intimite.seriesCode, 'EM1042');
  assert.equal(LOCK_FUNCTIONS_DATA.bureau.seriesCode, 'EM1053');
  assert.equal(LOCK_FUNCTIONS_DATA.classe.seriesCode, 'EM1070');
  assert.equal(LOCK_FUNCTIONS_DATA.depot.seriesCode, 'EM1080');
  assert.equal(LOCK_FUNCTIONS_DATA.factice.seriesCode, 'EM1017');

  // Verify Factice has no through hole spindle or interior mechanism
  assert.equal(LOCK_FUNCTIONS_DATA.factice.exteriorMechanism, 'surface-mount-dummy');
  assert.equal(LOCK_FUNCTIONS_DATA.factice.interiorMechanism, 'none-dummy');

  // Verify Classe interior mechanism has no button
  assert.equal(LOCK_FUNCTIONS_DATA.classe.interiorMechanism, 'always-free-no-button');
  assert.equal(LOCK_FUNCTIONS_DATA.classe.exteriorMechanism, 'cylinder-key');
});
