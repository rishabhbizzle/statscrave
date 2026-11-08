// Formatting shared by the milestone UI and the share-card images (works in
// the browser, on the server and in the edge runtime).

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const trim = (s) => s.replace(/\.0+$/, "").replace(/(\.\d*?)0+$/, "$1");

// 41_234_567 -> "41.2M", 2_981_000_000 -> "2.98B", 999 -> "999"
export function compact(n) {
  if (typeof n !== "number" || !Number.isFinite(n)) return "–";
  const abs = Math.abs(n);
  if (abs >= 1e9) return trim((n / 1e9).toFixed(abs >= 1e11 ? 1 : 2)) + "B";
  if (abs >= 1e6) return trim((n / 1e6).toFixed(1)) + "M";
  if (abs >= 1e3) return trim((n / 1e3).toFixed(1)) + "K";
  return String(Math.round(n));
}

// milestones are whole 100M steps: 3e9 -> "3B", 3.1e9 -> "3.1B", 5e8 -> "500M"
export function milestoneLabel(n) {
  if (typeof n !== "number") return "–";
  if (n >= 1e9) return trim((n / 1e9).toFixed(1)) + "B";
  return Math.round(n / 1e6) + "M";
}

export const fullNumber = (n) => (typeof n === "number" ? n.toLocaleString("en-US") : "–");

// "DD-MM-YYYY" -> "Nov 3"
export function dataDayLabel(key) {
  const m = /^(\d{2})-(\d{2})-(\d{4})$/.exec(String(key || ""));
  if (!m) return null;
  return `${MONTHS[Number(m[2]) - 1]} ${Number(m[1])}`;
}

// ISO date / Date -> "Nov 20" (UTC, so server and client agree); the year is
// added when it isn't the current one ("Jan 30, 2027")
export function shortDate(value, now = new Date()) {
  const d = value ? new Date(value) : null;
  if (!d || Number.isNaN(d.getTime())) return null;
  const label = `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}`;
  return d.getUTCFullYear() === now.getUTCFullYear() ? label : `${label}, ${d.getUTCFullYear()}`;
}

export function pctLabel(p) {
  if (typeof p !== "number") return null;
  return `${p > 0 ? "+" : ""}${p.toFixed(1)}%`;
}

export const etaLabel = (days) => (typeof days === "number" && days > 0 ? `~${days} day${days === 1 ? "" : "s"}` : null);

// insight `type` -> site route
export function entityHref(type, id) {
  const base = type === "song" ? "track" : type;
  return `/${base}/${id}`;
}

export const stepFor = (type) => (type === "artist" ? 1e9 : 1e8);

// how far through the current step (e.g. 2.95B of the 2.9B->3B stretch = 50%)
export function stepProgress(type, total, next) {
  if (typeof total !== "number" || typeof next !== "number") return 0;
  const step = stepFor(type);
  const pct = ((total - (next - step)) / step) * 100;
  return Math.max(0, Math.min(100, pct));
}

export const TYPE_LABEL = { song: "Song", album: "Album", artist: "Artist" };
