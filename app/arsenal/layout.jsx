import "./arsenal.css";
export const metadata = {
  title: "The Arsenal — aryma.rip",
  description:
    "Tools, field notes and unfinished ideas from Aryma’s workbench.",
};
export default function ArsenalLayout({ children }) {
  return <div className="arsenal-world">{children}</div>;
}
