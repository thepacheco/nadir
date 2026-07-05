"use client";

// Isometric procedural facility — the "Good Job" look. Pure presentation: it
// consumes the deterministic data from lib/facilityGen.ts and owns every THREE
// object, freeing them all on unmount/regenerate. Geometry is drawn with
// InstancedMesh grouped by kind/room (each group one solid material.color), so
// a whole plant is a couple dozen draw calls with zero per-tile Mesh objects.

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { generateFacility, FLOOR, WALL, type Facility } from "@/lib/facilityGen";
import { floorFor } from "@/lib/floor";
import { useNadir } from "./context";

const TILE = 1;

export default function FacilityScene({ onZoneClick }: { onZoneClick?: (label: string | null) => void }) {
  const { co } = useNadir();
  const mountRef = useRef<HTMLDivElement>(null);
  const clickRef = useRef(onZoneClick);
  useEffect(() => { clickRef.current = onZoneClick; }, [onZoneClick]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const fac: Facility = generateFacility(co.id, floorFor(co.id));
    const { W, H, grid, rooms, props, people } = fac;
    const ox = -W / 2, oz = -H / 2;
    const gx = (x: number) => ox + x * TILE;
    const gz = (y: number) => oz + y * TILE;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#ECE9E2");
    scene.fog = new THREE.FogExp2(0xece9e2, 0.01);
    const world = new THREE.Group();
    scene.add(world);

    const aspect = mount.clientWidth / mount.clientHeight;
    const view = Math.max(W, H) * 0.6;
    const camera = new THREE.OrthographicCamera(-view * aspect, view * aspect, view, -view, -300, 500);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x36404a, 0.62));
    const dir = new THREE.DirectionalLight(0xfff4e6, 0.85);
    dir.position.set(26, 44, 16);
    scene.add(dir);

    const meshes: THREE.InstancedMesh[] = [];
    const geos: THREE.BufferGeometry[] = [];
    const mats: THREE.Material[] = [];
    const dummy = new THREE.Object3D();

    // build one InstancedMesh for a set of cells, all one solid color
    function buildTiles(
      cells: [number, number][], geo: THREE.BufferGeometry, mat: THREE.Material,
      y: number, sx: number, sy: number, sz: number, unlit = false,
    ): THREE.InstancedMesh {
      const m = new THREE.InstancedMesh(geo, mat, cells.length);
      cells.forEach(([x, z], i) => {
        dummy.position.set(gx(x), y, gz(z));
        dummy.scale.set(sx, sy, sz);
        dummy.rotation.set(0, 0, 0);
        dummy.updateMatrix();
        m.setMatrixAt(i, dummy.matrix);
      });
      m.instanceMatrix.needsUpdate = true;
      void unlit;
      meshes.push(m);
      world.add(m);
      return m;
    }

    const roomAt = (x: number, y: number) =>
      rooms.find((r) => x >= r.cx - r.w / 2 && x < r.cx + r.w / 2 && y >= r.cy - r.h / 2 && y < r.cy + r.h / 2);

    // ---- floors: one instanced group per room (solid tint) + corridors ----
    const roomCells = new Map<number, [number, number][]>();
    const corridorCells: [number, number][] = [];
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      if (grid[y * W + x] !== FLOOR) continue;
      const r = roomAt(x, y);
      if (r) { const a = roomCells.get(r.id) ?? []; a.push([x, y]); roomCells.set(r.id, a); }
      else corridorCells.push([x, y]);
    }
    const floorGeo = new THREE.BoxGeometry(TILE, 0.3, TILE); geos.push(floorGeo);
    for (const r of rooms) {
      const cells = roomCells.get(r.id);
      if (!cells?.length) continue;
      const [tr, tg, tb] = r.tint;
      const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(tr * 0.55 + 0.42, tg * 0.55 + 0.42, tb * 0.55 + 0.42) });
      mats.push(mat);
      buildTiles(cells, floorGeo, mat, -0.15, 1, 1, 1, true);
    }
    if (corridorCells.length) {
      const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.72, 0.73, 0.75) }); mats.push(mat);
      buildTiles(corridorCells, floorGeo, mat, -0.18, 1, 0.9, 1, true);
    }

    // ---- walls: one group, low so you see over them into the rooms ----
    const wallCells: [number, number][] = [];
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (grid[y * W + x] === WALL) wallCells.push([x, y]);
    const wallGeo = new THREE.BoxGeometry(TILE, 1, TILE); geos.push(wallGeo);
    const wallMat = new THREE.MeshLambertMaterial({ color: new THREE.Color(0.82, 0.81, 0.78) }); mats.push(wallMat);
    buildTiles(wallCells, wallGeo, wallMat, 1.05 / 2 - 0.15, 1, 1.05, 1);

    // ---- props: one group per kind ----
    const propSpec: Record<string, { h: number; w: number; c: [number, number, number] }> = {
      desk: { h: 0.5, w: 0.7, c: [0.62, 0.47, 0.32] },
      machine: { h: 1.0, w: 0.8, c: [0.2, 0.28, 0.36] },
      rack: { h: 1.25, w: 0.82, c: [0.34, 0.4, 0.46] },
      bay: { h: 0.4, w: 0.9, c: [0.5, 0.52, 0.55] },
      beacon: { h: 1.5, w: 0.42, c: [0.86, 0.26, 0.15] },
    };
    const propGeo = new THREE.BoxGeometry(1, 1, 1); geos.push(propGeo);
    for (const kind of Object.keys(propSpec)) {
      const items = props.filter((p) => p.kind === kind);
      if (!items.length) continue;
      const s = propSpec[kind];
      const mat = new THREE.MeshLambertMaterial({ color: new THREE.Color(...s.c), emissive: kind === "beacon" ? new THREE.Color(0.4, 0.06, 0.02) : new THREE.Color(0, 0, 0) });
      mats.push(mat);
      buildTiles(items.map((p) => [p.x, p.y]), propGeo, mat, s.h / 2, s.w, s.h, s.w);
    }

    // ---- people: busy (teal) + idle (amber), animated wander ----
    const pawnGeo = new THREE.CylinderGeometry(0.2, 0.26, 0.9, 7); geos.push(pawnGeo);
    const peopleGroups: { mesh: THREE.InstancedMesh; base: [number, number, number][] }[] = [];
    for (const [busy, color] of [[true, [0.03, 0.55, 0.62]], [false, [0.9, 0.58, 0.18]]] as const) {
      const grp = people.filter((p) => p.busy === busy);
      if (!grp.length) continue;
      const mat = new THREE.MeshLambertMaterial({ color: new THREE.Color(...color) }); mats.push(mat);
      const mesh = new THREE.InstancedMesh(pawnGeo, mat, grp.length);
      mesh.frustumCulled = false;
      const base: [number, number, number][] = grp.map((p, i) => [gx(p.x), gz(p.y), (i * 1.7) % (Math.PI * 2)]);
      meshes.push(mesh); world.add(mesh);
      peopleGroups.push({ mesh, base });
    }

    // ---- warm status lights on flagged rooms (≤ 8) ----
    let budget = 8;
    for (const r of rooms) {
      if (r.type !== "critical" || budget <= 0) continue;
      const pl = new THREE.PointLight(0xff7043, 2.4, 13, 2);
      pl.position.set(gx(r.cx), 2.2, gz(r.cy));
      scene.add(pl); budget--;
    }

    // ---- floating room labels ----
    const sprites: THREE.Sprite[] = [];
    for (const r of rooms) {
      const cvs = document.createElement("canvas"); cvs.width = 300; cvs.height = 72;
      const c = cvs.getContext("2d")!;
      c.font = "bold 30px 'IBM Plex Sans', sans-serif"; c.textAlign = "center"; c.textBaseline = "middle";
      c.fillStyle = r.type === "critical" ? "#C7452F" : "#14181C";
      c.fillText(r.label, 150, 26);
      c.font = "18px 'IBM Plex Mono', monospace"; c.fillStyle = "#5a646e";
      c.fillText(r.metric.slice(0, 28), 150, 54);
      const tex = new THREE.CanvasTexture(cvs);
      const sm = new THREE.SpriteMaterial({ map: tex, depthTest: false, transparent: true });
      mats.push(sm);
      const sp = new THREE.Sprite(sm);
      sp.position.set(gx(r.cx), 3.0, gz(r.cy));
      sp.scale.set(6.2, 1.5, 1);
      scene.add(sp); sprites.push(sp);
    }

    // ---- camera + interaction ----
    let yaw = Math.PI / 4, dist = Math.max(W, H) * 0.9;
    let dragging = false, moved = 0, lastX = 0, lastY = 0, auto = true;
    const applyCam = () => {
      camera.position.set(Math.cos(yaw) * dist, dist * 1.35, Math.sin(yaw) * dist);
      camera.lookAt(0, 0, 0);
    };
    const el = renderer.domElement;
    const onDown = (e: PointerEvent) => { dragging = true; moved = 0; lastX = e.clientX; lastY = e.clientY; auto = false; };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      moved += Math.abs(dx) + Math.abs(dy);
      yaw -= dx * 0.008; dist = Math.max(W * 0.4, Math.min(W * 1.6, dist - dy * 0.12));
      lastX = e.clientX; lastY = e.clientY; applyCam();
    };
    const raycaster = new THREE.Raycaster(); const ndc = new THREE.Vector2();
    const onUp = (e: PointerEvent) => {
      dragging = false;
      if (moved > 6) return;
      const rect = el.getBoundingClientRect();
      ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(ndc, camera);
      const hit = raycaster.intersectObjects(meshes, false)[0];
      if (hit) {
        const cx = Math.round(hit.point.x - ox), cy = Math.round(hit.point.z - oz);
        clickRef.current?.(roomAt(cx, cy)?.label ?? null);
      } else clickRef.current?.(null);
    };
    const onWheel = (e: WheelEvent) => { e.preventDefault(); dist = Math.max(W * 0.4, Math.min(W * 1.6, dist + e.deltaY * 0.02)); applyCam(); };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    el.addEventListener("wheel", onWheel, { passive: false });
    applyCam();

    let raf = 0; const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      if (auto) { yaw += 0.0015; applyCam(); }
      for (const { mesh, base } of peopleGroups) {
        for (let i = 0; i < base.length; i++) {
          const [bx, bz, ph] = base[i];
          dummy.position.set(bx + Math.cos(t * 0.55 + ph) * 0.24, 0.32 + Math.abs(Math.sin(t * 3 + ph)) * 0.05, bz + Math.sin(t * 0.55 + ph) * 0.24);
          dummy.rotation.set(0, t * 0.55 + ph, 0); dummy.scale.set(1, 1, 1);
          dummy.updateMatrix(); mesh.setMatrixAt(i, dummy.matrix);
        }
        mesh.instanceMatrix.needsUpdate = true;
      }
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const a = mount.clientWidth / mount.clientHeight;
      camera.left = -view * a; camera.right = view * a; camera.top = view; camera.bottom = -view;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("wheel", onWheel);
      sprites.forEach((s) => { scene.remove(s); (s.material as THREE.SpriteMaterial).map?.dispose(); });
      meshes.forEach((m) => m.dispose());
      geos.forEach((g) => g.dispose());
      mats.forEach((m) => m.dispose());
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [co.id]);

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <div ref={mountRef} style={{ width: "100%", height: "100%", cursor: "grab" }} />
      <div style={{ position: "absolute", left: 16, top: 12, fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10.5, color: "#7a848e", pointerEvents: "none" }}>
        3D SITE · procedurally generated from {co.name}&apos;s zones · drag to orbit · scroll to zoom
      </div>
    </div>
  );
}
