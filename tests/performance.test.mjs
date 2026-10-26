import test from 'node:test';
import assert from 'node:assert/strict';
import { performanceAt, createPerformanceSampler, neutralPerformance } from '../lib/performance.mjs';

test('idle moves gently on one drawing without breathing scale or artwork swaps',()=>{
 const frames=Array.from({length:80},(_,i)=>performanceAt({time:i/10,pose:'resting'}));
 assert.equal(new Set(frames.map(p=>p.src)).size,1);
 assert.ok(new Set(frames.map(p=>p.lean)).size>20);
 for(const p of frames){assert.equal(p.stretch,1);assert.ok(Math.abs(p.lean)<=.16);assert.ok(Math.abs(p.armY)<=2);}
 assert.deepEqual(performanceAt({time:2,pose:'resting',reducedMotion:true}),neutralPerformance());
});
test('aftermath stays settled on its existing drawing',()=>{
 assert.deepEqual(performanceAt({time:0,pose:'aftermath'}),performanceAt({time:8,pose:'aftermath'}));
});
test('singing cycles through 192 distinct bounded poses at 30 fps and loops after 6.4 seconds',()=>{
 const frames=Array.from({length:192},(_,i)=>performanceAt({time:i/30,pose:'singing',playing:true,vocalActive:true}));
 assert.equal(new Set(frames.map(p=>p.frame)).size,192);
 assert.equal(new Set(frames.map(p=>`${p.armX},${p.armY},${p.lean}`)).size,192);
 assert.equal(new Set(frames.map(p=>p.src)).size,1);
 assert.deepEqual(performanceAt({time:6.4,pose:'singing',playing:true,vocalActive:true}),frames[0]);
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
test('body holds each frame for 1/30 second, independent of voice energy, and pause bypasses holds',()=>{
 const sample=createPerformanceSampler();
 const input={pose:'singing',playing:true,vocalActive:true};
 const a=sample({...input,time:2,voice:0});
 assert.equal(a,sample({...input,time:2.03,voice:1}));
 assert.notEqual(a,sample({...input,time:2.04}));
 const paused=sample({...input,time:2.041,playing:false});assert.equal(paused.frame,null);assert.equal(paused.lean,0);
 const resumed=sample({...input,time:2.041});assert.notEqual(resumed.frame,null);
});
test('pre/post singing retain their drawn intermediate arm positions',()=>{
 assert.notEqual(performanceAt({time:0,pose:'transition',transitionLevel:.2}).src,performanceAt({time:0,pose:'transition',transitionLevel:.8}).src);
});

// A two-drawing transition used to jump directly between silhouettes.
test('raising and lowering each traverse 48 poses with twelve registered drawings',()=>{
 for(const direction of ['raising','lowering']) {
  const frames=Array.from({length:48},(_,i)=>performanceAt({time:i/30,pose:'transition',transitionLevel:direction==='raising'?i/47:1-i/47,transitionDirection:direction}));
  assert.equal(new Set(frames.map(p=>p.frame)).size,48);
  assert.equal(new Set(frames.map(p=>p.src)).size,12);
  assert.ok(frames.every(p=>Math.abs(p.lean)<.8&&Math.abs(p.armX)<=10&&Math.abs(p.armY)<=8));
  if(direction==='raising')assert.ok(frames.at(-1).src.includes('reach'));
  else assert.ok(frames.at(-1).src.includes('aftermath'));
 }
});
test('seeking across transition stages inside one clock frame selects the correct drawing',()=>{
 const sample=createPerformanceSampler();
 const a=sample({time:2,pose:'transition',transitionLevel:.1,transitionDirection:'raising'});
 const b=sample({time:2,pose:'transition',transitionLevel:.25,transitionDirection:'raising'});
 assert.notEqual(a.src,b.src);
 const c=sample({time:2,pose:'transition',transitionLevel:0,transitionDirection:'lowering'});
 assert.ok(c.src.includes('aftermath'));
});

test('transition follow-through has no four-frame sawtooth reset while switching cels',()=>{
 for(const direction of ['raising','lowering']) {
  const frames=Array.from({length:48},(_,i)=>performanceAt({time:i/30,pose:'transition',transitionLevel:direction==='raising'?i/47:1-i/47,transitionDirection:direction}));
  for(let i=1;i<frames.length;i++) {
   assert.ok(Math.abs(frames[i].armX-frames[i-1].armX)<.4);
   assert.ok(Math.abs(frames[i].armY-frames[i-1].armY)<.4);
  }
 }
});
