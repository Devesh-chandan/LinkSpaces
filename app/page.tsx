"use client";

import { useState, useEffect } from "react";
import { SectionManager } from "@/components/SectionManager";
import { Layers } from "lucide-react";

interface LinkItem { id: string; title: string; url: string; }
interface Section { id: string; name: string; links: LinkItem[]; }
const DEFAULT_SECTIONS: Section[] = [{ id: "General", name: "General", links: [] }];

export default function Home() {
  const [sections, setSections] = useState<Section[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("link_spaces_data");
    if (saved) {
      try { setSections(JSON.parse(saved).length > 0 ? JSON.parse(saved) : DEFAULT_SECTIONS); } 
      catch (e) { setSections(DEFAULT_SECTIONS); }
    } else { setSections(DEFAULT_SECTIONS); }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem("link_spaces_data", JSON.stringify(sections));
  }, [sections, mounted]);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-slate-200 font-sans selection:bg-slate-800">
      <div className="max-w-screen-2xl mx-auto px-6 py-10 space-y-8">
        
        {/* Sleek Minimal Header */}
        <header className="flex items-center justify-between pb-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-slate-900 border border-slate-800 p-2 text-slate-100 shadow-sm">
              <Layers size={20} strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-slate-100">
                LinkSpaces
              </h1>
              <p className="text-xs text-slate-500 font-medium tracking-wide">
                WORKSPACE
              </p>
            </div>
          </div>
        </header>

        {/* Main Interface */}
        <div className="w-full">
          <SectionManager sections={sections} setSections={setSections} />
        </div>
      </div>
    </main>
  );
}