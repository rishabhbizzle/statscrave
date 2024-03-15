"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Container from "@/components/ui/container";
import UserData from "@/components/user-top-list/user-data";
import Loader from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export default function Page() {
  const [isSpotifyLoggedIn, setIsSpotifyLoggedIn] = useState(false);
  const [type, setType] = useState("tracks");
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState("short_term");
  const AUTHORIZE = "https://accounts.spotify.com/authorize";
  const TOKEN = "https://accounts.spotify.com/api/token";
  const scopes = ["user-top-read", "user-read-email", "user-read-private"].join(
    ","
  );
  const LSAvailabe = typeof window !== "undefined";
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
  const redirectURI = "http://localhost:3000/userSpotify/";
  const currentDate = new Date();
  let refreshToken;
  let accessToken;

  useEffect(() => {
    function spotifyLogin() {
      let code = getCode();
      if (code) {
        fetchAccessToken(code);
      }
    }
    spotifyLogin();
  });

  useEffect(() => {
    function refreshAccessToken() {
      refreshToken = localStorage.getItem("spotifyRefreshToken");
      let body = "grant_type=refresh_token";
      body += "&refresh_token=" + refreshToken;
      body += "&client_id=" + clientId;
      callAuthorizationApi(body);
    }
    if (LSAvailabe) {
      const expireDate = new Date(localStorage.getItem("spotifyTokenExpire"));
      console.log(expireDate, currentDate);
      if (currentDate > expireDate) {
        refreshAccessToken();
      } else if (currentDate < expireDate) {
        setIsSpotifyLoggedIn(true);
      }
    }
  }, [LSAvailabe, currentDate]);

  function getCode() {
    let code = null;
    const queryString = window.location.search;
    if (queryString.length > 0) {
      const urlParams = new URLSearchParams(queryString);
      code = urlParams.get("code");
    }
    return code;
  }

  function fetchAccessToken(code) {
    let body = "grant_type=authorization_code";
    body += "&code=" + code;
    body += "&redirect_uri=" + encodeURI(redirectURI);
    body += "&client_id=" + clientId;
    body += "&client_secret=" + clientSecret;
    callAuthorizationApi(body);
  }

  function callAuthorizationApi(body) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader(
      "Authorization",
      "Basic " + window.btoa(clientId + ":" + clientSecret)
    );
    xhr.send(body);
    xhr.onload = handleAuthorizationResponse;
  }

  function handleAuthorizationResponse() {
    if (this.status == 200) {
      let data = JSON.parse(this.responseText);
      console.log(data);
      currentDate.setTime(currentDate.getTime() + 1 * 60 * 60 * 1000);
      localStorage.setItem("spotifyTokenExpire", currentDate.toString());
      if (data.access_token != undefined) {
        accessToken = data.access_token;
        localStorage.setItem("spotifyAccessToken", accessToken);
      }
      if (data.refresh_token != undefined) {
        refreshToken = data.refresh_token;
        localStorage.setItem("spotifyRefreshToken", refreshToken);
        setIsSpotifyLoggedIn(true);
      } else {
        console.log(this.responseText);
      }
    }
  }

  function getUserTopTracksSpotify() {
    setLoading(true);
    let userParams = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("spotifyAccessToken"),
      },
    };

    axios
      .get(
        `https://api.spotify.com/v1/me/top/${type}?limit=50&time_range=${timeRange}`,
        userParams
      )
      .then((res) => {
        setUserData(res?.data?.items);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    if (LSAvailabe) {
      const spotifyTokenExpireDate = new Date(
        localStorage.getItem("spotifyTokenExpire")
      );
      if (new Date(currentDate) >= spotifyTokenExpireDate) {
          if (isSpotifyLoggedIn){
            toast.error("Session Expired, Please login again");
            redirect("/dashboard");
        }
      } else if (new Date(currentDate) < spotifyTokenExpireDate) {
        getUserTopTracksSpotify();
      } else {
        getUserTopTracksSpotify();
      }
    }
  }, [type, timeRange, isSpotifyLoggedIn]);

  return (
    <Container>
      <div className="flex flex-col items-center justify-center w-full">
        {isSpotifyLoggedIn ? (
          <UserData
            type={type}
            setType={setType}
            userData={userData}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
          />
        ) : (
          <Link
            href={`${AUTHORIZE}?client_id=${clientId}&response_type=code&redirect_uri=${redirectURI}&show_dialog=true&scope=${scopes}`}
          >
            <Button>Sign in with Spotify</Button>
          </Link>
        )}
      </div>
      {loading && <Loader />}
    </Container>
  );
}
