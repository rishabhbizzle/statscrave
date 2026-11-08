import Link from "next/link";
import Container from "@/components/ui/container";
import DebutCompare from "@/components/debuts/DebutCompare";
import RaceView from "@/components/debuts/RaceView";
import DayOneBars from "@/components/releases/DayOneBars";
import ShareCardButton from "@/components/ShareCardButton";
import { fetchList } from "@/lib/insightsApi";
import { compact, shortDate, entityHref } from "@/lib/streamsFormat";
import { cn } from "@/lib/utils";

export const revalidate = 3600;

export const metadata = {
  title: "Debut Wars: biggest first weeks on Spotify | StatsCrave",
  description: "First-week Spotify streams for new albums and songs, head-to-head debut comparisons, and races to the next milestone.",
};

const TABS = [
  ["leaderboard", "Biggest debuts"],
  ["live", "Debuting now"],
  ["compare", "Head to head"],
  ["race", "Races"],
];
const pick = (v, allowed, fallback) => (allowed.includes(v) ? v : fallback);

function Pill({ href, active, children }) {
  return (
    <Link
      href={href}
      scroll={false}
      className={cn("rounded-full border px-3 py-1.5 text-sm transition-colors", active ? "border-primary bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}
    >
      {children}
    </Link>
  );
}

function DebutRow({ item, rank, type, live }) {
  const d = item.debut;
  return (
    <div className="rounded-xl border bg-card p-3">
      <div className="flex items-center gap-3">
        <div className="w-6 shrink-0 text-center text-sm font-semibold text-muted-foreground">{rank}</div>
        <Link href={entityHref(type, item.spotifyId)} className="shrink-0">
          {item.image ? <img src={item.image} alt="" width={56} height={56} loading="lazy" className="h-14 w-14 rounded-md object-cover" /> : <div className="h-14 w-14 rounded-md bg-muted" />}
        </Link>
        <div className="min-w-0 flex-1">
          <Link href={entityHref(type, item.spotifyId)} className="block truncate font-semibold hover:underline">
            {item.name}
          </Link>
          <div className="truncate text-xs text-muted-foreground sm:text-sm">
            {item.artistName} · {shortDate(d.releaseDate)}
            {live ? ` · day ${d.daysCounted} of 7` : ""}
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold tabular-nums">{compact(d.total)}</div>
          <div className="text-xs text-muted-foreground">day 1: {compact(d.day1)}</div>
        </div>
        <div className="flex flex-col gap-1">
          <ShareCardButton type={type} id={item.spotifyId} kind="daily" name={item.name} label="" size="icon" variant="ghost" text={`${item.name} did ${compact(d.total)} Spotify streams in its first ${d.daysCounted === 7 ? "week" : `${d.daysCounted} days`} 🔥`} />
        </div>
      </div>
      {live ? (
        <div className="mt-3">
          <DayOneBars days={d.days} />
        </div>
      ) : (
        <div className="mt-2 flex justify-end">
          <Link href={`/debuts?tab=compare&type=${type}&ids=${item.spotifyId}`} className="text-xs font-medium text-primary hover:underline">
            Compare this debut →
          </Link>
        </div>
      )}
    </div>
  );
}

export default async function DebutsPage({ searchParams }) {
  const tab = pick(searchParams?.tab, TABS.map(([k]) => k), "leaderboard");
  const type = tab === "race" ? pick(searchParams?.type, ["song", "album", "artist"], "song") : pick(searchParams?.type, ["album", "song"], "album");
  const ids = typeof searchParams?.ids === "string" ? searchParams.ids.split(",").filter((x) => /^[A-Za-z0-9]{22}$/.test(x)) : [];
  const href = (patch) => `/debuts?${new URLSearchParams({ tab, type: type === "artist" ? "album" : type, ...patch }).toString()}`;

  let list = [];
  if (tab === "leaderboard") list = await fetchList("/debuts", { type, status: "complete", limit: 50 });
  if (tab === "live") list = await fetchList("/debuts", { type, status: "live", limit: 50 });

  return (
    <Container>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-0">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Debut Wars</h1>
        <p className="mt-2 text-muted-foreground">First-week Spotify streams, head to heads, and races to the next milestone.</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {TABS.map(([key, label]) => (
            <Pill key={key} href={`/debuts?${new URLSearchParams({ tab: key, type: key === "race" ? "song" : type === "artist" ? "album" : type }).toString()}`} active={tab === key}>
              {label}
            </Pill>
          ))}
        </div>
        {tab !== "race" ? (
          <div className="mt-3 flex flex-wrap gap-2">
            <Pill href={href({ type: "album", ids: "" })} active={type === "album"}>
              Albums
            </Pill>
            <Pill href={href({ type: "song", ids: "" })} active={type === "song"}>
              Songs
            </Pill>
          </div>
        ) : null}

        <div className="mt-6">
          {tab === "compare" ? (
            <DebutCompare key={type} type={type} initialIds={ids} />
          ) : tab === "race" ? (
            <RaceView initialType={type} initialIds={ids} />
          ) : list.length ? (
            <div className="flex flex-col gap-3">
              {list.map((item, i) => (
                <DebutRow key={item.spotifyId} item={item} rank={i + 1} type={type} live={tab === "live"} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border p-8 text-center text-muted-foreground">
              {tab === "live" ? "Nothing we track is in its first week right now." : "No complete first weeks on record yet."}
            </div>
          )}
        </div>
        {tab === "leaderboard" || tab === "live" ? (
          <p className="mt-6 text-xs text-muted-foreground">
            Only releases we tracked from release day have a first week on record, so this board fills up as new music comes out.
          </p>
        ) : null}
      </div>
    </Container>
  );
}
