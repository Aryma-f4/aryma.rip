import { startAutoplay } from "./autoplay.mjs";
export function connectSoundtrack(audio, target, { onState = () => {} } = {}) {
  let disposed = false,
    pending = false,
    blocked = false,
    error = false;
  audio.volume = 0.22;
  function emit() {
    if (!disposed)
      onState({
        playing: !audio.paused,
        blocked,
        error,
        time: audio.currentTime || 0,
        duration: Number.isFinite(audio.duration) ? audio.duration : 0,
        volume: audio.volume,
      });
  }
  function started() {
    blocked = false;
    error = false;
    emit();
  }
  function failed() {
    error = true;
    emit();
  }
  const events = [
    "pause",
    "timeupdate",
    "durationchange",
    "loadedmetadata",
    "volumechange",
  ];
  events.forEach((event) => audio.addEventListener(event, emit));
  audio.addEventListener("play", started);
  audio.addEventListener("error", failed);
  const stopAutoplay = startAutoplay(audio, target, {
    onStarted: started,
    onBlocked: () => {
      blocked = true;
      emit();
    },
  });
  emit();
  return {
    async toggle() {
      if (disposed || pending) return;
      if (!audio.paused) {
        audio.pause();
        return;
      }
      pending = true;
      try {
        await audio.play();
      } catch {
        blocked = true;
        emit();
      } finally {
        pending = false;
      }
    },
    setVolume(value) {
      if (!disposed && Number.isFinite(value)) {
        audio.volume = Math.max(0, Math.min(1, value));
        emit();
      }
    },
    seek(value) {
      if (
        !disposed &&
        Number.isFinite(value) &&
        Number.isFinite(audio.duration)
      ) {
        audio.currentTime = Math.max(0, Math.min(audio.duration, value));
        emit();
      }
    },
    dispose() {
      disposed = true;
      stopAutoplay();
      events.forEach((event) => audio.removeEventListener(event, emit));
      audio.removeEventListener("play", started);
      audio.removeEventListener("error", failed);
      audio.pause();
    },
  };
}
