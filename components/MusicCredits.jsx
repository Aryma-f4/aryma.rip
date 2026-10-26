const sources = {
  sky: 'https://www.youtube.com/watch?v=zu9OVFLFV9A',
  interlude: 'https://www.youtube.com/watch?v=zYZiXsDGfpU',
  album: 'https://dmdokuro.bandcamp.com/track/catastrophes-before-the-calamity',
};

export default function MusicCredits({ current }) {
  return <details className="music-credits" open>
    <summary>Music &amp; ambience credits <span aria-hidden="true">⌄</span></summary>
    <div className="music-credit-grid">
      <article>
        <p className="credit-context">INFERNUM MOD · TITLE THEME {current==='sky'&&<span>ON THIS PAGE</span>}</p>
        <h3>ฟ้าหลังฝน (Sky After Rain)</h3>
        <p>Music &amp; lyrics: <strong>PinpinNeon</strong><br />Vocals: <strong>SOLARIA</strong></p>
        <a href={sources.sky} target="_blank" rel="noopener noreferrer">PinpinNeon’s original upload <span aria-hidden="true">↗</span></a>
      </article>
      <article>
        <p className="credit-context">CALAMITY MOD · INTERLUDE 03 {current==='interlude'&&<span>ON THIS PAGE</span>}</p>
        <h3>Catastrophes Before the Calamity</h3>
        <p>Composed &amp; produced by <strong>DM DOKURO</strong><br /><em>The Tale of a Cruel World (Calamity Original Soundtrack)</em></p>
        <div className="credit-links"><a href={sources.interlude} target="_blank" rel="noopener noreferrer">Official artist release <span aria-hidden="true">↗</span></a><a href={sources.album} target="_blank" rel="noopener noreferrer">Bandcamp &amp; full recording credits <span aria-hidden="true">↗</span></a></div>
      </article>
      <p className="rain-credit">Home rain ambience: synthesized and filtered for this website. It is a separate sound layer, not part of either original recording.</p>
    </div>
  </details>;
}
