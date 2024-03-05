const { SpotifyApi } = require('@spotify/web-api-ts-sdk');


const Spotify = SpotifyApi.withClientCredentials(
    process.env.SPOTIFY_CLIENT_ID,
    process.env.SPOTIFY_CLIENT_SECRET
);

// Spotify.authenticate().then(async (data) => {
//     const token = await Spotify.getAccessToken();
//     console.log(`Spotify token: ${token}`);
// }).catch((err) => {
//     console.log(err)
// })

console.log("Spotify initialized");

module.exports = Spotify;