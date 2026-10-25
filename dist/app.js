import { mouthAmount, particleCount, cueAt, characterPose } from './motion.mjs';
import { lyrics, vocalPassages, vocalEnvelope, envelopeStep } from './lyrics.mjs';

const audio = document.querySelector('#soundtrack');
const toggle = document.querySelector('#audio-toggle');
const listen = document.querySelector('#listen');
const status = document.querySelector('#audio-status');
const volume = document.querySelector('#volume');
const mouth = document.querySelector('.mouth');
const character = document.querySelector('.character');
const subtitle = document.querySelector('#subtitle');
const seek = document.querySelector('#seek');
let activeCue = null;
let completedPerformance = false;
const canvas = document.querySelector('#weather');
const ctx = canvas.getContext('2d');
const hero = document.querySelector('.hero');
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
const root = document.documentElement;
let width = 0, height = 0, rain = [], lights = [];
let frame = 0, previousTime = 0, heroVisible = true;
let pointerX = 0, pointerY = 0, smoothX = 0, smoothY = 0;
let mouthLevel = 0, loading = false;
audio.volume = Number(volume.value);

function updateAudioUI() {
  const playing = !audio.paused;
  document.body.classList.toggle('playing', playing);
  toggle.setAttribute('aria-pressed', String(playing));
  toggle.setAttribute('aria-label', playing ? 'Pause soundtrack' : 'Play soundtrack');
  status.textContent = playing ? 'INFERNUM · NOW PLAYING' : 'INFERNUM · SOUND OFF';
  listen.querySelector('span:nth-child(2)').textContent = playing ? 'Pause. Hear the silence.' : 'Stay a while. Listen.';
  if (!playing) closeMouth();
}
function closeMouth() {
  mouthLevel = 0;
  mouth.style.setProperty('--mouth', '0');
  mouth.style.setProperty('--mouth-opacity', '0');
}

async function toggleAudio() {
  if (!audio.paused) { audio.pause(); return; }
  if (loading) return;
  loading = true;
  status.textContent = 'LOADING THE RAIN…';
  toggle.setAttribute('aria-busy', 'true');
  try {
    await audio.play();
    updateAudioUI();
    startFrame();
  } catch (error) {
    if (error.name === 'AbortError' && audio.paused) updateAudioUI();
    else status.textContent = 'UNABLE TO PLAY · TRY AGAIN';
    closeMouth();
  } finally {
    loading = false;
    toggle.removeAttribute('aria-busy');
  }
}
toggle.addEventListener('click', toggleAudio);
listen.addEventListener('click', toggleAudio);

function syncLyrics() {
  activeCue = cueAt(audio.currentTime, lyrics);
  const text = activeCue?.text ?? '';
  if (subtitle.textContent !== text) subtitle.textContent = text;
  if (audio.currentTime >= vocalPassages.at(-1).end) completedPerformance = true;
  const pose = characterPose(audio.currentTime, !audio.paused, vocalPassages, completedPerformance);
  character.dataset.pose = pose;
  character.classList.toggle('is-singing', pose === 'singing');
  character.classList.toggle('is-aftermath', pose === 'aftermath');
  if (!cueAt(audio.currentTime, vocalPassages) || audio.paused) closeMouth();
  if (Number.isFinite(audio.duration)) {
    seek.disabled = false;
    seek.max = String(audio.duration);
    seek.value = String(audio.currentTime);
    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60);
    seek.setAttribute('aria-valuetext', `${minutes}:${String(seconds).padStart(2,'0')}`);
  }
}
audio.addEventListener('timeupdate', syncLyrics);
audio.addEventListener('seeked', syncLyrics);
audio.addEventListener('play', syncLyrics);
audio.addEventListener('pause', syncLyrics);
function enableSeeking() {
  if (Number.isFinite(audio.duration)) { seek.max=String(audio.duration); seek.disabled=false; }
}
audio.addEventListener('loadedmetadata', enableSeeking);
enableSeeking();
seek.addEventListener('input', () => {
  if (Number(seek.value) < vocalPassages[0].start) completedPerformance = false;
  audio.currentTime=Number(seek.value);
  syncLyrics();
});
volume.addEventListener('input', () => {
  audio.volume = Number(volume.value);
  if (audio.volume === 0) closeMouth();
});
audio.addEventListener('play', updateAudioUI);
audio.addEventListener('pause', updateAudioUI);
audio.addEventListener('error', () => {
  status.textContent = 'TRACK UNAVAILABLE · TRY AGAIN';
  closeMouth();
});

