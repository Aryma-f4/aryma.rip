"use client";
import { useEffect, useRef, useState } from "react";
import { connectSoundtrack } from "../lib/arsenal-soundtrack.mjs";
const clock = (value) =>
  `${Math.floor(value / 60)}:${String(Math.floor(value % 60)).padStart(2, "0")}`;
export default function ArsenalSoundtrack() {
  const audio = useRef(null),
    controller = useRef(null);
  const [state, setState] = useState({
    playing: false,
    blocked: false,
    error: false,
    time: 0,
    duration: 0,
    volume: 0.22,
  });
  useEffect(() => {
    controller.current = connectSoundtrack(audio.current, document, {
      onState: setState,
    });
    return () => {
      controller.current.dispose();
      controller.current = null;
    };
  }, []);
  return (
    <>
      <audio
        ref={audio}
        src="/assets/signal-received.mp3"
        loop
        preload="auto"
        playsInline
      />
      <aside
        className={`arsenal-player ${state.playing ? "is-playing" : ""}`}
        data-audio-control
        aria-label="Arsenal background music"
      >
        <button
          onClick={() => controller.current?.toggle()}
          aria-label={
            state.playing ? "Pause Signal Received" : "Play Signal Received"
          }
        >
          {state.playing ? "Ⅱ" : "▶"}
        </button>
        <div className="arsenal-track-info">
          <span>
            SIGNAL RECEIVED <i>{state.playing ? "●" : "○"}</i>
          </span>
          <small>
            {state.error
              ? "AUDIO UNAVAILABLE"
              : state.playing
                ? "CDMUSIC / DRAEDON’S THEME"
                : state.blocked
                  ? "TAP TO LISTEN"
                  : "CDMUSIC / PAUSED"}
          </small>
          <input
            aria-label="Track position"
            type="range"
            min="0"
            max={state.duration || 1}
            step=".1"
            value={state.time}
            onChange={(event) =>
              controller.current?.seek(Number(event.target.value))
            }
          />
        </div>
        <span className="arsenal-track-time">{clock(state.time)}</span>
        <input
          className="arsenal-volume"
          aria-label="Music volume"
          type="range"
          min="0"
          max="1"
          step=".01"
          value={state.volume}
          onChange={(event) =>
            controller.current?.setVolume(Number(event.target.value))
          }
        />
      </aside>
    </>
  );
}
