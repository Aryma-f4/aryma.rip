import test from 'node:test';
import assert from 'node:assert/strict';
import { applyCharacterPose } from '../lib/pose-render.mjs';
test('rapid singing, aftermath, pause and seek changes show exactly one pose',()=>{
 const states=['resting','transition','singing','aftermath'].map(pose=>({dataset:{characterPose:pose},hidden:false}));
 const classes=new Set();
 const character={dataset:{},querySelectorAll:()=>states,classList:{toggle(name,on){on?classes.add(name):classes.delete(name)}}};
 for(const pose of ['resting','transition','singing','transition','aftermath','singing','resting','aftermath']){
  applyCharacterPose(character,pose);
  assert.deepEqual(states.filter(state=>!state.hidden).map(state=>state.dataset.characterPose),[pose]);
  assert.equal(character.dataset.pose,pose);
  assert.equal(classes.has('is-singing'),pose==='singing');
  assert.equal(classes.has('is-aftermath'),pose==='aftermath');
 }
});
