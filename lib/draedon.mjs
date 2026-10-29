export function companionAt(scroll, range, height, reducedMotion = false) {
  const progress = range > 0 ? Math.max(0, Math.min(1, scroll / range)) : 0;
  return {
    y: reducedMotion ? 0 : progress * Math.min(160, height * 0.2),
    quote: progress < 0.55 ? "magnificent" : "but all fools",
  };
}