function resize() {
  width = hero.clientWidth;
  height = hero.clientHeight;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  ctx?.setTransform(ratio, 0, 0, ratio, 0, 0);
  const count = particleCount(width, motion.matches);
  rain = Array.from({ length: count }, () => ({ x: Math.random()*width, y: Math.random()*height, speed: 240+Math.random()*320, length: 10+Math.random()*17, alpha: .06+Math.random()*.14 }));
  lights = Array.from({ length: count ? (width < 600 ? 13 : 24) : 0 }, (_, i) => ({ x: .64+Math.random()*.3, y: .35+Math.random()*.45, phase: i*2.4, speed: .3+Math.random()*.5, size: .8+Math.random()*1.2 }));
  ctx?.clearRect(0, 0, width, height);
  startFrame();
}
function drawWeather(time, dt) {
  if (!ctx) return;
  ctx.clearRect(0, 0, width, height);
  ctx.lineWidth = .6;
  for (const drop of rain) {
    drop.y += drop.speed*dt;
    drop.x -= drop.speed*.18*dt;
    if (drop.y > height+30) { drop.y = -30; drop.x = Math.random()*width; }
    if (drop.x < -20) drop.x = width+20;
    ctx.strokeStyle = `rgba(180,192,222,${drop.alpha})`;
    ctx.beginPath(); ctx.moveTo(drop.x,drop.y); ctx.lineTo(drop.x-3,drop.y+drop.length); ctx.stroke();
  }
  for (const light of lights) {
    const x = light.x*width + Math.sin(time*light.speed+light.phase)*30;
    const y = light.y*height + Math.cos(time*light.speed*.7+light.phase)*22;
    const alpha = .3 + (Math.sin(time*1.4+light.phase)+1)*.3;
    const glow = ctx.createRadialGradient(x,y,0,x,y,light.size*8);
    glow.addColorStop(0,`rgba(233,203,112,${alpha})`);
    glow.addColorStop(.2,`rgba(205,172,88,${alpha*.3})`);
    glow.addColorStop(1,'rgba(205,172,88,0)');
    ctx.fillStyle=glow; ctx.beginPath(); ctx.arc(x,y,light.size*8,0,Math.PI*2); ctx.fill();
    ctx.fillStyle=`rgba(255,234,168,${alpha})`; ctx.beginPath(); ctx.arc(x,y,light.size,0,Math.PI*2); ctx.fill();
  }
}
function animateMouth() {
  if (audio.paused || audio.volume === 0 || motion.matches || !cueAt(audio.currentTime, vocalPassages)) { closeMouth(); return; }
  // The envelope comes from the isolated vocals of this exact soundtrack.
  // It controls mouth opening; subtitle intervals control the singing pose.
  const index = Math.floor(audio.currentTime / envelopeStep);
  const energy = vocalEnvelope[index] ?? 0;
  const amount = mouthAmount(energy, 1, true, false);
  mouthLevel += (amount - mouthLevel) * .45;
  mouth.style.setProperty('--mouth', String(mouthLevel * 1.2));
  mouth.style.setProperty('--mouth-opacity', mouthLevel > .06 ? '.85' : '0');
}
function tick(timestamp) {
  frame=0;
  if(document.hidden || motion.matches || !heroVisible) { closeMouth(); return; }
  const time=timestamp/1000;
  const dt=Math.min(.04,previousTime ? (timestamp-previousTime)/1000 : .016);
  previousTime=timestamp;
  smoothX+=(pointerX-smoothX)*.04;
  smoothY+=(pointerY-smoothY)*.04;
  root.style.setProperty('--mx',smoothX.toFixed(3));
  root.style.setProperty('--my',smoothY.toFixed(3));
  root.style.setProperty('--scroll',String(Math.min(window.scrollY,height)));
  drawWeather(time,dt);
  syncLyrics();
  animateMouth();
  startFrame();
}
function startFrame() {
  if(!frame && !document.hidden && !motion.matches && heroVisible) frame=requestAnimationFrame(tick);
}
function stopFrame() { cancelAnimationFrame(frame); frame=0; previousTime=0; closeMouth(); }
window.addEventListener('resize',resize,{passive:true});
hero.addEventListener('pointermove',event=>{
  if(event.pointerType==='touch') return;
  pointerX=(event.clientX/width-.5)*2;
  pointerY=(event.clientY/height-.5)*2;
},{passive:true});
hero.addEventListener('pointerleave',()=>{ pointerX=pointerY=0; });
document.addEventListener('visibilitychange',()=>{ document.hidden ? stopFrame() : startFrame(); });
const heroObserver=new IntersectionObserver(entries=>{
  heroVisible=entries[0].isIntersecting;
  heroVisible ? startFrame() : stopFrame();
});
heroObserver.observe(hero);
const revealObserver=new IntersectionObserver(entries=>{
  for(const entry of entries) if(entry.isIntersecting) {
    entry.target.classList.add('visible'); revealObserver.unobserve(entry.target);
  }
},{threshold:.1});
function updateMotion() {
  root.classList.toggle('js-motion',!motion.matches);
  if(motion.matches) { stopFrame(); root.style.setProperty('--mx','0'); root.style.setProperty('--my','0'); root.style.setProperty('--scroll','0'); }
  resize();
}
for(const element of document.querySelectorAll('.reveal')) revealObserver.observe(element);
motion.addEventListener('change',updateMotion);
updateMotion();

async function attemptAutoplay() {
  try {
    await audio.play();
    updateAudioUI();
    startFrame();
  } catch {
    updateAudioUI();
    status.textContent = 'TAP TO LISTEN · SOUND OFF';
  }
}
attemptAutoplay();
