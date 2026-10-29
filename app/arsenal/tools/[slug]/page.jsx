import { notFound } from "next/navigation";
import { tools, toolBySlug } from "../../../../lib/arsenal.mjs";
import DraedonCompanion from "../../../../components/DraedonCompanion";
import {
  ArsenalHeader,
  ArsenalFooter,
  ArsenalSigil,
} from "../../../../components/ArsenalChrome";
export const dynamicParams = false;
export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tool = toolBySlug(slug);
  return { title: tool ? `${tool.name} — The Arsenal` : "Not found" };
}
export default async function ToolPage({ params }) {
  const { slug } = await params;
  const tool = toolBySlug(slug);
  if (!tool) notFound();
  return (
    <>
      <ArsenalHeader detail />
      <main className="arsenal-reader">
        <a className="arsenal-breadcrumb" href="/arsenal/">
          THE ARSENAL <span>/</span> TOOLS <span>/</span> {tool.name}
        </a>
        <header className="tool-detail-hero">
          <p className="arsenal-kicker">
            INSTRUMENT {tool.number} / {tool.language.toUpperCase()}
          </p>
          <ArsenalSigil type={tool.motif} />
          <h1>{tool.name}</h1>
          <p className="tool-detail-tagline">{tool.tagline}</p>
          <p className="tool-detail-intro">{tool.intro}</p>
          <a
            className="arsenal-repo-button"
            href={tool.repo}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open source on GitHub <span>↗</span>
          </a>
        </header>
        <div className="tool-detail-body">
          {tool.sections.map((section, i) => (
            <section key={section.title}>
              <span className="arsenal-kicker">OBSERVATION / 0{i + 1}</span>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </section>
          ))}
          <section>
            <span className="arsenal-kicker">SYSTEM SIGNATURE</span>
            <ul className="tool-signals">
              {tool.signals.map((signal) => (
                <li key={signal}>{signal}</li>
              ))}
            </ul>
            <p className="tool-source-note">
              Features and instructions are maintained in the{" "}
              <a href={tool.repo} target="_blank" rel="noopener noreferrer">
                project repository ↗
              </a>
              .
            </p>
          </section>
          <a href="/arsenal/" className="arsenal-text-link">
            ← Return to the workbench
          </a>
        </div>
      </main>
      <DraedonCompanion />
      <ArsenalFooter />
    </>
  );
}
