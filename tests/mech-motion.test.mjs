import test from "node:test";
import assert from "node:assert/strict";
import { startMechMotion } from "../lib/mech-motion.mjs";
test("each mech schedules bounded gestures independently and cleanup rejects stale completions", () => {
  const timers = new Map(),
    calls = [];
  let id = 0,
    reverts = 0;
  const nodes = ["Thanatos", "Ares", "Artemis", "Apollo"].map((mech) => ({
    dataset: { mech },
  }));
  const stop = startMechMotion(
    nodes,
    (node, options) => {
      calls.push({ node, options });
      return {
        revert() {
          reverts++;
        },
      };
    },
    {
      random: () => 0.5,
      schedule: (fn, delay) => {
        timers.set(++id, { fn, delay });
        return id;
      },
      cancel: (key) => timers.delete(key),
    },
  );
  assert.equal(timers.size, 4);
  assert.equal(new Set([...timers.values()].map((t) => t.delay)).size, 4);
  const initial = [...timers.values()];
  timers.clear();
  initial.forEach((t) => t.fn());
  assert.equal(calls.length, 4);
  assert.equal(
    new Set(
      calls.map((c) => `${c.options.x},${c.options.y},${c.options.rotate}`),
    ).size,
    4,
  );
  calls.forEach(({ options }) => {
    assert.ok(Math.abs(options.x) <= 7);
    assert.ok(Math.abs(options.y) <= 3);
    assert.ok(Math.abs(options.rotate) <= 1);
    assert.equal(options.loop, undefined);
    options.onComplete();
  });
  assert.equal(timers.size, 4);
  const late = [...timers.values()];
  stop();
  assert.equal(timers.size, 0);
  assert.equal(reverts, 4);
  late.forEach((t) => t.fn());
  calls.forEach((c) => c.options.onComplete());
  assert.equal(calls.length, 4);
  assert.equal(timers.size, 0);
});
