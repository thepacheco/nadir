// Process-flow engine for the Process Explorer lens (ARCHITECTURE.md §9.1).
// Two halves, strictly separated:
//   1. A seeded generator that produces a [DEMO-ONLY] event log per company —
//      deterministic (same company, same log every time), clearly demo data.
//   2. A pure computation layer (computeFlow) that derives every number shown
//      in the UI — counts, average durations, transition percentages — from
//      whatever event log it is given. Nothing in the UI is hardcoded; when a
//      real events table exists (Phase 3), the generator is swapped out and
//      this same computation runs on real transitions.

export interface FlowEvent {
  obj: string; // object id, e.g. "NC-1042"
  state: string;
  at: number; // hours since t0
}

export interface StateStat {
  id: string;
  total: number; // objects that ever entered this state
  current: number; // objects whose latest state this is
  avgHours: number; // average time spent in this state (0 for terminals)
  terminal: boolean;
  onExpectedPath: boolean;
  isBottleneck: boolean;
}

export interface Transition {
  from: string;
  to: string;
  count: number;
  pct: number; // share of all objects leaving `from` that took this edge
  avgHours: number;
  expected: boolean; // is this edge consecutive on the expected path?
}

export interface FlowObjectRow {
  id: string;
  label: string;
  owner: string;
  current: string;
  hoursInState: number;
  path: string[];
}

export interface FlowModel {
  states: StateStat[];
  transitions: Transition[];
  objects: FlowObjectRow[];
  totalObjects: number;
  deviationSentences: string[]; // computed plain-English findings, worst first
}

export const DEFAULT_EXPECTED_PATH = ["Open", "Submitted", "Assigned", "Dispositioned", "Closed"];
export const TERMINAL_STATES = ["Closed", "Cancelled"];
export const ALL_STATES = [...DEFAULT_EXPECTED_PATH, "Cancelled", "Concession Opened"];

// ---------- deterministic PRNG (mulberry32 over a string hash) ----------

