"use client";

import React, { useState } from "react";
import { Plus, FolderPlus, Tag, Link2 } from "lucide-react";
import { LinkCard } from "./LinkCard";

interface LinkItem { id: string; title: string; url: string; }
interface Section { id: string; name: string; links: LinkItem[]; }
interface SectionManagerProps { sections: Section[]; setSections: React.Dispatch<React.SetStateAction<Section[]>>; }

export const SectionManager: React.FC<SectionManagerProps> = ({ sections, setSections }) => {
  const [activeTab, setActiveTab] = useState<string>(sections[0]?.id || "");
  const [newSectionName, setNewSectionName] = useState("");
  const [linkTitle, setLinkTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  const addSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSectionName.trim()) return;
    const newSection: Section = { id: crypto.randomUUID(), name: newSectionName.trim(), links: [] };
    setSections([...sections, newSection]);
    setActiveTab(newSection.id);
    setNewSectionName("");
  };

  const addLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkTitle.trim() || !linkUrl.trim()) return;
    const formattedUrl = /^https?:\/\//i.test(linkUrl) ? linkUrl : `https://${linkUrl}`;
    setSections(sections.map((sec) => sec.id === activeTab ? { ...sec, links: [...sec.links, { id: crypto.randomUUID(), title: linkTitle, url: formattedUrl }] } : sec));
    setLinkTitle(""); setLinkUrl("");
  };

  const deleteLink = (linkId: string) => {
    setSections(sections.map((sec) => sec.id === activeTab ? { ...sec, links: sec.links.filter((l) => l.id !== linkId) } : sec));
  };

  const currentSection = sections.find((sec) => sec.id === activeTab) || sections[0];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Floating Segmented Controller */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-2 rounded-2xl">
        <div className="flex flex-wrap gap-1 w-full sm:w-auto">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveTab(sec.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                activeTab === sec.id
                  ? "bg-cyan-500/15 text-cyan-400 shadow-[inset_0_1px_0_0_rgba(14,165,233,0.2)]"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Tag size={14} className={activeTab === sec.id ? "fill-cyan-400/20" : ""} />
              {sec.name}
            </button>
          ))}
        </div>

        <form onSubmit={addSection} className="flex items-center gap-2 w-full sm:w-auto px-2 pb-2 sm:pb-0 sm:px-0">
          <input
            type="text"
            placeholder="New Workspace..."
            value={newSectionName}
            onChange={(e) => setNewSectionName(e.target.value)}
            className="w-full sm:w-40 rounded-xl bg-slate-950/50 px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 border border-white/5 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 focus:outline-none transition-all"
          />
          <button type="submit" className="rounded-xl bg-slate-800 p-2.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-700 transition-all shadow-sm">
            <FolderPlus size={18} />
          </button>
        </form>
      </div>

      {/* Main Content Area */}
      {currentSection && (
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Add Link Form - Sticky Sidebar */}
          <div className="w-full md:w-72 shrink-0 glass-panel p-6 rounded-3xl sticky top-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20"><Link2 size={16} className="text-cyan-400"/></div>
              <h3 className="text-base font-semibold text-slate-200 tracking-tight">Add Resource</h3>
            </div>
            <form onSubmit={addLink} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-400 ml-1">Title</label>
                <input type="text" value={linkTitle} onChange={(e) => setLinkTitle(e.target.value)} className="w-full rounded-xl bg-slate-950/50 px-4 py-3 text-sm text-slate-200 border border-white/5 focus:border-cyan-500/50 focus:outline-none transition-colors" placeholder="e.g. GitHub Profile" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-400 ml-1">Destination URL</label>
                <input type="text" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} className="w-full rounded-xl bg-slate-950/50 px-4 py-3 text-sm text-slate-200 border border-white/5 focus:border-cyan-500/50 focus:outline-none transition-colors" placeholder="github.com/..." />
              </div>
              <button type="submit" className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgb(6,182,212,0.3)] hover:shadow-[0_0_25px_rgb(6,182,212,0.5)] hover:-translate-y-0.5 transition-all duration-300">
                <Plus size={18} strokeWidth={2.5} /> Save Link
              </button>
            </form>
          </div>

          {/* Bento Grid Links Display */}
          <div className="flex-1 w-full">
            {currentSection.links.length === 0 ? (
              <div className="flex h-64 flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-slate-700/50 bg-slate-900/20 text-slate-500">
                <Link2 size={32} className="opacity-20" />
                <p className="text-sm font-medium">Your workspace is empty.</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 auto-rows-max">
                {currentSection.links.map((link) => (
                  <LinkCard key={link.id} link={link} onDelete={deleteLink} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};