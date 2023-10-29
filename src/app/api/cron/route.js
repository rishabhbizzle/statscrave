import { NextResponse } from 'next/server';
import { connect } from "@/dgConfig/dbConfig"
import { storeArtistDiscographyDataInDB } from './controller';
import PriorityArtist from '@/models/priorityArtists';


export const GET = async (request, { params }) => {
    try {
        await connect();
        let results = []
        let priorityArtists = await PriorityArtist.find({})
        for (const artist of priorityArtists) {
            let res = await storeArtistDiscographyDataInDB(artist.spotifyId)
            results.push({
                artistId: artist.spotifyId,
                result: res
            })
        }
        return NextResponse.json({
            success: true,
            results
        })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
