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
export const TRANSITION_SECONDS=1.6; // 24 held frames at 15 fps in each direction.
function mergedPassages(passages) {
  const merged=[];
  for(const passage of passages) {
    const previous=merged.at(-1);
    if(previous&&passage.start-previous.end<=TRANSITION_SECONDS*2)previous.end=passage.end;
    else merged.push({...passage});
  }
  return merged;
}
export function characterPose(time, playing, passages, completedPerformance) {
  const ranges=mergedPassages(passages);
  if(ranges.some(({start,end})=>time>=start&&time<end))return 'singing';
  if(transitionAt(time,passages))return 'transition';
  return completedPerformance||ranges.some(({end})=>time>=end+TRANSITION_SECONDS)?'aftermath':'resting';
}
export function transitionAt(time,passages) {
  for(const {start,end} of mergedPassages(passages)) {
    if(time>=start-TRANSITION_SECONDS&&time<start)return {direction:'raising',level:(time-start+TRANSITION_SECONDS)/TRANSITION_SECONDS};
    if(time>=end&&time<end+TRANSITION_SECONDS)return {direction:'lowering',level:1-(time-end)/TRANSITION_SECONDS};
  }
  return null;
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
  return transitionAt(time,passages)?.level??0;
}
