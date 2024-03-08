'use client'

import React, { Suspense, useEffect, useState } from 'react'
import Container from '@/components/ui/container'
import StreamingDetails from '@/components/StreamingDetails'
import OtherDetails from '@/components/OtherDetails'
import BasicDetails from '@/components/BasicDetails'
import Loader from '@/components/ui/loader'
import axios from 'axios'
import { toast } from 'sonner'
import dynamic from 'next/dynamic'

const Recomendations = dynamic(() => import('../../../components/recomendations.jsx'),{
  loading: () => <p>Loading...</p>,
});


const Album = ({ params }) => {
  const id = params.id
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})

  const fetchAlbumData = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/album/${id}`)
      if (res.status !== 200) {
        throw new Error(res?.data?.message || 'Failed to fetch data')
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
      {data?.albumDetails && (
        <div>
          <BasicDetails details={data?.albumDetails} type='album' spotifyId={id} />
          <div className="flex-1 space-y-4 pt-6">
            {data?.streamingData && (
              <StreamingDetails streamingData={data?.streamingData} type='album' />
            )}
            <OtherDetails details={data?.albumDetails} type='album' />
            <Recomendations type='album' />
          </div>
        </div>
      )}
      {loading && <Loader />}
    </Container>
  )
}

export default Album