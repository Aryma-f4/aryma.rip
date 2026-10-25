# aryma.rip

A cinematic personal website built with **Next.js App Router and React**, ready to import into Vercel. English poetry, a layered Calamity-inspired night scene, rain, fireflies, and a song-driven three-pose character.

## Local development

Use Node.js 22 or newer (Node.js 24 LTS recommended):

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

```sh
npm test
npm run build
```

The production build exports the site to `out/`. Use `npm run dev` for local playback testing; the Next.js server supports the HTTP Range requests required for soundtrack seeking.

## Deploy to Vercel

1. Import [Aryma-f4/aryma.rip](https://github.com/Aryma-f4/aryma.rip) as a new Vercel project.
2. Use the repository root (`.`), framework preset **Next.js**, and build command **npm run build**. Leave Output Directory at its framework default; `next.config.mjs` enables Next.js static export.
3. Deploy. No environment variables, database, or server functions are required.
4. Add `aryma.rip` under the Vercel project's Domains settings and use the DNS records Vercel supplies for that project. If moving from Sites, replace the old Sites routing records rather than combining the two sets.

Official documentation: [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs), [Next.js static export](https://nextjs.org/docs/app/guides/static-exports), [Vercel Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).

## Source layout

- `app/page.jsx`: scene markup, original poetry, tools and certification entries.
- `app/layout.jsx`: English document, metadata and image preloads.
- `app/globals.css`: responsive composition, raised terrain, parallax and cloak/pose animation.
- `components/SceneController.jsx`: mounts the browser runtime with React lifecycle cleanup.
- `lib/scene.js`: particles, soundtrack controls, subtitles, pose changes and mouth animation.
- `lib/autoplay.mjs`: audible autoplay attempt and first-interaction fallback.
- `lib/motion.mjs`: pure interval and pose helpers.
- `lib/lyrics.mjs`: timed subtitles and isolated-vocal amplitude envelope.
- `public/assets/`: generated character/scenery artwork and supplied soundtrack.
- `tests/`: autoplay and motion regression tests (`npm test`).
- `ART-DIRECTION.md`: final generation prompts and artwork provenance.
- `.openai/hosting.json`: retains the existing Sites preview identity and serves `out/` after a production build. Vercel does not use this file.

## Autoplay and singing

The soundtrack attempts to play audibly on page load. Browser autoplay policy can block this. In that case, the first click/tap or ordinary keypress on the page retries playback. The dedicated play control also works; an intentional pause stays paused. No website can guarantee audible autoplay before interaction in browsers that block it.

Music: **Sky After Rain** by PinpinNeon, vocals SOLARIA. The recording was supplied by the owner. [Composer's original track](https://soundcloud.com/possessedbypinkiepie/sky-after-rain).

Lyrics were cross-checked with the composer's text; phrase timing is approximate automated vocal alignment. Mouth movement uses the isolated-vocal amplitude envelope and is stylized rather than phoneme-accurate lip sync. Reduced-motion preferences disable continuous animation while retaining subtitle and pose states.

After vocals, the character lowers her hands and quietly cries. This aftermath lingers through the outro and the next instrumental loop. The next vocal passage returns to the singing pose; explicit seeking before the first passage resets the initial resting pose.

## Tools and certifications

Edit the entries in `app/page.jsx`. Current tools are **Gulpsuite** and **WorldShellFinder**. Certifications are **CPENT (EC-Council)**, **CWSE (Hackviser)** and **CAPT (Hackviser)**. Personal names are omitted. Dates and credential links are omitted until supplied.

Tools use `li.tool-entry` with a title and short description. Certifications use `li.credential-entry` with an `h3` title and issuer paragraph. Add an external credential link only when a real URL is available, using `target="_blank" rel="noopener noreferrer"`.

## Rollback

The last buildless version is Git commit `b6d0989`. It retains the original HTML/JS assets in history. Revert the migration commit to restore that version; no portfolio content or artwork needs to be recreated.

## Trace of Me

The home footer opens `/trace-of-me/`. The original home poems remain on `/`; projects, certifications and published disclosures live on the new route. Edit `app/trace-of-me/page.jsx` for the introduction, tools and certifications, and `lib/advisories.mjs` for CVEs and advisory links.

The trace page uses the supplied “Catastrophes before the calamity — Interlude 03” MP3 and separate simple anime layers in `public/assets/trace-city.png`, `trace-avatar.png` and `trace-exo.png`. Home uses a locally synthesized, filtered rain ambience (`public/assets/rain.mp3`), with an independent rain toggle. Pausing the home music pauses rain too. Each route owns and cleans up its own audio. Both attempt audible autoplay; browser policy can require a first interaction.

Singing follows interpolated samples from the isolated vocal envelope, with elapsed-time attack/release smoothing, changing lip width and a subtle seated lean. Reduced-motion preferences disable these movements.

Both characters blink with pose-specific vector eyelids. `components/BlinkEyes.jsx` maps lids to the four artwork variants; `BlinkController.jsx` schedules 225 ms blinks with varying 3.8–8.2 second rests. Blinking stops outside the viewport, in hidden tabs, and for reduced-motion preferences; timers and animation frames are removed on unmount.

## Anime.js and story fragments

Anime.js 4.5.0 drives the smoke-like word entrances, one-time prose reveals and the amber story thread. `AshWords.jsx` renders semantic text on the server; `TextAtmosphere.jsx` connects Anime.js to the viewport observer in `lib/text-motion.mjs`. Text stays readable without JavaScript. Switching to reduced motion reverts active styles immediately; leaving the route disconnects observers and reverts all instances.

The original three-part fan narrative in Trace of Me connects the city's promise, the Exo Mech fire, and Calamitas singing in the rain. The real portfolio archive follows it. Edit that story in `app/trace-of-me/page.jsx`.

Implementation references: [Anime.js animation](https://animejs.com/documentation/animation/), [revert cleanup](https://animejs.com/documentation/animation/animation-methods/revert/).
