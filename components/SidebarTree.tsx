"use client";

import React, { useState } from "react";
import { ChevronRight, ChevronDown, Folder, FolderOpen, FileCode2, Plus, FolderPlus } from "lucide-react";

interface LinkItem { id: string; title: string; url: string; }
interface Section { id: string; name: string; links: LinkItem[]; }
interface SidebarTreeProps {
  sections: Section[];
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
  activeSectionId: string;
  setActiveSectionId: (id: string) => void;
}

export const SidebarTree: React.FC<SidebarTreeProps> = ({ sections, setSections, activeSectionId, setActiveSectionId }) => {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});
  const [newSectionName, setNewSectionName] = useState("");
  const [isAddingSection, setIsAddingSection] = useState(false);

  const toggleFolder = (id: string) => {
    setExpandedFolders((prev) => ({ ...prev, [id]: !prev[id] }));
    setActiveSectionId(id);
  };

  const handleAddSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSectionName.trim()) return;
    const newSection: Section = { id: crypto.randomUUID(), name: newSectionName.trim(), links: [] };
    setSections([...sections, newSection]);
    setNewSectionName("");
    setIsAddingSection(false);
    setExpandedFolders((prev) => ({ ...prev, [newSection.id]: true }));
    setActiveSectionId(newSection.id);
  };

  return (
    <div className="glass-panel h-full rounded-3xl p-5 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-semibold text-slate-300 tracking-wide uppercase">Explorer</h2>
        <button onClick={() => setIsAddingSection(!isAddingSection)} className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors">
          <FolderPlus size={16} />
        </button>
      </div>

      {isAddingSection && (
        <form onSubmit={handleAddSection} className="mb-4 flex items-center gap-2">
          <input
            autoFocus
            type="text"
            placeholder="Folder name..."
            value={newSectionName}
            onChange={(e) => setNewSectionName(e.target.value)}
            className="w-full rounded-lg bg-slate-900/80 border border-slate-700 px-3 py-1.5 text-sm text-slate-200 focus:border-cyan-500 focus:outline-none"
          />
        </form>
      )}

      <div className="space-y-1 overflow-y-auto flex-1 pr-2 custom-scrollbar">
        {sections.map((section) => {
          const isExpanded = expandedFolders[section.id];
          const isActive = activeSectionId === section.id;

          return (
            <div key={section.id} className="select-none">
              <div
                onClick={() => toggleFolder(section.id)}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-colors ${
                  isActive ? "bg-cyan-500/10 text-cyan-400" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                }`}
              >
                {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                {isExpanded ? <FolderOpen size={16} className="text-cyan-400" /> : <Folder size={16} />}
                <span className="text-sm font-medium truncate">{section.name}</span>
              </div>

              {/* Folder Contents (Files/Links) */}
              {isExpanded && (
                <div className="ml-5 pl-2 border-l border-slate-800 mt-1 space-y-1">
                  {section.links.length === 0 ? (
                    <div className="px-2 py-1 text-xs text-slate-600 italic">Empty folder</div>
                  ) : (
                    section.links.map((link) => (
                      <div key={link.id} className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 transition-colors cursor-pointer" onClick={() => window.open(link.url, '_blank')}>
                        <FileCode2 size={14} className="text-slate-500 shrink-0" />
                        <span className="text-xs truncate">{link.title}</span>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};