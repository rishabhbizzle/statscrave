import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from 'lucide-react';
import Link from 'next/link';
import Loader from '@/components/ui/loader';
import Album from '@/components/charts/Album';
import Artist from '@/components/charts/Artist';
import Global from '@/components/charts/Global';
import Hot100 from '@/components/charts/Hot100';
import LastFmTopTracks from '@/components/charts/lastFmTopTracks';
import LastFmTopArtists from '@/components/charts/lastFmTopArtists';
import MelonCharts from '@/components/charts/melonCharts';
import OtherKoreanCharts from '@/components/charts/otherKoreanCharts';

// Define chart details in a single array
const chartArray = [
  {
    page: 'hot100',
    title: 'Billboard Hot 100',
    image: './head.jpg',
    description: 'The week most popular songs in US on Billboard. We do not own any of the data presented here. All rights to them',
    getComponent: (searchParams) => <Hot100 searchParams={searchParams} />,
  },
  {
    page: 'album200',
    image: './album.png',
    title: 'Billboard Album 200',
    description: 'The week most popular albums in US on Billboard. This chart is a property of Billboard. We do not own any of the data presented here. All rights to them',
    getComponent: (searchParams) => <Album searchParams={searchParams} />,
  },
  {
    page: 'artist100',
    title: 'Billboard Artist 100',
    image: './artist.png',
    description: 'The week most popular artists on Billboard. This chart is a property of Billboard. We do not own any of the data presented here. All rights to them',
    getComponent: (searchParams) => <Artist searchParams={searchParams} />,
  },
  {
    page: 'global200',
    image: './global.jpg',
    title: 'Billboard Global 200',
    description: 'The week most popular songs around the world on Billboard. This chart is a property of Billboard. We do not own any of the data presented here. All rights to them',
    getComponent: (searchParams) => <Global searchParams={searchParams} />,
  },
  {
    page: 'lastFmTopTracks',
    image: 'https://www.last.fm/static/images/lastfm_logo_facebook.15d8133be114.png',
    title: 'Last.fm Top Weekly Tracks',
    description: 'This week top tracks on Last.fm globally or country wise. This chart is a property of Last.fm. We do not own any of the data presented here. All rights to them',
    getComponent: (searchParams) => <LastFmTopTracks searchParams={searchParams} />,
  },
  {
    page: 'lastFmTopArtists',
    title: 'Last.fm Top Weekly Artists',
    image: 'https://www.last.fm/static/images/lastfm_logo_facebook.15d8133be114.png',
    description: 'This week top artists on Last.fm globally or country wise. This chart is a property of Last.fm. We do not own any of the data presented here. All rights to them',
    getComponent: (searchParams) => <LastFmTopArtists searchParams={searchParams} />,
  },
  {
    page: 'melonCharts',
    title: 'Melon Charts',
    image: 'https://6.soompi.io/wp-content/uploads/image/d9fcf751a0a242638b7dc98b29e81bf2.jpeg?s=900x600&e=t',
    description: 'This chart is a property of Melon. We do not own any of the data presented here. All rights to them',
    getComponent: (searchParams) => <MelonCharts searchParams={searchParams} />,
  },
  {
    page: 'genie',
    title: 'Genie Top 200 Tracks (Realtime)',
    image: 'https://yt3.googleusercontent.com/scUX4jtNfsIWOB7fFR54ghwTgFziOmvmLkPSt6C5Dl3D5x4haSx_YWvoLcq9L5eo29vSsF2_kw=s900-c-k-c0x00ffffff-no-rj',
    description: 'The current most popular tracks on Genie. This chart is a property of Genie. We do not own any of the data presented here. All rights to them',
    getComponent: (searchParams) => <OtherKoreanCharts chartName='genie' searchParams={searchParams} />,
  },
  {
    page: 'bugs',
    title: 'Bugs Top 100 Tracks (Realtime)',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Bugs%21_logo.jpg/640px-Bugs%21_logo.jpg',
    description: 'The current most popular tracks on Bugs. This chart is a property of Bugs. We do not own any of the data presented here. All rights to them',
    getComponent: (searchParams) => <OtherKoreanCharts chartName='bugs' searchParams={searchParams} />,
  },
];

// Function to generate metadata for each chart
export async function generateMetadata({ params }) {
  const chartName = params.name;
  const chartDetails = chartArray.find(chart => chart.page === chartName);
  if (chartDetails) {
    return {
      title: `${chartDetails.title} - StatsCrave`,
      description: chartDetails.description,
      openGraph: {
        images: [chartDetails.image],
      },
      twitter: {
        card: "summary_large_image",
        title: `${chartDetails.title} - StatsCrave`,
        creator: "@StatsCrave",
        images: [
          {
            url: chartDetails.image,
            alt: 'StatsCrave - Your ultimate music analytics platform',
          },
        ],
      },
    };
  }
}

const Chart = async ({ params, searchParams }) => {
  const chartName = params.name;
  const foundChartDetails = chartArray.find(chart => chart.page === chartName);
  if (!foundChartDetails) {
    return notFound();
  }

  return (
    <div className='md:p-10 min-h-screen'>
      <Card>
        <CardHeader>
          <CardTitle>{foundChartDetails.title}</CardTitle>
          <CardDescription>{foundChartDetails.description}</CardDescription>
        </CardHeader>
        <CardContent className="p-3 md:p-6">
          {/* <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              This chart is a property of
              <Link href="https://www.billboard.com/" className='mx-1 font-semibold' target='_blank'>
                Billboard
              </Link>
              and are used for educational purposes only. We do not own any of the data presented here. All rights reserved to the respective owners.
            </AlertDescription>
          </Alert> */}
          <Card className="">
            <Suspense fallback={<Loader component={true} />}>
              {foundChartDetails.getComponent(searchParams)}
            </Suspense>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chart;
