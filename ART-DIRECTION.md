# Artwork provenance

## Aftermath pose final prompt

Edit target: supplied transparent Supreme Calamitas flat anime illustration. Create an AFTER-SINGING alternate pose for this same character, same exact SIMPLE clean dark outlines, flat cel colors and minimal shading. Keep the 1050 by 1498 portrait canvas, full seated silhouette scale and lower body/boot locations, same hood, white hair, horns, burgundy cloak and gold trim, cream cravat, and wind-blown cloak tail. Change upper-body pose gently: both hands lowered and loosely folded on her knees, shoulders slightly slumped, head slightly bowed and turned toward the left, sorrowful weary crimson eyes lowered, small closed mouth. She has just finished a sad song and is quietly crying, not dramatic sobbing. Delicate translucent tears on both cheeks with silver-white watery highlights and tiny warm gold reflections, like water catching firelight, NOT face markings and NOT large flames. Match face design and existing style closely. No new costume detail, no painterly rendering, no photorealism. Preserve a genuine transparent RGBA background, alpha zero outside her silhouette, no backdrop, no scenery, no shadows behind character, no text. Make the pose feel quiet, tender and natural for a lingering instrumental outro.

Generated with built-in image_gen; final transparent asset: `public/assets/calamitas-aftermath-v2.png`.

Generated with the built-in image_gen tool. The first ornate versions were superseded by the user's request for simpler flat anime art.

## Background final prompt

Use case: illustration-story. New website background, wide 16:9. Simple hand-drawn 2D anime landscape, deliberately minimal, flat colors and soft cel shading like a quiet animation background. Midnight indigo sky occupies upper 70 percent, a few tiny stars, large simple dark lavender cloud shapes, distant muted blue mountain silhouettes, a few simplified pine silhouettes at far edges, grassy hill silhouette at bottom. Small crescent moon upper right. Left area almost empty to place poetry. Restrained palette of 5 muted blue-indigo tones. Calm melancholic lo-fi Terraria-inspired night. No detailed castle, no realistic textures, no intricate detail, no rain baked in, no characters, no text. Match simplicity of supplied night-sky reference.

## Resting character final prompt

Use case: illustration-story. Create a SIMPLE clean 2D anime full-body Supreme Calamitas character cutout based on supplied reference. She is a young adult woman sitting quietly on an invisible grassy ledge, knees bent, looking slightly left. Short straight pale white hair with a few longer front strands, two thin black horns, simple glowing red eyes, red hood and large dark muted burgundy cloak with one simple gold border, pale cream cravat, dark leggings and boots. Small neutral closed mouth visible around center of face. Simplified anime illustration, clean dark outlines, FLAT COLORS, only two or three cel shading tones, big simple shapes, no ornate details, no jewelry except small red clasp, no realistic skin, no fabric textures, no lace, no elaborate costume. Wistful expression. Cloak tail extends a little to the right so it can sway. Full silhouette inside frame, portrait composition. Actual transparent RGBA background with alpha zero outside character. No colored backdrop, no gradients behind character, no glow behind character, no ground, no shadows, no text. Visually match the simple sketch character in reference, polished but not detailed.

## Singing pose final prompt

Edit target: Image 1, the simple flat-color Supreme Calamitas transparent cutout. Supporting reference Image 2 is ONLY for sorrowful singing emotion and luminous tear mood, not its character design. Create a singing-pose alternate for the exact same website character. Keep the exact same SIMPLE flat anime style, clean outlines, 2-3 cel-shading colors, pale short white hair, red eyes, thin black horns, plain burgundy hood/cloak with gold border, cream cravat and dark boots. Preserve canvas aspect, character scale, seated lower-body position and feet placement so this swaps seamlessly with resting pose. Lift the hand previously resting by her cheek and extend that arm diagonally UP toward the upper right corner with open palm reaching longingly toward the sky, hand completely inside frame. Keep head and face approximately in same position, lift gaze slightly, eyebrows tilted in deep sadness, small mouth open in song. Two delicate translucent tears stream from eyes down cheeks, watery silver-white highlights with tiny warm gold ember light on the edges, like liquid water illuminated by fire, NOT huge flames, NOT face markings. Keep tears subtle and beautiful. No added ornate costume detail, no realistic painting, no dramatic rendering. Actual RGBA transparent background, alpha zero outside silhouette, no scenery or backdrop. No text. Full character within frame.

Final assets live in public/assets/night.png, public/assets/calamitas-v2.png, and public/assets/calamitas-singing-v2.png. Character alpha is preserved.


