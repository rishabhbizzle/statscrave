'use client'

import React, { Suspense, useEffect, useState } from 'react'
import Container from '@/components/ui/container'
import StreamingDetails from '@/components/StreamingDetails'
import BasicDetails from '@/components/BasicDetails'
import Loader from '@/components/ui/loader'
import axios from 'axios'
import AudioFeatures from '@/components/audioFeatures'
import dynamic from 'next/dynamic'
import { toast } from 'sonner'
const Recomendations = dynamic(() => import('../../../components/recomendations.jsx'),{
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
      if (!res?.data?.data) {
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
            {/* {data?.streamingData && (
                <StreamingDetails streamingData={data?.streamingData} type='track' />
            )} */}
          <AudioFeatures data={data?.trackFeatures} />
            <Recomendations type='track' />
          </div>
        </div>
      )}
      {loading && <Loader />}
    </Container>
  )
}

export default Track