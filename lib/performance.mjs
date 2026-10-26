export const performanceFrames={
  resting:['/assets/calamitas-v2.png','/assets/calamitas-idle-inhale.png'],
  transition:['/assets/calamitas-arm-half.png','/assets/calamitas-arm-high.png'],
  singing:['/assets/calamitas-singing-v2.png','/assets/calamitas-singing-accent.png'],
  aftermath:['/assets/calamitas-aftermath-v2.png'],
};
export const neutralPerformance=()=>({lean:0,stretch:1,src:null});
export function performanceAt({time,pose,voice=0,phrase=0,transitionLevel=0,reducedMotion=false}) {
  if(reducedMotion) return neutralPerformance();
  const breath=Math.sin(time*1.08+.22*Math.sin(time*.21));
  const drift=Math.sin(time*.39+.65*Math.sin(time*.13));
  const sigh=Math.exp(-Math.pow(((time%23)-17.5)/2.1,2));
  const strength=Math.max(0,Math.min(1,voice));
  const arc=Math.sin(Math.PI*Math.max(0,Math.min(1,phrase)));
  if(pose==='singing') return {
    src:performanceFrames.singing[phrase>=.3&&phrase<.75?1:0],
    lean:drift*.34+strength*.16+arc*.15,
    stretch:1+breath*.003+strength*.001,
  };
  if(pose==='transition') return {
    src:performanceFrames.transition[transitionLevel>=.5?1:0],
    lean:drift*.16-.12,stretch:1+breath*.002,
  };
  if(pose==='aftermath') return {
    src:performanceFrames.aftermath[0],
    lean:drift*.2-sigh*.1,stretch:1+breath*.002+sigh*.002,
  };
  return {
    src:performanceFrames.resting[breath>.2?1:0],
    lean:drift*.45-sigh*.12,stretch:1+breath*.003+sigh*.002,
  };
}
// Hold body drawings on twos (12 fps); the separate mouth animation stays smooth.
export function createPerformanceSampler() {
  let previousFrame=-1,previousPose,held=neutralPerformance();
  return input=>{
    const frame=Math.floor(input.time*12);
    if(frame===previousFrame&&input.pose===previousPose) return held;
    previousFrame=frame;previousPose=input.pose;
    const pose=performanceAt({...input,time:frame/12});
    held={src:pose.src,lean:Math.round(pose.lean/.08)*.08,stretch:Math.round(pose.stretch/.0005)*.0005};
    return held;
  };
}
