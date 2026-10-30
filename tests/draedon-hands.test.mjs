import test from "node:test";
import assert from "node:assert/strict";
import { startHandPerformance } from "../lib/draedon-hands.mjs";
test("hand performance anticipates, taps and releases, with safe disposal during a gesture", () => {
  const frames = [],
    actions = [],
    pending = new Map();
  let id = 0;
  const element = {
    style: {
      set backgroundPosition(value) {
        frames.push(value);
      },
    },
  };
  const stop = startHandPerformance(element, {
    random: () => 0,
    schedule: (fn, delay) => {
      pending.set(++id, { fn, delay });
      return id;
    },
    cancel: (key) => pending.delete(key),
    onAction: (value) => actions.push(value),
  });
  assert.deepEqual(frames, ["0% 0%"]);
  assert.equal(pending.get(1).delay, 2600);
  function tick() {
    const [key, t] = pending.entries().next().value;
    pending.delete(key);
    t.fn();
  }
  for (let i = 0; i < 5; i++) tick();
  assert.deepEqual(frames.slice(1, 5), [
    "100% 0%",
    "0% 100%",
    "100% 100%",
    "0% 0%",
  ]);
  assert.ok(actions.includes(true));
  assert.equal(actions.at(-1), false);
  tick();
  const stale = [...pending.values()][0].fn;
  stop();
  const before = frames.length;
  stale();
  assert.equal(frames.length, before);
  assert.equal(pending.size, 0);
  assert.equal(frames.at(-1), "0% 0%");
});
