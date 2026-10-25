// Anime instances own their inline styles; reverting restores readable SSR text.
export function initializeTextMotion(root,{animate,stagger,motion,Observer}) {
  let observer;
  let animations=new Map();
  function clear() {
    observer?.disconnect(); observer=undefined;
    for (const instance of animations.values()) instance.revert();
    animations.clear();
  }
  function setup() {
    clear();
    if (motion.matches) return;
    observer=new Observer(entries=>{
      for (const entry of entries) if (entry.isIntersecting) {
        animations.get(entry.target)?.play();
        observer.unobserve(entry.target);
      }
    },{threshold:.12,rootMargin:'0px 0px -3% 0px'});
    for (const element of root.querySelectorAll('[data-ash-title], [data-ash-block], [data-ash-thread]')) {
      const title=element.hasAttribute('data-ash-title');
      const thread=element.hasAttribute('data-ash-thread');
      const targets=title?element.querySelectorAll('.ash-word'):element;
      const options=thread
        ? {scaleY:[0,1],opacity:[.2,1],duration:1900,ease:'outCubic',autoplay:false}
        : {opacity:[0,1],y:[title?7:12,0],filter:['blur(4px)','blur(0px)'],duration:title?1400:1150,delay:title?stagger(85):0,ease:'outCubic',autoplay:false};
      animations.set(element,animate(targets,options));
      observer.observe(element);
    }
  }
  motion.addEventListener('change',setup);
  setup();
  return ()=>{motion.removeEventListener('change',setup);clear();};
}
