# Next.js migration and autoplay

Goal: Preserve the approved English cinematic portfolio while making this GitHub repo directly importable into Vercel as Next.js.

Approach: App Router with static export (`out/`), React 19, reusable existing CSS and assets. Server-render the page as JSX; isolate DOM animation/audio wiring inside a client lifecycle controller with cleanup. No backend is required. Keep the Sites project identity and deploy the same exported output there. Git commit b6d0989 is the rollback point.

Files: app/layout.jsx and page.jsx; app/globals.css; components/SceneController.jsx; lib/scene.js, motion.mjs, lyrics.mjs and autoplay.mjs; public/assets/; tests/; next.config.mjs; package.json/lock; README; .openai/hosting.json.

1. Add behavior tests first for initial audible playback attempt, blocked fallback, first interaction recovery, preserving explicit pause, and cleanup. Move the existing six motion tests into the repository.
2. Migrate markup to real JSX, CSS to globals, artwork/music to public. Encapsulate existing scene runtime in an initializer that returns cleanup; use a client effect to mount it. Preserve all three character poses and terrain anchoring.
3. Integrate an autoplay coordinator: initial play() plus pointer/keyboard recovery only until successful playback. Playback controls must not double-toggle; cleanup removes all handlers. Audible autoplay remains subject to browser policy.
4. Run tests, production build and browser QA: assets, layout, console, first interaction starts music, pause remains paused, vocals/subtitles, outro, seek and loop. Review the migration independently.
5. Push the existing authorized GitHub repository, publish the exported Sites preview, and document Vercel import/build configuration. Do not claim a Vercel deployment without one.

Acceptance: npm ci / npm run build succeeds, npm test passes, Vercel can detect Next.js from repo root, all prior assets/content preserved, no duplicate lifecycle observers/listeners or audio after unmount, no invented claim that browsers permit forced audible autoplay.
