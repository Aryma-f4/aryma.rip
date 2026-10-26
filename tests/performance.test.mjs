import test from 'node:test';
import assert from 'node:assert/strict';
import { performanceAt, createPerformanceSampler, neutralPerformance } from '../lib/performance.mjs';

test('instrumental and aftermath keep the same drawing with no body or cloth motion',()=>{
 for(const pose of ['resting','aftermath']) {
  const first=performanceAt({time:0,pose,playing:true,vocalActive:false});
  for(let time=0;time<20;time+=.13) {
   const p=performanceAt({time,pose,playing:true,vocalActive:false});
   assert.deepEqual(p,first);
   assert.equal(p.lean,0);assert.equal(p.stretch,1);
   assert.equal(p.armX,0);assert.equal(p.armY,0);assert.equal(p.cloth,0);
  }
 }
});
test('singing cycles through 48 distinct bounded poses at 15 fps and loops after 3.2 seconds',()=>{
 const frames=Array.from({length:48},(_,i)=>performanceAt({time:i/15,pose:'singing',playing:true,vocalActive:true}));
 assert.equal(new Set(frames.map(p=>p.frame)).size,48);
 assert.equal(new Set(frames.map(p=>`${p.armX},${p.armY},${p.lean}`)).size,48);
 assert.equal(new Set(frames.map(p=>p.src)).size,1);
 assert.deepEqual(performanceAt({time:3.2,pose:'singing',playing:true,vocalActive:true}),frames[0]);
 for(const p of frames) {
  assert.ok(Math.abs(p.lean)<.8);assert.equal(p.stretch,1);
  assert.ok(Math.abs(p.armX)<=10);assert.ok(Math.abs(p.armY)<=8);assert.ok(Math.abs(p.cloth)<=3);
 }
 const last=frames.at(-1),first=frames[0];
 assert.ok(Math.abs(last.armX-first.armX)<2);assert.ok(Math.abs(last.armY-first.armY)<2);
});
test('pause, instrumental gaps and reduced motion stop the singing loop immediately',()=>{
 for(const args of [{playing:false,vocalActive:true},{playing:true,vocalActive:false},{playing:true,vocalActive:true,reducedMotion:true}]) {
  const p=performanceAt({time:2,pose:'singing',...args});
  assert.equal(p.armX,0);assert.equal(p.armY,0);assert.equal(p.cloth,0);assert.equal(p.lean,0);assert.equal(p.frame,null);
 }
 assert.deepEqual(performanceAt({time:8,pose:'singing',playing:true,vocalActive:true,reducedMotion:true}),neutralPerformance());
});
test('body holds each frame for 1/15 second, independent of voice energy, and pause bypasses holds',()=>{
 const sample=createPerformanceSampler();
 const input={pose:'singing',playing:true,vocalActive:true};
 const a=sample({...input,time:2,voice:0});
 assert.equal(a,sample({...input,time:2.06,voice:1}));
 assert.notEqual(a,sample({...input,time:2.07}));
 const paused=sample({...input,time:2.071,playing:false});assert.equal(paused.frame,null);assert.equal(paused.lean,0);
 const resumed=sample({...input,time:2.071});assert.notEqual(resumed.frame,null);
});
test('pre/post singing retain their drawn intermediate arm positions',()=>{
 assert.notEqual(performanceAt({time:0,pose:'transition',transitionLevel:.2}).src,performanceAt({time:0,pose:'transition',transitionLevel:.8}).src);
});
