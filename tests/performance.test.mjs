import test from 'node:test';
import assert from 'node:assert/strict';
import { performanceAt, createPerformanceSampler, neutralPerformance } from '../lib/performance.mjs';
test('instrumental idle alternates actual drawings even with silent audio',()=>{
 const frames=new Set(Array.from({length:30},(_,i)=>performanceAt({time:i/3,pose:'resting',voice:0}).src));
 assert.equal(frames.size,2);
});
test('singing accents and pre/post singing use separate drawn arm frames',()=>{
 const quiet=performanceAt({time:3,pose:'singing',voice:0,phrase:.05});
 const accent=performanceAt({time:3,pose:'singing',voice:1,phrase:.5});
 assert.notEqual(quiet.src,accent.src);
 assert.equal(accent.src,performanceAt({time:3,pose:'singing',voice:0,phrase:.5}).src);
 assert.notEqual(performanceAt({time:0,pose:'transition',transitionLevel:.2}).src,performanceAt({time:0,pose:'transition',transitionLevel:.8}).src);
});
test('all frames retain bounded seat motion and reduced motion is neutral',()=>{
 for(const pose of ['resting','transition','singing','aftermath'])for(let time=0;time<180;time+=.2){
  const p=performanceAt({time,pose,voice:1,phrase:.5});
  assert.ok(Math.abs(p.lean)<.8);assert.ok(p.stretch>=.995&&p.stretch<=1.006);
  assert.ok(p.src.startsWith('/assets/calamitas'));
 }
 assert.deepEqual(performanceAt({time:8,pose:'singing',voice:1,reducedMotion:true}),neutralPerformance());
});
test('body holds drawn frames at 12 fps while mouth energy can change independently',()=>{
 const sample=createPerformanceSampler();
 const a=sample({time:2,pose:'singing',voice:0,phrase:.2});
 const b=sample({time:2.04,pose:'singing',voice:1,phrase:.3});assert.equal(a,b);
 const c=sample({time:2.09,pose:'singing',voice:1,phrase:.5});assert.notEqual(c,b);
 const d=sample({time:2.091,pose:'transition',voice:0,transitionLevel:.2});assert.notEqual(d,c);
});
