"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "@/components/ui/container";
import { useComparison } from "@/context/ComparisonProvider";
import { toSentenceCase } from "@/lib/helperFunctions";
import axios from "axios";
import { Cross, Plus, PlusIcon, Users, X } from "lucide-react";
import { useEffect, useState } from "react";
import { FaLastfm, FaSpotify } from "react-icons/fa";
import { toast } from "sonner";

function ComparePage() {
  const { comparisonList, removeFromComparison } = useComparison();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchArtistsData = async () => {
    setLoading(true);

    if (comparisonList.length === 0) {
      setLoading(false);
      setData({});
      return;
    }

    for (const artist of comparisonList) {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/daily/overall/${artist.id}`
        );
        if (res.status !== 200) {
          throw new Error(res?.data?.message || "Failed to fetch data");
        }
        if (!res?.data?.data) {
          throw new Error("No artist found");
        }
        setData((prev) => {
          return { ...prev, [artist.id]: res?.data?.data };
        });
      } catch (error) {
        toast.error(error?.message);
        console.log(error);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtistsData();
  }, [comparisonList]);

  return (
    <Container>
      <div className="my-5 md:my-10">
        <h1 className="text-3xl font-bold mb-2">Compare Artists</h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500">
              Compare up to 2 artists based on their streaming stats. Please
              note each artist is unique in their own way. These stats may or
              may not reflect the true potential of an artist. Use this tool as
              a reference and not as demeaning or uplifting an artist.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data && Object.keys(data).length > 0 &&
          Object.keys(data).map((artistId, index) => {
            const artist = comparisonList.find((a) => a.id === artistId);
            const streamingData = data[artistId];

            return (
              <Card key={index}>
                <div className="flex items-center justify-end">
                  <Button
                  size="icon"
                  variant="ghost" 
                    onClick={() => {
                        setData((prev) => {
                          const { [artistId]: _, ...rest } = prev;
                          return rest;
                        });
                      
                      removeFromComparison(artistId)}}
                    className="flex items-center gap-2"
                  >

                    <X className="text-red-500" />
                  </Button>
                </div>
                <Card
                  key={artistId}
                  className="border p-6 flex flex-col items-center rounded-lg"
                >
                  <img
                    src={artist?.images[0]?.url}
                    alt="Artist 1"
                    width={120}
                    height={120}
                    className="rounded-full mb-4"
                    style={{ aspectRatio: "120/120", objectFit: "cover" }}
                  />
                  <h2 className="text-4xl font-bold mb-2">{artist.name}</h2>
                  <div className="flex gap-3 my-5  items-center">
                    {artist?.genres?.map((genre, index) => {
                      return (
                        <Badge key={index} className="text-[10px]">
                          {toSentenceCase(genre)}
                        </Badge>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="flex flex-col items-center">
                      <p className="text-3xl font-bold">
                        {artist?.followers?.total?.toLocaleString("en-US")}
                      </p>
                      <p className="text-sm ">Followers</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-3xl font-bold">{artist?.popularity}</p>
                      <p className="text-sm">Popularity</p>
                    </div>
                    {/* <div className="flex flex-col items-center">
                      <p className="text-4xl font-bold">2.3B</p>
                      <p className="text-sm text-[#b3b3b3]">Total Streams</p>
                    </div> */}
                  </div>
                </Card>
                {streamingData &&
                  streamingData?.map((data, index) => (
                    <Card key={index}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          {data?.type}
                        </CardTitle>
                        <FaSpotify />
                      </CardHeader>
                      <CardContent className="flex flex-col">
                        <div className="space-y-1">
                          <p className="text-3xl font-semibold tracking-tighter">
                            {data?.total}
                          </p>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
                          <div className="flex items-center space-x-2">
                            <div className="h-2 w-2 rounded-full bg-gray-400" />
                            <span className="text-sm font-medium">Lead:</span>
                            <span className="text-sm ml-auto">
                              {data?.lead}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="h-2 w-2 rounded-full bg-gray-400" />
                            <span className="text-sm font-medium">Solo:</span>
                            <span className="text-sm ml-auto">
                              {data?.solo}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="h-2 w-2 rounded-full bg-gray-400" />
                            <span className="text-sm font-medium">
                              Feature:
                            </span>
                            <span className="text-sm ml-auto">
                              {data?.feature}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                {artist?.lastFmStats && (
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Last.fm Total Streams
                      </CardTitle>
                      <FaLastfm className="text-2xl" />
                    </CardHeader>
                    <CardContent className="flex flex-col">
                      <div className="space-y-1">
                        <p className="text-3xl font-semibold tracking-tighter">
                          {parseInt(
                            artist?.lastFmStats?.playcount
                          )?.toLocaleString("en-US")}
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className="flex items-center space-x-2">
                          <div className="h-2 w-2 rounded-full bg-gray-400" />
                          <span className="text-sm font-medium">Listeners</span>
                          <span className="text-sm ml-auto">
                            {parseInt(
                              artist?.lastFmStats?.listeners
                            )?.toLocaleString("en-US")}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </Card>
            );
          })}
          {comparisonList.length === 1 && (
              <Card className="border p-6 flex items-center rounded-lg justify-center">
                <PlusIcon className="text-gray-500 mr-2" />
                <p className="text-xl">Add another artist</p>                
              </Card>
              )}

      </div>
      
      {data && Object.keys(data).length === 0 && (
            <div className="w-full flex items-center justify-center flex-col gap-3 mt-10">
              <h2 className="text-2xl font-medium">No artists found!!!</h2>
              <p className="text-sm text-gray-500">
                Please add artists to compare
              </p>
            </div>
          )}

    </Container>
  );
}

export default ComparePage;
