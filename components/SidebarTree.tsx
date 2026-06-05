"use client";

import React, { useState } from "react";
import { ChevronRight, ChevronDown, Folder, Plus, Trash2, FolderOpen } from "lucide-react";

interface LinkItem { id: string; title: string; url: string; }
interface Section { id: string; name: string; links: LinkItem[]; }
interface SidebarTreeProps {
  sections: Section[];
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
  activeSectionId: string;
  setActiveSectionId: (id: string) => void;
}

export const SidebarTree: React.FC<SidebarTreeProps> = ({ sections, setSections, activeSectionId, setActiveSectionId }) => {
  const [newSectionName, setNewSectionName] = useState("");
  const [isAddingSection, setIsAddingSection] = useState(false);

  const handleAddSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSectionName.trim()) return;
    const newSection: Section = { id: crypto.randomUUID(), name: newSectionName.trim(), links: [] };
    setSections([...sections, newSection]);
    setNewSectionName("");
    setIsAddingSection(false);
    setActiveSectionId(newSection.id);
  };

  const handleDeleteSection = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm("Delete this folder?")) {
      const newSections = sections.filter((s) => s.id !== id);
      setSections(newSections);
      if (activeSectionId === id) setActiveSectionId(newSections.length > 0 ? newSections[0].id : "");
    }
  };

  return (
    <div className="flex flex-col h-full rounded-xl border border-white/5 bg-slate-900/20">
      <div className="flex items-center justify-between p-4 border-b border-white/5">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Spaces</h2>
        <button onClick={() => setIsAddingSection(!isAddingSection)} className="p-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-md transition-colors">
          <Plus size={16} />
        </button>
      </div>

      <div className="p-3 space-y-1 overflow-y-auto flex-1 custom-scrollbar">
        {isAddingSection && (
          <form onSubmit={handleAddSection} className="mb-2">
            <input
              autoFocus
              type="text"
              placeholder="New folder..."
              value={newSectionName}
              onChange={(e) => setNewSectionName(e.target.value)}
              className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-1.5 text-sm text-slate-200 focus:border-slate-500 focus:outline-none transition-colors"
            />
          </form>
        )}

        {sections.map((section) => {
          const isActive = activeSectionId === section.id;
          return (
            <div
              key={section.id}
              onClick={() => setActiveSectionId(section.id)}
              className={`group flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors ${
                isActive ? "bg-slate-800/80 text-slate-100 font-medium" : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-200"
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                {isActive ? <FolderOpen size={15} className="text-slate-300" /> : <Folder size={15} className="text-slate-500" />}
                <span className="text-sm truncate">{section.name}</span>
              </div>
              <button 
                onClick={(e) => handleDeleteSection(e, section.id)}
                className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-rose-400 transition-opacity"
              >
                <Trash2 size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};