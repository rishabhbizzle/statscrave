/* eslint-disable @next/next/no-img-element -- next/og renders plain <img> (satori), not next/image */
// Share-card rendering for next/og (ImageResponse). Used by the downloadable
// card route (/card/[type]/[id]) and the per-page opengraph images, so a link
// pasted into X/Discord unfurls as the same stats card people share.
import { ImageResponse } from "next/og";
import { fetchInsight } from "@/lib/insightsApi";
import { cardFonts, FONT_STACK } from "@/lib/og/fonts";
import {
  compact,
  milestoneLabel,
  dataDayLabel,
  shortDate,
  pctLabel,
  etaLabel,
  stepProgress,
  TYPE_LABEL,
} from "@/lib/streamsFormat";

const BASE = process.env.NEXT_PUBLIC_BASE_URL;
export const CARD_TYPES = ["song", "album", "artist"];
export const CARD_KINDS = ["daily", "milestone"];
export const SIZES = {
  og: { width: 1200, height: 630 },
  landscape: { width: 1200, height: 675 },
  story: { width: 1080, height: 1920 },
};
const SPOTIFY_ID_RE = /^[A-Za-z0-9]{22}$/;
export const isSpotifyId = (id) => typeof id === "string" && SPOTIFY_ID_RE.test(id);

const COLORS = {
  bg: "#0C0A09",
  text: "#FAFAF9",
  muted: "#A8A29E",
  accent: "#A78BFA",
  up: "#4ADE80",
  down: "#F87171",
  track: "rgba(255,255,255,0.12)",
};

