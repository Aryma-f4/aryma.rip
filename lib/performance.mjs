export const PERFORMANCE_FPS=15;
export const performanceFrames={
  resting:['/assets/calamitas-v2.png'],
  transition:['/assets/calamitas-arm-release.png','/assets/calamitas-arm-low.png','/assets/calamitas-arm-half.png','/assets/calamitas-arm-rise.png','/assets/calamitas-arm-high.png','/assets/calamitas-arm-reach.png'],
  singing:['/assets/calamitas-singing-v2.png'],
  aftermath:['/assets/calamitas-aftermath-v2.png'],
};
export const neutralPerformance=()=>({lean:0,stretch:1,armX:0,armY:0,cloth:0,frame:null,src:null});
const round=value=>Math.round(value*1000)/1000;
// A registered 96-pose rig cycle, not 48 separately generated illustrations.
// Local arm displacement leaves the face, seated legs and matching boots intact.
export const singingCycle=Object.freeze(Array.from({length:96},(_,frame)=>{
  const phase=frame/96*Math.PI*2;
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
  if(pose==='singing'&&playing&&vocalActive) {
    const frame=Math.floor(Math.max(0,time)*PERFORMANCE_FPS+1e-7)%singingCycle.length;
    return singingCycle[frame];
  }
  if(pose==='transition') {
    const progress=Math.max(0,Math.min(1,transitionDirection==='lowering'?1-transitionLevel:transitionLevel));
    const frame=Math.min(23,Math.floor(progress*24+1e-7));
    const drawings=transitionDirection==='lowering'
      ? [...performanceFrames.transition.slice(1).reverse(),performanceFrames.aftermath[0]]
      : performanceFrames.transition;
    // Each drawn silhouette holds for four beats, with a small directional follow-through.
    const subframe=(frame%4)/4;
    const direction=transitionDirection==='lowering'?-1:1;
    const settling=transitionDirection==='lowering'&&frame>=20;
    return {...neutralPerformance(),frame,src:drawings[Math.floor(frame/4)],
      armX:settling?0:round(direction*subframe*4),armY:settling?0:round(direction*subframe*-3),
      lean:round(Math.sin(progress*Math.PI)*direction*.2),cloth:round(Math.sin(progress*Math.PI)*direction*1.4)};
  }
  return {...neutralPerformance(),src:performanceFrames[pose]?.[0]??performanceFrames.resting[0]};
}
// The audio clock owns frame selection; pause/gap/preference changes bypass holds.
export function createPerformanceSampler() {
  let previousKey,held=neutralPerformance();
  return input=>{
    const key=[Math.floor(Math.max(0,input.time)*PERFORMANCE_FPS+1e-7),input.pose,!!input.playing,!!input.vocalActive,!!input.reducedMotion,Math.floor((input.transitionLevel??0)*24),input.transitionDirection].join(':');
    if(key!==previousKey) { previousKey=key;held=performanceAt(input); }
    return held;
  };
}
