'use client'


import React, { useEffect, useState } from "react";
import {
  CardContent,
  CardFooter,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChartComponent } from "../barChart";
import { InfiniteMovingCards } from "../ui/moving-cards";
import { toast } from "sonner";
import axios from "axios";
import Loader from "../ui/loader";
import { FaLastfm, FaSpotify } from "react-icons/fa";

const ArtistOverview = ({ id, lastFmStats }) => {
  const [loading, setLoading] = useState(false);
  const [overallData, setOverallData] = useState([]);
  const [streamingData, setStreamingData] = useState(null);

  const fetchArtistOverallDailyData = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/daily/overall/${id}`
      );
      if (res.status !== 200) {
        throw new Error(res?.data?.message || "Failed to fetch data");
      }
      setOverallData(res?.data?.data || []);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const fetchArtistStreamingData = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/artist/streams/${id}`
      );
      if (res.status !== 200) {
        throw new Error(res?.data?.message || "Failed to fetch data");
      }
      setStreamingData(res?.data?.data);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    await fetchArtistOverallDailyData(),
      await fetchArtistStreamingData(),
      setLoading(false);
  };
  useEffect(() => {
    fetchAllData();
  }, [id]);

  return (
    <div>
      {loading && <Loader component={true} text="Fetching Streaming Stats" />}
      <div className="my-3 grid gap-4 md:grid-cols-2">
        {overallData &&
          overallData?.map((data, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {data?.type}
                </CardTitle>
                <FaSpotify  />
              </CardHeader>
              <CardContent className="flex flex-col">
                <div className="space-y-1">
                  <p className="text-3xl font-semibold tracking-tighter">
                    {data?.total}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-gray-400" />
                    <span className="text-sm font-medium">Lead:</span>
                    <span className="text-sm ml-auto">{data?.lead}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-gray-400" />
                    <span className="text-sm font-medium">Solo:</span>
                    <span className="text-sm ml-auto">{data?.solo}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-gray-400" />
                    <span className="text-sm font-medium">Feature:</span>
                    <span className="text-sm ml-auto">{data?.feature}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {!loading && lastFmStats && (
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
                  {parseInt(lastFmStats?.playcount)?.toLocaleString('en-US')}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-gray-400" />
                  <span className="text-sm font-medium">Listeners</span>
                  <span className="text-sm ml-auto">{parseInt(lastFmStats?.listeners)?.toLocaleString('en-US')}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          )}
      </div>

      {/* <div>
        <InfiniteMovingCards
          items={records}
          direction="right"
          speed="slow"
        />
      </div> */}

      {streamingData && (
        <div className="flex flex-col gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Daily Total Streams</CardTitle>
              <CardDescription>Total streams per day</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <BarChartComponent data={streamingData?.dailyTotalStreams} />
            </CardContent>
          </Card>
          <div className="grid md:grid-cols-2 gap-2">
            <Card>
              <CardHeader>
                <CardTitle>Daily Lead Streams</CardTitle>
                <CardDescription>
                  Streams where the artist is lead
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <BarChartComponent data={streamingData?.dailyLeadStreams} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Daily Feature Streams</CardTitle>
                <CardDescription>
                  Streams where the artist is featured
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <BarChartComponent data={streamingData?.dailyFeatureStreams} />
              </CardContent>
            </Card>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistOverview;
