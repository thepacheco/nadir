import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "#FAF9F7", minHeight: "100vh", position: "relative", color: "#14181C" }}>
      <div
        style={{
          position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage:
            "radial-gradient(circle, rgba(14,124,138,0.14) 1.1px, transparent 1.3px), radial-gradient(circle, rgba(20,24,28,0.05) 1px, transparent 1.2px)",
          backgroundSize: "27px 27px, 38px 38px", backgroundPosition: "0 0, 0 0",
          animation: "nadirDrift 30s linear infinite",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <SiteNav />
        {children}
        <SiteFooter />
      </div>
    </div>
  );
}
