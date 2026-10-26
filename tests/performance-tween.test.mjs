import test from 'node:test';
import assert from 'node:assert/strict';
import { neutralPerformance } from '../lib/performance.mjs';
let tweenPerformance;
try { ({tweenPerformance}=await import('../lib/performance-tween.mjs')); } catch {}
test('Anime.js interpolates rig motion without animating the image source',()=>{
 assert.equal(typeof tweenPerformance,'function');
 const rig=neutralPerformance();let rendered=0;
 const animation=tweenPerformance(rig,{...rig,armX:8,lean:.4,src:'/new.png'},()=>{rendered++},{autoplay:false,duration:100});
 animation.seek(50);
 assert.ok(rig.armX>3.9&&rig.armX<4.1);assert.ok(rig.lean>.19&&rig.lean<.21);
 assert.equal(rig.src,null);
 animation.seek(100);assert.equal(rig.armX,8);assert.ok(rendered>0);
 animation.revert();
});
