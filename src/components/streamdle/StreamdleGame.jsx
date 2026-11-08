"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAuth, SignInButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Share2, Flame, Trophy, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Countdown from "@/components/Countdown";
import { fullNumber, compact } from "@/lib/streamsFormat";

const BASE = process.env.NEXT_PUBLIC_BASE_URL;
const ROUNDS = 10;

// localStorage can be missing (private mode) or throw; the game must still work
const store = {
  get(key, fallback) {
    try {
      const v = window.localStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore */
    }
  },
};

const progressKey = (date) => `streamdle:${date}`;
const STATS_KEY = "streamdle:stats";
const nextUtcMidnight = () => {
  const d = new Date();
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1)).toISOString();
};
const prevDate = (date) => new Date(new Date(`${date}T00:00:00Z`).getTime() - 86_400_000).toISOString().slice(0, 10);

// Local streak for players who aren't signed in.
function recordLocal(gameDate, score) {
  const s = store.get(STATS_KEY, { played: 0, best: 0, currentStreak: 0, maxStreak: 0, lastDate: null, distribution: Array(ROUNDS + 1).fill(0) });
  if (s.lastDate === gameDate) return s;
  const currentStreak = s.lastDate === prevDate(gameDate) ? s.currentStreak + 1 : 1;
  const distribution = Array.isArray(s.distribution) && s.distribution.length === ROUNDS + 1 ? [...s.distribution] : Array(ROUNDS + 1).fill(0);
  distribution[score] += 1;
  const next = { played: s.played + 1, best: Math.max(s.best, score), currentStreak, maxStreak: Math.max(s.maxStreak, currentStreak), lastDate: gameDate, distribution };
  store.set(STATS_KEY, next);
  return next;
}

function useCountUp(target, run, ms = 900) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run || typeof target !== "number") return;
    let raf;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / ms);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, ms]);
  return run ? value : 0;
}

