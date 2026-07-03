"use client";

import { useNadir } from "./context";
import styles from "./nadir.module.css";

const MONO = "var(--font-ibm-plex-mono), monospace";
const MAX_TIME = 14 * 24 * 60; // 14 days in minutes

export default function TimelineScrubber() {
  const { clock, onScrub, playing, togglePlay } = useNadir();

  const progress = (clock / MAX_TIME) * 100;

  return (
    <div style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      height: 48,
      background: "#14181C",
      borderTop: "1px solid rgba(255,255,255,0.1)",
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      padding: "0 24px",
      gap: 16,
      color: "#fff"
    }}>
      <button 
        onClick={togglePlay}
        style={{
          background: "transparent", border: "none", color: "#fff", cursor: "pointer",
          fontFamily: MONO, fontSize: 16, width: 32, display: "flex", justifyContent: "center"
        }}
      >
        {playing ? "⏸" : "▶"}
      </button>

      <div style={{ fontFamily: MONO, fontSize: 11, color: "#9aa2ab", width: 45 }}>
        T-{(14 - clock / 60 / 24).toFixed(1)}d
      </div>

      <div style={{ flex: 1, position: "relative", height: 24, display: "flex", alignItems: "center" }}>
        <input
          type="range"
          min={0}
          max={MAX_TIME}
          value={clock}
          onChange={(e) => onScrub(Number(e.target.value))}
          style={{
            width: "100%",
            margin: 0,
            cursor: "pointer",
            appearance: "none",
            background: "rgba(255,255,255,0.2)",
            height: 4,
            borderRadius: 2,
            outline: "none"
          }}
          className={styles.timelineScrubber}
        />
        <div style={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          height: 4,
          background: "#0E7C8A",
          width: `${progress}%`,
          pointerEvents: "none",
          borderRadius: "2px 0 0 2px",
          boxShadow: "0 0 8px rgba(14,124,138,0.8)"
        }} />
      </div>

      <div style={{ fontFamily: MONO, fontSize: 11, color: "#0E7C8A", width: 40, textAlign: "right", fontWeight: 700 }}>
        LIVE
      </div>
    </div>
  );
}
