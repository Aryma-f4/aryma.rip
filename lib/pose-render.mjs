// Swap complete poses atomically; crossfading different silhouettes creates ghosts.
export function applyCharacterPose(character, pose) {
  character.dataset.pose=pose;
  for(const state of character.querySelectorAll('[data-character-pose]')) {
    state.hidden=state.dataset.characterPose!==pose;
  }
  character.classList.toggle('is-singing',pose==='singing');
  character.classList.toggle('is-aftermath',pose==='aftermath');
}
