
import React from 'react'
import { DataTable } from '../data-table/data-table'
import { getArtistSongsDailyData } from '@/lib/actions'

const ArtistSongs = async ( { id }) => {
    const songsData = await getArtistSongsDailyData(id)
    return (
        <div>
            <DataTable data={songsData} type="songs" searchColumn={'title'} />
        </div>
    )
}

export default ArtistSongs