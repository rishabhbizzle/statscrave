import { compact } from "@/lib/streamsFormat";

// Day 1..7 bars for a release, optionally against a previous debut (ghost bars).
export default function DayOneBars({ days = [], compare = null, compareLabel }) {
  const all = [...days, ...(compare || [])].filter((v) => typeof v === "number");
  const max = Math.max(1, ...all);
  return (
    <div>
      <div className="flex h-28 items-end gap-1.5">
        {Array.from({ length: 7 }, (_, i) => {
          const v = days[i];
          const c = compare?.[i];
          return (
            <div key={i} className="relative flex h-full flex-1 flex-col justify-end" title={typeof v === "number" ? `Day ${i + 1}: ${compact(v)}` : `Day ${i + 1}`}>
              {typeof c === "number" ? (
                <div className="absolute bottom-0 left-0 right-0 rounded-t bg-muted-foreground/20" style={{ height: `${(c / max) * 100}%` }} />
              ) : null}
              <div
                className={`relative rounded-t ${typeof v === "number" ? "bg-primary" : "border border-dashed border-muted-foreground/40"}`}
                style={{ height: typeof v === "number" ? `${Math.max(2, (v / max) * 100)}%` : "8%" }}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-1 flex gap-1.5 text-center text-[10px] text-muted-foreground">
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} className="flex-1">
            D{i + 1}
          </div>
        ))}
      </div>
      {compare ? (
        <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-sm bg-primary" /> This release
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-sm bg-muted-foreground/30" /> {compareLabel}
          </span>
        </div>
      ) : null}
    </div>
  );
}
