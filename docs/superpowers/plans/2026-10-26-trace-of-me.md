# Trace of Me Implementation Plan

Goal: Restore the original poetic home and place the personal archive on /trace-of-me/, with a separate fiery avatar hero and supplied interlude soundtrack.

Architecture: Existing Next.js static App Router. Keep the home scene controller, isolate trace audio/embers in its own client component, retain original poems verbatim. Use the provided references for a simple anime hero asset. No new dependencies.

- Move project/certification JSX to the new page; restore original afterword numbering; footer link opens the new route. Add a quiet poetic introduction and six supplied CVEs with links to original advisories.
- Generate and inspect chest-up avatar/Exo Mech burning-city artwork. Copy supplied interlude audio. Generate a low-volume filtered rain loop locally, with independent mute control and lifecycle cleanup.
- Improve singing with interpolated isolated-vocal samples, time-based attack/release, mouth width modulation, and restrained upper-body motion; preserve grounded position and three poses. Add focused tests for frame-rate independence and interpolation.
- Keep autoplay attempt and trusted-interaction recovery; pause and cleanup stop both home audio layers. New page has its own audio controls, autoplay recovery, embers, reduced-motion handling.
- Run tests/build; browser-check both routes, sound controls, vocals and responsive layout. Review, push authorized GitHub repository and publish the existing private Sites project.

Acceptance: Original home poem unchanged, archive absent from home, 6 accurate advisory links, no simultaneous route soundtracks, rain can be muted, direct route refresh works in export, no forced-autoplay claim.

Execution notes: User refined the art direction to match Calamitas more closely and requested a living Exo Mech. Replaced the initial composite with three separately generated simple anime layers. Animated mech hover, cannon aim/bursts, reactor pulse, embers and firelight; reduced-motion styles stop movement.

Independent review found native autoplay could precede the rain listener. Fixed with linkAmbience(), immediate state sync and lifecycle cleanup. Two new regression tests passed after observing the missing-module failure. Singing tests cover interpolation and elapsed-time smoothing. Browser QA verified both route soundtracks, first-interaction fallback, explicit pause, all image loads, no horizontal overflow at observed desktop/tablet widths, singing pose/subtitles and active independent mech transforms.
