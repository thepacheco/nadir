"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Variant = "utility" | "manufacturing" | "staffing";

interface Box {
  x: number;
  z: number;
  w: number;
  d: number;
  h: number;
}
interface Label {
  x: number;
  z: number;
  t: string;
}
interface Marker {
  x: number;
  z: number;
  y: number;
  c: number;
}
interface Layout {
  boxes: Box[];
  labels: Label[];
  markers: Marker[];
}

const RED = 0xc7452f;
const AMBER = 0xb47614;
const BUILDING_TONES = [0xe4e0d8, 0xd7d2c8, 0xc9c4b9];

const LAYOUTS: Record<Variant, Layout> = {
  utility: {
    boxes: [
      { x: -6, z: -2, w: 2.2, d: 2.2, h: 2.6 }, { x: -2.5, z: -2, w: 2.2, d: 2.2, h: 2.6 },
      { x: 1, z: -2, w: 2.2, d: 2.2, h: 2.6 }, { x: 5, z: -3, w: 4.5, d: 3, h: 1.8 },
      { x: -5, z: 3, w: 1, d: 6, h: 3.4 }, { x: -2, z: 3, w: 1, d: 6, h: 3.4 },
      { x: 1, z: 3, w: 1, d: 6, h: 3.4 }, { x: 5.5, z: 3.5, w: 2.4, d: 2.4, h: 1.2 },
    ],
    labels: [{ x: -6, z: -2, t: "T-114" }, { x: 5, z: -3, t: "CONTROL" }, { x: 1, z: 3, t: "FEEDER 12" }],
    markers: [{ x: -6, z: -2, y: 3.1, c: RED }, { x: 1, z: 3, y: 3.9, c: AMBER }, { x: 5, z: -3, y: 2.3, c: AMBER }],
  },
  manufacturing: {
    boxes: [
      { x: -6, z: -3.5, w: 8, d: 1.6, h: 1.4 }, { x: -6, z: -0.5, w: 8, d: 1.6, h: 1.4 },
      { x: -6, z: 2.5, w: 8, d: 1.6, h: 1.4 }, { x: 3.5, z: -2.5, w: 3, d: 3, h: 3.2 },
      { x: 4, z: 2.5, w: 4.4, d: 3.4, h: 2.4 }, { x: -6, z: 5.5, w: 3, d: 1.6, h: 1 },
    ],
    labels: [{ x: 3.5, z: -2.5, t: "KILN" }, { x: -6, z: 2.5, t: "LINE 3" }, { x: 4, z: 2.5, t: "WAREHOUSE" }],
    markers: [{ x: 3.5, z: -2.5, y: 3.7, c: RED }, { x: -6, z: 2.5, y: 1.9, c: AMBER }, { x: 4, z: 2.5, y: 2.9, c: AMBER }],
  },
  staffing: {
    boxes: [
      { x: -6.5, z: 0, w: 2, d: 2, h: 0.8 }, { x: -3.5, z: 0, w: 2, d: 2, h: 1.5 },
      { x: -0.5, z: 0, w: 2, d: 2, h: 2.3 }, { x: 2.5, z: 0, w: 2, d: 2, h: 3.1 },
      { x: 5.5, z: 0, w: 2, d: 2, h: 4 }, { x: -0.5, z: 4, w: 3, d: 2, h: 1.2 },
      { x: -0.5, z: -4, w: 3, d: 2, h: 1.2 },
    ],
    labels: [{ x: -0.5, z: 4, t: "BACK OFFICE" }, { x: 5.5, z: 0, t: "PLACED" }, { x: -0.5, z: -4, t: "FINANCE" }],
    markers: [{ x: -0.5, z: 4, y: 1.7, c: RED }, { x: -0.5, z: -4, y: 1.7, c: AMBER }, { x: 5.5, z: 0, y: 4.5, c: AMBER }],
  },
};

function makeLabelTexture(text: string, color: string): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 64;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = color;
  ctx.font = '600 30px "IBM Plex Mono", monospace';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 128, 34);
  return c;
}

interface Blip {
  core: THREE.Mesh;
  ring: THREE.Mesh;
  offset: number;
}

