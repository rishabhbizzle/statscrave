// Spotify Authorization Code flow with PKCE: the browser proves it started the
// login with a one-time code_verifier instead of a client secret, so no secret
// ever ships to the client. https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow
export const SPOTIFY_AUTHORIZE_URL = "https://accounts.spotify.com/authorize";
export const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
export const SPOTIFY_SCOPES = ["user-top-read", "user-read-recently-played"];
export const VERIFIER_KEY = "spotifyCodeVerifier";

const base64url = (bytes) =>
  btoa(String.fromCharCode(...new Uint8Array(bytes)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

function randomVerifier() {
  // 64 random bytes -> 86 url-safe chars (spec allows 43-128)
  const bytes = new Uint8Array(64);
  crypto.getRandomValues(bytes);
  return base64url(bytes);
}

async function challengeFor(verifier) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier));
  return base64url(digest);
}

export async function startSpotifyLogin() {
  const verifier = randomVerifier();
  localStorage.setItem(VERIFIER_KEY, verifier);
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
    response_type: "code",
    redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT,
    scope: SPOTIFY_SCOPES.join(" "),
    code_challenge_method: "S256",
    code_challenge: await challengeFor(verifier),
    show_dialog: "true",
  });
  window.location.assign(`${SPOTIFY_AUTHORIZE_URL}?${params.toString()}`);
}
