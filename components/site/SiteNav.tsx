"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, LayoutGrid, Zap, Factory, Shield, BookOpen, Terminal, Plane, FileText, Phone, Building2, Users, Database, GitMerge, Activity, Lock } from "lucide-react";
import Logo from "./Logo";
import styles from "../nadir/nadir.module.css";

const MENU_ITEMS = [
  {
    id: "product",
    label: "Product",
    content: (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, minWidth: 680 }}>
        <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, letterSpacing: "0.1em", color: "#7a848e", marginBottom: 8 }}>PLATFORM</div>
          <Link href="/platform" style={{ display: "flex", gap: 12, textDecoration: "none", color: "inherit", padding: "10px 12px", margin: "0 -12px", borderRadius: 8, transition: "background 0.2s" }} className={styles.navHover}>
            <LayoutGrid size={18} style={{ color: "#0E7C8A", flex: "none", marginTop: 2 }} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#14181C", marginBottom: 2 }}>Nadir AI</div>
              <div style={{ fontSize: 12.5, color: "#5a646e", lineHeight: 1.4 }}>The AI at the center of it all.</div>
            </div>
          </Link>
          <Link href="/platform/ontology-engine" style={{ display: "flex", gap: 12, textDecoration: "none", color: "inherit", padding: "10px 12px", margin: "0 -12px", borderRadius: 8, transition: "background 0.2s" }} className={styles.navHover}>
            <GitMerge size={18} style={{ color: "#0E7C8A", flex: "none", marginTop: 2 }} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#14181C", marginBottom: 2 }}>Ontology Engine</div>
              <div style={{ fontSize: 12.5, color: "#5a646e", lineHeight: 1.4 }}>Map messy databases to real-world objects.</div>
            </div>
          </Link>
          <Link href="/platform/schema-mapper" style={{ display: "flex", gap: 12, textDecoration: "none", color: "inherit", padding: "10px 12px", margin: "0 -12px", borderRadius: 8, transition: "background 0.2s" }} className={styles.navHover}>
            <Database size={18} style={{ color: "#0E7C8A", flex: "none", marginTop: 2 }} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#14181C", marginBottom: 2 }}>Schema Mapper</div>
              <div style={{ fontSize: 12.5, color: "#5a646e", lineHeight: 1.4 }}>Visual drag-and-drop column matching.</div>
            </div>
          </Link>
        </div>
        <div style={{ padding: 24, borderLeft: "1px solid rgba(20,24,28,0.08)", display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, letterSpacing: "0.1em", color: "#7a848e", marginBottom: 8 }}>CAPABILITIES</div>
          <Link href="/platform/operational-graph" style={{ display: "flex", gap: 12, textDecoration: "none", color: "inherit", padding: "10px 12px", margin: "0 -12px", borderRadius: 8, transition: "background 0.2s" }} className={styles.navHover}>
            <Activity size={18} style={{ color: "#15854F", flex: "none", marginTop: 2 }} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#14181C", marginBottom: 2 }}>Operational Graph</div>
              <div style={{ fontSize: 12.5, color: "#5a646e", lineHeight: 1.4 }}>Live model of your entire operation.</div>
            </div>
          </Link>
          <Link href="/platform/compliance-monitor" style={{ display: "flex", gap: 12, textDecoration: "none", color: "inherit", padding: "10px 12px", margin: "0 -12px", borderRadius: 8, transition: "background 0.2s" }} className={styles.navHover}>
            <Terminal size={18} style={{ color: "#15854F", flex: "none", marginTop: 2 }} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#14181C", marginBottom: 2 }}>Compliance Monitor</div>
              <div style={{ fontSize: 12.5, color: "#5a646e", lineHeight: 1.4 }}>Deterministic rules, not AI guessing.</div>
            </div>
          </Link>
          <Link href="/platform/audit-trails" style={{ display: "flex", gap: 12, textDecoration: "none", color: "inherit", padding: "10px 12px", margin: "0 -12px", borderRadius: 8, transition: "background 0.2s" }} className={styles.navHover}>
            <Lock size={18} style={{ color: "#15854F", flex: "none", marginTop: 2 }} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#14181C", marginBottom: 2 }}>Audit Trails</div>
              <div style={{ fontSize: 12.5, color: "#5a646e", lineHeight: 1.4 }}>Immutable, tamper-evident logging.</div>
            </div>
          </Link>
        </div>
        <div style={{ background: "#F3F1EC", padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, letterSpacing: "0.1em", color: "#7a848e" }}>QUICK LINKS</div>
          <Link href="/pricing" style={{ display: "block", fontSize: 14, fontWeight: 500, color: "#3d4750", textDecoration: "none" }}>Pricing Plans</Link>
          <Link href="/workspace" style={{ display: "block", fontSize: 14, fontWeight: 500, color: "#3d4750", textDecoration: "none" }}>Live Demo Workspace</Link>
          <div style={{ marginTop: "auto", padding: 16, background: "rgba(14,124,138,0.06)", borderRadius: 8, border: "1px solid rgba(14,124,138,0.2)" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#0E7C8A", marginBottom: 6 }}>See it running</div>
            <div style={{ fontSize: 12, color: "#5a646e", lineHeight: 1.5, marginBottom: 10 }}>Explore the live workspace with five simulated industries.</div>
            <Link href="/workspace" style={{ fontSize: 12, fontWeight: 700, color: "#0E7C8A", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}>Open workspace <ArrowRight size={14}/></Link>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "solutions",
    label: "Solutions",
    content: (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, padding: 24, width: 500 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, letterSpacing: "0.1em", color: "#7a848e", marginBottom: -4 }}>INDUSTRIES</div>
          <Link href="/workspace" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "#3d4750", fontSize: 14, fontWeight: 500 }}><Factory size={16} /> Manufacturing</Link>
          <Link href="/workspace" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "#3d4750", fontSize: 14, fontWeight: 500 }}><Plane size={16} /> Aerospace</Link>
          <Link href="/workspace" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "#3d4750", fontSize: 14, fontWeight: 500 }}><Zap size={16} /> Power & Utility</Link>
          <Link href="/workspace" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "#3d4750", fontSize: 14, fontWeight: 500 }}><FileText size={16} /> Paper & Pulp</Link>
          <Link href="/workspace" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "#3d4750", fontSize: 14, fontWeight: 500 }}><Shield size={16} /> Defense</Link>
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ padding: 16, background: "rgba(14,124,138,0.06)", borderRadius: 8, border: "1px solid rgba(14,124,138,0.2)" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#0E7C8A", marginBottom: 6 }}>Not sure if you fit?</div>
            <div style={{ fontSize: 12, color: "#5a646e", lineHeight: 1.5, marginBottom: 12 }}>Nadir adapts to any rigid, high-stakes physical workflow.</div>
            <Link href="/contact" style={{ fontSize: 12, fontWeight: 700, color: "#0E7C8A", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}>Talk to engineering <ArrowRight size={14}/></Link>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "resources",
    label: "Resources",
    content: (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, padding: 24, width: 440 }}>
        <Link href="/security" style={{ display: "flex", gap: 12, textDecoration: "none", color: "inherit", padding: 8, margin: -8, borderRadius: 8, transition: "background 0.2s" }} className={styles.navHover}>
          <Shield size={20} style={{ color: "#8a5a10", flex: "none", marginTop: 2 }} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#14181C", marginBottom: 2 }}>Security & Trust</div>
            <div style={{ fontSize: 13, color: "#5a646e", lineHeight: 1.4 }}>Tenant isolation & compliance.</div>
          </div>
        </Link>
        <Link href="/platform" style={{ display: "flex", gap: 12, textDecoration: "none", color: "inherit", padding: 8, margin: -8, borderRadius: 8, transition: "background 0.2s" }} className={styles.navHover}>
          <BookOpen size={20} style={{ color: "#0E7C8A", flex: "none", marginTop: 2 }} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#14181C", marginBottom: 2 }}>Documentation</div>
            <div style={{ fontSize: 13, color: "#5a646e", lineHeight: 1.4 }}>Developer APIs and guides.</div>
          </div>
        </Link>
      </div>
    )
  },
  {
    id: "company",
    label: "Company",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 20, width: 220 }}>
        <Link href="/about" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "#3d4750", fontSize: 14, fontWeight: 500 }}><Building2 size={16} /> About Us</Link>
        <Link href="/careers" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "#3d4750", fontSize: 14, fontWeight: 500 }}><Users size={16} /> Careers</Link>
        <Link href="/contact" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "#3d4750", fontSize: 14, fontWeight: 500 }}><Phone size={16} /> Contact Sales</Link>
      </div>
    )
  }
];

