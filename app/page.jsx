import SingingMotionFilter from "../components/SingingMotionFilter";
import MusicCredits from "../components/MusicCredits";
import HomeOrnaments from "../components/HomeOrnaments";
import AshWords from "../components/AshWords";
import TextAtmosphere from "../components/TextAtmosphere";
import BlinkEyes from "../components/BlinkEyes";
import BlinkController from "../components/BlinkController";
import SceneController from "../components/SceneController";

export default function Home() {
  return (
    <>
      <SceneController />
      <TextAtmosphere />
      <BlinkController selector=".character" />

  <a className="skip" href="#letter">Skip to the letter</a>
  <main>
    <section className="hero" aria-labelledby="hero-title">
      <div className="scene" aria-hidden="true">
        <div className="sky" data-depth="0.2"></div>
        <div className="stars"></div>
        <div className="mist mist-back" data-depth="0.45"></div>
        <div className="character-position" data-depth="1.2">
          <div className="character">
            <div className="character-state resting-pose" data-character-pose="resting">
              <img className="character-body" src="/assets/calamitas-v2.png" alt="" fetchPriority="high" />
              <BlinkEyes pose="resting" />
            </div>
            <div className="character-state transition-pose" data-character-pose="transition" data-eyes="singing" hidden>
              <img className="character-body" src="/assets/calamitas-arm-prepare.png" alt="" />
              <BlinkEyes pose="singing" />
              <BlinkEyes pose="aftermath" />
            </div>
            <div className="character-state singing-pose" data-character-pose="singing" hidden>
              <img className="character-body" src="/assets/calamitas-singing-v2.png" alt="" />
              <BlinkEyes pose="singing" />
              <span className="mouth-cover"></span><div className="mouth"></div>
              <span className="tear tear-left"></span><span className="tear tear-right"></span>
            </div>
            <div className="character-state aftermath-pose" data-character-pose="aftermath" hidden>
              <img className="character-body" src="/assets/calamitas-aftermath-v2.png" alt="" />
              <BlinkEyes pose="aftermath" />
            </div>
          </div>
        </div>
        <div className="hill" data-depth="1.6"></div>
        <div className="mist mist-front" data-depth="0.8"></div>
        <canvas id="weather"></canvas>
        <div className="vignette"></div>
        <div className="grain"></div>
      </div>
      <div className="identity"><a href="#" aria-label="aryma.rip home">aryma<span>.rip</span></a><span className="identity-line"></span><span className="identity-note">a place to feel something</span></div>
      <span className="edition">A QUIET REBELLION <span>—</span> EST. HUMAN</span>
      <div className="hero-copy">
        <p className="eyebrow"><span className="little-star">✧</span> SOMEWHERE, AFTER THE END</p>
        <h1 id="hero-title" data-ash-title><AshWords text="I miss the world before it knew" /> <em><AshWords text="everything." /></em></h1>
        <p className="intro">When every answer arrives before the question,<br />what becomes of the ones who loved to wonder?</p>
        <button id="listen" data-audio-control="true" className="listen" type="button"><span className="play-triangle"></span><span>Stay a while. Listen.</span><span className="listen-line"></span></button>
      </div>
      <div className="song-subtitles" aria-label="Song lyrics"><span id="subtitle"></span></div>
      <div className="character-caption" aria-hidden="true"><span className="caption-rule"></span>EVEN THE BRIMSTONE WITCH<br />DESERVES A QUIET NIGHT.</div>
      <a className="scroll-cue" href="#letter"><span className="scroll-line"></span><span>THERE IS MORE IN THE SILENCE</span><span className="arrow">↓</span></a>
      <span className="scene-number" aria-hidden="true">01 / THE STILLNESS</span>
    </section>

    <section className="letter" id="letter" aria-labelledby="letter-title">
      <HomeOrnaments variant="letter" />
      <div className="section-mark"><span>01</span><span className="rule"></span><span>A LETTER TO NO ONE</span></div>
      <div className="letter-layout">
        <h2 id="letter-title" className="reveal">We taught the machines<br />to dream.<br /><em>I stopped sleeping.</em></h2>
        <div className="letter-prose reveal">
          <p>I used to stay up for the joy of not knowing. A broken line of code. An empty canvas. The small, impossible distance between who I was and what I might become.</p>
          <p>Then came the age of instant everything. Art without the trembling hand. Answers without the long way home. A thousand perfect things, and nothing I could feel.</p>
          <p>I hate what this age has made of learning: a race against something that never needed a reason to begin.</p>
          <p className="quiet-line">Some days, I cannot find mine either.</p>
        </div>
      </div>
      <div className="interlude reveal"><span className="ornament">✧</span><p>Not everything that takes time<br />is time wasted.</p><span className="ornament">✧</span></div>
    </section>

    <section className="afterword" aria-labelledby="afterword-title">
      <HomeOrnaments variant="afterword" />
      <div className="afterword-glow" aria-hidden="true"></div>
      <p className="eyebrow reveal">02 / WHAT THE RAIN LEAVES BEHIND</p>
      <h2 id="afterword-title" className="reveal">Let the world hurry.<br /><em>I'll be here.</em></h2>
      <p className="afterword-text reveal">With a song that still hurts.<br />A sky that owes me nothing.<br />And a question I haven't given away.</p>
      <div className="closing-star reveal" aria-hidden="true">✧</div>
      <p className="closing-note reveal">Perhaps that is enough for tonight.</p>
      <a className="story-bridge" href="/trace-of-me/" data-ash-block>Beyond this rain, a city is still burning. <span aria-hidden="true">→</span></a>
    </section>
  </main>

  <footer><a className="footer-brand" href="#">aryma.rip</a><span>STILL HUMAN. STILL HERE.</span><a href="/trace-of-me/">A trace of me <span aria-hidden="true">↗</span></a><MusicCredits current="sky" /><small>A personal tribute to Terraria Calamity. Poetry is original.</small></footer>

  <aside className="music-player" data-audio-control="true" aria-label="Soundtrack controls">
    <button id="audio-toggle" className="audio-toggle" type="button" aria-label="Play soundtrack" aria-pressed="false"><span className="sound-bars" aria-hidden="true"><i></i><i></i><i></i><i></i></span></button>
    <div className="track"><span className="track-title">Sky After Rain</span><span id="audio-status" className="track-detail" role="status">INFERNUM · SOUND OFF</span></div>
    <span className="player-divider"></span>
    <label className="volume-label"><span className="sr-only">Music volume</span><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M10 5 5 9H2v6h3l5 4V5Zm4 3c2 2 2 6 0 8m3-11c4 4 4 10 0 14"/></svg><input id="volume" type="range" min="0" max="1" step="0.01" defaultValue="0.45" aria-label="Music volume" /></label>
    <input id="seek" className="seek" type="range" min="0" max="184" defaultValue="0" step="0.05" aria-label="Soundtrack position" disabled />
  </aside>
  <button id="rain-toggle" className="rain-toggle" data-audio-control="true" type="button" aria-pressed="true" aria-label="Mute rain ambience">Rain · on</button>
  <audio id="rain-audio" src="/assets/rain.mp3" preload="auto" loop></audio>
  <audio id="soundtrack" src="/assets/sky-after-rain.mp3" preload="auto" autoPlay playsInline loop></audio>
  <SingingMotionFilter />


    </>
  );
}
