export const tools = [
  {
    slug: "gulpsuite",
    name: "Gulpsuite",
    number: "01",
    language: "Rust",
    kind: "WEB SECURITY WORKBENCH",
    tagline: "A little less waiting. A little more looking.",
    description:
      "A free, native web security toolkit built in Rust, inspired by Burp Suite Pro.",
    repo: "https://github.com/Aryma-f4/gulpsuite",
    motif: "proxy",
    intro:
      "A workbench for looking closer at the conversations a web application has with the world. Requests, responses, and the assumptions hiding between them.",
    sections: [
      {
        title: "A place to intercept the ordinary.",
        body: "Gulpsuite brings web application testing into a native Rust desktop workbench. The project includes HTTP, HTTPS and WebSocket interception, request manipulation, and automated DAST scanning.",
      },
      {
        title: "Keep the investigation in your hands.",
        body: "The repository is the living record: source, release notes, installation instructions, and the current feature set. This page is a small doorway into that work, rather than a promise that every answer is already there.",
      },
    ],
    signals: [
      "Native Rust desktop workbench",
      "HTTP / HTTPS / WebSocket proxy",
      "Request manipulation & DAST scanning",
    ],
  },
  {
    slug: "worldshellfinder",
    name: "WorldShellFinder",
    number: "02",
    language: "Go",
    kind: "DEFENSIVE FILE ANALYSIS",
    tagline: "Some things are not supposed to be there.",
    description:
      "A Go-based tool for finding suspicious web shells and backdoors in web roots and source directories.",
    repo: "https://github.com/Aryma-f4/worldshellfinder",
    motif: "scanner",
    intro:
      "A quiet search through the files a system has learned to trust. Looking for the small line that does not belong, and keeping the evidence beside it.",
    sections: [
      {
        title: "Look for patterns. Keep the context.",
        body: "WorldShellFinder combines keyword matching, regex rules, and heuristic scoring. Its output pairs suspicion scores with evidence, helping a reviewer decide where to look next.",
      },
      {
        title: "A finding begins a question.",
        body: "It is a defensive inspection tool, not a substitute for reviewing a suspicious file. False positives and false negatives remain possible. The source repository documents its detection approach, usage, and current coverage.",
      },
    ],
    signals: [
      "Go command-line tool",
      "Keywords, regex & heuristic scoring",
      "Suspicion scores with evidence summaries",
    ],
  },
];
export const toolBySlug = (slug) =>
  tools.find((tool) => tool.slug === slug) ?? null;