function SongCard({ side, total, revealed, state, onPick, disabled, label }) {
  const shown = useCountUp(total, revealed);
  const ring = state === "right" ? "ring-4 ring-green-500" : state === "wrong" ? "ring-4 ring-red-500" : "hover:ring-2 hover:ring-primary";
  return (
    <button
      type="button"
      onClick={onPick}
      disabled={disabled}
      aria-label={`${label}: ${side.name} by ${side.artistName || "unknown"}`}
      className={`group relative flex w-full flex-col overflow-hidden rounded-2xl border bg-card text-left transition-all disabled:cursor-default ${ring}`}
    >
      <img src={side.image} alt="" className="aspect-square w-full object-cover" />
      <div className="flex flex-1 flex-col gap-1 p-3">
        <div className="line-clamp-2 font-semibold leading-tight">{side.name}</div>
        <div className="truncate text-sm text-muted-foreground">{side.artistName}</div>
        <div className="mt-1 h-7 text-lg font-bold tabular-nums">
          {revealed ? fullNumber(shown) : <span className="text-sm font-normal text-muted-foreground">? streams</span>}
        </div>
      </div>
      {state ? (
        <div className={`absolute right-2 top-2 rounded-full p-1.5 text-white ${state === "right" ? "bg-green-500" : "bg-red-500"}`}>
          {state === "right" ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
        </div>
      ) : null}
    </button>
  );
}

export default function StreamdleGame() {
  const { isSignedIn, getToken } = useAuth();
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState({ picks: [], results: [], totals: [] });
  const [round, setRound] = useState(0);
  const [busy, setBusy] = useState(false);
  const [stats, setStats] = useState(null);
  const submitted = useRef(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`${BASE}/game/today`)
      .then(async (r) => {
        const body = await r.json().catch(() => null);
        if (!r.ok) throw new Error(body?.message || "Couldn't load today's Streamdle");
        return body.data;
      })
      .then((g) => {
        if (cancelled) return;
        const saved = store.get(progressKey(g.gameDate), null);
        const p = saved && Array.isArray(saved.picks) ? saved : { picks: [], results: [], totals: [] };
        setGame(g);
        setProgress(p);
        setRound(Math.min(p.picks.length, ROUNDS));
      })
      .catch((e) => !cancelled && setError(e.message));
    return () => {
      cancelled = true;
    };
  }, []);

  // results show after the last reveal, once the player taps "See results"
  const finished = round >= ROUNDS && progress.picks.length >= ROUNDS;
  const score = progress.results.filter(Boolean).length;

  // On finishing: save to the account when signed in, else keep a local streak.
  useEffect(() => {
    if (!game || !finished || submitted.current) return;
    if (isSignedIn === undefined) return; // Clerk still loading
    submitted.current = true;
    (async () => {
      if (isSignedIn) {
        try {
          const token = await getToken();
          const r = await fetch(`${BASE}/game/result`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ gameDate: game.gameDate, picks: progress.picks }),
          });
          const body = await r.json().catch(() => null);
          if (r.ok) {
            setStats({ ...body.data.stats, synced: true });
            return;
          }
        } catch {
          /* fall back to the local streak */
        }
      }
      setStats({ ...recordLocal(game.gameDate, score), synced: false });
    })();
  }, [game, finished, isSignedIn, getToken, progress.picks, score]);

  const pick = useCallback(
    async (choice) => {
      if (!game || busy || progress.picks.length > round || round >= ROUNDS) return;
      setBusy(true);
      try {
        const r = await fetch(`${BASE}/game/answer`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ gameDate: game.gameDate, round, pick: choice }),
        });
        const body = await r.json().catch(() => null);
        if (!r.ok) throw new Error(body?.message || "Couldn't check that answer");
        const next = {
          picks: [...progress.picks, choice],
          results: [...progress.results, body.data.correct],
          totals: [...progress.totals, { a: body.data.a.total, b: body.data.b.total }],
        };
        setProgress(next);
        store.set(progressKey(game.gameDate), next);
      } catch (e) {
        toast.error(e.message);
      } finally {
        setBusy(false);
      }
    },
    [game, busy, progress, round]
  );

  const grid = progress.results.map((ok) => (ok ? "🟩" : "🟥")).join("");
  const share = async () => {
    const text = `Streamdle #${game.number} ${score}/${ROUNDS} 🎧\n${grid}\nstatscrave.com/streamdle`;
    try {
      if (navigator.share) {
        await navigator.share({ text });
        return;
      }
    } catch (e) {
      if (e?.name === "AbortError") return;
    }
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Result copied, paste it anywhere");
    } catch {
      toast.error("Couldn't copy the result");
    }
  };

  if (error) {
    return <div className="rounded-xl border p-8 text-center text-muted-foreground">{error}. Check back in a bit.</div>;
  }
  if (!game) {
    return (
      <div className="flex justify-center p-16">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const current = game.rounds[Math.min(round, ROUNDS - 1)];
  const answered = progress.picks.length > round;
  const totals = progress.totals[round];
  const chosen = progress.picks[round];
  const stateFor = (side) => {
    if (!answered) return null;
    const winner = totals.a > totals.b ? "a" : "b";
    if (side === winner) return "right";
    return side === chosen ? "wrong" : null;
  };

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm font-medium text-muted-foreground">Streamdle #{game.number}</div>
        <div className="flex gap-1" aria-label={`Round ${Math.min(round + 1, ROUNDS)} of ${ROUNDS}`}>
          {Array.from({ length: ROUNDS }, (_, i) => (
            <span
              key={i}
              className={`h-2.5 w-5 rounded-full ${i < progress.results.length ? (progress.results[i] ? "bg-green-500" : "bg-red-500") : i === round ? "bg-primary" : "bg-muted"}`}
            />
          ))}
        </div>
      </div>

      {!finished ? (
        <>
          <h2 className="mb-4 text-center text-xl font-bold sm:text-2xl">Which has more Spotify streams?</h2>
          <AnimatePresence mode="wait">
            <motion.div
              key={round}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-2 gap-3 sm:gap-5"
            >
              {["a", "b"].map((side) => (
                <SongCard
                  key={side}
                  label={side === "a" ? "Left song" : "Right song"}
                  side={current[side]}
                  total={totals?.[side]}
                  revealed={answered}
                  state={stateFor(side)}
                  disabled={answered || busy}
                  onPick={() => pick(side)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
          <div className="mt-5 flex h-11 items-center justify-center">
            {answered ? (
              <Button onClick={() => setRound((r) => r + 1)} size="lg" autoFocus>
                {round === ROUNDS - 1 ? "See results" : "Next round"}
              </Button>
            ) : busy ? (
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            ) : (
              <p className="text-sm text-muted-foreground">Tap the one you think is bigger</p>
            )}
          </div>
        </>
      ) : (
        <div className="rounded-2xl border bg-card p-6 text-center">
          <div className="text-sm text-muted-foreground">Today&apos;s score</div>
          <div className="mt-1 text-5xl font-bold">
            {score}/{ROUNDS}
          </div>
          <div className="mt-3 text-2xl tracking-widest">{grid}</div>
          <Button onClick={share} className="mt-5" size="lg">
            <Share2 className="mr-2 h-4 w-4" /> Share result
          </Button>
          {(
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-muted/50 p-3">
                <Flame className="mx-auto h-5 w-5 text-orange-500" />
                <div className="mt-1 text-2xl font-bold">{stats ? stats.currentStreak : "–"}</div>
                <div className="text-xs text-muted-foreground">day streak</div>
              </div>
              <div className="rounded-xl bg-muted/50 p-3">
                <Trophy className="mx-auto h-5 w-5 text-yellow-500" />
                <div className="mt-1 text-2xl font-bold">{stats ? stats.best : "–"}</div>
                <div className="text-xs text-muted-foreground">best score</div>
              </div>
              <div className="rounded-xl bg-muted/50 p-3">
                <div className="mx-auto h-5 text-sm">🎧</div>
                <div className="mt-1 text-2xl font-bold">{stats ? stats.played : "–"}</div>
                <div className="text-xs text-muted-foreground">played</div>
              </div>
            </div>
          )}
          {stats && !stats.synced ? (
            <p className="mt-4 text-xs text-muted-foreground">
              Your streak is saved on this device.{" "}
              <SignInButton mode="modal">
                <button type="button" className="text-primary hover:underline">
                  Sign in
                </button>
              </SignInButton>{" "}
              to keep it everywhere.
            </p>
          ) : null}
          <div className="mt-6 text-sm text-muted-foreground">
            Next Streamdle in <Countdown target={nextUtcMidnight()} compact doneLabel="moments" />
          </div>
          <div className="mt-6 text-left">
            <div className="mb-2 text-sm font-semibold">The answers</div>
            <ol className="space-y-1.5 text-sm">
              {game.rounds.map((r, i) => {
                const t = progress.totals[i];
                return (
                  <li key={i} className="flex items-center gap-2">
                    <span>{progress.results[i] ? "🟩" : "🟥"}</span>
                    <Link href={`/track/${r.a.spotifyId}`} className="truncate hover:underline">
                      {r.a.name}
                    </Link>
                    <span className="shrink-0 text-muted-foreground">{t ? compact(t.a) : ""}</span>
                    <span className="shrink-0 text-muted-foreground">vs</span>
                    <Link href={`/track/${r.b.spotifyId}`} className="truncate hover:underline">
                      {r.b.name}
                    </Link>
                    <span className="shrink-0 text-muted-foreground">{t ? compact(t.b) : ""}</span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
