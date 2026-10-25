# aryma.rip

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

## After the song

A third generated pose lowers her hands and keeps the tears visible after a vocal passage. The aftermath lingers through the final instrumental and the next automatic loop, while a new vocal passage returns to the singing pose. Explicit seeking back before the first vocal passage resets the character to her original resting state. Reduced-motion settings retain these state changes without the crossfade or continuous motion.

## Tools and certifications

The two personal archive sections live in `dist/index.html`, between the letter and the closing poem. Current entries are Gulpsuite and WorldShellFinder, with CPENT (EC-Council), CWSE (Hackviser), and CAPT (Hackviser). Personal names are omitted. Dates and credential links are not displayed because they have not been supplied.

### What I'm working with

Add entries inside `.tool-list`:

```html
<li class="tool-entry">
  <span>Actual tool or technology</span>
  <span>A short description of how you use it</span>
</li>
```

After adding entries, remove the `.archive-note` paragraph in that section.

### Certifications

Add entries inside `.credential-list`:

```html
<li class="credential-entry">
  <div>
    <h3>Actual certification title</h3>
    <p>Issuing organization · Year earned</p>
  </div>
  <a href="https://credential.example/your-credential" target="_blank" rel="noopener noreferrer">View credential <span aria-hidden="true">↗</span></a>
</li>
```

Replace the example link with the real credential URL, or omit the link if none exists. After adding entries, remove the `.archive-note` paragraph in that section.

These templates are documentation only; they are not displayed as real credentials on the website.
