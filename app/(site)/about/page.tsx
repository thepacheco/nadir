import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/site/PageShell";
import Reveal from "@/components/site/Reveal";
import { Sparkles, Network, Lock, Users } from "lucide-react";
import styles from "@/components/nadir/nadir.module.css";

export const metadata: Metadata = { title: "About — Nadir" };

const MONO = "var(--font-ibm-plex-mono), monospace";
const SERIF = "var(--font-newsreader), serif";

const BELIEFS = [
  { icon: <Sparkles size={20} />, title: "The AI is the product", desc: "We're an AI company first. The map, the graph, the alerts — they all exist for one reason: to let the AI show you what it understands, and to let you act on it." },
  { icon: <Network size={20} />, title: "We model how you actually work", desc: "Your business doesn't run on rows and columns. It runs on people, machines, shifts, and sites — and how they connect. That's the thing Nadir builds." },
  { icon: <Lock size={20} />, title: "Your data trains your Nadir — nobody else's", desc: "The longer it watches your operation, the sharper it gets for you. That learning stays inside your walls. We don't pool it into anyone else's model." },
  { icon: <Users size={20} />, title: "Built with operators, not for them", desc: "We sit with the people who run utilities, plants, kitchens, and staffing floors. The ones who know the work are the ones who shape the tool." },
];

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "100px 48px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.14em", color: "#5a646e", marginBottom: 24 }}>THE COMPANY</div>
            <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 52, lineHeight: 1.1, margin: 0, letterSpacing: "-0.015em", color: "#14181C" }}>
              We give the people who run a company control of it.
            </h1>
            <p style={{ fontSize: 16.5, lineHeight: 1.65, color: "#4a545e", margin: "24px 0 0" }}>
              Most businesses run on a dozen disconnected systems, and nobody has the whole picture. Nadir is the AI that puts it back together — so the people running the place are the ones in charge of it.
            </p>
          </div>
          <div style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12, padding: 12, boxShadow: "0 20px 40px -20px rgba(0,0,0,0.06)" }}>
            <Image
              src="/images/office.png"
              alt="Nadir team collaborating at the Atlanta office"
              width={450}
              height={300}
              style={{ width: "100%", height: "auto", borderRadius: 8, display: "block" }}
              priority
            />
            <div style={{ fontFamily: MONO, fontSize: 11, color: "#7a848e", marginTop: 10, textAlign: "center" }}>
              Nadir HQ · Atlanta, GA
            </div>
          </div>
        </div>
      </div>

      {/* THE MISSION — founder's story, in his words */}
      <Reveal>
        <div style={{ background: "#14181C", color: "#FAF9F7" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", padding: "88px 48px" }}>
            <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.14em", color: "#7fb3bb", marginBottom: 28 }}>WHY WE BUILT THIS</div>
            <blockquote style={{ margin: 0, fontFamily: SERIF, fontWeight: 400, fontSize: 30, lineHeight: 1.4, letterSpacing: "-0.01em" }}>
              &ldquo;I spent two years in flight catering watching smart people fly blind. From the analyst&rsquo;s chair you blame the floor for bad data; on the floor you learn the data itself was wrong — and on a bad day nobody can see the whole board at once. Nadir is the coach who can: it takes a company from the ground up and hands control back to the people who run it.&rdquo;
            </blockquote>
            <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#17a6b6,#0b6470)" }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>Brandon Pacheco</div>
                <div style={{ fontFamily: MONO, fontSize: 11.5, color: "#9aa4ae" }}>Founder</div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* WHAT WE BELIEVE */}
      <Reveal>
        <Section>
          <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.14em", color: "#7a848e", marginBottom: 16 }}>WHAT WE BELIEVE</div>
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 34, margin: "0 0 32px", letterSpacing: "-0.01em", color: "#14181C" }}>Four things we won&rsquo;t compromise on.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
            {BELIEFS.map((p, i) => (
              <div key={i} style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12, padding: "28px 24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(14,124,138,0.08)", color: "#0E7C8A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {p.icon}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 16.5, color: "#14181C" }}>{p.title}</div>
                </div>
                <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "#5a646e", margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </Section>
      </Reveal>

      {/* WHERE WE START */}
      <Reveal>
        <Section alt>
          <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.14em", color: "#7a848e", marginBottom: 16 }}>WHERE WE START</div>
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 34, margin: "0 0 20px", letterSpacing: "-0.01em", color: "#14181C" }}>Georgia first. Real operators first.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[
              { t: "Built with operators, not for them", d: "We work alongside the people who run utilities, plants, kitchens, and staffing floors — because the ones who know the work should shape the tool." },
              { t: "US-based, starting in Georgia", d: "We're beginning close to home with a handful of design partners, so every industry we support, we support to the depth an insider would expect." },
              { t: "Depth before breadth", d: "One vertical understood cold beats ten understood shallowly. We earn each industry before we claim it." },
            ].map((c, i) => (
              <div key={i} style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12, padding: "26px 24px" }}>
                <div style={{ fontWeight: 700, fontSize: 16.5, marginBottom: 10, color: "#14181C" }}>{c.t}</div>
                <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "#5a646e", margin: 0 }}>{c.d}</p>
              </div>
            ))}
          </div>
        </Section>
      </Reveal>

      {/* JOIN CTA */}
      <Section>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 30, flexWrap: "wrap" }}>
          <div>
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 34, margin: "0 0 10px", letterSpacing: "-0.01em", color: "#14181C" }}>Want to build it with us?</h2>
            <p style={{ fontSize: 15.5, color: "#4a545e", margin: 0 }}>We&rsquo;re a small team teaching an AI to understand how real companies run. It&rsquo;s harder — and more rewarding — than it sounds.</p>
          </div>
          <div style={{ display: "flex", gap: 12, flex: "none" }}>
            <Link href="/careers" className={styles.btnDark} style={{ fontSize: 15, fontWeight: 600, padding: "13px 26px", background: "#14181C", color: "#FFFFFF", borderRadius: 8, textDecoration: "none" }}>
              Open roles →
            </Link>
            <Link href="/contact" style={{ fontSize: 15, fontWeight: 600, padding: "13px 26px", color: "#14181C", border: "1px solid rgba(20,24,28,0.2)", borderRadius: 8, textDecoration: "none", background: "#FFFFFF" }}>
              Contact us
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
