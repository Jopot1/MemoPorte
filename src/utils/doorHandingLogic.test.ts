import test from 'node:test';
import assert from 'node:assert/strict';
import { determineDoorHanding, decomposeDoorHanding, getDoorRotationAngle } from './doorHandingLogic';

test('determineDoorHanding: identifies all 4 ANSI door hands correctly', () => {
  // Push toward interior
  assert.equal(determineDoorHanding('left', 'push'), 'LH');
  assert.equal(determineDoorHanding('right', 'push'), 'RH');

  // Pull toward exterior (Reverse)
  assert.equal(determineDoorHanding('left', 'pull'), 'LHR');
  assert.equal(determineDoorHanding('right', 'pull'), 'RHR');
});

test('decomposeDoorHanding: reverses code to correct hinge and swing action', () => {
  assert.deepEqual(decomposeDoorHanding('LH'), { hingeSide: 'left', swingAction: 'push' });
  assert.deepEqual(decomposeDoorHanding('RH'), { hingeSide: 'right', swingAction: 'push' });
  assert.deepEqual(decomposeDoorHanding('LHR'), { hingeSide: 'left', swingAction: 'pull' });
  assert.deepEqual(decomposeDoorHanding('RHR'), { hingeSide: 'right', swingAction: 'pull' });
});

test('getDoorRotationAngle: calculates angles for 0° and 90° states', () => {
  assert.equal(getDoorRotationAngle('LH', 0), 0);
  assert.equal(getDoorRotationAngle('LH', 90), -90);

  assert.equal(getDoorRotationAngle('RH', 0), 0);
  assert.equal(getDoorRotationAngle('RH', 90), 90);

  assert.equal(getDoorRotationAngle('LHR', 0), 0);
  assert.equal(getDoorRotationAngle('LHR', 90), 90);

  assert.equal(getDoorRotationAngle('RHR', 0), 0);
  assert.equal(getDoorRotationAngle('RHR', 90), -90);
});
