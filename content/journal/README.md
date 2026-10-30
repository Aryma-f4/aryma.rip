# Writing in the journal

The journal includes the explicitly requested poetic example, `the-things-i-could-not-automate.md`, marked as a sample within the article. Edit or remove it whenever you want. `_template.md` remains a private draft and is never a public article.

1. Copy `_template.md` to a lowercase dashed filename, such as `a-question-worth-keeping.md`.
2. Fill in the YAML metadata and write below the closing `---`.
3. Put images in `public/assets/journal/` and reference them as `/assets/journal/name.png`.
4. Preview with `npm run dev`, then open `/arsenal/blog/`.
5. Set `draft: false` when ready, commit and push. A Vercel deployment builds the new static article automatically.

```yaml
---
title: "A question worth keeping"
date: "2026-10-30"
excerpt: "A short introduction to the piece."
kind: blog
draft: false
cover: /assets/journal/cover.png
---
```

`kind` can be `blog`, `writing`, or `idea`. Published ideas also appear in the Arsenal's workbench section. Use `draft: true` to keep a post out of the index and direct article routes. Filenames beginning with `_` and this README are ignored.

## Images, code and tables

```markdown
![A useful description](/assets/journal/example.png)

~~~javascript
const question = { worthKeeping: true };
console.log(question);
~~~

| Question | Observation |
| --- | --- |
| What changed? | Something worth checking. |
```

Images stay within the reading column; wide tables and code blocks scroll horizontally. Code fences use their language for syntax highlighting and have a Copy button. JavaScript, TypeScript, JSON, CSS and other Prettier-supported embedded languages are formatted at build time. Unsupported or invalid code remains readable and is not executed. For Go/Rust formatting, format the source with the language's own formatter before pasting it; syntax highlighting still works.

Markdown supports headings, lists, block quotes, links, GFM tables and task lists. Raw HTML and executable MDX are intentionally not rendered. Frontmatter is YAML only. Do not use JavaScript frontmatter. There is no admin login or database to maintain.

The blog index and articles include the optional Draedon scroll companion. The Arsenal index does not. Readers can hide him with the small minus button; reduced motion shows a still illustration instead of the animated GIF.

Next's static export requires a generated parameter even when there are no articles. A reserved `_empty` route resolves to the normal not-found page and is never listed as a post.
