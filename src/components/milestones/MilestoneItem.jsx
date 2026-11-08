import Link from "next/link";
import ShareCardButton from "@/components/ShareCardButton";
import {
  compact,
  milestoneLabel,
  etaLabel,
  shortDate,
  entityHref,
  stepProgress,
  TYPE_LABEL,
} from "@/lib/streamsFormat";

// One row in the milestone lists. `mode`:
//   upcoming - next milestone + ETA (insight snapshot)
//   club     - projected arrival at a fixed milestone (club query row)
//   recent   - milestone just crossed (stream event)
export default function MilestoneItem({ item, mode = "upcoming", rank }) {
  const type = item.type;
  const href = entityHref(type, item.spotifyId);
  let target, when, progress, shareText;
  if (mode === "recent") {
    target = milestoneLabel(item.value);
    when = `Crossed ${shortDate(item.date) || ""}`.trim();
    progress = 100;
    shareText = `${item.name}${item.artistName && type !== "artist" ? ` by ${item.artistName}` : ""} just passed ${target} streams on Spotify 🎉`;
  } else if (mode === "club") {
    target = milestoneLabel(item.milestone);
    when = `${etaLabel(item.clubEtaDays)} · ${shortDate(item.clubEtaDate)}`;
    progress = Math.min(100, (item.total / item.milestone) * 100);
    shareText = `${item.name} is projected to hit ${target} streams on Spotify in ${etaLabel(item.clubEtaDays)} 📈`;
  } else {
    target = milestoneLabel(item.nextMilestone);
    when = `${etaLabel(item.etaDays)} · ${shortDate(item.etaDate)}`;
    progress = stepProgress(type, item.total, item.nextMilestone);
    shareText = `${item.name} hits ${target} streams on Spotify in ${etaLabel(item.etaDays)} 📈`;
  }

  return (
    <div className="flex items-center gap-3 rounded-xl border bg-card p-3 sm:gap-4">
      {rank ? <div className="w-6 shrink-0 text-center text-sm font-semibold text-muted-foreground">{rank}</div> : null}
      <Link href={href} className="shrink-0">
        {item.image ? (
          <img
            src={item.image}
            alt=""
            width={56}
            height={56}
            loading="lazy"
            className={`h-14 w-14 object-cover ${type === "artist" ? "rounded-full" : "rounded-md"}`}
          />
        ) : (
          <div className="h-14 w-14 rounded-md bg-muted" />
        )}
      </Link>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <Link href={href} className="truncate font-semibold hover:underline">
            {item.name}
          </Link>
          <span className="shrink-0 text-lg font-bold tabular-nums">{target}</span>
        </div>
        <div className="flex items-baseline justify-between gap-2 text-xs text-muted-foreground sm:text-sm">
          <span className="truncate">
            {type !== "artist" && item.artistName ? `${item.artistName} · ` : `${TYPE_LABEL[type]} · `}
            {compact(item.total ?? item.value)}
          </span>
          <span className="shrink-0 font-medium text-foreground/80">{when}</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
        </div>
      </div>
      {mode !== "recent" ? (
        <ShareCardButton type={type} id={item.spotifyId} kind="milestone" name={item.name} text={shareText} label="" size="icon" variant="ghost" />
      ) : (
        <ShareCardButton type={type} id={item.spotifyId} kind="daily" name={item.name} text={shareText} label="" size="icon" variant="ghost" />
      )}
    </div>
  );
}
