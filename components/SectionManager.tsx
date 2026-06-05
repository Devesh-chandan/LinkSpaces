"use client";

import React, { useState } from "react";
import { Plus, Trash2, FolderOpen } from "lucide-react";
import { LinkCard } from "./LinkCard";
import { SidebarTree } from "./SidebarTree";

interface LinkItem { id: string; title: string; url: string; }
interface Section { id: string; name: string; links: LinkItem[]; }
interface SectionManagerProps { sections: Section[]; setSections: React.Dispatch<React.SetStateAction<Section[]>>; }

export const SectionManager: React.FC<SectionManagerProps> = ({ sections, setSections }) => {
  const [activeTab, setActiveTab] = useState<string>(sections[0]?.id || "");
  const [linkTitle, setLinkTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

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

  const deleteActiveSection = () => {
    if (window.confirm(`Delete folder "${currentSection?.name}"?`)) {
      const updatedSections = sections.filter((sec) => sec.id !== activeTab);
      setSections(updatedSections);
      setActiveTab(updatedSections.length > 0 ? updatedSections[0].id : "");
    }
  };

  const currentSection = sections.find((sec) => sec.id === activeTab) || sections[0];

  return (
    <div className="flex flex-col md:flex-row gap-8 h-[calc(100vh-10rem)] min-h-[600px]">
      
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 shrink-0 h-full">
        <SidebarTree sections={sections} setSections={setSections} activeSectionId={activeTab} setActiveSectionId={setActiveTab} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 h-full flex flex-col overflow-y-auto custom-scrollbar pr-4">
        {currentSection ? (
          <div className="space-y-8 pb-8">
            
            {/* Header & Controls */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <h2 className="text-xl font-medium text-slate-100 flex items-center gap-2">
                  <FolderOpen size={20} className="text-slate-500" />
                  {currentSection.name}
                </h2>
                <button onClick={deleteActiveSection} className="text-sm text-slate-500 hover:text-rose-400 transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-slate-900/50">
                  <Trash2 size={14} /> Delete
                </button>
              </div>

              {/* Minimal Input Form */}
              <form onSubmit={addLink} className="flex flex-col sm:flex-row gap-3">
                <input type="text" value={linkTitle} onChange={(e) => setLinkTitle(e.target.value)} className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-slate-500 transition-colors" placeholder="Link Title" />
                <input type="text" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-slate-500 transition-colors" placeholder="https://..." />
                <button type="submit" className="bg-slate-100 text-slate-900 hover:bg-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm">
                  Add Link
                </button>
              </form>
            </div>

            {/* Content Grid */}
            <div>
              {currentSection.links.length === 0 ? (
                <div className="flex h-40 flex-col items-center justify-center rounded-xl border border-dashed border-slate-800 bg-slate-900/20 text-slate-500">
                  <p className="text-sm">No links added to this folder yet.</p>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                  {currentSection.links.map((link) => (
                    <LinkCard key={link.id} link={link} onDelete={deleteLink} />
                  ))}
                </div>
              )}
            </div>

          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-slate-500 border border-dashed border-slate-800 rounded-xl">
            <p className="text-sm">Select a folder to view contents.</p>
          </div>
        )}
      </div>
    </div>
  );
};