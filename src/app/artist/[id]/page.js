import React, { Suspense } from 'react'
import ArtistSongs from '@/components/artist/songs'
import { getArtistAlbumsDailyData, getArtistOverallDailyData, getArtistSongsDailyData } from '@/lib/actions'
import ArtistAlbums from '@/components/artist/albums'



const Artist = async ({ params }) => {
    const id = params.id
    const songsData = await getArtistSongsDailyData(id)
    const albumData = await getArtistAlbumsDailyData(id)
    const overallData = await getArtistOverallDailyData(id)

    return (
        <div className='container'>
            Hello artist page
            <ArtistSongs data={songsData} id={id} />
                <ArtistAlbums data={albumData} id={id} />

            
        </div>
    )
}

export default Artist