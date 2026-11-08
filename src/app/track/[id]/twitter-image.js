// Same card as the Open Graph image (segment config must be literal per file).
import Image from "./opengraph-image";

export const runtime = "edge";
export const alt = "Spotify streaming stats on StatsCrave";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = 3600;

export default Image;
