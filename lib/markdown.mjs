import { createElement } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { format } from "prettier";
export async function formatMarkdown(source) {
  try {
    return await format(source, {
      parser: "markdown",
      proseWrap: "preserve",
      embeddedLanguageFormatting: "auto",
      printWidth: 90,
    });
  } catch {
    return source;
  }
}
export function markdownElement(source, components = {}) {
  return createElement(
    Markdown,
    {
      skipHtml: true,
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        [rehypeHighlight, { detect: false, ignoreMissing: true }],
      ],
      components: {
        img: ({ node, ...props }) =>
          createElement("img", {
            ...props,
            loading: "lazy",
            decoding: "async",
          }),
        a: ({ node, href, ...props }) =>
          createElement("a", {
            ...props,
            href,
            ...(/^https?:\/\//.test(href ?? "")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {}),
          }),
        table: ({ node, ...props }) =>
          createElement(
            "div",
            { className: "markdown-table" },
            createElement("table", props),
          ),
        ...components,
      },
    },
    source,
  );
}
