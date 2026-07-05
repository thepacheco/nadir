"use client";

// The Nadir presence — our AI's face. A breathing teal core with the logo dot,
// wrapped in pulsing rings, like Siri's circle or Google's dots. Shared by the
// marketing hero and the workspace chat so the AI reads as one identity
// everywhere. Purely visual; `thinking` speeds it up.

export default function NadirOrb({ size = 64, thinking = false }: { size?: number; thinking?: boolean }) {
  const ringDur = thinking ? "1.3s" : "2.6s";
  const ring = (delay: string): React.CSSProperties => ({
    position: "absolute", inset: 0, borderRadius: "50%",
    border: `1.5px solid ${thinking ? "rgba(14,124,138,0.55)" : "rgba(14,124,138,0.4)"}`,
    animation: `nadirOrbRing ${ringDur} ease-out ${delay} infinite`,
  });
  const core = size * 0.62;
  return (
    <div style={{ position: "relative", width: size, height: size, flex: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={ring("0s")} />
      <span style={ring(thinking ? "0.65s" : "1.3s")} />
      <div
        style={{
          width: core, height: core, borderRadius: "50%",
          background: "radial-gradient(circle at 38% 32%, #17a6b6 0%, #0E7C8A 55%, #0b6470 100%)",
          boxShadow: `0 0 ${size * 0.35}px -${size * 0.12}px rgba(14,124,138,0.8), inset 0 0 ${size * 0.14}px rgba(255,255,255,0.35)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          animation: `nadirOrbCore ${thinking ? "1.1s" : "3s"} ease-in-out infinite`,
        }}
      >
        {/* the logo dot */}
        <span style={{ width: core * 0.26, height: core * 0.26, borderRadius: "50%", background: "#FFFFFF", boxShadow: "0 0 6px rgba(255,255,255,0.9)", animation: `nadirBlink ${thinking ? "0.9s" : "1.8s"} infinite` }} />
      </div>
    </div>
  );
}
