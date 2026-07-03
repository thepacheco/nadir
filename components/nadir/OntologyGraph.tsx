"use client";

import { useMemo } from "react";
import ReactFlow, { Background, Controls, Node, Edge, MarkerType } from "reactflow";
import "reactflow/dist/style.css";

const MONO = "var(--font-ibm-plex-mono), monospace";

interface GraphData {
  nodes: { label: string; type: string; x: number; y: number; meta: string; derivation?: any[] }[];
  edges: [number, number][];
}

const TYPE_COLORS: Record<string, string> = {
  source: "#5a646e",
  object: "#0E7C8A",
  process: "#15854F",
  risk: "#C7452F",
};

export default function OntologyGraph({ graph }: { graph: GraphData }) {
  const nodes: Node[] = useMemo(() => {
    return graph.nodes.map((n, i) => ({
      id: String(i),
      position: { x: n.x * 6, y: n.y * 6 },
      data: {
        label: (
          <div style={{ textAlign: "left", padding: "4px 8px" }}>
            <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.08em", color: TYPE_COLORS[n.type] || "#5a646e", marginBottom: 4, textTransform: "uppercase" }}>
              {n.type}
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#14181C", marginBottom: 4 }}>{n.label}</div>
            {n.meta && <div style={{ fontSize: 11, color: "#7a848e", lineHeight: 1.4 }}>{n.meta}</div>}
          </div>
        ),
      },
      style: {
        background: "#FFFFFF",
        border: `1px solid ${TYPE_COLORS[n.type] || "#ccc"}`,
        borderRadius: 8,
        boxShadow: "0 4px 12px rgba(20,24,28,0.08)",
        width: 180,
      },
    }));
  }, [graph.nodes]);

  const edges: Edge[] = useMemo(() => {
    return graph.edges.map(([source, target], i) => ({
      id: `e${source}-${target}`,
      source: String(source),
      target: String(target),
      animated: true,
      style: { stroke: "#0E7C8A", strokeWidth: 1.5, opacity: 0.6 },
      markerEnd: { type: MarkerType.ArrowClosed, color: "#0E7C8A" },
    }));
  }, [graph.edges]);

  return (
    <div style={{ width: "100%", height: "100%", background: "#F3F1EC" }}>
      <ReactFlow nodes={nodes} edges={edges} fitView minZoom={0.2} maxZoom={2}>
        <Background color="#ccc" gap={16} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}
