const ease = x => x*x*(3-2*x);
export function blinkClosure(ms) {
  if (ms <= 0 || ms >= 225) return 0;
  if (ms < 70) return ease(ms/70);
  if (ms <= 95) return 1;
  return 1-ease((ms-95)/130);
}
export function blinkDelay(random) { return 3800+Math.max(0,Math.min(1,random))*4400; }
