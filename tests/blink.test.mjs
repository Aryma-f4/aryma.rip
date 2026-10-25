import test from 'node:test';
import assert from 'node:assert/strict';
import { blinkClosure, blinkDelay } from '../lib/blink.mjs';
test('blink closes quickly, briefly holds, then softly opens',()=>{
 assert.equal(blinkClosure(-1),0);assert.equal(blinkClosure(0),0);
 assert.ok(blinkClosure(35)>0&&blinkClosure(35)<1);
 assert.equal(blinkClosure(70),1);assert.equal(blinkClosure(95),1);
 assert.ok(blinkClosure(150)>0&&blinkClosure(150)<1);
 assert.equal(blinkClosure(225),0);assert.equal(blinkClosure(300),0);
});
test('quiet blink intervals vary within restrained limits',()=>{
 assert.equal(blinkDelay(0),3800);assert.equal(blinkDelay(1),8200);
 assert.ok(blinkDelay(.4)>3800&&blinkDelay(.4)<8200);
});
