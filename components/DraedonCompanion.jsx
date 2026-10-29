"use client";
import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { companionAt } from "../lib/draedon.mjs";
export default function DraedonCompanion() {
  const root = useRef(null);
  const [quote, setQuote] = useState("magnificent");
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let tween,
      frame = 0;
    function update() {
      frame = 0;
      const state = companionAt(
        window.scrollY,
        document.documentElement.scrollHeight - window.innerHeight,
        window.innerHeight,
        motion.matches,
      );
      setQuote(state.quote);
      tween?.pause();
      if (motion.matches) {
        root.current.style.transform = "none";
        return;
      }
      tween = animate(root.current, {
        y: state.y,
        duration: 650,
        ease: "outCubic",
      });
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    motion.addEventListener("change", update);
    return () => {
      cancelAnimationFrame(frame);
      tween?.revert();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motion.removeEventListener("change", update);
    };
  }, []);
  return (
    <aside
      className={`draedon-companion${collapsed ? " companion-collapsed" : ""}`}
      ref={root}
      aria-label="Draedon companion"
      data-draedon-companion
    >
      <button
        className="companion-toggle"
        type="button"
        onClick={() => setCollapsed((v) => !v)}
        aria-expanded={!collapsed}
        aria-label={
          collapsed ? "Show Draedon companion" : "Hide Draedon companion"
        }
      >
        {collapsed ? "TRANSMISSION +" : "−"}
      </button>
      {!collapsed && (
        <>
          <div className="companion-bubble">
            <span>DRAEDON / OBSERVATION</span>
            <p>{quote}</p>
            <i aria-hidden="true" />
          </div>
          <div className="companion-sprite">
            <img
              className="companion-gif"
              src="/assets/draedon-companion.gif"
              width="149"
              height="135"
              alt="Draedon sitting in his hovering chair"
            />
            <img
              className="companion-still"
              src="/assets/draedon-hero.png"
              width="149"
              height="149"
              alt="Draedon in his chair"
            />
          </div>
        </>
      )}
    </aside>
  );
}
