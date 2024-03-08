'use client'

import React, { Suspense, useEffect, useState } from 'react'
import Image from 'next/image'
import Container from '@/components/ui/container'
import StreamingDetails from '@/components/StreamingDetails'
import OtherDetails from '@/components/OtherDetails'
import BasicDetails from '@/components/BasicDetails'
import { Recomendations } from '@/components/recomendations'
import Loader from '@/components/ui/loader'
import axios from 'axios'
import { toast } from 'sonner'



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
        <BasicDetails details={data?.albumDetails} type='album' spotifyId={id} />
      )}
      <div className="flex-1 space-y-4 pt-6">
        {data?.streamingData && (
          <Suspense fallback={<Loader />}>
            <StreamingDetails streamingData={data?.streamingData} type='album' />
          </Suspense>
        )}
        {data?.albumDetails && (
          <Suspense fallback={<Loader />}>
            <OtherDetails details={data?.albumDetails} type='album' />
          </Suspense>
        )}
        {/* <Suspense fallback={<Loader />}>
          <Recomendations type='album' />
        </Suspense> */}
      </div>
    </Container>
  )
}

export default Album