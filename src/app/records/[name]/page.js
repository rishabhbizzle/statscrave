"use client"


import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import MostStreamedArtists from '@/components/records/most-streamed-artists'
import MostStreamedAlbums from '@/components/records/most-streamed-albums'
import MostPopularArtists from '@/components/records/most-popular-artists'
import MostStreamedSongs from '@/components/records/most-streamed-songs'

const recordsMap = {
  "most-streamed-artists" : <MostStreamedArtists />,
  "most-streamed-albums" : <MostStreamedAlbums />,
  "most-popular-artists" : <MostPopularArtists />,
  "most-streamed-songs": <MostStreamedSongs />
}

const Record = ({ params }) => {
  const recordName = params.name
  if (!recordsMap[recordName]) {
    return notFound()
  }

  return (
    <div className='md:px-8 '>
      {recordsMap[recordName]}
    </div>
  )
}

export default Record