## Trace of Me

The second route shares the simple anime illustration language of Calamitas. Separate generated layers: `public/assets/trace-city.png` (burning ruins), `trace-exo.png` (transparent Exo Mech), and `trace-avatar.png` (transparent injured avatar bust). References supplied by the user: burning-city composition, navy-haired avatar with glasses, and Exo Mech art. Injuries remain non-graphic. Layered CSS animates the reactor, cannon, body and firelight; reduced-motion disables animation.

## Two-leg anatomy and matched boots correction

The three v2 Calamitas sprites remove the erroneous diagonal third shin from the original artwork. Each now has exactly two legs and two boots. The resting sprite's simplified charcoal-brown boots serve as the design reference for the singing and aftermath variants: single tidy folded cuffs, low heels and softly pointed toes. Edits preserve the simple cel-shaded style, transparent background, face placement and upper-body expressions. Versioned asset URLs prevent stale originals from remaining in browser cache.

## Limited animation frames

Four additional registered transparent drawings extend the corrected v2 sprites: `calamitas-idle-inhale.png`, `calamitas-arm-half.png`, `calamitas-arm-high.png`, `calamitas-singing-accent.png`. The arm path rises toward the upper right in two stages and reverses after vocals. Selected frames retain two legs, two boots, natural wrists and five fingers per visible open hand. Rejected hand variants are not used. The body uses held drawings rather than crossfades or deforming anatomy; the separate mouth remains smooth.

## 48-frame singing revision

The instrumental idle no longer alternates inhale drawings or animates the cloak. Singing now uses a 48-pose numerical rig loop at 15 fps (3.2 seconds), built on the corrected single singing drawing. This is runtime animation rather than 48 new generated drawings. The localized displacement fields stay on the raised arm and outer cloak; face/lips, seated legs and boots retain their registration. Small whole-body lean is held on the same frame clock, with no breathing stretch. Pause and vocal gaps restore neutral motion. The two drawn arm-transition frames remain.

## Expanded drawn transitions and 96-frame performance

Four additional transparent registered cels were created with the built-in imagegen tool and saved as `public/assets/calamitas-arm-release.png`, `calamitas-arm-low.png`, `calamitas-arm-rise.png`, and `calamitas-arm-reach.png`. They supplement the half/high cels. Each arm transition now spans 24 held numerical poses over 1.6 seconds at 15 fps; six underlying drawings establish the arm's silhouette. The lowering path ends with the existing folded-hands aftermath image. It does not return the hand to the cheek after singing. The singing loop now contains 96 numerical poses over 6.4 seconds. Idle remains stationary; the lips and blink remain independent. These counts describe animation samples, not 96 newly drawn images.

### Imagegen prompt set

Edit target for each: `public/assets/calamitas-arm-half.png`. Actual transparency requested and preserved; no image resizing or retouching after generation.

Shared prompt: Use case: precise-object-edit. Edit the target transparent seated Supreme Calamitas animation cel. Preserve EXACT same canvas, character scale, head/face/hood/hair positions, red eyes, cel shading style, torso, stationary hand on lap, TWO seated legs and TWO matching dark folded-cuff low-heel pointed boots at the exact same pixels. Preserve transparent background. Change ONLY the arm on viewer RIGHT that is currently raised. Anatomically correct single elbow, wrist, five digits (four fingers and thumb), no duplicate hands, no extra legs. Mouth closed, tiny sad line. Full silhouette within canvas. No text. This is ONE full character animation drawing, NOT a sprite sheet.

- Release: The raised arm is lowered and folded inward: elbow near her right waist (viewer right), forearm rises inward, relaxed hand hovering beside the right side of her cheek at about chin height. Palm gently turned inward, fingers softly relaxed but clearly anatomically readable. A preparatory moment after moving hand away from her face. The hand must NOT overlap the eyes or mouth.
- Low: The raised arm now forms a low open gesture: elbow beside her waist on viewer right, forearm angles out to viewer right and slightly upward; open palm up at lower-chest level near x78% y36% of canvas, fingers relaxed and uncrossed. This is the low first step before lifting her hand to shoulder height. Do not move face or stationary hand on lap.
- Rise: The raised arm is between shoulder-height and the high reach: elbow bent at about 105 degrees, upper arm slopes out to viewer right, open palm at x84% y18% of canvas, forearm slopes upward and outward, fingers point upper-right, five clearly separated natural digits. Not fully extended. Same face and legs registration.
- Reach: The raised arm is nearly fully extended diagonally upper-right: open palm at x90% y8% of canvas, elbow still a little bent, wrist relaxed, natural five separated fingers reaching upper-right. This must be an in-between before the FULL reach in the final singing frame, hand slightly below the fully extended singing version. Mouth closed.

