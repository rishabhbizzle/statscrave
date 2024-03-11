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
            setArtist(res?.data?.data)
        } catch (error) {
            toast.error(error?.message)
            console.error(error);
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
                            <ArtistOverview id={id} artist={artist} />
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
            {loading && <Loader />}
        </div>
    )
}

export default Artist