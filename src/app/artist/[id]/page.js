import React, { Suspense } from 'react'
import ArtistSongs from '@/components/artist/songs'
import { getArtistSpotifyApiData } from '@/lib/actions'
import ArtistAlbums from '@/components/artist/albums'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from 'next/image'
import ArtistOverview from '@/components/artist/overview'
import PopularTracks from '@/components/artist/populars'


const Artist = async ({ params }) => {
    const id = params.id
    const artist = await getArtistSpotifyApiData(id)
    return (
        <div className='container'>
            <div className="">
                <div className="flex flex-col sm:flex-row py-5 gap-8">
                    <Image
                        alt="cover"
                        className="object-cover"
                        height="250"
                        src={artist.images[0].url}
                        width="250"
                    />
                    <div className="">
                        <h1 className="text-4xl font-bold">{artist?.name}</h1>
                        <p className="text-sm">{artist?.id}</p>
                        <div className="mt-4 flex space-x-3">
                            <Button>Follow</Button>
                            <Button variant="outline">Download PDF report</Button>
                        </div>
                    </div>
                </div>
                <Tabs className="mt-6" defaultValue='overview' activationMode='manual'>
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="songs">Songs</TabsTrigger>
                        <TabsTrigger value="albums">Album</TabsTrigger>
                        <TabsTrigger value="other">Other</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                    <Suspense fallback={<div>Loading...</div>}>
                        <ArtistOverview id={id} artist={artist}  />
                    </Suspense>
                    <Suspense fallback={<div>Loading...</div>}>
                        <PopularTracks id={id}  />
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