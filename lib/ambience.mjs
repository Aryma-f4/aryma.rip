// Keep rain with the soundtrack, including native autoplay before hydration.
export function linkAmbience(music, rain) {
  let enabled=true, disposed=false;
  function sync() {
    if (!disposed && enabled && !music.paused) void rain.play().catch(()=>{});
    else rain.pause();
  }
  music.addEventListener('play',sync);
  music.addEventListener('pause',sync);
  sync();
  return {
    setEnabled(value) { enabled=value; sync(); },
    dispose() { disposed=true; music.removeEventListener('play',sync); music.removeEventListener('pause',sync); rain.pause(); },
  };
}
