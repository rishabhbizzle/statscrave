"use client";

import { useEffect, useMemo, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import TrackedSearch from "./TrackedSearch";
import ShareCardButton from "@/components/ShareCardButton";
import { SERIES_COLORS } from "./chartColors";
import { compact, fullNumber, shortDate } from "@/lib/streamsFormat";

const BASE = process.env.NEXT_PUBLIC_BASE_URL;

// Head-to-head first weeks: pick 2-4 releases, see day 1..7 overlaid.
export default function DebutCompare({ type, initialIds = [] }) {
  const [ids, setIds] = useState(initialIds.slice(0, 4));
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const key = ids.join(",");
  useEffect(() => {
    // keep the URL shareable without a server round trip
    const qs = new URLSearchParams({ tab: "compare", type, ...(ids.length ? { ids: key } : {}) });
    window.history.replaceState(null, "", `/debuts?${qs}`);
    if (!ids.length) {
      setItems([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        const url = ids.length >= 2 ? `${BASE}/debuts/compare?type=${type}&ids=${key}` : `${BASE}/insights/${type}/${ids[0]}`;
        const r = await fetch(url);
        const body = r.ok ? await r.json() : null;
        const data = body?.data;
        if (!cancelled) setItems(Array.isArray(data) ? data : data ? [data] : []);
      } catch {
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, type]);

  const rows = useMemo(
    () =>
      Array.from({ length: 7 }, (_, d) => {
        const row = { day: `Day ${d + 1}` };
        items.forEach((it) => {
          const v = it.debut?.days?.[d];
          if (typeof v === "number") row[it.spotifyId] = v;
        });
        return row;
      }),
    [items]
  );
  const withDebut = items.filter((i) => i.debut);
  const ranked = [...withDebut].sort((a, b) => (b.debut.total || 0) - (a.debut.total || 0));

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          {ids.length < 4 ? (
            <TrackedSearch
              type={type}
              debutOnly
              exclude={ids}
              placeholder={`Add ${type === "album" ? "an album" : "a song"} to compare`}
              onSelect={(i) => setIds((cur) => (cur.includes(i.spotifyId) ? cur : [...cur, i.spotifyId].slice(0, 4)))}
            />
          ) : (
            <p className="text-sm text-muted-foreground">Up to 4 at a time.</p>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((it, idx) => (
          <span key={it.spotifyId} className="flex items-center gap-2 rounded-full border py-1 pl-1 pr-2 text-sm">
            {it.image ? <img src={it.image} alt="" width={24} height={24} className="h-6 w-6 rounded-full object-cover" /> : null}
            <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: SERIES_COLORS[idx % SERIES_COLORS.length] }} />
            <span className="max-w-[12rem] truncate">{it.name}</span>
            <button type="button" aria-label={`Remove ${it.name}`} onClick={() => setIds((cur) => cur.filter((x) => x !== it.spotifyId))}>
              <X className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
            </button>
          </span>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center p-10">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      ) : ids.length < 2 ? (
        <div className="mt-4 rounded-xl border p-8 text-center text-muted-foreground">Pick at least two releases to see their first weeks side by side.</div>
      ) : (
        <>
          <div className="mt-4 h-72 w-full rounded-xl border p-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={rows} margin={{ top: 10, right: 16, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={compact} tick={{ fontSize: 12 }} width={56} />
                <Tooltip formatter={(v, key) => [fullNumber(v), items.find((i) => i.spotifyId === key)?.name || key]} />
                {items.map((it, idx) => (
                  <Line key={it.spotifyId} type="monotone" dataKey={it.spotifyId} stroke={SERIES_COLORS[idx % SERIES_COLORS.length]} strokeWidth={2.5} dot={{ r: 3 }} connectNulls={false} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            {ranked.map((it, i) => (
              <div key={it.spotifyId} className="flex items-center gap-3 rounded-lg border p-3">
                <div className="w-5 text-center font-semibold text-muted-foreground">{i + 1}</div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium">{it.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {it.artistName} · released {shortDate(it.debut.releaseDate)}
                    {!it.debut.complete ? ` · ${it.debut.daysCounted} of 7 days so far` : ""}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold tabular-nums">{compact(it.debut.total)}</div>
                  <div className="text-xs text-muted-foreground">day 1: {compact(it.debut.day1)}</div>
                </div>
                <ShareCardButton type={type} id={it.spotifyId} kind="daily" name={it.name} label="" size="icon" variant="ghost" />
              </div>
            ))}
            {items.filter((i) => !i.debut).map((it) => (
              <div key={it.spotifyId} className="rounded-lg border border-dashed p-3 text-sm text-muted-foreground">
                {it.name}: no first-week data (we started tracking it after release day).
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
