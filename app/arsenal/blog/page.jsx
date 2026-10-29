import Link from "next/link";
import { getJournalEntries } from "../../../lib/journal.mjs";
import DraedonCompanion from "../../../components/DraedonCompanion";
import {
  ArsenalHeader,
  ArsenalFooter,
} from "../../../components/ArsenalChrome";
export const metadata = {
  title: "The Journal — aryma.rip",
  description: "Field notes, writing and unfinished ideas.",
};
export default async function Blog() {
  const entries = await getJournalEntries();
  return (
    <>
      <ArsenalHeader detail />
      <main className="arsenal-reader journal-index">
        <p className="arsenal-kicker">THE WORDS BETWEEN THE WIRES</p>
        <h1>
          Notes from
          <br />
          <em>the long way home.</em>
        </h1>
        <p className="journal-intro">
          Some things need to be written slowly.
          <br />
          Some things need to be written at all.
        </p>
        {entries.length ? (
          <div className="journal-list">
            {entries.map((post) => (
              <Link href={`/arsenal/blog/${post.slug}/`} key={post.slug}>
                <span>
                  {post.kind.toUpperCase()} / {post.date} / {post.minutes} MIN
                  READ
                </span>
                <h2>{post.title} ↗</h2>
                <p>{post.excerpt}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="journal-empty">
            <span className="journal-empty-sigil" aria-hidden="true">
              ✧
            </span>
            <p>Nothing transmitted. Yet.</p>
            <span>
              The notebook is still quiet.
              <br />
              The first words will arrive in their own time.
            </span>
          </div>
        )}
      </main>
      <DraedonCompanion />
      <ArsenalFooter />
    </>
  );
}
