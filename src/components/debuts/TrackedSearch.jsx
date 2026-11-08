"use client";

import { useEffect, useRef, useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { compact } from "@/lib/streamsFormat";

const BASE = process.env.NEXT_PUBLIC_BASE_URL;

// Search box over the songs/albums/artists we track (only those have the
// daily history these comparisons need).
export default function TrackedSearch({ type, debutOnly = false, onSelect, placeholder = "Search…", exclude = [] }) {
  const [q, setQ] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const reqId = useRef(0);

  useEffect(() => {
    const term = q.trim();
    if (term.length < 2) {
      setItems([]);
      return;
    }
    const mine = ++reqId.current;
    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const qs = new URLSearchParams({ type, q: term, limit: "8", ...(debutOnly ? { debut: "1" } : {}) });
        const r = await fetch(`${BASE}/tracked/search?${qs}`);
        const body = r.ok ? await r.json() : null;
        if (mine === reqId.current) setItems(Array.isArray(body?.data) ? body.data : []);
      } catch {
        if (mine === reqId.current) setItems([]);
      } finally {
        if (mine === reqId.current) setLoading(false);
      }
    }, 250);
    return () => clearTimeout(t);
  }, [q, type, debutOnly]);

  const shown = items.filter((i) => !exclude.includes(i.spotifyId));
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder={placeholder}
        className="pl-9"
        aria-label={placeholder}
      />
      {loading ? <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" /> : null}
      {open && q.trim().length >= 2 && !loading ? (
        <div className="absolute z-20 mt-1 max-h-72 w-full overflow-y-auto rounded-lg border bg-popover shadow-lg">
          {shown.length ? (
            shown.map((i) => (
              <button
                key={i.spotifyId}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onSelect(i);
                  setQ("");
                  setItems([]);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-accent"
              >
                {i.image ? <img src={i.image} alt="" width={36} height={36} className="h-9 w-9 rounded object-cover" /> : <div className="h-9 w-9 rounded bg-muted" />}
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{i.name}</div>
                  <div className="truncate text-xs text-muted-foreground">
                    {i.artistName ? `${i.artistName} · ` : ""}
                    {compact(i.total)}
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="px-3 py-3 text-sm text-muted-foreground">
              {debutOnly ? "No tracked releases with a first week on record match that." : "Nothing we track matches that."}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
