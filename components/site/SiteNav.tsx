import Link from "next/link";
import Logo from "./Logo";
import styles from "../nadir/nadir.module.css";

const LINKS = [
  { href: "/platform", label: "Platform" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "Company" },
  { href: "/contact", label: "Contact" },
];

export default function SiteNav() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 48px", maxWidth: 1240, margin: "0 auto" }}>
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 11, textDecoration: "none", color: "#14181C" }}>
        <Logo />
        <span style={{ fontWeight: 700, fontSize: 19, letterSpacing: "0.06em" }}>NADIR</span>
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: 34, fontSize: 14.5, color: "#3d4750", fontWeight: 500 }}>
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} style={{ color: "inherit", textDecoration: "none" }}>
            {l.label}
          </Link>
        ))}
        <Link
          href="/workspace"
          className={styles.btnDark}
          style={{ fontSize: 14.5, fontWeight: 600, padding: "10px 22px", background: "#14181C", color: "#FAF9F7", border: "none", borderRadius: 6, cursor: "pointer", textDecoration: "none" }}
        >
          Open live workspace
        </Link>
      </div>
    </div>
  );
}
