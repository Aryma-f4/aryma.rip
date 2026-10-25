import test from 'node:test';
import assert from 'node:assert/strict';
import { linkAmbience } from '../lib/ambience.mjs';
class Sound extends EventTarget {
  paused = true; plays = 0;
  play() { this.paused=false; this.plays++; return Promise.resolve(); }
  pause() { this.paused=true; }
}
test('rain starts when native autoplay was already playing before hydration',()=>{
  const music=new Sound(),rain=new Sound(); music.paused=false;
  const link=linkAmbience(music,rain);
  assert.equal(rain.paused,false);
  link.dispose(); assert.equal(rain.paused,true);
});
test('rain follows pause, independent mute, and cleanup',()=>{
  const music=new Sound(),rain=new Sound(),link=linkAmbience(music,rain);
  assert.equal(rain.paused,true);
  music.paused=false;music.dispatchEvent(new Event('play'));assert.equal(rain.paused,false);
  link.setEnabled(false);assert.equal(rain.paused,true);
  music.dispatchEvent(new Event('play'));assert.equal(rain.paused,true);
  link.setEnabled(true);assert.equal(rain.paused,false);
  music.paused=true;music.dispatchEvent(new Event('pause'));assert.equal(rain.paused,true);
  link.dispose();const plays=rain.plays;
  music.paused=false;music.dispatchEvent(new Event('play'));assert.equal(rain.plays,plays);
});
