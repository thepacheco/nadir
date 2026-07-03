export default function Logo({ size = 24, dot = 6, stroke = 2.5 }: { size?: number; dot?: number; stroke?: number }) {
  return (
    <div style={{ width: size, height: size, border: `${stroke}px solid #14181C`, borderRadius: "50%", position: "relative", flex: "none" }}>
      <div style={{ position: "absolute", left: "50%", bottom: size * 0.08, transform: "translateX(-50%)", width: dot, height: dot, borderRadius: "50%", background: "#0E7C8A" }} />
    </div>
  );
}
