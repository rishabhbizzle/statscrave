import React from 'react'
import Image from 'next/image'
import Container from '@/components/ui/container'
import StreamingDetails from '@/components/StreamingDetails'
import OtherDetails from '@/components/OtherDetails'
import BasicDetails from '@/components/BasicDetails'
import { Recomendations } from '@/components/recomendations'
import { getAlbumData } from '@/lib/actions'


const Album = async ({ params }) => {
  const id = params.id
  const { albumDetails, streamingData } = await getAlbumData(id)

  console.log(albumDetails)

  return (
    <Container>
      <BasicDetails details={albumDetails} type='album' />
      <div className="flex-1 space-y-4 pt-6">
        <StreamingDetails streamingData={streamingData} type='album' />
        <OtherDetails details={albumDetails} type='album' />
        <Recomendations type='album' />
      </div>
    </Container>
  )
}

export default Album