'use client';
import { useEffect } from 'react';
import { blinkClosure, blinkDelay } from '../lib/blink.mjs';

export default function BlinkController({ selector }) {
  useEffect(()=>{
    const face=document.querySelector(selector);
    if (!face) return;
    const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer=0,frame=0,visible=true,disposed=false;
    const allowed=()=>!disposed&&visible&&!document.hidden&&!motion.matches;
    function reset() {
      clearTimeout(timer); cancelAnimationFrame(frame); timer=frame=0;
      face.style.setProperty('--blink','0');
    }
    function schedule() {
      reset();
      if (!allowed()) return;
      timer=window.setTimeout(()=>{
        timer=0;
        if (!allowed()) return;
        let start;
        function tick(now) {
          if (!allowed()) { reset(); return; }
          start ??= now;
          const elapsed=now-start;
          face.style.setProperty('--blink',String(blinkClosure(elapsed)));
          if (elapsed<225) frame=requestAnimationFrame(tick);
          else schedule();
        }
        frame=requestAnimationFrame(tick);
      },blinkDelay(Math.random()));
    }
    const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule();});
    observer.observe(face);
    document.addEventListener('visibilitychange',schedule);
    motion.addEventListener('change',schedule);
    schedule();
    return ()=>{disposed=true;reset();observer.disconnect();document.removeEventListener('visibilitychange',schedule);motion.removeEventListener('change',schedule);face.style.removeProperty('--blink');};
  },[selector]);
  return null;
}
