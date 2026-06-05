import React from "react";
import { ExternalLink, Trash2 } from "lucide-react";

interface LinkItem {
  id: string;
  title: string;
  url: string;
}

interface LinkCardProps {
  link: LinkItem;
  onDelete: (id: string) => void;
}

export const LinkCard: React.FC<LinkCardProps> = ({ link, onDelete }) => {
  return (
    <div className="group relative flex items-center justify-between rounded-2xl glass-panel glass-panel-hover p-5 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(6,182,212,0.12)]">
      <div className="flex flex-col overflow-hidden pr-4 z-10">
        <span className="truncate font-semibold text-slate-100 tracking-tight">{link.title}</span>
        <span className="truncate text-xs font-medium text-cyan-400/70 mt-1">{link.url}</span>
      </div>
      
      {/* Action Buttons */}
      <div className="flex items-center gap-1 opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 z-10">
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl p-2.5 text-slate-400 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors"
        >
          <ExternalLink size={18} strokeWidth={2.5} />
        </a>
        <button
          onClick={() => onDelete(link.id)}
          className="rounded-xl p-2.5 text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-colors"
        >
          <Trash2 size={18} strokeWidth={2.5} />
        </button>
      </div>

      {/* Subtle hover gradient background injection */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
    </div>
  );
};