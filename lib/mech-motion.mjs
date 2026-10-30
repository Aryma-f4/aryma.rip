const profiles = {
  Thanatos: [
    [-6, 1, -0.2],
    [4, -2, 0.15],
    [0, 0, 0],
    [7, 1, -0.1],
    [-2, -1, 0.1],
  ],
  Ares: [
    [0, -1, 0],
    [-1, 1, -0.4],
    [1, 0, 0.3],
    [0, 2, 0],
    [0, 0, 0],
  ],
  Artemis: [
    [-4, -3, -1],
    [3, -1, 0.6],
    [1, 3, -0.3],
    [-2, 0, 0.8],
    [0, 0, 0],
  ],
  Apollo: [
    [3, 2, 0.7],
    [-2, -3, -0.5],
    [-4, 1, 0.4],
    [2, -1, -0.8],
    [0, 0, 0],
  ],
};
/** Schedule bounded, independently varied tracking gestures; never loop one tween. */
export function startMechMotion(
  nodes,
  animate,
  { random = Math.random, schedule = setTimeout, cancel = clearTimeout } = {},
) {
  let disposed = false;
  const records = Array.from(nodes, (node) => ({
    node,
    phase: 4,
    timer: null,
    animation: null,
  }));
  function next(record) {
    if (disposed) return;
    const states = profiles[record.node.dataset.mech] || profiles.Ares;
    record.phase =
      (record.phase + 1 + Math.floor(random() * (states.length - 1))) %
      states.length;
    const [x, y, rotate] = states[record.phase];
    record.animation = animate(record.node, {
      x,
      y,
      rotate,
      duration: 2800 + random() * 3200,
      ease: "inOutSine",
      onComplete() {
        if (!disposed)
          record.timer = schedule(() => next(record), 700 + random() * 2400);
      },
    });
  }
  records.forEach((record, index) => {
    record.timer = schedule(
      () => next(record),
      250 + index * 650 + random() * 900,
    );
  });
  return () => {
    disposed = true;
    records.forEach((record) => {
      cancel(record.timer);
      record.animation?.revert();
    });
  };
}
