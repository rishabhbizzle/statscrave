import {
  getArtistOverallDailyData,
  getArtistStreamingData,
} from "@/lib/actions";
import React from "react";
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

const ArtistOverview = async ({ id, artist }) => {
  const streamingData = await getArtistStreamingData(id);
  const overallData = await getArtistOverallDailyData(id);
  return (
    <div>
      <div className="my-3 grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Popularity</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{artist?.popularity}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Followers</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{artist?.followers?.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Genres</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 text-2xl font-bold items-center">
              {artist?.genres?.map((genre, index) => {
                return <Badge key={index}>{genre}</Badge>;
              })}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="my-3 grid gap-4 md:grid-cols-2">
        {overallData &&
          overallData?.map((data, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {data?.type}
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
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
      </div>

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
