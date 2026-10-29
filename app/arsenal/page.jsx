import DraedonHero from "../../components/DraedonHero";
import {
  ArsenalHeader,
  ArsenalFooter,
  ArsenalSigil,
} from "../../components/ArsenalChrome";
import TextAtmosphere from "../../components/TextAtmosphere";
import { tools } from "../../lib/arsenal.mjs";
import { getJournalEntries } from "../../lib/journal.mjs";
export default async function Arsenal() {
  const entries = await getJournalEntries();
  const ideas = entries.filter((post) => post.kind === "idea");
  return (
    <>
      <TextAtmosphere />
      <a className="skip" href="#creations">
        Skip to the creations
      </a>
      <ArsenalHeader />
      <main>
        <section className="arsenal-hero" aria-labelledby="arsenal-title">
          <div className="arsenal-stars" aria-hidden="true" />
          <div className="arsenal-storm" aria-hidden="true" />
          <div className="arsenal-hero-copy">
            <p className="arsenal-kicker">III / THE WORKBENCH AFTER THE END</p>
            <h1 id="arsenal-title">
              An arsenal of things
              <br />
              <em>I made instead.</em>
            </h1>
            <p className="arsenal-intro">
              Tools, unfinished thoughts, and the stubborn need
              <br className="desktop-break" /> to make something of my own.
            </p>
            <a href="#creations" className="arsenal-explore">
              <span>EXPLORE THE ARSENAL</span>
              <span aria-hidden="true">↓</span>
            </a>
            <div className="arsenal-hero-note">
              <span>01 / STILL BUILDING</span>
              <p>
                The world learned to make everything.
                <br />I am still learning to make something matter.
              </p>
            </div>
          </div>
          <DraedonHero />
          <span className="arsenal-coordinate">NO GODS. ONLY QUESTIONS.</span>
        </section>
        <section
          id="creations"
          className="arsenal-section"
          aria-labelledby="creations-title"
        >
          <div className="arsenal-section-head">
            <div>
              <p className="arsenal-kicker">01 / MACHINES WITH A PURPOSE</p>
              <h2 id="creations-title">
                Things I have <em>set in motion.</em>
              </h2>
            </div>
            <p>
              A few instruments for looking closer.
              <br />
              The source is open. The questions remain.
            </p>
          </div>
          <div className="arsenal-tools">
            {tools.map((tool) => (
              <a
                className="arsenal-tool"
                href={`/arsenal/tools/${tool.slug}/`}
                key={tool.slug}
              >
                <span className="arsenal-tool-number">/{tool.number}</span>
                <ArsenalSigil type={tool.motif} />
                <div className="arsenal-tool-copy">
                  <span className="arsenal-tool-kind">{tool.kind}</span>
                  <h3>{tool.name}</h3>
                  <p>{tool.description}</p>
                  <span className="arsenal-language">
                    {tool.language}
                    <i />
                    SOURCE AVAILABLE
                  </span>
                </div>
                <span className="arsenal-tool-arrow" aria-label="Open project">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </section>
        <section
          className="arsenal-journal-gate arsenal-section"
          aria-labelledby="journal-title"
        >
          <div className="journal-symbol" aria-hidden="true">
            ✧
          </div>
          <div>
            <p className="arsenal-kicker">02 / THE WORDS BETWEEN THE WIRES</p>
            <h2 id="journal-title">
              Not everything I make
              <br />
              <em>is a machine.</em>
            </h2>
            <p>
              Field notes. Long nights. Things that needed
              <br />
              to be written before they could be understood.
            </p>
            <a href="/arsenal/blog/" className="arsenal-text-link">
              Enter the journal <span>↗</span>
            </a>
          </div>
          <span className="journal-gate-count">
            {String(entries.length).padStart(2, "0")}
            <small>TRANSMISSIONS</small>
          </span>
        </section>
        <section
          className="arsenal-ideas arsenal-section"
          aria-labelledby="ideas-title"
        >
          <div className="arsenal-section-head">
            <div>
              <p className="arsenal-kicker">03 / STILL ON THE WORKBENCH</p>
              <h2 id="ideas-title">
                Before an idea
                <br />
                <em>becomes a machine.</em>
              </h2>
            </div>
            <p>
              Some thoughts are still allowed
              <br />
              to be questions.
            </p>
          </div>
          {ideas.length ? (
            <div className="journal-list">
              {ideas.map((post) => (
                <a href={`/arsenal/blog/${post.slug}/`} key={post.slug}>
                  <span>IDEA / {post.date}</span>
                  <h3>{post.title} ↗</h3>
                  <p>{post.excerpt}</p>
                </a>
              ))}
            </div>
          ) : (
            <div className="arsenal-empty-idea">
              <span aria-hidden="true">[ &nbsp; &nbsp; ]</span>
              <p>
                The next idea is still taking shape.
                <br />
                <em>I will leave it a little room.</em>
              </p>
            </div>
          )}
        </section>
        <div className="arsenal-coda">
          <span>✧</span>
          <p>
            Even in a world of perfect machines,
            <br />
            <em>the unfinished things are mine.</em>
          </p>
          <a href="/">Back to the rain →</a>
        </div>
      </main>
      <ArsenalFooter />
    </>
  );
}
