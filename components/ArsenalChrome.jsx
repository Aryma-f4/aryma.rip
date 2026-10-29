import { SignalMusicCredit } from "./MusicCredits";
import Link from "next/link";
export function ArsenalHeader({ detail = false }) {
  return (
    <header className="arsenal-header">
      <a href="/" className="arsenal-brand">
        aryma<span>.rip</span>
      </a>
      <span className="arsenal-header-rule" />
      <span className="arsenal-header-note">the things left unfinished</span>
      <Link
        className="arsenal-back"
        href={detail ? "/arsenal/" : "/trace-of-me/"}
      >
        {detail ? "← THE ARSENAL" : "A TRACE OF ME ↗"}
      </Link>
    </header>
  );
}
export function ArsenalFooter() {
  return (
    <footer className="arsenal-footer">
      <a href="/">aryma.rip</a>
      <p>BUILT IN THE HOURS THAT STILL BELONG TO ME.</p>
      <div>
        <Link href="/arsenal/">The arsenal</Link>
        <Link href="/arsenal/blog/">The journal</Link>
        <a href="/">After the rain ↗</a>
      </div>
      <SignalMusicCredit />
      <small>
        A personal Calamity tribute. Draedon pixel animation supplied by Aryma;
        hero illustration made for this site.
      </small>
    </footer>
  );
}
export function ArsenalSigil({ type = "proxy" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className="arsenal-sigil"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="37" />
      <circle cx="50" cy="50" r="28" strokeDasharray="1 8" />
      {type === "proxy" ? (
        <>
          <path d="M20 50h18m24 0h18M42 34l-9 16 9 16m16-32 9 16-9 16M54 30l-8 40" />
          <path d="M50 5v12m0 66v12M5 50h12m66 0h12" />
        </>
      ) : (
        <>
          <path d="M29 35V25h10m22 0h10v10m0 30v10H61m-22 0H29V65M22 50h56" />
          <circle cx="50" cy="50" r="13" />
          <path d="M50 32v36" />
        </>
      )}
    </svg>
  );
}
