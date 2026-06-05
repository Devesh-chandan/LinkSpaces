"use client";

import React from "react";
import { ExternalLink, Trash2, ArrowUpRight } from "lucide-react";

interface LinkItem { id: string; title: string; url: string; }
interface LinkCardProps { link: LinkItem; onDelete: (id: string) => void; }

export const LinkCard: React.FC<LinkCardProps> = ({ link, onDelete }) => {
  return (
    <div className="group flex items-start justify-between rounded-xl border border-slate-800 bg-slate-900/30 p-4 hover:bg-slate-900/80 hover:border-slate-700 transition-all duration-200">
      
      <div className="flex flex-col overflow-hidden pr-4">
        <a 
          href={link.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-1.5 font-medium text-slate-200 hover:text-white transition-colors truncate"
        >
          {link.title}
          <ArrowUpRight size={14} className="text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
        <span className="truncate text-xs text-slate-500 mt-1">
          {link.url}
        </span>
      </div>
      
      {/* Actions */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-md transition-colors"
        >
          <ExternalLink size={16} />
        </a>
        <button
          onClick={() => onDelete(link.id)}
          className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-md transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};