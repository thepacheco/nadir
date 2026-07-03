import type { Metadata } from "next";
import Workspace from "@/components/nadir/Workspace";

export const metadata: Metadata = { title: "Live workspace — Nadir" };

export default function WorkspacePage() {
  return <Workspace />;
}
