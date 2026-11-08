// Fonts for next/og images. Google Fonts serves a subset containing only the
// characters on the card (the `text=` parameter), so even Korean/Japanese
// titles stay tiny. Without a browser user agent Google returns TrueType,
// which satori needs (it can't read woff2). Any failure just drops that font;
// ImageResponse then falls back to its built-in font.

async function loadGoogleFont(family, weight, text) {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url, { next: { revalidate: 60 * 60 * 24 * 7 } })).text();
    const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
    if (!src) return null;
    const res = await fetch(src[1], { next: { revalidate: 60 * 60 * 24 * 7 } });
    if (!res.ok) return null;
    return { name: family, data: await res.arrayBuffer(), weight, style: "normal" };
  } catch {
    return null;
  }
}

const HANGUL = /[ᄀ-ᇿ㄰-㆏가-힯]/;
const KANA_OR_HAN = /[぀-ヿ一-鿿]/;

export async function cardFonts(text) {
  // always include the full Latin alphabet: labels are uppercased with CSS and
  // units (K/M/B) are added at render time, so they aren't in the source text
  const base = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,:+-%~·→/()'&!?… ";
  const t = Array.from(new Set(String(text || "") + base)).join("");
  const wanted = [
    ["Inter", 400],
    ["Inter", 800],
  ];
  if (HANGUL.test(t)) wanted.push(["Noto Sans KR", 800]);
  if (KANA_OR_HAN.test(t)) wanted.push(["Noto Sans JP", 800]);
  const fonts = await Promise.all(wanted.map(([family, weight]) => loadGoogleFont(family, weight, t)));
  return fonts.filter(Boolean);
}

export const FONT_STACK = "Inter, 'Noto Sans KR', 'Noto Sans JP', sans-serif";
