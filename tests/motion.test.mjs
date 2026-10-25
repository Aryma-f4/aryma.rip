import test from 'node:test';
import assert from 'node:assert/strict';
let helpers={};
try { helpers=await import('../lib/motion.mjs'); } catch {}
test('silent, paused, and reduced-motion characters keep their mouth closed',()=>{
 assert.equal(typeof helpers.mouthAmount,'function');
 assert.equal(helpers.mouthAmount(0,0,true,false),0);
 assert.equal(helpers.mouthAmount(.8,.8,false,false),0);
 assert.equal(helpers.mouthAmount(.8,.8,true,true),0);
});
test('singing movement is bounded and requires vocal-band prominence',()=>{
 assert.equal(typeof helpers.mouthAmount,'function');
 assert.equal(helpers.mouthAmount(.8,.05,true,false),0);
 assert.ok(helpers.mouthAmount(.8,.7,true,false)>0);
 assert.ok(helpers.mouthAmount(9,9,true,false)<=1);
});
test('reduced motion removes particles and small screens use fewer',()=>{
 assert.equal(typeof helpers.particleCount,'function');
 assert.equal(helpers.particleCount(1400,true),0);
 assert.ok(helpers.particleCount(390,false)<helpers.particleCount(1400,false));
});
test('subtitle lookup uses playback time and clears in instrumental gaps and on loop',()=>{
 assert.equal(typeof helpers.cueAt,'function');
 const cues=[{start:12,end:15,text:'First line'},{start:19,end:24,text:'Second line'}];
 assert.equal(helpers.cueAt(0,cues),null);
 assert.equal(helpers.cueAt(12,cues)?.text,'First line');
 assert.equal(helpers.cueAt(14.99,cues)?.text,'First line');
 assert.equal(helpers.cueAt(15,cues),null);
 assert.equal(helpers.cueAt(20,cues)?.text,'Second line');
 assert.equal(helpers.cueAt(25,cues),null);
 assert.equal(helpers.cueAt(0,cues),null);
});
test('character moves from resting to singing to a quiet crying aftermath',()=>{
 assert.equal(typeof helpers.characterPose,'function');
 const passages=[{start:108.5,end:148.52},{start:149.78,end:181.1}];
 assert.equal(helpers.characterPose(0,false,passages,false),'resting');
 assert.equal(helpers.characterPose(110,true,passages,false),'singing');
 assert.equal(helpers.characterPose(148.8,true,passages,false),'aftermath');
 assert.equal(helpers.characterPose(160,true,passages,false),'singing');
 assert.equal(helpers.characterPose(181.1,true,passages,false),'aftermath');
 assert.equal(helpers.characterPose(183,false,passages,false),'aftermath');
});
test('aftermath lingers through a new instrumental loop and resets on explicit restart',()=>{
 assert.equal(typeof helpers.characterPose,'function');
 const passages=[{start:108.5,end:148.52},{start:149.78,end:181.1}];
 assert.equal(helpers.characterPose(0,true,passages,true),'aftermath');
 assert.equal(helpers.characterPose(70,false,passages,true),'aftermath');
 assert.equal(helpers.characterPose(110,true,passages,true),'singing');
 assert.equal(helpers.characterPose(0,false,passages,false),'resting');
});
