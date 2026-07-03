export const MONO = "var(--font-ibm-plex-mono), monospace";
export const SERIF = "var(--font-newsreader), serif";

export function PageHero({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div style={{ maxWidth: 1240, margin: "0 auto", padding: "64px 48px 24px" }}>
      <div style={{ fontFamily: MONO, fontSize: 12.5, letterSpacing: "0.14em", color: "#0E7C8A", marginBottom: 18 }}>{eyebrow}</div>
      <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 54, lineHeight: 1.08, margin: 0, maxWidth: 820, letterSpacing: "-0.015em", textWrap: "balance" }}>{title}</h1>
      {sub && <p style={{ fontSize: 17.5, lineHeight: 1.65, color: "#4a545e", maxWidth: 640, margin: "22px 0 0" }}>{sub}</p>}
    </div>
  );
}

export function Section({ children, alt, id }: { children: React.ReactNode; alt?: boolean; id?: string }) {
  return (
    <div id={id} style={alt ? { background: "#F3F1EC", borderTop: "1px solid rgba(20,24,28,0.1)" } : undefined}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "56px 48px" }}>{children}</div>
    </div>
  );
}

export function LegalBlock({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "90px 1fr", gap: 32, padding: "26px 0", borderTop: "1px solid rgba(20,24,28,0.12)", alignItems: "baseline" }}>
      <div style={{ fontFamily: MONO, fontSize: 13, color: "#0E7C8A" }}>{n}</div>
      <div>
        <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 10 }}>{title}</div>
        <div style={{ fontSize: 14.5, lineHeight: 1.7, color: "#4a545e", maxWidth: 720 }}>{children}</div>
      </div>
    </div>
  );
}
