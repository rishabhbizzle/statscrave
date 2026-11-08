import Link from "next/link";
import Container from "@/components/ui/container";
import MilestoneItem from "@/components/milestones/MilestoneItem";
import { fetchMilestones } from "@/lib/insightsApi";
import { milestoneLabel } from "@/lib/streamsFormat";
import { cn } from "@/lib/utils";

export const revalidate = 3600;

export const metadata = {
  title: "Milestone Tracker: Upcoming Spotify Stream Milestones & ETAs | StatsCrave",
  description:
    "Which songs, albums and artists hit their next Spotify milestone soonest, who's next to join the billion club, and what just crossed. Projected from daily streams.",
  openGraph: {
    title: "Spotify Milestone Tracker | StatsCrave",
    description: "Countdowns to the next big Spotify milestones, projected from daily streams.",
  },
};

const TABS = [
  { key: "upcoming", label: "Coming up" },
  { key: "club", label: "Join the club" },
  { key: "recent", label: "Just hit" },
];
const TYPES = [
  { key: "song", label: "Songs" },
  { key: "album", label: "Albums" },
  { key: "artist", label: "Artists" },
];
const CLUBS = {
  song: [1e9, 2e9, 3e9],
  album: [1e9, 5e9, 10e9],
  artist: [10e9, 50e9, 100e9],
};

const pick = (value, allowed, fallback) => (allowed.includes(value) ? value : fallback);

function Pill({ href, active, children }) {
  return (
    <Link
      href={href}
      scroll={false}
      className={cn(
        "rounded-full border px-3 py-1.5 text-sm transition-colors",
        active ? "border-primary bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </Link>
  );
}

export default async function MilestonesPage({ searchParams }) {
  const tab = pick(searchParams?.tab, TABS.map((t) => t.key), "upcoming");
  const type = pick(searchParams?.type, TYPES.map((t) => t.key), "song");
  const clubOptions = CLUBS[type];
  const club = clubOptions.includes(Number(searchParams?.m)) ? Number(searchParams.m) : clubOptions[0];
  const href = (patch) => {
    const p = { tab, type, ...(tab === "club" ? { m: club } : {}), ...patch };
    if (p.tab !== "club") delete p.m;
    return `/milestones?${new URLSearchParams(p).toString()}`;
  };

  let items = [];
  let empty = "";
  if (tab === "upcoming") {
    items = await fetchMilestones("upcoming", { type, within: 30, limit: 50 });
    empty = "Nothing is due to hit a milestone in the next 30 days.";
  } else if (tab === "club") {
    items = await fetchMilestones("club", { type, milestone: club, limit: 50 });
    empty = `No ${type}s are on track for ${milestoneLabel(club)} yet.`;
  } else {
    items = await fetchMilestones("recent", { type, days: 7, limit: 50 });
    empty = "No milestones were crossed in the last 7 days.";
  }

  return (
    <Container>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-0">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Milestone Tracker</h1>
        <p className="mt-2 text-muted-foreground">
          Countdowns to the next Spotify milestones, projected from the last week of daily streams. Updated daily.
        </p>

        <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Milestone lists">
          {TABS.map((t) => (
            <Pill key={t.key} href={href({ tab: t.key })} active={tab === t.key}>
              {t.label}
            </Pill>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <Pill key={t.key} href={href({ type: t.key, m: CLUBS[t.key][0] })} active={type === t.key}>
              {t.label}
            </Pill>
          ))}
          {tab === "club" ? (
            <>
              <span className="mx-1 self-center text-muted-foreground">·</span>
              {clubOptions.map((m) => (
                <Pill key={m} href={href({ m })} active={club === m}>
                  {milestoneLabel(m)} club
                </Pill>
              ))}
            </>
          ) : null}
        </div>

        <div className="mt-6 flex flex-col gap-3">
          {items.length ? (
            items.map((item, i) => (
              <MilestoneItem key={`${item.type}-${item.spotifyId}-${item.value || ""}`} item={item} mode={tab} rank={i + 1} />
            ))
          ) : (
            <div className="rounded-xl border p-8 text-center text-muted-foreground">
              {empty} <br className="hidden sm:block" />
              Milestones refresh every day after the new numbers come in.
            </div>
          )}
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          ETAs divide the streams left by the average of the last 7 days, so a release spike or a slowdown moves them. Song
          numbers are for the version we track; other versions of the same song are counted separately.
        </p>
      </div>
    </Container>
  );
}
