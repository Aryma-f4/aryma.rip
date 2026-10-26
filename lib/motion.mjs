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
  let finished=false;
  for(let i=0;i<passages.length;i++) {
    const start=passages[i].start;
    let end=passages[i].end;
    // A short breath between vocal passages keeps the arm raised.
    while(i+1<passages.length && passages[i+1].start-end<=2) end=passages[++i].end;
    if(time>=start && time<end) return 'singing';
    if(time>=start-.6 && time<start) return 'transition';
    if(time>=end && time<end+.5) return 'transition';
    if(time>=end+.5) finished=true;
  }
  return completedPerformance || finished ? 'aftermath' : 'resting';
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

export function transitionLevelAt(time,passages) {
  for(let i=0;i<passages.length;i++) {
    const start=passages[i].start;let end=passages[i].end;
    while(i+1<passages.length&&passages[i+1].start-end<=2)end=passages[++i].end;
    if(time>=start-.6&&time<start)return (time-start+.6)/.6;
    if(time>=end&&time<end+.5)return 1-(time-end)/.5;
  }
  return 0;
}
