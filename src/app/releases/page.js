import Link from "next/link";
import Container from "@/components/ui/container";
import Countdown from "@/components/Countdown";
import DayOneBars from "@/components/releases/DayOneBars";
import { fetchList } from "@/lib/insightsApi";
import { compact, shortDate } from "@/lib/streamsFormat";

export const revalidate = 900;

export const metadata = {
  title: "Upcoming releases & day-one streams | StatsCrave",
  description: "Countdowns to announced releases from the artists we track, and how new releases are doing in their first week on Spotify.",
};

const typeLabel = (t) => (t ? t.charAt(0) + t.slice(1).toLowerCase() : "Release");

function Cover({ src, size = 72 }) {
  return src ? (
    <img src={src} alt="" width={size} height={size} loading="lazy" className="shrink-0 rounded-lg object-cover" style={{ width: size, height: size }} />
  ) : (
    <div className="shrink-0 rounded-lg bg-muted" style={{ width: size, height: size }} />
  );
}

export default async function ReleasesPage() {
  const [upcoming, out] = await Promise.all([fetchList("/releases", { status: "upcoming" }), fetchList("/releases", { status: "out" })]);
  return (
    <Container>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-0">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Releases</h1>
        <p className="mt-2 text-muted-foreground">Countdowns to what&apos;s announced, and a day-by-day look at what just dropped.</p>

        <h2 className="mt-8 text-xl font-bold">Coming up</h2>
        <div className="mt-3 flex flex-col gap-3">
          {upcoming.length ? (
            upcoming.map((r) => (
              <div key={r.releaseKey} className="flex flex-col gap-3 rounded-xl border bg-card p-4 sm:flex-row sm:items-center">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <Cover src={r.coverUrl} />
                  <div className="min-w-0">
                    <div className="text-xs font-semibold uppercase tracking-wide text-primary">{typeLabel(r.type)}</div>
                    <div className="truncate text-lg font-bold">{r.name}</div>
                    <Link href={`/artist/${r.artistSpotifyId}`} className="text-sm text-muted-foreground hover:underline">
                      {r.artistName}
                    </Link>
                    <div className="text-xs text-muted-foreground">Out {shortDate(r.releaseDate)}</div>
                  </div>
                </div>
                <Countdown target={r.releaseDate} />
              </div>
            ))
          ) : (
            <div className="rounded-xl border p-6 text-center text-muted-foreground">
              No announced releases from the artists we track right now. Countdowns appear here as soon as one is announced on Spotify.
            </div>
          )}
        </div>

        <h2 className="mt-10 text-xl font-bold">Out now: day-one tracker</h2>
        <p className="text-sm text-muted-foreground">Released in the last 7 days. Streams appear the day after each day is counted.</p>
        <div className="mt-3 flex flex-col gap-3">
          {out.length ? (
            out.map((r) => {
              const d = r.tracked?.debut;
              const prev = r.previousDebut;
              return (
                <div key={r.releaseKey} className="rounded-xl border bg-card p-4">
                  <div className="flex items-center gap-3">
                    <Cover src={r.coverUrl} size={56} />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold uppercase tracking-wide text-primary">
                        {typeLabel(r.type)} · released {shortDate(r.releaseDate)}
                      </div>
                      {r.albumId ? (
                        <Link href={`/album/${r.albumId}`} className="block truncate font-bold hover:underline">
                          {r.name}
                        </Link>
                      ) : (
                        <div className="truncate font-bold">{r.name}</div>
                      )}
                      <div className="text-sm text-muted-foreground">{r.artistName}</div>
                    </div>
                    {d ? (
                      <div className="text-right">
                        <div className="text-lg font-bold">{compact(d.total)}</div>
                        <div className="text-xs text-muted-foreground">{d.daysCounted} day{d.daysCounted === 1 ? "" : "s"} in</div>
                      </div>
                    ) : null}
                  </div>
                  <div className="mt-3">
                    {d ? (
                      <DayOneBars days={d.days} compare={prev?.debut?.days || null} compareLabel={prev ? `${prev.name} (previous debut)` : undefined} />
                    ) : (
                      <p className="text-sm text-muted-foreground">Day-one streams show up here once the nightly update picks this release up.</p>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="rounded-xl border p-6 text-center text-muted-foreground">Nothing from the artists we track came out in the last week.</div>
          )}
        </div>
      </div>
    </Container>
  );
}
