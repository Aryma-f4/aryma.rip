import test from 'node:test';
import assert from 'node:assert/strict';
let lightingFor;
try{({lightingFor}=await import('../lib/character-lighting.mjs'));}catch{}
test('transition and singing skin midtones match the resting reference under the same light',()=>{
 assert.equal(typeof lightingFor,'function');
 for(const [file,sample] of [['calamitas-arm-prepare.png',[252,212,192]],['calamitas-arm-open.png',[252,213,191]],['calamitas-singing-v2.png',[250,205,182]],['calamitas-aftermath-v2.png',[243,200,182]]]){
  const {gains}=lightingFor('/assets/'+file);
  const lit=sample.map((value,i)=>Math.round(value*gains[i]));
  assert.deepEqual(lit,[245,201,182]);
  assert.ok(gains.every(g=>g>.93&&g<1.03));
 }
 assert.deepEqual(lightingFor('/assets/calamitas-v2.png').gains,[1,1,1]);
});
