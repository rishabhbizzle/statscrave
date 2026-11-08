/* eslint-disable @next/next/no-img-element -- next/og renders plain <img> (satori), not next/image */
import { ImageResponse } from "next/og";
import { fetchMilestones } from "@/lib/insightsApi";
import { cardFonts, FONT_STACK } from "@/lib/og/fonts";
import { milestoneLabel, etaLabel } from "@/lib/streamsFormat";

export const runtime = "edge";
export const alt = "Spotify Milestone Tracker on StatsCrave";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = 3600;

// Preview card for /milestones: the three soonest big milestones.
export default async function Image() {
  const items = (await fetchMilestones("upcoming", { type: "song", within: 365, limit: 3, major: 1 })).slice(0, 3);
  const text = ["Milestone Tracker StatsCrave statscrave.com in days ~ coming up", ...items.map((i) => `${i.name} ${i.artistName || ""}`)].join(" ");
  const fonts = await cardFonts(text);
  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "56px 64px", gap: 28, fontFamily: FONT_STACK, backgroundColor: "#0C0A09", backgroundImage: "radial-gradient(ellipse 80% 60% at 20% 0%, rgba(120,119,198,0.35), rgba(12,10,9,0) 70%)" }}>
        <div style={{ display: "flex", fontSize: 30, color: "#A78BFA", fontWeight: 800, letterSpacing: 3, textTransform: "uppercase" }}>StatsCrave</div>
        <div style={{ display: "flex", fontSize: 76, color: "#FAFAF9", fontWeight: 800, letterSpacing: -1 }}>Milestone Tracker 📈</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 8 }}>
          {items.length ? (
            items.map((i) => (
              <div key={i.spotifyId} style={{ display: "flex", alignItems: "center", gap: 22 }}>
                {i.image ? <img alt="" src={i.image} width={84} height={84} style={{ borderRadius: 14 }} /> : null}
                <div style={{ display: "flex", flex: 1, fontSize: 38, color: "#FAFAF9", fontWeight: 800 }}>{i.name.length > 30 ? `${i.name.slice(0, 29)}…` : i.name}</div>
                <div style={{ display: "flex", fontSize: 38, color: "#A78BFA", fontWeight: 800 }}>{`${milestoneLabel(i.nextMilestone)} in ${etaLabel(i.etaDays)}`}</div>
              </div>
            ))
          ) : (
            <div style={{ display: "flex", fontSize: 36, color: "#A8A29E" }}>Countdowns to the next big Spotify milestones</div>
          )}
        </div>
        <div style={{ display: "flex", flex: 1 }} />
        <div style={{ display: "flex", fontSize: 28, color: "#A8A29E" }}>statscrave.com/milestones</div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined, emoji: "twemoji" }
  );
}
