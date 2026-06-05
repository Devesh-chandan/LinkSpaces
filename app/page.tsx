"use client";

import { useState, useEffect } from "react";
import { SectionManager } from "@/components/SectionManager";
import { CalendarWidget } from "@/components/CalendarWidget";
import { Layers } from "lucide-react";

interface LinkItem { id: string; title: string; url: string; }
interface Section { id: string; name: string; links: LinkItem[]; }

const DEFAULT_SECTIONS: Section[] = [
  { id: "social", name: "Social", links: [] },
  { id: "work", name: "Work", links: [] },
  { id: "important", name: "Important", links: [] },
  { id: "extras", name: "Extras", links: [] },
];

export default function Home() {
  const [sections, setSections] = useState<Section[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("link_spaces_data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSections(parsed.length > 0 ? parsed : DEFAULT_SECTIONS);
      } catch (e) { setSections(DEFAULT_SECTIONS); }
    } else { setSections(DEFAULT_SECTIONS); }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem("link_spaces_data", JSON.stringify(sections));
  }, [sections, mounted]);

  if (!mounted) return null;

  return (
    <main className="min-h-screen px-4 py-12 max-w-7xl mx-auto space-y-10 relative">
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-cyan-500/10 blur-[120px] pointer-events-none rounded-full" />

      {/* Header Banner */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 glass-panel p-6 rounded-3xl relative z-10">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 p-3 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Layers size={28} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400">
              LinkSpaces
            </h1>
            <p className="text-sm text-cyan-400/80 font-medium tracking-wide">COMMAND CENTER</p>
          </div>
        </div>
      </header>

      {/* Main Workspace Split */}
      <div className="flex flex-col xl:flex-row gap-8 relative z-10">
        <div className="flex-1 min-w-0">
          <SectionManager sections={sections} setSections={setSections} />
        </div>
        <div className="w-full xl:w-80 shrink-0">
          <CalendarWidget />
        </div>
      </div>
    </main>
  );
}