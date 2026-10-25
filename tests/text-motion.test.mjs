import test from 'node:test';
import assert from 'node:assert/strict';
import { initializeTextMotion } from '../lib/text-motion.mjs';
function fixture(reduced=false) {
 const motion=new EventTarget();motion.matches=reduced;
 const words=[{},{}],element={hasAttribute:name=>name==='data-ash-title',querySelectorAll:()=>words};
 const root={querySelectorAll:()=>[element]};
 const instances=[],observers=[];
 const animate=(targets,options)=>{const item={targets,options,plays:0,reverts:0,play(){this.plays++},revert(){this.reverts++}};instances.push(item);return item;};
 class Observer { constructor(fn){this.fn=fn;this.disconnected=false;this.unobserved=[];observers.push(this)}observe(){}unobserve(x){this.unobserved.push(x)}disconnect(){this.disconnected=true} }
 return {root,motion,instances,observers,element,options:{animate,stagger:x=>x,motion,Observer}};
}
test('text animates once on entry and active instances revert on cleanup',()=>{
 const f=fixture(),stop=initializeTextMotion(f.root,f.options);
 assert.equal(f.instances.length,1);assert.equal(f.instances[0].plays,0);
 f.observers[0].fn([{isIntersecting:true,target:f.element}]);
 assert.equal(f.instances[0].plays,1);assert.deepEqual(f.observers[0].unobserved,[f.element]);
 stop();assert.equal(f.instances[0].reverts,1);assert.equal(f.observers[0].disconnected,true);
});
test('reduced motion leaves server-rendered text untouched and responds to preference changes',()=>{
 const f=fixture(true),stop=initializeTextMotion(f.root,f.options);
 assert.equal(f.instances.length,0);
 f.motion.matches=false;f.motion.dispatchEvent(new Event('change'));assert.equal(f.instances.length,1);
 f.motion.matches=true;f.motion.dispatchEvent(new Event('change'));assert.equal(f.instances[0].reverts,1);
 stop();f.motion.matches=false;f.motion.dispatchEvent(new Event('change'));assert.equal(f.instances.length,1);
});
