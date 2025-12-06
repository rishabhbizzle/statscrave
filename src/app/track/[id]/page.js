'use client'

import React, { Suspense, useEffect, useState } from 'react'
import Container from '@/components/ui/container'
import StreamingDetails from '@/components/StreamingDetails'
import BasicDetails from '@/components/BasicDetails'
import Loader from '@/components/ui/loader'
import axios from 'axios'
import AudioFeatures from '@/components/audioFeatures'
import dynamic from 'next/dynamic'
import ReviewSection from '@/components/reviews/ReviewSection'
import { toast } from 'sonner'
import { Info } from 'lucide-react'
import LyricsSection from '@/components/LyricsSection'
import { ErrorBoundary } from 'react-error-boundary'
const Recomendations = dynamic(() => import('../../../components/recomendations.jsx'), {
  loading: () => <Loader component={true} />,
});


const Track = ({ params }) => {
  const id = params.id
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const fetchAlbumData = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/track/${id}`)
      if (res.status !== 200) {
        throw new Error(res?.data?.message || 'Failed to fetch data')
      }
      if (!res?.data?.data?.trackDetails) {
        throw new Error('No track found')
      }

      setData(res?.data?.data)
    } catch (error) {
      toast.error(error?.message)
      console.error(error);
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchAlbumData(id)
  }, [id])

  return (
    <Container>
      {data?.trackDetails && (
        <div>
          <BasicDetails details={data?.trackDetails} type='track' spotifyId={id} />
          <div className="flex-1 space-y-4 pt-6">
            {data?.streamingData && (
              <StreamingDetails streamingData={data?.streamingData} type='track' />
            )}
            <ErrorBoundary
              fallback={<div />}
            >
              <AudioFeatures data={data?.trackFeatures} />
            </ErrorBoundary>
            <ErrorBoundary
              fallback={<div />}
            >
              <LyricsSection
                trackName={data?.trackDetails?.name}
                artistName={data?.trackDetails?.artists?.[0]?.name}
                albumName={data?.trackDetails?.album?.name}
                duration={data?.trackDetails?.duration_ms}
                coverImage={data?.trackDetails?.album?.images?.[0]?.url}
              />
            </ErrorBoundary>
            <ErrorBoundary
              fallback={<div />}
            >
              <ReviewSection targetId={id} targetType="song" />
            </ErrorBoundary>
            <Recomendations type='track' />
          </div>
        </div>
      )}

      {/* {!loading && !data?.trackDetails && (
        <div className='min-h-[80vh] flex items-center justify-center'>
          <h1 className='text-2xl font-bold'>No track found!!!</h1>
        </div>
      )} */}

      {loading && <Loader />}
    </Container>
  )
}

export default Track