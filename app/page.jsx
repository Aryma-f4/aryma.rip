import SceneController from "../components/SceneController";

export default function Home() {
  return (
    <>
      <SceneController />

  <a className="skip" href="#letter">Skip to the letter</a>
  <main>
    <section className="hero" aria-labelledby="hero-title">
      <div className="scene" aria-hidden="true">
        <div className="sky" data-depth="0.2"></div>
        <div className="stars"></div>
        <div className="mist mist-back" data-depth="0.45"></div>
        <div className="character-position" data-depth="1.2">
          <div className="character">
            <div className="character-state resting-pose">
              <img className="character-body" src="/assets/calamitas.png" alt="" fetchPriority="high" />
              <img className="character-cloak" src="/assets/calamitas.png" alt="" />
            </div>
            <div className="character-state singing-pose">
              <img className="character-body" src="/assets/calamitas-singing.png" alt="" />
              <img className="character-cloak" src="/assets/calamitas-singing.png" alt="" />
              <span className="mouth-cover"></span><div className="mouth"></div>
              <span className="tear tear-left"></span><span className="tear tear-right"></span>
            </div>
            <div className="character-state aftermath-pose">
              <img className="character-body" src="/assets/calamitas-aftermath.png" alt="" />
              <img className="character-cloak" src="/assets/calamitas-aftermath.png" alt="" />
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
        <h1 id="hero-title">I miss the world before it knew <em>everything.</em></h1>
        <p className="intro">When every answer arrives before the question,<br />what becomes of the ones who loved to wonder?</p>
        <button id="listen" data-audio-control="true" className="listen" type="button"><span className="play-triangle"></span><span>Stay a while. Listen.</span><span className="listen-line"></span></button>
      </div>
      <div className="song-subtitles" aria-label="Song lyrics"><span id="subtitle"></span></div>
      <div className="character-caption" aria-hidden="true"><span className="caption-rule"></span>EVEN THE BRIMSTONE WITCH<br />DESERVES A QUIET NIGHT.</div>
      <a className="scroll-cue" href="#letter"><span className="scroll-line"></span><span>THERE IS MORE IN THE SILENCE</span><span className="arrow">↓</span></a>
      <span className="scene-number" aria-hidden="true">01 / THE STILLNESS</span>
    </section>

    <section className="letter" id="letter" aria-labelledby="letter-title">
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

    <section className="personal-archive" id="working-with" aria-labelledby="working-title">
      <div className="section-mark"><span>02</span><span className="rule"></span><span>THE THINGS I REACH FOR</span></div>
      <div className="archive-layout">
        <div className="archive-heading reveal">
          <h2 id="working-title">What I'm<br /><em>working with.</em></h2>
          <p>The tools change.<br />The need to understand remains.</p>
        </div>
        <div className="archive-content reveal">
          {/* Add real tools as <li className="tool-entry"><span>Tool name</span><span>What I use it for</span></li>. */}
          <ul className="tool-list" aria-label="Tools and technologies">
            <li className="tool-entry">
              <span>Gulpsuite</span>
              <span>A free web security toolkit built in Rust, inspired by Burp Suite Pro.</span>
            </li>
            <li className="tool-entry">
              <span><a href="https://github.com/Aryma-f4/worldshellfinder" target="_blank" rel="noopener noreferrer" aria-label="View WorldShellFinder on GitHub">WorldShellFinder <span className="entry-arrow" aria-hidden="true">↗</span></a></span>
              <span>A Go-based web shell detection tool using keywords, regex rules, and heuristic scoring.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section className="personal-archive certification-archive" id="certifications" aria-labelledby="certifications-title">
      <div className="section-mark"><span>03</span><span className="rule"></span><span>TRACES OF THE LONG WAY</span></div>
      <div className="archive-layout">
        <div className="archive-heading reveal">
          <h2 id="certifications-title">Certifications<span className="gold-period">.</span></h2>
          <p>Small milestones.<br />Long nights behind them.</p>
        </div>
        <div className="archive-content reveal">
          {/* Add verified credentials here. See README.md for the entry template. */}
          <ol className="credential-list" aria-label="Certifications and credentials">
            <li className="credential-entry"><div><h3>CPENT</h3><p>EC-Council</p></div></li>
            <li className="credential-entry"><div><h3>CWSE</h3><p>Hackviser</p></div></li>
            <li className="credential-entry"><div><h3>CAPT</h3><p>Hackviser</p></div></li>
          </ol>
        </div>
      </div>
    </section>

    <section className="afterword" aria-labelledby="afterword-title">
      <div className="afterword-glow" aria-hidden="true"></div>
      <p className="eyebrow reveal">04 / WHAT THE RAIN LEAVES BEHIND</p>
      <h2 id="afterword-title" className="reveal">Let the world hurry.<br /><em>I'll be here.</em></h2>
      <p className="afterword-text reveal">With a song that still hurts.<br />A sky that owes me nothing.<br />And a question I haven't given away.</p>
      <div className="closing-star reveal" aria-hidden="true">✧</div>
      <p className="closing-note reveal">Perhaps that is enough for tonight.</p>
    </section>
  </main>

  <footer><a className="footer-brand" href="#">aryma.rip</a><span>STILL HUMAN. STILL HERE.</span><a href="https://www.linkedin.com/in/worldsavior/" target="_blank" rel="noopener noreferrer">A trace of me <span aria-hidden="true">↗</span></a><small>A personal tribute to Terraria Calamity. Poetry is original.</small></footer>

  <aside className="music-player" data-audio-control="true" aria-label="Soundtrack controls">
    <button id="audio-toggle" className="audio-toggle" type="button" aria-label="Play soundtrack" aria-pressed="false"><span className="sound-bars" aria-hidden="true"><i></i><i></i><i></i><i></i></span></button>
    <div className="track"><span className="track-title">Sky After Rain</span><span id="audio-status" className="track-detail" role="status">INFERNUM · SOUND OFF</span></div>
    <span className="player-divider"></span>
    <label className="volume-label"><span className="sr-only">Music volume</span><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M10 5 5 9H2v6h3l5 4V5Zm4 3c2 2 2 6 0 8m3-11c4 4 4 10 0 14"/></svg><input id="volume" type="range" min="0" max="1" step="0.01" defaultValue="0.45" aria-label="Music volume" /></label>
    <input id="seek" className="seek" type="range" min="0" max="184" defaultValue="0" step="0.05" aria-label="Soundtrack position" disabled />
  </aside>
  <audio id="soundtrack" src="/assets/sky-after-rain.mp3" preload="auto" autoPlay playsInline loop></audio>
  <svg className="filters" aria-hidden="true"><defs><filter id="cloth-wind" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.009 0.012" numOctaves="1" seed="5"><animate attributeName="baseFrequency" dur="9s" values="0.009 0.012;0.012 0.008;0.009 0.012" repeatCount="indefinite"/></feTurbulence><feDisplacementMap in="SourceGraphic" scale="4" xChannelSelector="R" yChannelSelector="G"/></filter></defs></svg>

    </>
  );
}
