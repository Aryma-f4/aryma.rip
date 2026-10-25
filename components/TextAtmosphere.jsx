'use client';
import { useEffect } from 'react';
import { animate, stagger } from 'animejs';
import { initializeTextMotion } from '../lib/text-motion.mjs';

export default function TextAtmosphere() {
  useEffect(()=>{
    const root=document.querySelector('main');
    if (!root || typeof IntersectionObserver==='undefined') return;
    return initializeTextMotion(root,{
      animate,stagger,
      motion:window.matchMedia('(prefers-reduced-motion: reduce)'),
      Observer:IntersectionObserver,
    });
  },[]);
  return null;
}
