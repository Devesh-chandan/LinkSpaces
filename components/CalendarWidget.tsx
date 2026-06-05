import React, { useState } from "react";
import { Calendar, CalendarPlus } from "lucide-react";

export const CalendarWidget: React.FC = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const handleQuickSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date) return;

    // Convert date string to Google Calendar format (YYYYMMDD)
    const formattedDate = date.replace(/-/g, "");
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&dates=${formattedDate}/${formattedDate}`;

    window.open(googleCalendarUrl, "_blank");
    setTitle("");
    setDate("");
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-5 backdrop-blur-md">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="text-cyan-400" size={18} />
        <h2 className="text-sm font-semibold text-slate-200">Quick Schedule Link</h2>
      </div>

      <form onSubmit={handleQuickSchedule} className="space-y-3">
        <input
          type="text"
          placeholder="Event / Reminder Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2 text-sm text-slate-200 focus:border-cyan-500/50 focus:outline-none"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2 text-sm text-slate-200 focus:border-cyan-500/50 focus:outline-none [color-scheme:dark]"
        />
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-800 py-2 text-sm font-medium text-slate-200 border border-slate-700 hover:bg-slate-700 transition-colors"
        >
          <CalendarPlus size={16} /> Open in Google Calendar
        </button>
      </form>
    </div>
  );
};