import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BarChartComponent } from "./barChart";


const percentageChange = (latest, old) => {
  const change = latest - old
  const changePercentage = (change / old) * 100
  return changePercentage.toFixed(2)
}


export default function StreamingDetails({ streamingData, type = 'artist'}) {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Streams</CardTitle>
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
            <div className="text-2xl font-bold">
              {streamingData?.totalStreams?.toLocaleString("en-US")}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Streams</CardTitle>
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
            <div className="text-2xl font-bold">
              {streamingData?.dailyStreams[
                streamingData?.dailyStreams?.length - 1
              ].streams?.toLocaleString("en-US")}
            </div>
            {streamingData?.dailyStreams?.length > 2 && (
              <p className="text-xs text-muted-foreground">
                {percentageChange(
                  streamingData?.dailyStreams[
                    streamingData?.dailyStreams?.length - 1
                  ].streams,
                  streamingData?.dailyStreams[
                    streamingData?.dailyStreams?.length - 2
                  ].streams
                )}
                % from previous day
              </p>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Daily Streams</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <BarChartComponent data={streamingData?.dailyStreams} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
