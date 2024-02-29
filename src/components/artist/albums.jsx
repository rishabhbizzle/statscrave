import React from 'react'
import { DataTable } from '../data-table/data-table'
import { getArtistAlbumsDailyData } from '@/lib/actions'
const ArtistAlbums = async ( { id }) => {
    const albumsData = await getArtistAlbumsDailyData(id)
    return (
        <div>
            <DataTable data={albumsData} type='album' searchColumn={'title'} />
        </div>
    )
}

export default ArtistAlbums;