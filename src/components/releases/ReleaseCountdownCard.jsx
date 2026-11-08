"use client";

import Link from "next/link";
import { CalendarClock, Sparkles } from "lucide-react";
import Countdown from "@/components/Countdown";
import { shortDate } from "@/lib/streamsFormat";

const DAY = 86_400_000;
const label = (type) => (type ? type.charAt(0) + type.slice(1).toLowerCase() : "Release");

// Artist page: countdown to an announced release, or an "out now" banner for
// something released in the last week. Renders nothing otherwise.
export default function ReleaseCountdownCard({ upcoming, latest }) {
  const now = Date.now();
  const up = upcoming?.releaseDate && new Date(upcoming.releaseDate).getTime() > now ? upcoming : null;
  const fresh = !up && latest?.releaseDate && now - new Date(latest.releaseDate).getTime() < 7 * DAY ? latest : null;
  const item = up || fresh;
  if (!item) return null;
  return (
    <div className="mt-6 flex flex-col gap-4 rounded-xl border bg-gradient-to-br from-primary/15 to-transparent p-4 sm:flex-row sm:items-center">
      {item.coverUrl ? (
        <img src={item.coverUrl} alt="" width={88} height={88} className="h-20 w-20 shrink-0 rounded-lg object-cover shadow-md" />
      ) : null}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
          {up ? <CalendarClock className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
          {up ? `New ${label(item.type).toLowerCase()} coming` : `${label(item.type)} out now`}
        </div>
        <div className="truncate text-xl font-bold">{item.name}</div>
        <div className="text-sm text-muted-foreground">
          {up ? `Out ${shortDate(item.releaseDate)}` : `Released ${shortDate(item.releaseDate)}`}
          {fresh && item.albumId ? (
            <>
              {" · "}
              <Link href={`/album/${item.albumId}`} className="text-primary hover:underline">
                Day-one streams
              </Link>
            </>
          ) : null}
        </div>
      </div>
      {up ? <Countdown target={item.releaseDate} /> : null}
    </div>
  );
}
