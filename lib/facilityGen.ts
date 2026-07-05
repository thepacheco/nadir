// Procedural facility generator — the same discipline as a seeded dungeon
// generator, applied to a company's site. Pure data, zero Three.js. One
// integer seed (derived from the company id) reproduces the facility
// bit-for-bit. The renderer (FacilityScene.tsx) consumes this and owns all
// WebGL objects.
//
// Rooms are the company's REAL zones (from lib/floor.ts) — so the generated
// plant always contains the Dispatch Center, the Substation, the Fleet Yard —
// but their placement, the corridors, walls, props and people are generated.

import type { FloorZone } from "./floor";

export const VOID = 0;
export const FLOOR = 1;
export const WALL = 2;

export interface FacilityRoom {
  id: number;
  label: string;
  kind: FloorZone["kind"];
  cx: number; cy: number; // center in grid cells
  w: number; h: number;   // size in grid cells
  type: "entrance" | "critical" | "normal";
  present: number;
  metric: string;
  tint: [number, number, number]; // 0..1 rgb
}
export interface FacilityEdge { a: number; b: number; isLoop: boolean; }
export interface FacilityProp { kind: "desk" | "machine" | "rack" | "bay" | "beacon"; x: number; y: number; roomId: number; }
export interface FacilityPerson { x: number; y: number; roomId: number; busy: boolean; }

export interface Facility {
  companyId: string;
  W: number; H: number;
  grid: Uint8Array;
  rooms: FacilityRoom[];
  edges: FacilityEdge[];
  props: FacilityProp[];
  people: FacilityPerson[];
  stats: { rooms: number; edges: number; loops: number; floorTiles: number; wallTiles: number; genMs: number; reachablePct: number };
}

// ---------- deterministic RNG (mulberry32) ----------
function hashStr(s: string): number {
  let h = 1779033703 ^ s.length;
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(h ^ s.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}
function mulberry32(seed: number) {
  let a = seed >>> 0;
  const r = () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return {
    float: (lo: number, hi: number) => lo + (hi - lo) * r(),
    int: (lo: number, hi: number) => Math.floor(lo + (hi - lo + 1) * r()),
    chance: (p: number) => r() < p,
    raw: r,
  };
}

const KIND_TINT: Record<FloorZone["kind"], [number, number, number]> = {
  office: [0.09, 0.49, 0.54],       // teal
  kitchen: [0.71, 0.46, 0.08],      // amber
  line: [0.09, 0.52, 0.31],         // green
  storage: [0.42, 0.46, 0.5],       // slate
  dock: [0.35, 0.4, 0.45],          // gray
  substation: [0.78, 0.27, 0.18],   // warm red
  generic: [0.3, 0.36, 0.42],
};
const KIND_PROP: Record<FloorZone["kind"], FacilityProp["kind"]> = {
  office: "desk", kitchen: "machine", line: "machine", storage: "rack",
  dock: "bay", substation: "machine", generic: "desk",
};

function carveRect(grid: Uint8Array, W: number, x0: number, y0: number, w: number, h: number) {
  for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) grid[y * W + x] = FLOOR;
}
function carveCorridor(grid: Uint8Array, W: number, H: number, ax: number, ay: number, bx: number, by: number, elbowHoriz: boolean, width: number) {
  const stampH = (x0: number, x1: number, y: number) => {
    for (let x = Math.min(x0, x1); x <= Math.max(x0, x1); x++)
      for (let w = 0; w < width; w++) { const yy = y + w; if (yy >= 0 && yy < H && x >= 0 && x < W) grid[yy * W + x] = FLOOR; }
  };
  const stampV = (y0: number, y1: number, x: number) => {
    for (let y = Math.min(y0, y1); y <= Math.max(y0, y1); y++)
      for (let w = 0; w < width; w++) { const xx = x + w; if (xx >= 0 && xx < W && y >= 0 && y < H) grid[y * W + xx] = FLOOR; }
  };
  if (elbowHoriz) { stampH(ax, bx, ay); stampV(ay, by, bx); }
  else { stampV(ay, by, ax); stampH(ax, bx, by); }
}

interface Box { cx: number; cy: number; w: number; h: number; }
function overlaps(a: Box, b: Box, pad: number): boolean {
  return Math.abs(a.cx - b.cx) * 2 < a.w + b.w + pad * 2 && Math.abs(a.cy - b.cy) * 2 < a.h + b.h + pad * 2;
}