function hashStr(s: string): number {
  let h = 1779033703 ^ s.length;
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(h ^ s.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------- [DEMO-ONLY] event-log generator ----------

const OWNER_POOL = ["D. Okafor", "M. Reyes", "S. Lindqvist", "T. Nguyen", "A. Whitfield", "J. Barros"];
const LABEL_POOL = [
  "Missing bonding strap",
  "Misaligned RH door seal",
  "Torque record out of range",
  "Cover count mismatch",
  "Late supplier certificate",
  "Calibration overdue",
  "Damaged packaging on receipt",
  "Wrong revision on traveler",
];

/**
 * [DEMO-ONLY] Generate a deterministic event log for a company. Objects walk
 * the expected path with realistic diversions: early cancellation, a
 * concession detour after Assigned, rework loops back to Submitted, and a
 * share of objects still in flight. Real customers will have a real events
 * table; this exists so the computation layer has something honest to chew on.
 */
export function generateEventLog(companyId: string, count = 180): FlowEvent[] {
  const rng = mulberry32(hashStr(companyId));
  const events: FlowEvent[] = [];
  const path = DEFAULT_EXPECTED_PATH;

  // per-state mean dwell hours (spread by rng per object)
  const dwell: Record<string, number> = {
    Open: 40,
    Submitted: 62,
    Assigned: 120, // deliberately the slow stage — the bottleneck is real math
    Dispositioned: 55,
    "Concession Opened": 90,
  };

  for (let n = 0; n < count; n++) {
    const id = `NC-${1000 + n}`;
    let t = rng() * 400; // staggered start times
    let alive = true;
    events.push({ obj: id, state: "Open", at: t });

    for (let s = 0; s < path.length - 1 && alive; s++) {
      const here = path[s];
      // chance the object is simply still sitting in this state (in flight)
      if (rng() < 0.06 + 0.02 * s) { alive = false; break; }

      t += dwell[here] * (0.4 + rng() * 1.4);

      // early cancellation from any pre-terminal state
      const cancelP = here === "Open" ? 0.10 : here === "Submitted" ? 0.04 : 0.03;
      if (rng() < cancelP) {
        events.push({ obj: id, state: "Cancelled", at: t });
        alive = false;
        break;
      }
      // concession detour after Assigned
      if (here === "Assigned" && rng() < 0.14) {
        events.push({ obj: id, state: "Concession Opened", at: t });
        t += dwell["Concession Opened"] * (0.5 + rng());
        if (rng() < 0.25) {
          events.push({ obj: id, state: "Cancelled", at: t });
        } else {
          events.push({ obj: id, state: "Closed", at: t });
        }
        alive = false;
        break;
      }
      // rework loop: Assigned kicks back to Submitted once
      if (here === "Assigned" && rng() < 0.08) {
        events.push({ obj: id, state: "Submitted", at: t });
        t += dwell["Submitted"] * (0.4 + rng());
        events.push({ obj: id, state: "Assigned", at: t });
        t += dwell["Assigned"] * (0.4 + rng());
      }
      events.push({ obj: id, state: path[s + 1], at: t });
    }
  }
  return events;
}

// ---------- pure computation (this is the product) ----------

export function computeFlow(
  events: FlowEvent[],
  expectedPath: string[] = DEFAULT_EXPECTED_PATH,
  nowHours?: number,
): FlowModel {
  // group per object, ordered
  const byObj = new Map<string, FlowEvent[]>();
  for (const e of events) {
    const arr = byObj.get(e.obj) ?? [];
    arr.push(e);
    byObj.set(e.obj, arr);
  }
  for (const arr of byObj.values()) arr.sort((a, b) => a.at - b.at);

  const now = nowHours ?? Math.max(...events.map((e) => e.at)) + 24;

  const stateTotal = new Map<string, number>();
  const stateCurrent = new Map<string, number>();
  const stateDwellSum = new Map<string, number>();
  const stateDwellN = new Map<string, number>();
  const transCount = new Map<string, number>();
  const transDwellSum = new Map<string, number>();
  const outgoing = new Map<string, number>();
  const objects: FlowObjectRow[] = [];

  const seededLabel = (id: string) => LABEL_POOL[hashStr(id) % LABEL_POOL.length];
  const seededOwner = (id: string) => OWNER_POOL[hashStr(id + "o") % OWNER_POOL.length];

  for (const [obj, evs] of byObj) {
    const seenStates = new Set<string>();
    for (let i = 0; i < evs.length; i++) {
      const e = evs[i];
      if (!seenStates.has(e.state)) {
        stateTotal.set(e.state, (stateTotal.get(e.state) ?? 0) + 1);
        seenStates.add(e.state);
      }
      const next = evs[i + 1];
      const leftAt = next ? next.at : TERMINAL_STATES.includes(e.state) ? e.at : now;
      const dwellH = Math.max(0, leftAt - e.at);
      if (!TERMINAL_STATES.includes(e.state)) {
        stateDwellSum.set(e.state, (stateDwellSum.get(e.state) ?? 0) + dwellH);
        stateDwellN.set(e.state, (stateDwellN.get(e.state) ?? 0) + 1);
      }
      if (next) {
        const k = `${e.state}→${next.state}`;
        transCount.set(k, (transCount.get(k) ?? 0) + 1);
        transDwellSum.set(k, (transDwellSum.get(k) ?? 0) + (next.at - e.at));
        outgoing.set(e.state, (outgoing.get(e.state) ?? 0) + 1);
      }
    }
    const last = evs[evs.length - 1];
    stateCurrent.set(last.state, (stateCurrent.get(last.state) ?? 0) + 1);
    objects.push({
      id: obj,
      label: seededLabel(obj),
      owner: seededOwner(obj),
      current: last.state,
      hoursInState: TERMINAL_STATES.includes(last.state) ? 0 : Math.max(0, now - last.at),
      path: evs.map((e) => e.state),
    });
  }

  // states present in the log or on the expected path
  const stateIds = Array.from(new Set([...expectedPath, ...Array.from(stateTotal.keys())]));
  const avgHoursOf = (s: string) => {
    const n = stateDwellN.get(s) ?? 0;
    return n ? (stateDwellSum.get(s) ?? 0) / n : 0;
  };
  // bottleneck: the expected, non-terminal state with the longest average dwell
  let bottleneck = "";
  let worst = -1;
  for (const s of expectedPath) {
    if (TERMINAL_STATES.includes(s)) continue;
    const h = avgHoursOf(s);
    if ((stateTotal.get(s) ?? 0) > 0 && h > worst) { worst = h; bottleneck = s; }
  }

  const states: StateStat[] = stateIds.map((s) => ({
    id: s,
    total: stateTotal.get(s) ?? 0,
    current: stateCurrent.get(s) ?? 0,
    avgHours: Math.round(avgHoursOf(s) * 100) / 100,
    terminal: TERMINAL_STATES.includes(s),
    onExpectedPath: expectedPath.includes(s),
    isBottleneck: s === bottleneck,
  }));

  const transitions: Transition[] = Array.from(transCount.entries()).map(([k, count]) => {
    const [from, to] = k.split("→");
    const expected = expectedPath.indexOf(to) - expectedPath.indexOf(from) === 1 && expectedPath.includes(from) && expectedPath.includes(to);
    return {
      from,
      to,
      count,
      pct: Math.round((count / (outgoing.get(from) ?? count)) * 100),
      avgHours: Math.round(((transDwellSum.get(k) ?? 0) / count) * 10) / 10,
      expected,
    };
  }).sort((a, b) => b.count - a.count);

  // plain-English deviations, computed — the sentences a COO pays for
  const total = byObj.size;
  const deviationSentences: string[] = [];
  for (const t of transitions.filter((t) => !t.expected && !(expectedPath.includes(t.from) && t.to === t.from))) {
    if (t.count / total < 0.02) continue;
    if (t.to === "Cancelled") {
      deviationSentences.push(`${t.pct}% of items leaving "${t.from}" get cancelled instead of progressing (${t.count} of ${total} items).`);
    } else if (expectedPath.indexOf(t.to) < expectedPath.indexOf(t.from)) {
      deviationSentences.push(`${t.count} items loop backwards from "${t.from}" to "${t.to}" — rework that the expected path doesn't allow.`);
    } else {
      deviationSentences.push(`${t.count} items detour "${t.from}" → "${t.to}", off the expected path.`);
    }
  }
  if (bottleneck) {
    deviationSentences.unshift(
      `"${bottleneck}" is the bottleneck: items sit there ${Math.round(worst)} hours on average — the longest of any stage.`,
    );
  }

  return { states, transitions, objects, totalObjects: total, deviationSentences };
}
