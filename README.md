# aryma.rip — After the rain

A buildless, cinematic personal website. All visitor-facing copy is English.

## Run locally

From this directory:

```sh
python3 -m http.server 4173 --directory dist
```

Open http://localhost:4173. No installation or build is required.

## Files

- `dist/index.html`: English poetry, scene structure, soundtrack controls.
- `dist/styles.css`: responsive composition, parallax, cloak motion and pose crossfade.
- `dist/app.js`: playback, subtitle timing, singing pose and canvas rain/fireflies.
- `dist/motion.mjs`: testable interval lookup and motion limits.
- `dist/lyrics.mjs`: timed subtitles and isolated-vocal amplitude envelope from the supplied recording.
- `dist/assets/`: generated images and supplied music.
- `ART-DIRECTION.md`: final generation prompts and provenance.

Music: Sky After Rain by PinpinNeon, vocals SOLARIA. The local recording was supplied by the user. Original song information: https://soundcloud.com/possessedbypinkiepie/sky-after-rain

Autoplay with sound is attempted on load. Browsers may require the play button or “Stay a while. Listen.” gesture. The vocals drive a stylized mouth animation, not phoneme-accurate lip sync. Reduced-motion settings disable continuous motion while retaining subtitles and pose states.

`aryma.rip` is the intended custom domain. A title/wordmark alone does not connect DNS. Domain activation must be verified separately.
