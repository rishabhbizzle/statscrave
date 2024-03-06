import React, { Suspense } from 'react'
import Container from '@/components/ui/container'
import StreamingDetails from '@/components/StreamingDetails'
import BasicDetails from '@/components/BasicDetails'
import { Recomendations } from '@/components/recomendations'
import { getTrackData, isUserFavorite } from '@/lib/actions'
import Loader from '@/components/ui/loader'
export const maxDuration = 300


const Track = async ({ params }) => {
  const id = params.id
  const { trackDetails, streamingData } = await getTrackData(id)
  const isFavourite = await isUserFavorite('track', id)

  return (
    <Container>
      <BasicDetails details={trackDetails} type='track' isFavourite={isFavourite} />
      <div className="flex-1 space-y-4 pt-6">
        {streamingData && (
          <Suspense fallback={<Loader />}>

            <StreamingDetails streamingData={streamingData} type='track' />
          </Suspense>
        )}
        {/* <Suspense fallback={<div>Loading...</div>}>
          <OtherDetails details={trackDetails} type='album' />
        </Suspense> */}
        <Suspense fallback={<div>Loading...</div>}>
          <Recomendations type='track' />
        </Suspense>
      </div>
    </Container>
  )
}

export default Track