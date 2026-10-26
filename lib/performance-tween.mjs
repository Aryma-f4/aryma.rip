import { animate } from 'animejs';

// Keep the artwork atomic. Anime.js only interpolates numeric rig properties.
export function tweenPerformance(rig,target,render,{autoplay=true,duration=1000/30}={}) {
  return animate(rig,{
    lean:target.lean,stretch:target.stretch,
    armX:target.armX,armY:target.armY,cloth:target.cloth,
    duration,ease:'linear',autoplay,
    onUpdate:render,onComplete:render,
  });
}
