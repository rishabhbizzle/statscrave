

import React from 'react'
import { notFound } from 'next/navigation'
import MostStreamedArtists from '@/components/records/most-streamed-artists'
import MostStreamedAlbums from '@/components/records/most-streamed-albums'
import MostPopularArtists from '@/components/records/most-popular-artists'
import MostStreamedSongs from '@/components/records/most-streamed-songs'
import MostStreamedSongsSingle from '@/components/records/most-streamed-songs-single'
import MostViewedMusicVideos from '@/components/records/most-viewed-mv'

const recordArray = [
  {
    page: 'most-streamed-songs-single-week',
    title: 'Most Streamed Songs in a Single Week (Spotify)',
    description: 'List of the most streamed songs in a single week in Spotify history.',
    component: <MostStreamedSongsSingle mode='week' />,

  },
  {
    page: 'most-streamed-songs-single-day',
    title: 'Most Streamed Songs in a Single Day (Spotify)',
    description: 'List of the most streamed songs in a single day in Spotify history.',
    component: <MostStreamedSongsSingle />,
  },
  {
    page: 'most-streamed-songs',
    title: 'Most Streamed Songs (Spotify)',
    description: 'List of the most streamed songs in Spotify history.',
    component: <MostStreamedSongs />,
  },
  {
    page: 'most-popular-artists',
    title: 'Most Popular Artists (Spotify)',
    description: 'List of the most popular artists in Spotify currently based on monthly listeners.',
    component: <MostPopularArtists />,
  },
  {
    page: 'most-streamed-albums',
    title: 'Most Streamed Albums (Spotify)',
    description: 'List of the most streamed albums in Spotify history.',
    component: <MostStreamedAlbums />,
  },
  {
    page: "most-streamed-artists",
    title: 'Most Streamed Artists (Spotify)',
    description: 'List of the most streamed artists in Spotify history.',
    component: <MostStreamedArtists />,
  },
  {
    page: "most-viewed-music-videos",
    title: 'Most Viewed Music Videos on YouTube',
    description: 'List of the most viewed music videos on YouTube.',
    component: <MostViewedMusicVideos />,
  },
];


// Function to generate metadata for each chart
export async function generateMetadata({ params }) {
  const recordName = params.name;
  const recordDetails = recordArray.find(record => record.page === recordName);
  if (recordDetails) {
    return {
      title: `${recordDetails.title} - StatsCrave`,
      description: recordDetails.description,
      openGraph: {
        images: [
          {
            url: 'https://statscrave.com/og-image-wide.png',
            alt: 'StatsCrave - Your ultimate music analytics platform',
          },
          {
            url: 'https://statscrave.com/og-image2.jpg',
            alt: 'StatsCrave - Your ultimate music analytics platform',
          },
        ],
        type: 'website',
        locale: 'en_US',
        title: `${recordDetails.title} - StatsCrave`,
        description: recordDetails.description,
        site_name: 'StatsCrave',
      },
      twitter: {
        card: "summary_large_image",
        title: `${recordDetails.title} - StatsCrave`,
        description: recordDetails.description,
        url: 'https://statscrave.com',
        creator: "@StatsCrave",
        images: [
          {
            url: 'https://i.postimg.cc/C10cs3Sf/og-image-wide.png',
            alt: 'StatsCrave - Your ultimate music analytics platform!!',
          },
        ],
      },
    };
  }
}


const Record = ({ params }) => {
  const recordName = params.name
  const foundRecordDetails = recordArray.find(record => record.page === recordName);
  if (!foundRecordDetails) {
    return notFound();
  }

  return (
    <div className='px-4 md:px-8 min-h-screen'>
      {foundRecordDetails.component}
    </div>
  )
}

export default Record