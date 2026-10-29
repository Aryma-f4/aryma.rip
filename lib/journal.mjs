import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import matter from "gray-matter";
export const journalDirectory = join(process.cwd(), "content", "journal");
const validSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export async function getJournalEntries(directory = journalDirectory) {
  const files = await readdir(directory);
  const posts = await Promise.all(
    files
      .filter(
        (file) =>
          file.endsWith(".md") && !file.startsWith("_") && file !== "README.md",
      )
      .map(async (file) => {
        const slug = file.slice(0, -3);
        if (!validSlug.test(slug))
          throw new Error(`Use a lowercase dashed filename for ${file}`);
        const raw = await readFile(join(directory, file), "utf8");
        if (raw.startsWith("---") && !/^---\r?\n/.test(raw))
          throw new Error(`Only YAML frontmatter is supported: ${file}`);
        const { data, content } = matter(raw, { language: "yaml" });
        if (data.draft === true) return null;
        if (typeof data.title !== "string" || !data.title.trim())
          throw new Error(`Missing title in ${file}`);
        const date =
          data.date instanceof Date
            ? data.date.toISOString().slice(0, 10)
            : String(data.date ?? "");
        return {
          slug,
          title: data.title,
          excerpt: String(data.excerpt ?? ""),
          date,
          kind: ["idea", "writing", "blog"].includes(data.kind)
            ? data.kind
            : "blog",
          cover: typeof data.cover === "string" ? data.cover : null,
          content,
          minutes: Math.max(1, Math.ceil(content.split(/\s+/).length / 200)),
        };
      }),
  );
  return posts
    .filter(Boolean)
    .sort(
      (a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug),
    );
}
export async function getJournalEntry(slug, directory = journalDirectory) {
  if (!validSlug.test(slug)) return null;
  return (
    (await getJournalEntries(directory)).find((post) => post.slug === slug) ??
    null
  );
}
