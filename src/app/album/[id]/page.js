import React, { Suspense } from 'react'
import Image from 'next/image'
import Container from '@/components/ui/container'
import StreamingDetails from '@/components/StreamingDetails'
import OtherDetails from '@/components/OtherDetails'
import BasicDetails from '@/components/BasicDetails'
import { Recomendations } from '@/components/recomendations'
import { getAlbumData, isUserFavorite } from '@/lib/actions'
import Loader from '@/components/ui/loader'


const Album = async ({ params }) => {
  const id = params.id
  const { albumDetails, streamingData } = await getAlbumData(id)
  const isFavourite = await isUserFavorite('album', id)


  return (
    <Container>
      <BasicDetails details={albumDetails} type='album' isFavourite={isFavourite} />
      <div className="flex-1 space-y-4 pt-6">
        {streamingData && (
          <Suspense fallback={<Loader />}>
            <StreamingDetails streamingData={streamingData} type='album' />
          </Suspense>
        )}
        <Suspense fallback={<Loader />}>
          <OtherDetails details={albumDetails} type='album' />
        </Suspense>
        <Suspense fallback={<Loader />}>
          <Recomendations type='album' />
        </Suspense>
      </div>
    </Container>
  )
}

export default Album