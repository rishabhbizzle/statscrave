'use client'

import React, { Suspense, useEffect, useState } from 'react'
import ArtistSongs from '@/components/artist/songs'
import ArtistAlbums from '@/components/artist/albums'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ArtistOverview from '@/components/artist/overview'
import PopularTracks from '@/components/artist/populars'
import BasicDetails from '@/components/BasicDetails'
import Loader from '@/components/ui/loader'
import axios from 'axios'
import { toast } from 'sonner'
import { redirect } from 'next/navigation'
import ArtistEvents from '@/components/artist/events'
import ArtistStats from '@/components/artist/ArtistStats'
import { ErrorBoundary } from 'react-error-boundary'


const Artist = ({ params }) => {
    const id = params.id
    const [loading, setLoading] = useState(false)
    const [artist, setArtist] = useState(null)

    const fetchArtistData = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/artist/${id}`)
            if (res.status !== 200) {
                throw new Error(res?.data?.message || 'Failed to fetch data')
            }
            if (!res?.data?.data) {
                throw new Error('No artist found')
            }
            setArtist(res?.data?.data)
        } catch (error) {
            toast.error(error?.message)
            console.log(error);
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchArtistData(id)
    }, [id])

    return (
        <div className='container min-h-screen'>
            {artist && (
                <div className="w-full ">
                    <BasicDetails details={artist} type="artist" spotifyId={id} />
                    <Tabs className="mt-6" defaultValue='overview' activationMode='manual'>
                        <TabsList>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="songs">Songs</TabsTrigger>
                            <TabsTrigger value="albums">Albums</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview">
                            <ErrorBoundary fallback={<div />}>
                                <ArtistStats stats={artist?.otherStats} />
                            </ErrorBoundary>
                            <ArtistOverview id={id} artist={artist} lastFmStats={artist?.lastFmStats} />
                            <ErrorBoundary fallback={<div />}>
                                <ArtistEvents concerts={artist?.events?.concerts} />
                            </ErrorBoundary>
                            <PopularTracks id={id} />
                        </TabsContent>
                        <TabsContent value="songs">
                            <ArtistSongs id={id} />
                        </TabsContent>
                        <TabsContent value="albums">
                            <ArtistAlbums id={id} />
                        </TabsContent>
                    </Tabs>
                </div>
            )}
            {/* {!loading && !artist && (
                <div className='min-h-[80vh] flex items-center justify-center'>
                    <h1 className='text-2xl font-bold'>No artist found!!!</h1>
                </div>
            )} */}
            {loading && <Loader />}
        </div>
    )
}

export default Artist