import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const AUTHORIZE = "https://accounts.spotify.com/authorize";
const SCOPES = ["user-top-read", "user-read-recently-played"].join(",");
const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const redirectURI = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT;


export default function Info() {
  return (
    <div className="flex flex-col min-h-[100dvh] mt-5 bg-gradient-to-b from-[#1DB954] to-[#191414]">
      <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 py-12 space-y-8">
        <div className="text-center space-y-4 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Discover Your Music Taste
          </h1>
          <p className="text-lg md:text-xl text-white/80">
            Tired of waiting for Spotify wrapped?? Connect
            your Spotify account to get analysis of your top songs
            and artists for the last 1 month, 6 months, and 1 year with a roast on the side.
          </p>
          <Link
            href={`${AUTHORIZE}?client_id=${clientId}&response_type=code&redirect_uri=${redirectURI}&show_dialog=true&scope=${SCOPES}`}
          >
            <Button variant="outline" className="mt-5">
              Sign in with Spotify
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
          <Card className="bg-white/10 backdrop-blur-sm rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-3">
              <ClockIcon className="h-6 w-6 text-white" />
              <h3 className="text-lg font-bold text-white">Last 1 Month</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white/80">Top Song</span>
                <span className="font-bold text-white">Peaches</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80">Top Artist</span>
                <span className="font-bold text-white">Justin Bieber</span>
              </div>
            </div>
            <div className="text-white/80">
              Wow, you really love mainstream pop, dont you? I guess you are
              just a sucker for catchy beats and smooth vocals.
            </div>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-3">
              <ClockIcon className="h-6 w-6 text-white" />
              <h3 className="text-lg font-bold text-white">Last 6 Months</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white/80">Top Song</span>
                <span className="font-bold text-white">Shape of You</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80">Top Artist</span>
                <span className="font-bold text-white">Ed Sheeran</span>
              </div>
            </div>
            <div className="text-white/80">
              Ah, the classic Ed Sheeran. You are the kind of person who enjoys a
                good love song, arent you? 
            </div>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-3">
              <ClockIcon className="h-6 w-6 text-white" />
              <h3 className="text-lg font-bold text-white">Last 1 Year</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white/80">Top Song</span>
                <span className="font-bold text-white">Blinding Lights</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80">Top Artist</span>
                <span className="font-bold text-white">The Weeknd</span>
              </div>
            </div>
            <div className="text-white/80">
              Ah, the Weeknd. You are the kind of person who probably has a
              playlist called "Sad Boi Hours" on repeat. 
            </div>
          </Card>
        </div>
        {/* <div>
          <Card className="bg-white/10 backdrop-blur-sm rounded-lg p-6 space-y-4 flex justify-center flex-col md:flex-row">
            <div className="text-white text-6xl flex flex-col">
              <p>Share your Spotify Replay with the world</p>

              <div className="flex gap-5 mt-10 flex-col items-center">
                <img
                  src="/replay1.png"
                  alt="Spotify"
                  className="w-[70%] h-full object-fill"
                />
                <img
                  src="/replay2.png"
                  alt="Spotify"
                  className="w-[70%] h-full object-fill"
                />
              </div>
            </div>
            <div className="w-full flex justify-center">
              <img
                src="/replayBanner.jpg"
                alt="Spotify"
                className="w-80 h-full object-fill"
              />
            </div>
          </Card>
        </div> */}
      </main>
    </div>
  );
}

function AirplayIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" />
      <path d="m12 15 5 6H7Z" />
    </svg>
  );
}

function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
