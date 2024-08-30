"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { PlayIcon } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const TopSongsGlobal = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/songs/top?limit=10`
      );
      const formattedData = res?.data?.data?.items?.map((item) => item?.track);
      console.log(formattedData);
      setData(formattedData || []);
    } catch (error) {
      toast.error(error?.message);
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
        <CardTitle>Top Songs Global</CardTitle>
        <CardDescription>
          Here are the top 10 songs globally on Spotify right now.
        </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full flex items-center justify-center">
            <Button variant="secondary" disabled>
              Loading...
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!loading && data.length === 0) {
    return null
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl lg:text-2xl">Top Songs Global</CardTitle>
        <CardDescription>
          Here are the top 10 songs globally on Spotify right now.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 w-full">
          {data.map((song, index) => (
            <div key={index} className="w-full flex items-center gap-4 rounded-lg bg-secondary p-4 transition-colors hover:bg-primary/50">
              <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                <Link href={song?.external_urls?.spotify} target="_blank">
                <img
                  src={song?.album?.images[0]?.url}
                  alt="Album Cover"
                  width={300}
                  height={300}
                  className="h-full w-full object-cover"
                  />
                  </Link>
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="text-md lg:text-lg font-medium line-clamp-1">{song?.name}</h3>
                <div>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {song?.artists?.map((artist) => artist.name).join(", ")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopSongsGlobal;
