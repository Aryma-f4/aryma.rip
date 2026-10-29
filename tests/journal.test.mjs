import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
let journal = {},
  markdown = {},
  companion = {};
try {
  journal = await import("../lib/journal.mjs");
} catch {}
try {
  markdown = await import("../lib/markdown.mjs");
} catch {}
try {
  companion = await import("../lib/draedon.mjs");
} catch {}

test("journal publishes only explicit non-drafts, sorted newest first, without leaking templates", async () => {
  assert.equal(typeof journal.getJournalEntries, "function");
  const dir = await mkdtemp(join(tmpdir(), "aryma-journal-"));
  try {
    await writeFile(
      join(dir, "first.md"),
      "---\ntitle: First\ndate: 2026-10-01\n---\nHello",
    );
    await writeFile(
      join(dir, "second.md"),
      "---\ntitle: Second\ndate: 2026-10-03\nkind: idea\n---\nWorld",
    );
    await writeFile(
      join(dir, "draft.md"),
      "---\ntitle: Hidden\ndate: 2026-10-04\ndraft: true\n---\nDraft",
    );
    await writeFile(
      join(dir, "_template.md"),
      "---\ntitle: Template\n---\nPrivate",
    );
    const entries = await journal.getJournalEntries(dir);
    assert.deepEqual(
      entries.map((x) => x.slug),
      ["second", "first"],
    );
    assert.equal(entries[0].kind, "idea");
    assert.equal(await journal.getJournalEntry("../secret", dir), null);
    assert.equal(await journal.getJournalEntry("draft", dir), null);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
test("markdown renders images, tables and highlighted code but no executable HTML or links", async () => {
  assert.equal(typeof markdown.markdownElement, "function");
  const source =
    "![Diagram](/assets/diagram.png)\n\n| a | b |\n| - | - |\n| 1 | 2 |\n\n```js\nconst value = 42;\n```\n\n<script>alert(1)</script>\n\n[bad](javascript:alert(1))";
  const html = renderToStaticMarkup(markdown.markdownElement(source));
  assert.match(html, /<img[^>]+src="\/assets\/diagram.png"/);
  assert.match(html, /<table>/);
  assert.match(html, /hljs-keyword/);
  assert.doesNotMatch(html, /<script|href="javascript:/);
});
test("formatter prettifies supported code fences and preserves invalid or unknown code", async () => {
  assert.equal(typeof markdown.formatMarkdown, "function");
  const formatted = await markdown.formatMarkdown(
    "```js\nconst x={a:1,b:2}\n```",
  );
  assert.match(formatted, /const x = \{ a: 1, b: 2 \};/);
  const broken = "```js\nconst x = {\n```";
  assert.equal((await markdown.formatMarkdown(broken)).trimEnd(), broken);
  const custom = await markdown.formatMarkdown(
    "```unfamiliar\nuntouched :: source\n```",
  );
  assert.match(custom, /untouched :: source/);
});
test("Draedon follows within viewport bounds and reduced motion stays still", () => {
  assert.equal(typeof companion.companionAt, "function");
  assert.equal(companion.companionAt(-50, 1000, 800).y, 0);
  const bottom = companion.companionAt(5000, 1000, 800);
  assert.ok(bottom.y <= 160);
  assert.equal(bottom.quote, "but all fools");
  assert.equal(companion.companionAt(500, 1000, 800, true).y, 0);
  assert.equal(companion.companionAt(0, 0, 800).quote, "magnificent");
});
test("journal rejects executable frontmatter before a parser can run it", async () => {
  const dir = await mkdtemp(join(tmpdir(), "aryma-frontmatter-"));
  try {
    await writeFile(
      join(dir, "unsafe.md"),
      '---javascript\n({title: "Not YAML"})\n---\nBody',
    );
    await assert.rejects(
      journal.getJournalEntries(dir),
      /Only YAML frontmatter/,
    );
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