export default function SiteNav() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <div 
      style={{ position: "sticky", top: 0, zIndex: 100, borderBottom: "1px solid rgba(20,24,28,0.1)", background: "rgba(250,249,247,0.8)", backdropFilter: "blur(12px)" }}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 48px", maxWidth: 1240, margin: "0 auto", position: "relative" }}>
        
        {/* LOGO */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 11, textDecoration: "none", color: "#14181C" }}>
          <Logo />
          <span style={{ fontWeight: 700, fontSize: 19, letterSpacing: "0.06em" }}>NADIR</span>
        </Link>

        {/* MEGNA MENU LINKS */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, height: "100%" }}>
          {MENU_ITEMS.map((item) => (
            <div 
              key={item.id} 
              onMouseEnter={() => setActiveMenu(item.id)}
              style={{ position: "relative" }}
            >
              <div style={{ padding: "10px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 14.5, fontWeight: 500, color: activeMenu === item.id ? "#14181C" : "#5a646e", transition: "color 0.2s" }}>
                {item.label}
                <ChevronDown size={14} style={{ transition: "transform 0.2s", transform: activeMenu === item.id ? "rotate(180deg)" : "rotate(0)" }} />
              </div>
              
              <AnimatePresence>
                {activeMenu === item.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, x: "-50%", rotateX: -15 }}
                    animate={{ opacity: 1, y: 0, x: "-50%", rotateX: 0 }}
                    exit={{ opacity: 0, y: 10, x: "-50%", rotateX: -15 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.8 }}
                    style={{
                      position: "absolute", top: "100%", left: "50%",
                      background: "#FFFFFF", borderRadius: 12, boxShadow: "0 24px 60px rgba(0,0,0,0.15)",
                      border: "1px solid rgba(20,24,28,0.1)", overflow: "hidden", transformOrigin: "top center",
                      marginTop: 8
                    }}
                  >
                    {item.content}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link href="/contact" style={{ fontSize: 14.5, fontWeight: 600, color: "#3d4750", textDecoration: "none" }}>Contact</Link>
          <Link
            href="/workspace"
            className={styles.btnDark}
            style={{ fontSize: 14.5, fontWeight: 600, padding: "10px 22px", background: "#14181C", color: "#FAF9F7", border: "none", borderRadius: 6, cursor: "pointer", textDecoration: "none" }}
          >
            Live Demo
          </Link>
        </div>

      </div>
    </div>
  );
}
