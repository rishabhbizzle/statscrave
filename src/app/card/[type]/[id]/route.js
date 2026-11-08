// Shareable stats card as a PNG:
//   /card/song/<id>                    daily streams card, 1200x675 (X / Discord)
//   /card/song/<id>?kind=milestone     next-milestone countdown card
//   /card/song/<id>?format=story       1080x1920 (TikTok / Instagram stories)
// Data comes from the backend's precomputed insights; the CDN caches each
// card for an hour, so cards follow the daily numbers without per-view work.
import { getCardData, renderCard, CARD_TYPES, CARD_KINDS, isSpotifyId } from "@/lib/og/cards";

export const runtime = "edge";

export async function GET(request, { params }) {
  const { type, id } = params;
  const { searchParams } = new URL(request.url);
  const kind = searchParams.get("kind") || "daily";
  const format = searchParams.get("format") || "landscape";
  if (!CARD_TYPES.includes(type) || !isSpotifyId(id) || !CARD_KINDS.includes(kind) || !["landscape", "story"].includes(format)) {
    return new Response("Bad request", { status: 400 });
  }
  const data = await getCardData(type, id);
  if (!data) return new Response("Not found", { status: 404, headers: { "Cache-Control": "public, s-maxage=300" } });
  try {
    return await renderCard({ type, kind, size: format, data });
  } catch (error) {
    console.error("card render failed", error);
    return new Response("Could not render card", { status: 500 });
  }
}
