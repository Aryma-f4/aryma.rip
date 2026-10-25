'use client';
import { useEffect } from 'react';
import { startAutoplay } from '../lib/autoplay.mjs';

export default function TraceController() {
  useEffect(() => {
    const audio = document.querySelector('#trace-audio');
    const toggle = document.querySelector('#trace-toggle');
    const volume = document.querySelector('#trace-volume');
    const seek = document.querySelector('#trace-seek');
    const status = document.querySelector('#trace-status');
    let disposed = false;
    let pending = false;
    const cleanups = [];
    const on = (target,event,fn) => { target.addEventListener(event,fn); cleanups.push(()=>target.removeEventListener(event,fn)); };
    audio.volume = Number(volume.value);
    function update() {
      const playing = !audio.paused;
      document.body.classList.toggle('playing',playing);
      toggle.setAttribute('aria-pressed',String(playing));
      toggle.setAttribute('aria-label',playing?'Pause interlude':'Play interlude');
      status.textContent = playing?'INTERLUDE 03 · NOW PLAYING':'INTERLUDE 03 · SOUND OFF';
    }
    on(toggle,'click',async()=>{
      if (!audio.paused) { audio.pause(); return; }
      if (pending) return;
      pending = true;
      try { await audio.play(); } catch { if (!disposed) status.textContent='UNABLE TO PLAY · TRY AGAIN'; }
      finally { pending = false; }
    });
    on(volume,'input',()=>{ audio.volume=Number(volume.value); });
    function position() {
      if (Number.isFinite(audio.duration)) { seek.disabled=false; seek.max=String(audio.duration); seek.value=String(audio.currentTime); }
    }
    on(audio,'loadedmetadata',position);
    on(audio,'timeupdate',position);
    on(seek,'input',()=>{ audio.currentTime=Number(seek.value); });
    on(audio,'play',update); on(audio,'pause',update);
    on(audio,'error',()=>{ status.textContent='TRACK UNAVAILABLE · TRY AGAIN'; });
    position();
    const stop = startAutoplay(audio,document,{
      onStarted:update,
      onBlocked:()=>{ update(); status.textContent='TAP ANYWHERE TO LISTEN'; },
    });
    return ()=>{
      disposed=true; stop(); cleanups.forEach(fn=>fn()); audio.pause(); document.body.classList.remove('playing');
    };
  },[]);
  return null;
}
