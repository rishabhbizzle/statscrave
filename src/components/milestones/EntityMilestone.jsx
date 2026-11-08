"use client";

import React, { useEffect, useState } from "react";
import { Flag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ShareCardButton from "@/components/ShareCardButton";
import {
  compact,
  milestoneLabel,
  etaLabel,
  shortDate,
  stepProgress,
} from "@/lib/streamsFormat";

// "Next milestone" card for a song / album / artist page, from the backend's
// precomputed insight. Renders nothing until there is something to show.
export default function EntityMilestone({ type, id, pageId, name }) {
  const [insight, setInsight] = useState(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setInsight(null);
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/insights/${type}/${id}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((body) => {
        if (!cancelled) setInsight(body?.data || null);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [type, id]);

  if (!insight || !insight.nextMilestone) return null;
  const title = name || insight.name;
  const target = milestoneLabel(insight.nextMilestone);
  const hasEta = !insight.stale && insight.etaDays > 0;
  const progress = stepProgress(type, insight.total, insight.nextMilestone);

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-transparent">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <Flag className="h-4 w-4" /> Next milestone
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-3xl font-bold tabular-nums">{target}</span>
          {hasEta ? (
            <span className="text-lg font-semibold text-primary">
              in {etaLabel(insight.etaDays)} <span className="text-sm font-normal text-muted-foreground">· {shortDate(insight.etaDate)}</span>
            </span>
          ) : (
            <span className="text-sm text-muted-foreground">Not enough recent data for an ETA yet</span>
          )}
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {compact(insight.total)} now
          {insight.avg7 ? ` · averaging ${compact(insight.avg7)}/day over the last week` : ""}
          {" · "}projections assume the recent pace holds
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <ShareCardButton
            type={type}
            id={insight.spotifyId}
            pageId={pageId}
            kind="daily"
            name={title}
            label="Daily card"
            text={typeof insight.daily === "number" ? `${title}: ${compact(insight.daily)} Spotify streams yesterday` : `${title} on StatsCrave`}
          />
          {hasEta ? (
            <ShareCardButton type={type} id={insight.spotifyId} pageId={pageId} kind="milestone" name={title} label="Milestone card" text={`${title} hits ${target} streams on Spotify in ${etaLabel(insight.etaDays)} 📈`} />
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
