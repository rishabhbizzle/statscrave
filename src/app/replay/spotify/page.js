"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Container from "@/components/ui/container";
import UserData from "@/components/user-top-list/user-data";
import Loader from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Info from "./InfoReplay";

const AUTHORIZE = "https://accounts.spotify.com/authorize";
const TOKEN = "https://accounts.spotify.com/api/token";
const SCOPES = ["user-top-read", "user-read-recently-played"].join(",");

export default function SpotifyUserPage() {
  const [isSpotifyLoggedIn, setIsSpotifyLoggedIn] = useState(false);
  const [type, setType] = useState("tracks");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState("short_term");

  const router = useRouter();
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
  const redirectURI = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT;

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (code) {
      fetchAccessToken(code);
      // Remove code from URL
      window.history.replaceState({}, document.title, "/replay/spotify");
    } else {
      checkAndRefreshToken();
    }
  }, []);

  useEffect(() => {
    if (isSpotifyLoggedIn) {
      getUserTopTracksSpotify();
    }
  }, [type, timeRange, isSpotifyLoggedIn]);

  const fetchAccessToken = async (code) => {
    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectURI,
      client_id: clientId,
      client_secret: clientSecret,
    });

    try {
      const response = await axios.post(TOKEN, body, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        },
      });

      handleTokenResponse(response.data);
    } catch (error) {
      console.error("Error fetching access token:", error);
      toast.error("Failed to log in with Spotify");
    }
  };

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("spotifyRefreshToken");
    if (!refreshToken) {
      setIsSpotifyLoggedIn(false);
      return;
    }

    const body = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: clientId,
    });

    try {
      const response = await axios.post(TOKEN, body, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        },
      });

      handleTokenResponse(response.data);
    } catch (error) {
      console.error("Error refreshing token:", error);
      setIsSpotifyLoggedIn(false);
      toast.error("Session expired, please log in again");
      router.push("/replay");
    }
  };

  const handleTokenResponse = (data) => {
    const expiresIn = new Date(Date.now() + data.expires_in * 1000).toISOString();
    localStorage.setItem("spotifyTokenExpire", expiresIn);
    localStorage.setItem("spotifyAccessToken", data.access_token);
    if (data.refresh_token) {
      localStorage.setItem("spotifyRefreshToken", data.refresh_token);
    }
    setIsSpotifyLoggedIn(true);
  };

  const checkAndRefreshToken = () => {
    const tokenExpire = localStorage.getItem("spotifyTokenExpire");
    if (!tokenExpire) {
      setIsSpotifyLoggedIn(false);
      return;
    }

    if (new Date() > new Date(tokenExpire)) {
      refreshAccessToken();
    } else {
      setIsSpotifyLoggedIn(true);
    }
  };

  const getUserTopTracksSpotify = async () => {
    setLoading(true);
    try {
      const songsResponse = await axios.get(
        `https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=${timeRange}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("spotifyAccessToken")}`,
          },
        }
      );

      const artistsResponse = await axios.get(
        `https://api.spotify.com/v1/me/top/artists?limit=50&time_range=${timeRange}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("spotifyAccessToken")}`,
          },
        }
      );

      setUserData({
        artists: artistsResponse?.data?.items || [],
        tracks: songsResponse?.data?.items || [],
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error(error?.message || "Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      {isSpotifyLoggedIn && (
        <div className='my-8'>
          <h1 className='text-3xl md:text-4xl font-bold my-5'>Spotify Replay</h1>
          <p className='text-muted-foreground'>
            Get your top tracks and artists from Spotify. You can download a banner image of your top tracks and artists to share with your friends. Also get a roast on your music taste.
          </p>
          <div>
            <Button
              onClick={() => {
                localStorage.removeItem("spotifyAccessToken");
                localStorage.removeItem("spotifyRefreshToken");
                localStorage.removeItem("spotifyTokenExpire");
                setIsSpotifyLoggedIn(false);
                router.replace("/replay");
              }}
              variant="destructive" className="mt-5">
              Disconnect Spotify
            </Button>
          </div>
        </div>

      )}
      {isSpotifyLoggedIn ? (
        <div>
          {userData && (
            <UserData
              type={type}
              setType={setType}
              userData={userData}
              timeRange={timeRange}
              setTimeRange={setTimeRange}
              platform="spotify"
            />
          )}
        </div>
      ) : (
        <Info />

      )}
      {loading && <Loader />}
    </Container>
  );
}