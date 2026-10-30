import ArsenalSoundtrack from "../../components/ArsenalSoundtrack";
import "./arsenal.css";
export const metadata = {
  title: "The Arsenal — aryma.rip",
  description:
    "The third chapter: a signal beneath the ash, field notes, writing and unfinished ideas.",
};
export default function ArsenalLayout({ children }) {
  return (
    <div className="arsenal-world">
      {children}
      <ArsenalSoundtrack />
    </div>
  );
}
