export const MONO = "var(--font-ibm-plex-mono), monospace";
export const SERIF = "var(--font-newsreader), serif";

export function PageHero({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div style={{ maxWidth: 1040, margin: "0 auto", padding: "100px 48px 40px" }}>
      <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.14em", color: "#5a646e", marginBottom: 24 }}>{eyebrow}</div>
      <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 62, lineHeight: 1.05, margin: 0, maxWidth: 900, letterSpacing: "-0.015em", textWrap: "balance", color: "#14181C" }}>{title}</h1>
      {sub && <p style={{ fontSize: 18, lineHeight: 1.6, color: "#4a545e", maxWidth: 680, margin: "28px 0 0" }}>{sub}</p>}
    </div>
  );
}

export function Section({ children, alt, id }: { children: React.ReactNode; alt?: boolean; id?: string }) {
  return (
    <div id={id} style={alt ? { background: "#F6F5F3", borderTop: "1px solid rgba(20,24,28,0.08)" } : undefined}>
      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "80px 48px" }}>{children}</div>
    </div>
  );
}

export function ContentBlock({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 40, padding: "32px 0", borderTop: "1px solid rgba(20,24,28,0.1)", alignItems: "baseline" }}>
      <div style={{ fontFamily: MONO, fontSize: 12, color: "#7a848e", letterSpacing: "0.06em" }}>{n}</div>
      <div>
        <div style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 28, marginBottom: 16, color: "#14181C", letterSpacing: "-0.01em" }}>{title}</div>
        <div style={{ fontSize: 15, lineHeight: 1.75, color: "#4a545e", maxWidth: 740 }}>{children}</div>
      </div>
    </div>
  );
}
