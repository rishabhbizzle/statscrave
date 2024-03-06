import React, { Suspense } from 'react'
import ArtistSongs from '@/components/artist/songs'
import { getArtistSpotifyApiData, isUserFavorite } from '@/lib/actions'
import ArtistAlbums from '@/components/artist/albums'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ArtistOverview from '@/components/artist/overview'
import PopularTracks from '@/components/artist/populars'
import BasicDetails from '@/components/BasicDetails'
import Loader from '@/components/ui/loader'
export const maxDuration = 300
export const fetchCache = 'force-no-store'

const Artist = async ({ params }) => {
    const id = params.id
    const artist = await getArtistSpotifyApiData(id)
    const isFavourite = await isUserFavorite('artist', id)

    return (
        <div className='container'>
            <div className="w-full ">
                <BasicDetails details={artist} type="artist" isFavourite={isFavourite} />
                <Tabs className="mt-6" defaultValue='overview' activationMode='manual'>
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="songs">Songs</TabsTrigger>
                        <TabsTrigger value="albums">Albums</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                        <Suspense fallback={<Loader />}>
                            <ArtistOverview id={id} artist={artist} />
                            <PopularTracks id={id} />
                        </Suspense>
                    </TabsContent>
                    <TabsContent value="songs">
                        <Suspense fallback={<Loader />}>
                            <ArtistSongs id={id} />
                        </Suspense>
                    </TabsContent>
                    <TabsContent value="albums">
                        <Suspense fallback={<Loader />}>
                            <ArtistAlbums id={id} />
                        </Suspense>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default Artist