"use client";

import { useEffect, useState } from "react";

const pad = (n) => String(n).padStart(2, "0");

export function remaining(target, now = Date.now()) {
  const ms = Math.max(0, new Date(target).getTime() - now);
  return {
    done: ms === 0,
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms % 86_400_000) / 3_600_000),
    minutes: Math.floor((ms % 3_600_000) / 60_000),
    seconds: Math.floor((ms % 60_000) / 1000),
  };
}

// Ticking d / h / m / s countdown. Renders nothing until mounted, so server
// and client never disagree about the current second.
export default function Countdown({ target, compact = false, doneLabel = "Out now", className = "" }) {
  const [now, setNow] = useState(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  if (now == null) return <span className={className}>&nbsp;</span>;
  const r = remaining(target, now);
  if (r.done) return <span className={className}>{doneLabel}</span>;
  if (compact) {
    return (
      <span className={`tabular-nums ${className}`}>
        {r.days > 0 ? `${r.days}d ` : ""}
        {pad(r.hours)}:{pad(r.minutes)}:{pad(r.seconds)}
      </span>
    );
  }
  const cells = [
    [r.days, "days"],
    [r.hours, "hrs"],
    [r.minutes, "min"],
    [r.seconds, "sec"],
  ];
  return (
    <div className={`flex gap-2 ${className}`} role="timer" aria-label={`${r.days} days ${r.hours} hours ${r.minutes} minutes left`}>
      {cells.map(([v, label]) => (
        <div key={label} className="min-w-[3.5rem] rounded-lg bg-background/60 px-2 py-1.5 text-center">
          <div className="text-2xl font-bold tabular-nums">{label === "days" ? v : pad(v)}</div>
          <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
        </div>
      ))}
    </div>
  );
}