function attempt(companyId: string, zones: FloorZone[], seed: number): Facility | null {
  const rng = mulberry32(seed);
  const n = zones.length;

  // 1. size + scatter rooms inside an ellipse (radius grows with room count)
  const radius = 7 + Math.sqrt(n) * 3;
  const boxes: Box[] = zones.map((z) => {
    const w = Math.max(5, Math.round(z.w * 2.4));
    const h = Math.max(5, Math.round(z.d * 2.4));
    const ang = rng.float(0, Math.PI * 2);
    const rad = radius * Math.sqrt(rng.raw());
    return { cx: Math.cos(ang) * rad, cy: Math.sin(ang) * rad * 0.85, w, h };
  });

  // 2. separate (AABB push-apart, 2-cell pad)
  for (let iter = 0; iter < 300; iter++) {
    let moved = false;
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
      if (overlaps(boxes[i], boxes[j], 2)) {
        let dx = boxes[j].cx - boxes[i].cx, dy = boxes[j].cy - boxes[i].cy;
        if (dx === 0 && dy === 0) { dx = rng.float(-1, 1); dy = rng.float(-1, 1); }
        const len = Math.hypot(dx, dy) || 1;
        const push = 0.6;
        boxes[i].cx -= (dx / len) * push; boxes[i].cy -= (dy / len) * push;
        boxes[j].cx += (dx / len) * push; boxes[j].cy += (dy / len) * push;
        moved = true;
      }
    }
    if (!moved) break;
  }

  // snap + normalize to a positive grid with a 3-cell border
  boxes.forEach((b) => { b.cx = Math.round(b.cx); b.cy = Math.round(b.cy); });
  const minX = Math.min(...boxes.map((b) => b.cx - b.w / 2));
  const minY = Math.min(...boxes.map((b) => b.cy - b.h / 2));
  const B = 3;
  boxes.forEach((b) => { b.cx = Math.round(b.cx - minX) + B; b.cy = Math.round(b.cy - minY) + B; });
  const W = Math.ceil(Math.max(...boxes.map((b) => b.cx + b.w / 2))) + B;
  const H = Math.ceil(Math.max(...boxes.map((b) => b.cy + b.h / 2))) + B;
  const grid = new Uint8Array(W * H);

  // 3. semantics: entrance = an office/reception; critical = has a critical zone metric
  const rooms: FacilityRoom[] = zones.map((z, i) => ({
    id: i, label: z.label, kind: z.kind,
    cx: boxes[i].cx, cy: boxes[i].cy, w: boxes[i].w, h: boxes[i].h,
    type: "normal", present: z.present, metric: z.metric, tint: KIND_TINT[z.kind],
  }));
  const entranceIdx = Math.max(0, rooms.findIndex((r) => r.kind === "office"));
  rooms[entranceIdx].type = "entrance";
  rooms.forEach((r) => {
    if (r.type !== "entrance" && /\+\d|deviation|missing|short|expired|excursion|overload|stalled|°C|flagged|over norm|off-spec|held|high|overdue/i.test(r.metric)) r.type = "critical";
  });

  // 4. connectivity: Prim MST over centers, then a few loop edges
  const dist = (a: number, b: number) => Math.hypot(rooms[a].cx - rooms[b].cx, rooms[a].cy - rooms[b].cy);
  const inTree = new Set<number>([entranceIdx]);
  const edges: FacilityEdge[] = [];
  const mstLens: number[] = [];
  while (inTree.size < n) {
    let best = -1, bestJ = -1, bestD = Infinity;
    for (const i of inTree) for (let j = 0; j < n; j++) {
      if (inTree.has(j)) continue;
      const d = dist(i, j);
      if (d < bestD) { bestD = d; best = i; bestJ = j; }
    }
    if (bestJ < 0) break;
    edges.push({ a: best, b: bestJ, isLoop: false });
    mstLens.push(bestD);
    inTree.add(bestJ);
  }
  const meanLen = mstLens.reduce((s, v) => s + v, 0) / Math.max(1, mstLens.length);
  const has = (a: number, b: number) => edges.some((e) => (e.a === a && e.b === b) || (e.a === b && e.b === a));
  let loops = 0;
  for (let i = 0; i < n && loops < 2; i++) for (let j = i + 1; j < n && loops < 2; j++) {
    if (has(i, j)) continue;
    if (dist(i, j) <= meanLen * 1.6 && rng.chance(0.5)) { edges.push({ a: i, b: j, isLoop: true }); loops++; }
  }

  // 5. carve rooms + corridors
  rooms.forEach((r) => carveRect(grid, W, Math.round(r.cx - r.w / 2), Math.round(r.cy - r.h / 2), r.w, r.h));
  edges.forEach((e) => {
    const a = rooms[e.a], b = rooms[e.b];
    carveCorridor(grid, W, H, Math.round(a.cx), Math.round(a.cy), Math.round(b.cx), Math.round(b.cy), rng.chance(0.5), e.isLoop ? 2 : 3);
  });

  // 6. flood-fill from entrance; must reach 100% of floor
  const total = grid.reduce((s, v) => s + (v === FLOOR ? 1 : 0), 0);
  const seen = new Uint8Array(W * H);
  const startX = Math.round(rooms[entranceIdx].cx), startY = Math.round(rooms[entranceIdx].cy);
  const stack = [startY * W + startX];
  seen[startY * W + startX] = 1;
  let reached = 0;
  while (stack.length) {
    const c = stack.pop()!;
    if (grid[c] !== FLOOR) continue;
    reached++;
    const x = c % W, y = (c / W) | 0;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
      const ni = ny * W + nx;
      if (!seen[ni] && grid[ni] === FLOOR) { seen[ni] = 1; stack.push(ni); }
    }
  }
  const reachablePct = total ? reached / total : 0;
  if (reachablePct < 0.999) return null; // re-roll upstream

  // 7. walls = VOID cell 8-adjacent to FLOOR
  let wallTiles = 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    if (grid[y * W + x] !== VOID) continue;
    let adj = false;
    for (let dy = -1; dy <= 1 && !adj; dy++) for (let dx = -1; dx <= 1; dx++) {
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
      if (grid[ny * W + nx] === FLOOR) { adj = true; break; }
    }
    if (adj) { grid[y * W + x] = WALL; wallTiles++; }
  }

  // 8. props + people (data only)
  const isRoomFloor = (r: FacilityRoom, x: number, y: number) =>
    x >= r.cx - r.w / 2 && x < r.cx + r.w / 2 && y >= r.cy - r.h / 2 && y < r.cy + r.h / 2 && grid[y * W + x] === FLOOR;
  const props: FacilityProp[] = [];
  const people: FacilityPerson[] = [];
  const occupied = new Set<number>();
  for (const r of rooms) {
    const propKind = KIND_PROP[r.kind];
    // props on an interior lattice, inset by 1
    for (let y = Math.round(r.cy - r.h / 2) + 1; y < r.cy + r.h / 2 - 1; y += 2) {
      for (let x = Math.round(r.cx - r.w / 2) + 1; x < r.cx + r.w / 2 - 1; x += 2) {
        if (!isRoomFloor(r, x, y)) continue;
        if (rng.chance(0.6)) { props.push({ kind: propKind, x, y, roomId: r.id }); occupied.add(y * W + x); }
      }
    }
    if (r.type === "critical") { props.push({ kind: "beacon", x: Math.round(r.cx), y: Math.round(r.cy), roomId: r.id }); occupied.add(Math.round(r.cy) * W + Math.round(r.cx)); }
    // people = present, on free interior floor cells
    let placed = 0, guard = 0;
    const target = Math.min(r.present, 14);
    while (placed < target && guard < 200) {
      guard++;
      const x = rng.int(Math.round(r.cx - r.w / 2) + 1, Math.round(r.cx + r.w / 2) - 2);
      const y = rng.int(Math.round(r.cy - r.h / 2) + 1, Math.round(r.cy + r.h / 2) - 2);
      const ci = y * W + x;
      if (isRoomFloor(r, x, y) && !occupied.has(ci)) { people.push({ x, y, roomId: r.id, busy: rng.chance(0.7) }); occupied.add(ci); placed++; }
    }
  }

  return {
    companyId, W, H, grid, rooms, edges, props, people,
    stats: { rooms: n, edges: edges.length, loops: edges.length - (n - 1), floorTiles: total, wallTiles, genMs: 0, reachablePct },
  };
}

export function generateFacility(companyId: string, zones: FloorZone[]): Facility {
  const t0 = typeof performance !== "undefined" ? performance.now() : Date.now();
  const base = hashStr(companyId);
  let fac: Facility | null = null;
  for (let k = 0; k < 6 && !fac; k++) fac = attempt(companyId, zones, base + k * 0x9e3779b1);
  // last-resort: accept a re-roll even if imperfect (should never happen with these room counts)
  if (!fac) fac = attempt(companyId, zones, base) ?? attempt(companyId, zones, base + 999)!;
  const t1 = typeof performance !== "undefined" ? performance.now() : Date.now();
  fac.stats.genMs = Math.round((t1 - t0) * 100) / 100;
  return fac;
}

// grid checksum for determinism tests
export function facilityChecksum(f: Facility): number {
  let h = 2166136261 >>> 0;
  h = Math.imul(h ^ f.W, 16777619); h = Math.imul(h ^ f.H, 16777619);
  for (let i = 0; i < f.grid.length; i++) h = Math.imul(h ^ f.grid[i], 16777619);
  return h >>> 0;
}
