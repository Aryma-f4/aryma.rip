"use client";
import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
export default function DraedonHero() {
  const actor = useRef(null);
  const [quote, setQuote] = useState("magnificent");
  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let animation, timer;
    function setup() {
      animation?.revert();
      clearInterval(timer);
      if (motion.matches) return;
      animation = animate(actor.current, {
        y: [4, -8],
        rotate: [-0.25, 0.25],
        duration: 3900,
        alternate: true,
        loop: true,
        ease: "inOutSine",
      });
      timer = setInterval(
        () =>
          setQuote((q) =>
            q === "magnificent" ? "but all fools" : "magnificent",
          ),
        6200,
      );
    }
    setup();
    motion.addEventListener("change", setup);
    return () => {
      animation?.revert();
      clearInterval(timer);
      motion.removeEventListener("change", setup);
    };
  }, []);
  return (
    <figure
      className="draedon-hero"
      aria-label="Draedon seated in a hovering mechanical chair"
    >
      <div className="draedon-orbit" aria-hidden="true">
        <i />
        <i />
        <span className="orbit-coordinate">23° 41′ / NO KNOWN HEAVEN</span>
      </div>
      <div className="draedon-hero-actor" ref={actor}>
        <div className="draedon-thruster" aria-hidden="true" />
        <img
          src="/assets/draedon-hero.png"
          alt="Draedon, a bronze-armored engineer, seated thoughtfully at a cyan console in his hover chair"
          width="1024"
          height="1024"
          fetchPriority="high"
        />
      </div>
      <div className="draedon-hologram" aria-hidden="true">
        <span>OBSERVATION // 001</span>
        <svg viewBox="0 0 160 60">
          <path d="M0 42H24L31 34l8 14 11-27 10 35 13-45 14 31h30l8-12 12 12h23" />
        </svg>
        <span>THE MACHINE IS LISTENING</span>
      </div>
      <figcaption className="hero-transmission">
        <span className="transmission-led" />
        <span>INCOMING TRANSMISSION</span>
        <q key={quote}>{quote}</q>
      </figcaption>
    </figure>
  );
}
