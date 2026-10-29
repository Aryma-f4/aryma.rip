import { notFound } from "next/navigation";
import {
  getJournalEntries,
  getJournalEntry,
} from "../../../../lib/journal.mjs";
import MarkdownContent from "../../../../components/MarkdownContent";
import DraedonCompanion from "../../../../components/DraedonCompanion";
import {
  ArsenalHeader,
  ArsenalFooter,
} from "../../../../components/ArsenalChrome";
export const dynamicParams = false;
// Next static export needs one parameter even when the journal has no posts.
// This reserved, unlisted slug resolves to notFound(), never to a sample article.
export async function generateStaticParams() {
  const posts = await getJournalEntries();
  return posts.length
    ? posts.map((post) => ({ slug: post.slug }))
    : [{ slug: "_empty" }];
}
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getJournalEntry(slug);
  return {
    title: post ? `${post.title} — aryma.rip` : "Not found",
    description: post?.excerpt,
  };
}
export default async function Post({ params }) {
  const { slug } = await params;
  const post = await getJournalEntry(slug);
  if (!post) notFound();
  return (
    <>
      <ArsenalHeader detail />
      <main className="arsenal-reader journal-article">
        <a className="arsenal-breadcrumb" href="/arsenal/blog/">
          ← THE JOURNAL
        </a>
        <header className="journal-article-header">
          <p className="arsenal-kicker">
            {post.kind.toUpperCase()} / {post.date} / {post.minutes} MIN READ
          </p>
          <h1>{post.title}</h1>
          {post.excerpt && <p>{post.excerpt}</p>}
          {post.cover && (
            <img className="journal-cover" src={post.cover} alt="" />
          )}
        </header>
        <MarkdownContent source={post.content} />
        <div className="article-end">
          <span>✧</span>
          <a href="/arsenal/blog/">Back to the journal →</a>
        </div>
      </main>
      <DraedonCompanion />
      <ArsenalFooter />
    </>
  );
}
