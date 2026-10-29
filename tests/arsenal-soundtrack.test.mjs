import test from "node:test";
import assert from "node:assert/strict";
let connectSoundtrack;
try {
  ({ connectSoundtrack } = await import("../lib/arsenal-soundtrack.mjs"));
} catch {}
const settle = () => new Promise((resolve) => setImmediate(resolve));
class Audio extends EventTarget {
  paused = true;
  allowed = false;
  volume = 1;
  duration = 170;
  currentTime = 0;
  async play() {
    if (!this.allowed) throw new DOMException("Gesture", "NotAllowedError");
    this.paused = false;
    this.dispatchEvent(new Event("play"));
  }
  pause() {
    this.paused = true;
    this.dispatchEvent(new Event("pause"));
  }
}
test("Arsenal soundtrack recovers blocked autoplay and keeps an explicit pause paused", async () => {
  assert.equal(typeof connectSoundtrack, "function");
  const audio = new Audio(),
    page = new EventTarget();
  let state;
  const player = connectSoundtrack(audio, page, {
    onState: (value) => (state = value),
  });
  await settle();
  assert.equal(state.blocked, true);
  assert.equal(audio.volume, 0.22);
  audio.allowed = true;
  await player.toggle();
  assert.equal(state.playing, true);
  await player.toggle();
  assert.equal(state.playing, false);
  page.dispatchEvent(new Event("pointerdown"));
  await settle();
  assert.equal(audio.paused, true);
  player.dispose();
});
test("volume and position are bounded; disposal stops audio and removes state listeners", async () => {
  assert.equal(typeof connectSoundtrack, "function");
  const audio = new Audio(),
    page = new EventTarget();
  audio.allowed = true;
  let updates = 0,
    state;
  const player = connectSoundtrack(audio, page, {
    onState: (value) => {
      state = value;
      updates++;
    },
  });
  await settle();
  player.setVolume(3);
  assert.equal(audio.volume, 1);
  player.setVolume(-1);
  assert.equal(audio.volume, 0);
  player.seek(300);
  assert.equal(audio.currentTime, 170);
  player.seek(-5);
  assert.equal(audio.currentTime, 0);
  player.seek(NaN);
  assert.equal(audio.currentTime, 0);
  player.dispose();
  const before = updates;
  assert.equal(audio.paused, true);
  audio.dispatchEvent(new Event("timeupdate"));
  page.dispatchEvent(new Event("pointerdown"));
  await settle();
  assert.equal(updates, before);
  assert.equal(state.duration, 170);
});
