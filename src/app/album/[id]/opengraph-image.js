// Link previews (X, Discord, iMessage...) show the live daily-streams card.
import { getCardData, renderCard, renderFallback, isSpotifyId } from "@/lib/og/cards";

export const runtime = "edge";
export const alt = "Spotify streaming stats on StatsCrave";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = 3600;

export default async function Image({ params }) {
  try {
    const data = isSpotifyId(params.id) ? await getCardData("album", params.id) : null;
    if (!data) return await renderFallback("og");
    return await renderCard({ type: "album", kind: "daily", size: "og", data });
  } catch (error) {
    console.error("og image failed", error);
    return renderFallback("og");
  }
}