async function getJson(path) {
  try {
    const res = await fetch(`${BASE}${path}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return (await res.json())?.data ?? null;
  } catch {
    return null;
  }
}

// Basic name/cover from the Spotify-backed routes, for items without stats.
async function getMeta(type, id) {
  if (type === "song") {
    const d = await getJson(`/track/${id}?metaData=true`);
    const t = d?.trackDetails;
    return t ? { name: t.name, image: t.album?.images?.[0]?.url, artistName: t.artists?.[0]?.name, trackedId: d?.streamingData?.spotifyId } : null;
  }
  if (type === "album") {
    const d = await getJson(`/album/${id}?metaData=true`);
    const a = d?.albumDetails;
    return a ? { name: a.name, image: a.images?.[0]?.url, artistName: a.artists?.[0]?.name } : null;
  }
  const d = await getJson(`/artist/${id}`);
  return d?.name ? { name: d.name, image: d.images?.[0]?.url } : null;
}

// -> { insight, meta } where either may be null; null overall when the item is unknown.
export async function getCardData(type, id) {
  let insight = await fetchInsight(type, id);
  let meta = null;
  if (!insight) {
    meta = await getMeta(type, id);
    // a track page can be a different version (same ISRC) of the song we track
    if (type === "song" && meta?.trackedId && meta.trackedId !== id) insight = await fetchInsight("song", meta.trackedId);
  }
  if (!insight && !meta) return null;
  return { insight, meta };
}

let logoPromise = null;
function loadLogo() {
  if (!logoPromise) {
    logoPromise = fetch(new URL("../../../public/logo-white.png", import.meta.url))
      .then((r) => (r.ok ? r.arrayBuffer() : null))
      .catch(() => null);
  }
  return logoPromise;
}

function Brand({ logo, scale }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 * scale }}>
      {logo ? <img alt="" src={logo} width={44 * scale} height={44 * scale} style={{ borderRadius: 999 }} /> : null}
      <div style={{ display: "flex", fontSize: 30 * scale, fontWeight: 800, color: COLORS.text, letterSpacing: -0.5 }}>StatsCrave</div>
    </div>
  );
}

function Stat({ insight, kind, type, scale }) {
  const i = insight;
  const showMilestone = kind === "milestone" && i?.etaDays && i?.nextMilestone;
  if (showMilestone) {
    const pct = stepProgress(type, i.total, i.nextMilestone);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 * scale }}>
        <div style={{ display: "flex", fontSize: 26 * scale, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 2 }}>Next milestone</div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", columnGap: 18 * scale, rowGap: 6 * scale }}>
          <div style={{ display: "flex", fontSize: 104 * scale, fontWeight: 800, color: COLORS.text, lineHeight: 1 }}>{milestoneLabel(i.nextMilestone)}</div>
          <div style={{ display: "flex", fontSize: 40 * scale, fontWeight: 800, color: COLORS.accent, whiteSpace: "nowrap" }}>{`in ${etaLabel(i.etaDays)} 📈`}</div>
        </div>
        <div style={{ display: "flex", width: "100%", height: 16 * scale, borderRadius: 999, background: COLORS.track }}>
          <div style={{ display: "flex", width: `${pct}%`, height: "100%", borderRadius: 999, background: COLORS.accent }} />
        </div>
        <div style={{ display: "flex", fontSize: 24 * scale, color: COLORS.muted }}>
          {`${compact(i.total)} now · ~${compact(i.avg7)}/day · projected ${shortDate(i.etaDate)}`}
        </div>
      </div>
    );
  }
  if (i && typeof i.daily === "number") {
    const pct = pctLabel(i.dailyChangePct);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 * scale }}>
        <div style={{ display: "flex", fontSize: 26 * scale, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 2 }}>
          {`Spotify streams · ${dataDayLabel(i.dateKey) || "yesterday"}`}
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 18 * scale }}>
          <div style={{ display: "flex", fontSize: 104 * scale, fontWeight: 800, color: COLORS.text, lineHeight: 1 }}>{compact(i.daily)}</div>
          {pct ? (
            <div style={{ display: "flex", fontSize: 40 * scale, fontWeight: 800, color: i.dailyChangePct >= 0 ? COLORS.up : COLORS.down }}>{pct}</div>
          ) : null}
        </div>
        <div style={{ display: "flex", fontSize: 32 * scale, color: COLORS.muted }}>{`${compact(i.total)} total streams`}</div>
      </div>
    );
  }
  if (i && typeof i.total === "number") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 * scale }}>
        <div style={{ display: "flex", fontSize: 26 * scale, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 2 }}>Total Spotify streams</div>
        <div style={{ display: "flex", fontSize: 104 * scale, fontWeight: 800, color: COLORS.text, lineHeight: 1 }}>{compact(i.total)}</div>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", fontSize: 34 * scale, color: COLORS.muted }}>Streaming stats, charts and records on StatsCrave</div>
  );
}

// CJK glyphs are about twice as wide as Latin ones, so measure in "widths"
const WIDE = /[\u1100-\u11FF\u3040-\u30FF\u3130-\u318F\u4E00-\u9FFF\uAC00-\uD7AF\uFF00-\uFFEF]/;
const visualLength = (s) => Array.from(s || "").reduce((n, ch) => n + (WIDE.test(ch) ? 2 : 1), 0);
function clampTitle(s, max) {
  if (!s || visualLength(s) <= max) return s || "";
  let out = "";
  for (const ch of Array.from(s)) {
    if (visualLength(out + ch) > max - 1) break;
    out += ch;
  }
  return `${out.trimEnd()}…`;
}

// Everything drawn on the card, for the font subset.
function cardText(data) {
  const { insight: i, meta } = data;
  return [i?.name, meta?.name, i?.artistName, meta?.artistName, "StatsCrave statscrave.com Next milestone Spotify streams total now day projected in days 📈 Song Album Artist yesterday Streaming stats, charts and records on"].join(" ");
}

export async function renderCard({ type, kind = "daily", size = "landscape", data }) {
  const { width, height } = SIZES[size] || SIZES.landscape;
  const story = size === "story";
  const scale = story ? 1.25 : 1;
  const { insight: i, meta } = data;
  const name = clampTitle(i?.name || meta?.name, story ? 60 : 48);
  const artist = type === "artist" ? null : i?.artistName || meta?.artistName;
  const image = i?.image || meta?.image;
  const [fonts, logo] = await Promise.all([cardFonts(cardText(data)), loadLogo()]);
  const titleLen = visualLength(name);
  const titleSize = (titleLen > 40 ? 44 : titleLen > 24 ? 52 : 66) * scale;
  const coverSize = story ? 760 : Math.min(height - 150, 470);

  const label = (
    <div style={{ display: "flex", fontSize: 26 * scale, color: COLORS.accent, fontWeight: 800, textTransform: "uppercase", letterSpacing: 3 }}>
      {artist ? `${TYPE_LABEL[type]} · ${clampTitle(artist, 40)}` : TYPE_LABEL[type]}
    </div>
  );
  const title = (
    <div style={{ display: "flex", fontSize: titleSize, fontWeight: 800, color: COLORS.text, lineHeight: 1.08, letterSpacing: -1 }}>{name}</div>
  );
  const cover = image ? (
    <img alt="" src={image} width={coverSize} height={coverSize} style={{ borderRadius: type === "artist" ? 999 : 28, objectFit: "cover", boxShadow: "0 30px 80px rgba(0,0,0,0.55)" }} />
  ) : null;
  const footer = (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
      <Brand logo={logo} scale={scale} />
      <div style={{ display: "flex", fontSize: 26 * scale, color: COLORS.muted }}>statscrave.com</div>
    </div>
  );

  const background = {
    backgroundColor: COLORS.bg,
    backgroundImage: "radial-gradient(ellipse 80% 60% at 20% 0%, rgba(120,119,198,0.35), rgba(12,10,9,0) 70%), radial-gradient(ellipse 60% 50% at 100% 100%, rgba(167,139,250,0.18), rgba(12,10,9,0) 70%)",
  };

  const body = story ? (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: 90, gap: 56, fontFamily: FONT_STACK, ...background }}>
      <Brand logo={logo} scale={scale} />
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>{cover}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {label}
        {title}
      </div>
      <Stat insight={i} kind={kind} type={type} scale={scale} />
      <div style={{ display: "flex", flex: 1 }} />
      <div style={{ display: "flex", fontSize: 32, color: COLORS.muted }}>statscrave.com</div>
    </div>
  ) : (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "48px 60px", gap: 28, fontFamily: FONT_STACK, ...background }}>
      <div style={{ display: "flex", flex: 1, gap: 52, alignItems: "center" }}>
        {cover}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: 26 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {label}
            {title}
          </div>
          <Stat insight={i} kind={kind} type={type} scale={scale} />
        </div>
      </div>
      {footer}
    </div>
  );

  return new ImageResponse(body, {
    width,
    height,
    fonts: fonts.length ? fonts : undefined,
    emoji: "twemoji",
    headers: { "Cache-Control": "public, max-age=600, s-maxage=3600, stale-while-revalidate=86400" },
  });
}

// Plain fallback card (unknown item / backend down) so an OG image never 500s.
export async function renderFallback(size = "og") {
  const { width, height } = SIZES[size] || SIZES.og;
  const [fonts, logo] = await Promise.all([cardFonts("StatsCrave Streaming stats, charts and records for fans statscrave.com"), loadLogo()]);
  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 24, width: "100%", height: "100%", backgroundColor: COLORS.bg, backgroundImage: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(120,119,198,0.35), rgba(12,10,9,0) 70%)", fontFamily: FONT_STACK }}>
        {logo ? <img alt="" src={logo} width={120} height={120} style={{ borderRadius: 999 }} /> : null}
        <div style={{ display: "flex", fontSize: 72, fontWeight: 800, color: COLORS.text }}>StatsCrave</div>
        <div style={{ display: "flex", fontSize: 34, color: COLORS.muted }}>Streaming stats, charts and records for fans</div>
      </div>
    ),
    { width, height, fonts: fonts.length ? fonts : undefined, headers: { "Cache-Control": "public, max-age=600, s-maxage=3600" } }
  );
}
