"use client"


import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import MostStreamedArtists from '@/components/records/most-streamed-artists'
import MostStreamedAlbums from '@/components/records/most-streamed-albums'
import MostPopularArtists from '@/components/records/most-popular-artists'
import MostStreamedSongs from '@/components/records/most-streamed-songs'
import MostStreamedSongsSingle from '@/components/records/most-streamed-songs-single'

const recordsMap = {
  "most-streamed-artists" : <MostStreamedArtists />,
  "most-streamed-albums" : <MostStreamedAlbums />,
  "most-popular-artists" : <MostPopularArtists />,
  "most-streamed-songs": <MostStreamedSongs />,
  "most-streamed-songs-single-day" : <MostStreamedSongsSingle />,
  "most-streamed-songs-single-week": <MostStreamedSongsSingle mode='week' />,
}

const Record = ({ params }) => {
  const recordName = params.name
  if (!recordsMap[recordName]) {
    return notFound()
  }

  return (
    <div className='px-4 md:px-8 min-h-screen'>
      {recordsMap[recordName]}
    </div>
  )
}

export default Record