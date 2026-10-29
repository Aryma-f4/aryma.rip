"use client";
import { useRef, useState, useEffect } from "react";
export default function CodeBlock({ children }) {
  const pre = useRef(null),
    timer = useRef(null);
  const [status, setStatus] = useState("Copy");
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    try {
      await navigator.clipboard.writeText(pre.current?.innerText ?? "");
      setStatus("Copied");
    } catch {
      setStatus("Select to copy");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("Copy"), 1800);
  }
  return (
    <div className="code-block">
      <div className="code-block-bar">
        <span>TERMINAL / SOURCE</span>
        <button type="button" onClick={copy} aria-label="Copy code">
          {status}
        </button>
      </div>
      <pre ref={pre} tabIndex={0}>
        {children}
      </pre>
    </div>
  );
}
