"use client";

// The value story, told honestly. Nadir's payoff isn't a made-up "35% fewer
// incidents" — it's the hours your owners, admins and managers get back when
// they stop chasing numbers across systems by hand. So this calculator models
// exactly that: coordination hours saved, itemized so a buyer can see where
// every hour comes from, priced against the real published plans.

import React, { useMemo, useState } from "react";

const MONO = "var(--font-ibm-plex-mono), monospace";

interface Bucket { k: string; h: number }
interface Org {
  id: string; label: string; unit: string; who: string;
  rate: number; countDefault: number; buckets: Bucket[];
}

// Hours-per-person-per-week that Nadir gives back. Kept deliberately
// conservative — under a day a week for people whose whole job is keeping track.
const ORGS: Org[] = [
  {
    id: "utility", label: "Utility / field services", unit: "dispatchers & ops coordinators",
    who: "the people keeping crews, outages and schedules straight", rate: 44, countDefault: 6,
    buckets: [
      { k: "Chasing status across OMS, GIS & crew schedules", h: 3 },
      { k: "Reconciling crew hours vs schedule vs payroll", h: 2 },
      { k: "Writing the outage & morning crew brief", h: 1.5 },
      { k: "Catching faults before they become truck-rolls", h: 1.5 },
    ],
  },
  {
    id: "staffing", label: "Staffing / recruiting agency", unit: "recruiters & account managers",
    who: "the people moving candidates and keeping clients updated", rate: 34, countDefault: 8,
    buckets: [
      { k: "Chasing candidate status across ATS, texts & sheets", h: 3 },
      { k: "Reconciling submittals, interviews & placements", h: 1.5 },
      { k: "Writing client & candidate update recaps", h: 2 },
      { k: "Flagging stalled reqs before they age out", h: 1.5 },
    ],
  },
  {
    id: "restaurant", label: "Restaurant / hospitality group", unit: "GMs & shift leads",
    who: "the people watching sales, labor and food cost every night", rate: 30, countDefault: 8,
    buckets: [
      { k: "Chasing sales, labor & inventory across POS systems", h: 3 },
      { k: "Reconciling scheduled vs actual labor against sales", h: 2 },
      { k: "Writing the nightly & weekly manager recap", h: 2 },
      { k: "Catching food-cost & overtime creep early", h: 1.5 },
    ],
  },
  {
    id: "manufacturing", label: "Manufacturing / production", unit: "supervisors & schedulers",
    who: "the people running jobs, inventory and the floor", rate: 46, countDefault: 6,
    buckets: [
      { k: "Chasing job status across MES, ERP & the floor", h: 3 },
      { k: "Reconciling work orders, inventory & shipments", h: 2 },
      { k: "Writing shift-handoff & production reports", h: 1.5 },
      { k: "Catching quality & downtime issues early", h: 2 },
    ],
  },
  {
    id: "services", label: "Professional / field services", unit: "project & ops managers",
    who: "the people keeping projects, budgets and clients on track", rate: 54, countDefault: 5,
    buckets: [
      { k: "Chasing project status across tools & inboxes", h: 3.5 },
      { k: "Reconciling hours, budgets & billing", h: 2 },
      { k: "Writing status reports for clients & leadership", h: 2.5 },
      { k: "Catching at-risk projects before they slip", h: 2 },
    ],
  },
];

// Match the count to a real published plan (see /pricing). We never invent an
// Enterprise number — past 25 people it's a conversation, so the slider stops there.
function planFor(count: number): { name: string; annual: number } {
  if (count <= 2) return { name: "Founder", annual: 20 * 12 };
  if (count <= 8) return { name: "Team", annual: 250 * 12 };
  if (count <= 15) return { name: "Business", annual: 700 * 12 };
  return { name: "Operations", annual: 1800 * 12 };
}

const usd = (n: number) => "$" + Math.round(n).toLocaleString();
const usdK = (n: number) => n >= 1000 ? "$" + (n / 1000).toFixed(n >= 10000 ? 0 : 1) + "k" : usd(n);

