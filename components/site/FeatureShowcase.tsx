"use client";

// The "show, don't tell" section: a column of features on the left; click one
// and the visual on the right crossfades to it. Replaces walls of text on the
// platform pages with something a non-technical buyer actually reads.

import { useEffect, useRef, useState } from "react";

const MONO = "var(--font-ibm-plex-mono), monospace";

export interface ShowcaseFeature {
  label: string;
  blurb: string;
  visual: React.ReactNode;
}

export default function FeatureShowcase({ eyebrow, title, features }: { eyebrow?: string; title?: string; features: ShowcaseFeature[] }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // gently advance on its own until the user takes over
  useEffect(() => {
    if (!auto) return;
    // setState here runs on a timer, not synchronously in the effect body
    // eslint-disable-next-line react-hooks/set-state-in-effect
    timer.current = setInterval(() => setActive((a) => (a + 1) % features.length), 4200);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [auto, features.length]);

  return (
    <div style={{ maxWidth: 1040, margin: "0 auto", padding: "80px 48px" }}>
      {eyebrow && <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.14em", color: "#7a848e", marginBottom: 16 }}>{eyebrow}</div>}
      {title && <h2 style={{ fontFamily: "var(--font-newsreader), serif", fontWeight: 400, fontSize: 34, margin: "0 0 40px", letterSpacing: "-0.01em", color: "#14181C" }}>{title}</h2>}
      <div style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 44, alignItems: "center" }} className="showcaseGrid">
        {/* feature list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {features.map((f, i) => {
            const on = i === active;
            return (
              <button
                key={f.label}
                onClick={() => { setActive(i); setAuto(false); }}
                style={{
                  fontFamily: "inherit", textAlign: "left", cursor: "pointer", borderRadius: 12,
                  padding: "16px 18px", background: on ? "#FFFFFF" : "transparent",
                  border: `1px solid ${on ? "rgba(14,124,138,0.4)" : "transparent"}`,
                  borderLeft: `3px solid ${on ? "#0E7C8A" : "rgba(20,24,28,0.12)"}`,
                  boxShadow: on ? "0 12px 30px -18px rgba(20,30,40,0.3)" : "none",
                  transition: "all 0.3s ease",
                }}
              >
                <div style={{ fontSize: 16, fontWeight: 700, color: on ? "#14181C" : "#5a646e", marginBottom: on ? 6 : 0 }}>{f.label}</div>
                <div style={{ fontSize: 13.5, lineHeight: 1.55, color: "#5a646e", maxHeight: on ? 80 : 0, opacity: on ? 1 : 0, overflow: "hidden", transition: "all 0.35s ease" }}>{f.blurb}</div>
              </button>
            );
          })}
        </div>
        {/* crossfading visual */}
        <div style={{ position: "relative", aspectRatio: "16 / 10" }}>
          {features.map((f, i) => (
            <div key={i} style={{ position: "absolute", inset: 0, opacity: i === active ? 1 : 0, transform: i === active ? "none" : "scale(0.98)", transition: "opacity 0.5s ease, transform 0.5s ease", pointerEvents: i === active ? "auto" : "none" }}>
              {f.visual}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
