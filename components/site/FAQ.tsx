"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const MONO = "var(--font-ibm-plex-mono), monospace";
const SERIF = "var(--font-newsreader), serif";

export interface FAQItem {
  q: string;
  a: string;
}

export default function FAQ({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      {items.map((item, i) => (
        <div key={i} style={{ borderTop: "1px solid rgba(20,24,28,0.1)" }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              width: "100%", padding: "24px 0", background: "none", border: "none",
              cursor: "pointer", textAlign: "left", gap: 20,
            }}
          >
            <span style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 400, color: "#14181C", letterSpacing: "-0.01em" }}>
              {item.q}
            </span>
            <ChevronDown
              size={20}
              style={{
                color: "#7a848e", flex: "none",
                transition: "transform 0.3s", transform: open === i ? "rotate(180deg)" : "rotate(0)",
              }}
            />
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: "hidden" }}
              >
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "#4a545e", margin: 0, paddingBottom: 24, maxWidth: 700 }}>
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
      <div style={{ borderTop: "1px solid rgba(20,24,28,0.1)" }} />
    </div>
  );
}