export default function ROICalculator() {
  const [orgId, setOrgId] = useState("restaurant");
  const org = ORGS.find((o) => o.id === orgId)!;
  const [count, setCount] = useState(org.countDefault);
  const [rate, setRate] = useState(org.rate);

  // when the org changes, reset the scale + rate to that industry's defaults
  const onOrg = (id: string) => {
    const o = ORGS.find((x) => x.id === id)!;
    setOrgId(id); setCount(o.countDefault); setRate(o.rate);
  };

  const m = useMemo(() => {
    const perPersonWeek = org.buckets.reduce((s, b) => s + b.h, 0);
    const weeklyHours = perPersonWeek * count;
    const annualHours = weeklyHours * 52;
    const annualValue = annualHours * rate;
    const plan = planFor(count);
    const weeklyValue = annualValue / 52;
    const paybackWeeks = weeklyValue > 0 ? plan.annual / weeklyValue : 0;
    const fteEquivalent = annualHours / 2080; // full-time-year of hours
    const rows = org.buckets.map((b) => ({ k: b.k, hrs: b.h * count, val: b.h * count * 52 * rate }));
    return { perPersonWeek, weeklyHours, annualHours, annualValue, plan, paybackWeeks, fteEquivalent, rows };
  }, [org, count, rate]);

  const isMax = count >= 25;

  return (
    <div style={{ background: "#FFFFFF", borderRadius: 14, border: "1px solid rgba(20,24,28,0.12)", overflow: "hidden", boxShadow: "0 10px 40px -20px rgba(20,30,40,0.15)", maxWidth: 940, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 18px", borderBottom: "1px solid rgba(20,24,28,0.09)", background: "#FCFBF9" }}>
        <div style={{ fontFamily: MONO, fontSize: 11.5, color: "#7a848e", letterSpacing: "0.1em" }}>WHAT NADIR GIVES BACK</div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {/* Controls */}
        <div style={{ flex: "1 1 300px", padding: 32, borderRight: "1px solid rgba(20,24,28,0.09)" }}>
          <div style={{ marginBottom: 26 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#5a646e", marginBottom: 8 }}>WHAT DO YOU RUN?</label>
            <select
              value={orgId} onChange={(e) => onOrg(e.target.value)}
              style={{ width: "100%", fontFamily: "inherit", fontSize: 14.5, fontWeight: 600, color: "#14181C", padding: "11px 12px", borderRadius: 9, border: "1px solid rgba(20,24,28,0.18)", background: "#FFFFFF", cursor: "pointer" }}
            >
              {ORGS.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
            </select>
          </div>

          <div style={{ marginBottom: 26 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#5a646e", marginBottom: 8 }}>{org.unit.toUpperCase()}</label>
            <input
              type="range" min={1} max={25} step={1}
              value={count} onChange={(e) => setCount(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#0E7C8A" }}
            />
            <div style={{ fontFamily: MONO, fontSize: 14, fontWeight: 600, color: "#14181C", marginTop: 8 }}>
              {count}{isMax ? "+" : ""} people
            </div>
            <div style={{ fontSize: 12, color: "#7a848e", marginTop: 4, lineHeight: 1.4 }}>{org.who}</div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#5a646e", marginBottom: 8 }}>THEIR LOADED COST / HOUR</label>
            <input
              type="range" min={20} max={90} step={1}
              value={rate} onChange={(e) => setRate(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#0E7C8A" }}
            />
            <div style={{ fontFamily: MONO, fontSize: 14, fontWeight: 600, color: "#14181C", marginTop: 8 }}>
              ${rate} / hour
            </div>
          </div>
        </div>

        {/* Output */}
        <div style={{ flex: "1.4 1 380px", padding: 32, background: "#FCFBF9", display: "flex", flexDirection: "column" }}>
          {/* headline */}
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap", marginBottom: 22 }}>
            <div>
              <div style={{ fontSize: 12, color: "#7a848e", marginBottom: 4 }}>Hours given back / week</div>
              <div style={{ fontFamily: MONO, fontSize: 34, fontWeight: 600, color: "#14181C", letterSpacing: "-0.02em" }}>{Math.round(m.weeklyHours)}</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#7a848e", marginBottom: 4 }}>Worth per year</div>
              <div style={{ fontFamily: MONO, fontSize: 34, fontWeight: 600, color: "#15854F", letterSpacing: "-0.02em" }}>{usdK(m.annualValue)}</div>
            </div>
          </div>

          {/* the honest part: where the hours come from */}
          <div style={{ fontSize: 11.5, fontFamily: MONO, letterSpacing: "0.08em", color: "#7a848e", marginBottom: 10 }}>WHERE IT COMES FROM</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 20 }}>
            {m.rows.map((r) => {
              const pct = (r.hrs / m.weeklyHours) * 100;
              return (
                <div key={r.k} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, color: "#3a444e", lineHeight: 1.35, marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.k}</div>
                    <div style={{ height: 4, borderRadius: 3, background: "rgba(14,124,138,0.12)" }}>
                      <div style={{ width: `${pct}%`, height: "100%", borderRadius: 3, background: "#0E7C8A" }} />
                    </div>
                  </div>
                  <div style={{ fontFamily: MONO, fontSize: 12, color: "#5a646e", flex: "none", width: 66, textAlign: "right" }}>{Math.round(r.hrs)} hrs/wk</div>
                </div>
              );
            })}
          </div>

          {/* plain-english bottom line */}
          <div style={{ borderTop: "1px solid rgba(20,24,28,0.1)", paddingTop: 18, marginTop: "auto" }}>
            <div style={{ fontSize: 13.5, color: "#3a444e", lineHeight: 1.55 }}>
              That&rsquo;s about <strong style={{ color: "#14181C" }}>{m.fteEquivalent.toFixed(1)} full-time people</strong> worth of time back.
              On the <strong style={{ color: "#14181C" }}>{m.plan.name}</strong> plan ({usdK(m.plan.annual)}/yr){isMax ? "+" : ""}, Nadir pays for itself in{" "}
              <strong style={{ color: "#0E7C8A" }}>{m.paybackWeeks < 1 ? "under a week" : `about ${Math.round(m.paybackWeeks)} week${Math.round(m.paybackWeeks) === 1 ? "" : "s"}`}</strong>.
              {isMax && <span style={{ color: "#7a848e" }}> Running 25+? That tier is Enterprise — <a href="/contact" style={{ color: "#0E7C8A", textDecoration: "none" }}>let&rsquo;s talk</a>.</span>}
            </div>
            <div style={{ fontSize: 11, color: "#9aa4ae", marginTop: 10, lineHeight: 1.45 }}>
              Conservative estimate — {m.perPersonWeek} hrs/week per person, the coordination work Nadir does for you. Your data will tell the real story.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
