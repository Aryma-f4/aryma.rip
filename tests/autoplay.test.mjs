import test from 'node:test';
import assert from 'node:assert/strict';
let startAutoplay;
try { ({ startAutoplay } = await import('../lib/autoplay.mjs')); } catch {}
const settle = () => new Promise(resolve => setImmediate(resolve));
class AudioFixture extends EventTarget {
  allowed = false;
  calls = 0;
  paused = true;
  async play() {
    this.calls++;
    if (!this.allowed) throw new DOMException('Gesture required', 'NotAllowedError');
    this.paused = false;
    this.dispatchEvent(new Event('play'));
  }
  pause() { this.paused = true; }
}
test('attempts autoplay on load and recovers on the first interaction', async()=>{
  assert.equal(typeof startAutoplay,'function');
  const audio = new AudioFixture();
  const page = new EventTarget();
  let blocked=0;
  const dispose = startAutoplay(audio,page,{onBlocked:()=>blocked++});
  await settle();
  assert.equal(audio.calls,1);
  assert.equal(blocked,1);
  audio.allowed=true;
  page.dispatchEvent(new Event('pointerdown'));
  await settle();
  assert.equal(audio.calls,2);
  assert.equal(audio.paused,false);
  dispose();
});
test('does not undo an explicit pause after successful playback', async()=>{
  assert.equal(typeof startAutoplay,'function');
  const audio = new AudioFixture(); audio.allowed=true;
  const page = new EventTarget();
  const dispose = startAutoplay(audio,page);
  await settle();
  audio.pause();
  page.dispatchEvent(new Event('pointerdown'));
  page.dispatchEvent(new Event('keydown'));
  await settle();
  assert.equal(audio.calls,1);
  assert.equal(audio.paused,true);
  dispose();
});
test('manual playback disarms fallback and cleanup removes blocked handlers',async()=>{
  assert.equal(typeof startAutoplay,'function');
  const audio = new AudioFixture(); const page=new EventTarget();
  let dispose=startAutoplay(audio,page);
  await settle();
  audio.allowed=true;
  await audio.play();
  audio.pause();
  page.dispatchEvent(new Event('pointerdown'));
  await settle();
  assert.equal(audio.calls,2);
  dispose();
  audio.allowed=false;
  dispose=startAutoplay(audio,page);
  await settle();
  dispose();
  const previous=audio.calls;
  audio.allowed=true;
  page.dispatchEvent(new Event('pointerdown'));
  await settle();
  assert.equal(audio.calls,previous);
});
test('a late blocked attempt cannot re-arm autoplay after manual playback', async()=>{
  const audio=new AudioFixture(); const page=new EventTarget();
  let rejectFirst;
  const normalPlay=audio.play.bind(audio);
  audio.play=()=>{
    if(audio.calls===0){ audio.calls++; return new Promise((_,reject)=>{rejectFirst=reject;}); }
    return normalPlay();
  };
  const dispose=startAutoplay(audio,page);
  audio.allowed=true;
  await audio.play();
  audio.pause();
  rejectFirst(new DOMException('Canceled initial request','AbortError'));
  await settle();
  page.dispatchEvent(new Event('pointerdown'));
  await settle();
  assert.equal(audio.calls,2);
  assert.equal(audio.paused,true);
  dispose();
});
