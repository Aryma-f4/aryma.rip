import AshWords from "../../components/AshWords";
import TextAtmosphere from "../../components/TextAtmosphere";
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
    <TextAtmosphere />
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
          <p className="eyebrow">THE WORLD MOVED ON. SOME PART OF ME DIDN'T.</p>
          <h1 id="trace-title" data-ash-title><AshWords text="I came back." /><br /><em><AshWords text="Not all of me did." /></em></h1>
          <p>Some nights, surviving feels like<br />carrying a home that no longer exists.</p>
          <a className="trace-enter" href="#about">Follow what remains <span>↓</span></a>
        </div>
        <span className="trace-scene-label">02 / THE REMAINS</span>
      </section>
      <section className="lore" aria-labelledby="lore-title">
        <div className="section-mark"><span>00</span><span className="rule"></span><span>A MEMORY FROM ANOTHER WORLD</span></div>
        <div className="lore-intro">
          <p className="lore-preface" data-ash-block>When I cannot explain this world, I remember another.</p>
          <h2 id="lore-title" data-ash-title><AshWords text="The machines kept the city." /><br /><em><AshWords text="They did not keep us." /></em></h2>
        </div>
        <div className="lore-fragments">
          <span className="lore-thread" data-ash-thread aria-hidden="true"></span>
          <article className="lore-fragment" data-ash-block>
            <span className="lore-index">I / THE PROMISE</span>
            <h3>We asked to be spared the difficult things.</h3>
            <p>First the work. Then the waiting. Then the uncertainty. Above the roofs, the Exo Mechs kept their perfect watch, and we learned to sleep beneath the sound of something that never needed to rest.</p>
            <p>I left a half-finished program open that evening. I remember being annoyed with myself for not understanding it yet. Such a small, ordinary sadness. I would give a great deal to have it back.</p>
          </article>
          <article className="lore-fragment" data-ash-block>
            <span className="lore-index">II / THE FIRE</span>
            <h3>The engines did not sound different.</h3>
            <p>That is what I remember most. When the weapons turned toward the streets, there was no anger in them. No hesitation either. A window became light. A room became weather. Somewhere, the screen with my unfinished work went dark.</p>
            <p>I came out with ash in my collar and a name I could still answer to. For a long time, I mistook that for having brought myself home.</p>
          </article>
          <article className="lore-fragment" data-ash-block>
            <span className="lore-index">III / THE RAIN</span>
            <h3>Beyond the reactors, someone was singing.</h3>
            <p>Calamitas sat where the last warm ground met the rain. The hands that had called down brimstone were empty. In the water on her face, the fire had become something too small to hurt anyone.</p>
            <p>I never asked who the song was for. Some nights, a voice is all that stands between a memory and its disappearance. I stayed until the words were gone. The rain kept their place.</p>
            <a className="lore-return" href="/">Somewhere, she is still singing <span aria-hidden="true">↗</span></a>
          </article>
        </div>
        <p className="lore-coda" data-ash-block>What follows belongs to this world.<br />The habit of looking for fractures came back with me.</p>
      </section>
      <section className="personal-archive trace-about" id="about" aria-labelledby="about-title">
        <div className="section-mark"><span>01</span><span className="rule"></span><span>THE PERSON IN THE ASH</span></div>
        <div className="archive-layout">
          <div className="archive-heading"><h2 id="about-title" data-ash-title><AshWords text="I remember wanting" /><br /><em><AshWords text="to become someone." /></em></h2></div>
          <div className="trace-prose">
            <p data-ash-block>I'm Aryma. I build security tools and look for the places where a system's promises come apart. It is easier, sometimes, to name what is broken in a machine.</p>
            <p data-ash-block>I miss the version of me who could spend a whole evening on one small problem and call it a good day. The room would go dark around the screen. Somewhere between the wrong turns, I would understand a little more. That used to feel like enough.</p>
            <p data-ash-block>Now the answers arrive before I have learned how to ask. The world calls it progress. I keep thinking about everything we used to become while taking the long way there.</p>
            <p data-ash-block>I still open the editor. Some nights from curiosity; some nights because I do not know where else to put the person I was going to be. What follows is a small record of those hours. A few things made. A few things found. Evidence that I was here, paying attention.</p>
            <div className="trace-social"><a href="https://github.com/Aryma-f4" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/worldsavior/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div></div>
        </div>
      </section>
    <section className="personal-archive" id="working-with" aria-labelledby="working-title">
      <div className="section-mark"><span>02</span><span className="rule"></span><span>THE THINGS I REACH FOR</span></div>
      <div className="archive-layout">
        <div className="archive-heading">
          <h2 id="working-title">What I'm<br /><em>working with.</em></h2>
          <p>Things I keep making<br />when I cannot explain<br />what I am trying to hold on to.</p>
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
          <p>A few letters after long nights.<br />They remember what I learned.<br />I remember the room, and the hour.</p>
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
          <div className="archive-heading"><h2 id="disclosures-title">Published<br /><em>disclosures.</em></h2><p>Six fractures I could give a name to.<br />For once, looking closer<br />left something I could point to.<br />March, 2026.</p></div>
          <ol className="disclosure-list">{advisories.map(item=><li key={item.id}><a href={item.url} target="_blank" rel="noopener noreferrer"><div className="disclosure-meta"><span>{item.project}</span><time>{item.week}</time></div><h3>{item.id}<span aria-hidden="true">↗</span></h3><p>{item.title}</p></a></li>)}</ol>
        </div>
      </section>
      <div className="trace-ending"><span>✧</span><p>The fire has gone quiet.<br /><em>I still hear what it took.</em></p><p className="trace-ending-note">Some things do not need to be repaired tonight.<br />Only remembered, without being asked<br />to become useful.</p><a href="/">Return to the quiet →</a></div>
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
