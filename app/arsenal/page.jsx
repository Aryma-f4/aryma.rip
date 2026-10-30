import Link from "next/link";
import DraedonLab from "../../components/DraedonLab";
import DraedonHero from "../../components/DraedonHero";
import { ArsenalHeader, ArsenalFooter } from "../../components/ArsenalChrome";
import TextAtmosphere from "../../components/TextAtmosphere";
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
          <DraedonLab />
          <div className="arsenal-hero-copy">
            <p className="arsenal-kicker">III / THE WORKBENCH AFTER THE END</p>
            <h1 id="arsenal-title">
              An arsenal of things
              <br />
              <em>I made instead.</em>
            </h1>
            <p className="arsenal-intro">
              I followed the signal beneath the ash.
              <br className="desktop-break" /> Here, even silence was still
              being built.
            </p>
            <a href="#creations" className="arsenal-explore">
              <span>EXPLORE THE ARSENAL</span>
              <span aria-hidden="true">↓</span>
            </a>
            <div className="arsenal-hero-note">
              <span>FROM THE RAIN, THROUGH THE ASH</span>
              <p>
                The city had taught me what a machine could take.
                <br />I came here to ask what was still mine to make.
              </p>
            </div>
          </div>
          <DraedonHero />
          <span className="arsenal-coordinate">NO GODS. ONLY QUESTIONS.</span>
        </section>
        <section
          id="creations"
          className="arsenal-section arsenal-arrival"
          aria-labelledby="creations-title"
        >
          <div className="arsenal-section-head">
            <div>
              <p className="arsenal-kicker">01 / WHERE THE SIGNAL LED</p>
              <h2 id="creations-title">
                The machines remembered how.
                <br />
                <em>I was still looking for why.</em>
              </h2>
            </div>
            <div className="arsenal-arrival-prose">
              <p>
                Draedon called it magnificent. Behind the glass, four perfect
                answers waited for a question no one had asked.
              </p>
              <p>
                I had come from a city that learned what an answer could cost.
                The rain had given me somewhere to grieve. The ash had given me
                a name to carry. Here, I wanted to learn what I could make
                without losing the person making it.
              </p>
              <p>
                This is where I keep the thoughts that survive the noise. Some
                unfinished things are waiting to be understood.
              </p>
            </div>
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
              What the machines
              <br />
              <em>could not keep.</em>
            </h2>
            <p>
              Words that took the long way here.
              <br />
              Field notes, fragments, and unfinished ideas.
            </p>
            <Link href="/arsenal/blog/" className="arsenal-text-link">
              Enter the journal <span>↗</span>
            </Link>
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
                <Link href={`/arsenal/blog/${post.slug}/`} key={post.slug}>
                  <span>IDEA / {post.date}</span>
                  <h3>{post.title} ↗</h3>
                  <p>{post.excerpt}</p>
                </Link>
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
            The signal led me here.
            <br />
            <em>The rain still knows my way home.</em>
          </p>
          <a href="/trace-of-me/">Return through the ash →</a>
        </div>
      </main>
      <ArsenalFooter />
    </>
  );
}
