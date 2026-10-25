/** Try audible playback once, then retry on a trusted visitor interaction.
 * Stop listening after any successful playback so an intentional pause stays paused.
 */
export function startAutoplay(audio, interactionTarget, { onBlocked = () => {}, onStarted = () => {} } = {}) {
  let disposed = false;
  let armed = false;
  let inFlight = false;
  let hasStarted = false;
  function disarm() {
    interactionTarget.removeEventListener('pointerdown', interact, { capture: true });
    interactionTarget.removeEventListener('keydown', interact, { capture: true });
    armed = false;
  }
  function started() {
    if (disposed) return;
    hasStarted = true;
    disarm();
    onStarted();
  }
  function arm() {
    if (armed || disposed) return;
    interactionTarget.addEventListener('pointerdown', interact, true);
    interactionTarget.addEventListener('keydown', interact, true);
    armed = true;
  }
  async function attempt() {
    if (disposed || inFlight) return;
    inFlight = true;
    try {
      await audio.play();
      started();
    } catch (error) {
      if (!disposed && !hasStarted) {
        arm();
        onBlocked(error);
      }
    } finally {
      inFlight = false;
    }
  }
  function interact(event) {
    if (event.repeat || event.metaKey || event.ctrlKey || event.altKey) return;
    if (event.target?.closest?.('[data-audio-control]')) return;
    void attempt();
  }
  audio.addEventListener('play', started);
  void attempt();
  return () => {
    disposed = true;
    disarm();
    audio.removeEventListener('play', started);
  };
}
