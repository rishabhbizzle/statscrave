import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchMilestones } from "@/lib/insightsApi";
import { milestoneLabel, etaLabel, entityHref } from "@/lib/streamsFormat";

// Home page strip: the next big (whole-billion) milestones. Renders nothing if
// there is no data yet, so the home page never shows an empty box.
export default async function MilestonesStrip() {
  const items = await fetchMilestones("upcoming", { type: "song", within: 180, limit: 8, major: 1 });
  if (!items.length) return null;
  return (
    <section className="my-8 w-full md:w-[80%]">
      <div className="mb-3 flex items-end justify-between px-1">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Billion-stream countdowns</h2>
          <p className="text-sm text-muted-foreground">Songs about to hit their next billion on Spotify</p>
        </div>
        <Link href="/milestones" className="flex shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline">
          All milestones <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="flex snap-x gap-3 overflow-x-auto pb-2">
        {items.map((i) => (
          <Link
            key={i.spotifyId}
            href={entityHref(i.type, i.spotifyId)}
            className="w-40 shrink-0 snap-start rounded-xl border bg-card p-3 transition-colors hover:bg-accent"
          >
            {i.image ? (
              <img src={i.image} alt="" width={136} height={136} loading="lazy" className="aspect-square w-full rounded-md object-cover" />
            ) : (
              <div className="aspect-square w-full rounded-md bg-muted" />
            )}
            <div className="mt-2 truncate text-sm font-semibold">{i.name}</div>
            <div className="truncate text-xs text-muted-foreground">{i.artistName}</div>
            <div className="mt-1 text-sm">
              <span className="font-bold">{milestoneLabel(i.nextMilestone)}</span>{" "}
              <span className="text-primary">in {etaLabel(i.etaDays)}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
