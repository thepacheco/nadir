import Link from "next/link";
import Logo from "./Logo";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "PRODUCT",
    links: [
      { label: "Platform", href: "/platform" },
      { label: "Pricing", href: "/pricing" },
      { label: "Live workspace", href: "/workspace" },
      { label: "How it works", href: "/#how" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "RESOURCES",
    links: [
      { label: "Security & trust", href: "/security" },
      { label: "Documentation", href: "/platform" },
      { label: "Demo companies", href: "/workspace" },
    ],
  },
  {
    title: "LEGAL",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
      { label: "Acceptable use", href: "/acceptable-use" },
      { label: "Subprocessors", href: "/subprocessors" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer style={{ background: "#F3F1EC", borderTop: "1px solid rgba(20,24,28,0.1)" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "64px 48px 36px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr repeat(4, 1fr)", gap: 40, marginBottom: 56 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <Logo size={22} dot={5.5} />
              <span style={{ fontWeight: 700, fontSize: 17, letterSpacing: "0.06em" }}>NADIR</span>
            </div>
            <div style={{ fontSize: 13.5, lineHeight: 1.6, color: "#5a646e", maxWidth: 240, marginBottom: 18 }}>
              The operational AI for your entire company. Point it at your systems — Nadir makes the connections and tells you what needs you.
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, color: "#15854F", border: "1px solid rgba(21,133,79,0.3)", padding: "5px 12px", borderRadius: 100, background: "rgba(255,255,255,0.6)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#15854F" }} />
              ALL SYSTEMS OPERATIONAL
            </div>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, letterSpacing: "0.14em", color: "#7a848e", marginBottom: 16 }}>{col.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {col.links.map((l) => (
                  <Link key={l.label} href={l.href} style={{ fontSize: 13.5, color: "#3d4750", textDecoration: "none" }}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(20,24,28,0.1)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, color: "#7a848e", flexWrap: "wrap", gap: 12 }}>
          <div>© 2026 Nadir Intelligence, Inc. · Control of your whole operation.</div>
          <div style={{ display: "flex", gap: 22, fontSize: 13 }}>
            <a href="https://x.com" style={{ color: "#5a646e", textDecoration: "none" }}>X</a>
            <a href="https://linkedin.com" style={{ color: "#5a646e", textDecoration: "none" }}>LinkedIn</a>
            <a href="https://github.com/thepacheco/nadir" style={{ color: "#5a646e", textDecoration: "none" }}>GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
