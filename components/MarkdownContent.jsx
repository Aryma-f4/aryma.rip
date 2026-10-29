import { formatMarkdown, markdownElement } from "../lib/markdown.mjs";
import CodeBlock from "./CodeBlock";
export default async function MarkdownContent({ source }) {
  const formatted = await formatMarkdown(source);
  return (
    <div className="markdown-body">
      {markdownElement(formatted, {
        pre: ({ node, ...props }) => <CodeBlock {...props} />,
      })}
    </div>
  );
}
