import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TracksSection } from '@/components/tracks'

export default function OtherDetails({ details, type = 'artist'}) {
  return (
    <>
        <div className="grid gap-4md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4 grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Popularity
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
              <CardContent>
                <div className="text-2xl font-bold">{details?.popularity}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Streams
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
              <CardContent>
                <div className="text-2xl font-bold">{}</div>
              </CardContent>
            </Card>
           
          </div>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Tracks</CardTitle>
              <CardDescription>
                You made 265 sales this month.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TracksSection tracks={details?.tracks?.items} defaultImage={details?.images[0]?.url} />
            </CardContent>
          </Card>
        </div>
    </>
  )
}
