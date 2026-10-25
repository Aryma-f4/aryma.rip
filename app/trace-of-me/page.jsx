import BlinkEyes from "../../components/BlinkEyes";
import BlinkController from "../../components/BlinkController";
import TraceController from '../../components/TraceController';
import { advisories } from '../../lib/advisories.mjs';

export const metadata = {
  title: 'A trace of me — aryma.rip',
  description: 'What survives the fire: a person, a few tools, and the questions that became public disclosures.',
};

export default function TraceOfMe() {
  return <div className="trace-page">
    <TraceController />
    <BlinkController selector=".trace-avatar-figure" />
    <a className="skip" href="#about">Skip to the archive</a>
    <main>
      <section className="trace-hero" aria-labelledby="trace-title">
        <div className="trace-layered-scene" role="img" aria-label="A wounded, blue-haired survivor in glasses and a torn black shirt, with a living Exo Mech towering over a burning city.">
          <img className="trace-art" src="/assets/trace-city.png" alt="" fetchPriority="high" />
          <div className="exo-rig" aria-hidden="true">
            <img className="exo-body" src="/assets/trace-exo.png" alt="" />
            <div className="exo-cannon"><img src="/assets/trace-exo.png" alt="" /></div>
            <span className="exo-core"></span><span className="exo-burst"></span>
          </div>
          <div className="trace-fireglow" aria-hidden="true"></div>
          <div className="trace-avatar trace-avatar-figure"><img src="/assets/trace-avatar.png" alt="" /><BlinkEyes pose="avatar" /></div>
        </div>
        <div className="trace-shade" aria-hidden="true"></div>
        <div className="trace-embers" aria-hidden="true">{Array.from({length:24},(_,i)=><i key={i} style={{'--i':i}} />)}</div>
        <div className="identity"><a href="/">aryma<span>.rip</span></a><span className="identity-line"></span><span className="identity-note">a trace of me</span></div>
        <a href="/" className="return-rain">← Back to the rain</a>
        <div className="trace-hero-copy">
          <p className="eyebrow">THE WORLD BURNED. I REMEMBERED.</p>
          <h1 id="trace-title">Something of me <br /><em>survived the fire.</em></h1>
          <p>Not untouched. Not unafraid.<br />Just still here, asking why.</p>
          <a className="trace-enter" href="#about">Follow what remains <span>↓</span></a>
        </div>
        <span className="trace-scene-label">02 / THE REMAINS</span>
      </section>
      <section className="personal-archive trace-about" id="about" aria-labelledby="about-title">
        <div className="section-mark"><span>01</span><span className="rule"></span><span>THE PERSON IN THE ASH</span></div>
        <div className="archive-layout">
          <div className="archive-heading"><h2 id="about-title">A little less certain.<br /><em>Still curious.</em></h2></div>
          <div className="trace-prose"><p>I'm Aryma. I build security tools and look for the places where a system's promises come apart.</p><p>I miss learning slowly. The wrong turns. The stubborn little questions that keep a light on long after everyone else has gone to sleep.</p><p>These are a few traces of that person. Work in progress. Lessons carried. Things found, and brought into the light.</p><div className="trace-social"><a href="https://github.com/Aryma-f4" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/worldsavior/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div></div>
        </div>
      </section>
    <section className="personal-archive" id="working-with" aria-labelledby="working-title">
      <div className="section-mark"><span>02</span><span className="rule"></span><span>THE THINGS I REACH FOR</span></div>
      <div className="archive-layout">
        <div className="archive-heading">
          <h2 id="working-title">What I'm<br /><em>working with.</em></h2>
          <p>The tools change.<br />The need to understand remains.</p>
        </div>
        <div className="archive-content">
          {/* Add real tools as <li className="tool-entry"><span>Tool name</span><span>What I use it for</span></li>. */}
          <ul className="tool-list" aria-label="Tools and technologies">
            <li className="tool-entry">
              <span><a href="https://github.com/Aryma-f4/gulpsuite" target="_blank" rel="noopener noreferrer">Gulpsuite ↗</a></span>
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
        <div className="archive-heading">
          <h2 id="certifications-title">Certifications<span className="gold-period">.</span></h2>
          <p>Small milestones.<br />Long nights behind them.</p>
        </div>
        <div className="archive-content">
          {/* Add verified credentials here. See README.md for the entry template. */}
          <ol className="credential-list" aria-label="Certifications and credentials">
            <li className="credential-entry"><div><h3>CPENT</h3><p>EC-Council</p></div></li>
            <li className="credential-entry"><div><h3>CWSE</h3><p>Hackviser</p></div></li>
            <li className="credential-entry"><div><h3>CAPT</h3><p>Hackviser</p></div></li>
          </ol>
        </div>
      </div>
    </section>


      <section className="personal-archive disclosures" id="disclosures" aria-labelledby="disclosures-title">
        <div className="section-mark"><span>04</span><span className="rule"></span><span>THINGS BROUGHT INTO THE LIGHT</span></div>
        <div className="archive-layout">
          <div className="archive-heading"><h2 id="disclosures-title">Published<br /><em>disclosures.</em></h2><p>Six traces of looking closer.<br />March, 2026.</p></div>
          <ol className="disclosure-list">{advisories.map(item=><li key={item.id}><a href={item.url} target="_blank" rel="noopener noreferrer"><div className="disclosure-meta"><span>{item.project}</span><time>{item.week}</time></div><h3>{item.id}<span aria-hidden="true">↗</span></h3><p>{item.title}</p></a></li>)}</ol>
        </div>
      </section>
      <div className="trace-ending"><span>✧</span><p>Even here,<br /><em>something human remains.</em></p><a href="/">Return to the quiet →</a></div>
    </main>
    <footer><a className="footer-brand" href="/">aryma.rip</a><span>STILL HUMAN. STILL HERE.</span><a href="/">Back to the rain <span>↗</span></a><small>A personal tribute to Terraria Calamity.</small></footer>
    <aside className="music-player trace-player" data-audio-control="true" aria-label="Interlude soundtrack controls">
      <button id="trace-toggle" className="audio-toggle" type="button" aria-label="Play interlude" aria-pressed="false"><span className="sound-bars" aria-hidden="true"><i></i><i></i><i></i><i></i></span></button>
      <div className="track"><span className="track-title">Catastrophes before the calamity</span><span id="trace-status" className="track-detail" role="status">INTERLUDE 03 · SOUND OFF</span></div>
      <label className="volume-label"><span className="sr-only">Interlude volume</span><input id="trace-volume" type="range" min="0" max="1" step="0.01" defaultValue="0.4" aria-label="Interlude volume" /></label>
      <input id="trace-seek" className="seek" type="range" min="0" max="1" step="0.05" defaultValue="0" aria-label="Interlude position" disabled />
    </aside>
    <audio id="trace-audio" src="/assets/catastrophes-before-the-calamity.mp3" autoPlay playsInline loop preload="auto" />
  </div>;
}
