export function mouthAmount(energy, vocalProminence, playing, reducedMotion) {
  if (!playing || reducedMotion || energy < .045 || vocalProminence < .22) return 0;
  return Math.min(1, Math.max(0, (energy - .045) * 2.8));
}
export function particleCount(width, reducedMotion) {
  return reducedMotion ? 0 : Math.min(160, Math.max(45, Math.floor(width / 10)));
}
export function cueAt(time, cues) {
  return cues.find(cue => time >= cue.start && time < cue.end) ?? null;
}
export function characterPose(time, playing, passages, completedPerformance) {
  if (playing && cueAt(time, passages)) return 'singing';
  if (completedPerformance || passages.some(passage => time >= passage.end)) return 'aftermath';
  return 'resting';
}

export function interpolateEnvelope(samples, step, time) {
  if (time < 0 || step <= 0) return 0;
  const position = time / step;
  const index = Math.floor(position);
  if (index >= samples.length) return 0;
  const blend = position - index;
  return (samples[index] ?? 0) * (1 - blend) + (samples[index + 1] ?? 0) * blend;
}
export function smoothMouth(current, target, dt) {
  const speed = target > current ? 19 : 12;
  return current + (target - current) * (1 - Math.exp(-speed * Math.max(0, dt)));
}
