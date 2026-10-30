const poses = ["0% 0%", "100% 0%", "0% 100%", "100% 100%"];
const gestures = [
  [
    [1, 220],
    [2, 150],
    [3, 180],
    [0, 220],
  ],
  [
    [1, 240],
    [2, 130],
    [3, 120],
    [2, 150],
    [3, 200],
    [0, 220],
  ],
  [
    [1, 480],
    [3, 260],
    [0, 240],
  ],
];
/** Hand-drawn anticipation, contact and release, separated by varied thinking pauses. */
export function startHandPerformance(
  element,
  {
    random = Math.random,
    schedule = setTimeout,
    cancel = clearTimeout,
    onAction = () => {},
  } = {},
) {
  let disposed = false,
    timer,
    previous = 2;
  function paint(frame) {
    element.style.backgroundPosition = poses[frame];
    onAction(frame === 2);
  }
  function rest() {
    if (disposed) return;
    paint(0);
    timer = schedule(play, 2600 + random() * 3000);
  }
  function play() {
    if (disposed) return;
    previous =
      (previous + 1 + Math.floor(random() * (gestures.length - 1))) %
      gestures.length;
    const steps = gestures[previous];
    function step(index) {
      if (disposed) return;
      if (index === steps.length) {
        rest();
        return;
      }
      const [frame, hold] = steps[index];
      paint(frame);
      timer = schedule(() => step(index + 1), hold);
    }
    step(0);
  }
  rest();
  return () => {
    disposed = true;
    cancel(timer);
    paint(0);
  };
}
