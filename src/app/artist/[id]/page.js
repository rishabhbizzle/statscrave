import React, { Suspense } from 'react'
import ArtistSongs from '@/components/artist/songs'
import { getArtistSpotifyApiData, isUserFavorite } from '@/lib/actions'
import ArtistAlbums from '@/components/artist/albums'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ArtistOverview from '@/components/artist/overview'
import PopularTracks from '@/components/artist/populars'
import BasicDetails from '@/components/BasicDetails'


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
                        <TabsTrigger value="albums">Album</TabsTrigger>
                        {/* <TabsTrigger value="other">Other</TabsTrigger> */}
                    </TabsList>
                    <TabsContent value="overview">
                        <Suspense fallback={<div>Loading...</div>}>
                            <ArtistOverview id={id} artist={artist} />
                            <PopularTracks id={id} />
                        </Suspense>
                    </TabsContent>
                    <TabsContent value="songs">
                        <Suspense fallback={<div>Loading...</div>}>
                            <ArtistSongs id={id} />
                        </Suspense>
                    </TabsContent>
                    <TabsContent value="albums">
                        <Suspense fallback={<div>Loading...</div>}>
                            <ArtistAlbums id={id} />
                        </Suspense>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default Artist