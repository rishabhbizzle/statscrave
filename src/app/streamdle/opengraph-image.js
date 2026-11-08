/* eslint-disable @next/next/no-img-element -- next/og renders plain <img> (satori) */
import { ImageResponse } from "next/og";
import { cardFonts, FONT_STACK } from "@/lib/og/fonts";

export const runtime = "edge";
export const alt = "Streamdle, the daily Spotify streams guessing game";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = 3600;

// Preview card: today's two first-round covers with a big "?" between them.
export default async function Image() {
  let game = null;
  try {
    const r = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/game/today`, { next: { revalidate: 3600 } });
    if (r.ok) game = (await r.json())?.data;
  } catch {
    /* plain card */
  }
  const first = game?.rounds?.[0];
  const fonts = await cardFonts("Streamdle Which song has more Spotify streams? StatsCrave statscrave.com/streamdle #");
  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 30, width: "100%", height: "100%", fontFamily: FONT_STACK, backgroundColor: "#0C0A09", backgroundImage: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(120,119,198,0.4), rgba(12,10,9,0) 70%)" }}>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 800, color: "#FAFAF9", letterSpacing: -2 }}>{`Streamdle${game ? ` #${game.number}` : ""}`}</div>
        {first ? (
          <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
            <img alt="" src={first.a.image} width={200} height={200} style={{ borderRadius: 24 }} />
            <div style={{ display: "flex", fontSize: 110, fontWeight: 800, color: "#A78BFA" }}>?</div>
            <img alt="" src={first.b.image} width={200} height={200} style={{ borderRadius: 24 }} />
          </div>
        ) : null}
        <div style={{ display: "flex", fontSize: 38, color: "#A8A29E" }}>Which song has more Spotify streams?</div>
        <div style={{ display: "flex", fontSize: 28, color: "#A78BFA", fontWeight: 800 }}>statscrave.com/streamdle</div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined }
  );
}
