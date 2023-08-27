import Spotify from "@/helper/spotify";
import { NextResponse } from "next/server";
import { connect } from "@/dgConfig/dbConfig";
import Album from "@/models/albumModel";

export const GET = async (request, { params }) => {
    try {
        await connect();
        const { id } = params;
        const albumDetails = await Spotify.albums.get(id, "ES")
        const albumTracks = await Spotify.albums.tracks(id, "ES", 50)
        const streamingData = await Album.findOne({ spotifyId: id })
        return NextResponse.json({
            success: true,
            data: {
                albumDetails,
                albumTracks,
                streamingData
            },
            message: "Album found successfully"
        })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}