export const PERFORMANCE_FPS=30;
export const performanceFrames={
  resting:['/assets/calamitas-v2.png'],
  transition:['/assets/calamitas-arm-prepare.png','/assets/calamitas-arm-release.png','/assets/calamitas-arm-gather.png','/assets/calamitas-arm-low.png','/assets/calamitas-arm-open.png','/assets/calamitas-arm-half.png','/assets/calamitas-arm-lift.png','/assets/calamitas-arm-rise.png','/assets/calamitas-arm-extend.png','/assets/calamitas-arm-high.png','/assets/calamitas-arm-unfurl.png','/assets/calamitas-arm-reach.png'],
  settling:['/assets/calamitas-arm-settle.png'],
  singing:['/assets/calamitas-singing-v2.png'],
  aftermath:['/assets/calamitas-aftermath-v2.png'],
};
export const neutralPerformance=()=>({lean:0,stretch:1,armX:0,armY:0,cloth:0,frame:null,src:null});
const round=value=>Math.round(value*1000)/1000;
// A registered 192-pose rig cycle with Anime.js interpolation between samples.
// Local arm displacement leaves the face, seated legs and matching boots intact.
export const singingCycle=Object.freeze(Array.from({length:192},(_,frame)=>{
  const phase=frame/192*Math.PI*2;
  return Object.freeze({
    ...neutralPerformance(),src:performanceFrames.singing[0],frame,
    armX:round(8*Math.sin(phase)+1.2*Math.sin(phase*2)),
    armY:round(6*(Math.cos(phase)-.2*Math.cos(phase*2))),
    lean:round(.42*Math.sin(phase-.25)+.09*Math.sin(phase*2)),
    cloth:round(2.4*Math.sin(phase-.65)),
  });
}));
export function performanceAt({time,pose,playing=false,vocalActive=false,transitionLevel=0,transitionDirection='raising',reducedMotion=false}) {
  if(reducedMotion) return neutralPerformance();
  if(pose==='resting') {
    const frame=Math.floor(Math.max(0,time)*PERFORMANCE_FPS+1e-7)%240;
    const phase=frame/240*Math.PI*2;
    return {...neutralPerformance(),src:performanceFrames.resting[0],frame,
      lean:round(.15*Math.sin(phase)),armX:round(2*Math.sin(phase)),armY:round(2*Math.cos(phase))};
  }
  if(pose==='singing'&&playing&&vocalActive) {
    const frame=Math.floor(Math.max(0,time)*PERFORMANCE_FPS+1e-7)%singingCycle.length;
    return singingCycle[frame];
  }
  if(pose==='transition') {
    const progress=Math.max(0,Math.min(1,transitionDirection==='lowering'?1-transitionLevel:transitionLevel));
    const frame=Math.min(47,Math.floor(progress*48+1e-7));
    const drawings=transitionDirection==='lowering'
      ? [...performanceFrames.transition.slice(2).reverse(),performanceFrames.settling[0],performanceFrames.aftermath[0]]
      : performanceFrames.transition;
    // Follow-through is continuous across cel boundaries, with no sawtooth reset.
    const direction=transitionDirection==='lowering'?-1:1;
    const travel=Math.sin(progress*Math.PI);
    return {...neutralPerformance(),frame,src:drawings[Math.floor(frame/4)],
      armX:round(direction*travel*2),armY:round(direction*travel*-1.5),
      lean:round(travel*direction*.2),cloth:round(travel*direction*1.4)};
  }
  return {...neutralPerformance(),src:performanceFrames[pose]?.[0]??performanceFrames.resting[0]};
}
// The audio clock owns frame selection; pause/gap/preference changes bypass holds.
export function createPerformanceSampler() {
  let previousKey,held=neutralPerformance();
  return input=>{
    const key=[Math.floor(Math.max(0,input.time)*PERFORMANCE_FPS+1e-7),input.pose,!!input.playing,!!input.vocalActive,!!input.reducedMotion,Math.min(47,Math.floor((input.transitionDirection==='lowering'?1-(input.transitionLevel??0):(input.transitionLevel??0))*48+1e-7)),input.transitionDirection].join(':');
    if(key!==previousKey) { previousKey=key;held=performanceAt(input); }
    return held;
  };
}