export default function Nadir3D({ variant }: { variant: Variant }) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const stateRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    siteGroup: THREE.Group;
    blips: Blip[];
    labels: THREE.Sprite[];
    theta: number;
    targetTheta: number;
    phi: number;
    dist: number;
    raf: number;
    ro: ResizeObserver;
  } | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const size = (): [number, number] => {
      const w = host.clientWidth || host.parentElement?.clientWidth || 800;
      const h = host.clientHeight || host.parentElement?.clientHeight || 500;
      return [w, h];
    };

    const [w, h] = size();
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;cursor:inherit;";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xedeae3, 22, 48);
    const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100);

    scene.add(new THREE.HemisphereLight(0xffffff, 0xdedad2, 1.05));
    const dir = new THREE.DirectionalLight(0xffffff, 0.75);
    dir.position.set(9, 15, 7);
    scene.add(dir);
    const dir2 = new THREE.DirectionalLight(0xcfe0e4, 0.3);
    dir2.position.set(-8, 6, -6);
    scene.add(dir2);

    const grid = new THREE.GridHelper(34, 34, 0xc9c4b9, 0xddd8ce);
    grid.position.y = 0.01;
    scene.add(grid);
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(64, 64),
      new THREE.MeshStandardMaterial({ color: 0xedeae3, roughness: 1 })
    );
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    const siteGroup = new THREE.Group();
    scene.add(siteGroup);

    const st = {
      renderer,
      scene,
      camera,
      siteGroup,
      blips: [] as Blip[],
      labels: [] as THREE.Sprite[],
      theta: 0.7,
      targetTheta: 0.7,
      phi: 0.44,
      dist: 21,
      raf: 0,
      ro: null as unknown as ResizeObserver,
    };
    stateRef.current = st;

    let dragging = false;
    let lastX = 0;
    const el = renderer.domElement;
    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      el.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (dragging) {
        st.targetTheta += (e.clientX - lastX) * 0.006;
        lastX = e.clientX;
      }
    };
    const onUp = () => {
      dragging = false;
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);

    const ro = new ResizeObserver(() => {
      const [w2, h2] = size();
      if (!w2 || !h2) return;
      camera.aspect = w2 / h2;
      camera.updateProjectionMatrix();
      renderer.setSize(w2, h2);
    });
    ro.observe(host);
    st.ro = ro;

    const clock = new THREE.Clock();
    let disposed = false;
    const tick = () => {
      if (disposed) return;
      st.raf = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();
      if (!dragging) st.targetTheta += 0.0012;
      st.theta += (st.targetTheta - st.theta) * 0.08;
      const cx = Math.sin(st.theta) * Math.cos(st.phi) * st.dist;
      const cz = Math.cos(st.theta) * Math.cos(st.phi) * st.dist;
      const cy = Math.sin(st.phi) * st.dist;
      camera.position.set(cx, cy, cz);
      camera.lookAt(0, 0.9, 0);
      for (const b of st.blips) {
        const p = (t * 0.85 + b.offset) % 1;
        b.ring.scale.setScalar(0.3 + p * 2.0);
        (b.ring.material as THREE.MeshBasicMaterial).opacity = 0.7 * (1 - p);
        (b.core.material as THREE.MeshStandardMaterial).emissiveIntensity = 1.5 + Math.sin(t * 4 + b.offset * 6) * 0.7;
      }
      for (const label of st.labels) label.quaternion.copy(camera.quaternion);
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(st.raf);
      ro.disconnect();
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      siteGroup.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else if (mat) mat.dispose();
      });
      renderer.dispose();
      if (renderer.domElement.parentElement === host) host.removeChild(renderer.domElement);
      stateRef.current = null;
    };
  }, []);

  useEffect(() => {
    const st = stateRef.current;
    if (!st) return;
    const layout = LAYOUTS[variant] || LAYOUTS.manufacturing;
    const g = st.siteGroup;
    while (g.children.length) {
      const c = g.children[0];
      g.remove(c);
      const mesh = c as THREE.Mesh | THREE.LineSegments | THREE.Sprite;
      const geo = (mesh as THREE.Mesh).geometry;
      if (geo) geo.dispose();
      const mat = (mesh as THREE.Mesh).material as THREE.Material & { map?: THREE.Texture | null };
      if (mat) {
        if (mat.map) mat.map.dispose();
        mat.dispose();
      }
    }
    const blips: Blip[] = [];
    const labels: THREE.Sprite[] = [];

    layout.boxes.forEach((b, i) => {
      const geo = new THREE.BoxGeometry(b.w, b.h, b.d);
      const mesh = new THREE.Mesh(
        geo,
        new THREE.MeshStandardMaterial({ color: BUILDING_TONES[i % 3], roughness: 0.78, metalness: 0.05 })
      );
      mesh.position.set(b.x, b.h / 2, b.z);
      g.add(mesh);
      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(geo),
        new THREE.LineBasicMaterial({ color: 0x9a968d, transparent: true, opacity: 0.55 })
      );
      edges.position.copy(mesh.position);
      g.add(edges);
    });

    (layout.labels || []).forEach((lb) => {
      const tex = new THREE.CanvasTexture(makeLabelTexture(lb.t, "#5a646e"));
      const spr = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
      spr.position.set(lb.x, 0.35, lb.z + 0.9);
      spr.scale.set(2.6, 0.65, 1);
      g.add(spr);
      labels.push(spr);
    });

    layout.markers.forEach((m, j) => {
      const core = new THREE.Mesh(
        new THREE.SphereGeometry(0.17, 16, 16),
        new THREE.MeshStandardMaterial({ color: m.c, emissive: m.c, emissiveIntensity: 1.6 })
      );
      core.position.set(m.x, m.y, m.z);
      g.add(core);
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.32, 0.42, 32),
        new THREE.MeshBasicMaterial({ color: m.c, transparent: true, opacity: 0.55, side: THREE.DoubleSide })
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(m.x, 0.06, m.z);
      g.add(ring);
      const beam = new THREE.Mesh(
        new THREE.CylinderGeometry(0.014, 0.014, m.y, 6),
        new THREE.MeshBasicMaterial({ color: m.c, transparent: true, opacity: 0.4 })
      );
      beam.position.set(m.x, m.y / 2, m.z);
      g.add(beam);
      blips.push({ core, ring, offset: j * 0.33 });
    });

    st.blips = blips;
    st.labels = labels;
  }, [variant]);

  return <div ref={hostRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />;
}
