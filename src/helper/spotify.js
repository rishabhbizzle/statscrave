const { SpotifyApi } = require('@spotify/web-api-ts-sdk');


const Spotify = SpotifyApi.withClientCredentials(
    process.env.SPOTIFY_CLIENT_ID,
    process.env.SPOTIFY_CLIENT_SECRET
);

console.log("Spotify initialized");

module.exports = Spotify;