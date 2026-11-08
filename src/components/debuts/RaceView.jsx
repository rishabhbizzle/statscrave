"use client";

import { useEffect, useMemo, useState } from "react";
import { X, Loader2, Flag } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import TrackedSearch from "./TrackedSearch";
import { SERIES_COLORS } from "./chartColors";
import { compact, fullNumber, milestoneLabel, etaLabel, shortDate, dataDayLabel } from "@/lib/streamsFormat";

const BASE = process.env.NEXT_PUBLIC_BASE_URL;
const TYPES = [
  ["song", "Songs"],
  ["album", "Albums"],
  ["artist", "Artists"],
];

// Two songs/albums/artists racing to the next milestone neither has hit.
export default function RaceView({ initialType = "song", initialIds = [] }) {
  const [type, setType] = useState(initialType);
  const [picked, setPicked] = useState(initialIds.slice(0, 2).map((spotifyId) => ({ spotifyId })));
  const [race, setRace] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const ids = picked.map((p) => p.spotifyId);

  useEffect(() => {
    const qs = new URLSearchParams({ tab: "race", type, ...(ids.length ? { ids: ids.join(",") } : {}) });
    window.history.replaceState(null, "", `/debuts?${qs}`);
    setRace(null);
    setError(null);
    if (ids.length !== 2) return;
    let cancelled = false;
    setLoading(true);
    fetch(`${BASE}/race?type=${type}&ids=${ids.join(",")}`)
      .then(async (r) => {
        const body = await r.json().catch(() => null);
        if (!r.ok) throw new Error(r.status === 404 ? "We don't have enough history for one of these yet" : body?.message || "Couldn't load the race");
        return body.data;
      })
      .then((d) => !cancelled && setRace(d))
      .catch((e) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(","), type]);

  const rows = useMemo(() => {
    if (!race) return [];
    const byKey = new Map();
    race.racers.forEach((r) =>
      r.history.forEach((h) => {
        const row = byKey.get(h.dateKey) || { dateKey: h.dateKey, label: dataDayLabel(h.dateKey) };
        row[r.spotifyId] = h.total;
        byKey.set(h.dateKey, row);
      })
    );
    const [d, m, y] = [0, 1, 2];
    return [...byKey.values()].sort((a, b) => {
      const pa = a.dateKey.split("-");
      const pb = b.dateKey.split("-");
      return `${pa[y]}${pa[m]}${pa[d]}`.localeCompare(`${pb[y]}${pb[m]}${pb[d]}`);
    });
  }, [race]);

  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-2">
        {TYPES.map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => {
              setType(key);
              setPicked([]);
            }}
            className={`rounded-full border px-3 py-1.5 text-sm ${type === key ? "border-primary bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {[0, 1].map((slot) => {
          const p = picked[slot];
          const racer = race?.racers?.find((r) => r.spotifyId === p?.spotifyId);
          return p ? (
            <div key={slot} className="flex items-center gap-2 rounded-lg border p-2">
              <span className="inline-block h-3 w-3 shrink-0 rounded-full" style={{ background: SERIES_COLORS[slot] }} />
              {(racer?.image || p.image) ? <img src={racer?.image || p.image} alt="" width={36} height={36} className="h-9 w-9 rounded object-cover" /> : null}
              <span className="min-w-0 flex-1 truncate text-sm font-medium">{racer?.name || p.name || "Loading…"}</span>
              <button type="button" aria-label="Remove" onClick={() => setPicked((cur) => cur.filter((_, i) => i !== slot))}>
                <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </button>
            </div>
          ) : (
            <TrackedSearch
              key={`${slot}-${type}`}
              type={type}
              exclude={ids}
              placeholder={slot === 0 ? `Pick the first ${type}` : `Pick a rival ${type}`}
              onSelect={(i) => setPicked((cur) => [...cur.slice(0, slot), i, ...cur.slice(slot)].slice(0, 2))}
            />
          );
        })}
      </div>

      {loading ? (
        <div className="flex justify-center p-10">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      ) : error ? (
        <div className="mt-4 rounded-xl border p-6 text-center text-muted-foreground">{error}</div>
      ) : race ? (
        <div className="mt-5">
          <div className="flex items-center gap-2 text-lg font-bold">
            <Flag className="h-5 w-5 text-primary" /> Race to {milestoneLabel(race.milestone)}
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {race.racers.map((r, idx) => {
              const leader = race.leader === r.spotifyId;
              return (
                <div key={r.spotifyId} className={`rounded-xl border p-4 ${leader ? "border-primary bg-primary/5" : ""}`}>
                  <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: SERIES_COLORS[idx] }}>
                    {r.name} {leader ? <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">gets there first</span> : null}
                  </div>
                  <div className="mt-1 text-2xl font-bold tabular-nums">{compact(r.total)}</div>
                  <div className="text-sm text-muted-foreground">
                    {r.etaDaysToMilestone
                      ? `${milestoneLabel(race.milestone)} in ${etaLabel(r.etaDaysToMilestone)} · ${shortDate(r.etaDateToMilestone)}`
                      : "Not enough recent data for an ETA"}
                  </div>
                  <div className="text-xs text-muted-foreground">{r.avg7 ? `~${compact(r.avg7)}/day lately` : ""}</div>
                </div>
              );
            })}
          </div>
          {rows.length > 1 ? (
            <div className="mt-4 h-72 w-full rounded-xl border p-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={rows} margin={{ top: 10, right: 16, bottom: 0, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="label" tick={{ fontSize: 11 }} minTickGap={24} />
                  <YAxis tickFormatter={compact} tick={{ fontSize: 12 }} width={60} domain={["auto", "auto"]} />
                  <Tooltip formatter={(v, key) => [fullNumber(v), race.racers.find((r) => r.spotifyId === key)?.name || key]} />
                  {race.racers.map((r, idx) => (
                    <Line key={r.spotifyId} type="monotone" dataKey={r.spotifyId} stroke={SERIES_COLORS[idx]} strokeWidth={2.5} dot={false} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : null}
          <p className="mt-2 text-xs text-muted-foreground">Last 60 days of total streams. ETAs assume each keeps its 7-day pace.</p>
        </div>
      ) : (
        <div className="mt-4 rounded-xl border p-8 text-center text-muted-foreground">Pick two to start the race.</div>
      )}
    </div>
  );
}