The first rise candidate extended sideways too far and is not used. Final corrective rise prompt (same edit target, built-in tool, transparency preserved): Precise animation in-between edit. Preserve this entire exact transparent seated character image, face, hood, torso, lap hand, TWO legs and matching TWO boots. Change ONLY the raised hand and forearm on viewer right. Raise this palm JUST A SMALL AMOUNT, about 60 pixels vertically, keeping its same horizontal position near x=840 pixels on a 1050-wide canvas. Keep elbow bent, keep forearm nearly vertical, NOT extended sideways, fingers still relaxed upper right. The palm must remain much closer to her head than to right edge: leave at least 140 pixels transparent margin between fingertips and right edge. A tiny in-between between current half-raised arm and the next higher arm. Five anatomically natural digits (4 fingers,1 thumb), no crossed fingers, no extra limbs. Mouth CLOSED, exact original sad face. Do not change any other area, no scenery, no text. Same size and full silhouette. Actual alpha transparent.

## Anime.js interpolation and denser cels

The character rig now uses Anime.js, independently of the existing text animations. Numeric arm, cloak and lean targets interpolate between 30 fps audio samples; the source drawing never interpolates opacity. The singing cycle is 192 rig samples over 6.4 seconds. A continuous transition offset replaces the previous four-frame sawtooth reset. Raising is now 0.8 seconds and lowering 1.2 seconds, each with 48 numerical samples and twelve drawn silhouettes. Faster cel changes on the lift give it an anime cadence instead of long holds. Idle remains still.

Seven additional project assets, generated with built-in imagegen, preserve original alpha and are not resized or retouched: `public/assets/calamitas-arm-prepare.png`, `calamitas-arm-gather.png`, `calamitas-arm-open.png`, `calamitas-arm-lift.png`, `calamitas-arm-extend.png`, `calamitas-arm-unfurl.png`, and `calamitas-arm-settle.png`.

### Shared generation prompt

Use case: precise-object-edit. Create ONE transparent anime animation IN-BETWEEN cel halfway between reference 1 (edit target) and reference 2 (next pose). Preserve exact 1050x1498 canvas, seated character registration and scale, TWO legs with same TWO matching dark folded-cuff boots, torso, cape design and colors, white hair, red eyes, black horns, soft cel shading, and other hand on lap. ONLY change the gesturing arm on viewer right to the intermediate gesture. Keep anatomy coherent: one arm, single elbow and wrist, exactly four fingers plus one thumb per hand, no doubled or overlapping ghost limbs, no extra feet. Keep mouth CLOSED as a tiny sad line. Do not change face location unless head change is specifically requested. Keep entire character and all fingertips inside canvas with transparent margins. No scenery, no text, no glow, no grid, no sprite sheet. Actual RGBA alpha background.

Per-frame instructions inserted into that prompt:

- Prepare (`calamitas-v2.png` to `calamitas-arm-release.png`): Begin releasing the hand from the cheek: it hovers just away from the cheek, elbow dropping slightly; lift the head only halfway between the two references. This is the first quiet anticipation frame, not the open singing gesture.
- Gather (release to low): Hand moves down and outward past the collar to upper-chest height, fingers gently uncurling, palm diagonally up, elbow relaxed beside waist. Exactly halfway between the reference arm poses.
- Open (low to half): Open hand at chest-to-shoulder height halfway vertically between the references, elbow bends, palm inclines upward toward sky. It must be LOWER than shoulder-height second reference but HIGHER than first low reference.
- Lift (half to rise): Raise the palm only about 25-35 pixels above first reference, halfway to second reference. Keep same horizontal hand position, forearm nearly vertical, a natural bent elbow.
- Extend (rise to high): Lift palm a tiny amount, halfway between the reference heights, keeping forearm nearly vertical and elbow slightly bent. Small controlled upward continuation, leave ample transparent space beside hand.
- Unfurl (high to reach): Elbow extends diagonally upward, hand halfway between high and full reach, higher and more outward than first, but lower than second. Open palm reaching wistfully, natural relaxed wrist.
- Settle (low to aftermath): LOWERING transition. Bring the gesturing hand gently inward and down, palm tilted toward the knee, wrist hovering just above lap before hand settles over other hand. Shoulders lower slightly, gaze softens downward halfway to second reference. Mouth closed, no gesture upward.
