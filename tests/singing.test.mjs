import test from 'node:test';
import assert from 'node:assert/strict';
import { interpolateEnvelope, smoothMouth } from '../lib/motion.mjs';
test('vocal samples interpolate between timestamps and become silent outside the recording', () => {
  assert.equal(interpolateEnvelope([0,1,0], .05, .025), .5);
  assert.equal(interpolateEnvelope([0,1,0], .05, -1), 0);
  assert.equal(interpolateEnvelope([0,1,0], .05, 10), 0);
});
test('mouth attack and release follow elapsed time at different frame rates', () => {
  const simulate = (hz,target,start) => { let x=start; for(let i=0;i<hz;i++) x=smoothMouth(x,target,1/hz); return x; };
  assert.ok(Math.abs(simulate(30,.8,0)-simulate(144,.8,0)) < .001);
  assert.ok(Math.abs(simulate(30,0,.8)-simulate(144,0,.8)) < .001);
  assert.equal(smoothMouth(0,1,0),0);
  assert.ok(smoothMouth(0,1,.016)>0);
});
